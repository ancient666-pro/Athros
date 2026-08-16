//#region node_modules/.nitro/vite/services/ssr/assets/rate-limit.server-rU31Bdet.js
var MemoryRateLimitStore = class {
	buckets = /* @__PURE__ */ new Map();
	async increment(key, windowMs) {
		const now = Date.now();
		const existing = this.buckets.get(key);
		if (!existing || existing.resetAt <= now) {
			const fresh = {
				count: 1,
				resetAt: now + windowMs
			};
			this.buckets.set(key, fresh);
			if (this.buckets.size > 5e3) this.evict(now);
			return fresh;
		}
		existing.count += 1;
		return existing;
	}
	evict(now) {
		for (const [key, bucket] of this.buckets) if (bucket.resetAt <= now) this.buckets.delete(key);
	}
};
var store = new MemoryRateLimitStore();
async function checkRateLimit(key, limit, windowMs) {
	const { count, resetAt } = await store.increment(key, windowMs);
	return {
		allowed: count <= limit,
		limit,
		remaining: Math.max(0, limit - count),
		resetAt
	};
}
//#endregion
export { checkRateLimit as t };
