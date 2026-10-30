import type { ToolFacts } from "./types";

/**
 * Canopy: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * canopytax.com now redirects to getcanopy.com. Plans are per user a
 * month, billed annually: Standard $74, Plus $109, Premium $149 (coming
 * soon), Enterprise custom. The row's "from $50" and "$39/user" are
 * gone ($50 is the Tax Resolution add-on). A trial is set up through a
 * sales demo; its length is not stated.
 */
export default {
  slug: "canopy-tax",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.getcanopy.com",
    note: "canopytax.com returns 301 to www.getcanopy.com.",
    sourceUrl: "https://www.getcanopy.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. A trial is arranged through a sales demo; its length is not stated.",
    },
    sourceUrl: "https://www.getcanopy.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Standard",
        price: "$74",
        period: "user/month",
        limits: "Billed annually; AI Notetaker (beta) 8 hours per user a month",
      },
      {
        name: "Plus",
        price: "$109",
        period: "user/month",
        limits: "Billed annually; AI Notetaker (beta) 12 hours per user a month",
      },
      {
        name: "Premium",
        price: "$149",
        period: "user/month",
        limits: "Billed annually; marked coming soon; AI Notetaker (beta) 16 hours per user a month",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
      {
        name: "Tax Resolution add-on",
        price: "$50",
        period: "user/month",
        limits: "Annual billing; volume discounts available",
      },
    ],
    note: "USD, as of 2026-10-29. The page says annual billing saves 20%; monthly-billed prices are not shown.",
    sourceUrl: "https://www.getcanopy.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: "https://www.getcanopy.com/privacy-policy",
    },
    note: "The privacy policy does not say whether customer data trains AI models; it lists OpenAI among providers that \"may be used to generate emails, to automate tasks\".",
    sourceUrl: "https://www.getcanopy.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: Standard $74 / Plus $109 / Premium $149 per user/mo billed annually; replaces \"From $50/mo\" and \"$39/user/mo\"; site moved to getcanopy.com.",
    },
  ],
} satisfies ToolFacts;
