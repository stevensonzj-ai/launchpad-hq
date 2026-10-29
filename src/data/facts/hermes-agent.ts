import type { ToolFacts } from "./types";

const HERMES_REPO_URL = "https://github.com/NousResearch/hermes-agent";
const PORTAL_HOME_URL = "https://portal.nousresearch.com/";
const PORTAL_PRIVACY_URL = "https://portal.nousresearch.com/privacy";

/**
 * Hermes Agent by Nous Research (new catalog row, catalog audit 16).
 * Gathered 2026-10-29 from Nous Research's own pages only: the agent site
 * and docs, the GitHub README and LICENSE, and Nous Portal (home and
 * privacy policy).
 *
 * Pricing is the `freeTier` and `plans` block below, and nowhere else.
 * Browser-verified by the owner on 2026-10-29 at portal.nousresearch.com,
 * the canonical pricing page (portal.nousresearch.com/pricing is a 404; do
 * not link it). Catalog audit 16 builds the row's currentPricing and
 * freeTierFeatures text from this block, and the site overlay shows this
 * block over the row text, so an edit here changes what readers see without
 * a new audit. Deliberately left out: bonus-credit promotions and rollover
 * caps. Annual pricing, a free trial and a public agent API are not stated.
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
  freeTier: {
    value: {
      available: true,
      summary:
        "Free and open source (MIT): you can run Hermes Agent yourself at no charge with a model provider of your choice. Nous Portal's Free plan ($0) covers free models only, with standard rate limits and $0 monthly credits. An eligible ChatGPT account can be connected for supported inference without a paid Nous subscription; tools and Hermes Cloud hosting are charged separately.",
    },
    note: "Site FAQ: \"Hermes Agent is free and open source under the MIT license. Model providers and optional hosted services have their own pricing.\" Nous Portal, browser-verified 2026-10-29: Free $0, \"free models only\", standard rate limits, $0 monthly credits; an eligible ChatGPT account can be connected for supported inference with no paid Nous subscription, with tools and Hermes Cloud hosting charged separately.",
    sourceUrl: PORTAL_HOME_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "owner",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Free models only; standard rate limits; $0 monthly credits" },
      {
        name: "Plus",
        price: "$20",
        period: "month",
        limits: "Hermes Agent usage included, within limits that reset daily, weekly and monthly; one cloud agent (4 GB RAM, 25 GB disk)",
      },
      {
        name: "Super",
        price: "$100",
        period: "month",
        limits: "Hermes Agent usage included, within limits that reset daily, weekly and monthly; one cloud agent (4 GB RAM, 100 GB disk)",
      },
      {
        name: "Ultra",
        price: "$200",
        period: "month",
        limits: "Hermes Agent usage included, within limits that reset daily, weekly and monthly; one cloud agent (8 GB RAM, 100 GB disk)",
      },
    ],
    note: "USD, browser-verified 2026-10-29 on Nous Portal (portal.nousresearch.com). Optional; Hermes Agent itself is free and open source (MIT). Paid plans: any model can be used, but large models have their own monthly limit; API keys always use pay-as-you-go credits, not included usage. Bigger cloud-agent sizes and extra agents use credits. Credit top-ups from $10 to $200, or a custom amount. Tool Gateway (web search, scraping, image generation, browser use, speech) is priced per use from credits. 300+ models are priced per 1M tokens. Cloud hosting provider and region: not stated. Annual pricing: not stated. Free trial: not stated.",
    sourceUrl: PORTAL_HOME_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "owner",
    verifiedAt: "2026-10-29",
    status: "verified",
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
    note: "Self-hosting, from the site: \"Run it on a $5 VPS, a GPU cluster, or serverless infrastructure\". Cloud, from Nous Portal: \"Deploy in one click and Portal hosts your agent in the cloud, running around the clock. Server costs bill straight to your credit balance.\" Signing up for the cloud option takes a Nous Portal account; each paid Portal plan includes one cloud agent (see plans). Cloud region or host: not stated.",
    sourceUrl: HERMES_REPO_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  models: {
    value: ["Your choice of provider: Nous Portal, OpenRouter, OpenAI, a custom endpoint and others"],
    note: "README lists Nous Portal, OpenRouter, OpenAI and a custom endpoint \"and many others\". Nous Portal lists 300+ models, priced per 1M tokens.",
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
      "Tool Gateway (web search, scraping, image generation, browser use, speech) is priced per use from Nous Portal credits.",
      "A public Hermes Agent API: not stated (Nous Portal has an API section; details not verified).",
    ],
    note: "From the README, as of 2026-10-29, except the Tool Gateway line (Nous Portal, browser-verified 2026-10-29) and the API line.",
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
        "First fact file. Pricing browser-verified on Nous Portal: free and open source (MIT); optional Portal plans Free $0, Plus $20/mo, Super $100/mo, Ultra $200/mo, each paid plan with included Hermes Agent usage and one cloud agent. Annual pricing and trial not stated.",
    },
  ],
} satisfies ToolFacts;

