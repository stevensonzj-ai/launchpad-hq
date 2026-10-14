import type { PlatformModelFamily } from "./types";

const OVERVIEW = "https://platform.claude.com/docs/en/models/overview";
const PRICING = "https://platform.claude.com/docs/en/about-claude/pricing";
const CONSUMER = "https://claude.com/resources/tutorials/choosing-the-right-claude-model";
const CONSUMER_PRICING = "https://www.anthropic.com/pricing";

export const anthropicClaude: PlatformModelFamily = {
  familySlug: "claude",
  displayName: "Claude",
  vendor: "Anthropic",
  platformSlugs: ["claude", "anthropic-api"],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "On claude.ai, start with Sonnet for everyday writing, coding, and analysis. It is the default on the free plan.",
    "Use Haiku when you want a fast, cheap answer and the job is simple (summaries, sorting, short rewrites).",
    "Use Opus when the task is long and you need it to keep working without you steering every step. That needs a paid plan.",
    "Use Fable only for the largest, longest jobs. Anthropic positions it above Opus; it uses more of your usage limit.",
    "API developers: Anthropic currently recommends Opus 5.5 as the default, Haiku 5.5 for high-volume cheap work, and Fable 5.1 when Opus is not enough.",
  ],
  sources: [
    { label: "Models overview", url: OVERVIEW },
    { label: "API pricing", url: PRICING },
    { label: "Choosing a model (claude.ai)", url: CONSUMER },
    { label: "Plans & pricing", url: CONSUMER_PRICING },
  ],
  versions: [
    {
      id: "claude-opus-5-5",
      name: "Claude Opus 5.5",
      apiId: "claude-opus-5-5",
      releaseDate: "2026-09-22",
      releaseDateVerified: true,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true, note: "API. claude.ai consumer plans list a 200k context window." },
      maxOutput: { tokens: 128_000, verified: true, note: "Synchronous Messages API. Batch API can go to 300k with a beta header." },
      apiPriceInput: { usdPerMillion: 4, verified: true },
      apiPriceOutput: { usdPerMillion: 20, verified: true },
      consumerAccess: {
        summary: "Paid Claude plans (Pro and Max). Official consumer guide: Free includes Haiku and Sonnet; Pro and Max add Opus and Fable.",
        verified: true,
      },
      strengths: [
        "Anthropic’s current default pick for long coding and knowledge-work jobs on the API.",
        "1 million token API context window — enough for a large project in one go.",
        "Vision plus tools: it can read images and call tools, not just chat.",
      ],
      bestFor: "Hard, multi-step work you would pay extra for: long coding sessions, research write-ups, and jobs that run for a while.",
      caveats: [
        "On claude.ai the listed consumer context window is 200k tokens, not the 1M API window.",
        "Uses more of a paid plan’s usage limit than Sonnet or Haiku.",
        "Adaptive thinking cannot be turned off on this model.",
      ],
      sourceUrls: [
        { label: "Opus 5.5 overview", url: "https://platform.claude.com/docs/en/models/opus-5-5/overview" },
        { label: "Pricing", url: PRICING },
        { label: "Consumer model guide", url: CONSUMER },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "claude-sonnet-5-5",
      name: "Claude Sonnet 5.5",
      apiId: "claude-sonnet-5-5",
      releaseDate: "2026-09-28",
      releaseDateVerified: true,
      status: "current",
      role: "balanced",
      contextWindow: { tokens: 1_000_000, verified: true, note: "API. claude.ai consumer plans list a 200k context window." },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: { usdPerMillion: 2, verified: true },
      apiPriceOutput: { usdPerMillion: 10, verified: true },
      consumerAccess: {
        summary: "Free and paid Claude plans. Official consumer guide lists Sonnet on Free, Pro, and Max.",
        verified: true,
      },
      strengths: [
        "Anthropic’s stated best mix of speed and quality.",
        "Same 1M API context and 128k max output as Opus, at half the API price.",
        "Available on the free claude.ai plan, so you can try it without paying.",
      ],
      bestFor: "Day-to-day writing, coding, and analysis — the version most beginners should start with.",
      caveats: [
        "On claude.ai the listed consumer context window is 200k tokens.",
        "For the hardest all-day jobs, Anthropic still points people to Opus or Fable.",
      ],
      sourceUrls: [
        { label: "Sonnet 5.5 overview", url: "https://platform.claude.com/docs/en/models/sonnet-5-5/overview" },
        { label: "Pricing", url: PRICING },
        { label: "Consumer model guide", url: CONSUMER },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "claude-haiku-5-5",
      name: "Claude Haiku 5.5",
      apiId: "claude-haiku-5-5",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 1_000_000, verified: true, note: "API. claude.ai consumer plans list a 200k context window." },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 0.1,
        verified: true,
        note: "Prompts up to 100k tokens. Prompts over 100k are $0.50 / $2.50 per 1M input/output.",
      },
      apiPriceOutput: {
        usdPerMillion: 0.5,
        verified: true,
        note: "Prompts up to 100k tokens. Prompts over 100k are $0.50 / $2.50 per 1M input/output.",
      },
      consumerAccess: {
        summary: "Free and paid Claude plans. Official consumer guide lists Haiku on Free, Pro, and Max.",
        verified: true,
      },
      strengths: [
        "Cheapest current Claude on the API (from $0.10 / $0.50 per 1M tokens).",
        "Fastest in Anthropic’s current lineup.",
        "Same 1M API context window as the larger models.",
      ],
      bestFor: "Quick answers, sorting, extraction, and anything you run hundreds of times.",
      caveats: [
        "API price jumps when the prompt is over 100,000 tokens.",
        "Not the model Anthropic recommends for hard, long-running work.",
      ],
      sourceUrls: [
        { label: "Haiku 5.5 overview", url: "https://platform.claude.com/docs/en/models/haiku-5-5/overview" },
        { label: "Pricing", url: PRICING },
        { label: "Consumer model guide", url: CONSUMER },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "claude-fable-5-1",
      name: "Claude Fable 5.1",
      apiId: "claude-fable-5-1",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true, note: "API. claude.ai consumer plans list a 200k context window." },
      maxOutput: { tokens: 128_000, verified: true },
      apiPriceInput: { usdPerMillion: 10, verified: true },
      apiPriceOutput: { usdPerMillion: 50, verified: true },
      consumerAccess: {
        summary: "Paid Claude plans. Official consumer guide: Pro and Max add Fable; Anthropic’s pricing table also lists usage-credit / weekly-limit rules on Max.",
        verified: true,
      },
      strengths: [
        "Anthropic’s current top model for the longest, hardest agent jobs.",
        "Same 1M API context and 128k max output as the rest of the current lineup.",
      ],
      bestFor: "The rare job where Opus is not enough — long autonomous work you are willing to pay more for.",
      caveats: [
        "Most expensive current Claude ($10 / $50 per 1M tokens on the API).",
        "Slower than Opus, Sonnet, and Haiku in Anthropic’s own comparison table.",
        "Thinking is always on.",
      ],
      sourceUrls: [
        { label: "Models overview", url: OVERVIEW },
        { label: "Pricing", url: PRICING },
        { label: "Consumer model guide", url: CONSUMER },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
  ],
};
