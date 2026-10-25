/**
 * /data/v1/compare: the comparison pages as JSON. Which tools a page shows
 * (and whether it exists at all) comes from the same pure view builder as
 * the HTML; each tool entry is the serializer's full record, identical to
 * /data/v1/tools/{slug}.json. The page copy carries no numbers (enforced in
 * compare.test.ts), so every price here is the serializer's.
 */
import { COMPARE_HUB_PATH, COMPARE_PAGES, comparePageDataPath, comparePagePath, type ComparePage } from "@/data/compare/pages";
import {
  buildCompareView,
  defaultCompareContext,
  listedComparePages,
  listedRelatedLinks,
  type CompareContext,
} from "@/data/compare/view";
import { CLAUDE_VS_GPT, CLAUDE_VS_GPT_PATH } from "@/data/models/claude-vs-gpt";
import { absoluteUrl } from "@/lib/site";
import { DATA_BASE, SCHEMA_VERSION, type PublicCompareIndexT, type PublicComparePageT } from "./schema";
import { FEED_ATTRIBUTION, FEED_LICENSE, citedToolSummary, toPublicTool, type FeedTools } from "./serialize";

export const dataUrl = (path: string) => absoluteUrl(`${DATA_BASE}${path}`);

/** The HTML pages' compare context, with the feed's facts lookup. */
function compareContext(feed: FeedTools): CompareContext {
  return { ...defaultCompareContext(), facts: feed.facts };
}

/** Listed pages: hidden, discontinued or missing tools drop a page, as on the hub. */
export function feedComparePages(feed: FeedTools, pages: readonly ComparePage[] = COMPARE_PAGES): ComparePage[] {
  const existing = new Set(feed.rows.filter((row) => feed.ctx.listedSlugs.has(row.slug)).map((row) => row.slug));
  return listedComparePages(compareContext(feed), existing, pages);
}

/** One page as JSON, or null when the HTML page would 404. */
export function toPublicComparePage(
  page: ComparePage,
  feed: FeedTools,
  pages: readonly ComparePage[] = COMPARE_PAGES,
): PublicComparePageT | null {
  const rows = feed.rows.filter((row) => feed.ctx.listedSlugs.has(row.slug));
  const view = buildCompareView(page, rows, compareContext(feed));
  if (!view) return null;
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  return {
    schema_version: SCHEMA_VERSION,
    kind: page.kind,
    slug: page.slug,
    url: absoluteUrl(comparePagePath(page)),
    data_url: dataUrl(comparePageDataPath(page)),
    title: page.title,
    description: page.description,
    intro: [...page.intro],
    hit_first: [...page.hitFirst],
    // Stored without the question mark; the page adds it.
    faq: page.faq.map((item) => ({ question: `${item.question}?`, answer: item.answer })),
    related: listedRelatedLinks(page, feedComparePages(feed, pages)).map((link) => ({
      label: link.label,
      url: absoluteUrl(link.href),
    })),
    tools: view.tools.map((tool) => ({
      role: tool.role,
      pick: tool.pick ?? null,
      free_option_label: tool.freeOptionLabel ?? null,
      sources: tool.sources.map((source) => ({
        field: source.field,
        url: source.url,
        as_of: source.asOf,
        origin: source.origin,
      })),
      as_of: tool.asOf,
      tool: toPublicTool(bySlug.get(tool.slug)!, feed.facts(tool.slug), feed.ctx),
    })),
    also_consider: view.alsoConsider.flatMap((link) => citedToolSummary(link.slug, feed) ?? []),
    as_of: view.asOf,
    undated_tools: view.undatedTools,
    generated_at: feed.ctx.generatedAt,
    sponsored: false,
    attribution: FEED_ATTRIBUTION,
  };
}

export function toPublicCompareIndex(feed: FeedTools): PublicCompareIndexT {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: feed.ctx.generatedAt,
    url: absoluteUrl(COMPARE_HUB_PATH),
    pages: feedComparePages(feed).map((page) => ({
      kind: page.kind,
      slug: page.slug,
      title: page.title,
      description: page.description,
      url: absoluteUrl(comparePagePath(page)),
      data_url: dataUrl(comparePageDataPath(page)),
    })),
    models: [
      {
        slug: CLAUDE_VS_GPT.slug,
        title: CLAUDE_VS_GPT.title,
        description: CLAUDE_VS_GPT.description,
        url: absoluteUrl(CLAUDE_VS_GPT_PATH),
        data_url: dataUrl(`/models/compare/${CLAUDE_VS_GPT.slug}.json`),
      },
    ],
    attribution: FEED_ATTRIBUTION,
    license: FEED_LICENSE,
  };
}
