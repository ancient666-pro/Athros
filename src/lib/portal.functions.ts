import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { assertPasswordAcceptable, recordPasswordChange } from "@/lib/security/account-security.server";
import type { Database, Json } from "@/integrations/supabase/types";

const uuid = z.string().uuid();

export interface FinancialSummary {
  totalAmount: number;
  tokenPaid: number;
  remainingBalance: number;
  currency: string;
}

export interface RedactedDelivery {
  id: string;
  project_id: string;
  label: string;
  kind: string;
  version: string | null;
  status: string;
  unlocked: boolean;
  download_url: string | null;
  github_url: string | null;
  apk_url: string | null;
  ipa_url: string | null;
  documentation_url: string | null;
  created_at: string;
  updated_at?: string;
}

export interface PortalData {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  isAdmin: boolean;
  isStaff: boolean;
  project: Database["public"]["Tables"]["projects"]["Row"] | null;
  booking: Database["public"]["Tables"]["project_bookings"]["Row"] | null;
  milestones: Database["public"]["Tables"]["project_milestones"]["Row"][];
  requirements: Database["public"]["Tables"]["requirements"]["Row"][];
  enhancements: (Database["public"]["Tables"]["enhancements"]["Row"] & {
    comments: { id: string; enhancement_id: string; author_id: string; body: string; created_at: string }[];
  })[];
  issues: (Database["public"]["Tables"]["project_issues"]["Row"] & {
    replies: { id: string; issue_id: string; author_id: string; body: string; attachments: Json; created_at: string }[];
  })[];
  payments: any[];
  invoices: Database["public"]["Tables"]["invoices"]["Row"][];
  meetings: Database["public"]["Tables"]["meetings"]["Row"][];
  deliveries: RedactedDelivery[];
  notifications: Database["public"]["Tables"]["notifications"]["Row"][];
  sessions: { id: string; browser: string | null; os: string | null; ip: string | null; country: string | null; created_at: string; last_seen_at: string; revoked: boolean }[];
  financials: FinancialSummary;
}

