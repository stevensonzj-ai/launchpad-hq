import type { ToolFacts } from "./types";

const IDEOGRAM_VECTOR_URL = "https://ideogram.ai/models/vector/";
// Ideogram's own help docs. ideogram.ai/pricing returned 403 to both fetchers on
// 2026-10-26; docs.ideogram.ai/plans-and-pricing/available-plans redirects here.
const IDEOGRAM_PLANS_URL = "https://docs.ideogram.ai/plans-and-billing/available-plans";

export default {
  slug: "ideogram",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "30 credits a week for accounts that sign in with Google, Apple or Microsoft (email-and-password accounts get no free credits). Everything generated on the free plan is public.",
    },
    sourceUrl: IDEOGRAM_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "30 credits a week" },
      { name: "Plus", price: "$20", period: "month", limits: "$15/month billed yearly ($180 a year); 2,400 credits a month" },
      { name: "Pro", price: "$60", period: "month", limits: "$42/month billed yearly ($504 a year); 7,500 credits a month" },
      {
        name: "Team",
        price: "$30",
        period: "user/month",
        limits: "$20 per user/month billed yearly ($240 per user a year); 3,600 credits per user; at least 2 users",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD before tax, from Ideogram's help docs (page marked \"Last verified: October 15, 2026\"), as of 2026-10-26. Unused monthly credits don't roll over. The Basic plan is no longer sold.",
    sourceUrl: IDEOGRAM_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apiPricing: {
    value:
      "Ideogram Vector API (ideogram-vector-1), USD per SVG. Text to vector: Low $0.13; Medium $0.16; High $0.20 from a prompt alone, $0.32 with reference images (Low and Medium cost the same with references). Image to vector (vectorize an image): $0.10 per image.",
    note: "Vector prices only, from the Ideogram Vector model page.",
    sourceUrl: IDEOGRAM_VECTOR_URL,
    sourceKind: "product-page",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "Ideogram Vector makes scalable, editable SVG files, either from a text prompt or by converting an existing image (as of 2026-10-26).",
    ],
    sourceUrl: IDEOGRAM_VECTOR_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "Added the free tier (30 credits a week) and Free/Plus/Pro/Team/Enterprise subscription prices from Ideogram's plans help page.",
    },
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added Ideogram Vector (editable SVG output) and its API prices from the Vector model page.",
    },
  ],
} satisfies ToolFacts;
