import type { PlatformModelFamily } from "./types";

const MODELS = "https://developers.openai.com/api/docs/models";
const PRICING = "https://developers.openai.com/api/docs/pricing";
const CHATGPT_MODELS = "https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt";
const WORK_CODEX = "https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex";

export const openaiGpt: PlatformModelFamily = {
  familySlug: "gpt",
  displayName: "GPT (ChatGPT / OpenAI)",
  vendor: "OpenAI",
  platformSlugs: ["chatgpt", "openai-api"],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "In the ChatGPT app, what you can pick depends on the plan. OpenAI’s help center: GPT-6 Pro (powered by GPT-6 Astra) is on Pro, Business, and Enterprise; Plus gets Astra in ChatGPT Work and Codex, not as GPT-6 Pro in regular Chat. Free and Go do not get Astra.",
    "For API work, OpenAI currently tells developers to start with GPT-6 Astra for hard jobs, GPT-6.1 Sol when you want similar quality for less money, and GPT-6 Luna for cheap high-volume work.",
    "GPT-5.5 is the previous flagship still listed on the API models and pricing pages — use it only if you already depend on it.",
  ],
  sources: [
    { label: "OpenAI models", url: MODELS },
    { label: "API pricing", url: PRICING },
    { label: "GPT-6 in ChatGPT", url: CHATGPT_MODELS },
    { label: "ChatGPT Work and Codex", url: WORK_CODEX },
  ],
  versions: [
    {
      id: "gpt-6-astra",
      name: "GPT-6 Astra",
      apiId: "gpt-6-astra",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_050_000, verified: true },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 10,
        verified: true,
        note: "Standard, short-context. Prompts over 272k input tokens are billed at 2× input and 1.5× output for the full request.",
      },
      apiPriceOutput: {
        usdPerMillion: 50,
        verified: true,
        note: "Standard, short-context. Prompts over 272k input tokens are billed at 2× input and 1.5× output for the full request.",
      },
      consumerAccess: {
        summary:
          "ChatGPT Plus: Astra in Work and Codex. Pro $100/$200, Business, and Enterprise: GPT-6 Pro in Chat (workspace permissions may apply). Not on Free or Go.",
        verified: true,
      },
      strengths: [
        "OpenAI’s current flagship for hard reasoning, coding, and computer-use jobs.",
        "1.05 million token context window and 128k max output on the API.",
        "Built-in tools on the Responses API (search, files, computer use, and more).",
      ],
      bestFor: "Paid ChatGPT users and API developers with the hardest work — research, long coding, and multi-step computer use.",
      caveats: [
        "Most expensive current GPT listed here ($10 / $50 per 1M tokens on the API).",
        "Plus does not include GPT-6 Pro in regular Chat — only Work and Codex.",
        "Long prompts (over 272k input tokens) cost more per token.",
      ],
      sourceUrls: [
        { label: "GPT-6 Astra model page", url: "https://developers.openai.com/api/docs/models/gpt-6-astra" },
        { label: "GPT-6 in ChatGPT", url: CHATGPT_MODELS },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "gpt-6.1-sol",
      name: "GPT-6.1 Sol",
      apiId: "gpt-6.1-sol",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "balanced",
      contextWindow: { tokens: 1_050_000, verified: true },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 2,
        verified: true,
        note: "Standard, short-context. Prompts over 272k input tokens are billed at 2× input and 1.5× output for the full request.",
      },
      apiPriceOutput: {
        usdPerMillion: 10,
        verified: true,
        note: "Standard, short-context. Prompts over 272k input tokens are billed at 2× input and 1.5× output for the full request.",
      },
      consumerAccess: {
        summary:
          "OpenAI help: GPT-6.1 Sol is a ChatGPT Work and Codex model, not regular Chat. It is rolling out on eligible paid plans; exact plan list depends on rollout and workspace settings.",
        verified: true,
      },
      strengths: [
        "OpenAI describes it as near-Astra quality at a lower API price ($2 / $10 per 1M).",
        "Same 1.05M context and 128k max output as Astra.",
        "Supports Fast and Ultrafast API modes (Ultrafast is priced higher).",
      ],
      bestFor: "API and ChatGPT Work/Codex users who want strong results without Astra’s price.",
      caveats: [
        "Not in regular ChatGPT conversations, per OpenAI’s Work and Codex help article.",
        "Ultrafast API mode is 6× standard price.",
      ],
      sourceUrls: [
        { label: "GPT-6.1 Sol model page", url: "https://developers.openai.com/api/docs/models/gpt-6.1-sol" },
        { label: "Work and Codex", url: WORK_CODEX },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "gpt-6-luna",
      name: "GPT-6 Luna",
      apiId: "gpt-6-luna",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 1_050_000, verified: true },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 0.1,
        verified: true,
        note: "Standard, short-context. Prompts over 272k input tokens are billed at 2× input and 1.5× output for the full request.",
      },
      apiPriceOutput: {
        usdPerMillion: 0.5,
        verified: true,
        note: "Standard, short-context. Prompts over 272k input tokens are billed at 2× input and 1.5× output for the full request.",
      },
      consumerAccess: {
        summary:
          "OpenAI help: GPT-6 Luna is a ChatGPT Work and Codex model, not regular Chat. Free/Go ChatGPT model names in the main Chat picker are a separate list (unverified here beyond the GPT-6 help article).",
        verified: true,
      },
      strengths: [
        "Cheapest current GPT-6 API model listed here ($0.10 / $0.50 per 1M).",
        "Same 1.05M context window as Astra.",
        "OpenAI’s pick for focused, high-volume tasks.",
      ],
      bestFor: "Lots of short, cheap jobs — classification, drafts, and bulk API calls.",
      caveats: [
        "Not in regular ChatGPT conversations, per OpenAI’s Work and Codex help article.",
        "OpenAI positions it below Sol and Astra for hard work.",
      ],
      sourceUrls: [
        { label: "GPT-6 Luna model page", url: "https://developers.openai.com/api/docs/models/gpt-6-luna" },
        { label: "Work and Codex", url: WORK_CODEX },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "gpt-5.5",
      name: "GPT-5.5",
      apiId: "gpt-5.5",
      releaseDate: null,
      releaseDateVerified: false,
      status: "legacy",
      role: "prior",
      contextWindow: { tokens: 1_050_000, verified: true },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 5,
        verified: true,
        note: "Listed for prompts under 272k context length. Prompts over 272k are 2× input and 1.5× output.",
      },
      apiPriceOutput: {
        usdPerMillion: 30,
        verified: true,
        note: "Listed for prompts under 272k context length. Prompts over 272k are 2× input and 1.5× output.",
      },
      consumerAccess: {
        summary: "Consumer ChatGPT access for GPT-5.5 in October 2026 was not confirmed on the GPT-6 help pages used for this pass.",
        verified: false,
      },
      strengths: [
        "Previous OpenAI flagship; still documented on the API models page.",
        "Same 1.05M context and 128k max output as the GPT-6 models.",
      ],
      bestFor: "Existing API integrations that are not ready to move to GPT-6.",
      caveats: [
        "OpenAI now recommends GPT-6 Astra / Sol / Luna for new work.",
        "ChatGPT app access for this snapshot is unverified on the pages checked.",
      ],
      sourceUrls: [
        { label: "GPT-5.5 model page", url: "https://developers.openai.com/api/docs/models/gpt-5.5" },
        { label: "API pricing", url: PRICING },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
  ],
};
