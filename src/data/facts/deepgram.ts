import type { ToolFacts } from "./types";

const PRICING_URL = "https://deepgram.com/pricing";

/**
 * Deepgram: first fact file, catalog audit 23 (2026-10-30), read on
 * deepgram.com/pricing that day. The row's "promotional" Nova-3 pre-recorded
 * rate is gone: the table lists $0.0043/min with no strikethrough.
 */
export default {
  slug: "deepgram",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "$200 free credit, no credit card, no expiry; then pay as you go.",
    },
    sourceUrl: PRICING_URL,
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Pay as you go", price: "Usage-based", period: "", limits: "$200 free credit; Nova-3 Monolingual $0.0077/min streaming, $0.0043/min pre-recorded; Aura-2 TTS $0.030 per 1k characters; Voice Agent Standard $0.075/min" },
      { name: "Growth", price: "$4,000+", period: "year", limits: "Pre-paid annual credits, up to 20% off pay-as-you-go rates" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Volume pricing, self-hosting" },
    ],
    note: "USD, as of 2026-10-30. Billed per second of audio, per 1,000 characters (TTS) or per minute of connection (Voice Agent).",
    sourceUrl: PRICING_URL,
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "plans",
      summary: "First fact file: $200 free credit; Nova-3 $0.0077/min streaming and $0.0043/min pre-recorded; Growth from $4,000/yr; Enterprise custom. Replaces the row's expired promotional rate.",
    },
  ],
} satisfies ToolFacts;
