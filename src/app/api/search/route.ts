import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import { listedPlatformWhere } from "@/lib/catalog-visibility";
import { PUBLIC_HOURLY_CACHE } from "@/lib/public-data/http";
import { methodsNotAllowed, withApiErrors } from "@/lib/api-error";

// The header search box calls this as people type; each distinct query is
// one shared cache entry (and one CDN entry), so typing doesn't wake the DB.
const searchPlatforms = cachedCatalogRead("api-search", (q: string) =>
  prisma.platform.findMany({
    where: {
      ...listedPlatformWhere(),
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { company: { contains: q, mode: "insensitive" } },
        { primaryUse: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      slug: true,
      name: true,
      company: true,
      costTier: true,
      category: { select: { name: true, slug: true } },
    },
    take: 8,
    orderBy: { name: "asc" },
  }),
);

export function GET(request: NextRequest) {
  return withApiErrors("api/search", async () => {
    const q = request.nextUrl.searchParams.get("q");
    if (!q || q.length < 2) {
      return NextResponse.json({ results: [] }, { headers: { "Cache-Control": PUBLIC_HOURLY_CACHE } });
    }

    // Same cap as Discover's search, so a huge query can't make a huge cache key.
    const platforms = await searchPlatforms(q.slice(0, 120));

    return NextResponse.json({ results: platforms }, { headers: { "Cache-Control": PUBLIC_HOURLY_CACHE } });
  });
}

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
