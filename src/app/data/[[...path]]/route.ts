import { FEED_INDEX_URL, feedNotFound, feedRedirect } from "@/lib/public-data/http";
import { resolveDataFallback } from "@/lib/public-data/fallback";

/**
 * Everything under /data that no feed route matched. Without this, Next
 * renders its HTML not-found page, which 500s here because /data is outside
 * the Clerk middleware matcher (src/proxy.ts). Bare /data and /data/v1 go
 * to the index; anything else is the feed's JSON 404.
 */
function handler(_request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  return params.then(({ path }) =>
    resolveDataFallback(path ?? []) === "index" ? feedRedirect(FEED_INDEX_URL, 308) : feedNotFound(),
  );
}

export { handler as GET, handler as HEAD, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
