import type { ToolFacts } from "./types";

export default {
  slug: "higgsfield",
  lifecycle: "active",
  company: {
    value: "Higgsfield, Inc.",
    note: "© 2026 Higgsfield, Inc.",
    sourceUrl: "https://higgsfield.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Limited use",
    },
    sourceUrl: "https://higgsfield.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Starter",
        price: "$19",
        period: "month",
        limits: "Annual; page says no difference vs monthly",
      },
      {
        name: "Plus",
        price: "$47",
        period: "month",
        limits: "Annual; from $59 monthly",
      },
      {
        name: "Ultra",
        price: "$99",
        period: "month",
        limits: "Annual; from $129 monthly",
      },
      {
        name: "Teams",
        price: "From $65",
        period: "seat/month",
        limits: "",
      },
    ],
    sourceUrl: "https://higgsfield.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: [
      "Higgsfield Soul family",
      "Genjutsu",
      "Katana",
      "Popcorn",
      "Canvas",
      "Cinema Studio 4.0",
      "Supercomputer agent (powered by GPT-6 Astra, third-party)",
      "Seedance (third-party)",
      "Kling (third-party)",
      "Nano Banana (third-party)",
      "Wan (third-party)",
      "Sora 2 (third-party)",
      "Veo 3.1 (third-party)",
    ],
    note: "In-house: Soul family, Genjutsu, Katana, Popcorn, Canvas, Cinema Studio 4.0. Supercomputer agent is powered by GPT-6 Astra.",
    sourceUrl: "https://higgsfield.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded Starter/Plus/Ultra/Teams list prices. Third-party models labeled as such. App links unpublished.",
    },
  ],
} satisfies ToolFacts;
