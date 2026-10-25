import { prisma } from "@/lib/db";
import type { CompareRow } from "@/data/compare/view";

/**
 * Platform rows for the comparison pages: the same columns
 * /platform/[slug] hands to overlayPlatformWithFacts. Visibility filtering
 * happens in the pure view builder, not here.
 */
export async function loadCompareRows(slugs: string[]): Promise<CompareRow[]> {
  if (slugs.length === 0) return [];
  return prisma.platform.findMany({
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
  });
}

/** Which of `slugs` have a Platform row. */
export async function existingPlatformSlugs(slugs: string[]): Promise<Set<string>> {
  if (slugs.length === 0) return new Set();
  const rows = await prisma.platform.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true },
  });
  return new Set(rows.map((row) => row.slug));
}
