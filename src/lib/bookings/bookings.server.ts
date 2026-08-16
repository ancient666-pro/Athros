import { z } from "zod";
import { hmacHex, safeEqual } from "@/lib/webhooks/webhooks.server";
import { assertMinorUnits } from "@/lib/payments/payments";

export const PACKAGE_ENUM = z.enum(["MVP", "PRODUCTION_READY", "ENTERPRISE"]);
export const REGION_ENUM = z.enum([
  "INDIA",
  "UNITED_STATES",
  "UNITED_KINGDOM",
  "EUROPE",
  "MIDDLE_EAST",
  "SINGAPORE",
]);
export const CURRENCY_ENUM = z.enum(["INR", "USD", "GBP", "EUR", "AED", "SGD"]);

export type PackageType = z.infer<typeof PACKAGE_ENUM>;
export type RegionType = z.infer<typeof REGION_ENUM>;
export type CurrencyType = z.infer<typeof CURRENCY_ENUM>;

export interface PricingDetail {
  package: PackageType;
  region: RegionType;
  currency: CurrencyType;
  full_amount: number; // in minor units (cents / paise)
  token_amount: number; // in minor units (20%)
  token_percentage: number;
}

export const DEFAULT_PRICING_CONFIGS: Record<PackageType, Record<RegionType, PricingDetail>> = {
  MVP: {
    INDIA: {
      package: "MVP",
      region: "INDIA",
      currency: "INR",
      full_amount: 6999900,
      token_amount: 1399980,
      token_percentage: 20,
    },
    UNITED_STATES: {
      package: "MVP",
      region: "UNITED_STATES",
      currency: "USD",
      full_amount: 149900,
      token_amount: 29980,
      token_percentage: 20,
    },
    UNITED_KINGDOM: {
      package: "MVP",
      region: "UNITED_KINGDOM",
      currency: "GBP",
      full_amount: 129900,
      token_amount: 25980,
      token_percentage: 20,
    },
    EUROPE: {
      package: "MVP",
      region: "EUROPE",
      currency: "EUR",
      full_amount: 149900,
      token_amount: 29980,
      token_percentage: 20,
    },
    MIDDLE_EAST: {
      package: "MVP",
      region: "MIDDLE_EAST",
      currency: "AED",
      full_amount: 549900,
      token_amount: 109980,
      token_percentage: 20,
    },
    SINGAPORE: {
      package: "MVP",
      region: "SINGAPORE",
      currency: "SGD",
      full_amount: 199900,
      token_amount: 39980,
      token_percentage: 20,
    },
  },
  PRODUCTION_READY: {
    INDIA: {
      package: "PRODUCTION_READY",
      region: "INDIA",
      currency: "INR",
      full_amount: 19999900,
      token_amount: 3999980,
      token_percentage: 20,
    },
    UNITED_STATES: {
      package: "PRODUCTION_READY",
      region: "UNITED_STATES",
      currency: "USD",
      full_amount: 499900,
      token_amount: 99980,
      token_percentage: 20,
    },
    UNITED_KINGDOM: {
      package: "PRODUCTION_READY",
      region: "UNITED_KINGDOM",
      currency: "GBP",
      full_amount: 429900,
      token_amount: 85980,
      token_percentage: 20,
    },
    EUROPE: {
      package: "PRODUCTION_READY",
      region: "EUROPE",
      currency: "EUR",
      full_amount: 499900,
      token_amount: 99980,
      token_percentage: 20,
    },
    MIDDLE_EAST: {
      package: "PRODUCTION_READY",
      region: "MIDDLE_EAST",
      currency: "AED",
      full_amount: 1799900,
      token_amount: 359980,
      token_percentage: 20,
    },
    SINGAPORE: {
      package: "PRODUCTION_READY",
      region: "SINGAPORE",
      currency: "SGD",
      full_amount: 649900,
      token_amount: 129980,
      token_percentage: 20,
    },
  },
  ENTERPRISE: {
    INDIA: {
      package: "ENTERPRISE",
      region: "INDIA",
      currency: "INR",
      full_amount: 39999900,
      token_amount: 7999980,
      token_percentage: 20,
    },
    UNITED_STATES: {
      package: "ENTERPRISE",
      region: "UNITED_STATES",
      currency: "USD",
      full_amount: 999900,
      token_amount: 199980,
      token_percentage: 20,
    },
    UNITED_KINGDOM: {
      package: "ENTERPRISE",
      region: "UNITED_KINGDOM",
      currency: "GBP",
      full_amount: 859900,
      token_amount: 171980,
      token_percentage: 20,
    },
    EUROPE: {
      package: "ENTERPRISE",
      region: "EUROPE",
      currency: "EUR",
      full_amount: 999900,
      token_amount: 199980,
      token_percentage: 20,
    },
    MIDDLE_EAST: {
      package: "ENTERPRISE",
      region: "MIDDLE_EAST",
      currency: "AED",
      full_amount: 3599900,
      token_amount: 719980,
      token_percentage: 20,
    },
    SINGAPORE: {
      package: "ENTERPRISE",
      region: "SINGAPORE",
      currency: "SGD",
      full_amount: 1299900,
      token_amount: 259980,
      token_percentage: 20,
    },
  },
};

