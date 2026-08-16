import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-QYZFi3Fq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as cn, t as Input } from "./input-BrmI0Glv.mjs";
import { n as siteConfig, r as telHref, t as mailtoHref } from "./site-config-B3VafSKt.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { $ as CircleCheck, D as Lock, F as KeyRound, G as ExternalLink, H as FileText, K as Download, N as Layers, P as Laptop, Q as Circle, R as Github, Z as Clock, _ as RefreshCw, at as Calendar, d as Sparkles, et as CircleAlert, i as User, it as Check, k as LoaderCircle, m as Send, n as Video, p as ShieldCheck, pt as Activity, q as CreditCard, rt as ChevronDown, s as TriangleAlert, st as Bell, tt as ChevronUp, v as Radio, y as Plus } from "../_libs/lucide-react.mjs";
import { n as PortalShell, t as Badge } from "./badge-BJAdSnW3.mjs";
import { a as markNotificationRead, c as requestEnhancement, f as submitRequirement, i as getMyPortal, l as revokeClientSession, m as updateMyProfile, n as addEnhancementComment, o as replyToIssue, p as updateClientPassword, s as reportIssue, t as Progress } from "./progress-BKRw2F6V.mjs";
import { t as Button } from "./button-CYrSG8MA.mjs";
import { t as Label } from "./label-B1EfnPDF.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BcDnHXwO.mjs";
import { t as Textarea } from "./textarea-CbAnLG2T.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CUp0-Zz6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var LIFECYCLE_STAGES = [
	{
		key: "discovery",
		label: "Discovery",
		desc: "Briefing & Architecture"
	},
	{
		key: "requirements",
		label: "Requirements",
		desc: "Scope & Specifications"
	},
	{
		key: "design",
		label: "Design",
		desc: "UI/UX & Design Tokens"
	},
	{
		key: "development",
		label: "Development",
		desc: "Native Sprint Delivery"
	},
	{
		key: "testing",
		label: "QA & Testing",
		desc: "Automated & Device QA"
	},
	{
		key: "uat",
		label: "Client Review",
		desc: "Beta Builds & Sign-off"
	},
	{
		key: "delivery",
		label: "Delivery",
		desc: "Signed Builds & Release"
	},
	{
		key: "completed",
		label: "Completed",
		desc: "Production Handover"
	}
];
function statusColor(status) {
	switch (status?.toLowerCase()) {
		case "completed":
		case "done":
		case "paid":
		case "approved":
		case "resolved":
		case "captured": return "bg-nv/20 text-nv border-nv/40";
		case "in_progress":
		case "under_review":
		case "submitted":
		case "triaged": return "bg-amber-500/15 text-amber-300 border-amber-500/30";
		case "urgent":
		case "critical":
		case "failed":
		case "rejected": return "bg-red-500/15 text-red-300 border-red-500/30";
		default: return "bg-muted/40 text-muted-foreground border-border";
	}
}
function CommandCenterDashboard() {
	const queryClient = useQueryClient();
	const fetchPortal = useServerFn(getMyPortal);
	const submitReqFn = useServerFn(submitRequirement);
	const requestEnhanceFn = useServerFn(requestEnhancement);
	const addEnhanceCommentFn = useServerFn(addEnhancementComment);
	const reportIssueFn = useServerFn(reportIssue);
	const replyIssueFn = useServerFn(replyToIssue);
	const markReadFn = useServerFn(markNotificationRead);
	const updatePasswordFn = useServerFn(updateClientPassword);
	const revokeSessionFn = useServerFn(revokeClientSession);
	const updateProfileFn = useServerFn(updateMyProfile);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [reqModalOpen, setReqModalOpen] = (0, import_react.useState)(false);
	const [reqTitle, setReqTitle] = (0, import_react.useState)("");
	const [reqBody, setReqBody] = (0, import_react.useState)("");
	const [enhanceModalOpen, setEnhanceModalOpen] = (0, import_react.useState)(false);
	const [enhanceTitle, setEnhanceTitle] = (0, import_react.useState)("");
	const [enhanceDesc, setEnhanceDesc] = (0, import_react.useState)("");
	const [enhancePriority, setEnhancePriority] = (0, import_react.useState)("medium");
	const [issueModalOpen, setIssueModalOpen] = (0, import_react.useState)(false);
	const [issueTitle, setIssueTitle] = (0, import_react.useState)("");
	const [issueDetail, setIssueDetail] = (0, import_react.useState)("");
	const [issueSeverity, setIssueSeverity] = (0, import_react.useState)("medium");
	const [commentInputs, setCommentInputs] = (0, import_react.useState)({});
	const [replyInputs, setReplyInputs] = (0, import_react.useState)({});
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [profileName, setProfileName] = (0, import_react.useState)("");
	const [profileCompany, setProfileCompany] = (0, import_react.useState)("");
	const [profilePhone, setProfilePhone] = (0, import_react.useState)("");
	const [profileInitialized, setProfileInitialized] = (0, import_react.useState)(false);
	const { data, isPending, error, refetch, isRefetching } = useQuery({
		queryKey: ["portal"],
		queryFn: async () => {
			return await fetchPortal();
		}
	});
	if (data?.profile && !profileInitialized) {
		setProfileName(data.profile.full_name ?? "");
		setProfileCompany(data.profile.company ?? "");
		setProfilePhone(data.profile.phone ?? "");
		setProfileInitialized(true);
	}
	const reqMutation = useMutation({
		mutationFn: (input) => submitReqFn({ data: input }),
		onSuccess: () => {
			toast.success("Requirement submitted successfully");
			setReqModalOpen(false);
			setReqTitle("");
			setReqBody("");
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const enhanceMutation = useMutation({
		mutationFn: (input) => requestEnhanceFn({ data: input }),
		onSuccess: () => {
			toast.success("Enhancement requested");
			setEnhanceModalOpen(false);
			setEnhanceTitle("");
			setEnhanceDesc("");
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const enhanceCommentMutation = useMutation({
		mutationFn: (input) => addEnhanceCommentFn({ data: input }),
		onSuccess: (_, vars) => {
			toast.success("Comment added");
			setCommentInputs((prev) => ({
				...prev,
				[vars.enhancementId]: ""
			}));
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const issueMutation = useMutation({
		mutationFn: (input) => reportIssueFn({ data: input }),
		onSuccess: () => {
			toast.success("Issue reported to engineering team");
			setIssueModalOpen(false);
			setIssueTitle("");
			setIssueDetail("");
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const issueReplyMutation = useMutation({
		mutationFn: (input) => replyIssueFn({ data: input }),
		onSuccess: (_, vars) => {
			toast.success("Reply posted");
			setReplyInputs((prev) => ({
				...prev,
				[vars.issueId]: ""
			}));
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const notificationReadMutation = useMutation({
		mutationFn: (input) => markReadFn({ data: input }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		}
	});
	const passwordMutation = useMutation({
		mutationFn: (pwd) => updatePasswordFn({ data: { newPassword: pwd } }),
		onSuccess: () => {
			toast.success("Password updated successfully");
			setNewPassword("");
			setConfirmPassword("");
		},
		onError: (err) => toast.error(err.message)
	});
	const sessionRevokeMutation = useMutation({
		mutationFn: (sessionId) => revokeSessionFn({ data: { sessionId } }),
		onSuccess: () => {
			toast.success("Session revoked");
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const profileMutation = useMutation({
		mutationFn: (input) => updateProfileFn({ data: input }),
		onSuccess: () => {
			toast.success("Profile updated");
			queryClient.invalidateQueries({ queryKey: ["portal"] });
		},
		onError: (err) => toast.error(err.message)
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		subtitle: "Command Center · Initializing",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-72 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-3 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-nv" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Connecting to secure project workspace…"
				})]
			})
		})
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		subtitle: "Command Center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass mt-6 rounded-3xl border border-border p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Unable to load workspace"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"We couldn't retrieve your project records. Please refresh or contact your lead engineer at",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-nv underline",
							href: mailtoHref,
							children: siteConfig.supportEmail
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => refetch(),
					className: "mt-4",
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-2 h-4 w-4" }), " Retry"]
				})
			]
		})
	});
	const { project, booking, profile, isAdmin, milestones, requirements, enhancements, issues, invoices, meetings, deliveries, notifications, sessions, financials } = data;
	const unreadNotifications = notifications.filter((n) => !n.read);
	const openIssues = issues.filter((i) => i.status !== "resolved" && i.status !== "closed");
	const currentStatus = project?.status?.toLowerCase() ?? "discovery";
	const currentStageIndex = LIFECYCLE_STAGES.findIndex((s) => s.key === currentStatus);
	const resolvedStageIndex = currentStageIndex >= 0 ? currentStageIndex : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		isAdmin,
		subtitle: "Client Command Center",
		unreadCount: unreadNotifications.length,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold tracking-tight sm:text-3xl",
						children: project ? project.name : `Welcome, ${profile?.full_name ?? "Founder"}`
					}), project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: cn("rounded-full border px-3 py-0.5 text-xs font-semibold capitalize", statusColor(project.status)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" }), project.status.replace(/_/g, " ")]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
					children: [
						booking?.booking_number ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] text-muted-foreground",
							children: ["Ref: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: booking.booking_number
							})]
						}) : null,
						booking?.package ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "rounded-full text-[11px]",
							children: booking.package.replace(/_/g, " ")
						}) : null,
						project?.currency ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px]",
							children: [
								"Region: ",
								project.region ?? "Global",
								" (",
								project.currency,
								")"
							]
						}) : null,
						project?.progress !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[12px] font-medium text-foreground",
							children: ["Progress: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-nv",
								children: [project.progress, "%"]
							})]
						}) : null
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => refetch(),
						disabled: isRefetching,
						className: "rounded-full text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("mr-1.5 h-3.5 w-3.5", isRefetching && "animate-spin text-nv") }), "Sync"]
					}), project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setReqModalOpen(true),
						className: "rounded-full bg-nv text-slate-950 hover:bg-nv/90 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Submit Brief"]
					}) : null]
				})]
			}),
			!project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass mt-8 rounded-3xl border border-border p-8 sm:p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-nv/10 text-nv",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-4 text-2xl font-bold",
						children: "Project Onboarding in Progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-lg text-sm text-muted-foreground",
						children: "Your Athros reservation is verified. Our senior architecture team is preparing your dedicated sprint timeline, repository, and deliverable channels."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: siteConfig.bookingUrl,
								target: "_blank",
								rel: "noreferrer",
								children: "Book a Kickoff Call"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: telHref,
								children: ["Direct Desk: ", siteConfig.supportPhone]
							})
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: activeTab,
				onValueChange: setActiveTab,
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "glass h-auto flex-nowrap gap-1 rounded-2xl border border-border p-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "overview",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mr-1.5 h-3.5 w-3.5" }), " Overview"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "project",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "mr-1.5 h-3.5 w-3.5" }), " Lifecycle & Milestones"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "requirements",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Requirements (",
										requirements.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "enhancements",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Enhancements (",
										enhancements.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "issues",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Issues (",
										openIssues.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "payments",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "mr-1.5 h-3.5 w-3.5" }), " Payments & Invoices"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "meetings",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Meetings (",
										meetings.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "notifications",
									className: "rounded-xl text-xs font-medium py-2 px-3 relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Notifications",
										unreadNotifications.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1.5 inline-grid h-4 w-4 place-items-center rounded-full bg-nv text-[10px] font-bold text-slate-950",
											children: unreadNotifications.length
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "delivery",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Deliverables (",
										deliveries.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "security",
									className: "rounded-xl text-xs font-medium py-2 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-1.5 h-3.5 w-3.5" }), " Account & Security"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "overview",
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Sprint Completion"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display mt-2 text-3xl font-bold tracking-tight",
											children: [project.progress, "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											value: project.progress,
											className: "mt-3 h-2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-[11.5px] text-muted-foreground capitalize",
											children: ["Current: ", project.status.replace(/_/g, " ")]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Milestones"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display mt-2 text-3xl font-bold tracking-tight",
											children: [
												milestones.filter((m) => m.status === "done" || m.status === "completed").length,
												" / ",
												milestones.length
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-[11.5px] text-muted-foreground",
											children: milestones.length === 0 ? "Initial sprint breakdown pending" : "Milestones published"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Open Issues"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display mt-2 text-3xl font-bold tracking-tight",
											children: openIssues.length
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-[11.5px] text-muted-foreground",
											children: openIssues.length === 0 ? "Zero blocking defects" : `${openIssues.length} active bug / inquiry tickets`
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Financial Balance"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display mt-2 text-2xl font-bold",
											children: [
												financials.currency,
												" ",
												(financials.remainingBalance / 100).toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-[11.5px] text-muted-foreground",
											children: [
												"Token Paid: ",
												financials.currency,
												" ",
												(financials.tokenPaid / 100).toLocaleString()
											]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 lg:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-3xl border border-border p-6 lg:col-span-2 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-lg font-semibold",
											children: "Active Sprint Overview"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "rounded-full text-xs",
											children: ["Phase: ", LIFECYCLE_STAGES[resolvedStageIndex]?.label]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: project.summary || "Your custom native mobile application build is progressing through our automated pipeline and senior engineering review."
									}),
									milestones.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-2xl border border-border/80 bg-background/50 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-nv",
												children: "NEXT MILESTONE TARGET"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display mt-1 text-base font-semibold",
												children: milestones[0]?.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: milestones[0]?.detail
											}),
											milestones[0]?.due_date ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 font-mono text-[11px] text-muted-foreground",
												children: ["Target Date: ", milestones[0].due_date]
											}) : null
										]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => setActiveTab("requirements"),
												className: "rounded-full text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1.5 h-3.5 w-3.5" }), " Submit Requirements"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => setActiveTab("enhancements"),
												className: "rounded-full text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }), " Request Feature"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => setActiveTab("issues"),
												className: "rounded-full text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mr-1.5 h-3.5 w-3.5" }), " Raise Ticket"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => setActiveTab("delivery"),
												className: "rounded-full text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-3.5 w-3.5" }), " Check Deliverables"]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-3xl border border-border p-6 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-display text-base font-semibold flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-nv" }), " Activity Feed"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => setActiveTab("notifications"),
										className: "text-xs text-muted-foreground",
										children: "View all"
									})]
								}), notifications.slice(0, 4).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground py-6 text-center",
									children: "No notifications yet."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: notifications.slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-xs border-b border-border/40 pb-2.5 last:border-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-medium text-foreground flex items-center gap-1.5",
												children: [!n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-nv" }) : null, n.title]
											}),
											n.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground text-[11px] line-clamp-1 mt-0.5",
												children: n.description
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[10px] text-muted-foreground/70 mt-1",
												children: new Date(n.created_at).toLocaleDateString()
											})
										]
									}, n.id))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Support Lead" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: mailtoHref,
										className: "text-nv hover:underline",
										children: siteConfig.supportEmail
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "project",
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Project Lifecycle Pipeline"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Authoritative delivery stages governed by our automated verification state machine."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8",
									children: LIFECYCLE_STAGES.map((stage, idx) => {
										const isCurrent = stage.key === currentStatus;
										const isPassed = idx < resolvedStageIndex;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("rounded-2xl border p-3.5 flex flex-col justify-between transition-all", isCurrent ? "border-nv bg-nv/10 shadow-[0_0_20px_rgba(118,185,0,0.15)]" : isPassed ? "border-nv/40 bg-card/60" : "border-border/60 bg-muted/20 opacity-50"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-[10px] text-muted-foreground",
													children: ["0", idx + 1]
												}), isPassed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-nv" }) : isCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-3.5 w-3.5 text-nv animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 text-muted-foreground/50" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: cn("font-display text-xs font-semibold", isCurrent ? "text-nv" : "text-foreground"),
													children: stage.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground leading-tight mt-0.5",
													children: stage.desc
												})]
											})]
										}, stage.key);
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Sprint Milestones"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Chronological deliverables and QA verification gates."
								})] })
							}), milestones.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mx-auto h-8 w-8 text-muted-foreground/60 mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Sprint timeline is being drafted"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-sm mx-auto mt-1",
										children: "Your dedicated project manager will publish the granular sprint checkpoints once discovery is signed off."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "relative ml-3 border-l border-border/80 pl-6 space-y-6",
								children: milestones.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border bg-card", m.status === "done" || m.status === "completed" ? "border-nv text-nv" : "border-border text-muted-foreground"),
										children: m.status === "done" || m.status === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors group-hover:border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-semibold",
													children: m.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: cn("capitalize text-[10.5px] rounded-full", statusColor(m.status)),
													children: m.status.replace(/_/g, " ")
												})]
											}),
											m.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: m.detail
											}) : null,
											m.due_date ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 font-mono text-[11px] text-muted-foreground/80",
												children: ["Target Delivery: ", m.due_date]
											}) : null
										]
									})]
								}, m.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "requirements",
						className: "mt-6 space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Project Requirements & Briefs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Versioned requirements submitted by your team and approved by Athros engineers."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => setReqModalOpen(true),
									className: "rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " New Requirement Brief"]
								})]
							}), requirements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-8 w-8 text-muted-foreground/60 mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "No requirements submitted yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-sm mx-auto mt-1",
										children: "Upload your project specifications, user stories, or API documentation for engineering sign-off."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: requirements.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border border-border/80 bg-card/40 p-5 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-lg bg-nv/15 px-2 py-0.5 font-mono text-xs font-bold text-nv",
													children: ["v", req.version]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-display text-base font-semibold",
													children: req.title
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: cn("rounded-full text-xs capitalize", statusColor(req.approval_status)),
												children: req.approval_status.replace(/_/g, " ")
											})]
										}),
										req.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed",
											children: req.body
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3 text-[11px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Submitted: ", new Date(req.created_at).toLocaleDateString()] }), req.reviewed_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reviewed: ", new Date(req.reviewed_at).toLocaleDateString()] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-amber-400",
												children: "Engineering Review Pending"
											})]
										})
									]
								}, req.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "enhancements",
						className: "mt-6 space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Scope Enhancements & Feature Requests"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Request additional capabilities, revisions, or technical integrations during your sprint."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => setEnhanceModalOpen(true),
									className: "rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Request Feature Enhancement"]
								})]
							}), enhancements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mx-auto h-8 w-8 text-muted-foreground/60 mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "No enhancement requests"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-sm mx-auto mt-1",
										children: "Have an idea or new feature to explore? Submit an enhancement request to estimate sprint impact."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: enhancements.map((enh) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border border-border/80 bg-card/40 p-5 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-base font-semibold",
											children: enh.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted-foreground",
											children: enh.description
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "rounded-full text-[10.5px] uppercase",
												children: ["Priority: ", enh.priority]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: cn("rounded-full text-xs capitalize", statusColor(enh.status)),
												children: enh.status.replace(/_/g, " ")
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/40 bg-background/50 p-4 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
												children: [
													"Discussion (",
													enh.comments.length,
													")"
												]
											}),
											enh.comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground/70",
												children: "No comments yet. Post below to start the thread."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-2 max-h-48 overflow-y-auto pr-1",
												children: enh.comments.map((cmt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg bg-card/70 p-2.5 text-xs border border-border/30",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-foreground",
														children: cmt.body
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-mono text-[10px] text-muted-foreground/70 mt-1",
														children: new Date(cmt.created_at).toLocaleString()
													})]
												}, cmt.id))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Add a comment or question...",
													value: commentInputs[enh.id] ?? "",
													onChange: (e) => setCommentInputs((prev) => ({
														...prev,
														[enh.id]: e.target.value
													})),
													className: "h-8 text-xs bg-background"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													disabled: !commentInputs[enh.id]?.trim() || enhanceCommentMutation.isPending,
													onClick: () => enhanceCommentMutation.mutate({
														enhancementId: enh.id,
														body: commentInputs[enh.id].trim()
													}),
													className: "h-8 rounded-lg text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" })
												})]
											})
										]
									})]
								}, enh.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "issues",
						className: "mt-6 space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Issue Tracker & QA Tickets"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Report defects, regressions, or behavior inquiries directly to the engineering team."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => setIssueModalOpen(true),
									className: "rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Report Issue"]
								})]
							}), issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-8 w-8 text-nv mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Clean build · Zero open issues"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-sm mx-auto mt-1",
										children: "No defects reported. If you encounter an anomaly on your test device, report it here."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: issues.map((iss) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border border-border/80 bg-card/40 p-5 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs font-semibold text-nv",
												children: ["#", iss.issue_number]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display text-base font-semibold",
												children: iss.title
											})]
										}), iss.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: iss.detail
										}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "rounded-full text-[10.5px] uppercase",
												children: iss.severity
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: cn("rounded-full text-xs capitalize", statusColor(iss.status)),
												children: iss.status.replace(/_/g, " ")
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/40 bg-background/50 p-4 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
												children: [
													"Engineering Activity & Replies (",
													iss.replies.length,
													")"
												]
											}),
											iss.replies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground/70",
												children: "Awaiting engineering triage."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-2 max-h-48 overflow-y-auto pr-1",
												children: iss.replies.map((rep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg bg-card/70 p-2.5 text-xs border border-border/30",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-foreground",
														children: rep.body
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-mono text-[10px] text-muted-foreground/70 mt-1",
														children: new Date(rep.created_at).toLocaleString()
													})]
												}, rep.id))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Reply or provide more test context...",
													value: replyInputs[iss.id] ?? "",
													onChange: (e) => setReplyInputs((prev) => ({
														...prev,
														[iss.id]: e.target.value
													})),
													className: "h-8 text-xs bg-background"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													disabled: !replyInputs[iss.id]?.trim() || issueReplyMutation.isPending,
													onClick: () => issueReplyMutation.mutate({
														issueId: iss.id,
														body: replyInputs[iss.id].trim()
													}),
													className: "h-8 rounded-lg text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" })
												})]
											})
										]
									})]
								}, iss.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "payments",
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Total Project Value"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display mt-2 text-2xl font-bold",
											children: [
												financials.currency,
												" ",
												(financials.totalAmount / 100).toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: "Agreed regional contract pricing"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Token Deposit Paid (20%)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display mt-2 text-2xl font-bold text-nv",
											children: [
												financials.currency,
												" ",
												(financials.tokenPaid / 100).toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: "Captured & verified via Razorpay"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl border border-border p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] tracking-wider text-muted-foreground uppercase",
											children: "Remaining Balance (80%)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display mt-2 text-2xl font-bold",
											children: [
												financials.currency,
												" ",
												(financials.remainingBalance / 100).toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: "Payable upon final milestone sign-off"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold mb-4",
								children: "Official Tax Invoices & Receipts"
							}), invoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground py-4",
								children: "No formal invoices generated yet. Token receipt recorded."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-border/80 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-3 font-medium",
												children: "Invoice #"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-3 font-medium",
												children: "Date"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-3 font-medium",
												children: "Amount"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-3 font-medium",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "pb-3 font-medium text-right",
												children: "PDF"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border/40",
										children: invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 font-mono font-semibold",
												children: inv.invoice_number
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-muted-foreground",
												children: new Date(inv.created_at).toLocaleDateString()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 font-medium",
												children: [
													inv.currency,
													" ",
													(inv.amount_cents / 100).toLocaleString()
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													className: cn("capitalize text-[10px] rounded-full", statusColor(inv.status)),
													children: inv.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-right",
												children: inv.pdf_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													variant: "ghost",
													className: "h-7 text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: inv.pdf_url,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3 mr-1" }), " PDF"]
													})
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/60",
													children: "Processing"
												})
											})
										] }, inv.id))
									})]
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "meetings",
						className: "mt-6 space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Scheduled Architecture & Sprint Calls"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Direct sync sessions with your lead native engineers and product designers."
								}),
								meetings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground mt-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mx-auto h-8 w-8 text-muted-foreground/60 mb-2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: "No upcoming meetings scheduled"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground max-w-sm mx-auto mt-1",
											children: "Sprint review calls will appear here with calendar invitations and video links."
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 space-y-4",
									children: meetings.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "rounded-2xl border border-border/80 bg-card/40 p-5 flex flex-wrap items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display text-base font-semibold",
												children: m.title
											}),
											m.agenda ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: m.agenda
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-3 mt-2 font-mono text-[11px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3 text-nv" }),
														" ",
														new Date(m.scheduled_at).toLocaleString()
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Duration: ",
													m.duration_minutes,
													" mins"
												] })]
											})
										] }), m.meeting_link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											className: "rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: m.meeting_link,
												target: "_blank",
												rel: "noreferrer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mr-1.5 h-3.5 w-3.5" }), " Join Video Call"]
											})
										}) : null]
									}, m.id))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "notifications",
						className: "mt-6 space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Notification Center"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Real-time alerts on milestone completions, build uploads, and issue triage."
								})] }), unreadNotifications.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => notificationReadMutation.mutate({ markAll: true }),
									className: "rounded-full text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-1.5 h-3.5 w-3.5" }), " Mark All as Read"]
								}) : null]
							}), notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mx-auto h-8 w-8 text-muted-foreground/60 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Inbox is empty"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border/40",
								children: notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("py-4 flex items-start justify-between gap-4 transition-colors", !n.read ? "bg-nv/5 -mx-4 px-4 rounded-xl" : ""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [!n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-nv" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-semibold",
													children: n.title
												})]
											}),
											n.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: n.description
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[10px] text-muted-foreground/70",
												children: new Date(n.created_at).toLocaleString()
											})
										]
									}), !n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => notificationReadMutation.mutate({ notificationId: n.id }),
										className: "text-xs h-7",
										children: "Mark read"
									}) : null]
								}, n.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "delivery",
						className: "mt-6 space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Production Deliverables & Builds"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Source repositories, APK/IPA signed binaries, and architectural documentation."
								})] })
							}), deliveries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mx-auto h-8 w-8 text-muted-foreground/60 mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Deliverables are currently locked"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-md mx-auto mt-1",
										children: "Your final repository, source code, and release artifacts will become available once the project reaches authorized completion state."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: deliveries.map((del) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: cn("rounded-2xl border p-5 flex flex-col justify-between transition-all", del.unlocked ? "border-nv/40 bg-card/60" : "border-border/80 bg-background/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs uppercase text-muted-foreground",
												children: del.kind
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: cn("rounded-full text-[10px] uppercase font-semibold", del.unlocked ? "bg-nv/20 text-nv border-nv/40" : "bg-muted text-muted-foreground"),
												children: del.unlocked ? "Unlocked" : "Locked"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-base font-semibold mt-2",
											children: del.label
										}),
										del.version ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs text-muted-foreground mt-0.5",
											children: ["Version ", del.version]
										}) : null
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 pt-3 border-t border-border/40",
										children: del.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												del.download_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													className: "w-full rounded-xl bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: del.download_url,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-3.5 w-3.5" }), " Download Binary"]
													})
												}) : null,
												del.github_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													className: "w-full rounded-xl text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: del.github_url,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }), " View GitHub Repository"]
													})
												}) : null,
												del.documentation_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													size: "sm",
													variant: "ghost",
													className: "w-full text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: del.documentation_url,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-1.5 h-3.5 w-3.5" }), " Technical Documentation"]
													})
												}) : null
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-muted-foreground/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Locked — Available after authorized sprint completion" })]
										})
									})]
								}, del.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "security",
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-3xl border border-border p-6 sm:p-8 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-lg font-semibold flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-nv" }), " Profile Information"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										profileMutation.mutate({
											fullName: profileName.trim(),
											company: profileCompany.trim(),
											phone: profilePhone.trim()
										});
									},
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Full Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: profileName,
												onChange: (e) => setProfileName(e.target.value),
												className: "text-xs bg-background",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Company"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: profileCompany,
												onChange: (e) => setProfileCompany(e.target.value),
												className: "text-xs bg-background"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Phone Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: profilePhone,
												onChange: (e) => setProfilePhone(e.target.value),
												className: "text-xs bg-background"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											disabled: profileMutation.isPending,
											size: "sm",
											className: "rounded-xl text-xs mt-2",
											children: [profileMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "Save Profile"]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-3xl border border-border p-6 sm:p-8 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-display text-lg font-semibold flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-nv" }), " Update Password"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Passwords require at least 8 characters including uppercase, lowercase, numbers, and special symbols. Reusing recent passwords is restricted."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: (e) => {
											e.preventDefault();
											if (newPassword !== confirmPassword) {
												toast.error("Passwords do not match");
												return;
											}
											passwordMutation.mutate(newPassword);
										},
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "New Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "password",
													value: newPassword,
													onChange: (e) => setNewPassword(e.target.value),
													minLength: 8,
													className: "text-xs bg-background",
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "Confirm Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "password",
													value: confirmPassword,
													onChange: (e) => setConfirmPassword(e.target.value),
													minLength: 8,
													className: "text-xs bg-background",
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "submit",
												disabled: passwordMutation.isPending || !newPassword,
												size: "sm",
												className: "rounded-xl text-xs mt-2",
												children: [passwordMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "Update Password"]
											})
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl border border-border p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-lg font-semibold mb-1 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "h-4 w-4 text-nv" }), " Active Devices & Sessions"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-4",
									children: "Manage recognized devices authenticated to your Athros workspace."
								}),
								sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground py-2",
									children: "No active sessions tracked."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: sessions.map((sess) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border/80 bg-card/40 p-4 flex flex-wrap items-center justify-between gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-foreground",
											children: [
												sess.browser ?? "Web Browser",
												" on ",
												sess.os ?? "Device"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-[10.5px] text-muted-foreground mt-0.5",
											children: [
												"IP: ",
												String(sess.ip ?? "Unknown"),
												" · First seen: ",
												new Date(sess.created_at).toLocaleDateString()
											]
										})] }), sess.revoked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-destructive border-destructive/40 text-[10px]",
											children: "Revoked"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											disabled: sessionRevokeMutation.isPending,
											onClick: () => sessionRevokeMutation.mutate(sess.id),
											className: "h-7 text-xs text-destructive hover:bg-destructive/10",
											children: "Revoke Session"
										})]
									}, sess.id))
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: reqModalOpen,
				onOpenChange: setReqModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass sm:max-w-lg border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-lg",
						children: "Submit Requirement Document"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: "Provide your specification or brief. Monotonically versioned and audited."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!project) return;
							reqMutation.mutate({
								projectId: project.id,
								title: reqTitle.trim(),
								body: reqBody.trim()
							});
						},
						className: "space-y-4 mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Requirement Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Biometric Authentication & KYC Flow",
									value: reqTitle,
									onChange: (e) => setReqTitle(e.target.value),
									required: true,
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Specification & Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 5,
									placeholder: "Detail the expected behavior, API contracts, screen flows, or acceptance criteria...",
									value: reqBody,
									onChange: (e) => setReqBody(e.target.value),
									className: "text-xs resize-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setReqModalOpen(false),
								className: "text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: reqMutation.isPending || !reqTitle.trim(),
								className: "text-xs bg-nv text-slate-950 font-semibold hover:bg-nv/90",
								children: [reqMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "Submit Requirement"]
							})] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: enhanceModalOpen,
				onOpenChange: setEnhanceModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass sm:max-w-lg border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-lg",
						children: "Request Feature Enhancement"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: "Propose a new feature or scope addition to your native app build."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!project) return;
							enhanceMutation.mutate({
								projectId: project.id,
								title: enhanceTitle.trim(),
								description: enhanceDesc.trim(),
								priority: enhancePriority
							});
						},
						className: "space-y-4 mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Feature Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Apple Watch Companion App",
									value: enhanceTitle,
									onChange: (e) => setEnhanceTitle(e.target.value),
									required: true,
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Priority"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: enhancePriority,
									onValueChange: (val) => setEnhancePriority(val),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "low",
											children: "Low"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "medium",
											children: "Medium"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "high",
											children: "High"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "urgent",
											children: "Urgent"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Description & Scope"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 4,
									placeholder: "Explain the proposed feature, target audience, and any third-party APIs involved...",
									value: enhanceDesc,
									onChange: (e) => setEnhanceDesc(e.target.value),
									className: "text-xs resize-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setEnhanceModalOpen(false),
								className: "text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: enhanceMutation.isPending || !enhanceTitle.trim(),
								className: "text-xs bg-nv text-slate-950 font-semibold hover:bg-nv/90",
								children: [enhanceMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "Submit Enhancement"]
							})] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: issueModalOpen,
				onOpenChange: setIssueModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass sm:max-w-lg border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-lg",
						children: "Report Anomaly or Bug"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: "Directly file a defect report to our test bench and lead developers."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!project) return;
							issueMutation.mutate({
								projectId: project.id,
								title: issueTitle.trim(),
								detail: issueDetail.trim(),
								severity: issueSeverity
							});
						},
						className: "space-y-4 mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Issue Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Crash on launch with Android 14 test build",
									value: issueTitle,
									onChange: (e) => setIssueTitle(e.target.value),
									required: true,
									className: "text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Severity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: issueSeverity,
									onValueChange: (val) => setIssueSeverity(val),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "low",
											children: "Low (Cosmetic / Typo)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "medium",
											children: "Medium (Non-blocking bug)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "high",
											children: "High (Major feature broken)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "critical",
											children: "Critical (Crash / Data blocker)"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Steps to Reproduce & Expected Behavior"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 4,
									placeholder: "1. Open app\n2. Tap login button\n3. Observe crash dialog...",
									value: issueDetail,
									onChange: (e) => setIssueDetail(e.target.value),
									className: "text-xs resize-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setIssueModalOpen(false),
								className: "text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: issueMutation.isPending || !issueTitle.trim(),
								className: "text-xs bg-nv text-slate-950 font-semibold hover:bg-nv/90",
								children: [issueMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "File Issue"]
							})] })
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { CommandCenterDashboard as component };
