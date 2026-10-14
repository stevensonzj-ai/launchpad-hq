import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import type { WorkflowTemplate } from "@/data/workflows";

export function WorkflowCard({
  workflow,
  compact,
}: {
  workflow: WorkflowTemplate;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/workflows/${workflow.slug}`}
      className="group block rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-orange-500/40 hover:bg-gray-900"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Layers className="h-5 w-5 shrink-0 text-orange-400" />
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400">
            {workflow.title}
          </h3>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-400" />
      </div>
      <p className={`text-sm text-gray-400 ${compact ? "line-clamp-2" : "line-clamp-3"}`}>
        {workflow.description}
      </p>
      {workflow.costRange ? (
        <p className="mt-3 text-xs leading-relaxed text-gray-500">{workflow.costRange}</p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {workflow.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] text-gray-400">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