export const bookingSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(32),
  company_name: z.string().trim().max(140).optional(),
  country: z.string().trim().length(2),
  project_type: z.string().trim().min(2).max(80),
  selected_package: PACKAGE_ENUM,
  region: REGION_ENUM.optional(),
  project_summary: z.string().trim().min(20).max(5000),
  estimated_requirements: z.string().trim().max(5000).optional(),
  preferred_contact_method: z.enum(["email", "phone", "whatsapp"]),
  company_website: z.string().url().max(500).optional().or(z.literal("")),
  existing_app_url: z.string().url().max(500).optional().or(z.literal("")),
  reference_links: z.array(z.string().url().max(500)).max(10).default([]),
  terms_accepted: z.literal(true),
});
export type BookingInput = z.infer<typeof bookingSchema>;

type LooseQuery = PromiseLike<{ data: unknown; error: { message: string } | null }> & {
  select: (columns?: string) => LooseQuery;
  single: () => LooseQuery;
  maybeSingle: () => LooseQuery;
  insert: (values: unknown) => LooseQuery;
  update: (values: unknown) => LooseQuery;
  eq: (column: string, value: unknown) => LooseQuery;
  in: (column: string, values: unknown[]) => LooseQuery;
  lte: (column: string, value: unknown) => LooseQuery;
  order: (column: string, options?: unknown) => LooseQuery;
  limit: (count: number) => LooseQuery;
};
type LooseDb = {
  from: (table: string) => LooseQuery;
  rpc: (
    fn: string,
    args: Record<string, unknown>,
  ) => PromiseLike<{ data: unknown; error: { message: string } | null }>;
};
const db = async (): Promise<LooseDb> =>
  (await import("@/integrations/supabase/client.server")).supabaseAdmin as unknown as LooseDb;

export function trustedRegion(
  input: { country: string; region?: RegionType },
  request?: Request,
): RegionType {
  const headerCountry = request?.headers.get("cf-ipcountry")?.toUpperCase();
  const country = headerCountry || input.country.toUpperCase();
  const map: Record<string, RegionType> = {
    IN: "INDIA",
    US: "UNITED_STATES",
    CA: "UNITED_STATES",
    GB: "UNITED_KINGDOM",
    SG: "SINGAPORE",
    MY: "SINGAPORE",
    AE: "MIDDLE_EAST",
    SA: "MIDDLE_EAST",
    QA: "MIDDLE_EAST",
    KW: "MIDDLE_EAST",
    BH: "MIDDLE_EAST",
    OM: "MIDDLE_EAST",
    DE: "EUROPE",
    FR: "EUROPE",
    ES: "EUROPE",
    IT: "EUROPE",
    NL: "EUROPE",
    BE: "EUROPE",
    AT: "EUROPE",
    IE: "EUROPE",
    PT: "EUROPE",
    FI: "EUROPE",
    GR: "EUROPE",
  };
  return map[country] ?? input.region ?? "UNITED_STATES";
}

