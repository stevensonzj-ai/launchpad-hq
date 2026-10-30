import { NextRequest, NextResponse } from "next/server";
import { PLATFORMS_MAX_LIMIT, PLATFORMS_MAX_PAGE, clampInt } from "@/lib/request-limits";
import { prismaRead as prisma } from "@/lib/db";
import { listedPlatformWhere } from "@/lib/catalog-visibility";
import { Prisma } from "@prisma/client";
import { methodsNotAllowed, withApiErrors } from "@/lib/api-error";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import { PUBLIC_HOURLY_CACHE } from "@/lib/public-data/http";

// Public and visitor-independent: keyed by the query-string filters.
const readPlatformsPage = cachedCatalogRead(
  "api-platforms",
  async (where: Prisma.PlatformWhereInput, skip: number, take: number) => {
    const [platforms, total] = await Promise.all([
      prisma.platform.findMany({
        where,
        include: { category: true },
        orderBy: [{ featured: "desc" }, { name: "asc" }],
        skip,
        take,
      }),
      prisma.platform.count({ where }),
    ]);
    return { platforms, total };
  },
);

export function GET(request: NextRequest) {
  return withApiErrors("api/platforms", async () => {
    const params = request.nextUrl.searchParams;

    const category = params.get("category");
    const costTier = params.get("costTier");
    const difficulty = params.get("difficulty");
    const privacy = params.get("privacy");
    const search = params.get("search");
    const featured = params.get("featured");
    const hasMobileApp = params.get("hasMobileApp");
    const mobile = params.get("mobile");
    const page = clampInt(params.get("page"), 1, 1, PLATFORMS_MAX_PAGE);
    const limit = clampInt(params.get("limit"), 20, 1, PLATFORMS_MAX_LIMIT);

    const where: Prisma.PlatformWhereInput = { ...listedPlatformWhere() };

    if (category) {
      where.category = { slug: category };
    }
    if (costTier) {
      where.costTier = costTier as Prisma.EnumCostTierFilter["equals"];
    }
    if (difficulty) {
      where.difficultyLevel = difficulty as Prisma.EnumDifficultyFilter["equals"];
    }
    if (privacy) {
      where.privacyLevel = privacy as Prisma.EnumPrivacyLevelFilter["equals"];
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (hasMobileApp === "true") {
      where.hasMobileApp = true;
    }
    if (mobile === "app") {
      where.hasMobileApp = true;
    }
    if (mobile === "web") {
      where.mobileWebFriendly = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { primaryUse: { contains: search, mode: "insensitive" } },
        { primaryUseCases: { contains: search, mode: "insensitive" } },
      ];
    }

    const { platforms, total } = await readPlatformsPage(where, (page - 1) * limit, limit);

    return NextResponse.json(
      {
        platforms,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { headers: { "Cache-Control": PUBLIC_HOURLY_CACHE } },
    );
  });
}

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
