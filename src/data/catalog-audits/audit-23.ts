/**
 * Catalog audit #23 — expired promos and garbled prices, 2026-10-30.
 * UPDATE-only, keyed by slug. Each field is written only while the row still
 * holds the exact old value recorded here (a hand edit is left alone), so a
 * re-run reports 0 changes. Every new value was read that day on the
 * vendor's own pricing page (`source`). The text carries no "official"
 * wording (audit 10 rule); the price facts behind it live in
 * src/data/facts (AUDIT_23_FACT_SLUGS).
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-23.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-30";

/** Rows that got price facts in this audit (exempt from audit 10's no-fact rule). */
export const AUDIT_23_FACT_SLUGS = ["elevenlabs", "deepgram", "mubert"] as const;

export type Audit23Field = "currentPricing" | "freeTierFeatures" | "usageLimits";

export type Audit23Patch = {
  slug: string;
  finding: string;
  source: string;
  fields: Partial<Record<Audit23Field, { from: string; to: string }>>;
};

export const AUDIT_23_PATCHES: Audit23Patch[] = [
  {
    slug: "elevenlabs",
    finding:
      "Pricing text cited a first-month promo \"shown until Oct 18, 2026\" and a garbled annual clause; usage limits listed old character caps (Creator 100K, Pro 500K, Scale 2M)",
    source: "https://elevenlabs.io/pricing",
    fields: {
      currentPricing: {
        from: "Free $0 (10k credits/mo); Starter $6/mo (30k credits; first-month promo $1 shown until Oct 18, 2026); Creator $22/mo (121k; first-month $11 shown); Pro $99 (600k); Scale $299 (1.8M, 3 seats); Business $990 (6M, 10 seats); Enterprise custom. Annual = 10 months (Starter $5 equivalent, Creator $18.33, Pro $82.50) (per the FAQ, as of 2026-10-14)",
        to: "Free $0 (10,000 credits/mo); Starter $6/mo (30,000 credits); Creator $22/mo (121,000); Pro $99/mo (600,000); Scale $299/mo (1.8M, 3 seats); Business $990/mo (6M, 10 seats); Enterprise custom. Annual billing charges 10 months for 12: Starter $5/mo, Creator $18.33/mo, Pro $82.50/mo, Scale $249.17/mo, Business $825/mo (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free $0: 10,000 credits/month; 3 Studio projects (official, as of 2026-10-14)",
        to: "Free $0: 10,000 credits/month for text to speech, speech to text, sound effects, voice design, music and image; 3 Studio projects; no commercial license (as of 2026-10-30)",
      },
      usageLimits: {
        from: "Free: 10K chars/mo; Starter: 30K; Creator: 100K; Pro: 500K; Scale: 2M",
        to: "Monthly credits: Free 10,000; Starter 30,000; Creator 121,000; Pro 600,000; Scale 1.8M; Business 6M. Text to speech uses about 1 credit per character; paid credits roll over for up to two months (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "deepgram",
    finding: "Row called Nova-3 pre-recorded $0.0048/min \"promotional\" against a $0.0077 strikethrough; the page now lists $0.0043/min pre-recorded and $0.0077/min streaming, no promotion",
    source: "https://deepgram.com/pricing",
    fields: {
      currentPricing: {
        from: "Pay-as-you-go; Nova-3 Monolingual pre-recorded currently $0.0048/min promotional (strikethrough regular $0.0077/min). $200 credit on signup (as of 2026-10-14).",
        to: "Pay as you go with a $200 free credit (no card, no expiry): Nova-3 Monolingual $0.0077/min streaming, $0.0043/min pre-recorded; Aura-2 text to speech $0.030 per 1,000 characters; Voice Agent Standard $0.075/min. Growth from $4,000/yr pre-paid at lower rates; Enterprise custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "kickresume",
    finding: "Row said prices were \"shown with a limited-time 20% discount\"; the pricing page no longer shows a discount",
    source: "https://www.kickresume.com/en/pricing/",
    fields: {
      currentPricing: {
        from: "Free with free customization options; Yearly $8/mo, Quarterly $18/mo, Monthly $24/mo regular prices, shown with a limited-time 20% discount (official, as of 2026-10-26)",
        to: "Free with free customization options; Premium Yearly $8/mo ($96 every 12 months), Quarterly $54 every 3 months, Monthly $24/mo; 14-day money-back guarantee (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "krea",
    finding: "Garbled price string (\"~$9/$5, $35/$21 ... list/discounted; billing basis unverified\"); the page shows monthly prices with yearly billing at a lower monthly rate",
    source: "https://www.krea.ai/pricing",
    fields: {
      currentPricing: {
        from: "Free 100 units/day; paid ~$9/$5, $35/$21, $105/$63, $200/$160 per month (list/discounted; billing basis unverified)",
        to: "Free 100 units/day; Basic $9/mo (5,000 units), Pro $35/mo (20,000), Max $105/mo (60,000), Business $200/mo (80,000 units, up to 50 members); billed yearly: Basic $5.25/mo, Pro $21/mo, Max $63/mo, Business $160/mo; Enterprise custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "mubert",
    finding: "Row called the annual-billing prices \"discounted\" and listed Creator and Business as unlimited; the page shows annual prices and 500 / 1,000 generations a month",
    source: "https://mubert.com/render/pricing",
    fields: {
      currentPricing: {
        from: "Ambassador Free; Creator $14/mo ($11.69 shown as discounted); Pro $39/mo commercial ($32.49 discounted); Business $199/mo ($149.29 discounted) (per the compare table, as of 2026-10-14)",
        to: "Ambassador free (non-commercial); Creator $14/mo; Pro $39/mo (commercial use); Business $199/mo (client, agency and app use); billed annually: $11.69, $32.49 and $149.29 a month (as of 2026-10-30)",
      },
      usageLimits: {
        from: "Free: 25 tracks/mo; Creator: unlimited; Business: commercial license + unlimited",
        to: "Ambassador: 25 tracks and 5 downloads a month; Creator and Pro: 500 generations a month; Business: 1,000 generations a month (as of 2026-10-30)",
      },
    },
  },
];

export type Audit23Row = Partial<Record<Audit23Field, string | null>>;
export type Audit23Plan = { field: Audit23Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit23(row: Audit23Row, patch: Audit23Patch): Audit23Plan[] {
  return (Object.entries(patch.fields) as [Audit23Field, { from: string; to: string }][]).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit23UpdateData(plans: readonly Audit23Plan[]): Partial<Record<Audit23Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}
