import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B-tb0t5S.mjs";
import { a as literalType, l as stringType, s as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accounts.functions-C_RXhFJz.js
var createAccountSchema = objectType({
	email: stringType().trim().email().max(255),
	fullName: stringType().trim().min(2).max(120),
	company: stringType().trim().max(120).optional().or(literalType("")),
	projectName: stringType().trim().min(2).max(120)
});
function generateTempPassword() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
	const bytes = /* @__PURE__ */ new Uint8Array(16);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (byte) => alphabet[byte % 62]).join("");
}
/**
* Invitation-only account provisioning. Staff-verified through the caller's own
* RLS-scoped client before any privileged (service role) work happens.
*/
var createClientAccount_createServerFn_handler = createServerRpc({
	id: "1cc65e25955cbc3f42c8627468f0d186a05cdb2096664cfc3ff10537465732d8",
	name: "createClientAccount",
	filename: "src/lib/accounts.functions.ts"
}, (opts) => createClientAccount.__executeServer(opts));
var createClientAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => createAccountSchema.parse(data)).handler(createClientAccount_createServerFn_handler, async ({ data, context }) => {
	const { data: isStaff } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
	if (!isStaff) throw new Error("Forbidden");
	const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
	const tempPassword = generateTempPassword();
	const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
		email: data.email,
		password: tempPassword,
		email_confirm: true,
		user_metadata: {
			full_name: data.fullName,
			company: data.company || null
		}
	});
	if (createError || !created.user) throw new Error(createError?.message ?? "Could not create the account");
	const clientId = created.user.id;
	const { error: projectError } = await supabaseAdmin.from("projects").insert({
		client_id: clientId,
		name: data.projectName,
		status: "discovery",
		progress: 0
	});
	if (projectError) throw new Error(projectError.message);
	await supabaseAdmin.from("audit_logs").insert({
		actor_id: context.userId,
		action: "client_account_created",
		entity: "auth.users",
		entity_id: clientId,
		detail: {
			email: data.email,
			project: data.projectName
		}
	});
	return {
		ok: true,
		email: data.email,
		tempPassword
	};
});
var getAuditLog_createServerFn_handler = createServerRpc({
	id: "de77ae5cd9ad7fbf4dbbca82108a85c082517651a52a2ca45d500a9ff5fe4cfc",
	name: "getAuditLog",
	filename: "src/lib/accounts.functions.ts"
}, (opts) => getAuditLog.__executeServer(opts));
var getAuditLog = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAuditLog_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("audit_logs").select("id, actor_id, action, entity, entity_id, detail, old_value, new_value, user_agent, created_at").order("created_at", { ascending: false }).limit(50);
	if (error) throw new Error(error.message);
	return data ?? [];
});
//#endregion
export { createClientAccount_createServerFn_handler, getAuditLog_createServerFn_handler };
