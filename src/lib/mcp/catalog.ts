import { prisma } from "@/lib/db";
import { listedPlatformWhere } from "@/lib/catalog-visibility";
import type { CatalogRow } from "./tools";

/**
 * Read-only catalog loader for the MCP connector.
 *
 * ONE select-only `findMany` per warm instance, cached in memory for 10
 * minutes; all searching happens in memory. Nothing user-related is
 * selected (no reviews, prompts, discussions, favorites or users), and
 * hidden/duplicate platforms are excluded the same way Discover does.
 */
export const CATALOG_TTL_MS = 10 * 60 * 1000;

let cache: { rows: CatalogRow[]; loadedAt: number } | null = null;

export async function loadCatalog(now = Date.now()): Promise<CatalogRow[]> {
  if (cache && now - cache.loadedAt < CATALOG_TTL_MS) return cache.rows;
  const rows = await prisma.platform.findMany({
    where: listedPlatformWhere(),
    select: {
      slug: true,
      name: true,
      company: true,
      website: true,
      description: true,
      primaryUse: true,
      primaryUseCases: true,
      costTier: true,
      difficultyLevel: true,
      platformType: true,
      currentPricing: true,
      freeTierFeatures: true,
      usageLimits: true,
      apiAvailable: true,
      directAlternatives: true,
      budgetAlternativeTo: true,
      updatedAt: true,
      category: { select: { name: true, slug: true } },
    },
    orderBy: { slug: "asc" },
  });
  cache = { rows, loadedAt: now };
  return rows;
}
