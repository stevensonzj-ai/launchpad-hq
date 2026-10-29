import type { ToolFacts } from "./types";

const KLAP_PRICING_URL = "https://klap.app/pricing";
const KLAP_HOME_URL = "https://klap.app/";
const KLAP_PRIVACY_URL = "https://klap.app/privacy-policy";
const KLAP_API_URL = "https://klap.app/api";

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
    note: "USD, as of 2026-10-29. The pricing page displays the yearly-billed monthly prices; the monthly prices and yearly totals are from the same page's structured data and match the homepage FAQ. The yearly totals divide to $14.50, $39.50 and $94.50 a month. All plans include AI clipping, unlimited social accounts and analytics. Paid exports carry no Klap branding (homepage FAQ). Caps are clips a month; neither page states a minute, upload-length, file-size or export cap. Neither page states a customer discount. Research Analyst verify 2026-10-29: klap.app/pricing and the homepage FAQ (https://klap.app/).",
    sourceUrl: KLAP_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  platforms: {
    value: ["Web", "API", "MCP server"],
    note: "klap.app links an API (klap.app/api) and an MCP server (klap.app/mcp) for Claude Code, Cursor, ChatGPT and other agents, plus Zapier, Make and n8n integrations. The API page says the API key comes from your Klap account dashboard; the pricing page does not list the API as a plan feature, so which plans include API access is not stated.",
    sourceUrl: KLAP_HOME_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    status: "unverified",
  },
  features: {
    value: [
      "The app edits and transcribes videos in 52 languages (homepage FAQ, https://klap.app/).",
      "The API adds captions in over 100 languages (API page, https://klap.app/api); Klap does not reconcile this with the app figure.",
      "The API accepts MP4, MOV or WebM files, or a YouTube URL.",
    ],
    note: "Each language figure applies only to the scope its page gives: 52 for editing and transcription in the app, over 100 for captions through the API. No maximum upload length or file size is stated on klap.app, /pricing or /api.",
    sourceUrl: KLAP_API_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "Research Analyst verify: plans verified; language figures scoped (52 in the app, 100+ for API captions); no upload-length, file-size or API-on-every-plan claim.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: Basic $29 ($14 yearly), Pro $79 ($39 yearly), Pro+ $189 ($94 yearly) for 100 / 300 / 1,000 clips a month; free try on 1 video without downloads.",
    },
  ],
} satisfies ToolFacts;