export async function getPriceForPackage(
  selectedPackage: PackageType,
  region: RegionType,
): Promise<PricingDetail> {
  try {
    const database = await db();
    const priceResult = await database
      .from("pricing_configurations")
      .select("package, region, currency, full_amount, token_amount, token_percentage")
      .eq("package", selectedPackage)
      .eq("region", region)
      .eq("active", true)
      .lte("effective_from", new Date().toISOString())
      .order("effective_from", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (priceResult?.data) {
      const row = priceResult.data as PricingDetail;
      assertMinorUnits(row.token_amount);
      return row;
    }
  } catch {
    // Fall back to deterministic server matrix
  }

  const fallback = DEFAULT_PRICING_CONFIGS[selectedPackage]?.[region];
  if (!fallback) throw new Error("No active price is available for this region");
  assertMinorUnits(fallback.token_amount);
  return fallback;
}

export async function razorpayOrder(amount: number, currency: string, receipt: string) {
  const key = process.env["RAZORPAY_KEY_ID"];
  const secret = process.env["RAZORPAY_KEY_SECRET"];

  if (!key || !secret) {
    if (process.env.NODE_ENV !== "production") {
      const mockId = `order_test_${crypto.randomUUID().replaceAll("-", "").slice(0, 14)}`;
      return { id: mockId, amount, currency };
    }
    throw new Error("Razorpay is not configured");
  }

  const auth = btoa(`${key}:${secret}`);
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { authorization: `Basic ${auth}`, "content-type": "application/json" },
    body: JSON.stringify({ amount, currency, receipt, payment_capture: 1 }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Razorpay order creation failed: ${response.status} ${errText}`);
  }

  return z
    .object({ id: z.string().min(1), amount: z.number().int(), currency: z.string().length(3) })
    .parse(await response.json());
}

export async function createBooking(input: BookingInput, request: Request, userId: string | null) {
  const region = trustedRegion(input, request);
  const price = await getPriceForPackage(input.selected_package, region);
  const number = `ATH-${new Date().getUTCFullYear()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
  const order = await razorpayOrder(price.token_amount, price.currency, number);

  let bookingId: string = crypto.randomUUID();
  try {
    const database = await db();
    const insert = await database
      .from("project_bookings")
      .insert({
        booking_number: number,
        user_id: userId,
        package: input.selected_package,
        region,
        currency: price.currency,
        full_amount: price.full_amount,
        token_amount: price.token_amount,
        token_percentage: price.token_percentage,
        razorpay_order_id: order.id,
        customer_name: input.full_name,
        customer_email: input.email.toLowerCase(),
        customer_phone: input.phone.replace(/\s+/g, ""),
        company_name: input.company_name ?? null,
        country: input.country.toUpperCase(),
        project_type: input.project_type,
        project_summary: input.project_summary,
        estimated_requirements: input.estimated_requirements ?? null,
        preferred_contact_method: input.preferred_contact_method,
        company_website: input.company_website || null,
        existing_app_url: input.existing_app_url || null,
        reference_links: input.reference_links,
        terms_accepted_at: new Date().toISOString(),
      })
      .select("id, booking_number")
      .single();

    if (insert.data) {
      bookingId = (insert.data as { id: string }).id;
      await database.from("booking_payments").insert({
        booking_id: bookingId,
        provider_order_id: order.id,
        amount: price.token_amount,
        currency: price.currency,
      });
    }
  } catch (dbError) {
    console.warn("[createBooking] DB insert skipped or deferred:", dbError);
  }

  return {
    bookingId,
    bookingNumber: number,
    orderId: order.id,
    keyId: process.env["RAZORPAY_KEY_ID"] ?? "rzp_test_placeholder",
    amount: order.amount,
    currency: order.currency,
    fullAmount: price.full_amount,
    tokenAmount: price.token_amount,
    tokenPercentage: price.token_percentage,
    packageName: input.selected_package,
    customerName: input.full_name,
    customerEmail: input.email,
  };
}

export async function verifyCheckout(
  bookingId: string,
  orderId: string,
  paymentId: string,
  signature: string,
): Promise<boolean> {
  const secret = process.env["RAZORPAY_KEY_SECRET"];
  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    throw new Error("Razorpay is not configured");
  }

  try {
    const database = await db();
    const result = await database
      .from("project_bookings")
      .select("id, razorpay_order_id")
      .eq("id", bookingId)
      .maybeSingle();

    const booking = result?.data as { id: string; razorpay_order_id: string } | null;
    if (booking && booking.razorpay_order_id !== orderId) return false;
  } catch {
    // If DB check is unavailable, proceed with HMAC signature verification
  }

  const expectedSignature = await hmacHex(secret, `${orderId}|${paymentId}`);
  return safeEqual(expectedSignature, signature);
}

export async function processRazorpayPayment(
  event: unknown,
): Promise<{ ok: boolean; reason?: string }> {
  const parsed = z
    .object({
      event: z.string(),
      payload: z.object({
        payment: z.object({
          entity: z.object({
            id: z.string(),
            order_id: z.string(),
            amount: z.number().int(),
            currency: CURRENCY_ENUM,
            status: z.string(),
          }),
        }),
      }),
    })
    .safeParse(event);

  if (!parsed.success) return { ok: false, reason: "Malformed Razorpay payload" };
  const payment = parsed.data.payload.payment.entity;
  const database = await db();

  const lookup = await database
    .from("project_bookings")
    .select(
      "id, full_amount, token_amount, currency, status, project_id, user_id, customer_name, customer_email, customer_phone, company_name, booking_number, package, region, project_summary",
    )
    .eq("razorpay_order_id", payment.order_id)
    .maybeSingle();

  const booking = lookup?.data as {
    id: string;
    full_amount: number;
    token_amount: number;
    currency: string;
    status: string;
    project_id: string | null;
    user_id: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    company_name: string | null;
    booking_number: string;
    package: string;
    region: string;
    project_summary: string;
  } | null;

  if (lookup?.error || !booking) return { ok: false, reason: "Unknown order" };

  if (payment.amount !== booking.token_amount || payment.currency !== booking.currency) {
    await database
      .from("project_bookings")
      .update({ status: "PAYMENT_REVIEW_REQUIRED", payment_status: "failed" })
      .eq("id", booking.id);
    return { ok: false, reason: "Amount or currency mismatch" };
  }

  const captured = ["payment.captured", "order.paid"].includes(parsed.data.event);
  const status = captured
    ? "captured"
    : parsed.data.event === "payment.failed"
      ? "failed"
      : "authorized";

  await database
    .from("booking_payments")
    .update({
      provider_payment_id: payment.id,
      status,
      captured_at: captured ? new Date().toISOString() : null,
      metadata: { event: parsed.data.event },
    })
    .eq("provider_order_id", payment.order_id);

  if (!captured || booking.status === "TOKEN_PAID") return { ok: true };

  const projectResult = booking.project_id
    ? { data: { id: booking.project_id } }
    : await database
        .from("projects")
        .insert({
          client_id: booking.user_id,
          name: `Athros project ${booking.booking_number}`,
          summary: booking.project_summary,
          package: booking.package,
          region: booking.region,
          currency: booking.currency,
          status: "discovery",
          progress: 0,
        })
        .select("id")
        .single();

  const project = projectResult?.data as { id: string } | null;
  if (!project) return { ok: false, reason: "Project activation failed" };

  await database
    .from("project_bookings")
    .update({
      status: "TOKEN_PAID",
      payment_status: "captured",
      razorpay_payment_id: payment.id,
      project_id: project.id,
      paid_at: new Date().toISOString(),
    })
    .eq("id", booking.id);

  await database.from("audit_logs").insert({
    action: "booking.token_paid",
    entity: "project_booking",
    entity_id: booking.id,
    detail: { projectId: project.id, paymentId: payment.id },
  });

  const { enqueue } = await import("@/lib/queue/queue.server");
  const adminEmail = process.env["ATHROS_ADMIN_EMAIL"];
  const dashboardUrl = process.env["APP_URL"] ? `${process.env["APP_URL"]}/dashboard` : undefined;
  const tokenFormatted = `${booking.currency} ${(booking.token_amount / 100).toLocaleString()}`;
  const totalFormatted = `${booking.currency} ${(booking.full_amount / 100).toLocaleString()}`;
  const remainingFormatted = `${booking.currency} ${((booking.full_amount - booking.token_amount) / 100).toLocaleString()}`;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const messages: Record<string, unknown>[] = [
    {
      template: "booking.confirmation",
      to_email: booking.customer_email,
      subject: "Your Athros project booking is confirmed",
      project_id: project.id,
      payload: {
        bookingNumber: booking.booking_number,
        customerName: booking.customer_name,
        packageName: booking.package,
        tokenAmount: tokenFormatted,
        totalAmount: totalFormatted,
        remainingBalance: remainingFormatted,
        expectedNextStep:
          "Our senior engineering team has received your brief and is setting up the discovery and architecture phase.",
        dashboardUrl,
        contactEmail: "build@athros.dev",
        contactPhone: "+1 (315) 482-0199",
      },
      status: "pending",
    },
  ];

  if (adminEmail) {
    messages.push({
      template: "booking.admin-notification",
      to_email: adminEmail,
      subject: "New Athros Project Booking — Token Payment Received",
      project_id: project.id,
      payload: {
        bookingNumber: booking.booking_number,
        customerName: booking.customer_name,
        customerEmail: booking.customer_email,
        customerPhone: booking.customer_phone,
        company: booking.company_name ?? undefined,
        packageName: booking.package,
        region: booking.region,
        totalPrice: totalFormatted,
        tokenAmount: tokenFormatted,
        amount: tokenFormatted,
        currency: booking.currency,
        razorpayOrderId: payment.order_id,
        razorpayPaymentId: payment.id,
        paymentId: payment.id,
        paymentStatus: status,
        projectId: project.id,
        timestamp: new Date().toISOString(),
      },
      status: "pending",
    });
  }

  const queued = await supabaseAdmin
    .from("email_messages")
    .insert(messages as never)
    .select("id");

  for (const row of (queued?.data ?? []) as { id: string }[]) {
    await enqueue("email", { messageId: row.id }).catch(() => undefined);
  }

  return { ok: true };
}
