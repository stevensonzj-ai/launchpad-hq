import type { ToolFacts } from "./types";

export default {
  slug: "openrouter",
  lifecycle: "active",
  company: {
    value: "OpenRouter, Inc",
    note: "Footer: © 2026 OpenRouter, Inc",
    sourceUrl: "https://openrouter.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "25+ free models; free-model rate limits are 50 requests/day, rising to 1,000/day once you've bought at least $10 of credits.",
    },
    sourceUrl: "https://openrouter.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Standard",
        price: "5.5% fee on credit purchases",
        period: "",
        limits: "Never on individual requests",
      },
      {
        name: "Business",
        price: "8% fee on credit purchases",
        period: "",
        limits: "Never on individual requests",
      },
      {
        name: "BYOK",
        price: "No fee up to $25,000 of list-price inference per month, then 5%",
        period: "",
        limits: "",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    note: 'Fee on credit purchases: "5.5% on Standard and 8% on Business, never on individual requests".',
    sourceUrl: "https://openrouter.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "API"],
    sourceUrl: "https://openrouter.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Third-party models (aggregator)"],
    note: "All models are third-party, via an aggregator.",
    sourceUrl: "https://openrouter.ai/models",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  features: {
    value: [
      "Stealth model stealth/crouton-alpha: free, multimodal, 1M-token context, from an anonymous provider, released 2026-11-03 (as of 2026-11-05). Stealth models can be renamed or withdrawn without notice. It is a listing on OpenRouter, not a separate catalog row.",
    ],
    note: "OpenRouter model page, as of 2026-11-05.",
    sourceUrl: "https://openrouter.ai/stealth/crouton-alpha",
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  changelog: [
    { date: "2026-11-05", field: "features", summary: "X-watch: noted the free stealth model stealth/crouton-alpha (may be withdrawn); not a separate catalog row." },
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Credit-purchase fees, BYOK, and Enterprise. All models third-party.",
    },
  ],
} satisfies ToolFacts;
