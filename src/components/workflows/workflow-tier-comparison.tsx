"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import type { WorkflowTemplate, WorkflowTierId } from "@/data/workflows";
import { WorkflowToolName } from "./workflow-tool-name";
import { CopyPromptButton } from "./copy-prompt-button";

const TIER_ORDER: WorkflowTierId[] = ["budget", "hybrid", "optimal"];

const tierMeta = {
  optimal: {
    label: "Optimal",
    subtitle: "Best experience",
    bar: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    selected: "border-amber-400 bg-amber-500/15 text-amber-100",
    idle: "border-gray-700 bg-gray-900 text-gray-300",
  },
  hybrid: {
    label: "Hybrid",
    subtitle: "Balanced cost & quality",
    bar: "from-sky-500 to-blue-600",
    border: "border-sky-500/30",
    selected: "border-sky-400 bg-sky-500/15 text-sky-100",
    idle: "border-gray-700 bg-gray-900 text-gray-300",
  },
  budget: {
    label: "Budget",
    subtitle: "Free-first stack",
    bar: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    selected: "border-emerald-400 bg-emerald-500/15 text-emerald-100",
    idle: "border-gray-700 bg-gray-900 text-gray-300",
  },
} as const;

function tabId(key: WorkflowTierId) {
  return `workflow-tier-tab-${key}`;
}

function panelId(key: WorkflowTierId) {
  return `workflow-tier-panel-${key}`;
}

export function WorkflowTierComparison({
  workflow,
  validSlugs,
  tutorialSlugs,
}: {
  workflow: WorkflowTemplate;
  /** Serialized for the client boundary (Set is not passable). */
  validSlugs: string[];
  tutorialSlugs: string[];
}) {
  const [active, setActive] = useState<WorkflowTierId>("budget");
  const tabRefs = useRef<Partial<Record<WorkflowTierId, HTMLButtonElement | null>>>({});
  const valid = new Set(validSlugs);
  const tutorials = new Set(tutorialSlugs);
  const t = workflow.tiers[active];
  const meta = tierMeta[active];
  const steps = t.steps?.slice().sort((a, b) => a.order - b.order) ?? [];

  function selectTier(key: WorkflowTierId) {
    setActive(key);
    tabRefs.current[key]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, key: WorkflowTierId) {
    const i = TIER_ORDER.indexOf(key);
    let next: WorkflowTierId | undefined;
    if (event.key === "ArrowRight") {
      next = TIER_ORDER[(i + 1) % TIER_ORDER.length];
    } else if (event.key === "ArrowLeft") {
      next = TIER_ORDER[(i - 1 + TIER_ORDER.length) % TIER_ORDER.length];
    } else if (event.key === "Home") {
      next = TIER_ORDER[0];
    } else if (event.key === "End") {
      next = TIER_ORDER[TIER_ORDER.length - 1];
    }
    if (!next) return;
    event.preventDefault();
    selectTier(next);
  }

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Workflow tier"
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {TIER_ORDER.map((key) => {
          const m = tierMeta[key];
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={tabId(key)}
              aria-selected={selected}
              aria-controls={panelId(key)}
              tabIndex={selected ? 0 : -1}
              ref={(el) => {
                tabRefs.current[key] = el;
              }}
              onClick={() => selectTier(key)}
              onKeyDown={(event) => onTabKeyDown(event, key)}
              className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                selected ? m.selected : m.idle
              }`}
            >
              <p className="text-sm font-semibold">{m.label}</p>
              <p className="mt-0.5 text-xs text-gray-300">{m.subtitle}</p>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId(active)}
        aria-labelledby={tabId(active)}
        className={`overflow-hidden rounded-xl border bg-gray-900/80 ${meta.border}`}
      >
        <div className={`h-1 bg-gradient-to-r ${meta.bar}`} />
        <div className="border-b border-gray-800 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-bold text-white">{meta.label}</h2>
          <p className="text-xs text-gray-300">{meta.subtitle}</p>
          <p className="mt-1 text-sm text-gray-400">{t.tagline}</p>
          {(t.estMonthlyCost || t.timeEstimate) && (
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              {t.estMonthlyCost ? <span>{t.estMonthlyCost}</span> : null}
              {t.estMonthlyCost && t.timeEstimate ? (
                <span className="text-gray-400"> · </span>
              ) : null}
              {t.timeEstimate ? <span>{t.timeEstimate}</span> : null}
            </p>
          )}
          {t.result ? (
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              <span className="font-medium text-gray-300">Result: </span>
              {t.result}
            </p>
          ) : null}
        </div>

        {steps.length > 0 ? (
          <ol className="space-y-5 px-4 py-5 sm:px-5">
            {steps.map((step) => {
              const slug = step.toolSlug;
              const inDb = Boolean(slug && valid.has(slug));
              const hasTutorial = Boolean(slug && tutorials.has(slug));
              const displayName = step.name ?? slug ?? "Tool";
              return (
                <li key={step.order} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-700 text-xs font-semibold text-gray-200">
                    {step.order}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{step.action}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      {inDb && slug ? (
                        <Link
                          href={`/platform/${slug}`}
                          className="font-medium text-orange-400 hover:text-orange-300 hover:underline"
                        >
                          {displayName}
                        </Link>
                      ) : (
                        <span className="font-medium text-gray-300">{displayName}</span>
                      )}
                      {hasTutorial && slug ? (
                        <Link
                          href={`/platform/${slug}/guide`}
                          className="text-gray-400 hover:text-orange-300 hover:underline"
                        >
                          Tutorial
                        </Link>
                      ) : null}
                    </div>
                    {step.prompt ? (
                      <div className="mt-3 rounded-lg border border-gray-800 bg-gray-950/60 p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Prompt
                          </p>
                          <CopyPromptButton prompt={step.prompt} />
                        </div>
                        <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-gray-300">
                          {step.prompt}
                        </pre>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="flex flex-1 flex-col px-4 py-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Suggested tools
            </p>
            <ul className="space-y-3">
              {t.tools.map((tool, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-gray-400">•</span>
                  <WorkflowToolName
                    name={tool.name}
                    slug={tool.slug}
                    validSlugs={valid}
                    rationale={tool.rationale}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {t.note && (
          <p className="border-t border-gray-800 px-4 py-3 text-xs leading-relaxed text-gray-400 sm:px-5">
            {t.note}
          </p>
        )}
      </div>
    </div>
  );
}
