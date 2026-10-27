/**
 * Pure tool logic for the Launchpad HQ MCP connector (v0.1).
 *
 * Every function takes (input, catalogRows, factsLookup) and returns plain
 * JSON. No Prisma, no network, no sponsor data: ranking, inclusion and
 * ordering depend only on the catalog row and its verified facts, and every
 * item carries `sponsored: false`. Names, prices and free tiers come from
 * `publicToolCore`, the same serializer as the /data/v1 JSON feed.
 */
import type { Fact, ToolFacts, ToolPlan } from "@/data/facts/types";
import { isPublishedVerified, publishedUsageLimits } from "@/data/facts/walk";
import { TASKS, taskLabel, taskTagsFor, type TaskId } from "@/data/task-tags";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import { stripInlineCitations } from "@/lib/public-data/pricing";
import { publicToolCore } from "@/lib/public-data/serialize";
import { costTiersForBudget } from "@/lib/recommendations-score";
import { absoluteUrl } from "@/lib/site";
import {
  detectPriceIntent,
  detectTasks,
  hasPhrase,
  matchText,
  nameKey,
  nameKeys,
  namedToolCandidates,
  stem,
  STOPWORDS,
  WEAK_WORDS,
  words,
  type MatchText,
} from "./search-text";
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

/**
 * The select-only catalog shape loaded by catalog.ts. Nothing user-related.
 * Shared with the public JSON feed, so it carries every public column the
 * platform page shows.
 */
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
  idealUserTypes: string[];
  contentTypes: string[];
  outputFormats: string[];
  privacyLevel: string;
  timeToProductivity: string | null;
  learningCurve: string | null;
  offlineCapable: boolean;
  languageSupport: string | null;
  keyIntegrations: string | null;
  upgradeTriggers: string | null;
  complementaryTools: string[];
  hasMobileApp: boolean;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
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
 * Free-tier provenance per §3 field rules: facts first, catalog cost tier as
 * fallback. The value itself comes from `publicToolCore`. A discontinued tool
 * has no free tier, whatever its stored cost tier says.
 */
function freeTierOf(row: CatalogRow, facts: ToolFacts | undefined) {
  if (isDiscontinued(facts)) {
    const status = facts?.status;
    return {
      verification: status ? factVerification(status) : ("catalog_only" as const),
      as_of: status?.checkedAt ?? isoDate(row.updatedAt),
      source_url: status?.sourceUrl ?? null,
    } as const;
  }
  const fact = facts?.freeTier;
  if (fact) {
    return {
      verification: factVerification(fact),
      as_of: fact.checkedAt,
      source_url: fact.sourceUrl,
    } as const;
  }
  return {
    verification: "catalog_only" as const,
    as_of: isoDate(row.updatedAt),
    source_url: null,
  };
}

