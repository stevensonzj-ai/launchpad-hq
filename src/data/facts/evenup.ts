import type { ToolFacts } from "./types";

export default {
  slug: "evenup",
  lifecycle: "active",
  company: {
    value: "EvenUp Inc",
    note: "Copyright 2026 @ EvenUp Inc",
    sourceUrl: "https://www.evenuplaw.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Schedule a Demo",
        price: "no public pricing, demo only",
        period: "",
        limits: "",
      },
    ],
    note: "Pricing is not published. Free tier: none stated.",
    sourceUrl: "https://www.evenuplaw.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web"],
    note: "For law firms. Models unpublished.",
    sourceUrl: "https://www.evenuplaw.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "No public pricing, demo only.",
    },
  ],
} satisfies ToolFacts;
