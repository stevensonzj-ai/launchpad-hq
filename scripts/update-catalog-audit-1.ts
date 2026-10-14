/**
 * Catalog audit #1 — UPDATE-only pricing/copy patches by slug.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 * Never creates or deletes rows. Never changes categoryId.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/update-catalog-audit-1.ts
 *   npx tsx scripts/update-catalog-audit-1.ts --dry-run
 *   npx tsx scripts/update-catalog-audit-1.ts --apply
 *   npm run db:update-catalog-audit-1
 *   npm run db:update-catalog-audit-1 -- --apply
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (covers the compute, `-pooler` variant, and full
 * FQDN). Prints the full target host. Never prints credentials.
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 *
 * Research stamp: official vendor pages re-checked 2026-10-14.
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
    slug: "writesonic-chatsonic",
    finding: "High: Writesonic repositioned as SEO/GEO; Starter $79+",
    sourceUrl: "https://writesonic.com/pricing",
    verified: true,
    fields: {
      primaryUse: "SEO + GEO (AI-search visibility) platform",
      primaryUseCases:
        "Tracking whether ChatGPT, Gemini, and Google AI Overviews mention a brand; AI articles and site audits to close visibility gaps",
      description:
        "Writesonic is an SEO and GEO (AI-search visibility) tool: it tracks whether ChatGPT, Gemini, and Google AI Overviews mention your brand, then offers AI articles, site audits, and agent workflows to act on the gaps. Chatsonic, the old chatbot, is no longer what it sells. Official pricing (writesonic.com/pricing, as of 2026-10-14, billed annually at the listed monthly rates): Starter $79/mo, Basic $199/mo, Growth $399/mo, Enterprise custom. Annual billing saves 20%. No $16 plan on the pricing table. Start free, no credit card required.",
      currentPricing:
        "Starter $79/mo billed annually; Basic $199; Growth $399; Enterprise custom; annual saves 20% (official, as of 2026-10-14)",
      freeTierFeatures:
        "Start free, no credit card required (official, as of 2026-10-14)",
      costTier: "PAID",
    },
  },
  {
    slug: "copy-ai",
    finding: "High: Copy.ai Chat $29/mo; no free plan on pricing page",
    sourceUrl: "https://www.copy.ai/prices",
    verified: true,
    fields: {
      currentPricing:
        "Chat $29/mo billed monthly ($24/mo billed $288/yr); Growth $1,000/mo ($12,000/yr); Expansion $2,000/mo; Scale $3,000/mo; Enterprise custom (official, as of 2026-10-14)",
      freeTierFeatures:
        "No free plan listed on copy.ai/prices as of 2026-10-14; prior 2,000-words/mo claim could not be confirmed",
      costTier: "PAID",
    },
  },
  {
    slug: "notion-ai",
    finding: "High: Notion AI add-on replaced by plan-included AI",
    sourceUrl: "https://www.notion.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Plus $10/member/mo; Business $20/member/mo (Notion Agent and AI Meeting Notes included); Enterprise custom; Custom Agents $10 per 1,000 monthly Notion credits after a free trial (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free $0/member/mo includes a trial of Notion AI; full Notion Agent is listed on Business (official, as of 2026-10-14)",
    },
  },
  {
    slug: "jasper",
    finding: "Medium: Jasper Creator gone; Pro $69/$59",
    sourceUrl: "https://www.jasper.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Pro $69/mo billed monthly or $59/mo billed yearly; Business custom; 7-day Pro trial (official FAQ on jasper.ai/pricing, as of 2026-10-14). No Creator plan on the live plan table.",
      freeTierFeatures: "No free plan; 7-day free trial of Pro (official, as of 2026-10-14)",
      costTier: "PAID",
    },
  },
  {
    slug: "gemini",
    finding: "Medium: drop Gemini Advanced name; Google AI Plus/Pro/Ultra",
    sourceUrl: "https://gemini.google/subscriptions/",
    verified: false,
    fields: {
      currentPricing:
        "Free $0; Google AI Plus (2× Free usage); Google AI Pro (4× Free usage); Google AI Ultra from $99.99/mo (a $199.99/mo Ultra band is also listed). Plus and Pro dollar amounts did not render on the official page as of 2026-10-14 — do not quote the old “Advanced $19.99” name.",
      freeTierFeatures:
        "Free Gemini app access including Flash-Lite, image generation/editing, Deep Research, Gemini Live, Canvas, and Gems; 15 GB Google storage (official, as of 2026-10-14)",
    },
  },
  {
    slug: "mistral-ai-le-chat",
    finding: "Medium: Mistral Pro and Team prices",
    sourceUrl: "https://mistral.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Pro $14.99/mo (verified students $5.99/mo); Team $24.99/user/mo; Enterprise custom (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free plan: limited messages, web searches, coding sessions, and basic image generation; 100+ connectors (official, as of 2026-10-14)",
    },
  },
  {
    slug: "synthesia",
    finding: "High: Synthesia Basic $0 / 500 credits; Starter $29; Pro $89",
    sourceUrl: "https://www.synthesia.io/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Basic $0/mo; Starter $29/mo monthly; Pro $89/mo monthly (higher Pro credit packs also listed); annual billing is cheaper (Starter/Pro yearly equivalents shown on the plan cards). Official synthesia.io/pricing as of 2026-10-14.",
      freeTierFeatures:
        "Basic $0: 10 min of video, 3 survey responses, and 500 credits every month (official FAQ, as of 2026-10-14)",
      costTier: "FREEMIUM",
    },
  },
  {
    slug: "luma-dream-machine-ray3",
    finding: "High: Luma Plus/Pro/Ultra; no free plan on pricing page",
    sourceUrl: "https://lumalabs.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Plus $30/mo ($25/mo billed yearly, $300/yr); Pro $90/mo ($75/mo yearly, $900/yr); Ultra $300/mo ($250/mo yearly, $3,000/yr); Team and Enterprise contact sales (official, as of 2026-10-14)",
      freeTierFeatures:
        "No free plan listed on lumalabs.ai/pricing as of 2026-10-14; homepage still offers a try-free path whose allowance is unpublished",
      costTier: "PAID",
    },
  },
  {
    slug: "runway",
    finding: "Medium: Runway Pro vs Max; Standard $15/$12",
    sourceUrl: "https://runwayml.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Standard $15/mo monthly or $12/mo billed annually; Pro $35/$28; Max $95/$76 (official, as of 2026-10-14). The old “Pro $76” figure is Max billed annually.",
      freeTierFeatures:
        "Free plan: one-time 125 credits that do not expire (official FAQ, as of 2026-10-14)",
    },
  },
  {
    slug: "heygen",
    finding: "Medium: HeyGen Creator $29; Pro $49; Free $0",
    sourceUrl: "https://www.heygen.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Creator $29/mo (or $24/mo billed annually); Pro from $49/mo; Business $149/mo + $20/seat; Enterprise contact sales (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free $0: 3 videos/mo up to 1 min, Avatar IV access, 500+ stock avatars, 1 custom video avatar; no credit card (official, as of 2026-10-14)",
    },
  },
  {
    slug: "invideo-ai",
    finding: "Medium: InVideo Starter/Plus/Max per-seat",
    sourceUrl: "https://invideo.io/pricing",
    verified: false,
    fields: {
      currentPricing:
        "Starter $20/seat/mo ($10/seat/mo billed annually); Plus $30/seat/mo billed annually; Max $75/seat/mo billed annually (compare table, invideo.io/pricing, as of 2026-10-14). Monthly Plus/Max dollar amounts did not fully render — left unverified rather than guessed.",
    },
  },
  {
    slug: "pictory-ai",
    finding: "Medium: Pictory Starter $29 / Professional $59 / Team $199",
    sourceUrl: "https://pictory.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Starter $29/mo ($25 billed annually); Professional $59/mo ($35 annual); Team $199/mo ($119 annual); Enterprise custom (official, as of 2026-10-14)",
      freeTierFeatures:
        "No free plan; 14-day trial (3 video projects) on the pricing page as of 2026-10-14",
    },
  },
  {
    slug: "pika",
    finding: "Medium: Pika Starter/Creator/Fancy; Free 0 monthly credits",
    sourceUrl: "https://pika.art/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits); Fancy $95–$880/mo ($76–$704 annual) (official compare table, as of 2026-10-14)",
      freeTierFeatures:
        "Free $0 with 0 monthly credits (credit packs only) as of 2026-10-14; no-watermark listed on Free in the compare table",
    },
  },
  {
    slug: "claude-code",
    finding: "High: Claude Code from Pro $17–20, not Max-only",
    sourceUrl: "https://claude.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Claude Code is included on paid Claude plans: Pro $17/mo with annual ($20 billed monthly); Max from $100/mo; also Team and Enterprise. Not included on Free (official compare table, as of 2026-10-14).",
      freeTierFeatures:
        "No Claude Code on the Free plan. Available from Pro ($17–20/mo) and Max (from $100/mo) (official, as of 2026-10-14)",
      costTier: "PAID",
    },
  },
  {
    slug: "kiro",
    finding: "High: Kiro out of preview; Free 50 credits plus paid tiers",
    sourceUrl: "https://kiro.dev/pricing/",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Pro $20/user/mo; Pro+ $40; Pro Max $100; Power $200 per user/mo; Enterprise via AWS (official, as of 2026-10-14)",
      freeTierFeatures:
        "Perpetual Free tier: 50 credits/mo (do not roll over); rate-limited models (official, as of 2026-10-14). Not “free during preview.”",
      costTier: "FREEMIUM",
    },
  },
  {
    slug: "bolt-new",
    finding: "Medium: Bolt Pro $25/mo; Free 1M tokens/mo",
    sourceUrl: "https://bolt.new/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Pro $25/mo billed monthly; Teams $30/member/mo billed monthly; Enterprise custom (official, as of 2026-10-14)",
      freeTierFeatures:
        "Free: 300K tokens daily limit, 1M tokens per month, Bolt branding on sites, 10MB upload (official, as of 2026-10-14)",
    },
  },
  {
    slug: "v0",
    finding: "Medium: v0 Plus $30/user/mo; Free 7 messages/day",
    sourceUrl: "https://v0.app/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Plus $30/user/mo; Business $100/user/mo (official, as of 2026-10-14). The old “Premium $20” name is gone.",
      freeTierFeatures:
        "Free $0: 7 messages/day limit (official, as of 2026-10-14)",
    },
  },
  {
    slug: "github-copilot",
    finding: "Medium: Copilot Pro+ $39 and Max $100",
    sourceUrl: "https://github.com/features/copilot/plans",
    verified: true,
    fields: {
      currentPricing:
        "Free $0; Pro $10/mo; Pro+ $39/mo; Max $100/mo. The same page also lists GitHub AI Credit pack prices (Pro $15, Pro+ $70, Max $200) alongside the base plans (official, as of 2026-10-14).",
      freeTierFeatures:
        "Free plan: limited chat and agent usage (official). Exact free completion/chat counts under the credit model were not confirmed as of 2026-10-14 — prior “2K completions + 50 chats” left unverified.",
    },
  },
  {
    slug: "assemblyai",
    finding: "Medium: AssemblyAI $0.15–$0.21/hr",
    sourceUrl: "https://www.assemblyai.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Pay-as-you-go pre-recorded: Universal-2 $0.15/hr; Universal-3.5 Pro $0.21/hr; $50 free credits on signup (official, as of 2026-10-14)",
    },
  },
  {
    slug: "pinecone",
    finding: "Medium: Pinecone Builder $20; Standard $50 min",
    sourceUrl: "https://www.pinecone.io/pricing/",
    verified: true,
    fields: {
      currentPricing:
        "Starter Free; Builder $20/mo flat; Standard $50/mo minimum then pay-as-you-go; Enterprise $500/mo minimum (official, as of 2026-10-14)",
      freeTierFeatures:
        "Starter Free: on-demand database, inference, assistant; usage caps (e.g. ~2 GB storage) (official, as of 2026-10-14)",
    },
  },
  {
    slug: "deepgram",
    finding: "Medium: Deepgram Nova-3 floor $0.0048 promo / $0.0077 regular",
    sourceUrl: "https://deepgram.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Pay-as-you-go; Nova-3 Monolingual pre-recorded currently $0.0048/min promotional (strikethrough regular $0.0077/min). $200 credit on signup (official, as of 2026-10-14).",
    },
  },
  {
    slug: "anthropic-api",
    finding: "Medium: Anthropic API current-gen rates (re-verified 2026-10-14)",
    sourceUrl: "https://claude.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "API per 1M tokens (claude.com/pricing, as of 2026-10-14): Opus 5.5 $4 in / $20 out; Sonnet 5.5 $2 / $10; Haiku 5.5 $0.50 / $2.50 (lower ≤100K-prompt rates also listed); Fable 5.1 $10 / $50. Older-generation Opus/Sonnet/Haiku rates remain on the legacy table.",
    },
  },
  {
    slug: "together-ai",
    finding: "Low: Together AI floor from $0.04/M (and some $0 models)",
    sourceUrl: "https://www.together.ai/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Serverless chat from $0.04/M input tokens (Tev1 4B Experimental); some listed models at $0.00; prepaid credit, $5 minimum historically (official table, as of 2026-10-14)",
    },
  },
  {
    slug: "replit-agent",
    finding: "Low: Replit Core $20 (rename from Pro)",
    sourceUrl: "https://replit.com/pricing",
    verified: true,
    fields: {
      currentPricing:
        "Core $20/mo ($18/mo billed annually) including $20 toward more powerful models; higher individual tier $100/mo ($90 annual) with $100 of model credits; Enterprise custom (official, as of 2026-10-14)",
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
        },
      });

      if (!existing) {
        skippedMissing += 1;
        console.warn(`! skip missing slug: ${patch.slug} (${patch.finding})`);
        continue;
      }

      const entries = fieldEntries(patch.fields);
      const diffs = entries.filter(([key, next]) => existing[key] !== next);

      if (diffs.length === 0) {
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

      if (dryRun) continue;

      const data: Record<string, string | CostTier> = {};
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
