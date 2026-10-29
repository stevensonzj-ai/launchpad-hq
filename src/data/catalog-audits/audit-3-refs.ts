import { REGISTERED_TOOL_FACTS } from "../facts/registry";
import { PLATFORM_REDIRECTS } from "../../lib/catalog-redirects";

/**
 * Catalog audit #3, follow-on step: rewrite name references orphaned by the
 * renames. Platform rows point at other platforms by *name* (not slug) in
 * these four String[] columns, and platform pages resolve them with a
 * case-insensitive `name in [...]` lookup. Renaming a row without
 * rewriting the arrays makes the link silently disappear.
 */
export const REF_FIELDS = [
  "directAlternatives",
  "complementaryTools",
  "budgetAlternativeTo",
  "privacyAlternativeTo",
] as const;

export type RefField = (typeof REF_FIELDS)[number];

/**
 * Old database `name` -> renamed slug. Reviewed by hand: once a row is
 * renamed the old name no longer exists anywhere in the database, so it
 * cannot be derived. (Fact-file `formerName` is display copy and does not
 * always equal the old row name, e.g. "Wonder Studio".) The new name comes
 * from the same fact-file displayName the audit-3 rename writes.
 */
export const AUDIT_3_OLD_NAMES: ReadonlyArray<{ oldName: string; slug: string }> = [
  { oldName: "Windsurf", slug: "windsurf" },
  { oldName: "Unriddle", slug: "unriddle" },
  { oldName: "NotebookLM", slug: "notebooklm" },
  { oldName: "Casetext (CoCounsel)", slug: "casetext-cocounsel" },
  { oldName: "Kira Systems", slug: "kira-systems" },
  { oldName: "Wonder Dynamics (Wonder Studio)", slug: "wonder-dynamics-wonder-studio" },
  { oldName: "Lexis+ AI", slug: "lexis-plus-ai" },
];

export type NameRename = { from: string; to: string };

export function audit3NameRenames(): NameRename[] {
  return AUDIT_3_OLD_NAMES.map(({ oldName, slug }) => {
    // A row renamed again later (notebooklm -> gemini-notebook, audit 15)
    // keeps its fact file under the new slug.
    const to = REGISTERED_TOOL_FACTS[PLATFORM_REDIRECTS[slug] ?? slug]?.displayName?.value;
    if (!to) throw new Error(`No displayName fact for ${slug}`);
    return { from: oldName, to };
  });
}

export type RefChange = {
  /** The entry as stored, original casing. */
  from: string;
  to: string;
  /** True when the new name was already in the array, so the old entry was removed. */
  dropped: boolean;
};

/**
 * Replace entries that case-insensitively equal an old name with the new
 * name. Order is preserved. If the new name is already present (anywhere
 * in the array, or emitted by an earlier replacement) the old entry is
 * dropped instead of duplicated. Unrelated entries, including any
 * pre-existing duplicates among them, are left exactly as they are.
 */
export function rewriteNameRefs(
  entries: readonly string[],
  renames: readonly NameRename[],
): { next: string[]; changes: RefChange[] } {
  const toByOld = new Map(renames.map((r) => [r.from.toLowerCase(), r.to]));
  const untouched = new Set(
    entries.filter((e) => !toByOld.has(e.toLowerCase())).map((e) => e.toLowerCase()),
  );
  const emitted = new Set<string>();
  const next: string[] = [];
  const changes: RefChange[] = [];

  for (const entry of entries) {
    const to = toByOld.get(entry.toLowerCase());
    if (to === undefined) {
      next.push(entry);
      continue;
    }
    const key = to.toLowerCase();
    const dropped = untouched.has(key) || emitted.has(key);
    if (!dropped) {
      next.push(to);
      emitted.add(key);
    }
    changes.push({ from: entry, to, dropped });
  }
  return { next, changes };
}
