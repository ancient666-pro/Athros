import { i as enumType, l as stringType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { t as logger } from "./logger.server--Vgc5D2v.mjs";
import { d as replayWebhook } from "./bookings.server-CykFAX5h.mjs";
import { drainQueues, enqueue, registerJobHandler } from "./queue.server-Bldku9ej.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/handlers.server-PmbwHtFt.js
/** Transactional email catalogue. Client-safe: names + payload contracts only. */
var EMAIL_TEMPLATES = {
	"account.invite": objectType({
		fullName: stringType().min(1),
		email: stringType().email(),
		tempPassword: stringType().min(8),
		loginUrl: stringType().url()
	}),
	"account.password-reset": objectType({
		fullName: stringType().min(1).optional(),
		resetUrl: stringType().url(),
		expiresInMinutes: numberType().int().positive()
	}),
	"account.locked": objectType({
		fullName: stringType().min(1).optional(),
		unlockMinutes: numberType().int().positive()
	}),
	"project.status": objectType({
		projectName: stringType().min(1),
		status: stringType().min(1),
		progress: numberType().int().min(0).max(100),
		projectUrl: stringType().url()
	}),
	"project.milestone": objectType({
		projectName: stringType().min(1),
		milestone: stringType().min(1),
		projectUrl: stringType().url()
	}),
	"delivery.ready": objectType({
		projectName: stringType().min(1),
		label: stringType().min(1),
		projectUrl: stringType().url()
	}),
	"payment.receipt": objectType({
		projectName: stringType().min(1).optional(),
		amount: stringType().min(1),
		invoiceNumber: stringType().min(1),
		invoiceUrl: stringType().url().optional()
	}),
	"meeting.scheduled": objectType({
		projectName: stringType().min(1),
		title: stringType().min(1),
		scheduledAt: stringType().min(1),
		meetingLink: stringType().url().optional()
	}),
	"lead.received": objectType({
		fullName: stringType().min(1),
		company: stringType().optional(),
		email: stringType().email()
	}),
	"booking.confirmation": objectType({
		bookingNumber: stringType().min(1),
		customerName: stringType().min(1).optional(),
		packageName: stringType().min(1),
		tokenAmount: stringType().min(1),
		remainingBalance: stringType().optional(),
		totalAmount: stringType().optional(),
		expectedNextStep: stringType().optional(),
		dashboardUrl: stringType().url().optional(),
		contactEmail: stringType().email().optional(),
		contactPhone: stringType().optional()
	}),
	"booking.admin-notification": objectType({
		bookingNumber: stringType().min(1),
		customerName: stringType().min(1),
		customerEmail: stringType().email(),
		customerPhone: stringType().optional(),
		company: stringType().optional(),
		packageName: stringType().min(1),
		region: stringType().optional(),
		totalPrice: stringType().optional(),
		tokenAmount: stringType().optional(),
		amount: stringType().min(1),
		currency: stringType().optional(),
		razorpayOrderId: stringType().optional(),
		razorpayPaymentId: stringType().optional(),
		paymentId: stringType().min(1),
		paymentStatus: stringType().optional(),
		projectId: stringType().uuid(),
		timestamp: stringType().optional()
	})
};
var SUBJECTS = {
	"account.invite": "Your Athros client portal is ready",
	"account.password-reset": "Reset your Athros password",
	"account.locked": "Your Athros account was temporarily locked",
	"project.status": "Project update from Athros",
	"project.milestone": "Milestone completed",
	"delivery.ready": "Your build is ready to download",
	"payment.receipt": "Payment receipt",
	"meeting.scheduled": "Your Athros call is scheduled",
	"lead.received": "We received your project brief",
	"booking.confirmation": "Your Athros project booking is confirmed",
	"booking.admin-notification": "New Athros Project Booking — Token Payment Received"
};
var LoggingTransport = class {
	async send(message) {
		logger.channel("email").info("email suppressed (no transport configured)", {
			to: message.to,
			subject: message.subject
		});
		return { providerId: null };
	}
};
var transport = new LoggingTransport();
var BRAND = {
	bg: "#05070a",
	card: "#0b1015",
	text: "#e6edf3",
	muted: "#94a3b8",
	accent: "#76b900"
};
function layout(title, bodyHtml) {
	return `<!doctype html><html><body style="margin:0;padding:32px 16px;background:${BRAND.bg};font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.text}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px;background:${BRAND.card};border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:32px">
<tr><td style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:${BRAND.accent};padding-bottom:16px">Athros</td></tr>
<tr><td style="font-size:22px;font-weight:600;padding-bottom:12px">${title}</td></tr>
<tr><td style="font-size:15px;line-height:1.6;color:${BRAND.muted}">${bodyHtml}</td></tr>
<tr><td style="padding-top:28px;font-size:12px;color:rgba(148,163,184,.7)">Athros — AI native app studio</td></tr>
</table></td></tr></table></body></html>`;
}
function button(href, label) {
	return `<p style="margin:24px 0"><a href="${href}" style="display:inline-block;background:${BRAND.accent};color:#05070a;font-weight:600;text-decoration:none;padding:12px 20px;border-radius:10px">${label}</a></p>`;
}
function render(template, payload) {
	const data = payload;
	const subject = SUBJECTS[template];
	let body = "";
	switch (template) {
		case "account.invite":
			body = `<p>Hi ${data["fullName"]},</p><p>Your Athros client portal account is ready. Sign in with the credentials below and change your password on first login.</p>
<p><strong>Email:</strong> ${data["email"]}<br/><strong>Temporary password:</strong> ${data["tempPassword"]}</p>${button(String(data["loginUrl"]), "Open the portal")}`;
			break;
		case "account.password-reset":
			body = `<p>We received a request to reset your password. This link expires in ${data["expiresInMinutes"]} minutes.</p>${button(String(data["resetUrl"]), "Reset password")}<p>If you did not request this, you can ignore this email.</p>`;
			break;
		case "account.locked":
			body = `<p>Your account was temporarily locked after repeated failed sign-in attempts. Access is restored automatically in ${data["unlockMinutes"]} minutes.</p>`;
			break;
		case "project.status":
			body = `<p><strong>${data["projectName"]}</strong> moved to <strong>${data["status"]}</strong> — now ${data["progress"]}% complete.</p>${button(String(data["projectUrl"]), "View progress")}`;
			break;
		case "project.milestone":
			body = `<p>Milestone <strong>${data["milestone"]}</strong> on ${data["projectName"]} is complete.</p>${button(String(data["projectUrl"]), "View timeline")}`;
			break;
		case "delivery.ready":
			body = `<p><strong>${data["label"]}</strong> for ${data["projectName"]} is now available in your portal.</p>${button(String(data["projectUrl"]), "Download build")}`;
			break;
		case "payment.receipt":
			body = `<p>We received your payment of <strong>${data["amount"]}</strong>. Invoice ${data["invoiceNumber"]}.</p>${data["invoiceUrl"] ? button(String(data["invoiceUrl"]), "Download invoice") : ""}`;
			break;
		case "booking.confirmation":
			body = `<p>Hi ${data["customerName"] ?? "there"},</p>
<p>Your Athros project booking <strong>${data["bookingNumber"]}</strong> is confirmed! We have received your token payment of <strong>${data["tokenAmount"]}</strong> for the <strong>${data["packageName"]}</strong> package.</p>
${data["totalAmount"] ? `<p><strong>Total Project Price:</strong> ${data["totalAmount"]}<br/><strong>Token Paid:</strong> ${data["tokenAmount"]}<br/><strong>Remaining Balance:</strong> ${data["remainingBalance"] ?? "N/A"}</p>` : ""}
<p><strong>Expected Next Steps:</strong> ${data["expectedNextStep"] ?? "Our senior engineering team is reviewing your project requirements and will initiate the onboarding and discovery phase within a few hours."}</p>
<p>If you have any questions or need to share additional assets, reach out to us directly at <a href="mailto:${data["contactEmail"] ?? "build@athros.dev"}" style="color:${BRAND.accent}">${data["contactEmail"] ?? "build@athros.dev"}</a>${data["contactPhone"] ? ` or via phone at ${data["contactPhone"]}` : ""}.</p>
${data["dashboardUrl"] ? button(String(data["dashboardUrl"]), "Open Your Dashboard") : ""}`;
			break;
		case "booking.admin-notification":
			body = `<p>Token payment received for booking <strong>${data["bookingNumber"]}</strong>.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;line-height:1.6">
  <tr><td style="color:${BRAND.muted};width:140px">Customer:</td><td><strong>${data["customerName"]}</strong></td></tr>
  <tr><td style="color:${BRAND.muted}">Email:</td><td><a href="mailto:${data["customerEmail"]}" style="color:${BRAND.accent}">${data["customerEmail"]}</a></td></tr>
  ${data["customerPhone"] ? `<tr><td style="color:${BRAND.muted}">Phone:</td><td>${data["customerPhone"]}</td></tr>` : ""}
  ${data["company"] ? `<tr><td style="color:${BRAND.muted}">Company:</td><td>${data["company"]}</td></tr>` : ""}
  <tr><td style="color:${BRAND.muted}">Package:</td><td><strong>${data["packageName"]}</strong> (${data["region"] ?? "N/A"})</td></tr>
  ${data["totalPrice"] ? `<tr><td style="color:${BRAND.muted}">Total Price:</td><td>${data["totalPrice"]}</td></tr>` : ""}
  <tr><td style="color:${BRAND.muted}">Token Paid:</td><td><strong style="color:${BRAND.accent}">${data["tokenAmount"] ?? data["amount"]}</strong></td></tr>
  <tr><td style="color:${BRAND.muted}">Currency:</td><td>${data["currency"] ?? "N/A"}</td></tr>
  ${data["razorpayOrderId"] ? `<tr><td style="color:${BRAND.muted}">Razorpay Order:</td><td><code>${data["razorpayOrderId"]}</code></td></tr>` : ""}
  <tr><td style="color:${BRAND.muted}">Razorpay Payment:</td><td><code>${data["razorpayPaymentId"] ?? data["paymentId"]}</code></td></tr>
  <tr><td style="color:${BRAND.muted}">Payment Status:</td><td><strong>${data["paymentStatus"] ?? "captured"}</strong></td></tr>
  <tr><td style="color:${BRAND.muted}">Project ID:</td><td><code>${data["projectId"]}</code></td></tr>
  <tr><td style="color:${BRAND.muted}">Timestamp:</td><td>${data["timestamp"] ?? (/* @__PURE__ */ new Date()).toISOString()}</td></tr>
</table>`;
			break;
		case "meeting.scheduled":
			body = `<p><strong>${data["title"]}</strong> for ${data["projectName"]} is scheduled for ${data["scheduledAt"]}.</p>${data["meetingLink"] ? button(String(data["meetingLink"]), "Join the call") : ""}`;
			break;
		default: body = `<p>Hi ${data["fullName"] ?? "there"}, thanks for reaching out — our team will reply within one business day.</p>`;
	}
	const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
	return {
		subject,
		html: layout(subject, body),
		text
	};
}
/** Sends immediately and records the outcome. Never throws into the caller's path. */
async function sendEmail(template, to, payload, options = {}) {
	const parsed = EMAIL_TEMPLATES[template].parse(payload);
	const { subject, html, text } = render(template, parsed);
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const { data: row } = await supabaseAdmin.from("email_messages").insert({
		template,
		to_email: to.toLowerCase(),
		subject,
		payload: parsed,
		user_id: options.userId ?? null,
		project_id: options.projectId ?? null,
		status: "pending"
	}).select("id, attempts").single();
	try {
		const { providerId } = await transport.send({
			to,
			subject,
			html,
			text
		});
		if (row) await supabaseAdmin.from("email_messages").update({
			status: "sent",
			sent_at: (/* @__PURE__ */ new Date()).toISOString(),
			provider_id: providerId,
			attempts: row.attempts + 1
		}).eq("id", row.id);
		return {
			sent: true,
			messageId: row?.id ?? null
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		logger.channel("email").error("email send failed", error, {
			template,
			to
		});
		if (row) {
			await supabaseAdmin.from("email_messages").update({
				status: "failed",
				last_error: message.slice(0, 1e3),
				attempts: row.attempts + 1
			}).eq("id", row.id);
			await enqueue("email", { messageId: row.id }).catch(() => void 0);
		}
		return {
			sent: false,
			messageId: row?.id ?? null
		};
	}
}
/** Retries a previously failed message (used by the `email` queue handler). */
async function retryEmail(messageId) {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const { data } = await supabaseAdmin.from("email_messages").select("id, template, to_email, payload, user_id, project_id, status").eq("id", messageId).maybeSingle();
	if (!data || data.status === "sent") return true;
	const template = data.template;
	const schema = EMAIL_TEMPLATES[template];
	if (!schema) return false;
	const parsed = schema.safeParse(data.payload);
	if (!parsed.success) return false;
	return (await sendEmail(template, data.to_email, parsed.data, {
		userId: data.user_id,
		projectId: data.project_id
	})).sent;
}
async function admin() {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	return supabaseAdmin;
}
/** Marks expired/idle sessions revoked and prunes ancient rows. Called by the cleanup job. */
async function cleanupSessions() {
	const db = await admin();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const { data: expired } = await db.from("user_sessions").update({
		revoked: true,
		revoked_at: now,
		revoke_reason: "expired"
	}).eq("revoked", false).or(`expires_at.lt.${now},idle_expires_at.lt.${now}`).select("id");
	const cutoff = (/* @__PURE__ */ new Date(Date.now() - 7776e6)).toISOString();
	const { data: pruned } = await db.from("user_sessions").delete().lt("created_at", cutoff).select("id");
	return {
		expired: expired?.length ?? 0,
		pruned: pruned?.length ?? 0
	};
}
/** Bucket catalogue with upload constraints. Client-safe. */
var STORAGE_BUCKETS = {
	avatars: {
		scope: "user",
		maxBytes: 2097152,
		mimeTypes: [
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/avif"
		],
		optimizeImages: true,
		versioned: false,
		retentionDays: null
	},
	requirements: {
		scope: "project",
		maxBytes: 26214400,
		mimeTypes: [
			"application/pdf",
			"image/png",
			"image/jpeg",
			"image/webp",
			"text/plain",
			"text/markdown",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		],
		optimizeImages: false,
		versioned: true,
		retentionDays: null
	},
	enhancements: {
		scope: "project",
		maxBytes: 26214400,
		mimeTypes: [
			"application/pdf",
			"image/png",
			"image/jpeg",
			"image/webp",
			"text/plain"
		],
		optimizeImages: false,
		versioned: true,
		retentionDays: null
	},
	deliveries: {
		scope: "project",
		maxBytes: 536870912,
		mimeTypes: [
			"application/vnd.android.package-archive",
			"application/octet-stream",
			"application/zip",
			"application/gzip"
		],
		optimizeImages: false,
		versioned: true,
		retentionDays: null
	},
	documents: {
		scope: "project",
		maxBytes: 52428800,
		mimeTypes: [
			"application/pdf",
			"text/plain",
			"text/markdown",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		],
		optimizeImages: false,
		versioned: true,
		retentionDays: null
	},
	"meeting-recordings": {
		scope: "project",
		maxBytes: 1073741824,
		mimeTypes: [
			"video/mp4",
			"video/webm",
			"audio/mpeg",
			"audio/mp4",
			"audio/webm"
		],
		optimizeImages: false,
		versioned: false,
		retentionDays: 365
	},
	"project-assets": {
		scope: "project",
		maxBytes: 104857600,
		mimeTypes: [
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/svg+xml",
			"application/pdf",
			"application/zip"
		],
		optimizeImages: true,
		versioned: true,
		retentionDays: null
	}
};
var bucketNameSchema = enumType(Object.keys(STORAGE_BUCKETS));
objectType({
	bucket: bucketNameSchema,
	/** Project id for project-scoped buckets; ignored for `avatars`. */
	projectId: stringType().uuid().optional(),
	fileName: stringType().trim().min(1).max(180).regex(/^[\w .()-]+$/, "File name may only contain letters, numbers, spaces, . _ - ( )"),
	contentType: stringType().trim().min(3).max(160),
	size: numberType().int().min(1).max(1073741824)
});
objectType({
	bucket: bucketNameSchema,
	path: stringType().trim().min(3).max(400),
	expiresIn: numberType().int().min(30).max(86400).default(600)
});
var PassthroughScanner = class {
	async scan() {
		return { clean: true };
	}
};
new PassthroughScanner();
/** Retention sweep for buckets with a retention window. Called by the storage-cleanup job. */
async function cleanupExpiredObjects() {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const log = logger.channel("app");
	let removed = 0;
	for (const [name, config] of Object.entries(STORAGE_BUCKETS)) {
		if (!config.retentionDays) continue;
		const cutoff = Date.now() - config.retentionDays * 864e5;
		const { data: folders } = await supabaseAdmin.storage.from(name).list("", { limit: 1e3 });
		for (const folder of folders ?? []) {
			const { data: files } = await supabaseAdmin.storage.from(name).list(folder.name, { limit: 1e3 });
			const stale = (files ?? []).filter((file) => new Date(file.created_at ?? Date.now()).getTime() < cutoff).map((file) => `${folder.name}/${file.name}`);
			if (stale.length === 0) continue;
			const { error } = await supabaseAdmin.storage.from(name).remove(stale);
			if (error) log.warn("storage cleanup partial failure", {
				bucket: name,
				error: error.message
			});
			else removed += stale.length;
		}
	}
	return { removed };
}
var registered = false;
/** Binds every queue to its handler. Idempotent; called by the cron endpoint. */
function registerJobHandlers() {
	if (registered) return;
	registered = true;
	registerJobHandler("email", async (job) => {
		const messageId = String(job.payload["messageId"] ?? "");
		if (!messageId) return;
		if (!await retryEmail(messageId)) throw new Error(`email retry failed: ${messageId}`);
	});
	registerJobHandler("webhook-retry", async (job) => {
		const id = String(job.payload["webhookEventId"] ?? "");
		if (!id) return;
		if (!await replayWebhook(id)) throw new Error(`webhook replay failed: ${id}`);
	});
	registerJobHandler("session-cleanup", async () => {
		await cleanupSessions();
	});
	registerJobHandler("storage-cleanup", async () => {
		await cleanupExpiredObjects();
	});
	registerJobHandler("notification", async (job) => {
		const userId = String(job.payload["userId"] ?? "");
		const title = String(job.payload["title"] ?? "");
		if (!userId || !title) return;
		const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
		const { error } = await supabaseAdmin.from("notifications").insert({
			user_id: userId,
			type: String(job.payload["type"] ?? "system"),
			title,
			description: job.payload["description"] ? String(job.payload["description"]) : null,
			link: job.payload["link"] ? String(job.payload["link"]) : null
		});
		if (error) throw new Error(error.message);
	});
}
/** Entry point for the scheduled worker tick. */
async function runWorkerTick() {
	registerJobHandlers();
	return drainQueues();
}
//#endregion
export { runWorkerTick };
