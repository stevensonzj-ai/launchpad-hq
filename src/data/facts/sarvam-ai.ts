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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Start with free credits (amount unpublished). Credits never expire, with no monthly commitment.",
    },
    sourceUrl: "https://www.sarvam.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "INR. Bulbul V4 Flash text-to-speech: ₹2.00 per 1,000 characters (pay as you go) down to ₹1.70 (Growth/Business). Bulbul V3: ₹3.00 → ₹2.70 per 1,000 characters. Speech-to-text: ₹0.49/min (pay as you go) down to ₹0.41/min; with diarization ₹0.59 → ₹0.50/min. Sarvam 105B LLM: ₹15 input / ₹5 cached / ₹60 output per 1M tokens. Voice agents as low as ₹3 a minute.",
    note: "No USD conversion. Starter/Pro/Growth/Business list prices unpublished except these API figures. The API page also lists third-party LLMs (DeepSeek V4.1 Flash, GLM 5.3 / 5.3 Flash, Gemma 4); those are not in-house and are not listed under models.",
    sourceUrl: "https://www.sarvam.ai/api-pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["API", "Cloud platform"],
    note: "Consumer apps unpublished.",
    sourceUrl: "https://www.sarvam.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "Sarvam 105B (in-house)",
      "Bulbul V4 Flash (in-house, text-to-speech)",
      "Bulbul V3 (in-house, text-to-speech)",
      "Saaras V4 (in-house, speech-to-text; named on the homepage)",
    ],
    note: "Sarvam 105B, Bulbul V4 Flash, and Bulbul V3 are named on /api-pricing. Saaras V4 is named on the homepage.",
    sourceUrl: "https://www.sarvam.ai/api-pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "RA: models sourceUrl is https://www.sarvam.ai/api-pricing for Sarvam 105B and Bulbul. Third-party LLMs noted on apiPricing, not in models.",
    },
  ],
} satisfies ToolFacts;
