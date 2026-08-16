import { createFileRoute } from "@tanstack/react-router";
import { safeEqual } from "@/lib/webhooks/webhooks.server";

export const Route = createFileRoute("/api/v1/worker")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WORKER_TICK_SECRET"];
        const supplied = request.headers.get("x-worker-secret") ?? "";
        if (!secret || !safeEqual(secret, supplied))
          return Response.json(
            { error: { code: "unauthorized", message: "Unauthorized" } },
            { status: 401 },
          );
        const { runWorkerTick } = await import("@/lib/queue/handlers.server");
        const result = await runWorkerTick();
        return Response.json({ data: result }, { headers: { "cache-control": "no-store" } });
      },
    },
  },
});
