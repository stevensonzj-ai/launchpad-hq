/**
 * Catalog audit #8 — catalog batch 2026-10-26 (AI X watch items approved by
 * Zach). One CREATE and one UPDATE:
 *   - creates `minimax` (MiniMax, category ai-apis-developer-services) only
 *     while the slug is missing; an existing row is never overwritten;
 *   - kimi: description, currentPricing, freeTierFeatures (membership
 *     prices from Kimi's K3.1 Pro pricing page) and apiAvailable
 *     false -> true.
 *
 * Patch values live in src/data/catalog-audits/audit-8.ts with their
 * official sources. Ideogram, Claude, Claude Code and Anthropic API changes
 * in the same batch are fact-file only. Independent of audits 1-7.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes rows. The create runs only while the slug is missing and
 * text fields change only where they differ; apiAvailable changes only
 * while it is still false. So a re-run (and a dry run after --apply)
 * reports 0 changes. A missing category or a missing kimi row is warned
 * about and skipped. Output is slugs, field names and counts only (no
 * values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-8.ts
 *   npx tsx scripts/update-catalog-audit-8.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-8.ts --apply
 *   npm run db:update-catalog-audit-8
 *   npm run db:update-catalog-audit-8 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-8.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-8.ts --confirm-production --apply
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
  AUDIT_8_CREATES,
  AUDIT_8_PATCHES,
  audit8CreateData,
  audit8UpdateData,
  diffAudit8,
  planCreate,
} from "../src/data/catalog-audits/audit-8";

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
    let rows = 0;
    let fieldChanges = 0;

    // Step 1: new rows (only while the slug is missing).
    for (const create of AUDIT_8_CREATES) {
      const existing = await prisma.platform.findUnique({
        where: { slug: create.row.slug },
        select: { id: true },
      });
      if (planCreate(Boolean(existing)) === "done") continue;
      const category = await prisma.category.findUnique({
        where: { slug: create.categorySlug },
        select: { id: true },
      });
      if (!category) {
        console.warn(`! skip create ${create.row.slug}: category ${create.categorySlug} not found`);
        continue;
      }
      created += 1;
      console.log(`create ${create.row.slug} (category ${create.categorySlug})`);
      if (dryRun) continue;
      await prisma.platform.create({ data: audit8CreateData(create, category.id) });
    }

    // Step 2: field patches.
    for (const patch of AUDIT_8_PATCHES) {
      const existing = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: { description: true, currentPricing: true, freeTierFeatures: true, apiAvailable: true },
      });
      if (!existing) {
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      const diffs = diffAudit8(existing, patch);
      if (diffs.length === 0) continue;
      rows += 1;
      fieldChanges += diffs.length;
      console.log(`${patch.slug}: ${diffs.map((d) => d.field).join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: patch.slug }, data: audit8UpdateData(diffs) });
    }

    console.log(
      `audit8: ${created} rows created, ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit8 failed");
  process.exit(1);
});
