import type { ToolFacts } from "./types";

/**
 * Runway for Education: the old runwayml.com/education link returns 404.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "runway-for-education",
  lifecycle: "active",
  officialUrl: {
    value: "https://runway.com/educators",
    sourceUrl: "https://runway.com/educators",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "officialUrl",
      summary: "Official link fixed to runway.com/educators (old education URL 404s).",
    },
  ],
} satisfies ToolFacts;
