import type { MetadataRoute } from "next";
import { listRegisteredTutorials, tutorialGuidePath } from "@/data/tutorials";
import { listModelFamilies } from "@/data/models";
import { WORKFLOWS } from "@/data/workflows";
import { COMPARE_HUB_PATH, comparePagePath, comparePageToolSlugs } from "@/data/compare/pages";
import { compareSitemapPaths, listedComparePages } from "@/data/compare/view";
import { getSitemapPlatforms } from "@/lib/catalog-queries";
import { SITE_URL } from "@/lib/site";
import { sitemapStaticPublicPathsForNow, sitemapUrl } from "@/lib/sitemap-coverage";
import {
  compareSitemapLastModified,
  guideSitemapLastModified,
  parseContentDate,
  platformSitemapLastModified,
} from "@/lib/sitemap-lastmod";

export const dynamic = "force-dynamic";

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
      parseContentDate(family.lastVerifiedAt),
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
    // Shared catalog cache: crawlers re-fetch this often, Postgres need not wake.
    const platforms = await getSitemapPlatforms();

    // Overview lastmod is the later of the row's updatedAt, the fact
    // file's checkedAt dates, and a hand-written snippet revision.
    // A guide review does not move it unless one of those dates does.
    platformEntries = platforms.map((platform) =>
      withLastModified(
        sitemapUrl(SITE_URL, `/platform/${platform.slug}`),
        platformSitemapLastModified(platform),
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
          guideSitemapLastModified(tutorial),
        ),
      );

    // Comparison pages whose required tools are listed, live and have rows.
    // lastmod is the latest fact-file check on the tools the page renders.
    const comparePages = listedComparePages(undefined, platformSlugs);
    compareEntries = compareSitemapPaths(comparePages).map((path) => {
      const page = comparePages.find((candidate) => comparePagePath(candidate) === path);
      return withLastModified(
        sitemapUrl(SITE_URL, path),
        page ? compareSitemapLastModified(comparePageToolSlugs(page)) : undefined,
      );
    });
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
