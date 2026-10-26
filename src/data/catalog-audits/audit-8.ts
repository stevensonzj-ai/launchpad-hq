/**
 * Catalog audit #8 — patch data and pure diff logic for
 * scripts/update-catalog-audit-8.ts (the DB runner lives there).
 *
 * Catalog batch, 2026-10-26:
 *   - CREATE `minimax` (MiniMax). No row, fact file, seed or redirect for
 *     MiniMax existed (scripts/seed-phase1-batch1-platforms.ts deferred
 *     "Hailuo (MiniMax)"). The row is created only while the slug is
 *     missing; an existing row is never overwritten. Required fields follow
 *     the phase-1 seed (toCreateData), including empty curated arrays.
 *     Fact file: src/data/facts/minimax.ts.
 *   - UPDATE `kimi`: description / currentPricing / freeTierFeatures to the
 *     membership prices on Kimi's K3.1 Pro pricing page (annual billing),
 *     and apiAvailable false -> true (the Kimi API is in its fact file).
 *     The fact file (src/data/facts/kimi.ts) already overrides pricing on
 *     every page and in the feed; this keeps the row itself from going stale.
 *
 * Ideogram, Claude, Claude Code and Anthropic API changes in this batch are
 * fact-file only (no DB change). Never deletes rows; never changes slug,
 * name or categoryId of an existing row.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-8.test.ts).
 */

export const CHECKED_AT = "2026-10-26";

/** The Prisma enums' values (audit-8.test.ts checks them against the schema). */
export const COST_TIERS = ["FREE", "FREEMIUM", "PAID", "ENTERPRISE"] as const;
export const DIFFICULTIES = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;
export const PRIVACY_LEVELS = ["LOW", "MEDIUM", "HIGH", "MAXIMUM"] as const;

export type Audit8NewRow = {
  slug: string;
  name: string;
  company: string;
  website: string;
  primaryUse: string;
  primaryUseCases: string;
  description: string;
  currentPricing: string;
  freeTierFeatures: string;
  costTier: (typeof COST_TIERS)[number];
  difficultyLevel: (typeof DIFFICULTIES)[number];
  privacyLevel: (typeof PRIVACY_LEVELS)[number];
  platformType: string[];
  apiAvailable: boolean;
  offlineCapable: boolean;
  idealUserTypes: string[];
  contentTypes: string[];
  outputFormats: string[];
};

export type Audit8Create = {
  finding: string;
  sources: string[];
  checkedAt: string;
  /** Live category slug (scripts/restructure-categories-2026-05.ts). */
  categorySlug: string;
  row: Audit8NewRow;
};

const MINIMAX_BLOG = "https://www.minimax.io/blog/minimax-m31f";
const MINIMAX_HF = "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash";
const MINIMAX_LICENSE = "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/blob/main/LICENSE";
const MINIMAX_PRIVACY = "https://platform.minimax.io/protocol/privacy-policy";
const KIMI_PLANS = "https://www.kimi.ai/resources/kimi-k3-1-pro-pricing";
const KIMI_BLOG = "https://www.kimi.ai/blog/kimi-k3-1-pro";

export const AUDIT_8_CREATES: Audit8Create[] = [
  {
    finding: "New listing: MiniMax (M3.1 Flash API prices; open weights under MiniMax's own license)",
    sources: [MINIMAX_BLOG, MINIMAX_HF, MINIMAX_LICENSE, MINIMAX_PRIVACY],
    checkedAt: CHECKED_AT,
    categorySlug: "ai-apis-developer-services",
    row: {
      slug: "minimax",
      name: "MiniMax",
      company: "MiniMax",
      website: "https://www.minimax.io",
      primaryUse: "Low-cost model API, plus open-weight models you can run on your own hardware",
      primaryUseCases:
        "Cheap API inference with M3.1 Flash; self-hosting the M3.1 Flash weights under MiniMax's community license",
      description:
        "MiniMax's model platform. M3.1 Flash, released 2026-10-19 per MiniMax, costs $0.15 input / $0.60 output per 1M tokens on the MiniMax API (official, as of 2026-10-26). Its weights are on Hugging Face as open weights under the MiniMax Community License, a custom license rather than open source: commercial use needs a \"Built with MiniMax M3.1-Flash\" credit plus a notice to MiniMax, or MiniMax's written authorization for products over US$20M in yearly revenue (as of 2026-10-26). Per the API platform's privacy policy as of 2026-10-26, the service is operated by Nanonoble Pte. Ltd. (Singapore) and personal data is stored in a data center in the United States; the policy does not say whether API inputs are used to train models.",
      currentPricing:
        "API M3.1 Flash $0.15/$0.60 per 1M tokens in/out, $0.015 cached input (official, as of 2026-10-26); other models and the M Plan are priced on platform.minimax.io",
      freeTierFeatures:
        "No free API tier listed with M3.1 Flash; the open weights download free under MiniMax's community license (official, as of 2026-10-26)",
      costTier: "PAID",
      difficultyLevel: "INTERMEDIATE",
      privacyLevel: "LOW",
      platformType: ["api"],
      apiAvailable: true,
      offlineCapable: true,
      idealUserTypes: ["developers"],
      contentTypes: ["text", "images", "video"],
      outputFormats: ["text"],
    },
  },
];

