import type { ToolFacts } from "./types";

export default {
  slug: "monarch",
  lifecycle: "active",
  company: {
    value: "Monarch Money, Inc.",
    note: "Footer: Copyright © 2026 Monarch Money, Inc.",
    sourceUrl: "https://www.monarch.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Yearly subscription",
        price: "$99.99",
        period: "year",
        limits: "",
      },
      {
        name: "Monthly subscription",
        price: "$14.99",
        period: "month",
        limits: "",
      },
    ],
    note: "USD. FAQ recommends signing up on the web rather than through the app stores. No yearly-to-monthly conversion. Free tier and trial length unpublished.",
    sourceUrl: "https://www.monarch.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "iOS", "Android"],
    sourceUrl: "https://www.monarch.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/monarch-money/id1459319842",
      android: "https://play.google.com/store/apps/details?id=com.monarchmoney.mobile",
    },
    sourceUrl: "https://www.monarch.com/pricing",
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
      summary: "RA: $99.99 yearly or $14.99 monthly. Dropped “per account” (not on the page).",
    },
  ],
} satisfies ToolFacts;
