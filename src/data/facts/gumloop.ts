import type { ToolFacts } from "./types";

/**
 * Gumloop: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * The pricing page was read once (gumloop.com/pricing); the second reader
 * could not render it and confirmed the plans on Gumloop's credits docs.
 * No free plan: Pro starts with a 14-day trial. The footer company name
 * was read once, so company stays unverified.
 */
export default {
  slug: "gumloop",
  lifecycle: "active",
  company: {
    value: "AgentHub Inc.",
    note: "Site footer: \"© 2026 AgentHub Inc.\" (read once).",
    sourceUrl: "https://www.gumloop.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. Pro starts with a 14-day free trial, which needs a card and converts to the paid plan unless cancelled.",
    },
    sourceUrl: "https://docs.gumloop.com/core-concepts/credits",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pro",
        price: "$37",
        period: "month",
        limits: "20,000 credits a month (7,400 plus 12,600 bonus); unused credits do not roll over; unlimited seats",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Custom credits; unused credits roll over; RBAC, SCIM/SAML, audit logs",
      },
    ],
    note: "USD, as of 2026-10-29. Pricing page: \"Pro / Starts at $37 / month / Start 14-day free trial\". Credits are \"indexed at $0.005 each\"; past the allowance, agents stop unless pay as you go is turned on.",
    sourceUrl: "https://docs.gumloop.com/core-concepts/credits",
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
      summary:
        "First fact file: no free plan (14-day Pro trial); Pro $37/mo with 20,000 credits, Enterprise custom. Replaces the catalog's free plan with 2,000 credits and Solo $25 / Team $100.",
    },
  ],
} satisfies ToolFacts;
