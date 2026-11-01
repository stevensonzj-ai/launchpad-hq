/**
 * Catalog audit #29: Poe unhidden (2026-11-01, Zach), reversing the poe part of
 * audit 28. Poe shows plans and prices only after you sign in at poe.com
 * (logged out: poe.com redirects to /login, help.poe.com returns 403,
 * poe.com/pricing is a 404, checked 2026-11-01), so the row now lists no
 * prices. UPDATE-only, keyed by slug. Each field is written only while the row
 * still holds the exact old value recorded here (the audit-27 value for
 * currentPricing), so a re-run reports 0 changes. Never creates or deletes
 * rows. Kept free of Prisma and dotenv.
 *
 * Outcomes (1): corrected 1 (3 fields: currentPricing, freeTierFeatures, description). Unhiding is a fact-file change (no `visibility`)
 * plus removing poe from HIDDEN_PAGE_REDIRECTS, not a database write.
 */

export const CHECKED_AT = "2026-11-01";

export type Audit29Field = "currentPricing" | "freeTierFeatures" | "usageLimits" | "description";
export type Audit29Outcome = "verified" | "corrected";

export type Audit29Patch = {
  slug: string;
  outcome: Audit29Outcome;
  source: string;
  fields: Partial<Record<Audit29Field, { from: string | null; to: string }>>;
};

export const AUDIT_29_PATCHES: Audit29Patch[] = [
  {
    slug: "poe",
    outcome: "corrected",
    source: "https://poe.com/",
    fields: {
      currentPricing: {
        from: "Free plan and paid subscriptions; prices not confirmed (pricing needs a login) (as of 2026-10-30)",
        to: "Paid subscriptions exist, but Poe shows plans and prices only after you sign in at poe.com; we list no prices (as of 2026-11-01)",
      },
      freeTierFeatures: {
        from: "Free for most usage (official); exact daily points unverified as of 2026-10-13",
        to: "Free account available; daily free points are shown only after signing in at poe.com (as of 2026-11-01)",
      },
      description: {
        from: "Quora's multi-model chat app. About page (as of 2026-10-13): free for most usage; plans from $4.99/mo. Prompts are sent to whichever third-party model provider you pick. Exact free daily points are unverified (third parties cite about 300 points/day). Third-party paid point allowances: $4.99 (10k points/day), $19.99 (660k points/mo), then $49.99, $99.99, $249.99.",
        to: "Quora's multi-model chat app: one account to chat with bots from many AI companies. Prompts are sent to whichever third-party model provider you pick. Poe shows its plans, prices and free daily points only after you sign in at poe.com, so we list no prices (as of 2026-11-01)",
      },
    },
  },
];

export type Audit29Row = Partial<Record<Audit29Field, string | null>>;
export type Audit29Plan = { field: Audit29Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit29(row: Audit29Row, patch: Audit29Patch): Audit29Plan[] {
  return (Object.entries(patch.fields) as [Audit29Field, { from: string | null; to: string }][]).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit29UpdateData(plans: readonly Audit29Plan[]): Partial<Record<Audit29Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}
