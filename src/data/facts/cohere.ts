import type { ToolFacts } from "./types";

/**
 * Cohere: first fact file, stale-facts batch 4 (catalog audit 20), 2026-10-29.
 * Read twice, blind, on cohere.com. Both readers agree: a Trial API key is free
 * but rate limited and not allowed for production or commercial use; production
 * is pay as you go; North, Compass and private deployments are custom; Model
 * Vault is priced per instance. The pricing page lists per-token prices only for
 * older models (Command R+ 08-2024, Aya Expanse and earlier), not for the
 * current Command A family. The privacy policy says trial and research users'
 * inputs and outputs may be used for research and development after
 * de-identification, with no opt-out described; Enterprise users can control
 * training; private deployments are not trained on. Only one reader read the
 * rate-limit docs (1,000 calls a month on trial keys), so the row's usage
 * limit is left as it is.
 */
export default {
  slug: "cohere",
  lifecycle: "active",
  officialUrl: {
    value: "https://cohere.com",
    sourceUrl: "https://cohere.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Cohere Inc.",
    note: "Described as a Canadian company (Toronto).",
    sourceUrl: "https://cohere.com/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: true,
      summary: "A free Trial API key: calls are free but rate limited, and trial keys may not be used for production or commercial purposes."
    },
    sourceUrl: "https://cohere.com/pricing",
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
        name: "Trial API key",
        price: "$0",
        period: "",
        limits: "Rate limited; no production or commercial use"
      },
      {
        name: "Production API key",
        price: "Pay as you go",
        period: "",
        limits: "Requires a Go to Production application by an account Owner"
      }
    ],
    note: "USD, as of 2026-10-29. North, Compass and private deployments are custom (contact sales). Model Vault is priced per instance, for example Rerank 5 (Medium) $4.00 an hour or $2,500 a month and Parse 5 (XL) $7.00 an hour or $4,300 a month.",
    sourceUrl: "https://cohere.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  apiPricing: {
    value: "Per 1M tokens, input / output: Command R+ 08-2024 $2.50 / $10.00; Aya Expanse 8B and 32B $0.50 / $1.50. The page lists older models only for existing customers and shows no prices for the current Command A models.",
    sourceUrl: "https://cohere.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      trainsOnData: true,
      retention: "Enterprise inputs and outputs are generally retained for 30 days.",
      policyUrl: "https://cohere.com/privacy"
    },
    note: "Trial and research users: input and output data may be used for research and development after de-identification; no opt-out is described. Enterprise users \"can control how we train on their data\". Private and third-party deployments: Cohere does not train on the data. Cloud infrastructure is on GCP in the United States, with transfers to Canada, the US and the UK.",
    sourceUrl: "https://cohere.com/privacy",
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
      summary: "First fact file: free Trial key (rate limited, no commercial use); production pay as you go; trial-user inputs may be used for research."
    }
  ],
} satisfies ToolFacts;
