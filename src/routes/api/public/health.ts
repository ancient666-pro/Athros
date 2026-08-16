import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/health")({
  server: {
    handlers: {
      GET: async () => {
        const timestamp = new Date().toISOString();
        let database = "unavailable";
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("currencies").select("code").limit(1);
          database = error ? "unavailable" : "ok";
        } catch {
          database = "unavailable";
        }
        const healthy = database === "ok";
        return Response.json(
          {
            status: healthy ? "ok" : "degraded",
            readiness: healthy ? "ready" : "not_ready",
            database,
            version: process.env["APP_VERSION"] ?? "unknown",
            timestamp,
          },
          {
            status: healthy ? 200 : 503,
            headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
          },
        );
      },
    },
  },
});
