import { getWorkflowBySlug } from "@/data/workflows";
import { toPublicWorkflow } from "@/lib/public-data/content";
import { feedJson, feedNotFound, withFeedErrors } from "@/lib/public-data/http";
import { loadFeed } from "@/lib/public-data/load";
import { jsonFileSlug } from "@/lib/public-data/serialize";

// DB-backed: tool prices come from the catalog rows.
export const dynamic = "force-dynamic";

export function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  return withFeedErrors(async () => {
    const { file } = await params;
    const slug = jsonFileSlug(file);
    const workflow = slug ? getWorkflowBySlug(slug) : undefined;
    if (!workflow) return feedNotFound();
    const feed = await loadFeed();
    return feedJson(toPublicWorkflow(workflow, feed.tools));
  });
}

export const HEAD = GET;