/** Client-facing Command Center payload: profile, roles, project, and full domain entities. */
export const getMyPortal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PortalData> => {
    const { supabase, userId } = context;

    const [{ data: profile }, { data: roles }, { data: projects }, { data: notifications }, { data: rawSessions }] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userId),
        supabase
          .from("projects")
          .select("*")
          .eq("client_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(30),
        supabase
          .from("user_sessions")
          .select("id, browser, os, ip, country, created_at, last_seen_at, revoked")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

    const sessions: PortalData["sessions"] = (rawSessions ?? []).map((s) => ({
      id: s.id,
      browser: s.browser ?? null,
      os: s.os ?? null,
      ip: s.ip ? String(s.ip) : null,
      country: s.country ?? null,
      created_at: s.created_at,
      last_seen_at: s.last_seen_at,
      revoked: s.revoked,
    }));

    const project = projects?.[0] ?? null;
    const roleList = (roles ?? []).map((r) => String(r.role));
    const isAdmin = roleList.includes("admin") || roleList.includes("super_admin");
    const isStaff =
      isAdmin ||
      roleList.some((r) => ["project_manager", "developer", "support"].includes(r));

    if (!project) {
      return {
        profile,
        isAdmin,
        isStaff,
        project: null,
        booking: null,
        milestones: [],
        requirements: [],
        enhancements: [],
        issues: [],
        payments: [],
        invoices: [],
        meetings: [],
        deliveries: [],
        notifications: notifications ?? [],
        sessions,
        financials: { totalAmount: 0, tokenPaid: 0, remainingBalance: 0, currency: "USD" },
      };
    }

    const [
      { data: rawBooking },
      { data: milestones },
      { data: requirements },
      { data: enhancements },
      { data: enhancementComments },
      { data: issues },
      { data: issueReplies },
      { data: payments },
      { data: projectPayments },
      { data: invoices },
      { data: meetings },
      { data: rawDeliveries },
    ] = await Promise.all([
      supabase
        .from("project_bookings")
        .select("*")
        .eq("project_id", project.id)
        .maybeSingle(),
      supabase
        .from("project_milestones")
        .select("*")
        .eq("project_id", project.id)
        .order("position", { ascending: true }),
      supabase
        .from("requirements")
        .select("*")
        .eq("project_id", project.id)
        .order("version", { ascending: false }),
      supabase
        .from("enhancements")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("enhancement_comments")
        .select("id, enhancement_id, author_id, body, created_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("project_issues")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("issue_replies")
        .select("id, issue_id, author_id, body, attachments, created_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("payments")
        .select("id, project_id, client_id, gateway, order_id, payment_id, currency, amount_cents, is_reservation, invoice_id, status, created_at")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("project_payments")
        .select("*")
        .eq("project_id", project.id)
        .order("due_date", { ascending: true }),
      supabase
        .from("invoices")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("meetings")
        .select("*")
        .eq("project_id", project.id)
        .order("scheduled_at", { ascending: true }),
      supabase
        .from("project_deliveries")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
    ]);

    const booking = (rawBooking ?? null) as Database["public"]["Tables"]["project_bookings"]["Row"] | null;

    // Attach comments to enhancements
    const commentsByEnhancement: Record<string, typeof enhancementComments> = {};
    for (const comment of enhancementComments ?? []) {
      if (!commentsByEnhancement[comment.enhancement_id]) commentsByEnhancement[comment.enhancement_id] = [];
      commentsByEnhancement[comment.enhancement_id]!.push(comment);
    }
    const enhancementsWithComments = (enhancements ?? []).map((e) => ({
      ...e,
      comments: commentsByEnhancement[e.id] ?? [],
    }));

    // Attach replies to issues
    const repliesByIssue: Record<string, typeof issueReplies> = {};
    for (const reply of issueReplies ?? []) {
      if (!repliesByIssue[reply.issue_id]) repliesByIssue[reply.issue_id] = [];
      repliesByIssue[reply.issue_id]!.push(reply);
    }
    const issuesWithReplies = (issues ?? []).map((i) => ({
      ...i,
      replies: repliesByIssue[i.id] ?? [],
    }));

    // Financial calculations
    const currency = booking?.currency || project.currency || "USD";
    const totalAmount = booking?.full_amount ?? 0;
    const tokenPaid = booking?.token_amount ?? 0;
    const remainingBalance = Math.max(0, totalAmount - tokenPaid);

    // SECURITY CRITICAL: Redact delivery artifacts for non-staff if locked or project not complete
    const isProjectComplete = project.status === "completed" || project.status === "live";
    const deliveries: RedactedDelivery[] = (rawDeliveries ?? []).map((delivery) => {
      const isUnlocked = delivery.unlocked === true;
      const allowAccess = isStaff || (isUnlocked && isProjectComplete);

      if (!allowAccess) {
        return {
          id: delivery.id,
          project_id: delivery.project_id,
          label: delivery.label,
          kind: delivery.kind,
          version: delivery.version,
          status: delivery.status ?? "pending",
          unlocked: false,
          created_at: delivery.created_at,
          updated_at: delivery.updated_at,
          // Explicitly omit / redact all sensitive URLs
          download_url: null,
          github_url: null,
          apk_url: null,
          ipa_url: null,
          documentation_url: null,
        };
      }

      return {
        id: delivery.id,
        project_id: delivery.project_id,
        label: delivery.label,
        kind: delivery.kind,
        version: delivery.version,
        status: delivery.status ?? "completed",
        unlocked: true,
        download_url: delivery.download_url ?? null,
        github_url: delivery.github_url ?? null,
        apk_url: delivery.apk_url ?? null,
        ipa_url: delivery.ipa_url ?? null,
        documentation_url: delivery.documentation_url ?? null,
        created_at: delivery.created_at,
        updated_at: delivery.updated_at,
      };
    });

    return {
      profile,
      isAdmin,
      isStaff,
      project,
      booking: booking ?? null,
      milestones: milestones ?? [],
      requirements: requirements ?? [],
      enhancements: enhancementsWithComments,
      issues: issuesWithReplies,
      payments: payments?.length ? payments : (projectPayments ?? []),
      invoices: invoices ?? [],
      meetings: meetings ?? [],
      deliveries,
      notifications: notifications ?? [],
      sessions: (sessions ?? []) as PortalData["sessions"],
      financials: {
        totalAmount,
        tokenPaid,
        remainingBalance,
        currency,
      },
    };
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        fullName: z.string().trim().max(120).optional(),
        company: z.string().trim().max(120).optional(),
        phone: z.string().trim().max(32).optional(),
        timezone: z.string().trim().max(60).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("profiles").upsert({
      id: context.userId,
      full_name: data.fullName ?? null,
      company: data.company ?? null,
      phone: data.phone ?? null,
      timezone: data.timezone ?? null,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Client requirement submission with monotonic versioning. */
export const submitRequirement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: uuid,
        title: z.string().trim().min(2).max(140),
        body: z.string().trim().max(8000).optional(),
        files: z.array(z.record(z.string(), z.unknown())).max(20).default([]),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Get current max version for this project
    const { data: existing } = await supabase
      .from("requirements")
      .select("version")
      .eq("project_id", data.projectId)
      .order("version", { ascending: false })
      .limit(1);

    const nextVersionNumber = (existing?.[0]?.version ?? 0) + 1;

    const { data: inserted, error } = await supabase
      .from("requirements")
      .insert({
        project_id: data.projectId,
        version: nextVersionNumber,
        title: data.title,
        body: data.body || null,
        files: data.files as never,
        approval_status: "submitted",
        created_by: userId,
      })
      .select("id, version")
      .single();

    if (error) throw new Error(error.message);

    // Audit log
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("audit_logs").insert({
      actor_id: userId,
      action: "requirement.submitted",
      entity: "requirements",
      entity_id: inserted.id,
      detail: { projectId: data.projectId, version: inserted.version, title: data.title } as never,
    });

    return { ok: true as const, requirementId: inserted.id, version: inserted.version };
  });

/** Client enhancement request. */
export const requestEnhancement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: uuid,
        title: z.string().trim().min(2).max(140),
        description: z.string().trim().max(5000).optional(),
        priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: inserted, error } = await supabase
      .from("enhancements")
      .insert({
        project_id: data.projectId,
        title: data.title,
        description: data.description || null,
        priority: data.priority,
        status: "requested",
        requested_by: userId,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("audit_logs").insert({
      actor_id: userId,
      action: "enhancement.requested",
      entity: "enhancements",
      entity_id: inserted.id,
      detail: { projectId: data.projectId, title: data.title, priority: data.priority } as never,
    });

    return { ok: true as const, enhancementId: inserted.id };
  });

/** Comment on an enhancement thread. */
export const addEnhancementComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        enhancementId: uuid,
        body: z.string().trim().min(1).max(3000),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: inserted, error } = await supabase
      .from("enhancement_comments")
      .insert({
        enhancement_id: data.enhancementId,
        author_id: userId,
        body: data.body,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return { ok: true as const, commentId: inserted.id };
  });

/** Client issue report. */
export const reportIssue = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: uuid,
        title: z.string().trim().min(2).max(140),
        detail: z.string().trim().max(5000).optional(),
        severity: z.enum(["low", "medium", "high", "critical"]).default("medium"),
        attachments: z.array(z.record(z.string(), z.unknown())).max(10).default([]),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: inserted, error } = await supabase
      .from("project_issues")
      .insert({
        project_id: data.projectId,
        title: data.title,
        detail: data.detail || null,
        severity: data.severity,
        status: "open",
        reported_by: userId,
        attachments: data.attachments as never,
      })
      .select("id, issue_number")
      .single();

    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("audit_logs").insert({
      actor_id: userId,
      action: "issue.reported",
      entity: "project_issues",
      entity_id: inserted.id,
      detail: { projectId: data.projectId, issueNumber: inserted.issue_number, title: data.title } as never,
    });

    return { ok: true as const, issueId: inserted.id, issueNumber: inserted.issue_number };
  });

