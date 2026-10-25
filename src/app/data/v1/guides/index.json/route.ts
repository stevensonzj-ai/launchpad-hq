import { toPublicGuideIndex } from "@/lib/public-data/content";
import { feedJson, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { FEED_READ_ONLY } from "@/lib/public-data/read-only";

// DB-backed: a guide is listed only when its tool row is.
export const dynamic = "force-dynamic";

export function GET() {
  return withFeedErrors(async () => {
    const feed = await loadFeed();
    return feedJson(toPublicGuideIndex(feed.tools));
  });
}

export const HEAD = GET;
export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
