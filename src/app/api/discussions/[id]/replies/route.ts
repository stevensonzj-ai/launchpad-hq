import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";
import { sendModerationNotification } from "@/lib/email";
import { apiError, methodsNotAllowed } from "@/lib/api-error";
import { checkDailyPostQuota } from "@/lib/post-quota";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
  }
  const limited = await checkDailyPostQuota(user.id);
  if (limited) {
    return limited;
  }

  const { id } = await params;
  const discussion = await prisma.discussion.findFirst({
    where: { id, status: ModerationStatus.APPROVED },
  });
  if (!discussion) {
    return apiError("not_found", { message: "Not found" });
  }

  const body = await request.json();
  const text = String(body.body || "").trim();
  if (!text) {
    return apiError("bad_request", { message: "Body required" });
  }
  if (text.length > 2000) {
    return apiError("bad_request", { message: "body must be 2000 characters or fewer", field: "body" });
  }

  const reply = await prisma.discussionReply.create({
    data: {
      discussionId: id,
      userId: user.id,
      body: text,
    },
  });

  // Notify the moderator; a failed email must never fail the submission.
  try {
    await sendModerationNotification(
      {
        kind: "reply",
        id: reply.id,
        title: `Re: ${discussion.title}`,
        content: reply.body,
        author: user.name ?? "Anonymous",
      },
    );
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
  }

  return NextResponse.json({ id: reply.id });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
