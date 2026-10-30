import { planSlugRename, type SlugRenamePlan } from "./audit-6";
import { REF_FIELDS, rewriteNameRefs, type NameRename, type RefField } from "./audit-3-refs";

/**
 * Catalog audit #22 — held renames, 2026-10-30. UPDATE-only, keyed by slug:
 *   - slug renames (each confirmed on the vendor's own pages today):
 *       shopify-magic-sidekick -> shopify-sidekick
 *       salesforce-einstein    -> salesforce-agentforce
 *     The old URLs 301 (src/lib/catalog-redirects.ts); the fact files and
 *     guides moved with them;
 *   - name-only renames, slug kept: google-lyria-3 (Google Lyria 3.5),
 *     quizlet-q-chat (Ask Quizlet), gpt-image-1-5-dall-e-successor (GPT Image
 *     2.5 (DALL-E successor)). Their slugs stay because the MCP server's name
 *     aliases (src/lib/mcp/names.ts) point at them, and this audit changes
 *     nothing under src/lib/mcp;
 *   - name / website: written only while the row still holds the expected
 *     old value, so a hand edit is never overwritten;
 *   - name references: other rows' exact old names (and their parenthetical
 *     variants) are rewritten with audit 3's `rewriteNameRefs`.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-22.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-30";

export type Audit22Rename = {
  /** Current slug; equal to `to` for a name-only rename. */
  from: string;
  to: string;
  /** New display name, equal to the fact file's displayName. */
  name: string;
  /** Row names this audit may overwrite (the old name). */
  oldNames: string[];
  /** New official link, or undefined to leave `website` alone. */
  website?: string;
  /** Row websites this audit may overwrite. */
  oldWebsites?: string[];
  finding: string;
  sources: string[];
  checkedAt: string;
};

export const AUDIT_22_RENAMES: Audit22Rename[] = [
  {
    from: "shopify-magic-sidekick",
    to: "shopify-sidekick",
    name: "Shopify Sidekick",
    oldNames: ["Shopify Magic / Sidekick"],
    website: "https://www.shopify.com/sidekick",
    oldWebsites: ["https://shopify.com/magic"],
    finding: "shopify.com/magic redirects to shopify.com/sidekick, which presents Shopify's AI as Sidekick (\"AI-enabled commerce assistant\")",
    sources: ["https://www.shopify.com/sidekick"],
    checkedAt: CHECKED_AT,
  },
  {
    from: "salesforce-einstein",
    to: "salesforce-agentforce",
    name: "Salesforce Agentforce",
    oldNames: ["Salesforce Einstein"],
    website: "https://www.salesforce.com/agentforce/",
    oldWebsites: ["https://salesforce.com/einstein"],
    finding: "Salesforce's agent product page: \"Agentforce (formerly Einstein Copilot)\"; salesforce.com/einstein redirects to its AI page",
    sources: ["https://www.salesforce.com/agentforce/", "https://www.salesforce.com/artificial-intelligence/"],
    checkedAt: CHECKED_AT,
  },
  {
    from: "google-lyria-3",
    to: "google-lyria-3",
    name: "Google Lyria 3.5",
    oldNames: ["Google Lyria 3"],
    finding: "The Lyria model page is titled \"Lyria 3.5 — Google DeepMind\" and introduces Lyria 3.5 as the newest model",
    sources: ["https://deepmind.google/models/lyria/"],
    checkedAt: CHECKED_AT,
  },
  {
    from: "quizlet-q-chat",
    to: "quizlet-q-chat",
    name: "Ask Quizlet",
    oldNames: ["Quizlet Q-Chat"],
    finding: "Quizlet's help centre documents Ask Quizlet as its AI study tool (US, 14+); it has no Q-Chat article",
    sources: ["https://help.quizlet.com/hc/en-us/articles/42790350723725-Studying-with-Ask-Quizlet"],
    checkedAt: CHECKED_AT,
  },
  {
    from: "gpt-image-1-5-dall-e-successor",
    to: "gpt-image-1-5-dall-e-successor",
    name: "GPT Image 2.5 (DALL-E successor)",
    oldNames: ["GPT Image 1.5 (DALL-E successor)"],
    finding: "OpenAI's model list shows GPT-Image-2.5 (Flare, Sunburst) as the current image models; GPT Image 1.5 is deprecated",
    sources: ["https://developers.openai.com/api/docs/models", "https://developers.openai.com/api/docs/pricing"],
    checkedAt: CHECKED_AT,
  },
];

