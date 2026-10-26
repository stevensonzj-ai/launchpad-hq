import type { ToolFacts } from "./types";

const RECRAFT_PRICING_URL = "https://www.recraft.ai/pricing";

/**
 * The plan cards on recraft.ai/pricing render in JavaScript and were not in
 * the fetched page (2026-10-26), so no plan prices or free credit amounts are
 * recorded. Only the page's FAQ text is used.
 */
export default {
  slug: "recraft",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Free plan available. Images made on it are owned by Recraft, shown publicly in the community gallery, and not licensed for commercial use.",
    },
    sourceUrl: RECRAFT_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  usageLimits: {
    value: {
      commercialUse:
        "Paid plans grant full ownership and commercial rights for images generated while subscribed, kept after cancelling. Free-plan images are owned by Recraft and not licensed for commercial use.",
      rollover:
        "Subscription credits reset at the start of each billing cycle; unused credits don't roll over.",
      creditsExpire: "Top-up credits are bought separately and never expire.",
    },
    sourceUrl: RECRAFT_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  features: {
    value: [
      "Top-up credits are available on the Basic, Pro and Teams plans; on Teams workspaces they are shared across all seats.",
      "Plans can be paid monthly or annually, with annual billing described as saving 20%.",
      "Paid-plan images stay private and are not shown in the community gallery.",
    ],
    sourceUrl: RECRAFT_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "usageLimits",
      summary: "First fact file: free-plan image ownership, commercial rights, credit rollover and paid plan names from the recraft.ai/pricing FAQ. Plan prices not captured (JavaScript-rendered).",
    },
  ],
} satisfies ToolFacts;
