import type { ToolFacts } from "./types";

const KLAP_PRICING_URL = "https://klap.app/pricing";
const KLAP_HOME_URL = "https://klap.app/";
const KLAP_PRIVACY_URL = "https://klap.app/privacy-policy";
const KLAP_API_URL = "https://klap.app/api";

/**
 * Klap (new catalog row, catalog audit 13). Yearly prices rechecked
 * 2026-11-24 against https://klap.app/pricing, which says prices were last
 * updated Nov 4, 2026. Yearly billing is $14.50 / $39.50 / $94.50 a month
 * ($174 / $474 / $1,134 a year). Month-to-month stays $29 / $79 / $189.
 * Plans are capped by clips a month, not minutes.
 */
export default {
  slug: "klap",
  lifecycle: "active",
  company: {
    value: "ZIGG SAS (doing business as Klap)",
    note: "Site footer: \"ZIGG SAS doing business as Klap\". The privacy policy says Klap is operated by ZIGG SAS, \"a company registered in France, 65 rue Roger Francois, 94700 Maisons-Alfort, France.\" Support (homepage FAQ): \"contact us on Discord or by live chat.\"",
    sourceUrl: KLAP_PRIVACY_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary:
        "No free plan for downloads: you can try Klap free on 1 video with no credit card and preview and edit the clips, but downloading and posting clips needs a paid plan. Paid exports carry no Klap branding.",
    },
    note: "Homepage FAQ, as of 2026-11-02: \"You can try Klap free on 1 video with no credit card: create a free account and Klap turns that video into clips you can preview and edit. Downloading and posting clips needs a paid plan. Paid exports carry no Klap branding.\"",
    sourceUrl: KLAP_HOME_URL,
    sourceKind: "product-page",
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$29", period: "month", limits: "100 clips a month; billed monthly, or $14.50/month billed yearly ($174 a year)" },
      { name: "Pro", price: "$79", period: "month", limits: "300 clips a month; billed monthly, or $39.50/month billed yearly ($474 a year)" },
      { name: "Pro+", price: "$189", period: "month", limits: "1,000 clips a month; billed monthly, or $94.50/month billed yearly ($1,134 a year)" },
    ],
    note: "USD. Pricing page checked 2026-11-24 (https://klap.app/pricing; the page says prices were last updated Nov 4, 2026). Yearly billing: Basic $14.50/month ($174/year, 100 clips a month), Pro $39.50/month ($474/year, 300 clips a month), Pro+ $94.50/month ($1,134/year, 1,000 clips a month). Month-to-month: $29, $79 and $189. Plans are capped by clips a month, not minutes of video. All plans include AI clipping, unlimited social accounts and analytics. Paid exports carry no Klap branding (homepage FAQ, as of 2026-11-02). Neither the pricing page nor the homepage FAQ stated a customer discount as of 2026-11-02.",
    sourceUrl: KLAP_PRICING_URL,
    checkedAt: "2026-11-24",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-24",
    status: "verified",
  },
  platforms: {
    value: ["Web", "API", "MCP server"],
    note: "klap.app links an API (klap.app/api) and an MCP server (klap.app/mcp) for Claude Code, Cursor, ChatGPT and other agents, plus Zapier, Make and n8n integrations. The API page says the API key comes from your Klap account dashboard; the pricing page does not list the API as a plan feature, so which plans include API access is not stated. The MCP page gives the server URL https://api.klap.app/mcp/agents and \"18 tools your agent can call\", and says: \"No API key: sign in with your Klap account · Uses your Klap plan · Free trial included\".",
    sourceUrl: "https://klap.app/mcp",
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: KLAP_PRIVACY_URL,
    },
    note: "Rated Medium because Klap's privacy policy (last updated 1 October 2026) says \"OpenRouter, the model providers it routes to, and OpenAI receive your transcripts and clipping instructions\" to find and score clips.",
    sourceUrl: KLAP_PRIVACY_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    status: "verified",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
  },
  features: {
    value: [
      "The app edits and transcribes videos in 52 languages (homepage FAQ, https://klap.app/).",
      "The API accepts MP4, MOV or WebM files, or a YouTube URL.",
    ],
    note: "Language support is cited only from the homepage FAQ: \"Klap edits and transcribes videos in 52 languages\". The API page gives a different, larger figure for API captions, which we do not cite. No maximum upload length or file size is stated on klap.app, /pricing or /api.",
    sourceUrl: KLAP_API_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-24",
      field: "plans",
      summary:
        "Pricing page rechecked (https://klap.app/pricing; the page says prices were last updated Nov 4, 2026). Yearly-billed prices are $14.50 / $39.50 / $94.50 a month ($174 / $474 / $1,134 a year). Month-to-month stays $29 / $79 / $189.",
    },
    {
      date: "2026-11-02",
      field: "plans",
      summary: "Catalog audit 34, rechecked on klap.app: yearly-billed prices are $14 / $39 / $94 a month (\"Save 50%\"), month-to-month $29 / $79 / $189; plans are capped at 100 / 300 / 1,000 clips a month, not minutes. Free try on 1 video, paid exports unbranded, 52 languages, MCP server details and company verified.",
    },
    {
      date: "2026-10-29",
      field: "privacy",
      summary: "Privacy reason recorded: the privacy policy says transcripts and clipping instructions go to OpenRouter, the model providers it routes to, and OpenAI. Rating stays Medium.",
    },
    {
      date: "2026-10-29",
      field: "features",
      summary: "Research Analyst verify: plans verified; language figures scoped to the app's 52; no upload-length, file-size or API-on-every-plan claim.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: Basic $29 ($14 yearly), Pro $79 ($39 yearly), Pro+ $189 ($94 yearly) for 100 / 300 / 1,000 clips a month; free try on 1 video without downloads.",
    },
  ],
} satisfies ToolFacts;
