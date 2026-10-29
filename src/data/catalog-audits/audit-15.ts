import { planSlugRename, type SlugRenamePlan } from "./audit-6";
import { REF_FIELDS, rewriteNameRefs, type NameRename, type RefField } from "./audit-3-refs";

/**
 * Catalog audit #15 — guide PR D renames and row patches, 2026-10-29. UPDATE-only, keyed by
 * slug:
 *   - slug renames (each confirmed on the vendor's own pages today):
 *       google-vertex-ai                -> gemini-enterprise-agent-platform
 *       google-imagen-3                 -> nano-banana
 *       text-generation-webui-oobabooga -> textgen
 *       notebooklm                      -> gemini-notebook
 *     The old URLs 301 (src/lib/catalog-redirects.ts); the fact files are
 *     src/data/facts/<new slug>.ts and the guides moved with them;
 *   - name / website: written only while the row still holds the expected
 *     old value, so a hand edit is never overwritten (Gemini Notebook's
 *     name and website were already updated by audit 3);
 *   - name references: other rows point at platforms by name in four
 *     String[] columns; exact old names (and their parenthetical variants,
 *     which never linked but read stale) are rewritten with audit 3's
 *     `rewriteNameRefs`;
 *   - row patches (AUDIT_15_PATCHES): Tabnine's pricing claims removed (no
 *     standalone plans since the Tricentis acquisition), and Scite, Lindy
 *     and Activepieces pricing text matched to the vendor pages. Text
 *     fields are written only where they differ; costTier only while the row
 *     still has the expected old value;
 *   - ref removals: "Tabnine" dropped from the two rows that recommend it.
 *
 * Clarifai is unpublished in code only (src/data/facts/clarifai.ts sets
 * visibility "hidden"; its guide 301s). This audit changes nothing about
 * Clarifai: its slug, name, text and visibility stay as they are, and other
 * rows' references to it are kept, so the hide is undone by reverting code,
 * with nothing to restore in the database. (Its own alternatives column
 * names "Google Vertex AI", and that entry is renamed like every other row's.)
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-15.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-29";

export type Audit15Rename = {
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

export const AUDIT_15_RENAMES: Audit15Rename[] = [
  {
    from: "google-vertex-ai",
    to: "gemini-enterprise-agent-platform",
    name: "Gemini Enterprise Agent Platform",
    oldNames: ["Google Vertex AI"],
    website: "https://cloud.google.com/products/gemini-enterprise-agent-platform",
    oldWebsites: ["https://cloud.google.com/vertex-ai"],
    finding: "Release notes, April 22, 2026: \"Vertex AI is now part of Gemini Enterprise Agent Platform\"; cloud.google.com/vertex-ai redirects to the new product page",
    sources: [
      "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes",
      "https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes",
      "https://cloud.google.com/products/gemini-enterprise-agent-platform",
    ],
    checkedAt: CHECKED_AT,
  },
  {
    from: "google-imagen-3",
    to: "nano-banana",
    name: "Nano Banana",
    oldNames: ["Google Imagen 3"],
    website: "https://gemini.google/overview/image-generation/",
    oldWebsites: ["https://deepmind.google/technologies/imagen-3/", "https://deepmind.google/models/gemini-image/"],
    finding: "Gemini API docs: \"Imagen models are shut down. Use Nano Banana for image generation.\"",
    sources: [
      "https://ai.google.dev/gemini-api/docs/imagen",
      "https://ai.google.dev/gemini-api/docs/image-generation",
      "https://gemini.google/overview/image-generation/",
    ],
    checkedAt: CHECKED_AT,
  },
  {
    from: "text-generation-webui-oobabooga",
    to: "textgen",
    name: "TextGen",
    oldNames: ["Text Generation WebUI (oobabooga)"],
    website: "https://github.com/oobabooga/textgen",
    oldWebsites: ["https://github.com/oobabooga/text-generation-webui"],
    finding: "The repository is now oobabooga/textgen (README heading \"TextGen\"); the old address redirects there",
    sources: ["https://github.com/oobabooga/textgen"],
    checkedAt: CHECKED_AT,
  },
  {
    from: "notebooklm",
    to: "gemini-notebook",
    name: "Gemini Notebook",
    oldNames: ["NotebookLM"],
    finding: "Google blog, July 16, 2026: \"NotebookLM is now Gemini Notebook\"; notebooklm.google.com redirects to notebook.google.com",
    sources: ["https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/"],
    checkedAt: CHECKED_AT,
  },
];

/** Old names as they appear in other rows' reference columns -> new text. */
export const AUDIT_15_NAME_RENAMES: NameRename[] = [
  { from: "Google Vertex AI", to: "Gemini Enterprise Agent Platform" },
  { from: "Google Vertex AI (free tier)", to: "Gemini Enterprise Agent Platform (free tier)" },
  { from: "Google Vertex AI (ML pipeline)", to: "Gemini Enterprise Agent Platform (ML pipeline)" },
  { from: "Google Imagen 3", to: "Nano Banana" },
  { from: "Google Imagen 3 (images)", to: "Nano Banana (images)" },
  { from: "Google Imagen 3 (stills)", to: "Nano Banana (stills)" },
  { from: "Text Generation WebUI (oobabooga)", to: "TextGen" },
  { from: "NotebookLM", to: "Gemini Notebook" },
  { from: "NotebookLM (free)", to: "Gemini Notebook (free)" },
  { from: "NotebookLM (doc research)", to: "Gemini Notebook (doc research)" },
];

