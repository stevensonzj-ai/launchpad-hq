import { Resend } from "resend";
import {
  createModerationToken,
  type ModerationKind,
} from "@/lib/moderation-token";

/**
 * Email helpers wrapping the Resend SDK.
 *
 * The client is created lazily so importing this module never throws at
 * build time when RESEND_API_KEY is absent — callers wrap sends in
 * try/catch (a failed email must never fail the user-facing request).
 */

// Sender must belong to a domain verified in the Resend dashboard. If the
// verified sender differs, change it here — it's deliberately a constant,
// not config, until a second sender exists.
const FROM_ADDRESS = "LaunchpadHQ <notifications@launchpadhq.io>";

let resendClient: Resend | null = null;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = FROM_ADDRESS,
}: SendEmailInput) {
  const { data, error } = await getResend().emails.send({
    from,
    to,
    subject,
    html,
    text,
  });
  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
  return data;
}

export type ModerationSubmission = {
  kind: ModerationKind;
  /** Database id of the pending row. */
  id: string;
  /** Prompts and discussions have titles; replies don't. */
  title?: string;
  /** Body/content of the submission — truncated for the email preview. */
  content: string;
  platformName?: string;
  author?: string;
};

const KIND_LABEL: Record<ModerationKind, string> = {
  prompt: "Prompt",
  discussion: "Discussion",
  reply: "Discussion reply",
};

const PREVIEW_LENGTH = 300;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

/**
 * Notify the moderator of a new PENDING submission with one-click signed
 * approve/reject links. `baseUrl` is the request origin (same fallback chain
 * the Stripe routes use) so links point at the deployment that took the
 * submission.
 */
export async function sendModerationNotification(
  submission: ModerationSubmission,
  baseUrl: string,
) {
  const to = process.env.MODERATION_NOTIFICATION_EMAIL;
  if (!to) {
    throw new Error(
      "MODERATION_NOTIFICATION_EMAIL environment variable is not set",
    );
  }

  const { kind, id, title, content, platformName, author } = submission;
  const approveUrl = `${baseUrl}/api/moderation?token=${createModerationToken(kind, id, "approve")}`;
  const rejectUrl = `${baseUrl}/api/moderation?token=${createModerationToken(kind, id, "reject")}`;

  const label = KIND_LABEL[kind];
  const preview = truncate(content, PREVIEW_LENGTH);
  const subject = `[LaunchpadHQ] Pending ${label.toLowerCase()}${title ? `: ${truncate(title, 80)}` : ""}`;

  const metaLines = [
    `Type: ${label}`,
    platformName ? `Platform: ${platformName}` : null,
    author ? `Submitted by: ${author}` : null,
    title ? `Title: ${title}` : null,
  ].filter((line): line is string => line !== null);

  const html = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="margin:0 0 12px">New ${escapeHtml(label.toLowerCase())} awaiting review</h2>
      <p style="margin:0 0 16px;color:#555">
        ${metaLines.map(escapeHtml).join("<br />")}
      </p>
      <blockquote style="margin:0 0 20px;padding:12px;border-left:3px solid #f97316;background:#f7f7f7;white-space:pre-wrap">${escapeHtml(preview)}</blockquote>
      <p>
        <a href="${approveUrl}" style="display:inline-block;padding:10px 18px;background:#16a34a;color:#fff;text-decoration:none;border-radius:6px;margin-right:12px">Approve</a>
        <a href="${rejectUrl}" style="display:inline-block;padding:10px 18px;background:#dc2626;color:#fff;text-decoration:none;border-radius:6px">Reject</a>
      </p>
      <p style="color:#888;font-size:12px">Links expire in 24 hours. If the submission was already reviewed, clicking again is harmless.</p>
    </div>
  `;

  const text = [
    `New ${label.toLowerCase()} awaiting review`,
    "",
    ...metaLines,
    "",
    preview,
    "",
    `Approve: ${approveUrl}`,
    `Reject: ${rejectUrl}`,
    "",
    "Links expire in 24 hours.",
  ].join("\n");

  return sendEmail({ to, subject, html, text });
}
