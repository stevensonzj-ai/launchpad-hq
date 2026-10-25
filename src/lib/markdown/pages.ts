/**
 * Path -> Markdown, for src/app/md/[[...path]]/route.ts. Loads the same
 * records the /data/v1 routes serve (loadFeed + the content builders) and
 * hands them to the pure renderers in render.ts. A path the JSON feed would
 * 404 (unknown, hidden or unlisted) is a Markdown 404 here too.
 */
import { findFreeAlternatives, resolveCompareSlug } from "@/data/compare/pages";
import { getToolFacts } from "@/data/facts";
import { CLAUDE_VS_GPT } from "@/data/models/claude-vs-gpt";
import { getModelFamilyBySlug } from "@/data/models";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { WORKFLOWS, getWorkflowBySlug } from "@/data/workflows";
import { feedComparePages, toPublicCompareIndex, toPublicComparePage } from "@/lib/public-data/compare";
import {
  feedGuides,
  resolveGuideSlug,
  toPublicClaudeVsGpt,
  toPublicGuide,
  toPublicGuideIndex,
  toPublicModelFamily,
  toPublicModelsIndex,
  toPublicWorkflow,
  toPublicWorkflowIndex,
} from "@/lib/public-data/content";
import { loadFeed } from "@/lib/public-data/load";
import { resolveToolFile, toPublicTool } from "@/lib/public-data/serialize";
import { HOME_FEATURED_WORKFLOWS } from "@/lib/site-copy";
import { absoluteUrl } from "@/lib/site";
import {
  renderAboutMarkdown,
  renderCompareIndexMarkdown,
  renderComparePageMarkdown,
  renderContactMarkdown,
  renderDevelopersMarkdown,
  renderDiscoverMarkdown,
  renderGuideIndexMarkdown,
  renderGuideMarkdown,
  renderHomeMarkdown,
  renderModelCompareMarkdown,
  renderModelFamilyMarkdown,
  renderModelsIndexMarkdown,
  renderNotFoundMarkdown,
  renderToolMarkdown,
  renderWorkflowIndexMarkdown,
  renderWorkflowMarkdown,
} from "./render";

export type MarkdownResult =
  | { status: 200; body: string; canonical: string }
  | { status: 404; body: string }
  | { status: 301; location: string };

type Feed = Awaited<ReturnType<typeof loadFeed>>;

const ok = (body: string, path: string): MarkdownResult => ({ status: 200, body, canonical: absoluteUrl(path) });
const moved = (path: string): MarkdownResult => ({ status: 301, location: absoluteUrl(path) });

/** `segments` are the public path's segments (the /md prefix already removed). */
export async function markdownForPath(
  segments: readonly string[],
  search: URLSearchParams,
  load: () => Promise<Feed> = loadFeed,
): Promise<MarkdownResult> {
  const path = `/${segments.join("/")}`;
  const notFound = (): MarkdownResult => ({ status: 404, body: renderNotFoundMarkdown(path) });
  const [top, a, b] = segments;
  const n = segments.length;

  if (n === 0) {
    const feed = await load();
    const catalog = feed.catalog();
    return ok(
      renderHomeMarkdown({
        toolCount: catalog.count,
        categories: catalog.categories,
        guideCount: feedGuides(feed.tools).length,
        workflowCount: WORKFLOWS.length,
        comparePageCount: feedComparePages(feed.tools).length,
        featuredWorkflows: toPublicWorkflowIndex(WORKFLOWS, feed.ctx.generatedAt).workflows.filter((w) =>
          HOME_FEATURED_WORKFLOWS.includes(w.slug),
        ),
      }),
      "/",
    );
  }

  if (n === 1) {
    if (top === "about") return ok(renderAboutMarkdown(), path);
    if (top === "contact") return ok(renderContactMarkdown(), path);
    if (top === "developers") return ok(renderDevelopersMarkdown(), path);
    if (top === "workflows") return ok(renderWorkflowIndexMarkdown(toPublicWorkflowIndex(WORKFLOWS, new Date().toISOString())), path);
    if (top === "models") return ok(renderModelsIndexMarkdown(toPublicModelsIndex(new Date().toISOString())), path);
    if (top === "discover") {
      const feed = await load();
      const category = search.get("category");
      return ok(renderDiscoverMarkdown(feed.catalog(), category), category ? `/discover?category=${category}` : path);
    }
    if (top === "tutorials") return ok(renderGuideIndexMarkdown(toPublicGuideIndex((await load()).tools)), path);
    if (top === "compare") return ok(renderCompareIndexMarkdown(toPublicCompareIndex((await load()).tools)), path);
    return notFound();
  }

  if (top === "platform" && n === 2) {
    const feed = await load();
    const hit = resolveToolFile(`${a}.json`, feed.rows);
    if (hit.kind === "redirect") return moved(`/platform/${hit.slug}`);
    if (hit.kind === "not_found") return notFound();
    return ok(renderToolMarkdown(toPublicTool(hit.row, getToolFacts(hit.row.slug), feed.ctx)), path);
  }

  if (top === "platform" && n === 3 && b === "guide") {
    const hit = resolveGuideSlug(a);
    if (hit.kind === "redirect") return moved(`/platform/${hit.slug}/guide`);
    const tutorial = hit.kind === "guide" ? getStaticTutorialForPlatform(hit.slug) : undefined;
    if (!tutorial) return notFound();
    const guide = toPublicGuide(tutorial, (await load()).tools);
    return guide ? ok(renderGuideMarkdown(guide), path) : notFound();
  }

  if (top === "workflows" && n === 2) {
    const workflow = getWorkflowBySlug(a);
    if (!workflow) return notFound();
    return ok(renderWorkflowMarkdown(toPublicWorkflow(workflow, (await load()).tools)), path);
  }

  if (top === "compare" && n === 2) {
    const hit = resolveCompareSlug(a);
    if (hit.kind === "redirect") return moved(`/compare/${hit.slug}`);
    if (hit.kind === "not_found" || hit.page.kind !== "head-to-head") return notFound();
    const page = toPublicComparePage(hit.page, (await load()).tools);
    return page ? ok(renderComparePageMarkdown(page), path) : notFound();
  }

  if (top === "alternatives" && n === 2) {
    const alternatives = findFreeAlternatives(a);
    if (!alternatives) return notFound();
    const page = toPublicComparePage(alternatives, (await load()).tools);
    return page ? ok(renderComparePageMarkdown(page), path) : notFound();
  }

  if (top === "models" && n === 2) {
    const family = getModelFamilyBySlug(a);
    if (!family) return notFound();
    return ok(renderModelFamilyMarkdown(toPublicModelFamily(family, (await load()).tools)), path);
  }

  if (top === "models" && n === 3 && a === "compare" && b === CLAUDE_VS_GPT.slug) {
    const page = toPublicClaudeVsGpt((await load()).tools);
    return page ? ok(renderModelCompareMarkdown(page), path) : notFound();
  }

  return notFound();
}
