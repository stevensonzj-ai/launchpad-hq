import type { ToolFacts } from "./types";

/**
 * Sora 2: OpenAI discontinued the Sora app/web and the Sora API.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "sora-2",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline: "OpenAI discontinued the Sora web and app experiences on April 26, 2026, and the Sora API on September 24, 2026.",
      whatToDo: "OpenAI says to export your Sora content as soon as possible: go to sora.chatgpt.com/sunset and click Export, and you'll get an email when it's ready. OpenAI says it will email users before any final export window opens, and that Sora data will be permanently deleted after that.",
      alternatives: [
        { slug: "google-veo-3-1", name: "Google Veo 3.1" },
        { slug: "kling-ai", name: "Kling AI" },
        { slug: "runway", name: "Runway" },
      ],
    },
    sourceUrl: "https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "visibility",
      summary:
        "Discontinuation re-read on the OpenAI Help Center (catalog audit 27). Page hidden; /platform/sora-2 now 301s to /platform/google-veo-3-1.",
    },
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked discontinued; added what-happened notice (app/web ended 2026-04-26, API 2026-09-24).",
    },
  ],
} satisfies ToolFacts;
