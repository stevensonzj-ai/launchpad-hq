/**
 * Catalog audit #14 — Klap privacy reason and the clip tools' category,
 * 2026-10-29.
 *   - klap, opus-clip: category gaming-creative-ai -> video-creation-editing,
 *     only while the row is still in gaming-creative-ai (audit 13 copied
 *     Klap's category from opus-clip, so both sat in Gaming & Creative AI).
 *   - klap: description names OpenRouter beside OpenAI as a recipient of
 *     transcripts, per Klap's privacy policy (last updated 1 October 2026),
 *     only while the row holds audit 13's text. privacyLevel stays MEDIUM.
 *
 * The reader code is not catalog data: it lives only in
 * src/data/affiliates.ts (affiliates.test.ts keeps it out of every other
 * file), so this audit never writes it to a row.
 *
 * Applied by scripts/update-catalog-audit-14.ts (operator only).
 */
import { KLAP_ROW } from "./audit-13";

export const CHECKED_AT = "2026-10-29";

export const KLAP_PRIVACY_POLICY = "https://klap.app/privacy-policy";

export const CATEGORY_FROM = "gaming-creative-ai";
export const CATEGORY_TO = "video-creation-editing";

/** Rows moved from CATEGORY_FROM to CATEGORY_TO. */
export const AUDIT_14_CATEGORY_SLUGS = ["klap", "opus-clip"] as const;

export type Audit14CategoryMove = "move" | "already" | "differs";

/** What to do with a row whose current category slug is `current`. */
export function diffAudit14Category(current: string | null): Audit14CategoryMove {
  if (current === CATEGORY_TO) return "already";
  if (current === CATEGORY_FROM) return "move";
  return "differs";
}

const OLD_RECIPIENTS = "transcripts are sent to outside AI providers, including OpenAI, to find and score clips.";
const NEW_RECIPIENTS =
  "transcripts are sent to outside AI providers, including OpenRouter and OpenAI, to find and score clips.";

/**
 * The Klap description: `from` is audit 13's text, `to` adds OpenRouter.
 * Policy wording (section on who receives data): "OpenRouter, the model
 * providers it routes to, and OpenAI receive your transcripts and clipping
 * instructions to find the best moments, score them and write titles, emojis
 * and translations".
 */
export const KLAP_DESCRIPTION = {
  from: KLAP_ROW.description,
  to: KLAP_ROW.description.replace(OLD_RECIPIENTS, NEW_RECIPIENTS),
  sources: [KLAP_PRIVACY_POLICY],
} as const;

/** The new description, or null when the row already has it or holds other text. */
export function diffAudit14KlapDescription(row: { description: string | null }): string | null {
  return row.description === KLAP_DESCRIPTION.from ? KLAP_DESCRIPTION.to : null;
}
