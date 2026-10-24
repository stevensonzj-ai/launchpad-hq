import type { ToolFacts } from "./types";

export default {
  slug: "perplexity-comet",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Will always provide a free version; includes Comet.",
    },
    note: "Browser-verified 2026-10-14 on perplexity.ai/comet and perplexity.ai/pro (fetch/curl 403 or timeout).",
    sourceUrl: "https://www.perplexity.ai/comet",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pro",
        price: "$17/mo",
        period: "billed annually",
        limits: "",
      },
      {
        name: "Max",
        price: "$167/mo",
        period: "billed annually",
        limits: "",
      },
    ],
    note: "Browser-verified 2026-10-14 on perplexity.ai/pro. Both billed annually; no derived monthly figures. Monthly-billed prices and Plus unpublished.",
    sourceUrl: "https://www.perplexity.ai/pro",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Nemotron 3.5 Super VL (Pro and Max)", "Gemini 4 Argon (Max only)"],
    label: "Recently added search models",
    note: "Perplexity's help center lists these as search models as of October 17, 2026. Gemini 4 Argon is Max-only, not Pro.",
    sourceUrl: "https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription",
    checkedAt: "2026-10-24",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-24",
    status: "verified",
  },
  platforms: {
    value: ["Mac", "Windows", "iOS", "Android"],
    note: "Browser-verified 2026-10-14: “Available for Mac, Windows, iOS, and Android” on perplexity.ai/comet. Download is a perplexity.sng.link redirect; no apps.apple.com or play.google.com URLs recorded.",
    sourceUrl: "https://www.perplexity.ai/comet",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Browser-verified: Pro $17/mo and Max $167/mo billed annually. No legal-entity company string (footer ©2025 PERPLEXITY on /comet vs © 2026 Perplexity on /pro). No store links (sng.link only).",
    },
  ],
} satisfies ToolFacts;
