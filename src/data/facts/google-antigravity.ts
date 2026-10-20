import type { ToolFacts } from "./types";

/**
 * Google Antigravity: the catalog row pointed at idx.google.com, which now redirects to Firebase Studio.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "google-antigravity",
  lifecycle: "active",
  officialUrl: {
    value: "https://antigravity.google/",
    sourceUrl: "https://antigravity.google/",
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
      summary: "Official link fixed to antigravity.google (was idx.google.com, which redirects to Firebase Studio).",
    },
  ],
} satisfies ToolFacts;
