import type { ToolFacts } from "./types";

export default {
  slug: "invideo-ai",
  lifecycle: "active",
  company: {
    value: "invideo",
    note: 'Footer: "© 2026 invideo" (no legal suffix).',
    sourceUrl: "https://invideo.io/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Starter",
        price: "$20",
        period: "seat/month",
        limits: "Struck list price per seat. The annual card lists 400 credits per seat/mo.",
      },
      {
        name: "Plus",
        price: "$60",
        period: "seat/month",
        limits: "Struck list price per seat.",
      },
      {
        name: "Max",
        price: "$250",
        period: "seat/month",
        limits: "Struck list price per seat.",
      },
    ],
    note: "Read 2026-11-20. Lower billed-annually figures are on the page and have no stated end date, so they are not the list price. The stored Max $45 was not on the page.",
    sourceUrl: "https://invideo.io/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  models: {
    value: [
      "Nano Banana Pro (third-party)",
      "Seedance 2.0 Fast (third-party)",
      "Seedance 2.5 (third-party)",
      "Seedance 2 (third-party)",
    ],
    sourceUrl: "https://invideo.io/pricing",
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
        "RA: 50% off promo label on each annual plan row (list $20/$60/$150).",
    },
  ],
} satisfies ToolFacts;
