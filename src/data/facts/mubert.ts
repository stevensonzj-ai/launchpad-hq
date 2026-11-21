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
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Ambassador", price: "$0", period: "month", limits: "Non-commercial; 25 tracks/mo; 5 MP3 downloads/mo" },
      { name: "Creator", price: "$14", period: "month", limits: "Pre-discount reference shown on the page. The page does not state the price after the first year." },
      { name: "Pro", price: "$39", period: "month", limits: "Pre-discount reference shown on the page. The page does not state the price after the first year." },
      { name: "Ultra", price: "$89", period: "month", limits: "Pre-discount reference shown on the page. Clients, apps and games; 1,000 tracks/mo." },
    ],
    note: "Read 2026-11-20. A first-year Black Friday discount is on the page and has no stated end date, so those prices are not the list price. The stored Business $199 plan is not on the page.",
    sourceUrl: PRICING_URL,
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
