import type { ToolFacts } from "./types";

/**
 * Shopify Magic / Sidekick: first fact file, stale-facts batch 2 (catalog
 * audit 18), 2026-10-29. Read twice on shopify.com. Shopify's AI is now
 * called Sidekick and is included with paid Shopify plans. There is no free
 * store plan (a 3-day trial, then $1/month for 3 months), so the row moves
 * from FREEMIUM to PAID. A $0 "Agentic" plan for selling in AI channels is
 * listed; whether it includes Sidekick is not stated, so it is left out of
 * the plans. One reader saw shopify.com/magic serve the Sidekick page, the
 * other could not tell whether it redirects to /sidekick; the website is
 * left alone. The row name is unchanged.
 */
/*
 * Catalog audit 22 (2026-10-30): slug moved from shopify-magic-sidekick to shopify-sidekick and the listing
 * renamed Shopify Sidekick (301 in src/lib/catalog-redirects.ts; DB row renamed by
 * scripts/update-catalog-audit-22.ts). https://www.shopify.com/sidekick checked 2026-10-30.
 */
export default {
  slug: "shopify-sidekick",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Shopify now calls its built-in AI Sidekick; shopify.com/magic redirects to the Sidekick page.",
      formerName: "Shopify Magic",
      whatToDo: "Nothing changes for existing users. Old Shopify Magic pages here redirect to this one.",
    },
    sourceUrl: "https://www.shopify.com/sidekick",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  displayName: {
    value: "Shopify Sidekick",
    sourceUrl: "https://www.shopify.com/sidekick",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  officialUrl: {
    value: "https://www.shopify.com/sidekick",
    sourceUrl: "https://www.shopify.com/sidekick",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  company: {
    value: "Shopify",
    sourceUrl: "https://www.shopify.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free store plan: a 3-day free trial with no card, then $1/month for 3 months. Sidekick is included with paid plans.",
    },
    sourceUrl: "https://www.shopify.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$39",
        period: "month",
        limits: "$29/month billed yearly; built-in AI assistant",
      },
      {
        name: "Grow",
        price: "$105",
        period: "month",
        limits: "$79/month billed yearly; Sidekick included",
      },
      {
        name: "Advanced",
        price: "$399",
        period: "month",
        limits: "$299/month billed yearly; Sidekick included",
      },
      {
        name: "Plus",
        price: "From $2,300",
        period: "month",
        limits: "Sidekick included",
      },
    ],
    note: "USD, as of 2026-10-29. The pricing page lists AI usage per plan as \"Millions of tokens\". It also lists a $0 Agentic plan \"for selling in AI channels\" (pay when you sell).",
    sourceUrl: "https://www.shopify.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Shopify's AI is branded Sidekick; the pricing page no longer names Shopify Magic.",
      "The pricing page lists a $0 Agentic plan for selling in AI channels.",
    ],
    sourceUrl: "https://www.shopify.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
    },
    note: "Shopify enterprise blog (not a legal policy): \"Store data is never used to train foundation models or shared with other merchants.\"",
    sourceUrl: "https://www.shopify.com/enterprise/blog/sidekick-ai-enterprise",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "displayName",
      summary: "Renamed Shopify Magic -> Shopify Sidekick; slug shopify-magic-sidekick -> shopify-sidekick; official link https://www.shopify.com/sidekick.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: Sidekick included with paid plans from $39/mo ($29 yearly); no free plan, 3-day trial. Replaces \"Unlimited AI features\" and FREEMIUM.",
    },
  ],
} satisfies ToolFacts;
