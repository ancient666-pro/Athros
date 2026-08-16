import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  Filter,
  Globe,
  Loader2,
  Mail,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldAlert,
  User,
  X,
} from "lucide-react";
import { getAdminBookings } from "@/lib/bookings/bookings.functions";
import { PortalShell } from "@/components/portal/PortalShell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  head: () => ({
    meta: [
      { title: "Project Bookings — Athros Admin" },
      { name: "description", content: "Manage incoming project bookings and token payments." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminBookingsPage,
});

interface BookingRow {
  id: string;
  booking_number: string;
  user_id: string | null;
  package: string;
  region: string;
  currency: string;
  full_amount: number;
  token_amount: number;
  token_percentage: number;
  status: string;
  payment_status: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company_name: string | null;
  country: string;
  project_type: string;
  project_summary: string;
  estimated_requirements: string | null;
  preferred_contact_method: string;
  company_website: string | null;
  existing_app_url: string | null;
  reference_links: string[];
  terms_accepted_at: string;
  created_at: string;
  paid_at: string | null;
  project_id: string | null;
  booking_payments?: Array<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    provider_payment_id: string | null;
    created_at: string;
  }>;
}

function AdminBookingsPage() {
  const fetchBookings = useServerFn(getAdminBookings);
  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);

  const { data, isPending, error, refetch, isRefetching } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings(),
    retry: false,
  });

  const bookings = (data?.bookings ?? []) as BookingRow[];

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        search === "" ||
        b.booking_number.toLowerCase().includes(search.toLowerCase()) ||
        b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        b.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        (b.company_name && b.company_name.toLowerCase().includes(search.toLowerCase()));

      const matchPackage = packageFilter === "ALL" || b.package === packageFilter;
      const matchStatus =
        statusFilter === "ALL" || b.status === statusFilter || b.payment_status === statusFilter;

      return matchSearch && matchPackage && matchStatus;
    });
  }, [bookings, search, packageFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const captured = bookings.filter(
      (b) => b.payment_status === "captured" || b.status === "TOKEN_PAID",
    );
    const pending = bookings.filter(
      (b) => b.payment_status !== "captured" && b.status !== "TOKEN_PAID",
    );
    const tokenSumINR =
      captured.filter((b) => b.currency === "INR").reduce((sum, b) => sum + b.token_amount, 0) /
      100;
    const tokenSumUSD =
      captured.filter((b) => b.currency === "USD").reduce((sum, b) => sum + b.token_amount, 0) /
      100;

    return {
      total,
      capturedCount: captured.length,
      pendingCount: pending.length,
      revenueSummary: `₹${tokenSumINR.toLocaleString()} + $${tokenSumUSD.toLocaleString()}`,
    };
  }, [bookings]);

  if (isPending) {
    return (
      <PortalShell isAdmin subtitle="Admin Portal · Bookings">
        <div className="grid h-64 place-items-center">
          <Loader2 className="h-6 w-6 animate-spin text-nv" />
        </div>
      </PortalShell>
    );
  }

  if (error) {
    return (
      <PortalShell subtitle="Admin Portal">
        <div className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-5 w-5" />
            Access Restricted
          </div>
          <p className="mt-1 text-muted-foreground">
            This screen requires Athros staff / admin credentials.
          </p>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell isAdmin subtitle="Operations · Bookings Ledger">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Project Bookings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time pipeline of customer reservations, Razorpay token payments, and activated
            sprints.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isRefetching && "animate-spin text-nv")} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass rounded-2xl border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground">Total Bookings</p>
          <p className="font-display mt-1 text-2xl font-bold">{stats.total}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">All time registered leads</p>
        </div>

        <div className="glass rounded-2xl border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground">Token Paid & Sprints Active</p>
          <p className="font-display mt-1 text-2xl font-bold text-nv">{stats.capturedCount}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Verified by Razorpay webhook</p>
        </div>

        <div className="glass rounded-2xl border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground">Pending Payment</p>
          <p className="font-display mt-1 text-2xl font-bold text-amber-400">
            {stats.pendingCount}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Awaiting customer checkout</p>
        </div>

        <div className="glass rounded-2xl border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground">Token Revenue Collected</p>
          <p className="font-display mt-1 text-lg font-bold">{stats.revenueSummary}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">20% initial sprint deposits</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[260px] flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, email, booking #..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-card px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="ALL">All Packages</option>
            <option value="MVP">MVP Pack</option>
            <option value="PRODUCTION_READY">Production Ready</option>
            <option value="ENTERPRISE">Enterprise Elite</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-card px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="ALL">All Statuses</option>
            <option value="TOKEN_PAID">Token Paid (Active)</option>
            <option value="PAYMENT_PENDING">Payment Pending</option>
            <option value="PAYMENT_REVIEW_REQUIRED">Review Required</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Booking #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Financials</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredBookings.map((b) => {
                const totalFormatted = `${b.currency} ${(b.full_amount / 100).toLocaleString()}`;
                const tokenFormatted = `${b.currency} ${(b.token_amount / 100).toLocaleString()}`;
                const isPaid = b.payment_status === "captured" || b.status === "TOKEN_PAID";

                return (
                  <tr key={b.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3 font-mono font-medium text-foreground whitespace-nowrap">
                      {b.booking_number}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{b.customer_name}</p>
                      <p className="text-[11px] text-muted-foreground">{b.customer_email}</p>
                      {b.company_name && (
                        <p className="text-[10px] text-muted-foreground/80">{b.company_name}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[10.5px]">
                        {b.package.replace(/_/g, " ")}
                      </Badge>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{b.region}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-medium text-foreground">{totalFormatted}</p>
                      <p className="text-[11px] font-semibold text-nv">Token: {tokenFormatted}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                          isPaid
                            ? "bg-nv/15 text-nv"
                            : b.payment_status === "failed"
                              ? "bg-destructive/15 text-destructive"
                              : "bg-amber-400/15 text-amber-400",
                        )}
                      >
                        {isPaid ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {b.payment_status}
                      </span>
                      {b.razorpay_payment_id && (
                        <p className="font-mono text-[9.5px] text-muted-foreground truncate max-w-[100px]">
                          {b.razorpay_payment_id}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={cn("text-[10.5px]", isPaid && "bg-nv/10 text-nv border-nv/30")}
                      >
                        {b.status.replace(/_/g, " ")}
                      </Badge>
                      {b.project_id && (
                        <p className="text-[10px] text-muted-foreground">Project Linked</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground whitespace-nowrap">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedBooking(b)}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-secondary"
                      >
                        <Eye className="h-3 w-3" />
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No bookings found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Inspector Dialog */}
      <Dialog
        open={Boolean(selectedBooking)}
        onOpenChange={(open) => (!open ? setSelectedBooking(null) : null)}
      >
        {selectedBooking && (
          <DialogContent className="max-h-[88vh] overflow-y-auto border-border bg-card/95 sm:max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display text-xl font-bold">
                  Booking Inspection
                </DialogTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  {selectedBooking.booking_number}
                </Badge>
              </div>
              <DialogDescription className="text-xs">
                Complete project brief, financial ledger, and gateway tracking.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2 text-xs">
              {/* Customer & Company */}
              <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2">
                <h4 className="font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer Profile
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Name:</span>
                    <p className="font-semibold">{selectedBooking.customer_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Email:</span>
                    <p className="font-semibold text-nv">{selectedBooking.customer_email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Phone:</span>
                    <p>{selectedBooking.customer_phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Company:</span>
                    <p>{selectedBooking.company_name ?? "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Country:</span>
                    <p>
                      {selectedBooking.country} ({selectedBooking.region})
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Preferred Contact:</span>
                    <p className="capitalize">{selectedBooking.preferred_contact_method}</p>
                  </div>
                </div>
              </div>

              {/* Project Brief */}
              <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2">
                <h4 className="font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Project Brief & Scope
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground">Project Type:</span>
                    <p className="font-medium text-foreground">{selectedBooking.project_type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Project Summary:</span>
                    <p className="rounded-lg bg-card p-3 text-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedBooking.project_summary}
                    </p>
                  </div>
                  {selectedBooking.estimated_requirements && (
                    <div>
                      <span className="text-muted-foreground">Additional Requirements:</span>
                      <p className="rounded-lg bg-card p-3 text-foreground whitespace-pre-wrap">
                        {selectedBooking.estimated_requirements}
                      </p>
                    </div>
                  )}
                  {(selectedBooking.company_website ||
                    selectedBooking.existing_app_url ||
                    selectedBooking.reference_links.length > 0) && (
                    <div className="space-y-1 pt-1">
                      <span className="text-muted-foreground">Links & Resources:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedBooking.company_website && (
                          <a
                            href={selectedBooking.company_website}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-nv hover:underline"
                          >
                            <Globe className="h-3 w-3" /> Website
                          </a>
                        )}
                        {selectedBooking.existing_app_url && (
                          <a
                            href={selectedBooking.existing_app_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-nv hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" /> Existing App
                          </a>
                        )}
                        {selectedBooking.reference_links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3 w-3" /> Link #{idx + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial & Gateway Records */}
              <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-2">
                <h4 className="font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Financials & Razorpay Gateway Ledger
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground">Total Agreed Price:</span>
                    <p className="font-semibold text-sm">
                      {selectedBooking.currency}{" "}
                      {(selectedBooking.full_amount / 100).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Token Deposit (20%):</span>
                    <p className="font-semibold text-sm text-nv">
                      {selectedBooking.currency}{" "}
                      {(selectedBooking.token_amount / 100).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Remaining Balance (80%):</span>
                    <p className="text-sm">
                      {selectedBooking.currency}{" "}
                      {(
                        (selectedBooking.full_amount - selectedBooking.token_amount) /
                        100
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Status:</span>
                    <p className="font-semibold text-sm capitalize">
                      {selectedBooking.payment_status}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Razorpay Order ID:</span>
                    <p className="font-mono text-muted-foreground">
                      {selectedBooking.razorpay_order_id ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Razorpay Payment ID:</span>
                    <p className="font-mono text-muted-foreground">
                      {selectedBooking.razorpay_payment_id ?? "N/A"}
                    </p>
                  </div>
                  {selectedBooking.paid_at && (
                    <div>
                      <span className="text-muted-foreground">Captured At:</span>
                      <p>{new Date(selectedBooking.paid_at).toLocaleString()}</p>
                    </div>
                  )}
                  {selectedBooking.project_id && (
                    <div>
                      <span className="text-muted-foreground">Linked Project ID:</span>
                      <p className="font-mono text-nv">{selectedBooking.project_id}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PortalShell>
  );
}
