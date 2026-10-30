/**
 * Catalog audit #24 — leftover old strings on the five audit-23 rows, 2026-10-30.
 * UPDATE-only, keyed by slug. Each field is written only while the row still
 * holds the exact old value recorded here (a hand edit is left alone), so a
 * re-run reports 0 changes. Every new value was read that day on the
 * vendor's own pricing page (`source`). No "official" wording (audit 10 rule).
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-24.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-30";

export type Audit24Field = "description" | "usageLimits" | "languageSupport" | "qualityRestrictions" | "upgradeTriggers";

export type Audit24Patch = {
  slug: string;
  finding: string;
  source: string;
  fields: Partial<Record<Audit24Field, { from: string; to: string }>>;
};

export const AUDIT_24_PATCHES: Audit24Patch[] = [
  {
    slug: "krea",
    finding: "Description still carried the garbled \"list/discounted ... $9/$5\" price string and \"billing basis is unverified\"",
    source: "https://www.krea.ai/pricing",
    fields: {
      description: {
        from: "Multi-model image and video studio with LoRA training and an API. Official pricing (krea.ai/pricing, as of 2026-10-13): free 100 units/day; paid list/discounted monthly prices shown as $9/$5, $35/$21, $105/$63, $200/$160. The billing basis behind the two numbers is unverified.",
        to: "Multi-model image and video studio with LoRA training and an API. Free gives 100 units a day; Basic, Pro, Max and Business cost $9, $35, $105 and $200 a month, or $5.25, $21, $63 and $160 a month billed yearly (as of 2026-10-30).",
      },
    },
  },
  {
    slug: "deepgram",
    finding: "Usage limits said billing is per audio hour (it is per second); language support said 36+ (Nova models support 60+)",
    source: "https://deepgram.com/pricing",
    fields: {
      usageLimits: {
        from: "Free: $200 credits (generous for testing); pay-per-audio-hour after; volume discounts",
        to: "Free: $200 credit, no expiry; then pay as you go, billed per second of audio with no rounding; Growth and Enterprise lower the rates (as of 2026-10-30)",
      },
      languageSupport: {
        from: "36+ languages for transcription",
        to: "60+ languages for transcription with Nova models (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "elevenlabs",
    finding: "Free-tier restrictions said \"limited voice cloning fidelity\" (Free has no voice cloning; it starts on Starter); upgrade triggers said character limits (plans use credits); languages said 29+ (the site says 70+)",
    source: "https://elevenlabs.io/pricing",
    fields: {
      qualityRestrictions: {
        from: "Free: ElevenLabs attribution required; limited voice cloning fidelity; basic voices only",
        to: "Free: ElevenLabs attribution required; no commercial license; no voice cloning (Instant Voice Cloning starts on Starter) (as of 2026-10-30)",
      },
      upgradeTriggers: {
        from: "Character limits; removing attribution; professional voice cloning; API; commercial license",
        to: "Credit limits; removing attribution; instant or professional voice cloning; commercial license; more Studio projects (as of 2026-10-30)",
      },
      languageSupport: {
        from: "Multilingual (29+ languages, 100+ accents)",
        to: "70+ languages (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "mubert",
    finding: "Free restrictions cited a \"25s\" duration the pricing page does not show",
    source: "https://mubert.com/render/pricing",
    fields: {
      qualityRestrictions: {
        from: "Free: personal use only; watermarked; limited duration (25s free)",
        to: "Free (Ambassador): non-commercial only; MP3; fixed duration; attribution and audible watermark (as of 2026-10-30)",
      },
    },
  },
];

export type Audit24Row = Partial<Record<Audit24Field, string | null>>;
export type Audit24Plan = { field: Audit24Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit24(row: Audit24Row, patch: Audit24Patch): Audit24Plan[] {
  return (Object.entries(patch.fields) as [Audit24Field, { from: string; to: string }][]).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit24UpdateData(plans: readonly Audit24Plan[]): Partial<Record<Audit24Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}
