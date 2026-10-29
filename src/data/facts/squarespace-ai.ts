import type { ToolFacts } from "./types";

/**
 * Squarespace AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on squarespace.com and its help centre. No free
 * plan (14-day trial). Squarespace now meters some AI tools with per-plan AI
 * credits. Both readers saw two prices per plan beside a "Pay annually / Pay
 * monthly" toggle that the fetched text did not label; both took the lower
 * price as annual ("Pay annually to save up to 36%"). That mapping is on the
 * Browser-check list. Audit 11 owns this row's cost tier (PAID), so audit 18
 * patches text only.
 */
export default {
  slug: "squarespace-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free plan: a 14-day free trial with no card. Trial sites get 10 trial credits for select AI tools.",
    },
    sourceUrl: "https://www.squarespace.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$19",
        period: "month",
        limits: "Billed annually ($25 paid monthly); 10 AI credits, one-time",
      },
      {
        name: "Core",
        price: "$29",
        period: "month",
        limits: "Billed annually ($39 paid monthly); 20 AI credits a month",
      },
      {
        name: "Plus",
        price: "$49",
        period: "month",
        limits: "Billed annually ($65 paid monthly); 40 AI credits a month",
      },
      {
        name: "Advanced",
        price: "$99",
        period: "month",
        limits: "Billed annually ($139 paid monthly); 120 AI credits a month",
      },
    ],
    note: "USD, as of 2026-10-29. Which price is annual and which monthly is inferred from the billing toggle (see the file comment). Extra AI credit packs can be bought.",
    sourceUrl: "https://www.squarespace.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "AI credits: Image Studio and AI Visibility use credits; Text AI and the Clarkson site-editing chat do not.",
    ],
    sourceUrl: "https://support.squarespace.com/hc/en-us/articles/46668956855053-Use-AI-credits-for-Squarespace-AI-tools",
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
      summary: "First fact file: plans from $19/mo (billed annually) with per-plan AI credits; 14-day trial. Replaces \"from $16/mo\" and \"unlimited AI writing\".",
    },
  ],
} satisfies ToolFacts;
