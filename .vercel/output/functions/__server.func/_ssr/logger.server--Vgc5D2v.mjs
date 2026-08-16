//#region node_modules/.nitro/vite/services/ssr/assets/logger.server--Vgc5D2v.js
var SENSITIVE = /(password|token|secret|authorization|apikey|api_key|cookie)/i;
function scrub(context) {
	const out = {};
	for (const [key, value] of Object.entries(context)) out[key] = SENSITIVE.test(key) ? "[redacted]" : value;
	return out;
}
var ConsoleSink = class {
	write(entry) {
		const line = JSON.stringify({
			ts: (/* @__PURE__ */ new Date()).toISOString(),
			level: entry.level,
			channel: entry.channel,
			msg: entry.message,
			...scrub(entry.context),
			...entry.error instanceof Error ? {
				err: entry.error.message,
				stack: entry.error.stack
			} : entry.error !== void 0 ? { err: String(entry.error) } : {}
		});
		if (entry.level === "error") console.error(line);
		else if (entry.level === "warn") console.warn(line);
		else console.info(line);
	}
};
/** Persists warn/error and security/audit entries into `app_logs`, best effort. */
var DatabaseSink = class {
	async write(entry) {
		if (!(entry.level === "error" || entry.level === "warn" || entry.channel === "security" || entry.channel === "performance")) return;
		try {
			const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
			await supabaseAdmin.from("app_logs").insert({
				level: entry.level,
				channel: entry.channel,
				message: entry.message.slice(0, 2e3),
				request_id: entry.context.requestId ?? null,
				correlation_id: entry.context.correlationId ?? null,
				user_id: entry.context.userId ?? null,
				duration_ms: entry.context.durationMs ?? null,
				context: scrub(entry.context)
			});
		} catch {}
	}
};
var sinks = [new ConsoleSink(), new DatabaseSink()];
function emit(level, channel, message, context = {}, error) {
	for (const sink of sinks) sink.write({
		level,
		channel,
		message,
		context,
		error
	});
}
var logger = {
	debug: (message, context) => emit("debug", "app", message, context),
	info: (message, context) => emit("info", "app", message, context),
	warn: (message, context) => emit("warn", "app", message, context),
	error: (message, error, context) => emit("error", "app", message, context, error),
	channel: (channel) => ({
		info: (message, context) => emit("info", channel, message, context),
		warn: (message, context) => emit("warn", channel, message, context),
		error: (message, error, context) => emit("error", channel, message, context, error)
	})
};
//#endregion
export { logger as t };