export { planSlugRename, type SlugRenamePlan };

export type Audit15Row = { name: string; website: string | null };
export type Audit15Field = "name" | "website";
export type Audit15FieldPlan =
  | { field: Audit15Field; action: "update"; to: string }
  | { field: Audit15Field; action: "already" | "differs" };

/**
 * Per-field plan for one renamed row. A field is written only while it holds
 * an expected old value; one that already has the new value is "already",
 * anything else (a hand edit) is "differs" and left alone.
 */
export function planAudit15Fields(row: Audit15Row, rename: Audit15Rename): Audit15FieldPlan[] {
  const plans: Audit15FieldPlan[] = [];
  const decide = (field: Audit15Field, current: string | null, to: string, olds: readonly string[]) => {
    if (current === to) plans.push({ field, action: "already" });
    else if (current !== null && olds.includes(current)) plans.push({ field, action: "update", to });
    else plans.push({ field, action: "differs" });
  };
  decide("name", row.name, rename.name, rename.oldNames);
  if (rename.website) decide("website", row.website, rename.website, rename.oldWebsites ?? []);
  return plans;
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit15UpdateData(plans: readonly Audit15FieldPlan[]): Partial<Record<Audit15Field, string>> {
  return Object.fromEntries(plans.flatMap((p) => (p.action === "update" ? [[p.field, p.to]] : [])));
}

export type Audit15RefRow = Record<RefField, string[]>;

/** New values for the reference columns of one row; empty when nothing names an old name. */
export function audit15RefUpdates(row: Audit15RefRow): { field: RefField; to: string[]; changes: number }[] {
  return REF_FIELDS.flatMap((field) => {
    const { next, changes } = rewriteNameRefs(row[field], AUDIT_15_NAME_RENAMES);
    return changes.length ? [{ field, to: next, changes: changes.length }] : [];
  });
}

/** Slug a rename target is read from before its rename has been applied (dry runs). */
export function preRenameSlug15(slug: string): string {
  return AUDIT_15_RENAMES.find((r) => r.to === slug)?.from ?? slug;
}

// ---------- row patches (guide PR D follow-up, RA-verified 2026-10-29) ----------

export type Audit15PatchField =
  | "description"
  | "primaryUse"
  | "currentPricing"
  | "freeTierFeatures"
  | "usageLimits";

export type Audit15Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  /** Text fields set to exactly this value (null clears); written only where they differ. */
  fields: Partial<Record<Audit15PatchField, string | null>>;
  /** Changes only while the row still has `from` (a hand edit is left alone). */
  costTier?: { from: string; to: string };
};

const TRICENTIS_NEWS = "https://www.tricentis.com/news/tricentis-acquires-tabnine";
const TABNINE_BLOG = "https://www.tabnine.com/blog/a-new-chapter-for-tabnine/";
const SCITE_PRICING = "https://scite.ai/pricing";
const LINDY_PRICING = "https://www.lindy.ai/pricing";
const ACTIVEPIECES_PRICING = "https://www.activepieces.com/pricing";

/**
 * Pricing rows the vendor pages contradict. Tabnine's pricing claims are
 * removed (no standalone plans are sold since the Tricentis acquisition;
 * src/data/facts/tabnine.ts carries the "what happened" notice). The other
 * rows are brought in line with the fact files and pricing pages. Canva was
 * re-checked the same day and its row already matches (audits 10 and 11), so
 * only its fact file changed; patching it here would make a re-run of those
 * audits revert it.
 */
