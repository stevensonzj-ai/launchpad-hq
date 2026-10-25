/**
 * Catalog audit #6 — guide-prices pass, 2026-10-25. UPDATE-only:
 *   1. slug rename mistral-ai-le-chat -> mistral-vibe (Le Chat is now Vibe);
 *   2. field patches for mistral-vibe, read-ai, n8n and inworld-ai
 *      (name / currentPricing / freeTierFeatures, plus guarded
 *      description / primaryUse fixes that only fire while the text still
 *      says "Le Chat" without "Vibe");
 *   3. rewrite name references to the old Mistral names in every row's
 *      directAlternatives / complementaryTools / budgetAlternativeTo /
 *      privacyAlternativeTo.
 * PlayHT's costTier is intentionally untouched; see the header of
 * src/data/catalog-audits/audit-6.ts for why and where it is masked.
 *
 * Patch values live in src/data/catalog-audits/audit-6.ts with their
 * official sources. Run after scripts/update-catalog-audit-5.ts. Deploy
 * the code that adds the /platform/mistral-ai-le-chat 301 at the same
 * time: before this runs the new slug has no row; after it runs the old
 * slug has none.
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
 *   npx tsx scripts/update-catalog-audit-6.ts
 *   npx tsx scripts/update-catalog-audit-6.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-6.ts --apply
 *   npm run db:update-catalog-audit-6
 *   npm run db:update-catalog-audit-6 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-6.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-6.ts --confirm-production --apply
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
  AUDIT_6_PATCHES,
  AUDIT_6_SLUG_RENAMES,
  audit6RefUpdates,
  audit6UpdateData,
  diffAudit6,
  planSlugRename,
  preRenameSlug,
} from "../src/data/catalog-audits/audit-6";

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
    let renames = 0;
    let rows = 0;
    let fieldChanges = 0;
    let refRows = 0;
    let refChanges = 0;
    /** Slugs renamed in this (dry) run, so patches read the row under its old slug. */
    const pendingRenames = new Set<string>();

    // Step 1: slug renames.
    for (const rename of AUDIT_6_SLUG_RENAMES) {
      const [from, to] = await Promise.all([
        prisma.platform.findUnique({ where: { slug: rename.from }, select: { id: true } }),
        prisma.platform.findUnique({ where: { slug: rename.to }, select: { id: true } }),
      ]);
      const plan = planSlugRename(Boolean(from), Boolean(to));
      if (plan === "conflict") {
        console.error(`! refusing rename ${rename.from} -> ${rename.to}: both slugs exist. Resolve by hand.`);
        process.exit(1);
      }
      if (plan === "missing") {
        console.warn(`! skip rename ${rename.from} -> ${rename.to}: neither slug exists`);
        continue;
      }
      if (plan === "done") continue;
      renames += 1;
      console.log(`rename ${rename.from} -> ${rename.to}`);
      if (dryRun) {
        pendingRenames.add(rename.to);
        continue;
      }
      await prisma.platform.update({ where: { slug: rename.from }, data: { slug: rename.to } });
    }

    // Step 2: field patches.
    for (const patch of AUDIT_6_PATCHES) {
      const readSlug = pendingRenames.has(patch.slug) ? preRenameSlug(patch.slug) : patch.slug;
      const existing = await prisma.platform.findUnique({
        where: { slug: readSlug },
        select: { name: true, description: true, primaryUse: true, currentPricing: true, freeTierFeatures: true },
      });
      if (!existing) {
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      const diffs = diffAudit6(existing, patch);
      if (diffs.length === 0) continue;
      rows += 1;
      fieldChanges += diffs.length;
      console.log(`${patch.slug}: ${diffs.map((d) => d.field).join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: patch.slug }, data: audit6UpdateData(diffs) });
    }

    // Step 3: name references to the renamed rows.
    const all = await prisma.platform.findMany({
      select: {
        slug: true,
        directAlternatives: true,
        complementaryTools: true,
        budgetAlternativeTo: true,
        privacyAlternativeTo: true,
      },
      orderBy: { slug: "asc" },
    });
    for (const row of all) {
      const updates = audit6RefUpdates(row);
      if (updates.length === 0) continue;
      refRows += 1;
      refChanges += updates.reduce((n, u) => n + u.changes, 0);
      console.log(`refs ${row.slug}: ${updates.map((u) => `${u.field} (${u.changes})`).join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({
        where: { slug: row.slug },
        data: Object.fromEntries(updates.map((u) => [u.field, u.to])),
      });
    }

    console.log(
      `audit6: ${renames} slug renames, ${rows} rows / ${fieldChanges} field changes, ${refRows} rows / ${refChanges} name references (${dryRun ? "dry-run" : "applied"})`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : "audit6 failed");
  process.exit(1);
});
