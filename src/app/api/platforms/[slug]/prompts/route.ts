import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { sendModerationNotification } from "@/lib/email";
import { apiError, methodsNotAllowed } from "@/lib/api-error";
import { cachedCommunityRead, expireTag } from "@/lib/community-cache";
import { expireIfCreatedApproved, handleCommunityList, privateNoStore } from "@/lib/community-lists";
import { readApprovedPrompts } from "@/lib/community-queries";

/**
 * Approved prompts, the same for every visitor (no auth is read here): shared
 * data cache for an hour, tag platform-prompts:<slug>, and the hourly CDN
 * header. See src/lib/community-lists.ts.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return handleCommunityList(request, "prompts", slug, {
    cache: cachedCommunityRead,
    read: readApprovedPrompts,
    log: (line) => console.info(line),
  });
}

// Everything POST returns belongs to one user (their own pending row, or
// their auth error), so it is always private, no-store.
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  return privateNoStore(await createPrompt(request, context));
}

// TODO: add rate limiting before public launch
async function createPrompt(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
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

  const promptText =
    typeof body.promptText === "string" ? body.promptText.trim() : "";
  if (!promptText) {
    return apiError("bad_request", { message: "promptText is required", field: "promptText" });
  }
  if (promptText.length > 10000) {
    return apiError("bad_request", { message: "promptText must be 10000 characters or fewer", field: "promptText" });
  }

  let outputUrl: string | null = null;
  if (body.outputUrl != null && body.outputUrl !== "") {
    if (typeof body.outputUrl !== "string") {
      return apiError("bad_request", { message: "outputUrl must be a string", field: "outputUrl" });
    }
    const trimmed = body.outputUrl.trim();
    if (trimmed.length > 500) {
      return apiError("bad_request", { message: "outputUrl must be 500 characters or fewer", field: "outputUrl" });
    }
    outputUrl = trimmed || null;
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true, name: true },
  });
  if (!platform) {
    return apiError("not_found", { message: "Platform not found" });
  }

  // status defaults to PENDING per schema — submissions wait for manual approval.
  const created = await prisma.prompt.create({
    data: {
      platformId: platform.id,
      userId: user.id,
      title,
      promptText,
      outputUrl,
    },
  });

  // PENDING by default, so normally a no-op; expires the list if a row ever lands APPROVED.
  const expired = expireIfCreatedApproved("prompt", created.status, slug, expireTag);
  if (expired.error) {
    Sentry.captureException(expired.error);
    await Sentry.flush(2000);
  }

  // Notify the moderator; a failed email must never fail the submission.
  try {
    await sendModerationNotification(
      {
        kind: "prompt",
        id: created.id,
        title: created.title,
        content: created.promptText,
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
