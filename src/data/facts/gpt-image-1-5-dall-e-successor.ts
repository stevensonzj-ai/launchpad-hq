import type { ToolFacts } from "./types";

/**
 * GPT Image 1.5 / OpenAI image generation: first fact file, stale-facts
 * batch 1 (catalog audit 17), 2026-10-29. OpenAI's API docs mark GPT Image
 * 1.5 deprecated; the current models are GPT Image 2.5 (Sunburst, Flare).
 * API prices read twice. ChatGPT's plan prices and image limits could not
 * be read (chatgpt.com/pricing and the help centre returned 403), so the
 * row's ChatGPT text is left as it is and recorded here as unverified.
 * Renaming the row is left to the owner.
 */
export default {
  slug: "gpt-image-1-5-dall-e-successor",
  lifecycle: "active",
  company: {
    value: "OpenAI",
    sourceUrl: "https://developers.openai.com/api/docs/models/gpt-image-1.5",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Image generation is included on ChatGPT's free plan, with a lower limit than paid plans (exact limits not confirmed).",
    },
    note: "Carried over from the catalog row; chatgpt.com/pricing and the image FAQ returned 403 on 2026-10-29. On the Browser-check list.",
    sourceUrl: "https://chatgpt.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  apiPricing: {
    value: "Per 1M tokens: gpt-image-2.5 (Flare and Sunburst) $5 text input, $8 image input, $30 image output; gpt-image-1.5 (deprecated) $32 image output.",
    sourceUrl: "https://developers.openai.com/api/docs/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "GPT Image 1.5 is marked \"Deprecated\" (\"Our previous image generation model\").",
      "Current API models: GPT-Image-2.5 Sunburst (\"Our most capable model for image generation and editing\") and GPT-Image-2.5 Flare (\"Fast, high-quality everyday image generation\").",
    ],
    sourceUrl: "https://developers.openai.com/api/docs/models",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "apiPricing",
      summary:
        "First fact file: GPT Image 1.5 deprecated, GPT Image 2.5 billed per token ($5 / $8 / $30 per 1M). ChatGPT limits unverified (403).",
    },
  ],
} satisfies ToolFacts;
