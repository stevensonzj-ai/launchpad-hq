import { FactCite } from "@/components/platforms/fact-cite";
import type { Fact, ToolUsageLimits } from "@/data/facts/types";

export const USAGE_LIMIT_FIELD_LABELS = {
  creditsExpire: "Credits expire",
  watermark: "Watermark",
  commercialUse: "Commercial use",
  rollover: "Rollover",
  other: "Other",
} as const;

export type UsageLimitDisplayRow = {
  key: string;
  label: string;
  value: string;
};

/** Present keys only, values unchanged. */
export function usageLimitDisplayRows(value: ToolUsageLimits): UsageLimitDisplayRow[] {
  const rows: UsageLimitDisplayRow[] = [];
  if (value.creditsExpire) {
    rows.push({
      key: "creditsExpire",
      label: USAGE_LIMIT_FIELD_LABELS.creditsExpire,
      value: value.creditsExpire,
    });
  }
  if (value.watermark) {
    rows.push({
      key: "watermark",
      label: USAGE_LIMIT_FIELD_LABELS.watermark,
      value: value.watermark,
    });
  }
  if (value.commercialUse) {
    rows.push({
      key: "commercialUse",
      label: USAGE_LIMIT_FIELD_LABELS.commercialUse,
      value: value.commercialUse,
    });
  }
  if (value.rollover) {
    rows.push({
      key: "rollover",
      label: USAGE_LIMIT_FIELD_LABELS.rollover,
      value: value.rollover,
    });
  }
  for (const [index, item] of (value.other ?? []).entries()) {
    if (!item) continue;
    rows.push({
      key: `other-${index}`,
      label: USAGE_LIMIT_FIELD_LABELS.other,
      value: item,
    });
  }
  return rows;
}

export function PlatformUsageLimits({
  fact,
}: {
  fact: Fact<ToolUsageLimits> | undefined;
}) {
  if (!fact) return null;
  const rows = usageLimitDisplayRows(fact.value);
  if (rows.length === 0) return null;

  return (
    <section className="lp-overview-panel">
      <div className="mb-2 flex items-center gap-1">
        <h2 className="text-lg font-semibold text-white">Usage limits</h2>
        <FactCite fact={fact} />
      </div>
      {fact.note ? <p className="mb-3 text-sm text-gray-400">{fact.note}</p> : null}
      <dl className="space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{row.label}</dt>
            <dd className="mt-1 leading-relaxed text-gray-200">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
