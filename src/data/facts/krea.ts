import type { ToolFacts } from "./types";

export default {
  slug: "krea",
  lifecycle: "active",
  company: {
    value: "Krea",
    note: "Footer: © 2026 Krea (no legal suffix).",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "100 units/day, $0/month.",
    },
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$9",
        period: "month",
        limits: "$5/mo billed yearly; 5,000 units/mo",
      },
      {
        name: "Pro",
        price: "$42",
        period: "month",
        limits: "$21/mo billed yearly ($252/year); 20,000 units/mo",
      },
      {
        name: "Max",
        price: "$140",
        period: "month",
        limits: "$42/mo billed yearly ($504/year); 60,000 units/mo",
      },
      {
        name: "Business",
        price: "$200",
        period: "month",
        limits: "$96/mo billed yearly; 80,000 units/mo",
      },
    ],
    note: "USD, read 2026-11-20 on krea.ai/pricing. The lower figure on each card is the yearly price per month (Save compared to monthly). Basic $9*12 minus $5*12 is the $48 the card says you save. The percent-off labels are that yearly difference, and the page does not give them an end date. Business is under For Teams and Enterprises. Per-user status and API prices unpublished.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  platforms: {
    value: ["Web", "iOS"],
    note: "Browser-verified 2026-10-14: Download iOS is in the navigation. No apps.apple.com URL recorded.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Nano Banana 2 (third-party)", "Seedance 2.0 (third-party)"],
    note: "Examples on the pricing page. In-house models unpublished.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  usageLimits: {
    value: {
      creditsExpire:
        "Unused units expire at the end of each billing cycle. One-time compute packs are valid for 90 days (added instantly, expire after 90 days).",
      rollover:
        "Basic, Pro and Max: compute units do not roll over. Business and Enterprise: unused compute credits may roll over to the next billing period with customizable rollover periods.",
      commercialUse:
        "Basic, Pro, Max, Business and Enterprise include a commercial license for generated content (marketing, products, client work). Free-plan commercial use: UNCONFIRMED — see report note.",
    },
    sourceUrl: "https://www.krea.ai/pricing",
    note: "FLAG: vendor self-conflict on Free commercial license (pricing page vs FAQ). This Fact stays paid-only (Basic/Pro/Max/Business/Enterprise). Do not state Free commercial terms either way until Krea clarifies.",
    checkedAt: "2026-10-17",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-17",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-20",
      field: "plans",
      summary:
        "Pricing page re-read: Basic stays $9/mo or $5/mo yearly. Pro is $42/mo or $21/mo yearly. Max is $140/mo or $42/mo yearly. Business stays $200/mo and is $96/mo yearly. The percent-off labels are the yearly price versus monthly.",
    },
    {
      date: "2026-11-14",
      field: "freeTier",
      summary: "Rechecked the official pricing page on 2026-11-14. The recorded prices still match.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: Business is 80k units/month under For Teams and Enterprises. Models labeled third-party. Per-user unpublished.",
    },
    {
      date: "2026-10-17",
      field: "usageLimits",
      summary:
        "Basic added to commercial license coverage and to no-rollover wording per Krea pricing FAQ re-check 2026-10-17; no prices changed; Free commercial use still unconfirmed.",
    },
  ],
} satisfies ToolFacts;
