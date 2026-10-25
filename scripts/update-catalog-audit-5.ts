/**
 * Catalog audit #5 — UPDATE-only patches by slug for the 2026-10-25
 * compare-page pass: verified currentPricing / freeTierFeatures /
 * usageLimits for the rows the compare pages read, directAlternatives
 * rewrites that fix the "tl;dv" -> "tl", "dv" split, and reference edits
 * that drop or rename discontinued products (Sora 2, Kakao Brain (Karlo),
 * Adobe Sensei) in the String[] reference columns.
 *
 * Patch values live in src/data/catalog-audits/audit-5.ts, each with its
 * official source URLs and the date it was checked. This file only applies
 * them. Run after scripts/update-catalog-audit-4.ts; the two do not
 * overlap.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows. Never changes slug, name or categoryId.
 * Only touches currentPricing, freeTierFeatures, usageLimits,
 * directAlternatives, complementaryTools, budgetAlternativeTo and
 * privacyAlternativeTo, and only where a patch or ref edit changes them.
 * Rows that already match are skipped, so re-runs are no-ops. A slug that
 * is not in the database is warned about and skipped.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-5.ts
 *   npx tsx scripts/update-catalog-audit-5.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-5.ts --apply
 *   npm run db:update-catalog-audit-5
 *   npm run db:update-catalog-audit-5 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-5.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-5.ts --confirm-production --apply
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
  AUDIT_5_PATCHES,
  AUDIT_5_REF_EDITS,
  AUDIT_5_TEXT_FIXES,
  audit5Slugs,
  audit5UpdateData,
  diffAudit5,
} from "../src/data/catalog-audits/audit-5";

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

    for (const slug of audit5Slugs()) {
      const patch = AUDIT_5_PATCHES.find((p) => p.slug === slug);
      const refEdits = AUDIT_5_REF_EDITS.filter((e) => e.slug === slug);
      const textFixes = AUDIT_5_TEXT_FIXES.filter((f) => f.slug === slug);
      const existing = await prisma.platform.findUnique({
        where: { slug },
        select: {
          description: true,
          currentPricing: true,
          freeTierFeatures: true,
          usageLimits: true,
          costTier: true,
          directAlternatives: true,
          complementaryTools: true,
          budgetAlternativeTo: true,
          privacyAlternativeTo: true,
        },
      });

      if (!existing) {
        console.warn(`! skip missing slug: ${slug}`);
        continue;
      }

      const diffs = diffAudit5(existing, patch, refEdits, textFixes);
      if (diffs.length === 0) continue;

      rows += 1;
      fieldChanges += diffs.length;
      for (const diff of diffs) {
        console.log(`${slug} ${diff.field}: ${JSON.stringify(diff.from)} -> ${JSON.stringify(diff.to)}`);
      }

      if (dryRun) continue;

      await prisma.platform.update({
        where: { slug },
        data: audit5UpdateData(diffs),
      });
    }

    console.log(`audit5: ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
