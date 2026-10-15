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
  displayName: "Name",
  company: "Company",
  freeTier: "Free tier",
  plans: "Pricing",
  apiPricing: "API pricing",
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

const MONEY_TOKEN =
  /(?:~?\s*)?(?:USD|EUR|GBP|\$|€|£)\s*\d[\d,]*(?:\.\d+)?(?:\s*\/\s*[A-Za-z][\w.%]*|\/[A-Za-z][\w.%]*)?/i;

/** Split catalog pricing on semicolons that are not inside parentheses. */
function splitPricingParts(text: string): string[] {
  const parts: string[] = [];
  let buf = "";
  let depth = 0;
  for (const ch of text) {
    if (ch === "(") depth += 1;
    else if (ch === ")" && depth > 0) depth -= 1;
    if (ch === ";" && depth === 0) {
      if (buf.trim()) parts.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function unstructuredPlan(part: string): DisplayPlan {
  const money = part.match(MONEY_TOKEN);
  if (money?.[0]) {
    return { name: part, price: money[0].trim(), period: "", limits: "" };
  }
  return { name: part, price: part, period: "", limits: "" };
}

function parseFreePlan(part: string): DisplayPlan | null {
  if (!/^free\b/i.test(part)) return null;
  if (part.length > 80 && /unverified|did not|not published|official page/i.test(part)) {
    return null;
  }
  const match = part.match(/^free(?:\s+(?:tier|forever|to start|to sign up|app))?\b(.*)$/i);
  if (!match) return null;
  let rest = match[1].trim().replace(/^[:\-–—]\s*/, "");
  let price = "Free";
  const money = rest.match(MONEY_TOKEN);
  if (money?.[0] && money.index === 0) {
    price = money[0].trim();
    rest = rest.slice(money[0].length).trim().replace(/^[,;]\s*/, "");
  }
  let limits = "";
  const paren = rest.match(/^\(([^)]*)\)\s*(.*)$/);
  if (paren) {
    limits = paren[1].trim();
    const tail = paren[2].trim();
    if (tail) limits = limits ? `${limits}; ${tail}` : tail;
  } else if (rest) {
    limits = rest;
  }
  return { name: "Free", price, period: "", limits };
}

function parsePlanPart(part: string): DisplayPlan {
  const colon = part.indexOf(":");
  if (colon > 0 && colon < 48 && !/^https?:/i.test(part)) {
    const name = part.slice(0, colon).trim();
    const price = part.slice(colon + 1).trim();
    if (name && price) {
      return { name, price, period: "", limits: "" };
    }
  }

  const free = parseFreePlan(part);
  if (free) return free;

  const named = part.match(
    /^(.+?)\s+((?:~?\s*)?(?:USD|EUR|GBP|\$|€|£)\s*\d[\d,]*(?:\.\d+)?(?:\s*\/\s*[A-Za-z][\w.%]*|\/[A-Za-z][\w.%]*)?)(.*)$/i,
  );
  if (named) {
    const name = named[1].trim();
    const price = `${named[2]}${named[3]}`.trim();
    const limitsMatch = price.match(/^(.*?)(?:\s+\(([^)]*)\))\s*$/);
    if (name && limitsMatch && !name.includes("$")) {
      return {
        name,
        price: limitsMatch[1].trim(),
        period: "",
        limits: limitsMatch[2].trim(),
      };
    }
    if (name) return { name, price, period: "", limits: "" };
  }

  const leading = part.match(
    /^((?:~?\s*)?(?:USD|EUR|GBP|\$|€|£)\s*\d[\d,]*(?:\.\d+)?(?:\s*\/\s*[A-Za-z][\w.%]*|\/[A-Za-z][\w.%]*)?)\s+([A-Z][A-Za-z0-9+&.-]{1,40})\b(.*)$/,
  );
  if (leading) {
    const extra = leading[3].trim().replace(/^\(([^)]*)\)$/, "$1").trim();
    return {
      name: leading[2].trim(),
      price: leading[1].trim(),
      period: "",
      limits: extra,
    };
  }

  const custom = part.match(/^([A-Za-z][\w+&. /-]{0,32}?)\s+custom\b(.*)$/i);
  if (custom && custom[1].trim().length <= 32) {
    return {
      name: custom[1].trim(),
      price: "Custom",
      period: "",
      limits: custom[2].trim().replace(/^[,;]\s*/, ""),
    };
  }

  return unstructuredPlan(part);
}

export function parsePricingProse(prose: string): DisplayPlan[] {
  const cleaned = stripInlineCitations(prose);
  if (!cleaned) return [];
  return splitPricingParts(cleaned).map(parsePlanPart);
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
  return label ? [{ name: label, price: label, period: "", limits: "" }] : [];
}

const PRICE_UNIT = /^(month|year|week|day|mo|yr|wk|seat|user|person)$/i;

function planPriceText(plan: DisplayPlan): string {
  const unit = plan.period.trim();
  if (unit && PRICE_UNIT.test(unit)) return `${plan.price}/${unit}`;
  return plan.price;
}

function isFreeDisplayPlan(plan: DisplayPlan): boolean {
  const price = plan.price.trim().toLowerCase();
  const name = plan.name.trim().toLowerCase();
  const zero = /^[$€£]\s*0(?:\.0+)?(?:\b|\/)/;
  if (price === "free" || price === "free tier" || zero.test(price)) return true;
  return /^free\b/.test(name) && (price === "" || price === name);
}

function paidAmount(plan: DisplayPlan): number | null {
  if (isFreeDisplayPlan(plan)) return null;
  const text = planPriceText(plan).replace(/,/g, "");
  const match = text.match(/(?:usd|eur|gbp|\$|€|£)\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*(?:€|£)/i);
  if (!match) return null;
  const value = Number(match[1] ?? match[2]);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
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

function lowestPaidPlan(plans: DisplayPlan[]): DisplayPlan | undefined {
  const paid = plans.filter((plan) => !isFreeDisplayPlan(plan) && plan.price.trim());
  const ranked = paid
    .map((plan) => ({ plan, amount: paidAmount(plan) }))
    .filter((row): row is { plan: DisplayPlan; amount: number } => row.amount !== null)
    .sort((a, b) => a.amount - b.amount);
  return ranked[0]?.plan ?? paid[0];
}

/** Lowest paid amount for card copy such as "Paid options: $20/month". */
export function paidStartingPrice(plans: DisplayPlan[]): string | undefined {
  const lowest = lowestPaidPlan(plans);
  return lowest ? planPriceText(lowest) : undefined;
}

export function startingPriceLabel(plans: DisplayPlan[]): string {
  if (plans.length === 0) return "See site";
  const free = plans.some(isFreeDisplayPlan);
  const lowest = lowestPaidPlan(plans);
  if (free && lowest) return `Free, from ${planPriceText(lowest)}`;
  if (free) return "Free";
  const plan = lowest ?? plans[0];
  return planPriceText(plan);
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
