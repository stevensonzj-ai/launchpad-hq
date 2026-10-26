import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkflowBySlug } from "@/data/workflows";
import { WorkflowTierComparison } from "@/components/workflows/workflow-tier-comparison";
import { getPlatformSlugSet } from "@/lib/platform-slugs";
import { listRegisteredTutorials } from "@/data/tutorials";
import { publicPageMetadata, withFeedAlternate } from "@/lib/seo-metadata";
import { workflowPlatformSlugs, workflowToolDisplayName } from "@/lib/related-links";
import { CatalogLinkList } from "@/components/seo/catalog-link-list";
import { toWorkflowView } from "@/lib/public-data/content-view";
import { loadFeed } from "@/lib/public-data/load";

// Rendered per request, like the guide and platform pages: tool prices
// come from the catalog DB, and the build must not depend on DB access
// (no prerender, so a build can't fail on Neon or bake in stale prices).
// Catalog reads come from the shared catalog cache (loadCatalog, getPlatformSlugSet).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWorkflowBySlug(slug);
  if (!w) return { title: "Workflow | Launchpad HQ" };
  return withFeedAlternate(
    publicPageMetadata({
      title: `${w.title} workflow | Launchpad HQ`,
      description: w.description,
      path: `/workflows/${w.slug}`,
    }),
    `/workflows/${w.slug}.json`,
  );
}

export default async function WorkflowDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) notFound();

  const validSlugs = await getPlatformSlugSet();
  const tutorialSlugs = listRegisteredTutorials().map((t) => t.platformSlug);
  // Same view as /data/v1/workflows/{slug}.json: tokens filled, prices from the catalog.
  const view = toWorkflowView(workflow, (await loadFeed()).tools);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/workflows"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All workflows
      </Link>

      <header className="mb-10">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-orange-400">Workflow</p>
        <h1 className="text-3xl font-bold text-white">{workflow.title}</h1>
        <p className="mt-3 max-w-3xl text-lg text-gray-400">{workflow.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {workflow.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <WorkflowTierComparison
        workflow={view.workflow}
        prices={view.prices}
        validSlugs={[...validSlugs]}
        tutorialSlugs={tutorialSlugs}
      />

      <CatalogLinkList
        title="Platforms in this workflow"
        items={workflowPlatformSlugs(workflow)
          .filter((slug) => validSlugs.has(slug))
          .map((slug) => ({
            href: `/platform/${slug}`,
            label: workflowToolDisplayName(workflow, slug),
          }))}
      />

      <p className="mt-10 text-center text-sm text-gray-600">
        Find more tools in{" "}
        <Link href="/discover" className="text-orange-400 hover:underline">
          Discover
        </Link>
        .
      </p>
    </div>
  );
}
