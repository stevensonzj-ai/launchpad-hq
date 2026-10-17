import { FactCite } from "@/components/platforms/fact-cite";
import { TruncatedValue } from "@/components/platforms/truncated-value";
import { DIFFICULTY_LABEL, PRIVACY_LEVEL_LABEL } from "@/lib/labels";
import { stripInlineCitations } from "@/lib/platform-display";
import type { Fact } from "@/data/facts/types";

export type TechnicalDetailRow = {
  label: string;
  value: string;
  fact?: Pick<Fact<unknown>, "sourceUrl" | "checkedAt" | "status" | "note"> | null;
  truncate?: boolean;
  showNote?: boolean;
};

type PlatformTechnicalDetailsProps = {
  difficultyLevel: string;
  privacyLevel: string;
  timeToProductivity: string | null;
  learningCurve: string | null;
  offlineCapable: boolean;
  apiAvailable: boolean;
  languageSupport: string | null;
  keyIntegrations: string | null;
  upgradeTriggers: string | null;
  modelsRow?: {
    label: string;
    value: string;
    fact?: Fact<string[]>;
    /** Opt-in: only Meta AI's models distinction note is shown publicly. */
    showNote?: boolean;
  };
};

export function buildTechnicalDetailRows(
  props: PlatformTechnicalDetailsProps,
): TechnicalDetailRow[] {
  const rows: TechnicalDetailRow[] = [
    { label: "Offline", value: props.offlineCapable ? "Yes" : "No" },
    { label: "API", value: props.apiAvailable ? "Yes" : "No" },
    { label: "Languages", value: props.languageSupport?.trim() || "English" },
    {
      label: "Difficulty",
      value: DIFFICULTY_LABEL[props.difficultyLevel] ?? props.difficultyLevel,
    },
    {
      label: "Privacy",
      value: PRIVACY_LEVEL_LABEL[props.privacyLevel] ?? props.privacyLevel,
    },
  ];

  const timeToProductivity = props.timeToProductivity?.trim();
  const learningCurve = props.learningCurve?.trim();
  // Catalog "learning curve" words (Instant, Easy, Moderate, Steep) are a coarse
  // bin of time-to-productivity, not a skill rating. Showing "Instant" beside
  // Difficulty makes the two fields sound like they disagree.
  if (timeToProductivity) {
    rows.push({ label: "Time to productivity", value: timeToProductivity });
  } else if (learningCurve) {
    rows.push({ label: "Ramp-up", value: learningCurve });
  }
  if (props.upgradeTriggers?.trim()) {
    rows.push({
      label: "Upgrade when",
      value: stripInlineCitations(props.upgradeTriggers),
    });
  }
  if (props.keyIntegrations?.trim()) {
    rows.push({
      label: "Integrations",
      value: stripInlineCitations(props.keyIntegrations),
      truncate: true,
    });
  }
  if (props.modelsRow) {
    rows.push({
      label: props.modelsRow.label,
      value: props.modelsRow.value,
      fact: props.modelsRow.fact,
      showNote: props.modelsRow.showNote === true,
    });
  }

  return rows;
}

export function PlatformTechnicalDetails(props: PlatformTechnicalDetailsProps) {
  const rows = buildTechnicalDetailRows(props);

  return (
    <section className="lp-overview-panel">
      <h2 className="mb-4 text-lg font-semibold text-white">Technical details</h2>
      <dl className="grid gap-x-8 sm:grid-cols-2 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="min-w-0 border-t border-gray-700/50 py-4">
            <dt className="mb-1.5 text-xs text-gray-300">
              {row.label}
              <FactCite fact={row.fact} />
            </dt>
            <dd className="min-w-0 break-words leading-relaxed text-gray-200">
              {row.truncate ? <TruncatedValue text={row.value} /> : row.value}
              {row.showNote && row.fact?.note ? (
                <p className="mt-2 text-sm text-gray-400">{row.fact.note}</p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
