/**
 * Catalog row + fact file -> public JSON. Pure: no Prisma, no network, no
 * sponsor data. Every value comes from the same overlay and helpers the
 * platform page uses, so the feed says exactly what the HTML says.
 */
import { overlayPlatformWithFacts } from "@/data/facts/overlay";
import { FACT_VALUE_KEYS, type Fact, type ToolFacts } from "@/data/facts/types";
import { isPublishedVerified, publishedUsageLimits } from "@/data/facts/walk";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import { isHiddenPlatform } from "@/lib/catalog-visibility";
import type { CatalogRow, FactsLookup } from "@/lib/mcp/tools";
import { collectDisplaySources, freeTierSummary } from "@/lib/platform-display";
import { absoluteUrl } from "@/lib/site";
import {
  applyUsageLimitsToFreePlan,
  normalizePlans,
  plansFromFactsOrProse,
  proseCheckDates,
  stripInlineCitations,
  type DisplayPlan,
} from "./pricing";
import { FEED_CHANGELOG } from "./changelog";
import {
  DATA_BASE,
  SCHEMA_VERSION,
  type PublicCatalogT,
  type PublicIndexT,
  type PublicToolSummaryT,
  type PublicToolT,
} from "./schema";

export const FEED_ATTRIBUTION =
  "Data from Launchpad HQ (https://www.launchpadhq.io). Please credit Launchpad HQ and link to the tool's Launchpad HQ page.";
export const FEED_LICENSE =
  "Free to use with attribution. Facts are dated snapshots; confirm prices on the vendor's site before buying.";
export const FEED_CACHE_NOTE = "Cached at the CDN for up to one hour.";

export type FeedContext = {
  generatedAt: string;
  /** Slugs that are offered to readers (hidden and duplicate rows removed). */
  listedSlugs: ReadonlySet<string>;
  isDiscontinued: (slug: string) => boolean;
  /** Catalog name (as stored in directAlternatives etc.) -> listed tool. */
  resolveName: (name: string) => { slug: string; name: string } | undefined;
  hasGuide: (slug: string) => boolean;
};

const norm = (value: string) => value.trim().toLowerCase();

