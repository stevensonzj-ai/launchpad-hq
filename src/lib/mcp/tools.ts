/**
 * Pure tool logic for the Launchpad HQ MCP connector (v0.1).
 *
 * Every function takes (input, catalogRows, factsLookup) and returns plain
 * JSON. No Prisma, no network, no sponsor data: ranking, inclusion and
 * ordering depend only on the catalog row and its verified facts, and every
 * item carries `sponsored: false`.
 */
import type { Fact, ToolFacts, ToolPlan } from "@/data/facts/types";
import { isPublishedVerified } from "@/data/facts/walk";
import { costTiersForBudget } from "@/lib/recommendations-score";
import { absoluteUrl } from "@/lib/site";
import {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  type CompareInput,
  type CompareItem,
  type CompareOutput,
  type FindFreeAlternativesInput,
  type FindFreeAlternativesOutput,
  type GetPricingFactsInput,
  type GetPricingFactsOutput,
  type PlatformRef,
  type SearchToolsInput,
  type SearchToolsOutput,
} from "./schemas";

export const ATTRIBUTION = "Launchpad HQ (https://www.launchpadhq.io)";

/** The select-only catalog shape loaded by catalog.ts. Nothing user-related. */
export type CatalogRow = {
  slug: string;
  name: string;
  company: string | null;
  website: string | null;
  description: string | null;
  primaryUse: string | null;
  primaryUseCases: string | null;
  costTier: string;
  difficultyLevel: string;
  platformType: string[];
  currentPricing: string | null;
  freeTierFeatures: string | null;
  usageLimits: string | null;
  apiAvailable: boolean;
  directAlternatives: string[];
  budgetAlternativeTo: string[];
  updatedAt: Date | string;
  category: { name: string; slug: string } | null;
};

export type FactsLookup = (slug: string) => ToolFacts | undefined;

/** A bad or unknown input. The server turns it into an `isError` result. */
export class ToolInputError extends Error {}

/** Echoes the input (JSON-escaped, capped at 200 chars) and points at search_tools. */
function notInCatalog(input: string): ToolInputError {
  return new ToolInputError(
    `Not in the Launchpad HQ catalog: ${JSON.stringify(input.trim().slice(0, 200))}. Try search_tools to find the right name or slug.`,
  );
}

// ---------- helpers ----------

const DIFFICULTY_RANK: Record<string, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
  EXPERT: 3,
};
const SKILL_RANK: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "for", "to", "of", "in", "on", "with", "my", "me", "i",
  "want", "need", "tool", "tools", "ai", "app", "apps", "help", "something", "that", "can",
  "some", "best", "good", "free", "cheap", "use", "using", "make", "do",
]);

