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

  const prompts = await prisma.prompt.findMany({
    where: { platformId: platform.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  const list = prompts.map((p) => ({
    id: p.id,
    title: p.title,
    prompt: p.promptText,
    outputUrl: p.outputUrl,
    author: p.author || p.user?.name || "Member",
    ratingAvg:
      p.ratingCount > 0 ? Math.round((p.ratingSum / p.ratingCount) * 10) / 10 : null,
    ratingCount: p.ratingCount,
    createdAt: p.createdAt.toISOString(),
  }));

  return NextResponse.json({ prompts: list });
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
  const promptText = String(body.prompt || body.promptText || "").trim();
  const outputUrl = body.outputUrl ? String(body.outputUrl).trim() : null;
  const author = body.author ? String(body.author).trim() : null;

  if (!title || !promptText) {
    return NextResponse.json({ error: "Title and prompt are required" }, { status: 400 });
  }

  const created = await prisma.prompt.create({
    data: {
      platformId: platform.id,
      userId: user.id,
      title,
      promptText,
      outputUrl,
      author: author || user.name || null,
    },
  });

  return NextResponse.json({
    id: created.id,
    title: created.title,
    prompt: created.promptText,
    outputUrl: created.outputUrl,
  });
}
