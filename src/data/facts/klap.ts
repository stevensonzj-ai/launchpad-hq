import type { ToolFacts } from "./types";

const KLAP_PRICING_URL = "https://klap.app/pricing";
const KLAP_HOME_URL = "https://klap.app/";
const KLAP_PRIVACY_URL = "https://klap.app/privacy-policy";
const KLAP_API_URL = "https://klap.app/api";

/**
 * Klap (new catalog row, catalog audit 13; rechecked in catalog audit 34 on
 * 2026-11-02 against klap.app only). The pricing page shows the
 * yearly-billed monthly prices ($14 / $39 / $94, "Save 50%"); the homepage
 * FAQ states both those and the month-to-month prices ($29 / $79 / $189).
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
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$29", period: "month", limits: "100 clips a month; billed monthly, or $14/month billed yearly" },
      { name: "Pro", price: "$79", period: "month", limits: "300 clips a month; billed monthly, or $39/month billed yearly" },
      { name: "Pro+", price: "$189", period: "month", limits: "1,000 clips a month; billed monthly, or $94/month billed yearly" },
    ],
    note: "USD, as of 2026-11-02. Pricing page: \"Only pay for clips you generate.\" With \"Yearly\" selected (\"Save 50%\") it shows Basic 100 clips /mo $14 /mo, Pro 300 clips /mo $39 /mo and Pro+ 1000 clips /mo $94 /mo, each \"Billed yearly\". The homepage FAQ gives the month-to-month prices: \"($29, $79 and $189 month to month)\". Plans are capped by clips a month, not minutes of video; neither page states a minute, upload-length or file-size cap. All plans include AI clipping, unlimited social accounts and analytics. Paid exports carry no Klap branding (homepage FAQ). Neither page states a customer discount.",
    sourceUrl: KLAP_PRICING_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-11-02",
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
