import type { PlatformModelFamily } from "./types";

const MODELS = "https://ai.google.dev/gemini-api/docs/models";
const PRICING = "https://ai.google.dev/gemini-api/docs/pricing";
const PLANS = "https://ai.google.dev/gemini-api/docs/google-ai-plans";
const ARGON = "https://ai.google.dev/gemini-api/docs/models/gemini-4-argon";
const FLASH = "https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash";

export const googleGemini: PlatformModelFamily = {
  familySlug: "gemini",
  displayName: "Gemini",
  vendor: "Google",
  platformSlugs: ["gemini"],
  lastVerifiedAt: "2026-10-24",
  whichToUse: [
    "In the Gemini app, Gemini 4 Argon needs a paid Google AI plan: AI Pro gets access and AI Ultra gets the highest limits. Exact Gemini-app picker for 3.8 Flash is unverified on those pages.",
    "For the Gemini API, use 3.8 Flash for most production work (it is on the API free tier). Use 4 Argon only when you need the flagship and can pay (not on the API free tier).",
    "3.6 Flash is the previous Flash generation at the same listed paid price as 3.8 Flash through 2026 — Google still documents it as previous-generation.",
  ],
  sources: [
    { label: "Gemini models", url: MODELS },
    { label: "API pricing", url: PRICING },
    { label: "Google AI plans", url: PLANS },
  ],
  versions: [
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
        note: "Introductory paid price through 30 Nov 2026; $4.00 per 1M from 1 Dec 2026. Not on the API free tier.",
      },
      apiPriceOutput: {
        usdPerMillion: 10,
        verified: true,
        note: "Introductory paid price through 30 Nov 2026; $20.00 per 1M from 1 Dec 2026.",
      },
      consumerAccess: {
        summary: "Gemini app: included with Google AI Pro, with the highest access on Google AI Ultra (Google AI plans page, checked 2026-10-24). Not on the free plan.",
        verified: true,
      },
      strengths: [
        "Google’s current flagship reasoning model.",
        "Unified 1M-token context; long decode up to 1M tokens.",
        "Text, image, video, audio, and PDF in; text out.",
      ],
      bestFor: "Hard coding, math, science, and long agent jobs if you are on a paid API or a Google AI Pro or Ultra plan.",
      caveats: [
        "Not on the Gemini API free tier.",
        "Introductory API price rises on 1 December 2026.",
      ],
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
