import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B-tb0t5S.mjs";
import { a as literalType, l as stringType, s as objectType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-QYZFi3Fq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-BrmI0Glv.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { D as Lock, O as LockOpen, a as UserPlus, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PortalShell, t as Badge } from "./badge-BJAdSnW3.mjs";
import { d as setProjectProgress, r as getAdminOverview, t as Progress, u as setDeliveryLock } from "./progress-BKRw2F6V.mjs";
import { t as Button } from "./button-CYrSG8MA.mjs";
import { t as Label } from "./label-B1EfnPDF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-oZVQGLur.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createAccountSchema = objectType({
	email: stringType().trim().email().max(255),
	fullName: stringType().trim().min(2).max(120),
	company: stringType().trim().max(120).optional().or(literalType("")),
	projectName: stringType().trim().min(2).max(120)
});
/**
* Invitation-only account provisioning. Staff-verified through the caller's own
* RLS-scoped client before any privileged (service role) work happens.
*/
var createClientAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => createAccountSchema.parse(data)).handler(createSsrRpc("1cc65e25955cbc3f42c8627468f0d186a05cdb2096664cfc3ff10537465732d8"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("de77ae5cd9ad7fbf4dbbca82108a85c082517651a52a2ca45d500a9ff5fe4cfc"));
/** Invitation-only provisioning: staff creates the account and hands over credentials. */
function ProvisionClientCard({ onCreated }) {
	const provision = useServerFn(createClientAccount);
	const [email, setEmail] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [projectName, setProjectName] = (0, import_react.useState)("");
	const [credentials, setCredentials] = (0, import_react.useState)(null);
	const mutation = useMutation({
		mutationFn: () => provision({ data: {
			email,
			fullName,
			company,
			projectName
		} }),
		onSuccess: (result) => {
			setCredentials({
				email: result.email,
				tempPassword: result.tempPassword
			});
			setEmail("");
			setFullName("");
			setCompany("");
			setProjectName("");
			toast.success("Account created — share the temporary password securely.");
			onCreated?.();
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "glass rounded-3xl border border-border p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 text-nv" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold tracking-tight",
					children: "Generate client account"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-[13px] text-muted-foreground",
				children: "Creates the login, assigns a project and returns a one-time temporary password."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 grid gap-3 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					mutation.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "client-name",
							children: "Client name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "client-name",
							value: fullName,
							onChange: (event) => setFullName(event.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "client-email",
							children: "Client email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "client-email",
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "client-company",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "client-company",
							value: company,
							onChange: (event) => setCompany(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "client-project",
							children: "Project name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "client-project",
							value: projectName,
							onChange: (event) => setProjectName(event.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: mutation.isPending,
						className: "sm:col-span-2",
						children: [mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Create account & project"]
					})
				]
			}),
			credentials ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-2xl border border-nv/40 bg-nv/10 p-4 text-[13px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Share these credentials once, then delete this view."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-[12.5px] break-all",
						children: [
							credentials.email,
							" · ",
							credentials.tempPassword
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							"Dashboard URL: ",
							typeof window !== "undefined" ? window.location.origin : "",
							"/login"
						]
					})
				]
			}) : null
		]
	});
}
function AdminPage() {
	const queryClient = useQueryClient();
	const fetchOverview = useServerFn(getAdminOverview);
	const saveProgress = useServerFn(setProjectProgress);
	const toggleLock = useServerFn(setDeliveryLock);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const { data, isPending, error } = useQuery({
		queryKey: ["admin-overview"],
		queryFn: () => fetchOverview(),
		retry: false
	});
	const progressMutation = useMutation({
		mutationFn: (input) => saveProgress({ data: input }),
		onSuccess: () => {
			toast.success("Progress updated");
			queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
		},
		onError: (mutationError) => toast.error(mutationError.message)
	});
	const lockMutation = useMutation({
		mutationFn: (input) => toggleLock({ data: input }),
		onSuccess: () => {
			toast.success("Delivery updated");
			queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
		},
		onError: (mutationError) => toast.error(mutationError.message)
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		isAdmin: true,
		subtitle: "Admin portal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-64 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-nv" })
		})
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		subtitle: "Admin portal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 rounded-2xl border border-border p-6 text-[14px] text-muted-foreground",
			children: "This area is restricted to Athros staff accounts."
		})
	});
	const clientName = (clientId) => data.clients.find((client) => client.id === clientId)?.full_name ?? "Unassigned client";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		isAdmin: true,
		subtitle: "Admin portal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Delivery control"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-[14px] text-muted-foreground",
				children: [
					data.clients.length,
					" clients · ",
					data.projects.length,
					" projects · ",
					data.deliveries.length,
					" builds"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvisionClientCard, { onCreated: () => queryClient.invalidateQueries({ queryKey: ["admin-overview"] }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-4",
				children: [data.projects.map((project) => {
					const draft = drafts[project.id] ?? project.progress;
					const projectDeliveries = data.deliveries.filter((delivery) => delivery.project_id === project.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass rounded-3xl border border-border p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
									children: clientName(project.client_id)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display mt-1 text-xl font-semibold tracking-tight",
									children: project.name
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "rounded-full capitalize",
									children: project.status.replace(/_/g, " ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: project.progress,
								className: "mt-4 h-1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 100,
									value: draft,
									onChange: (event) => setDrafts((prev) => ({
										...prev,
										[project.id]: Number(event.target.value)
									})),
									className: "w-24"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									disabled: progressMutation.isPending,
									onClick: () => progressMutation.mutate({
										projectId: project.id,
										progress: Math.max(0, Math.min(100, draft))
									}),
									children: "Save progress"
								})]
							}),
							projectDeliveries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 grid gap-2",
								children: projectDeliveries.map((delivery) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 rounded-2xl border border-border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[14px]",
										children: [delivery.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 font-mono text-[11px] text-muted-foreground uppercase",
											children: delivery.kind
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: delivery.unlocked ? "outline" : "default",
										disabled: lockMutation.isPending,
										onClick: () => lockMutation.mutate({
											id: delivery.id,
											unlocked: !delivery.unlocked
										}),
										children: delivery.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-3.5 w-3.5" }), " Unlocked"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), " Unlock"] })
									})]
								}, delivery.id))
							}) : null
						]
					}, project.id);
				}), data.projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-border p-6 text-[14px] text-muted-foreground",
					children: "No client projects yet."
				}) : null]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
