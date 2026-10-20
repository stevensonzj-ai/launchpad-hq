/**
 * Catalog audit #3 — sync display name, official URL and company on the
 * Platform rows touched by the 2026-10-20 catalog accuracy cleanup.
 *
 * OPTIONAL. The site already shows the corrected values: the fact files in
 * src/data/facts/ overlay name, website and company at render time. This
 * script only brings the database rows in line, so Discover cards, search
 * and A–Z grouping use the new names too. Slugs never change.
 *
 * Values are read from the fact files themselves (displayName, officialUrl,
 * company), so there is one source of truth and every value carries the
 * official source URL it was checked against on 2026-10-20.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows. Only touches name, website, company.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-3.ts
 *   npx tsx scripts/update-catalog-audit-3.ts --apply
 *   npm run db:update-catalog-audit-3
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (production compute or pooler). Prints the target
 * host only. Never prints credentials.
 *
 * Gate G3: written for the operator to run. Agents must not execute it.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { REGISTERED_TOOL_FACTS } from "../src/data/facts/registry";

const PRODUCTION_ENDPOINT_ID = "ep-odd-mud-ajdk8f99";

/** Rows renamed, re-homed or re-linked in the 2026-10-20 cleanup. */
const CLEANUP_SLUGS = [
  "google-antigravity",
  "runway-for-education",
  "windsurf",
  "notebooklm",
  "wonder-dynamics-wonder-studio",
  "unriddle",
  "kira-systems",
  "casetext-cocounsel",
  "lexis-plus-ai",
] as const;

type SyncField = "name" | "website" | "company";
type Patch = { slug: string; fields: Partial<Record<SyncField, string>>; sources: string[] };

function patchesFromFacts(): Patch[] {
  const patches: Patch[] = [];
  for (const slug of CLEANUP_SLUGS) {
    const facts = REGISTERED_TOOL_FACTS[slug];
    if (!facts) throw new Error(`No fact file registered for ${slug}`);
    const fields: Patch["fields"] = {};
    const sources: string[] = [];
    if (facts.displayName) {
      fields.name = facts.displayName.value;
      sources.push(facts.displayName.sourceUrl);
    }
    if (facts.officialUrl) {
      fields.website = facts.officialUrl.value;
      sources.push(facts.officialUrl.sourceUrl);
    }
    if (facts.company) {
      fields.company = facts.company.value;
      sources.push(facts.company.sourceUrl);
    }
    patches.push({ slug, fields, sources: [...new Set(sources)] });
  }
  return patches;
}

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
    console.error("Could not parse a hostname from DATABASE_URL. Aborting before connect.");
    process.exit(1);
  }
  console.log(`Target database hostname: ${host}`);
  console.log(`Mode: ${dryRun ? "dry-run (no writes)" : "LIVE writes (--apply)"}`);

  if (host.startsWith(PRODUCTION_ENDPOINT_ID)) {
    console.error(
      `Refusing to run: hostname ${host} starts with ${PRODUCTION_ENDPOINT_ID} (production compute or pooler). Point DATABASE_URL at a Neon branch first.`,
    );
    process.exit(1);
  }

  const patches = patchesFromFacts();
  console.log(`Patches: ${patches.length}`);

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
    for (const patch of patches) {
      const existing = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: { name: true, website: true, company: true },
      });
      if (!existing) {
        missing += 1;
        console.warn(`! skip missing slug: ${patch.slug}`);
        continue;
      }
      const diffs = (Object.entries(patch.fields) as [SyncField, string][]).filter(
        ([key, next]) => existing[key] !== next,
      );
      if (diffs.length === 0) {
        unchanged += 1;
        console.log(`= ${patch.slug} already matches`);
        continue;
      }
      wouldChange += 1;
      console.log(`${dryRun ? "~ would update" : "~ updating"} ${patch.slug} (sources: ${patch.sources.join(", ")})`);
      for (const [key, next] of diffs) {
        console.log(`  ${key}: ${JSON.stringify(existing[key])} -> ${JSON.stringify(next)}`);
      }
      if (dryRun) continue;
      await prisma.platform.update({
        where: { slug: patch.slug },
        data: Object.fromEntries(diffs),
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
