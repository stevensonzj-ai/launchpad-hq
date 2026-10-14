import type { ToolFacts } from "./types";

export default {
  slug: "granola",
  lifecycle: "active",
  company: {
    value: "Granola, Inc.",
    note: "Footer: © Granola, Inc. 2026.",
    sourceUrl: "https://www.granola.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Basic, $0 per user per month, with limited meeting history.",
    },
    sourceUrl: "https://www.granola.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$0",
        period: "",
        limits: "per user per month; limited meeting history",
      },
      {
        name: "Business",
        price: "$14",
        period: "",
        limits: "per user per month",
      },
      {
        name: "Enterprise",
        price: "$35",
        period: "",
        limits: "per user per month",
      },
    ],
    note: 'USD. Cards say "per user per month". Billing period (monthly vs annual) unconfirmed: browser-verified 2026-10-14, no toggle. API access (Business+) and Audit API (Enterprise); no separate API price.',
    sourceUrl: "https://www.granola.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["macOS", "Windows", "iOS", "Android", "Apple Watch"],
    note: 'Homepage: "Available for macOS, Windows, iOS, Android". Pricing table also lists "Desktop, iOS, Android & Apple Watch apps". No store URLs in the HTML.',
    sourceUrl: "https://www.granola.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Basic $0, Business $14, Enterprise $35 with no billing period. Browser-verified: no monthly/annual toggle.",
    },
  ],
} satisfies ToolFacts;
