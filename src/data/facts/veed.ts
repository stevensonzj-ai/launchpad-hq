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
        name: "Free",
        price: "$0",
        period: "",
        limits: "50 AI credits a month, watermarked exports, 10 minutes of subtitles a month",
      },
      {
        name: "Creator",
        price: "$25/mo monthly or $147/yr",
        period: "",
        limits: "per editor seat",
      },
      {
        name: "Pro",
        price: "$45/mo or $265/yr",
        period: "",
        limits: "per editor seat",
      },
      {
        name: "Studio",
        price: "$79/mo or $465/yr",
        period: "",
        limits: "per editor seat",
      },
      {
        name: "Enterprise",
        price: "custom",
        period: "",
        limits: "",
      },
    ],
    note: "USD per editor seat, from the vendor pricing index. Creator, Pro, and Studio prices are the monthly rate or the once-a-year charge. Free is $0 with 50 AI credits a month.",
    sourceUrl: "https://www.veed.io/pricing/index.html.md",
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
      summary: "Rechecked VEED's pricing index on 2026-11-14. Creator, Pro, and Studio prices match. Added the Free plan the index states.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: per user applies to Creator, Pro, and Studio only. All four plan rows browser-verified 2026-10-14.",
    },
  ],
} satisfies ToolFacts;
