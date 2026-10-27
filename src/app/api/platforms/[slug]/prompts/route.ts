import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";
import { sendModerationNotification } from "@/lib/email";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

// TODO: reconsider default sort once rating data exists
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10) || 20),
  );

  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) {
    return apiError("not_found", { message: "Platform not found" });
  }

  const where = { platformId: platform.id, status: ModerationStatus.APPROVED };
  const [rows, totalCount] = await Promise.all([
    prisma.prompt.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.prompt.count({ where }),
  ]);

  const items = rows.map((p) => ({
    id: p.id,
    title: p.title,
    prompt: p.promptText,
    outputUrl: p.outputUrl,
    author: p.user?.name ?? p.author ?? "Anonymous",
    ratingAvg:
      p.ratingCount > 0
        ? Math.round((p.ratingSum / p.ratingCount) * 10) / 10
        : null,
    ratingCount: p.ratingCount,
    createdAt: p.createdAt,
  }));

  return NextResponse.json({ items, totalCount, page, pageSize });
}

// TODO: add rate limiting before public launch
export async function POST(
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
