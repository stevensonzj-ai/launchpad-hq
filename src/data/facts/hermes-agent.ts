import type { ToolFacts } from "./types";

const HERMES_HOME_URL = "https://hermes-agent.nousresearch.com/";
const HERMES_REPO_URL = "https://github.com/NousResearch/hermes-agent";
const PORTAL_PRIVACY_URL = "https://portal.nousresearch.com/privacy";

/**
 * Hermes Agent by Nous Research (new catalog row, catalog audit 16).
 * Gathered 2026-10-29 from Nous Research's own pages only: the agent site
 * and docs, the GitHub README and LICENSE, and Nous Portal (home and
 * privacy policy).
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ PROVISIONAL PRICING — amend `freeTier` and `plans` below, nowhere else│
 * │ Nous Portal's /pricing page returned a bot checkpoint (HTTP 429), and │
 * │ the agent site and Portal home describe the same prices with          │
 * │ different plan details. Only the prices both pages agree on are       │
 * │ recorded. Deliberately left out until a browser check of              │
 * │ portal.nousresearch.com/pricing: bonus-credit promotions, rollover    │
 * │ caps, credit amounts and included-usage limits. Annual pricing and a  │
 * │ free trial are not stated. Catalog audit 16 builds the row's          │
 * │ currentPricing and freeTierFeatures text from this block, and the     │
 * │ site overlay shows this block over the row text, so an edit here      │
 * │ changes what readers see without a new audit.                         │
 * └──────────────────────────────────────────────────────────────────────┘
 */
export default {
  slug: "hermes-agent",
  lifecycle: "active",
  company: {
    value: "Nous Research",
    note: "README: \"The self-improving AI agent built by Nous Research\". LICENSE: \"MIT License / Copyright (c) 2025 Nous Research\".",
    sourceUrl: HERMES_REPO_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  // PROVISIONAL PRICING (see the box above).
  freeTier: {
    value: {
      available: true,
      summary:
        "Free and open source (MIT): you can run Hermes Agent yourself at no charge. Model providers and optional hosted services have their own pricing; Nous Portal also has a Free plan.",
    },
    note: "Site FAQ, as of 2026-10-29: \"Hermes Agent is free and open source under the MIT license. Model providers and optional hosted services have their own pricing.\" Provisional: see the pricing box at the top of this file.",
    sourceUrl: HERMES_HOME_URL,
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  // PROVISIONAL PRICING (see the box above).
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Optional Nous Portal plan" },
      { name: "Plus", price: "$20", period: "month", limits: "Optional Nous Portal plan" },
      { name: "Super", price: "$100", period: "month", limits: "Optional Nous Portal plan" },
      { name: "Ultra", price: "$200", period: "month", limits: "Optional Nous Portal plan" },
    ],
    note: "USD, as of 2026-10-29. Optional Nous Portal plans; Hermes Agent itself is free and open source (MIT). The agent site and the Portal home list the same four prices. Annual pricing: not stated. Free trial: not stated. Portal's /pricing page returned a bot checkpoint (HTTP 429), so plan details are held back until a browser check. Provisional: see the pricing box at the top of this file.",
    sourceUrl: HERMES_HOME_URL,
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  platforms: {
    value: [
      "CLI / terminal",
      "Desktop (macOS 12+, Windows 10/11)",
      "Linux",
      "Android (Termux)",
      "Self-hosted",
      "Cloud via Nous Portal",
    ],
    note: "Self-hosting, from the site: \"Run it on a $5 VPS, a GPU cluster, or serverless infrastructure\". Cloud, from Nous Portal: \"Deploy in one click and Portal hosts your agent in the cloud, running around the clock. Server costs bill straight to your credit balance.\" Signing up for the cloud option takes a Nous Portal account. Cloud region or host: not stated.",
    sourceUrl: HERMES_REPO_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  models: {
    value: ["Your choice of provider: Nous Portal, OpenRouter, OpenAI, a custom endpoint and others"],
    note: "README lists Nous Portal, OpenRouter, OpenAI and a custom endpoint \"and many others\". Nous Portal lists 300+ models.",
    sourceUrl: HERMES_REPO_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Reachable from Telegram, Discord, Slack, WhatsApp, Signal, email and the command line.",
      "Connects to MCP servers (\"Connect any MCP server\").",
      "Keeps memory and creates its own skills (\"Autonomous skill creation\"); skills are agentskills.io compatible.",
      "Runs scheduled (cron) tasks and can hand work to subagents.",
      "Runs its work on your own machine, in Docker, over SSH, or on Modal, Daytona or Vercel Sandbox.",
      "Tool Gateway (search, image, text-to-speech, browser) is \"a paid-subscription feature\".",
      "A public Hermes Agent API: not stated (Nous Portal has an API section; details not verified).",
    ],
    note: "From the README, as of 2026-10-29, except the Tool Gateway line (agent site) and the API line.",
    sourceUrl: HERMES_REPO_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      retention: "Not stated",
      policyUrl: PORTAL_PRIVACY_URL,
    },
    note: "Rated Medium. Nous Portal's privacy policy (last updated September 28, 2026) says it collects \"prompts… outputs… conversation history\" and that data may go to providers for \"training, fine-tuning\"; its \"Privacy Mode\" lets you \"opt out of the storage and use of certain inference payloads for training\". A retention period is not stated. Self-hosted, Hermes keeps conversations, memories and skills on your own machine, and your prompts go to whichever model provider you choose.",
    sourceUrl: PORTAL_PRIVACY_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file. Provisional pricing: free and open source (MIT); optional Nous Portal plans Free $0, Plus $20/mo, Super $100/mo, Ultra $200/mo. Annual pricing and trial not stated; Portal /pricing awaiting a browser check.",
    },
  ],
} satisfies ToolFacts;

