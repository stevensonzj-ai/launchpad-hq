/**
 * Catalog audit #11 — free labels and Copilot credits (MCP fix plan P1.3c),
 * 2026-10-26. Patch data and pure diff logic for
 * scripts/update-catalog-audit-11.ts (the DB runner lives there).
 *
 *   - krisp: Meeting AI has no permanent free plan, only a 7-day free trial
 *     (owner-checked on krisp.ai/pricing/ 2026-10-26), so FREEMIUM -> PAID
 *     and the row text says so. Matching facts: src/data/facts/krisp.ts.
 *   - github-copilot: AI credit totals written as total = base + flex
 *     (owner-checked on github.com/features/copilot/plans 2026-10-26).
 *     Matching facts: src/data/facts/github-copilot.ts.
 *   - canva-ai-magic-studio: Pro $18/month or $144/year, Business $25/month
 *     or $250/year per person (owner verified manually in browser
 *     2026-10-26, Monthly and Yearly toggles). Matching facts:
 *     src/data/facts/canva-ai-magic-studio.ts.
 *   - TRIAL_ONLY_TIERS: rows the extended label check (rules
 *     free-tier-says-trial / free-tier-vs-cost-tier) found under FREE or
 *     FREEMIUM while their own text, or their fact file, says there is no
 *     permanent free plan. Conservative fix: the tier becomes PAID; no text
 *     changes. Not re-verified on the vendor pages in this pass.
 *
 * A tier-only patch keeps the row's `updatedAt`: MCP dates a catalog-only
 * card by it, and a tier fix re-checks none of the row's text, so the card
 * must stay as old (and as `stale`) as that text.
 *
 * Never deletes rows; never changes slug, name or categoryId. Text fields
 * change only where they differ; costTier changes only while the row still
 * has the old value (a hand edit is left alone). So a re-run (and a dry run
 * after --apply) reports 0.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-11.test.ts).
 */

export const CHECKED_AT = "2026-10-26";

export type Audit11TextField = "description" | "currentPricing" | "freeTierFeatures" | "usageLimits";

export type Audit11Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  /** True when the owner checked the vendor page for this audit. */
  verified: boolean;
  fields?: Partial<Record<Audit11TextField, string>>;
  /** Changes only while the row still has `from`. */
  guarded?: { costTier: { from: string; to: string } };
};

const KRISP_PRICING = "https://krisp.ai/pricing/";
const COPILOT_PLANS = "https://github.com/features/copilot/plans";
const CANVA_PRICING = "https://www.canva.com/pricing/";

const OWNER_PATCHES: Audit11Patch[] = [
  {
    slug: "krisp",
    finding:
      "Meeting AI has no permanent free plan: a $0 Free Trial for 7 days, no credit card, all premium features. Core $16/user/mo or $8 billed annually; Advanced $30 or $15 billed annually; Enterprise custom",
    sources: [KRISP_PRICING],
    checkedAt: CHECKED_AT,
    verified: true,
    fields: {
      description:
        "Noise cancellation (on-device) with an optional AI notetaker. Noise cancellation does not require sending meeting audio to the cloud; the notetaker does capture meeting audio. As of 2026-10-13, some US states require all-party consent to record — tell attendees before using notes features and follow the law where participants are located. Meeting AI pricing (krisp.ai/pricing, as of 2026-10-26): no permanent free plan, a 7-day free trial with no credit card; Core $16/user/mo ($8 billed annually); Advanced $30/user/mo ($15 billed annually); Enterprise custom.",
      currentPricing:
        "No permanent free plan (7-day free trial, no credit card); Core $16/user/mo billed monthly or $8/user/mo billed annually; Advanced $30/user/mo billed monthly or $15/user/mo billed annually; Enterprise custom (official, as of 2026-10-26)",
      freeTierFeatures:
        "No permanent free plan; 7-day free trial with all premium features, no credit card required (official, as of 2026-10-26)",
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "github-copilot",
    finding:
      "Total AI credits a month are Pro $15, Pro+ $70, Max $200: base credits equal to the plan price ($10 / $39 / $100) plus a flex allotment ($5 / $31 / not itemized) that may change. Free has 2,000 inline suggestions a month",
    sources: [COPILOT_PLANS],
    checkedAt: CHECKED_AT,
    verified: true,
    // No "official" here: audit 10's wording pass strips it from this row's currentPricing.
    fields: {
      currentPricing:
        "Free $0; Pro $10/mo; Pro+ $39/mo; Max $100/mo. Total AI credits a month: Pro $15 ($10 base + $5 flex), Pro+ $70 ($39 base + $31 flex), Max $200 ($100 base + flex); flex may change over time; 1 credit = $0.01 (as of 2026-10-26)",
      freeTierFeatures: "Free plan: limited chat and agent usage; 2,000 inline suggestions a month (as of 2026-10-26)",
      usageLimits:
        "Free: 2,000 inline suggestions/mo plus limited chat and agent usage; Pro, Pro+ and Max: code completions and next-edit suggestions don't use AI credits, other premium usage draws on the monthly AI credits (as of 2026-10-26)",
    },
  },
  {
    // Owner verified manually in browser 2026-10-26 (Monthly and Yearly toggles).
    slug: "canva-ai-magic-studio",
    finding: "Pro is $18/month billed monthly or $144/year billed yearly (one person); Business $25/month or $250/year per person",
    sources: [CANVA_PRICING],
    checkedAt: CHECKED_AT,
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Pro $18/mo or $144/yr; Business $25/person/mo or $250/person/yr; Enterprise: contact sales (official, as of 2026-10-26)",
    },
  },
];

