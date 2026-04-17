import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import type { WorkflowTemplate } from "@/data/workflows";
import { WorkflowToolName } from "@/components/workflows/workflow-tool-name";

const tierStyle = {
  optimal: "border-amber-500/40 bg-amber-500/5 text-amber-200",
  hybrid: "border-sky-500/40 bg-sky-500/5 text-sky-200",
  budget: "border-emerald-500/40 bg-emerald-500/5 text-emerald-200",
} as const;

export function WorkflowCard({
  workflow,
  compact,
  validSlugs,
}: {
  workflow: WorkflowTemplate;
  compact?: boolean;
  validSlugs: ReadonlySet<string>;
}) {
  return (
    <Link
      href={`/workflows/${workflow.slug}`}
      className="group block rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-orange-500/40 hover:bg-gray-900"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 shrink-0 text-orange-400" />
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400">{workflow.title}</h3>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-400" />
      </div>
      <p className={`text-sm text-gray-400 ${compact ? "line-clamp-2" : "line-clamp-3"}`}>{workflow.description}</p>
      {!compact && (
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {(["optimal", "hybrid", "budget"] as const).map((key) => {
            const t = workflow.tiers[key];
            return (
              <div key={key} className={`rounded-lg border px-2 py-2 text-xs ${tierStyle[key]}`}>
                <p className="font-semibold">{t.name}</p>
                <p className="mt-0.5 truncate text-[11px] opacity-90">
                  {t.tools.map((x, i) => (
                    <span key={`${key}-${i}`}>
                      {i > 0 ? " · " : null}
                      <WorkflowToolName
                        name={x.name}
                        slug={x.slug}
                        validSlugs={validSlugs}
                        disableLink
                      />
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {compact && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {workflow.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
