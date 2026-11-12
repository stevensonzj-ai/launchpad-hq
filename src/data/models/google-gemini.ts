import type { PlatformModelFamily } from "./types";

const MODELS = "https://ai.google.dev/gemini-api/docs/models";
const PRICING = "https://ai.google.dev/gemini-api/docs/pricing";
const PLANS = "https://ai.google.dev/gemini-api/docs/google-ai-plans";
const CARBON = "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/";
const ARGON = "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon";
const FLASH = "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash";

export const googleGemini: PlatformModelFamily = {
  familySlug: "gemini",
  displayName: "Gemini",
  vendor: "Google",
  platformSlugs: ["gemini"],
  lastVerifiedAt: "2026-11-12",
  whichToUse: [
    "Exact Gemini-app picker for 3.8 Flash is unverified on Google's plan pages.",
    "Google's 2026-11-10 post says Argon remains the usual choice for most software engineering and knowledge work, and Carbon is for tasks that test the limits of the model.",
    "Carbon is available via the Gemini API to all paying developers and enterprises, and is rolling out to Google AI Ultra subscribers in the Gemini app, Google Antigravity, and AI Mode in Search.",
    "For the Gemini API, use 3.8 Flash for most production work (it is on the API free tier). Argon and Flash prices below were not re-read on 2026-11-12.",
    "3.6 Flash is the previous Flash generation at the same listed paid price as 3.8 Flash through 2026 — Google still documents it as previous-generation.",
  ],
  sources: [
    { label: "Gemini 4 Carbon availability", url: CARBON },
    { label: "Gemini models", url: MODELS },
    { label: "API pricing", url: PRICING },
    { label: "Google AI plans", url: PLANS },
  ],
  versions: [
    {
      id: "gemini-4-carbon",
      name: "Gemini 4 Carbon",
      releaseDate: "2026-11-10",
      releaseDateVerified: true,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: null, verified: false, note: "The 2026-11-10 availability post does not state a context window." },
      maxOutput: { tokens: null, verified: false, note: "The 2026-11-10 availability post does not state a max output." },
      apiPriceInput: {
        usdPerMillion: 2,
        verified: true,
        note: "Introductory price through 2026-11-30. $4 per 1M input tokens from 2026-12-01. The post says the later price applies to the Carbon model intended for public access only.",
      },
      apiPriceOutput: {
        usdPerMillion: 10,
        verified: true,
        note: "Introductory price through 2026-11-30. $20 per 1M output tokens from 2026-12-01. The post says the later price applies to the Carbon model intended for public access only.",
      },
      consumerAccess: {
        summary:
          "Available via the Gemini API in Google AI Studio and Gemini for business to all paying developers and enterprises. Rolling out to Google AI Ultra subscribers in the Gemini app, Google Antigravity, and AI Mode in Search.",
        verified: true,
      },
      strengths: [
        "Google's 2026-11-10 wider release of Carbon, after an earlier Fairwind release to some cybersecurity defenders.",
        "The post positions it for the hardest multi-step coding, research, and long-horizon agent work.",
      ],
      bestFor: "Paid API work and Google AI Ultra subscribers who need the strongest Gemini the post describes.",
      caveats: [
        "Introductory API price ends 2026-11-30.",
        "The post does not state a context window, and it does not use the words generally available.",
        "The later list price is limited, on the post, to the Carbon model intended for public access.",
      ],
      sourceUrls: [{ label: "Gemini 4 Carbon availability", url: CARBON }],
      verified: { specs: false, apiPricing: true, consumerAccess: true },
    },
    {
      id: "gemini-4-argon",
      name: "Gemini 4 Argon",
      apiId: "gemini-4-argon",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_048_576, verified: true, note: "Unified input and output token limit." },
      maxOutput: {
        tokens: 65_536,
        verified: true,
        note: "Default synchronous max output is 65,536. Long decode can go up to 1,048,576.",
      },
      apiPriceInput: {
        usdPerMillion: 2,
        verified: true,
        note: "Introductory paid price through 30 Nov 2026; $4.00 per 1M from 1 Dec 2026.",
      },
      apiPriceOutput: {
        usdPerMillion: 10,
        verified: true,
        note: "Introductory paid price through 30 Nov 2026; $20.00 per 1M from 1 Dec 2026.",
      },
      consumerAccess: {
        summary: "Gemini app: needs Google AI Pro or Ultra; Ultra gets the highest access (Google's plans page, checked 2026-10-24).",
        verified: true,
      },
      strengths: [
        "Google’s current flagship reasoning model.",
        "Unified 1M-token context; long decode up to 1M tokens.",
        "Text, image, video, audio, and PDF in; text out.",
      ],
      bestFor: "Hard coding, math, science, and long agent jobs.",
      caveats: [],
      sourceUrls: [
        { label: "Gemini 4 Argon", url: ARGON },
        { label: "Pricing", url: PRICING },
        { label: "Google AI plans", url: PLANS },
        { label: "Gemini subscriptions", url: "https://gemini.google/us/subscriptions/" },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: true },
    },
    {
      id: "gemini-3.8-flash",
      name: "Gemini 3.8 Flash",
      apiId: "gemini-3.8-flash",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "balanced",
      contextWindow: { tokens: 1_048_576, verified: true, note: "Input token limit on the model page." },
      maxOutput: { tokens: 65_536, verified: true },
      apiPriceInput: {
        usdPerMillion: 0.75,
        verified: true,
        note: "Paid Standard through 31 Dec 2026; $1.50 per 1M from 1 Jan 2027. API free tier is listed as free of charge.",
      },
      apiPriceOutput: {
        usdPerMillion: 3.75,
        verified: true,
        note: "Paid Standard through 31 Dec 2026; $7.50 per 1M from 1 Jan 2027. Includes thinking tokens.",
      },
      consumerAccess: {
        summary: "API free tier is listed as free of charge. Which Gemini consumer-app plans include 3.8 Flash was not named on the Google AI plans page checked.",
        verified: false,
      },
      strengths: [
        "Google’s current Flash workhorse for agents and software work.",
        "On the Gemini API free tier (with limits).",
        "1M input tokens and 65k output.",
      ],
      bestFor: "Most Gemini API projects, and everyday Gemini use if your app plan includes it.",
      caveats: [
        "Paid API price doubles on 1 January 2027.",
        "Consumer Gemini-app plan mapping is unverified.",
      ],
      sourceUrls: [
        { label: "Gemini 3.8 Flash", url: FLASH },
        { label: "Pricing", url: PRICING },
      ],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "gemini-3.6-flash",
      name: "Gemini 3.6 Flash",
      apiId: "gemini-3.6-flash",
      releaseDate: null,
      releaseDateVerified: false,
      status: "legacy",
      role: "prior",
      contextWindow: { tokens: null, verified: false, note: "Context window was not listed on the models index page checked." },
      maxOutput: { tokens: null, verified: false },
      apiPriceInput: {
        usdPerMillion: 0.75,
        verified: true,
        note: "Paid Standard through 31 Dec 2026; $1.50 per 1M from 1 Jan 2027. API free tier is listed as free of charge.",
      },
      apiPriceOutput: {
        usdPerMillion: 3.75,
        verified: true,
        note: "Paid Standard through 31 Dec 2026; $7.50 per 1M from 1 Jan 2027.",
      },
      consumerAccess: {
        summary: "Consumer Gemini-app access for 3.6 Flash was not confirmed on the pages checked.",
        verified: false,
      },
      strengths: [
        "Documented as the previous-generation Flash model.",
        "Same listed paid Standard price as 3.8 Flash through 2026.",
      ],
      bestFor: "Existing apps that already call gemini-3.6-flash.",
      caveats: [
        "Google describes 3.8 Flash as the current Flash model for new work.",
        "Context and max-output figures were not on the models index; left unverified.",
      ],
      sourceUrls: [
        { label: "Gemini models", url: MODELS },
        { label: "Pricing", url: PRICING },
      ],
      verified: { specs: false, apiPricing: true, consumerAccess: false },
    },
  ],
};
