import type { ToolFacts } from "./types";

/**
 * Google Antigravity CLI (new catalog row, catalog audit 19), 2026-10-29.
 * Official Google pages only, read twice: the Research Analyst's check
 * (curl, plus a browser addendum for gemini.google/subscriptions and the
 * per-plan model table) and a second blind read the same day. Both agree
 * on everything below except the training opt-out: the analyst found
 * none stated; the second read found a Settings preference on how data
 * is used and a FAQ line on opting out of data collection. So the opt-out
 * is "not confirmed" (Browser-check list) and the row stays LOW as
 * briefed: Google uses Interactions to improve its ML, and reviewers may
 * see them. Not open source: no public source or licence; distributed as
 * a binary under the Antigravity Additional Terms. Numeric requests per
 * minute or per day: not stated. Replaces Gemini CLI for free individual
 * and Google AI Pro / Ultra use (2026-06-18).
 */
export default {
  slug: "antigravity-cli",
  lifecycle: "active",
  officialUrl: {
    value: "https://antigravity.google/product/antigravity-cli",
    sourceUrl: "https://antigravity.google/product/antigravity-cli",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Google",
    sourceUrl: "https://antigravity.google/terms",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$0 for individuals with a personal Google account (18+, supported countries): a variety of agent models, unlimited Tab completions and Command requests, and a quota refreshed weekly. Numeric limits are not stated.",
    },
    note: "Pricing: \"For Individuals $0/month … Basic weekly rate limits\". Plans: \"A meaningful quota, refreshed weekly\". FAQ: \"Personal Google Accounts (such as @gmail.com addresses) can use Google Antigravity on any plan, including the free tier.\"",
    sourceUrl: "https://antigravity.google/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        limits: "Quota refreshed weekly; basic weekly rate limits",
      },
      {
        name: "Google AI Pro",
        price: "$19.99",
        period: "month",
        limits: "A high quota refreshed every five hours until a weekly limit is reached; flexible AI credit pool",
      },
      {
        name: "Google AI Ultra",
        price: "$99.99",
        period: "month",
        limits: "5x AI Pro usage; the highest quota, refreshed every five hours; third-party models",
      },
      {
        name: "Google AI Ultra (20x)",
        price: "$199.99",
        period: "month",
        limits: "20x AI Pro usage; highest rate limits",
      },
      {
        name: "Gemini Enterprise Standard / Plus",
        price: "From $30",
        period: "seat/month",
        limits: "Organisations, through Google Cloud",
      },
      {
        name: "Gemini Enterprise pay-as-you-go",
        price: "$0 seat fee",
        period: "",
        limits: "Consumption-based pricing",
      },
    ],
    note: "USD, as of 2026-10-29. Google AI Pro and Ultra prices are from gemini.google/subscriptions (browser check, no annual prices shown); quota wording from antigravity.google/docs/plans. Pro and Ultra can buy AI credits for overage, at Gemini Enterprise consumption pricing. Google AI Plus ($4.99/mo) shows no Antigravity benefit; the models table groups it with Free.",
    sourceUrl: "https://antigravity.google/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  platforms: {
    value: [
      "macOS",
      "Windows (64-bit)",
      "Linux",
      "Android (Termux)",
    ],
    note: "Installer: \"Antigravity CLI currently supports 64-bit Windows, macOS, and Linux\", amd64 and arm64, with Termux builds. Installed with a curl script (macOS, Linux) or PowerShell / CMD (Windows); it updates itself. No npm or Homebrew method is stated.",
    sourceUrl: "https://antigravity.google/docs/getting-started",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  models: {
    value: [
      "All plans: a Gemini Flash model as the core agent model",
      "Google AI Pro and Ultra: Google's newest Gemini model and Anthropic's latest Claude models (Pro: non-trial subscriptions)",
      "Free and Google AI Plus: older Claude models and GPT-OSS-120b until 2026-11-02, when Google says they will be removed",
    ],
    note: "Models table, 2026-10-29 (browser check and second read): Free & Google AI Plus get Gemini 3.8 Flash, Claude Sonnet/Opus 4.6 and GPT-OSS-120b; the last two are marked \"Will be removed on November 2, 2026.\" Gemini 4 Argon needs a paid Google AI Pro plan (or an eligible-device trial); Claude Sonnet/Opus 5.5 are on Pro (non-trial) and Ultra.",
    sourceUrl: "https://antigravity.google/docs/models",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Terminal-first surface for Antigravity agents; the command is `agy`. It shares the agent harness of the Antigravity 2.0 desktop app.",
      "Subagents, slash commands, plugins, MCP servers, skills and hooks; Gemini CLI extensions carry over as Antigravity plugins.",
      "Replaced Gemini CLI for free individual use and for Google AI Pro and Ultra on 2026-06-18 (announced 2026-05-19); Google says there is no 1:1 feature parity.",
      "No bring-your-own-key support.",
      "Not open source: no public source repository or licence; it is distributed as a binary under the Antigravity terms.",
    ],
    sourceUrl: "https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://antigravity.google/terms",
    },
    note: "Antigravity terms (individual accounts): \"We use Interactions to evaluate, develop, and improve Google and Alphabet research, products, services and machine learning technologies\"; \"Google employees and contractors may access, view, review and use Interactions\"; \"Please don't submit confidential information\". Deletion is by email request to Google's Antigravity support. The Google Privacy Policy applies. A training opt-out is not confirmed: one read found none; the other found a Settings preference on how data is used. Enterprise accounts follow their administrator's Google Cloud terms.",
    sourceUrl: "https://antigravity.google/terms",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file (new row): $0 for individuals with a weekly quota; Google AI Pro $19.99 and Ultra from $99.99 a month; Gemini Enterprise from $30/seat. Not open source.",
    },
  ],
} satisfies ToolFacts;
