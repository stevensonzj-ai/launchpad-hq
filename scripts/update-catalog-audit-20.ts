/**
 * Catalog audit #20 — stale facts, batch 4 (19 rows), 2026-10-29, plus three
 * batch-3 leftovers. Rows 74–92 of the stale group, the rows whose pricing text
 * carries no date (list and order:
 * docs/planning/2026-10-autonomous-business/stale-facts-batches.md).
 * Each was re-read on the vendor's own pages on 2026-10-29; the sourced
 * facts are in src/data/facts/<slug>.ts.
 *   - text fields (primaryUse, currentPricing, freeTierFeatures,
 *     usageLimits, upgradeTriggers) are set to the audited value only where
 *     they differ;
 *   - company, website, costTier, apiAvailable, privacyLevel and description
 *     change only while the row still holds an expected old value (a hand
 *     edit is logged and left alone);
 *   - directAlternatives only gains missing names (amazon-q-developer gains
 *     "Kiro"); nothing is removed;
 *   - budgetAlternativeTo swaps one named entry (claude-code and
 *     openai-codex-cli: "Gemini CLI (free…)" becomes "Antigravity CLI (free…)")
 *     only while the row still holds the old entry;
 *   - google-antigravity gets the verified Antigravity plans (and privacy
 *     LOW, to match the CLI row); murf-ai's description loses the word that
 *     made it match "learn a language";
 *   - Zach's decisions: restb-ai costTier PAID (plus a description note, only
 *     while the description is empty) and leonardo-ai privacyLevel LOW;
 *   - the Research Analyst browser check of batch 3 (2026-10-29): row text
 *     for quizlet-q-chat, bloomberg-gpt-terminal-ai, zillow-ai-zestimate
 *     and duolingo-max.
 * Facts a vendor page did not show (blocked, or rendered only in a browser)
 * are left as the row has them; see REVIEW-SUMMARY.md "Browser-check list".
 * Audits 17, 18 and 19 write none of the fields this one writes on the same
 * row, except restb-ai costTier, where audit 19 writes the same PAID, so
 * re-running any of them cannot revert this one (asserted in
 * audit-20.test.ts). Audit 10 patches claude-code currentPricing only; audit
 * 11 patches the clio-manage and spellbook cost tiers only; this audit
 * writes neither.
 *
 * Patch values live in src/data/catalog-audits/audit-20.ts with their
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
 *   npx tsx scripts/update-catalog-audit-20.ts
 *   npx tsx scripts/update-catalog-audit-20.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-20.ts --apply
 *   npm run db:update-catalog-audit-20
 *   npm run db:update-catalog-audit-20 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-20.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-20.ts --confirm-production --apply
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
import { AUDIT_20_PATCHES, audit20GuardSkips, audit20PatchData } from "../src/data/catalog-audits/audit-20";

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
    for (const patch of AUDIT_20_PATCHES) {
      const row = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: {
          company: true,
          website: true,
          description: true,
          primaryUse: true,
          currentPricing: true,
          freeTierFeatures: true,
          usageLimits: true,
          upgradeTriggers: true,
          costTier: true,
          apiAvailable: true,
          privacyLevel: true,
          directAlternatives: true,
          budgetAlternativeTo: true,
        },
      });
      if (!row) {
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      for (const field of audit20GuardSkips(row, patch)) {
        console.log(`${patch.slug}: ${field} skipped (differs from expected)`);
      }
      const data = audit20PatchData(row, patch);
      const changed = Object.keys(data);
      if (changed.length === 0) continue;
      rows += 1;
      fields += changed.length;
      console.log(`patch ${patch.slug}: ${changed.join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: patch.slug }, data });
    }

    console.log(`audit20: ${rows} rows / ${fields} patched fields (${dryRun ? "dry-run" : "applied"})`);
    if (!dryRun) {
      // The site caches catalog reads (docs/caching.md).
      console.log("Next: npm run cache:revalidate  (expires the site cache so the change shows now)");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit20 failed");
  process.exit(1);
});
