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
  const discussion = await prisma.discussion.findFirst({
    where: { id, status: ModerationStatus.APPROVED },
  });
  if (!discussion) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existing = await prisma.discussionVote.findFirst({
    where: { userId: user.id, discussionId: id },
  });

  if (existing) {
    await prisma.$transaction([
      prisma.discussionVote.delete({ where: { id: existing.id } }),
      prisma.discussion.update({
        where: { id },
        data: { upvotes: { decrement: 1 } },
      }),
    ]);
    const d = await prisma.discussion.findUnique({ where: { id } });
    return NextResponse.json({ upvotes: d?.upvotes ?? 0, voted: false });
  }

  await prisma.$transaction([
    prisma.discussionVote.create({
      data: { userId: user.id, discussionId: id },
    }),
    prisma.discussion.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    }),
  ]);

  const d = await prisma.discussion.findUnique({ where: { id } });
  return NextResponse.json({ upvotes: d?.upvotes ?? 0, voted: true });
}
