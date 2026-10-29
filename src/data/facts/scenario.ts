import type { ToolFacts } from "./types";

/**
 * Scenario: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on scenario.com. Credit plans (Starter, Pro, Max,
 * Enterprise) replace the row's image-count tiers. The free tier is 50
 * credits; the pricing card says "50 free daily credits" while the FAQ says
 * "a free tier with 50 credits", so whether they reset daily is unclear
 * (Browser-check list). Only monthly prices rendered; the annual toggle
 * shows "Save 33%" with no figures.
 */
export default {
  slug: "scenario",
  lifecycle: "active",
  company: {
    value: "Scenario, Inc.",
    note: "\"© 2026 Scenario, Inc.\"",
    sourceUrl: "https://www.scenario.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free tier with 50 credits and no card (the page says both \"50 free daily credits\" and \"a free tier with 50 credits\"). Free outputs are for personal and evaluation use only.",
    },
    sourceUrl: "https://www.scenario.com/pricing",
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
        limits: "50 credits; personal and evaluation use only",
      },
      {
        name: "Starter",
        price: "$15",
        period: "month",
        limits: "1,500 credits a month; single-user workspace; 50 GB storage",
      },
      {
        name: "Pro",
        price: "$45",
        period: "month",
        limits: "5,000 credits a month; priority queue; 500 GB storage",
      },
      {
        name: "Max",
        price: "$75",
        period: "month",
        limits: "10,000 credits a month; up to 25 users; 1 TB storage plus 1 TB per seat",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Consumption-based credits; unlimited seats; 12-month contract; 10 TB storage",
      },
    ],
    note: "\"$\", monthly view, as of 2026-10-29. Annual billing is \"Save 33%\"; annual figures were not shown.",
    sourceUrl: "https://www.scenario.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://www.scenario.com/privacy-policy",
    },
    note: "Self-serve accounts: \"we may use your content and aggregated, de-identified usage data\" to improve the services and Scenario's AI models. Enterprise customers under an MSA / DPA are excluded.",
    sourceUrl: "https://www.scenario.com/privacy-policy",
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
      summary: "First fact file: credit plans Starter $15, Pro $45, Max $75 a month; free tier 50 credits. Replaces \"Pro $29/mo\" and \"Free: 100 images/month\".",
    },
  ],
} satisfies ToolFacts;
