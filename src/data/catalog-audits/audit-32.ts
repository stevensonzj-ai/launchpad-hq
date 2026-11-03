/**
 * Catalog audit #32 — Pipecat (new listing), 2026-11-02.
 * Row data and pure logic for scripts/insert-catalog-audit-32.ts (the DB
 * runner lives there) and for scripts/sql/audit-32-pipecat.sql.
 *
 *   - PIPECAT_ROW: a new `pipecat` row in the same category as Deepgram
 *     (ai-apis-developer-services), created only when no row has that slug.
 *   - DEEPGRAM_COMPLEMENTARY_ADD: "Pipecat" is added to deepgram's
 *     complementaryTools, so the Deepgram page's "works well with" list links
 *     Pipecat (the page matches those names against listed rows). Append only;
 *     skipped when already present.
 *   - Pricing has ONE home: the freeTier and plans block of
 *     src/data/facts/pipecat.ts. The row text below is written from it and a
 *     test keeps the two in step; after the insert the site overlay shows the
 *     fact file over the row text, so amend the fact file.
 *
 * Every fact is from the project's own pages, read 2026-11-02 (sources below).
 * The Deepgram acquisition of Daily is worded as announced, not completed. No
 * affiliate or sponsored link, and the text never says "official".
 *
 * Never deletes rows and never changes an existing row other than the one
 * append above. Kept free of Prisma and dotenv so it typechecks with the app
 * and can be unit-tested (audit-32.test.ts).
 */

import { assertNoRemovedSlugs } from "@/lib/catalog/removed-slugs";

export const CHECKED_AT = "2026-11-02";

export const PIPECAT_SLUG = "pipecat";
/** A fixed id, so the Prisma runner and the SQL file insert the same row. */
export const PIPECAT_ID = "cmpipecataudit32x0000001";
/** Deepgram's category (ai-apis-developer-services), as an id. */
export const PIPECAT_CATEGORY_ID = "cmnxhfk4u004q88svb7gaw4ew";
export const PIPECAT_CATEGORY_SLUG = "ai-apis-developer-services";

export const DEEPGRAM_SLUG = "deepgram";
export const DEEPGRAM_COMPLEMENTARY_ADD = "Pipecat";

export const PIPECAT_SOURCES = [
  "https://pipecat.ai/",
  "https://github.com/pipecat-ai/pipecat",
  "https://docs.pipecat.ai/",
  "https://docs.pipecat.ai/getting-started/quickstart",
  "https://www.daily.co/pricing/pipecat-cloud/",
  "https://deepgram.com/blog/daily-pipecat-deepgram",
  "https://www.daily.co/blog/deepgram-is-acquiring-daily-and-establishing-an-independent-pipecat-foundation/",
] as const;

/** Catalog names of alternatives and companions that have rows (snapshot, 2026-11-02). */
export const PIPECAT_ALTERNATIVES = ["Vapi", "Retell AI"];
export const PIPECAT_COMPLEMENTARY = ["Deepgram", "OpenAI API", "ElevenLabs"];

export const PIPECAT_CURRENT_PRICING =
  "Free and open source (BSD 2-Clause). Optional Pipecat Cloud hosting (by Daily): agent-1x $0.01/min active ($0.0005/min reserved), agent-2x $0.02/min, agent-3x $0.03/min; WebRTC voice transport free for 1:1 sessions; telephony and recording extra; your LLM, STT and TTS providers bill separately (as of 2026-11-02)";

/** Every field the new row sets besides id and categoryId. Shape matches existing rows. */
export const PIPECAT_ROW = {
  slug: PIPECAT_SLUG,
  name: "Pipecat",
  company: "Daily",
  website: "https://pipecat.ai",
  logoUrl: null,
  description:
    "An open-source Python framework for building voice and multimodal AI agents that you can talk to in real time. You pick the speech-to-text, language-model and text-to-speech services from more than 200 integrated providers, and Pipecat handles interruptions, turn detection and conversation context over WebRTC, SIP or phone (PSTN). It is free under the BSD 2-Clause license and runs wherever Python runs; Pipecat Cloud, run by Daily, is an optional paid host. Maintained by Daily: Deepgram announced on 2026-10-29 that it is acquiring Daily (announced, not completed, as of 2026-11-02) and says Pipecat will stay open source under an independent Pipecat Foundation. Your own provider accounts bill separately (as of 2026-11-02).",
  primaryUse: "Open-source Python framework for building real-time voice and multimodal AI agents",
  primaryUseCases:
    "Voice assistants and phone agents; real-time conversation with interruption handling; voice-and-video agents; multi-agent workflows with Pipecat Flows",
  costTier: "FREEMIUM",
  difficultyLevel: "INTERMEDIATE",
  platformType: ["api", "local"],
  currentPricing: PIPECAT_CURRENT_PRICING,
  freeTierFeatures:
    "Free and open source (BSD 2-Clause): build and run voice agents yourself at no charge; your speech, language and voice providers bill separately and Pipecat Cloud hosting is optional (as of 2026-11-02)",
  usageLimits:
    "Pipecat Cloud: unlimited concurrency; Krisp VIVA noise filtering free up to 10,000 active session minutes a month; provider accounts have their own limits (as of 2026-11-02)",
  qualityRestrictions: null,
  upgradeTriggers:
    "Having Daily host the agent on Pipecat Cloud (billed per active minute); phone calling over PSTN or SIP and recording; Pipecat Enterprise to run Pipecat Cloud in your own AWS, Azure or GCP account",
  installationType: "Python package (pipecat-ai on PyPI), Python 3.11 or newer; pipecat CLI",
  offlineCapable: false,
  apiAvailable: false,
  keyIntegrations:
    "200+ integrated speech, language and vision providers (the quickstart uses Deepgram, OpenAI and Cartesia); WebRTC, SIP and PSTN transports; client SDKs for JavaScript, React, React Native, iOS, Android and C++; Pipecat Flows",
  privacyLevel: "MEDIUM",
  idealUserTypes: ["Python developers", "teams building voice agents", "developers prototyping phone and voice assistants"],
  timeToProductivity: null,
  learningCurve: "Moderate",
  directAlternatives: PIPECAT_ALTERNATIVES,
  complementaryTools: PIPECAT_COMPLEMENTARY,
  budgetAlternativeTo: [] as string[],
  privacyAlternativeTo: [] as string[],
  contentTypes: ["Audio (speech)", "Text", "Video"],
  outputFormats: ["Real-time spoken replies", "streaming audio and video sessions"],
  languageSupport: "Depends on the speech and language providers you connect",
  featured: false,
  verified: true,
  hasMobileApp: false,
  iosAppUrl: null,
  androidAppUrl: null,
  mobileWebFriendly: false,
} as const;

