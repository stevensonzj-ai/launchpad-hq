import { unstable_cache } from "next/cache";

/**
 * Shared data cache for PUBLIC catalog reads (Platform and Category rows).
 *
 * Why: every Prisma query wakes the Neon endpoint, which then bills compute
 * for ~5 idle minutes. Pages and feeds that show the same catalog to every
 * visitor read it through this cache instead, so a crawler sweep or an agent
 * session is served from Next's data cache (shared across Vercel instances)
 * and Postgres stays asleep.
 *
 * Rules:
 * - Never wrap anything user-specific: no favorites, users, sessions,
 *   auth(), cookies() or headers() inside a cached read. Callers do those
 *   reads outside, uncached.
 * - Every entry carries the `catalog` tag; per-platform reads add
 *   `platform:<slug>`. POST /api/revalidate expires them on demand.
 * - Entries live for CATALOG_REVALIDATE_SECONDS, then refresh in the
 *   background on the next read (stale-while-revalidate).
 *
 * unstable_cache is the non-Cache-Components API in Next 16 (this app does
 * not enable `cacheComponents`, so `"use cache"` is unavailable). Results are
 * JSON-serialized, so Dates come back as strings; reviveDates restores the
 * Prisma timestamp fields so callers keep their Prisma types honest.
 */
export const CATALOG_TAG = "catalog";
export const CATALOG_REVALIDATE_SECONDS = 3600;

export function platformTag(slug: string): string {
  return `platform:${slug}`;
}

/** `catalog` plus one `platform:<slug>` tag per slug, deduplicated. */
export function catalogTags(slugs: readonly string[] = []): string[] {
  return [CATALOG_TAG, ...new Set(slugs.map(platformTag))];
}

// The only DateTime columns on the cached models (Platform, Category).
const DATE_KEYS = new Set(["createdAt", "updatedAt"]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/** Turn ISO strings under createdAt/updatedAt back into Dates, recursively. */
export function reviveDates<T>(value: T): T {
  if (Array.isArray(value)) return value.map(reviveDates) as T;
  if (!isPlainObject(value)) return value;
  const out: Record<string, unknown> = {};
  for (const [key, inner] of Object.entries(value)) {
    if (DATE_KEYS.has(key) && typeof inner === "string") {
      const date = new Date(inner);
      out[key] = Number.isNaN(date.getTime()) ? inner : date;
    } else {
      out[key] = reviveDates(inner);
    }
  }
  return out as T;
}

// Thrown when unstable_cache runs outside a Next server (tsx tests, scripts).
function isMissingIncrementalCache(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith("Invariant: incrementalCache missing");
}

/**
 * Wrap a public catalog read in the shared data cache. `name` is part of the
 * cache key; the call's arguments are too (JSON-stringified), so pass only
 * small serializable values. `slugTags` adds `platform:<slug>` tags per call.
 */
export function cachedCatalogRead<A extends unknown[], R>(
  name: string,
  read: (...args: A) => Promise<R>,
  slugTags: (...args: A) => readonly string[] = () => [],
): (...args: A) => Promise<R> {
  return async (...args: A) => {
    const cached = unstable_cache(read, ["catalog", name], {
      tags: catalogTags(slugTags(...args)),
      revalidate: CATALOG_REVALIDATE_SECONDS,
    });
    try {
      return reviveDates(await cached(...args));
    } catch (error) {
      if (isMissingIncrementalCache(error)) return read(...args);
      throw error;
    }
  };
}

/**
 * Per-instance memory in front of a cached read: a warm function skips even
 * the data-cache round trip. Keep `ttlMs` short. After an on-demand
 * revalidation, a warm instance can serve its old copy for up to `ttlMs`.
 * A failed load is not stored.
 */
export function withMemoryLayer<R>(
  load: () => Promise<R>,
  ttlMs: number,
  clock: () => number = Date.now,
): () => Promise<R> {
  let entry: { value: R; loadedAt: number } | null = null;
  return async () => {
    const now = clock();
    if (entry && now - entry.loadedAt < ttlMs) return entry.value;
    const value = await load();
    entry = { value, loadedAt: now };
    return value;
  };
}
