import type { ToolFacts } from "./types";

/**
 * Dragon Medical One: first fact file, stale-facts batch 2 (catalog audit
 * 18), 2026-10-29. Read twice on microsoft.com. nuance.com product pages now
 * redirect to Microsoft's Dragon Medical One page. No public prices, free
 * tier or usage limits; Microsoft offers existing customers a migration path
 * to Dragon Copilot (no retirement date given).
 *
 * Added in batch 3 (catalog audit 19), from the Research Analyst's check and
 * a second read the same day: Dragon Medical One LTSR version 2021.4.5 and
 * earlier stop working after December 31, 2026, when the cloud service
 * blocks them (banner on dragonmedicalone.nuance.com, and Microsoft Learn's
 * upgrade page). That installer subdomain is still live.
 */
export default {
  slug: "dragon-medical-one",
  lifecycle: "active",
  status: {
    value: {
      headline:
        "Dragon Medical One LTSR version 2021.4.5 and earlier will reach end of life and stop working after December 31, 2026, when the Dragon Medical One cloud service blocks them.",
      whatToDo:
        "Microsoft says to upgrade LTSR and earlier versions before December 31, 2026 to avoid service disconnection.",
      additionalSources: ["https://learn.microsoft.com/en-us/industry/healthcare/dragon-medical-one/admin/upgrade-dragon-medical-one"],
    },
    note: "Banner: \"Dragon Medical One LTSR (version 2021.4.5 or earlier) will be end of life and no longer function after December 31, 2026.\" Learn: \"LTSR version 2021.4.5 and earlier versions stop working after 31 December 2026, as the Dragon Medical One cloud system blocks them.\"",
    sourceUrl: "https://dragonmedicalone.nuance.com",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
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
    {
      date: "2026-10-29",
      field: "status",
      summary: "End-of-life notice: LTSR 2021.4.5 and earlier stop working after December 31, 2026.",
    },
  ],
} satisfies ToolFacts;
