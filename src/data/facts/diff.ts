import { FACT_VALUE_KEYS, type ToolFacts } from "./types";
import { stringifyValue } from "./walk";

export type FactDiffRow = {
  slug: string;
  field: string;
  oldValue: string;
  newValue: string;
  source: string;
  verifier: string;
};

function snapshot(facts: ToolFacts | undefined): Record<string, { value: string; source: string; verifier: string }> {
  if (!facts) return {};
  const rows: Record<string, { value: string; source: string; verifier: string }> = {
    lifecycle: { value: facts.lifecycle, source: "", verifier: "" },
  };
  for (const key of FACT_VALUE_KEYS) {
    const fact = facts[key];
    if (!fact) continue;
    rows[key] = {
      value: stringifyValue(fact.value),
      source: fact.sourceUrl,
      verifier: fact.verifiedBy ?? "",
    };
  }
  return rows;
}

export function diffToolFacts(
  oldFacts: ToolFacts | undefined,
  newFacts: ToolFacts | undefined,
): FactDiffRow[] {
  const slug = newFacts?.slug ?? oldFacts?.slug ?? "(unknown)";
  const before = snapshot(oldFacts);
  const after = snapshot(newFacts);
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const rows: FactDiffRow[] = [];
  for (const field of keys) {
    const prev = before[field];
    const next = after[field];
    if (prev?.value === next?.value) continue;
    rows.push({
      slug,
      field,
      oldValue: prev?.value ?? "—",
      newValue: next?.value ?? "—",
      source: next?.source || prev?.source || "—",
      verifier: next?.verifier || prev?.verifier || "—",
    });
  }
  return rows;
}

export function renderFactsDiffMarkdown(rows: FactDiffRow[]): string {
  if (rows.length === 0) {
    return "No fact-file changes.";
  }
  const header =
    "| slug | field | old → new | source | verifier |\n|---|---|---|---|---|";
  const body = rows.map((row) => {
    const change = `${escapeCell(row.oldValue)} → ${escapeCell(row.newValue)}`;
    return `| ${escapeCell(row.slug)} | ${escapeCell(row.field)} | ${change} | ${escapeCell(row.source)} | ${escapeCell(row.verifier)} |`;
  });
  return [header, ...body].join("\n");
}

function escapeCell(value: string): string {
  return value.replace(/\r?\n/g, " ").replace(/\|/g, "\\|");
}
