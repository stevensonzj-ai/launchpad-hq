import type { PlatformModelFamily } from "./types";

const ASSISTANT = "https://ai.meta.com/meta-ai/assistant/";
const BLOG = "https://research.meta.ai/blog/muse-spark-open/";
const DOCS = "https://dev.meta.ai/docs/muse-spark-open";

const NO_FIRST_PARTY_PRICE =
  "Hosted API prices are set by providers, not Meta. No first-party per-1M-token list price — we do not publish provider rates.";

export const metaMuse: PlatformModelFamily = {
  familySlug: "muse-spark",
  displayName: "Muse (Meta)",
  vendor: "Meta",
  platformSlugs: [],
  lastVerifiedAt: "2026-10-24",
  whichToUse: [
    "Meta's open models are now the Muse family; llama.com leads with Muse. Muse Spark is the model named in the consumer Meta AI assistant, and Muse Spark Open is its downloadable open-weight release. We don't treat them as the same checkpoint.",
    "Pick Muse Spark Open for a frontier open-weight model if you have data-center hardware or use a hosted provider. Pick Muse Glimmer 30B if you want one that runs on a single high-end consumer GPU.",
    "The licenses differ: Muse Spark Open uses Meta's Muse Model License, while Muse Glimmer 30B is Apache 2.0.",
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
        "Muse Model License: free to use, modify and sell, but you must show “Built with Muse Spark Open”, and model-as-a-service businesses over $20M in yearly revenue need a separate agreement with Meta. Not intended for anyone under 18.",
        "Hosted API prices are provider-set; no pricing is published here.",
        "Max output tokens unverified on the official pages checked.",
      ],
      sourceUrls: [
        { label: "Muse Spark Open docs", url: DOCS },
        { label: "Muse Spark Open blog", url: BLOG },
        { label: "Muse Spark Open model card", url: "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B" },
      ],
      verified: { specs: true, apiPricing: false, consumerAccess: true },
    },
    {
      id: "muse-glimmer-30b",
      name: "Muse Glimmer 30B",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 131_072, verified: true, note: "Model card: 131,072+ tokens." },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: { usdPerMillion: null, verified: false, note: NO_FIRST_PARTY_PRICE },
      apiPriceOutput: { usdPerMillion: null, verified: false },
      consumerAccess: {
        summary:
          "Free download on Hugging Face (not gated). The model card says it runs locally in about 24–32 GB of memory with 4-bit versions.",
        verified: true,
      },
      strengths: [
        "Open weights released August 2026.",
        "About 30B-parameter dense model with a vision encoder: text and image in, text out.",
        "Built for agent-style tasks on consumer hardware; distilled from Muse Spark.",
        "Comes in BF16, GGUF and ExecuTorch versions, plus a small drafter model for faster output.",
      ],
      bestFor: "People who want a capable Meta model running privately on their own computer.",
      caveats: [
        "Much smaller than Muse Spark Open, so expect weaker results on the hardest tasks.",
        "The model card says it isn't intended for anyone under 18.",
      ],
      sourceUrls: [
        { label: "Muse Glimmer 30B model card", url: "https://huggingface.co/meta-models/Muse-Glimmer-30B" },
      ],
      verified: { specs: true, apiPricing: false, consumerAccess: true },
    },
  ],
};
