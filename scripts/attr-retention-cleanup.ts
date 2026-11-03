/**
 * First-touch attribution retention: delete rows older than 12 months.
 * Same statement as scripts/sql/attr-retention-cleanup.sql.
 *
 * OPERATOR ONLY. Deletes from whichever database DATABASE_URL points at, so it
 * refuses to run unless CONFIRM_DELETE=1. Prints only the deleted count. No cron.
 *
 *   CONFIRM_DELETE=1 npm run db:attr-retention-cleanup
 */
import "dotenv/config";

async function main() {
  if (process.env.CONFIRM_DELETE !== "1") {
    console.error("Refusing to run: set CONFIRM_DELETE=1 to delete first-touch rows older than 12 months.");
    process.exitCode = 1;
    return;
  }
  // Imported only after the guard so a refused run never builds a DB client.
  const { prisma } = await import("../src/lib/db");
  try {
    const deleted = await prisma.$executeRaw`DELETE FROM "first_touch_attributions" WHERE "createdAt" < now() - interval '12 months'`;
    console.log(`Deleted ${deleted} row(s).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error("Cleanup failed.");
  process.exitCode = 1;
});
