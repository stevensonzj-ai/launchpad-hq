import type { PlatformModelFamily } from "./types";

const GET_STARTED = "https://www.llama.com/get-started";
const CARD = "https://dev.meta.ai/llama/docs/model-cards-and-prompt-formats/llama4";
const LLAMA4 = "https://developer.meta.com/ai/models/llama-4/";

export const metaLlama: PlatformModelFamily = {
  familySlug: "llama",
  displayName: "Llama (Meta)",
  vendor: "Meta",
  platformSlugs: [],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "There is no Platform.slug in this repo’s tutorials or seed scripts for Meta’s Llama product (llama-cpp is a separate local engine). This family is documented for /models only.",
    "Llama 4 Scout: long context (10M tokens on the model card) and can run on a single H100 when quantized.",
    "Llama 4 Maverick: larger expert count (400B total / 17B active) and a 1M context window.",
    "Meta does not list a first-party per-1M-token API price on the pages checked — you download weights or pay a host. API prices are unverified here.",
  ],
  sources: [
    { label: "Get started with Llama", url: GET_STARTED },
    { label: "Llama 4 model card", url: CARD },
    { label: "Llama 4 overview", url: LLAMA4 },
  ],
  versions: [
    {
      id: "llama-4-maverick",
      name: "Llama 4 Maverick",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: null, verified: false, note: "No first-party per-token API price on llama.com / the model card." },
      apiPriceOutput: { usdPerMillion: null, verified: false },
      consumerAccess: {
        summary: "Weights are downloadable from Meta and partners. Which Meta AI app experiences use Maverick was not confirmed on the pages checked.",
        verified: false,
      },
      strengths: [
        "Natively multimodal (text plus up to five images in, text out).",
        "1M token context on the official model card.",
        "17B active parameters from a 400B MoE (128 experts).",
      ],
      bestFor: "Teams that can host Llama themselves and want the stronger Llama 4.",
      caveats: [
        "Not a one-click chat app in this catalog — no matching platform slug.",
        "API token prices are unverified (hosts set their own).",
        "Max output unverified.",
      ],
      sourceUrls: [
        { label: "Llama 4 model card", url: CARD },
        { label: "Get started", url: GET_STARTED },
      ],
      verified: { specs: true, apiPricing: false, consumerAccess: false },
    },
    {
      id: "llama-4-scout",
      name: "Llama 4 Scout",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 10_000_000, verified: true, note: "Model card maximum context length." },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: null, verified: false, note: "No first-party per-token API price on llama.com / the model card." },
      apiPriceOutput: { usdPerMillion: null, verified: false },
      consumerAccess: {
        summary: "Weights are downloadable. Meta AI app mapping was not confirmed on the pages checked.",
        verified: false,
      },
      strengths: [
        "10M token context window on the official model card.",
        "Fits on a single H100 at INT4, per Meta’s card.",
        "Same 17B active-parameter MoE design, with 16 experts / 109B total.",
      ],
      bestFor: "Very long documents on hardware you control, when you do not need Maverick.",
      caveats: [
        "10M context is an evaluated maximum; real hosts may expose a shorter window.",
        "API token prices unverified.",
      ],
      sourceUrls: [
        { label: "Llama 4 model card", url: CARD },
        { label: "Get started", url: GET_STARTED },
      ],
      verified: { specs: true, apiPricing: false, consumerAccess: false },
    },
  ],
};
