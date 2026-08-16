import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { checkRateLimit } from "@/lib/api/rate-limit.server";
import { verifyCheckout } from "@/lib/bookings/bookings.server";

const schema = z.object({
  booking_id: z.string().uuid(),
  razorpay_order_id: z.string().min(1).max(120),
  razorpay_payment_id: z.string().min(1).max(120),
  razorpay_signature: z.string().regex(/^[a-f0-9]{64}$/i),
});
export const Route = createFileRoute("/api/v1/bookings/confirm")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
          if (!(await checkRateLimit(`payment-confirm:${ip}`, 10, 60 * 60_000)).allowed)
            return Response.json(
              { error: { code: "rate_limited", message: "Too many attempts" } },
              { status: 429 },
            );
          const input = schema.parse(await request.json());
          const valid = await verifyCheckout(
            input.booking_id,
            input.razorpay_order_id,
            input.razorpay_payment_id,
            input.razorpay_signature,
          );
          if (!valid)
            return Response.json(
              { error: { code: "invalid_payment", message: "Payment verification failed" } },
              { status: 422 },
            );
          return Response.json({ data: { verified: true, pendingWebhook: true } });
        } catch (error) {
          if (error instanceof z.ZodError)
            return Response.json(
              { error: { code: "unprocessable", message: "Validation failed" } },
              { status: 422 },
            );
          return Response.json(
            {
              error: {
                code: "verification_unavailable",
                message: "Verification could not be completed",
              },
            },
            { status: 503 },
          );
        }
      },
    },
  },
});
