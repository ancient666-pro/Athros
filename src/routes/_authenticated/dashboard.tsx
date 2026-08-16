import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Github,
  KeyRound,
  Layers,
  Laptop,
  Loader2,
  Lock,
  Plus,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Video,
} from "lucide-react";
import {
  getMyPortal,
  submitRequirement,
  requestEnhancement,
  addEnhancementComment,
  reportIssue,
  replyToIssue,
  markNotificationRead,
  updateClientPassword,
  revokeClientSession,
  updateMyProfile,
  type PortalData,
  type RedactedDelivery,
} from "@/lib/portal.functions";
import { PortalShell } from "@/components/portal/PortalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mailtoHref, siteConfig, telHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Command Center — Athros" },
      {
        name: "description",
        content:
          "Athros Client Command Center: real-time sprint tracking, requirements, issues, payments, meetings, builds, and delivery.",
      },
      { property: "og:title", content: "Command Center — Athros" },
      {
        property: "og:description",
        content: "Track your native mobile app build, milestones, requirements, and deliverables in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CommandCenterDashboard,
});

const LIFECYCLE_STAGES = [
  { key: "discovery", label: "Discovery", desc: "Briefing & Architecture" },
  { key: "requirements", label: "Requirements", desc: "Scope & Specifications" },
  { key: "design", label: "Design", desc: "UI/UX & Design Tokens" },
  { key: "development", label: "Development", desc: "Native Sprint Delivery" },
  { key: "testing", label: "QA & Testing", desc: "Automated & Device QA" },
  { key: "uat", label: "Client Review", desc: "Beta Builds & Sign-off" },
  { key: "delivery", label: "Delivery", desc: "Signed Builds & Release" },
  { key: "completed", label: "Completed", desc: "Production Handover" },
];

function statusColor(status?: string | null) {
  switch (status?.toLowerCase()) {
    case "completed":
    case "done":
    case "paid":
    case "approved":
    case "resolved":
    case "captured":
      return "bg-nv/20 text-nv border-nv/40";
    case "in_progress":
    case "under_review":
    case "submitted":
    case "triaged":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    case "urgent":
    case "critical":
    case "failed":
    case "rejected":
      return "bg-red-500/15 text-red-300 border-red-500/30";
    default:
      return "bg-muted/40 text-muted-foreground border-border";
  }
}

