/**
 * Catalog audit #32 — Pipecat (new listing), 2026-11-02.
 *   - pipecat: new row, created only when no row has that slug, in the same
 *     category as Deepgram (ai-apis-developer-services).
 *   - deepgram: "Pipecat" is appended to complementaryTools so the Deepgram
 *     page links it; skipped when already there.
 * Each fact was read on the project's own pages on 2026-11-02.
 *
 * Row values live in src/data/catalog-audits/audit-32.ts with their sources.
 * Pricing's one home is the freeTier/plans block of src/data/facts/pipecat.ts.
 * scripts/sql/audit-32-pipecat.sql holds the same two changes as plain SQL
 * (one guarded statement per line) for a console that cannot run this script.
 *
 * Deploy first, then run this: the fact file and guide ship in code, and a
 * platform URL requested before the row exists can stay cached as a 404
 * (docs/caching.md), so run `npm run cache:revalidate` after --apply.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes rows. Creates at most one row (pipecat) and changes one
 * existing row only by appending to deepgram's complementaryTools. A re-run
 * (and a dry run after --apply) reports 0 changes. Output is slugs and counts
 * only (no values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/insert-catalog-audit-32.ts
 *   npx tsx scripts/insert-catalog-audit-32.ts --dry-run
 *   npx tsx scripts/insert-catalog-audit-32.ts --apply
 *   npm run db:insert-catalog-audit-32
 *   npm run db:insert-catalog-audit-32 -- --apply
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (covers the compute, `-pooler` variant, and full
 * FQDN). Prints the target host only. Never prints credentials. Exits if
 * no hostname parses.
 *
 * Production override (deliberate, both required): pass --confirm-production
 * AND set CONFIRM_PROD_HOST=ep-odd-mud-ajdk8f99. Either alone, or a wrong
 * value, still refuses. Dry-run stays the default; writes still need
 * --apply and still get the 5-second countdown. The decision is made in
 * src/lib/prod-guard.ts before any PrismaClient is constructed.
 * PowerShell (then `Remove-Item Env:CONFIRM_PROD_HOST`, per gate G14):
 *   $env:CONFIRM_PROD_HOST='ep-odd-mud-ajdk8f99'
 *   npx tsx scripts/insert-catalog-audit-32.ts --confirm-production
 *   npx tsx scripts/insert-catalog-audit-32.ts --confirm-production --apply
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/catalog/guarded-prisma";
import {
  CONFIRM_PROD_HOST_ENV,
  CONFIRM_PRODUCTION_FLAG,
  checkTargetHost,
} from "../src/lib/prod-guard";
import {
  DEEPGRAM_SLUG,
  PIPECAT_CATEGORY_ID,
  PIPECAT_SLUG,
  deepgramComplementaryAfter,
  pipecatCreateData,
} from "../src/data/catalog-audits/audit-32";

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      const decoded = JSON.parse(Buffer.from(padded, "base64url").toString());
      return decoded.databaseUrl;
    } catch {
      /* fall through */
    }
  }
  return raw;
}

function hostnameOnly(url: string): string | null {
  try {
    const host = new URL(url).hostname;
    return host ? host : null;
  } catch {
    return null;
  }
}

async function countdown(seconds: number): Promise<void> {
  for (let i = seconds; i > 0; i--) {
    console.log(`Writes begin in ${i}…`);
    await new Promise((r) => setTimeout(r, 1000));
  }
}

async function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply || process.argv.includes("--dry-run");

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const directUrl = getDirectUrl();
  const host = hostnameOnly(directUrl) ?? hostnameOnly(process.env.DATABASE_URL);
  if (!host) {
    console.error(
      "Could not parse a hostname from DATABASE_URL or the derived direct URL. Aborting before connect.",
    );
    process.exit(1);
  }
  console.log(`Target database hostname: ${host}`);
  console.log(`Mode: ${dryRun ? "dry-run (no writes)" : "LIVE writes (--apply)"}`);

  const target = checkTargetHost(host, process.argv, process.env);
  if (!target.ok) {
    console.error(target.reason);
    process.exit(1);
  }
  if (target.note) console.log(`Note: ${target.note}`);
  if (target.production) {
    console.log(
      `PRODUCTION confirmed via ${CONFIRM_PRODUCTION_FLAG} + ${CONFIRM_PROD_HOST_ENV} (host ${host}).`,
    );
  }

  if (!dryRun) {
    console.log(`About to write. Full target host: ${host}`);
    await countdown(5);
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg(directUrl) });
  try {
    let created = 0;
    let appended = 0;

    // Pipecat: create only.
    const existing = await prisma.platform.findUnique({ where: { slug: PIPECAT_SLUG }, select: { id: true } });
    const category = await prisma.category.findUnique({ where: { id: PIPECAT_CATEGORY_ID }, select: { id: true } });
    if (existing) {
      console.log(`${PIPECAT_SLUG}: create skipped (row exists)`);
    } else if (!category) {
      console.warn(`! ${PIPECAT_SLUG}: create skipped (category row not found)`);
    } else {
      const data = pipecatCreateData(false, true);
      if (data) {
        created += 1;
        console.log(`${PIPECAT_SLUG}: create`);
        if (!dryRun) await prisma.platform.create({ data });
      }
    }

    // Deepgram: append "Pipecat" to complementaryTools, once.
    const deepgram = await prisma.platform.findUnique({
      where: { slug: DEEPGRAM_SLUG },
      select: { complementaryTools: true },
    });
    if (!deepgram) {
      console.warn(`! ${DEEPGRAM_SLUG}: append skipped (no row)`);
    } else {
      const next = deepgramComplementaryAfter(deepgram.complementaryTools);
      if (!next) {
        console.log(`${DEEPGRAM_SLUG}: append skipped (already listed)`);
      } else {
        appended += 1;
        console.log(`${DEEPGRAM_SLUG}: complementaryTools append`);
        if (!dryRun) {
          await prisma.platform.update({ where: { slug: DEEPGRAM_SLUG }, data: { complementaryTools: next } });
        }
      }
    }

    console.log(`audit32: ${created} created, ${appended} appended (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) {
      // The site caches catalog reads, including a null row for this slug
      // if it was requested before the insert (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit32 failed");
  process.exit(1);
});
