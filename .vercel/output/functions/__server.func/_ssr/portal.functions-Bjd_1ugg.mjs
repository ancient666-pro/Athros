import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B-tb0t5S.mjs";
import { a as literalType, c as recordType, i as enumType, l as stringType, n as booleanType, o as numberType, s as objectType, t as arrayType, u as unknownType } from "../_libs/zod.mjs";
import { t as logger } from "./logger.server--Vgc5D2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.functions-Bjd_1ugg.js
var COMMON = [
	"password",
	"qwerty",
	"letmein",
	"welcome",
	"admin",
	"athros",
	"123456",
	"iloveyou"
];
function evaluatePassword(password) {
	const failures = [];
	if (password.length < 12) failures.push(`Use at least 12 characters`);
	if (password.length > 128) failures.push("Password is too long");
	if (!/[a-z]/.test(password)) failures.push("Add a lowercase letter");
	if (!/[A-Z]/.test(password)) failures.push("Add an uppercase letter");
	if (!/[0-9]/.test(password)) failures.push("Add a number");
	if (!/[^A-Za-z0-9]/.test(password)) failures.push("Add a symbol");
	if (/(.)\1{2,}/.test(password)) failures.push("Avoid repeating the same character");
	if (COMMON.some((entry) => password.toLowerCase().includes(entry))) failures.push("Avoid common words");
	const variety = Number(/[a-z]/.test(password)) + Number(/[A-Z]/.test(password)) + Number(/[0-9]/.test(password)) + Number(/[^A-Za-z0-9]/.test(password));
	const lengthBonus = password.length >= 20 ? 2 : password.length >= 16 ? 1 : 0;
	const score = Math.max(0, Math.min(4, variety + lengthBonus - failures.length));
	return {
		score,
		label: [
			"very weak",
			"weak",
			"fair",
			"strong",
			"excellent"
		][score] ?? "very weak",
		failures,
		acceptable: failures.length === 0
	};
}
stringType().min(12).max(128).refine((value) => evaluatePassword(value).acceptable, { message: "Password does not meet the security policy" });
/** Account-lock policy. */
var LOCK_POLICY = {
	maxFailedAttempts: 5,
	lockMinutes: 15,
	attemptWindowMinutes: 15,
	passwordHistorySize: 5,
	passwordMaxAgeDays: 180
};
/**
* Account security state machine: failed-login tracking, temporary lockout,
* password age/reuse policy, and the security event trail.
*/
async function admin() {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	return supabaseAdmin;
}
async function hash(value) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function recordSecurityEvent(input) {
	try {
		await (await admin()).from("security_events").insert({
			type: input.type,
			user_id: input.userId ?? null,
			message: input.message ?? null,
			severity: input.severity ?? "info",
			detail: input.detail ?? {},
			ip: input.context?.ip ?? null,
			user_agent: input.context?.userAgent ?? null
		});
	} catch (error) {
		logger.channel("security").warn("could not persist security event", {
			type: input.type,
			error: error instanceof Error ? error.message : String(error)
		});
	}
}
async function ensureRow(userId) {
	const db = await admin();
	await db.from("account_security").upsert({ user_id: userId }, { onConflict: "user_id" });
	return db;
}
/** Rejects weak passwords and any of the last N previously used passwords. */
async function assertPasswordAcceptable(userId, password) {
	const strength = evaluatePassword(password);
	if (!strength.acceptable) return {
		ok: false,
		reason: strength.failures.join("; ")
	};
	const db = await admin();
	const digest = await hash(password);
	const { data } = await db.from("password_history").select("password_hash").eq("user_id", userId).order("created_at", { ascending: false }).limit(LOCK_POLICY.passwordHistorySize);
	if ((data ?? []).some((row) => row.password_hash === digest)) return {
		ok: false,
		reason: "You cannot reuse a recent password"
	};
	return { ok: true };
}
/** Records the new password digest and refreshes expiry metadata. */
async function recordPasswordChange(userId, password) {
	const db = await admin();
	const digest = await hash(password);
	await db.from("password_history").insert({
		user_id: userId,
		password_hash: digest
	});
	await ensureRow(userId);
	await db.from("account_security").update({
		password_changed_at: (/* @__PURE__ */ new Date()).toISOString(),
		password_expires_at: new Date(Date.now() + LOCK_POLICY.passwordMaxAgeDays * 864e5).toISOString(),
		failed_login_count: 0,
		locked_until: null
	}).eq("user_id", userId);
	const { data: rows } = await db.from("password_history").select("id").eq("user_id", userId).order("created_at", { ascending: false });
	const stale = (rows ?? []).slice(LOCK_POLICY.passwordHistorySize).map((row) => row.id);
	if (stale.length > 0) await db.from("password_history").delete().in("id", stale);
	await recordSecurityEvent({
		type: "password.changed",
		userId,
		severity: "warning"
	});
}
var uuid = stringType().uuid();
var getMyPortal_createServerFn_handler = createServerRpc({
	id: "39e345df0bfc5f09ce24a836ecfce95be907956f26ff1aedf8ca6db1bc35d35c",
	name: "getMyPortal",
	filename: "src/lib/portal.functions.ts"
}, (opts) => getMyPortal.__executeServer(opts));
var getMyPortal = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyPortal_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const [{ data: profile }, { data: roles }, { data: projects }, { data: notifications }, { data: rawSessions }] = await Promise.all([
		supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
		supabase.from("user_roles").select("role").eq("user_id", userId),
		supabase.from("projects").select("*").eq("client_id", userId).order("created_at", { ascending: false }),
		supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(30),
		supabase.from("user_sessions").select("id, browser, os, ip, country, created_at, last_seen_at, revoked").eq("user_id", userId).order("created_at", { ascending: false }).limit(10)
	]);
	const sessions = (rawSessions ?? []).map((s) => ({
		id: s.id,
		browser: s.browser ?? null,
		os: s.os ?? null,
		ip: s.ip ? String(s.ip) : null,
		country: s.country ?? null,
		created_at: s.created_at,
		last_seen_at: s.last_seen_at,
		revoked: s.revoked
	}));
	const project = projects?.[0] ?? null;
	const roleList = (roles ?? []).map((r) => String(r.role));
	const isAdmin = roleList.includes("admin") || roleList.includes("super_admin");
	const isStaff = isAdmin || roleList.some((r) => [
		"project_manager",
		"developer",
		"support"
	].includes(r));
	if (!project) return {
		profile,
		isAdmin,
		isStaff,
		project: null,
		booking: null,
		milestones: [],
		requirements: [],
		enhancements: [],
		issues: [],
		payments: [],
		invoices: [],
		meetings: [],
		deliveries: [],
		notifications: notifications ?? [],
		sessions,
		financials: {
			totalAmount: 0,
			tokenPaid: 0,
			remainingBalance: 0,
			currency: "USD"
		}
	};
	const [{ data: rawBooking }, { data: milestones }, { data: requirements }, { data: enhancements }, { data: enhancementComments }, { data: issues }, { data: issueReplies }, { data: payments }, { data: projectPayments }, { data: invoices }, { data: meetings }, { data: rawDeliveries }] = await Promise.all([
		supabase.from("project_bookings").select("*").eq("project_id", project.id).maybeSingle(),
		supabase.from("project_milestones").select("*").eq("project_id", project.id).order("position", { ascending: true }),
		supabase.from("requirements").select("*").eq("project_id", project.id).order("version", { ascending: false }),
		supabase.from("enhancements").select("*").eq("project_id", project.id).order("created_at", { ascending: false }),
		supabase.from("enhancement_comments").select("id, enhancement_id, author_id, body, created_at").order("created_at", { ascending: true }),
		supabase.from("project_issues").select("*").eq("project_id", project.id).order("created_at", { ascending: false }),
		supabase.from("issue_replies").select("id, issue_id, author_id, body, attachments, created_at").order("created_at", { ascending: true }),
		supabase.from("payments").select("id, project_id, client_id, gateway, order_id, payment_id, currency, amount_cents, is_reservation, invoice_id, status, created_at").eq("project_id", project.id).order("created_at", { ascending: false }),
		supabase.from("project_payments").select("*").eq("project_id", project.id).order("due_date", { ascending: true }),
		supabase.from("invoices").select("*").eq("project_id", project.id).order("created_at", { ascending: false }),
		supabase.from("meetings").select("*").eq("project_id", project.id).order("scheduled_at", { ascending: true }),
		supabase.from("project_deliveries").select("*").eq("project_id", project.id).order("created_at", { ascending: false })
	]);
	const booking = rawBooking ?? null;
	const commentsByEnhancement = {};
	for (const comment of enhancementComments ?? []) {
		if (!commentsByEnhancement[comment.enhancement_id]) commentsByEnhancement[comment.enhancement_id] = [];
		commentsByEnhancement[comment.enhancement_id].push(comment);
	}
	const enhancementsWithComments = (enhancements ?? []).map((e) => ({
		...e,
		comments: commentsByEnhancement[e.id] ?? []
	}));
	const repliesByIssue = {};
	for (const reply of issueReplies ?? []) {
		if (!repliesByIssue[reply.issue_id]) repliesByIssue[reply.issue_id] = [];
		repliesByIssue[reply.issue_id].push(reply);
	}
	const issuesWithReplies = (issues ?? []).map((i) => ({
		...i,
		replies: repliesByIssue[i.id] ?? []
	}));
	const currency = booking?.currency || project.currency || "USD";
	const totalAmount = booking?.full_amount ?? 0;
	const tokenPaid = booking?.token_amount ?? 0;
	const remainingBalance = Math.max(0, totalAmount - tokenPaid);
	const isProjectComplete = project.status === "completed" || project.status === "live";
	const deliveries = (rawDeliveries ?? []).map((delivery) => {
		const isUnlocked = delivery.unlocked === true;
		if (!(isStaff || isUnlocked && isProjectComplete)) return {
			id: delivery.id,
			project_id: delivery.project_id,
			label: delivery.label,
			kind: delivery.kind,
			version: delivery.version,
			status: delivery.status ?? "pending",
			unlocked: false,
			created_at: delivery.created_at,
			updated_at: delivery.updated_at,
			download_url: null,
			github_url: null,
			apk_url: null,
			ipa_url: null,
			documentation_url: null
		};
		return {
			id: delivery.id,
			project_id: delivery.project_id,
			label: delivery.label,
			kind: delivery.kind,
			version: delivery.version,
			status: delivery.status ?? "completed",
			unlocked: true,
			download_url: delivery.download_url ?? null,
			github_url: delivery.github_url ?? null,
			apk_url: delivery.apk_url ?? null,
			ipa_url: delivery.ipa_url ?? null,
			documentation_url: delivery.documentation_url ?? null,
			created_at: delivery.created_at,
			updated_at: delivery.updated_at
		};
	});
	return {
		profile,
		isAdmin,
		isStaff,
		project,
		booking: booking ?? null,
		milestones: milestones ?? [],
		requirements: requirements ?? [],
		enhancements: enhancementsWithComments,
		issues: issuesWithReplies,
		payments: payments?.length ? payments : projectPayments ?? [],
		invoices: invoices ?? [],
		meetings: meetings ?? [],
		deliveries,
		notifications: notifications ?? [],
		sessions: sessions ?? [],
		financials: {
			totalAmount,
			tokenPaid,
			remainingBalance,
			currency
		}
	};
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "3356e8e7f455f9d8292f00dc441138f0439b0e992ba1d12d5fd2ccfeb7bc4556",
	name: "updateMyProfile",
	filename: "src/lib/portal.functions.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	fullName: stringType().trim().max(120).optional(),
	company: stringType().trim().max(120).optional(),
	phone: stringType().trim().max(32).optional(),
	timezone: stringType().trim().max(60).optional()
}).parse(data)).handler(updateMyProfile_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("profiles").upsert({
		id: context.userId,
		full_name: data.fullName ?? null,
		company: data.company ?? null,
		phone: data.phone ?? null,
		timezone: data.timezone ?? null,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var submitRequirement_createServerFn_handler = createServerRpc({
	id: "d936452e0ee8753a5925490c28c6d4387468a729ce1b8cf14b2914759adc4595",
	name: "submitRequirement",
	filename: "src/lib/portal.functions.ts"
}, (opts) => submitRequirement.__executeServer(opts));
var submitRequirement = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	body: stringType().trim().max(8e3).optional(),
	files: arrayType(recordType(stringType(), unknownType())).max(20).default([])
}).parse(data)).handler(submitRequirement_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: existing } = await supabase.from("requirements").select("version").eq("project_id", data.projectId).order("version", { ascending: false }).limit(1);
	const nextVersionNumber = (existing?.[0]?.version ?? 0) + 1;
	const { data: inserted, error } = await supabase.from("requirements").insert({
		project_id: data.projectId,
		version: nextVersionNumber,
		title: data.title,
		body: data.body || null,
		files: data.files,
		approval_status: "submitted",
		created_by: userId
	}).select("id, version").single();
	if (error) throw new Error(error.message);
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	await supabaseAdmin.from("audit_logs").insert({
		actor_id: userId,
		action: "requirement.submitted",
		entity: "requirements",
		entity_id: inserted.id,
		detail: {
			projectId: data.projectId,
			version: inserted.version,
			title: data.title
		}
	});
	return {
		ok: true,
		requirementId: inserted.id,
		version: inserted.version
	};
});
var requestEnhancement_createServerFn_handler = createServerRpc({
	id: "0c80008bfa05f602e0ced731d640f238b8f449a053e82832e68d28b86fdcf924",
	name: "requestEnhancement",
	filename: "src/lib/portal.functions.ts"
}, (opts) => requestEnhancement.__executeServer(opts));
var requestEnhancement = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	description: stringType().trim().max(5e3).optional(),
	priority: enumType([
		"low",
		"medium",
		"high",
		"urgent"
	]).default("medium")
}).parse(data)).handler(requestEnhancement_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: inserted, error } = await supabase.from("enhancements").insert({
		project_id: data.projectId,
		title: data.title,
		description: data.description || null,
		priority: data.priority,
		status: "requested",
		requested_by: userId
	}).select("id").single();
	if (error) throw new Error(error.message);
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	await supabaseAdmin.from("audit_logs").insert({
		actor_id: userId,
		action: "enhancement.requested",
		entity: "enhancements",
		entity_id: inserted.id,
		detail: {
			projectId: data.projectId,
			title: data.title,
			priority: data.priority
		}
	});
	return {
		ok: true,
		enhancementId: inserted.id
	};
});
var addEnhancementComment_createServerFn_handler = createServerRpc({
	id: "f12841421d30384f3d416bfdd0fa30c5fa85da3d30427374413c44e1ca805aa6",
	name: "addEnhancementComment",
	filename: "src/lib/portal.functions.ts"
}, (opts) => addEnhancementComment.__executeServer(opts));
var addEnhancementComment = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	enhancementId: uuid,
	body: stringType().trim().min(1).max(3e3)
}).parse(data)).handler(addEnhancementComment_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: inserted, error } = await supabase.from("enhancement_comments").insert({
		enhancement_id: data.enhancementId,
		author_id: userId,
		body: data.body
	}).select("id").single();
	if (error) throw new Error(error.message);
	return {
		ok: true,
		commentId: inserted.id
	};
});
var reportIssue_createServerFn_handler = createServerRpc({
	id: "077766b0ef5f7bf5816bc56db9e312de991615329a5cdd9bdf4eff1bd2a43983",
	name: "reportIssue",
	filename: "src/lib/portal.functions.ts"
}, (opts) => reportIssue.__executeServer(opts));
var reportIssue = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	detail: stringType().trim().max(5e3).optional(),
	severity: enumType([
		"low",
		"medium",
		"high",
		"critical"
	]).default("medium"),
	attachments: arrayType(recordType(stringType(), unknownType())).max(10).default([])
}).parse(data)).handler(reportIssue_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: inserted, error } = await supabase.from("project_issues").insert({
		project_id: data.projectId,
		title: data.title,
		detail: data.detail || null,
		severity: data.severity,
		status: "open",
		reported_by: userId,
		attachments: data.attachments
	}).select("id, issue_number").single();
	if (error) throw new Error(error.message);
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	await supabaseAdmin.from("audit_logs").insert({
		actor_id: userId,
		action: "issue.reported",
		entity: "project_issues",
		entity_id: inserted.id,
		detail: {
			projectId: data.projectId,
			issueNumber: inserted.issue_number,
			title: data.title
		}
	});
	return {
		ok: true,
		issueId: inserted.id,
		issueNumber: inserted.issue_number
	};
});
var replyToIssue_createServerFn_handler = createServerRpc({
	id: "e987ed5df71ce87f07449e74f488ef835a88f8ecb7364770f753f6e2a6df51b8",
	name: "replyToIssue",
	filename: "src/lib/portal.functions.ts"
}, (opts) => replyToIssue.__executeServer(opts));
var replyToIssue = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	issueId: uuid,
	body: stringType().trim().min(1).max(3e3),
	attachments: arrayType(recordType(stringType(), unknownType())).max(10).default([])
}).parse(data)).handler(replyToIssue_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: inserted, error } = await supabase.from("issue_replies").insert({
		issue_id: data.issueId,
		author_id: userId,
		body: data.body,
		attachments: data.attachments
	}).select("id").single();
	if (error) throw new Error(error.message);
	return {
		ok: true,
		replyId: inserted.id
	};
});
var markNotificationRead_createServerFn_handler = createServerRpc({
	id: "929abc5bfe7fa736766b074edbd38d4fbf72690f6a62baa45e0bd25a91d68884",
	name: "markNotificationRead",
	filename: "src/lib/portal.functions.ts"
}, (opts) => markNotificationRead.__executeServer(opts));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	notificationId: uuid.optional(),
	markAll: booleanType().optional()
}).parse(data)).handler(markNotificationRead_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	if (data.markAll) {
		const { error } = await supabase.from("notifications").update({ read: true }).eq("user_id", userId);
		if (error) throw new Error(error.message);
	} else if (data.notificationId) {
		const { error } = await supabase.from("notifications").update({ read: true }).eq("id", data.notificationId).eq("user_id", userId);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var updateClientPassword_createServerFn_handler = createServerRpc({
	id: "ac2482f22f8f24e475219124a31a14b182d2472093292eb61529aaa636d69742",
	name: "updateClientPassword",
	filename: "src/lib/portal.functions.ts"
}, (opts) => updateClientPassword.__executeServer(opts));
var updateClientPassword = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({ newPassword: stringType().min(8).max(128) }).parse(data)).handler(updateClientPassword_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const acceptable = await assertPasswordAcceptable(userId, data.newPassword);
	if (!acceptable.ok) throw new Error(acceptable.reason ?? "Password does not meet security requirements");
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password: data.newPassword });
	if (error) throw new Error(error.message);
	await recordPasswordChange(userId, data.newPassword);
	return { ok: true };
});
var revokeClientSession_createServerFn_handler = createServerRpc({
	id: "c4a28126973948f558e314bdaf6387daff6efb321291a8be7d732a28a5c0ba37",
	name: "revokeClientSession",
	filename: "src/lib/portal.functions.ts"
}, (opts) => revokeClientSession.__executeServer(opts));
var revokeClientSession = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({ sessionId: uuid }).parse(data)).handler(revokeClientSession_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { error } = await supabase.from("user_sessions").update({
		revoked: true,
		revoked_at: (/* @__PURE__ */ new Date()).toISOString(),
		revoke_reason: "user_revoked"
	}).eq("id", data.sessionId).eq("user_id", userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var getAdminOverview_createServerFn_handler = createServerRpc({
	id: "18a027eac446a11856883e0cc9139471cf91e3466cba3990c4ab49d139743945",
	name: "getAdminOverview",
	filename: "src/lib/portal.functions.ts"
}, (opts) => getAdminOverview.__executeServer(opts));
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminOverview_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data: isStaff } = await supabase.rpc("is_staff", { _user_id: userId });
	if (!isStaff) throw new Error("Forbidden");
	const [{ data: clients }, { data: projects }, { data: deliveries }, { data: payments }, { data: issues }] = await Promise.all([
		supabase.from("profiles").select("*").order("created_at", { ascending: false }),
		supabase.from("projects").select("*").order("created_at", { ascending: false }),
		supabase.from("project_deliveries").select("*").order("created_at", { ascending: false }),
		supabase.from("project_payments").select("*").order("due_date", { ascending: true }),
		supabase.from("project_issues").select("*").order("created_at", { ascending: false })
	]);
	return {
		clients: clients ?? [],
		projects: projects ?? [],
		deliveries: deliveries ?? [],
		payments: payments ?? [],
		issues: issues ?? []
	};
});
var upsertProject_createServerFn_handler = createServerRpc({
	id: "a6cccf86d498665f34f9a198cba5c74633fb8df0f0e946b5731f13f4d2323ca4",
	name: "upsertProject",
	filename: "src/lib/portal.functions.ts"
}, (opts) => upsertProject.__executeServer(opts));
var upsertProject = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	id: uuid.optional(),
	clientId: uuid,
	name: stringType().trim().min(2).max(120),
	summary: stringType().trim().max(600).optional(),
	platforms: arrayType(stringType().trim().max(30)).max(8).default([]),
	status: stringType().trim().max(40).default("discovery"),
	progress: numberType().int().min(0).max(100).default(0),
	launchDate: stringType().trim().max(20).optional()
}).parse(data)).handler(upsertProject_createServerFn_handler, async ({ data, context }) => {
	const row = {
		client_id: data.clientId,
		name: data.name,
		summary: data.summary || null,
		platforms: data.platforms,
		status: data.status,
		progress: data.progress,
		launch_date: data.launchDate || null,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const { error } = await (data.id ? context.supabase.from("projects").update(row).eq("id", data.id) : context.supabase.from("projects").insert(row));
	if (error) throw new Error(error.message);
	return { ok: true };
});
var setProjectProgress_createServerFn_handler = createServerRpc({
	id: "3050454e876f141c396136f716cf38c3e0a59e913f6197eb4ad5c18933975b7e",
	name: "setProjectProgress",
	filename: "src/lib/portal.functions.ts"
}, (opts) => setProjectProgress.__executeServer(opts));
var setProjectProgress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	progress: numberType().int().min(0).max(100),
	status: stringType().trim().max(40).optional()
}).parse(data)).handler(setProjectProgress_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("projects").update({
		progress: data.progress,
		...data.status ? { status: data.status } : {},
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", data.projectId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var addMilestone_createServerFn_handler = createServerRpc({
	id: "7c36c0b533aa99c8f4fca76d503b59ff93f4e055f6537d3d9f8899291ec7af6b",
	name: "addMilestone",
	filename: "src/lib/portal.functions.ts"
}, (opts) => addMilestone.__executeServer(opts));
var addMilestone = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	detail: stringType().trim().max(600).optional(),
	status: stringType().trim().max(30).default("pending"),
	dueDate: stringType().trim().max(20).optional(),
	position: numberType().int().min(0).max(200).default(0)
}).parse(data)).handler(addMilestone_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("project_milestones").insert({
		project_id: data.projectId,
		title: data.title,
		detail: data.detail || null,
		status: data.status,
		due_date: data.dueDate || null,
		position: data.position
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var setRowStatus_createServerFn_handler = createServerRpc({
	id: "3cf619cc07f1832aac3629fb25db73ab03fbb78359ad72d1c5d796e3995d416b",
	name: "setRowStatus",
	filename: "src/lib/portal.functions.ts"
}, (opts) => setRowStatus.__executeServer(opts));
var setRowStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	table: enumType([
		"project_milestones",
		"project_issues",
		"project_payments"
	]),
	id: uuid,
	status: stringType().trim().min(2).max(30)
}).parse(data)).handler(setRowStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from(data.table).update({ status: data.status }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var upsertDelivery_createServerFn_handler = createServerRpc({
	id: "cb51855124cd329b17a66359762c663fd5e666b8c575a819c0b1f6de3a6fdb9d",
	name: "upsertDelivery",
	filename: "src/lib/portal.functions.ts"
}, (opts) => upsertDelivery.__executeServer(opts));
var upsertDelivery = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	label: stringType().trim().min(2).max(120),
	kind: stringType().trim().max(20).default("apk"),
	version: stringType().trim().max(30).optional(),
	downloadUrl: stringType().trim().url().max(500).optional().or(literalType("")),
	githubUrl: stringType().trim().url().max(300).optional().or(literalType("")),
	apkUrl: stringType().trim().url().max(500).optional().or(literalType("")),
	ipaUrl: stringType().trim().url().max(500).optional().or(literalType("")),
	documentationUrl: stringType().trim().url().max(500).optional().or(literalType(""))
}).parse(data)).handler(upsertDelivery_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("project_deliveries").insert({
		project_id: data.projectId,
		label: data.label,
		kind: data.kind,
		version: data.version || null,
		download_url: data.downloadUrl || null,
		github_url: data.githubUrl || null,
		apk_url: data.apkUrl || null,
		ipa_url: data.ipaUrl || null,
		documentation_url: data.documentationUrl || null,
		unlocked: false
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var setDeliveryLock_createServerFn_handler = createServerRpc({
	id: "3c326af79982f127f69f1260d8cdf3954700f24ef977c2d65f00d18a14b47298",
	name: "setDeliveryLock",
	filename: "src/lib/portal.functions.ts"
}, (opts) => setDeliveryLock.__executeServer(opts));
var setDeliveryLock = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	id: uuid,
	unlocked: booleanType()
}).parse(data)).handler(setDeliveryLock_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("project_deliveries").update({ unlocked: data.unlocked }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { addEnhancementComment_createServerFn_handler, addMilestone_createServerFn_handler, getAdminOverview_createServerFn_handler, getMyPortal_createServerFn_handler, markNotificationRead_createServerFn_handler, replyToIssue_createServerFn_handler, reportIssue_createServerFn_handler, requestEnhancement_createServerFn_handler, revokeClientSession_createServerFn_handler, setDeliveryLock_createServerFn_handler, setProjectProgress_createServerFn_handler, setRowStatus_createServerFn_handler, submitRequirement_createServerFn_handler, updateClientPassword_createServerFn_handler, updateMyProfile_createServerFn_handler, upsertDelivery_createServerFn_handler, upsertProject_createServerFn_handler };
