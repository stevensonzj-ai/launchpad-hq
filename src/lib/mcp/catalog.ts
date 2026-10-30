import { prismaRead as prisma } from "@/lib/db";
import { cachedCatalogRead, withMemoryLayer } from "@/lib/catalog-cache";
import { listedPlatformWhere } from "@/lib/catalog-visibility";
import type { CatalogRow } from "./tools";

/**
 * Read-only catalog loader for the MCP connector and the /data/v1 feed.
 *
 * ONE select-only `findMany`, cached in two layers: Next's shared data
 * cache (tag `catalog`, 24 hours, src/lib/catalog-cache.ts) and, in front of
 * it, 5 minutes of per-instance memory. All searching happens in memory.
 * /mcp and every /data/v1 route read this same loader, so they cannot drift
 * by more than the memory TTL. Nothing user-related is selected (no
 * reviews, prompts, discussions, favorites or users), and hidden/duplicate
 * platforms are excluded the same way Discover does.
 */
export const CATALOG_MEMORY_TTL_MS = 5 * 60 * 1000;

const readCatalog = cachedCatalogRead("mcp-catalog", (): Promise<CatalogRow[]> =>
  prisma.platform.findMany({
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
      // Public page columns, also read by the /data/v1 JSON feed.
      idealUserTypes: true,
      contentTypes: true,
      outputFormats: true,
      privacyLevel: true,
      timeToProductivity: true,
      learningCurve: true,
      offlineCapable: true,
      languageSupport: true,
      keyIntegrations: true,
      upgradeTriggers: true,
      complementaryTools: true,
      hasMobileApp: true,
      iosAppUrl: true,
      androidAppUrl: true,
    },
    orderBy: { slug: "asc" },
  }),
);

export const loadCatalog: () => Promise<CatalogRow[]> = withMemoryLayer(readCatalog, CATALOG_MEMORY_TTL_MS);
