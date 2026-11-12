import type { ToolFacts } from "./types";

const POST_URL =
  "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/";

/**
 * Gemini Decisions API (new catalog row, X-watch 2026-11-12).
 * Gathered 2026-11-12 from Google's launch post. Distinct from the Gemini
 * chat app and from OpenAI's Decisions API.
 *
 * Pricing is the `apiPricing` block below. Output tokens are not billed.
 */
export default {
  slug: "gemini-decisions-api",
  lifecycle: "active",
  officialUrl: {
    value: POST_URL,
    note: "Launch post for the Decisions API and the Gemini Decision 1 model (gemini-decision-1), dated 2026-11-11.",
    sourceUrl: POST_URL,
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  company: {
    value: "Google",
    sourceUrl: POST_URL,
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Google AI Studio has an API no-cost tier for prototyping with Gemini Decision 1. Paid use is $0.10 per 1M input tokens, and output tokens are not billed.",
    },
    note: "Google's launch post, checked 2026-11-12. The no-cost tier is for prototyping in Google AI Studio.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  apiPricing: {
    value:
      "$0.10 per 1M input tokens. Output tokens are not billed ($0). The shared input is billed once per request, however many questions are attached.",
    note: "Google's launch post, checked 2026-11-12. The post also says there are no output-token charges, variable thinking-token bills, or separate audio transcription and OCR costs. Support in Gemini on Google Cloud is described as coming soon, not available yet.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  platforms: {
    value: ["API (Gemini API in Google AI Studio, gemini-decision-1)"],
    note: "The post says ecosystem integrations are rolling out across OpenRouter, LangChain, Vercel, LiteLLM, Pydantic AI, Pipecat, LiveKit, and OpenCode, alongside the google-genai SDKs. Gemini on Google Cloud is coming soon. Checked 2026-11-12.",
    sourceUrl: POST_URL,
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  features: {
    value: [
      "Scores up to 1,000 yes/no, multiple-choice, or rubric questions in one request against one shared input.",
      "Input can be text, images, audio, video, or PDFs, up to 256K tokens.",
      "The post says end-to-end latency is 150-250 ms.",
    ],
    note: "Google's launch post, checked 2026-11-12.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-12",
      field: "apiPricing",
      summary:
        "First fact file (new catalog row, X-watch 2026-11-12). $0.10 per 1M input tokens and no output-token charge. AI Studio no-cost tier for prototyping.",
    },
  ],
} satisfies ToolFacts;
