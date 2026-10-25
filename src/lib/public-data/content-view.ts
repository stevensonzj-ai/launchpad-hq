/**
 * One view of a guide or workflow for both readers: the HTML pages and the
 * /data/v1 JSON. Price tokens in the text resolve through the serializer's
 * plan rows (`pagePlans`), and the tool price summaries are the same
 * `citedToolSummary` objects /data/v1/tools/{slug}.json is built from, so a
 * page and its JSON can never show different prices.
 *
 * Pure: no Prisma, no sponsor data.
 */
import { getToolFacts } from "@/data/facts";
import type { PlatformTutorialData } from "@/data/tutorials";
import type { WorkflowTemplate, WorkflowTier, WorkflowTierId } from "@/data/workflows/types";
import type { PublicToolSummaryT } from "./schema";
import { citableRow, citedToolSummary, pagePlans, type FeedTools } from "./serialize";
import {
  NON_PROSE_KEYS,
  mapContentStrings,
  priceResolver,
  resolvePriceTokens,
  type PlansLookup,
  type PriceResolver,
} from "./price-tokens";

/**
 * Plan rows a token may read: the tool must be citable (listed, not
 * discontinued, has a row) and its plans must come from its fact file, so
 * the value is the same on every page and in every test.
 */
export function feedPlansLookup(feed: FeedTools): PlansLookup {
  return (slug) => {
    const row = citableRow(slug, feed);
    const facts = feed.facts(slug);
    if (!row || !facts?.plans?.value.length) return undefined;
    return pagePlans(row, facts);
  };
}

export function feedPriceResolver(feed: FeedTools): PriceResolver {
  return priceResolver(feedPlansLookup(feed));
}

/**
 * Same lookup without catalog rows: fact-file plans only. Equal to
 * `feedPlansLookup` for every citable tool (fact plans replace the row's
 * pricing), which is what lets tests check every token without a DB.
 */
export const staticPlansLookup: PlansLookup = (slug) => {
  const facts = getToolFacts(slug);
  if (!facts || facts.lifecycle === "discontinued" || facts.visibility === "hidden") return undefined;
  return facts.plans?.value.length ? facts.plans.value : undefined;
};

/** Text with price tokens filled in from the catalog. */
export type TextResolver = (text: string) => string;

export function tokenText(feed: FeedTools): TextResolver {
  const resolve = feedPriceResolver(feed);
  return (text) => resolvePriceTokens(text, resolve);
}

// ---------------------------------------------------------------- guides

export type GuideView = {
  tutorial: PlatformTutorialData;
  /** The tool's price summary (null when it may not be cited). */
  tool: PublicToolSummaryT | null;
};

/** A tutorial with every price token filled in, plus its tool's prices. */
export function toGuideView(tutorial: PlatformTutorialData, feed: FeedTools): GuideView {
  return {
    tutorial: mapContentStrings(tutorial, tokenText(feed), NON_PROSE_KEYS),
    tool: citedToolSummary(tutorial.platformSlug, feed),
  };
}

// ------------------------------------------------------------- workflows

export type WorkflowToolPrice = {
  slug: string;
  name: string;
  starting_price: string | null;
  free: boolean;
};

export type WorkflowView = {
  workflow: WorkflowTemplate;
  /** Per tier: each cited tool once, in the order the tier lists them. */
  prices: Record<WorkflowTierId, WorkflowToolPrice[]>;
};

function tierSlugs(tier: WorkflowTier): string[] {
  const slugs = [...tier.tools.map((t) => t.slug), ...(tier.steps ?? []).map((s) => s.toolSlug)];
  return [...new Set(slugs.filter((s): s is string => Boolean(s)))];
}

export function toWorkflowToolPrice(tool: PublicToolSummaryT): WorkflowToolPrice {
  return {
    slug: tool.slug,
    name: tool.name,
    starting_price: tool.starting_price,
    free: tool.free_tier.available,
  };
}

export function tierPrices(tier: WorkflowTier, feed: FeedTools): WorkflowToolPrice[] {
  return tierSlugs(tier).flatMap((slug) => {
    const tool = citedToolSummary(slug, feed);
    return tool ? [toWorkflowToolPrice(tool)] : [];
  });
}

export function toWorkflowView(workflow: WorkflowTemplate, feed: FeedTools): WorkflowView {
  const resolved = mapContentStrings(workflow, tokenText(feed), NON_PROSE_KEYS);
  return {
    workflow: resolved,
    prices: {
      optimal: tierPrices(resolved.tiers.optimal, feed),
      hybrid: tierPrices(resolved.tiers.hybrid, feed),
      budget: tierPrices(resolved.tiers.budget, feed),
    },
  };
}
