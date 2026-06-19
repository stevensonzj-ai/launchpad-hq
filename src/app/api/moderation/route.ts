import { NextRequest } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { ModerationStatus } from "@prisma/client";
import {
  verifyModerationToken,
  type ModerationKind,
  type ModerationTokenPayload,
} from "@/lib/moderation-token";

/**
 * One-click moderation actions from the notification email.
 *
 * Deliberately unauthenticated: the signed token in the query string is the
 * only auth (the moderator clicks from their inbox, not a logged-in
 * session). Forgery is prevented by the HMAC signature; staleness by the
 * 24h expiry inside the signed payload; replay by the idempotency check —
 * a submission that's no longer PENDING gets a plain confirmation page and
 * no write.
 *
 * Destructive actions never happen on GET. Mail-security scanners and link
 * prefetchers (Gmail/Workspace included) follow emailed links with GET
 * requests, which would trigger approve/reject before a human ever clicked.
 * So GET only validates the token and renders a confirmation page with a
 * form; the mutation happens on the POST that the button submits. POST
 * re-validates the token from scratch — it never trusts that GET already
 * checked it.
 */

export const dynamic = "force-dynamic";

function page(
  title: string,
  message: string,
  status: number,
  bodyHtml = "",
): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${title} — LaunchpadHQ moderation</title>
  </head>
  <body style="font-family:sans-serif;background:#0a0a0f;color:#e5e5e5;display:flex;justify-content:center;padding:80px 16px 0">
    <div style="max-width:480px;text-align:center">
      <h1 style="font-size:20px;color:#fff">${title}</h1>
      <p style="color:#a3a3a3">${message}</p>
      ${bodyHtml}
    </div>
  </body>
</html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

// Lowercase, human-readable label per kind — matches the phrasing the final
// confirmation page already used ("The discussion reply is now …").
const KIND_LABEL: Record<ModerationKind, string> = {
  prompt: "prompt",
  discussion: "discussion",
  reply: "discussion reply",
};

const PREVIEW_LENGTH = 300;

// The confirm page injects user-submitted text (title + body preview), so it
// must be escaped. email.ts has equivalents but doesn't export them.
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

type SubmissionInfo = {
  status: ModerationStatus;
  /** Prompts and discussions have titles; replies don't. */
  title: string | null;
  /** Body/prompt text used for the confirm-page preview. */
  content: string | null;
};

async function readSubmission(
  kind: ModerationKind,
  id: string,
): Promise<SubmissionInfo | null> {
  if (kind === "prompt") {
    const row = await prisma.prompt.findUnique({
      where: { id },
      select: { status: true, title: true, promptText: true },
    });
    return row
      ? { status: row.status, title: row.title, content: row.promptText }
      : null;
  }
  if (kind === "discussion") {
    const row = await prisma.discussion.findUnique({
      where: { id },
      select: { status: true, title: true, body: true },
    });
    return row
      ? { status: row.status, title: row.title, content: row.body }
      : null;
  }
  const row = await prisma.discussionReply.findUnique({
    where: { id },
    select: { status: true, body: true },
  });
  return row ? { status: row.status, title: null, content: row.body } : null;
}

async function writeStatus(
  kind: ModerationKind,
  id: string,
  status: ModerationStatus,
): Promise<void> {
  const args = { where: { id }, data: { status } } as const;
  if (kind === "prompt") await prisma.prompt.update(args);
  else if (kind === "discussion") await prisma.discussion.update(args);
  else await prisma.discussionReply.update(args);
}

/**
 * Shared validation for GET and POST: parse the token, verify it
 * (signature + shape + expiry), load the row, and apply the terminal-state
 * gates. Returns either a finished `Response` to send as-is, or — only when
 * the submission is still PENDING — the data both methods need. POST calls
 * this independently of GET, so the token is re-verified on every request.
 */
type Resolution =
  | { state: "terminal"; response: Response }
  | {
      state: "pending";
      token: string;
      payload: ModerationTokenPayload;
      submission: SubmissionInfo;
    };

