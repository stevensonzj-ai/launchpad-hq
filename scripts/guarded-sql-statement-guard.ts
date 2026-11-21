/**
 * Workflow step: refuse a production SQL file before a snapshot is created
 * and before any database connection. See src/lib/guarded-sql/statement-guard.ts.
 */
import { readFileSync } from "node:fs";
import { guardCatalogSql } from "../src/lib/guarded-sql/statement-guard";

const file = process.env.IN_SQL_FILE || "";
let sql: string;
try {
  sql = readFileSync(file, "utf8");
} catch {
  console.error("::error::sql_file could not be read for the catalog statement guard");
  process.exit(2);
}
const result = guardCatalogSql(sql);
if (!result.ok) {
  console.error(`::error::${result.reason}`);
  process.exit(2);
}
console.log(`Catalog statement guard passed (${result.tables.join(", ") || "no tables"}).`);
