/**
 * Catalog audit #34 (2026-11-06): play-ht and kakao-brain-karlo hidden
 * everywhere public after a recheck confirmed both are shut down / unusable.
 * No database patches: hiding is a fact-file `visibility: "hidden"` plus
 * HIDDEN_PAGE_REDIRECTS. The platform rows, fact files and history stay
 * (reversible). Code-only: there is no operator runner for this audit.
 * Kept free of Prisma and dotenv.
 */

export const CHECKED_AT = "2026-11-06";

export type Audit34Outcome = "hidden";
export type Audit34Patch = {
  slug: string;
  outcome: Audit34Outcome;
  source: string;
  fields: Record<string, { from: string | null; to: string }>;
};

/** No database text changes in this audit. */
export const AUDIT_34_PATCHES: Audit34Patch[] = [];

export const AUDIT_34_NO_CHANGE: { slug: string; outcome: Audit34Outcome; source: string }[] = [
  {
    slug: "play-ht",
    outcome: "hidden",
    source: "https://www.bloomberg.com/news/articles/2025-07-11/meta-acquires-voice-ai-startup-playai-continuing-to-add-talent",
  },
  {
    slug: "kakao-brain-karlo",
    outcome: "hidden",
    source: "https://devtalk.kakao.com/t/kogpt-karlo-api-notice-end-of-support-for-kogpt-karlo-apis/139024",
  },
];

/** Where each hidden page 301s (single hop to a listed page). */
export const AUDIT_34_HIDDEN: Record<string, string> = {
  "play-ht": "/discover?category=voice-speech",
  "kakao-brain-karlo": "/discover?category=image-generation-editing",
};
