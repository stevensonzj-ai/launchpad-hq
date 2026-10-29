/**
 * Catalog audit #12 — X-watch feature and API notes, 2026-10-29.
 *   - gemini: Gemini 4 Carbon access and introductory / later API price;
 *   - chatgpt: monthly API credits for ChatGPT Pro and Business;
 *   - openai-api: GPT-6.1 Terra price and context window;
 *   - github-copilot: Copilot Fusion GA, effort levels (no discount: the
 *     page gives no end date);
 *   - kling-ai: Kling 4.0 API per-second video prices; apiAvailable
 *     false -> true (guarded);
 *   - runway: App Studio; suno: Suno MCP beta; notion-ai: meeting-notes
 *     speaker labels; mistral-vibe: Responses API public preview.
 * Each fact was re-read on the vendor's own page on 2026-10-29.
 *
 * Patch values live in src/data/catalog-audits/audit-12.ts with their
 * sources. Independent of audits 1-11 (no note says "official", so audit
 * 10's wording pass leaves them alone).
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows. Append-only: a note is added to a field
 * only while the field does not already contain it, so existing text is
 * never rewritten; apiAvailable changes only while the row still has the
 * old value; every row keeps its updatedAt (a note re-checks none of the
 * row's other text). So a re-run (and a dry run after --apply) reports 0
 * changes. A missing row is warned about and skipped.
 * Output is slugs, field names and counts only (no values, no URLs). A
 * field that was empty before the note is marked "(was empty)" so the
 * operator can check that row by hand.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-12.ts
 *   npx tsx scripts/update-catalog-audit-12.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-12.ts --apply
 *   npm run db:update-catalog-audit-12
 *   npm run db:update-catalog-audit-12 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-12.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-12.ts --confirm-production --apply
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
import { audit12Slugs, audit12UpdateData, diffAudit12Row } from "../src/data/catalog-audits/audit-12";

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

    for (const slug of audit12Slugs()) {
      const existing = await prisma.platform.findUnique({
        where: { slug },
        select: {
          description: true,
          currentPricing: true,
          apiAvailable: true,
          updatedAt: true,
        },
      });
      if (!existing) {
        console.warn(`! skip missing slug: ${slug}`);
        continue;
      }
      const diffs = diffAudit12Row(slug, existing);
      if (diffs.length === 0) continue;
      rows += 1;
      fieldChanges += diffs.length;
      const labels = diffs.map((d) => ("wasEmpty" in d && d.wasEmpty ? `${d.field} (was empty)` : d.field));
      console.log(`${slug}: ${labels.join(", ")}`);
      if (dryRun) continue;
      // Appended notes re-check none of the row's other text, so the row
      // keeps its updatedAt (an explicit value overrides Prisma's @updatedAt).
      await prisma.platform.update({
        where: { slug },
        data: { ...audit12UpdateData(diffs), updatedAt: existing.updatedAt },
      });
    }

    console.log(`audit12: ${rows} rows / ${fieldChanges} field changes (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) {
      // The site caches catalog reads for up to an hour (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit12 failed");
  process.exit(1);
});
