import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ZodError, l as stringType, s as objectType } from "../_libs/zod.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-CyaTTQT8.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { a as createBooking, c as ingestWebhook, f as safeEqual, i as bookingSchema, l as processRazorpayPayment, m as verifyCheckout, s as hmacHex, u as registerWebhookHandler } from "./bookings.server-CykFAX5h.mjs";
import { t as checkRateLimit } from "./rate-limit.server-rU31Bdet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D3-Xi4xp.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ChcdrAnj.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Athros — AI Native App Development" },
			{
				name: "description",
				content: "AI-native app development studio shipping production-ready Android and iOS apps in days."
			},
			{
				name: "author",
				content: "Athros"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "canonical",
				href: "/"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$7 = () => import("./routes-C93Z0wfG.mjs");
var title$3 = "Athros — AI Native App Development, MVP in 48 Hours";
var description$1 = "Production-ready native Android and iOS apps built by senior engineers with AI acceleration. MVP in 48 hours, production launch in 5–7 days.";
var Route$15 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: title$3 },
			{
				name: "description",
				content: description$1
			},
			{
				property: "og:title",
				content: title$3
			},
			{
				property: "og:description",
				content: description$1
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ProfessionalService",
				name: "Athros",
				description: description$1,
				areaServed: "Worldwide",
				email: "build@athros.dev",
				telephone: "+1-315-482-0199"
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./route-Di7iQBCH.mjs");
var Route$14 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
/** Legacy path — the portal now has separate client (/login) and staff (/admin/login) entries. */
var Route$13 = createFileRoute("/auth")({ beforeLoad: () => {
	throw redirect({
		to: "/login",
		replace: true
	});
} });
var $$splitComponentImporter$5 = () => import("./login-ZooElvqE.mjs");
var title$2 = "Client Portal Sign In — Athros";
var description = "Sign in to the Athros Command Center to track sprint progress, builds, issues, invoices and delivery for your app project.";
var Route$12 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title$2
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./reset-password-r6ggcdpk.mjs");
var title$1 = "Set a New Password — Athros";
var Route$11 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: "Choose a new password for your Athros command center account."
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: "Choose a new password for your Athros account."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin-oZVQGLur.mjs");
var Route$10 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Admin Portal — Athros" },
		{
			name: "description",
			content: "Athros internal portal: manage client projects, progress and build unlocks."
		},
		{
			property: "og:title",
			content: "Admin Portal — Athros"
		},
		{
			property: "og:description",
			content: "Manage client projects, progress and build unlocks."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard-CUp0-Zz6.mjs");
var Route$9 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Command Center — Athros" },
		{
			name: "description",
			content: "Athros Client Command Center: real-time sprint tracking, requirements, issues, payments, meetings, builds, and delivery."
		},
		{
			property: "og:title",
			content: "Command Center — Athros"
		},
		{
			property: "og:description",
			content: "Track your native mobile app build, milestones, requirements, and deliverables in real time."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./login-CL8HyZ1U.mjs");
var title = "Staff Sign In — Athros";
var Route$8 = createFileRoute("/admin/login")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: "Restricted Athros staff access to the delivery control panel."
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: "Restricted Athros staff access."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.bookings-kRB-oKvO.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/bookings")({
	head: () => ({ meta: [
		{ title: "Project Bookings — Athros Admin" },
		{
			name: "description",
			content: "Manage incoming project bookings and token payments."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$6 = createFileRoute("/api/public/health")({ server: { handlers: { GET: async () => {
	const timestamp = (/* @__PURE__ */ new Date()).toISOString();
	let database = "unavailable";
	try {
		const { supabaseAdmin } = await import("./client.server-BFn3nc1a.mjs");
		const { error } = await supabaseAdmin.from("currencies").select("code").limit(1);
		database = error ? "unavailable" : "ok";
	} catch {
		database = "unavailable";
	}
	const healthy = database === "ok";
	return Response.json({
		status: healthy ? "ok" : "degraded",
		readiness: healthy ? "ready" : "not_ready",
		database,
		version: process.env["APP_VERSION"] ?? "unknown",
		timestamp
	}, {
		status: healthy ? 200 : 503,
		headers: {
			"cache-control": "no-store",
			"x-content-type-options": "nosniff"
		}
	});
} } } });
/** Versioned REST collection endpoint: /api/v1/<resource> */
var Route$5 = createFileRoute("/api/v1/$resource")({ server: { handlers: {
	GET: async ({ request, params }) => (await import("./handler.server-Z4L9DW6I.mjs")).collectionHandler(request, params.resource),
	POST: async ({ request, params }) => (await import("./handler.server-Z4L9DW6I.mjs")).collectionHandler(request, params.resource)
} } });
var Route$4 = createFileRoute("/api/v1/bookings")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
		if (!(await checkRateLimit(`booking:${ip}`, 5, 36e5)).allowed) return Response.json({ error: {
			code: "rate_limited",
			message: "Too many booking attempts"
		} }, { status: 429 });
		const body = await request.json().catch(() => null);
		const input = bookingSchema.parse(body);
		const output = await createBooking(input, request, null);
		return Response.json({ data: output }, {
			status: 201,
			headers: { "cache-control": "no-store" }
		});
	} catch (error) {
		if (error instanceof ZodError) return Response.json({ error: {
			code: "unprocessable",
			message: "Validation failed",
			details: error.issues
		} }, { status: 422 });
		return Response.json({ error: {
			code: "booking_unavailable",
			message: "Booking could not be created"
		} }, { status: 503 });
	}
} } } });
var Route$3 = createFileRoute("/api/v1/worker")({ server: { handlers: { POST: async ({ request }) => {
	const secret = process.env["WORKER_TICK_SECRET"];
	const supplied = request.headers.get("x-worker-secret") ?? "";
	if (!secret || !safeEqual(secret, supplied)) return Response.json({ error: {
		code: "unauthorized",
		message: "Unauthorized"
	} }, { status: 401 });
	const { runWorkerTick } = await import("./handlers.server-PmbwHtFt.mjs");
	const result = await runWorkerTick();
	return Response.json({ data: result }, { headers: { "cache-control": "no-store" } });
} } } });
/** Versioned REST item endpoint: /api/v1/<resource>/<id> */
var Route$2 = createFileRoute("/api/v1/$resource/$id")({ server: { handlers: {
	GET: async ({ request, params }) => (await import("./handler.server-Z4L9DW6I.mjs")).itemHandler(request, params.resource, params.id),
	PATCH: async ({ request, params }) => (await import("./handler.server-Z4L9DW6I.mjs")).itemHandler(request, params.resource, params.id)
} } });
var schema = objectType({
	booking_id: stringType().uuid(),
	razorpay_order_id: stringType().min(1).max(120),
	razorpay_payment_id: stringType().min(1).max(120),
	razorpay_signature: stringType().regex(/^[a-f0-9]{64}$/i)
});
var Route$1 = createFileRoute("/api/v1/bookings/confirm")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
		if (!(await checkRateLimit(`payment-confirm:${ip}`, 10, 36e5)).allowed) return Response.json({ error: {
			code: "rate_limited",
			message: "Too many attempts"
		} }, { status: 429 });
		const input = schema.parse(await request.json());
		if (!await verifyCheckout(input.booking_id, input.razorpay_order_id, input.razorpay_payment_id, input.razorpay_signature)) return Response.json({ error: {
			code: "invalid_payment",
			message: "Payment verification failed"
		} }, { status: 422 });
		return Response.json({ data: {
			verified: true,
			pendingWebhook: true
		} });
	} catch (error) {
		if (error instanceof ZodError) return Response.json({ error: {
			code: "unprocessable",
			message: "Validation failed"
		} }, { status: 422 });
		return Response.json({ error: {
			code: "verification_unavailable",
			message: "Verification could not be completed"
		} }, { status: 503 });
	}
} } } });
var registered = false;
function register() {
	if (!registered) {
		registerWebhookHandler("razorpay", async ({ payload }) => processRazorpayPayment(payload));
		registered = true;
	}
}
var Route = createFileRoute("/api/v1/webhooks/razorpay")({ server: { handlers: { POST: async ({ request }) => {
	const rawBody = await request.text();
	const secret = process.env["RAZORPAY_WEBHOOK_SECRET"];
	const signature = request.headers.get("x-razorpay-signature") ?? "";
	const verified = Boolean(secret) && safeEqual(await hmacHex(secret, rawBody), signature);
	let eventType = null;
	let externalId = null;
	try {
		const event = JSON.parse(rawBody);
		eventType = event.event ?? null;
		externalId = event.payload?.payment?.entity?.id ? `${event.event}:${event.payload.payment.entity.id}` : null;
	} catch {
		return Response.json({ error: {
			code: "bad_request",
			message: "Malformed payload"
		} }, { status: 400 });
	}
	register();
	const result = await ingestWebhook({
		provider: "razorpay",
		rawBody,
		headers: Object.fromEntries(request.headers),
		signatureVerified: verified,
		eventType,
		externalId
	});
	return Response.json(result.body, { status: result.status });
} } } });
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AuthenticatedRouteRoute = Route$14.update({
	id: "/_authenticated",
	getParentRoute: () => Route$16
});
var AuthRoute = Route$13.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var ResetPasswordRoute = Route$11.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$16
});
var AuthenticatedAdminRoute = Route$10.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AdminLoginRoute = Route$8.update({
	id: "/admin/login",
	path: "/admin/login",
	getParentRoute: () => Route$16
});
var AuthenticatedAdminBookingsRoute = Route$7.update({
	id: "/bookings",
	path: "/bookings",
	getParentRoute: () => AuthenticatedAdminRoute
});
var ApiPublicHealthRoute = Route$6.update({
	id: "/api/public/health",
	path: "/api/public/health",
	getParentRoute: () => Route$16
});
var ApiV1ResourceRoute = Route$5.update({
	id: "/api/v1/$resource",
	path: "/api/v1/$resource",
	getParentRoute: () => Route$16
});
var ApiV1BookingsRoute = Route$4.update({
	id: "/api/v1/bookings",
	path: "/api/v1/bookings",
	getParentRoute: () => Route$16
});
var ApiV1WorkerRoute = Route$3.update({
	id: "/api/v1/worker",
	path: "/api/v1/worker",
	getParentRoute: () => Route$16
});
var ApiV1ResourceIdRoute = Route$2.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiV1ResourceRoute
});
var ApiV1BookingsConfirmRoute = Route$1.update({
	id: "/confirm",
	path: "/confirm",
	getParentRoute: () => ApiV1BookingsRoute
});
var ApiV1WebhooksRazorpayRoute = Route.update({
	id: "/api/v1/webhooks/razorpay",
	path: "/api/v1/webhooks/razorpay",
	getParentRoute: () => Route$16
});
var AuthenticatedAdminRouteChildren = { AuthenticatedAdminBookingsRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren),
	AuthenticatedDashboardRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var ApiV1ResourceRouteChildren = { ApiV1ResourceIdRoute };
var ApiV1ResourceRouteWithChildren = ApiV1ResourceRoute._addFileChildren(ApiV1ResourceRouteChildren);
var ApiV1BookingsRouteChildren = { ApiV1BookingsConfirmRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AuthRoute,
	LoginRoute,
	ResetPasswordRoute,
	AdminLoginRoute,
	ApiPublicHealthRoute,
	ApiV1ResourceRoute: ApiV1ResourceRouteWithChildren,
	ApiV1BookingsRoute: ApiV1BookingsRoute._addFileChildren(ApiV1BookingsRouteChildren),
	ApiV1WorkerRoute,
	ApiV1WebhooksRazorpayRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
