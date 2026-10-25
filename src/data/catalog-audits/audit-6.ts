import { REF_FIELDS, rewriteNameRefs, type NameRename, type RefField } from "./audit-3-refs";

/**
 * Catalog audit #6 — patch data and pure diff logic for
 * scripts/update-catalog-audit-6.ts (the DB runner lives there).
 *
 * Guide-prices pass, 2026-10-25. UPDATE-only, keyed by slug:
 *   - slug rename: Mistral renamed Le Chat to Vibe (mistral.ai, checked
 *     today), so the row moves from `mistral-ai-le-chat` to `mistral-vibe`
 *     and gets the new name. The old URL 301s (src/lib/catalog-redirects.ts);
 *     the fact file is src/data/facts/mistral-vibe.ts;
 *   - field patches: pricing / free-tier prose for the rows whose fact
 *     files were added or re-checked today (Mistral Vibe, Read AI, n8n,
 *     Inworld AI), so the DB says what the page shows. Fact files already
 *     override these on every page and in the feed; this keeps the row
 *     itself from going stale;
 *   - guarded text fixes: replace `description` / `primaryUse` only while
 *     they still name "Le Chat" without the new name (the stored text was
 *     not available to this audit);
 *   - name references: other rows point at platforms by name in four
 *     String[] columns; the old Mistral names are rewritten to the new one
 *     with audit 3's `rewriteNameRefs`, so related links don't vanish.
 *
 * PlayHT's costTier is deliberately NOT changed. The Prisma CostTier enum
 * (FREE | FREEMIUM | PAID | ENTERPRISE) has no value for a product that no
 * longer exists, and no discontinued row (Sora 2, Kakao Brain (Karlo),
 * PlayHT) has ever been moved off its tier; any of the four values would be
 * a new false claim. Instead every reader-facing surface masks it: the feed
 * and MCP report `DISCONTINUED` (publicCostTier in
 * src/lib/public-data/serialize.ts), cards show the Discontinued badge
 * (costBadge), and Discover's cost filters exclude discontinued tools.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-6.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-25";

const MISTRAL_PRODUCT_URL = "https://mistral.ai/products/le-chat";
const MISTRAL_PRICING_URL = "https://mistral.ai/pricing";

export type Audit6SlugRename = {
  from: string;
  to: string;
  finding: string;
  sources: string[];
  checkedAt: string;
};

export const AUDIT_6_SLUG_RENAMES: Audit6SlugRename[] = [
  {
    from: "mistral-ai-le-chat",
    to: "mistral-vibe",
    finding: "Le Chat is now Vibe (official product page: \"Mistral Vibe (formerly Le Chat)\")",
    sources: [MISTRAL_PRODUCT_URL],
    checkedAt: CHECKED_AT,
  },
];

export type Audit6TextField = "name" | "currentPricing" | "freeTierFeatures";
export type Audit6GuardedField = "description" | "primaryUse";
export type Audit6Field = Audit6TextField | Audit6GuardedField | RefField;

export type Audit6Patch = {
  /** The slug after any rename in AUDIT_6_SLUG_RENAMES. */
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit6TextField, string>>;
  /** Replace the field with `to` only while it contains `ifContains` and not `unless`. */
  guarded?: Partial<Record<Audit6GuardedField, { ifContains: string; unless: string; to: string }>>;
};

