import type { ToolFacts } from "./types";

/**
 * Windsurf: renamed Devin Desktop by Cognition (blog post dated 2026-06-02). windsurf.com redirects to devin.ai/desktop.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "windsurf",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Cognition renamed Windsurf to Devin Desktop in June 2026. Existing users get the change as a routine update, and Cognition says plans, pricing and extensions stay the same.",
      formerName: "Windsurf",
      whatToDo: "Nothing to do. Our getting-started guide still uses the Windsurf name in places.",
    },
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Devin Desktop",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://devin.ai/desktop",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
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
      summary: "Windsurf renamed Devin Desktop; official link now devin.ai/desktop.",
    },
  ],
} satisfies ToolFacts;
