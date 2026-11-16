import type { PlatformModelFamily } from "./types";

const PRICING = "https://www.alibabacloud.com/help/en/model-studio/model-pricing";
const QWEN4 = "https://www.alibabacloud.com/help/en/model-studio/qwen4-max";
const QWEN4_PRICE = "https://docs.qwencloud.com/developer-guides/getting-started/pricing";
const MAX = "https://www.alibabacloud.com/help/en/model-studio/qwen3-8-max";
const FLASH = "https://www.alibabacloud.com/help/en/model-studio/qwen3-8-flash";

export const alibabaQwen: PlatformModelFamily = {
  familySlug: "qwen",
  displayName: "Qwen",
  vendor: "Alibaba (Qwen / Tongyi)",
  platformSlugs: ["qwen"],
  lastVerifiedAt: "2026-11-16",
  whichToUse: [
    "Qwen4-Max (qwen4-max) is the production flagship as of 2026-11-16. Singapore and the other listed regions do not share one rate. qwen3.8-max prices below were not re-read that day.",
    "qwen3.8-flash is the cheap current multimodal model at $0.15 / $0.47 per 1M (International).",
    "qwen3.7-max is the previous Max, still listed at $2.50 / $7.50 (International).",
    "Qwen Chat being free with no subscription is stated in our catalog seed; exact chat limits remain unverified on Model Studio docs.",
  ],
  sources: [
    { label: "Qwen4-Max", url: QWEN4 },
    { label: "QwenCloud pricing", url: QWEN4_PRICE },
    { label: "Model Studio pricing", url: PRICING },
    { label: "qwen3.8-max", url: MAX },
    { label: "qwen3.8-flash", url: FLASH },
  ],
  versions: [
    {
      id: "qwen4-max",
      name: "Qwen4-Max",
      apiId: "qwen4-max",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true, note: "The model page lists context length as 1,000,000 tokens." },
      maxOutput: {
        tokens: 131_072,
        verified: true,
        note: "Non-thinking maximum output. Thinking mode's combined thinking-plus-answer cap is 262,144 tokens.",
      },
      apiPriceInput: {
        usdPerMillion: 1.5,
        verified: true,
        note: "International (Singapore). Beijing and Global regions list $1.413. Cache read is $0.075 in Singapore and $0.071 elsewhere on the pricing page.",
      },
      apiPriceOutput: {
        usdPerMillion: 4.5,
        verified: true,
        note: "International (Singapore), thinking plus answer. Beijing and Global regions list $4.24.",
      },
      consumerAccess: {
        summary:
          "Model Studio pay-as-you-go. Singapore has a 1 million token free quota for 90 days from the later of activation, model release, or application approval. Other regions have no free quota. Qwen Chat limits were not on these pages.",
        verified: false,
      },
      strengths: [
        "Production Qwen4-Max, replacing the preview that retires at 24:00 on 2026-11-25 (UTC+8).",
        "Text, image, and video in; text out. 1,000,000-token context.",
      ],
      bestFor: "Current Qwen API work after you pick a region, because the price is not the same everywhere.",
      caveats: [
        "The model page was last updated 2026-11-16. It does not print a separate release date.",
        "The model page says batch inference is not supported.",
        "Qwen4-Max-Preview is still Token Plan only until 24:00 on 2026-11-25 (UTC+8).",
      ],
      sourceUrls: [
        { label: "Qwen4-Max", url: QWEN4 },
        { label: "Pricing", url: QWEN4_PRICE },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
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
        "Previous flagship on Model Studio. Qwen4-Max is newer as of 2026-11-16; this row's price was not re-read that day.",
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
      caveats: ["Qwen4-Max is the newer flagship as of 2026-11-16. This row's price was not re-read that day. Max output unverified on the pricing table."],
      sourceUrls: [{ label: "Pricing", url: PRICING }],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
  ],
};
