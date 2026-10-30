import type { ToolFacts } from "./types";

/**
 * Khan Academy (Khanmigo): first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * The row had it backwards: Khanmigo is free for teachers, and learners
 * and parents pay $4 a month or $44 a year (US only, account holder 18+).
 * Districts request pricing. The row moves from FREE to FREEMIUM and its
 * website to khanmigo.ai. The Khan Academy lesson library stays free.
 */
export default {
  slug: "khan-academy-khanmigo",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.khanmigo.ai",
    sourceUrl: "https://www.khanmigo.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free for teachers. Learners and parents pay; the Khan Academy lesson library itself stays free.",
    },
    note: "Pricing page: \"Free for teachers, $4/month for parents & learners.\"",
    sourceUrl: "https://www.khanmigo.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Teachers",
        price: "$0",
        period: "",
        limits: "Teacher tools",
      },
      {
        name: "Learners",
        price: "$4",
        period: "month",
        limits: "Or $44 a year; US only, 18+",
      },
      {
        name: "Parents",
        price: "$4",
        period: "month",
        limits: "Or $44 a year; US only",
      },
      {
        name: "Districts",
        price: "Request pricing",
        period: "",
        limits: "",
      },
    ],
    note: "USD, sales tax not included, as of 2026-10-29. Paid plans: US residents with a US billing address, 18 or older.",
    sourceUrl: "https://www.khanmigo.ai/pricing",
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
      summary: "First fact file: free for teachers; learners and parents $4/mo or $44/yr (US only). Replaces \"free for all learners; teachers $5/mo\".",
    },
  ],
} satisfies ToolFacts;
