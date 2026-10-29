import type { ToolFacts } from "./types";

/**
 * Ludo AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page lists no free plan; the homepage offers 30
 * free credits at sign-up. Only annual-billed prices render; month-to-month
 * prices are on the Browser-check list.
 */
export default {
  slug: "ludo-ai",
  lifecycle: "active",
  company: {
    value: "Ludo.ai",
    note: "Site footer \"© 2026 Ludo.ai\". Legal entity not stated.",
    sourceUrl: "https://ludo.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan on the pricing page. Sign-up gives 30 free credits, no card.",
    },
    note: "Homepage: \"No credit card required. Get 30 free credits instantly.\" The pricing page lists no free tier.",
    sourceUrl: "https://ludo.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Indie",
        price: "$15",
        period: "month",
        limits: "Billed yearly ($180/year); 3,000 credits a year; 5 active projects; no API, MCP or CLI",
      },
      {
        name: "Pro",
        price: "$35",
        period: "month",
        limits: "Billed yearly ($420/year); 12,000 credits a year; API, MCP and CLI access",
      },
      {
        name: "Studio",
        price: "$300",
        period: "month",
        limits: "Billed yearly ($3,600/year); 120,000 credits a year; 10 seats; API and MCP",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "Contact sales" },
    ],
    note: "USD, as of 2026-10-29. Only the annual view rendered; month-to-month prices are not recorded. API, MCP and CLI always use credits; unused credits roll over while subscribed.",
    sourceUrl: "https://ludo.ai/pricing",
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
        "First fact file: Indie $15, Pro $35, Studio $300 a month billed yearly; no free plan (30 sign-up credits). Replaces \"Free tier; Pro $16/mo\" and the Teams plan.",
    },
  ],
} satisfies ToolFacts;
