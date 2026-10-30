import type { ToolFacts } from "./types";

/**
 * Naver (HyperCLOVA X / Cue:): first fact file, stale-facts batch 4 (catalog
 * audit 20), 2026-10-29. Both readers read clova.ai, which lists HyperCLOVA X
 * and CLOVA Studio and does not mention the consumer CLOVA X chatbot or Cue:.
 * clova-x.naver.com and cue.search.naver.com were blocked, the CLOVA Studio
 * page rendered only a title or no prices, and the privacy policy was not
 * reached. So the row (which still describes "Cue: chatbot for Korean users")
 * is left alone: the guide says both consumer products closed on 9 April 2026,
 * which needs a browser to confirm (Browser-check list).
 */
export default {
  slug: "naver-hyperclova-x-cue",
  lifecycle: "active",
  officialUrl: {
    value: "https://clova.ai",
    note: "The page lists \"HyperCLOVA X\" and \"CLOVA Studio\".",
    sourceUrl: "https://clova.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary: "First fact file: clova.ai lists HyperCLOVA X and CLOVA Studio only; consumer CLOVA X and Cue: pages blocked."
    }
  ],
} satisfies ToolFacts;
