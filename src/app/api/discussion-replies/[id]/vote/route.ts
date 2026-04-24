import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const reply = await prisma.discussionReply.findFirst({
    where: { id, status: ModerationStatus.APPROVED },
  });
  if (!reply) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existing = await prisma.discussionReplyVote.findFirst({
    where: { userId: user.id, replyId: id },
  });

  if (existing) {
    await prisma.$transaction([
      prisma.discussionReplyVote.delete({ where: { id: existing.id } }),
      prisma.discussionReply.update({
        where: { id },
        data: { upvotes: { decrement: 1 } },
      }),
    ]);
    const r = await prisma.discussionReply.findUnique({ where: { id } });
    return NextResponse.json({ upvotes: r?.upvotes ?? 0, voted: false });
  }

  await prisma.$transaction([
    prisma.discussionReplyVote.create({
      data: { userId: user.id, replyId: id },
    }),
    prisma.discussionReply.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    }),
  ]);

  const r = await prisma.discussionReply.findUnique({ where: { id } });
  return NextResponse.json({ upvotes: r?.upvotes ?? 0, voted: true });
}
