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
  lastVerifiedAt: "2026-11-12",
  whichToUse: [
    "On claude.ai, start with Sonnet for everyday writing, coding, and analysis. It is the default on the free plan.",
    "Use Haiku when you want a fast, cheap answer and the job is simple (summaries, sorting, short rewrites).",
    "Use Opus when the task is long and you need it to keep working without you steering every step. That needs a paid plan.",
    "Use Fable 5.2 only for the largest, longest jobs. Anthropic's 2026-11-09 launch post says to start with Opus 5.5 for most coding and knowledge work, then move up to Fable 5.2 or Mythos 5.2.",
    "Mythos 5.2 is the same underlying model as Fable 5.2. Access is through the Life Sciences and Cyber Verification Programs.",
    "Opus, Sonnet, and Haiku prices on this page were not re-read on 2026-11-12.",
  ],
  sources: [
    { label: "Models overview", url: OVERVIEW },
    { label: "API pricing", url: PRICING },
    { label: "Choosing a model (claude.ai)", url: CONSUMER },
    { label: "Plans & pricing", url: CONSUMER_PRICING },
    { label: "Fable 5.2 and Mythos 5.2 launch post", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
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
      id: "claude-fable-5-2",
      name: "Claude Fable 5.2",
      apiId: "claude-fable-5-2",
      releaseDate: "2026-11-09",
      releaseDateVerified: true,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: null, verified: false, note: "The 2026-11-09 launch post does not restate a context window." },
      maxOutput: { tokens: null, verified: false, note: "The 2026-11-09 launch post does not restate a max output." },
      apiPriceInput: {
        usdPerMillion: 8,
        verified: true,
        note: "Launch post 2026-11-09, checked 2026-11-12. Optional fast mode is $16 per 1M input tokens.",
      },
      apiPriceOutput: {
        usdPerMillion: 40,
        verified: true,
        note: "Launch post 2026-11-09, checked 2026-11-12. Optional fast mode is $80 per 1M output tokens.",
      },
      consumerAccess: {
        summary:
          "Available on the Claude Platform as claude-fable-5-2, and on AWS, Google Cloud, and Microsoft Azure. The launch post says Fable is available to users generally because of its safeguards.",
        verified: true,
      },
      strengths: [
        "Anthropic's 2026-11-09 top model for the longest, hardest technical jobs.",
        "The launch post says outputs are up to 30% faster than Fable 5.1.",
      ],
      bestFor: "The rare job where Opus 5.5 is not enough.",
      caveats: [
        "Optional fast mode is a separate, higher rate.",
        "The launch post does not restate a context window or max output.",
      ],
      sourceUrls: [
        { label: "Fable 5.2 and Mythos 5.2 launch post", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
      ],
      verified: { specs: false, apiPricing: true, consumerAccess: true },
    },
    {
      id: "claude-mythos-5-2",
      name: "Claude Mythos 5.2",
      releaseDate: "2026-11-09",
      releaseDateVerified: true,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: null, verified: false, note: "The 2026-11-09 launch post does not restate a context window." },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 8,
        verified: true,
        note: "Same base rate as Fable 5.2. Fast mode is $16 per 1M input tokens and is only for organizations in the verification programs.",
      },
      apiPriceOutput: {
        usdPerMillion: 40,
        verified: true,
        note: "Same base rate as Fable 5.2. Fast mode is $80 per 1M output tokens and is only for organizations in the verification programs.",
      },
      consumerAccess: {
        summary:
          "Same underlying model as Fable 5.2. Access is through the Life Sciences and Cyber Verification Programs, for organizations working on cybersecurity or biomedical research. The launch post does not name a public API id.",
        verified: true,
      },
      strengths: [
        "The version of the Fable 5.2 model without Fable's cybersecurity and biology safeguards.",
        "The launch post calls it Anthropic's most capable model for cybersecurity engineering.",
      ],
      bestFor: "Vetted cybersecurity and life-sciences organizations that need the unsafeguarded model.",
      caveats: [
        "Not available to users generally. Applicants use the Cyber Verification Program or the Life Sciences Verification Program.",
        "The launch post does not name a public API id.",
      ],
      sourceUrls: [
        { label: "Fable 5.2 and Mythos 5.2 launch post", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
      ],
      verified: { specs: false, apiPricing: true, consumerAccess: true },
    },
    {
      id: "claude-fable-5-1",
      name: "Claude Fable 5.1",
      apiId: "claude-fable-5-1",
      releaseDate: null,
      releaseDateVerified: false,
      status: "legacy",
      role: "prior",
      contextWindow: { tokens: 1_000_000, verified: true, note: "API. claude.ai consumer plans list a 200k context window. Not re-read on 2026-11-12." },
      maxOutput: { tokens: 128_000, verified: true, note: "Not re-read on 2026-11-12." },
      apiPriceInput: {
        usdPerMillion: null,
        verified: false,
        note: "Last recorded rate was $10 per 1M input tokens (pricing table, 2026-10-14). The 2026-11-09 launch post does not restate whether Fable 5.1 is still sold at that rate.",
      },
      apiPriceOutput: {
        usdPerMillion: null,
        verified: false,
        note: "Last recorded rate was $50 per 1M output tokens (pricing table, 2026-10-14). Not restated on the 2026-11-09 launch post.",
      },
      consumerAccess: {
        summary: "Superseded in this list by Fable 5.2. Whether 5.1 remains on sale was not restated on the launch post.",
        verified: true,
      },
      strengths: ["Previous Fable generation, kept so the price change has a record."],
      bestFor: "Existing integrations that still call claude-fable-5-1, if that id is still served.",
      caveats: ["The 2026-11-09 launch post does not restate a current price or say that 5.1 was retired."],
      sourceUrls: [
        { label: "Models overview", url: OVERVIEW },
        { label: "Pricing", url: PRICING },
        { label: "Fable 5.2 and Mythos 5.2 launch post", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
      ],
      verified: { specs: false, apiPricing: false, consumerAccess: true },
    },
  ],
};
