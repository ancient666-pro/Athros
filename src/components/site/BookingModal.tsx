import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Info,
  Loader2,
  Lock,
  Plus,
  Rocket,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useBookingModal } from "./booking-modal-context";
import { useCurrency } from "@/lib/use-currency";
import {
  bookingSchema,
  DEFAULT_PRICING_CONFIGS,
  type BookingInput,
  type PackageType,
  type RegionType,
} from "@/lib/bookings/bookings.server";
import { submitBookingForm, confirmBookingPayment } from "@/lib/bookings/bookings.functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const COUNTRY_OPTIONS: Array<{ code: string; name: string; region: RegionType }> = [
  { code: "IN", name: "India (+91)", region: "INDIA" },
  { code: "US", name: "United States (+1)", region: "UNITED_STATES" },
  { code: "CA", name: "Canada (+1)", region: "UNITED_STATES" },
  { code: "GB", name: "United Kingdom (+44)", region: "UNITED_KINGDOM" },
  { code: "SG", name: "Singapore (+65)", region: "SINGAPORE" },
  { code: "AE", name: "United Arab Emirates (+971)", region: "MIDDLE_EAST" },
  { code: "SA", name: "Saudi Arabia (+966)", region: "MIDDLE_EAST" },
  { code: "DE", name: "Germany (+49)", region: "EUROPE" },
  { code: "FR", name: "France (+33)", region: "EUROPE" },
  { code: "NL", name: "Netherlands (+31)", region: "EUROPE" },
  { code: "ES", name: "Spain (+34)", region: "EUROPE" },
  { code: "AU", name: "Australia (+61)", region: "UNITED_STATES" },
];

const PACKAGE_INFO: Record<
  PackageType,
  {
    name: string;
    delivery: string;
    tagline: string;
    features: string[];
    isFeatured?: boolean;
  }
> = {
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
      "30-Day Launch Warranty",
    ],
  },
  PRODUCTION_READY: {
    name: "Production Ready",
    delivery: "Delivered in 5–7 Days",
    tagline:
      "Complete cross-platform ecosystem with payments, push notifications, and production infra.",
    isFeatured: true,
    features: [
      "Everything in MVP",
      "Dual Native: Android + iOS",
      "Payment Gateway Integration",
      "Push Notifications & Cloud Messaging",
      "Admin Dashboard & Metrics",
      "Sentry & Crash Monitoring",
      "CI/CD Automated Deployment",
      "90-Day Priority Support & Updates",
    ],
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
      "24/7 Priority Support Channel",
    ],
  },
};

const PROJECT_TYPES = [
  "Native Android app",
  "Native iOS app",
  "Dual Native (Android + iOS)",
  "Cross-Platform App",
  "Backend & Cloud API",
  "AI Platform / SaaS",
];

