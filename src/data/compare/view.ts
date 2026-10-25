/**
 * Pure view models for the comparison pages. No Prisma: the route loads
 * Platform rows and hands them in, so this runs under `npm test`.
 *
 * Prices, free-plan text and limits are exactly what `overlayPlatformWithFacts`
 * returns for the row + fact file — the same strings /platform/[slug] starts
 * from. Nothing here (or in the registry) types a number.
 */
import { overlayPlatformWithFacts, type PlatformFactFields } from "@/data/facts/overlay";
import type { ToolFacts } from "@/data/facts/types";
import { getToolFacts } from "@/data/facts/registry";
import { hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { extractUrls } from "@/lib/platform-display";
import {
  COMPARE_HUB_PATH,
  COMPARE_PAGES,
  FREE_OPTION_LABEL,
  comparePagePath,
  comparePageRequiredSlugs,
  comparePageToolSlugs,
  type ComparePage,
} from "./pages";

/** The Platform columns the overlay needs, plus identity. */
export type CompareRow = PlatformFactFields & {
  slug: string;
  name: string;
  website: string | null;
};

export type CompareContext = {
  hidden: ReadonlySet<string>;
  facts: (slug: string) => ToolFacts | undefined;
};

export function defaultCompareContext(): CompareContext {
  return { hidden: new Set(hiddenPlatformSlugs()), facts: getToolFacts };
}

export type ToolSourceField = "Pricing" | "Free plan" | "Usage limits";

export type ToolSource = {
  field: ToolSourceField;
  /** Fact-file sourceUrl, else a URL in the catalog text, else the official site. */
  url: string | null;
  /** YYYY-MM-DD, or null when neither the fact file nor the text states one. */
  asOf: string | null;
  origin: "fact-file" | "catalog";
};

export type CompareTool = {
  slug: string;
  name: string;
  href: string;
  role: "baseline" | "alternative" | "contender";
  currentPricing: string | null;
  freeTierFeatures: string | null;
  usageLimits: string | null;
  freeOptionLabel?: string;
  pick?: string;
  sources: ToolSource[];
  /** Oldest date among this tool's sources. */
  asOf: string | null;
};

export type CompareLink = { slug: string; name: string; href: string };

export type CompareView = {
  page: ComparePage;
  path: string;
  tools: CompareTool[];
  /** Oldest per-tool date shown on the page. */
  asOf: string | null;
  /** Tools with at least one field that carries no date. */
  undatedTools: string[];
  alsoConsider: CompareLink[];
};

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const AS_OF_RE = /as of (\d{4}-\d{2}-\d{2})/gi;

function realDate(value: string | undefined): string | null {
  if (!value || !ISO_DATE_RE.test(value)) return null;
  return Number.isNaN(new Date(`${value}T00:00:00Z`).getTime()) ? null : value;
}

export function oldestDate(dates: Array<string | null | undefined>): string | null {
  const real = dates.map((d) => realDate(d ?? undefined)).filter((d): d is string => d !== null);
  return real.length ? [...real].sort()[0] : null;
}

/** Oldest "as of YYYY-MM-DD" in catalog text such as "(official, as of 2026-10-14)". */
export function asOfFromText(text: string): string | null {
  return oldestDate([...text.matchAll(AS_OF_RE)].map((m) => m[1]));
}

/**
 * Where each displayed field came from, and when it was checked. A field
 * the fact file supplies cites the fact; otherwise it cites the date in the
 * catalog text and a URL in that text or the official site.
 */
export function toolSources(
  shown: Pick<CompareTool, "currentPricing" | "freeTierFeatures" | "usageLimits">,
  facts: ToolFacts | undefined,
  website: string | null | undefined,
): ToolSource[] {
  const fields: Array<{
    field: ToolSourceField;
    text: string | null;
    fact?: { sourceUrl: string; checkedAt: string };
  }> = [
    { field: "Pricing", text: shown.currentPricing, fact: facts?.plans },
    { field: "Free plan", text: shown.freeTierFeatures, fact: facts?.freeTier },
    // The overlay never fills usageLimits from a fact file.
    { field: "Usage limits", text: shown.usageLimits },
  ];
  const sources: ToolSource[] = [];
  for (const { field, text, fact } of fields) {
    if (!text?.trim()) continue;
    if (fact) {
      sources.push({
        field,
        url: fact.sourceUrl || null,
        asOf: realDate(fact.checkedAt),
        origin: "fact-file",
      });
      continue;
    }
    sources.push({
      field,
      url: extractUrls(text)[0] ?? website ?? null,
      asOf: asOfFromText(text),
      origin: "catalog",
    });
  }
  return sources;
}

/** Why a slug cannot appear on a comparison page, or null if it can. */
export function exclusionReason(
  slug: string,
  rows: ReadonlyMap<string, CompareRow>,
  ctx: CompareContext,
): "hidden" | "discontinued" | "missing" | null {
  if (ctx.hidden.has(slug)) return "hidden";
  if (ctx.facts(slug)?.lifecycle === "discontinued") return "discontinued";
  if (!rows.has(slug)) return "missing";
  return null;
}

function toTool(
  row: CompareRow,
  role: CompareTool["role"],
  page: ComparePage,
  ctx: CompareContext,
  freeOption?: keyof typeof FREE_OPTION_LABEL,
): CompareTool {
  const facts = ctx.facts(row.slug);
  const view = overlayPlatformWithFacts(row, facts);
  const shown = {
    currentPricing: view.currentPricing,
    freeTierFeatures: view.freeTierFeatures,
    usageLimits: view.usageLimits,
  };
  const sources = toolSources(shown, facts, view.website);
  return {
    slug: row.slug,
    name: view.name ?? row.name,
    href: `/platform/${row.slug}`,
    role,
    ...shown,
    ...(freeOption ? { freeOptionLabel: FREE_OPTION_LABEL[freeOption] } : {}),
    pick: page.picks.find((pick) => pick.slug === row.slug)?.text,
    sources,
    asOf: oldestDate(sources.map((s) => s.asOf)),
  };
}

/**
 * The page's view model, or null when it must 404: a head-to-head tool or
 * the baseline is hidden, discontinued or missing, or every alternative is.
 * Alternatives that fail the same checks are dropped individually.
 */
export function buildCompareView(
  page: ComparePage,
  rowList: readonly CompareRow[],
  ctx: CompareContext,
): CompareView | null {
  const rows = new Map(rowList.map((row) => [row.slug, row]));
  const ok = (slug: string) => exclusionReason(slug, rows, ctx) === null;
  if (!comparePageRequiredSlugs(page).every(ok)) return null;

  let tools: CompareTool[];
  if (page.kind === "head-to-head") {
    tools = [page.a, page.b].map((slug) => toTool(rows.get(slug)!, "contender", page, ctx));
  } else {
    const alternatives = page.alternatives
      .filter((alt) => ok(alt.slug))
      .map((alt) => toTool(rows.get(alt.slug)!, "alternative", page, ctx, alt.freeOption));
    if (alternatives.length === 0) return null;
    tools = [toTool(rows.get(page.baseline)!, "baseline", page, ctx), ...alternatives];
  }

  const alsoConsider = (page.alsoConsider ?? []).filter(ok).map((slug) => {
    const row = rows.get(slug)!;
    return {
      slug,
      name: overlayPlatformWithFacts(row, ctx.facts(slug)).name ?? row.name,
      href: `/platform/${slug}`,
    };
  });

  return {
    page,
    path: comparePagePath(page),
    tools,
    asOf: oldestDate(tools.map((tool) => tool.asOf)),
    undatedTools: tools
      .filter((tool) => tool.sources.some((s) => s.asOf === null))
      .map((tool) => tool.name),
    alsoConsider,
  };
}

/** Every slug a page needs rows for (rendered tools plus also-consider links). */
export function comparePageLoadSlugs(page: ComparePage): string[] {
  return [...new Set([...comparePageToolSlugs(page), ...(page.alsoConsider ?? [])])];
}

/**
 * Pages to list in the hub, sitemap, llms.txt and platform-page links.
 * Without `existingSlugs` (no DB at hand) only the hidden/discontinued
 * checks apply; with it, missing rows also drop a page.
 */
export function listedComparePages(
  ctx: CompareContext = defaultCompareContext(),
  existingSlugs?: ReadonlySet<string>,
  pages: readonly ComparePage[] = COMPARE_PAGES,
): ComparePage[] {
  const ok = (slug: string) =>
    !ctx.hidden.has(slug) &&
    ctx.facts(slug)?.lifecycle !== "discontinued" &&
    (!existingSlugs || existingSlugs.has(slug));
  return pages.filter((page) => {
    if (!comparePageRequiredSlugs(page).every(ok)) return false;
    return page.kind === "head-to-head" || page.alternatives.some((alt) => ok(alt.slug));
  });
}

/** "Compare" links for /platform/<slug>: listed pages that render this tool. */
export function compareLinksForSlug(
  slug: string,
  ctx: CompareContext = defaultCompareContext(),
): Array<{ href: string; label: string }> {
  if (ctx.hidden.has(slug) || ctx.facts(slug)?.lifecycle === "discontinued") return [];
  return listedComparePages(ctx)
    .filter((page) => comparePageToolSlugs(page).includes(slug))
    .map((page) => ({ href: comparePagePath(page), label: page.title }));
}

/** Hub plus every listed page, for sitemap.xml. */
export function compareSitemapPaths(pages: readonly ComparePage[]): string[] {
  return [COMPARE_HUB_PATH, ...pages.map(comparePagePath)];
}

/** llms.txt lines for the hub and every listed page. */
export function compareLlmsLines(origin: string, pages: readonly ComparePage[]): string[] {
  return [
    `- [Comparisons](${origin}${COMPARE_HUB_PATH}): Head-to-head comparisons and free alternatives, priced from catalog data`,
    ...pages.map((page) => `- [${page.title}](${origin}${comparePagePath(page)}): ${page.description}`),
  ];
}
