/**
 * Catalog audit #33 (2026-11-02): Pipecat's description no longer reads as a
 * text-to-speech tool. UPDATE-only, keyed by slug, text field only. The field
 * is written only while the row still holds the exact old value recorded here
 * (the audit-32 insert value), so a re-run reports 0 changes. Never creates or
 * deletes rows. Kept free of Prisma and dotenv.
 *
 * Why: search_tools ranked Pipecat 5th for "text to speech" / "text to speech
 * voiceover" because its description said "text-to-speech services" and
 * "speech-to-text" (whole-word and phrase matches in the description field).
 * Pipecat is a framework that connects third-party speech services; it is not
 * a text-to-speech or voiceover tool. The new wording says the same thing
 * without those words. Facts are unchanged. Data only: no search code touched.
 *
 * Fact file src/data/facts/pipecat.ts is not touched: search does not read it
 * for ranking, and it carries no description.
 */
import { PIPECAT_ROW } from "./audit-32";

export const CHECKED_AT = "2026-11-02";

export type Audit33Field = "description";

export type Audit33Patch = {
  slug: string;
  field: Audit33Field;
  from: string | null;
  to: string;
  source: string;
};

export const AUDIT_33_PATCHES: Audit33Patch[] = [
  {
    slug: "pipecat",
    field: "description",
    source: "https://pipecat.ai/",
    from: PIPECAT_ROW.description,
    to: "An open-source Python framework for building voice and multimodal AI agents that you can talk to in real time. It is not a voice generator itself: you plug in the transcription, language-model and voice-synthesis services you choose from more than 200 integrated providers, and Pipecat handles interruptions, turn detection and conversation context over WebRTC, SIP or phone (PSTN). It is free under the BSD 2-Clause license and runs wherever Python runs; Pipecat Cloud, run by Daily, is an optional paid host. Maintained by Daily: Deepgram announced on 2026-10-29 that it is acquiring Daily (announced, not completed, as of 2026-11-02) and says Pipecat will stay open source under an independent Pipecat Foundation. Your own provider accounts bill separately (as of 2026-11-02).",
  },
];

export type Audit33Row = Partial<Record<Audit33Field, string | null>>;
export type Audit33Plan = { field: Audit33Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit33(row: Audit33Row, patches: readonly Audit33Patch[]): Audit33Plan[] {
  return patches.map(({ field, from, to }) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Patches for one slug. */
export function audit33PatchesFor(slug: string): Audit33Patch[] {
  return AUDIT_33_PATCHES.filter((p) => p.slug === slug);
}

/** Distinct slugs touched by the patches, in order. */
export function audit33Slugs(): string[] {
  return [...new Set(AUDIT_33_PATCHES.map((p) => p.slug))];
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit33UpdateData(plans: readonly Audit33Plan[]): Partial<Record<Audit33Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}

// ---------- SQL (scripts/sql/audit-33-pipecat.sql) ----------

const TAG = "$a33$";
const q = (s: string) => `${TAG}${s}${TAG}`;

/** One guarded UPDATE per patch: matches only the exact old value, so a re-run changes nothing. */
export function audit33Sql(): string[] {
  return AUDIT_33_PATCHES.map(
    (p) =>
      `UPDATE platforms SET "${p.field}" = ${q(p.to)}, "updatedAt" = now() ` +
      `WHERE slug = ${q(p.slug)} AND "${p.field}" ${p.from === null ? "IS NULL" : `= ${q(p.from)}`};`,
  );
}
