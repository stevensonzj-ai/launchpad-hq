import type { ToolFacts } from "./types";

/**
 * Healthee: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on healthee.com (healthee.co redirects there). Sold
 * to employers and benefits partners on a demo basis; no public pricing or
 * free plan. The readers found different data-use wording (an FAQ line vs a
 * privacy policy with no AI-training clause), so privacy is unverified.
 *
 * Settled in batch 3 (catalog audit 19) by the Research Analyst's check and
 * a second read: the FAQ says Healthee does not use PHI or personally
 * identifiable employee data to train AI models, and the privacy policy
 * (last modified March 27, 2026) has no AI-training clause at all (its only
 * AI mention is the Zoe assistant). Both are now recorded, citing the FAQ.
 */
export default {
  slug: "healthee",
  lifecycle: "active",
  officialUrl: {
    value: "https://healthee.com",
    note: "healthee.co returns 301 to healthee.com.",
    sourceUrl: "https://healthee.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free or individual plan. Sold to employers, benefits advisors, TPAs and PEOs through a demo; no public pricing.",
    },
    sourceUrl: "https://healthee.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Healthee now calls itself an AI-powered employee benefits platform, with an AI assistant named Zoe.",
    ],
    sourceUrl: "https://healthee.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://healthee.com/privacy-policy/",
    },
    note: "FAQ, \"Does Healthee use employee health data to train its AI models?\": \"No. Healthee does not use protected health information (PHI) or personally identifiable employee data to train AI models.\" The privacy policy (last modified March 27, 2026) has no AI or model-training clause; its only AI mention is \"our AI assistant – Zoe\", and it allows use of anonymized data for research and development.",
    sourceUrl: "https://healthee.com/faqs/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary: "First fact file: site moved to healthee.com; employer-sold, no public pricing or free plan.",
    },
    {
      date: "2026-10-29",
      field: "privacy",
      summary: "FAQ: no PHI or identifiable employee data used to train AI; the privacy policy has no AI-training clause.",
    },
  ],
} satisfies ToolFacts;
