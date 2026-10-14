import type { ToolFacts } from "./types";

export default {
  slug: "anthropic-api",
  lifecycle: "active",
  company: {
    value: "Anthropic PBC",
    note: "© 2026 Anthropic PBC. anthropic.com/pricing redirects to claude.com/pricing.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Claude consumer Free, $0.",
    },
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "",
      },
      {
        name: "Pro",
        price: "$17/month",
        period: "with annual discount ($200 billed up front)",
        limits: "Or $20 billed monthly",
      },
      {
        name: "Max",
        price: "from $100/month",
        period: "",
        limits: "",
      },
      {
        name: "Team Pro",
        price: "$20",
        period: "per seat/month billed annually",
        limits: "",
      },
    ],
    note: "Consumer plans on claude.com/pricing. No derived monthly figures.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "USD per million tokens, input / output, in-house. Claude Fable 5.1: $10 / $50 (demanding reasoning and long-horizon agentic work). Claude Opus 5.5: $4 / $20. Claude Sonnet 5.5: $2 / $10. Claude Haiku 5.5: $0.10 / $0.50 for prompts ≤100K tokens; $0.50 / $2.50 above 100K.",
    note: "Batch API: 50% off. Source: platform.claude.com/docs/en/about-claude/pricing. Haiku 5.5 full rates are browser-verified 2026-10-14. Legacy models (Opus 5/4.x, Sonnet 5/4.x) are still listed; their rates were not captured.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["API", "Web", "Desktop", "Mobile"],
    note: "API; Claude chat on web, desktop and mobile.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "Claude Fable 5.1 (in-house)",
      "Claude Opus 5.5 (in-house)",
      "Claude Sonnet 5.5 (in-house)",
      "Claude Haiku 5.5 (in-house)",
    ],
    note: "Legacy models (Opus 5/4.x, Sonnet 5/4.x) are still listed on the API pricing page.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "RA: added Batch API: 50% off. No cache or multiplier details. Consumer plans from claude.com/pricing.",
    },
  ],
} satisfies ToolFacts;
