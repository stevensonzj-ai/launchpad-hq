import type { ToolFacts } from "./types";

/**
 * Zillow AI / Zestimate: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Every zillow.com page returned 403 to both readers, so the consumer
 * claims (free use, Zestimates on all homes, no limits) are left as the
 * row has them (Browser-check list). Both read Zillow Group's developer
 * pages: the Zestimates API is request-access and aimed at businesses.
 */
export default {
  slug: "zillow-ai-zestimate",
  lifecycle: "active",
  features: {
    value: [
      "Zillow Group's Zestimates API is available by request and is \"really for commercial use cases by businesses\"; its cost is not stated.",
    ],
    sourceUrl: "https://www.zillowgroup.com/developers/api/zestimate/zestimates-api/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: Zestimates API is request-access for businesses; consumer pages blocked (browser check).",
    },
  ],
} satisfies ToolFacts;