/** Reply to an issue thread. */
export const replyToIssue = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        issueId: uuid,
        body: z.string().trim().min(1).max(3000),
        attachments: z.array(z.record(z.string(), z.unknown())).max(10).default([]),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: inserted, error } = await supabase
      .from("issue_replies")
      .insert({
        issue_id: data.issueId,
        author_id: userId,
        body: data.body,
        attachments: data.attachments as never,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return { ok: true as const, replyId: inserted.id };
  });

/** Notification read state update. */
export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        notificationId: uuid.optional(),
        markAll: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    if (data.markAll) {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
    } else if (data.notificationId) {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", data.notificationId)
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
    }

    return { ok: true as const };
  });

/** Password change with strength and history checks. */
export const updateClientPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        newPassword: z.string().min(8).max(128),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const acceptable = await assertPasswordAcceptable(userId, data.newPassword);
    if (!acceptable.ok) throw new Error(acceptable.reason ?? "Password does not meet security requirements");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: data.newPassword,
    });
    if (error) throw new Error(error.message);

    await recordPasswordChange(userId, data.newPassword);
    return { ok: true as const };
  });

/** Revoke an active session. */
export const revokeClientSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ sessionId: uuid }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { error } = await supabase
      .from("user_sessions")
      .update({
        revoked: true,
        revoked_at: new Date().toISOString(),
        revoke_reason: "user_revoked",
      })
      .eq("id", data.sessionId)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Admin console payload — RLS only returns these rows for admins. */
