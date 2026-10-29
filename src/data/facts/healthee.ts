import type { ToolFacts } from "./types";

/**
 * Healthee: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on healthee.com (healthee.co redirects there). Sold
 * to employers and benefits partners on a demo basis; no public pricing or
 * free plan. The readers found different data-use wording (an FAQ line vs a
 * privacy policy with no AI-training clause), so privacy is unverified.
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
    note: "FAQ (one reader): \"Healthee does not use protected health information (PHI) or personally identifiable employee data to train AI models.\" The privacy policy (other reader, last modified 2026-03-27) does not mention AI training and allows use of anonymized data for research and development.",
    sourceUrl: "https://healthee.com/faqs/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary: "First fact file: site moved to healthee.com; employer-sold, no public pricing or free plan.",
    },
  ],
} satisfies ToolFacts;
