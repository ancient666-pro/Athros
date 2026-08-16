import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { a as literalType, l as stringType, s as objectType, t as arrayType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-QYZFi3Fq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Toaster$1, r as cn, t as Input } from "./input-BrmI0Glv.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { $ as CircleCheck, A as Linkedin, B as Gauge, C as Menu, D as Lock, G as ExternalLink, I as Instagram, J as Cpu, R as Github, S as MessageSquare, T as Mail, U as FileDown, V as Flame, X as Cloud, Y as Coffee, Z as Clock, b as Phone, c as Trash2, ct as BellRing, d as Sparkles, dt as ArrowUpRight, f as Smartphone, g as Rocket, it as Check, j as LifeBuoy, k as LoaderCircle, l as Sun, lt as BadgeCheck, nt as ChevronRight, o as Twitter, ot as Boxes, p as ShieldCheck, pt as Activity, q as CreditCard, r as Users, t as X, u as Star, ut as ArrowUp, w as MapPin, x as MoonStar, y as Plus, z as GitBranch } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-B1EfnPDF.mjs";
import { i as bookingSchema, t as DEFAULT_PRICING_CONFIGS } from "./bookings.server-CykFAX5h.mjs";
import { r as submitBookingForm, t as confirmBookingPayment } from "./bookings.functions-DSq-Qfyj.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BcDnHXwO.mjs";
import { t as Textarea } from "./textarea-CbAnLG2T.mjs";
import { n as useReducedMotion, t as useInView } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { A as siStripe, C as siNestjs, D as siReact, E as siRazorpay, M as siSwift, O as siRedis, S as siMongodb, T as siPostgresql, _ as siGoogleplay, a as siBitbucket, b as siKubernetes, c as siFigma, d as siGit, f as siGithub, g as siGooglemaps, h as siGooglegemini, i as siAppstore, j as siSupabase, k as siSentry, l as siFirebase, m as siGooglecloud, n as siAnthropic, o as siClaude, p as siGitlab, r as siApple, s as siDocker, t as siAndroid, u as siFlutter, v as siJira, w as siNodedotjs, x as siLinear, y as siKotlin } from "../_libs/simple-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C93Z0wfG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lenisInstance = null;
/** Smooth-scrolls to an in-page anchor with a 1200ms eased motion. */
function scrollToSection(hash) {
	const id = hash.replace("#", "");
	const target = document.getElementById(id);
	if (!target) return;
	if (lenisInstance) {
		lenisInstance.scrollTo(target, {
			offset: -88,
			duration: 1.2,
			easing: (t) => 1 - Math.pow(1 - t, 4)
		});
		return;
	}
	const top = target.getBoundingClientRect().top + window.scrollY - 88;
	window.scrollTo({
		top,
		behavior: "smooth"
	});
}
function useLenis() {
	const reduce = useReducedMotion();
	(0, import_react.useEffect)(() => {
		if (reduce) return;
		let frame = 0;
		let cancelled = false;
		import("../_libs/lenis.mjs").then((n) => n.t).then(({ default: Lenis }) => {
			if (cancelled) return;
			const instance = new Lenis({
				duration: 1.2,
				lerp: .09,
				smoothWheel: true
			});
			lenisInstance = instance;
			const raf = (time) => {
				instance.raf(time);
				frame = requestAnimationFrame(raf);
			};
			frame = requestAnimationFrame(raf);
		});
		return () => {
			cancelled = true;
			cancelAnimationFrame(frame);
			lenisInstance?.destroy();
			lenisInstance = null;
		};
	}, [reduce]);
}
/** Tracks which section is currently in view for nav active states. */
function useActiveSection(ids) {
	const [active, setActive] = (0, import_react.useState)(ids[0] ?? "");
	(0, import_react.useEffect)(() => {
		const elements = ids.map((id) => document.getElementById(id)).filter((element) => Boolean(element));
		if (elements.length === 0) return;
		const observer = new IntersectionObserver((entries) => {
			const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (visible?.target.id) setActive(visible.target.id);
		}, {
			rootMargin: "-45% 0px -45% 0px",
			threshold: [
				0,
				.2,
				.5,
				1
			]
		});
		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, [ids.join(",")]);
	return active;
}
function Reveal({ children, delay = 0, y = 26, className }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-12% 0px"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className,
		initial: {
			opacity: 0,
			y,
			filter: "blur(10px)"
		},
		animate: inView ? {
			opacity: 1,
			y: 0,
			filter: "blur(0px)"
		} : {
			opacity: 0,
			y,
			filter: "blur(10px)"
		},
		transition: {
			duration: .85,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children
	});
}
function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
		className: cn("mx-auto max-w-2xl", align === "center" ? "text-center" : "mx-0 text-left"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-nv" }), eyebrow]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 text-3xl leading-[1.05] font-semibold sm:text-4xl md:text-5xl",
				children: title
			}),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base leading-relaxed text-muted-foreground",
				children: subtitle
			}) : null
		]
	});
}
function MagneticButton({ variant = "primary", className, children, onClick, ...props }) {
	const ref = (0, import_react.useRef)(null);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const reduce = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		ref,
		style: {
			transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
			transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)"
		},
		onClick: (event) => {
			const href = props.href;
			if (href?.startsWith("#")) {
				event.preventDefault();
				scrollToSection(href);
			}
			onClick?.(event);
		},
		onMouseMove: (event) => {
			if (reduce || !ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			setOffset({
				x: (event.clientX - (rect.left + rect.width / 2)) * .18,
				y: (event.clientY - (rect.top + rect.height / 2)) * .3
			});
		},
		onMouseLeave: () => setOffset({
			x: 0,
			y: 0
		}),
		className: cn("group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-shadow duration-300 will-change-transform", variant === "primary" && "bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--nv)] hover:shadow-[0_18px_50px_-14px_var(--nv)]", variant === "fire" && "fire-surface text-[oklch(0.18_0.03_40)] shadow-[0_14px_40px_-12px_var(--fire)] hover:shadow-[0_22px_60px_-14px_var(--fire)]", variant === "ghost" && "border border-border bg-card/70 text-foreground backdrop-blur hover:border-nv/50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10 flex items-center gap-2",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/35%),transparent)] transition-transform duration-700 group-hover:translate-x-full" })]
	});
}
function ScrollProgress() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(max > 0 ? window.scrollY / max : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full origin-left bg-gradient-nv",
			style: { transform: `scaleX(${progress})` }
		})
	});
}
var links = [
	{
		label: "Home",
		href: "#home"
	},
	{
		label: "Services",
		href: "#services"
	},
	{
		label: "Pricing",
		href: "#pricing"
	},
	{
		label: "Command Center",
		href: "#command-center"
	},
	{
		label: "Process",
		href: "#process"
	},
	{
		label: "Contact",
		href: "#contact"
	}
];
var sectionIds = links.map((link) => link.href.slice(1));
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	const active = useActiveSection(sectionIds);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-3 z-50 px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": "Main",
			className: cn("glass mx-auto flex max-w-6xl items-center justify-between rounded-full transition-all duration-500", scrolled ? "h-14 max-w-5xl px-4 shadow-[var(--shadow-elevated)]" : "h-16 px-5 shadow-none"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#home",
					onClick: (event) => {
						event.preventDefault();
						scrollToSection("#home");
					},
					className: "flex min-w-0 items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-[4px] bg-gradient-nv" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display truncate text-[15px] font-semibold tracking-tight",
						children: "Athros"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-1 lg:flex",
					children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						onClick: (event) => {
							event.preventDefault();
							scrollToSection(link.href);
						},
						"aria-current": active === link.href.slice(1) ? "true" : void 0,
						className: cn("relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors", active === link.href.slice(1) ? "bg-secondary/70 text-foreground" : "text-muted-foreground hover:text-foreground"),
						children: link.label
					}) }, link.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle dark mode",
							onClick: () => setDark((value) => !value),
							className: "grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground",
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonStar, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							href: "/login",
							className: "hidden px-5 py-2.5 text-[13px] sm:inline-flex",
							children: "Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle menu",
							onClick: () => setOpen((value) => !value),
							className: "grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "grid gap-1",
				children: [links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: link.href,
					onClick: (event) => {
						event.preventDefault();
						setOpen(false);
						scrollToSection(link.href);
					},
					className: cn("block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-secondary hover:text-foreground", active === link.href.slice(1) ? "bg-secondary/70 text-foreground" : "text-muted-foreground"),
					children: link.label
				}) }, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/login",
					onClick: () => setOpen(false),
					className: "mt-1 block rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground",
					children: "Sign In"
				}) })]
			})
		}) : null]
	});
}
/** Single source of truth for brand marks used in the orbit + marquee. */
var frameworkLogos = {
	Kotlin: {
		path: siKotlin.path,
		hex: `#${siKotlin.hex}`
	},
	Swift: {
		path: siSwift.path,
		hex: `#${siSwift.hex}`
	},
	Flutter: {
		path: siFlutter.path,
		hex: `#${siFlutter.hex}`
	},
	"React Native": {
		path: siReact.path,
		hex: `#${siReact.hex}`
	},
	React: {
		path: siReact.path,
		hex: `#${siReact.hex}`
	},
	Android: {
		path: siAndroid.path,
		hex: `#${siAndroid.hex}`
	},
	iOS: {
		path: siApple.path,
		hex: "#6E6E73"
	},
	Apple: {
		path: siApple.path,
		hex: "#6E6E73"
	},
	Firebase: {
		path: siFirebase.path,
		hex: `#${siFirebase.hex}`
	},
	Supabase: {
		path: siSupabase.path,
		hex: `#${siSupabase.hex}`
	},
	PostgreSQL: {
		path: siPostgresql.path,
		hex: `#${siPostgresql.hex}`
	},
	"Node.js": {
		path: siNodedotjs.path,
		hex: `#${siNodedotjs.hex}`
	},
	Node: {
		path: siNodedotjs.path,
		hex: `#${siNodedotjs.hex}`
	},
	NestJS: {
		path: siNestjs.path,
		hex: `#${siNestjs.hex}`
	},
	Docker: {
		path: siDocker.path,
		hex: `#${siDocker.hex}`
	},
	Kubernetes: {
		path: siKubernetes.path,
		hex: `#${siKubernetes.hex}`
	},
	Redis: {
		path: siRedis.path,
		hex: `#${siRedis.hex}`
	},
	MongoDB: {
		path: siMongodb.path,
		hex: `#${siMongodb.hex}`
	},
	Sentry: {
		path: siSentry.path,
		hex: `#${siSentry.hex}`
	},
	GitHub: {
		path: siGithub.path,
		hex: `#${siGithub.hex}`
	},
	GitLab: {
		path: siGitlab.path,
		hex: `#${siGitlab.hex}`
	},
	Bitbucket: {
		path: siBitbucket.path,
		hex: `#${siBitbucket.hex}`
	},
	Git: {
		path: siGit.path,
		hex: `#${siGit.hex}`
	},
	Claude: {
		path: siClaude.path,
		hex: `#${siClaude.hex}`
	},
	Anthropic: {
		path: siAnthropic.path,
		hex: "#B0AEA6"
	},
	Gemini: {
		path: siGooglegemini.path,
		hex: `#${siGooglegemini.hex}`
	},
	Stripe: {
		path: siStripe.path,
		hex: `#${siStripe.hex}`
	},
	Razorpay: {
		path: siRazorpay.path,
		hex: "#3395FF"
	},
	"Google Maps": {
		path: siGooglemaps.path,
		hex: `#${siGooglemaps.hex}`
	},
	GCP: {
		path: siGooglecloud.path,
		hex: `#${siGooglecloud.hex}`
	},
	"Play Store": {
		path: siGoogleplay.path,
		hex: "#00C853"
	},
	"App Store": {
		path: siAppstore.path,
		hex: `#${siAppstore.hex}`
	},
	Figma: {
		path: siFigma.path,
		hex: `#${siFigma.hex}`
	},
	Linear: {
		path: siLinear.path,
		hex: `#${siLinear.hex}`
	},
	Jira: {
		path: siJira.path,
		hex: `#${siJira.hex}`
	},
	OpenAI: {
		hex: "#10A37F",
		fallback: Sparkles
	},
	ChatGPT: {
		hex: "#10A37F",
		fallback: Sparkles
	},
	Java: {
		hex: "#E76F00",
		fallback: Coffee
	},
	AWS: {
		hex: "#FF9900",
		fallback: Cloud
	},
	Azure: {
		hex: "#0078D4",
		fallback: Cloud
	},
	"CI/CD": {
		hex: "#2088FF",
		fallback: Rocket
	},
	Deploy: {
		hex: "#2088FF",
		fallback: Rocket
	}
};
function FrameworkLogo({ name, className }) {
	const entry = frameworkLogos[name];
	if (!entry) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: cn("h-1.5 w-1.5 rounded-full bg-nv", className)
	});
	if (!entry.path && entry.fallback) {
		const Fallback = entry.fallback;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
			"aria-hidden": "true",
			className: cn("h-3.5 w-3.5 shrink-0", className),
			style: { color: entry.hex }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"aria-hidden": "true",
		viewBox: "0 0 24 24",
		role: "presentation",
		className: cn("h-3.5 w-3.5 shrink-0", className),
		fill: entry.hex,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: entry.path })
	});
}
/**
* Glassmorphic badge used by the hero orbit — brand mark + name.
* `counterStyle` keeps the label upright while the orbit ring rotates.
*/
function OrbitBadge({ name, counterStyle, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block",
		style: counterStyle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-border bg-card/90 px-2.5 py-1 font-mono text-[10px] font-medium tracking-tight whitespace-nowrap text-foreground shadow-[var(--shadow-elevated)] backdrop-blur", className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameworkLogo, {
				name,
				className: "h-3 w-3"
			}), name]
		})
	});
}
var RINGS = [
	{
		radius: 140,
		omega: .5,
		direction: 1,
		offset: 0,
		nodes: [
			"Kotlin",
			"Swift",
			"Flutter"
		]
	},
	{
		radius: 192,
		omega: .36,
		direction: -1,
		offset: Math.PI / 5,
		nodes: [
			"Firebase",
			"Git",
			"React Native",
			"Android"
		]
	},
	{
		radius: 240,
		omega: .26,
		direction: 1,
		offset: Math.PI / 7,
		nodes: [
			"ChatGPT",
			"PostgreSQL",
			"Supabase",
			"iOS"
		]
	}
];
var particles = Array.from({ length: 26 }, (_, index) => ({
	id: index,
	left: index * 37 % 100,
	top: index * 61 % 100,
	delay: index % 9 * .45,
	size: index % 3 === 0 ? 3 : 2
}));
/** desktop = 3 rings, tablet = 2, mobile = 2 with fewer chips */
function useOrbitLayout() {
	const [layout, setLayout] = (0, import_react.useState)("desktop");
	(0, import_react.useEffect)(() => {
		const compute = () => {
			const w = window.innerWidth;
			setLayout(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
		};
		compute();
		window.addEventListener("resize", compute);
		return () => window.removeEventListener("resize", compute);
	}, []);
	return layout;
}
function ringsFor(layout) {
	if (layout === "desktop") return RINGS;
	if (layout === "tablet") return [RINGS[0], RINGS[1]];
	return [{
		...RINGS[0],
		nodes: RINGS[0].nodes.slice(0, 3)
	}, {
		...RINGS[1],
		radius: 200,
		nodes: [
			"Firebase",
			"React Native",
			"ChatGPT"
		]
	}];
}
function AICore() {
	const reduce = useReducedMotion();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const layout = useOrbitLayout();
	(0, import_react.useEffect)(() => setMounted(true), []);
	const rings = ringsFor(layout);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "relative mx-auto aspect-square w-full max-w-[520px] scale-[0.62] sm:scale-[0.8] lg:scale-100",
		children: !mounted ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--nv-soft),transparent_65%)] blur-2xl" }),
				particles.map((particle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute rounded-full bg-nv/50 will-change-transform",
					style: {
						left: `${particle.left}%`,
						top: `${particle.top}%`,
						width: particle.size,
						height: particle.size,
						animation: reduce ? void 0 : `float-y ${6 + particle.id % 5}s ease-in-out ${particle.delay}s infinite`
					}
				}, particle.id)),
				rings.map((ring, ringIndex) => {
					const period = 2 * Math.PI / ring.omega;
					const spin = reduce ? void 0 : `spin-slow ${period.toFixed(2)}s linear ${ring.direction === 1 ? "normal" : "reverse"} infinite`;
					const counterSpin = reduce ? void 0 : `spin-slow ${period.toFixed(2)}s linear ${ring.direction === 1 ? "reverse" : "normal"} infinite`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1/2 left-1/2 rounded-full border border-border/70 will-change-transform",
						style: {
							width: ring.radius * 2,
							height: ring.radius * 2,
							marginLeft: -ring.radius,
							marginTop: -ring.radius,
							zIndex: 10 - ringIndex,
							animation: spin
						},
						children: ring.nodes.map((node, nodeIndex) => {
							const angle = nodeIndex / ring.nodes.length * Math.PI * 2 + ring.offset;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute block",
								style: {
									left: `${(50 + Math.cos(angle) * 50).toFixed(3)}%`,
									top: `${(50 + Math.sin(angle) * 50).toFixed(3)}%`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitBadge, {
									name: node,
									counterStyle: { animation: counterSpin }
								})
							}, node);
						})
					}, ring.radius);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
					style: { zIndex: 20 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid h-32 w-32 place-items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animate-pulse rounded-full bg-gradient-nv opacity-25 blur-2xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "noise relative grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-nv/40 bg-[radial-gradient(circle_at_30%_25%,oklch(1_0_0/90%),var(--nv-soft)_55%,var(--nv)_100%)] shadow-[0_20px_60px_-20px_var(--nv)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] font-semibold tracking-[0.2em] text-[oklch(0.2_0.03_130)] uppercase",
									children: "AI Core"
								})
							}),
							!reduce ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 rounded-full border border-nv/25 [animation:spin-slow_14s_linear_infinite] border-t-nv/80 will-change-transform" }) : null
						]
					})
				})
			]
		})
	});
}
var LeadModalContext = (0, import_react.createContext)(null);
function LeadModalProvider({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const value = (0, import_react.useMemo)(() => ({
		open,
		setOpen,
		openModal: () => setOpen(true)
	}), [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadModalContext.Provider, {
		value,
		children
	});
}
function useLeadModal() {
	const context = (0, import_react.useContext)(LeadModalContext);
	if (!context) throw new Error("useLeadModal must be used inside <LeadModalProvider>");
	return context;
}
var BookingModalContext = (0, import_react.createContext)(void 0);
function BookingModalProvider({ children }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [selectedPackage, setSelectedPackage] = (0, import_react.useState)("PRODUCTION_READY");
	const openBookingModal = (pkg) => {
		if (pkg) setSelectedPackage(pkg);
		setIsOpen(true);
	};
	const closeBookingModal = () => {
		setIsOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModalContext.Provider, {
		value: {
			isOpen,
			selectedPackage,
			openBookingModal,
			closeBookingModal
		},
		children
	});
}
function useBookingModal() {
	const context = (0, import_react.useContext)(BookingModalContext);
	if (!context) throw new Error("useBookingModal must be used within a BookingModalProvider");
	return context;
}
var rotating = [
	"Build.",
	"Launch.",
	"Scale.",
	"Powered by AI."
];
var badges = [
	"MVP Delivered in 48 Hours",
	"Native Android",
	"Native iOS",
	"Play Store Ready",
	"App Store Ready",
	"CI/CD Enabled",
	"Backend Included",
	"Managed Deployment"
];
function RotatingWord() {
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setIndex((value) => (value + 1) % rotating.length), 2200);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "relative inline-flex h-[1.2em] overflow-hidden align-bottom",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: {
				y: "100%",
				opacity: 0,
				filter: "blur(8px)"
			},
			animate: {
				y: "0%",
				opacity: 1,
				filter: "blur(0px)"
			},
			transition: {
				duration: .6,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			className: "text-gradient-nv",
			children: rotating[index]
		}, rotating[index])
	});
}
function Hero() {
	const { openModal } = useLeadModal();
	const { openBookingModal } = useBookingModal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		className: "noise relative overflow-hidden pt-32 pb-10 sm:pt-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg absolute inset-0 opacity-70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 left-[8%] h-[420px] w-[420px] animate-float rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_65%)] blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-24 right-[4%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.93_0.05_215),transparent_68%)] opacity-70 blur-3xl" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-2 w-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-nv opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-nv" })]
						}), "AI native app studio · 2 slots left this month"]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-4xl leading-[1.02] font-semibold sm:text-5xl md:text-[3.7rem]",
							children: "Launch Your Native App Before Your Competitors Even Start."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .16,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display mt-4 text-xl font-semibold tracking-tight sm:text-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotatingWord, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .24,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base",
							children: "We transform your startup idea into production-ready native Android and iOS applications. From MVP in 48 hours to enterprise-grade platforms delivered within days — built by experienced engineers, not just AI."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .32,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								href: "#booking",
								onClick: (event) => {
									event.preventDefault();
									openBookingModal("PRODUCTION_READY");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), "Unleash Your Empire"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								href: "#contact",
								variant: "ghost",
								children: ["Book Strategy Call", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6",
							children: [
								["48h", "MVP delivery"],
								["120+", "Apps shipped"],
								["99.9%", "Uptime SLA"]
							].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-2xl font-semibold",
								children: value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-xs text-muted-foreground",
								children: label
							})] }, label))
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .2,
					y: 40,
					className: "-my-10 lg:my-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AICore, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "marquee-mask mt-16 overflow-hidden border-y border-border/70 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]",
					style: { "--marquee-duration": "48s" },
					children: [...badges, ...badges].map((badge, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-[13px] font-medium whitespace-nowrap backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-nv",
							children: "✓"
						}), badge]
					}, `${badge}-${index}`))
				})
			})
		]
	});
}
var cards = [
	{
		icon: Cpu,
		title: "AI Accelerated Development",
		body: "Agentic tooling handles scaffolding and boilerplate so engineers spend their hours on product logic."
	},
	{
		icon: Gauge,
		title: "Native Performance",
		body: "Kotlin and Swift where it matters. 60fps interactions, cold starts under a second."
	},
	{
		icon: Boxes,
		title: "Pixel Perfect UI",
		body: "Design systems built to spec — tokens, motion, and states documented before code ships."
	},
	{
		icon: Rocket,
		title: "Scalable Architecture",
		body: "Modular domains, typed contracts, and infrastructure that survives your Series A traffic."
	},
	{
		icon: ShieldCheck,
		title: "Enterprise Security",
		body: "RLS, secret rotation, audit trails, and penetration-tested release candidates."
	},
	{
		icon: Users,
		title: "Dedicated Engineers",
		body: "A named architect and squad on your sprint board — not an anonymous outsourcing pool."
	},
	{
		icon: BadgeCheck,
		title: "Deployment Included",
		body: "Play Store and App Store submission, signing, screenshots, and review handling done for you."
	},
	{
		icon: LifeBuoy,
		title: "Post Launch Support",
		body: "Crash monitoring, performance budgets, and a support window that starts at 90 days."
	}
];
function WhyUs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "relative py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Why us",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Why founders choose ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-nv",
					children: "Athros"
				})] }),
				subtitle: "Eight commitments that make the difference between a demo and a business."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: index * .05,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass-card group h-full p-6 transition-transform duration-500 hover:-translate-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-10 w-10 place-items-center rounded-xl border border-nv/30 bg-nv-soft/70 text-[oklch(0.35_0.12_130)] transition-colors group-hover:bg-gradient-nv",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-4.5 w-4.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 text-base font-semibold",
									children: card.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[13.5px] leading-relaxed text-muted-foreground",
									children: card.body
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" })]
					})
				}, card.title))
			})]
		})
	});
}
var steps$1 = [
	{
		name: "Idea",
		detail: "Discovery call, scope map, and success metrics agreed in writing."
	},
	{
		name: "Architecture",
		detail: "Data model, API contracts, and infrastructure plan approved."
	},
	{
		name: "Design",
		detail: "Design system, key flows, and motion spec delivered in Figma."
	},
	{
		name: "Development",
		detail: "Daily builds on TestFlight and internal Play track."
	},
	{
		name: "QA",
		detail: "Automated suites, device matrix, and security review."
	},
	{
		name: "Deployment",
		detail: "Store submission, signing, CI/CD, and observability live."
	},
	{
		name: "Scale",
		detail: "Performance budgets, cost tuning, and roadmap iteration."
	}
];
var tiers$1 = [
	{
		name: "MVP",
		time: "48 Hours",
		note: "Validate fast with a shippable core."
	},
	{
		name: "Production",
		time: "5–7 Days",
		note: "Full architecture, payments, and stores."
	},
	{
		name: "Enterprise",
		time: "Custom Roadmap",
		note: "Managed squad and lifecycle ownership."
	}
];
function Timeline() {
	const [active, setActive] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Delivery timeline",
				title: "From first call to store listing",
				subtitle: "A fixed pipeline with named owners at every stage. Hover a step to see what happens."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 bottom-0 left-[15px] w-px bg-border" }), steps$1.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						onMouseEnter: () => setActive(index),
						onFocus: () => setActive(index),
						tabIndex: 0,
						className: "relative cursor-default pl-12 outline-none last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-1.5 left-[8px] h-4 w-4 rounded-full border-2 transition-all duration-300", active === index ? "scale-125 border-nv bg-nv shadow-[0_0_0_6px_var(--nv-soft)]" : "border-border bg-background") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pb-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: cn("text-[15px] font-semibold transition-colors", active === index ? "text-foreground" : "text-muted-foreground"),
								children: step.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("overflow-hidden text-[13px] text-muted-foreground transition-all duration-500", active === index ? "mt-1.5 max-h-16 opacity-100" : "max-h-0 opacity-0"),
								children: step.detail
							})]
						})]
					}, step.name))]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid content-start gap-4",
					children: tiers$1.map((tier, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: index * .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "glass-card p-6 transition-transform duration-500 hover:-translate-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 flex items-baseline justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: tier.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[13px] text-nv",
									children: tier.time
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative z-10 mt-2 text-[13px] text-muted-foreground",
								children: tier.note
							})]
						})
					}, tier.name))
				})]
			})]
		})
	});
}
function FeatureList({ items, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "relative z-10 mt-6 grid gap-2.5",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-start gap-2.5 text-[13.5px] leading-snug",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: tone === "fire" ? "mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.32_0.08_45)]" : "mt-0.5 h-3.5 w-3.5 shrink-0 text-nv" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: tone === "fire" ? "text-[oklch(0.24_0.04_45)]" : "",
				children: item
			})]
		}, item))
	});
}
function PricingCard({ tier, delay = 0 }) {
	const { openBookingModal } = useBookingModal();
	const tone = tier.featured ? "fire" : "nv";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
		delay,
		y: tier.featured ? 44 : 26,
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: cn("relative h-full", tier.featured && "lg:scale-[1.03]"),
			children: [tier.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-[1.5px] rounded-[calc(var(--radius)+14px)] fire-surface opacity-90 blur-[1px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle,var(--fire-amber),transparent_70%)] opacity-40 blur-2xl" })] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative flex h-full flex-col justify-between overflow-hidden p-7", tier.featured ? "noise rounded-[calc(var(--radius)+12px)] fire-surface shadow-[var(--shadow-float)]" : "glass-card"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: cn("font-mono text-[11px] tracking-[0.2em] uppercase", tier.featured ? "text-[oklch(0.28_0.06_45)]" : "text-muted-foreground"),
								children: tier.name
							}), tier.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full bg-[oklch(0.2_0.03_40)] px-3 py-1 text-[10.5px] font-semibold tracking-wide text-[oklch(0.95_0.1_85)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3" }),
									"MOST POPULAR",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/35%),transparent)] [animation:shimmer-x_2.6s_ease-in-out_infinite]" })
								]
							}) : null]
						}),
						tier.worth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("mt-3 text-[12px]", tier.featured ? "text-[oklch(0.3_0.05_45)]" : "text-muted-foreground"),
							children: [
								"Included worth ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-through",
									children: tier.worth
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1.5 font-semibold",
									children: "Today from"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("font-display mt-3 text-4xl font-semibold", tier.featured && "text-[oklch(0.18_0.03_40)]"),
							children: [tier.price, tier.priceNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("ml-2 align-middle text-[13px] font-medium", tier.featured ? "text-[oklch(0.3_0.05_45)]" : "text-muted-foreground"),
								children: tier.priceNote
							}) : null]
						}),
						tier.blurb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[13.5px] font-semibold",
							children: tier.blurb
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-1.5 text-[13px]", tier.featured ? "text-[oklch(0.28_0.05_45)]" : "text-muted-foreground"),
							children: tier.meta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							href: "#contact",
							onClick: (event) => {
								event.preventDefault();
								const pkg = tier.name.includes("MVP") ? "MVP" : tier.name.includes("Production") ? "PRODUCTION_READY" : "ENTERPRISE";
								openBookingModal(pkg);
							},
							variant: tier.featured ? "primary" : "ghost",
							className: cn("mt-6 w-full", tier.featured && "bg-[oklch(0.18_0.03_40)] text-[oklch(0.96_0.08_85)]"),
							children: tier.cta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureList, {
							items: tier.features,
							tone
						})
					]
				}), tier.featured ? Array.from({ length: 12 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute h-1 w-1 rounded-full bg-[oklch(1_0_0/70%)]",
					style: {
						left: `${index * 29 % 96}%`,
						top: `${index * 47 % 92}%`,
						animation: `float-y ${5 + index % 4}s ease-in-out ${index * .3}s infinite`
					}
				}, index)) : null]
			})]
		})
	});
}
/**
* Region + currency detection and localized pricing.
* Detection priority: manual override -> server-side geo -> timezone -> browser locale.
*/
var CURRENCIES = [
	"INR",
	"USD",
	"GBP",
	"EUR",
	"AED",
	"SGD"
];
var STORAGE_KEY = "athros.currency";
var PRICING = {
	INR: {
		label: "INR ₹",
		tiers: [
			{
				price: "₹69,999",
				worth: "₹1,20,000"
			},
			{
				price: "₹1,99,999",
				worth: "₹3,40,000"
			},
			{ price: "Custom" }
		]
	},
	USD: {
		label: "USD $",
		tiers: [
			{
				price: "$1,499",
				worth: "$2,600"
			},
			{
				price: "$4,999",
				worth: "$8,500"
			},
			{ price: "Custom" }
		]
	},
	GBP: {
		label: "GBP £",
		tiers: [
			{
				price: "£1,299",
				worth: "£2,200"
			},
			{
				price: "£4,299",
				worth: "£7,300"
			},
			{ price: "Custom" }
		]
	},
	EUR: {
		label: "EUR €",
		tiers: [
			{
				price: "€1,499",
				worth: "€2,600"
			},
			{
				price: "€4,999",
				worth: "€8,500"
			},
			{ price: "Custom" }
		]
	},
	AED: {
		label: "AED",
		tiers: [
			{
				price: "AED 5,499",
				worth: "AED 9,400"
			},
			{
				price: "AED 17,999",
				worth: "AED 30,600"
			},
			{ price: "Custom" }
		]
	},
	SGD: {
		label: "SGD",
		tiers: [
			{
				price: "SGD 1,999",
				worth: "SGD 3,400"
			},
			{
				price: "SGD 6,499",
				worth: "SGD 11,000"
			},
			{ price: "Custom" }
		]
	}
};
var COUNTRY_CURRENCY = {
	IN: "INR",
	US: "USD",
	CA: "USD",
	GB: "GBP",
	AE: "AED",
	SA: "AED",
	QA: "AED",
	KW: "AED",
	BH: "AED",
	OM: "AED",
	SG: "SGD",
	MY: "SGD",
	DE: "EUR",
	FR: "EUR",
	ES: "EUR",
	IT: "EUR",
	NL: "EUR",
	BE: "EUR",
	AT: "EUR",
	IE: "EUR",
	PT: "EUR",
	FI: "EUR",
	GR: "EUR"
};
var TIMEZONE_CURRENCY = [
	[/^Asia\/(Kolkata|Calcutta)/, "INR"],
	[/^Asia\/Singapore/, "SGD"],
	[/^Asia\/(Dubai|Qatar|Riyadh|Kuwait|Bahrain|Muscat)/, "AED"],
	[/^Europe\/London/, "GBP"],
	[/^Europe\//, "EUR"],
	[/^America\//, "USD"]
];
function isCurrency(value) {
	return typeof value === "string" && CURRENCIES.includes(value);
}
function currencyForCountry(country) {
	if (!country) return null;
	return COUNTRY_CURRENCY[country.toUpperCase()] ?? null;
}
/** Browser-side fallback chain (timezone first, locale second). Never runs during SSR. */
function detectClientCurrency() {
	try {
		const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
		for (const [pattern, code] of TIMEZONE_CURRENCY) if (pattern.test(zone)) return code;
	} catch {}
	const region = (typeof navigator !== "undefined" ? navigator.language : "").split("-")[1];
	return currencyForCountry(region) ?? "USD";
}
function readStoredCurrency() {
	if (typeof window === "undefined") return null;
	const stored = window.localStorage.getItem(STORAGE_KEY);
	return isCurrency(stored) ? stored : null;
}
function storeCurrency(code) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, code);
}
/**
* Server-side region hint. Reads edge geo headers; returns null when unavailable
* so the client can fall back to timezone/locale detection.
*/
var getVisitorRegion = createServerFn({ method: "GET" }).handler(createSsrRpc("7eb72fa14daaef78218a4e08ad1667aa9abf29ac660934fcc7e30b67f21cec96"));
/**
* Resolves the visitor's display currency. SSR renders the neutral default (USD)
* and the real value lands after hydration, so there is no hydration mismatch.
*/
function useCurrency() {
	const [currency, setCurrency] = (0, import_react.useState)("USD");
	const [resolved, setResolved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const stored = readStoredCurrency();
		if (stored) {
			setCurrency(stored);
			setResolved(true);
			return;
		}
		setCurrency(detectClientCurrency());
		getVisitorRegion().then((result) => {
			if (cancelled) return;
			const fromGeo = currencyForCountry(result.country);
			if (fromGeo) setCurrency(fromGeo);
		}).catch(() => void 0).finally(() => {
			if (!cancelled) setResolved(true);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		currency,
		select: (0, import_react.useCallback)((code) => {
			storeCurrency(code);
			setCurrency(code);
			setResolved(true);
		}, []),
		resolved
	};
}
var tiers = [
	{
		name: "MVP Pack",
		price: "$1,499",
		meta: "Validation · Investor demo · Hackathons · Early launch",
		cta: "Launch MVP",
		features: [
			"Native Android",
			"Essential Backend",
			"Authentication",
			"Core Features",
			"Firebase",
			"Supabase",
			"Basic Analytics",
			"Play Store Ready",
			"Delivery in 2 Days"
		]
	},
	{
		name: "Production Ready",
		price: "$4,999",
		priceNote: "starting at",
		meta: "Delivered in 5–7 days · Android + iOS + backend",
		cta: "Build My Startup",
		featured: true,
		features: [
			"Everything in MVP",
			"Unlimited Screens",
			"Production Architecture",
			"Payments",
			"Push Notifications",
			"CI/CD",
			"Crash Monitoring + Sentry",
			"Analytics",
			"Play Store Deployment",
			"App Store Deployment",
			"Testing & Security",
			"Performance Optimization",
			"Offline Support",
			"Admin Dashboard",
			"PostgreSQL + Supabase",
			"Backend APIs & Cloud Functions",
			"Git Repository",
			"90 Days Support",
			"Priority Development",
			"Dedicated Engineer"
		]
	},
	{
		name: "Enterprise Elite",
		price: "Custom",
		blurb: "Plug-and-play managed AI engineering team",
		meta: "Operate your entire application ecosystem through a dedicated team with centralized authority and complete lifecycle management.",
		cta: "Talk to Enterprise Team",
		features: [
			"Unlimited Modules",
			"Unlimited Integrations",
			"Dedicated Team",
			"Technical Architect",
			"AI Automation",
			"Security Audits",
			"Infrastructure Management",
			"Kubernetes",
			"Monitoring & SLA",
			"24×7 Support",
			"Scaling & Compliance",
			"White Label",
			"Custom AI Agents",
			"Internal Admin Portal",
			"Multi-tenant Architecture",
			"Single Authority Dashboard",
			"Cross-platform Ecosystem",
			"Full Ownership"
		]
	}
];
function Pricing() {
	const { currency, select } = useCurrency();
	const localized = PRICING[currency];
	const shown = tiers.map((tier, index) => {
		const priced = localized.tiers[index];
		if (!priced) return tier;
		return {
			...tier,
			price: priced.price,
			...priced.worth ? { worth: priced.worth } : {}
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pricing",
		className: "noise relative overflow-hidden py-24 sm:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[420px] max-w-3xl rounded-full bg-[radial-gradient(circle,oklch(0.93_0.09_75),transparent_70%)] opacity-70 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Pricing",
					title: "Fixed scope. Fixed price. Shipped.",
					subtitle: "No hourly billing games. Choose the outcome you need and we commit to the date."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .08,
					className: "mt-8 flex flex-col items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "group",
						"aria-label": "Display currency",
						className: "glass flex flex-wrap items-center justify-center gap-1 rounded-full p-1",
						children: CURRENCIES.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => select(code),
							"aria-pressed": currency === code,
							className: cn("rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors", currency === code ? "bg-nv/15 text-foreground" : "text-muted-foreground hover:text-foreground"),
							children: code
						}, code))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12px] text-muted-foreground",
						children: [
							"Prices shown in your local currency (",
							localized.label,
							")."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid items-stretch gap-6 lg:grid-cols-3",
					children: shown.map((tier, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
						tier,
						delay: .05 + index * .07
					}, tier.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .2,
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-muted-foreground",
						children: "Every plan includes source code ownership, documented architecture, project dashboard access, deployment, GitHub handover and a 30-day warranty."
					})
				})
			]
		})]
	});
}
var rowOne = [
	"Kotlin",
	"Java",
	"Swift",
	"Flutter",
	"React Native",
	"Firebase",
	"Supabase",
	"PostgreSQL",
	"Node.js",
	"NestJS",
	"Docker",
	"Kubernetes",
	"Redis",
	"MongoDB",
	"Sentry",
	"GitHub",
	"GitLab"
];
var rowTwo = [
	"Bitbucket",
	"OpenAI",
	"ChatGPT",
	"Claude",
	"Gemini",
	"Anthropic",
	"Stripe",
	"Razorpay",
	"Google Maps",
	"AWS",
	"Azure",
	"GCP",
	"Play Store",
	"App Store",
	"Figma",
	"Linear",
	"Jira"
];
function Row({ items, duration, reverse }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "marquee-mask group/row overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-max animate-marquee gap-3 group-hover/row:[animation-play-state:paused]",
			style: {
				"--marquee-duration": duration,
				animationDirection: reverse ? "reverse" : "normal"
			},
			children: [...items, ...items].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-3 text-[13.5px] font-medium whitespace-nowrap backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.06] hover:border-nv/60 hover:shadow-[0_14px_40px_-16px_var(--nv)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameworkLogo, {
					name: item,
					className: "h-4 w-4"
				}), item]
			}, `${item}-${index}`))
		})
	});
}
function Integrations() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative border-y border-border/70 py-16 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "mx-auto mb-8 max-w-6xl px-5 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase",
				children: "The stack we ship with"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				items: rowOne,
				duration: "46s"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				items: rowTwo,
				duration: "54s",
				reverse: true
			})]
		})]
	});
}
var testimonials = [
	{
		quote: "Our MVP was delivered in under two days. Investors genuinely thought we had a six-month engineering team behind it.",
		name: "Arjun Mehta",
		role: "Founder, Zeptaly",
		avatar: "/assets/avatar-1-3DCOlBS3.jpg"
	},
	{
		quote: "They handled architecture, deployment, QA, Play Store publishing, and backend. We only focused on our business.",
		name: "Nadia Okafor",
		role: "CEO, Fieldloop",
		avatar: "/assets/avatar-2-BL4TsyCL.jpg"
	},
	{
		quote: "The production package paid for itself within weeks. Fastest engineering team we've ever worked with.",
		name: "Wei Chen",
		role: "CTO, Northwind Labs",
		avatar: "/assets/avatar-3-CZteB83P.jpg"
	},
	{
		quote: "Our enterprise migration happened without downtime. Incredible execution and constant communication.",
		name: "Elin Sandberg",
		role: "Product Manager, Halden Group",
		avatar: "/assets/avatar-4-LwZpnUzn.jpg"
	}
];
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "testimonials",
		className: "relative py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Testimonials",
				title: "Trusted by founders who ship",
				subtitle: "Real outcomes from teams that needed velocity without sacrificing engineering quality."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-4 md:grid-cols-2",
				children: testimonials.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: index * .06,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						className: "glass-card h-full p-7 transition-transform duration-500 hover:-translate-y-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5",
									"aria-label": "5 out of 5 stars",
									children: Array.from({ length: 5 }).map((_, star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-[var(--fire-amber)] text-[var(--fire-amber)]" }, star))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "font-display mt-4 text-[17px] leading-snug font-medium tracking-tight",
									children: [
										"“",
										item.quote,
										"”"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "mt-6 flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.avatar,
										alt: item.name,
										loading: "lazy",
										width: 512,
										height: 512,
										className: "h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[13.5px] font-semibold",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[12.5px] text-muted-foreground",
											children: item.role
										})]
									})]
								})
							]
						})
					})
				}, item.name))
			})]
		})
	});
}
var steps = [
	{
		step: "01",
		title: "Share Idea",
		body: "A 30-minute call. You describe the outcome; we return a scope and a date."
	},
	{
		step: "02",
		title: "AI Blueprint",
		body: "Architecture, data model, and screen inventory generated and reviewed by an architect."
	},
	{
		step: "03",
		title: "Engineering Sprint",
		body: "Daily builds, a shared board, and a dedicated engineer in your channel."
	},
	{
		step: "04",
		title: "Launch",
		body: "Store submission, monitoring, CI/CD, and handover of the full repository."
	}
];
function Process() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "process",
		className: "relative py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Process",
				title: "Four steps. Zero guesswork.",
				subtitle: "The same repeatable process behind every app we deliver."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-14 grid gap-4 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute top-[46px] right-6 left-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" }), steps.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: index * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group relative h-full rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-nv/50 hover:shadow-[var(--shadow-elevated)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display grid h-11 w-11 place-items-center rounded-2xl border border-border bg-background text-sm font-semibold transition-colors group-hover:border-nv group-hover:text-nv",
								children: item.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-base font-semibold",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[13.5px] leading-relaxed text-muted-foreground",
								children: item.body
							})
						]
					})
				}, item.step))]
			})]
		})
	});
}
var features = [
	{
		icon: Activity,
		title: "Sprint Progress",
		copy: "Live percentage per module — no status meetings, no guessing."
	},
	{
		icon: FileDown,
		title: "APK / IPA Delivery",
		copy: "Signed builds unlocked the moment a milestone is approved."
	},
	{
		icon: GitBranch,
		title: "Release Timeline",
		copy: "Every commit, build and deployment mapped to your roadmap."
	},
	{
		icon: MessageSquare,
		title: "Issue Desk",
		copy: "Raise a bug, get an owner and an ETA in the same thread."
	},
	{
		icon: CreditCard,
		title: "Payments & Invoices",
		copy: "Milestone invoices, receipts and balances in one ledger."
	},
	{
		icon: ShieldCheck,
		title: "Audit & Access",
		copy: "Role-based access for founders, investors and your team."
	}
];
var modules = [
	{
		name: "Authentication",
		value: 100
	},
	{
		name: "Payments",
		value: 82
	},
	{
		name: "Native Android",
		value: 68
	},
	{
		name: "Native iOS",
		value: 54
	},
	{
		name: "Admin Dashboard",
		value: 35
	}
];
function DashboardMock() {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-15% 0px"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "glass-card relative overflow-hidden p-5 shadow-[var(--shadow-float)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_70%)] opacity-60 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex items-center justify-between gap-3 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-8 w-8 place-items-center rounded-xl bg-gradient-nv text-[11px] font-bold text-[oklch(0.18_0.03_130)]",
						children: "A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-semibold",
						children: "Command Center"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase",
						children: "Project · Helios Fintech"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 rounded-full border border-nv/40 bg-nv/10 px-2.5 py-1 text-[10.5px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-nv" }), "On track"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mt-4 grid grid-cols-3 gap-2.5",
				children: [
					["Day", "4 / 7"],
					["Modules", "12"],
					["Open issues", "3"]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: label
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mt-4 grid gap-3",
				children: modules.map((module, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: module.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px] text-muted-foreground",
						children: [module.value, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full rounded-full bg-gradient-nv",
						initial: { width: 0 },
						animate: inView ? { width: `${module.value}%` } : { width: 0 },
						transition: {
							duration: 1.1,
							delay: .15 + index * .12,
							ease: [
								.16,
								1,
								.3,
								1
							]
						}
					})
				})] }, module.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mt-4 flex items-center justify-between rounded-2xl border border-border bg-card/60 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-4 w-4 text-nv" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-semibold",
						children: "helios-v0.8.2.apk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Milestone 3 · 42.8 MB"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-gradient-nv px-3 py-1.5 text-[11px] font-semibold text-[oklch(0.18_0.03_130)]",
					children: "Unlocked"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mt-3 flex items-center gap-2 text-[11.5px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "h-3.5 w-3.5 text-nv" }), "Push notification module deployed to staging · 12 min ago"]
			})
		]
	});
}
function CommandCenter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "command-center",
		className: "relative overflow-hidden py-24 sm:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[380px] max-w-4xl rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_70%)] opacity-40 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Client Command Center",
				title: "Watch your product get built — in real time.",
				subtitle: "Every client gets a private dashboard: sprint progress, builds, issues, payments and delivery in a single authority view."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					y: 36,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardMock, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .06 + index * .06,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "glass-card h-full p-5 transition-colors hover:border-nv/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, { className: "h-4.5 w-4.5 text-nv" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 text-[14.5px] font-semibold",
									children: feature.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-[13px] leading-relaxed text-muted-foreground",
									children: feature.copy
								})
							]
						})
					}, feature.title))
				})]
			})]
		})]
	});
}
var PHONE = "+13154820199";
var BOOKING_URL = "https://booking.example.com";
function CtaSection() {
	const { openModal } = useLeadModal();
	const { openBookingModal } = useBookingModal();
	const handleDiscoveryCall = () => {
		if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) {
			window.location.href = `tel:${PHONE}`;
			return;
		}
		window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative px-5 py-24 sm:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "noise relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-border bg-[oklch(0.16_0.01_260)] px-6 py-20 text-center shadow-[var(--shadow-float)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,oklch(1_0_0/40%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/40%)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent_75%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--nv),transparent_65%)] opacity-30 blur-3xl" }),
				Array.from({ length: 18 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute h-1 w-1 rounded-full bg-[oklch(0.9_0.2_128/70%)]",
					style: {
						left: `${index * 41 % 96}%`,
						top: `${index * 53 % 90}%`,
						animation: `float-y ${5 + index % 5}s ease-in-out ${index * .25}s infinite`
					}
				}, index)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-3xl leading-[1.05] font-semibold text-[oklch(0.99_0_0)] sm:text-5xl",
							children: [
								"Ready to build the next",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-bright",
									children: "billion-dollar app?"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[15px] text-[oklch(0.82_0.01_260)]",
							children: "From idea to production in days — not months."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								href: "#booking",
								onClick: (event) => {
									event.preventDefault();
									openBookingModal("PRODUCTION_READY");
								},
								className: "bg-gradient-nv text-[oklch(0.18_0.03_130)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), "Unleash Your Empire"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								href: BOOKING_URL,
								onClick: (event) => {
									event.preventDefault();
									handleDiscoveryCall();
								},
								variant: "ghost",
								className: "border-[oklch(1_0_0/18%)] bg-[oklch(1_0_0/8%)] text-[oklch(0.98_0_0)]",
								children: ["Book a Discovery Call", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
							})]
						})
					]
				})
			]
		}) })
	});
}
var quickLinks = [
	{
		label: "Services",
		href: "#services"
	},
	{
		label: "Pricing",
		href: "#pricing"
	},
	{
		label: "Process",
		href: "#process"
	},
	{
		label: "Blog",
		href: "#"
	},
	{
		label: "Case Studies",
		href: "#testimonials"
	},
	{
		label: "Contact",
		href: "#contact"
	}
];
var socials = [
	{
		label: "LinkedIn",
		href: "#",
		icon: Linkedin
	},
	{
		label: "GitHub",
		href: "#",
		icon: Github
	},
	{
		label: "X",
		href: "#",
		icon: Twitter
	},
	{
		label: "Instagram",
		href: "#",
		icon: Instagram
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 place-items-center rounded-xl bg-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-[4px] bg-gradient-nv" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[15px] font-semibold",
								children: "Athros"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground",
							children: "AI-native app development studio building production-ready Android and iOS products for founders who move fast."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex gap-2",
							children: socials.map((social) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: social.href,
								"aria-label": social.label,
								className: "grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-nv/50 hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(social.icon, { className: "h-4 w-4" })
							}, social.label))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Quick links",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Quick Links"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-2.5",
							children: quickLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: link.href,
								className: "text-[13.5px] text-muted-foreground transition-colors hover:text-foreground",
								children: link.label
							}) }, link.label))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-semibold",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 grid gap-2.5 text-[13.5px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:build@athros.dev",
									className: "hover:text-foreground",
									children: "build@athros.dev"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+13154820199",
									className: "hover:text-foreground",
									children: "+1 (315) 482-0199"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "44 Tehama Street, San Francisco, CA" })]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold",
							children: "Newsletter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[13.5px] text-muted-foreground",
							children: "Engineering notes on shipping native apps fast. Once a month."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 flex gap-2",
							onSubmit: (event) => event.preventDefault(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "newsletter-email",
									children: "Email address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "newsletter-email",
									type: "email",
									required: true,
									placeholder: "you@company.com",
									className: "min-w-0 flex-1 rounded-full border border-border bg-card/70 px-4 py-2.5 text-[13px] outline-none focus:border-nv/60"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "shrink-0 rounded-full bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground",
									children: "Join"
								})
							]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-6 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[12.5px] text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Athros. All rights reserved."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4 text-[12.5px] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Cookies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#home",
							className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3.5 w-3.5" }), " Back to top"]
						})
					]
				})]
			})]
		})
	});
}
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
var submitLead = createServerFn({ method: "POST" }).inputValidator((data) => leadSchema.parse(data)).handler(createSsrRpc("e211e8c27eee0a1053129b7769a37cb2e31b3dc869a84a1c647eee19cfb57993"));
var projectTypes = [
	"Native Android app",
	"Native iOS app",
	"Android + iOS",
	"Cross-platform (Flutter / RN)",
	"Backend / API platform",
	"AI product",
	"Not sure yet"
];
var budgets = [
	"Under $2,500",
	"$2,500 – $8,000",
	"$8,000 – $25,000",
	"$25,000 – $75,000",
	"$75,000+"
];
var timelines = [
	"ASAP (48h MVP)",
	"1–2 weeks",
	"This month",
	"This quarter",
	"Exploring"
];
var platformOptions = [
	"Android",
	"iOS",
	"Web dashboard",
	"Backend",
	"AI agents"
];
var emptyForm = {
	fullName: "",
	company: "",
	email: "",
	phone: "",
	projectType: "",
	budget: "",
	timeline: "",
	platforms: [],
	message: "",
	referralSource: ""
};
function Field({ label, htmlFor, error, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-1.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor,
				className: "text-[12px] font-medium text-muted-foreground",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11.5px] text-destructive",
				children: error
			}) : null
		]
	});
}
function ChoiceChips({ options, value, onSelect, name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		role: "group",
		"aria-label": name,
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onSelect(option === value ? "" : option),
			"aria-pressed": option === value,
			className: cn("rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors", option === value ? "border-nv/60 bg-nv/15 text-foreground" : "border-border bg-card/60 text-muted-foreground hover:border-nv/40 hover:text-foreground"),
			children: option
		}, option))
	});
}
function LeadCaptureModal() {
	const { open, setOpen } = useLeadModal();
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [done, setDone] = (0, import_react.useState)(false);
	const submit = useServerFn(submitLead);
	const mutation = useMutation({
		mutationFn: (data) => submit({ data }),
		onSuccess: () => {
			setDone(true);
			setForm(emptyForm);
			toast.success("Request received — we'll reply within a few hours.");
		},
		onError: (error) => {
			toast.error(error.message || "Something went wrong. Please try again.");
		}
	});
	const update = (key, value) => {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
		setErrors((prev) => ({
			...prev,
			[key]: ""
		}));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const parsed = leadSchema.safeParse(form);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0] ?? "");
				if (key && !next[key]) next[key] = issue.message;
			}
			setErrors(next);
			return;
		}
		mutation.mutate(parsed.data);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (!next) {
				setDone(false);
				setErrors({});
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto border-border bg-card/85 backdrop-blur-xl sm:max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_70%)] opacity-60 blur-3xl" }), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-10 w-10 text-nv" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "mt-4 text-2xl font-semibold",
						children: "Your empire is queued."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-2 text-[14px]",
						children: "A senior engineer will reach out with a scope, timeline and fixed price. Check your inbox shortly."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2 text-2xl font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-5 w-5 text-nv" }), "Unleash Your Empire"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Tell us about the product. We reply with scope, timeline and a fixed price — usually within a few hours." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "relative grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full name *",
								htmlFor: "lead-name",
								error: errors.fullName,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lead-name",
									value: form.fullName,
									maxLength: 100,
									onChange: (event) => update("fullName", event.target.value),
									placeholder: "Ada Lovelace"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Company",
								htmlFor: "lead-company",
								error: errors.company,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lead-company",
									value: form.company ?? "",
									maxLength: 120,
									onChange: (event) => update("company", event.target.value),
									placeholder: "Athros Labs"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Work email *",
								htmlFor: "lead-email",
								error: errors.email,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lead-email",
									type: "email",
									value: form.email,
									maxLength: 255,
									onChange: (event) => update("email", event.target.value),
									placeholder: "you@company.com"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone / WhatsApp",
								htmlFor: "lead-phone",
								error: errors.phone,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lead-phone",
									type: "tel",
									value: form.phone ?? "",
									maxLength: 32,
									onChange: (event) => update("phone", event.target.value),
									placeholder: "+1 315 482 0199"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Project type",
						htmlFor: "lead-project-type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
							name: "Project type",
							options: projectTypes,
							value: form.projectType ?? "",
							onSelect: (option) => update("projectType", option)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Budget",
							htmlFor: "lead-budget",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
								name: "Budget",
								options: budgets,
								value: form.budget ?? "",
								onSelect: (option) => update("budget", option)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Timeline",
							htmlFor: "lead-timeline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
								name: "Timeline",
								options: timelines,
								value: form.timeline ?? "",
								onSelect: (option) => update("timeline", option)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Platforms needed",
						htmlFor: "lead-platforms",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: platformOptions.map((option) => {
								const active = form.platforms.includes(option);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": active,
									onClick: () => update("platforms", active ? form.platforms.filter((item) => item !== option) : [...form.platforms, option]),
									className: cn("rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors", active ? "border-nv/60 bg-nv/15 text-foreground" : "border-border bg-card/60 text-muted-foreground hover:border-nv/40 hover:text-foreground"),
									children: option
								}, option);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "What are you building?",
						htmlFor: "lead-message",
						error: errors.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "lead-message",
							rows: 4,
							maxLength: 2e3,
							value: form.message ?? "",
							onChange: (event) => update("message", event.target.value),
							placeholder: "Core features, target users, integrations, anything already built…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "How did you find us?",
						htmlFor: "lead-referral",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lead-referral",
							value: form.referralSource ?? "",
							maxLength: 80,
							onChange: (event) => update("referralSource", event.target.value),
							placeholder: "Referral, LinkedIn, Google…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: mutation.isPending,
						className: "group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-nv px-6 py-3.5 text-sm font-semibold text-[oklch(0.18_0.03_130)] transition-shadow duration-300 hover:shadow-[0_18px_50px_-14px_var(--nv)] disabled:opacity-70",
						children: [mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), mutation.isPending ? "Sending…" : "Send my project brief"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[11.5px] text-muted-foreground",
						children: "We reply from build@athros.dev. No spam, no sales sequences."
					})
				]
			})] })]
		})
	});
}
var COUNTRY_OPTIONS = [
	{
		code: "IN",
		name: "India (+91)",
		region: "INDIA"
	},
	{
		code: "US",
		name: "United States (+1)",
		region: "UNITED_STATES"
	},
	{
		code: "CA",
		name: "Canada (+1)",
		region: "UNITED_STATES"
	},
	{
		code: "GB",
		name: "United Kingdom (+44)",
		region: "UNITED_KINGDOM"
	},
	{
		code: "SG",
		name: "Singapore (+65)",
		region: "SINGAPORE"
	},
	{
		code: "AE",
		name: "United Arab Emirates (+971)",
		region: "MIDDLE_EAST"
	},
	{
		code: "SA",
		name: "Saudi Arabia (+966)",
		region: "MIDDLE_EAST"
	},
	{
		code: "DE",
		name: "Germany (+49)",
		region: "EUROPE"
	},
	{
		code: "FR",
		name: "France (+33)",
		region: "EUROPE"
	},
	{
		code: "NL",
		name: "Netherlands (+31)",
		region: "EUROPE"
	},
	{
		code: "ES",
		name: "Spain (+34)",
		region: "EUROPE"
	},
	{
		code: "AU",
		name: "Australia (+61)",
		region: "UNITED_STATES"
	}
];
var PACKAGE_INFO = {
	MVP: {
		name: "MVP Pack",
		delivery: "Delivered in 48 Hours",
		tagline: "Ideal for validation, angel demos, hackathons, and rapid pilot launch.",
		features: [
			"Native Android or iOS App",
			"Essential Backend & Database",
			"User Auth & Session Management",
			"Core Feature Workflows",
			"Play Store / App Store Ready",
			"Source Code & Repo Handover",
			"30-Day Launch Warranty"
		]
	},
	PRODUCTION_READY: {
		name: "Production Ready",
		delivery: "Delivered in 5–7 Days",
		tagline: "Complete cross-platform ecosystem with payments, push notifications, and production infra.",
		isFeatured: true,
		features: [
			"Everything in MVP",
			"Dual Native: Android + iOS",
			"Payment Gateway Integration",
			"Push Notifications & Cloud Messaging",
			"Admin Dashboard & Metrics",
			"Sentry & Crash Monitoring",
			"CI/CD Automated Deployment",
			"90-Day Priority Support & Updates"
		]
	},
	ENTERPRISE: {
		name: "Enterprise Elite",
		delivery: "Dedicated Sprint Schedule",
		tagline: "Full-scale dedicated engineering pod with AI automation and multi-tenant scaling.",
		features: [
			"Unlimited Screens & Custom Modules",
			"Dedicated Technical Architect",
			"AI Workflow Agents & Automation",
			"Kubernetes & Multi-Region Infra",
			"Security Audits & SLA Guarantee",
			"24/7 Priority Support Channel"
		]
	}
};
var PROJECT_TYPES = [
	"Native Android app",
	"Native iOS app",
	"Dual Native (Android + iOS)",
	"Cross-Platform App",
	"Backend & Cloud API",
	"AI Platform / SaaS"
];
function loadRazorpayScript() {
	return new Promise((resolve) => {
		if (typeof window === "undefined") return resolve(false);
		if (window.Razorpay) return resolve(true);
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
}
function BookingModal() {
	const { isOpen, selectedPackage: initialPackage, closeBookingModal } = useBookingModal();
	const { currency } = useCurrency();
	const [step, setStep] = (0, import_react.useState)("package");
	const [activePackage, setActivePackage] = (0, import_react.useState)(initialPackage);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		company_name: "",
		country: "IN",
		project_type: "Dual Native (Android + iOS)",
		project_summary: "",
		estimated_requirements: "",
		preferred_contact_method: "email",
		company_website: "",
		existing_app_url: "",
		reference_links: [],
		terms_accepted: true
	});
	const [refLinkInput, setRefLinkInput] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [successInfo, setSuccessInfo] = (0, import_react.useState)(null);
	const submitFn = useServerFn(submitBookingForm);
	const confirmFn = useServerFn(confirmBookingPayment);
	(0, import_react.useEffect)(() => {
		if (initialPackage) setActivePackage(initialPackage);
	}, [initialPackage]);
	(0, import_react.useEffect)(() => {
		if (isOpen) loadRazorpayScript();
		else setTimeout(() => {
			setStep("package");
			setErrors({});
			setIsProcessing(false);
		}, 300);
	}, [isOpen]);
	const currentCountry = COUNTRY_OPTIONS.find((c) => c.code === form.country) ?? COUNTRY_OPTIONS[0];
	const currentRegion = currentCountry.region;
	const pricingDetail = DEFAULT_PRICING_CONFIGS[activePackage][currentRegion];
	const fullAmountFormatted = `${pricingDetail.currency} ${(pricingDetail.full_amount / 100).toLocaleString()}`;
	const tokenAmountFormatted = `${pricingDetail.currency} ${(pricingDetail.token_amount / 100).toLocaleString()}`;
	const remainingAmountFormatted = `${pricingDetail.currency} ${((pricingDetail.full_amount - pricingDetail.token_amount) / 100).toLocaleString()}`;
	const updateField = (field, value) => {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
		setErrors((prev) => ({
			...prev,
			[field]: ""
		}));
	};
	const handleAddRefLink = () => {
		if (!refLinkInput.trim()) return;
		try {
			new URL(refLinkInput.trim());
			if (form.reference_links.length >= 5) {
				toast.error("Maximum 5 reference links allowed");
				return;
			}
			setForm((prev) => ({
				...prev,
				reference_links: [...prev.reference_links, refLinkInput.trim()]
			}));
			setRefLinkInput("");
		} catch {
			toast.error("Please enter a valid URL (e.g. https://example.com)");
		}
	};
	const handleRemoveRefLink = (index) => {
		setForm((prev) => ({
			...prev,
			reference_links: prev.reference_links.filter((_, i) => i !== index)
		}));
	};
	const validateDetails = () => {
		const parsed = bookingSchema.safeParse({
			...form,
			selected_package: activePackage,
			region: currentRegion,
			terms_accepted: form.terms_accepted === true ? true : void 0
		});
		if (!parsed.success) {
			const fieldErrors = {};
			for (const issue of parsed.error.issues) {
				const path = String(issue.path[0] ?? "");
				if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
			}
			setErrors(fieldErrors);
			toast.error("Please check the required fields before continuing.");
			return false;
		}
		return true;
	};
	const handleProceedToPayment = async () => {
		if (!validateDetails()) return;
		setIsProcessing(true);
		try {
			await loadRazorpayScript();
			const input = {
				full_name: form.full_name,
				email: form.email,
				phone: form.phone,
				company_name: form.company_name || void 0,
				country: form.country,
				project_type: form.project_type,
				selected_package: activePackage,
				region: currentRegion,
				project_summary: form.project_summary,
				estimated_requirements: form.estimated_requirements || void 0,
				preferred_contact_method: form.preferred_contact_method,
				company_website: form.company_website || void 0,
				existing_app_url: form.existing_app_url || void 0,
				reference_links: form.reference_links,
				terms_accepted: true
			};
			const { bookingId, bookingNumber, orderId, keyId, amount, currency } = await submitFn({ data: input });
			if (typeof window !== "undefined" && window.Razorpay) {
				const options = {
					key: keyId,
					amount,
					currency,
					name: "Athros Labs",
					description: `${PACKAGE_INFO[activePackage].name} Token Payment (20%)`,
					order_id: orderId,
					prefill: {
						name: form.full_name,
						email: form.email,
						contact: form.phone
					},
					theme: {
						color: "#76b900",
						backdrop_color: "#05070a"
					},
					handler: async (response) => {
						try {
							toast.loading("Verifying payment security signature...", { id: "payment-verify" });
							await confirmFn({ data: {
								bookingId,
								orderId: response.razorpay_order_id || orderId,
								paymentId: response.razorpay_payment_id,
								signature: response.razorpay_signature || "signature_verified"
							} });
							toast.success("Payment verified! Project created.", { id: "payment-verify" });
							setSuccessInfo({
								bookingNumber,
								tokenPaid: tokenAmountFormatted,
								totalAmount: fullAmountFormatted,
								remainingBalance: remainingAmountFormatted,
								packageName: PACKAGE_INFO[activePackage].name,
								paymentId: response.razorpay_payment_id
							});
							setStep("success");
						} catch (confirmErr) {
							toast.error("Payment confirmation failed. Our support team is notified.", { id: "payment-verify" });
						} finally {
							setIsProcessing(false);
						}
					},
					modal: { ondismiss: () => {
						setIsProcessing(false);
						toast.info("Payment was cancelled. You can retry whenever ready.");
					} }
				};
				new window.Razorpay(options).open();
			} else {
				toast.success("Booking registered. Ready for payment confirmation.");
				setSuccessInfo({
					bookingNumber,
					tokenPaid: tokenAmountFormatted,
					totalAmount: fullAmountFormatted,
					remainingBalance: remainingAmountFormatted,
					packageName: PACKAGE_INFO[activePackage].name,
					paymentId: "rzp_simulated_" + crypto.randomUUID().slice(0, 8)
				});
				setStep("success");
				setIsProcessing(false);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to initiate payment";
			toast.error(msg);
			setIsProcessing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open ? closeBookingModal() : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto border-border bg-card/95 p-0 backdrop-blur-2xl sm:max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_70%)] opacity-70 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky top-0 z-20 border-b border-border/80 bg-card/90 px-6 py-4 backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-7 w-7 items-center justify-center rounded-lg bg-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-[3px] bg-gradient-nv" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-base font-semibold tracking-tight",
								children: "Book Athros Project"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "Lock your sprint with 20% token deposit · Shipped to production"
							})] })]
						}), step !== "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-1.5 text-xs sm:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2.5 py-1 font-mono text-[11px]", step === "package" ? "bg-nv/20 font-semibold text-nv" : "bg-secondary text-muted-foreground"),
									children: "1. Package"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2.5 py-1 font-mono text-[11px]", step === "details" ? "bg-nv/20 font-semibold text-nv" : "bg-secondary text-muted-foreground"),
									children: "2. Brief"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2.5 py-1 font-mono text-[11px]", step === "summary" ? "bg-nv/20 font-semibold text-nv" : "bg-secondary text-muted-foreground"),
									children: "3. Token Pay"
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						step === "package" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-semibold",
										children: "Select Your Engineering Tier"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "All tiers include source code ownership, CI/CD, and 30-day warranty."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Region:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											"aria-label": "Select Country",
											value: form.country,
											onChange: (e) => updateField("country", e.target.value),
											className: "bg-transparent font-medium text-foreground focus:outline-none",
											children: COUNTRY_OPTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: c.code,
												className: "bg-card text-foreground",
												children: c.name
											}, c.code))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 md:grid-cols-3",
									children: [
										"MVP",
										"PRODUCTION_READY",
										"ENTERPRISE"
									].map((pkg) => {
										const info = PACKAGE_INFO[pkg];
										const price = DEFAULT_PRICING_CONFIGS[pkg][currentRegion];
										const isSelected = activePackage === pkg;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setActivePackage(pkg),
											className: cn("relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-200", isSelected ? "border-nv bg-nv/5 shadow-[0_0_24px_rgba(118,185,0,0.15)] ring-1 ring-nv" : "border-border bg-card/60 hover:border-nv/40 hover:bg-card/90", info.isFeatured && !isSelected && "border-amber-500/30"),
											children: [info.isFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute -top-2.5 right-4 flex items-center gap-1 rounded-full bg-[oklch(0.2_0.03_40)] px-2.5 py-0.5 text-[10px] font-semibold text-[oklch(0.95_0.1_85)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3 text-amber-400" }), "POPULAR"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-mono text-xs tracking-wider uppercase",
														children: info.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("flex h-4 w-4 items-center justify-center rounded-full border text-[10px]", isSelected ? "border-nv bg-nv text-black" : "border-border"),
														children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 stroke-[3]" })
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "font-display text-2xl font-bold",
														children: [
															price.currency,
															" ",
															(price.full_amount / 100).toLocaleString()
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-0.5 text-[11px] font-medium text-nv",
														children: [
															"Token: ",
															price.currency,
															" ",
															(price.token_amount / 100).toLocaleString(),
															" ",
															"(20%)"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: info.delivery })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2.5 text-xs text-muted-foreground",
													children: info.tagline
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "mt-4 space-y-1.5 border-t border-border/60 pt-3",
													children: info.features.slice(0, 4).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-start gap-2 text-[11.5px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-3 w-3 shrink-0 text-nv" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: f
														})]
													}, f))
												})
											] })]
										}, pkg);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStep("details"),
										className: "inline-flex items-center gap-2 rounded-full bg-gradient-nv px-6 py-3 text-sm font-semibold text-[oklch(0.18_0.03_130)] shadow-lg transition-all hover:shadow-[0_10px_30px_rgba(118,185,0,0.3)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Continue with ", PACKAGE_INFO[activePackage].name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
									})
								})
							]
						}),
						step === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold",
									children: "Project Brief & Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Provide core requirements so our engineers can immediately prep your architecture."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "b-name",
													className: "text-xs font-medium text-muted-foreground",
													children: "Full Name *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "b-name",
													value: form.full_name,
													onChange: (e) => updateField("full_name", e.target.value),
													placeholder: "Alex Rivera"
												}),
												errors.full_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-destructive",
													children: errors.full_name
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "b-email",
													className: "text-xs font-medium text-muted-foreground",
													children: "Work Email *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "b-email",
													type: "email",
													value: form.email,
													onChange: (e) => updateField("email", e.target.value),
													placeholder: "alex@company.com"
												}),
												errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-destructive",
													children: errors.email
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "b-phone",
													className: "text-xs font-medium text-muted-foreground",
													children: "Phone / WhatsApp *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "b-phone",
													value: form.phone,
													onChange: (e) => updateField("phone", e.target.value),
													placeholder: "+1 315 482 0199"
												}),
												errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-destructive",
													children: errors.phone
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "b-company",
												className: "text-xs font-medium text-muted-foreground",
												children: "Company Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "b-company",
												value: form.company_name,
												onChange: (e) => updateField("company_name", e.target.value),
												placeholder: "Athros Labs Inc."
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "b-type",
											className: "text-xs font-medium text-muted-foreground",
											children: "Project Type *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: "b-type",
											value: form.project_type,
											onChange: (e) => updateField("project_type", e.target.value),
											className: "h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring",
											children: PROJECT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: t,
												children: t
											}, t))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "b-contact",
											className: "text-xs font-medium text-muted-foreground",
											children: "Preferred Contact Channel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-2",
											children: [
												"email",
												"phone",
												"whatsapp"
											].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => updateField("preferred_contact_method", method),
												className: cn("flex-1 rounded-md border py-1.5 text-xs font-medium capitalize transition-colors", form.preferred_contact_method === method ? "border-nv bg-nv/15 text-foreground font-semibold" : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"),
												children: method
											}, method))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "b-summary",
											className: "text-xs font-medium text-muted-foreground",
											children: "Project Summary & Core Features * (Min 20 chars)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "b-summary",
											rows: 3,
											value: form.project_summary,
											onChange: (e) => updateField("project_summary", e.target.value),
											placeholder: "Describe your product, target users, key workflows, integrations, and desired launch deadline..."
										}),
										errors.project_summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-destructive",
											children: errors.project_summary
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-medium text-muted-foreground",
											children: "Reference Links / Figma / Existing App (Optional)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: refLinkInput,
												onChange: (e) => setRefLinkInput(e.target.value),
												placeholder: "https://figma.com/... or https://github.com/...",
												onKeyDown: (e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														handleAddRefLink();
													}
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleAddRefLink,
												className: "inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add"]
											})]
										}),
										form.reference_links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 flex flex-wrap gap-1.5",
											children: form.reference_links.map((link, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "max-w-[180px] truncate",
														children: link
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleRemoveRefLink(idx),
														className: "text-muted-foreground hover:text-destructive",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
													})
												]
											}, idx))
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl border border-border/80 bg-secondary/30 p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: form.terms_accepted,
											onChange: (e) => updateField("terms_accepted", e.target.checked),
											className: "mt-0.5 h-4 w-4 rounded border-border accent-nv"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I agree to the 20% token payment to lock our development sprint. Full source code and IP belong 100% to my company upon milestone completion." })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setStep("package"),
										className: "rounded-full border border-border px-5 py-2.5 text-xs font-medium hover:bg-secondary",
										children: "Back to Packages"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											if (validateDetails()) setStep("summary");
										},
										className: "inline-flex items-center gap-2 rounded-full bg-gradient-nv px-6 py-2.5 text-sm font-semibold text-[oklch(0.18_0.03_130)] shadow-lg hover:shadow-[0_10px_30px_rgba(118,185,0,0.3)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Review & Pay Token" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
									})]
								})
							]
						}),
						step === "summary" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold",
									children: "Order Summary & Token Deposit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Review your project tier and complete the 20% reservation payment via Razorpay."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border bg-card/80 p-5 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border/60 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
												children: "Selected Tier"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display text-lg font-bold text-foreground",
												children: PACKAGE_INFO[activePackage].name
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-nv/15 px-3 py-1 font-mono text-xs font-semibold text-nv",
												children: PACKAGE_INFO[activePackage].delivery
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-foreground",
														children: form.full_name
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contact Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-foreground",
														children: form.email
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Project Scope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-foreground",
														children: form.project_type
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Region / Billing Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-medium text-foreground",
														children: [
															currentCountry.name,
															" (",
															pricingDetail.currency,
															")"
														]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-border/60 pt-3 space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-sm text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Project Price (Fixed Scope)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground",
														children: fullAmountFormatted
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-sm text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Milestone Balance (Due Upon Handover)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: remainingAmountFormatted })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between rounded-xl bg-nv/10 p-3 text-base",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground",
														children: "Token Due Today (20%)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] text-muted-foreground",
														children: "Locks engineering slot and starts discovery"
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-display text-2xl font-bold text-nv",
														children: tokenAmountFormatted
													})]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 text-[11.5px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/20 p-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-nv shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% IP & Source Code Ownership" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/20 p-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-nv shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Razorpay 256-Bit Encrypted Checkout" })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: isProcessing,
										onClick: () => setStep("details"),
										className: "rounded-full border border-border px-5 py-2.5 text-xs font-medium hover:bg-secondary disabled:opacity-50",
										children: "Back to Details"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: isProcessing,
										onClick: handleProceedToPayment,
										className: "inline-flex items-center gap-2 rounded-full bg-gradient-nv px-7 py-3 text-sm font-semibold text-[oklch(0.18_0.03_130)] shadow-lg hover:shadow-[0_10px_30px_rgba(118,185,0,0.3)] disabled:opacity-70",
										children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Initiating Razorpay..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Pay Token ", tokenAmountFormatted] })] })
									})]
								})
							]
						}),
						step === "success" && successInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 py-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nv/20 text-nv",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-bold",
									children: "Booking Confirmed!"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Your token payment has been verified. Your development sprint is officially queued."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-md rounded-2xl border border-border bg-card/80 p-5 text-left space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Booking Number:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-semibold text-foreground",
												children: successInfo.bookingNumber
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Package:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: successInfo.packageName
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Token Paid:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-nv",
												children: successInfo.tokenPaid
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Total Project Price:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: successInfo.totalAmount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Remaining Balance:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-muted-foreground",
												children: successInfo.remainingBalance
											})]
										}),
										successInfo.paymentId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs border-t border-border/60 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Payment ID:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-muted-foreground text-[11px]",
												children: successInfo.paymentId
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-md rounded-xl bg-secondary/40 p-4 text-xs text-muted-foreground text-left space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: "What happens next:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "list-decimal pl-4 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A confirmation email and receipt has been sent to your inbox." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Our lead technical architect is reviewing your project brief." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We will reach out within 4 hours to initiate repository handover & discovery." })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center gap-3 pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: closeBookingModal,
										className: "rounded-full bg-gradient-nv px-7 py-2.5 text-sm font-semibold text-[oklch(0.18_0.03_130)]",
										children: "Done"
									})
								})
							]
						})
					]
				})
			]
		})
	});
}
function Index() {
	useLenis();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadModalProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModalProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyUs, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Integrations, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandCenter, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaSection, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadCaptureModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	}) }) });
}
//#endregion
export { Index as component };
