import { resolveCompareSlug } from "@/data/compare/pages";
import { toPublicComparePage } from "@/lib/public-data/compare";
import { feedJson, feedNotFound, feedRedirect, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { jsonFileSlug } from "@/lib/public-data/serialize";
import { FEED_READ_ONLY } from "@/lib/public-data/read-only";

export const dynamic = "force-dynamic";

export function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  return withFeedErrors(async () => {
    const { file } = await params;
    const slug = jsonFileSlug(file);
    const hit = slug ? resolveCompareSlug(slug) : ({ kind: "not_found" } as const);
    // Reverse-order head-to-head: the same 301 as the HTML (compareRedirects).
    if (hit.kind === "redirect") {
      return feedRedirect(new URL(`/data/v1/compare/${hit.slug}.json`, request.url).toString());
    }
    if (hit.kind === "not_found") return feedNotFound();
    const feed = await loadFeed();
    const page = toPublicComparePage(hit.page, feed.tools);
    return page ? feedJson(page) : feedNotFound();
  });
}

export const HEAD = GET;
export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
