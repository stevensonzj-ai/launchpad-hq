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
      summary: "Free, no credit card: unlimited public and private highlights (any plan can keep a page's highlights private). Basic YouTube summaries: 3 a day. Advanced YouTube summaries: 3 per 7 days. YouTube transcripts of 5 videos a day in the extensions. 30 minutes of audio transcription a month.",
    },
    sourceUrl: "https://glasp.co/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "No credit card. Unlimited public and private highlights. See the free-tier limits.",
      },
      {
        name: "Pro",
        price: "$12.50",
        period: "month",
        limits: "$12.50/mo billed yearly ($15 monthly)",
      },
      {
        name: "Student",
        price: "$0",
        period: "",
        limits: "Free Student plan",
      },
    ],
    note: "Read 2026-11-20. Yearly billing is labeled 2 months free. An Unlimited plan and the stored $150 and $360 yearly totals are not stated on this page.",
    sourceUrl: "https://glasp.co/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
