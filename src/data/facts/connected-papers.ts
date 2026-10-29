import type { ToolFacts } from "./types";

/**
 * Connected Papers: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page is a JavaScript app that loads prices from
 * its payment provider at page load. One reader found the free-tier
 * wording in the page code ("Our free tier includes all of the features
 * and provides you with 5 Connected Papers graphs for free, every month";
 * paid plans Academic and Business, billed annually or quarterly); the
 * second reader could not render the page. So no free-tier or plan facts
 * are recorded and the row's pricing text is left as it is. On the
 * Browser-check list.
 */
export default {
  slug: "connected-papers",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.connectedpapers.com",
    note: "connectedpapers.com serves the www host.",
    sourceUrl: "https://www.connectedpapers.com/",
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
      summary:
        "First fact file: site address only; free-tier limit and Academic / Business prices need a browser check.",
    },
  ],
} satisfies ToolFacts;
