/**
 * Catalog audit #13 — empty descriptions, Klap, Opus Clip, 2026-10-29.
 *   - gemini, chatgpt, openai-api, github-copilot, runway, suno, notion-ai,
 *     mistral-vibe: a beginner description, written only while the row's
 *     description is empty or whitespace, followed by the audit 12
 *     description notes that audit 12 skipped on those empty rows (same
 *     text, so an audit 12 re-run after this one reports 0);
 *   - klap: new row, created only when no row has that slug; category copied
 *     from the opus-clip row; website is klap.app (never the affiliate link);
 *   - opus-clip: currentPricing, freeTierFeatures, usageLimits and
 *     upgradeTriggers, each only while it still holds the expected old text.
 * Each fact was read on the vendor's own page on 2026-10-29.
 *
 * Patch values live in src/data/catalog-audits/audit-13.ts with their
 * sources. Do not re-run audit 10 after this audit: it would put opus-clip's
 * 2026-10-26 pricing text back.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes rows. Creates at most one row (klap). Description fills keep
 * the row's updatedAt (they re-check none of the row's other text); the
 * opus-clip update re-checks its pricing, so updatedAt moves. A re-run (and a
 * dry run after --apply) reports 0 changes. A missing row is warned about and
 * skipped. Output is slugs, field names and counts only (no values, no URLs).
 * A field holding unexpected text is logged as "<slug>: <field> skipped
 * (differs from expected)" and left alone.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-13.ts
 *   npx tsx scripts/update-catalog-audit-13.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-13.ts --apply
 *   npm run db:update-catalog-audit-13
 *   npm run db:update-catalog-audit-13 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-13.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-13.ts --confirm-production --apply
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
  KLAP_CATEGORY_FROM,
  KLAP_SLUG,
  audit13DescriptionSlugs,
  diffAudit13Description,
  diffAudit13Opus,
  klapCreateData,
} from "../src/data/catalog-audits/audit-13";

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
    let created = 0;

    // 1. Descriptions (empty only) + audit 12's held notes.
    for (const slug of audit13DescriptionSlugs()) {
      const existing = await prisma.platform.findUnique({
        where: { slug },
        select: { description: true, updatedAt: true },
      });
      if (!existing) {
        console.warn(`! skip missing slug: ${slug}`);
        continue;
      }
      const description = diffAudit13Description(slug, existing);
      if (description === null) {
        console.log(`${slug}: description skipped (not empty)`);
        continue;
      }
      rows += 1;
      fieldChanges += 1;
      console.log(`${slug}: description (was empty)`);
      if (dryRun) continue;
      // A new description re-checks none of the row's other text, so the row
      // keeps its updatedAt (an explicit value overrides Prisma's @updatedAt).
      await prisma.platform.update({
        where: { slug },
        data: { description, updatedAt: existing.updatedAt },
      });
    }

    // 2. Klap: create only.
    const klap = await prisma.platform.findUnique({ where: { slug: KLAP_SLUG }, select: { id: true } });
    const categorySource = await prisma.platform.findUnique({
      where: { slug: KLAP_CATEGORY_FROM },
      select: { categoryId: true },
    });
    if (klap) {
      console.log(`${KLAP_SLUG}: create skipped (row exists)`);
    } else if (!categorySource) {
      console.warn(`! ${KLAP_SLUG}: create skipped (no ${KLAP_CATEGORY_FROM} row to copy the category from)`);
    } else {
      const data = klapCreateData(false, categorySource.categoryId);
      if (data) {
        created += 1;
        console.log(`${KLAP_SLUG}: create`);
        if (!dryRun) await prisma.platform.create({ data });
      }
    }

    // 3. Opus Clip: stale pricing text, only while it holds the expected old text.
    const opus = await prisma.platform.findUnique({
      where: { slug: "opus-clip" },
      select: { currentPricing: true, freeTierFeatures: true, usageLimits: true, upgradeTriggers: true },
    });
    if (!opus) {
      console.warn("! skip missing slug: opus-clip");
    } else {
      const { diffs, skipped } = diffAudit13Opus(opus);
      for (const field of skipped) console.log(`opus-clip: ${field} skipped (differs from expected)`);
      if (diffs.length > 0) {
        rows += 1;
        fieldChanges += diffs.length;
        console.log(`opus-clip: ${diffs.map((d) => d.field).join(", ")}`);
        if (!dryRun) {
          await prisma.platform.update({
            where: { slug: "opus-clip" },
            data: Object.fromEntries(diffs.map((d) => [d.field, d.to])),
          });
        }
      }
    }

    console.log(
      `audit13: ${rows} rows / ${fieldChanges} field changes / ${created} created (${dryRun ? "dry-run" : "applied"})`,
    );
    if (!dryRun) {
      // The site caches catalog reads (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit13 failed");
  process.exit(1);
});
