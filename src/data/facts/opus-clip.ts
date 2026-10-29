import type { ToolFacts } from "./types";

const OPUS_PRICING_URL = "https://www.opus.pro/pricing";

/** Opus Clip, checked by the RA on opus.pro/pricing on 2026-10-26 (stress fact check §8 spot checks). */
export default {
  slug: "opus-clip",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 60 credits a month, clips up to 1080p with a watermark, no editing, and clips stop being exportable after 3 days.",
    },
    sourceUrl: OPUS_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "cto",
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "60 credits a month; up to 1080p; watermark; no editing; clips exportable for 3 days" },
      { name: "Starter", price: "$15", period: "month", limits: "Billed monthly; 150 credits a month; no watermark; AI animated captions in 20+ languages" },
      { name: "Pro", price: "$29", period: "month", limits: "Billed monthly; $14.50/month billed yearly ($174 a year); 300 credits a month, unused credits roll over for 2 months; 2 seats; 9:16, 1:1 and 16:9; limited API access" },
      { name: "Business", price: "Custom", period: "", limits: "Custom credits and seats; API and custom integrations" },
    ],
    note: "USD, as of 2026-10-29. Usage is counted in credits, not upload minutes. Animated captions in 20+ languages (Starter and up). Research Analyst verify 2026-10-29 on https://www.opus.pro/pricing: Starter is $15 billed monthly with 150 credits a month and AI animated captions in 20+ languages. The free plan lists multi-language transcription without a language count. The verify covered the Starter row and caption languages only; the Free, Pro and Business rows are the CTO recheck of the same day.",
    sourceUrl: OPUS_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "cto",
    verifiedBy: "research-analyst",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Research Analyst verify: Starter $15 billed monthly, 150 credits a month, AI animated captions in 20+ languages; no language count stated for the free plan.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Rechecked opus.pro/pricing: Pro is $14.50/month billed yearly ($174), 300 credits with 2-month rollover; free plan has a watermark, no editing and 3-day export window.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: the free plan is 60 credits a month (the catalog said 60 minutes); Starter $15 and Pro $29 a month.",
    },
  ],
} satisfies ToolFacts;
