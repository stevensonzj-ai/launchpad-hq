export const DEFAULT_MAX_SNAPSHOT_AGE_HOURS = 24;

export interface ParsedArgs {
  file: string;
  dryRun: boolean;
  confirmProduction: boolean;
  snapshot: string | null;
  maxSnapshotAgeHours: number;
}

export const USAGE =
  "Usage: run-guarded-sql <file.sql> [--dry-run] [--confirm-production] " +
  "[--snapshot <branch-id>] [--max-snapshot-age-hours N (default 24)]";

export function parseArgs(argv: readonly string[]): { ok: true; args: ParsedArgs } | { ok: false; error: string } {
  let file: string | null = null;
  let dryRun = false;
  let confirmProduction = false;
  let snapshot: string | null = null;
  let maxAge = DEFAULT_MAX_SNAPSHOT_AGE_HOURS;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    const eq = a.startsWith("--") ? a.indexOf("=") : -1;
    const name = eq > 0 ? a.slice(0, eq) : a;
    const inline = eq > 0 ? a.slice(eq + 1) : undefined;
    const value = (): string | null => {
      if (inline !== undefined) return inline;
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) return null;
      i++;
      return v;
    };

    if (name === "--dry-run") dryRun = true;
    else if (name === "--confirm-production") confirmProduction = true;
    else if (name === "--snapshot") {
      const v = value();
      if (!v) return { ok: false, error: "--snapshot requires a branch id" };
      snapshot = v;
    } else if (name === "--max-snapshot-age-hours") {
      const v = value();
      const num = v === null ? NaN : Number(v);
      if (!Number.isFinite(num) || num <= 0) return { ok: false, error: "--max-snapshot-age-hours requires a positive number" };
      maxAge = num;
    } else if (a.startsWith("--")) {
      return { ok: false, error: `Unknown flag ${name}` };
    } else if (file === null) file = a;
    else return { ok: false, error: "Only one SQL file may be given" };
  }

  if (file === null) return { ok: false, error: "Missing <file.sql>" };
  return { ok: true, args: { file, dryRun, confirmProduction, snapshot, maxSnapshotAgeHours: maxAge } };
}
