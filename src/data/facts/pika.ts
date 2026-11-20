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
    checkedAt: "2026-11-20",
    gatheredBy: "claude-sonnet",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  apiPricing: {
    value:
      "Pika H3 Flex API, charged per output-video second. Text, image, and keyframe generation: 480p $0.02, 768p $0.04, 1080p $0.07, 2K $0.08, 4K $0.16. Reference-to-video: 480p $0.06, 768p $0.12, 1080p $0.15, 2K $0.16, 4K $0.20, for input-video seconds plus output-video seconds; image and audio references are free of charge. Audio stems $0.001 per second. Prompt Rewriter $0.02 per request, free when Pika hosts Flex. 1 Pika Create Credit = $0.01.",
    note: "Read 2026-11-20 on https://pika.art/pika-h3-flex. These are the regular per-second prices. \"$\" with no currency code.",
    sourceUrl: "https://pika.art/pika-h3-flex",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  changelog: [
    { date: "2026-11-02", field: "apiPricing", summary: "Catalog audit 31: added Pika H3 Flex (open weights) API per-second prices, 480p $0.02 up to 4K $0.16, with the Pika API Club launch rate through 2026-11-05." },
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://pika.art/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
