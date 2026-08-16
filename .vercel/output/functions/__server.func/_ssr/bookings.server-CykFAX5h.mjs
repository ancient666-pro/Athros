import { a as literalType, i as enumType, l as stringType, o as numberType, s as objectType, t as arrayType } from "../_libs/zod.mjs";
import { t as logger } from "./logger.server--Vgc5D2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.server-CykFAX5h.js
var handlers = /* @__PURE__ */ new Map();
function registerWebhookHandler(provider, handler) {
	handlers.set(provider, handler);
}
/** Timing-safe hex/base64 string comparison. */
function safeEqual(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}
async function hmacHex(secret, body) {
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
	return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
/** Stores + processes a verified delivery. Returns the response status to reply with. */
async function ingestWebhook(input) {
	const log = logger.channel("webhook");
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	if (input.externalId) {
		const { data: existing } = await supabaseAdmin.from("webhook_events").select("id, status").eq("provider", input.provider).eq("external_id", input.externalId).maybeSingle();
		if (existing?.status === "processed") return {
			status: 200,
			body: {
				ok: true,
				deduplicated: true
			}
		};
	}
	let payload = null;
	try {
		payload = JSON.parse(input.rawBody);
	} catch {
		payload = { raw: input.rawBody.slice(0, 4e3) };
	}
	const { data: row } = await supabaseAdmin.from("webhook_events").insert({
		provider: input.provider,
		event_type: input.eventType ?? null,
		external_id: input.externalId ?? null,
		payload,
		headers: input.headers,
		signature_verified: input.signatureVerified,
		status: input.signatureVerified ? "pending" : "rejected"
	}).select("id, attempts").single();
	if (!input.signatureVerified) {
		log.warn("rejected webhook with invalid signature", { provider: input.provider });
		return {
			status: 401,
			body: { error: {
				code: "unauthorized",
				message: "Invalid signature"
			} }
		};
	}
	const handler = handlers.get(input.provider);
	if (!handler) return {
		status: 202,
		body: {
			ok: true,
			queued: true
		}
	};
	try {
		const result = await handler({
			provider: input.provider,
			eventType: input.eventType ?? null,
			payload
		});
		if (row) await supabaseAdmin.from("webhook_events").update({
			status: result.ok ? "processed" : "failed",
			processed_at: result.ok ? (/* @__PURE__ */ new Date()).toISOString() : null,
			last_error: result.ok ? null : result.reason ?? "handler rejected",
			attempts: row.attempts + 1
		}).eq("id", row.id);
		return result.ok ? {
			status: 200,
			body: { ok: true }
		} : {
			status: 422,
			body: { error: {
				code: "unprocessable",
				message: result.reason ?? "Rejected"
			} }
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		log.error("webhook handler threw", error, { provider: input.provider });
		if (row) {
			await supabaseAdmin.from("webhook_events").update({
				status: "failed",
				last_error: message.slice(0, 1e3),
				attempts: row.attempts + 1
			}).eq("id", row.id);
			const { enqueue } = await import("./queue.server-Bldku9ej.mjs");
			await enqueue("webhook-retry", { webhookEventId: row.id }).catch(() => void 0);
		}
		return {
			status: 500,
			body: { error: {
				code: "internal",
				message: "Processing failed"
			} }
		};
	}
}
/** Replays a stored failed delivery through its handler (webhook-retry queue). */
async function replayWebhook(webhookEventId) {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const { data } = await supabaseAdmin.from("webhook_events").select("id, provider, event_type, payload, attempts, status").eq("id", webhookEventId).maybeSingle();
	if (!data || data.status === "processed") return true;
	const handler = handlers.get(data.provider);
	if (!handler) return false;
	const result = await handler({
		provider: data.provider,
		eventType: data.event_type,
		payload: data.payload
	});
	await supabaseAdmin.from("webhook_events").update({
		status: result.ok ? "processed" : "failed",
		processed_at: result.ok ? (/* @__PURE__ */ new Date()).toISOString() : null,
		last_error: result.ok ? null : result.reason ?? "handler rejected",
		attempts: data.attempts + 1
	}).eq("id", data.id);
	return result.ok;
}
/** Money is always integer minor units; reject anything else early. */
function assertMinorUnits(amount) {
	if (!Number.isInteger(amount) || amount < 0) throw new Error("Amount must be a non-negative integer in minor units");
}
var PACKAGE_ENUM = enumType([
	"MVP",
	"PRODUCTION_READY",
	"ENTERPRISE"
]);
var REGION_ENUM = enumType([
	"INDIA",
	"UNITED_STATES",
	"UNITED_KINGDOM",
	"EUROPE",
	"MIDDLE_EAST",
	"SINGAPORE"
]);
var CURRENCY_ENUM = enumType([
	"INR",
	"USD",
	"GBP",
	"EUR",
	"AED",
	"SGD"
]);
var DEFAULT_PRICING_CONFIGS = {
	MVP: {
		INDIA: {
			package: "MVP",
			region: "INDIA",
			currency: "INR",
			full_amount: 6999900,
			token_amount: 1399980,
			token_percentage: 20
		},
		UNITED_STATES: {
			package: "MVP",
			region: "UNITED_STATES",
			currency: "USD",
			full_amount: 149900,
			token_amount: 29980,
			token_percentage: 20
		},
		UNITED_KINGDOM: {
			package: "MVP",
			region: "UNITED_KINGDOM",
			currency: "GBP",
			full_amount: 129900,
			token_amount: 25980,
			token_percentage: 20
		},
		EUROPE: {
			package: "MVP",
			region: "EUROPE",
			currency: "EUR",
			full_amount: 149900,
			token_amount: 29980,
			token_percentage: 20
		},
		MIDDLE_EAST: {
			package: "MVP",
			region: "MIDDLE_EAST",
			currency: "AED",
			full_amount: 549900,
			token_amount: 109980,
			token_percentage: 20
		},
		SINGAPORE: {
			package: "MVP",
			region: "SINGAPORE",
			currency: "SGD",
			full_amount: 199900,
			token_amount: 39980,
			token_percentage: 20
		}
	},
	PRODUCTION_READY: {
		INDIA: {
			package: "PRODUCTION_READY",
			region: "INDIA",
			currency: "INR",
			full_amount: 19999900,
			token_amount: 3999980,
			token_percentage: 20
		},
		UNITED_STATES: {
			package: "PRODUCTION_READY",
			region: "UNITED_STATES",
			currency: "USD",
			full_amount: 499900,
			token_amount: 99980,
			token_percentage: 20
		},
		UNITED_KINGDOM: {
			package: "PRODUCTION_READY",
			region: "UNITED_KINGDOM",
			currency: "GBP",
			full_amount: 429900,
			token_amount: 85980,
			token_percentage: 20
		},
		EUROPE: {
			package: "PRODUCTION_READY",
			region: "EUROPE",
			currency: "EUR",
			full_amount: 499900,
			token_amount: 99980,
			token_percentage: 20
		},
		MIDDLE_EAST: {
			package: "PRODUCTION_READY",
			region: "MIDDLE_EAST",
			currency: "AED",
			full_amount: 1799900,
			token_amount: 359980,
			token_percentage: 20
		},
		SINGAPORE: {
			package: "PRODUCTION_READY",
			region: "SINGAPORE",
			currency: "SGD",
			full_amount: 649900,
			token_amount: 129980,
			token_percentage: 20
		}
	},
	ENTERPRISE: {
		INDIA: {
			package: "ENTERPRISE",
			region: "INDIA",
			currency: "INR",
			full_amount: 39999900,
			token_amount: 7999980,
			token_percentage: 20
		},
		UNITED_STATES: {
			package: "ENTERPRISE",
			region: "UNITED_STATES",
			currency: "USD",
			full_amount: 999900,
			token_amount: 199980,
			token_percentage: 20
		},
		UNITED_KINGDOM: {
			package: "ENTERPRISE",
			region: "UNITED_KINGDOM",
			currency: "GBP",
			full_amount: 859900,
			token_amount: 171980,
			token_percentage: 20
		},
		EUROPE: {
			package: "ENTERPRISE",
			region: "EUROPE",
			currency: "EUR",
			full_amount: 999900,
			token_amount: 199980,
			token_percentage: 20
		},
		MIDDLE_EAST: {
			package: "ENTERPRISE",
			region: "MIDDLE_EAST",
			currency: "AED",
			full_amount: 3599900,
			token_amount: 719980,
			token_percentage: 20
		},
		SINGAPORE: {
			package: "ENTERPRISE",
			region: "SINGAPORE",
			currency: "SGD",
			full_amount: 1299900,
			token_amount: 259980,
			token_percentage: 20
		}
	}
};
var bookingSchema = objectType({
	full_name: stringType().trim().min(2).max(120),
	email: stringType().trim().email().max(254),
	phone: stringType().trim().min(7).max(32),
	company_name: stringType().trim().max(140).optional(),
	country: stringType().trim().length(2),
	project_type: stringType().trim().min(2).max(80),
	selected_package: PACKAGE_ENUM,
	region: REGION_ENUM.optional(),
	project_summary: stringType().trim().min(20).max(5e3),
	estimated_requirements: stringType().trim().max(5e3).optional(),
	preferred_contact_method: enumType([
		"email",
		"phone",
		"whatsapp"
	]),
	company_website: stringType().url().max(500).optional().or(literalType("")),
	existing_app_url: stringType().url().max(500).optional().or(literalType("")),
	reference_links: arrayType(stringType().url().max(500)).max(10).default([]),
	terms_accepted: literalType(true)
});
var db = async () => (await import("./client.server-BFn3nc1a.mjs")).supabaseAdmin;
function trustedRegion(input, request) {
	return {
		IN: "INDIA",
		US: "UNITED_STATES",
		CA: "UNITED_STATES",
		GB: "UNITED_KINGDOM",
		SG: "SINGAPORE",
		MY: "SINGAPORE",
		AE: "MIDDLE_EAST",
		SA: "MIDDLE_EAST",
		QA: "MIDDLE_EAST",
		KW: "MIDDLE_EAST",
		BH: "MIDDLE_EAST",
		OM: "MIDDLE_EAST",
		DE: "EUROPE",
		FR: "EUROPE",
		ES: "EUROPE",
		IT: "EUROPE",
		NL: "EUROPE",
		BE: "EUROPE",
		AT: "EUROPE",
		IE: "EUROPE",
		PT: "EUROPE",
		FI: "EUROPE",
		GR: "EUROPE"
	}[request?.headers.get("cf-ipcountry")?.toUpperCase() || input.country.toUpperCase()] ?? input.region ?? "UNITED_STATES";
}
async function getPriceForPackage(selectedPackage, region) {
	try {
		const priceResult = await (await db()).from("pricing_configurations").select("package, region, currency, full_amount, token_amount, token_percentage").eq("package", selectedPackage).eq("region", region).eq("active", true).lte("effective_from", (/* @__PURE__ */ new Date()).toISOString()).order("effective_from", { ascending: false }).limit(1).maybeSingle();
		if (priceResult?.data) {
			const row = priceResult.data;
			assertMinorUnits(row.token_amount);
			return row;
		}
	} catch {}
	const fallback = DEFAULT_PRICING_CONFIGS[selectedPackage]?.[region];
	if (!fallback) throw new Error("No active price is available for this region");
	assertMinorUnits(fallback.token_amount);
	return fallback;
}
async function razorpayOrder(amount, currency, receipt) {
	const key = process.env["RAZORPAY_KEY_ID"];
	const secret = process.env["RAZORPAY_KEY_SECRET"];
	if (!key || !secret) throw new Error("Razorpay is not configured");
	const auth = btoa(`${key}:${secret}`);
	const response = await fetch("https://api.razorpay.com/v1/orders", {
		method: "POST",
		headers: {
			authorization: `Basic ${auth}`,
			"content-type": "application/json"
		},
		body: JSON.stringify({
			amount,
			currency,
			receipt,
			payment_capture: 1
		})
	});
	if (!response.ok) {
		const errText = await response.text().catch(() => "");
		throw new Error(`Razorpay order creation failed: ${response.status} ${errText}`);
	}
	return objectType({
		id: stringType().min(1),
		amount: numberType().int(),
		currency: stringType().length(3)
	}).parse(await response.json());
}
async function createBooking(input, request, userId) {
	const region = trustedRegion(input, request);
	const price = await getPriceForPackage(input.selected_package, region);
	const number = `ATH-${(/* @__PURE__ */ new Date()).getUTCFullYear()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
	const order = await razorpayOrder(price.token_amount, price.currency, number);
	let bookingId = crypto.randomUUID();
	try {
		const database = await db();
		const insert = await database.from("project_bookings").insert({
			booking_number: number,
			user_id: userId,
			package: input.selected_package,
			region,
			currency: price.currency,
			full_amount: price.full_amount,
			token_amount: price.token_amount,
			token_percentage: price.token_percentage,
			razorpay_order_id: order.id,
			customer_name: input.full_name,
			customer_email: input.email.toLowerCase(),
			customer_phone: input.phone.replace(/\s+/g, ""),
			company_name: input.company_name ?? null,
			country: input.country.toUpperCase(),
			project_type: input.project_type,
			project_summary: input.project_summary,
			estimated_requirements: input.estimated_requirements ?? null,
			preferred_contact_method: input.preferred_contact_method,
			company_website: input.company_website || null,
			existing_app_url: input.existing_app_url || null,
			reference_links: input.reference_links,
			terms_accepted_at: (/* @__PURE__ */ new Date()).toISOString()
		}).select("id, booking_number").single();
		if (insert.data) {
			bookingId = insert.data.id;
			await database.from("booking_payments").insert({
				booking_id: bookingId,
				provider_order_id: order.id,
				amount: price.token_amount,
				currency: price.currency
			});
		}
	} catch (dbError) {
		console.warn("[createBooking] DB insert skipped or deferred:", dbError);
	}
	return {
		bookingId,
		bookingNumber: number,
		orderId: order.id,
		keyId: process.env["RAZORPAY_KEY_ID"] ?? "rzp_test_placeholder",
		amount: order.amount,
		currency: order.currency,
		fullAmount: price.full_amount,
		tokenAmount: price.token_amount,
		tokenPercentage: price.token_percentage,
		packageName: input.selected_package,
		customerName: input.full_name,
		customerEmail: input.email
	};
}
async function verifyCheckout(bookingId, orderId, paymentId, signature) {
	const secret = process.env["RAZORPAY_KEY_SECRET"];
	if (!secret) throw new Error("Razorpay is not configured");
	try {
		const booking = (await (await db()).from("project_bookings").select("id, razorpay_order_id").eq("id", bookingId).maybeSingle())?.data;
		if (booking && booking.razorpay_order_id !== orderId) return false;
	} catch {}
	return safeEqual(await hmacHex(secret, `${orderId}|${paymentId}`), signature);
}
async function processRazorpayPayment(event) {
	const parsed = objectType({
		event: stringType(),
		payload: objectType({ payment: objectType({ entity: objectType({
			id: stringType(),
			order_id: stringType(),
			amount: numberType().int(),
			currency: CURRENCY_ENUM,
			status: stringType()
		}) }) })
	}).safeParse(event);
	if (!parsed.success) return {
		ok: false,
		reason: "Malformed Razorpay payload"
	};
	const payment = parsed.data.payload.payment.entity;
	const database = await db();
	const lookup = await database.from("project_bookings").select("id, full_amount, token_amount, currency, status, project_id, user_id, customer_name, customer_email, customer_phone, company_name, booking_number, package, region, project_summary").eq("razorpay_order_id", payment.order_id).maybeSingle();
	const booking = lookup?.data;
	if (lookup?.error || !booking) return {
		ok: false,
		reason: "Unknown order"
	};
	if (payment.amount !== booking.token_amount || payment.currency !== booking.currency) {
		await database.from("project_bookings").update({
			status: "PAYMENT_REVIEW_REQUIRED",
			payment_status: "failed"
		}).eq("id", booking.id);
		return {
			ok: false,
			reason: "Amount or currency mismatch"
		};
	}
	const captured = ["payment.captured", "order.paid"].includes(parsed.data.event);
	const status = captured ? "captured" : parsed.data.event === "payment.failed" ? "failed" : "authorized";
	await database.from("booking_payments").update({
		provider_payment_id: payment.id,
		status,
		captured_at: captured ? (/* @__PURE__ */ new Date()).toISOString() : null,
		metadata: { event: parsed.data.event }
	}).eq("provider_order_id", payment.order_id);
	if (!captured || booking.status === "TOKEN_PAID") return { ok: true };
	const project = (booking.project_id ? { data: { id: booking.project_id } } : await database.from("projects").insert({
		client_id: booking.user_id,
		name: `Athros project ${booking.booking_number}`,
		summary: booking.project_summary,
		package: booking.package,
		region: booking.region,
		currency: booking.currency,
		status: "discovery",
		progress: 0
	}).select("id").single())?.data;
	if (!project) return {
		ok: false,
		reason: "Project activation failed"
	};
	await database.from("project_bookings").update({
		status: "TOKEN_PAID",
		payment_status: "captured",
		razorpay_payment_id: payment.id,
		project_id: project.id,
		paid_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", booking.id);
	await database.from("audit_logs").insert({
		action: "booking.token_paid",
		entity: "project_booking",
		entity_id: booking.id,
		detail: {
			projectId: project.id,
			paymentId: payment.id
		}
	});
	const { enqueue } = await import("./queue.server-Bldku9ej.mjs");
	const adminEmail = process.env["ATHROS_ADMIN_EMAIL"];
	const dashboardUrl = process.env["APP_URL"] ? `${process.env["APP_URL"]}/dashboard` : void 0;
	const tokenFormatted = `${booking.currency} ${(booking.token_amount / 100).toLocaleString()}`;
	const totalFormatted = `${booking.currency} ${(booking.full_amount / 100).toLocaleString()}`;
	const remainingFormatted = `${booking.currency} ${((booking.full_amount - booking.token_amount) / 100).toLocaleString()}`;
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const messages = [{
		template: "booking.confirmation",
		to_email: booking.customer_email,
		subject: "Your Athros project booking is confirmed",
		project_id: project.id,
		payload: {
			bookingNumber: booking.booking_number,
			customerName: booking.customer_name,
			packageName: booking.package,
			tokenAmount: tokenFormatted,
			totalAmount: totalFormatted,
			remainingBalance: remainingFormatted,
			expectedNextStep: "Our senior engineering team has received your brief and is setting up the discovery and architecture phase.",
			dashboardUrl,
			contactEmail: "build@athros.dev",
			contactPhone: "+1 (315) 482-0199"
		},
		status: "pending"
	}];
	if (adminEmail) messages.push({
		template: "booking.admin-notification",
		to_email: adminEmail,
		subject: "New Athros Project Booking — Token Payment Received",
		project_id: project.id,
		payload: {
			bookingNumber: booking.booking_number,
			customerName: booking.customer_name,
			customerEmail: booking.customer_email,
			customerPhone: booking.customer_phone,
			company: booking.company_name ?? void 0,
			packageName: booking.package,
			region: booking.region,
			totalPrice: totalFormatted,
			tokenAmount: tokenFormatted,
			amount: tokenFormatted,
			currency: booking.currency,
			razorpayOrderId: payment.order_id,
			razorpayPaymentId: payment.id,
			paymentId: payment.id,
			paymentStatus: status,
			projectId: project.id,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		},
		status: "pending"
	});
	const queued = await supabaseAdmin.from("email_messages").insert(messages).select("id");
	for (const row of queued?.data ?? []) await enqueue("email", { messageId: row.id }).catch(() => void 0);
	return { ok: true };
}
//#endregion
export { createBooking as a, ingestWebhook as c, replayWebhook as d, safeEqual as f, bookingSchema as i, processRazorpayPayment as l, verifyCheckout as m, PACKAGE_ENUM as n, getPriceForPackage as o, trustedRegion as p, REGION_ENUM as r, hmacHex as s, DEFAULT_PRICING_CONFIGS as t, registerWebhookHandler as u };
