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
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "With a Google Account" },
      { name: "Google AI Plus", price: "$4.99", period: "month", limits: "2x higher usage limits than Free; 400 GB storage" },
      { name: "Google AI Pro", price: "$19.99", period: "month", limits: "4x higher usage limits than Free; 5 TB storage" },
      {
        name: "Google AI Ultra",
        price: "$99.99",
        period: "month",
        limits: "Starting price: 5x higher usage limits vs. AI Pro; $199.99/month for 20x",
      },
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
    status: "unverified",
  },
  features: {
    value: [
      "Gemini app usage limits are compute-based: they factor in prompt complexity, the features used and chat length, refresh every 5 hours until a weekly limit is reached, and can be extended by buying AI credits.",
      "Paid personal plans include Google Flow credits for its AI creative studio: 200 on Google AI Plus, 1,000 on Google AI Pro, and 10,000 or 25,000 on Google AI Ultra.",
    ],
    sourceUrl: GEMINI_SUBSCRIPTIONS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: free tier, Google AI Plus/Pro/Ultra and Gemini Enterprise Business prices from gemini.google/subscriptions.",
    },
  ],
} satisfies ToolFacts;
