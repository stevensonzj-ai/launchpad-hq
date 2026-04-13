import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Support both slug and id lookup
  const platform = await prisma.platform.findFirst({
    where: {
      OR: [{ slug: id }, { id }],
    },
    include: {
      category: true,
      tutorials: {
        where: { published: true },
        orderBy: { difficulty: "asc" },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true, avatarUrl: true } } },
      },
    },
  });

  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 });
  }

  // Fetch alternatives as actual platform objects
  const alternatives = platform.directAlternatives.length
    ? await prisma.platform.findMany({
        where: {
          name: { in: platform.directAlternatives, mode: "insensitive" },
        },
        select: {
          id: true,
          slug: true,
          name: true,
          company: true,
          costTier: true,
          difficultyLevel: true,
          logoUrl: true,
        },
        take: 6,
      })
    : [];

  // Fetch complementary tools
  const complementary = platform.complementaryTools.length
    ? await prisma.platform.findMany({
        where: {
          name: { in: platform.complementaryTools, mode: "insensitive" },
        },
        select: {
          id: true,
          slug: true,
          name: true,
          company: true,
          costTier: true,
          logoUrl: true,
        },
        take: 6,
      })
    : [];

  return NextResponse.json({
    ...platform,
    alternativePlatforms: alternatives,
    complementaryPlatforms: complementary,
  });
}
