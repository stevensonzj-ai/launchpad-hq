import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { sendModerationNotification } from "@/lib/email";
import { apiError, methodsNotAllowed } from "@/lib/api-error";
import { checkDailyPostQuota } from "@/lib/post-quota";
import { cachedCommunityRead, expireTag } from "@/lib/community-cache";
import { expireIfCreatedApproved, handleCommunityList, privateNoStore } from "@/lib/community-lists";
import { readApprovedDiscussions } from "@/lib/community-queries";

/**
 * Approved discussions with their approved replies, the same for every
 * visitor (no auth is read here): shared data cache for an hour, tag
 * platform-discussions:<slug>, and the hourly CDN header. See
 * src/lib/community-lists.ts.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return handleCommunityList(request, "discussions", slug, {
    cache: cachedCommunityRead,
    read: readApprovedDiscussions,
    log: (line) => console.info(line),
  });
}

// Everything POST returns belongs to one user (their own pending row, or
// their auth error), so it is always private, no-store.
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  return privateNoStore(await createDiscussion(request, context));
}

// TODO: add rate limiting before public launch
async function createDiscussion(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
  }
  const limited = await checkDailyPostQuota(user.id);
  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return apiError("bad_request", { message: "Invalid JSON body" });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    return apiError("bad_request", { message: "title is required", field: "title" });
  }
  if (title.length > 200) {
    return apiError("bad_request", { message: "title must be 200 characters or fewer", field: "title" });
  }

  const bodyText = typeof body.body === "string" ? body.body.trim() : "";
  if (!bodyText) {
    return apiError("bad_request", { message: "body is required", field: "body" });
  }
  if (bodyText.length > 10000) {
    return apiError("bad_request", { message: "body must be 10000 characters or fewer", field: "body" });
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true, name: true },
  });
  if (!platform) {
    return apiError("not_found", { message: "Platform not found" });
  }

  // solution stays null on creation — marked later via a separate action endpoint.
  // status defaults to PENDING per schema — submissions wait for manual approval.
  const created = await prisma.discussion.create({
    data: {
      platformId: platform.id,
      userId: user.id,
      title,
      body: bodyText,
    },
  });

  // PENDING by default, so normally a no-op; expires the list if a row ever lands APPROVED.
  const expired = expireIfCreatedApproved("discussion", created.status, slug, expireTag);
  if (expired.error) {
    Sentry.captureException(expired.error);
    await Sentry.flush(2000);
  }

  // Notify the moderator; a failed email must never fail the submission.
  try {
    await sendModerationNotification(
      {
        kind: "discussion",
        id: created.id,
        title: created.title,
        content: created.body,
        platformName: platform.name,
        author: user.name ?? "Anonymous",
      },
    );
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
  }

  return NextResponse.json(created);
}

export const { PUT, PATCH, DELETE } = methodsNotAllowed(["GET", "POST"]);
