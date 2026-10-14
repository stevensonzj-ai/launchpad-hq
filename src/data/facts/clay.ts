import type { ToolFacts } from "./types";

export default {
  slug: "clay",
  lifecycle: "active",
  company: {
    value: "Clay Labs Inc.",
    note: "Footer: © 2026 Clay Labs Inc.",
    sourceUrl: "https://www.clay.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "100 data credits and 500 actions/mo, 200 rows per table.",
    },
    sourceUrl: "https://www.clay.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Launch",
        price: "$167/mo",
        period: "billed annually",
        limits: "Default annual view (Save 10%); $185/mo on monthly",
      },
      {
        name: "Growth",
        price: "$446/mo",
        period: "billed annually",
        limits: "$495/mo billed monthly",
      },
    ],
    note: "USD per month, per workspace; per-seat unpublished. Launch $167/mo billed annually, $185/mo monthly. Growth $446/mo billed annually, $495/mo monthly (FAQ “starting at”). The page does not label each number as annual vs monthly; that mapping follows the Save 10% toggle. Dropped the Launch/Growth “Starts at $54/$60/$185/$205” action-tier figures from the headline rows. Enterprise unpublished.",
    sourceUrl: "https://www.clay.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web"],
    sourceUrl: "https://www.clay.com/pricing",
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
      summary:
        "RA: Growth is $446/mo billed annually and $495/mo billed monthly. Launch stays $167/$185. Dropped $185/$205 action-tier figures from the Growth row.",
    },
  ],
} satisfies ToolFacts;
