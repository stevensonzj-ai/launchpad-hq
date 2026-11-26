import type { ToolFacts } from "./types";

export default {
  slug: "freepik-ai",
  lifecycle: "active",
  displayName: {
    value: "Magnific (formerly Freepik)",
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Premium",
        price: "$20",
        period: "month",
        limits: "$14.50/mo billed annually",
      },
      {
        name: "Premium+",
        price: "$45",
        period: "month",
        limits: "$33.75/mo billed annually",
      },
      {
        name: "Pro Starter",
        price: "$110",
        period: "month",
        limits: "$82.50/mo billed annually",
      },
    ],
    note: "The pricing page labels the third plan \"Pro Starter\" (renamed from \"Pro\" here on 2026-10-29). Its card lists two credit levels, 1.5M and 4M credits a year; the price shown is the card's listed price.",
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  platforms: {
    value: ["Web", "Desktop App", "Mobile App"],
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "Magnific One",
      "Nano Banana 2 (third-party)",
      "Kling 4.0 (third-party, marked Latest)",
      "Kling 2.5 (third-party, still listed)",
    ],
    note: "Magnific's Kling index, read 2026-11-26, marks Kling 4.0 as Latest and still lists Kling 2.5. Nano Banana 2 was not on that page and was not re-checked on 2026-11-26. Only Magnific One is in-house.",
    sourceUrl: "https://www.magnific.com/ai/kling",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  usageLimits: {
    value: {
      creditsExpire:
        "Plan credits expire at your next credit refresh. Extra credits (purchased packs) expire 3 years after purchase and require an active subscription (forfeited if the subscription ends).",
      rollover:
        "Plan credits do not roll over. Extra credits roll over (used last). Remaining credits from a plan upgrade become one-time roll-over credits until the end of the current billing cycle.",
    },
    sourceUrl: "https://www.magnific.com/ai/docs/ai-credits-and-limits",
    note: "FLAG: vendor-stated / divergent Business rollover. This Fact follows the general AI-credits doc (no plan-credit rollover). Business-plan docs state a different rule (plan credits roll up to 3 months). Wording left vendor-stated; not reconciled. Schema has no per-plan split.",
    checkedAt: "2026-10-17",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-17",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "models",
      summary:
        "Guide refresh: Magnific's Kling page marks Kling 4.0 as Latest and still lists Kling 2.5. Nano Banana 2 was not on that page and was not re-checked.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Third plan renamed Pro -> Pro Starter to match the pricing page; all three prices re-read (unchanged).",
    },
    {
      date: "2026-10-14",
      field: "displayName",
      summary: "freepik.com/pricing redirects to magnific.com/pricing, titled Magnific (formerly Freepik).",
    },
  ],
} satisfies ToolFacts;
