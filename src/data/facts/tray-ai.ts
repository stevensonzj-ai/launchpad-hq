import type { ToolFacts } from "./types";

/**
 * Tray.ai: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on tray.ai/pricing. A public entry price ($50 a
 * month) and a self-serve 30-day trial are now published, so the row moves
 * from ENTERPRISE to PAID. The privacy policy was not read.
 */
export default {
  slug: "tray-ai",
  lifecycle: "active",
  company: {
    value: "Tray.ai",
    note: "\"© 2026 Tray.ai\"; no acquisition notice.",
    sourceUrl: "https://tray.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. A 30-day free trial includes 1 million Tasks on Tray iPaaS, with no card and no sales call.",
    },
    sourceUrl: "https://tray.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Entry (Tray Helix Builder Edition)",
        price: "$50",
        period: "month",
        limits: "Starting price",
      },
      {
        name: "Pro",
        price: "Sized to your needs",
        period: "",
        limits: "Up to 3 workspaces",
      },
      {
        name: "Team",
        price: "Sized to your needs",
        period: "",
        limits: "20 workspaces",
      },
      {
        name: "Enterprise",
        price: "Sized to your needs",
        period: "",
        limits: "Unlimited workspaces",
      },
    ],
    note: "USD, as of 2026-10-29. Usage-based, metered in Tasks and Helix Compute Units; an annual volume commitment gives a fixed annual cost. No per-user or per-connection fees.",
    sourceUrl: "https://tray.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Tray now presents itself as the Tray AI Orchestration Platform (Tray iPaaS, Tray Helix, Merlin Agent Builder).",
    ],
    sourceUrl: "https://tray.ai/",
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
      summary: "First fact file: starts at $50/month, 30-day self-serve trial with 1M Tasks. Replaces \"Enterprise custom\" and \"demo/trial available on request\".",
    },
  ],
} satisfies ToolFacts;
