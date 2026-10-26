/**
 * Catalog audit #9 — search relevance + career tools, 2026-10-26.
 *   - creates the category `career-job-search` ("Career & Job Search") only
 *     while the slug is missing; an existing category is never changed;
 *   - creates `teal`, `kickresume`, `rezi` in it, each only while the slug
 *     is missing; an existing row is never overwritten;
 *   - patches rows whose text contradicts the official page today, plus the
 *     #99 follow-ups (see AUDIT_9_PATCHES).
 *
 * Patch values live in src/data/catalog-audits/audit-9.ts with their
 * official sources. Independent of audits 1-8.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes rows. Creates run only while the slug is missing; text
 * fields change only where they differ; guarded fields (website, costTier)
 * change only while the row still has the old value; directAlternatives
 * only gains missing names. So a re-run (and a dry run after --apply)
 * reports 0 changes. A missing patch row is warned about and skipped.
 * Output is slugs, field names and counts only (no values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-9.ts
 *   npx tsx scripts/update-catalog-audit-9.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-9.ts --apply
 *   npm run db:update-catalog-audit-9
 *   npm run db:update-catalog-audit-9 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-9.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-9.ts --confirm-production --apply
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
  AUDIT_9_CATEGORIES,
  AUDIT_9_CREATES,
  AUDIT_9_PATCHES,
  audit9CategoryData,
  audit9CreateData,
  audit9UpdateData,
  diffAudit9,
  planCreate,
} from "../src/data/catalog-audits/audit-9";

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
    let categoriesCreated = 0;
    let created = 0;
    let rows = 0;
    let fieldChanges = 0;
    // Categories a dry run would create (no id yet), so their rows still count.
    const pendingCategories = new Set<string>();

    // Step 1: new categories (only while the slug is missing).
    for (const category of AUDIT_9_CATEGORIES) {
      const existing = await prisma.category.findUnique({ where: { slug: category.slug }, select: { id: true } });
      if (planCreate(Boolean(existing)) === "done") continue;
      const sameName = await prisma.category.findUnique({ where: { name: category.name }, select: { slug: true } });
      if (sameName) {
        // Name is unique in the schema; a category with this name under another slug needs a human.
        console.warn(`! skip category ${category.slug}: its name is already used by ${sameName.slug}`);
        continue;
      }
      categoriesCreated += 1;
      console.log(`create category ${category.slug}`);
      if (dryRun) {
        pendingCategories.add(category.slug);
        continue;
      }
      await prisma.category.create({ data: audit9CategoryData(category) });
    }

    // Step 2: new rows (only while the slug is missing).
    for (const create of AUDIT_9_CREATES) {
      const existing = await prisma.platform.findUnique({
        where: { slug: create.row.slug },
        select: { id: true },
      });
      if (planCreate(Boolean(existing)) === "done") continue;
      const category = await prisma.category.findUnique({
        where: { slug: create.categorySlug },
        select: { id: true },
      });
      if (!category && !pendingCategories.has(create.categorySlug)) {
        console.warn(`! skip create ${create.row.slug}: category ${create.categorySlug} not found`);
        continue;
      }
      created += 1;
      console.log(`create ${create.row.slug} (category ${create.categorySlug})`);
      if (dryRun || !category) continue;
      await prisma.platform.create({ data: audit9CreateData(create, category.id) });
    }

    // Step 3: field patches.
    for (const patch of AUDIT_9_PATCHES) {
      const existing = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: {
          description: true,
          currentPricing: true,
          freeTierFeatures: true,
          primaryUse: true,
          website: true,
          costTier: true,
          directAlternatives: true,
        },
      });
      if (!existing) {
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      const diffs = diffAudit9(existing, patch);
      if (diffs.length === 0) continue;
      rows += 1;
      fieldChanges += diffs.length;
      console.log(`${patch.slug}: ${diffs.map((d) => d.field).join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: patch.slug }, data: audit9UpdateData(diffs) });
    }

    console.log(
      `audit9: ${categoriesCreated} categories created, ${created} rows created, ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit9 failed");
  process.exit(1);
});
