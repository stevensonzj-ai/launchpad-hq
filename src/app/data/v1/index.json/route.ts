import { feedJson, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { toPublicIndex } from "@/lib/public-data/serialize";
import { FEED_READ_ONLY } from "@/lib/public-data/read-only";

// DB-backed (counts): never prerender at build. The CDN caches it hourly.
export const dynamic = "force-dynamic";

export function GET() {
  return withFeedErrors(async () => {
    const feed = await loadFeed();
    return feedJson(toPublicIndex(feed.catalog()));
  });
}

export const HEAD = GET;
export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
