/**
 * Discover page filter contract — shared between the server page
 * (src/app/(app)/discover/page.tsx) and the client filter bar
 * (src/app/(app)/discover/discover-filter-bar.tsx).
 *
 * The URL is the single source of truth for filter state. This module owns the
 * URL <-> filter mapping so the server (which parses and guards params) and the
 * client bar (which only emits URLs) stay in lockstep on identical option lists.
 *
 * The guards below are deliberate and were hardened in a prior pass — do not
 * "clean up" their logic. See the inline comments.
 */

export type SortMode = "popular" | "alpha" | "recent";

export function normalizeSort(value: string | undefined): SortMode {
  if (value === "alpha" || value === "recent") return value;
  return "popular";
}

// Whitelists keep arbitrary query values out of the Prisma enum filters —
// an unknown value (e.g. ?cost=banana) would otherwise throw at query time.
export const COST_TIERS = ["FREE", "FREEMIUM", "PAID", "ENTERPRISE"] as const;
export const DIFFICULTIES = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;

// The difficulty filter exposes three levels; "advanced" includes EXPERT so
// the handful of expert-rated platforms stay reachable (the quiz groups the
// two the same way).
export const DIFFICULTY_FILTERS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

// Cost filter options offered in the UI, in display order. "free-tier" is a
// synthetic value meaning "FREE or FREEMIUM" — the where-clause parser in the
// discover page handles it specially; the rest map to CostTier enum values and
// are stored lowercased in the URL (compared back via .toUpperCase()).
export const COST_FILTERS = [
  { value: "free-tier", label: "Has free tier" },
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "enterprise", label: "Enterprise" },
] as const;

// App-availability filter options.
export const MOBILE_FILTERS = [
  { value: "app", label: "Has app" },
  { value: "web", label: "Mobile web" },
] as const;

// Sort modes. "popular" is the default and is never written to the URL (see
// buildDiscoverQuery). This is a mode, not a filter — it has no "All".
export const SORT_FILTERS = [
  { value: "popular", label: "Popular" },
  { value: "alpha", label: "A–Z" },
  { value: "recent", label: "Recent" },
] as const;

export function buildDiscoverQuery(parts: {
  category?: string;
  cost?: string;
  difficulty?: string;
  mobile?: string;
  sort?: string;
}) {
  const sp = new URLSearchParams();
  if (parts.category) sp.set("category", parts.category);
  if (parts.cost) sp.set("cost", parts.cost);
  if (parts.difficulty) sp.set("difficulty", parts.difficulty);
  if (parts.mobile) sp.set("mobile", parts.mobile);
  // "popular" is the default — omit from URL so default URLs stay clean.
  if (parts.sort && parts.sort !== "popular") sp.set("sort", parts.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}
