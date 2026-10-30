import type { ToolFacts } from "./types";

/**
 * Google Lyria: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * MusicFX is gone: its address redirects to Google Flow Music. The
 * current model is Lyria 3.5, in the Gemini app (18+, free with limits),
 * Flow Music (free to start, daily credits), YouTube Shorts and Google
 * Vids. The Gemini API charges per song, with no free API tier. The row
 * moves from FREE to FREEMIUM and its website to the Lyria model page.
 *
 * Research Analyst browser check, 2026-10-29 (catalog audit 20): the Lyria
 * page says "Introducing Lyria 3.5. Our newest music generation model
 * delivers significant advancements across musicality, lyrics, and vocal
 * quality" and "now up to 3 minutes long". The page gives no announcement
 * date, so none is stated here. Catalog audit 22 (2026-10-30) renames the
 * listing Google Lyria 3.5; the slug stays google-lyria-3.
 */
export default {
  slug: "google-lyria-3",
  lifecycle: "active",
  displayName: {
    value: "Google Lyria 3.5",
    sourceUrl: "https://deepmind.google/models/lyria/",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
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
      "Lyria 3.5 is the current model: \"Our newest music generation model delivers significant advancements across musicality, lyrics, and vocal quality\"; songs can now be up to 3 minutes long.",
      "Generated tracks carry a SynthID watermark.",
    ],
    note: "Browser check 2026-10-29: the page does not give an announcement date for Lyria 3.5.",
    sourceUrl: "https://deepmind.google/models/lyria/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  models: {
    value: ["Lyria 3.5 (current)"],
    note: "Google presents Lyria 3.5 as its newest music generation model; the listing is named Google Lyria 3.5 since catalog audit 22.",
    sourceUrl: "https://deepmind.google/models/lyria/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "displayName",
      summary: "Listing renamed Google Lyria 3 -> Google Lyria 3.5 (page title \"Lyria 3.5 — Google DeepMind\"). Slug unchanged.",
    },
    {
      date: "2026-10-29",
      field: "apiPricing",
      summary: "First fact file: MusicFX retired into Google Flow Music; Lyria 3.5 in Gemini (free with limits); API $0.04-$0.08 per song. FREE -> FREEMIUM.",
    },
    {
      date: "2026-10-29",
      field: "models",
      summary: "Browser check: Lyria 3.5 is the current model (songs up to 3 minutes); no announcement date on the page. Name and slug unchanged.",
    },
  ],
} satisfies ToolFacts;
