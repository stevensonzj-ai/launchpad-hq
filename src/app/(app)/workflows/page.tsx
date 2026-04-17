import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { getAllWorkflows } from "@/data/workflows";
import { WorkflowCard } from "@/components/workflows/workflow-card";
import { getPlatformSlugSet } from "@/lib/platform-slugs";

export const metadata = {
  title: "Workflow templates | Launchpad HQ",
  description: "Optimal, hybrid, and budget AI stacks for common jobs — blogging, video, code, and more.",
};

export default async function WorkflowsPage() {
  const workflows = getAllWorkflows();
  const validSlugs = await getPlatformSlugSet();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/discover"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Discover
      </Link>

      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
            <Layers className="h-7 w-7 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Workflow templates</h1>
            <p className="mt-1 text-gray-400">
              Three tiers for every workflow: <span className="text-amber-200">Optimal</span>,{" "}
              <span className="text-sky-200">Hybrid</span>, and <span className="text-emerald-200">Budget</span>.
            </p>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-500">
          Pick a goal, compare stacks, then open each tool&apos;s Launchpad profile. These are starting points —
          swap tools to match your policies, region, and budget.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {workflows.map((w) => (
          <WorkflowCard key={w.slug} workflow={w} validSlugs={validSlugs} />
        ))}
      </div>
    </div>
  );
}
