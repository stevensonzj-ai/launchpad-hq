/**
 * Quiz result ordering, layered on top of the keyword scorer.
 *
 * 1. Hand-set default picks (src/data/quiz-defaults.ts) lead the list, in
 *    list order, when they survive the same candidate filters as every other
 *    tool (budget cost tiers, not hidden, not discontinued). With two goals
 *    the picks alternate: goal 1's first, goal 2's first, then the rest.
 * 2. Every other tool must match a goal keyword (goalScore > 0, as before)
 *    AND sit in a category the chosen goals allow (the category guard). The
 *    guard runs on the full scored list, before the cut.
 * 3. Non-default tools follow in score order; ties break by name, then slug,
 *    so the order never depends on database row order.
 *
 * scorePlatform and rankScoredPlatforms are deliberately untouched (the
 * sponsor ordering test pins them). MCP does not use this module.
 * Pure: no Prisma, no React.
 */
import {
  GOAL_CATEGORIES,
  EXPERIENCED_ONLY_CATEGORIES,
  LOCAL_CATEGORY,
  LOCAL_CHAT,
  LOCAL_CHAT_GOALS,
  LOCAL_CODING,
  LOCAL_CODING_GOALS,
  LOCAL_IMAGE,
  LOCAL_IMAGE_GOALS,
  NEVER_ALLOWED_CATEGORIES,
  QUIZ_DEFAULTS,
  type DefaultPick,
} from "@/data/quiz-defaults";
import { QUIZ_GOAL_OPTIONS } from "./quiz-options";
import {
  scorePlatform,
  type MatchReason,
  type RecommendationInput,
  type ScoreablePlatform,
} from "./recommendations-score";

export const QUIZ_RESULT_LIMIT = 12;

export type RankableCandidate = ScoreablePlatform & {
  slug: string;
  name: string;
  category: { slug: string };
};

export type RankedRecommendation<T> = T & {
  matchScore: number;
  aboveDifficulty: boolean;
  matchReasons: MatchReason[];
  /** True for a hand-set default pick. */
  defaultPick: boolean;
  /** One plain sentence for default picks; null otherwise. */
  why: string | null;
};

/** Intermediate and advanced use the "experienced" default lists. */
export function isExperienced(experienceLevel?: string): boolean {
  return experienceLevel === "intermediate" || experienceLevel === "advanced";
}

/** A missing runtime behaves exactly like cloud: no local defaults, no local category. */
export function isLocalRuntime(input: RecommendationInput): boolean {
  return input.runtime === "local";
}

/** runtime=local default picks for one goal; empty for video, audio and automation. */
export function localPicksForGoal(goal: string): readonly DefaultPick[] {
  if ((LOCAL_CHAT_GOALS as readonly string[]).includes(goal)) return LOCAL_CHAT;
  if ((LOCAL_CODING_GOALS as readonly string[]).includes(goal)) return LOCAL_CODING;
  if ((LOCAL_IMAGE_GOALS as readonly string[]).includes(goal)) return LOCAL_IMAGE;
  return [];
}

const GOAL_LABELS: Record<string, string> = Object.fromEntries(QUIZ_GOAL_OPTIONS.map((o) => [o.id, o.label]));

/**
 * runtime=local only: a one-line notice when a chosen goal has no local
 * picks, so its results are cloud tools. Null otherwise. Wording pending
 * Zach's approval.
 */
export function localRuntimeNotice(input: RecommendationInput): string | null {
  if (!isLocalRuntime(input)) return null;
  const missing = (input.goals ?? []).filter((g) => localPicksForGoal(g).length === 0);
  if (missing.length === 0) return null;
  const names = missing.map((g) => GOAL_LABELS[g] ?? g).join(" or ");
  return `We don't list any beginner-friendly tools for ${names} that run on your own computer, so these results are cloud tools.`;
}

/** The ordered default picks for one goal, before any eligibility check. */
export function defaultPicksForGoal(goal: string, input: RecommendationInput): readonly DefaultPick[] {
  if (isLocalRuntime(input)) return localPicksForGoal(goal);
  const entry = QUIZ_DEFAULTS[goal as keyof typeof QUIZ_DEFAULTS];
  if (!entry) return [];
  return isExperienced(input.experienceLevel) ? entry.experienced : entry.beginner;
}

/**
 * Default picks for all goals, filtered to `eligible` slugs, then merged:
 * one goal keeps its order; two goals alternate (first of goal 1, first of
 * goal 2, second of goal 1, ...). Duplicates keep their first position.
 */
export function orderedDefaultPicks(
  input: RecommendationInput,
  eligible: ReadonlySet<string>,
): DefaultPick[] {
  const lists = (input.goals ?? []).map((goal) =>
    defaultPicksForGoal(goal, input).filter((p) => eligible.has(p.slug)),
  );
  const out: DefaultPick[] = [];
  const seen = new Set<string>();
  const longest = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      const pick = list[i];
      if (pick && !seen.has(pick.slug)) {
        seen.add(pick.slug);
        out.push(pick);
      }
    }
  }
  return out;
}

/** Categories a non-default tool may come from, for these answers. */
export function allowedCategories(input: RecommendationInput): Set<string> {
  const allowed = new Set<string>();
  const local = isLocalRuntime(input);
  for (const goal of input.goals ?? []) {
    // A visitor who chose local sees no cloud tools for a goal that has local picks.
    if (local && localPicksForGoal(goal).length > 0) continue;
    const key = goal as keyof typeof GOAL_CATEGORIES;
    for (const c of GOAL_CATEGORIES[key] ?? []) allowed.add(c);
    if (isExperienced(input.experienceLevel)) {
      for (const c of EXPERIENCED_ONLY_CATEGORIES[key] ?? []) allowed.add(c);
    }
  }
  // The only way local-open-source-ai is ever allowed.
  if (local) allowed.add(LOCAL_CATEGORY);
  for (const c of NEVER_ALLOWED_CATEGORIES) allowed.delete(c);
  return allowed;
}

/** Stable, explainable tie-break: name, then slug. */
export function compareByName(a: { name: string; slug: string }, b: { name: string; slug: string }): number {
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" }) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0);
}

export function rankQuizRecommendations<T extends RankableCandidate>(
  candidates: readonly T[],
  input: RecommendationInput,
  limit = QUIZ_RESULT_LIMIT,
): RankedRecommendation<T>[] {
  const bySlug = new Map(candidates.map((c) => [c.slug, c]));
  const picks = orderedDefaultPicks(input, new Set(bySlug.keys()));
  const pickSlugs = new Set(picks.map((p) => p.slug));

  const leading: RankedRecommendation<T>[] = picks.map((pick) => {
    const platform = bySlug.get(pick.slug)!;
    const parts = scorePlatform(platform, input);
    return {
      ...platform,
      matchScore: parts.score,
      // Hand-picked for this experience level, so never shown as above it.
      aboveDifficulty: false,
      matchReasons: parts.matchReasons,
      defaultPick: true,
      why: pick.why,
    };
  });

  const allowed = allowedCategories(input);
  const rest = candidates
    .filter((c) => !pickSlugs.has(c.slug) && allowed.has(c.category.slug))
    .map((platform) => ({ platform, ...scorePlatform(platform, input) }))
    .filter((s) => s.goalScore > 0)
    .sort((a, b) => b.score - a.score || compareByName(a.platform, b.platform))
    .map((s) => ({
      ...s.platform,
      matchScore: s.score,
      aboveDifficulty: s.aboveDifficulty,
      matchReasons: s.matchReasons,
      defaultPick: false,
      why: null,
    }));

  return [...leading, ...rest].slice(0, limit);
}
