import type { ToolFacts } from "./types";

/**
 * Relay.app: shut down September 2026. Hidden (low brand search).
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "relay-app",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline: "Relay.app shut down in September 2026. Its website says all accounts, workflows and run history have been permanently deleted.",
      whatToDo: "There is nothing left to export: the company says the data has already been deleted.",
    },
    sourceUrl: "https://relay.app/",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "visibility",
      summary:
        "Shutdown notice re-read on relay.app (catalog audit 26). /platform/relay-app now 301s to /alternatives/free-zapier-alternatives.",
    },
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked discontinued and hidden (noindex, out of sitemap and listings).",
    },
  ],
} satisfies ToolFacts;
