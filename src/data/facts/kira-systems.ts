import type { ToolFacts } from "./types";

/**
 * Kira: kirasystems.com redirects to Litera, where the product is still named Kira (not "Litera Review").
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "kira-systems",
  lifecycle: "acquired",
  status: {
    value: {
      headline: "Kira is now sold by Litera. kirasystems.com redirects to Litera's review page, where the product is still called Kira.",
      formerName: "Kira Systems",
    },
    sourceUrl: "https://www.litera.com/capabilities/review",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Kira",
    sourceUrl: "https://www.litera.com/capabilities/review",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  company: {
    value: "Litera",
    sourceUrl: "https://www.litera.com/capabilities/review",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://www.litera.com/capabilities/review",
    sourceUrl: "https://www.litera.com/capabilities/review",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "company",
      summary: "Kira is now a Litera product; official link updated.",
    },
  ],
} satisfies ToolFacts;
