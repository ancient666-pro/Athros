import { z } from "zod";

/** Transactional email catalogue. Client-safe: names + payload contracts only. */
export const EMAIL_TEMPLATES = {
  "account.invite": z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    tempPassword: z.string().min(8),
    loginUrl: z.string().url(),
  }),
  "account.password-reset": z.object({
    fullName: z.string().min(1).optional(),
    resetUrl: z.string().url(),
    expiresInMinutes: z.number().int().positive(),
  }),
  "account.locked": z.object({
    fullName: z.string().min(1).optional(),
    unlockMinutes: z.number().int().positive(),
  }),
  "project.status": z.object({
    projectName: z.string().min(1),
    status: z.string().min(1),
    progress: z.number().int().min(0).max(100),
    projectUrl: z.string().url(),
  }),
  "project.milestone": z.object({
    projectName: z.string().min(1),
    milestone: z.string().min(1),
    projectUrl: z.string().url(),
  }),
  "delivery.ready": z.object({
    projectName: z.string().min(1),
    label: z.string().min(1),
    projectUrl: z.string().url(),
  }),
  "payment.receipt": z.object({
    projectName: z.string().min(1).optional(),
    amount: z.string().min(1),
    invoiceNumber: z.string().min(1),
    invoiceUrl: z.string().url().optional(),
  }),
  "meeting.scheduled": z.object({
    projectName: z.string().min(1),
    title: z.string().min(1),
    scheduledAt: z.string().min(1),
    meetingLink: z.string().url().optional(),
  }),
  "lead.received": z.object({
    fullName: z.string().min(1),
    company: z.string().optional(),
    email: z.string().email(),
  }),
  "booking.confirmation": z.object({
    bookingNumber: z.string().min(1),
    customerName: z.string().min(1).optional(),
    packageName: z.string().min(1),
    tokenAmount: z.string().min(1),
    remainingBalance: z.string().optional(),
    totalAmount: z.string().optional(),
    expectedNextStep: z.string().optional(),
    dashboardUrl: z.string().url().optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
  }),
  "booking.admin-notification": z.object({
    bookingNumber: z.string().min(1),
    customerName: z.string().min(1),
    customerEmail: z.string().email(),
    customerPhone: z.string().optional(),
    company: z.string().optional(),
    packageName: z.string().min(1),
    region: z.string().optional(),
    totalPrice: z.string().optional(),
    tokenAmount: z.string().optional(),
    amount: z.string().min(1),
    currency: z.string().optional(),
    razorpayOrderId: z.string().optional(),
    razorpayPaymentId: z.string().optional(),
    paymentId: z.string().min(1),
    paymentStatus: z.string().optional(),
    projectId: z.string().uuid(),
    timestamp: z.string().optional(),
  }),
} as const;

export type EmailTemplate = keyof typeof EMAIL_TEMPLATES;

export type EmailPayload<T extends EmailTemplate> = z.infer<(typeof EMAIL_TEMPLATES)[T]>;

export const SUBJECTS: Record<EmailTemplate, string> = {
  "account.invite": "Your Athros client portal is ready",
  "account.password-reset": "Reset your Athros password",
  "account.locked": "Your Athros account was temporarily locked",
  "project.status": "Project update from Athros",
  "project.milestone": "Milestone completed",
  "delivery.ready": "Your build is ready to download",
  "payment.receipt": "Payment receipt",
  "meeting.scheduled": "Your Athros call is scheduled",
  "lead.received": "We received your project brief",
  "booking.confirmation": "Your Athros project booking is confirmed",
  "booking.admin-notification": "New Athros Project Booking — Token Payment Received",
};
