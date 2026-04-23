import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";

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
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
  }

  const where = { platformId: platform.id, status: ModerationStatus.APPROVED };
  const [items, totalCount] = await Promise.all([
    prisma.prompt.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.prompt.count({ where }),
  ]);

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

  const promptText =
    typeof body.promptText === "string" ? body.promptText.trim() : "";
  if (!promptText) {
    return NextResponse.json(
      { error: "promptText is required", field: "promptText" },
      { status: 400 },
    );
  }
  if (promptText.length > 10000) {
    return NextResponse.json(
      { error: "promptText must be 10000 characters or fewer", field: "promptText" },
      { status: 400 },
    );
  }

  let outputUrl: string | null = null;
  if (body.outputUrl != null && body.outputUrl !== "") {
    if (typeof body.outputUrl !== "string") {
      return NextResponse.json(
        { error: "outputUrl must be a string", field: "outputUrl" },
        { status: 400 },
      );
    }
    const trimmed = body.outputUrl.trim();
    if (trimmed.length > 500) {
      return NextResponse.json(
        { error: "outputUrl must be 500 characters or fewer", field: "outputUrl" },
        { status: 400 },
      );
    }
    outputUrl = trimmed || null;
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
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

  return NextResponse.json(created);
}
