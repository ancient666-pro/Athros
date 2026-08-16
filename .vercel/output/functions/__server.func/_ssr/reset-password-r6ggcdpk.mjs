import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Toaster$1, t as Input } from "./input-BrmI0Glv.mjs";
import { t as supabase } from "./client-CyaTTQT8.mjs";
import { k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CYrSG8MA.mjs";
import { t as Label } from "./label-B1EfnPDF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-r6ggcdpk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const isRecovery = window.location.hash.includes("type=recovery");
		supabase.auth.getSession().then(({ data }) => {
			setReady(Boolean(data.session) || isRecovery);
		});
	}, []);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirm) {
			toast.error("Passwords do not match");
			return;
		}
		setBusy(true);
		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			toast.success("Password updated. Signing you in…");
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update password");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "noise relative grid min-h-screen place-items-center px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg absolute inset-0 opacity-60" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass w-full max-w-md rounded-3xl border border-border p-7 shadow-[var(--shadow-float)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase",
						children: "Athros command center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-2 text-2xl font-semibold tracking-tight",
						children: "Set a new password"
					}),
					ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "new-password",
									children: "New password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "new-password",
									type: "password",
									autoComplete: "new-password",
									minLength: 8,
									value: password,
									onChange: (event) => setPassword(event.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "confirm-password",
									children: "Confirm password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "confirm-password",
									type: "password",
									autoComplete: "new-password",
									minLength: 8,
									value: confirm,
									onChange: (event) => setConfirm(event.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: busy,
								className: "mt-1 w-full",
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Update password"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[13.5px] text-muted-foreground",
						children: "This reset link is invalid or has expired. Request a new one from the sign-in page."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { ResetPasswordPage as component };
