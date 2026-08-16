import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  bookingSchema,
  createBooking,
  verifyCheckout,
  processRazorpayPayment,
  getPriceForPackage,
  trustedRegion,
  DEFAULT_PRICING_CONFIGS,
  type BookingInput,
} from "../bookings.server";
import { hmacHex, safeEqual } from "@/lib/webhooks/webhooks.server";
import {
  canTransitionPayment,
  validatePaymentTransition,
  assertMinorUnits,
  PAYMENT_STATUSES,
} from "@/lib/payments/payments";
import { EMAIL_TEMPLATES } from "@/lib/email/templates";

describe("Phase 1: Booking & Payment Flow Tests", () => {
  const validBookingInput: BookingInput = {
    full_name: "Bruce Wayne",
    email: "bruce@wayneenterprises.com",
    phone: "+13154820199",
    company_name: "Wayne Enterprises",
    country: "US",
    project_type: "Dual Native (Android + iOS)",
    selected_package: "PRODUCTION_READY",
    project_summary:
      "We need a secure enterprise mobile application with biometric login and real-time alerts.",
    preferred_contact_method: "email",
    company_website: "https://wayneenterprises.com",
    existing_app_url: "https://app.wayneenterprises.com",
    reference_links: ["https://figma.com/file/123", "https://github.com/wayne/app"],
    terms_accepted: true,
  };

  describe("1. Booking Validation & Schema Rules", () => {
    it("accepts a completely valid booking payload", () => {
      const parsed = bookingSchema.safeParse(validBookingInput);
      expect(parsed.success).toBe(true);
    });

    it("rejects booking with invalid email format", () => {
      const invalid = { ...validBookingInput, email: "invalid-email-address" };
      const parsed = bookingSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues.some((i) => i.path.includes("email"))).toBe(true);
      }
    });

    it("rejects booking if project summary is shorter than 20 characters", () => {
      const invalid = { ...validBookingInput, project_summary: "Too short" };
      const parsed = bookingSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues.some((i) => i.path.includes("project_summary"))).toBe(true);
      }
    });

    it("rejects booking if terms are not accepted", () => {
      const invalid = { ...validBookingInput, terms_accepted: false as any };
      const parsed = bookingSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });

    it("rejects invalid package type", () => {
      const invalid = { ...validBookingInput, selected_package: "SUPER_PREMIUM" as any };
      const parsed = bookingSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });

    it("handles optional fields properly (company website, existing app url)", () => {
      const minimal = {
        full_name: "Clark Kent",
        email: "clark@dailyplanet.com",
        phone: "+13154820100",
        country: "US",
        project_type: "Native iOS app",
        selected_package: "MVP" as const,
        project_summary: "A reporting and news dissemination app with instant push notifications.",
        preferred_contact_method: "phone" as const,
        reference_links: [],
        terms_accepted: true as const,
      };
      const parsed = bookingSchema.safeParse(minimal);
      expect(parsed.success).toBe(true);
    });
  });

  describe("2. Server-Authoritative Regional Pricing & Tampering Prevention", () => {
    it("correctly maps country to trusted region", () => {
      expect(trustedRegion({ country: "IN" })).toBe("INDIA");
      expect(trustedRegion({ country: "US" })).toBe("UNITED_STATES");
      expect(trustedRegion({ country: "CA" })).toBe("UNITED_STATES");
      expect(trustedRegion({ country: "GB" })).toBe("UNITED_KINGDOM");
      expect(trustedRegion({ country: "DE" })).toBe("EUROPE");
      expect(trustedRegion({ country: "FR" })).toBe("EUROPE");
      expect(trustedRegion({ country: "AE" })).toBe("MIDDLE_EAST");
      expect(trustedRegion({ country: "SA" })).toBe("MIDDLE_EAST");
      expect(trustedRegion({ country: "SG" })).toBe("SINGAPORE");
    });

    it("calculates accurate 20% token deposit across all packages and currencies", async () => {
      // Production ready in India
      const inrPricing = await getPriceForPackage("PRODUCTION_READY", "INDIA");
      expect(inrPricing.currency).toBe("INR");
      expect(inrPricing.full_amount).toBe(19999900); // ₹1,99,999.00
      expect(inrPricing.token_amount).toBe(3999980); // ₹39,999.80 (20%)
      expect(inrPricing.token_percentage).toBe(20);

      // MVP in US
      const usdPricing = await getPriceForPackage("MVP", "UNITED_STATES");
      expect(usdPricing.currency).toBe("USD");
      expect(usdPricing.full_amount).toBe(149900); // $1,499.00
      expect(usdPricing.token_amount).toBe(29980); // $299.80 (20%)

      // Enterprise in UK
      const gbpPricing = await getPriceForPackage("ENTERPRISE", "UNITED_KINGDOM");
      expect(gbpPricing.currency).toBe("GBP");
      expect(gbpPricing.full_amount).toBe(859900); // £8,599.00
      expect(gbpPricing.token_amount).toBe(171980); // £1,719.80 (20%)

      // Europe EUR
      const eurPricing = await getPriceForPackage("PRODUCTION_READY", "EUROPE");
      expect(eurPricing.currency).toBe("EUR");
      expect(eurPricing.full_amount).toBe(499900); // €4,999.00
      expect(eurPricing.token_amount).toBe(99980); // €999.80 (20%)

      // Singapore SGD
      const sgdPricing = await getPriceForPackage("MVP", "SINGAPORE");
      expect(sgdPricing.currency).toBe("SGD");
      expect(sgdPricing.full_amount).toBe(199900); // SGD 1,999.00
      expect(sgdPricing.token_amount).toBe(39980); // SGD 399.80 (20%)

      // Middle East AED
      const aedPricing = await getPriceForPackage("PRODUCTION_READY", "MIDDLE_EAST");
      expect(aedPricing.currency).toBe("AED");
      expect(aedPricing.full_amount).toBe(1799900); // AED 17,999.00
      expect(aedPricing.token_amount).toBe(359980); // AED 3,599.80 (20%)
    });

    it("enforces integer minor units for financial safety", () => {
      expect(() => assertMinorUnits(3999980)).not.toThrow();
      expect(() => assertMinorUnits(0)).not.toThrow();
      expect(() => assertMinorUnits(-100)).toThrow();
      expect(() => assertMinorUnits(12.5)).toThrow();
      expect(() => assertMinorUnits(NaN)).toThrow();
    });

    it("ignores any client-provided price or currency", async () => {
      const spoofedClientPayload = {
        ...validBookingInput,
        clientPrice: 100, // Attempting to pay $1
        clientCurrency: "JPY",
      };
      const parsed = bookingSchema.parse(spoofedClientPayload);
      // Client price was stripped by schema
      expect((parsed as any).clientPrice).toBeUndefined();

      // Server calculates pricing solely from package + region
      const serverPrice = await getPriceForPackage(parsed.selected_package, "UNITED_STATES");
      expect(serverPrice.full_amount).toBe(499900);
      expect(serverPrice.token_amount).toBe(99980);
    });
  });

  describe("3. Razorpay Signature Verification & Payment Confirmation", () => {
    const testSecret = "rzp_secret_test_xyz123456789";
    const orderId = "order_N1234567890ABC";
    const paymentId = "pay_P9876543210XYZ";

    beforeEach(() => {
      process.env["RAZORPAY_KEY_SECRET"] = testSecret;
      process.env["RAZORPAY_KEY_ID"] = "rzp_test_key123";
    });

    it("verifies genuine HMAC SHA-256 Razorpay signature", async () => {
      const payload = `${orderId}|${paymentId}`;
      const validSignature = await hmacHex(testSecret, payload);

      const isValid = await verifyCheckout("mock-booking-id", orderId, paymentId, validSignature);
      expect(isValid).toBe(true);
    });

    it("rejects forged or modified Razorpay signature", async () => {
      const forgedSignature = "0000000000000000000000000000000000000000000000000000000000000000";
      const isValid = await verifyCheckout("mock-booking-id", orderId, paymentId, forgedSignature);
      expect(isValid).toBe(false);
    });

    it("rejects signature generated with wrong secret", async () => {
      const wrongSecret = "wrong_secret_abc123";
      const signatureWithWrongSecret = await hmacHex(wrongSecret, `${orderId}|${paymentId}`);
      const isValid = await verifyCheckout(
        "mock-booking-id",
        orderId,
        paymentId,
        signatureWithWrongSecret,
      );
      expect(isValid).toBe(false);
    });

    it("timing-safe comparison rejects different length or content strings", () => {
      expect(safeEqual("abcdef", "abcdef")).toBe(true);
      expect(safeEqual("abcdef", "abcdeg")).toBe(false);
      expect(safeEqual("abcdef", "abcde")).toBe(false);
    });
  });

  describe("4. Webhook Processing & Idempotency", () => {
    it("validates malformed webhook payload rejection", async () => {
      const malformed = { some: "garbage", data: 123 };
      const result = await processRazorpayPayment(malformed);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe("Malformed Razorpay payload");
    });

    it("validates payment state machine transitions", () => {
      expect(canTransitionPayment("created", "checkout_pending")).toBe(true);
      expect(canTransitionPayment("checkout_pending", "captured" as any)).toBe(false); // must go pending/authorized
      expect(canTransitionPayment("authorized", "captured")).toBe(true);
      expect(canTransitionPayment("captured", "refunded")).toBe(true);

      // Idempotent transitions (same state to same state) are allowed as no-ops
      const check = validatePaymentTransition("captured", "captured");
      expect(check.ok).toBe(true);
      expect(check.noop).toBe(true);

      // Illegal transition
      const illegal = validatePaymentTransition("refunded", "captured");
      expect(illegal.ok).toBe(false);
      expect(illegal.noop).toBe(false);
    });
  });

  describe("5. Email Notification Template Validation", () => {
    it("validates customer confirmation email schema", () => {
      const payload = {
        bookingNumber: "ATH-2026-ABC1234567",
        customerName: "Bruce Wayne",
        packageName: "PRODUCTION_READY",
        tokenAmount: "USD $999.80",
        totalAmount: "USD $4,999.00",
        remainingBalance: "USD $3,999.20",
        expectedNextStep: "Kickoff call within 4 hours",
        dashboardUrl: "https://athros.dev/dashboard",
        contactEmail: "build@athros.dev",
      };

      const parsed = EMAIL_TEMPLATES["booking.confirmation"].safeParse(payload);
      expect(parsed.success).toBe(true);
    });

    it("validates admin notification email schema", () => {
      const adminPayload = {
        bookingNumber: "ATH-2026-ABC1234567",
        customerName: "Bruce Wayne",
        customerEmail: "bruce@wayneenterprises.com",
        customerPhone: "+13154820199",
        company: "Wayne Enterprises",
        packageName: "PRODUCTION_READY",
        region: "UNITED_STATES",
        totalPrice: "USD $4,999.00",
        tokenAmount: "USD $999.80",
        amount: "USD $999.80",
        currency: "USD",
        razorpayOrderId: "order_N1234567890ABC",
        razorpayPaymentId: "pay_P9876543210XYZ",
        paymentId: "pay_P9876543210XYZ",
        paymentStatus: "captured",
        projectId: "11111111-2222-3333-4444-555555555555",
        timestamp: new Date().toISOString(),
      };

      const parsed = EMAIL_TEMPLATES["booking.admin-notification"].safeParse(adminPayload);
      expect(parsed.success).toBe(true);
    });
  });
});
