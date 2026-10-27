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
    note: "Browser-verified 2026-10-14; /store/ai returns only its title to fetch.",
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "AI Free",
        price: "Free",
        period: "",
        limits: "Unlimited completion, 3 credits/mo",
      },
      {
        name: "AI Pro",
        price: "$100/user/yr",
        period: "",
        limits: "",
      },
      {
        name: "AI Ultimate",
        price: "$300/user/yr",
        period: "",
        limits: "",
      },
    ],
    note: "Yearly prices only. Monthly prices unpublished (only the yearly tab was viewed). No /12 monthly figures. AI Free (3 credits), AI Pro $100/user/yr and AI Ultimate $300/user/yr are browser-verified 2026-10-14; /store/ai returns only its title to fetch.",
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    sourceKind: "plans-page",
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
        "RA: kept JetBrains AI name, yearly prices, and Air note. Removed Air-page platforms and models so the DB falls back.",
    },
  ],
} satisfies ToolFacts;
