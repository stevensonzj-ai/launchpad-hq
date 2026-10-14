import type { ToolFacts } from "./types";

export default {
  slug: "sarvam-ai",
  lifecycle: "active",
  company: {
    value: "Axonwise Private Limited",
    note: "Footer: © 2026 Axonwise Private Limited. The page does not say how Sarvam and Axonwise are related.",
    sourceUrl: "https://www.sarvam.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Start with free credits (amount unpublished). Credits never expire, with no monthly commitment.",
    },
    sourceUrl: "https://www.sarvam.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apiPricing: {
    value:
      "INR. Bulbul V4 Flash text-to-speech: ₹2.00 per 1,000 characters (pay as you go) down to ₹1.70 (Growth/Business). Bulbul V3: ₹3.00 → ₹2.70 per 1,000 characters. Speech-to-text: ₹0.49/min (pay as you go) down to ₹0.41/min; with diarization ₹0.59 → ₹0.50/min. Sarvam 105B LLM: ₹15 input / ₹5 cached / ₹60 output per 1M tokens. Voice agents as low as ₹3 a minute.",
    note: "No USD conversion. Starter/Pro/Growth/Business list prices unpublished except these API figures.",
    sourceUrl: "https://www.sarvam.ai/api-pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["API", "Cloud platform"],
    note: "Consumer apps unpublished.",
    sourceUrl: "https://www.sarvam.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: [
      "Sarvam 105B (in-house)",
      "Bulbul V4 Flash (in-house, text-to-speech)",
      "Bulbul V3 (in-house, text-to-speech)",
      "Saaras V4 (in-house, speech-to-text; named on the homepage)",
    ],
    sourceUrl: "https://www.sarvam.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary: "Recorded INR API list prices with no USD conversion. Company footer Axonwise Private Limited.",
    },
  ],
} satisfies ToolFacts;
