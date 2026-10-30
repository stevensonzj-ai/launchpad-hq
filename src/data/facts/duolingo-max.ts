import type { ToolFacts } from "./types";

/**
 * Duolingo Max: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * duolingo.com renders only in a browser, so no price could be read on
 * any official page. Both readers read Duolingo's blog: Max adds Video
 * Call and Roleplay.
 *
 * Research Analyst browser check, 2026-10-29 (catalog audit 20): prices
 * are NOT STATED logged out (duolingo.com/max redirects to the homepage,
 * which shows only "TRY 1 WEEK FREE"). The help centre ("What is Duolingo
 * Max?") says Max is Super Duolingo plus Roleplay and Video Call with Lily.
 * "Explain My Answer" is on no current page, so it is not listed anywhere
 * (an earlier reader's note that it went free on 2026-01-01 had one source
 * and is dropped).
 */
export default {
  slug: "duolingo-max",
  lifecycle: "active",
  features: {
    value: [
      "Duolingo Max includes all the benefits of Super Duolingo, along with AI-powered features: Roleplay and Video Call with Lily.",
      "Roleplay is offered to English speakers learning Spanish, French, German, Italian and Portuguese.",
      "Prices are not stated on Duolingo's logged-out pages.",
    ],
    note: "Help centre, \"What is Duolingo Max?\": \"Duolingo Max includes all the benefits of Super Duolingo, along with AI-powered features: Roleplay and Video Call with Lily.\" (browser check 2026-10-29). The blog post below, read by two readers, gives the same two features and the Roleplay languages.",
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
    {
      date: "2026-10-29",
      field: "features",
      summary: "Browser check: Max = Super plus Roleplay and Video Call with Lily; price not stated; feature list is Roleplay and Video Call only.",
    },
  ],
} satisfies ToolFacts;
