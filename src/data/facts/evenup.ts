import type { ToolFacts } from "./types";

export default {
  slug: "evenup",
  lifecycle: "active",
  company: {
    value: "EvenUp Inc",
    note: 'Footer: "Copyright 2026 @ EvenUp Inc".',
    sourceUrl: "https://www.evenuplaw.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Demo",
        price: "No public pricing (demo only)",
        period: "",
        limits: "Schedule a Demo",
      },
    ],
    note: "No list prices published. Also listed on https://www.evenuplaw.com/about/.",
    sourceUrl: "https://www.evenuplaw.com/",
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
      summary: "No public pricing (demo only). Company EvenUp Inc.",
    },
  ],
} satisfies ToolFacts;