/** Exact old names other rows use, and their parenthetical variants. */
export const AUDIT_22_NAME_RENAMES: NameRename[] = [
  { from: "Shopify Magic / Sidekick", to: "Shopify Sidekick" },
  { from: "Shopify Magic (e-commerce)", to: "Shopify Sidekick (e-commerce)" },
  { from: "Shopify Magic (for e-commerce)", to: "Shopify Sidekick (for e-commerce)" },
  { from: "Salesforce Einstein", to: "Salesforce Agentforce" },
  { from: "Salesforce Einstein (CRM)", to: "Salesforce Agentforce (CRM)" },
  { from: "Salesforce Einstein (enterprise)", to: "Salesforce Agentforce (enterprise)" },
  { from: "Google Lyria 3", to: "Google Lyria 3.5" },
  { from: "Google Lyria 3 (music)", to: "Google Lyria 3.5 (music)" },
  { from: "Google Lyria 3 (audio)", to: "Google Lyria 3.5 (audio)" },
  { from: "Quizlet Q-Chat", to: "Ask Quizlet" },
  { from: "Quizlet Q-Chat (study)", to: "Ask Quizlet (study)" },
  { from: "Quizlet Q-Chat (flashcards)", to: "Ask Quizlet (flashcards)" },
  { from: "GPT Image 1.5 (DALL-E successor)", to: "GPT Image 2.5 (DALL-E successor)" },
  { from: "GPT Image 1.5", to: "GPT Image 2.5" },
  { from: "GPT Image 1.5 (stills)", to: "GPT Image 2.5 (stills)" },
];

export { planSlugRename, type SlugRenamePlan };

export type Audit22Row = { name: string; website: string | null };
export type Audit22Field = "name" | "website";
export type Audit22FieldPlan =
  | { field: Audit22Field; action: "update"; to: string }
  | { field: Audit22Field; action: "already" | "differs" };

/** Per-field plan for one renamed row; writes only from an expected old value. */
export function planAudit22Fields(row: Audit22Row, rename: Audit22Rename): Audit22FieldPlan[] {
  const plans: Audit22FieldPlan[] = [];
  const decide = (field: Audit22Field, current: string | null, to: string, olds: readonly string[]) => {
    if (current === to) plans.push({ field, action: "already" });
    else if (current !== null && olds.includes(current)) plans.push({ field, action: "update", to });
    else plans.push({ field, action: "differs" });
  };
  decide("name", row.name, rename.name, rename.oldNames);
  if (rename.website) decide("website", row.website, rename.website, rename.oldWebsites ?? []);
  return plans;
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit22UpdateData(plans: readonly Audit22FieldPlan[]): Partial<Record<Audit22Field, string>> {
  return Object.fromEntries(plans.flatMap((p) => (p.action === "update" ? [[p.field, p.to]] : [])));
}

export type Audit22RefRow = Record<RefField, string[]>;

/** New values for the reference columns of one row; empty when nothing names an old name. */
export function audit22RefUpdates(row: Audit22RefRow): { field: RefField; to: string[]; changes: number }[] {
  return REF_FIELDS.flatMap((field) => {
    const { next, changes } = rewriteNameRefs(row[field], AUDIT_22_NAME_RENAMES);
    return changes.length ? [{ field, to: next, changes: changes.length }] : [];
  });
}

/** Slug a rename target is read from before its rename has been applied (dry runs). */
export function preRenameSlug22(slug: string): string {
  return AUDIT_22_RENAMES.find((r) => r.to === slug)?.from ?? slug;
}
