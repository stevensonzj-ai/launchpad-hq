import type { ToolFacts } from "./types";

export default {
  slug: "jenni-ai",
  lifecycle: "active",
  company: {
    value: "Jenni, Inc",
    note: "Copyright © 2026 Jenni, Inc.",
    sourceUrl: "https://jenni.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$0. 10 AI autocompletes per day, 10 PDF uploads, 3 AI edits, unlimited citations.",
    },
    sourceUrl: "https://jenni.ai/pricing",
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
        limits: "10 AI autocompletes per day, 10 PDF uploads, 3 AI edits, unlimited citations",
      },
      {
        name: "Plus",
        price: "$12",
        period: "",
        limits: "5,000 autocompletes/month; billing period unconfirmed",
      },
      {
        name: "Pro",
        price: "$29",
        period: "",
        limits: "Unlimited autocomplete; billing period unconfirmed",
      },
    ],
    note: "Pricing in USD. Local currency available in app. Page has a Monthly/Annual toggle (Save 60%); whether $12 and $29 are monthly or annual-equivalent is unconfirmed, so no billing period is set.",
    sourceUrl: "https://jenni.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web"],
    sourceUrl: "https://jenni.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Plus $12 and Pro $29 with no billing period. Period unconfirmed because of the Monthly/Annual toggle.",
    },
  ],
} satisfies ToolFacts;
