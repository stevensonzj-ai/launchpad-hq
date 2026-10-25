import { isPublishedVerified } from "@/data/facts/walk";
import {
  FACT_VALUE_KEYS,
  type Fact,
  type ToolFacts,
} from "@/data/facts/types";
import { extractUrls, stripInlineCitations } from "@/lib/public-data/pricing";

// Pricing lives in the shared normalizer so the page, cards, JSON feed and
// MCP connector all compute it the same way.
export {
  applyUsageLimitsToFreePlan,
  extractUrls,
  isFreeDisplayPlan,
  paidAmount,
  paidStartingPrice,
  parsePricingProse,
  plansFromFactsOrProse,
  startingPriceLabel,
  stripInlineCitations,
  type DisplayPlan,
} from "@/lib/public-data/pricing";

export type DisplaySource = {
  label: string;
  url: string;
  checkedAt?: string;
  /** Fact sources only: "verified" once a second person has checked it. */
  status?: "verified" | "unverified" | "disputed";
};

const FACT_LABEL: Record<(typeof FACT_VALUE_KEYS)[number], string> = {
  status: "Status",
  officialUrl: "Official site",
  verdict: "Verdict",
  displayName: "Name",
  company: "Company",
  freeTier: "Free tier",
  plans: "Pricing",
  apiPricing: "API pricing",
  platforms: "Platforms",
  apps: "Apps",
  models: "Models",
  privacy: "Privacy",
  usageLimits: "Usage limits",
};

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

  const add = (label: string, url: string, checkedAt?: string, status?: DisplaySource["status"]) => {
    const key = url.replace(/\/$/, "");
    if (seen.has(key)) return;
    seen.add(key);
    sources.push(status ? { label, url, checkedAt, status } : { label, url, checkedAt });
  };

  if (facts) {
    for (const key of FACT_VALUE_KEYS) {
      const fact = facts[key];
      if (!fact?.sourceUrl) continue;
      if (key === "usageLimits" && !isPublishedVerified(fact)) continue;
      const status = isPublishedVerified(fact)
        ? "verified"
        : fact.status === "disputed"
          ? "disputed"
          : "unverified";
      add(FACT_LABEL[key], fact.sourceUrl, fact.checkedAt, status);
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

/**
 * ?tab= views on /platform/[slug]. Tutorials are not one: they live at
 * /platform/[slug]/guide, and the page 308s ?tab=tutorials there when a
 * tutorial exists. Anything else (including ?tab=tutorials with no
 * tutorial) falls back to the overview.
 */
export function resolvePlatformTab(
  tab: string | undefined,
): "overview" | "discussions" | "prompts" {
  if (tab === "discussions") return "discussions";
  if (tab === "prompts") return "prompts";
  return "overview";
}
