import { feedHeaders, withFeedErrors } from "@/lib/public-data/http";
import { llmsFullInput, renderLlmsFull } from "@/lib/public-data/llms-full";
import { loadFeed } from "@/lib/public-data/load";

// DB-backed (the catalog): never prerender. The CDN caches it hourly.
export const dynamic = "force-dynamic";

export function GET() {
  // A DB failure becomes the feed's JSON 503, never cached.
  return withFeedErrors(async () => {
    const feed = await loadFeed();
    return new Response(renderLlmsFull(llmsFullInput(feed.tools)), {
      headers: feedHeaders({ "Content-Type": "text/plain; charset=utf-8" }),
    });
  });
}

export const HEAD = GET;
