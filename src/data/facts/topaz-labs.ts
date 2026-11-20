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
 *
 * Catalog audit 21 (Research Analyst browser check, 2026-10-29) read the
 * pricing page and confirmed: no free plan is listed; Topaz Studio (all apps,
 * 300 monthly video cloud credits) is $399 a year, $45 a month on an annual
 * commitment, or $69 a month month to month; Studio Pro (600 credits, full
 * commercial use) is $799 a year, and its monthly price is left out because
 * the page shows both $79 and $75. Single apps match the plans below.
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
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Topaz Studio",
        price: "$499",
        period: "year",
        limits: "$49/month billed annually, or $79/month month to month"
      },
      {
        name: "Topaz Studio Pro",
        price: "$799",
        period: "year",
        limits: "$79/month billed annually"
      },
      { name: "Topaz Photo", price: "$199", period: "year", limits: "" },
      { name: "Topaz Gigapixel", price: "$149", period: "year", limits: "" },
      { name: "Topaz Video", price: "$299", period: "year", limits: "" },
      { name: "Topaz for Web - Image", price: "$199", period: "year", limits: "" },
      { name: "Topaz for Web - Video", price: "$299", period: "year", limits: "" },
      { name: "Topaz for Web Pro", price: "$599", period: "year", limits: "" },
      { name: "Topaz Photo Pro", price: "$599", period: "year", limits: "" },
      { name: "Topaz Gigapixel Pro", price: "$499", period: "year", limits: "" },
      { name: "Topaz Video Pro", price: "$699", period: "year", limits: "" }
    ],
    note: "USD list prices are the struck was-prices, read 2026-11-20. A Black Friday sale is running and the page states no end date, so sale prices are not recorded. The Monthly view says Studio includes all 7 apps; the other views say all 5 apps.",
    sourceUrl: "https://www.topazlabs.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
      date: "2026-11-20",
      field: "plans",
      summary: "List prices are the struck was-prices. Studio is $499/yr. A Black Friday sale is running with no stated end date, so sale prices are not recorded."
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Browser check (audit 21): no free plan; Studio $399 a year, $45 a month on an annual commitment or $69 month to month; Studio Pro $799 a year."
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: all plans are subscriptions (no perpetual licence listed); Photo $199, Gigapixel $149, Video $299, Studio $399 a year."
    }
  ],
} satisfies ToolFacts;
