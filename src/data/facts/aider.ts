import type { ToolFacts } from "./types";

/**
 * Aider: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on aider.chat and its official GitHub repository.
 * Free and open source (Apache 2.0); you bring your own model API key or use
 * local models. One reader found "Aider AI LLC" named in the FAQ; the other
 * found no company named, so company is unverified and the row is left
 * alone.
 */
export default {
  slug: "aider",
  lifecycle: "active",
  company: {
    value: "Aider AI LLC",
    note: "FAQ: \"Aider AI LLC is the company behind the aider AI coding tool.\" Read once.",
    sourceUrl: "https://aider.chat/docs/faq.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free and open source (Apache 2.0). You pay your model provider through your own API key, or run local models.",
    },
    sourceUrl: "https://github.com/Aider-AI/aider",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: "https://aider.chat/docs/legal/privacy.html",
    },
    note: "Analytics are opt-in and \"never collects your code, chat messages, keys or personal info\". Read once.",
    sourceUrl: "https://aider.chat/docs/more/analytics.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free, Apache 2.0, bring your own API key or local models.",
    },
  ],
} satisfies ToolFacts;
