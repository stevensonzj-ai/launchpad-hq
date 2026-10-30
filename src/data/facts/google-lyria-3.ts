import type { ToolFacts } from "./types";

/**
 * Google Lyria: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * MusicFX is gone: its address redirects to Google Flow Music. The
 * current model is Lyria 3.5, in the Gemini app (18+, free with limits),
 * Flow Music (free to start, daily credits), YouTube Shorts and Google
 * Vids. The Gemini API charges per song, with no free API tier. The row
 * moves from FREE to FREEMIUM and its website to the Lyria model page.
 */
export default {
  slug: "google-lyria-3",
  lifecycle: "active",
  officialUrl: {
    value: "https://deepmind.google/models/lyria/",
    sourceUrl: "https://deepmind.google/models/lyria/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Music generation is in the free Gemini app (18+) with limits Google does not publish; Google Flow Music is free to start with daily credits.",
    },
    note: "Gemini help: \"There are limits for how many tracks you can create with Lyria… You can upgrade your subscription or wait for your limit to refresh.\" Full-length tracks use the Pro model.",
    sourceUrl: "https://support.google.com/gemini/answer/16901237",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Gemini API, per song: Lyria 3.5 $0.08; Lyria 3 Clip (30 s, preview) $0.04; Lyria 3 Pro (preview) $0.08. No free API tier.",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "MusicFX (labs.google/fx/tools/music-fx) now redirects to Google Flow Music.",
      "Lyria 3.5 is the current model; songs can run up to about 3 minutes.",
      "Generated tracks carry a SynthID watermark.",
    ],
    sourceUrl: "https://deepmind.google/models/lyria/",
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
      summary: "First fact file: MusicFX retired into Google Flow Music; Lyria 3.5 in Gemini (free with limits); API $0.04-$0.08 per song. FREE -> FREEMIUM.",
    },
  ],
} satisfies ToolFacts;