export const AUDIT_15_PATCHES: Audit15Patch[] = [
  {
    slug: "tabnine",
    finding: "Acquired by Tricentis (2026-07-30); tabnine.com redirects to Tricentis and no standalone plans or prices are published, but the row still listed Free and Pro $12/user/mo",
    sources: [TRICENTIS_NEWS, TABNINE_BLOG],
    checkedAt: CHECKED_AT,
    fields: {
      primaryUse: "No longer sold on its own: former AI coding assistant, now part of Tricentis",
      description:
        "Tabnine was an AI coding assistant for code completion and chat in the editor. Tricentis announced on July 30, 2026 that it had acquired Tabnine and would build Tabnine's Enterprise Context Engine into its Agentic Quality Engineering Platform.",
      currentPricing:
        "No standalone plans or prices. Tabnine is now part of Tricentis, and tabnine.com redirects to Tricentis (as of 2026-10-29).",
      freeTierFeatures: "None: Tabnine is no longer sold as a standalone product",
      usageLimits: null,
    },
  },
  {
    slug: "scite",
    finding: "Row listed a free tier and Premium $20/mo; the pricing page has no free plan, only Basic and Pro billed yearly (with a 7-day trial) and Enterprise",
    sources: [SCITE_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "No free plan. Basic $12/mo billed yearly; Pro $40/mo billed yearly (adds API access); Enterprise custom. Basic and Pro start with a 7-day free trial (official, as of 2026-10-29)",
      freeTierFeatures:
        "No free plan. Basic and Pro start with a 7-day free trial, then the chosen plan is billed (official, as of 2026-10-29)",
      usageLimits:
        "Basic: 250 MCP credits/mo; Pro: 2,500 MCP credits/mo plus API access; Enterprise: unlimited users with pooled usage. The trial's MCP credits are not stated (official, as of 2026-10-29)",
    },
    costTier: { from: "FREEMIUM", to: "PAID" },
  },
  {
    slug: "lindy-ai",
    finding: "Row listed Team $29.99/mo for 3,000 credits and retired Starter/Pro limits; the pricing page shows Team from $49.99/mo per active user for 5,000 credits",
    sources: [LINDY_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "$50 in free credits lasting 7 days (no card). Team from $49.99/mo per active user for 5,000 credits, in tiers up to 1,750,000 credits for $9,999.50; top-ups $10 per 1,000 credits; Enterprise custom. Billed monthly; no annual plan is listed (official lindy.ai/pricing, as of 2026-10-29).",
      freeTierFeatures: "No ongoing free plan. $50 in free credits, last 7 days, no credit card (official, as of 2026-10-29)",
      usageLimits:
        "Free credits: $50, last 7 days; Team: from 5,000 credits per active user a month, pooled across the workspace; Enterprise: custom credits (official, as of 2026-10-29)",
    },
  },
  {
    slug: "activepieces",
    finding: "Free tier: the pricing table lists 1,000 credits a month with a daily reset (the page's FAQ is inconsistent: monthly in one answer, next day in another)",
    sources: [ACTIVEPIECES_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0 (1,000 credits a month, refreshing daily); Plus $20/mo flat (10,000 credits/mo, then $0.007/credit); Team $200/mo flat (50,000 credits/mo, 25 users); Ultimate custom; Embed from $36k/year (as of 2026-10-29)",
      freeTierFeatures:
        "Free forever, no card: 1,000 credits a month, refreshing daily (per the pricing table), unlimited flows, up to 5 users (as of 2026-10-29)",
      usageLimits:
        "Cloud Free: 1,000 credits a month, refreshing daily (runs past the quota wait for the next day); Plus: 10,000 credits/mo; Team: 50,000 credits/mo; Ultimate: yearly pool; self-hosted Community Edition is free (as of 2026-10-29)",
    },
  },
];

/** Tabnine is no longer sold, so other rows stop recommending it. */
export const AUDIT_15_REF_REMOVALS: { slug: string; field: RefField; value: string }[] = [
  { slug: "amazon-q-developer", field: "directAlternatives", value: "Tabnine" },
  { slug: "github-copilot", field: "directAlternatives", value: "Tabnine" },
  { slug: "github-copilot", field: "budgetAlternativeTo", value: "Tabnine" },
];

export type Audit15PatchRow = Record<Audit15PatchField, string | null> & { costTier: string };

/** Prisma `data` for one patched row: only fields that differ; costTier only from its expected old value. */
export function audit15PatchData(row: Audit15PatchRow, patch: Audit15Patch): Record<string, string | null> {
  const data: Record<string, string | null> = {};
  for (const [field, value] of Object.entries(patch.fields) as [Audit15PatchField, string | null][]) {
    if (row[field] !== value) data[field] = value;
  }
  if (patch.costTier && row.costTier === patch.costTier.from) data.costTier = patch.costTier.to;
  return data;
}

/** New value of one reference array after this audit's removals for `slug`; null when unchanged. */
export function audit15RefRemoval(slug: string, field: RefField, entries: readonly string[]): string[] | null {
  const drop = AUDIT_15_REF_REMOVALS.filter((r) => r.slug === slug && r.field === field).map((r) =>
    r.value.toLowerCase(),
  );
  if (drop.length === 0) return null;
  const next = entries.filter((e) => !drop.includes(e.toLowerCase()));
  return next.length === entries.length ? null : next;
}
