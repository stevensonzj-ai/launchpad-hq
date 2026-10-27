import type { ToolFacts } from "./types";

const JULIUS_PRICING_URL = "https://julius.ai/pricing";

/** Julius AI, checked by the RA on julius.ai/pricing on 2026-10-26 (stress fact check §8 spot checks). */
export default {
  slug: "julius-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "A free plan is available; the pricing page lists Plus, Pro and Business as the paid plans.",
    },
    sourceUrl: JULIUS_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "" },
      { name: "Plus", price: "$20", period: "month", limits: "$16/month billed annually; 2,000 credits" },
      { name: "Pro", price: "$45", period: "month", limits: "$37/month billed annually; 5,000 credits" },
      { name: "Business", price: "$450", period: "month", limits: "$375/month billed annually" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, as of 2026-10-26.",
    sourceUrl: JULIUS_PRICING_URL,
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
      summary: "First fact file: Plus $20 and Pro $45 a month (the catalog called the $20 plan Pro), Business $450, with annual prices and credits.",
    },
  ],
} satisfies ToolFacts;
