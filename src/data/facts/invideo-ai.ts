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
        price: "$10 per seat/mo",
        period: "billed annually",
        limits:
          "400 credits per seat/mo. 50% off promo on annual plans (list $20/$60/$150)",
      },
      {
        name: "Plus",
        price: "$30 per seat/mo",
        period: "billed annually",
        limits: "2,000 credits. 50% off promo on annual plans (list $20/$60/$150)",
      },
      {
        name: "Max",
        price: "$75 per seat/mo",
        period: "billed annually",
        limits:
          "5,000 credits; tier slider up to 15,000. 50% off promo on annual plans (list $20/$60/$150)",
      },
    ],
    note: "Browser-verified 2026-10-14: no free plan visible. Annual prices $10 / $30 / $75 per seat per month, against list prices $20 / $60 / $150 (a 50% promo is shown). Monthly-billed prices omitted (unconfirmed).",
    sourceUrl: "https://invideo.io/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
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
