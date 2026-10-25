import { toPublicClaudeVsGpt } from "@/lib/public-data/content";
import { feedJson, feedNotFound, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";

// /models/compare/claude-vs-gpt as JSON. DB-backed for the catalog tools.
export const dynamic = "force-dynamic";

export function GET() {
  return withFeedErrors(async () => {
    const feed = await loadFeed();
    const page = toPublicClaudeVsGpt(feed.tools);
    return page ? feedJson(page) : feedNotFound();
  });
}

export const HEAD = GET;
