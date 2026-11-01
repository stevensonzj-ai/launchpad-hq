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
 *
 * Catalog audit 21 (Research Analyst browser check, 2026-10-29): still not
 * readable. The ncloud CLOVA Studio page renders as an empty shell,
 * clova-x.naver.com closes the connection, the billing and docs pages 404,
 * ncloud.com/charge/price is pay-as-you-go with no token prices, and clova.ai
 * offers "Contact sales". Prices are not stated anywhere read, so the
 * catalog adds none; the row is left as it is.
 *
 * Catalog audit 28 (2026-11-01): Naver's own Cue: page states the consumer
 * products ended service on April 9, 2026, so the page is hidden as a
 * discontinued product (301 to /platform/perplexity-ai) and the guide is
 * retired to src/data/tutorials/retired/. HyperCLOVA X itself continues for
 * business through CLOVA Studio / NAVER Cloud (clova.ai).
 */
export default {
  slug: "naver-hyperclova-x-cue",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline:
        "Naver says its Cue: search assistant (a closed beta since September 2023) ended service on April 9, 2026, and that its CLOVA X chatbot also ended on April 9, 2026.",
      details: [
        "Naver's Cue: page says sign-ups closed on March 2, 2026 and that user data is destroyed after the closure. When we checked on November 1, 2026, cue.search.naver.com returned an HTTP 500 error and clova-x.naver.com refused the connection.",
        "HyperCLOVA X continues as a business product through CLOVA Studio and NAVER Cloud (clova.ai); it is not a consumer chatbot.",
      ],
      whatToDo:
        "If you used Cue: or CLOVA X, check Naver's notice for what happens to your data. If you're looking for an AI search assistant now, pick one that is still open to new users.",
      alternatives: [
        { slug: "perplexity-ai", name: "Perplexity" },
        { slug: "chatgpt", name: "ChatGPT" },
        { slug: "claude", name: "Claude" },
      ],
    },
    sourceUrl: "https://cue.search.naver.com",
    checkedAt: "2026-11-01",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-11-01",
    status: "verified",
  },
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
      date: "2026-11-01",
      field: "visibility",
      summary:
        "Hidden and marked discontinued (catalog audit 28): Naver's Cue: page says Cue: and CLOVA X ended service on April 9, 2026. /platform/naver-hyperclova-x-cue 301s to /platform/perplexity-ai; the guide moved to src/data/tutorials/retired/.",
    },
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary: "Browser check (audit 21): CLOVA Studio, consumer CLOVA X and Cue: still unreadable; no prices found, none added."
    },
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary: "First fact file: clova.ai lists HyperCLOVA X and CLOVA Studio only; consumer CLOVA X and Cue: pages blocked."
    }
  ],
} satisfies ToolFacts;
