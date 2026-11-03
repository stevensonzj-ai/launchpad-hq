/**
 * Platforms that were removed from the public catalog and must never be
 * recreated or made visible again by a script, seed or generated SQL.
 *
 * hedra: hidden at the vendor's request (catalog audit 30, 2026-11-01). It is
 * hidden by a fact-file `visibility: "hidden"` plus a 301 in
 * HIDDEN_PAGE_REDIRECTS (src/lib/catalog-redirects.ts); the database row, if
 * one exists, is kept so the change stays reversible by a human.
 *
 * Kept free of Prisma, dotenv and app imports so scripts and tests can use it.
 * Lifting a removal is a deliberate edit to this list, reviewed in a PR.
 */
export const REMOVED_PLATFORM_SLUGS: readonly string[] = ["hedra"];

export function isRemovedPlatformSlug(slug: unknown): boolean {
  return typeof slug === "string" && REMOVED_PLATFORM_SLUGS.includes(slug.trim().toLowerCase());
}

export type PlatformWriteKind = "create" | "update";

/** Data keys that would make a platform visible again if a column for them existed. */
function unhides(data: Record<string, unknown>): boolean {
  if ("visibility" in data && data.visibility !== "hidden") return true;
  if ("isHidden" in data && data.isHidden !== true) return true;
  if ("hidden" in data && data.hidden !== true) return true;
  if ("listed" in data && data.listed === true) return true;
  return false;
}

/**
 * Throws if a write would create a removed slug, rename a row to or from one,
 * or set a removed platform visible. Other slugs, and other field updates to a
 * removed row, pass. `slug` is the row being written (for `create`, the new slug).
 */
export function assertNotRemovedForWrite(
  slug: string | null | undefined,
  data: Record<string, unknown> | null | undefined = {},
  kind: PlatformWriteKind = "update",
): void {
  const d = data ?? {};
  if (kind === "create" && isRemovedPlatformSlug(slug)) {
    throw new Error(`Refusing to create platform "${slug}": it is on the removed-platform denylist (src/lib/catalog/removed-slugs.ts).`);
  }
  if ("slug" in d && isRemovedPlatformSlug(d.slug)) {
    throw new Error(`Refusing to write slug "${String(d.slug)}": it is on the removed-platform denylist.`);
  }
  if (isRemovedPlatformSlug(slug)) {
    if ("slug" in d && d.slug !== slug) {
      throw new Error(`Refusing to rename removed platform "${slug}".`);
    }
    if (unhides(d)) {
      throw new Error(`Refusing to unhide removed platform "${slug}".`);
    }
  }
}

type Obj = Record<string, unknown>;
const asObj = (v: unknown): Obj | undefined => (v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : undefined);
const whereSlug = (where: unknown): string | undefined => {
  const w = asObj(where);
  if (!w) return undefined;
  if (typeof w.slug === "string") return w.slug;
  const s = asObj(w.slug);
  if (s && typeof s.equals === "string") return s.equals;
  return undefined;
};

/**
 * Checks the arguments of a Prisma `platform` operation. Throws on any write
 * that would create, rename to/from or unhide a removed slug. Reads pass.
 */
export function assertPlatformOperationAllowed(operation: string, args: unknown): void {
  const a = asObj(args) ?? {};
  switch (operation) {
    case "create":
    case "createManyAndReturn":
    case "createMany": {
      const rows = Array.isArray(a.data) ? a.data : [a.data];
      for (const row of rows) {
        const r = asObj(row) ?? {};
        assertNotRemovedForWrite(typeof r.slug === "string" ? r.slug : undefined, r, "create");
      }
      return;
    }
    case "upsert": {
      const c = asObj(a.create) ?? {};
      assertNotRemovedForWrite(typeof c.slug === "string" ? c.slug : whereSlug(a.where), c, "create");
      assertNotRemovedForWrite(whereSlug(a.where), asObj(a.update), "update");
      return;
    }
    case "update":
    case "updateMany":
    case "updateManyAndReturn":
      assertNotRemovedForWrite(whereSlug(a.where), asObj(a.data), "update");
      return;
    default:
      return;
  }
}

const WRITE_OPERATIONS = new Set([
  "create",
  "createMany",
  "createManyAndReturn",
  "upsert",
  "update",
  "updateMany",
  "updateManyAndReturn",
]);

type AllOps = { operation: string; args: unknown; query: (a: unknown) => Promise<unknown> };

/**
 * Wraps a PrismaClient so every `platform` write passes through the denylist,
 * including calls inside `$transaction`. Scripts only:
 *   const prisma = guardPlatformWrites(new PrismaClient({ adapter }));
 * The return type equals the input type, so call sites do not change.
 */
export function guardPlatformWrites<T extends object>(client: T): T {
  const extendable = client as unknown as { $extends: (ext: unknown) => unknown };
  return extendable.$extends({
    name: "removed-platform-denylist",
    query: {
      platform: {
        async $allOperations({ operation, args, query }: AllOps) {
          if (WRITE_OPERATIONS.has(operation)) assertPlatformOperationAllowed(operation, args);
          return query(args);
        },
      },
    },
  }) as T;
}

/** Throws if any slug is on the denylist. For seed arrays and generated-SQL inputs. */
export function assertNoRemovedSlugs(slugs: readonly (string | null | undefined)[], context = "input"): void {
  for (const s of slugs) {
    if (isRemovedPlatformSlug(s)) throw new Error(`Removed platform "${s}" found in ${context}.`);
  }
}
