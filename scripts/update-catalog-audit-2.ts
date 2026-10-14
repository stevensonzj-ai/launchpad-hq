/**
 * Catalog audit #2 — UPDATE-only pricing/copy patches by slug.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows. Never changes categoryId.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-2.ts
 *   npx tsx scripts/update-catalog-audit-2.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-2.ts --apply
 *   npm run db:update-catalog-audit-2
 *   npm run db:update-catalog-audit-2 -- --apply
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (covers the compute, `-pooler` variant, and full
 * FQDN). Prints the full target host. Never prints credentials. Exits if
 * no hostname parses.
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 *
 * Research stamp: official vendor pages re-checked 2026-10-14.
 *
 * Skipped this pass (see PR): PlayHT (official pricing 500; acquisition
 * unconfirmed); Gumloop ([U] prices did not render); Semrush dollar
 * amounts (prices did not render); AIVA monthly prices ([U]).
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type CostTier } from "@prisma/client";

const PRODUCTION_ENDPOINT_ID = "ep-odd-mud-ajdk8f99";

type PatchableField =
  | "currentPricing"
  | "freeTierFeatures"
  | "description"
  | "primaryUse"
  | "primaryUseCases"
  | "costTier";

type CatalogPatch = {
  slug: string;
  finding: string;
  sourceUrl: string;
  verified: boolean;
  fields: Partial<Record<PatchableField, string | CostTier>>;
};

const PATCHES: CatalogPatch[] = [
  {
    slug: "lindy-ai",
    finding: "High: Lindy $50 credits/7 days; Team $29.99/mo for 3,000 credits",
    sourceUrl: "https://www.lindy.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Start with $50 in free credits lasting 7 days (no card). Team $29.99/mo for 3,000 credits (pooled); top-ups $10 per 1,000 credits; Enterprise custom (official lindy.ai/pricing, as of 2026-10-14).",
      freeTierFeatures:
        "No ongoing free plan. $50 in free credits, last 7 days, no credit card (official, as of 2026-10-14)",
      costTier: "PAID",
    },
  },
  {
    slug: "mem",
    finding: "High: Mem Free exists; Plus $9; Pro $29 (official page, contra [U-partial] “no free plan”)",
    sourceUrl: "https://get.mem.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Plus $9/mo; Pro $29/mo; Pro 2× $49; Pro 5× $99; Pro 10× $149; Pro 20× $199; Extra Usage +$50 on Pro 20× (official table, as of 2026-10-14)",
      freeTierFeatures:
        "Free: 25 messages/mo, 25 new notes, task tracking on those notes, 15 open tasks/projects, 3 hours Voice Mode (official, as of 2026-10-14)",
      costTier: "FREEMIUM",
    },
  },
  {
    slug: "descript",
    finding: "Medium: Descript Hobbyist/Creator/Business 2026 prices",
    sourceUrl: "https://www.descript.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Hobbyist $24/person/mo monthly or $16 annual; Creator $35/$24; Business $65/$50 per person; Enterprise custom (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free $0: 60 media minutes/mo, 720p watermarked export, limited AI (official compare table, as of 2026-10-14)",
      costTier: "FREEMIUM",
    },
  },
  {
    slug: "elevenlabs",
    finding: "Medium: ElevenLabs Starter $6; Creator $22; Pro $99; Scale $299",
    sourceUrl: "https://elevenlabs.io/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0 (10k credits/mo); Starter $6/mo (30k credits; first-month promo $1 shown until Oct 18, 2026); Creator $22/mo (121k; first-month $11 shown); Pro $99 (600k); Scale $299 (1.8M, 3 seats); Business $990 (6M, 10 seats); Enterprise custom. Annual = 10 months (Starter $5 equivalent, Creator $18.33, Pro $82.50) (official FAQ, as of 2026-10-14)",
      freeTierFeatures:
        "Free $0: 10,000 credits/month; 3 Studio projects (official, as of 2026-10-14)",
    },
  },
  {
    slug: "surfer-seo",
    finding: "Medium: Surfer Discovery $49 through Peace of Mind $299 yearly",
    sourceUrl: "https://surferseo.com/pricing/",
    verified: true,
    fields: {
      currentPricing:
        "Discovery $49/mo billed yearly; AI Search Analytics $82/mo billed yearly; Standard $99/mo billed yearly; next tier $182/mo billed yearly; Peace of Mind $299/mo billed yearly; Enterprise custom (official, as of 2026-10-14). Monthly sticker prices were not the figures shown on the fetched cards.",
      freeTierFeatures:
        "No full-product free plan on surferseo.com/pricing as of 2026-10-14; Keyword Surfer extension is separate and free",
    },
  },
  {
    slug: "mubert",
    finding: "Medium: Mubert Creator $14; Pro $39 commercial; Business $199",
    sourceUrl: "https://mubert.com/render/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Ambassador Free; Creator $14/mo ($11.69 shown as discounted); Pro $39/mo commercial ($32.49 discounted); Business $199/mo ($149.29 discounted) (official compare table, as of 2026-10-14)",
      freeTierFeatures:
        "Ambassador free: 25 generations/mo, 5 downloads/mo, non-commercial (official, as of 2026-10-14)",
    },
  },
  {
    slug: "activepieces",
    finding: "Medium: Activepieces Free $0; Plus $20; Team $200; Embed from $36k/yr",
    sourceUrl: "https://www.activepieces.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0 forever, no card (1,000 credits; reset daily); Plus $20/mo flat (10,000 credits); Team $200/mo (50,000 credits, 25 users); Ultimate custom; Embed from $36k/year (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free forever, no card: 1,000 credits with daily reset, unlimited flows, up to 5 users (official, as of 2026-10-14)",
      costTier: "FREEMIUM",
    },
  },
  {
    slug: "grok",
    finding: "Medium: Grok via SuperGrok and The X Subscription, not X Premium+ only",
    sourceUrl: "https://docs.x.ai/x-subscription/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Grok is a standalone app (web/iOS/Android) and is also sold through SuperGrok and The X Subscription — not only as an X Premium+ perk. The X Subscription (docs.x.ai/x-subscription/pricing, as of 2026-10-14): Free $0; Plus $8/mo ($80/yr); Premium $30/mo ($300/yr) includes SuperGrok-equivalent benefits plus Cursor Pro and X Premium+ when an X account is connected; Super $100/mo ($1,000/yr); Ultra $200/mo ($2,000/yr). Existing SuperGrok and Cursor plans continue unless you switch. This row is the chatbot, not Grok Bot.",
      freeTierFeatures:
        "Free $0 on The X Subscription: daily/limited Grok access (official, as of 2026-10-14). Exact free-pool size unverified.",
      costTier: "FREEMIUM",
    },
  },
  {
    slug: "tactiq",
    finding: "Low: Tactiq annual Pro $8 / Team $16.67 / Business $29.17; monthly [U] skipped",
    sourceUrl: "https://tactiq.io/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free forever $0; Pro $8/user/mo billed annually; Team $16.67/user/mo billed annually; Business $29.17/user/mo billed annually; Enterprise custom. Monthly (non-annual) prices unverified (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free forever, no card: 10 transcripts/mo and 5 AI credits (official FAQ, as of 2026-10-14)",
    },
  },
  {
    slug: "photoroom",
    finding: "Low: Photoroom Pro $7.50/mo billed yearly; Max/Ultra monthly dollars [U]",
    sourceUrl: "https://www.photoroom.com/pricing",
    verified: false,
    fields: {
      currentPricing:
        "Pro $7.50/mo billed yearly (8,000 AI credits, 1,000 exports). Max and Ultra are listed as yearly billed plans; their dollar amounts did not render on the fetched page — unverified. Enterprise custom (official, as of 2026-10-14). Monthly (non-yearly) prices unverified.",
      freeTierFeatures:
        "A free path is not priced on the paid-plan cards fetched 2026-10-14; do not quote the old $12.99/mo Pro figure.",
    },
  },
  {
    slug: "n8n",
    finding: "Low: n8n Cloud Starter €20/mo billed annually (2.5k executions)",
    sourceUrl: "https://n8n.io/pricing/",
    verified: true,
    fields: {
      currentPricing:
        "Cloud Starter €20/mo billed annually (2.5k executions); Pro €50/mo billed annually; Business €667/mo billed annually; Enterprise custom; Community Edition self-host free (official, as of 2026-10-14). Do not quote “from $20/mo.”",
      freeTierFeatures:
        "Self-host Community Edition free; Cloud has a trial (no card on Starter/Pro trial per FAQ). Not a free forever Cloud plan (official, as of 2026-10-14)",
    },
  },
  {
    slug: "flux",
    finding: "Low: FLUX API calculator default ~$0.048/image",
    sourceUrl: "https://bfl.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Pay as you go, no subscriptions. Official API calculator default ~$0.048/image (768×768, 1 image) as of 2026-10-14. Open-weights licensing (Builder/Platform) is separate and custom.",
    },
  },
];

const EXPECTED_CHANGED_ROWS = PATCHES.length;

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

function fieldEntries(fields: CatalogPatch["fields"]): [PatchableField, string | CostTier][] {
  return (Object.entries(fields) as [PatchableField, string | CostTier | undefined][]).filter(
    (entry): entry is [PatchableField, string | CostTier] => entry[1] !== undefined,
  );
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
  console.log(`Patches: ${PATCHES.length}`);
  console.log(`Expected changed rows (if every slug exists): ${EXPECTED_CHANGED_ROWS}`);

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

  const adapter = new PrismaPg(directUrl);
  const prisma = new PrismaClient({ adapter } as any);

  try {
    let wouldChange = 0;
    let skippedMissing = 0;
    let unchanged = 0;
    let updated = 0;

    for (const patch of PATCHES) {
      const existing = await prisma.platform.findUnique({
        where: { slug: patch.slug },
        select: {
          slug: true,
          currentPricing: true,
          freeTierFeatures: true,
          description: true,
          primaryUse: true,
          primaryUseCases: true,
          costTier: true,
          verified: true,
        },
      });

      if (!existing) {
        skippedMissing += 1;
        console.warn(`! skip missing slug: ${patch.slug} (${patch.finding})`);
        continue;
      }

      const entries = fieldEntries(patch.fields);
      const diffs = entries.filter(([key, next]) => existing[key] !== next);
      const verifiedDiff = existing.verified !== patch.verified;

      if (diffs.length === 0 && !verifiedDiff) {
        unchanged += 1;
        console.log(`= ${patch.slug} already matches; no field changes`);
        continue;
      }

      wouldChange += 1;
      console.log(`${dryRun ? "~ would update" : "~ updating"} ${patch.slug} (${patch.finding})`);
      for (const [key, next] of diffs) {
        console.log(`  ${key}:`);
        console.log(`    old: ${JSON.stringify(existing[key])}`);
        console.log(`    new: ${JSON.stringify(next)}`);
      }
      if (verifiedDiff) {
        console.log(`  verified:`);
        console.log(`    old: ${JSON.stringify(existing.verified)}`);
        console.log(`    new: ${JSON.stringify(patch.verified)}`);
      }

      if (dryRun) continue;

      const data: Record<string, string | CostTier | boolean> = {
        verified: patch.verified,
      };
      for (const [key, next] of diffs) {
        data[key] = next;
      }
      await prisma.platform.update({
        where: { slug: patch.slug },
        data,
      });
      updated += 1;
    }

    console.log("---");
    console.log(`Expected changed rows (operator check): ${EXPECTED_CHANGED_ROWS}`);
    console.log(
      dryRun
        ? `Dry-run complete. No rows written. wouldChange=${wouldChange} alreadyMatched=${unchanged} missing=${skippedMissing}`
        : `Done. updated=${updated} alreadyMatched=${unchanged} missing=${skippedMissing}`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
