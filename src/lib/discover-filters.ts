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

/** Prisma `orderBy` for Discover — keep this the only ranking contract. */
export function discoverOrderBy(sort: SortMode) {
  if (sort === "alpha") return [{ name: "asc" as const }];
  if (sort === "recent") return [{ createdAt: "desc" as const }];
  return [{ featured: "desc" as const }, { name: "asc" as const }];
}

export type DiscoverSortable = {
  name: string;
  featured: boolean;
  createdAt: Date;
};

/** In-memory sort matching `discoverOrderBy` (used by tests and must stay aligned). */
export function sortDiscoverCatalog<T extends DiscoverSortable>(
  platforms: readonly T[],
  sort: SortMode,
): T[] {
  const copy = [...platforms];
  const clauses = discoverOrderBy(sort);
  copy.sort((a, b) => {
    for (const clause of clauses) {
      const [key, direction] = Object.entries(clause)[0] as [
        keyof DiscoverSortable,
        "asc" | "desc",
      ];
      const av = a[key];
      const bv = b[key];
      let cmp = 0;
      if (typeof av === "string" && typeof bv === "string") {
        cmp = av.localeCompare(bv);
      } else if (av instanceof Date && bv instanceof Date) {
        cmp = av.getTime() - bv.getTime();
      } else {
        cmp = Number(av) - Number(bv);
      }
      if (cmp !== 0) return direction === "desc" ? -cmp : cmp;
    }
    return 0;
  });
  return copy;
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
  q?: string;
  category?: string;
  cost?: string;
  difficulty?: string;
  mobile?: string;
  sort?: string;
}) {
  const sp = new URLSearchParams();
  if (parts.q?.trim()) sp.set("q", parts.q.trim().slice(0, 120));
  if (parts.category) sp.set("category", parts.category);
  if (parts.cost) sp.set("cost", parts.cost);
  if (parts.difficulty) sp.set("difficulty", parts.difficulty);
  if (parts.mobile) sp.set("mobile", parts.mobile);
  // "popular" is the default — omit from URL so default URLs stay clean.
  if (parts.sort && parts.sort !== "popular") sp.set("sort", parts.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}