export type Audit8TextField = "description" | "currentPricing" | "freeTierFeatures";

export type Audit8Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit8TextField, string>>;
  /** Changes only while the row still has `from`; a hand-edited value is left alone. */
  apiAvailable?: { from: boolean; to: boolean };
};

export const AUDIT_8_PATCHES: Audit8Patch[] = [
  {
    slug: "kimi",
    finding:
      "Membership re-checked: Plus $15, Pro $31, Max $79, Ultra $159 per month billed annually; Free plan includes limited K3.1 Pro use; Kimi API exists",
    sources: [KIMI_PLANS, KIMI_BLOG],
    checkedAt: CHECKED_AT,
    fields: {
      description:
        "Moonshot AI's Kimi assistant (K3.1 Pro is the newest model as of 2026-10-26). China-based company. Membership (official pricing page, as of 2026-10-26): Plus $15/mo, Pro $31/mo, Max $79/mo, Ultra $159/mo, billed annually; the Free plan includes limited K3.1 Pro use. Pay-as-you-go API at platform.kimi.ai. Review data-handling before sending sensitive inputs.",
      currentPricing:
        "Free $0; Plus $15/mo, Pro $31/mo, Max $79/mo, Ultra $159/mo, billed annually; monthly-billing prices not shown (official, as of 2026-10-26)",
      freeTierFeatures:
        "Free plan: limited K3.1 Pro use on the web and in Kimi Work, basic agent credits, 1 agent task at a time (official, as of 2026-10-26)",
    },
    apiAvailable: { from: false, to: true },
  },
];

export type CreatePlan = "create" | "done";

/** Create only while the slug is missing. An existing row is never overwritten. */
export function planCreate(exists: boolean): CreatePlan {
  return exists ? "done" : "create";
}

/** Prisma `data` for a new row (same shape as the phase-1 seed's toCreateData). */
export function audit8CreateData(create: Audit8Create, categoryId: string) {
  return {
    ...create.row,
    categoryId,
    verified: true,
    // Curated fields: empty on create, filled by hand later.
    featured: false,
    directAlternatives: [] as string[],
    complementaryTools: [] as string[],
    budgetAlternativeTo: [] as string[],
    privacyAlternativeTo: [] as string[],
  };
}

export type Audit8Row = {
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  apiAvailable: boolean;
};

export type Audit8Diff =
  | { field: Audit8TextField; to: string }
  | { field: "apiAvailable"; to: boolean };

/** Fields that differ once the patch is applied. Empty when the row already matches. */
export function diffAudit8(row: Audit8Row, patch: Audit8Patch): Audit8Diff[] {
  const diffs: Audit8Diff[] = [];
  for (const field of ["description", "currentPricing", "freeTierFeatures"] as const) {
    const to = patch.fields[field];
    if (to !== undefined && row[field] !== to) diffs.push({ field, to });
  }
  const api = patch.apiAvailable;
  if (api && row.apiAvailable === api.from && api.from !== api.to) {
    diffs.push({ field: "apiAvailable", to: api.to });
  }
  return diffs;
}

/** Prisma `data` for an update: only the differing fields. */
export function audit8UpdateData(diffs: readonly Audit8Diff[]): Partial<Audit8Row> {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to]));
}
