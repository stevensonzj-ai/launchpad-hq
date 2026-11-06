import type { ToolFacts } from "./types";

/**
 * PlayHT: no official notice exists; secondary sources only (say so on the page).
 * Hidden in catalog audit 34 (2026-11-06): shut down / unusable. The whole
 * /platform/play-ht tree 301s to /discover?category=voice-speech. The row,
 * this file and the history stay.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Rechecked 2026-11-06.
 */
export default {
  slug: "play-ht",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline: "PlayHT is no longer available. Bloomberg reported in July 2025 that Meta acquired PlayAI, the company behind PlayHT, and that its team was joining Meta.",
      details: [
        "Voice providers that publish PlayHT migration guides say the service has shut down and that accounts, audio and voice clones were deleted. PlayHT and Meta have not published a notice we can link to, so we can't confirm exact dates.",
      ],
      whatToDo: "We found no official export path. If you relied on PlayHT voices, plan to recreate them with another provider.",
      alternatives: [
        { slug: "elevenlabs", name: "ElevenLabs" },
        { slug: "murf-ai", name: "Murf AI" },
        { slug: "inworld-ai", name: "Inworld AI" },
      ],
      sourceKind: "secondary",
      additionalSources: [
        "https://inworld.ai/resources/migrate-from-playht",
      ],
    },
    sourceUrl: "https://www.bloomberg.com/news/articles/2025-07-11/meta-acquires-voice-ai-startup-playai-continuing-to-add-talent",
    checkedAt: "2026-11-06",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-11-06",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-06",
      field: "visibility",
      summary:
        "Hidden (catalog audit 34). Recheck: play.ht and www.play.ht have no public A record (name servers are Meta/Facebook); app.play.ht returns Vercel DEPLOYMENT_NOT_FOUND. No primary PlayHT or Meta shutdown notice (secondary sources only). /platform/play-ht 301s to /discover?category=voice-speech.",
    },
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked discontinued from secondary sources (no primary notice exists).",
    },
  ],
} satisfies ToolFacts;