export const AUDIT_6_PATCHES: Audit6Patch[] = [
  {
    slug: "mistral-vibe",
    finding: "Renamed Le Chat -> Vibe; Pro $14.99/mo and Team $24.99/user/mo re-checked",
    sources: [MISTRAL_PRODUCT_URL, MISTRAL_PRICING_URL],
    checkedAt: CHECKED_AT,
    fields: {
      name: "Mistral Vibe",
      currentPricing:
        "Free $0; Pro $14.99/mo excluding taxes (verified students $5.99/mo for up to 12 months); Team $24.99/user/mo excluding taxes; Enterprise custom (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free plan: limited messages, web searches and coding sessions (official, as of 2026-10-25)",
    },
    guarded: {
      description: {
        ifContains: "Le Chat",
        unless: "Vibe",
        to: "Mistral Vibe, formerly Le Chat, is Mistral AI's assistant for chat, questions about uploaded documents, web search and multi-step tasks. Mistral says conversations, settings and plans carried over in the rename (official, as of 2026-10-25).",
      },
      primaryUse: {
        ifContains: "Le Chat",
        unless: "Vibe",
        to: "AI assistant for chat, documents, web search and multi-step tasks (formerly Le Chat)",
      },
    },
  },
  {
    slug: "read-ai",
    finding: "Re-checked plans: Free 5 transcripts/mo; Pro $15/user/mo annual ($19.75 monthly); Enterprise $22.50/$29.75; Enterprise+ $29.75/$39.75",
    sources: ["https://www.read.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $15/user/mo billed annually ($19.75 billed monthly); Enterprise $22.50/user/mo billed annually ($29.75 monthly); Enterprise+ $29.75/user/mo billed annually ($39.75 monthly) (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free, no card: 5 meeting transcripts and 30 measured meetings per month, meetings up to 1 hour, no audio or video uploads (official, as of 2026-10-25)",
    },
  },
  {
    slug: "n8n",
    finding: "Free only when self-hosted (Community edition); Cloud Starter €20/mo and Pro €50/mo billed annually; no free Cloud plan",
    sources: ["https://n8n.io/pricing/", "https://docs.n8n.io/hosting/community-edition-features/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Self-hosted Community edition: free (you run it yourself); Cloud Starter €20/mo and Cloud Pro €50/mo billed annually; Business (self-hosted) €667/mo billed annually; Enterprise custom (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free only if you self-host: the Community edition is free with almost the full feature set. n8n Cloud has no free plan, only a trial with no card required (official, as of 2026-10-25)",
    },
  },
  {
    slug: "inworld-ai",
    finding: "Voice cloning on the free On-Demand plan (replaces PlayHT in the voice workflow); plans re-checked",
    sources: ["https://inworld.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "On-Demand $0, pay as you go; Creator $25/mo; Builder $100/mo; Developer $300/mo; Growth $1,500/mo; Enterprise custom (official, as of 2026-10-25)",
      freeTierFeatures:
        "On-Demand: $0 to start, pay as you go; includes voice cloning and voice design with 2 professional voice clones (payment method needed before creating a professional clone) (official, as of 2026-10-25)",
    },
  },
];

/** Old database names of renamed rows -> new name, for the reference columns. */
export const AUDIT_6_NAME_RENAMES: NameRename[] = [
  { from: "Mistral AI (Le Chat)", to: "Mistral Vibe" },
  { from: "Le Chat", to: "Mistral Vibe" },
  { from: "Mistral Le Chat", to: "Mistral Vibe" },
  { from: "Mistral AI Le Chat", to: "Mistral Vibe" },
];

export type SlugRenamePlan = "rename" | "done" | "conflict" | "missing";

/** What to do for a rename, given which slugs exist. Never guesses on a conflict. */
export function planSlugRename(fromExists: boolean, toExists: boolean): SlugRenamePlan {
  if (fromExists && !toExists) return "rename";
  if (!fromExists && toExists) return "done";
  if (fromExists && toExists) return "conflict";
  return "missing";
}

export type Audit6Row = {
  name: string;
  description: string | null;
  primaryUse: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
};

export type Audit6Diff = { field: Audit6TextField | Audit6GuardedField; to: string };

/** Fields that differ once the patch is applied. Empty when the row already matches. */
export function diffAudit6(row: Audit6Row, patch: Audit6Patch): Audit6Diff[] {
  const diffs: Audit6Diff[] = [];
  for (const field of ["name", "currentPricing", "freeTierFeatures"] as const) {
    const to = patch.fields[field];
    if (to !== undefined && row[field] !== to) diffs.push({ field, to });
  }
  for (const field of ["description", "primaryUse"] as const) {
    const fix = patch.guarded?.[field];
    const current = row[field];
    if (!fix || !current) continue;
    if (current.includes(fix.ifContains) && !current.includes(fix.unless) && current !== fix.to) {
      diffs.push({ field, to: fix.to });
    }
  }
  return diffs;
}

export type Audit6RefRow = Record<RefField, string[]>;

/** New values for the reference columns of one row; empty when nothing names an old name. */
export function audit6RefUpdates(row: Audit6RefRow): { field: RefField; to: string[]; changes: number }[] {
  return REF_FIELDS.flatMap((field) => {
    const { next, changes } = rewriteNameRefs(row[field], AUDIT_6_NAME_RENAMES);
    return changes.length ? [{ field, to: next, changes: changes.length }] : [];
  });
}

/** Prisma `data` for an update: only the differing fields. */
export function audit6UpdateData(diffs: readonly Audit6Diff[]): Partial<Record<Audit6Diff["field"], string>> {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to]));
}

/** Slug a patch is read from before its rename has been applied (dry runs). */
export function preRenameSlug(slug: string): string {
  return AUDIT_6_SLUG_RENAMES.find((r) => r.to === slug)?.from ?? slug;
}
