import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Toaster$1, t as Input } from "./input-BrmI0Glv.mjs";
import { t as supabase } from "./client-CyaTTQT8.mjs";
import { ft as ArrowLeft, k as LoaderCircle, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CYrSG8MA.mjs";
import { t as Label } from "./label-B1EfnPDF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CL8HyZ1U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setBusy(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (error) throw error;
			const { data: staff, error: roleError } = await supabase.rpc("is_staff", { _user_id: data.user.id });
			if (roleError) throw roleError;
			if (!staff) {
				await supabase.auth.signOut();
				toast.error("This account is not an Athros staff account.");
				return;
			}
			navigate({
				to: "/admin",
				replace: true
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Sign in failed");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "noise relative grid min-h-screen place-items-center px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg absolute inset-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 right-[10%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_65%)] blur-3xl" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-6 inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to athros.ai"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-3xl border border-border p-7 shadow-[var(--shadow-float)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Restricted"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-3 text-2xl font-semibold tracking-tight",
							children: "Athros staff sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[13.5px] text-muted-foreground",
							children: "Delivery control panel access for Athros team accounts only. Client accounts should use the client portal."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-6 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "admin-email",
										children: "Staff email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "admin-email",
										type: "email",
										autoComplete: "email",
										value: email,
										onChange: (event) => setEmail(event.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "admin-password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "admin-password",
										type: "password",
										autoComplete: "current-password",
										minLength: 8,
										value: password,
										onChange: (event) => setPassword(event.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: busy,
									className: "mt-1 w-full",
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Sign in to control panel"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "mt-5 block text-center text-[12.5px] text-muted-foreground hover:text-foreground",
							children: "I'm a client — take me to the client portal"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { AdminLoginPage as component };
