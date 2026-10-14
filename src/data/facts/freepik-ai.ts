import type { ToolFacts } from "./types";

export default {
  slug: "freepik-ai",
  lifecycle: "active",
  displayName: {
    value: "Magnific (formerly Freepik)",
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
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
        name: "Pro",
        price: "$110",
        period: "month",
        limits: "$82.50/mo billed annually",
      },
    ],
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "Desktop App", "Mobile App"],
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["Magnific One", "Nano Banana 2", "Kling 2.5"],
    note: "In-house Magnific One image model, plus third-party models such as Nano Banana 2 and Kling 2.5.",
    sourceUrl: "https://www.magnific.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "displayName",
      summary: "freepik.com/pricing redirects to magnific.com/pricing, titled Magnific (formerly Freepik).",
    },
  ],
} satisfies ToolFacts;
