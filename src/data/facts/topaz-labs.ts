import type { ToolFacts } from "./types";

/**
 * Topaz Labs: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on topazlabs.com. Both readers read the first
 * 100,000 of 148,212 characters of the pricing page and agree: every plan shown
 * is a subscription (monthly or annual) and no perpetual licence is sold, so the
 * row's "(perpetual)" wording and its ENTERPRISE cost tier were wrong.
 * Prices are list prices; many carry struck-through "was" prices and
 * sales, and some plans appear twice at different prices (Studio Pro $79/mo
 * or $75/mo; Topaz for Web prices), so those are left out. A free trial is not
 * mentioned in the part read. The privacy policy never mentions training AI
 * models and describes no opt-out; the terms page returned 404 for one reader.
 */
export default {
  slug: "topaz-labs",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.topazlabs.com",
    sourceUrl: "https://www.topazlabs.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Topaz Labs LLC",
    note: "Dallas, Texas address in the privacy policy.",
    sourceUrl: "https://www.topazlabs.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan listed on the pricing page; every plan shown is a subscription, and a trial is not mentioned."
    },
    sourceUrl: "https://www.topazlabs.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Topaz Photo",
        price: "$199",
        period: "year",
        limits: "$39 a month, or $25 a month on a 12-month commitment"
      },
      {
        name: "Topaz Gigapixel",
        price: "$149",
        period: "year",
        limits: "$29 a month, or $19 a month on a 12-month commitment"
      },
      {
        name: "Topaz Video",
        price: "$299",
        period: "year",
        limits: "$59 a month, or $39 a month on a 12-month commitment"
      },
      {
        name: "Topaz Studio",
        price: "$399",
        period: "year",
        limits: "$69 a month, or $45 a month on a 12-month commitment; the all-apps bundle"
      },
      {
        name: "Pro versions",
        price: "$499 to $699",
        period: "year",
        limits: "Photo Pro $599, Gigapixel Pro $499, Video Pro $699 a year; full commercial use"
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Contact sales"
      }
    ],
    note: "USD list prices, as of 2026-10-29. Sale and struck-through prices appear on the page, so figures may be promotional. Standard plans list limited commercial use for organizations under $1M USD annual revenue; Pro plans list full commercial use.",
    sourceUrl: "https://www.topazlabs.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      policyUrl: "https://www.topazlabs.com/privacy-policy"
    },
    note: "The policy does not say whether user images or videos are used to train models, describes no training opt-out, and does not state where data is processed. Its opt-outs cover ads, sales and profiling.",
    sourceUrl: "https://www.topazlabs.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: all plans are subscriptions (no perpetual licence listed); Photo $199, Gigapixel $149, Video $299, Studio $399 a year."
    }
  ],
} satisfies ToolFacts;
