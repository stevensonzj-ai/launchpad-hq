/**
 * Catalog audit #4 — UPDATE-only copy patches by slug for the 2026-10-25
 * catalog cleanup: Grok (The X Subscription wording), Grok Bot (apps),
 * PlayHT and Sora 2 (discontinued, so search, cards and the MCP connector
 * stop describing them as live), Stability AI (current products and
 * pricing) and OpenEvidence (HIPAA / BAA statements).
 *
 * Patch values live in src/data/catalog-audits/audit-4.ts, each with its
 * official source URLs and the date it was checked. This file only applies
 * them. Run scripts/update-catalog-audit-3.ts before or alongside this one;
 * the two touch different columns and do not overlap.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows. Never changes slug, name or categoryId.
 * Only touches primaryUse, description, currentPricing, freeTierFeatures,
 * outputFormats and verified, and only where a patch lists them. Rows that
 * already match are skipped, so re-runs are no-ops.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-4.ts
 *   npx tsx scripts/update-catalog-audit-4.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-4.ts --apply
 *   npm run db:update-catalog-audit-4
 *   npm run db:update-catalog-audit-4 -- --apply
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (covers the compute, `-pooler` variant, and full
 * FQDN). Prints the target host only. Never prints credentials. Exits if
 * no hostname parses.
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import {
  AUDIT_4_PATCHES,
  audit4UpdateData,
  diffAudit4Patch,
} from "../src/data/catalog-audits/audit-4";

const PRODUCTION_ENDPOINT_ID = "ep-odd-mud-ajdk8f99";

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
  console.log(`Patches: ${AUDIT_4_PATCHES.length}`);

  if (host.startsWith(PRODUCTION_ENDPOINT_ID)) {
    console.error(
      `Refusing to run: hostname ${host} starts with ${PRODUCTION_ENDPOINT_ID} (production compute or pooler). Point DATABASE_URL at a Neon branch first.`,
    );
    process.exit(1);
  }

  if (!dryRun) {
    console.log(`About to write. Full target host: ${host}`);
    await countdown(5);
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg(directUrl) });
  try {
    let wouldChange = 0;
    let unchanged = 0;
    let missing = 0;
    let updated = 0;

    for (const patch of AUDIT_4_PATCHES) {
      const existing = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: {
          primaryUse: true,
          description: true,
          currentPricing: true,
          freeTierFeatures: true,
          outputFormats: true,
          verified: true,
        },
      });

      if (!existing) {
        missing += 1;
        console.warn(`! skip missing slug: ${patch.slug} (${patch.finding})`);
        continue;
      }

      const diffs = diffAudit4Patch(existing, patch);
      if (diffs.length === 0) {
        unchanged += 1;
        console.log(`= ${patch.slug} already matches; no field changes`);
        continue;
      }

      wouldChange += 1;
      console.log(`${dryRun ? "~ would update" : "~ updating"} ${patch.slug} (${patch.finding})`);
      console.log(`  sources (checked ${patch.checkedAt}): ${patch.sources.join(", ")}`);
      if (patch.note) console.log(`  note: ${patch.note}`);
      for (const diff of diffs) {
        console.log(`  ${diff.field}:`);
        console.log(`    old: ${JSON.stringify(diff.from)}`);
        console.log(`    new: ${JSON.stringify(diff.to)}`);
      }

      if (dryRun) continue;

      await prisma.platform.update({
        where: { slug: patch.slug },
        data: audit4UpdateData(diffs),
      });
      updated += 1;
    }

    console.log("---");
    console.log(
      dryRun
        ? `Dry-run complete. No rows written. wouldChange=${wouldChange} alreadyMatched=${unchanged} missing=${missing}`
        : `Done. updated=${updated} alreadyMatched=${unchanged} missing=${missing}`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
