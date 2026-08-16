import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { checkRateLimit } from "@/lib/api/rate-limit.server";
import { bookingSchema, createBooking } from "@/lib/bookings/bookings.server";

export const Route = createFileRoute("/api/v1/bookings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get("cf-connecting-ip") ??
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "unknown";
          if (!(await checkRateLimit(`booking:${ip}`, 5, 60 * 60_000)).allowed)
            return Response.json(
              { error: { code: "rate_limited", message: "Too many booking attempts" } },
              { status: 429 },
            );
          const body = await request.json().catch(() => null);
          const input = bookingSchema.parse(body);
          const output = await createBooking(input, request, null);
          return Response.json(
            { data: output },
            { status: 201, headers: { "cache-control": "no-store" } },
          );
        } catch (error) {
          if (error instanceof z.ZodError)
            return Response.json(
              {
                error: {
                  code: "unprocessable",
                  message: "Validation failed",
                  details: error.issues,
                },
              },
              { status: 422 },
            );
          return Response.json(
            { error: { code: "booking_unavailable", message: "Booking could not be created" } },
            { status: 503 },
          );
        }
      },
    },
  },
});
