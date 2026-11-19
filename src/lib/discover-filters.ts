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

import { DISCOVER_POPULAR_SLUGS } from "@/data/discover-popular";

export type SortMode = "popular" | "alpha" | "recent";

export function normalizeSort(value: string | undefined): SortMode {
  if (value === "alpha" || value === "recent") return value;
  return "popular";
}

/**
 * Prisma `orderBy` for Discover — keep this the only ranking contract.
 * "popular" reads by name (the same cache entry as A–Z); the editorial
 * popular order is applied in memory afterwards by `applyPopularOrder`, so
 * the cached read never depends on the popular list or a page number.
 */
export function discoverOrderBy(sort: SortMode) {
  if (sort === "recent") return [{ createdAt: "desc" as const }];
  return [{ name: "asc" as const }];
}

export type DiscoverSortable = {
  slug: string;
  name: string;
  /** Not used for ordering any more (Popular is the editorial list). */
  featured?: boolean;
  createdAt: Date;
};

/**
 * Popular order: tools in `popular` first, in list order; every other tool
 * after, in the order given (by name from the cached read). Stable.
 */
export function applyPopularOrder<T extends { slug: string }>(
  platforms: readonly T[],
  popular: readonly string[] = DISCOVER_POPULAR_SLUGS,
): T[] {
  const rank = new Map(popular.map((slug, index) => [slug, index]));
  const listed = platforms.filter((p) => rank.has(p.slug));
  listed.sort((a, b) => rank.get(a.slug)! - rank.get(b.slug)!);
  return [...listed, ...platforms.filter((p) => !rank.has(p.slug))];
}

/** In-memory sort matching `discoverOrderBy` + `applyPopularOrder` (used by tests and must stay aligned). */
export function sortDiscoverCatalog<T extends DiscoverSortable>(
  platforms: readonly T[],
  sort: SortMode,
  popular: readonly string[] = DISCOVER_POPULAR_SLUGS,
): T[] {
  const copy = [...platforms];
  const clauses = discoverOrderBy(sort);
  copy.sort((a, b) => {
    for (const clause of clauses) {
      const [key, direction] = Object.entries(clause)[0] as [
        "name" | "createdAt",
        "asc" | "desc",
      ];
      const av = a[key];
      const bv = b[key];
      let cmp = 0;
      if (typeof av === "string" && typeof bv === "string") {
        cmp = av.localeCompare(bv);
      } else if (av instanceof Date && bv instanceof Date) {
        cmp = av.getTime() - bv.getTime();
      }
      if (cmp !== 0) return direction === "desc" ? -cmp : cmp;
    }
    return 0;
  });
  return sort === "popular" ? applyPopularOrder(copy, popular) : copy;
}

/** Tools per Discover page. */
export const DISCOVER_PAGE_SIZE = 24;

export function discoverPageCount(total: number, pageSize = DISCOVER_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

/**
 * The page to render for a raw `?page=` value. Anything that is not a plain
 * positive integer is page 1; past the end clamps to the last page.
 */
export function clampDiscoverPage(raw: string | undefined, total: number, pageSize = DISCOVER_PAGE_SIZE): number {
  const last = discoverPageCount(total, pageSize);
  if (!raw || !/^\d+$/.test(raw.trim())) return 1;
  const n = Number(raw.trim());
  if (!Number.isSafeInteger(n) || n < 1) return n < 1 ? 1 : last;
  return Math.min(n, last);
}

/** 0-based [start, end) slice bounds for a page. */
export function discoverPageBounds(page: number, total: number, pageSize = DISCOVER_PAGE_SIZE) {
  const start = Math.min((page - 1) * pageSize, total);
  return { start, end: Math.min(start + pageSize, total) };
}

/** A–Z bucket for a tool name: its first letter, or "#" for anything else. */
export function discoverLetter(name: string): string {
  const first = name[0]?.toUpperCase() ?? "#";
  return /^[A-Z]$/.test(first) ? first : "#";
}

/** For an A–Z-ordered list: each letter's bucket → the page holding its first tool. */
export function letterPages(
  platforms: readonly { name: string }[],
  pageSize = DISCOVER_PAGE_SIZE,
): Map<string, number> {
  const pages = new Map<string, number>();
  platforms.forEach((p, index) => {
    const letter = discoverLetter(p.name);
    if (!pages.has(letter)) pages.set(letter, Math.floor(index / pageSize) + 1);
  });
  return pages;
}

/**
 * Canonical path for a Discover URL. Only the unfiltered, unsearched,
 * default-sort list at page 2+ is self-canonical; everything else
 * (filters, search, sort, with or without a page) points at /discover.
 */
export function discoverCanonicalPath(
  params: { q?: string; category?: string; cost?: string; difficulty?: string; mobile?: string; sort?: string },
  page: number,
): string {
  const narrowed = [params.q?.trim(), params.category, params.cost, params.difficulty, params.mobile].some(Boolean);
  const sorted = Boolean(params.sort) && normalizeSort(params.sort) !== "popular";
  if (narrowed || sorted || page <= 1) return "/discover";
  return `/discover?page=${page}`;
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
  page?: number;
}) {
  const sp = new URLSearchParams();
  if (parts.q?.trim()) sp.set("q", parts.q.trim().slice(0, 120));
  if (parts.category) sp.set("category", parts.category);
  if (parts.cost) sp.set("cost", parts.cost);
  if (parts.difficulty) sp.set("difficulty", parts.difficulty);
  if (parts.mobile) sp.set("mobile", parts.mobile);
  // "popular" is the default — omit from URL so default URLs stay clean.
  if (parts.sort && parts.sort !== "popular") sp.set("sort", parts.sort);
  // Page 1 keeps the clean URL; filter changes (which omit page) reset to 1.
  if (parts.page && parts.page > 1) sp.set("page", String(parts.page));
  const s = sp.toString();
  return s ? `?${s}` : "";
}
