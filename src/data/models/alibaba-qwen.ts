import type { PlatformModelFamily } from "./types";

const PRICING = "https://www.alibabacloud.com/help/en/model-studio/model-pricing";
const MAX = "https://www.alibabacloud.com/help/en/model-studio/qwen3-8-max";
const FLASH = "https://www.alibabacloud.com/help/en/model-studio/qwen3-8-flash";

export const alibabaQwen: PlatformModelFamily = {
  familySlug: "qwen",
  displayName: "Qwen",
  vendor: "Alibaba (Qwen / Tongyi)",
  platformSlugs: ["qwen"],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "On Alibaba Cloud Model Studio (International / Singapore), qwen3.8-max is the current flagship at $2 / $6 per 1M tokens.",
    "qwen3.8-flash is the cheap current multimodal model at $0.15 / $0.47 per 1M (International).",
    "qwen3.7-max is the previous Max, still listed at $2.50 / $7.50 (International).",
    "Qwen Chat being free with no subscription is stated in our catalog seed; exact chat limits remain unverified on Model Studio docs.",
  ],
  sources: [
    { label: "Model Studio pricing", url: PRICING },
    { label: "qwen3.8-max", url: MAX },
    { label: "qwen3.8-flash", url: FLASH },
  ],
  versions: [
    {
      id: "qwen3.8-max",
      name: "Qwen3.8-Max",
      apiId: "qwen3.8-max",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: 131_072, verified: true },
      apiPriceInput: {
        usdPerMillion: 2,
        verified: true,
        note: "International (Singapore) list price. China (Beijing) / some Global regions list $1.65 / $4.951.",
      },
      apiPriceOutput: {
        usdPerMillion: 6,
        verified: true,
        note: "International (Singapore) list price.",
      },
      consumerAccess: {
        summary: "Model Studio is pay-as-you-go with a listed 1M-token free quota on some rows. Qwen Chat limits unverified.",
        verified: false,
      },
      strengths: [
        "Current Qwen flagship on Model Studio.",
        "1M context window and 131,072 max output.",
        "Image, text, and video in; text out.",
      ],
      bestFor: "Hard Qwen API jobs — long coding and office-style work — after you pick a region.",
      caveats: [
        "Prices differ by region (International vs China vs Global).",
        "Hosted Qwen is Alibaba-operated; local open weights are the private path.",
      ],
      sourceUrls: [
        { label: "qwen3.8-max", url: MAX },
        { label: "Pricing", url: PRICING },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "qwen3.8-flash",
      name: "Qwen3.8-Flash",
      apiId: "qwen3.8-flash",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: 131_072, verified: true },
      apiPriceInput: {
        usdPerMillion: 0.15,
        verified: true,
        note: "International (Singapore). China / some Global regions list $0.113 / $0.382.",
      },
      apiPriceOutput: {
        usdPerMillion: 0.47,
        verified: true,
        note: "International (Singapore).",
      },
      consumerAccess: {
        summary: "Model Studio is pay-as-you-go. Qwen Chat limits unverified.",
        verified: false,
      },
      strengths: [
        "Same 1M context as Max at a much lower International list price.",
        "Multimodal; docs mention OpenAI- and Anthropic-compatible APIs.",
      ],
      bestFor: "Everyday Qwen API use and high-volume jobs.",
      caveats: ["Region prices differ. Consumer chat limits unverified."],
      sourceUrls: [
        { label: "qwen3.8-flash", url: FLASH },
        { label: "Pricing", url: PRICING },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "qwen3.7-max",
      name: "Qwen3.7-Max",
      apiId: "qwen3.7-max",
      releaseDate: null,
      releaseDateVerified: false,
      status: "legacy",
      role: "prior",
      contextWindow: { tokens: 1_000_000, verified: true, note: "Pricing table bills 0 < tokens ≤ 1M." },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 2.5,
        verified: true,
        note: "International list price on the Model Studio pricing page.",
      },
      apiPriceOutput: {
        usdPerMillion: 7.5,
        verified: true,
        note: "International list price.",
      },
      consumerAccess: {
        summary: "Qwen Chat mapping for 3.7-Max was not confirmed on Model Studio docs.",
        verified: false,
      },
      strengths: ["Previous Max still listed on the official pricing table."],
      bestFor: "Existing 3.7-Max callers.",
      caveats: ["3.8-Max is the current flagship. Max output unverified on the pricing table."],
      sourceUrls: [{ label: "Pricing", url: PRICING }],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
  ],
};
