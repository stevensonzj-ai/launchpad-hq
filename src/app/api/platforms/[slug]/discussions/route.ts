import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({ where: { slug } });
  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
  }

  const discussions = await prisma.discussion.findMany({
    where: { platformId: platform.id },
    orderBy: { createdAt: "desc" },
    take: 40,
    include: {
      user: { select: { name: true } },
      replies: {
        orderBy: { createdAt: "asc" },
        take: 20,
        include: { user: { select: { name: true } } },
      },
    },
  });

  return NextResponse.json({
    discussions: discussions.map((d) => ({
      id: d.id,
      title: d.title,
      body: d.body,
      solution: d.solution,
      upvotes: d.upvotes,
      author: d.user?.name || "Member",
      createdAt: d.createdAt.toISOString(),
      replies: d.replies.map((r) => ({
        id: r.id,
        body: r.body,
        upvotes: r.upvotes,
        author: r.user?.name || "Member",
        createdAt: r.createdAt.toISOString(),
      })),
    })),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({ where: { slug } });
  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
  }

  const body = await request.json();
  const title = String(body.title || "").trim();
  const text = String(body.body || "").trim();
  if (!title || !text) {
    return NextResponse.json({ error: "Title and body required" }, { status: 400 });
  }

  const created = await prisma.discussion.create({
    data: {
      platformId: platform.id,
      userId: user.id,
      title,
      body: text,
    },
  });

  return NextResponse.json({ id: created.id });
}
