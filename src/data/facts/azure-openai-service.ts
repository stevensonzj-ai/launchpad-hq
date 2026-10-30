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
 *
 * Catalog audit 21 (Research Analyst browser check, 2026-10-29): the Azure
 * free-account page offers a $200 credit usable for up to 30 days, for new
 * customers only (one per customer); the account is disabled after 30 days
 * unless upgraded to pay as you go. Azure OpenAI is not on the free-services
 * list there (the AI items listed free are Speech and Document Intelligence).
 * The OpenAI pricing page's only "free" mention is 1 GB of vector storage a
 * day. So the credit is the general new-account one, not an Azure OpenAI
 * allowance. Cost tier stays PAID.
 */
export default {
  slug: "azure-openai-service",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free tier for the service itself. The only credit is the general new-Azure-account one: $200, usable for up to 30 days, for new customers only. Azure OpenAI is not on the free-services list."
    },
    note: "Both batch-4 readers saw \"Pay as you go or try Azure free for up to 30 days\" on the Foundry page; the $200 credit amount is from the browser check of 2026-10-29 (azure-account page).",
    sourceUrl: "https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
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
      summary: "Browser check (audit 21): the general new-account credit is $200 for up to 30 days (new customers only); the service is not on the free-services list. Cost tier stays PAID."
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: no permanent free tier (Azure free for up to 30 days); now offered inside Microsoft Foundry; data not used to train foundation models."
    }
  ],
} satisfies ToolFacts;
