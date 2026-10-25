import { feedJson } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { toPublicIndex } from "@/lib/public-data/serialize";

// DB-backed (counts): never prerender at build. The CDN caches it hourly.
export const dynamic = "force-dynamic";

export async function GET() {
  const feed = await loadFeed();
  return feedJson(toPublicIndex(feed.catalog()));
}

export const HEAD = GET;
