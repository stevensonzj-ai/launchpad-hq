import type { ToolFacts } from "./types";

/**
 * Zillow AI / Zestimate: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Every zillow.com page returned 403 to both readers, so the consumer
 * claims (free use, Zestimates on all homes, no limits) were left as the
 * row had them. Both read Zillow Group's developer pages: the Zestimates
 * API is request-access and aimed at businesses (cost not stated).
 *
 * Research Analyst browser check, 2026-10-29 (catalog audit 20): Zillow's
 * news post of October 21, 2026 lists its AI surfaces: a Zillow app in
 * ChatGPT, a Zillow connector in Claude, a rentals-only Zillow feature in
 * Gemini, and AI mode on Zillow. No page states a cost for them, so the row
 * says "not stated" instead of "completely free".
 */
export default {
  slug: "zillow-ai-zestimate",
  lifecycle: "active",
  features: {
    value: [
      "Zillow has an app in ChatGPT and a connector in Anthropic's Claude; both use one Zillow MCP connection (listings, home values, affordability).",
      "Zillow has a rentals-only feature inside Google's Gemini (tour booking).",
      "AI mode is Zillow's own built-in conversational experience.",
      "Zillow does not state a cost for these AI features.",
    ],
    note: "News post, October 21, 2026: \"a Zillow app in ChatGPT, a Zillow Rentals feature inside Google's Gemini and a Zillow connector in Anthropic's Claude\"; \"Zillow is putting AI technology into its built-in conversational experience, AI mode.\" Separately, Zillow Group's Zestimates API is available by request and is \"really for commercial use cases by businesses\"; its cost is not stated (https://www.zillowgroup.com/developers/api/zestimate/zestimates-api/).",
    sourceUrl: "https://www.zillow.com/news/when-people-ask-ai-about-housing-chatgpt-gemini-and-claude-all-connect-to-zillow/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: Zestimates API is request-access for businesses; consumer pages blocked (browser check).",
    },
    {
      date: "2026-10-29",
      field: "features",
      summary: "Browser check: ChatGPT app, Claude connector, rentals-only Gemini feature and AI mode; cost not stated.",
    },
  ],
} satisfies ToolFacts;
