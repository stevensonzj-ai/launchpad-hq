import type { ToolFacts } from "./types";

/**
 * Gemini CLI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on the official GitHub repository, geminicli.com
 * and the Google Developers Blog. Free individual access (and Google AI Pro
 * / Ultra access) moved to Antigravity CLI on 2026-06-18; Gemini CLI now
 * works with paid Gemini API keys, Vertex AI or Gemini Code Assist Standard
 * / Enterprise licences. The code stays Apache 2.0. The row moves from FREE
 * to PAID. One reader thought an unpaid Gemini API key still works under the
 * Gemini API's unpaid terms; the README says "No free tier", so that is on
 * the Browser-check list.
 */
export default {
  slug: "gemini-cli",
  lifecycle: "active",
  company: {
    value: "Google",
    sourceUrl: "https://github.com/google-gemini/gemini-cli",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free tier: free individual access and Google AI Pro / Ultra moved to Antigravity CLI on June 18, 2026. Gemini CLI works with paid Gemini API keys, Vertex AI, or Gemini Code Assist Standard / Enterprise licences.",
    },
    note: "README: \"No free tier or Google AI plans: Free individual access and Google AI Pro / Ultra (Google One) moved to Antigravity CLI ... on June 18, 2026\".",
    sourceUrl: "https://github.com/google-gemini/gemini-cli",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Gemini CLI was replaced by Antigravity CLI for free and Google AI Pro / Ultra users on 2026-06-18 (announced 2026-05-19).",
      "The README says Gemini CLI is not tuned for the Gemini 4 series.",
      "The code remains open source under Apache 2.0.",
    ],
    sourceUrl: "https://www.geminicli.com/docs/resources/tos-privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free access moved to Antigravity CLI on 2026-06-18; Gemini CLI now needs a paid API key, Vertex AI or a Code Assist licence. Replaces \"Free (generous quota)\".",
    },
  ],
} satisfies ToolFacts;
