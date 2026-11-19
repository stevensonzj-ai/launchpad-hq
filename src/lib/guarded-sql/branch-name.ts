/**
 * Names for the pre-run Neon branch the Guarded SQL workflow creates.
 * Neon’s API limit is 256 characters (console is stricter; the API is the limit we hit).
 * https://neon.com/docs/manage/branches — "Maximum length: 256 characters (API limit)".
 */
export const NEON_BRANCH_NAME_MAX = 256;

/** UTC calendar day, so the name does not depend on the runner’s timezone. */
export function formatSnapshotDate(now: Date): string {
  const y = now.getUTCFullYear().toString();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

/** `scripts/sql/foo.sql` or `foo.sql` → `foo`. */
export function sqlFileStem(file: string): string {
  const base = file.split(/[/\\]/).pop() ?? file;
  return base.replace(/\.sql$/i, "");
}

/**
 * `pre-<stem>-<YYYYMMDD>`, truncated so the final name fits Neon’s limit.
 * If that name is already taken, append `-2`, `-3`, … (truncating again so the suffix still fits).
 */
export function buildSnapshotBranchName(stem: string, yyyymmdd: string, existing: Iterable<string>): string {
  if (!stem || !/^[A-Za-z0-9._-]+$/.test(stem)) {
    throw new Error("SQL file name must be letters, digits, dot, underscore or hyphen");
  }
  if (!/^[0-9]{8}$/.test(yyyymmdd)) throw new Error("snapshot date must be YYYYMMDD");
  const taken = new Set(existing);
  const prefix = "pre-";
  const dateSuffix = `-${yyyymmdd}`;
  for (let n = 1; n <= 1000; n++) {
    const collision = n === 1 ? "" : `-${n}`;
    const room = NEON_BRANCH_NAME_MAX - prefix.length - dateSuffix.length - collision.length;
    if (room < 1) throw new Error("snapshot name does not fit Neon's 256-character branch name limit");
    let body = stem.slice(0, room);
    if (body.length < stem.length) body = body.replace(/[._-]+$/g, "");
    if (!body) throw new Error("snapshot name does not fit Neon's 256-character branch name limit");
    const name = `${prefix}${body}${dateSuffix}${collision}`;
    if (name.length > NEON_BRANCH_NAME_MAX) {
      throw new Error("snapshot name exceeds Neon's 256-character branch name limit");
    }
    if (!taken.has(name)) return name;
  }
  throw new Error("could not find a free snapshot branch name");
}
