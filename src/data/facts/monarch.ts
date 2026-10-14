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
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Yearly subscription",
        price: "$99.99",
        period: "year",
        limits: "per account",
      },
      {
        name: "Monthly subscription",
        price: "$14.99",
        period: "month",
        limits: "per account",
      },
    ],
    note: "USD, per account. FAQ recommends signing up on the web rather than through the app stores. No yearly-to-monthly conversion. Free tier and trial length unpublished.",
    sourceUrl: "https://www.monarch.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "iOS", "Android"],
    sourceUrl: "https://www.monarch.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/monarch-money/id1459319842",
      android: "https://play.google.com/store/apps/details?id=com.monarchmoney.mobile",
    },
    sourceUrl: "https://www.monarch.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded $99.99 yearly or $14.99 monthly per account. No free-tier row (none stated).",
    },
  ],
} satisfies ToolFacts;
