import type { ToolFacts } from "./types";

/**
 * Ludo AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page lists no free plan. The batch-1 readers saw
 * only annual-billed prices. The Research Analyst's browser check the same
 * day (ludo.ai/pricing) confirmed there is no free plan, read the monthly
 * prices, and found no mention of sign-up credits on the pricing page (only
 * "Start free" buttons). The homepage's 30 free credits are therefore not
 * part of the verified free-tier fact, and catalog audit 18 drops them from
 * the row. Cost tier rechecked: PAID stands.
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
      summary: "No free plan on the pricing page; it shows only paid plans and \"Start free\" buttons.",
    },
    note: "Browser check, 2026-10-29: no free plan listed; a lasting free plan is not stated. The homepage's \"Get 30 free credits instantly\" (batch-1 read) is not on the pricing page, so it is left out of this fact.",
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
        limits: "Billed yearly ($180/year, 3,000 credits a year), or $20 billed monthly (250 credits a month); 5 active projects; no API, MCP or CLI",
      },
      {
        name: "Pro",
        price: "$35",
        period: "month",
        limits: "Billed yearly ($420/year, 12,000 credits a year), or $50 billed monthly (1,000 credits a month); API, MCP and CLI access",
      },
      {
        name: "Studio",
        price: "$300",
        period: "month",
        limits: "Billed yearly ($3,600/year, 120,000 credits a year), or $350 billed monthly (10,000 credits a month); 10 seats; API and MCP",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "Contact sales" },
    ],
    note: "USD, as of 2026-10-29. Monthly prices browser-verified the same day. API, MCP and CLI always use credits; the monthly view says \"Unused credits roll over\".",
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
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "Browser check: no free plan (PAID stands); the pricing page does not mention 30 sign-up credits, so they are dropped. Monthly prices added: Indie $20, Pro $50, Studio $350.",
    },
  ],
} satisfies ToolFacts;
