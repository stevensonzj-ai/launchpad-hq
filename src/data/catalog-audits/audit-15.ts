import { planSlugRename, type SlugRenamePlan } from "./audit-6";
import { REF_FIELDS, rewriteNameRefs, type NameRename, type RefField } from "./audit-3-refs";

/**
 * Catalog audit #15 — guide PR D renames, 2026-10-29. UPDATE-only, keyed by
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
 *     `rewriteNameRefs`.
 *
 * Clarifai is unpublished in code only (src/data/facts/clarifai.ts sets
 * visibility "hidden"; its guide 301s). This audit deliberately leaves the
 * clarifai row and every reference to it untouched, so the hide is undone by
 * reverting code, with nothing to restore in the database.
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
