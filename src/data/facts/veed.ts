import type { ToolFacts } from "./types";

export default {
  slug: "veed",
  lifecycle: "active",
  company: {
    value: "VEED",
    note: "Footer: © Copyright 2026 VEED",
    sourceUrl: "https://www.veed.io/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Creator",
        price: "$25/mo monthly or $147/yr",
        period: "",
        limits: "per user",
      },
      {
        name: "Pro",
        price: "$45/mo or $265/yr",
        period: "",
        limits: "per user",
      },
      {
        name: "Studio",
        price: "$79/mo or $465/yr",
        period: "",
        limits: "per user",
      },
      {
        name: "Enterprise",
        price: "custom",
        period: "",
        limits: "",
      },
    ],
    note: "Browser-verified 2026-10-14 (pricing page is JS-rendered; fetch/curl had no plan data). Per user applies to Creator, Pro, and Studio only, not Enterprise. No yearly-to-monthly conversion. Platforms unpublished.",
    sourceUrl: "https://www.veed.io/pricing",
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
        "RA: per user applies to Creator, Pro, and Studio only. All four plan rows browser-verified 2026-10-14.",
    },
  ],
} satisfies ToolFacts;
