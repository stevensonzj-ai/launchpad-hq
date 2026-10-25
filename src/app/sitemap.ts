import type { MetadataRoute } from "next";
import { listRegisteredTutorials, tutorialGuidePath } from "@/data/tutorials";
import { listModelFamilies } from "@/data/models";
import { WORKFLOWS } from "@/data/workflows";
import { COMPARE_HUB_PATH } from "@/data/compare/pages";
import { compareSitemapPaths, listedComparePages } from "@/data/compare/view";
import { prisma } from "@/lib/db";
import { listedPlatformWhere } from "@/lib/catalog-visibility";
import { SITE_URL } from "@/lib/site";
import { sitemapStaticPublicPathsForNow, sitemapUrl } from "@/lib/sitemap-coverage";

export const dynamic = "force-dynamic";

function parseRealDate(value: string | Date | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function withLastModified(
  url: string,
  lastModified?: Date,
): MetadataRoute.Sitemap[number] {
  return lastModified ? { url, lastModified } : { url };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = sitemapStaticPublicPathsForNow().map((path) => ({
    url: sitemapUrl(SITE_URL, path),
  }));

  const workflowEntries: MetadataRoute.Sitemap = WORKFLOWS.map((workflow) => ({
    url: sitemapUrl(SITE_URL, `/workflows/${workflow.slug}`),
  }));

  const modelFamilyEntries: MetadataRoute.Sitemap = listModelFamilies().map((family) =>
    withLastModified(
      sitemapUrl(SITE_URL, `/models/${family.familySlug}`),
      parseRealDate(family.lastVerifiedAt),
    ),
  );

  let platformEntries: MetadataRoute.Sitemap = [];
  let guideEntries: MetadataRoute.Sitemap = [];
  // The hub needs no DB; its pages are listed only once their rows are known.
  let compareEntries: MetadataRoute.Sitemap = [{ url: sitemapUrl(SITE_URL, COMPARE_HUB_PATH) }];

  try {
    // Same catalog visibility as Discover: every Platform row is public
    // except the slugs in hiddenPlatformSlugs() (src/lib/catalog-visibility).
    // No published/active/verified gate exists. Do not invent one.
    // Hidden platforms (dead-and-obscure, or duplicates that 301) stay
    // reachable by URL but are noindexed, so they are left out here.
    const platforms = await prisma.platform.findMany({
      where: listedPlatformWhere(),
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    });

    // Tutorial content now lives at /guide, so the overview's lastmod is
    // the row's own updatedAt — a tutorial review no longer changes it.
    platformEntries = platforms.map((platform) =>
      withLastModified(
        sitemapUrl(SITE_URL, `/platform/${platform.slug}`),
        parseRealDate(platform.updatedAt),
      ),
    );

    // One guide per registered tutorial whose Platform row exists. The
    // guide route 404s without that row, so orphans are left out here too.
    const platformSlugs = new Set(platforms.map((platform) => platform.slug));
    guideEntries = listRegisteredTutorials()
      .filter((tutorial) => platformSlugs.has(tutorial.platformSlug))
      .sort((a, b) => a.platformSlug.localeCompare(b.platformSlug))
      .map((tutorial) =>
        withLastModified(
          sitemapUrl(SITE_URL, tutorialGuidePath(tutorial.platformSlug)),
          parseRealDate(tutorial.lastReviewedAt),
        ),
      );

    // Comparison pages whose required tools are listed, live and have rows.
    compareEntries = compareSitemapPaths(listedComparePages(undefined, platformSlugs)).map(
      (path) => ({ url: sitemapUrl(SITE_URL, path) }),
    );
  } catch {
    // DB unavailable (local build without DATABASE_URL, Neon blip): keep
    // only the static, workflow and model URLs. Platform and guide URLs
    // are both omitted rather than guessed from the tutorial registry —
    // without the DB we cannot tell which slugs would 404. A URL missing
    // from one sitemap fetch is harmless; a listed 404 is not.
  }

  return [
    ...staticEntries,
    ...workflowEntries,
    ...modelFamilyEntries,
    ...platformEntries,
    ...guideEntries,
    ...compareEntries,
  ];
}
