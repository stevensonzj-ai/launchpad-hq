import type { ToolFacts } from "./types";

/**
 * Fireworks AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Billing and rate limits read twice. No free plan: billing is
 * prepaid and usage-based. Neither reader found a sign-up credit on the
 * pricing page, and the Research Analyst's browser check the same day found
 * none stated either (the only free item was a limited-time free model
 * until 11/30), so no starting-credit claim is made anywhere.
 */
export default {
  slug: "fireworks-ai",
  lifecycle: "active",
  company: {
    value: "Fireworks AI",
    note: "Homepage: \"Fireworks AI, Inc.\"",
    sourceUrl: "https://fireworks.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan: billing is prepaid and usage-based. Without a payment method and credits, an account is limited to 10 requests a minute.",
    },
    note: "Pricing: \"Pay per token with pre-paid, usage-based billing. Simply add a payment method to buy credits, and usage is then deducted from your balance.\" No starting credit is stated (browser check, 2026-10-29). Rate limits: 10 RPM without a payment method or credits, up to 6,000 RPM with them.",
    sourceUrl: "https://fireworks.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Prepaid, per token for serverless models (for example embeddings up to 150M parameters at $0.008 per 1M input tokens); on-demand GPUs per hour (H100 or H200 $8.00, B200 $13.00).",
    note: "Region-restricted deployments cost 1.5x.",
    sourceUrl: "https://fireworks.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  privacy: {
    value: { trainsOnData: false, policyUrl: "https://fireworks.ai/privacy-policy" },
    note: "\"We do not use your prompts, training data, or API inputs to train or improve our AI models without your explicit opt-in.\"",
    sourceUrl: "https://fireworks.ai/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: no free plan, prepaid usage billing; 10 RPM until a payment method and credits are added. The catalog's \"$1 credit for new accounts\" was not found.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "Browser check: no starting credit stated on the pricing page; the guide's welcome-credit line is removed.",
    },
  ],
} satisfies ToolFacts;
