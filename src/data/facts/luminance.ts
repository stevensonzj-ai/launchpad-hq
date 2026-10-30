import type { ToolFacts } from "./types";

/**
 * Luminance: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on luminance.com. Demo-request only: no
 * price, free plan or trial on the pages read. The website privacy policy
 * names "Luminance Technologies Ltd or Luminance, Inc". It does not say
 * customer content trains models; it lists retained learning and tagging data
 * for product improvement "provided no Personal Data is contained", describes no
 * training opt-out, and says data is stored on servers in Cambridge, United
 * Kingdom. Customer data is governed by the customer contract (not read).
 */
export default {
  slug: "luminance",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.luminance.com",
    note: "Footer: \"© 2026 Luminance. All rights reserved.\"",
    sourceUrl: "https://www.luminance.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Luminance Technologies Ltd or Luminance, Inc",
    note: "The privacy policy is issued by \"Luminance Technologies Ltd or Luminance, Inc\" on behalf of the Luminance Group.",
    sourceUrl: "https://www.luminance.com/legal/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan or trial listed; the only call to action is a demo request."
    },
    sourceUrl: "https://www.luminance.com/",
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
    sourceUrl: "https://www.luminance.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      policyUrl: "https://www.luminance.com/legal/privacy-policy"
    },
    note: "Website privacy policy only. It does not explicitly say customer content trains models; it lists retention of \"results, learning and tagging data\" for improving products \"provided no Personal Data is contained in the retained data\". No opt-out from that use is described; the opt-outs cover marketing. Data is stored on \"Luminance servers located in Cambridge, United Kingdom\" and may be processed worldwide. Customer data follows the customer contract, which was not read.",
    sourceUrl: "https://www.luminance.com/legal/privacy-policy",
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
      summary: "First fact file: demo request only, no public pricing or trial; privacy policy: servers in Cambridge UK, no explicit training clause."
    }
  ],
} satisfies ToolFacts;
