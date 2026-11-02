/**
 * Catalog audit #30 (2026-11-01): hedra hidden everywhere public at the
 * vendor's request to remove its name and trademark. No database patches:
 * hiding is a fact-file `visibility: "hidden"` plus HIDDEN_PAGE_REDIRECTS, and
 * the platform row, fact file and retired guide are kept (reversible).
 * Kept free of Prisma and dotenv.
 */

export const CHECKED_AT = "2026-11-01";

export type Audit30Outcome = "hidden";
export type Audit30Patch = { slug: string; outcome: Audit30Outcome; source: string; fields: Record<string, { from: string | null; to: string }> };

/** No database text changes in this audit. */
export const AUDIT_30_PATCHES: Audit30Patch[] = [];

export const AUDIT_30_NO_CHANGE: { slug: string; outcome: Audit30Outcome; source: string }[] = [
  { slug: "hedra", outcome: "hidden", source: "https://www.hedra.com" },
];

/** Where each newly hidden page 301s (single hop to a listed page). */
export const AUDIT_30_HIDDEN: Record<string, string> = {
  hedra: "/discover?category=video-creation-editing",
};

export type Audit30Row = Record<string, string | null | undefined>;
export type Audit30Plan = { field: string; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit30(row: Audit30Row, patch: Audit30Patch): Audit30Plan[] {
  return Object.entries(patch.fields).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit30UpdateData(plans: readonly Audit30Plan[]): Record<string, string> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}
