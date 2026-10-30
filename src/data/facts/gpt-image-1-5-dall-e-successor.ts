import type { ToolFacts } from "./types";

/**
 * GPT Image 1.5 / OpenAI image generation: first fact file, stale-facts
 * batch 1 (catalog audit 17), 2026-10-29. OpenAI's API docs mark GPT Image
 * 1.5 deprecated; the current models are GPT Image 2.5 (Sunburst, Flare).
 * API prices read twice. ChatGPT's plan prices and image limits could not
 * be read (chatgpt.com/pricing and the help centre returned 403), so the
 * row's ChatGPT text is left as it is and recorded here as unverified.
 * Catalog audit 22 (2026-10-30) renames the listing GPT Image 2.5 (DALL-E
 * successor); the slug stays as it is.
 *
 * The Research Analyst's browser check the same day (chatgpt.com/pricing,
 * marked PARTIAL) found the product at https://chatgpt.com (replacing
 * chat.openai.com) and no numeric image caps on any page checked: Free says
 * "Limited image creation", Go and Plus "More", Pro "Unlimited", subject to
 * abuse guardrails. The free tier stays unverified; the row's "3 images/day"
 * is removed by catalog audit 18, which also moves the website. OpenAI
 * announced ChatGPT Images 2.5 for all tiers on 2026-09-08
 * (openai.com/index/introducing-chatgpt-images-2-5/), with no per-plan limits.
 */
export default {
  slug: "gpt-image-1-5-dall-e-successor",
  lifecycle: "active",
  displayName: {
    value: "GPT Image 2.5 (DALL-E successor)",
    sourceUrl: "https://developers.openai.com/api/docs/models",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  officialUrl: {
    value: "https://chatgpt.com",
    note: "Browser check, 2026-10-29: the product is at chatgpt.com, which replaces chat.openai.com.",
    sourceUrl: "https://chatgpt.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
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
      summary: "Image generation is included on ChatGPT's free plan as \"Limited image creation\"; OpenAI states no numeric image limit.",
    },
    note: "Browser check, 2026-10-29 (partial): the Free plan card says \"Limited image creation\"; the Free Tier FAQ (help.openai.com/en/articles/9275245) says images have \"usage limits separate from the main chat limit\", with no numbers. Numeric caps are not stated on any page checked.",
    sourceUrl: "https://chatgpt.com/pricing/",
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
      date: "2026-10-30",
      field: "displayName",
      summary: "Listing renamed GPT Image 1.5 -> GPT Image 2.5 (DALL-E successor): OpenAI's model list shows GPT-Image-2.5 Flare and Sunburst. Slug unchanged.",
    },
    {
      date: "2026-10-29",
      field: "apiPricing",
      summary:
        "First fact file: GPT Image 1.5 deprecated, GPT Image 2.5 billed per token ($5 / $8 / $30 per 1M). ChatGPT limits unverified (403).",
    },
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary:
        "Browser check: product URL is https://chatgpt.com; no numeric ChatGPT image caps stated, so the row's \"3 images/day\" is dropped.",
    },
  ],
} satisfies ToolFacts;