/** Prisma `data` for the create, or null when the row exists or the category is missing. */
export function pipecatCreateData(
  exists: boolean,
  categoryExists: boolean,
): (typeof PIPECAT_ROW & { id: string; categoryId: string }) | null {
  if (exists || !categoryExists) return null;
  return { ...PIPECAT_ROW, id: PIPECAT_ID, categoryId: PIPECAT_CATEGORY_ID };
}

/** The complementaryTools list after the append, or null when "Pipecat" is already there. */
export function deepgramComplementaryAfter(current: readonly string[]): string[] | null {
  if (current.some((n) => n.toLowerCase() === DEEPGRAM_COMPLEMENTARY_ADD.toLowerCase())) return null;
  return [...current, DEEPGRAM_COMPLEMENTARY_ADD];
}

// ---------- SQL (scripts/sql/audit-32-pipecat.sql) ----------

const TAG = "$a32$";
const q = (s: string) => `${TAG}${s}${TAG}`;
const lit = (s: string | null) => (s === null ? "NULL" : q(s));
const arr = (a: readonly string[]) => (a.length ? `ARRAY[${a.map(q).join(", ")}]::text[]` : "ARRAY[]::text[]");
const bool = (b: boolean) => (b ? "true" : "false");

/** Column order of the INSERT. */
const COLUMNS = [
  "id", "slug", "name", "company", "website", "logoUrl", "description", "categoryId", "primaryUse", "costTier",
  "difficultyLevel", "platformType", "currentPricing", "freeTierFeatures", "usageLimits", "qualityRestrictions",
  "upgradeTriggers", "installationType", "offlineCapable", "apiAvailable", "keyIntegrations", "privacyLevel",
  "idealUserTypes", "primaryUseCases", "timeToProductivity", "learningCurve", "directAlternatives",
  "complementaryTools", "budgetAlternativeTo", "privacyAlternativeTo", "contentTypes", "outputFormats",
  "languageSupport", "featured", "verified", "createdAt", "updatedAt", "hasMobileApp", "iosAppUrl",
  "androidAppUrl", "mobileWebFriendly",
] as const;

/** One complete, guarded statement per line, each ending in `;`. */
export function audit32Sql(): string[] {
  const r = PIPECAT_ROW;
  assertNoRemovedSlugs([r.slug, PIPECAT_SLUG, DEEPGRAM_SLUG], "audit 32 SQL");
  const values = [
    lit(PIPECAT_ID), lit(r.slug), lit(r.name), lit(r.company), lit(r.website), lit(r.logoUrl), lit(r.description),
    lit(PIPECAT_CATEGORY_ID), lit(r.primaryUse), `${lit(r.costTier)}::"CostTier"`,
    `${lit(r.difficultyLevel)}::"Difficulty"`, arr(r.platformType), lit(r.currentPricing), lit(r.freeTierFeatures),
    lit(r.usageLimits), lit(r.qualityRestrictions), lit(r.upgradeTriggers), lit(r.installationType),
    bool(r.offlineCapable), bool(r.apiAvailable), lit(r.keyIntegrations), `${lit(r.privacyLevel)}::"PrivacyLevel"`,
    arr(r.idealUserTypes), lit(r.primaryUseCases), lit(r.timeToProductivity), lit(r.learningCurve),
    arr(r.directAlternatives), arr(r.complementaryTools), arr(r.budgetAlternativeTo), arr(r.privacyAlternativeTo),
    arr(r.contentTypes), arr(r.outputFormats), lit(r.languageSupport), bool(r.featured), bool(r.verified), "now()",
    "now()", bool(r.hasMobileApp), lit(r.iosAppUrl), lit(r.androidAppUrl), bool(r.mobileWebFriendly),
  ];
  if (values.length !== COLUMNS.length) throw new Error("audit 32 SQL: column and value counts differ");
  const insert =
    `INSERT INTO platforms (${COLUMNS.map((c) => `"${c}"`).join(", ")}) SELECT ${values.join(", ")} ` +
    `WHERE NOT EXISTS (SELECT 1 FROM platforms WHERE slug = ${q(PIPECAT_SLUG)}) ` +
    `AND EXISTS (SELECT 1 FROM categories WHERE id = ${q(PIPECAT_CATEGORY_ID)});`;
  const update =
    `UPDATE platforms SET "complementaryTools" = array_append("complementaryTools", ${q(DEEPGRAM_COMPLEMENTARY_ADD)}), "updatedAt" = now() ` +
    `WHERE slug = ${q(DEEPGRAM_SLUG)} AND NOT (${q(DEEPGRAM_COMPLEMENTARY_ADD)} = ANY("complementaryTools"));`;
  return [insert, update];
}
