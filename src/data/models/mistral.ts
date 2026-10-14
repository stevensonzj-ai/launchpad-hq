import type { PlatformModelFamily } from "./types";

const PRICING = "https://docs.mistral.ai/inference/pricing";
const LARGE4 = "https://docs.mistral.ai/models/mistral-large";

export const mistral: PlatformModelFamily = {
  familySlug: "mistral",
  displayName: "Mistral (Le Chat)",
  vendor: "Mistral AI",
  platformSlugs: ["mistral-ai-le-chat"],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "On the API, Mistral Large 4 is the current flagship (public preview, open weights) at the listed sale price of $0.68 / $2.09 per 1M tokens.",
    "Mistral Small 4 is the cheap current chat model on the same pricing table ($0.15 / $0.60).",
    "Mistral Large 3 remains listed at $0.50 / $1.50 — the previous Large, still documented.",
    "Which of these names appear in free vs Pro Le Chat was not confirmed on docs.mistral.ai in this pass.",
  ],
  sources: [
    { label: "API pricing", url: PRICING },
    { label: "Mistral Large 4", url: LARGE4 },
  ],
  versions: [
    {
      id: "mistral-large-4",
      name: "Mistral Large 4",
      apiId: "mistral-large-4",
      releaseDate: "2026-10-06",
      releaseDateVerified: true,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 0.68,
        verified: true,
        note: "Listed sale price; original listed price $1.36 / 1M input.",
      },
      apiPriceOutput: {
        usdPerMillion: 2.09,
        verified: true,
        note: "Listed sale price; original listed price $4.18 / 1M output.",
      },
      consumerAccess: {
        summary: "Le Chat plan mapping for Large 4 was not confirmed on the Mistral docs pages checked.",
        verified: false,
      },
      strengths: [
        "Current Mistral flagship; open weights, multimodal.",
        "1M token context window on the model page.",
        "Cheaper on the API than Claude Opus or GPT-6 Astra at the listed sale price.",
      ],
      bestFor: "People who want a strong European-lab model, especially via the API or open weights.",
      caveats: [
        "Docs mark it as public preview.",
        "Max output tokens were not listed on the Large 4 page checked.",
        "Sale prices can change; the page also shows a higher original price.",
      ],
      sourceUrls: [
        { label: "Mistral Large 4", url: LARGE4 },
        { label: "API pricing", url: PRICING },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "mistral-small-4",
      name: "Mistral Small 4",
      apiId: "mistral-small-4",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: null, verified: false },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: 0.15, verified: true },
      apiPriceOutput: { usdPerMillion: 0.6, verified: true },
      consumerAccess: {
        summary: "Le Chat plan mapping for Small 4 was not confirmed on the Mistral docs pages checked.",
        verified: false,
      },
      strengths: [
        "Cheapest current Mistral chat model on the flagship pricing table.",
        "Useful when you want Mistral’s stack without Large 4’s cost.",
      ],
      bestFor: "High-volume, cheaper Mistral API calls.",
      caveats: [
        "Context window and max output were not on the pricing page, and the Small 4 model URL 404’d in this pass.",
      ],
      sourceUrls: [{ label: "API pricing", url: PRICING }],
      verified: { specs: false, apiPricing: true, consumerAccess: false },
    },
    {
      id: "mistral-large-3",
      name: "Mistral Large 3",
      apiId: "mistral-large-3",
      releaseDate: null,
      releaseDateVerified: false,
      status: "legacy",
      role: "prior",
      contextWindow: { tokens: null, verified: false },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: 0.5, verified: true },
      apiPriceOutput: { usdPerMillion: 1.5, verified: true },
      consumerAccess: {
        summary: "Le Chat plan mapping for Large 3 was not confirmed on the Mistral docs pages checked.",
        verified: false,
      },
      strengths: ["Still listed on Mistral’s official pricing table as a flagship-family model."],
      bestFor: "Existing Large 3 API callers.",
      caveats: ["Large 4 is the current flagship. Context and max output unverified on the pricing page."],
      sourceUrls: [{ label: "API pricing", url: PRICING }],
      verified: { specs: false, apiPricing: true, consumerAccess: false },
    },
  ],
};
