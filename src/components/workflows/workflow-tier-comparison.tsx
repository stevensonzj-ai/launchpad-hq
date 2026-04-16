import type { WorkflowTemplate } from "@/data/workflows";
import { WorkflowToolName } from "./workflow-tool-name";

const tierHeader = {
  optimal: {
    label: "Optimal",
    subtitle: "Best experience",
    bar: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
  },
  hybrid: {
    label: "Hybrid",
    subtitle: "Balanced cost & quality",
    bar: "from-sky-500 to-blue-600",
    border: "border-sky-500/30",
  },
  budget: {
    label: "Budget",
    subtitle: "Free-first stack",
    bar: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
  },
} as const;

export function WorkflowTierComparison({ workflow }: { workflow: WorkflowTemplate }) {
  const keys = ["optimal", "hybrid", "budget"] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {keys.map((key) => {
        const t = workflow.tiers[key];
        const meta = tierHeader[key];
        return (
          <div
            key={key}
            className={`flex flex-col rounded-xl border bg-gray-900/80 ${meta.border} overflow-hidden`}
          >
            <div className={`h-1 bg-gradient-to-r ${meta.bar}`} />
            <div className="border-b border-gray-800 px-4 py-3">
              <h3 className="text-lg font-bold text-white">{meta.label}</h3>
              <p className="text-xs text-gray-500">{meta.subtitle}</p>
              <p className="mt-1 text-xs text-gray-400">{t.tagline}</p>
            </div>
            <div className="flex flex-1 flex-col px-4 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">Suggested tools</p>
              <ul className="space-y-2">
                {t.tools.map((tool, i) => (
                  <li key={i} className="flex items-baseline gap-2 text-sm text-gray-300">
                    <span className="text-gray-600">•</span>
                    <WorkflowToolName name={tool.name} slug={tool.slug} />
                  </li>
                ))}
              </ul>
              {t.note && (
                <p className="mt-4 border-t border-gray-800 pt-3 text-xs leading-relaxed text-gray-500">{t.note}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
