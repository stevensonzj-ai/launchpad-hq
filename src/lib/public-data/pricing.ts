/**
 * The one pricing normalizer. The platform page, the cards, the JSON feed
 * and the MCP connector all read plan rows and starting prices from here,
 * so a price can never say one thing in HTML and another in JSON.
 *
 * `src/lib/platform-display.ts` re-exports the display helpers for existing
 * callers. Pure functions only: no Prisma, no sponsor data.
 */
import { COST_TIER_LABEL } from "@/lib/labels";
import type { ToolFacts } from "@/data/facts/types";

const URL_RE = /https?:\/\/[^\s)>\]]+/gi;
const AS_OF_PAREN_RE =
  /\((?:[^)]*(?:official|per|from|at)[^)]*)?as of \d{4}-\d{2}-\d{2}[^)]*\)/gi;
const AS_OF_BARE_RE = /,?\s*as of \d{4}-\d{2}-\d{2}/gi;
const TIME_OF_WRITING_RE = /,?\s*per [^.:,;)]+ at time of writing/gi;

export type DisplayPlan = {
  name: string;
  price: string;
  period: string;
  limits: string;
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
  return { name: part, price: "See pricing", period: "", limits: "" };
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
  return label ? [{ name: label, price: "See pricing", period: "", limits: "" }] : [];
}

const PRICE_UNIT = /^(month|year|week|day|mo|yr|wk|seat|user|person)$/i;

function planPriceText(plan: DisplayPlan): string {
  const unit = plan.period.trim();
  if (unit && PRICE_UNIT.test(unit)) return `${plan.price}/${unit}`;
  return plan.price;
}

/**
 * A zero price only when nothing follows the zero but an optional ".00":
 * "$0", "$0/month", "$0.00" are free; "$0.01", "$0.048/image" are not.
 */
const ZERO_PRICE = /^(?:us)?[$€£]\s*0(?:\.0+)?(?![.\d])/;

export function isFreeDisplayPlan(plan: DisplayPlan): boolean {
  const price = plan.price.trim().toLowerCase();
  const name = plan.name.trim().toLowerCase();
  if (price === "free" || price === "free tier" || ZERO_PRICE.test(price)) return true;
  return /^free\b/.test(name) && (price === "" || price === name);
}

export function paidAmount(plan: DisplayPlan): number | null {
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

export function lowestPaidPlan(plans: DisplayPlan[]): DisplayPlan | undefined {
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

// ---------- machine-readable plans (feed + MCP) ----------

export type Currency = "USD" | "EUR" | "GBP";
export type PlanPeriod = "month" | "year" | "one_time" | "usage" | "seat_month";

export type NormalizedPlan = {
  name: string;
  /** Exactly what the pricing table shows in its Price column. */
  price_text: string;
  amount: number | null;
  currency: Currency | null;
  period: PlanPeriod | null;
  limits: string | null;
  is_free: boolean;
};

export type NormalizedPricing = {
  plans: NormalizedPlan[];
  /** Same string as the page's "Starting price" quick fact. */
  starting_price: string;
  lowest_paid: NormalizedPlan | null;
};

/** The pricing table's Price cell. */
export function tablePriceText(plan: DisplayPlan): string {
  return plan.period ? `${plan.price}/${plan.period}` : plan.price;
}

function currencyOf(text: string): Currency | null {
  if (/usd|\$/i.test(text)) return "USD";
  if (/eur|€/i.test(text)) return "EUR";
  if (/gbp|£/i.test(text)) return "GBP";
  return null;
}

function periodOf(text: string): PlanPeriod | null {
  const t = text.toLowerCase();
  // Day-based billing ("$29 / 30 days", Teal+) has no matching period; say nothing rather than "usage".
  if (/\b\d+\s*days?\b/.test(t)) return null;
  if (/\b(seat|user|member|person)\b/.test(t)) return "seat_month";
  if (/\b(one[- ]time|lifetime|once)\b/.test(t)) return "one_time";
  if (/\/\s*(mo|month)\b|\bper month\b|\bmonthly\b|\/month/.test(t)) return "month";
  if (/\/\s*(yr|year)\b|\bper year\b|\bannual(ly)?\b|\byearly\b/.test(t)) return "year";
  if (/\b(per|\/)\s*\w|pay[- ]as[- ]you[- ]go|\busage\b/.test(t)) return "usage";
  return null;
}

function normalizePlan(plan: DisplayPlan): NormalizedPlan {
  const priceText = tablePriceText(plan);
  const isFree = isFreeDisplayPlan(plan);
  const amount = isFree ? 0 : paidAmount(plan);
  return {
    name: plan.name,
    price_text: priceText,
    amount,
    currency: amount === null ? null : currencyOf(priceText),
    // Unstructured prose keeps the unit in the name ("US$0.01 per credit").
    period: isFree
      ? null
      : (periodOf(priceText) ?? (plan.name.includes(plan.price.replace(/^~\s*/, "")) ? periodOf(plan.name) : null)),
    limits: plan.limits.trim() || null,
    is_free: isFree,
  };
}

/** Machine-readable form of the exact plan rows the page renders. */
export function normalizePlans(plans: DisplayPlan[]): NormalizedPricing {
  const lowest = lowestPaidPlan(plans);
  return {
    plans: plans.map(normalizePlan),
    starting_price: startingPriceLabel(plans),
    lowest_paid: lowest ? normalizePlan(lowest) : null,
  };
}

// ---------- check dates and card badge (page, cards, JSON-LD) ----------

/** "as of YYYY-MM-DD" dates written into catalog prose. */
export function proseCheckDates(fields: (string | null | undefined)[]): string[] {
  return fields.flatMap((field) =>
    field ? [...field.matchAll(/as of (\d{4}-\d{2}-\d{2})/gi)].map((m) => m[1]) : [],
  );
}

/**
 * Date behind the pricing table: the plans fact's checkedAt, or for
 * catalog-only rows the newest "as of" date in the pricing prose. Null when
 * unknown (never invented) and for discontinued tools (no pricing shown).
 */
export function pricesCheckedAt(
  facts: Pick<ToolFacts, "lifecycle" | "plans"> | undefined,
  pricingProse: (string | null | undefined)[],
): string | null {
  if (facts?.lifecycle === "discontinued") return null;
  if (facts?.plans?.value.length) return facts.plans.checkedAt;
  return proseCheckDates(pricingProse).sort().at(-1) ?? null;
}

export type CostBadge = { label: string; tone: string; tooltip: string | null };

/**
 * The card's cost pill. Same rules as the feed's `lifecycle` / `free_tier`:
 * a discontinued tool never shows "Free" or "Freemium".
 */
export function costBadge(
  costTier: string,
  facts: Partial<Pick<ToolFacts, "lifecycle" | "freeTier">> | undefined,
): CostBadge {
  if (facts?.lifecycle === "discontinued") {
    return { label: "Discontinued", tone: "DISCONTINUED", tooltip: "No longer available" };
  }
  if (facts?.freeTier) {
    const { available, summary } = facts.freeTier.value;
    return { label: available ? "Free plan" : "No free plan", tone: costTier, tooltip: summary };
  }
  return { label: COST_TIER_LABEL[costTier] ?? costTier, tone: costTier, tooltip: null };
}
