import type { ToolFacts } from "./types";

/**
 * Cline: first fact file, stale-facts batch 4 (catalog audit 20), 2026-10-29.
 * Read twice, blind, on the vendor's own pages (cline.bot, github.com/cline/cline).
 * The row's wording already matched the pricing page; this adds the source
 * trail and the date. Free for individual developers (VS Code extension and
 * CLI, Apache 2.0); inference is paid at cost or with your own keys; Enterprise
 * is quote only; no dollar amounts on the page. The privacy policy does not say
 * Cline itself trains on inputs and describes no Cline opt-out; it warns that
 * third-party model providers reached through Cline-provided keys may train
 * unless opted out. Latest release date and telemetry: not read.
 */
export default {
  slug: "cline",
  lifecycle: "active",
  officialUrl: {
    value: "https://cline.bot",
    sourceUrl: "https://cline.bot/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Cline Bot Inc.",
    note: "Footer: \"© 2026 Cline Bot Inc. All rights reserved.\" The GitHub page reads \"Apache 2.0 © 2026 Cline Bot Inc.\"",
    sourceUrl: "https://cline.bot/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: true,
      summary: "The Open Source plan is free for individual developers (VS Code extension, CLI, MCP Marketplace, community support). AI inference is paid at cost or with your own API keys; no free credits or usage caps are stated."
    },
    sourceUrl: "https://cline.bot/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Open Source",
        price: "$0",
        period: "",
        limits: "Free for individual developers; inference paid at cost or with your own keys. Enterprise is custom, by quote (contact sales)"
      }
    ],
    note: "USD, as of 2026-10-29. No dollar amounts appear on the pricing page. Enterprise (custom, by quote) adds a JetBrains extension, SSO, SLA, dedicated support, centralized billing, role-based access control and a team dashboard; advanced config management and fine-grained permissioning are marked \"Coming Soon\".",
    sourceUrl: "https://cline.bot/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      policyUrl: "https://cline.bot/privacy"
    },
    note: "The policy does not say Cline trains its own models on user inputs or code, and describes no Cline-specific opt-out. With Cline-provided API keys, \"Some AI model providers may use content for training\" unless you have opted out where the provider offers that. Processing location is not stated. Quotes are from the fetch tool's summary of the page.",
    sourceUrl: "https://cline.bot/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: free for individual developers, Enterprise by quote; no dollar amounts published; privacy policy says third-party providers may train."
    }
  ],
} satisfies ToolFacts;
