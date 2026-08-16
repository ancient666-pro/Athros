import { describe, expect, it } from "vitest";
import {
  bookingSchema,
  DEFAULT_PRICING_CONFIGS,
  trustedRegion,
  type BookingInput,
} from "@/lib/bookings/bookings.server";
import { hmacHex, safeEqual } from "@/lib/webhooks/webhooks.server";
import {
  canTransitionPayment,
  validatePaymentTransition,
  assertMinorUnits,
  PAYMENT_STATUSES,
} from "@/lib/payments/payments";

describe("Phase 1: Backend + Database + Booking/Payment Verification", () => {
  describe("Regional Pricing & Multi-Currency Calculations", () => {
    it("resolves correct regional currencies and pricing structures", () => {
      const regions = ["INDIA", "UNITED_STATES", "UNITED_KINGDOM", "EUROPE", "MIDDLE_EAST", "SINGAPORE"] as const;
      const packages = ["MVP", "PRODUCTION_READY", "ENTERPRISE"] as const;

      for (const region of regions) {
        for (const pkg of packages) {
          const pricing = DEFAULT_PRICING_CONFIGS[pkg][region];
          expect(pricing.package).toBe(pkg);
          expect(pricing.region).toBe(region);
          expect(pricing.token_percentage).toBe(20);
          expect(pricing.full_amount).toBeGreaterThan(0);
          expect(pricing.token_amount).toBe(Math.round(pricing.full_amount * 0.2));
          expect(pricing.token_amount).toBeLessThan(pricing.full_amount);
        }
      }
    });

    it("accurately derives trusted region from ISO 3166-1 alpha-2 country codes", () => {
      expect(trustedRegion({ country: "IN" })).toBe("INDIA");
      expect(trustedRegion({ country: "US" })).toBe("UNITED_STATES");
      expect(trustedRegion({ country: "GB" })).toBe("UNITED_KINGDOM");
      expect(trustedRegion({ country: "DE" })).toBe("EUROPE");
      expect(trustedRegion({ country: "FR" })).toBe("EUROPE");
      expect(trustedRegion({ country: "AE" })).toBe("MIDDLE_EAST");
      expect(trustedRegion({ country: "SG" })).toBe("SINGAPORE");
      // Fallbacks
      expect(trustedRegion({ country: "CA" })).toBe("UNITED_STATES");
      expect(trustedRegion({ country: "AU" })).toBe("UNITED_STATES");
      expect(trustedRegion({ country: "JP" })).toBe("UNITED_STATES");
    });

    it("fetches correct pricing configurations from default pricing table", () => {
      const inPrice = DEFAULT_PRICING_CONFIGS["PRODUCTION_READY"]["INDIA"];
      expect(inPrice.currency).toBe("INR");
      expect(inPrice.full_amount).toBe(19999900);
      expect(inPrice.token_amount).toBe(3999980);

      const usPrice = DEFAULT_PRICING_CONFIGS["PRODUCTION_READY"]["UNITED_STATES"];
      expect(usPrice.currency).toBe("USD");
      expect(usPrice.full_amount).toBe(499900);
      expect(usPrice.token_amount).toBe(99980);
    });
  });

  describe("Booking Validation & Anti-Tamper Security", () => {
    it("validates compliant booking input", () => {
      const validPayload: BookingInput = {
        full_name: "Alex Rivera",
        email: "alex@nexuslabs.io",
        phone: "+14155552671",
        company_name: "Nexus Labs Inc.",
        country: "US",
        project_type: "Dual Native (Android + iOS)",
        selected_package: "PRODUCTION_READY",
        project_summary: "High throughput native application with offline support and biometrics.",
        preferred_contact_method: "email",
        company_website: "https://nexuslabs.io",
        reference_links: ["https://github.com/nexus/app"],
        terms_accepted: true,
      };

      const result = bookingSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("alex@nexuslabs.io");
        expect(result.data.terms_accepted).toBe(true);
      }
    });

    it("rejects booking when terms_accepted is false or missing", () => {
      const invalidPayload = {
        full_name: "Alex Rivera",
        email: "alex@nexuslabs.io",
        phone: "+14155552671",
        country: "US",
        project_type: "Dual Native",
        selected_package: "PRODUCTION_READY",
        project_summary: "Valid summary with sufficient character count for requirements.",
        preferred_contact_method: "email",
        terms_accepted: false,
      };

      const result = bookingSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });

    it("rejects booking when summary is too short (< 20 characters)", () => {
      const invalidPayload = {
        full_name: "Alex Rivera",
        email: "alex@nexuslabs.io",
        phone: "+14155552671",
        country: "US",
        project_type: "Dual Native",
        selected_package: "PRODUCTION_READY",
        project_summary: "Too short",
        preferred_contact_method: "email",
        terms_accepted: true,
      };

      const result = bookingSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });

  describe("Razorpay HMAC SHA256 & Webhook Signatures", () => {
    const secret = "live_razorpay_secret_key_889900";
    const orderId = "order_O4uF3z8P9q1XyZ";
    const paymentId = "pay_P8xT2q9L5k0MnB";
    const payload = `${orderId}|${paymentId}`;

    it("generates and securely matches constant-time HMAC-SHA256 signature", async () => {
      const signature = await hmacHex(secret, payload);
      const computed = await hmacHex(secret, payload);

      expect(safeEqual(signature, computed)).toBe(true);
    });

    it("rejects tampered signature payloads in constant time", async () => {
      const validSig = await hmacHex(secret, payload);
      const tamperedSig = await hmacHex(secret, `${orderId}|pay_TAMPERED`);

      expect(safeEqual(validSig, tamperedSig)).toBe(false);
    });

    it("validates payment state machine transitions", () => {
      expect(canTransitionPayment("created", "checkout_pending")).toBe(true);
      expect(canTransitionPayment("checkout_pending", "authorized")).toBe(true);
      expect(canTransitionPayment("authorized", "captured")).toBe(true);
      expect(canTransitionPayment("captured", "refunded")).toBe(true);
      expect(canTransitionPayment("failed", "captured")).toBe(false);
      expect(canTransitionPayment("refunded", "authorized")).toBe(false);

      expect(validatePaymentTransition("created", "checkout_pending").ok).toBe(true);
      expect(validatePaymentTransition("failed", "captured").ok).toBe(false);
    });

    it("verifies minor currency units are strictly integer values", () => {
      expect(() => assertMinorUnits(50000)).not.toThrow();
      expect(() => assertMinorUnits(0)).not.toThrow();
      expect(() => assertMinorUnits(4999.5)).toThrow();
      expect(() => assertMinorUnits(-100)).toThrow();
      expect(() => assertMinorUnits(NaN)).toThrow();
    });
  });
});
