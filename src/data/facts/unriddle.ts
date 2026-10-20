import type { ToolFacts } from "./types";

/**
 * Unriddle: renamed Anara (Anara blog, 2025-03-23). unriddle.ai redirects to anara.com.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "unriddle",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Unriddle announced on March 23, 2025 that it changed its name to Anara.",
      formerName: "Unriddle",
      whatToDo: "Nothing to do. unriddle.ai redirects to anara.com, and our getting-started guide still uses the Unriddle name in places.",
    },
    sourceUrl: "https://anara.com/blog/the-beginning-of-a-new-story",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Anara",
    sourceUrl: "https://anara.com/blog/the-beginning-of-a-new-story",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://anara.com/",
    sourceUrl: "https://anara.com/blog/the-beginning-of-a-new-story",
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
      summary: "Unriddle renamed Anara; official link now anara.com.",
    },
  ],
} satisfies ToolFacts;
