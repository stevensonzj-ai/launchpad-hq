import type { ToolFacts } from "./types";

/**
 * Dragon Medical One: first fact file, stale-facts batch 2 (catalog audit
 * 18), 2026-10-29. Read twice on microsoft.com. nuance.com product pages now
 * redirect to Microsoft's Dragon Medical One page. No public prices, free
 * tier or usage limits; Microsoft offers existing customers a migration path
 * to Dragon Copilot (no retirement date given).
 */
export default {
  slug: "dragon-medical-one",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
    note: "nuance.com Dragon Medical One URLs return 301 to this page.",
    sourceUrl: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Microsoft",
    note: "Sold under Microsoft for Healthcare (Microsoft completed its acquisition of Nuance in 2022).",
    sourceUrl: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan or trial listed. Licences are bought through Microsoft; no prices are published.",
    },
    sourceUrl: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "The product page offers existing customers a migration path to Microsoft Dragon Copilot (\"Migrate from Dragon Medical One to Dragon Copilot\"); no retirement date is given.",
    ],
    sourceUrl: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
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
      summary: "First fact file: product page moved to microsoft.com; no public pricing or limits; Dragon Copilot migration offered.",
    },
  ],
} satisfies ToolFacts;
