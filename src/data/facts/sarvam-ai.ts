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
      summary: "₹100 of free credits on signup. Credits do not expire, and there is no monthly commitment.",
    },
    sourceUrl: "https://www.sarvam.ai/api-pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "INR. Signup includes ₹100 of free credits; credits do not expire. Plan fees: pay as you go ₹0/month, Pro ₹9,999/month, Growth ₹49,999/month, Business ₹1,99,999/month, Enterprise custom. Bulbul V4 Flash text-to-speech: ₹2.00 / ₹1.85 / ₹1.70 / ₹1.60 per 1,000 characters (pay as you go / Pro / Growth / Business). Bulbul V3: ₹3.00 / ₹2.85 / ₹2.70 / ₹2.60 per 1,000 characters. Speech-to-text real-time and batch: ₹0.49 / ₹0.45 / ₹0.41 / ₹0.38 per minute; batch with diarization ₹0.59 / ₹0.54 / ₹0.50 / ₹0.47 per minute. Sarvam 105B: ₹15 input / ₹5 cached / ₹60 output per 1M tokens. Voice agents as low as ₹3 a minute.",
    note: "No USD conversion. Rates are pay as you go, then Pro, Growth, and Business. Third-party LLMs on the same page are not listed under models.",
    sourceUrl: "https://www.sarvam.ai/api-pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
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
      date: "2026-11-14",
      field: "plans",
      summary: "Signup credits are ₹100. Bulbul and speech-to-text rates now list Pro and a lower Business tier.",
    },
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "RA: models sourceUrl is https://www.sarvam.ai/api-pricing for Sarvam 105B and Bulbul. Third-party LLMs noted on apiPricing, not in models.",
    },
  ],
} satisfies ToolFacts;
