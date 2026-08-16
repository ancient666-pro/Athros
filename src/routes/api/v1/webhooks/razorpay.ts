import { createFileRoute } from "@tanstack/react-router";
import {
  hmacHex,
  safeEqual,
  ingestWebhook,
  registerWebhookHandler,
} from "@/lib/webhooks/webhooks.server";
import { processRazorpayPayment } from "@/lib/bookings/bookings.server";

let registered = false;
function register(): void {
  if (!registered) {
    registerWebhookHandler("razorpay", async ({ payload }) => processRazorpayPayment(payload));
    registered = true;
  }
}
export const Route = createFileRoute("/api/v1/webhooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await request.text();
        const secret = process.env["RAZORPAY_WEBHOOK_SECRET"];
        const signature = request.headers.get("x-razorpay-signature") ?? "";
        const verified =
          Boolean(secret) && safeEqual(await hmacHex(secret as string, rawBody), signature);
        let eventType: string | null = null;
        let externalId: string | null = null;
        try {
          const event = JSON.parse(rawBody) as {
            event?: string;
            payload?: { payment?: { entity?: { id?: string } } };
          };
          eventType = event.event ?? null;
          externalId = event.payload?.payment?.entity?.id
            ? `${event.event}:${event.payload.payment.entity.id}`
            : null;
        } catch {
          return Response.json(
            { error: { code: "bad_request", message: "Malformed payload" } },
            { status: 400 },
          );
        }
        register();
        const result = await ingestWebhook({
          provider: "razorpay",
          rawBody,
          headers: Object.fromEntries(request.headers),
          signatureVerified: verified,
          eventType,
          externalId,
        });
        return Response.json(result.body, { status: result.status });
      },
    },
  },
});
