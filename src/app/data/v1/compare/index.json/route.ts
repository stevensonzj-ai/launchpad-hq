import { toPublicCompareIndex } from "@/lib/public-data/compare";
import { feedJson, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";

// DB-backed (a page drops when a tool is hidden or missing): never prerender.
export const dynamic = "force-dynamic";

export function GET() {
  return withFeedErrors(async () => {
    const feed = await loadFeed();
    return feedJson(toPublicCompareIndex(feed.tools));
  });
}

export const HEAD = GET;