function isoDate(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function newest(dates: (string | null | undefined)[]): string | null {
  const real = dates.filter((d): d is string => Boolean(d)).sort();
  return real.length ? real[real.length - 1] : null;
}

function cleanOrNull(text: string | null | undefined): string | null {
  return text?.trim() ? stripInlineCitations(text) || null : null;
}

/** The feed's discontinued rule: the fact file's lifecycle, nothing else. */
export function isDiscontinuedTool(facts: ToolFacts | undefined): boolean {
  return facts?.lifecycle === "discontinued";
}

/**
 * The public cost tier. The Prisma CostTier enum has no "discontinued" value,
 * so a discontinued tool's row keeps its last tier (PlayHT: FREEMIUM). The
 * feed and MCP say DISCONTINUED instead, matching the card badge
 * (`costBadge`), so nothing calls a dead product free.
 */
export const DISCONTINUED_COST_TIER = "DISCONTINUED";

export function publicCostTier(costTier: string, facts: ToolFacts | undefined): string {
  return isDiscontinuedTool(facts) ? DISCONTINUED_COST_TIER : costTier;
}

/**
 * The page's Alternatives / Works Well With rows, filtered by the same rule
 * as the feed's `alternatives`: no hidden, discontinued or self, up to four.
 */
export function listedRelatedRows<T extends { slug: string }>(
  rows: T[],
  self: string,
  facts: FactsLookup,
): T[] {
  return rows
    .filter((r) => r.slug !== self && !isHiddenPlatform(r.slug) && !isDiscontinuedTool(facts(r.slug)))
    .slice(0, 4);
}

export function buildFeedContext(
  rows: CatalogRow[],
  facts: FactsLookup,
  opts: { generatedAt: string; hasGuide?: (slug: string) => boolean },
): FeedContext {
  const listed = rows.filter((row) => !isHiddenPlatform(row.slug));
  const byName = new Map<string, { slug: string; name: string }>();
  for (const row of listed) {
    const display = facts(row.slug)?.displayName?.value;
    const entry = { slug: row.slug, name: display ?? row.name };
    for (const key of [row.name, display]) {
      if (key && !byName.has(norm(key))) byName.set(norm(key), entry);
    }
  }
  return {
    generatedAt: opts.generatedAt,
    listedSlugs: new Set(listed.map((row) => row.slug)),
    isDiscontinued: (slug) => isDiscontinuedTool(facts(slug)),
    resolveName: (name) => byName.get(norm(name)),
    hasGuide: opts.hasGuide ?? (() => false),
  };
}

/** The page's overlay of the catalog row with its fact file. */
export function overlayRow(row: CatalogRow, facts: ToolFacts | undefined) {
  return overlayPlatformWithFacts(
    {
      name: row.name,
      website: row.website,
      company: row.company,
      description: row.description,
      currentPricing: row.currentPricing,
      freeTierFeatures: row.freeTierFeatures,
      usageLimits: row.usageLimits,
      platformType: row.platformType,
      hasMobileApp: row.hasMobileApp,
      iosAppUrl: row.iosAppUrl,
      androidAppUrl: row.androidAppUrl,
    },
    facts,
  );
}

/** The plan rows the page's pricing table renders. */
export function pagePlans(row: CatalogRow, facts: ToolFacts | undefined): DisplayPlan[] {
  const view = overlayRow(row, facts);
  return applyUsageLimitsToFreePlan(
    plansFromFactsOrProse(facts, view.currentPricing, row.costTier),
    view.usageLimits,
  );
}

/**
 * Fields shared by the feed and the MCP connector. MCP maps from this so the
 * two can never disagree on a name, price or free tier.
 */
export function publicToolCore(row: CatalogRow, facts: ToolFacts | undefined) {
  const view = overlayRow(row, facts);
  // A discontinued product keeps its description and sources, but not
  // pricing, apps or limits that no longer apply (same as the page).
  const retired = isDiscontinuedTool(facts);
  const pricing = retired ? null : normalizePlans(pagePlans(row, facts));
  const summary = freeTierSummary(facts, view.freeTierFeatures);
  const tier = row.costTier.toUpperCase();
  const free_tier = retired
    ? { available: false, summary: facts?.status?.value.headline ?? "Discontinued" }
    : {
        available: facts?.freeTier ? facts.freeTier.value.available : tier === "FREE" || tier === "FREEMIUM",
        summary: summary === "Not listed" ? null : summary || null,
      };
  return {
    name: view.name ?? row.name,
    company: view.company,
    website: view.website ?? null,
    description: cleanOrNull(view.description),
    lifecycle: facts?.lifecycle ?? ("active" as const),
    cost_tier: publicCostTier(row.costTier, facts),
    free_tier,
    plans: pricing?.plans ?? [],
    starting_price: pricing?.starting_price ?? null,
    lowest_paid: pricing?.lowest_paid ?? null,
    api_pricing: retired ? null : (facts?.apiPricing?.value ?? null),
    usage_limits: retired
      ? null
      : ((publishedUsageLimits(facts)?.value as Record<string, unknown> | undefined) ?? null),
  };
}

/** Facts the page shows (unpublished usage limits stay out). */
function shownFacts(facts: ToolFacts | undefined): Fact<unknown>[] {
  if (!facts) return [];
  return FACT_VALUE_KEYS.flatMap((key) => {
    const fact = facts[key] as Fact<unknown> | undefined;
    if (!fact) return [];
    if (key === "usageLimits" && !isPublishedVerified(fact)) return [];
    return [fact];
  });
}

/** Prose fields the page renders; their "as of" dates count as check dates. */
function shownProse(row: CatalogRow, view: ReturnType<typeof overlayRow>) {
  return [view.description, view.currentPricing, view.freeTierFeatures, view.usageLimits, row.primaryUse];
}

/** Newest check date behind what the page shows (facts first, then prose). */
export function dataAsOf(row: CatalogRow, facts: ToolFacts | undefined): string | null {
  const factsAsOf = newest(shownFacts(facts).map((f) => f.checkedAt));
  return factsAsOf ?? newest(proseCheckDates(shownProse(row, overlayRow(row, facts))));
}

function resolveRefs(
  names: string[],
  self: string,
  ctx: FeedContext,
): { slug: string; name: string }[] {
  const out: { slug: string; name: string }[] = [];
  for (const name of names) {
    const hit = ctx.resolveName(name);
    if (!hit || hit.slug === self || !ctx.listedSlugs.has(hit.slug)) continue;
    if (ctx.isDiscontinued(hit.slug) || out.some((r) => r.slug === hit.slug)) continue;
    out.push(hit);
  }
  return out.slice(0, 4); // the page shows up to four
}

export function toPublicTool(
  row: CatalogRow,
  facts: ToolFacts | undefined,
  ctx: FeedContext,
): PublicToolT {
  const core = publicToolCore(row, facts);
  const view = overlayRow(row, facts);
  const retired = core.lifecycle === "discontinued";
  const { sources, notes } = collectDisplaySources(facts, shownProse(row, view));
  const shown = shownFacts(facts);
  const factsAsOf = newest(shown.map((f) => f.checkedAt));
  const status = facts?.status;

  return {
    schema_version: SCHEMA_VERSION,
    slug: row.slug,
    url: absoluteUrl(`/platform/${row.slug}`),
    name: core.name,
    former_names: status?.value.formerName ? [status.value.formerName] : [],
    company: core.company,
    website: core.website,
    category: row.category ? { slug: row.category.slug, name: row.category.name } : null,
    description: core.description,
    primary_use: cleanOrNull(row.primaryUse),
    use_cases: cleanOrNull(row.primaryUseCases),
    best_for: row.idealUserTypes,
    works_with: row.contentTypes.map((t) => t.trim()),
    outputs: row.outputFormats.map((t) => t.trim()),
    platforms: view.platformType,
    apps: retired
      ? { ios: null, android: null, macos: null, windows: null, linux: null }
      : {
          ios: view.iosAppUrl,
          android: view.androidAppUrl,
          macos: view.macosAppUrl,
          windows: view.windowsAppUrl,
          linux: view.linuxAppUrl,
        },
    cost_tier: core.cost_tier,
    difficulty: row.difficultyLevel,
    technical: {
      privacy_level: row.privacyLevel,
      time_to_productivity: row.timeToProductivity?.trim() || null,
      learning_curve: row.learningCurve?.trim() || null,
      offline: row.offlineCapable,
      api_available: row.apiAvailable,
      languages: row.languageSupport?.trim() || null,
      integrations: cleanOrNull(row.keyIntegrations),
      upgrade_triggers: cleanOrNull(row.upgradeTriggers),
    },
    lifecycle: core.lifecycle,
    status: status
      ? {
          headline: status.value.headline,
          details: status.value.details ?? [],
          what_to_do: status.value.whatToDo ?? null,
          alternatives: status.value.alternatives ?? [],
          source_kind: status.value.sourceKind ?? "official",
          source_url: status.sourceUrl,
          checked_at: status.checkedAt,
        }
      : null,
    free_tier: core.free_tier,
    plans: core.plans,
    starting_price: core.starting_price,
    lowest_paid: core.lowest_paid,
    api_pricing: core.api_pricing,
    usage_limits: core.usage_limits,
    models: retired ? null : (facts?.models?.value ?? null),
    alternatives: resolveRefs(row.directAlternatives, row.slug, ctx),
    works_well_with: resolveRefs(row.complementaryTools, row.slug, ctx),
    guide_url:
      !retired && ctx.hasGuide(row.slug) ? absoluteUrl(`/platform/${row.slug}/guide`) : null,
    changelog: retired ? [] : (facts?.changelog ?? []),
    sources: sources.map((s) => ({
      label: s.label,
      url: s.url,
      checked_at: s.checkedAt ?? null,
      status: s.status ?? "catalog_only",
    })),
    notes,
    verification: {
      status: shown.length === 0 ? "catalog_only" : shown.every(isPublishedVerified) ? "verified" : "unverified",
      checked_at: factsAsOf,
    },
    data_as_of: dataAsOf(row, facts),
    record_updated_at: isoDate(row.updatedAt),
    generated_at: ctx.generatedAt,
    sponsored: false,
    attribution: FEED_ATTRIBUTION,
  };
}

/** The tool's /data/v1 record URL. */
export function toolDataUrl(slug: string): string {
  return absoluteUrl(`${DATA_BASE}/tools/${slug}.json`);
}

/**
 * The fields of `toPublicTool` that content records (guides, workflows,
 * models, also-consider links) carry. Picked from the full record, so the
 * prices are the ones /data/v1/tools/{slug}.json serves.
 */
export function toPublicToolSummary(tool: PublicToolT): PublicToolSummaryT {
  return {
    slug: tool.slug,
    name: tool.name,
    url: tool.url,
    data_url: toolDataUrl(tool.slug),
    category: tool.category,
    cost_tier: tool.cost_tier,
    lifecycle: tool.lifecycle,
    free_tier: tool.free_tier,
    starting_price: tool.starting_price,
    lowest_paid: tool.lowest_paid,
    data_as_of: tool.data_as_of,
  };
}

/** Rows + facts + context: everything a content record needs to cite a tool. */
export type FeedTools = {
  rows: CatalogRow[];
  facts: FactsLookup;
  ctx: FeedContext;
};

/**
 * A tool content records may cite: listed (not hidden or a duplicate), not
 * discontinued, and with a catalog row. Same rule as `alternatives`.
 */
export function citableRow(slug: string | undefined, feed: FeedTools): CatalogRow | undefined {
  if (!slug || !feed.ctx.listedSlugs.has(slug) || feed.ctx.isDiscontinued(slug)) return undefined;
  return feed.rows.find((row) => row.slug === slug);
}

/**
 * Hidden or discontinued: content records drop the mention entirely. (A
 * slug with no row is not excluded; it is cited by name only.)
 */
export function isExcludedSlug(slug: string, feed: FeedTools): boolean {
  return isHiddenPlatform(slug) || feed.ctx.isDiscontinued(slug);
}

export function citedToolSummary(slug: string | undefined, feed: FeedTools): PublicToolSummaryT | null {
  const row = citableRow(slug, feed);
  return row ? toPublicToolSummary(toPublicTool(row, feed.facts(row.slug), feed.ctx)) : null;
}

export function toPublicCatalog(
  rows: CatalogRow[],
  facts: FactsLookup,
  ctx: FeedContext,
): PublicCatalogT {
  const tools = rows
    .filter((row) => ctx.listedSlugs.has(row.slug))
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((row) => toPublicTool(row, facts(row.slug), ctx));
  const categories = new Map<string, { slug: string; name: string; count: number }>();
  for (const tool of tools) {
    if (!tool.category) continue;
    const entry = categories.get(tool.category.slug) ?? { ...tool.category, count: 0 };
    entry.count += 1;
    categories.set(tool.category.slug, entry);
  }
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: ctx.generatedAt,
    count: tools.length,
    tools,
    categories: [...categories.values()].sort((a, b) => a.slug.localeCompare(b.slug)),
    aliases: { ...PLATFORM_REDIRECTS },
    attribution: FEED_ATTRIBUTION,
    license: FEED_LICENSE,
  };
}

