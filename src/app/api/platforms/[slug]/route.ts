import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isHiddenPlatform, listedPlatformWhere } from "@/lib/catalog-visibility";
import { PUBLIC_REVIEW_SELECT } from "@/lib/public-reviews";
import { apiError, methodsNotAllowed, withApiErrors } from "@/lib/api-error";

export function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withApiErrors("api/platforms/[slug]", async () => {
    const { slug } = await params;

    // The dynamic segment is named slug, but the lookup also matches on id
    // for backward compatibility with callers that pass a raw id.
    const platform = await prisma.platform.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
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
          // Public fields only: no reviewer identity (userId, name, avatar).
          select: PUBLIC_REVIEW_SELECT,
        },
      },
    });

    // Hidden and redirected rows are not part of the public catalog API.
    if (!platform || isHiddenPlatform(platform.slug)) {
      return apiError("not_found", { message: "Platform not found" });
    }

    // Fetch alternatives as actual platform objects
    const alternatives = platform.directAlternatives.length
      ? await prisma.platform.findMany({
          where: {
            name: { in: platform.directAlternatives, mode: "insensitive" },
            ...listedPlatformWhere(),
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
            ...listedPlatformWhere(),
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
  });
}

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
