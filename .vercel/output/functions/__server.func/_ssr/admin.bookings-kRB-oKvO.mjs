import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-QYZFi3Fq.mjs";
import { r as cn, t as Input } from "./input-BrmI0Glv.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as CircleCheck, G as ExternalLink, L as Globe, W as Eye, Z as Clock, _ as RefreshCw, et as CircleAlert, h as Search, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PortalShell, t as Badge } from "./badge-BJAdSnW3.mjs";
import { n as getAdminBookings } from "./bookings.functions-DSq-Qfyj.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BcDnHXwO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.bookings-kRB-oKvO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminBookingsPage() {
	const fetchBookings = useServerFn(getAdminBookings);
	const [search, setSearch] = (0, import_react.useState)("");
	const [packageFilter, setPackageFilter] = (0, import_react.useState)("ALL");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [selectedBooking, setSelectedBooking] = (0, import_react.useState)(null);
	const { data, isPending, error, refetch, isRefetching } = useQuery({
		queryKey: ["admin-bookings"],
		queryFn: () => fetchBookings(),
		retry: false
	});
	const bookings = data?.bookings ?? [];
	const filteredBookings = (0, import_react.useMemo)(() => {
		return bookings.filter((b) => {
			const matchSearch = search === "" || b.booking_number.toLowerCase().includes(search.toLowerCase()) || b.customer_name.toLowerCase().includes(search.toLowerCase()) || b.customer_email.toLowerCase().includes(search.toLowerCase()) || b.company_name && b.company_name.toLowerCase().includes(search.toLowerCase());
			const matchPackage = packageFilter === "ALL" || b.package === packageFilter;
			const matchStatus = statusFilter === "ALL" || b.status === statusFilter || b.payment_status === statusFilter;
			return matchSearch && matchPackage && matchStatus;
		});
	}, [
		bookings,
		search,
		packageFilter,
		statusFilter
	]);
	const stats = (0, import_react.useMemo)(() => {
		const total = bookings.length;
		const captured = bookings.filter((b) => b.payment_status === "captured" || b.status === "TOKEN_PAID");
		const pending = bookings.filter((b) => b.payment_status !== "captured" && b.status !== "TOKEN_PAID");
		const tokenSumINR = captured.filter((b) => b.currency === "INR").reduce((sum, b) => sum + b.token_amount, 0) / 100;
		const tokenSumUSD = captured.filter((b) => b.currency === "USD").reduce((sum, b) => sum + b.token_amount, 0) / 100;
		return {
			total,
			capturedCount: captured.length,
			pendingCount: pending.length,
			revenueSummary: `₹${tokenSumINR.toLocaleString()} + $${tokenSumUSD.toLocaleString()}`
		};
	}, [bookings]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		isAdmin: true,
		subtitle: "Admin Portal · Bookings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-64 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-nv" })
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		subtitle: "Admin Portal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5" }), "Access Restricted"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "This screen requires Athros staff / admin credentials."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		isAdmin: true,
		subtitle: "Operations · Bookings Ledger",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl",
					children: "Project Bookings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Real-time pipeline of customer reservations, Razorpay token payments, and activated sprints."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => refetch(),
					disabled: isRefetching,
					className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", isRefetching && "animate-spin text-nv") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Total Bookings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display mt-1 text-2xl font-bold",
								children: stats.total
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "All time registered leads"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Token Paid & Sprints Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display mt-1 text-2xl font-bold text-nv",
								children: stats.capturedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Verified by Razorpay webhook"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Pending Payment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display mt-1 text-2xl font-bold text-amber-400",
								children: stats.pendingCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Awaiting customer checkout"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Token Revenue Collected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display mt-1 text-lg font-bold",
								children: stats.revenueSummary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "20% initial sprint deposits"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[260px] flex-1 max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search by customer, email, booking #...",
						className: "pl-9 text-xs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: packageFilter,
						onChange: (e) => setPackageFilter(e.target.value),
						className: "h-9 rounded-md border border-input bg-card px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Packages"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "MVP",
								children: "MVP Pack"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PRODUCTION_READY",
								children: "Production Ready"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ENTERPRISE",
								children: "Enterprise Elite"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: statusFilter,
						onChange: (e) => setStatusFilter(e.target.value),
						className: "h-9 rounded-md border border-input bg-card px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "TOKEN_PAID",
								children: "Token Paid (Active)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PAYMENT_PENDING",
								children: "Payment Pending"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PAYMENT_REVIEW_REQUIRED",
								children: "Review Required"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CANCELLED",
								children: "Cancelled"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-hidden rounded-2xl border border-border bg-card/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-secondary/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Booking #"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Package"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Financials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Payment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Created"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Action"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border/60",
							children: [filteredBookings.map((b) => {
								const totalFormatted = `${b.currency} ${(b.full_amount / 100).toLocaleString()}`;
								const tokenFormatted = `${b.currency} ${(b.token_amount / 100).toLocaleString()}`;
								const isPaid = b.payment_status === "captured" || b.status === "TOKEN_PAID";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "transition-colors hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-mono font-medium text-foreground whitespace-nowrap",
											children: b.booking_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground",
													children: b.customer_name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground",
													children: b.customer_email
												}),
												b.company_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground/80",
													children: b.company_name
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "text-[10.5px]",
												children: b.package.replace(/_/g, " ")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-[10px] text-muted-foreground",
												children: b.region
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-foreground",
												children: totalFormatted
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-semibold text-nv",
												children: ["Token: ", tokenFormatted]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", isPaid ? "bg-nv/15 text-nv" : b.payment_status === "failed" ? "bg-destructive/15 text-destructive" : "bg-amber-400/15 text-amber-400"),
												children: [isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), b.payment_status]
											}), b.razorpay_payment_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[9.5px] text-muted-foreground truncate max-w-[100px]",
												children: b.razorpay_payment_id
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: cn("text-[10.5px]", isPaid && "bg-nv/10 text-nv border-nv/30"),
												children: b.status.replace(/_/g, " ")
											}), b.project_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Project Linked"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-[11px] text-muted-foreground whitespace-nowrap",
											children: new Date(b.created_at).toLocaleDateString()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setSelectedBooking(b),
												className: "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-secondary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), "Inspect"]
											})
										})
									]
								}, b.id);
							}), filteredBookings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "py-12 text-center text-muted-foreground",
								children: "No bookings found matching your search criteria."
							}) })]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(selectedBooking),
				onOpenChange: (open) => !open ? setSelectedBooking(null) : null,
				children: selectedBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[88vh] overflow-y-auto border-border bg-card/95 sm:max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-xl font-bold",
							children: "Booking Inspection"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "font-mono text-xs",
							children: selectedBooking.booking_number
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs",
						children: "Complete project brief, financial ledger, and gateway tracking."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 pt-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Customer Profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "Name:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: selectedBooking.customer_name
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "Email:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-nv",
											children: selectedBooking.customer_email
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "Phone:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedBooking.customer_phone })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "Company:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedBooking.company_name ?? "Not specified" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "Country:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											selectedBooking.country,
											" (",
											selectedBooking.region,
											")"
										] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "Preferred Contact:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "capitalize",
											children: selectedBooking.preferred_contact_method
										})] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Project Brief & Scope"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Project Type:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: selectedBooking.project_type
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Project Summary:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "rounded-lg bg-card p-3 text-foreground whitespace-pre-wrap leading-relaxed",
											children: selectedBooking.project_summary
										})] }),
										selectedBooking.estimated_requirements && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Additional Requirements:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "rounded-lg bg-card p-3 text-foreground whitespace-pre-wrap",
											children: selectedBooking.estimated_requirements
										})] }),
										(selectedBooking.company_website || selectedBooking.existing_app_url || selectedBooking.reference_links.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Links & Resources:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-2",
												children: [
													selectedBooking.company_website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: selectedBooking.company_website,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-nv hover:underline",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3" }), " Website"]
													}),
													selectedBooking.existing_app_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: selectedBooking.existing_app_url,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-nv hover:underline",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), " Existing App"]
													}),
													selectedBooking.reference_links.map((link, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: link,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-muted-foreground hover:text-foreground",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }),
															" Link #",
															idx + 1
														]
													}, idx))
												]
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Financials & Razorpay Gateway Ledger"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Total Agreed Price:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-sm",
											children: [
												selectedBooking.currency,
												" ",
												(selectedBooking.full_amount / 100).toLocaleString()
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Token Deposit (20%):"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-sm text-nv",
											children: [
												selectedBooking.currency,
												" ",
												(selectedBooking.token_amount / 100).toLocaleString()
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Remaining Balance (80%):"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm",
											children: [
												selectedBooking.currency,
												" ",
												((selectedBooking.full_amount - selectedBooking.token_amount) / 100).toLocaleString()
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Payment Status:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-sm capitalize",
											children: selectedBooking.payment_status
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Razorpay Order ID:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-muted-foreground",
											children: selectedBooking.razorpay_order_id ?? "N/A"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Razorpay Payment ID:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-muted-foreground",
											children: selectedBooking.razorpay_payment_id ?? "N/A"
										})] }),
										selectedBooking.paid_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Captured At:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: new Date(selectedBooking.paid_at).toLocaleString() })] }),
										selectedBooking.project_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Linked Project ID:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-nv",
											children: selectedBooking.project_id
										})] })
									]
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminBookingsPage as component };
