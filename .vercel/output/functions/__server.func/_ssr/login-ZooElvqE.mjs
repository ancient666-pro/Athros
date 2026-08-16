import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Toaster$1, t as Input } from "./input-BrmI0Glv.mjs";
import { t as supabase } from "./client-CyaTTQT8.mjs";
import { n as siteConfig, t as mailtoHref } from "./site-config-B3VafSKt.mjs";
import { ft as ArrowLeft, k as LoaderCircle, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CYrSG8MA.mjs";
import { t as Label } from "./label-B1EfnPDF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-ZooElvqE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [sentReset, setSentReset] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/dashboard",
				replace: true
			});
		});
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (session && event === "SIGNED_IN") navigate({
				to: "/dashboard",
				replace: true
			});
		});
		return () => sub.subscription.unsubscribe();
	}, [navigate]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setBusy(true);
		try {
			if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
				if (error) throw error;
				setSentReset(true);
				toast.success("Reset link sent. Check your inbox.");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (error) throw error;
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Something went wrong");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "noise relative grid min-h-screen place-items-center px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg absolute inset-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 left-[10%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_65%)] blur-3xl" })]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase",
							children: "Athros command center"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-2 text-2xl font-semibold tracking-tight",
							children: mode === "signin" ? "Sign in to your project" : "Reset your password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[13.5px] text-muted-foreground",
							children: mode === "signin" ? "Accounts are created by your Athros delivery lead after your reservation is confirmed. Log in with the credentials emailed to you to follow your project live." : "Enter your work email and we'll send a secure reset link."
						}),
						mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 grid gap-2 text-[13px] text-muted-foreground",
							children: [
								"Live sprint progress and milestone timeline",
								"Build & APK delivery with secure unlocks",
								"Issues, invoices and payment status"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nv" }), item]
							}, item))
						}) : null,
						sentReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 rounded-2xl border border-nv/40 bg-nv/10 p-4 text-[13.5px]",
							children: [
								"We sent a reset link to ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
								". It expires in 60 minutes."
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-6 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "Work email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										autoComplete: "email",
										value: email,
										onChange: (event) => setEmail(event.target.value),
										required: true
									})]
								}),
								mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										autoComplete: "current-password",
										minLength: 8,
										value: password,
										onChange: (event) => setPassword(event.target.value),
										required: true
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: busy,
									className: "mt-1 w-full",
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, mode === "signin" ? "Sign in" : "Send reset link"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-5 w-full text-[13px] text-muted-foreground hover:text-foreground",
							onClick: () => {
								setSentReset(false);
								setMode(mode === "signin" ? "forgot" : "signin");
							},
							children: mode === "signin" ? "Forgot your password?" : "Back to sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-center text-[12px] text-muted-foreground",
							children: [
								"No account yet? Accounts are issued after project approval — email",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline hover:text-foreground",
									href: mailtoHref,
									children: siteConfig.supportEmail
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/login",
							className: "mt-4 flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Athros staff sign in"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { ClientLoginPage as component };
