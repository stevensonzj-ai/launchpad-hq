import type { ToolFacts } from "./types";

/**
 * pika: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "pika",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "No monthly credits; credit packs only" },
      { name: "Starter", price: "$10", period: "month", limits: "$8 billed annually; 900 credits a month" },
      { name: "Creator", price: "$35", period: "month", limits: "$28 billed annually; 3,150 credits a month" },
      { name: "Fancy", price: "From $95", period: "month", limits: "Up to $880/month; $76 to $704 billed annually; 8,550+ credits" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://pika.art/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  apiPricing: {
    value:
      "Pika H3 Flex (open-weight video model) API, USD per second of video: 480p $0.02 ($0.01 launch price for Pika API Club members from 2026-10-29 through 2026-11-05), 768p $0.04, 1080p $0.07, 2K $0.08, 4K $0.16 (as of 2026-11-02).",
    note: "Per-second API prices from pika.art, read 2026-11-02. The $0.01 launch rate is time-limited and for Pika API Club members only.",
    sourceUrl: "https://pika.art/",
    sourceKind: "plans-page",
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  changelog: [
    { date: "2026-11-02", field: "apiPricing", summary: "Catalog audit 31: added Pika H3 Flex (open weights) API per-second prices, 480p $0.02 up to 4K $0.16, with the Pika API Club launch rate through 2026-11-05." },
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://pika.art/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
