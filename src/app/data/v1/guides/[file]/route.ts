import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { resolveGuideSlug, toPublicGuide } from "@/lib/public-data/content";
import { feedJson, feedNotFound, feedRedirect, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { jsonFileSlug } from "@/lib/public-data/serialize";
import { FEED_READ_ONLY } from "@/lib/public-data/read-only";

export const dynamic = "force-dynamic";

export function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  return withFeedErrors(async () => {
    const { file } = await params;
    const hit = resolveGuideSlug(jsonFileSlug(file));
    if (hit.kind === "redirect") {
      return feedRedirect(new URL(`/data/v1/guides/${hit.slug}.json`, request.url).toString());
    }
    const tutorial = hit.kind === "guide" ? getStaticTutorialForPlatform(hit.slug) : undefined;
    if (!tutorial) return feedNotFound();
    const feed = await loadFeed();
    const guide = toPublicGuide(tutorial, feed.tools);
    return guide ? feedJson(guide) : feedNotFound();
  });
}

export const HEAD = GET;
export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
