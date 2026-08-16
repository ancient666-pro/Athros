import { c as recordType, l as stringType, u as unknownType } from "../_libs/zod.mjs";
import { t as logger } from "./logger.server--Vgc5D2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queue.server-Bldku9ej.js
/** Durable queue names. Client-safe (types + names only). */
var QUEUES = [
	"email",
	"notification",
	"webhook-retry",
	"invoice-generation",
	"session-cleanup",
	"storage-cleanup",
	"audit-cleanup",
	"payment"
];
recordType(stringType(), unknownType());
var WORKER_ID = `worker-${crypto.randomUUID().slice(0, 8)}`;
var BACKOFF_MS = [
	5e3,
	3e4,
	12e4,
	6e5,
	18e5
];
var PostgresQueueDriver = class {
	async db() {
		const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
		return supabaseAdmin;
	}
	async enqueue(queue, payload, options = {}) {
		const { data, error } = await (await this.db()).from("job_queue").insert({
			queue,
			payload,
			run_at: (options.runAt ?? /* @__PURE__ */ new Date()).toISOString(),
			priority: options.priority ?? 0,
			max_attempts: options.maxAttempts ?? 5
		}).select("id").single();
		if (error) throw new Error(`enqueue failed: ${error.message}`);
		return data.id;
	}
	async claim(queue, limit) {
		const db = await this.db();
		const { data, error } = await db.from("job_queue").select("id, queue, payload, attempts, max_attempts").eq("queue", queue).eq("status", "pending").lte("run_at", (/* @__PURE__ */ new Date()).toISOString()).order("priority", { ascending: false }).order("run_at", { ascending: true }).limit(limit);
		if (error) throw new Error(`claim failed: ${error.message}`);
		const claimed = [];
		for (const row of data ?? []) {
			const { data: locked } = await db.from("job_queue").update({
				status: "running",
				locked_at: (/* @__PURE__ */ new Date()).toISOString(),
				locked_by: WORKER_ID,
				attempts: row.attempts + 1
			}).eq("id", row.id).eq("status", "pending").select("id").maybeSingle();
			if (!locked) continue;
			claimed.push({
				id: row.id,
				queue: row.queue,
				payload: row.payload ?? {},
				attempts: row.attempts + 1,
				maxAttempts: row.max_attempts
			});
		}
		return claimed;
	}
	async complete(jobId) {
		await (await this.db()).from("job_queue").update({
			status: "completed",
			completed_at: (/* @__PURE__ */ new Date()).toISOString(),
			locked_by: null
		}).eq("id", jobId);
	}
	async fail(jobId, error, attempts, maxAttempts) {
		const db = await this.db();
		const exhausted = attempts >= maxAttempts;
		const delay = BACKOFF_MS[Math.min(attempts - 1, BACKOFF_MS.length - 1)] ?? 6e4;
		await db.from("job_queue").update({
			status: exhausted ? "failed" : "pending",
			last_error: error.slice(0, 1e3),
			run_at: new Date(Date.now() + delay).toISOString(),
			locked_by: null,
			locked_at: null
		}).eq("id", jobId);
	}
	async depth() {
		const { count } = await (await this.db()).from("job_queue").select("id", {
			count: "exact",
			head: true
		}).eq("status", "pending");
		return count ?? 0;
	}
};
var driver = new PostgresQueueDriver();
var handlers = /* @__PURE__ */ new Map();
function registerJobHandler(queue, handler) {
	handlers.set(queue, handler);
}
function enqueue(queue, payload, options) {
	return driver.enqueue(queue, payload, options);
}
/** Processes due jobs for one queue (or every queue) — safe to call from cron. */
async function drainQueues(queue, batchSize = 10) {
	const targets = queue ? [queue] : [...QUEUES];
	const log = logger.channel("queue");
	let processed = 0;
	let failed = 0;
	for (const name of targets) {
		const handler = handlers.get(name);
		if (!handler) continue;
		const jobs = await driver.claim(name, batchSize);
		for (const job of jobs) try {
			await handler(job);
			await driver.complete(job.id);
			processed += 1;
		} catch (error) {
			failed += 1;
			const message = error instanceof Error ? error.message : String(error);
			await driver.fail(job.id, message, job.attempts, job.maxAttempts);
			log.error(`job failed: ${name}`, error, {
				jobId: job.id,
				attempts: job.attempts
			});
		}
	}
	return {
		processed,
		failed
	};
}
//#endregion
export { drainQueues, enqueue, registerJobHandler };