async function resolve(request: NextRequest): Promise<Resolution> {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return {
      state: "terminal",
      response: page(
        "Invalid link",
        "This moderation link is missing its token.",
        400,
      ),
    };
  }

  const result = verifyModerationToken(token);
  if (!result.ok) {
    return {
      state: "terminal",
      response:
        result.reason === "expired"
          ? page(
              "Link expired",
              "Moderation links expire after 24 hours. Review this submission in Prisma Studio instead.",
              410,
            )
          : page(
              "Invalid link",
              "This moderation link could not be verified.",
              400,
            ),
    };
  }

  const { kind, id } = result.payload;

  // Idempotency: read before write. A second click (or a re-used link within
  // its TTL) finds the row already reviewed and changes nothing.
  const submission = await readSubmission(kind, id);
  if (submission === null) {
    return {
      state: "terminal",
      response: page(
        "Not found",
        "This submission no longer exists — it may have been deleted.",
        404,
      ),
    };
  }
  if (submission.status !== ModerationStatus.PENDING) {
    return {
      state: "terminal",
      response: page(
        "Already reviewed",
        `This submission was already ${submission.status.toLowerCase()}. No changes were made.`,
        200,
      ),
    };
  }

  return { state: "pending", token, payload: result.payload, submission };
}

/**
 * The interstitial: shows what will happen and to what, with a button that
 * POSTs back to this route (token on the POST target's query string, so POST
 * reads it exactly as GET does). The action doesn't run until the button is
 * clicked — a link fetch alone never mutates.
 */
function confirmPage(
  token: string,
  payload: ModerationTokenPayload,
  submission: SubmissionInfo,
): Response {
  const { kind, action } = payload;
  const label = KIND_LABEL[kind];
  const verb = action === "approve" ? "Approve" : "Reject";
  const buttonColor = action === "approve" ? "#16a34a" : "#dc2626";
  const preview = submission.content
    ? truncate(submission.content, PREVIEW_LENGTH)
    : "";
  const formAction = `/api/moderation?token=${encodeURIComponent(token)}`;

  const body = `
      ${
        submission.title
          ? `<p style="margin:0 0 12px;color:#fff;font-weight:600">${escapeHtml(submission.title)}</p>`
          : ""
      }
      ${
        preview
          ? `<blockquote style="margin:0 0 24px;padding:12px;border-left:3px solid #f97316;background:#15151c;color:#cfcfcf;text-align:left;white-space:pre-wrap">${escapeHtml(preview)}</blockquote>`
          : ""
      }
      <form method="POST" action="${formAction}">
        <button type="submit" style="display:inline-block;padding:12px 24px;background:${buttonColor};color:#fff;border:none;border-radius:6px;font-size:15px;cursor:pointer">${verb} this ${label}</button>
      </form>
      <p style="margin-top:20px;color:#666;font-size:12px">Nothing changes until you click the button above. This link expires 24 hours after it was sent.</p>`;

  return page(
    `${verb} this ${label}?`,
    "Review the submission below, then confirm.",
    200,
    body,
  );
}

export async function GET(request: NextRequest) {
  try {
    const resolution = await resolve(request);
    if (resolution.state === "terminal") {
      return resolution.response;
    }
    // PENDING: render the confirmation interstitial — no mutation on GET.
    return confirmPage(
      resolution.token,
      resolution.payload,
      resolution.submission,
    );
  } catch (error) {
    Sentry.captureException(error);
    return page(
      "Something went wrong",
      "The moderation action could not be completed. The error has been logged.",
      500,
    );
  } finally {
    // Serverless: make sure captured events leave the process before it
    // freezes.
    await Sentry.flush(2000);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Re-validate from scratch — never trust that GET already checked the
    // token. resolve() re-verifies signature + expiry + shape and re-applies
    // the read-before-write idempotency gate.
    const resolution = await resolve(request);
    if (resolution.state === "terminal") {
      return resolution.response;
    }

    const { kind, id, action } = resolution.payload;
    const newStatus =
      action === "approve"
        ? ModerationStatus.APPROVED
        : ModerationStatus.REJECTED;
    await writeStatus(kind, id, newStatus);

    return page(
      action === "approve" ? "Approved" : "Rejected",
      `The ${KIND_LABEL[kind]} is now ${newStatus.toLowerCase()}.`,
      200,
    );
  } catch (error) {
    Sentry.captureException(error);
    return page(
      "Something went wrong",
      "The moderation action could not be completed. The error has been logged.",
      500,
    );
  } finally {
    // Serverless: make sure captured events leave the process before it
    // freezes.
    await Sentry.flush(2000);
  }
}
