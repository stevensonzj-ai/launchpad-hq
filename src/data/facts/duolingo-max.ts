import type { ToolFacts } from "./types";

/**
 * Duolingo Max: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * duolingo.com renders only in a browser, so no price could be read on
 * any official page; the row's prices (which disagree with each other)
 * are left alone (Browser-check list). Both readers read Duolingo's blog:
 * Max adds Video Call and Roleplay. One reader also found that Explain My
 * Answer became free for all learners on 2026-01-01 (unverified).
 */
export default {
  slug: "duolingo-max",
  lifecycle: "active",
  features: {
    value: [
      "Duolingo Max is a tier above Super Duolingo; its AI features are Video Call and Roleplay (Roleplay for English speakers learning Spanish, French, German, Italian and Portuguese).",
    ],
    sourceUrl: "https://blog.duolingo.com/duolingo-max/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: Max = Video Call and Roleplay; prices not readable on official pages (browser check).",
    },
  ],
} satisfies ToolFacts;
