import type { ToolFacts } from "./types";

export default {
  slug: "jetbrains-ai",
  lifecycle: "active",
  displayName: {
    value: "JetBrains AI",
    note: "jetbrains.com/ai now leads to JetBrains Air (one system for building software with agents).",
    sourceUrl: "https://www.jetbrains.com/air/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  company: {
    value: "JetBrains s.r.o.",
    note: "© 2000-2026 JetBrains s.r.o. on the Air page footer. jetbrains.com/ai now leads to JetBrains Air.",
    sourceUrl: "https://www.jetbrains.com/air/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "AI Free: unlimited completion, 3 credits/mo",
    },
    note: "Browser-verified 2026-10-14; /store/ai returns only its title to fetch. Recheck 2026-11-14: jetbrains.com/store/ai/ JSON lists AI Pro and AI Ultimate prices and does not list AI Free or a 3-credit allowance. This line stays as last recorded on 2026-10-14.",
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "AI Pro",
        price: "$100/user/yr",
        period: "",
        limits: "Also $10/user/month; yearly billing is $8.33/user/month",
      },
      {
        name: "AI Ultimate",
        price: "$300/user/yr",
        period: "",
        limits: "Also $30/user/month; yearly billing is $25/user/month",
      },
    ],
    note: "Personal prices from the JetBrains store JSON on 2026-11-14. AI Free is not in that JSON; the free-tier line is unverified.",
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    sourceKind: "plans-page",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-14",
      field: "plans",
      summary: "Store JSON: AI Pro $100/year or $10/month, AI Ultimate $300/year or $30/month. AI Free was not listed.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: kept JetBrains AI name, yearly prices, and Air note. Removed Air-page platforms and models so the DB falls back.",
    },
  ],
} satisfies ToolFacts;
