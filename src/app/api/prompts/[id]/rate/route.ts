import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { ModerationStatus } from "@prisma/client";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
  }

  const { id } = await params;
  const body = await request.json();
  const stars = Math.min(5, Math.max(1, parseInt(String(body.stars), 10) || 0));
  if (!stars) {
    return apiError("bad_request", { message: "Stars 1-5 required" });
  }

  const prompt = await prisma.prompt.findFirst({
    where: { id, status: ModerationStatus.APPROVED },
  });
  if (!prompt) {
    return apiError("not_found", { message: "Not found" });
  }

  try {
    await applyRating(id, user.id, stars);
  } catch (error) {
    // Two concurrent first ratings from the same user can still collide on
    // the (userId, promptId) unique index. The other request won, so retry
    // once: the second pass sees that row and applies an update instead.
    if (!isUniqueViolation(error)) throw error;
    await applyRating(id, user.id, stars);
  }

  const updated = await prisma.prompt.findUnique({ where: { id } });
  return NextResponse.json({
    ratingAvg:
      updated && updated.ratingCount > 0
        ? Math.round((updated.ratingSum / updated.ratingCount) * 10) / 10
        : null,
    ratingCount: updated?.ratingCount ?? 0,
  });
}

/**
 * Applies one user's rating inside a single transaction. The prompt row is
 * locked first, so the read of the user's existing rating and the counter
 * update cannot interleave with another rating of the same prompt.
 */
async function applyRating(promptId: string, userId: string, stars: number) {
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "prompts" WHERE id = ${promptId} FOR UPDATE`;
    const existing = await tx.promptRating.findUnique({
      where: { userId_promptId: { userId, promptId } },
    });
    if (existing) {
      await tx.prompt.update({
        where: { id: promptId },
        data: { ratingSum: { increment: stars - existing.stars } },
      });
      await tx.promptRating.update({
        where: { id: existing.id },
        data: { stars },
      });
    } else {
      await tx.prompt.update({
        where: { id: promptId },
        data: {
          ratingSum: { increment: stars },
          ratingCount: { increment: 1 },
        },
      });
      await tx.promptRating.create({ data: { userId, promptId, stars } });
    }
  });
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: unknown }).code === "P2002"
  );
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
