import type { ToolFacts } from "./types";

const GEMINI_SUBSCRIPTIONS_URL = "https://gemini.google/subscriptions/";

export default {
  slug: "gemini",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Free with a Google Account: Gemini app with the Flash-Lite model, image generation and editing, Deep Research, Gemini Live, Canvas and Gems; 15 GB of cloud storage",
    },
    note: "US view of the Personal tab, as of 2026-10-26.",
    sourceUrl: GEMINI_SUBSCRIPTIONS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "With a Google Account" },
      { name: "Google AI Plus", price: "$4.99", period: "month", limits: "2x higher usage limits than Free; 400 GB storage" },
      { name: "Google AI Pro", price: "$19.99", period: "month", limits: "4x higher usage limits than Free; 5 TB storage" },
      { name: "Google AI Ultra 5x", price: "$99.99", period: "month", limits: "Google AI Ultra's starting price: 5x higher usage limits than AI Pro" },
      { name: "Google AI Ultra 20x", price: "$199.99", period: "month", limits: "Google AI Ultra at 20x higher usage limits than AI Pro" },
      {
        name: "Gemini Enterprise Business edition",
        price: "$21",
        period: "seat/month",
        limits: "Starting price; up to 300 seats",
      },
    ],
    note: "USD, United States, as of 2026-10-26. Personal plans from the Personal tab; Gemini Enterprise from the Business tab of the same page. The page says Google AI Pro and Google AI Ultra are available to users over 18.",
    sourceUrl: GEMINI_SUBSCRIPTIONS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apiPricing: {
    value:
      "Gemini 4 Carbon, per 1M tokens: introductory $2 input and $10 output through 2026-11-30, then $4 input and $20 output. Available via the Gemini API in Google AI Studio and Gemini for business to all paying developers and enterprises. Also rolling out to Google AI Ultra subscribers in the Gemini app, Google Antigravity, and AI Mode in Search.",
    note: "Google's 2026-11-10 availability post, checked 2026-11-12. The introductory price ends 2026-11-30. The post says the later price applies to the Carbon model intended for public access only, and that a Fairwind release to some cybersecurity defenders was about two weeks earlier. A Carbon context window is not stated on this post. Consumer plan prices are the plans above, not this API rate.",
    sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/",
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  features: {
    value: [
      "Gemini app usage limits are compute-based: they factor in prompt complexity, the features used and chat length, refresh every 5 hours until a weekly limit is reached, and can be extended by buying AI credits.",
      "Paid personal plans include Google Flow credits for its AI creative studio: 200 on Google AI Plus, 1,000 on Google AI Pro, and 10,000 or 25,000 on Google AI Ultra.",
    ],
    sourceUrl: GEMINI_SUBSCRIPTIONS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-12",
      field: "apiPricing",
      summary:
        "X-watch: Gemini 4 Carbon is available to all paying API developers and is rolling out to Google AI Ultra. Introductory $2 / $10 per 1M through 2026-11-30, then $4 / $20.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "RA: Google AI Ultra is one plan at two price levels; listed as separate Ultra 5x ($99.99/month) and Ultra 20x ($199.99/month) rows, the names the page's footnotes use.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: free tier, Google AI Plus/Pro/Ultra and Gemini Enterprise Business prices from gemini.google/subscriptions.",
    },
  ],
} satisfies ToolFacts;
