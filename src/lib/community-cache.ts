import { revalidateTag, unstable_cache } from "next/cache";
import { cacheGeneration } from "@/lib/catalog-cache";
import { COMMUNITY_REVALIDATE_SECONDS } from "@/lib/community-lists";

/**
 * Next's shared data cache for the approved prompt/discussion lists
 * (src/lib/community-lists.ts). Same rules as catalog-cache.ts: nothing
 * user-specific inside, keys carry the deployment generation, and outside a
 * Next server (tsx tests, scripts) the read runs uncached.
 */

// Thrown when unstable_cache runs outside a Next server.
function isMissingIncrementalCache(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith("Invariant: incrementalCache missing");
}

export async function cachedCommunityRead<R>(keyParts: string[], tags: string[], read: () => Promise<R>): Promise<R> {
  const cached = unstable_cache(read, [cacheGeneration(), ...keyParts], {
    tags,
    revalidate: COMMUNITY_REVALIDATE_SECONDS,
  });
  try {
    return await cached();
  } catch (error) {
    if (!isMissingIncrementalCache(error)) throw error;
    return read();
  }
}

/** Expire a tag now (route handlers): the next read refetches instead of serving stale. */
export function expireTag(tag: string): void {
  revalidateTag(tag, { expire: 0 });
}
