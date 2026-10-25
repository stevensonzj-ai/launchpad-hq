import { feedJson, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";

// DB-backed: never prerender at build. The CDN caches it hourly instead.
export const dynamic = "force-dynamic";

export function GET() {
  return withFeedErrors(async () => {
    const feed = await loadFeed();
    return feedJson(feed.catalog());
  });
}

export const HEAD = GET;
