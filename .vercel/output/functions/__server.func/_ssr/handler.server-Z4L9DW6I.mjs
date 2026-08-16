import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as recordType, d as ZodError, i as enumType, l as stringType, n as booleanType, o as numberType, r as coerce, s as objectType, t as arrayType, u as unknownType } from "../_libs/zod.mjs";
import { t as checkRateLimit } from "./rate-limit.server-rU31Bdet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/handler.server-Z4L9DW6I.js
var STATUS = {
	bad_request: 400,
	unauthorized: 401,
	forbidden: 403,
	not_found: 404,
	conflict: 409,
	unprocessable: 422,
	rate_limited: 429,
	internal: 500
};
var ApiError = class extends Error {
	code;
	status;
	details;
	constructor(code, message, details) {
		super(message);
		this.name = "ApiError";
		this.code = code;
		this.status = STATUS[code];
		this.details = details ?? null;
	}
};
var badRequest = (message, details) => new ApiError("bad_request", message, details);
var unauthorized = (message = "Authentication required") => new ApiError("unauthorized", message);
var forbidden = (message = "You do not have access to this resource") => new ApiError("forbidden", message);
var notFound = (message = "Resource not found") => new ApiError("not_found", message);
function bearerFrom(request) {
	const header = request.headers.get("authorization");
	if (!header) return null;
	const [scheme, token] = header.split(" ");
	if (scheme?.toLowerCase() !== "bearer" || !token) return null;
	return token;
}
function requestIp(request) {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
	return request.headers.get("cf-connecting-ip");
}
/** Supabase client bound to the caller's bearer token — every query runs under RLS as that user. */
function userClient(accessToken) {
	const url = process.env["SUPABASE_URL"];
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!url || !key) throw new Error("Supabase server environment is not configured");
	return createClient(url, key, {
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			headers.set("apikey", key);
			headers.set("Authorization", `Bearer ${accessToken}`);
			return fetch(input, {
				...init,
				headers
			});
		} }
	});
}
/** Authenticates the request and resolves the caller's role/permission matrix. */
async function authenticate(request) {
	const token = bearerFrom(request);
	if (!token) throw unauthorized();
	const db = userClient(token);
	const { data: userData, error: userError } = await db.auth.getUser(token);
	if (userError || !userData.user) throw unauthorized("Invalid or expired session");
	const userId = userData.user.id;
	const [{ data: roleRows }, { data: roleCatalogue }] = await Promise.all([db.from("user_roles").select("role").eq("user_id", userId), db.from("roles").select("name, permissions")]);
	const roles = (roleRows ?? []).map((row) => String(row.role));
	const permissions = /* @__PURE__ */ new Set();
	for (const entry of roleCatalogue ?? []) {
		if (!roles.includes(String(entry.name))) continue;
		for (const permission of entry.permissions ?? []) permissions.add(permission);
	}
	return {
		db,
		identity: {
			userId,
			email: userData.user.email ?? null,
			roles,
			permissions,
			isAdmin: roles.includes("admin") || roles.includes("super_admin"),
			ip: requestIp(request),
			userAgent: request.headers.get("user-agent")
		},
		requestId: crypto.randomUUID()
	};
}
function hasPermission(identity, permission) {
	if (identity.permissions.has("*")) return true;
	if (identity.permissions.has(permission)) return true;
	return identity.permissions.has(`${permission}:own`);
}
function requirePermission(identity, permission) {
	if (!hasPermission(identity, permission)) throw forbidden(`Missing permission: ${permission}`);
}
/** Query contract shared by every collection endpoint. Client-safe. */
var listQuerySchema = objectType({
	limit: coerce.number().int().min(1).max(100).default(25),
	offset: coerce.number().int().min(0).max(1e5).default(0),
	/** Opaque cursor: ISO timestamp of the last seen row (keyset pagination). */
	cursor: stringType().datetime().optional(),
	order: enumType(["asc", "desc"]).default("desc"),
	projectId: stringType().uuid().optional(),
	status: stringType().trim().min(1).max(40).optional(),
	q: stringType().trim().min(1).max(120).optional()
});
function parseListQuery(url) {
	const raw = Object.fromEntries(url.searchParams.entries());
	return listQuerySchema.parse(raw);
}
var uuid = stringType().uuid();
var shortText = stringType().trim().min(1).max(140);
var longText = stringType().trim().max(4e3);
var priority = enumType([
	"low",
	"medium",
	"high",
	"urgent"
]);
var jsonArray = arrayType(recordType(stringType(), unknownType())).max(50);
function resource(config) {
	return config;
}
var RESOURCES = {
	users: resource({
		name: "users",
		table: "profiles",
		select: "id, full_name, company, phone, email, avatar_url, status, country, currency, timezone, last_login_at, created_at, updated_at",
		orderColumn: "created_at",
		permissions: {
			read: "users:read",
			write: "users:write"
		},
		createSchema: null,
		updateSchema: objectType({
			full_name: stringType().trim().max(120).nullish(),
			company: stringType().trim().max(120).nullish(),
			phone: stringType().trim().max(32).nullish(),
			country: stringType().trim().length(2).nullish(),
			currency: stringType().trim().length(3).nullish(),
			timezone: stringType().trim().max(60).nullish(),
			status: enumType([
				"active",
				"inactive",
				"suspended",
				"archived"
			]).optional()
		}),
		sensitive: [],
		projectColumn: null,
		searchable: [
			"full_name",
			"company",
			"email"
		],
		serverOwnedFields: [
			"id",
			"last_login_at",
			"deleted_at"
		]
	}),
	projects: resource({
		name: "projects",
		table: "projects",
		select: "id, client_id, manager_id, name, summary, platforms, package, region, currency, status, priority, progress, reservation_paid, started_at, estimated_delivery, completed_at, launch_date, github_repo, deployment_url, created_at, updated_at",
		orderColumn: "created_at",
		permissions: {
			read: "projects:read",
			write: "projects:write"
		},
		createSchema: objectType({
			client_id: uuid,
			name: shortText,
			summary: longText.optional(),
			platforms: arrayType(stringType().trim().max(30)).max(8).default([]),
			package: stringType().trim().max(60).optional(),
			region: stringType().trim().max(40).optional(),
			currency: stringType().trim().length(3).default("USD"),
			status: stringType().trim().max(40).default("discovery"),
			priority: priority.default("medium"),
			manager_id: uuid.optional(),
			estimated_delivery: stringType().date().optional()
		}),
		updateSchema: objectType({
			name: shortText.optional(),
			summary: longText.nullish(),
			platforms: arrayType(stringType().trim().max(30)).max(8).optional(),
			package: stringType().trim().max(60).nullish(),
			region: stringType().trim().max(40).nullish(),
			status: stringType().trim().max(40).optional(),
			priority: priority.optional(),
			progress: numberType().int().min(0).max(100).optional(),
			manager_id: uuid.nullish(),
			reservation_paid: booleanType().optional(),
			started_at: stringType().datetime().nullish(),
			estimated_delivery: stringType().date().nullish(),
			completed_at: stringType().datetime().nullish(),
			github_repo: stringType().url().max(300).nullish(),
			deployment_url: stringType().url().max(300).nullish()
		}),
		sensitive: [],
		projectColumn: "id",
		searchable: ["name", "summary"],
		serverOwnedFields: [
			"id",
			"created_at",
			"updated_at",
			"deleted_at"
		]
	}),
	payments: resource({
		name: "payments",
		table: "payments",
		select: "id, project_id, client_id, gateway, order_id, payment_id, currency, amount_cents, is_reservation, invoice_id, status, failure_reason, webhook_verified, created_at",
		orderColumn: "created_at",
		permissions: {
			read: "payments:read",
			write: "payments:write"
		},
		createSchema: null,
		updateSchema: null,
		sensitive: ["failure_reason"],
		projectColumn: "project_id",
		searchable: ["order_id", "payment_id"],
		serverOwnedFields: []
	}),
	invoices: resource({
		name: "invoices",
		table: "invoices",
		select: "id, invoice_number, payment_id, project_id, client_id, amount_cents, currency, pdf_url, status, issued_at, created_at",
		orderColumn: "created_at",
		permissions: {
			read: "invoices:read",
			write: "invoices:write"
		},
		createSchema: null,
		updateSchema: null,
		sensitive: [],
		projectColumn: "project_id",
		searchable: ["invoice_number"],
		serverOwnedFields: []
	}),
	leads: resource({
		name: "leads",
		table: "leads",
		select: "id, full_name, company, email, phone, country, project_type, package, budget, timeline, platforms, message, referral_source, utm, source, status, assigned_to, created_at",
		orderColumn: "created_at",
		permissions: {
			read: "leads:read",
			write: "leads:write"
		},
		createSchema: null,
		updateSchema: objectType({
			status: stringType().trim().max(40).optional(),
			assigned_to: uuid.nullish()
		}),
		sensitive: [],
		projectColumn: null,
		searchable: [
			"full_name",
			"company",
			"email"
		],
		serverOwnedFields: ["id", "created_at"]
	}),
	requirements: resource({
		name: "requirements",
		table: "requirements",
		select: "id, project_id, version, title, body, files, approval_status, created_by, reviewed_by, reviewed_at, created_at, updated_at",
		orderColumn: "created_at",
		permissions: {
			read: "requirements:read",
			write: "requirements:write"
		},
		createSchema: objectType({
			project_id: uuid,
			title: shortText,
			body: longText.optional(),
			files: jsonArray.default([])
		}),
		updateSchema: objectType({
			title: shortText.optional(),
			body: longText.nullish(),
			files: jsonArray.optional(),
			approval_status: enumType([
				"draft",
				"submitted",
				"approved",
				"rejected",
				"changes_requested"
			]).optional()
		}),
		sensitive: [],
		projectColumn: "project_id",
		searchable: ["title"],
		serverOwnedFields: [
			"created_by",
			"version",
			"reviewed_by",
			"reviewed_at"
		]
	}),
	enhancements: resource({
		name: "enhancements",
		table: "enhancements",
		select: "id, project_id, title, description, priority, status, requested_by, created_at, updated_at",
		orderColumn: "created_at",
		permissions: {
			read: "enhancements:read",
			write: "enhancements:write"
		},
		createSchema: objectType({
			project_id: uuid,
			title: shortText,
			description: longText.optional(),
			priority: priority.default("medium")
		}),
		updateSchema: objectType({
			title: shortText.optional(),
			description: longText.nullish(),
			priority: priority.optional(),
			status: stringType().trim().max(40).optional()
		}),
		sensitive: [],
		projectColumn: "project_id",
		searchable: ["title", "description"],
		serverOwnedFields: ["requested_by"]
	}),
	issues: resource({
		name: "issues",
		table: "project_issues",
		select: "id, issue_number, project_id, title, detail, severity, status, assigned_to, reported_by, attachments, resolved_at, created_at, updated_at",
		orderColumn: "created_at",
		permissions: {
			read: "issues:read",
			write: "issues:write"
		},
		createSchema: objectType({
			project_id: uuid,
			title: shortText,
			detail: longText.optional(),
			severity: enumType([
				"low",
				"medium",
				"high",
				"critical"
			]).default("medium"),
			attachments: jsonArray.default([])
		}),
		updateSchema: objectType({
			title: shortText.optional(),
			detail: longText.nullish(),
			severity: enumType([
				"low",
				"medium",
				"high",
				"critical"
			]).optional(),
			status: stringType().trim().max(40).optional(),
			assigned_to: uuid.nullish(),
			attachments: jsonArray.optional(),
			resolved_at: stringType().datetime().nullish()
		}),
		sensitive: [],
		projectColumn: "project_id",
		searchable: ["title", "detail"],
		serverOwnedFields: ["issue_number", "reported_by"]
	}),
	delivery: resource({
		name: "delivery",
		table: "project_deliveries",
		select: "id, project_id, label, kind, version, download_url, github_url, apk_url, ipa_url, documentation_url, credentials, status, unlocked, created_at, updated_at",
		orderColumn: "created_at",
		permissions: {
			read: "delivery:read",
			write: "delivery:write"
		},
		createSchema: objectType({
			project_id: uuid,
			label: shortText,
			kind: stringType().trim().max(20).default("apk"),
			version: stringType().trim().max(30).optional(),
			download_url: stringType().url().max(500).optional(),
			github_url: stringType().url().max(300).optional(),
			apk_url: stringType().url().max(500).optional(),
			ipa_url: stringType().url().max(500).optional(),
			documentation_url: stringType().url().max(500).optional()
		}),
		updateSchema: objectType({
			label: shortText.optional(),
			version: stringType().trim().max(30).nullish(),
			download_url: stringType().url().max(500).nullish(),
			github_url: stringType().url().max(300).nullish(),
			apk_url: stringType().url().max(500).nullish(),
			ipa_url: stringType().url().max(500).nullish(),
			documentation_url: stringType().url().max(500).nullish(),
			status: stringType().trim().max(40).optional(),
			unlocked: booleanType().optional()
		}),
		sensitive: ["credentials"],
		projectColumn: "project_id",
		searchable: ["label"],
		serverOwnedFields: ["credentials"]
	}),
	meetings: resource({
		name: "meetings",
		table: "meetings",
		select: "id, project_id, title, agenda, meeting_link, recording_url, scheduled_at, duration_minutes, created_by, created_at, updated_at",
		orderColumn: "scheduled_at",
		permissions: {
			read: "meetings:read",
			write: "meetings:write"
		},
		createSchema: objectType({
			project_id: uuid,
			title: shortText,
			agenda: longText.optional(),
			meeting_link: stringType().url().max(500).optional(),
			scheduled_at: stringType().datetime(),
			duration_minutes: numberType().int().min(5).max(480).default(30)
		}),
		updateSchema: objectType({
			title: shortText.optional(),
			agenda: longText.nullish(),
			meeting_link: stringType().url().max(500).nullish(),
			recording_url: stringType().url().max(500).nullish(),
			scheduled_at: stringType().datetime().optional(),
			duration_minutes: numberType().int().min(5).max(480).optional()
		}),
		sensitive: [],
		projectColumn: "project_id",
		searchable: ["title", "agenda"],
		serverOwnedFields: ["created_by"]
	}),
	notifications: resource({
		name: "notifications",
		table: "notifications",
		select: "id, user_id, type, title, description, link, read, created_at",
		orderColumn: "created_at",
		permissions: {
			read: "notifications:read",
			write: "notifications:write"
		},
		createSchema: null,
		updateSchema: objectType({ read: booleanType() }),
		sensitive: [],
		projectColumn: null,
		searchable: ["title"],
		serverOwnedFields: [
			"user_id",
			"type",
			"title",
			"description",
			"link"
		]
	})
};
function getResource(name) {
	return Object.hasOwn(RESOURCES, name) ? RESOURCES[name] : null;
}
function table(db, name) {
	return db.from(name);
}
function mapError(error) {
	switch (error.code) {
		case "23505": return new ApiError("conflict", "Record already exists");
		case "23503": return badRequest("Referenced record does not exist");
		case "23514":
		case "23502": return badRequest("The submitted values violate a data constraint");
		case "42501": return new ApiError("forbidden", "You do not have access to this resource");
		case "PGRST116": return notFound();
		default: return new ApiError("unprocessable", "The database rejected this operation");
	}
}
function escapeLike(value) {
	return value.replace(/[%_,()]/g, " ").trim();
}
/**
* Repository pattern over PostgREST. Enforces column projection, keyset or
* offset pagination, and never issues unbounded queries (N+1 / full scans).
*/
var ResourceRepository = class {
	db;
	config;
	constructor(db, config) {
		this.db = db;
		this.config = config;
	}
	async list(query) {
		const { config } = this;
		const ascending = query.order === "asc";
		let builder = table(this.db, config.table).select(config.select, { count: "exact" });
		if (query.projectId) {
			if (!config.projectColumn) throw badRequest("This resource cannot be filtered by project");
			builder = builder.eq(config.projectColumn, query.projectId);
		}
		if (query.status) builder = builder.eq("status", query.status);
		if (query.q && config.searchable.length > 0) {
			const term = escapeLike(query.q);
			if (term) builder = builder.or(config.searchable.map((column) => `${column}.ilike.%${term}%`).join(","));
		}
		builder = builder.order(config.orderColumn, { ascending });
		if (query.cursor) {
			builder = ascending ? builder.gt(config.orderColumn, query.cursor) : builder.lt(config.orderColumn, query.cursor);
			builder = builder.limit(query.limit);
		} else builder = builder.range(query.offset, query.offset + query.limit - 1);
		const { data, error, count } = await builder;
		if (error) throw mapError(error);
		const rows = data ?? [];
		const cursorValue = rows.at(-1)?.[config.orderColumn];
		return {
			data: rows,
			meta: {
				limit: query.limit,
				offset: query.offset,
				total: count,
				nextCursor: rows.length === query.limit && typeof cursorValue === "string" ? cursorValue : null,
				hasMore: count === null ? rows.length === query.limit : query.offset + rows.length < count
			}
		};
	}
	async findById(id) {
		const { data, error } = await table(this.db, this.config.table).select(this.config.select).eq("id", id).maybeSingle();
		if (error) throw mapError(error);
		if (!data) throw notFound();
		return data;
	}
	async create(values) {
		const { data, error } = await table(this.db, this.config.table).insert(values).select(this.config.select).single();
		if (error) throw mapError(error);
		if (!data) throw new ApiError("internal", "Insert returned no row");
		return data;
	}
	async update(id, values) {
		const { data, error } = await table(this.db, this.config.table).update(values).eq("id", id).select(this.config.select).maybeSingle();
		if (error) throw mapError(error);
		if (!data) throw notFound();
		return data;
	}
};
/** Best-effort audit trail. Never blocks or fails the caller's request. */
async function recordAudit(db, identity, entry) {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const payload = {
		actor_id: identity.userId,
		action: entry.action,
		entity: entry.entity,
		entity_id: entry.entityId ?? null,
		old_value: entry.oldValue ?? null,
		new_value: entry.newValue ?? null,
		detail: entry.detail ?? {},
		ip: identity.ip,
		user_agent: identity.userAgent
	};
	const { error } = await supabaseAdmin.from("audit_logs").insert(payload);
	if (error) {}
}
/**
* Business rules for a resource collection: permission gates, server-owned
* field injection, sensitive-column redaction, and audit logging.
* RLS remains the final authority on which rows are visible or writable.
*/
var ResourceService = class {
	ctx;
	config;
	repo;
	constructor(ctx, config) {
		this.ctx = ctx;
		this.config = config;
		this.repo = new ResourceRepository(ctx.db, config);
	}
	redact(row) {
		if (this.ctx.identity.isAdmin && this.config.sensitive.length === 0) return row;
		const clone = { ...row };
		if (!this.ctx.identity.isAdmin) {
			for (const column of this.config.sensitive) delete clone[column];
			if (this.config.name === "delivery" && (!row["unlocked"] || row["status"] !== "completed")) {
				delete clone["github_url"];
				delete clone["download_url"];
				delete clone["apk_url"];
				delete clone["ipa_url"];
				delete clone["credentials"];
			}
		}
		return clone;
	}
	rejectServerOwned(values) {
		const blocked = this.config.serverOwnedFields.filter((field) => field in values);
		if (blocked.length > 0) throw badRequest(`These fields are managed by the server: ${blocked.join(", ")}`);
	}
	async list(query) {
		requirePermission(this.ctx.identity, this.config.permissions.read);
		const page = await this.repo.list(query);
		return {
			...page,
			data: page.data.map((row) => this.redact(row))
		};
	}
	async get(id) {
		requirePermission(this.ctx.identity, this.config.permissions.read);
		return this.redact(await this.repo.findById(id));
	}
	async create(input) {
		const schema = this.config.createSchema;
		if (!schema) throw forbidden("This resource cannot be created through the API");
		requirePermission(this.ctx.identity, this.config.permissions.write);
		const parsed = schema.parse(input);
		this.rejectServerOwned(parsed);
		const values = {
			...parsed,
			...this.ownershipDefaults()
		};
		const created = await this.repo.create(values);
		await recordAudit(this.ctx.db, this.ctx.identity, {
			action: `${this.config.name}.create`,
			entity: this.config.table,
			entityId: typeof created["id"] === "string" ? created["id"] : null,
			newValue: created
		});
		return this.redact(created);
	}
	async update(id, input) {
		const schema = this.config.updateSchema;
		if (!schema) throw forbidden("This resource cannot be modified through the API");
		requirePermission(this.ctx.identity, this.config.permissions.write);
		const parsed = schema.parse(input);
		this.rejectServerOwned(parsed);
		if (Object.keys(parsed).length === 0) throw badRequest("No updatable fields supplied");
		const before = await this.repo.findById(id);
		const updated = await this.repo.update(id, parsed);
		await recordAudit(this.ctx.db, this.ctx.identity, {
			action: `${this.config.name}.update`,
			entity: this.config.table,
			entityId: id,
			oldValue: before,
			newValue: updated
		});
		return this.redact(updated);
	}
	/** Columns the server owns on insert, derived from the session. */
	ownershipDefaults() {
		const { userId } = this.ctx.identity;
		switch (this.config.name) {
			case "requirements": return { created_by: userId };
			case "enhancements": return { requested_by: userId };
			case "issues": return { reported_by: userId };
			case "meetings": return { created_by: userId };
			default: return {};
		}
	}
};
var SECURITY_HEADERS = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
	"x-content-type-options": "nosniff",
	"referrer-policy": "no-referrer",
	"x-frame-options": "DENY",
	"content-security-policy": "default-src 'none'; frame-ancestors 'none'",
	"strict-transport-security": "max-age=63072000; includeSubDomains"
};
var READ_LIMIT = {
	max: 120,
	windowMs: 6e4
};
var WRITE_LIMIT = {
	max: 30,
	windowMs: 6e4
};
function respond(body, status, extra) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			...SECURITY_HEADERS,
			...extra
		}
	});
}
function errorResponse(error) {
	if (error instanceof ZodError) return respond({ error: {
		code: "unprocessable",
		message: "Validation failed",
		details: error.issues
	} }, 422);
	if (error instanceof ApiError) return respond({ error: {
		code: error.code,
		message: error.message,
		details: error.details
	} }, error.status);
	return respond({ error: {
		code: "internal",
		message: "Unexpected server error"
	} }, 500);
}
async function readJson(request) {
	if (!(request.headers.get("content-type") ?? "").includes("application/json")) throw badRequest("Expected application/json body");
	try {
		return await request.json();
	} catch {
		throw badRequest("Malformed JSON body");
	}
}
async function guard(request, write) {
	const ctx = await authenticate(request);
	const budget = write ? WRITE_LIMIT : READ_LIMIT;
	if (!(await checkRateLimit(`v1:${write ? "w" : "r"}:${ctx.identity.userId}`, budget.max, budget.windowMs)).allowed) throw new ApiError("rate_limited", "Too many requests");
	return ctx;
}
/**
* `/api/v1/<resource>` collection handler: GET (paginated list) and POST (create).
* Mutations require a same-origin request to blunt cross-site form posts; the
* bearer token is the primary authenticator.
*/
async function collectionHandler(request, resourceName) {
	try {
		const config = getResource(resourceName);
		if (!config) throw notFound("Unknown resource");
		const method = request.method.toUpperCase();
		if (method === "GET") {
			const ctx = await guard(request, false);
			const query = parseListQuery(new URL(request.url));
			return respond(await new ResourceService(ctx, config).list(query), 200);
		}
		if (method === "POST") {
			assertSameOrigin(request);
			return respond({ data: await new ResourceService(await guard(request, true), config).create(await readJson(request)) }, 201);
		}
		return respond({ error: {
			code: "bad_request",
			message: "Method not allowed"
		} }, 405, { allow: "GET, POST" });
	} catch (error) {
		return errorResponse(error);
	}
}
/** `/api/v1/<resource>/<id>` item handler: GET and PATCH. */
async function itemHandler(request, resourceName, id) {
	try {
		const config = getResource(resourceName);
		if (!config) throw notFound("Unknown resource");
		if (!stringType().uuid().safeParse(id).success) throw badRequest("Invalid resource id");
		const method = request.method.toUpperCase();
		if (method === "GET") return respond({ data: await new ResourceService(await guard(request, false), config).get(id) }, 200);
		if (method === "PATCH") {
			assertSameOrigin(request);
			return respond({ data: await new ResourceService(await guard(request, true), config).update(id, await readJson(request)) }, 200);
		}
		return respond({ error: {
			code: "bad_request",
			message: "Method not allowed"
		} }, 405, { allow: "GET, PATCH" });
	} catch (error) {
		return errorResponse(error);
	}
}
/** CSRF hardening: state-changing calls must originate from this deployment. */
function assertSameOrigin(request) {
	const origin = request.headers.get("origin");
	if (!origin) return;
	const host = new URL(request.url).host;
	if (new URL(origin).host !== host) throw new ApiError("forbidden", "Cross-origin write blocked");
}
//#endregion
export { collectionHandler, itemHandler };
