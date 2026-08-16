import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { a as literalType, l as stringType, s as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads.functions-DSneimNa.js
var leadSchema = objectType({
	fullName: stringType().trim().min(2, "Please enter your name").max(100),
	company: stringType().trim().max(120).optional().or(literalType("")),
	email: stringType().trim().email("Enter a valid email").max(255),
	phone: stringType().trim().max(32).optional().or(literalType("")),
	projectType: stringType().trim().max(60).optional().or(literalType("")),
	budget: stringType().trim().max(60).optional().or(literalType("")),
	timeline: stringType().trim().max(60).optional().or(literalType("")),
	platforms: arrayType(stringType().trim().max(40)).max(8).default([]),
	message: stringType().trim().max(2e3).optional().or(literalType("")),
	referralSource: stringType().trim().max(80).optional().or(literalType(""))
});
var submitLead_createServerFn_handler = createServerRpc({
	id: "e211e8c27eee0a1053129b7769a37cb2e31b3dc869a84a1c647eee19cfb57993",
	name: "submitLead",
	filename: "src/lib/leads.functions.ts"
}, (opts) => submitLead.__executeServer(opts));
var submitLead = createServerFn({ method: "POST" }).inputValidator((data) => leadSchema.parse(data)).handler(submitLead_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const { error } = await supabaseAdmin.from("leads").insert({
		full_name: data.fullName,
		company: data.company || null,
		email: data.email,
		phone: data.phone || null,
		project_type: data.projectType || null,
		budget: data.budget || null,
		timeline: data.timeline || null,
		platforms: data.platforms,
		message: data.message || null,
		referral_source: data.referralSource || null,
		source: "landing_cta"
	});
	if (error) {
		console.error("lead insert failed", error.message);
		throw new Error("We could not save your request. Please try again.");
	}
	const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
	if (webhook) try {
		const response = await fetch(webhook, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...data,
				submittedAt: (/* @__PURE__ */ new Date()).toISOString()
			})
		});
		if (!response.ok) console.error(`Sheets webhook failed [${response.status}]: ${await response.text()}`);
	} catch (sheetError) {
		console.error("Sheets webhook error", sheetError);
	}
	return { ok: true };
});
//#endregion
export { submitLead_createServerFn_handler };
