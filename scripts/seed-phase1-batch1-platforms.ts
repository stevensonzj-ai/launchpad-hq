/**
 * Phase 1 batch 1 — upsert 18 catalog platforms by slug.
 *
 * Defer (not in this script): Cerebras Inference, Hailuo (MiniMax).
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/seed-phase1-batch1-platforms.ts
 *   npx tsx scripts/seed-phase1-batch1-platforms.ts --dry-run
 *   npx tsx scripts/seed-phase1-batch1-platforms.ts --apply
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (covers the compute, `-pooler` variant, and full
 * FQDN). Prints the full target host. Never prints credentials.
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type CostTier, type Difficulty, type PrivacyLevel } from "@prisma/client";

const PRODUCTION_ENDPOINT_ID = "ep-odd-mud-ajdk8f99";

type SeedRow = {
  slug: string;
  name: string;
  company: string;
  website: string;
  categorySlug: string;
  primaryUse: string;
  primaryUseCases: string;
  description: string;
  currentPricing: string;
  freeTierFeatures: string;
  costTier: CostTier;
  difficultyLevel: Difficulty;
  privacyLevel: PrivacyLevel;
  platformType: string[];
  apiAvailable: boolean;
  offlineCapable: boolean;
  idealUserTypes: string[];
  contentTypes: string[];
  outputFormats: string[];
};

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

function hostnameOnly(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "<unparseable URL>";
  }
}

async function countdown(seconds: number): Promise<void> {
  for (let i = seconds; i > 0; i--) {
    console.log(`Writes begin in ${i}…`);
    await new Promise((r) => setTimeout(r, 1000));
  }
}

/**
 * Catalog rows from the 2026-10-13 batch brief, plus a 2026-10-14 official
 * re-check of Kling membership prices and Qwen Model Studio API prices.
 * Notes live in description / currentPricing / freeTierFeatures — existing fields.
 */
