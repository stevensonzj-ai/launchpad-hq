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
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Claude consumer Free, $0.",
    },
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
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
    verifiedBy: "pending",
    status: "unverified",
  },
  apiPricing: {
    value:
      "USD per million tokens, input / output, in-house. Claude Fable 5.1: $10 / $50 (demanding reasoning and long-horizon agentic work). Claude Opus 5.5: $4 / $20. Claude Sonnet 5.5: $2 / $10. Claude Haiku 5.5: $0.10 / $0.50 for prompts ≤100K tokens; $0.50 / $2.50 above 100K.",
    note: "Source: platform.claude.com/docs/en/about-claude/pricing. Haiku 5.5 full rates are browser-verified 2026-10-14. Batch is half price. US-only inference is 1.1x. Legacy models (Opus 5/4.x, Sonnet 5/4.x) are still listed; their rates were not captured.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["API", "Web", "Desktop", "Mobile"],
    note: "API; Claude chat on web, desktop and mobile.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
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
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "API token prices including Haiku 5.5 (browser-verified). Consumer plans from claude.com/pricing.",
    },
  ],
} satisfies ToolFacts;
