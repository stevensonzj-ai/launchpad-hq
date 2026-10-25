import { getToolFacts } from "@/data/facts";
import { feedJson, feedNotFound, feedRedirect, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { resolveToolFile, toPublicTool } from "@/lib/public-data/serialize";

// Next 16 has no `[slug].json` segments, so the file name carries ".json".
export const dynamic = "force-dynamic";

export function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  return withFeedErrors(async () => {
    const { file } = await params;
    const feed = await loadFeed();
    const hit = resolveToolFile(file, feed.rows);
    if (hit.kind === "redirect") {
      return feedRedirect(new URL(`/data/v1/tools/${hit.slug}.json`, request.url).toString());
    }
    if (hit.kind === "not_found") return feedNotFound();
    return feedJson(toPublicTool(hit.row, getToolFacts(hit.row.slug), feed.ctx));
  });
}

export const HEAD = GET;