export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isStaff } = await supabase.rpc("is_staff", { _user_id: userId });
    if (!isStaff) throw new Error("Forbidden");

    const [{ data: clients }, { data: projects }, { data: deliveries }, { data: payments }, { data: issues }] =
      await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("project_deliveries").select("*").order("created_at", { ascending: false }),
        supabase.from("project_payments").select("*").order("due_date", { ascending: true }),
        supabase.from("project_issues").select("*").order("created_at", { ascending: false }),
      ]);

    return {
      clients: clients ?? [],
      projects: projects ?? [],
      deliveries: deliveries ?? [],
      payments: payments ?? [],
      issues: issues ?? [],
    };
  });

export const upsertProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: uuid.optional(),
        clientId: uuid,
        name: z.string().trim().min(2).max(120),
        summary: z.string().trim().max(600).optional(),
        platforms: z.array(z.string().trim().max(30)).max(8).default([]),
        status: z.string().trim().max(40).default("discovery"),
        progress: z.number().int().min(0).max(100).default(0),
        launchDate: z.string().trim().max(20).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const row = {
      client_id: data.clientId,
      name: data.name,
      summary: data.summary || null,
      platforms: data.platforms,
      status: data.status,
      progress: data.progress,
      launch_date: data.launchDate || null,
      updated_at: new Date().toISOString(),
    };
    const query = data.id
      ? context.supabase.from("projects").update(row).eq("id", data.id)
      : context.supabase.from("projects").insert(row);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const setProjectProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ projectId: uuid, progress: z.number().int().min(0).max(100), status: z.string().trim().max(40).optional() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("projects")
      .update({
        progress: data.progress,
        ...(data.status ? { status: data.status } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.projectId);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const addMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: uuid,
        title: z.string().trim().min(2).max(140),
        detail: z.string().trim().max(600).optional(),
        status: z.string().trim().max(30).default("pending"),
        dueDate: z.string().trim().max(20).optional(),
        position: z.number().int().min(0).max(200).default(0),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("project_milestones").insert({
      project_id: data.projectId,
      title: data.title,
      detail: data.detail || null,
      status: data.status,
      due_date: data.dueDate || null,
      position: data.position,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const setRowStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        table: z.enum(["project_milestones", "project_issues", "project_payments"]),
        id: uuid,
        status: z.string().trim().min(2).max(30),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from(data.table)
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const upsertDelivery = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: uuid,
        label: z.string().trim().min(2).max(120),
        kind: z.string().trim().max(20).default("apk"),
        version: z.string().trim().max(30).optional(),
        downloadUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
        githubUrl: z.string().trim().url().max(300).optional().or(z.literal("")),
        apkUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
        ipaUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
        documentationUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("project_deliveries").insert({
      project_id: data.projectId,
      label: data.label,
      kind: data.kind,
      version: data.version || null,
      download_url: data.downloadUrl || null,
      github_url: data.githubUrl || null,
      apk_url: data.apkUrl || null,
      ipa_url: data.ipaUrl || null,
      documentation_url: data.documentationUrl || null,
      unlocked: false,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const setDeliveryLock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: uuid, unlocked: z.boolean() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("project_deliveries")
      .update({ unlocked: data.unlocked })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