export function toPublicIndex(catalog: Pick<PublicCatalogT, "generated_at" | "count" | "categories">): PublicIndexT {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: catalog.generated_at,
    counts: { tools: catalog.count, categories: catalog.categories.length },
    links: {
      catalog: absoluteUrl(`${DATA_BASE}/catalog.json`),
      tool: absoluteUrl(`${DATA_BASE}/tools/{slug}.json`),
      openapi: absoluteUrl(`${DATA_BASE}/openapi.json`),
      schema: absoluteUrl(`${DATA_BASE}/schema/tool.json`),
      compare: absoluteUrl(`${DATA_BASE}/compare/index.json`),
      compare_page: absoluteUrl(`${DATA_BASE}/compare/{slug}.json`),
      guides: absoluteUrl(`${DATA_BASE}/guides/index.json`),
      guide: absoluteUrl(`${DATA_BASE}/guides/{slug}.json`),
      workflows: absoluteUrl(`${DATA_BASE}/workflows/index.json`),
      workflow: absoluteUrl(`${DATA_BASE}/workflows/{slug}.json`),
      models: absoluteUrl(`${DATA_BASE}/models/index.json`),
      model_family: absoluteUrl(`${DATA_BASE}/models/{slug}.json`),
      models_compare: absoluteUrl(`${DATA_BASE}/models/compare/claude-vs-gpt.json`),
      quiz: absoluteUrl(`${DATA_BASE}/quiz.json`),
      llms_full: absoluteUrl("/llms-full.txt"),
      developers: absoluteUrl("/developers"),
    },
    cache: FEED_CACHE_NOTE,
    changelog: FEED_CHANGELOG.map((entry) => ({ ...entry })),
    attribution: FEED_ATTRIBUTION,
    license: FEED_LICENSE,
  };
}

export type ToolFileResolution =
  | { kind: "tool"; row: CatalogRow }
  | { kind: "redirect"; slug: string }
  | { kind: "not_found" };

/** The slug in a `{slug}.json` route segment, or null. */
export function jsonFileSlug(file: string): string | null {
  return /^([^/]+)\.json$/.exec(file)?.[1] ?? null;
}

/** `/data/v1/tools/{file}`: needs a `.json` suffix and a listed slug. */
export function resolveToolFile(file: string, rows: CatalogRow[]): ToolFileResolution {
  const match = /^([^/]+)\.json$/.exec(file);
  if (!match) return { kind: "not_found" };
  const slug = match[1];
  const moved = PLATFORM_REDIRECTS[slug];
  if (moved) return { kind: "redirect", slug: moved };
  if (isHiddenPlatform(slug)) return { kind: "not_found" };
  const row = rows.find((r) => r.slug === slug);
  return row ? { kind: "tool", row } : { kind: "not_found" };
}
