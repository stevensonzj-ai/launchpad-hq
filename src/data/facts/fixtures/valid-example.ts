import type { ToolFacts } from "../types";

export const validExampleFacts = {
  slug: "fixture-valid",
  lifecycle: "active",
  verdict: {
    value: "A fixture used only in tests. Not a catalog platform.",
    sourceUrl: "https://example.com/fixture-valid",
    checkedAt: "2026-10-01",
    gatheredBy: "research-analyst",
    verifiedBy: "cos",
    verifiedAt: "2026-10-02",
    status: "verified",
  },
  freeTier: {
    value: { available: true, summary: "Limited daily messages on the Free plan." },
    sourceUrl: "https://example.com/fixture-valid/pricing",
    checkedAt: "2026-10-01",
    gatheredBy: "research-analyst",
    verifiedBy: "cos",
    verifiedAt: "2026-10-02",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "daily message cap" },
      { name: "Plus", price: "$20", period: "month", limits: "higher limits" },
    ],
    sourceUrl: "https://example.com/fixture-valid/pricing",
    checkedAt: "2026-10-01",
    gatheredBy: "research-analyst",
    verifiedBy: "cos",
    verifiedAt: "2026-10-02",
    status: "verified",
  },
  platforms: {
    value: ["Web", "iOS", "Android"],
    sourceUrl: "https://example.com/fixture-valid/apps",
    checkedAt: "2026-09-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cos",
    verifiedAt: "2026-09-21",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.example.com/fixture-valid",
      android: "https://play.example.com/fixture-valid",
    },
    sourceUrl: "https://example.com/fixture-valid/apps",
    checkedAt: "2026-09-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cos",
    verifiedAt: "2026-09-21",
    status: "verified",
  },
  models: {
    value: ["flagship chat model"],
    sourceUrl: "https://example.com/fixture-valid/models",
    checkedAt: "2026-09-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cos",
    verifiedAt: "2026-09-21",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-01",
      field: "plans",
      summary: "Recorded current Free and Plus prices for the fixture.",
    },
  ],
} satisfies ToolFacts;
