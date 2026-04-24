import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";

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
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    return NextResponse.json(
      { error: "title is required", field: "title" },
      { status: 400 },
    );
  }
  if (title.length > 200) {
    return NextResponse.json(
      { error: "title must be 200 characters or fewer", field: "title" },
      { status: 400 },
    );
  }

  const bodyText = typeof body.body === "string" ? body.body.trim() : "";
  if (!bodyText) {
    return NextResponse.json(
      { error: "body is required", field: "body" },
      { status: 400 },
    );
  }
  if (bodyText.length > 10000) {
    return NextResponse.json(
      { error: "body must be 10000 characters or fewer", field: "body" },
      { status: 400 },
    );
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
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

  return NextResponse.json(created);
}
