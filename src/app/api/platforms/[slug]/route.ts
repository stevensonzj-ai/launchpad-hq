import { NextRequest, NextResponse } from "next/server";
import { prismaRead as prisma } from "@/lib/db";
import { isHiddenPlatform, listedPlatformWhere } from "@/lib/catalog-visibility";
import { PUBLIC_REVIEW_SELECT } from "@/lib/public-reviews";
import { apiError, methodsNotAllowed, withApiErrors } from "@/lib/api-error";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import { PUBLIC_HOURLY_CACHE } from "@/lib/public-data/http";

/**
 * Public fields only (reviews use PUBLIC_REVIEW_SELECT), so the body is the
 * same for every visitor: shared catalog cache (tags catalog +
 * platform:<slug>) and the hourly CDN header. Not-found is never cached by
 * the CDN (apiError sends no-store).
 */
const readPlatformDetail = cachedCatalogRead(
  "api-platform-detail",
  async (slug: string) => {
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
    if (!platform || isHiddenPlatform(platform.slug)) return null;

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

    return {
      ...platform,
      alternativePlatforms: alternatives,
      complementaryPlatforms: complementary,
    };
  },
  (slug) => [slug],
);

export function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withApiErrors("api/platforms/[slug]", async () => {
    const { slug } = await params;
    const body = await readPlatformDetail(slug);
    if (!body) return apiError("not_found", { message: "Platform not found" });
    return NextResponse.json(body, { headers: { "Cache-Control": PUBLIC_HOURLY_CACHE } });
  });
}

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
