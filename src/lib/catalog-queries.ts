import { ModerationStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import { listedPlatformWhere } from "@/lib/catalog-visibility";

/**
 * Public catalog reads shared by the catalog pages and /api GETs, all in the
 * shared data cache (src/lib/catalog-cache.ts, tag `catalog`, 1 hour).
 * Nothing here may depend on the visitor: favorites and the signed-in user
 * are read by the pages themselves, uncached.
 */

/**
 * One platform row with its category and approved prompt/discussion counts.
 * Serves /platform/[slug] and /platform/[slug]/guide, page and metadata, so
 * a slug costs one cache entry. The counts can trail a moderation approval
 * by up to an hour, or until POST /api/revalidate names the slug.
 */
export const getPlatformPageRow = cachedCatalogRead(
  "platform-page-row",
  (slug: string) =>
    prisma.platform.findUnique({
      where: { slug },
      include: {
        category: true,
        _count: {
          select: {
            prompts: { where: { status: ModerationStatus.APPROVED } },
            discussions: { where: { status: ModerationStatus.APPROVED } },
          },
        },
      },
    }),
  (slug) => [slug],
);

/** Listed platforms whose name matches one of `names` (alternatives, complementary tools). */
export const getListedPlatformsByName = cachedCatalogRead("listed-by-name", (names: string[]) =>
  prisma.platform.findMany({
    where: {
      name: { in: names, mode: "insensitive" },
      ...listedPlatformWhere(),
    },
    include: { category: true },
  }),
);

/** Up to 12 other listed platforms in the same category, alphabetical. */
export const getSameCategoryPlatforms = cachedCatalogRead(
  "same-category",
  (categoryId: string, excludeSlug: string) =>
    prisma.platform.findMany({
      where: {
        categoryId,
        AND: [{ slug: { not: excludeSlug } }, listedPlatformWhere()],
      },
      select: { slug: true, name: true, category: { select: { slug: true } } },
      // v1: first same-category platforms alphabetically, not relevance-ranked.
      orderBy: { name: "asc" },
      take: 12,
    }),
);

/**
 * Discover's filtered list. `where` and `orderBy` are built from the URL's
 * filters (never from the visitor), so each filter combination is one entry.
 */
export const getDiscoverPlatforms = cachedCatalogRead(
  "discover-platforms",
  (where: Prisma.PlatformWhereInput, orderBy: Prisma.PlatformOrderByWithRelationInput[]) =>
    prisma.platform.findMany({
      where,
      include: { category: true },
      orderBy,
      take: 200,
    }),
);

/** Every category in display order with its platform count (Discover, /api/categories). */
export const getCategoriesWithCounts = cachedCatalogRead("categories-with-counts", () =>
  prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { platforms: true } } },
  }),
);

/** slug + category for each of `slugs` (the /tutorials index). */
export const getPlatformCategories = cachedCatalogRead("platform-categories", (slugs: string[]) =>
  prisma.platform.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, category: { select: { name: true, slug: true } } },
  }),
);

/** Listed platforms' slug and updatedAt (sitemap). */
export const getSitemapPlatforms = cachedCatalogRead("sitemap-platforms", () =>
  prisma.platform.findMany({
    where: listedPlatformWhere(),
    select: { slug: true, updatedAt: true },
    orderBy: { slug: "asc" },
  }),
);
