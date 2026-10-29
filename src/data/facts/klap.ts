import type { ToolFacts } from "./types";

const KLAP_PRICING_URL = "https://klap.app/pricing";
const KLAP_HOME_URL = "https://klap.app/";
const KLAP_PRIVACY_URL = "https://klap.app/privacy-policy";

/**
 * Klap (new catalog row, catalog audit 13). Gathered 2026-10-29 from
 * klap.app only. The pricing page shows the yearly-billed monthly prices
 * ($14 / $39 / $94); the month-to-month prices are in the same page's
 * structured data ($29 / $79 / $189) and in the homepage FAQ, which states
 * both sets. The yearly totals in that structured data ($174 / $474 /
 * $1,134) work out to $14.50 / $39.50 / $94.50 a month, so the page rounds
 * down; the plan limits say so.
 */
export default {
  slug: "klap",
  lifecycle: "active",
  company: {
    value: "ZIGG SAS (doing business as Klap)",
    note: "Site footer: \"ZIGG SAS doing business as Klap\". The privacy policy says ZIGG SAS is registered in France.",
    sourceUrl: KLAP_PRIVACY_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: false,
      summary:
        "No free plan for downloads: you can try Klap free on 1 video with no credit card and preview and edit the clips, but downloading and posting clips needs a paid plan.",
    },
    note: "Homepage FAQ, as of 2026-10-29: \"You can try Klap free on 1 video with no credit card ... Downloading and posting clips needs a paid plan.\"",
    sourceUrl: KLAP_HOME_URL,
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$29", period: "month", limits: "Billed monthly; $14/month billed yearly ($174 a year); 100 clips a month" },
      { name: "Pro", price: "$79", period: "month", limits: "Billed monthly; $39/month billed yearly ($474 a year); 300 clips a month" },
      { name: "Pro+", price: "$189", period: "month", limits: "Billed monthly; $94/month billed yearly ($1,134 a year); 1,000 clips a month" },
    ],
    note: "USD, as of 2026-10-29. The pricing page displays the yearly-billed monthly prices; the monthly prices and yearly totals are from the same page's structured data and match the homepage FAQ. The yearly totals divide to $14.50, $39.50 and $94.50 a month. All plans include AI clipping, unlimited social accounts and analytics. Paid exports carry no Klap branding (homepage FAQ).",
    sourceUrl: KLAP_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "API", "MCP server"],
    note: "klap.app links an API (klap.app/api) and an MCP server (klap.app/mcp) for Claude Code, Cursor, ChatGPT and other agents, plus Zapier, Make and n8n integrations.",
    sourceUrl: KLAP_HOME_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: Basic $29 ($14 yearly), Pro $79 ($39 yearly), Pro+ $189 ($94 yearly) for 100 / 300 / 1,000 clips a month; free try on 1 video without downloads.",
    },
  ],
} satisfies ToolFacts;
