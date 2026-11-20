import type { ToolFacts } from "./types";

/**
 * Hugging Face: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans and Inference Providers credits read twice on
 * huggingface.co.
 */
export default {
  slug: "hugging-face",
  lifecycle: "active",
  company: {
    value: "Hugging Face",
    sourceUrl: "https://huggingface.co/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "A free account covers public models and datasets, free CPU Basic and ZeroGPU Spaces, and community features. It has no monthly inference credits: Inference Providers usage on a free account needs purchased credits.",
    },
    sourceUrl: "https://huggingface.co/docs/inference-providers/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Public models and datasets; CPU Basic and ZeroGPU Spaces; no monthly inference credits",
      },
      {
        name: "PRO",
        price: "$9",
        period: "month",
        limits: "10x private storage; $2 of inference credits a month; 8x ZeroGPU quota and highest queue priority",
      },
      {
        name: "Team",
        price: "$20",
        period: "month per user",
        limits: "SSO and audit logs; members get ZeroGPU and Inference Providers PRO benefits ($2 of credits per seat)",
      },
      {
        name: "Enterprise",
        price: "$500",
        period: "month per user",
        limits: "SCIM provisioning; managed billing with annual commitments",
      },
    ],
    note: "USD, re-read 2026-11-20 on huggingface.co/pricing. PRO is $9/month and Team is $20/month per user. Enterprise is $500/month per user. Compute (Spaces hardware, Inference Endpoints, Jobs) is billed separately by usage.",
    sourceUrl: "https://huggingface.co/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      retention: "Request and response bodies are not stored; logs up to 30 days (Inference Providers)",
      policyUrl: "https://huggingface.co/privacy",
    },
    note: "Inference Providers security page: \"Hugging Face does not store any user data for training purposes.\" Scoped to Inference Providers.",
    sourceUrl: "https://huggingface.co/docs/inference-providers/security",
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
        "First fact file: PRO $9/mo ($2 inference credits), Team $20/user/mo, Enterprise $50/user/mo (the catalog said custom); free accounts get no monthly inference credits.",
    },
    {
      date: "2026-11-20",
      field: "plans",
      summary:
        "Pricing page re-read: PRO stays $9/month and Team stays $20/month per user. Enterprise is $500/month per user, with SCIM provisioning and managed billing on annual commitments.",
    },
  ],
} satisfies ToolFacts;
