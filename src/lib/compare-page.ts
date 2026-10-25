import type { Metadata } from "next";
import { comparePageDataPath, comparePagePath, type ComparePage } from "@/data/compare/pages";
import {
  buildCompareView,
  comparePageLoadSlugs,
  defaultCompareContext,
  listedComparePages,
  listedRelatedLinks,
  type CompareView,
} from "@/data/compare/view";
import { loadCompareRows } from "@/lib/compare-data";
import { publicPageMetadata, withFeedAlternate } from "@/lib/seo-metadata";

export function comparePageMetadata(page: ComparePage | undefined): Metadata {
  if (!page) return { title: "Not Found" };
  return withFeedAlternate(
    publicPageMetadata({
      title: `${page.title} | Launchpad HQ`,
      description: page.description,
      path: comparePagePath(page),
    }),
    comparePageDataPath(page),
  );
}

/** The page's view model from live rows, or null when it should 404. */
export async function loadCompareView(page: ComparePage): Promise<CompareView | null> {
  const ctx = defaultCompareContext();
  const rows = await loadCompareRows(comparePageLoadSlugs(page));
  const view = buildCompareView(page, rows, ctx);
  if (!view) return null;
  // Related links to other comparison pages only when those pages are listed.
  const related = listedRelatedLinks(view.page, listedComparePages(ctx));
  return { ...view, page: { ...view.page, related } };
}
