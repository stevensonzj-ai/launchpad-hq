import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const discussion = await prisma.discussion.findUnique({ where: { id } });
  if (!discussion) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const text = String(body.body || "").trim();
  if (!text) {
    return NextResponse.json({ error: "Body required" }, { status: 400 });
  }

  const reply = await prisma.discussionReply.create({
    data: {
      discussionId: id,
      userId: user.id,
      body: text,
    },
  });

  return NextResponse.json({ id: reply.id });
}
