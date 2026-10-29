import type { ToolFacts } from "./types";

/**
 * Nanonets: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Pricing read twice on nanonets.com/pricing: free credits and
 * per-run rates, no page-quota tiers.
 */
export default {
  slug: "nanonets",
  lifecycle: "active",
  company: {
    value: "Nanonets",
    note: "Privacy policy names Nano Net Technologies Inc. (read once).",
    sourceUrl: "https://legal.nanonets.com/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Starter begins free with $50 in credits, no card; credits never expire. It is a one-time starting balance, not a monthly allowance.",
    },
    note: "\"Start automating with $50 in free credits, no card required.\"",
    sourceUrl: "https://nanonets.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Starter",
        price: "$100",
        period: "month",
        limits: "\"$100/month for 100 credits\" after the free $50; API access; email and cloud-storage connectors; up to 3 users",
      },
      { name: "Growth", price: "Custom", period: "", limits: "Volume pricing, quoted" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Tailored to your volume" },
    ],
    note: "USD, as of 2026-10-29. Usage is billed per block run: $0.02 for simple operations, $0.10 for standard AI, $0.30 for complex AI. Credits never expire.",
    sourceUrl: "https://nanonets.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: $50 free credits then Starter $100/mo, per-run rates; Growth and Enterprise quoted. Replaces 500 free pages/mo and Pro $499/mo.",
    },
  ],
} satisfies ToolFacts;