const ROWS: SeedRow[] = [
  {
    slug: "deepseek",
    name: "DeepSeek",
    company: "DeepSeek",
    website: "https://www.deepseek.com",
    categorySlug: "international-regional-ai",
    primaryUse: "Budget chat app and pay-as-you-go API",
    primaryUseCases:
      "Casual chat without sensitive data; cheap API inference for developers; local/open-weights self-hosting",
    description:
      "Chat app and API from a China-based company. As of 2026-10-13, hosted service processes data in China — review before sending sensitive or business inputs. Open weights can be run locally so data stays on your machine. Official API pricing (deepseek-flash / DeepSeek-V4.1-Flash, as of 2026-10-13): $0.30 input (cache miss) / $1.20 output per 1M tokens at peak; off-peak is half. V4-Pro: $1.32 in / $3.96 out at peak. Context 1M tokens. Peak hours 01:00–04:00 and 06:00–10:00 UTC on weekdays. Free consumer chat-app limits are unverified.",
    currentPricing:
      "API deepseek-flash peak $0.30/$1.20 per 1M tokens in/out (off-peak half); V4-Pro peak $1.32/$3.96; free chat app limits unverified",
    freeTierFeatures: "Free consumer chat app; exact daily/monthly limits unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web", "api"],
    apiAvailable: true,
    offlineCapable: true,
    idealUserTypes: ["budget-conscious developers", "casual chat users"],
    contentTypes: ["text"],
    outputFormats: ["text"],
  },
  {
    slug: "qwen",
    name: "Qwen",
    company: "Alibaba (Qwen / Tongyi)",
    website: "https://qwen.ai",
    categorySlug: "international-regional-ai",
    primaryUse: "Hosted Qwen Chat and Alibaba Cloud Model Studio API; open weights for local use",
    primaryUseCases: "Free hosted chat; cheap API; local open-weight models via Ollama or LM Studio",
    description:
      "Alibaba's Qwen family. The hosted chat/API is operated by Alibaba (China and international regions; region routing unverified as of 2026-10-13). Open-weight models can be run locally (for example through Ollama or LM Studio), in which case prompts stay on your machine. Official Model Studio international API (re-checked 2026-10-14 at alibabacloud.com/help/en/model-studio/model-pricing): qwen-flash $0.05 input / $0.40 output per 1M tokens (≤256K); qwen3.8-max $2 / $6 per 1M tokens. Qwen Chat is described as free with no subscription; exact chat limits remain unverified.",
    currentPricing:
      "API from $0.05/$0.40 per 1M tokens (qwen-flash, International, official Model Studio as of 2026-10-14); qwen3.8-max $2/$6 per 1M; Qwen Chat free (limits unverified)",
    freeTierFeatures: "Qwen Chat reported free with no subscription (limits unverified as of 2026-10-14)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web", "api"],
    apiAvailable: true,
    offlineCapable: true,
    idealUserTypes: ["local open-weight users", "budget chat users", "developers"],
    contentTypes: ["text"],
    outputFormats: ["text"],
  },
  {
    slug: "kimi",
    name: "Kimi",
    company: "Moonshot AI",
    website: "https://www.kimi.com",
    categorySlug: "international-regional-ai",
    primaryUse: "Long-document and agentic chat",
    primaryUseCases: "Long-context reading and agent tasks for users comfortable with a China-based service",
    description:
      "Moonshot AI's Kimi assistant (Kimi K3 current as of 2026-10-13). China-based company. International membership (official help center, as of 2026-10-12): Plus $19/mo ($180/yr), Pro $39, Max $99, Ultra $199. Free-tier limits are unverified. Review data-handling before sending sensitive inputs.",
    currentPricing:
      "Plus $19/mo ($180/yr); Pro $39/mo; Max $99/mo; Ultra $199/mo; free-tier limits unverified",
    freeTierFeatures: "Free tier exists; exact limits unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["long-document readers", "agentic-task users"],
    contentTypes: ["text", "documents"],
    outputFormats: ["text"],
  },
  {
    slug: "poe",
    name: "Poe",
    company: "Quora",
    website: "https://poe.com",
    categorySlug: "text-conversational-ai",
    primaryUse: "One app to try many third-party models",
    primaryUseCases: "Beginners comparing models without signing up at each vendor",
    description:
      "Quora's multi-model chat app. Official about page (as of 2026-10-13): free for most usage; plans from $4.99/mo. Prompts are sent to whichever third-party model provider you pick. Exact free daily points are unverified (third parties cite about 300 points/day). Third-party paid point allowances: $4.99 (10k points/day), $19.99 (660k points/mo), then $49.99, $99.99, $249.99.",
    currentPricing:
      "Plans from $4.99/mo (official); higher tiers $19.99 / $49.99 / $99.99 / $249.99 (third-party point tables); free allowance unverified",
    freeTierFeatures: "Free for most usage (official); exact daily points unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web", "mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["beginners", "model-shoppers"],
    contentTypes: ["text"],
    outputFormats: ["text"],
  },
  {
    slug: "kling-ai",
    name: "Kling AI",
    company: "Kuaishou",
    website: "https://klingai.com",
    categorySlug: "video-creation-editing",
    primaryUse: "AI video and image generation",
    primaryUseCases: "Short-form video at a low monthly floor; image generation",
    description:
      "Kuaishou's Kling video and image studio. China-based company; hosted generations are processed by that service — review before uploading faces, brands, or confidential footage. Official international membership (kling.ai/llms.txt citing https://kling.ai/app/membership/membership-plan, re-checked 2026-10-14): Basic $0 (no monthly credits); Standard $8.80/mo after $6.99 first month (660 credits); Pro $32.56/mo (3,000 credits); Premier $80.96/mo (8,000); Ultra $159.99/mo (26,000). Official credits policy: $1 USD = 66 credits. Official blog states Basic-generated content is not for commercial use and carries a watermark.",
    currentPricing:
      "Basic $0; Standard $8.80/mo ($6.99 first month, 660 credits); Pro $32.56/mo; Premier $80.96/mo; Ultra $159.99/mo; $1 = 66 credits (official, as of 2026-10-14)",
    freeTierFeatures:
      "Basic free: no monthly credits; watermark; not for commercial use (official blog / membership, as of 2026-10-14)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["creators", "budget video users"],
    contentTypes: ["text", "images", "video"],
    outputFormats: ["video", "images"],
  },
  {
    slug: "hedra",
    name: "Hedra",
    company: "Hedra",
    website: "https://www.hedra.com",
    categorySlug: "video-creation-editing",
    primaryUse: "Talking-head and avatar video from face and voice uploads",
    primaryUseCases: "Avatar and talking-head clips; check likeness and recording consent before uploading others",
    description:
      "Avatar and talking-head video. Official pricing (hedra.com/pricing, as of 2026-10-13): Basic $20/mo (2,000 credits); Ultra $100/mo (18,000); Teams $75/mo (14,400); Enterprise custom. Page title states a free plan with no credit card; free-plan limits are unverified. You upload faces and voices — confirm consent and likeness rights for anyone depicted.",
    currentPricing:
      "Basic $20/mo (2,000 credits); Ultra $100/mo; Teams $75/mo; Enterprise custom; free-plan limits unverified",
    freeTierFeatures: "Free plan advertised, no credit card (page title); limits unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["creators", "marketers"],
    contentTypes: ["images", "audio", "video"],
    outputFormats: ["video"],
  },
  {
    slug: "krea",
    name: "Krea",
    company: "Krea",
    website: "https://www.krea.ai",
    categorySlug: "image-generation-editing",
    primaryUse: "Many image and video models in one studio",
    primaryUseCases: "Beginners and designers iterating stills and short video in one place",
    description:
      "Multi-model image and video studio with LoRA training and an API. Official pricing (krea.ai/pricing, as of 2026-10-13): free 100 units/day; paid list/discounted monthly prices shown as $9/$5, $35/$21, $105/$63, $200/$160. The billing basis behind the two numbers is unverified.",
    currentPricing:
      "Free 100 units/day; paid ~$9/$5, $35/$21, $105/$63, $200/$160 per month (list/discounted; billing basis unverified)",
    freeTierFeatures: "100 units/day (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["beginners", "designers"],
    contentTypes: ["text", "images"],
    outputFormats: ["images", "video"],
  },
  {
    slug: "stability-ai",
    name: "Stability AI",
    company: "Stability AI",
    website: "https://stability.ai",
    categorySlug: "local-open-source-ai",
    primaryUse: "Open image, video, and audio models under a Community License",
    primaryUseCases: "Local/open-source image work, usually through ComfyUI or another app; self-host keeps data local",
    description:
      "Publisher of Stable Diffusion and related Core Models. As of 2026-10-13, the Community License makes Core Models (including SD 3.5, SDXL Turbo, Stable Audio) free for research, personal use, and commercial use under $1M annual revenue. Enterprise pricing is custom. Self-hosting keeps inputs on your machine. Hosted-platform credit pricing was not checked (unverified).",
    currentPricing:
      "Community License free under $1M annual revenue; Enterprise custom; hosted credit pricing unverified",
    freeTierFeatures: "Core Models free under the Community License (research, personal, commercial under $1M revenue)",
    costTier: "FREE",
    difficultyLevel: "ADVANCED",
    privacyLevel: "HIGH",
    platformType: ["desktop", "api"],
    apiAvailable: true,
    offlineCapable: true,
    idealUserTypes: ["local image users", "open-source users"],
    contentTypes: ["text", "images"],
    outputFormats: ["images", "audio"],
  },
  {
    slug: "comfyui",
    name: "ComfyUI",
    company: "Comfy Org",
    website: "https://www.comfy.org",
    categorySlug: "local-open-source-ai",
    primaryUse: "Local node-based image and video generation",
    primaryUseCases: "Advanced users who want full local control; optional Comfy Cloud GPU time",
    description:
      "Free, open-source local graph UI for image and video models. Data stays on your machine when you run it locally. A capable GPU is typically required. Comfy Cloud is metered by GPU time (docs.comfy.org); the dollar rate is unverified as of 2026-10-13.",
    currentPricing: "Local: free; Comfy Cloud: metered GPU time (rate unverified as of 2026-10-13)",
    freeTierFeatures: "Full local app is free and open source",
    costTier: "FREE",
    difficultyLevel: "ADVANCED",
    privacyLevel: "HIGH",
    platformType: ["desktop", "web"],
    apiAvailable: true,
    offlineCapable: true,
    idealUserTypes: ["advanced local users"],
    contentTypes: ["text", "images"],
    outputFormats: ["images", "video"],
  },
  {
    slug: "fireflies-ai",
    name: "Fireflies.ai",
    company: "Fireflies.ai",
    website: "https://fireflies.ai",
    categorySlug: "meetings-notes",
    primaryUse: "Meeting transcription and searchable notes via a meeting bot",
    primaryUseCases: "Teams that want searchable transcripts of calls",
    description:
      "A bot joins your calls and transcribes them. As of 2026-10-13: some US states require all-party consent to record — tell every attendee before the bot joins and follow the law where participants are located. Official pricing (fireflies.ai/pricing): Free forever; Pro $18/mo ($10 annual); Business $29 ($19 annual); Enterprise $39 (annual only). Free-tier transcription is described as unlimited; other free limits are unverified.",
    currentPricing: "Free forever; Pro $18/mo ($10 annual); Business $29/mo ($19 annual); Enterprise $39/mo annual",
    freeTierFeatures: "Free forever; unlimited transcription stated; other limits unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["teams", "managers"],
    contentTypes: ["audio", "meetings"],
    outputFormats: ["transcripts", "notes"],
  },
  {
    slug: "granola",
    name: "Granola",
    company: "Granola",
    website: "https://www.granola.ai",
    categorySlug: "meetings-notes",
    primaryUse: "Bot-free meeting notes from device audio",
    primaryUseCases: "Individuals who want notes without a visible meeting bot",
    description:
      "Captures device audio; no bot joins the call, so other attendees may not know they are being recorded. Recording consent is still required — tell participants and follow all-party consent laws where they apply. Official pricing (granola.ai/pricing, as of 2026-10-13): Basic $0 with limited meeting history; Business $14/user/mo; Enterprise $35/user/mo. Model-training opt-out is offered.",
    currentPricing: "Basic $0 (limited history); Business $14/user/mo; Enterprise $35/user/mo",
    freeTierFeatures: "Basic $0 with limited meeting history (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["individuals", "founders"],
    contentTypes: ["audio", "meetings"],
    outputFormats: ["notes"],
  },
  {
    slug: "fathom",
    name: "Fathom",
    company: "Fathom",
    website: "https://www.fathom.ai",
    categorySlug: "meetings-notes",
    primaryUse: "Free unlimited meeting recording and transcription",
    primaryUseCases: "Individuals who want a free recorder; teams on paid seats",
    description:
      "Meeting recorder at fathom.ai (not fathom.video). Recording consent applies: tell attendees and follow all-party consent laws where they apply. Official pricing (fathom.ai/pricing, as of 2026-10-13): Free with unlimited recordings and transcription; Premium $20/mo ($16 annual); Team $19/user ($15 annual, 2-user minimum); Business $34/user ($25 annual).",
    currentPricing:
      "Free (unlimited recordings); Premium $20/mo ($16 annual); Team $19/user/mo ($15 annual, 2-seat min); Business $34/user/mo ($25 annual)",
    freeTierFeatures: "Unlimited recordings and transcription (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["individuals", "small teams"],
    contentTypes: ["audio", "meetings"],
    outputFormats: ["transcripts", "notes"],
  },
  {
    slug: "gamma",
    name: "Gamma",
    company: "Gamma",
    website: "https://gamma.app",
    categorySlug: "document-pdf-processing",
    primaryUse: "AI-generated presentations and docs",
    primaryUseCases: "Beginners who need slides or a short doc fast",
    description:
      "Presentation and document generator. Official tiers (gamma.app/pricing, as of 2026-10-13): Free 400 one-time credits, up to 10 slides per prompt; Plus $12/mo ($9 annual); Pro $25/mo ($18 annual); Ultra $100/mo ($90 annual); Business $40/seat (annual). SOC 2 Type II certified.",
    currentPricing:
      "Free 400 one-time credits; Plus $12/mo ($9 annual); Pro $25/mo ($18 annual); Ultra $100/mo ($90 annual); Business $40/seat annual",
    freeTierFeatures: "400 one-time credits; up to 10 slides per prompt (as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["beginners", "marketers"],
    contentTypes: ["text"],
    outputFormats: ["slides", "documents"],
  },
  {
    slug: "napkin-ai",
    name: "Napkin AI",
    company: "Napkin",
    website: "https://www.napkin.ai",
    categorySlug: "document-pdf-processing",
    primaryUse: "Turn text into diagrams for docs and slides",
    primaryUseCases: "Visuals from written notes without a design tool",
    description:
      "Text-to-diagram visuals. Official pricing (napkin.ai/pricing, as of 2026-10-13): Free 500 AI credits/week with Napkin branding on visuals; Plus $9/person/mo; Pro $22/mo. Yearly billing saves 25%. Usual SaaS data-handling; no extra privacy flag beyond that.",
    currentPricing: "Free 500 credits/week; Plus $9/person/mo; Pro $22/mo; yearly billing saves 25%",
    freeTierFeatures: "500 AI credits/week; Napkin branding on visuals (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["writers", "beginners"],
    contentTypes: ["text"],
    outputFormats: ["diagrams", "images"],
  },
  {
    slug: "cline",
    name: "Cline",
    company: "Cline",
    website: "https://cline.bot",
    categorySlug: "ai-coding-development",
    primaryUse: "Open-source coding agent in VS Code or CLI, BYOK or pay-for-inference",
    primaryUseCases: "Developers who want a model-agnostic agent, including local models",
    description:
      "Free open-source VS Code extension and CLI. You pay for inference at cost or bring your own key. Client-side architecture; local models are possible so code can stay on your machine. Enterprise is contact-sales (cline.bot/pricing, as of 2026-10-13).",
    currentPricing: "Open source free; pay for inference or BYOK; Enterprise contact sales",
    freeTierFeatures: "Full client is free; you supply model access (local or a key)",
    costTier: "FREE",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "HIGH",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: true,
    idealUserTypes: ["developers"],
    contentTypes: ["code"],
    outputFormats: ["code"],
  },
  {
    slug: "manus",
    name: "Manus",
    company: "Manus",
    website: "https://manus.im",
    categorySlug: "workflow-automation",
    primaryUse: "Autonomous cloud-browser agent for multi-step tasks",
    primaryUseCases: "Delegating research or multi-step web tasks; do not hand it logins you cannot rotate",
    description:
      "Autonomous agent that acts in a cloud browser, so it can see pages and data you give it. Official help-center pricing (as of 2026-10-13): Free 300 credits/day (capped 1,500/mo), Manus 2.0 Lite only; Pro from $20/mo (4,000 credits) or from $40/mo (8,000, 7-day trial); Team from $20/seat; annual billing saves 17%. Originally a China-founded company; current ownership and data jurisdiction are unverified.",
    currentPricing:
      "Free 300 credits/day (max 1,500/mo); Pro from $20/mo; Pro 8,000 credits from $40/mo; Team from $20/seat; annual −17%",
    freeTierFeatures: "300 credits/day, max 1,500/mo, Manus 2.0 Lite only (official help center, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["curious beginners", "researchers"],
    contentTypes: ["web", "text"],
    outputFormats: ["research", "files"],
  },
  {
    slug: "openrouter",
    name: "OpenRouter",
    company: "OpenRouter",
    website: "https://openrouter.ai",
    categorySlug: "ai-apis-developer-services",
    primaryUse: "One API for many models, including free-tier models",
    primaryUseCases: "Developers who want a single key across vendors; paid data-policy routing",
    description:
      "Multi-provider LLM router. Official pricing (openrouter.ai/pricing, as of 2026-10-13): 25+ free models, 50 requests/day; Standard pay-as-you-go plus 5.5% platform fee; Business 8% fee plus EU/US in-region routing; Enterprise custom; BYOK $25k/mo fee-free then 5%. Data-policy routing is paid-only. Whether free-model providers log prompts is unverified.",
    currentPricing:
      "Free 50 req/day on 25+ free models; Standard PAYG + 5.5%; Business +8%; BYOK $25k/mo fee-free then 5%",
    freeTierFeatures: "25+ free models, 50 requests/day (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "MEDIUM",
    platformType: ["api"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["developers"],
    contentTypes: ["text"],
    outputFormats: ["text"],
  },
  {
    slug: "firecrawl",
    name: "Firecrawl",
    company: "Firecrawl",
    website: "https://www.firecrawl.dev",
    categorySlug: "ai-apis-developer-services",
    primaryUse: "Crawl and convert websites into LLM-ready data",
    primaryUseCases: "Builders feeding web pages to models; self-host if you need the data on your infra",
    description:
      "Web crawl/scrape API. Official pricing (firecrawl.dev/pricing, as of 2026-10-13): Free 1,000 credits/mo, no card; Hobby $16/mo annual (5,000 credits); Standard $83/mo annual (100k); Growth $333/mo annual (500k). Open source with a self-host option.",
    currentPricing:
      "Free 1,000 credits/mo; Hobby $16/mo annual; Standard $83/mo annual; Growth $333/mo annual",
    freeTierFeatures: "1,000 credits/mo, no credit card (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "HIGH",
    platformType: ["api", "web"],
    apiAvailable: true,
    offlineCapable: true,
    idealUserTypes: ["developers", "builders"],
    contentTypes: ["web"],
    outputFormats: ["markdown", "json"],
  },
];

