/**
 * Catalog audit #16 — Hermes Agent (Nous Research), 2026-10-29.
 *   - hermes-agent: new row, created only when no row has that slug;
 *     category looked up by slug (workflow-automation, where manus and
 *     lindy-ai sit; the catalog has no AI agents category); website is
 *     hermes-agent.nousresearch.com; alternatives are only rows that exist
 *     (Claude Code, OpenAI Codex CLI, Lindy AI; OpenClaw has no row).
 * Each fact was read on Nous Research's own pages on 2026-10-29.
 *
 * Row values live in src/data/catalog-audits/audit-16.ts with their sources.
 * Pricing is PROVISIONAL and its one home is the freeTier/plans block of
 * src/data/facts/hermes-agent.ts; the row text is built from it.
 *
 * Deploy first, then run this: the fact file and guide ship in code, and a
 * platform URL requested before the row exists can stay cached as a 404
 * (docs/caching.md), so run `npm run cache:revalidate` after --apply.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes or updates rows. Creates at most one row (hermes-agent). A
 * re-run (and a dry run after --apply) reports 0 changes. A missing
 * category is warned about and skipped. Output is slugs and counts only (no
 * values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-16.ts
 *   npx tsx scripts/update-catalog-audit-16.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-16.ts --apply
 *   npm run db:update-catalog-audit-16
 *   npm run db:update-catalog-audit-16 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-16.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-16.ts --confirm-production --apply
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import {
  CONFIRM_PROD_HOST_ENV,
  CONFIRM_PRODUCTION_FLAG,
  checkTargetHost,
} from "../src/lib/prod-guard";
import {
  HERMES_CATEGORY_SLUG,
  HERMES_SLUG,
  hermesCreateData,
} from "../src/data/catalog-audits/audit-16";

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

    // Hermes Agent: create only.
    const existing = await prisma.platform.findUnique({ where: { slug: HERMES_SLUG }, select: { id: true } });
    const category = await prisma.category.findUnique({
      where: { slug: HERMES_CATEGORY_SLUG },
      select: { id: true },
    });
    if (existing) {
      console.log(`${HERMES_SLUG}: create skipped (row exists)`);
    } else if (!category) {
      console.warn(`! ${HERMES_SLUG}: create skipped (no ${HERMES_CATEGORY_SLUG} category)`);
    } else {
      const data = hermesCreateData(false, category.id);
      if (data) {
        created += 1;
        console.log(`${HERMES_SLUG}: create`);
        if (!dryRun) await prisma.platform.create({ data });
      }
    }

    console.log(`audit16: ${created} created (${dryRun ? "dry-run" : "applied"})`);
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
  console.error(e instanceof Error ? e.message : "audit16 failed");
  process.exit(1);
});
