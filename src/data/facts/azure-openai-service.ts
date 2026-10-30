import type { ToolFacts } from "./types";

/**
 * Azure OpenAI Service: first fact file, stale-facts batch 4 (catalog audit
 * 20), 2026-10-29. Read twice, blind, on microsoft.com and learn.microsoft.com.
 * Both readers agree: Microsoft now presents it as "Azure OpenAI in Foundry
 * Models" inside Microsoft Foundry (formerly Azure AI Studio), while the pricing
 * page still says Azure OpenAI Service; no end-of-life date. No permanent free
 * tier: "Pay as you go or try Azure free for up to 30 days" (the credit amount
 * is not stated, so the row's "$200 credits" is unsourced). Pay as you go per
 * token with Global, Data Zone and Regional deployments, provisioned throughput
 * (PTU) reservations and Batch. The pricing page shows "$-" placeholders, so
 * per-token prices need a browser. Privacy (Learn page, 2026): prompts and
 * completions are not used to train foundation models without permission and
 * are not available to OpenAI or other providers; a sample may be stored for
 * abuse monitoring.
 */
export default {
  slug: "azure-openai-service",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No permanent free tier: pay as you go, or try Azure free for up to 30 days. The free-account credit amount is not stated on the pages read."
    },
    sourceUrl: "https://azure.microsoft.com/en-us/products/ai-foundry/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Standard (on-demand)",
        price: "Pay per token",
        period: "",
        limits: "Global, Data Zone (EU or US) and Regional deployments"
      },
      {
        name: "Provisioned (PTU)",
        price: "Monthly and annual reservations",
        period: "",
        limits: "Provisioned throughput units"
      },
      {
        name: "Batch",
        price: "Discounted per token",
        period: "",
        limits: "Asynchronous jobs"
      }
    ],
    note: "As of 2026-10-29. The price fields on the page show \"$-\"; actual per-token prices were not readable.",
    sourceUrl: "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  features: {
    value: [
      "Offered as \"Azure OpenAI in Foundry Models\" inside Microsoft Foundry (formerly Azure AI Studio); the pricing page is still titled Azure OpenAI Service."
    ],
    sourceUrl: "https://azure.microsoft.com/en-us/products/ai-foundry/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy"
    },
    note: "Prompts, completions, embeddings and training data \"are NOT used to train any generative AI foundation models without your permission or instruction\" and are \"NOT available to OpenAI or other providers\". Abuse monitoring: a sample of prompts and completions may be stored and reviewed (managed customers can apply to change this). Processing stays in the chosen geography except for Global or Data Zone deployments.",
    sourceUrl: "https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: no permanent free tier (Azure free for up to 30 days); now offered inside Microsoft Foundry; data not used to train foundation models."
    }
  ],
} satisfies ToolFacts;
