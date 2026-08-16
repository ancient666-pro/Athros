import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  bookingSchema,
  createBooking,
  verifyCheckout,
  getPriceForPackage,
  trustedRegion,
  PACKAGE_ENUM,
  REGION_ENUM,
  type BookingInput,
} from "./bookings.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getPackagePrice = createServerFn({ method: "GET" })
  .validator((data: unknown) =>
    z
      .object({
        package: PACKAGE_ENUM,
        country: z.string().optional(),
        region: REGION_ENUM.optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const request = getRequest();
    const region = trustedRegion({ country: data.country ?? "US", region: data.region }, request);
    const pricing = await getPriceForPackage(data.package, region);

    return {
      package: pricing.package,
      region: pricing.region,
      currency: pricing.currency,
      fullAmount: pricing.full_amount,
      tokenAmount: pricing.token_amount,
      tokenPercentage: pricing.token_percentage,
      remainingAmount: pricing.full_amount - pricing.token_amount,
      formattedFull: `${pricing.currency} ${(pricing.full_amount / 100).toLocaleString()}`,
      formattedToken: `${pricing.currency} ${(pricing.token_amount / 100).toLocaleString()}`,
      formattedRemaining: `${pricing.currency} ${((pricing.full_amount - pricing.token_amount) / 100).toLocaleString()}`,
    };
  });

export const submitBookingForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    if (!request) throw new Error("Request context unavailable");
    return createBooking(data as BookingInput, request, null);
  });

export const confirmBookingPayment = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        bookingId: z.string().uuid(),
        orderId: z.string().min(1),
        paymentId: z.string().min(1),
        signature: z.string().min(1),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const verified = await verifyCheckout(
      data.bookingId,
      data.orderId,
      data.paymentId,
      data.signature,
    );
    if (!verified) throw new Error("Payment verification failed");
    return { verified: true };
  });

export interface AdminBookingRecord {
  id: string;
  booking_number: string;
  user_id: string | null;
  package: string;
  region: string;
  currency: string;
  full_amount: number;
  token_amount: number;
  token_percentage: number;
  status: string;
  payment_status: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company_name: string | null;
  country: string;
  project_type: string;
  project_summary: string;
  estimated_requirements: string | null;
  preferred_contact_method: string;
  company_website: string | null;
  existing_app_url: string | null;
  reference_links: string[];
  terms_accepted_at: string;
  created_at: string;
  paid_at: string | null;
  project_id: string | null;
}

export const getAdminBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ bookings: AdminBookingRecord[] }> => {
    const { supabase, userId } = context;
    const { data: isStaff } = await supabase.rpc("is_staff", { _user_id: userId });
    if (!isStaff) throw new Error("Forbidden");

    try {
      const { data: bookings } = await (supabase as any)
        .from("project_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      return { bookings: (bookings as AdminBookingRecord[]) ?? [] };
    } catch {
      return { bookings: [] };
    }
  });
