/**
 * Label-consistency check (fix plan P1.3, weak spot 3). A record's label must
 * not contradict its own text, and a price fact's source must look like a
 * pricing page. Pure: it runs the catalog rows and fact files through the
 * same functions that serve MCP and /data/v1, so it checks what clients get.
 *
 * Used by label-consistency.test.ts (on the catalog snapshot) and by
 * `npm run check:labels` (scripts/check-label-consistency.ts).
 *
 * Rules:
 *   verified-says-unverified  Pricing labelled `verified` (every price fact
 *       verified) next to text calling the pricing unverified, or a verified
 *       free tier next to text calling the free tier unverified. A dated note
 *       that one detail is unconfirmed ("the billing basis behind the two
 *       numbers is unverified") is honest disclosure and passes.
 *   catalog-only-says-official  A `catalog_only` record (no price fact, so no
 *       source URL) whose pricing, free-tier or description text calls itself
 *       official. A clause that says the official page could not be read
 *       ("did not render on the official page") is not such a claim.
 *   pricing-source-path  A plans, freeTier or apiPricing fact whose sourceUrl
 *       is not a pricing, plans or billing page, or a help/docs article about
 *       pricing, plans, billing or limits, and that carries no `sourceKind`
 *       saying what kind of page it is (Perplexity's plans once cited a
 *       Slack-connector help article).
 *   card-vs-pricing-verification  (P1.3c) The platform card's `verification`
 *       must equal get_pricing_facts' top-level `verification`, and a card
 *       may say `verified` only when the tool has price facts and every one
 *       (plans, free tier, API pricing) is verified. QuillBot's card once said
 *       verified from its free-tier fact while its plans were unverified.
 *   free-tier-says-trial  (P1.3c) free_tier.available true, or cost tier
 *       FREE/FREEMIUM, next to free-tier or pricing text that says there is
 *       no free plan, only a trial (Krisp: "a 7-day trial, not a permanent
 *       free plan" under FREEMIUM / available: true).
 *   free-tier-vs-cost-tier  (P1.3c) free_tier.available false under a FREE
 *       or FREEMIUM cost tier, or a $0 plan row next to available: false
 *       (that row makes starting_price read "Free, from ...").
 */
import type { Fact, ToolFacts } from "@/data/facts/types";
import { isPublishedVerified } from "@/data/facts/walk";
import { isFreeDisplayPlan } from "@/lib/public-data/pricing";
import { buildFeedContext, toPublicTool } from "@/lib/public-data/serialize";
import { claimsOfficial } from "./official-claim";
import { getPricingFacts, priceFactsOf, type CatalogRow, type FactsLookup } from "./tools";

export { claimsOfficial };

export type LabelRule =
  | "verified-says-unverified"
  | "catalog-only-says-official"
  | "pricing-source-path"
  | "card-vs-pricing-verification"
  | "free-tier-says-trial"
  | "free-tier-vs-cost-tier";

/**
 * Text saying a tool has no (permanent) free plan, only a trial. A bare
 * "no free plan" counts only as a blanket statement (start of the text or of
 * a clause): "n8n Cloud has no free plan" sits next to a free self-hosted
 * edition and is about one product, not the tool.
 */
