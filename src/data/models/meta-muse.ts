import type { PlatformModelFamily } from "./types";

const ASSISTANT = "https://ai.meta.com/meta-ai/assistant/";
const BLOG = "https://research.meta.ai/blog/muse-spark-open/";
const DOCS = "https://dev.meta.ai/docs/muse-spark-open";

const NO_FIRST_PARTY_PRICE =
  "Hosted API prices are set by providers, not Meta. No first-party per-1M-token list price — we do not publish provider rates.";

export const metaMuse: PlatformModelFamily = {
  familySlug: "muse-spark",
  displayName: "Muse Spark (Meta)",
  vendor: "Meta",
  platformSlugs: [],
  lastVerifiedAt: "2026-10-17",
  whichToUse: [
    "Muse Spark and Muse Spark Open are distinct entries. Do not treat them as the same checkpoint.",
    "Muse Spark is the name listed on Meta's consumer assistant page. We do not claim it is the same weights as Muse Spark Open, or that the Open release runs inside that app.",
    "Muse Spark Open is the open-weight release of Muse Spark (available 15 Oct 2026): 816B total / 42B active sparse MoE, 1,048,576-token context, text/image/audio/video in and text out. Weights (BF16 ~1.65 TB; NVFP4 ~537 GB) via Hugging Face, Amazon SageMaker AI, Google Cloud Model Garden, and Microsoft Foundry Models; hosted API via OpenRouter, Together AI, Fireworks AI, Groq, Baseten, Modal, and Nebius. License: Muse Model License (limited commercial terms).",
    "Self-hosting BF16 needs a roughly 2 TB VRAM budget. Meta's blog also describes running on two Apple M5 Ultra Mac Studios with MLX. Hosted prices are unverified here.",
  ],
  sources: [
    { label: "Muse Spark Open blog", url: BLOG },
    { label: "Muse Spark Open docs", url: DOCS },
    { label: "Meta AI assistant", url: ASSISTANT },
  ],
  versions: [
    {
      id: "muse-spark",
      name: "Muse Spark",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: null, verified: false },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: null, verified: false, note: NO_FIRST_PARTY_PRICE },
      apiPriceOutput: { usdPerMillion: null, verified: false },
      consumerAccess: {
        summary:
          "Named on Meta's consumer assistant page. Specs for that consumer listing were not published on the Muse Spark Open docs, and we do not treat the two as the same model.",
        verified: true,
      },
      strengths: ["Consumer-assistant listing on Meta's official assistant page."],
      bestFor: "People using the consumer Meta AI assistant, not self-hosting weights.",
      caveats: [
        "Keep this distinct from Muse Spark Open (the downloadable open-weight release).",
        "Context, output limits, and API token prices are unverified for this listing.",
      ],
      sourceUrls: [{ label: "Meta AI assistant", url: ASSISTANT }],
      verified: { specs: false, apiPricing: false, consumerAccess: true },
    },
    {
      id: "muse-spark-open",
      name: "Muse Spark Open",
      releaseDate: "2026-10-15",
      releaseDateVerified: true,
      status: "current",
      role: "balanced",
      contextWindow: {
        tokens: 1_048_576,
        verified: true,
        note: "Official docs: 1,048,576-token context window.",
      },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: null, verified: false, note: NO_FIRST_PARTY_PRICE },
      apiPriceOutput: { usdPerMillion: null, verified: false },
      consumerAccess: {
        summary:
          "Downloadable open-weight release (also via hosted APIs). Not a model of the consumer Meta AI assistant app. Meta's blog describes running on two Apple M5 Ultra Mac Studios with MLX.",
        verified: true,
      },
      strengths: [
        "Open-weight release of Muse Spark (15 Oct 2026).",
        "816B total / 42B active sparse mixture of experts.",
        "1,048,576-token context; text, image, audio, and video input; text output.",
        "Checkpoints: BF16 ~1.65 TB (8×B300); NVFP4 ~537 GB (4-GPU Blackwell node). Budget roughly 2 TB VRAM for BF16.",
        "Weights via Hugging Face, Amazon SageMaker AI, Google Cloud Model Garden, and Microsoft Foundry Models.",
        "Hosted API via OpenRouter, Together AI, Fireworks AI, Groq, Baseten, Modal, and Nebius.",
      ],
      bestFor:
        "Teams that want Meta's downloadable open-weight Muse Spark release or a third-party hosted API — not the consumer assistant app.",
      caveats: [
        "Open-weight under Muse Model License (limited commercial terms) — not an Apache or MIT grant.",
        "Hosted API prices are provider-set; no pricing is published here.",
        "Max output tokens unverified on the official pages checked.",
        "BF16 ~1.65 TB checkpoint; budget roughly 2 TB VRAM for BF16",
      ],
      sourceUrls: [
        { label: "Muse Spark Open docs", url: DOCS },
        { label: "Muse Spark Open blog", url: BLOG },
      ],
      verified: { specs: true, apiPricing: false, consumerAccess: true },
    },
  ],
};
