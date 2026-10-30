/**
 * Catalog audit #21 — batch-4 browser corrections, 2026-10-29. The Research
 * Analyst's browser check ("RA browser check 2026-10-29") read vendor pages
 * the batch-4 readers could not (Clio, Scholarcy, Adobe Firefly, Restb.ai,
 * Topaz, Cohere, Bedrock, Azure, Acrobat, Antigravity); the sourced facts are
 * in src/data/facts/<slug>.ts.
 *   - text fields (currentPricing, freeTierFeatures, usageLimits,
 *     upgradeTriggers) are set to the audited value only where they differ;
 *   - costTier, privacyLevel and description change only while the row still
 *     holds an expected old value (a hand edit is logged and left alone);
 *   - Zach's decisions: google-antigravity and antigravity-cli privacy MEDIUM
 *     (the Enable Telemetry opt-out); restb-ai costTier ENTERPRISE;
 *   - cohere stays FREEMIUM (audit 20); naver is left as it is (no prices
 *     readable).
 * Audits 19 and 20 import their targets for the fields this audit also writes
 * (restb-ai tier and description, google-antigravity privacy, the
 * antigravity-cli row, and A21_TEXT on six rows), so re-running either after
 * this one cannot undo it (asserted in audit-21.test.ts). Audits 10 and 11
 * are not touched; audit 11 owns the clio-manage cost tier.
 *
 * Patch values live in src/data/catalog-audits/audit-21.ts with their
 * sources.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes or creates rows, never changes slug, name or categoryId.
 * Rows that already match are skipped, so a re-run (and a dry run after
 * --apply) reports 0 changes. A slug that is not in the database is warned
 * about and skipped. Output is slugs, field names and counts only (no
 * values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-21.ts
 *   npx tsx scripts/update-catalog-audit-21.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-21.ts --apply
 *   npm run db:update-catalog-audit-21
 *   npm run db:update-catalog-audit-21 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-21.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-21.ts --confirm-production --apply
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
import { AUDIT_21_PATCHES, audit21GuardSkips, audit21PatchData } from "../src/data/catalog-audits/audit-21";

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
    let fields = 0;
    for (const patch of AUDIT_21_PATCHES) {
      const row = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: {
          description: true,
          currentPricing: true,
          freeTierFeatures: true,
          usageLimits: true,
          upgradeTriggers: true,
          primaryUse: true,
          costTier: true,
          privacyLevel: true,
        },
      });
      if (!row) {
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      for (const field of audit21GuardSkips(row, patch)) {
        console.log(`${patch.slug}: ${field} skipped (differs from expected)`);
      }
      const data = audit21PatchData(row, patch);
      const changed = Object.keys(data);
      if (changed.length === 0) continue;
      rows += 1;
      fields += changed.length;
      console.log(`patch ${patch.slug}: ${changed.join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: patch.slug }, data });
    }

    console.log(`audit21: ${rows} rows / ${fields} patched fields (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) {
      // The site caches catalog reads (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit21 failed");
  process.exit(1);
});
