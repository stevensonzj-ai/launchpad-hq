import type { ToolFacts } from "./types";

/**
 * Harvey AI: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on harvey.ai. Sold through a demo request;
 * harvey.ai/pricing returns 404 and no price, free plan or trial is listed
 * (the only buttons are Request a Demo and Login). The homepage promotes
 * Harvey II. One reader also read the security page (never trains on customer
 * data by default; Azure hosting in the US, EU, Switzerland and Australia; SOC 2
 * Type II and ISO certificates); the other read the privacy policy, which says
 * it does not apply to input or output on the platform and gives no training
 * opt-out. The training statement therefore stays unverified.
 */
export default {
  slug: "harvey-ai",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.harvey.ai",
    sourceUrl: "https://www.harvey.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Harvey AI Corporation",
    note: "Homepage footer: \"Copyright © 2026 Harvey AI Corporation.\"",
    sourceUrl: "https://www.harvey.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan or self-serve trial listed; access starts with a demo request."
    },
    sourceUrl: "https://www.harvey.ai/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "No public prices; request a demo"
      }
    ],
    note: "harvey.ai/pricing returns 404.",
    sourceUrl: "https://www.harvey.ai/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://www.harvey.ai/legal/privacy-policy"
    },
    note: "One reader: the security page says Harvey \"by default, never trains on customer data\" and contractually bars model providers from training on it. The other reader found the privacy policy excludes platform input and output (governed by the Customer Agreement, not read) and gives no training opt-out.",
    sourceUrl: "https://www.harvey.ai/security",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: no public pricing, free plan or trial; demo request only; Harvey II announced."
    }
  ],
} satisfies ToolFacts;