export function toPlatformRef(row: CatalogRow, facts: ToolFacts | undefined): PlatformRef {
  const free = freeTierOf(row, facts);
  const core = publicToolCore(row, facts);
  return {
    slug: row.slug,
    name: core.name,
    category: row.category?.name ?? null,
    launchpad_url: absoluteUrl(`/platform/${row.slug}`),
    website: core.website,
    cost_tier: core.cost_tier,
    difficulty: row.difficultyLevel,
    free_tier: core.free_tier,
    company: core.company,
    description: core.description,
    starting_price: core.starting_price,
    tasks: core.tasks,
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

/**
 * Name resolution for compare / get_pricing_facts / find_free_alternatives,
 * in order: exact slug; a retired slug from the feed's `aliases`; exact
 * (case-insensitive) catalog or display name; then the conservative
 * `nameKey` (punctuation and one trailing " ai"/" app" folded, "(...)"
 * dropped, either side of "A / B"), which must match exactly ONE tool.
 * Ambiguous or unknown input returns undefined: never a fuzzy guess.
 */
export function findRow(
  query: string,
  rows: CatalogRow[],
  facts: FactsLookup,
): CatalogRow | undefined {
  const q = norm(query);
  const bySlug = (slug: string) => rows.find((r) => r.slug === slug);
  const exact =
    bySlug(q) ??
    (PLATFORM_REDIRECTS[q] ? bySlug(PLATFORM_REDIRECTS[q]) : undefined) ??
    rows.find((r) => norm(r.name) === q) ??
    rows.find((r) => {
      const display = facts(r.slug)?.displayName?.value;
      return display ? norm(display) === q : false;
    });
  if (exact) return exact;

  const key = nameKey(query);
  if (!key) return undefined;
  const hits = rows.filter((r) => {
    const names = [r.name, facts(r.slug)?.displayName?.value].filter((n): n is string => Boolean(n));
    return nameKey(r.slug.replace(/-/g, " ")) === key || names.some((n) => nameKeys(n).includes(key));
  });
  return hits.length === 1 ? hits[0] : undefined;
}

// ---------- task tags and relations (shared by search_tools and find_free_alternatives) ----------

const TASK_WEIGHT = 20;
const GENERIC_TASK_WEIGHT = 6;

function isGenericTask(task: TaskId): boolean {
  return Boolean(TASKS[task].generic);
}

function tagsOf(row: CatalogRow): TaskId[] {
  return (taskTagsFor(row.slug) ?? []) as TaskId[];
}

type Relation = {
  level: number;
  score: number;
  reason: string;
  /** Shares the target's main (first, specific) curated task: its core job. */
  mainTask: boolean;
};

/**
 * How `row` relates to `target`, strongest first: listed as a direct
 * alternative (3), listed as a budget alternative (2), shares a specific
 * curated task (1.5), same category (1). A same-category tool whose curated
 * tasks share nothing specific with the target's is NOT related (Grammarly
 * sits in Research & Academic Tools, but paper finders are not grammar
 * checkers). `score` ranks within a level: shared tasks count 12 each (4 if
 * broad, double for the target's main task).
 */
export function relationTo(
  target: CatalogRow,
  row: CatalogRow,
  facts: FactsLookup,
): Relation | null {
  if (row.slug === target.slug) return null;
  const targetName = facts(target.slug)?.displayName?.value ?? target.name;
  const targetNames = new Set(
    [target.name, facts(target.slug)?.displayName?.value, target.slug].filter(Boolean).map((n) => norm(n!)),
  );
  const rowNames = [row.name, facts(row.slug)?.displayName?.value].filter(Boolean).map((n) => norm(n!));
  const direct = new Set(target.directAlternatives.map(norm));

  const targetTags = tagsOf(target);
  const rowTags = new Set(tagsOf(row));
  const shared = targetTags.filter((t) => rowTags.has(t));
  const specific = shared.filter((t) => !isGenericTask(t));
  const sharedScore = shared.reduce(
    (sum, t) => sum + (isGenericTask(t) ? 4 : 12) * (t === targetTags[0] ? 2 : 1),
    0,
  );
  const sharedText = shared.map(taskLabel).join(", ");
  const mainTask = specific.includes(targetTags[0]);

  if (rowNames.some((n) => direct.has(n))) {
    return { level: 3, score: sharedScore, reason: `listed as a direct alternative to ${targetName}`, mainTask };
  }
  if (row.budgetAlternativeTo.some((n) => targetNames.has(norm(n)))) {
    return { level: 2, score: sharedScore, reason: `listed as a budget alternative to ${targetName}`, mainTask };
  }
  if (specific.length > 0) {
    return { level: 1.5, score: sharedScore, reason: `same tasks as ${targetName}: ${sharedText}`, mainTask };
  }
  const sameCategory = row.category && target.category && row.category.slug === target.category.slug;
  if (sameCategory && (targetTags.length === 0 || rowTags.size === 0)) {
    return { level: 1, score: 0, reason: `same category (${row.category!.name})`, mainTask: false };
  }
  return null;
}

/**
 * Ordering key for "alternative to X" searches, built from the same signals
 * find_free_alternatives sorts on: the relation tier, then whether the tool
 * shares X's main job, then free-tier evidence (2 sourced fact, 1 catalog
 * cost tier, 0 none; pass 0 when the search has no free intent).
 */
type AlternativeRank = { level: number; main: number; free: number };

function alternativeRank(rel: Relation | null, free: number): AlternativeRank {
  return { level: rel?.level ?? 0, main: rel?.mainTask ? 1 : 0, free };
}

function compareAlternativeRank(a: AlternativeRank, b: AlternativeRank): number {
  return b.level - a.level || b.main - a.main || b.free - a.free;
}

/** "alternative to X" / "like X" / "instead of X": the catalog tool X, if the name resolves exactly. */
function namedTarget(task: string, rows: CatalogRow[], facts: FactsLookup): CatalogRow | undefined {
  for (const candidate of namedToolCandidates(task)) {
    // "something like make a CV": a candidate made only of filler words is not a tool name.
    if (words(candidate).every((w) => STOP.has(w) || WEAK.has(w))) continue;
    const hit = findRow(candidate, rows, facts);
    if (hit) return hit;
  }
  return undefined;
}

// ---------- search_tools ----------

/*
 * Ranking (pure, deterministic; every point has a match reason):
 *   task tag      +20 per task the search names that the tool is tagged for
 *                 (+6 for broad tasks such as "writing"), from task-tags.ts
 *   phrase        +3 x field weight for a multi-word phrase found as a phrase
 *   word          +field weight per strong word found as a whole word
 *   named tool    "alternative to X" / "like X": relationTo(X) adds 30
 *                 (direct alternative), 25 (budget alternative), the
 *                 shared-task score (12 per specific task, x2 for X's main
 *                 task), or 3 (same category); X itself is excluded.
 *                 Results then sort by relation tier first, tools sharing
 *                 X's main task first within a tier, and (with free
 *                 intent) a sourced free-tier fact before a catalog-only
 *                 free cost tier, as find_free_alternatives does; points
 *                 break the remaining ties
 *   price words   +/-5 free plan when the text says "free" and no budget was
 *                 passed; +3 free/freemium, -5 enterprise for "cheap"
 *   skill         -2 per difficulty level above the user's
 * Field weights: name 3, category 2, primary use 2, use cases 1,
 * description 1. Weak words (WEAK_WORDS: "write", "letter", "free",
 * "alternative", ...) score only when nothing stronger matched anywhere.
 */
const FIELD_WEIGHTS = [
  ["name", 3],
  ["category", 2],
  ["primary use", 2],
  ["use cases", 1],
  ["description", 1],
] as const;
const PHRASE_MULTIPLIER = 3;
const FREE_INTENT_BONUS = 5;
const CHEAP_INTENT_BONUS = 3;
const NAMED_DIRECT = 30;
const NAMED_BUDGET = 25;
const NAMED_CATEGORY = 3;

const STOP = new Set([...STOPWORDS].map(stem));
const WEAK = new Set([...WEAK_WORDS].map(stem));

type ParsedQuery = {
  text: MatchText;
  strong: string[];
  weak: string[];
  /** Adjacent topic words ("cover letter", "meeting transcription"). */
  phrases: string[];
};

function parseQuery(task: string, exclude: Set<string>): ParsedQuery {
  const all = words(task).filter((w) => w.length > 1 || /[+#]/.test(w));
  const kept = all.filter((w) => !STOP.has(w) && !exclude.has(w));
  const strong = [...new Set(kept.filter((w) => !WEAK.has(w)))];
  const weak = [...new Set(kept.filter((w) => WEAK.has(w)))];
  const phrases = new Set<string>();
  for (let i = 0; i + 1 < kept.length; i++) {
    const pair = [kept[i], kept[i + 1]];
    // A pair of weak words ("free alternative") is not a topic; task phrases
    // such as "cover letter" come from detectTasks instead.
    if (pair[0] !== pair[1] && pair.some((w) => !WEAK.has(w))) phrases.add(pair.join(" "));
  }
  return { text: matchText(kept.join(" ")), strong, weak, phrases: [...phrases] };
}

type Scored = {
  row: CatalogRow;
  score: number;
  reasons: Set<string>;
  /** How the row relates to the named tool ("alternative to X"), if any. */
  relation: Relation | null;
};

function scoreRow(
  row: CatalogRow,
  facts: FactsLookup,
  query: ParsedQuery,
  queryTasks: ReturnType<typeof detectTasks>,
  target: CatalogRow | undefined,
  useWeak: boolean,
): Scored {
  let score = 0;
  const reasons = new Set<string>();

  const tags = new Set(tagsOf(row));
  for (const { task } of queryTasks) {
    if (!tags.has(task)) continue;
    score += isGenericTask(task) ? GENERIC_TASK_WEIGHT : TASK_WEIGHT;
    reasons.add(`task: ${taskLabel(task)} (curated tag)`);
  }

  const rel = target ? relationTo(target, row, facts) : null;
  if (rel) {
    score +=
      rel.level === 3 ? NAMED_DIRECT + rel.score
      : rel.level === 2 ? NAMED_BUDGET + rel.score
      : rel.level === 1.5 ? rel.score
      : NAMED_CATEGORY;
    reasons.add(rel.reason);
  }

  const fields: [string, MatchText, number][] = FIELD_WEIGHTS.map(([label, weight]) => [
    label,
    matchText(
      label === "name" ? (facts(row.slug)?.displayName?.value ?? row.name)
      : label === "category" ? row.category?.name
      : label === "primary use" ? row.primaryUse
      : label === "use cases" ? row.primaryUseCases
      : row.description,
    ),
    weight,
  ]);

  const phrases = new Set([
    ...query.phrases,
    ...queryTasks.map((t) => t.phrase).filter((p) => p.includes(" ")),
  ]);
  for (const phrase of phrases) {
    for (const [label, text, weight] of fields) {
      if (hasPhrase(text, phrase)) {
        score += weight * PHRASE_MULTIPLIER;
        reasons.add(`"${phrase}" in ${label}`);
      }
    }
  }

  for (const word of useWeak ? [...query.strong, ...query.weak] : query.strong) {
    for (const [label, text, weight] of fields) {
      if (text.set.has(word)) {
        score += weight;
        reasons.add(`"${word}" in ${label}${WEAK.has(word) ? " (loose match)" : ""}`);
      }
    }
  }

  return { row, score, reasons, relation: rel };
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
  const tiers = budgetTiers(input.budget);
  const skill = input.skill_level ? SKILL_RANK[input.skill_level] : undefined;
  // Price words in the text count only when no budget was passed; they
  // re-rank, they never filter (only budget:"free" filters).
  const priceIntent = input.budget === undefined ? detectPriceIntent(input.task) : null;

  const target = namedTarget(input.task, rows, facts);
  const targetWords = new Set(
    target ? [target.name, facts(target.slug)?.displayName?.value].flatMap((n) => words(n)) : [],
  );
  const query = parseQuery(input.task, targetWords);
  // Task phrases may contain filler words ("find a job"), so match the full text.
  const queryTasks = detectTasks(matchText(input.task));

  const eligible = rows
    .filter((row) => !isDiscontinued(facts(row.slug)))
    .filter((row) => row.slug !== target?.slug) // "alternative to X" never returns X
    .filter((row) => !tiers || tiers.includes(row.costTier.toUpperCase()))
    .filter(
      (row) =>
        !input.platform_type ||
        row.platformType.some((p) => norm(p) === input.platform_type),
    );

  const relevance = (useWeak: boolean) =>
    eligible.map((row) => scoreRow(row, facts, query, queryTasks, target, useWeak));
  let matched = relevance(false).filter((s) => s.score > 0);
  // Only filler-ish words matched anywhere: fall back to them, and say so.
  const looseOnly = matched.length === 0 && query.weak.length > 0;
  if (looseOnly) matched = relevance(true).filter((s) => s.score > 0);

  const freeIntent = priceIntent === "free" || input.budget === "free";
  const scored = matched
    .map(({ row, score, reasons, relation }) => {
      if (priceIntent === "free") {
        if (hasFreeTier(row, facts(row.slug)) > 0) {
          score += FREE_INTENT_BONUS;
          reasons.add('has a free plan ("free" in your request)');
        } else {
          score -= FREE_INTENT_BONUS;
          reasons.add('no free plan listed ("free" in your request)');
        }
      } else if (priceIntent === "cheap") {
        const tier = row.costTier.toUpperCase();
        if (tier === "FREE" || tier === "FREEMIUM") {
          score += CHEAP_INTENT_BONUS;
          reasons.add(`${tier.toLowerCase()} cost tier (you asked for low cost)`);
        } else if (tier === "ENTERPRISE") {
          score -= FREE_INTENT_BONUS;
          reasons.add("enterprise pricing (you asked for low cost)");
        }
      }
      if (skill !== undefined) {
        const level = DIFFICULTY_RANK[row.difficultyLevel.toUpperCase()] ?? 0;
        const above = level - skill;
        if (above > 0) {
          score -= above * 2;
          reasons.add(`difficulty ${row.difficultyLevel.toLowerCase()} is above ${input.skill_level}`);
        } else {
          reasons.add(`difficulty fits ${input.skill_level}`);
        }
      }
      if (tiers) reasons.add(`cost tier ${row.costTier.toLowerCase()} fits budget`);
      return {
        row,
        score,
        reasons: [...reasons],
        alt: target ? alternativeRank(relation, freeIntent ? hasFreeTier(row, facts(row.slug)) : 0) : null,
      };
    })
    .sort(
      (a, b) =>
        (a.alt && b.alt ? compareAlternativeRank(a.alt, b.alt) : 0) ||
        b.score - a.score ||
        a.row.slug.localeCompare(b.row.slug),
    );

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
        : looseOnly
          ? "Only loose word matches; name the task (for example 'cover letter' or 'logo') for better results."
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
      usage_limits: sourced(publishedUsageLimits(f) as Fact<Record<string, unknown>> | undefined),
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
  const freeTierFact = sourced(f?.freeTier);
  const freeTier = freeTierFact && {
    ...freeTierFact,
    value: { ...freeTierFact.value, summary: stripInlineCitations(freeTierFact.value.summary) },
  };
  const apiPricing = sourced(f?.apiPricing);
  const usageLimits = sourced(publishedUsageLimits(f) as Fact<Record<string, unknown>> | undefined);
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

  // Relations, strongest first: direct alternative, budget alternative,
  // shared curated task, same category (see relationTo).
  type Candidate = { row: CatalogRow; relation: number; shared: number; reason: string };
  const candidates: Candidate[] = [];
  for (const row of rows) {
    if (isDiscontinued(facts(row.slug))) continue;
    const rel = relationTo(target, row, facts);
    if (rel) candidates.push({ row, relation: rel.level, shared: rel.score, reason: rel.reason });
  }

  const alternatives = candidates
    .map((c) => ({ ...c, free: hasFreeTier(c.row, facts(c.row.slug)) }))
    .filter((c) => c.free > 0)
    .sort(
      (a, b) =>
        b.free - a.free ||
        b.relation - a.relation ||
        b.shared - a.shared ||
        a.row.slug.localeCompare(b.row.slug),
    )
    .slice(0, clampLimit(input.limit))
    .map((c) => {
      const f = facts(c.row.slug);
      const ref = toPlatformRef(c.row, f);
      const why =
        c.free === 2 && f?.freeTier
          ? // Say "verified" only when it is: gathered-but-unchecked facts are labelled as such.
            `${factVerification(f.freeTier) === "verified" ? "verified free tier" : "sourced free tier (unverified)"}: ${stripInlineCitations(f.freeTier.value.summary)}; ${c.reason}`
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
