import type { ToolFacts } from "./types";

export default {
  slug: "legora",
  lifecycle: "active",
  company: {
    value: "Legora",
    note: 'Footer: "© 2026 Legora. All rights reserved."',
    sourceUrl: "https://legora.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Demo",
        price: "No public pricing (demo only)",
        period: "",
        limits: "Book a demo",
      },
    ],
    sourceUrl: "https://legora.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "No public pricing (demo only). Company Legora.",
    },
  ],
} satisfies ToolFacts;
