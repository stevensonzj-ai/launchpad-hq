/**
 * Catalog audit #14 — Klap privacy reason and the clip tools' category,
 * 2026-10-29.
 *   - klap, opus-clip: category gaming-creative-ai -> video-creation-editing,
 *     only while the row is still in gaming-creative-ai;
 *   - klap: description names OpenRouter beside OpenAI as a recipient of
 *     transcripts (Klap privacy policy, last updated 1 October 2026), only
 *     while the row holds audit 13's text. privacyLevel stays MEDIUM.
 * The reader code is not row data and is never written (src/data/affiliates.ts).
 *
 * Patch values live in src/data/catalog-audits/audit-14.ts with their
 * sources. Run after audit 13 (the Klap row must exist).
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never deletes or creates rows. The category move keeps the row's
 * updatedAt (it re-checks none of the row's text); the Klap description
 * update re-checks the privacy text, so updatedAt moves. A re-run (and a
 * dry run after --apply) reports 0 changes. A missing row or category is
 * warned about and skipped. Output is slugs, field names and counts only
 * (no values, no URLs). A row in an unexpected category, or a description
 * holding unexpected text, is logged as "<slug>: <field> skipped (differs
 * from expected)" and left alone.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-14.ts
 *   npx tsx scripts/update-catalog-audit-14.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-14.ts --apply
 *   npm run db:update-catalog-audit-14
 *   npm run db:update-catalog-audit-14 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-14.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-14.ts --confirm-production --apply
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
  AUDIT_14_CATEGORY_SLUGS,
  CATEGORY_FROM,
  CATEGORY_TO,
  KLAP_DESCRIPTION,
  diffAudit14Category,
  diffAudit14KlapDescription,
} from "../src/data/catalog-audits/audit-14";

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

    // 1. Category move: gaming-creative-ai -> video-creation-editing.
    const from = await prisma.category.findUnique({ where: { slug: CATEGORY_FROM }, select: { id: true } });
    const to = await prisma.category.findUnique({ where: { slug: CATEGORY_TO }, select: { id: true } });
    if (!from || !to) {
      console.warn(`! category move skipped (missing category: ${!from ? CATEGORY_FROM : CATEGORY_TO})`);
    } else {
      for (const slug of AUDIT_14_CATEGORY_SLUGS) {
        const row = await prisma.platform.findUnique({
          where: { slug },
          select: { updatedAt: true, category: { select: { slug: true } } },
        });
        if (!row) {
          console.warn(`! skip missing slug: ${slug}`);
          continue;
        }
        const move = diffAudit14Category(row.category.slug);
        if (move === "already") {
          console.log(`${slug}: category skipped (already ${CATEGORY_TO})`);
          continue;
        }
        if (move === "differs") {
          console.log(`${slug}: category skipped (differs from expected)`);
          continue;
        }
        rows += 1;
        fieldChanges += 1;
        console.log(`${slug}: category (${CATEGORY_FROM} -> ${CATEGORY_TO})`);
        if (dryRun) continue;
        // A category move re-checks none of the row's text, so the row keeps
        // its updatedAt (an explicit value overrides Prisma's @updatedAt).
        await prisma.platform.update({
          where: { slug },
          data: { categoryId: to.id, updatedAt: row.updatedAt },
        });
      }
    }

    // 2. Klap description: name OpenRouter beside OpenAI.
    const klap = await prisma.platform.findUnique({ where: { slug: "klap" }, select: { description: true } });
    if (!klap) {
      console.warn("! skip missing slug: klap");
    } else if (klap.description === KLAP_DESCRIPTION.to) {
      console.log("klap: description skipped (already updated)");
    } else {
      const description = diffAudit14KlapDescription(klap);
      if (description === null) {
        console.log("klap: description skipped (differs from expected)");
      } else {
        rows += 1;
        fieldChanges += 1;
        console.log("klap: description");
        if (!dryRun) await prisma.platform.update({ where: { slug: "klap" }, data: { description } });
      }
    }

    console.log(`audit14: ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) {
      // The site caches catalog reads (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit14 failed");
  process.exit(1);
});
