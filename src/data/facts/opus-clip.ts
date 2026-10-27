import type { ToolFacts } from "./types";

const OPUS_PRICING_URL = "https://www.opus.pro/pricing";

/** Opus Clip, checked by the RA on opus.pro/pricing on 2026-10-26 (stress fact check §8 spot checks). */
export default {
  slug: "opus-clip",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 60 credits a month, exports up to 1080p.",
    },
    sourceUrl: OPUS_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "60 credits a month; up to 1080p" },
      { name: "Starter", price: "$15", period: "month", limits: "Monthly billing only; 150 credits a month" },
      { name: "Pro", price: "$29", period: "month", limits: "" },
      { name: "Business", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, as of 2026-10-26. Usage is counted in credits, not upload minutes.",
    sourceUrl: OPUS_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: the free plan is 60 credits a month (the catalog said 60 minutes); Starter $15 and Pro $29 a month.",
    },
  ],
} satisfies ToolFacts;