const TRIAL_ONLY =
  /\bnot a permanent free (?:plan|tier)\b|\bno permanent free (?:plan|tier)\b|(?:^|[.;:(]\s*)no free (?:plan|tier)\b(?!\s+(?:for|on|with|in)\b)|\bfree[- ]trial[- ]only\b|\btrial[- ]only\b|(?:^|[.;:(]\s*)only (?:a|an) (?:\d+-day )?(?:free )?trial\b/i;

export function saysTrialOnly(text: string): boolean {
  return TRIAL_ONLY.test(text);
}

const FREE_TIERS = new Set(["FREE", "FREEMIUM"]);

/**
 * Rule card-vs-pricing-verification for one tool: why the card's label is
 * wrong, or null. `card` is the platform card's verification, `pricing`
 * get_pricing_facts' top-level one.
 */
export function cardLabelProblem(card: string, pricing: string, f: ToolFacts | undefined): string | null {
  if (card !== pricing) return `card ${card}, pricing ${pricing}`;
  if (card !== "verified") return null;
  if (priceFactsOf(f).length === 0) return "card verified with no price facts";
  const weak = (["plans", "freeTier", "apiPricing"] as const).filter((k) => f?.[k] && !isPublishedVerified(f[k] as Fact<unknown>));
  return weak.length ? `card verified, unverified: ${weak.join(", ")}` : null;
}

export type LabelOffender = { slug: string; rule: LabelRule; field: string; text: string };

/** Blanket "pricing is unverified" claims (not a note about one detail). */
const PRICING_UNVERIFIED =
  /\b(?:pricing|prices|plan prices)(?:\s+as of \d{4}-\d{2}-\d{2})?(?:\s+(?:is|are|remain|remains))?\s+unverified\b|\bunverified\s+(?:pricing|prices)\b/i;
/** Blanket "the free tier is unverified" claims. */
const FREE_TIER_UNVERIFIED =
  /\bwhether [^.]{0,40}\bhas a free tier is unverified\b|\bfree (?:tier|plan|path|access)(?: [a-z]+)? (?:is )?unverified\b/i;
/** Pricing, plans or billing pages, at any depth. */
const PRICING_PAGE =
  /\/(?:[\w-]*pric[\w-]*|plans?|plans-[\w-]+|subscriptions?|subscribe|billing|premium|pro|upgrade|membership)(?:[/?#.]|$)/i;
/** Help and docs pages count only when the article is about prices, plans, billing or limits. */
const HELP_PAGE = /\/(?:help|help-center|hc|support|docs|faq|faqs|articles?)\/|^https?:\/\/(?:help|support|docs)\./i;
const HELP_TOPIC = /pric|plan|subscri|billing|cost|free|premium|credit|limit|upgrade|tier|pay/i;

function short(text: string): string {
  return text.length > 140 ? `${text.slice(0, 137)}...` : text;
}

export function isPricingSourceUrl(url: string): boolean {
  let path: string;
  try {
    const u = new URL(url);
    path = `${u.pathname}${u.hash}`;
  } catch {
    return false;
  }
  if (PRICING_PAGE.test(path)) return true;
  return HELP_PAGE.test(url) && HELP_TOPIC.test(path);
}

function priceFacts(f: ToolFacts | undefined): [string, Fact<unknown>][] {
  if (!f) return [];
  return (["plans", "freeTier", "apiPricing"] as const)
    .map((k) => [k, f[k]] as [string, Fact<unknown> | undefined])
    .filter((e): e is [string, Fact<unknown>] => Boolean(e[1]));
}

export function checkLabels(rows: CatalogRow[], facts: FactsLookup): LabelOffender[] {
  const out: LabelOffender[] = [];
  const ctx = buildFeedContext(rows, facts, { generatedAt: "2026-01-01T00:00:00.000Z" });
  for (const row of rows) {
    const f = facts(row.slug);
    if (f?.lifecycle === "discontinued") continue;
    const mcp = getPricingFacts({ platform: row.slug }, rows, facts);
    const feed = toPublicTool(row, f, ctx);
    const push = (rule: LabelRule, field: string, text: string) => out.push({ slug: row.slug, rule, field, text: short(text) });

    const served: [string, string | null | undefined][] = [
      ["description", mcp.platform.description],
      ["free_tier.summary", mcp.platform.free_tier.summary],
      ["feed.description", feed.description],
    ];
    for (const [field, text] of served) {
      if (!text) continue;
      if (mcp.verification === "verified" && PRICING_UNVERIFIED.test(text)) push("verified-says-unverified", field, text);
      else if (f?.freeTier && mcp.platform.verification === "verified" && FREE_TIER_UNVERIFIED.test(text)) {
        push("verified-says-unverified", field, text);
      }
    }

    if (mcp.verification === "catalog_only") {
      const texts: [string, string | null | undefined][] = [
        ["catalog_pricing_text", mcp.catalog_pricing_text],
        ["free_tier.summary", mcp.platform.free_tier.summary],
        ["starting_price", mcp.platform.starting_price],
        ["description", mcp.platform.description],
      ];
      for (const [field, text] of texts) if (text && claimsOfficial(text)) push("catalog-only-says-official", field, text);
    }

    for (const [key, fact] of priceFacts(f)) {
      if (!fact.sourceKind && !isPricingSourceUrl(fact.sourceUrl)) push("pricing-source-path", `${key}.sourceUrl`, fact.sourceUrl);
    }

    // (a) card label vs pricing label.
    const cardProblem = cardLabelProblem(mcp.platform.verification, mcp.verification, f);
    if (cardProblem) push("card-vs-pricing-verification", "platform.verification", cardProblem);

    // (b) free label vs trial-only text; (c) free label vs cost tier.
    const tier = mcp.platform.cost_tier.toUpperCase();
    const available = mcp.platform.free_tier.available;
    if (available === true || FREE_TIERS.has(tier)) {
      const label = available === true ? "free_tier.available=true" : `cost_tier=${tier}`;
      const texts: [string, string | null | undefined][] = [
        ["free_tier.summary", mcp.platform.free_tier.summary],
        ["facts.freeTier.summary", f?.freeTier?.value.summary],
        ["catalog_pricing_text", mcp.catalog_pricing_text],
        ["row.freeTierFeatures", row.freeTierFeatures],
        ["row.currentPricing", row.currentPricing],
      ];
      const seen = new Set<string>();
      for (const [field, text] of texts) {
        if (!text || seen.has(text) || !saysTrialOnly(text)) continue;
        seen.add(text);
        push("free-tier-says-trial", field, `${label}: ${text}`);
      }
    }
    if (available === false && FREE_TIERS.has(tier)) {
      push("free-tier-vs-cost-tier", "cost_tier", `free_tier.available=false under cost_tier=${tier}`);
    }
    if (available === false && (f?.plans?.value ?? []).some(isFreeDisplayPlan)) {
      push("free-tier-vs-cost-tier", "plans", "a $0 plan row next to free_tier.available=false");
    }
  }
  return out;
}

export function summarizeOffenders(offenders: LabelOffender[]): string {
  if (offenders.length === 0) return "label check: 0 offenders";
  const lines = offenders.map((o) => `  ${o.slug} [${o.rule}] ${o.field}: ${o.text}`);
  return `label check: ${offenders.length} offender(s) on ${new Set(offenders.map((o) => o.slug)).size} tools\n${lines.join("\n")}`;
}
