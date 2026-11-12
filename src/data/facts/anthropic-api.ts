import type { ToolFacts } from "./types";

export default {
  slug: "anthropic-api",
  lifecycle: "active",
  company: {
    value: "Anthropic PBC",
    note: "© 2026 Anthropic PBC. anthropic.com/pricing redirects to claude.com/pricing.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary:
        "No ongoing free API tier: you pay per token used. Anthropic's pricing docs say new users receive a small amount of free credits to test the API. The free Claude chat plan is a separate product (see the Claude listing).",
    },
    note: "Free-credits line from the pricing FAQ (\"Are there free tiers or trials?\") on platform.claude.com, as of 2026-10-26. claude.com/pricing lists no monthly API credits on the Free consumer plan.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-26",
    gatheredBy: "claude-recheck",
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Claude Haiku 5.5", price: "$0.10 input / $0.50 output per million tokens", period: "", limits: "For prompts up to 100,000 tokens. Prompts over 100,000 tokens: $0.50 input / $2.50 output per million tokens" },
      { name: "Claude Sonnet 5.5", price: "$2 input / $10 output per million tokens", period: "", limits: "" },
      { name: "Claude Opus 5.5", price: "$4 input / $20 output per million tokens", period: "", limits: "Fast mode is 2x standard pricing" },
      { name: "Claude Fable 5.2", price: "$8 input / $40 output per million tokens", period: "", limits: "Optional fast mode: $16 input / $80 output per million tokens, on Claude Code, the Claude Platform, Claude Models on Google Cloud, and Microsoft Foundry (Anthropic hosted)" },
      { name: "Claude Mythos 5.2", price: "$8 input / $40 output per million tokens", period: "", limits: "Same underlying model as Fable 5.2. Access is through the Life Sciences and Cyber Verification Programs. Fast mode for Mythos is only for organizations in those programs" },
    ],
    note: "Fable 5.2 and Mythos 5.2 base rates are from Anthropic's 2026-11-09 launch post, checked 2026-11-12. Opus 5.5, Sonnet 5.5, and Haiku 5.5 rates were last read on the API pricing table on 2026-10-25 and were not re-read for this update. The launch post does not restate whether Fable 5.1 is still sold. Cache writes, cache hits, the Batch API discount, and the US-only inference multiplier were not re-read on 2026-11-12. Consumer Claude plans belong to the Claude listing, not this one.",
    sourceUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  apiPricing: {
    value:
      "USD per million tokens, input / output. Claude Fable 5.2: $8 / $40. Claude Mythos 5.2: $8 / $40. Claude Opus 5.5: $4 / $20. Claude Sonnet 5.5: $2 / $10. Claude Haiku 5.5: $0.10 / $0.50 for prompts up to 100,000 tokens; $0.50 / $2.50 for prompts over 100,000 tokens. Fable 5.2 and Mythos 5.2 optional fast mode: $16 / $80.",
    note: "Fable 5.2 and Mythos 5.2 rates, including fast mode, are from the 2026-11-09 launch post, checked 2026-11-12. Mythos 5.2 access is through the Life Sciences and Cyber Verification Programs, and Mythos fast mode is only for organizations in those programs. Opus, Sonnet, and Haiku rates were last read on the API pricing table on 2026-10-25. The launch post does not restate a Fable 5.1 price.",
    sourceUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  platforms: {
    value: ["API", "Web", "Desktop", "Mobile"],
    note: "API; Claude chat on web, desktop and mobile.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  models: {
    value: [
      "Claude Fable 5.2 (in-house)",
      "Claude Mythos 5.2 (in-house; Life Sciences and Cyber Verification Programs)",
      "Claude Opus 5.5 (in-house)",
      "Claude Sonnet 5.5 (in-house)",
      "Claude Haiku 5.5 (in-house)",
    ],
    note: "Fable 5.2 and Mythos 5.2 from the 2026-11-09 launch post. The post does not restate whether Fable 5.1 is still sold. Opus, Sonnet, and Haiku were last read on the API pricing page on 2026-10-14.",
    sourceUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  features: {
    value: [
      "Claude Models on Google Cloud (Anthropic managed) is generally available as of 2026-10-22: Anthropic operates the service and acts as the data processor, billing goes on a single Google Cloud invoice, and usage draws down an existing Google Cloud commitment. Source for this item: https://claude.com/resources/articles/claude-models-on-google-cloud-anthropic-managed",
      "Claude Fable 5.2 (released 2026-11-09, API id claude-fable-5-2) is on the Claude Platform, AWS, Google Cloud, and Microsoft Azure. Claude Mythos 5.2 is the same underlying model, with access through the Life Sciences and Cyber Verification Programs.",
    ],
    note: "The Google Cloud line is from Anthropic's 2026-10-22 article. Fable 5.2 and Mythos 5.2 are from the 2026-11-09 launch post, checked 2026-11-12.",
    sourceUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
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
      field: "plans",
      summary:
        "X-watch: Fable 5.2 and Mythos 5.2 are $8 input / $40 output per 1M tokens on the 2026-11-09 launch post (fast mode $16 / $80). Mythos access is through the Life Sciences and Cyber Verification Programs. Fable 5.1's continued price was not restated.",
    },
    {
      date: "2026-10-26",
      field: "freeTier",
      summary: "Free tier now notes the small amount of free credits new API users receive, per Anthropic's pricing docs.",
    },
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added Claude Models on Google Cloud (Anthropic managed), generally available 2026-10-22, as a place to run Claude.",
    },
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Re-checked every API price against the model pricing table on platform.claude.com/docs/en/about-claude/pricing; values unchanged, Haiku 5.5 tier wording now matches the docs (prompts up to / over 100,000 tokens).",
    },
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Replaced consumer Claude plans (wrong listing) with per-token API prices from the API section of claude.com/pricing; no free API tier.",
    },
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "RA: added Batch API: 50% off. No cache or multiplier details. Consumer plans from claude.com/pricing.",
    },
  ],
} satisfies ToolFacts;
