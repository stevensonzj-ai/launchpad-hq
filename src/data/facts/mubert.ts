import type { ToolFacts } from "./types";

const PRICING_URL = "https://mubert.com/render/pricing";

/**
 * Mubert (Render): first fact file, catalog audit 23 (2026-10-30), read on
 * mubert.com/render/pricing that day. The lower prices the row called
 * "discounted" are the annual-billing prices (the toggle reads "Annual -25%").
 */
export default {
  slug: "mubert",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Ambassador plan: free, non-commercial, 25 tracks and 5 downloads a month, MP3, fixed duration, attribution and audible watermark.",
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
      { name: "Ambassador", price: "$0", period: "month", limits: "Non-commercial; 25 tracks/month; 5 downloads/month" },
      { name: "Creator", price: "$14", period: "month", limits: "Non-commercial; 500 generations/month; WAV + MP3" },
      { name: "Pro", price: "$39", period: "month", limits: "Commercial use and monetization; 500 generations/month; full Track Editor" },
      { name: "Business", price: "$199", period: "month", limits: "Client, agency, apps and games; 1,000 generations/month" },
    ],
    note: "USD monthly prices. Annual billing is shown as $11.69, $32.49 and $149.29 a month for Creator, Pro and Business.",
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
      summary: "First fact file: Ambassador free, Creator $14, Pro $39, Business $199 a month; annual prices recorded as annual, not as a discount.",
    },
  ],
} satisfies ToolFacts;
