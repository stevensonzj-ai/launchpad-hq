import type { ToolFacts } from "./types";

/**
 * Kakao Brain Karlo: API support ended 2024-09-30. Page hidden, guide removed (301 to this page).
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "kakao-brain-karlo",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline: "Kakao ended support for the Karlo image-generation API on September 30, 2024, according to a notice on Kakao's developer forum.",
      whatToDo: "Kakao told developers to update their services to stop calling the Karlo API.",
    },
    sourceUrl: "https://devtalk.kakao.com/t/kogpt-karlo-api-notice-end-of-support-for-kogpt-karlo-apis/139024",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked discontinued and hidden; how-to guide removed.",
    },
  ],
} satisfies ToolFacts;