/** Rows whose own catalog text (or fact file) says there is no permanent free plan. */
const TRIAL_ONLY_TIERS: Audit11Patch[] = [
  {
    slug: "anthropic-api",
    finding: "facts/anthropic-api.ts (unverified) says there is no ongoing free API tier, pay per token; tier was FREEMIUM",
    sources: ["https://platform.claude.com/docs/en/about-claude/pricing"],
    checkedAt: CHECKED_AT,
    verified: false,
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "canopy-tax",
    finding: "freeTierFeatures says \"Free trial; no permanent free tier\"; tier was FREEMIUM",
    sources: ["https://canopytax.com"],
    checkedAt: CHECKED_AT,
    verified: false,
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "clio-manage",
    finding: "freeTierFeatures says \"7-day free trial; no permanent free tier\"; tier was FREEMIUM",
    sources: ["https://clio.com"],
    checkedAt: CHECKED_AT,
    verified: false,
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "pictory-ai",
    finding: "freeTierFeatures says \"No free plan; 14-day trial\" (as of 2026-10-14); tier was FREEMIUM",
    sources: ["https://pictory.ai"],
    checkedAt: CHECKED_AT,
    verified: false,
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "spellbook",
    finding: "freeTierFeatures says \"Free trial; no permanent free tier\"; tier was FREEMIUM",
    sources: ["https://spellbook.legal"],
    checkedAt: CHECKED_AT,
    verified: false,
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "squarespace-ai",
    finding: "freeTierFeatures says \"14-day free trial; no permanent free tier\" (row last edited 2026-04-13); tier was FREEMIUM",
    sources: ["https://squarespace.com"],
    checkedAt: CHECKED_AT,
    verified: false,
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
];

export const AUDIT_11_PATCHES: Audit11Patch[] = [...OWNER_PATCHES, ...TRIAL_ONLY_TIERS];

// ---------- pure logic ----------

export type Audit11Row = {
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  usageLimits: string | null;
  costTier: string;
};

export type Audit11Diff = { field: Audit11TextField | "costTier"; to: string };

const TEXT_FIELDS: Audit11TextField[] = ["description", "currentPricing", "freeTierFeatures", "usageLimits"];

/** Fields that differ once the patch is applied. Empty when the row already matches. */
export function diffAudit11(row: Audit11Row, patch: Audit11Patch): Audit11Diff[] {
  const diffs: Audit11Diff[] = [];
  for (const field of TEXT_FIELDS) {
    const to = patch.fields?.[field];
    if (to !== undefined && row[field] !== to) diffs.push({ field, to });
  }
  const tier = patch.guarded?.costTier;
  if (tier && row.costTier === tier.from && tier.from !== tier.to) diffs.push({ field: "costTier", to: tier.to });
  return diffs;
}

/** Prisma `data` for an update: only the differing fields. */
export function audit11UpdateData(diffs: readonly Audit11Diff[]): Record<string, string> {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to]));
}

/** Every slug audit 11 may touch, in run order. */
export function audit11Slugs(): string[] {
  return AUDIT_11_PATCHES.map((p) => p.slug);
}

/** Tier-only patches keep the row's updatedAt (see the header). */
export function audit11KeepsUpdatedAt(slug: string): boolean {
  const patch = AUDIT_11_PATCHES.find((p) => p.slug === slug);
  return Boolean(patch && !patch.fields);
}

export function diffAudit11Row(slug: string, row: Audit11Row): Audit11Diff[] {
  const patch = AUDIT_11_PATCHES.find((p) => p.slug === slug);
  return patch ? diffAudit11(row, patch) : [];
}
