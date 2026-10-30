/**
 * Catalog audit #27 — the rows audit 25 left catalog_only, re-read 2026-10-30.
 * UPDATE-only: currentPricing / freeTierFeatures / usageLimits / website / name
 * on the rows listed in
 * AUDIT_27_PATCHES, each written only while the row still holds the exact
 * old value. Values and official sources live
 * in src/data/catalog-audits/audit-27.ts.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows, never changes categoryId. Rows that
 * already match are skipped, so a re-run (and a dry run after --apply)
 * reports 0 changes. A slug that is not in the database is warned about
 * and skipped; a rename whose target slug already exists is refused.
 * Output is slugs, field names and counts only (no values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-27.ts
 *   npx tsx scripts/update-catalog-audit-27.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-27.ts --apply
 *   npm run db:update-catalog-audit-27
 *   npm run db:update-catalog-audit-27 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-27.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-27.ts --confirm-production --apply
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
import { AUDIT_27_PATCHES, audit27UpdateData, planAudit27 } from "../src/data/catalog-audits/audit-27";

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
    let rows = 0;
    let fieldChanges = 0;
    for (const patch of AUDIT_27_PATCHES) {
      const row = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: { currentPricing: true, freeTierFeatures: true, usageLimits: true, website: true, name: true },
      });
      if (!row) {
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      const plans = planAudit27(row, patch);
      for (const p of plans) {
        if (p.action === "differs") console.log(`${patch.slug}: ${p.field} skipped (differs from expected)`);
      }
      const data = audit27UpdateData(plans);
      const fields = Object.keys(data);
      if (fields.length === 0) continue;
      rows += 1;
      fieldChanges += fields.length;
      console.log(`${patch.slug}: ${fields.join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: patch.slug }, data });
    }
    console.log(`audit27: ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit27 failed");
  process.exit(1);
});
