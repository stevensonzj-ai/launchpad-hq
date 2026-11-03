/**
 * Weekly report of unmet website searches (read-only).
 * Same SELECT as scripts/sql/search-unmet-weekly.sql. Prints a markdown table,
 * or CSV with --csv. Only aggregate columns are shown; nothing else is stored.
 *
 *   npm run report:unmet-searches
 *   npm run report:unmet-searches -- --csv
 */
import "dotenv/config";
import { toCsv, toMarkdown, type UnmetReportRow } from "../src/lib/search/unmet-report";

async function main() {
  const { prisma } = await import("../src/lib/db");
  try {
    const rows = await prisma.$queryRaw<UnmetReportRow[]>`SELECT "normalizedQuery" AS query, "searchCount" AS searches, "noClickCount" AS no_click_searches, "lastResultCount" AS last_result_count, "firstSeen" AS first_seen, "lastSeen" AS last_seen FROM "unmet_searches" WHERE "lastSeen" >= current_date - 7 ORDER BY "searchCount" DESC LIMIT 50`;
    console.log(process.argv.includes("--csv") ? toCsv(rows) : toMarkdown(rows));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error("Report failed.");
  process.exitCode = 1;
});
