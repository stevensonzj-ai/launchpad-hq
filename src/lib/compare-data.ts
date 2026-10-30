import { prismaRead as prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import type { CompareRow } from "@/data/compare/view";

const readCompareRows = cachedCatalogRead(
  "compare-rows",
  (slugs: string[]): Promise<CompareRow[]> =>
    prisma.platform.findMany({
      where: { slug: { in: slugs } },
      select: {
        slug: true,
        name: true,
        company: true,
        website: true,
        description: true,
        currentPricing: true,
        freeTierFeatures: true,
        usageLimits: true,
        platformType: true,
        hasMobileApp: true,
        iosAppUrl: true,
        androidAppUrl: true,
      },
    }),
  (slugs) => slugs,
);

// Cached as an array: a Set does not survive the data cache's JSON round trip.
const readExistingSlugs = cachedCatalogRead("existing-slugs", async (slugs: string[]): Promise<string[]> => {
  const rows = await prisma.platform.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true },
  });
  return rows.map((row) => row.slug);
});

/**
 * Platform rows for the comparison pages: the same columns
 * /platform/[slug] hands to overlayPlatformWithFacts. Visibility filtering
 * happens in the pure view builder, not here. Shared catalog cache.
 */
export async function loadCompareRows(slugs: string[]): Promise<CompareRow[]> {
  if (slugs.length === 0) return [];
  return readCompareRows(slugs);
}

/** Which of `slugs` have a Platform row. Shared catalog cache. */
export async function existingPlatformSlugs(slugs: string[]): Promise<Set<string>> {
  if (slugs.length === 0) return new Set();
  return new Set(await readExistingSlugs(slugs));
}
