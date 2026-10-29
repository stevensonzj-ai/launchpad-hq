/**
 * Catalog audit #15 — guide PR D renames, 2026-10-29. UPDATE-only:
 *   1. slug renames google-vertex-ai -> gemini-enterprise-agent-platform,
 *      google-imagen-3 -> nano-banana, text-generation-webui-oobabooga ->
 *      textgen, notebooklm -> gemini-notebook;
 *   2. name / website on the renamed rows, written only while the row still
 *      holds the expected old value (a hand edit is logged and left alone);
 *   3. name references to the old names in every row's directAlternatives /
 *      complementaryTools / budgetAlternativeTo / privacyAlternativeTo.
 * Clarifai is hidden in code only; this audit never touches its row.
 *
 * Patch values live in src/data/catalog-audits/audit-15.ts with their
 * official sources. Run after audit 14. Deploy the code that adds the four
 * 301s (src/lib/catalog-redirects.ts) at the same time: before this runs the
 * new slugs have no row (their pages and guides 404 and the old URLs 301
 * into them); after it runs the old slugs have none.
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
 *   npx tsx scripts/update-catalog-audit-15.ts
 *   npx tsx scripts/update-catalog-audit-15.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-15.ts --apply
 *   npm run db:update-catalog-audit-15
 *   npm run db:update-catalog-audit-15 -- --apply
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
 *   npx tsx scripts/update-catalog-audit-15.ts --confirm-production
 *   npx tsx scripts/update-catalog-audit-15.ts --confirm-production --apply
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
  AUDIT_15_RENAMES,
  audit15RefUpdates,
  audit15UpdateData,
  planAudit15Fields,
  planSlugRename,
} from "../src/data/catalog-audits/audit-15";

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
    /** Targets renamed in this dry run, so step 2 reads the row under its old slug. */
    const pendingRenames = new Set<string>();

    // Step 1: slug renames.
    for (const rename of AUDIT_15_RENAMES) {
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
      if (plan === "done") {
        console.log(`rename ${rename.from} -> ${rename.to} skipped (already done)`);
        continue;
      }
      renames += 1;
      console.log(`rename ${rename.from} -> ${rename.to}`);
      if (dryRun) {
        pendingRenames.add(rename.to);
        continue;
      }
      await prisma.platform.update({ where: { slug: rename.from }, data: { slug: rename.to } });
    }

    // Step 2: name / website on the renamed rows (guarded).
    for (const rename of AUDIT_15_RENAMES) {
      const readSlug = pendingRenames.has(rename.to) ? rename.from : rename.to;
      const row = await prisma.platform.findUnique({
        where: { slug: readSlug },
        select: { name: true, website: true },
      });
      if (!row) {
        console.warn(`! skip missing slug: ${rename.to}`);
        continue;
      }
      const plans = planAudit15Fields(row, rename);
      for (const p of plans) {
        if (p.action === "differs") console.log(`${rename.to}: ${p.field} skipped (differs from expected)`);
      }
      const data = audit15UpdateData(plans);
      const fields = Object.keys(data);
      if (fields.length === 0) continue;
      rows += 1;
      fieldChanges += fields.length;
      console.log(`${rename.to}: ${fields.join(", ")}`);
      if (dryRun) continue;
      await prisma.platform.update({ where: { slug: rename.to }, data });
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
      const updates = audit15RefUpdates(row);
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
      `audit15: ${renames} slug renames, ${rows} rows / ${fieldChanges} field changes, ${refRows} rows / ${refChanges} name references (${dryRun ? "dry-run" : "applied"})`,
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
  console.error(e instanceof Error ? e.message : "audit15 failed");
  process.exit(1);
});
