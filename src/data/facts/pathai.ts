import type { ToolFacts } from "./types";

/**
 * PathAI: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Sold to labs, hospitals and drug companies through a demo request; no
 * prices, free tier or trial anywhere on the site. Both readers saw the
 * homepage banner on the pending Roche acquisition (Roche's release,
 * linked from that banner, is dated 2026-05-07). Neither found an API
 * mentioned, so the row's apiAvailable is left alone.
 */
export default {
  slug: "pathai",
  lifecycle: "active",
  status: {
    value: {
      headline:
        "PathAI has entered into a definitive merger agreement to be acquired by Roche. Roche announced the deal on May 7, 2026 and expects it to close in the second half of the year.",
      details: ["PathAI's site still offers its products through demo requests; neither page says whether the PathAI name will stay."],
      additionalSources: ["https://www.roche.com/media/releases/med-cor-2026-05-07"],
    },
    note: "Homepage banner: \"PathAI has entered into a definitive merger agreement to be acquired by Roche to transform AI-driven diagnostics\", linking to Roche's release of 2026-05-07.",
    sourceUrl: "https://www.pathai.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  officialUrl: {
    value: "https://www.pathai.com",
    note: "pathai.com resolves to www.pathai.com.",
    sourceUrl: "https://www.pathai.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "PathAI, Inc.",
    note: "\"Copyright © 2026 PathAI, Inc.\"",
    sourceUrl: "https://www.pathai.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free tier, trial or published prices; access starts with a demo request.",
    },
    sourceUrl: "https://www.pathai.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Products include the AISight digital pathology platform (AISight Dx is FDA 510(k) cleared and CE-IVDR marked) and AI pathology algorithms for drug development.",
    ],
    sourceUrl: "https://www.pathai.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: "https://www.pathai.com/policies-and-notices",
    },
    note: "The privacy policy does not mention AI or model training; it allows use of information to improve and develop its platforms.",
    sourceUrl: "https://www.pathai.com/policies-and-notices",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: no public pricing or free tier (demo request only); Roche acquisition pending.",
    },
  ],
} satisfies ToolFacts;