function isoDate(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function newest(dates: (string | null)[]): string | null {
  const real = dates.filter((d): d is string => Boolean(d)).sort();
  return real.length ? real[real.length - 1] : null;
}

function norm(value: string): string {
  return value.trim().toLowerCase();
}

function factVerification(fact: Fact<unknown>): "verified" | "unverified" {
  return isPublishedVerified(fact) ? "verified" : "unverified";
}

function isDiscontinued(facts: ToolFacts | undefined): boolean {
  return facts?.lifecycle === "discontinued";
}

function clampLimit(limit: number | undefined): number {
  if (!limit || limit < 1) return DEFAULT_LIMIT;
  return Math.min(limit, MAX_LIMIT);
}

/**
 * Free tier per §3 field rules: facts first, catalog cost tier as fallback.
 * A discontinued tool has no free tier, whatever its stored cost tier says.
 */
function freeTierOf(row: CatalogRow, facts: ToolFacts | undefined) {
  if (isDiscontinued(facts)) {
    const status = facts?.status;
    return {
      free_tier: { available: false, summary: status?.value.headline ?? "Discontinued" },
      verification: status ? factVerification(status) : ("catalog_only" as const),
      as_of: status?.checkedAt ?? isoDate(row.updatedAt),
      source_url: status?.sourceUrl ?? null,
    } as const;
  }
  const fact = facts?.freeTier;
  if (fact) {
    return {
      free_tier: { available: fact.value.available, summary: fact.value.summary },
      verification: factVerification(fact),
      as_of: fact.checkedAt,
      source_url: fact.sourceUrl,
    } as const;
  }
  const tier = row.costTier.toUpperCase();
  return {
    free_tier: {
      available: tier === "FREE" || tier === "FREEMIUM",
      summary: row.freeTierFeatures,
    },
    verification: "catalog_only" as const,
    as_of: isoDate(row.updatedAt),
    source_url: null,
  };
}

export function toPlatformRef(row: CatalogRow, facts: ToolFacts | undefined): PlatformRef {
  const free = freeTierOf(row, facts);
  return {
    slug: row.slug,
    name: facts?.displayName?.value ?? row.name,
    category: row.category?.name ?? null,
    launchpad_url: absoluteUrl(`/platform/${row.slug}`),
    website: facts?.officialUrl?.value ?? row.website,
    cost_tier: row.costTier,
    difficulty: row.difficultyLevel,
    free_tier: free.free_tier,
    verification: free.verification,
    as_of: free.as_of,
    source_url: free.source_url,
    sponsored: false,
  };
}

function sourced<T>(fact: Fact<T> | undefined) {
  if (!fact) return null;
  return {
    value: fact.value,
    as_of: fact.checkedAt,
    source_url: fact.sourceUrl,
    status: fact.status,
  };
}

/** Exact slug match first, then case-insensitive name or display-name match. */
export function findRow(
  query: string,
  rows: CatalogRow[],
  facts: FactsLookup,
): CatalogRow | undefined {
  const q = norm(query);
  return (
    rows.find((r) => r.slug === q) ??
    rows.find((r) => norm(r.name) === q) ??
    rows.find((r) => {
      const display = facts(r.slug)?.displayName?.value;
      return display ? norm(display) === q : false;
    })
  );
}

// ---------- search_tools ----------

function tokens(text: string): string[] {
  return norm(text)
    .split(/[^a-z0-9+#.]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function budgetTiers(budget: SearchToolsInput["budget"]): string[] | null {
  switch (budget) {
    case "free":
      return costTiersForBudget("free");
    case "low":
      return costTiersForBudget("under_20");
    case "medium":
      return costTiersForBudget("under_50");
    case "high":
      return costTiersForBudget("enterprise");
    default:
      return null; // "any" or unset: no budget filter
  }
}

export function searchTools(
  input: SearchToolsInput,
  rows: CatalogRow[],
  facts: FactsLookup,
): SearchToolsOutput {
  const words = tokens(input.task);
  const tiers = budgetTiers(input.budget);
  const skill = input.skill_level ? SKILL_RANK[input.skill_level] : undefined;

  const scored = rows
    .filter((row) => !isDiscontinued(facts(row.slug)))
    .filter((row) => !tiers || tiers.includes(row.costTier.toUpperCase()))
    .filter(
      (row) =>
        !input.platform_type ||
        row.platformType.some((p) => norm(p) === input.platform_type),
    )
    .map((row) => {
      const fields: [string, string | null | undefined, number][] = [
        ["name", facts(row.slug)?.displayName?.value ?? row.name, 3],
        ["category", row.category?.name, 2],
        ["primary use", row.primaryUse, 2],
        ["use cases", row.primaryUseCases, 1],
        ["description", row.description, 1],
      ];
      let score = 0;
      const reasons = new Set<string>();
      for (const word of words) {
        for (const [label, text, weight] of fields) {
          if (text && norm(text).includes(word)) {
            score += weight;
            reasons.add(`"${word}" in ${label}`);
          }
        }
      }
      if (score > 0 && skill !== undefined) {
        const level = DIFFICULTY_RANK[row.difficultyLevel.toUpperCase()] ?? 0;
        const above = level - skill;
        if (above > 0) {
          score -= above * 2;
          reasons.add(`difficulty ${row.difficultyLevel.toLowerCase()} is above ${input.skill_level}`);
        } else {
          reasons.add(`difficulty fits ${input.skill_level}`);
        }
      }
      if (score > 0 && tiers) reasons.add(`cost tier ${row.costTier.toLowerCase()} fits budget`);
      return { row, score, reasons: [...reasons] };
    })
    .filter((s) => s.reasons.some((r) => r.startsWith('"')))
    .sort((a, b) => b.score - a.score || a.row.slug.localeCompare(b.row.slug));

  const results = scored.slice(0, clampLimit(input.limit)).map((s) => ({
    ...toPlatformRef(s.row, facts(s.row.slug)),
    match_reasons: s.reasons,
  }));

  return {
    query: input.task,
    results,
    total_matches: scored.length,
    note:
      results.length === 0
        ? "No Launchpad HQ tools matched; try a broader task or remove filters."
        : null,
    data_as_of: newest(results.map((r) => r.as_of)),
    attribution: ATTRIBUTION,
  };
}

// ---------- compare ----------

export function compare(
  input: CompareInput,
  rows: CatalogRow[],
  facts: FactsLookup,
): CompareOutput {
  if (input.platforms.length < 2 || input.platforms.length > 4) {
    throw new ToolInputError("Compare takes 2 to 4 platforms.");
  }
  const items: CompareItem[] = [];
  const notFound: string[] = [];
  const seen = new Set<string>();
  for (const query of input.platforms) {
    const row = findRow(query, rows, facts);
    if (!row) {
      notFound.push(query);
      continue;
    }
    if (seen.has(row.slug)) continue;
    seen.add(row.slug);
    const f = facts(row.slug);
    items.push({
      ...toPlatformRef(row, f),
      plans: sourced<ToolPlan[]>(f?.plans),
      api_pricing: sourced(f?.apiPricing),
      usage_limits: sourced(f?.usageLimits as Fact<Record<string, unknown>> | undefined),
      platforms_supported: f?.platforms?.value ?? row.platformType,
      api_available: row.apiAvailable,
      lifecycle: f?.lifecycle ?? "active",
    });
  }
  return {
    items,
    not_found: notFound,
    data_as_of: newest(
      items.flatMap((i) => [i.as_of, i.plans?.as_of ?? null, i.api_pricing?.as_of ?? null]),
    ),
    attribution: ATTRIBUTION,
  };
}

// ---------- get_pricing_facts ----------

export function getPricingFacts(
  input: GetPricingFactsInput,
  rows: CatalogRow[],
  facts: FactsLookup,
): GetPricingFactsOutput {
  const row = findRow(input.platform, rows, facts);
  if (!row) throw notInCatalog(input.platform);
  const f = facts(row.slug);
  const plans = sourced<ToolPlan[]>(f?.plans);
  const freeTier = sourced(f?.freeTier);
  const apiPricing = sourced(f?.apiPricing);
  const usageLimits = sourced(f?.usageLimits as Fact<Record<string, unknown>> | undefined);
  const priceFacts = ([f?.plans, f?.freeTier, f?.apiPricing] as (Fact<unknown> | undefined)[]).filter(
    (x): x is Fact<unknown> => Boolean(x),
  );
  const hasFactsPrice = priceFacts.length > 0;
  const verificationLevel = hasFactsPrice
    ? priceFacts.every((x) => isPublishedVerified(x))
      ? "verified"
      : "unverified"
    : "catalog_only";
  const ref = toPlatformRef(row, f);
  return {
    platform: ref,
    plans,
    free_tier: freeTier,
    api_pricing: apiPricing,
    usage_limits: usageLimits,
    catalog_pricing_text: hasFactsPrice ? null : row.currentPricing,
    verification: verificationLevel,
    lifecycle: f?.lifecycle ?? "active",
    data_as_of: newest([
      ref.as_of,
      plans?.as_of ?? null,
      freeTier?.as_of ?? null,
      apiPricing?.as_of ?? null,
      usageLimits?.as_of ?? null,
    ]),
    attribution: ATTRIBUTION,
  };
}

// ---------- find_free_alternatives ----------

function hasFreeTier(row: CatalogRow, f: ToolFacts | undefined): 0 | 1 | 2 {
  if (f?.freeTier) return f.freeTier.value.available ? 2 : 0; // a verified "no" overrides the tier
  const tier = row.costTier.toUpperCase();
  return tier === "FREE" || tier === "FREEMIUM" ? 1 : 0;
}

export function findFreeAlternatives(
  input: FindFreeAlternativesInput,
  rows: CatalogRow[],
  facts: FactsLookup,
): FindFreeAlternativesOutput {
  const target = findRow(input.platform, rows, facts);
  if (!target) throw notInCatalog(input.platform);

  const targetNames = new Set(
    [target.name, facts(target.slug)?.displayName?.value].filter(Boolean).map((n) => norm(n!)),
  );
  const direct = new Set(target.directAlternatives.map(norm));

  type Candidate = { row: CatalogRow; relation: number; reason: string };
  const candidates: Candidate[] = [];
  for (const row of rows) {
    if (row.slug === target.slug) continue;
    if (isDiscontinued(facts(row.slug))) continue;
    if (direct.has(norm(row.name))) {
      candidates.push({ row, relation: 3, reason: `listed as a direct alternative to ${target.name}` });
    } else if (row.budgetAlternativeTo.some((n) => targetNames.has(norm(n)))) {
      candidates.push({ row, relation: 2, reason: `listed as a budget alternative to ${target.name}` });
    } else if (row.category && target.category && row.category.slug === target.category.slug) {
      candidates.push({ row, relation: 1, reason: `same category (${row.category.name})` });
    }
  }

  const alternatives = candidates
    .map((c) => ({ ...c, free: hasFreeTier(c.row, facts(c.row.slug)) }))
    .filter((c) => c.free > 0)
    .sort(
      (a, b) =>
        b.free - a.free || b.relation - a.relation || a.row.slug.localeCompare(b.row.slug),
    )
    .slice(0, clampLimit(input.limit))
    .map((c) => {
      const f = facts(c.row.slug);
      const ref = toPlatformRef(c.row, f);
      const why =
        c.free === 2 && f?.freeTier
          ? `verified free tier: ${f.freeTier.value.summary}; ${c.reason}`
          : `catalog lists a ${c.row.costTier.toLowerCase()} cost tier (unverified); ${c.reason}`;
      // No sourced tradeoff field exists yet (pros/cons carry no source), so
      // per the brief this stays null rather than inventing marketing text.
      const tradeoff: string | null = null;
      return { ...ref, why, tradeoff };
    });

  const forRef = toPlatformRef(target, facts(target.slug));
  return {
    for: forRef,
    alternatives,
    data_as_of: newest([forRef.as_of, ...alternatives.map((a) => a.as_of)]),
    attribution: ATTRIBUTION,
  };
}
