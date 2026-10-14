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
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "100 data credits and 500 actions/mo, 200 rows per table.",
    },
    sourceUrl: "https://www.clay.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
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
        period: "",
        limits: "Annual from $185/mo (480K actions/yr); monthly from $205/mo (40K/mo)",
      },
    ],
    note: "USD per month, per workspace; per-seat unpublished. Launch $167 annual vs $185 monthly browser-verified 2026-10-14 (FAQ “starting at $185/mo” is the monthly price). Enterprise unpublished.",
    sourceUrl: "https://www.clay.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web"],
    sourceUrl: "https://www.clay.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Launch $167/mo billed annually, $185/mo monthly (browser-verified). Growth headline $446/mo from the fetch. Free 100 data credits, 500 actions/mo, 200 rows per table.",
    },
  ],
} satisfies ToolFacts;
