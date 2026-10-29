import type { ToolFacts } from "./types";

/**
 * Gumloop: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * The pricing page was read once (gumloop.com/pricing); the second reader
 * could not render it and confirmed the plans on Gumloop's credits docs.
 * No free plan: Pro starts with a 14-day trial. The footer company name
 * was read once, so company stays unverified. The Research Analyst's
 * browser check the same day read the pricing page (adds an 8%
 * orchestration fee) and privacy policy section 21: content on the
 * self-serve tier (Pro, Pro trials and free accounts) may be used to train
 * Gumloop's models. Catalog audit 18 moves the row's privacyLevel from HIGH
 * to LOW to match.
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
        limits: "Starts at $37; 20,000 credits a month (7,400 plus 12,600 bonus); 8% orchestration fee; unused credits do not roll over; unlimited seats",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Custom credits; unused credits roll over; RBAC, SCIM/SAML, audit logs",
      },
    ],
    note: "USD, as of 2026-10-29. Pricing page (browser check): \"Starts at $37 / month\", 14-day free trial, \"20k per month\" credits, 8% orchestration fee; no annual toggle. Credits are \"indexed at $0.005 each\"; past the allowance, agents stop unless pay as you go is turned on.",
    sourceUrl: "https://docs.gumloop.com/core-concepts/credits",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: true, policyUrl: "https://www.gumloop.com/privacy-policy" },
    note: "Privacy policy (effective 10/07/2026), section 21 \"AI Model Training\": \"Self-Serve Tier. We may use Self-Serve Tier Content to develop, train, and improve our AI models.\" The Self-Serve Tier includes \"the Pro plan, Pro trials, and free accounts\". \"Enterprise Tier. We do not use Content from the Enterprise Tier to train AI models unless you ask us to in writing.\" Gumloop also says OpenAI and Anthropic have agreed not to train on API data sent through it.",
    sourceUrl: "https://www.gumloop.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
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
    {
      date: "2026-10-29",
      field: "privacy",
      summary:
        "Browser check: privacy policy section 21 lets Gumloop train its models on self-serve content (Pro, trials, free accounts); Enterprise is excluded. Row privacyLevel HIGH to LOW (audit 18).",
    },
  ],
} satisfies ToolFacts;
