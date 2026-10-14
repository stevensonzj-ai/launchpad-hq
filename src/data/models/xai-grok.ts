import type { PlatformModelFamily } from "./types";

const MODELS = "https://docs.x.ai/developers/models";
const GROK47 = "https://docs.x.ai/developers/models/grok-4.7";
const PRICING = "https://docs.x.ai/developers/pricing";

export const xaiGrok: PlatformModelFamily = {
  familySlug: "grok",
  displayName: "Grok",
  vendor: "xAI",
  platformSlugs: ["grok"],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "xAI’s models page: for code and chat, use Grok 4.7. It is described as the most capable model they have built.",
    "Grok 4.3 is the cheaper text model in the current pricing table ($1.25 / $2.50 per 1M below 200k prompt tokens) with a larger 1M context window.",
    "Grok 4.6 is still listed at the same token price as 4.7 — treat it as the previous 4.x snapshot, not the one xAI tells you to pick.",
    "Which Grok models appear in the free vs SuperGrok consumer app was not confirmed on docs.x.ai in this pass.",
  ],
  sources: [
    { label: "Grok models", url: MODELS },
    { label: "Grok 4.7", url: GROK47 },
    { label: "API pricing", url: PRICING },
  ],
  versions: [
    {
      id: "grok-4.7",
      name: "Grok 4.7",
      apiId: "grok-4.7",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 500_000, verified: true },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 2,
        verified: true,
        note: "Prompts under 200k tokens. At or above 200k, input is $4 / 1M for the whole request.",
      },
      apiPriceOutput: {
        usdPerMillion: 6,
        verified: true,
        note: "Prompts under 200k tokens. At or above 200k, output is $12 / 1M for the whole request.",
      },
      consumerAccess: {
        summary: "Consumer Grok app plan mapping (free vs SuperGrok) was not listed on the xAI models page checked.",
        verified: false,
      },
      strengths: [
        "xAI’s stated pick for code and everything else text-related.",
        "500k token context window.",
        "Configurable reasoning (low, medium, high, xhigh).",
      ],
      bestFor: "Grok users and API callers who want the current flagship for coding and chat.",
      caveats: [
        "Max output tokens were not listed on the Grok 4.7 page checked.",
        "No realtime knowledge unless you turn on search tools.",
        "Prompts at or above 200k tokens cost double.",
      ],
      sourceUrls: [
        { label: "Grok 4.7", url: GROK47 },
        { label: "Models & pricing", url: MODELS },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "grok-4.3",
      name: "Grok 4.3",
      apiId: "grok-4.3",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 1.25,
        verified: true,
        note: "Prompts under 200k tokens. At or above 200k, input is $2.50 / 1M.",
      },
      apiPriceOutput: {
        usdPerMillion: 2.5,
        verified: true,
        note: "Prompts under 200k tokens. At or above 200k, output is $5 / 1M.",
      },
      consumerAccess: {
        summary: "Consumer app access for Grok 4.3 was not listed on the xAI models page checked.",
        verified: false,
      },
      strengths: [
        "Cheaper than Grok 4.7 on the published API table.",
        "1M token context window — larger than 4.7’s 500k.",
      ],
      bestFor: "Longer documents on a budget, when you do not need 4.7’s flagship quality.",
      caveats: [
        "xAI’s “which model” guide still points new work at 4.7.",
        "Max output unverified.",
      ],
      sourceUrls: [{ label: "Models & pricing", url: MODELS }],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "grok-4.6",
      name: "Grok 4.6",
      apiId: "grok-4.6",
      releaseDate: null,
      releaseDateVerified: false,
      status: "legacy",
      role: "prior",
      contextWindow: { tokens: 500_000, verified: true },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 2,
        verified: true,
        note: "Prompts under 200k tokens. At or above 200k, input is $4 / 1M.",
      },
      apiPriceOutput: {
        usdPerMillion: 6,
        verified: true,
        note: "Prompts under 200k tokens. At or above 200k, output is $12 / 1M.",
      },
      consumerAccess: {
        summary: "Consumer app access for Grok 4.6 was not listed on the xAI models page checked.",
        verified: false,
      },
      strengths: ["Still listed on the official pricing table at the same short-context rate as 4.7."],
      bestFor: "Existing callers that have not moved to 4.7.",
      caveats: ["xAI recommends Grok 4.7 for new code and chat work."],
      sourceUrls: [{ label: "Models & pricing", url: MODELS }],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
  ],
};
