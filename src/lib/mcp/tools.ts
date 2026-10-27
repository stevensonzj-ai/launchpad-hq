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
import { TASK_TAGS, TASKS, taskLabel, taskTagsFor, type TaskId } from "@/data/task-tags";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import { stripInlineCitations } from "@/lib/public-data/pricing";
import { publicToolCore } from "@/lib/public-data/serialize";
import { costTiersForBudget } from "@/lib/recommendations-score";
import { absoluteUrl } from "@/lib/site";
import { correctWord, matchName, type NamedRow, type Suggestion } from "./names";
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
  MAX_INPUT_CHARS,
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

/**
 * Echoes the input (JSON-escaped, capped at 200 chars), lists any
 * did-you-mean suggestions, and points at search_tools.
 */
function notInCatalog(input: string, suggestions: Suggestion[] = []): ToolInputError {
  const dym = suggestions.length
    ? ` Did you mean: ${suggestions.map((s) => `${s.name} (${s.slug})`).join(", ")}?`
    : "";
  return new ToolInputError(
    `Not in the Launchpad HQ catalog: ${JSON.stringify(input.trim().slice(0, 200))}.${dym} Try search_tools to find the right name or slug.`,
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

/** A tool's as_of older than this many days is labelled stale. */
export const STALE_AFTER_DAYS = 90;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** True when `asOf` is more than STALE_AFTER_DAYS before `today` (both YYYY-MM-DD). */
export function isStale(asOf: string | null, today: string = todayIso()): boolean {
  if (!asOf) return false;
  const age = (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${asOf}T00:00:00Z`)) / 86_400_000;
  return age > STALE_AFTER_DAYS;
}

/**
 * The honesty label for an old record: labelling beats hiding, so stale
 * tools stay in results but say how old their facts are.
 */
function freshnessNote(free: ReturnType<typeof freeTierOf>): string {
  return free.verification === "catalog_only"
    ? `as of ${free.as_of}, unverified: catalog text last edited then and not checked against the vendor since; confirm on the vendor's site.`
    : `as of ${free.as_of}, unverified since: facts were last checked then; confirm on the vendor's site.`;
}

export function toPlatformRef(row: CatalogRow, facts: ToolFacts | undefined, today?: string): PlatformRef {
  const free = freeTierOf(row, facts);
  const core = publicToolCore(row, facts);
  const stale = isStale(free.as_of, today);
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
    stale,
    freshness_note: stale ? freshnessNote(free) : null,
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
 * Then the tolerant steps in names.ts (compact key, curated aliases, a
 * unique 6+ character name within 1 edit). Ambiguous or unknown input
 * returns undefined, with did-you-mean suggestions from resolveTool.
 */
export function findRow(
  query: string,
  rows: CatalogRow[],
  facts: FactsLookup,
): CatalogRow | undefined {
  return resolveTool(query, rows, facts).row;
}

export type Resolution = {
  row: CatalogRow | undefined;
  /** How a tolerant match was made; null for an exact match or none. */
  resolution: "compact" | "alias" | "spelling" | null;
  suggestions: Suggestion[];
};

function namedRows(rows: CatalogRow[], facts: FactsLookup): NamedRow[] {
  return rows.map((r) => ({
    slug: r.slug,
    names: [...new Set([facts(r.slug)?.displayName?.value ?? r.name, r.name])],
  }));
}

export function resolveTool(query: string, rows: CatalogRow[], facts: FactsLookup): Resolution {
  const exact = findRowExact(query, rows, facts);
  if (exact) return { row: exact, resolution: null, suggestions: [] };
  const match = matchName(query, namedRows(rows, facts));
  if (match.kind === "none") return { row: undefined, resolution: null, suggestions: match.suggestions };
  return { row: rows.find((r) => r.slug === match.slug), resolution: match.kind, suggestions: [] };
}

/** Echo fields for a tolerant match (PlatformRef.resolved_from / resolution). */
function resolvedFields(query: string, res: Resolution) {
  return res.resolution ? { resolved_from: query, resolution: res.resolution } : {};
}

function findRowExact(
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

/**
 * "alternative to X" / "like X" / "instead of X": the catalog tool X, if the
 * name resolves (exactly, or tolerantly via resolveTool; then `resolution`
 * is set so the match reasons can say so).
 */
function namedTarget(
  task: string,
  rows: CatalogRow[],
  facts: FactsLookup,
): { row: CatalogRow; candidate: string; resolution: Resolution["resolution"] } | undefined {
  for (const candidate of namedToolCandidates(task)) {
    // "something like make a CV": a candidate made only of filler words is not a tool name.
    if (words(candidate).every((w) => STOP.has(w) || WEAK.has(w))) continue;
    const hit = resolveTool(candidate, rows, facts);
    if (hit.row) return { row: hit.row, candidate, resolution: hit.resolution };
  }
  return undefined;
}

// ---------- search_tools ----------

/*
 * Ranking (pure, deterministic; every point has a match reason):
 *   task tag      +20 per task the search names that the tool is tagged for
 *                 (+6 for broad tasks such as "writing"), from task-tags.ts;
 *                 +4 more when it is the tool's main job (first tag)
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
 * Field weights: name 3, category 2, primary use 2, use cases 1,
 * description 1. Weak words (WEAK_WORDS: "write", "letter", "free",
 * "alternative", ...) score only when nothing stronger matched anywhere.
 * Threshold: in a multi-word search, tools that matched only one query word
 * (no task tag, phrase or named-tool relation, and the word is not itself a
 * task the search names) are dropped when any tool matched more strongly.
 *
 * Fit tiers (fix plan P1.2): skill level, platform and an unpriced tool
 * under a low/medium budget never drop a tool; each misfit moves it below
 * every tool that fits ("tiered sort"). A known price above the budget cap
 * does drop it. Within a tier: relation tier (named tool), points, then
 * evidence (verified, then sourced, then catalog-only), then slug.
 * Top-3 gate: a tool with no task-tag, name, primary-use or named-tool match
 * cannot take the top 3 while one that has such a match is left.
 * Fallback: a search with no topic gets a starter set (verified chatbot-tagged
 * tools), and fewer than 3 direct matches are topped up with verified tools
 * from the top match's category that share a curated task with the search or
 * that match. Fallback items are
 * always labelled (`fallback: true`, a "fallback:" reason, the output's
 * `fallback` and `note`) and never counted in `total_matches`.
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
/** Extra points when the task is the tool's main job (its first curated tag). */
const MAIN_TASK_BONUS = 4;
/** Monthly caps for budget "low" / "medium" (USD). */
export const BUDGET_CAPS = { low: 20, medium: 50 } as const;
/** Fewer direct matches than this get a labelled top-up. */
const THIN_RESULTS = 3;
const GATED_SLOTS = 3;
export const STARTER_REASON = "fallback: popular starter, not a direct match";

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

/**
 * Negation guard: "website without coding", "no code", "sin programar". The
 * word after the negator (and its task) is ignored instead of matched.
 */
const NEGATORS = ["without", "no", "not", "non", "sin", "ohne", "sans", "sem"];
const NEGATION = new RegExp(`(?:^| )(?:${NEGATORS.join("|")}) (?:any |the |a )?([a-z]+)`, "g");

/** The negated words, plus the negators themselves (never a topic). */
export function negatedWords(task: string): Set<string> {
  const folded = ` ${words(task).join(" ")}`;
  const negated = [...folded.matchAll(NEGATION)].map((m) => m[1]);
  return new Set(negated.length ? [...negated, ...NEGATORS] : []);
}

/** First MAX_INPUT_CHARS characters, cut at a word boundary when one is close. */
function truncateTask(task: string): string {
  const t = task.trim();
  if (t.length <= MAX_INPUT_CHARS) return t;
  const cut = t.slice(0, MAX_INPUT_CHARS);
  const space = cut.lastIndexOf(" ");
  return (space > MAX_INPUT_CHARS - 40 ? cut.slice(0, space) : cut).trim();
}

/** Every word in the catalog's searchable text, per catalog array (cached). */
const VOCABULARY = new WeakMap<CatalogRow[], Set<string>>();

function catalogVocabulary(rows: CatalogRow[], facts: FactsLookup): Set<string> {
  let vocab = VOCABULARY.get(rows);
  if (!vocab) {
    vocab = new Set<string>();
    for (const r of rows) {
      for (const field of [facts(r.slug)?.displayName?.value, r.name, r.category?.name, r.primaryUse, r.primaryUseCases, r.description]) {
        for (const w of words(field)) vocab.add(w);
      }
    }
    VOCABULARY.set(rows, vocab);
  }
  return vocab;
}

/**
 * Query spelling: words that match nothing in the catalog are corrected
 * toward the curated task vocabulary (names.ts correctWord). Returns the
 * corrected text and each correction, for the match reasons.
 */
function correctSpelling(task: string, rows: CatalogRow[], facts: FactsLookup) {
  const vocab = catalogVocabulary(rows, facts);
  const corrections: { from: string; to: string }[] = [];
  const text = task.replace(/[\p{L}\p{N}]+/gu, (token) => {
    const [w] = words(token);
    if (!w || STOP.has(w) || WEAK.has(w)) return token;
    const fixed = correctWord(w, vocab);
    if (!fixed) return token;
    corrections.push({ from: token, to: fixed });
    return fixed;
  });
  return { text, corrections };
}

type Scored = {
  row: CatalogRow;
  score: number;
  reasons: Set<string>;
  /** How the row relates to the named tool ("alternative to X"), if any. */
  relation: Relation | null;
  /**
   * Matched on more than one stray query word: a task tag, a phrase, a
   * relation to the named tool, a word that is itself a named task, or at
   * least two distinct query words.
   */
  strong: boolean;
  /** A task tag, name, primary-use or named-tool match: may take the top 3. */
  job: boolean;
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
  let strong = false;
  let job = false;

  const tagList = tagsOf(row);
  const tags = new Set(tagList);
  for (const { task } of queryTasks) {
    if (!tags.has(task)) continue;
    const main = task === tagList[0] && !isGenericTask(task);
    score += (isGenericTask(task) ? GENERIC_TASK_WEIGHT : TASK_WEIGHT) + (main ? MAIN_TASK_BONUS : 0);
    reasons.add(`task: ${taskLabel(task)} (curated tag${main ? ", its main job" : ""})`);
    if (!isGenericTask(task)) strong = true;
    job = true;
  }

  const rel = target ? relationTo(target, row, facts) : null;
  if (rel) {
    strong = true;
    job = true;
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
  const jobField = (label: string) => label === "name" || label === "primary use";

  const phrases = new Set([
    ...query.phrases,
    ...queryTasks.map((t) => t.phrase).filter((p) => p.includes(" ")),
  ]);
  for (const phrase of phrases) {
    for (const [label, text, weight] of fields) {
      if (hasPhrase(text, phrase)) {
        score += weight * PHRASE_MULTIPLIER;
        reasons.add(`"${phrase}" in ${label}`);
        strong = true;
        if (jobField(label)) job = true;
      }
    }
  }

  const matchedWords = new Set<string>();
  for (const word of useWeak ? [...query.strong, ...query.weak] : query.strong) {
    for (const [label, text, weight] of fields) {
      if (text.set.has(word)) {
        score += weight;
        reasons.add(`"${word}" in ${label}${WEAK.has(word) ? " (loose match)" : ""}`);
        matchedWords.add(word);
        if (jobField(label) && !WEAK.has(word)) job = true;
      }
    }
  }
  // Two distinct query words, or one word that is itself a task the search
  // names ("transcription" in "meeting transcription"): the text names the job.
  const taskWords = queryTasks
    .filter((t) => !isGenericTask(t.task))
    .map((t) => t.phrase)
    .filter((p) => !p.includes(" "));
  if (matchedWords.size >= 2 || taskWords.some((w) => matchedWords.has(w))) strong = true;

  return { row, score, reasons, relation: rel, strong, job };
}

function budgetTiers(budget: SearchToolsInput["budget"]): string[] | null {
  switch (budget) {
    case "free":
      return costTiersForBudget("free");
    case "high":
      return costTiersForBudget("enterprise");
    default:
      return null; // "low"/"medium" check prices (budgetFit); "any" or unset: no filter
  }
}

/** Lowest paid plan per month in USD, from the same plan rows the page shows; null when unknown. */
function monthlyPrice(row: CatalogRow, facts: ToolFacts | undefined): { amount: number; text: string } | null {
  const plan = publicToolCore(row, facts).lowest_paid;
  if (!plan || plan.amount === null || plan.currency !== "USD") return null;
  if (plan.period === "month" || plan.period === "seat_month") return { amount: plan.amount, text: plan.price_text };
  if (plan.period === "year") return { amount: Math.round((plan.amount / 12) * 100) / 100, text: `${plan.price_text} (/12 per month)` };
  return null;
}

type Fit = { fits: boolean; drop?: boolean; reason: string };

/** Budget "low" / "medium": a free plan or a lowest monthly price under the cap. */
function budgetFit(row: CatalogRow, facts: ToolFacts | undefined, budget: "low" | "medium"): Fit {
  const cap = BUDGET_CAPS[budget];
  if (hasFreeTier(row, facts) > 0) return { fits: true, reason: `free plan fits a ${budget} budget` };
  const price = monthlyPrice(row, facts);
  if (!price) {
    return { fits: false, reason: `price not listed, so it could not be checked against a ${budget} budget (up to $${cap}/mo); ranked lower` };
  }
  if (price.amount <= cap) return { fits: true, reason: `lowest paid plan ${price.text} fits a ${budget} budget (up to $${cap}/mo)` };
  return { fits: false, drop: true, reason: `lowest paid plan ${price.text} is above a ${budget} budget` };
}

const PLATFORM_WORDS: Record<NonNullable<SearchToolsInput["platform_type"]>, RegExp> = {
  web: /\b(?:web|browser|online|chrome)\b/i,
  mobile: /\b(?:mobile|ios|android|iphone|ipad)\b/i,
  desktop: /\b(?:desktop|mac|macos|windows|linux)\b/i,
};

function platformFit(row: CatalogRow, facts: ToolFacts | undefined, platform: NonNullable<SearchToolsInput["platform_type"]>): Fit {
  const listed = [...row.platformType, ...(facts?.platforms?.value ?? [])].map((p) => p.replace(/[_-]/g, " "));
  const fits = listed.some((p) => PLATFORM_WORDS[platform].test(p)) || (platform === "mobile" && row.hasMobileApp);
  return fits
    ? { fits, reason: `available on ${platform}` }
    : { fits, reason: `no ${platform} version listed; ranked lower` };
}

const EVIDENCE: Record<string, number> = { verified: 2, unverified: 1, catalog_only: 0 };

function evidenceOf(row: CatalogRow, facts: FactsLookup): number {
  return EVIDENCE[freeTierOf(row, facts(row.slug)).verification] ?? 0;
}

type Ranked = {
  row: CatalogRow;
  score: number;
  reasons: string[];
  alt: AlternativeRank | null;
  misfits: number;
  job: boolean;
  evidence: number;
  fallback: boolean;
};

function compareRanked(a: Ranked, b: Ranked): number {
  return (
    a.misfits - b.misfits ||
    (a.alt && b.alt ? compareAlternativeRank(a.alt, b.alt) : 0) ||
    b.score - a.score ||
    b.evidence - a.evidence ||
    a.row.slug.localeCompare(b.row.slug)
  );
}

/** Top-3 gate: slot by slot, prefer the first job-matching tool in the same fit tier. */
function gateTopSlots(sorted: Ranked[]): Ranked[] {
  const rest = [...sorted];
  const out: Ranked[] = [];
  while (out.length < GATED_SLOTS && rest.length) {
    const lead = rest[0];
    const pick = lead.job ? 0 : rest.findIndex((r) => r.job && r.misfits <= lead.misfits);
    out.push(rest.splice(pick >= 0 ? pick : 0, 1)[0]);
  }
  return [...out, ...rest];
}

/** Slugs in TASK_TAGS order for a task (the curated order is the starter order). */
function taggedInOrder(task: TaskId): string[] {
  return Object.entries(TASK_TAGS)
    .filter(([, tags]) => tags.includes(task))
    .map(([slug]) => slug);
}

export function searchTools(
  input: SearchToolsInput,
  rows: CatalogRow[],
  facts: FactsLookup,
): SearchToolsOutput {
  const tiers = budgetTiers(input.budget);
  const priced = input.budget === "low" || input.budget === "medium" ? input.budget : null;
  const skill = input.skill_level ? SKILL_RANK[input.skill_level] : undefined;
  const searched = truncateTask(input.task);
  const truncated = searched.length < input.task.trim().length;
  const { text: task, corrections } = correctSpelling(searched, rows, facts);
  // Price words in the text count only when no budget was passed; they
  // re-rank, they never filter (only budget:"free" filters).
  const priceIntent = input.budget === undefined ? detectPriceIntent(task) : null;

  const named = namedTarget(task, rows, facts);
  const target = named?.row;
  const targetWords = new Set(
    target ? [target.name, facts(target.slug)?.displayName?.value, named.candidate].flatMap((n) => words(n)) : [],
  );
  const negated = negatedWords(task);
  const query = parseQuery(task, new Set([...targetWords, ...negated]));
  // Task phrases may contain filler words ("find a job"), so match the full
  // text; a task named only by negated words ("without coding") is dropped.
  const queryTasks = detectTasks(matchText(task)).filter(
    (t) => !t.phrase.split(" ").every((w) => negated.has(w) || STOP.has(w)),
  );

  const eligible = rows
    .filter((row) => !isDiscontinued(facts(row.slug)))
    .filter((row) => row.slug !== target?.slug) // "alternative to X" never returns X
    .filter((row) => !tiers || tiers.includes(row.costTier.toUpperCase()))
    .filter((row) => !priced || !budgetFit(row, facts(row.slug), priced).drop);

  const relevance = (useWeak: boolean) =>
    eligible.map((row) => scoreRow(row, facts, query, queryTasks, target, useWeak));
  let matched = relevance(false).filter((s) => s.score > 0);
  // Only filler-ish words matched anywhere: fall back to them, and say so.
  const looseOnly = matched.length === 0 && query.weak.length > 0;
  if (looseOnly) matched = relevance(true).filter((s) => s.score > 0);
  // Relevance threshold: in a multi-word search, a tool that matched just one
  // stray word, with no task tag, phrase or named-tool relation, is noise
  // ("search" alone for "job search") whenever stronger matches exist. When
  // nothing matched strongly, keep the single-word hits as best effort.
  const multiWord = query.strong.length + query.weak.length >= 2;
  if (multiWord && matched.some((s) => s.strong)) matched = matched.filter((s) => s.strong);

  const freeIntent = priceIntent === "free" || input.budget === "free";
  const spelling = corrections.map((c) => `spelling: ${c.from} → ${c.to}`);
  const namedReason =
    named?.resolution ? `named tool: "${named.candidate}" read as ${facts(named.row.slug)?.displayName?.value ?? named.row.name} (${named.resolution})` : null;

  /** Fit tiers and filter reasons, shared by direct and fallback items. */
  const fitOf = (row: CatalogRow, reasons: Set<string>) => {
    const f = facts(row.slug);
    let misfits = 0;
    if (skill !== undefined) {
      const level = DIFFICULTY_RANK[row.difficultyLevel.toUpperCase()] ?? 0;
      if (level > skill) {
        misfits++;
        reasons.add(`difficulty ${row.difficultyLevel.toLowerCase()} is above ${input.skill_level}; ranked lower`);
      } else {
        reasons.add(`difficulty fits ${input.skill_level}`);
      }
    }
    if (input.platform_type) {
      const fit = platformFit(row, f, input.platform_type);
      if (!fit.fits) misfits++;
      reasons.add(fit.reason);
    }
    if (priced) {
      const fit = budgetFit(row, f, priced);
      if (!fit.fits) misfits++;
      reasons.add(fit.reason);
    } else if (tiers) {
      reasons.add(`cost tier ${row.costTier.toLowerCase()} fits budget`);
    }
    return misfits;
  };

  const direct: Ranked[] = matched.map(({ row, score, reasons, relation, job }) => {
    for (const s of spelling) reasons.add(s);
    if (namedReason && relation) reasons.add(namedReason);
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
    const misfits = fitOf(row, reasons);
    return {
      row,
      score,
      reasons: [...reasons],
      alt: target ? alternativeRank(relation, freeIntent ? hasFreeTier(row, facts(row.slug)) : 0) : null,
      misfits,
      job,
      evidence: evidenceOf(row, facts),
      fallback: false,
    };
  });
  const ranked = gateTopSlots(direct.sort(compareRanked));

  // Labelled fallback: a starter set when the search names no topic, or a
  // top-up from the leading match's category when direct matches are thin.
  const noTopic = !target && query.strong.length === 0 && query.weak.length === 0 && queryTasks.length === 0;
  const limit = clampLimit(input.limit);
  let fallback: "starter" | "top_up" | null = null;
  let fallbackItems: Ranked[] = [];
  const asFallback = (row: CatalogRow, reason: string): Ranked => {
    const reasons = new Set([reason]);
    const misfits = fitOf(row, reasons);
    return { row, score: 0, reasons: [...reasons], alt: null, misfits, job: false, evidence: evidenceOf(row, facts), fallback: true };
  };
  const verifiedEligible = eligible.filter((r) => freeTierOf(r, facts(r.slug)).verification === "verified");
  if (noTopic) {
    const order = taggedInOrder("chatbot");
    fallback = "starter";
    fallbackItems = verifiedEligible
      .filter((r) => order.includes(r.slug))
      .map((r) => asFallback(r, STARTER_REASON))
      .sort((a, b) => a.misfits - b.misfits || order.indexOf(a.row.slug) - order.indexOf(b.row.slug));
  } else if (ranked.length > 0 && ranked.length < THIN_RESULTS) {
    // Inferred category = the leading match's. A neighbour must also share a
    // curated task with the search or the leading match, so a thin "remove
    // image background" is not padded with unrelated sales tools.
    const lead = ranked[0].row;
    const category = lead.category;
    const have = new Set(ranked.map((r) => r.row.slug));
    const jobs = new Set<string>([...queryTasks.map((t) => t.task), ...tagsOf(lead)]);
    if (category) {
      fallbackItems = verifiedEligible
        .filter((r) => r.category?.slug === category.slug && !have.has(r.slug) && tagsOf(r).some((t) => jobs.has(t)))
        .map((r) => asFallback(r, `fallback: popular verified tool in ${category.name}, not a direct match`))
        .sort((a, b) => a.misfits - b.misfits || a.row.slug.localeCompare(b.row.slug))
        .slice(0, THIN_RESULTS - ranked.length);
    }
    if (fallbackItems.length) fallback = "top_up";
  }

  const results = [...ranked, ...fallbackItems].slice(0, limit).map((s) => ({
    ...toPlatformRef(s.row, facts(s.row.slug)),
    match_reasons: s.reasons,
    ...(s.fallback ? { fallback: true } : {}),
  }));

  const notes: string[] = [];
  if (truncated) notes.push(`Only the first ${MAX_INPUT_CHARS} characters of your request were searched.`);
  if (corrections.length) notes.push(`Spelling corrected: ${corrections.map((c) => `${c.from} → ${c.to}`).join(", ")}.`);
  if (results.length === 0) notes.push("No Launchpad HQ tools matched; try a broader task or remove filters.");
  else if (fallback === "starter") {
    notes.push("Your request names no task, so these are popular starter tools (labelled fallback), not direct matches; name a task (for example 'cover letter' or 'logo') for better results.");
  } else {
    if (looseOnly) notes.push("Only loose word matches; name the task (for example 'cover letter' or 'logo') for better results.");
    if (fallback === "top_up") {
      notes.push(`Only ${ranked.length} direct match${ranked.length === 1 ? "" : "es"}; the rest are popular verified tools from the same category, labelled fallback, not direct matches.`);
    }
  }
  if (results.some((r) => r.stale)) notes.push("Some prices are older than 90 days; confirm on the vendor's site.");

  return {
    query: input.task,
    results,
    total_matches: ranked.length,
    note: notes.length ? notes.join(" ") : null,
    fallback,
    corrected_query: corrections.length ? task : null,
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
  const didYouMean: { input: string; suggestions: Suggestion[] }[] = [];
  const seen = new Set<string>();
  for (const query of input.platforms) {
    const res = resolveTool(query, rows, facts);
    const row = res.row;
    if (!row) {
      notFound.push(query);
      if (res.suggestions.length) didYouMean.push({ input: query, suggestions: res.suggestions });
      continue;
    }
    if (seen.has(row.slug)) continue;
    seen.add(row.slug);
    const f = facts(row.slug);
    items.push({
      ...toPlatformRef(row, f),
      ...resolvedFields(query, res),
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
    ...(didYouMean.length ? { did_you_mean: didYouMean } : {}),
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
  const res = resolveTool(input.platform, rows, facts);
  const row = res.row;
  if (!row) throw notInCatalog(input.platform, res.suggestions);
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
  const ref = { ...toPlatformRef(row, f), ...resolvedFields(input.platform, res) };
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
  const res = resolveTool(input.platform, rows, facts);
  const target = res.row;
  if (!target) throw notInCatalog(input.platform, res.suggestions);

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

  const forRef = { ...toPlatformRef(target, facts(target.slug)), ...resolvedFields(input.platform, res) };
  return {
    for: forRef,
    alternatives,
    data_as_of: newest([forRef.as_of, ...alternatives.map((a) => a.as_of)]),
    attribution: ATTRIBUTION,
  };
}
