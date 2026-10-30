/**
 * Input limits for public and signed-in API routes (security review G4, G9,
 * G11, G12). Pure: no Prisma or Next imports, so it is unit-tested directly.
 */

/** Longest search text used for a lookup or a cache key. Same as Discover. */
export const MAX_SEARCH_QUERY_CHARS = 120;

/**
 * Trim, collapse whitespace and lowercase a search query, then cap it, so
 * "ChatGPT", " chatgpt " and "CHATGPT  " share one cache entry. Lookups are
 * case-insensitive, so lowercasing changes no results.
 */
export function normalizeSearchQuery(q: string | null | undefined): string {
  return (q ?? "").replace(/\s+/g, " ").trim().toLowerCase().slice(0, MAX_SEARCH_QUERY_CHARS).trim();
}

/** Parse an integer query param and clamp it; garbage gives the fallback. */
export function clampInt(value: string | null | undefined, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export const PLATFORMS_MAX_LIMIT = 50;
export const PLATFORMS_MAX_PAGE = 1000;

/** Largest quiz answers object accepted, as UTF-8 JSON bytes. */
export const MAX_QUIZ_JSON_BYTES = 8 * 1024;

export function jsonByteLength(value: unknown): number {
  return new TextEncoder().encode(JSON.stringify(value) ?? "").length;
}

/** Community posts (prompts, discussions, replies) one user may create per rolling 24 hours. */
export const DAILY_POST_LIMIT = 20;

export function isOverDailyPostLimit(postsInLast24h: number): boolean {
  return postsInLast24h >= DAILY_POST_LIMIT;
}

/** True only for an absolute http: or https: URL. */
export function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