function isFullyConfirmed(row: SeedRow): boolean {
  const blob = [row.description, row.currentPricing, row.freeTierFeatures].join("\n");
  return !/\bunverified\b/i.test(blob);
}

function batch1Content(row: SeedRow, categoryId: string) {
  return {
    name: row.name,
    company: row.company,
    website: row.website,
    categoryId,
    primaryUse: row.primaryUse,
    primaryUseCases: row.primaryUseCases,
    description: row.description,
    currentPricing: row.currentPricing,
    freeTierFeatures: row.freeTierFeatures,
    costTier: row.costTier,
    difficultyLevel: row.difficultyLevel,
    privacyLevel: row.privacyLevel,
    platformType: row.platformType,
    apiAvailable: row.apiAvailable,
    offlineCapable: row.offlineCapable,
    idealUserTypes: row.idealUserTypes,
    contentTypes: row.contentTypes,
    outputFormats: row.outputFormats,
    verified: isFullyConfirmed(row),
  };
}

function toCreateData(row: SeedRow, categoryId: string) {
  return {
    slug: row.slug,
    ...batch1Content(row, categoryId),
    // Curated fields: create defaults only. Updates must not overwrite them.
    featured: false,
    directAlternatives: [] as string[],
    complementaryTools: [] as string[],
    budgetAlternativeTo: [] as string[],
    privacyAlternativeTo: [] as string[],
  };
}

