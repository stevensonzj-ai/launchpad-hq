import type { ToolFacts } from "./types";

/**
 * Glasp: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * No longer free-only: Pro and Unlimited are paid plans, and the free
 * plan has caps on AI chat, summaries, PDFs and audio. Private highlights
 * need Pro. The row moves from FREE to FREEMIUM. The privacy policy
 * (updated 2026-10-29) lets Glasp train on content you save, with no
 * opt-out; the row is already LOW.
 */
export default {
  slug: "glasp",
  lifecycle: "active",
  company: {
    value: "Glasp Inc.",
    sourceUrl: "https://glasp.co/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free, no card: unlimited public highlights; 3 basic YouTube summaries a day; 30 PDF uploads; 20 AI chat credits a month; 30 minutes of audio a month. Private highlights need Pro.",
    },
    sourceUrl: "https://glasp.co/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Public highlights only; 20 AI chat credits a month; 30 audio minutes a month",
      },
      {
        name: "Pro",
        price: "$12.50",
        period: "month",
        limits: "Or $150 billed yearly; unlimited private highlights; 500 AI credits and 300 audio minutes a month; 100 PDFs",
      },
      {
        name: "Unlimited",
        price: "$30",
        period: "month",
        limits: "Or $360 billed yearly; 2,000 AI credits and 1,500 audio minutes a month; unlimited PDFs",
      },
    ],
    note: "USD, as of 2026-10-29. Yearly billing is \"2 months free\"; paid plans are non-refundable.",
    sourceUrl: "https://glasp.co/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://glasp.co/privacy-policy",
    },
    note: "Privacy policy (last updated October 29, 2026): \"We may use information we collect through the Services, including content you create and save, to develop, train\" its models; no general opt-out is stated.",
    sourceUrl: "https://glasp.co/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: Pro $12.50/mo and Unlimited $30/mo; capped free plan (FREE -> FREEMIUM); trains on saved content.",
    },
  ],
} satisfies ToolFacts;
