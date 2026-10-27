import type { ToolFacts } from "./types";

/**
 * n8n: re-checked 2026-10-25. Free means self-hosting the Community edition
 * yourself (docs.n8n.io). n8n Cloud has no free plan, only a trial.
 */
export default {
  slug: "n8n",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Free only if you run it yourself: the self-hosted Community edition is free with almost the full feature set. n8n Cloud has no free plan, only a trial with no card required.",
    },
    sourceUrl: "https://docs.n8n.io/hosting/community-edition-features/",
    sourceKind: "product-page",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Community (self-hosted)", price: "Free", period: "", limits: "You host and maintain it yourself" },
      { name: "Starter (Cloud)", price: "€20", period: "month", limits: "Billed annually; 2.5K workflow executions" },
      { name: "Pro (Cloud)", price: "€50", period: "month", limits: "Billed annually; 10K workflow executions" },
      { name: "Business (self-hosted)", price: "€667", period: "month", limits: "Billed annually; 40K workflow executions" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Hosted by n8n or self-hosted" },
    ],
    note: "EUR, billed annually, from n8n.io/pricing. Community edition terms from docs.n8n.io.",
    sourceUrl: "https://n8n.io/pricing/",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Re-checked: Cloud Starter €20/month and Pro €50/month (annual), Business €667/month self-hosted; Community edition free when self-hosted.",
    },
  ],
} satisfies ToolFacts;
