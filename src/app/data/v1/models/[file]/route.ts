import { getModelFamilyBySlug } from "@/data/models";
import { toPublicModelFamily } from "@/lib/public-data/content";
import { feedJson, feedNotFound, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { jsonFileSlug } from "@/lib/public-data/serialize";

// DB-backed: the family's catalog tools carry serializer prices.
export const dynamic = "force-dynamic";

export function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  return withFeedErrors(async () => {
    const { file } = await params;
    const slug = jsonFileSlug(file);
    const family = slug ? getModelFamilyBySlug(slug) : undefined;
    if (!family) return feedNotFound();
    const feed = await loadFeed();
    return feedJson(toPublicModelFamily(family, feed.tools));
  });
}

export const HEAD = GET;
