import type { ToolFacts } from "./types";

/** Inworld AI: plans and voice cloning from the official pricing page, 2026-10-25. */
export default {
  slug: "inworld-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "On-Demand plan: $0 to start, pay as you go. Includes voice cloning and voice design with 2 professional voice clones (a payment method on file is needed before creating a professional clone).",
    },
    sourceUrl: "https://inworld.ai/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  plans: {
    value: [
      { name: "On-Demand", price: "$0", period: "", limits: "Pay as you go; 2 professional voice clones" },
      { name: "Creator", price: "$25", period: "month", limits: "4 professional voice clones" },
      { name: "Builder", price: "$100", period: "month", limits: "10 professional voice clones" },
      { name: "Developer", price: "$300", period: "month", limits: "25 professional voice clones" },
      { name: "Growth", price: "$1,500", period: "month", limits: "40 professional voice clones" },
      { name: "Enterprise", price: "Custom", period: "", limits: "100+ professional voice clones" },
    ],
    note: "USD, monthly prices as listed on the official pricing page.",
    sourceUrl: "https://inworld.ai/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Added official plans (On-Demand $0 pay as you go to Growth $1,500/month) and voice-cloning allowances.",
    },
  ],
} satisfies ToolFacts;
