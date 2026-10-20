import type { ToolFacts } from "./types";

/**
 * CoCounsel: a Thomson Reuters product; casetext.com redirects to thomsonreuters.com/en/cocounsel.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "casetext-cocounsel",
  lifecycle: "acquired",
  status: {
    value: {
      headline: "CoCounsel is now a Thomson Reuters product, and casetext.com redirects to Thomson Reuters' CoCounsel page.",
      formerName: "Casetext (CoCounsel)",
    },
    sourceUrl: "https://www.thomsonreuters.com/en/cocounsel",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "CoCounsel",
    sourceUrl: "https://www.thomsonreuters.com/en/cocounsel",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  company: {
    value: "Thomson Reuters",
    sourceUrl: "https://www.thomsonreuters.com/en/cocounsel",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://www.thomsonreuters.com/en/cocounsel",
    sourceUrl: "https://www.thomsonreuters.com/en/cocounsel",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "Listed as CoCounsel by Thomson Reuters; official link updated.",
    },
  ],
} satisfies ToolFacts;
