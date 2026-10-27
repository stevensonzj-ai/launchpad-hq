/**
 * Catalog audit #10 — labels and facts (MCP fix plan P1.3), 2026-10-26.
 *   - patches the rows whose fields the RA found wrong or stale (otter-ai,
 *     canva-ai-magic-studio, midjourney, perplexity-ai, quillbot,
 *     github-copilot, zoom-ai-companion, julius-ai, elicit, opus-clip, suno),
 *     including midjourney costTier ENTERPRISE -> PAID (guarded), midjourney
 *     platformType without "mobile" and github-copilot platformType with
 *     "desktop";
 *   - removes stale "pricing is unverified" sentences from descriptions of
 *     tools whose fact files now verify their prices (character-ai,
 *     higgsfield, jetbrains-ai, perplexity-comet, veed);
 *   - drops the word "official" from catalog-only pricing and description
 *     text (no price fact, so no source URL), keeping each "as of" date.
 *
 * Patch values live in src/data/catalog-audits/audit-10.ts with their
 * official sources; the matching fact files are in src/data/facts/.
 * Independent of audits 1-9.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes rows. Text fields change only where they differ; costTier
 * changes only while the row still has the old value; platformType only
 * loses or gains the named values; the wording fix rewrites only text that
 * still says "official". So a re-run (and a dry run after --apply) reports 0
 * changes. A missing row is warned about and skipped.
 * Output is slugs, field names and counts only (no values, no URLs).
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-10.ts
 *   npx tsx scripts/update-catalog-audit-10.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-10.ts --apply
 *   npm run db:update-catalog-audit-10
 *   npm run db:update-catalog-audit-10 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-10.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-10.ts --confirm-production --apply
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
import { audit10Slugs, audit10UpdateData, diffAudit10Row } from "../src/data/catalog-audits/audit-10";

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

    for (const slug of audit10Slugs()) {
      const existing = await prisma.platform.findUnique({
        where: { slug },
        select: {
          description: true,
          currentPricing: true,
          freeTierFeatures: true,
          usageLimits: true,
          primaryUse: true,
          costTier: true,
          platformType: true,
        },
      });
      if (!existing) {
        console.warn(`! skip missing slug: ${slug}`);
        continue;
      }
      const diffs = diffAudit10Row(slug, existing);
      if (diffs.length === 0) continue;
      rows += 1;
      fieldChanges += diffs.length;
      console.log(`${slug}: ${diffs.map((d) => d.field).join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug }, data: audit10UpdateData(diffs) });
    }

    console.log(`audit10: ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) {
      // The site caches catalog reads for up to an hour (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit10 failed");
  process.exit(1);
});
