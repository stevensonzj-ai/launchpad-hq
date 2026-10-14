import { COST_TIER_LABEL } from "@/lib/labels";
import {
  FACT_VALUE_KEYS,
  type Fact,
  type ToolFacts,
} from "@/data/facts/types";

const URL_RE = /https?:\/\/[^\s)>\]]+/gi;
const AS_OF_PAREN_RE =
  /\((?:[^)]*(?:official|per|from|at)[^)]*)?as of \d{4}-\d{2}-\d{2}[^)]*\)/gi;
const AS_OF_BARE_RE = /,?\s*as of \d{4}-\d{2}-\d{2}/gi;
const TIME_OF_WRITING_RE = /,?\s*per [^.:,;)]+ at time of writing/gi;

export type DisplaySource = {
  label: string;
  url: string;
  checkedAt?: string;
};

export type DisplayPlan = {
  name: string;
  price: string;
  period: string;
  limits: string;
};

const FACT_LABEL: Record<(typeof FACT_VALUE_KEYS)[number], string> = {
  verdict: "Verdict",
  freeTier: "Free tier",
  plans: "Pricing",
  platforms: "Platforms",
  apps: "Apps",
  models: "Models",
  privacy: "Privacy",
};

export function extractUrls(text: string): string[] {
  return [...new Set(text.match(URL_RE) ?? [])];
}

export function stripInlineCitations(text: string): string {
  return text
    .replace(AS_OF_PAREN_RE, "")
    .replace(AS_OF_BARE_RE, "")
    .replace(TIME_OF_WRITING_RE, "")
    .replace(URL_RE, "")
    .replace(/\(\s*(?:official|unverified)\s*\)/gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+([,.;])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function extractCaveatNotes(text: string): string[] {
  const notes: string[] = [];
  for (const match of text.matchAll(/as of (\d{4}-\d{2}-\d{2})/gi)) {
    notes.push(`Checked ${match[1]} (from catalog copy)`);
  }
  const lower = text.toLowerCase();
  if (lower.includes("unverified") || lower.includes("verify")) {
    notes.push("Some catalog figures are marked unverified.");
  }
  if (lower.includes("at time of writing")) {
    notes.push("Some catalog copy was dated at time of writing.");
  }
  return [...new Set(notes)];
}

export function parsePricingProse(prose: string): DisplayPlan[] {
  const cleaned = stripInlineCitations(prose);
  if (!cleaned) return [];
  return cleaned
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colon = part.indexOf(":");
      if (colon > 0 && colon < 48) {
        return {
          name: part.slice(0, colon).trim(),
          price: part.slice(colon + 1).trim(),
          period: "",
          limits: "",
        };
      }
      const money = part.match(/^(.+?)\s+(\$[\d][\w./,%]*)(.*)$/);
      if (money) {
        return {
          name: money[1].trim(),
          price: `${money[2]}${money[3]}`.trim(),
          period: "",
          limits: "",
        };
      }
      return { name: "Listed", price: part, period: "", limits: "" };
    });
}

export function plansFromFactsOrProse(
  facts: ToolFacts | undefined,
  currentPricing: string | null,
  costTier: string,
): DisplayPlan[] {
  if (facts?.plans?.value.length) {
    return facts.plans.value;
  }
  if (currentPricing?.trim()) {
    return parsePricingProse(currentPricing);
  }
  const label = COST_TIER_LABEL[costTier] ?? costTier;
  return label ? [{ name: "Listed", price: label, period: "", limits: "" }] : [];
}

/** Fold leftover DB usageLimits into the Free plan row when that row has no limits. */
export function applyUsageLimitsToFreePlan(
  plans: DisplayPlan[],
  usageLimits: string | null | undefined,
): DisplayPlan[] {
  if (!usageLimits?.trim()) return plans;
  const cleaned = stripInlineCitations(usageLimits);
  return plans.map((plan) => {
    if (!/^free$/i.test(plan.name)) return plan;
    if (plan.limits.trim()) return plan;
    return { ...plan, limits: cleaned };
  });
}

export function startingPriceLabel(plans: DisplayPlan[]): string {
  if (plans.length === 0) return "See site";
  const paid = plans.find((plan) => {
    const price = plan.price.toLowerCase();
    return !/^\$0\b/.test(plan.price) && price !== "free" && price !== "$0";
  });
  const plan = paid ?? plans[0];
  if (plan.period) return `${plan.price}/${plan.period}`;
  return plan.price;
}

export function freeTierSummary(
  facts: ToolFacts | undefined,
  freeTierFeatures: string | null,
): string {
  if (facts?.freeTier) {
    return stripInlineCitations(facts.freeTier.value.summary);
  }
  if (freeTierFeatures?.trim()) {
    return stripInlineCitations(freeTierFeatures);
  }
  return "Not listed";
}

export function factCiteTitle(fact: Pick<Fact<unknown>, "sourceUrl" | "checkedAt" | "status">): string {
  const parts = [
    fact.sourceUrl ? `Source: ${fact.sourceUrl}` : null,
    fact.checkedAt ? `Checked: ${fact.checkedAt}` : null,
    fact.status === "unverified" ? "Status: unverified" : null,
    fact.status === "disputed" ? "Status: disputed" : null,
  ].filter(Boolean);
  return parts.join("\n");
}

export function collectDisplaySources(
  facts: ToolFacts | undefined,
  proseFields: Array<string | null | undefined>,
): { sources: DisplaySource[]; notes: string[] } {
  const sources: DisplaySource[] = [];
  const seen = new Set<string>();

  const add = (label: string, url: string, checkedAt?: string) => {
    const key = url.replace(/\/$/, "");
    if (seen.has(key)) return;
    seen.add(key);
    sources.push({ label, url, checkedAt });
  };

  if (facts) {
    for (const key of FACT_VALUE_KEYS) {
      const fact = facts[key];
      if (fact?.sourceUrl) {
        add(FACT_LABEL[key], fact.sourceUrl, fact.checkedAt);
      }
    }
  }

  const notes: string[] = [];
  for (const field of proseFields) {
    if (!field) continue;
    notes.push(...extractCaveatNotes(field));
    for (const url of extractUrls(field)) {
      add("Catalog copy", url);
    }
  }

  return { sources, notes: [...new Set(notes)] };
}

export function staticTutorialCount(hasTutorial: boolean): number {
  return hasTutorial ? 1 : 0;
}

export function resolvePlatformTab(
  tab: string | undefined,
  hasTutorial: boolean,
): "overview" | "tutorials" | "discussions" | "prompts" {
  if (tab === "tutorials" && hasTutorial) return "tutorials";
  if (tab === "discussions") return "discussions";
  if (tab === "prompts") return "prompts";
  return "overview";
}
