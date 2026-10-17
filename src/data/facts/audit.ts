import { PRICE_FACT_KEYS, type FactValueKey, type ToolFacts } from "./types";
import { RETIRED_TERMS } from "./retired-terms";
import { flattenFactValues, listFactEntries } from "./walk";

export const STALE_DAYS_DEFAULT = 60;
export const STALE_DAYS_PRICE = 30;
/** Recheck window for `usageLimits` on video / image-generation tools (RA). */
export const STALE_DAYS_USAGE_LIMITS_VIDEO_IMAGE = 90;

/**
 * Fact-file slugs whose usage-limits terms change on the video/image cadence.
 * Other tools keep the 60-day default for this field.
 */
export const VIDEO_IMAGE_GENERATION_FACT_SLUGS = new Set<string>([
  "capcut",
  "captions",
  "comfyui",
  "freepik-ai",
  "hedra",
  "higgsfield",
  "invideo-ai",
  "kling-ai",
  "krea",
  "veed",
]);

export function isVideoOrImageGenerationTool(facts: ToolFacts): boolean {
  return VIDEO_IMAGE_GENERATION_FACT_SLUGS.has(facts.slug);
}

export type FactIssueKind =
  | "missing-source"
  | "stale"
  | "retired-term"
  | "contradiction";

export type FactIssue = {
  slug: string;
  field: string;
  kind: FactIssueKind;
  message: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function parseCheckedAt(checkedAt: string): Date | null {
  if (!DATE_RE.test(checkedAt)) return null;
  const date = new Date(`${checkedAt}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.floor(ms / 86_400_000);
}

function isPriceFact(key: FactValueKey): boolean {
  return (PRICE_FACT_KEYS as readonly string[]).includes(key);
}

export function staleDaysForFact(key: FactValueKey, facts: ToolFacts): number {
  if (isPriceFact(key)) return STALE_DAYS_PRICE;
  if (key === "usageLimits" && isVideoOrImageGenerationTool(facts)) {
    return STALE_DAYS_USAGE_LIMITS_VIDEO_IMAGE;
  }
  return STALE_DAYS_DEFAULT;
}

export function auditToolFacts(facts: ToolFacts, now = new Date()): FactIssue[] {
  const issues: FactIssue[] = [];

  for (const { key, fact } of listFactEntries(facts)) {
    if (!fact.sourceUrl || !fact.sourceUrl.trim()) {
      issues.push({
        slug: facts.slug,
        field: key,
        kind: "missing-source",
        message: `${key} has no sourceUrl`,
      });
    }

    const checked = parseCheckedAt(fact.checkedAt);
    if (!checked) {
      issues.push({
        slug: facts.slug,
        field: key,
        kind: "stale",
        message: `${key} checkedAt must be YYYY-MM-DD (got ${JSON.stringify(fact.checkedAt)})`,
      });
    } else {
      const limit = staleDaysForFact(key, facts);
      const age = daysBetween(checked, now);
      if (age > limit) {
        issues.push({
          slug: facts.slug,
          field: key,
          kind: "stale",
          message: `${key} checkedAt ${fact.checkedAt} is ${age} days old (limit ${limit})`,
        });
      }
    }
  }

  for (const { field, text } of flattenFactValues(facts)) {
    for (const term of RETIRED_TERMS) {
      if (term.pattern.test(text)) {
        issues.push({
          slug: facts.slug,
          field,
          kind: "retired-term",
          message: `${field} contains retired term "${term.example}"`,
        });
      }
    }
  }

  issues.push(...findContradictions(facts));
  return issues;
}

function findContradictions(facts: ToolFacts): FactIssue[] {
  const issues: FactIssue[] = [];
  const free = facts.freeTier?.value;
  const plans = facts.plans?.value ?? [];

  const noFree =
    free &&
    (free.available === false || /^\s*none\b/i.test(free.summary));
  const zeroPlan = plans.find((plan) => isZeroPrice(plan.price));
  if (noFree && zeroPlan) {
    issues.push({
      slug: facts.slug,
      field: "freeTier",
      kind: "contradiction",
      message: `free tier is unavailable/none but plan "${zeroPlan.name}" is priced ${zeroPlan.price}`,
    });
  }

  if (free?.summary && plans.length > 0) {
    const leftover = extractLikelyPlanNames(free.summary).filter(
      (name) =>
        !plans.some((plan) => plan.name.toLowerCase() === name.toLowerCase()),
    );
    for (const name of leftover) {
      issues.push({
        slug: facts.slug,
        field: "freeTier",
        kind: "contradiction",
        message: `free-tier text mentions "${name}" which is not in plans`,
      });
    }
  }

  return issues;
}

function isZeroPrice(price: string): boolean {
  const normalized = price.trim().toLowerCase();
  return (
    normalized === "0" ||
    normalized === "$0" ||
    normalized === "free" ||
    normalized === "none"
  );
}

function extractLikelyPlanNames(summary: string): string[] {
  const matches = summary.match(/\b(?:Plus|Pro|Team|Enterprise|Premium|Max|Ultra|Business)\b/g);
  return matches ?? [];
}

export function auditToolFactsList(list: ToolFacts[], now = new Date()): FactIssue[] {
  return list.flatMap((facts) => auditToolFacts(facts, now));
}
