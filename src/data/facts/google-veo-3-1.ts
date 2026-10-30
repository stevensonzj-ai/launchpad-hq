import type { ToolFacts } from "./types";

/**
 * Google Veo 3.1: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on Google's own pages. Both readers agree: the
 * Gemini API's Veo 3.1 preview models (veo-3.1-generate-preview, -fast- and
 * -lite-) were shut down on October 22, 2026, with Gemini Omni Flash as the
 * named replacement, and the Gemini API pricing page no longer lists Veo (Omni
 * Flash is about $0.10 a second, paid tier only). The DeepMind page and the
 * Gemini plans page still present Veo 3.1 (Ultra) and a limited Veo 3.1 Lite
 * (Pro). Consumer plans: the Free plan lists limited Google Flow access and no
 * video generation; AI Plus $4.99, AI Pro $19.99, AI Ultra from $99.99 a month.
 * The page gives no per-plan Veo quotas. Not read: Google Cloud / Vertex pricing
 * for Veo, Google Flow's own pages, and privacy for the consumer apps (so the
 * guide's Flow daily-credit allowance is not rechecked here).
 */
export default {
  slug: "google-veo-3-1",
  lifecycle: "active",
  status: {
    value: {
      headline: "Google shut down the Gemini API's Veo 3.1 preview models on October 22, 2026; its docs name Gemini Omni Flash as the replacement.",
      details: [
        "Veo 3.1 is still listed on Google's DeepMind page and in the Gemini plans for the Gemini app and Flow; this notice covers the Gemini API preview models."
      ],
      whatToDo: "API users should move to Gemini Omni Flash (gemini-omni-1.1-flash) or Google's generally available Veo models on its enterprise platform.",
      additionalSources: [
        "https://ai.google.dev/gemini-api/docs/deprecations"
      ]
    },
    note: "Video docs: Veo 3.1 Preview was shut down on October 22, 2026; migrate to Gemini Omni Flash.",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/video",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  officialUrl: {
    value: "https://deepmind.google/models/veo/",
    note: "The page is titled Veo 3.1 and describes it as \"Our leading video generation model\".",
    sourceUrl: "https://deepmind.google/models/veo/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Google AI Pro",
        price: "$19.99",
        period: "month",
        limits: "A limited trial of Veo 3.1 Lite; 1,000 Flow credits"
      },
      {
        name: "Google AI Ultra",
        price: "$99.99",
        period: "month",
        limits: "Video generation with Veo 3.1; 10,000 Flow credits (a $199.99 tier has 25,000)"
      }
    ],
    note: "USD, monthly prices as of 2026-10-29; annual billing was not shown. No per-plan Veo quotas are stated. The Free plan lists limited Google Flow access and no video generation. Google AI Plus ($4.99, 200 Flow credits) lists \"more features like video generation\" without naming a model, so it is not shown as a Veo plan.",
    sourceUrl: "https://gemini.google/subscriptions/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  apiPricing: {
    value: "The Gemini API pricing page no longer lists Veo; its video model is Gemini Omni Flash, about $0.10 per second of 720p video (about $17.50 per 1M video output tokens), paid tier only. Google Cloud pricing for the generally available Veo models was not read.",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "status",
      summary: "First fact file: Gemini API Veo 3.1 previews shut down 2026-10-22 (Gemini Omni Flash); Google AI Plus $4.99, Pro $19.99, Ultra from $99.99 a month."
    }
  ],
} satisfies ToolFacts;
