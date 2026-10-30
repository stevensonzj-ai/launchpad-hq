import type { ToolFacts } from "./types";

/**
 * Amazon Bedrock: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on aws.amazon.com and docs.aws.amazon.com.
 * Both readers agree: no Bedrock free tier of its own. New AWS accounts on the
 * AWS Free plan get $100 in credits plus up to $100 more for exploring services
 * (up to $200), valid for 6 months (the plan closes when the credit runs out or
 * after 6 months), and Bedrock is available on it. The row's "limited model
 * usage for first 2 months" is gone. Pay as you go per token with On-Demand
 * Standard, Flex (50% discount) and Priority (75% premium) tiers, Batch about
 * 50% lower, and hourly Provisioned Throughput. Anthropic per-token prices were
 * not visible, and the last 18k characters of the pricing page were unread.
 * Model providers cannot see prompts or completions (data-protection docs). The
 * explicit "content is not used to improve base models" line is from the
 * Bedrock FAQ, read by one reader only.
 *
 * Catalog audit 21 (Research Analyst browser check, 2026-10-29): the Bedrock
 * pricing page states no free tier (the only $0 items are managed Knowledge
 * Base parsing, embeddings and reranking, and the regex and word Guardrails
 * filters), and aws.amazon.com/free lists Bedrock under "Get started for free
 * with up to $200 in credits". Those credits are the general new-account
 * ones, not a Bedrock allowance. Cost tier stays PAID.
 */
export default {
  slug: "amazon-bedrock",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No Bedrock free tier of its own: new AWS accounts on the AWS Free plan get $100 in credits plus up to $100 more for exploring services (up to $200), valid for 6 months, and Bedrock is available on that plan."
    },
    sourceUrl: "https://aws.amazon.com/free/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "On-Demand",
        price: "Pay per token",
        period: "",
        limits: "Standard, Flex (50% discount) and Priority (75% premium) tiers"
      },
      {
        name: "Batch",
        price: "About 50% lower than On-Demand",
        period: "",
        limits: "Select models"
      },
      {
        name: "Provisioned Throughput",
        price: "Hourly per model unit",
        period: "",
        limits: "No commitment, 1-month or 6-month terms; a Reserved tier is priced through the account team"
      }
    ],
    note: "As of 2026-10-29. Guardrails, Knowledge Bases and Model Evaluation are billed by unit.",
    sourceUrl: "https://aws.amazon.com/bedrock/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  apiPricing: {
    value: "Per 1M tokens, input / output, US On-Demand Standard: Mistral Large 3 $0.50 / $1.50; DeepSeek v3.2 $0.62 / $1.85; Gemma 4 31B $0.14 / $0.40. Anthropic and Amazon Nova prices were not visible in the text read.",
    sourceUrl: "https://aws.amazon.com/bedrock/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      policyUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
    },
    note: "Model providers \"don't have access to Amazon Bedrock logs or to customer prompts and completions.\" You choose the AWS Region where content is stored (AWS data privacy FAQ). One reader also quotes the Bedrock FAQ: \"your content is not used to improve the base models and is not shared with any model providers\"; the other did not read that page, so that line is not treated as verified. Abuse-detection, retention and cross-region pages were not read.",
    sourceUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html",
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
      summary: "Browser check (audit 21): confirmed no Bedrock-specific free tier; the only credits are the general new-AWS-account ones. Cost tier stays PAID."
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: no Bedrock free tier; AWS Free plan credits (up to $200 over 6 months) replace \"first 2 months\"; pay per token."
    }
  ],
} satisfies ToolFacts;
