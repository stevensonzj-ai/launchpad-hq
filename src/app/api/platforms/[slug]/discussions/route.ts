import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";
import { sendModerationNotification } from "@/lib/email";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

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
    prisma.discussion.findMany({
      where,
      include: {
        user: { select: { name: true } },
        replies: {
          where: { status: ModerationStatus.APPROVED },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.discussion.count({ where }),
  ]);

  const items = rows.map((d) => ({
    id: d.id,
    title: d.title,
    body: d.body,
    solution: d.solution,
    upvotes: d.upvotes,
    author: d.user?.name ?? "Anonymous",
    createdAt: d.createdAt,
    replies: d.replies.map((r) => ({
      id: r.id,
      body: r.body,
      upvotes: r.upvotes,
      author: r.user?.name ?? "Anonymous",
      createdAt: r.createdAt,
    })),
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