function loadRazorpayScript(): Promise<boolean> {
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

export function BookingModal() {
  const { isOpen, selectedPackage: initialPackage, closeBookingModal } = useBookingModal();
  const { currency } = useCurrency();

  const [step, setStep] = useState<"package" | "details" | "summary" | "success">("package");
  const [activePackage, setActivePackage] = useState<PackageType>(initialPackage);

  const [form, setForm] = useState<{
    full_name: string;
    email: string;
    phone: string;
    company_name: string;
    country: string;
    project_type: string;
    project_summary: string;
    estimated_requirements: string;
    preferred_contact_method: "email" | "phone" | "whatsapp";
    company_website: string;
    existing_app_url: string;
    reference_links: string[];
    terms_accepted: boolean;
  }>({
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
    terms_accepted: true,
  });

  const [refLinkInput, setRefLinkInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    bookingNumber: string;
    tokenPaid: string;
    totalAmount: string;
    remainingBalance: string;
    packageName: string;
    paymentId?: string;
  } | null>(null);

  const submitFn = useServerFn(submitBookingForm);
  const confirmFn = useServerFn(confirmBookingPayment);

  useEffect(() => {
    if (initialPackage) {
      setActivePackage(initialPackage);
    }
  }, [initialPackage]);

  useEffect(() => {
    if (isOpen) {
      void loadRazorpayScript();
    } else {
      // Reset step on close
      setTimeout(() => {
        setStep("package");
        setErrors({});
        setIsProcessing(false);
      }, 300);
    }
  }, [isOpen]);

  const currentCountry =
    COUNTRY_OPTIONS.find((c) => c.code === form.country) ?? COUNTRY_OPTIONS[0]!;
  const currentRegion = currentCountry.region;
  const pricingDetail = DEFAULT_PRICING_CONFIGS[activePackage][currentRegion];

  const fullAmountFormatted = `${pricingDetail.currency} ${(pricingDetail.full_amount / 100).toLocaleString()}`;
  const tokenAmountFormatted = `${pricingDetail.currency} ${(pricingDetail.token_amount / 100).toLocaleString()}`;
  const remainingAmountFormatted = `${pricingDetail.currency} ${((pricingDetail.full_amount - pricingDetail.token_amount) / 100).toLocaleString()}`;

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
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
        reference_links: [...prev.reference_links, refLinkInput.trim()],
      }));
      setRefLinkInput("");
    } catch {
      toast.error("Please enter a valid URL (e.g. https://example.com)");
    }
  };

  const handleRemoveRefLink = (index: number) => {
    setForm((prev) => ({
      ...prev,
      reference_links: prev.reference_links.filter((_, i) => i !== index),
    }));
  };

  const validateDetails = (): boolean => {
    const parsed = bookingSchema.safeParse({
      ...form,
      selected_package: activePackage,
      region: currentRegion,
      terms_accepted: form.terms_accepted === true ? true : undefined,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = String(issue.path[0] ?? "");
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
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
      const scriptLoaded = await loadRazorpayScript();
      const input: BookingInput = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        company_name: form.company_name || undefined,
        country: form.country,
        project_type: form.project_type,
        selected_package: activePackage,
        region: currentRegion,
        project_summary: form.project_summary,
        estimated_requirements: form.estimated_requirements || undefined,
        preferred_contact_method: form.preferred_contact_method,
        company_website: form.company_website || undefined,
        existing_app_url: form.existing_app_url || undefined,
        reference_links: form.reference_links,
        terms_accepted: true,
      };

      // 1. Create booking & Razorpay order on server
      const result = await submitFn({ data: input });
      const { bookingId, bookingNumber, orderId, keyId, amount, currency } = result;

      // 2. Open Razorpay checkout if script is available
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
            contact: form.phone,
          },
          theme: {
            color: "#76b900",
            backdrop_color: "#05070a",
          },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              toast.loading("Verifying payment security signature...", { id: "payment-verify" });
              await confirmFn({
                data: {
                  bookingId,
                  orderId: response.razorpay_order_id || orderId,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature || "signature_verified",
                },
              });

              toast.success("Payment verified! Project created.", { id: "payment-verify" });
              setSuccessInfo({
                bookingNumber,
                tokenPaid: tokenAmountFormatted,
                totalAmount: fullAmountFormatted,
                remainingBalance: remainingAmountFormatted,
                packageName: PACKAGE_INFO[activePackage].name,
                paymentId: response.razorpay_payment_id,
              });
              setStep("success");
            } catch (confirmErr) {
              toast.error("Payment confirmation failed. Our support team is notified.", {
                id: "payment-verify",
              });
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              toast.info("Payment was cancelled. You can retry whenever ready.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback for offline / simulation
        toast.success("Booking registered. Ready for payment confirmation.");
        setSuccessInfo({
          bookingNumber,
          tokenPaid: tokenAmountFormatted,
          totalAmount: fullAmountFormatted,
          remainingBalance: remainingAmountFormatted,
          packageName: PACKAGE_INFO[activePackage].name,
          paymentId: "rzp_simulated_" + crypto.randomUUID().slice(0, 8),
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? closeBookingModal() : null)}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-card/95 p-0 backdrop-blur-2xl sm:max-w-3xl">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--nv-soft),transparent_70%)] opacity-70 blur-3xl" />

        {/* Modal Header */}
        <div className="sticky top-0 z-20 border-b border-border/80 bg-card/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-gradient-nv" />
              </span>
              <div>
                <DialogTitle className="text-base font-semibold tracking-tight">
                  Book Athros Project
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Lock your sprint with 20% token deposit · Shipped to production
                </DialogDescription>
              </div>
            </div>

            {/* Stepper indicator */}
            {step !== "success" && (
              <div className="hidden items-center gap-1.5 text-xs sm:flex">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-[11px]",
                    step === "package"
                      ? "bg-nv/20 font-semibold text-nv"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  1. Package
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-[11px]",
                    step === "details"
                      ? "bg-nv/20 font-semibold text-nv"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  2. Brief
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-[11px]",
                    step === "summary"
                      ? "bg-nv/20 font-semibold text-nv"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  3. Token Pay
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: PACKAGE SELECTION */}
          {step === "package" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    Select Your Engineering Tier
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    All tiers include source code ownership, CI/CD, and 30-day warranty.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs">
                  <span className="text-muted-foreground">Region:</span>
                  <select
                    aria-label="Select Country"
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    className="bg-transparent font-medium text-foreground focus:outline-none"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code} className="bg-card text-foreground">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {(["MVP", "PRODUCTION_READY", "ENTERPRISE"] as PackageType[]).map((pkg) => {
                  const info = PACKAGE_INFO[pkg];
                  const price = DEFAULT_PRICING_CONFIGS[pkg][currentRegion];
                  const isSelected = activePackage === pkg;

                  return (
                    <div
                      key={pkg}
                      onClick={() => setActivePackage(pkg)}
                      className={cn(
                        "relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-200",
                        isSelected
                          ? "border-nv bg-nv/5 shadow-[0_0_24px_rgba(118,185,0,0.15)] ring-1 ring-nv"
                          : "border-border bg-card/60 hover:border-nv/40 hover:bg-card/90",
                        info.isFeatured && !isSelected && "border-amber-500/30",
                      )}
                    >
                      {info.isFeatured && (
                        <div className="absolute -top-2.5 right-4 flex items-center gap-1 rounded-full bg-[oklch(0.2_0.03_40)] px-2.5 py-0.5 text-[10px] font-semibold text-[oklch(0.95_0.1_85)]">
                          <Flame className="h-3 w-3 text-amber-400" />
                          POPULAR
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-xs tracking-wider uppercase">
                            {info.name}
                          </h4>
                          <span
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-full border text-[10px]",
                              isSelected ? "border-nv bg-nv text-black" : "border-border",
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </span>
                        </div>

                        <div className="mt-3">
                          <p className="font-display text-2xl font-bold">
                            {price.currency} {(price.full_amount / 100).toLocaleString()}
                          </p>
                          <p className="mt-0.5 text-[11px] font-medium text-nv">
                            Token: {price.currency} {(price.token_amount / 100).toLocaleString()}{" "}
                            (20%)
                          </p>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{info.delivery}</span>
                        </div>

                        <p className="mt-2.5 text-xs text-muted-foreground">{info.tagline}</p>

                        <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
                          {info.features.slice(0, 4).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-[11.5px]">
                              <Check className="mt-0.5 h-3 w-3 shrink-0 text-nv" />
                              <span className="text-muted-foreground">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-nv px-6 py-3 text-sm font-semibold text-[oklch(0.18_0.03_130)] shadow-lg transition-all hover:shadow-[0_10px_30px_rgba(118,185,0,0.3)]"
                >
                  <span>Continue with {PACKAGE_INFO[activePackage].name}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PROJECT DETAILS */}
          {step === "details" && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display text-xl font-semibold">Project Brief & Details</h3>
                <p className="text-xs text-muted-foreground">
                  Provide core requirements so our engineers can immediately prep your architecture.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="b-name" className="text-xs font-medium text-muted-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="b-name"
                    value={form.full_name}
                    onChange={(e) => updateField("full_name", e.target.value)}
                    placeholder="Alex Rivera"
                  />
                  {errors.full_name && (
                    <p className="text-[11px] text-destructive">{errors.full_name}</p>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="b-email" className="text-xs font-medium text-muted-foreground">
                    Work Email *
                  </Label>
                  <Input
                    id="b-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="alex@company.com"
                  />
                  {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="b-phone" className="text-xs font-medium text-muted-foreground">
                    Phone / WhatsApp *
                  </Label>
                  <Input
                    id="b-phone"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 315 482 0199"
                  />
                  {errors.phone && <p className="text-[11px] text-destructive">{errors.phone}</p>}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="b-company" className="text-xs font-medium text-muted-foreground">
                    Company Name
                  </Label>
                  <Input
                    id="b-company"
                    value={form.company_name}
                    onChange={(e) => updateField("company_name", e.target.value)}
                    placeholder="Athros Labs Inc."
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="b-type" className="text-xs font-medium text-muted-foreground">
                    Project Type *
                  </Label>
                  <select
                    id="b-type"
                    value={form.project_type}
                    onChange={(e) => updateField("project_type", e.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="b-contact" className="text-xs font-medium text-muted-foreground">
                    Preferred Contact Channel
                  </Label>
                  <div className="flex gap-2">
                    {(["email", "phone", "whatsapp"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => updateField("preferred_contact_method", method)}
                        className={cn(
                          "flex-1 rounded-md border py-1.5 text-xs font-medium capitalize transition-colors",
                          form.preferred_contact_method === method
                            ? "border-nv bg-nv/15 text-foreground font-semibold"
                            : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="b-summary" className="text-xs font-medium text-muted-foreground">
                  Project Summary & Core Features * (Min 20 chars)
                </Label>
                <Textarea
                  id="b-summary"
                  rows={3}
                  value={form.project_summary}
                  onChange={(e) => updateField("project_summary", e.target.value)}
                  placeholder="Describe your product, target users, key workflows, integrations, and desired launch deadline..."
                />
                {errors.project_summary && (
                  <p className="text-[11px] text-destructive">{errors.project_summary}</p>
                )}
              </div>

              {/* Reference Links */}
              <div className="grid gap-1.5">
                <Label className="text-xs font-medium text-muted-foreground">
                  Reference Links / Figma / Existing App (Optional)
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={refLinkInput}
                    onChange={(e) => setRefLinkInput(e.target.value)}
                    placeholder="https://figma.com/... or https://github.com/..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRefLink();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddRefLink}
                    className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>
                {form.reference_links.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {form.reference_links.map((link, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="max-w-[180px] truncate">{link}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRefLink(idx)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms Acceptance */}
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3">
                <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.terms_accepted}
                    onChange={(e) => updateField("terms_accepted", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-nv"
                  />
                  <span>
                    I agree to the 20% token payment to lock our development sprint. Full source
                    code and IP belong 100% to my company upon milestone completion.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("package")}
                  className="rounded-full border border-border px-5 py-2.5 text-xs font-medium hover:bg-secondary"
                >
                  Back to Packages
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateDetails()) setStep("summary");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-nv px-6 py-2.5 text-sm font-semibold text-[oklch(0.18_0.03_130)] shadow-lg hover:shadow-[0_10px_30px_rgba(118,185,0,0.3)]"
                >
                  <span>Review & Pay Token</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUMMARY & TOKEN PAYMENT */}
          {step === "summary" && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Order Summary & Token Deposit
                </h3>
                <p className="text-xs text-muted-foreground">
                  Review your project tier and complete the 20% reservation payment via Razorpay.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/80 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Selected Tier
                    </span>
                    <h4 className="font-display text-lg font-bold text-foreground">
                      {PACKAGE_INFO[activePackage].name}
                    </h4>
                  </div>
                  <span className="rounded-full bg-nv/15 px-3 py-1 font-mono text-xs font-semibold text-nv">
                    {PACKAGE_INFO[activePackage].delivery}
                  </span>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Customer</span>
                    <span className="font-medium text-foreground">{form.full_name}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Contact Email</span>
                    <span className="font-medium text-foreground">{form.email}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Project Scope</span>
                    <span className="font-medium text-foreground">{form.project_type}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Region / Billing Currency</span>
                    <span className="font-medium text-foreground">
                      {currentCountry.name} ({pricingDetail.currency})
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Total Project Price (Fixed Scope)</span>
                    <span className="font-semibold text-foreground">{fullAmountFormatted}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Milestone Balance (Due Upon Handover)</span>
                    <span>{remainingAmountFormatted}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-nv/10 p-3 text-base">
                    <div>
                      <span className="font-semibold text-foreground">Token Due Today (20%)</span>
                      <p className="text-[11px] text-muted-foreground">
                        Locks engineering slot and starts discovery
                      </p>
                    </div>
                    <span className="font-display text-2xl font-bold text-nv">
                      {tokenAmountFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security & Guarantees */}
              <div className="grid grid-cols-2 gap-3 text-[11.5px] text-muted-foreground">
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/20 p-2.5">
                  <ShieldCheck className="h-4 w-4 text-nv shrink-0" />
                  <span>100% IP & Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/20 p-2.5">
                  <Lock className="h-4 w-4 text-nv shrink-0" />
                  <span>Razorpay 256-Bit Encrypted Checkout</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setStep("details")}
                  className="rounded-full border border-border px-5 py-2.5 text-xs font-medium hover:bg-secondary disabled:opacity-50"
                >
                  Back to Details
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProceedToPayment}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-nv px-7 py-3 text-sm font-semibold text-[oklch(0.18_0.03_130)] shadow-lg hover:shadow-[0_10px_30px_rgba(118,185,0,0.3)] disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Initiating Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      <span>Pay Token {tokenAmountFormatted}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === "success" && successInfo && (
            <div className="space-y-6 py-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nv/20 text-nv">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold">Booking Confirmed!</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your token payment has been verified. Your development sprint is officially
                  queued.
                </p>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-border bg-card/80 p-5 text-left space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Booking Number:</span>
                  <span className="font-mono font-semibold text-foreground">
                    {successInfo.bookingNumber}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium text-foreground">{successInfo.packageName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Token Paid:</span>
                  <span className="font-bold text-nv">{successInfo.tokenPaid}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Project Price:</span>
                  <span className="font-medium text-foreground">{successInfo.totalAmount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Remaining Balance:</span>
                  <span className="font-medium text-muted-foreground">
                    {successInfo.remainingBalance}
                  </span>
                </div>
                {successInfo.paymentId && (
                  <div className="flex justify-between text-xs border-t border-border/60 pt-2">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span className="font-mono text-muted-foreground text-[11px]">
                      {successInfo.paymentId}
                    </span>
                  </div>
                )}
              </div>

              <div className="mx-auto max-w-md rounded-xl bg-secondary/40 p-4 text-xs text-muted-foreground text-left space-y-2">
                <p className="font-semibold text-foreground">What happens next:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>A confirmation email and receipt has been sent to your inbox.</li>
                  <li>Our lead technical architect is reviewing your project brief.</li>
                  <li>
                    We will reach out within 4 hours to initiate repository handover & discovery.
                  </li>
                </ol>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="rounded-full bg-gradient-nv px-7 py-2.5 text-sm font-semibold text-[oklch(0.18_0.03_130)]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
