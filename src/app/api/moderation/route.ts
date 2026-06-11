import { NextRequest } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { ModerationStatus } from "@prisma/client";
import {
  verifyModerationToken,
  type ModerationKind,
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
 */

export const dynamic = "force-dynamic";

function page(title: string, message: string, status: number): Response {
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
    </div>
  </body>
</html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function readStatus(
  kind: ModerationKind,
  id: string,
): Promise<ModerationStatus | null> {
  const args = { where: { id }, select: { status: true } } as const;
  const row =
    kind === "prompt"
      ? await prisma.prompt.findUnique(args)
      : kind === "discussion"
        ? await prisma.discussion.findUnique(args)
        : await prisma.discussionReply.findUnique(args);
  return row?.status ?? null;
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

export async function GET(request: NextRequest) {
  try {
    const token = new URL(request.url).searchParams.get("token");
    if (!token) {
      return page(
        "Invalid link",
        "This moderation link is missing its token.",
        400,
      );
    }

    const result = verifyModerationToken(token);
    if (!result.ok) {
      return result.reason === "expired"
        ? page(
            "Link expired",
            "Moderation links expire after 24 hours. Review this submission in Prisma Studio instead.",
            410,
          )
        : page(
            "Invalid link",
            "This moderation link could not be verified.",
            400,
          );
    }

    const { kind, id, action } = result.payload;

    // Idempotency: read before write. A second click (or a re-used link
    // within its TTL) finds the row already reviewed and changes nothing.
    const current = await readStatus(kind, id);
    if (current === null) {
      return page(
        "Not found",
        "This submission no longer exists — it may have been deleted.",
        404,
      );
    }
    if (current !== ModerationStatus.PENDING) {
      return page(
        "Already reviewed",
        `This submission was already ${current.toLowerCase()}. No changes were made.`,
        200,
      );
    }

    const newStatus =
      action === "approve"
        ? ModerationStatus.APPROVED
        : ModerationStatus.REJECTED;
    await writeStatus(kind, id, newStatus);

    return page(
      action === "approve" ? "Approved" : "Rejected",
      `The ${kind === "reply" ? "discussion reply" : kind} is now ${newStatus.toLowerCase()}.`,
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
