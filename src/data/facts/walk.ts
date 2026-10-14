import { FACT_VALUE_KEYS, type Fact, type FactValueKey, type ToolFacts } from "./types";

export type FactEntry = {
  key: FactValueKey;
  fact: Fact<unknown>;
};

export function listFactEntries(facts: ToolFacts): FactEntry[] {
  const entries: FactEntry[] = [];
  for (const key of FACT_VALUE_KEYS) {
    const fact = facts[key];
    if (fact) entries.push({ key, fact });
  }
  return entries;
}

export function isPublishedVerified(fact: Fact<unknown>): boolean {
  return Boolean(
    fact.status === "verified" &&
      fact.verifiedBy &&
      fact.verifiedBy !== fact.gatheredBy,
  );
}

export function flattenFactValues(facts: ToolFacts): { field: string; text: string }[] {
  const rows: { field: string; text: string }[] = [
    { field: "lifecycle", text: facts.lifecycle },
    { field: "slug", text: facts.slug },
  ];
  for (const { key, fact } of listFactEntries(facts)) {
    rows.push({ field: key, text: stringifyValue(fact.value) });
  }
  for (const [index, item] of (facts.pros ?? []).entries()) {
    rows.push({ field: `pros[${index}]`, text: item });
  }
  for (const [index, item] of (facts.cons ?? []).entries()) {
    rows.push({ field: `cons[${index}]`, text: item });
  }
  for (const [index, item] of (facts.changelog ?? []).entries()) {
    rows.push({
      field: `changelog[${index}]`,
      text: `${item.date} ${item.field} ${item.summary}`,
    });
  }
  return rows;
}

export function stringifyValue(value: unknown): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}
