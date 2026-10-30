import type { ToolFacts } from "./types";

/**
 * SciSpace: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. scispace.com/pricing and /privacy-policy returned 403 to both
 * readers, so plans, free tier and privacy are unread and the row's pricing text
 * is left as it is (Browser-check list). Both readers saw typeset.io (the row's
 * old website) answer with a 301 redirect to scispace.com.
 */
export default {
  slug: "scispace",
  lifecycle: "active",
  officialUrl: {
    value: "https://scispace.com",
    note: "typeset.io/pricing returns a 301 redirect to scispace.com/pricing.",
    sourceUrl: "https://typeset.io/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary: "First fact file: typeset.io redirects to scispace.com; pricing and privacy pages blocked (403)."
    }
  ],
} satisfies ToolFacts;