function CommandCenterDashboard() {
  const queryClient = useQueryClient();
  const fetchPortal = useServerFn(getMyPortal);

  // Mutations
  const submitReqFn = useServerFn(submitRequirement);
  const requestEnhanceFn = useServerFn(requestEnhancement);
  const addEnhanceCommentFn = useServerFn(addEnhancementComment);
  const reportIssueFn = useServerFn(reportIssue);
  const replyIssueFn = useServerFn(replyToIssue);
  const markReadFn = useServerFn(markNotificationRead);
  const updatePasswordFn = useServerFn(updateClientPassword);
  const revokeSessionFn = useServerFn(revokeClientSession);
  const updateProfileFn = useServerFn(updateMyProfile);

  // Local state
  const [activeTab, setActiveTab] = useState("overview");

  // Modal dialog states
  const [reqModalOpen, setReqModalOpen] = useState(false);
  const [reqTitle, setReqTitle] = useState("");
  const [reqBody, setReqBody] = useState("");

  const [enhanceModalOpen, setEnhanceModalOpen] = useState(false);
  const [enhanceTitle, setEnhanceTitle] = useState("");
  const [enhanceDesc, setEnhanceDesc] = useState("");
  const [enhancePriority, setEnhancePriority] = useState<"low" | "medium" | "high" | "urgent">("medium");

  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDetail, setIssueDetail] = useState("");
  const [issueSeverity, setIssueSeverity] = useState<"low" | "medium" | "high" | "critical">("medium");

  // Comment / reply text state
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Profile update state
  const [profileName, setProfileName] = useState("");
  const [profileCompany, setProfileCompany] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileInitialized, setProfileInitialized] = useState(false);

  const { data, isPending, error, refetch, isRefetching } = useQuery<PortalData>({
    queryKey: ["portal"],
    queryFn: async () => {
      const res = await fetchPortal();
      return res as PortalData;
    },
  });

  // Populate profile initial values
  if (data?.profile && !profileInitialized) {
    setProfileName(data.profile.full_name ?? "");
    setProfileCompany(data.profile.company ?? "");
    setProfilePhone(data.profile.phone ?? "");
    setProfileInitialized(true);
  }

  // Mutation Handlers
  const reqMutation = useMutation({
    mutationFn: (input: { projectId: string; title: string; body?: string }) =>
      submitReqFn({ data: input }),
    onSuccess: () => {
      toast.success("Requirement submitted successfully");
      setReqModalOpen(false);
      setReqTitle("");
      setReqBody("");
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const enhanceMutation = useMutation({
    mutationFn: (input: { projectId: string; title: string; description?: string; priority: "low" | "medium" | "high" | "urgent" }) =>
      requestEnhanceFn({ data: input }),
    onSuccess: () => {
      toast.success("Enhancement requested");
      setEnhanceModalOpen(false);
      setEnhanceTitle("");
      setEnhanceDesc("");
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const enhanceCommentMutation = useMutation({
    mutationFn: (input: { enhancementId: string; body: string }) =>
      addEnhanceCommentFn({ data: input }),
    onSuccess: (_, vars) => {
      toast.success("Comment added");
      setCommentInputs((prev) => ({ ...prev, [vars.enhancementId]: "" }));
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const issueMutation = useMutation({
    mutationFn: (input: { projectId: string; title: string; detail?: string; severity: "low" | "medium" | "high" | "critical" }) =>
      reportIssueFn({ data: input }),
    onSuccess: () => {
      toast.success("Issue reported to engineering team");
      setIssueModalOpen(false);
      setIssueTitle("");
      setIssueDetail("");
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const issueReplyMutation = useMutation({
    mutationFn: (input: { issueId: string; body: string }) =>
      replyIssueFn({ data: input }),
    onSuccess: (_, vars) => {
      toast.success("Reply posted");
      setReplyInputs((prev) => ({ ...prev, [vars.issueId]: "" }));
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const notificationReadMutation = useMutation({
    mutationFn: (input: { notificationId?: string; markAll?: boolean }) =>
      markReadFn({ data: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (pwd: string) => updatePasswordFn({ data: { newPassword: pwd } }),
    onSuccess: () => {
      toast.success("Password updated successfully");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const sessionRevokeMutation = useMutation({
    mutationFn: (sessionId: string) => revokeSessionFn({ data: { sessionId } }),
    onSuccess: () => {
      toast.success("Session revoked");
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const profileMutation = useMutation({
    mutationFn: (input: { fullName?: string; company?: string; phone?: string }) =>
      updateProfileFn({ data: input }),
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["portal"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isPending) {
    return (
      <PortalShell subtitle="Command Center · Initializing">
        <div className="grid h-72 place-items-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-nv" />
            <p className="text-sm">Connecting to secure project workspace…</p>
          </div>
        </div>
      </PortalShell>
    );
  }

  if (error || !data) {
    return (
      <PortalShell subtitle="Command Center">
        <div className="glass mt-6 rounded-3xl border border-border p-8">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <h2 className="font-display text-xl font-semibold">Unable to load workspace</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't retrieve your project records. Please refresh or contact your lead engineer at{" "}
            <a className="text-nv underline" href={mailtoHref}>
              {siteConfig.supportEmail}
            </a>
            .
          </p>
          <Button onClick={() => refetch()} className="mt-4" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </div>
      </PortalShell>
    );
  }

  const {
    project,
    booking,
    profile,
    isAdmin,
    milestones,
    requirements,
    enhancements,
    issues,
    invoices,
    meetings,
    deliveries,
    notifications,
    sessions,
    financials,
  } = data;

  const unreadNotifications = notifications.filter((n) => !n.read);
  const openIssues = issues.filter((i) => i.status !== "resolved" && i.status !== "closed");

  // Determine current lifecycle index
  const currentStatus = project?.status?.toLowerCase() ?? "discovery";
  const currentStageIndex = LIFECYCLE_STAGES.findIndex((s) => s.key === currentStatus);
  const resolvedStageIndex = currentStageIndex >= 0 ? currentStageIndex : 0;

  return (
    <PortalShell
      isAdmin={isAdmin}
      subtitle="Client Command Center"
      unreadCount={unreadNotifications.length}
    >
      {/* Top Banner & Project Identity */}
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {project ? project.name : `Welcome, ${profile?.full_name ?? "Founder"}`}
            </h1>
            {project ? (
              <Badge className={cn("rounded-full border px-3 py-0.5 text-xs font-semibold capitalize", statusColor(project.status))}>
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                {project.status.replace(/_/g, " ")}
              </Badge>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {booking?.booking_number ? (
              <span className="font-mono text-[11px] text-muted-foreground">
                Ref: <strong className="text-foreground">{booking.booking_number}</strong>
              </span>
            ) : null}
            {booking?.package ? (
              <Badge variant="outline" className="rounded-full text-[11px]">
                {booking.package.replace(/_/g, " ")}
              </Badge>
            ) : null}
            {project?.currency ? (
              <span className="font-mono text-[11px]">Region: {project.region ?? "Global"} ({project.currency})</span>
            ) : null}
            {project?.progress !== undefined ? (
              <span className="text-[12px] font-medium text-foreground">
                Progress: <strong className="text-nv">{project.progress}%</strong>
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="rounded-full text-xs"
          >
            <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", isRefetching && "animate-spin text-nv")} />
            Sync
          </Button>

          {project ? (
            <Button
              size="sm"
              onClick={() => setReqModalOpen(true)}
              className="rounded-full bg-nv text-slate-950 hover:bg-nv/90 text-xs font-semibold"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Submit Brief
            </Button>
          ) : null}
        </div>
      </div>

      {!project ? (
        /* Empty / No Project State */
        <div className="glass mt-8 rounded-3xl border border-border p-8 sm:p-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-nv/10 text-nv">
            <Layers className="h-8 w-8" />
          </div>
          <h2 className="font-display mt-4 text-2xl font-bold">Project Onboarding in Progress</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Your Athros reservation is verified. Our senior architecture team is preparing your
            dedicated sprint timeline, repository, and deliverable channels.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
                Book a Kickoff Call
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={telHref}>Direct Desk: {siteConfig.supportPhone}</a>
            </Button>
          </div>
        </div>
      ) : (
        /* Multi-Section Command Center Tabs */
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="overflow-x-auto pb-2">
            <TabsList className="glass h-auto flex-nowrap gap-1 rounded-2xl border border-border p-1.5">
              <TabsTrigger value="overview" className="rounded-xl text-xs font-medium py-2 px-3">
                <Activity className="mr-1.5 h-3.5 w-3.5" /> Overview
              </TabsTrigger>
              <TabsTrigger value="project" className="rounded-xl text-xs font-medium py-2 px-3">
                <Layers className="mr-1.5 h-3.5 w-3.5" /> Lifecycle & Milestones
              </TabsTrigger>
              <TabsTrigger value="requirements" className="rounded-xl text-xs font-medium py-2 px-3">
                <FileText className="mr-1.5 h-3.5 w-3.5" /> Requirements ({requirements.length})
              </TabsTrigger>
              <TabsTrigger value="enhancements" className="rounded-xl text-xs font-medium py-2 px-3">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Enhancements ({enhancements.length})
              </TabsTrigger>
              <TabsTrigger value="issues" className="rounded-xl text-xs font-medium py-2 px-3">
                <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Issues ({openIssues.length})
              </TabsTrigger>
              <TabsTrigger value="payments" className="rounded-xl text-xs font-medium py-2 px-3">
                <CreditCard className="mr-1.5 h-3.5 w-3.5" /> Payments & Invoices
              </TabsTrigger>
              <TabsTrigger value="meetings" className="rounded-xl text-xs font-medium py-2 px-3">
                <Video className="mr-1.5 h-3.5 w-3.5" /> Meetings ({meetings.length})
              </TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-xl text-xs font-medium py-2 px-3 relative">
                <Bell className="mr-1.5 h-3.5 w-3.5" /> Notifications
                {unreadNotifications.length > 0 ? (
                  <span className="ml-1.5 inline-grid h-4 w-4 place-items-center rounded-full bg-nv text-[10px] font-bold text-slate-950">
                    {unreadNotifications.length}
                  </span>
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="delivery" className="rounded-xl text-xs font-medium py-2 px-3">
                <Download className="mr-1.5 h-3.5 w-3.5" /> Deliverables ({deliveries.length})
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-xl text-xs font-medium py-2 px-3">
                <KeyRound className="mr-1.5 h-3.5 w-3.5" /> Account & Security
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ============================================================ */}
          {/* TAB 1: OVERVIEW */}
          {/* ============================================================ */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Sprint Completion
                </p>
                <p className="font-display mt-2 text-3xl font-bold tracking-tight">{project.progress}%</p>
                <Progress value={project.progress} className="mt-3 h-2" />
                <p className="mt-2 text-[11.5px] text-muted-foreground capitalize">
                  Current: {project.status.replace(/_/g, " ")}
                </p>
              </div>

              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Milestones
                </p>
                <p className="font-display mt-2 text-3xl font-bold tracking-tight">
                  {milestones.filter((m) => m.status === "done" || m.status === "completed").length} / {milestones.length}
                </p>
                <p className="mt-3 text-[11.5px] text-muted-foreground">
                  {milestones.length === 0 ? "Initial sprint breakdown pending" : "Milestones published"}
                </p>
              </div>

              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Open Issues
                </p>
                <p className="font-display mt-2 text-3xl font-bold tracking-tight">{openIssues.length}</p>
                <p className="mt-3 text-[11.5px] text-muted-foreground">
                  {openIssues.length === 0 ? "Zero blocking defects" : `${openIssues.length} active bug / inquiry tickets`}
                </p>
              </div>

              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Financial Balance
                </p>
                <p className="font-display mt-2 text-2xl font-bold">
                  {financials.currency} {(financials.remainingBalance / 100).toLocaleString()}
                </p>
                <p className="mt-3 text-[11.5px] text-muted-foreground">
                  Token Paid: {financials.currency} {(financials.tokenPaid / 100).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quick Actions & Next Milestone */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="glass rounded-3xl border border-border p-6 lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">Active Sprint Overview</h3>
                  <Badge variant="outline" className="rounded-full text-xs">
                    Phase: {LIFECYCLE_STAGES[resolvedStageIndex]?.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.summary || "Your custom native mobile application build is progressing through our automated pipeline and senior engineering review."}
                </p>

                {milestones.length > 0 ? (
                  <div className="mt-4 rounded-2xl border border-border/80 bg-background/50 p-4">
                    <p className="text-xs font-semibold text-nv">NEXT MILESTONE TARGET</p>
                    <p className="font-display mt-1 text-base font-semibold">{milestones[0]?.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{milestones[0]?.detail}</p>
                    {milestones[0]?.due_date ? (
                      <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                        Target Date: {milestones[0].due_date}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("requirements")} className="rounded-full text-xs">
                    <FileText className="mr-1.5 h-3.5 w-3.5" /> Submit Requirements
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("enhancements")} className="rounded-full text-xs">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Request Feature
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("issues")} className="rounded-full text-xs">
                    <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Raise Ticket
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("delivery")} className="rounded-full text-xs">
                    <Download className="mr-1.5 h-3.5 w-3.5" /> Check Deliverables
                  </Button>
                </div>
              </div>

              {/* Recent Notifications Widget */}
              <div className="glass rounded-3xl border border-border p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-base font-semibold flex items-center gap-2">
                      <Bell className="h-4 w-4 text-nv" /> Activity Feed
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("notifications")} className="text-xs text-muted-foreground">
                      View all
                    </Button>
                  </div>

                  {notifications.slice(0, 4).length === 0 ? (
                    <p className="text-xs text-muted-foreground py-6 text-center">No notifications yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {notifications.slice(0, 4).map((n) => (
                        <li key={n.id} className="text-xs border-b border-border/40 pb-2.5 last:border-0">
                          <p className="font-medium text-foreground flex items-center gap-1.5">
                            {!n.read ? <span className="h-1.5 w-1.5 rounded-full bg-nv" /> : null}
                            {n.title}
                          </p>
                          {n.description ? (
                            <p className="text-muted-foreground text-[11px] line-clamp-1 mt-0.5">{n.description}</p>
                          ) : null}
                          <p className="font-mono text-[10px] text-muted-foreground/70 mt-1">
                            {new Date(n.created_at).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Support Lead</span>
                  <a href={mailtoHref} className="text-nv hover:underline">
                    {siteConfig.supportEmail}
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 2: LIFECYCLE & MILESTONES */}
          {/* ============================================================ */}
          <TabsContent value="project" className="mt-6 space-y-6">
            {/* Visual Lifecycle Pipeline */}
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold">Project Lifecycle Pipeline</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Authoritative delivery stages governed by our automated verification state machine.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {LIFECYCLE_STAGES.map((stage, idx) => {
                  const isCurrent = stage.key === currentStatus;
                  const isPassed = idx < resolvedStageIndex;

                  return (
                    <div
                      key={stage.key}
                      className={cn(
                        "rounded-2xl border p-3.5 flex flex-col justify-between transition-all",
                        isCurrent
                          ? "border-nv bg-nv/10 shadow-[0_0_20px_rgba(118,185,0,0.15)]"
                          : isPassed
                            ? "border-nv/40 bg-card/60"
                            : "border-border/60 bg-muted/20 opacity-50",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-muted-foreground">0{idx + 1}</span>
                        {isPassed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-nv" />
                        ) : isCurrent ? (
                          <Radio className="h-3.5 w-3.5 text-nv animate-pulse" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="mt-3">
                        <p className={cn("font-display text-xs font-semibold", isCurrent ? "text-nv" : "text-foreground")}>
                          {stage.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestones Timeline */}
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Sprint Milestones</h3>
                  <p className="text-xs text-muted-foreground">Chronological deliverables and QA verification gates.</p>
                </div>
              </div>

              {milestones.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <Clock className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium">Sprint timeline is being drafted</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    Your dedicated project manager will publish the granular sprint checkpoints once discovery is signed off.
                  </p>
                </div>
              ) : (
                <ol className="relative ml-3 border-l border-border/80 pl-6 space-y-6">
                  {milestones.map((m) => (
                    <li key={m.id} className="relative group">
                      <span
                        className={cn(
                          "absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border bg-card",
                          m.status === "done" || m.status === "completed"
                            ? "border-nv text-nv"
                            : "border-border text-muted-foreground",
                        )}
                      >
                        {m.status === "done" || m.status === "completed" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Circle className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors group-hover:border-border">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold">{m.title}</p>
                          <Badge variant="outline" className={cn("capitalize text-[10.5px] rounded-full", statusColor(m.status))}>
                            {m.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                        {m.detail ? <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p> : null}
                        {m.due_date ? (
                          <p className="mt-2 font-mono text-[11px] text-muted-foreground/80">
                            Target Delivery: {m.due_date}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 3: REQUIREMENTS */}
          {/* ============================================================ */}
          <TabsContent value="requirements" className="mt-6 space-y-6">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Project Requirements & Briefs</h3>
                  <p className="text-xs text-muted-foreground">
                    Versioned requirements submitted by your team and approved by Athros engineers.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setReqModalOpen(true)}
                  className="rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> New Requirement Brief
                </Button>
              </div>

              {requirements.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium">No requirements submitted yet</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    Upload your project specifications, user stories, or API documentation for engineering sign-off.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requirements.map((req) => (
                    <article
                      key={req.id}
                      className="rounded-2xl border border-border/80 bg-card/40 p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-nv/15 px-2 py-0.5 font-mono text-xs font-bold text-nv">
                            v{req.version}
                          </span>
                          <h4 className="font-display text-base font-semibold">{req.title}</h4>
                        </div>
                        <Badge className={cn("rounded-full text-xs capitalize", statusColor(req.approval_status))}>
                          {req.approval_status.replace(/_/g, " ")}
                        </Badge>
                      </div>

                      {req.body ? (
                        <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {req.body}
                        </p>
                      ) : null}

                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3 text-[11px] text-muted-foreground">
                        <span>Submitted: {new Date(req.created_at).toLocaleDateString()}</span>
                        {req.reviewed_at ? (
                          <span>Reviewed: {new Date(req.reviewed_at).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-amber-400">Engineering Review Pending</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 4: ENHANCEMENTS */}
          {/* ============================================================ */}
          <TabsContent value="enhancements" className="mt-6 space-y-6">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Scope Enhancements & Feature Requests</h3>
                  <p className="text-xs text-muted-foreground">
                    Request additional capabilities, revisions, or technical integrations during your sprint.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setEnhanceModalOpen(true)}
                  className="rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Request Feature Enhancement
                </Button>
              </div>

              {enhancements.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium">No enhancement requests</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    Have an idea or new feature to explore? Submit an enhancement request to estimate sprint impact.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {enhancements.map((enh) => (
                    <article
                      key={enh.id}
                      className="rounded-2xl border border-border/80 bg-card/40 p-5 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="font-display text-base font-semibold">{enh.title}</h4>
                          <p className="mt-0.5 text-xs text-muted-foreground">{enh.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="rounded-full text-[10.5px] uppercase">
                            Priority: {enh.priority}
                          </Badge>
                          <Badge className={cn("rounded-full text-xs capitalize", statusColor(enh.status))}>
                            {enh.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                      </div>

                      {/* Comment Thread */}
                      <div className="rounded-xl border border-border/40 bg-background/50 p-4 space-y-3">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                          Discussion ({enh.comments.length})
                        </p>
                        {enh.comments.length === 0 ? (
                          <p className="text-xs text-muted-foreground/70">No comments yet. Post below to start the thread.</p>
                        ) : (
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {enh.comments.map((cmt) => (
                              <div key={cmt.id} className="rounded-lg bg-card/70 p-2.5 text-xs border border-border/30">
                                <p className="text-foreground">{cmt.body}</p>
                                <p className="font-mono text-[10px] text-muted-foreground/70 mt-1">
                                  {new Date(cmt.created_at).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 pt-1">
                          <Input
                            placeholder="Add a comment or question..."
                            value={commentInputs[enh.id] ?? ""}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({ ...prev, [enh.id]: e.target.value }))
                            }
                            className="h-8 text-xs bg-background"
                          />
                          <Button
                            size="sm"
                            disabled={!commentInputs[enh.id]?.trim() || enhanceCommentMutation.isPending}
                            onClick={() =>
                              enhanceCommentMutation.mutate({
                                enhancementId: enh.id,
                                body: commentInputs[enh.id]!.trim(),
                              })
                            }
                            className="h-8 rounded-lg text-xs"
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 5: ISSUES */}
          {/* ============================================================ */}
          <TabsContent value="issues" className="mt-6 space-y-6">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Issue Tracker & QA Tickets</h3>
                  <p className="text-xs text-muted-foreground">
                    Report defects, regressions, or behavior inquiries directly to the engineering team.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setIssueModalOpen(true)}
                  className="rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Report Issue
                </Button>
              </div>

              {issues.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-nv mb-2" />
                  <p className="text-sm font-medium">Clean build · Zero open issues</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    No defects reported. If you encounter an anomaly on your test device, report it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.map((iss) => (
                    <article
                      key={iss.id}
                      className="rounded-2xl border border-border/80 bg-card/40 p-5 space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-nv">#{iss.issue_number}</span>
                            <h4 className="font-display text-base font-semibold">{iss.title}</h4>
                          </div>
                          {iss.detail ? <p className="mt-1 text-xs text-muted-foreground">{iss.detail}</p> : null}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="rounded-full text-[10.5px] uppercase">
                            {iss.severity}
                          </Badge>
                          <Badge className={cn("rounded-full text-xs capitalize", statusColor(iss.status))}>
                            {iss.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                      </div>

                      {/* Issue Replies */}
                      <div className="rounded-xl border border-border/40 bg-background/50 p-4 space-y-3">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                          Engineering Activity & Replies ({iss.replies.length})
                        </p>
                        {iss.replies.length === 0 ? (
                          <p className="text-xs text-muted-foreground/70">Awaiting engineering triage.</p>
                        ) : (
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {iss.replies.map((rep) => (
                              <div key={rep.id} className="rounded-lg bg-card/70 p-2.5 text-xs border border-border/30">
                                <p className="text-foreground">{rep.body}</p>
                                <p className="font-mono text-[10px] text-muted-foreground/70 mt-1">
                                  {new Date(rep.created_at).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 pt-1">
                          <Input
                            placeholder="Reply or provide more test context..."
                            value={replyInputs[iss.id] ?? ""}
                            onChange={(e) =>
                              setReplyInputs((prev) => ({ ...prev, [iss.id]: e.target.value }))
                            }
                            className="h-8 text-xs bg-background"
                          />
                          <Button
                            size="sm"
                            disabled={!replyInputs[iss.id]?.trim() || issueReplyMutation.isPending}
                            onClick={() =>
                              issueReplyMutation.mutate({
                                issueId: iss.id,
                                body: replyInputs[iss.id]!.trim(),
                              })
                            }
                            className="h-8 rounded-lg text-xs"
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 6: PAYMENTS & INVOICES */}
          {/* ============================================================ */}
          <TabsContent value="payments" className="mt-6 space-y-6">
            {/* Financial Overview */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Total Project Value
                </p>
                <p className="font-display mt-2 text-2xl font-bold">
                  {financials.currency} {(financials.totalAmount / 100).toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Agreed regional contract pricing</p>
              </div>

              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Token Deposit Paid (20%)
                </p>
                <p className="font-display mt-2 text-2xl font-bold text-nv">
                  {financials.currency} {(financials.tokenPaid / 100).toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Captured & verified via Razorpay</p>
              </div>

              <div className="glass rounded-2xl border border-border p-5">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  Remaining Balance (80%)
                </p>
                <p className="font-display mt-2 text-2xl font-bold">
                  {financials.currency} {(financials.remainingBalance / 100).toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Payable upon final milestone sign-off</p>
              </div>
            </div>

            {/* Invoices List */}
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold mb-4">Official Tax Invoices & Receipts</h3>
              {invoices.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4">No formal invoices generated yet. Token receipt recorded.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border/80 text-muted-foreground">
                        <th className="pb-3 font-medium">Invoice #</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium text-right">PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {invoices.map((inv) => (
                        <tr key={inv.id}>
                          <td className="py-3 font-mono font-semibold">{inv.invoice_number}</td>
                          <td className="py-3 text-muted-foreground">{new Date(inv.created_at).toLocaleDateString()}</td>
                          <td className="py-3 font-medium">{inv.currency} {(inv.amount_cents / 100).toLocaleString()}</td>
                          <td className="py-3">
                            <Badge className={cn("capitalize text-[10px] rounded-full", statusColor(inv.status))}>
                              {inv.status}
                            </Badge>
                          </td>
                          <td className="py-3 text-right">
                            {inv.pdf_url ? (
                              <Button asChild size="sm" variant="ghost" className="h-7 text-xs">
                                <a href={inv.pdf_url} target="_blank" rel="noreferrer">
                                  <Download className="h-3 w-3 mr-1" /> PDF
                                </a>
                              </Button>
                            ) : (
                              <span className="text-muted-foreground/60">Processing</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 7: MEETINGS */}
          {/* ============================================================ */}
          <TabsContent value="meetings" className="mt-6 space-y-6">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold">Scheduled Architecture & Sprint Calls</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Direct sync sessions with your lead native engineers and product designers.
              </p>

              {meetings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground mt-6">
                  <Calendar className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium">No upcoming meetings scheduled</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    Sprint review calls will appear here with calendar invitations and video links.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {meetings.map((m) => (
                    <article key={m.id} className="rounded-2xl border border-border/80 bg-card/40 p-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="font-display text-base font-semibold">{m.title}</h4>
                        {m.agenda ? <p className="text-xs text-muted-foreground mt-0.5">{m.agenda}</p> : null}
                        <div className="flex flex-wrap items-center gap-3 mt-2 font-mono text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-nv" /> {new Date(m.scheduled_at).toLocaleString()}
                          </span>
                          <span>Duration: {m.duration_minutes} mins</span>
                        </div>
                      </div>

                      {m.meeting_link ? (
                        <Button asChild size="sm" className="rounded-full bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs">
                          <a href={m.meeting_link} target="_blank" rel="noreferrer">
                            <Video className="mr-1.5 h-3.5 w-3.5" /> Join Video Call
                          </a>
                        </Button>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 8: NOTIFICATIONS */}
          {/* ============================================================ */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Notification Center</h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time alerts on milestone completions, build uploads, and issue triage.
                  </p>
                </div>
                {unreadNotifications.length > 0 ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => notificationReadMutation.mutate({ markAll: true })}
                    className="rounded-full text-xs"
                  >
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Mark All as Read
                  </Button>
                ) : null}
              </div>

              {notifications.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <Bell className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium">Inbox is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-border/40">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        "py-4 flex items-start justify-between gap-4 transition-colors",
                        !n.read ? "bg-nv/5 -mx-4 px-4 rounded-xl" : "",
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {!n.read ? <span className="h-2 w-2 rounded-full bg-nv" /> : null}
                          <p className="text-sm font-semibold">{n.title}</p>
                        </div>
                        {n.description ? <p className="text-xs text-muted-foreground">{n.description}</p> : null}
                        <p className="font-mono text-[10px] text-muted-foreground/70">
                          {new Date(n.created_at).toLocaleString()}
                        </p>
                      </div>

                      {!n.read ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => notificationReadMutation.mutate({ notificationId: n.id })}
                          className="text-xs h-7"
                        >
                          Mark read
                        </Button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 9: DELIVERABLES (SECURITY CRITICAL) */}
          {/* ============================================================ */}
          <TabsContent value="delivery" className="mt-6 space-y-6">
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Production Deliverables & Builds</h3>
                  <p className="text-xs text-muted-foreground">
                    Source repositories, APK/IPA signed binaries, and architectural documentation.
                  </p>
                </div>
              </div>

              {deliveries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <Lock className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm font-medium">Deliverables are currently locked</p>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
                    Your final repository, source code, and release artifacts will become available once the project reaches authorized completion state.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {deliveries.map((del) => (
                    <article
                      key={del.id}
                      className={cn(
                        "rounded-2xl border p-5 flex flex-col justify-between transition-all",
                        del.unlocked ? "border-nv/40 bg-card/60" : "border-border/80 bg-background/50",
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs uppercase text-muted-foreground">{del.kind}</span>
                          <Badge
                            className={cn(
                              "rounded-full text-[10px] uppercase font-semibold",
                              del.unlocked ? "bg-nv/20 text-nv border-nv/40" : "bg-muted text-muted-foreground",
                            )}
                          >
                            {del.unlocked ? "Unlocked" : "Locked"}
                          </Badge>
                        </div>
                        <h4 className="font-display text-base font-semibold mt-2">{del.label}</h4>
                        {del.version ? (
                          <p className="font-mono text-xs text-muted-foreground mt-0.5">Version {del.version}</p>
                        ) : null}
                      </div>

                      <div className="mt-5 pt-3 border-t border-border/40">
                        {del.unlocked ? (
                          <div className="space-y-2">
                            {del.download_url ? (
                              <Button asChild size="sm" className="w-full rounded-xl bg-nv text-slate-950 font-semibold hover:bg-nv/90 text-xs">
                                <a href={del.download_url} target="_blank" rel="noreferrer">
                                  <Download className="mr-1.5 h-3.5 w-3.5" /> Download Binary
                                </a>
                              </Button>
                            ) : null}
                            {del.github_url ? (
                              <Button asChild size="sm" variant="outline" className="w-full rounded-xl text-xs">
                                <a href={del.github_url} target="_blank" rel="noreferrer">
                                  <Github className="mr-1.5 h-3.5 w-3.5" /> View GitHub Repository
                                </a>
                              </Button>
                            ) : null}
                            {del.documentation_url ? (
                              <Button asChild size="sm" variant="ghost" className="w-full text-xs">
                                <a href={del.documentation_url} target="_blank" rel="noreferrer">
                                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Technical Documentation
                                </a>
                              </Button>
                            ) : null}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Lock className="h-4 w-4 text-muted-foreground/70" />
                            <span>Locked — Available after authorized sprint completion</span>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============================================================ */}
          {/* TAB 10: ACCOUNT & SECURITY */}
          {/* ============================================================ */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Profile Information */}
              <div className="glass rounded-3xl border border-border p-6 sm:p-8 space-y-4">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-nv" /> Profile Information
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    profileMutation.mutate({
                      fullName: profileName.trim(),
                      company: profileCompany.trim(),
                      phone: profilePhone.trim(),
                    });
                  }}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <Label className="text-xs">Full Name</Label>
                    <Input
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="text-xs bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Company</Label>
                    <Input
                      value={profileCompany}
                      onChange={(e) => setProfileCompany(e.target.value)}
                      className="text-xs bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Phone Number</Label>
                    <Input
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="text-xs bg-background"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={profileMutation.isPending}
                    size="sm"
                    className="rounded-xl text-xs mt-2"
                  >
                    {profileMutation.isPending ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
                    Save Profile
                  </Button>
                </form>
              </div>

              {/* Password & Security Policy */}
              <div className="glass rounded-3xl border border-border p-6 sm:p-8 space-y-4">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-nv" /> Update Password
                </h3>
                <p className="text-xs text-muted-foreground">
                  Passwords require at least 8 characters including uppercase, lowercase, numbers, and special symbols. Reusing recent passwords is restricted.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newPassword !== confirmPassword) {
                      toast.error("Passwords do not match");
                      return;
                    }
                    passwordMutation.mutate(newPassword);
                  }}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <Label className="text-xs">New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      minLength={8}
                      className="text-xs bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Confirm Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={8}
                      className="text-xs bg-background"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={passwordMutation.isPending || !newPassword}
                    size="sm"
                    className="rounded-xl text-xs mt-2"
                  >
                    {passwordMutation.isPending ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
                    Update Password
                  </Button>
                </form>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="glass rounded-3xl border border-border p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold mb-1 flex items-center gap-2">
                <Laptop className="h-4 w-4 text-nv" /> Active Devices & Sessions
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Manage recognized devices authenticated to your Athros workspace.
              </p>

              {sessions.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2">No active sessions tracked.</p>
              ) : (
                <div className="space-y-3">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="rounded-2xl border border-border/80 bg-card/40 p-4 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {sess.browser ?? "Web Browser"} on {sess.os ?? "Device"}
                        </p>
                        <p className="font-mono text-[10.5px] text-muted-foreground mt-0.5">
                          IP: {String(sess.ip ?? "Unknown")} · First seen: {new Date(sess.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {sess.revoked ? (
                        <Badge variant="outline" className="text-destructive border-destructive/40 text-[10px]">
                          Revoked
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={sessionRevokeMutation.isPending}
                          onClick={() => sessionRevokeMutation.mutate(sess.id)}
                          className="h-7 text-xs text-destructive hover:bg-destructive/10"
                        >
                          Revoke Session
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* ============================================================ */}
      {/* DIALOG MODALS */}
      {/* ============================================================ */}

      {/* 1. Submit Requirement Modal */}
      <Dialog open={reqModalOpen} onOpenChange={setReqModalOpen}>
        <DialogContent className="glass sm:max-w-lg border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">Submit Requirement Document</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Provide your specification or brief. Monotonically versioned and audited.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!project) return;
              reqMutation.mutate({
                projectId: project.id,
                title: reqTitle.trim(),
                body: reqBody.trim(),
              });
            }}
            className="space-y-4 mt-2"
          >
            <div className="space-y-1">
              <Label className="text-xs">Requirement Title</Label>
              <Input
                placeholder="e.g. Biometric Authentication & KYC Flow"
                value={reqTitle}
                onChange={(e) => setReqTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Specification & Details</Label>
              <Textarea
                rows={5}
                placeholder="Detail the expected behavior, API contracts, screen flows, or acceptance criteria..."
                value={reqBody}
                onChange={(e) => setReqBody(e.target.value)}
                className="text-xs resize-none"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setReqModalOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" disabled={reqMutation.isPending || !reqTitle.trim()} className="text-xs bg-nv text-slate-950 font-semibold hover:bg-nv/90">
                {reqMutation.isPending ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
                Submit Requirement
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Request Enhancement Modal */}
      <Dialog open={enhanceModalOpen} onOpenChange={setEnhanceModalOpen}>
        <DialogContent className="glass sm:max-w-lg border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">Request Feature Enhancement</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Propose a new feature or scope addition to your native app build.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!project) return;
              enhanceMutation.mutate({
                projectId: project.id,
                title: enhanceTitle.trim(),
                description: enhanceDesc.trim(),
                priority: enhancePriority,
              });
            }}
            className="space-y-4 mt-2"
          >
            <div className="space-y-1">
              <Label className="text-xs">Feature Title</Label>
              <Input
                placeholder="e.g. Apple Watch Companion App"
                value={enhanceTitle}
                onChange={(e) => setEnhanceTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Priority</Label>
              <Select value={enhancePriority} onValueChange={(val: any) => setEnhancePriority(val)}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description & Scope</Label>
              <Textarea
                rows={4}
                placeholder="Explain the proposed feature, target audience, and any third-party APIs involved..."
                value={enhanceDesc}
                onChange={(e) => setEnhanceDesc(e.target.value)}
                className="text-xs resize-none"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setEnhanceModalOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" disabled={enhanceMutation.isPending || !enhanceTitle.trim()} className="text-xs bg-nv text-slate-950 font-semibold hover:bg-nv/90">
                {enhanceMutation.isPending ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
                Submit Enhancement
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. Report Issue Modal */}
      <Dialog open={issueModalOpen} onOpenChange={setIssueModalOpen}>
        <DialogContent className="glass sm:max-w-lg border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">Report Anomaly or Bug</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Directly file a defect report to our test bench and lead developers.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!project) return;
              issueMutation.mutate({
                projectId: project.id,
                title: issueTitle.trim(),
                detail: issueDetail.trim(),
                severity: issueSeverity,
              });
            }}
            className="space-y-4 mt-2"
          >
            <div className="space-y-1">
              <Label className="text-xs">Issue Summary</Label>
              <Input
                placeholder="e.g. Crash on launch with Android 14 test build"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Severity</Label>
              <Select value={issueSeverity} onValueChange={(val: any) => setIssueSeverity(val)}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Cosmetic / Typo)</SelectItem>
                  <SelectItem value="medium">Medium (Non-blocking bug)</SelectItem>
                  <SelectItem value="high">High (Major feature broken)</SelectItem>
                  <SelectItem value="critical">Critical (Crash / Data blocker)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Steps to Reproduce & Expected Behavior</Label>
              <Textarea
                rows={4}
                placeholder="1. Open app&#10;2. Tap login button&#10;3. Observe crash dialog..."
                value={issueDetail}
                onChange={(e) => setIssueDetail(e.target.value)}
                className="text-xs resize-none"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIssueModalOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" disabled={issueMutation.isPending || !issueTitle.trim()} className="text-xs bg-nv text-slate-950 font-semibold hover:bg-nv/90">
                {issueMutation.isPending ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
                File Issue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
