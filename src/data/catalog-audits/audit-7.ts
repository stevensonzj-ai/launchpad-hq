/**
 * Catalog audit #7 — patch data and pure diff logic for
 * scripts/update-catalog-audit-7.ts (the DB runner lives there).
 *
 * Agent-readiness pass, 2026-10-25. UPDATE-only, keyed by slug, one field:
 *   - mistral-vibe costTier FREE -> FREEMIUM. Its fact file
 *     (src/data/facts/mistral-vibe.ts, verified 2026-10-25 against
 *     mistral.ai/pricing) lists a $0 Free plan plus paid Pro and Team plans,
 *     which is FREEMIUM, not FREE.
 *
 * Guarded: the tier changes only while the row still has the `from` value,
 * so a row someone already re-tiered by hand is left alone and a re-run is
 * a no-op. Runs after audit 6 (which renamed mistral-ai-le-chat to
 * mistral-vibe); before that the slug has no row and is skipped.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-7.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-25";

/** The Prisma CostTier enum's values (audit-7.test.ts checks them against the schema). */
export const COST_TIERS = ["FREE", "FREEMIUM", "PAID", "ENTERPRISE"] as const;
export type CostTierValue = (typeof COST_TIERS)[number];

export type Audit7Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  costTier: { from: CostTierValue; to: CostTierValue };
};

export const AUDIT_7_PATCHES: Audit7Patch[] = [
  {
    slug: "mistral-vibe",
    finding: "Free plan plus paid Pro and Team plans: FREEMIUM, not FREE",
    sources: ["https://mistral.ai/pricing"],
    checkedAt: CHECKED_AT,
    costTier: { from: "FREE", to: "FREEMIUM" },
  },
];

export type Audit7Plan = "update" | "done" | "skip";

/**
 * update: the row still has `from`. done: it already has `to`.
 * skip: anything else (changed by hand since); never overwritten.
 */
export function planAudit7(current: string, patch: Audit7Patch): Audit7Plan {
  if (current === patch.costTier.to) return "done";
  if (current === patch.costTier.from) return "update";
  return "skip";
}
