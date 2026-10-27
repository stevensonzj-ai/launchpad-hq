import * as fs from "fs";
import * as path from "path";
import type { CatalogRow } from "./tools";

/**
 * TESTS ONLY. The committed catalog snapshot (catalog-snapshot.json): every
 * listed row, rebuilt offline by scripts/mcp-snapshot/build-catalog-snapshot.ts
 * from the repo's seed and audit data plus the 2026-10-15 export. The 46-row
 * search fixtures hide whole-catalog regressions (#102's Read AI loss); golden
 * and replay tests run here instead. Read with fs so tsc never types 400 KB of
 * JSON.
 */
export type CatalogSnapshot = {
  note: string;
  built_from: string;
  db_rows: number;
  hidden_rows: string[];
  rows: CatalogRow[];
};

let cached: CatalogSnapshot | null = null;

export function loadSnapshot(): CatalogSnapshot {
  cached ??= JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "lib", "mcp", "catalog-snapshot.json"), "utf8"),
  ) as CatalogSnapshot;
  return cached;
}

export function snapshotRows(): CatalogRow[] {
  return loadSnapshot().rows;
}
