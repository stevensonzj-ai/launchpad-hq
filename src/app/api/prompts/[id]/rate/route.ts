import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const stars = Math.min(5, Math.max(1, parseInt(String(body.stars), 10) || 0));
  if (!stars) {
    return NextResponse.json({ error: "Stars 1-5 required" }, { status: 400 });
  }

  const prompt = await prisma.prompt.findFirst({
    where: { id, status: ModerationStatus.APPROVED },
  });
  if (!prompt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existing = await prisma.promptRating.findFirst({
    where: { userId: user.id, promptId: id },
  });

  await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.prompt.update({
        where: { id },
        data: {
          ratingSum: { increment: stars - existing.stars },
        },
      });
      await tx.promptRating.update({
        where: { id: existing.id },
        data: { stars },
      });
    } else {
      await tx.prompt.update({
        where: { id },
        data: {
          ratingSum: { increment: stars },
          ratingCount: { increment: 1 },
        },
      });
      await tx.promptRating.create({
        data: { userId: user.id, promptId: id, stars },
      });
    }
  });

  const updated = await prisma.prompt.findUnique({ where: { id } });
  return NextResponse.json({
    ratingAvg:
      updated && updated.ratingCount > 0
        ? Math.round((updated.ratingSum / updated.ratingCount) * 10) / 10
        : null,
    ratingCount: updated?.ratingCount ?? 0,
  });
}