function toUpdateData(row: SeedRow, categoryId: string) {
  return batch1Content(row, categoryId);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply || process.argv.includes("--dry-run");

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const directUrl = getDirectUrl();
  const host = hostnameOnly(directUrl);
  console.log(`Target database hostname: ${host}`);
  console.log(`Mode: ${dryRun ? "dry-run (no writes)" : "LIVE writes (--apply)"}`);
  console.log(`Rows: ${ROWS.length} (Cerebras and Hailuo deferred)`);

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
    const slugs = [...new Set(ROWS.map((r) => r.categorySlug))];
    const categories = await prisma.category.findMany({
      where: { slug: { in: slugs } },
      select: { id: true, slug: true, name: true },
    });
    const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));
    const missingCats = slugs.filter((s) => !categoryIdBySlug.has(s));
    if (missingCats.length) {
      throw new Error(`Category slug(s) not found: ${missingCats.join(", ")}`);
    }

    let created = 0;
    let updated = 0;

    for (const row of ROWS) {
      const categoryId = categoryIdBySlug.get(row.categorySlug)!;
      const existing = await prisma.platform.findUnique({
        where: { slug: row.slug },
        select: { id: true, slug: true, name: true },
      });

      const verified = isFullyConfirmed(row);
      if (dryRun) {
        console.log(
          `${existing ? "~ would update" : "+ would create"} ${row.slug} verified=${verified}`,
        );
        continue;
      }

      await prisma.platform.upsert({
        where: { slug: row.slug },
        create: toCreateData(row, categoryId),
        update: toUpdateData(row, categoryId),
      });

      if (existing) {
        updated += 1;
        console.log(`~ updated ${row.slug} verified=${verified}`);
      } else {
        created += 1;
        console.log(`+ created ${row.slug} verified=${verified}`);
      }
    }

    console.log(
      dryRun
        ? "Dry-run complete. No rows written."
        : `Done. created=${created} updated=${updated} total=${ROWS.length}`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
