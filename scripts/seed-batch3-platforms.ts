/**
 * Batch 3 — upsert 19 catalog platforms by slug (gap-scan 18 + Grok Bot).
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/seed-batch3-platforms.ts
 *   npx tsx scripts/seed-batch3-platforms.ts --dry-run
 *   npx tsx scripts/seed-batch3-platforms.ts --apply
 *   npm run db:seed-batch3
 *   npm run db:seed-batch3 -- --apply
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

const ROWS: SeedRow[] = [
  {
    slug: "meta-ai",
    name: "Meta AI",
    company: "Meta",
    website: "https://www.meta.ai",
    categorySlug: "text-conversational-ai",
    primaryUse: "Free chatbot and image helper tied to a Meta account",
    primaryUseCases: "Quick questions and image help for people already in Facebook, Instagram, WhatsApp, or Messenger",
    description:
      "Meta’s consumer assistant at meta.ai. As of 2026-10-14, published paid pricing did not render on the official page (unverified). Data handling is tied to Meta accounts — review Meta’s privacy policy before pasting anything you would not share with a Meta product. Usual cloud processing.",
    currentPricing: "Free access advertised at meta.ai; paid-plan prices unverified as of 2026-10-14 (official page did not list them)",
    freeTierFeatures: "Free use advertised; exact limits unverified as of 2026-10-14",
    costTier: "FREE",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web", "mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["beginners already on Meta apps"],
    contentTypes: ["text", "images"],
    outputFormats: ["text", "images"],
  },
  {
    slug: "capcut",
    name: "CapCut",
    company: "CapCut",
    website: "https://www.capcut.com",
    categorySlug: "video-creation-editing",
    primaryUse: "Free-to-start video editor with paid AI video features",
    primaryUseCases: "Short-form social video; beginners editing on phone or desktop",
    description:
      "Video editor with a free starting path. Official pricing (capcut.com/pricing, as of 2026-10-14): start for free; Pro shown as USD 19.99; Ultra shown as USD 79; a USD 12.49 figure also appeared — billing period for those figures is unverified. Per-second AI video rates were not confirmed on this pass (unverified). US services are operated by TikTok USDS Joint Venture LLC per the CapCut US Privacy Policy (updated 2026-04-15, capcut.com/clause/privacy); review that policy for data handling and jurisdiction. Availability can vary by country.",
    currentPricing:
      "Free to start; Pro USD 19.99 and Ultra USD 79 shown on capcut.com/pricing (billing period unverified); other AI-video unit prices unverified as of 2026-10-14",
    freeTierFeatures: "Start for free with basics (official, as of 2026-10-14); exact free-feature list unverified",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web", "mobile", "desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["creators", "social video beginners"],
    contentTypes: ["video"],
    outputFormats: ["video"],
  },
  {
    slug: "character-ai",
    name: "Character.AI",
    company: "Character.AI",
    website: "https://character.ai",
    categorySlug: "gaming-creative-ai",
    primaryUse: "Companion and role-play chatbot with original characters",
    primaryUseCases: "Entertainment role-play for adults; not a children’s product",
    description:
      "Companion/role-play chatbot. Official Terms (character.ai/tos, as of 2026-10-14): users under 13 (or under 16 in the EEA/UK) are not authorized to use the service. Official help on age assurance: users verified under 18 are placed in a reading-only experience without character chat. Parental Insights lets a teen invite a parent or guardian for weekly activity reports (time spent and top Characters; not full chat content) — see character.ai/safety/parental-insights. This listing is not suitable for children; use the official Safety Center and parental controls. Published subscription prices unverified (official pricing did not render this session).",
    currentPricing: "Paid C.AI+ pricing unverified as of 2026-10-14 (official page blocked or did not list prices)",
    freeTierFeatures: "Free access exists; exact limits unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web", "mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["adults seeking entertainment role-play"],
    contentTypes: ["text", "role-play"],
    outputFormats: ["text"],
  },
  {
    slug: "deepl",
    name: "DeepL",
    company: "DeepL",
    website: "https://www.deepl.com",
    categorySlug: "international-regional-ai",
    primaryUse: "Machine translation for text and files",
    primaryUseCases: "Translating documents and everyday text; Pro adds no-training and higher limits",
    description:
      "Translation product. Official Pro page (deepl.com/pro, as of 2026-10-14): Free version includes 50,000 characters/user/month and 1 file translation. Individual (Pro) €7.49 per month billed annually (VAT included as stated). Team and Business list prices did not render as euro figures on this fetch — unverified. Pro states original content is not used to train DeepL’s models.",
    currentPricing:
      "Free 50k chars/mo; Individual €7.49/mo billed annually; Team and Business euro prices unverified as of 2026-10-14",
    freeTierFeatures: "50,000 characters/user/month; 1 file translation/month (official compare table, as of 2026-10-14)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web", "desktop", "browser-extension"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["translators", "students", "international teams"],
    contentTypes: ["text", "documents"],
    outputFormats: ["text", "translated files"],
  },
  {
    slug: "quillbot",
    name: "QuillBot",
    company: "QuillBot",
    website: "https://quillbot.com",
    categorySlug: "text-conversational-ai",
    primaryUse: "Paraphrasing and writing helper",
    primaryUseCases: "Rewording drafts; students and writers checking phrasing — not a citation substitute",
    description:
      "Paraphrasing and writing helper. Official pricing as of 2026-10-14 is unverified (official page blocked). Treat plan names and dollar amounts as unpublished in this catalog pass. Usual SaaS data-handling — do not paste confidential drafts without reading the privacy policy.",
    currentPricing: "Plan prices unverified as of 2026-10-14 (official page blocked)",
    freeTierFeatures: "Free tier reported historically; limits unverified from official HTML as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web", "browser-extension"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["students", "writers"],
    contentTypes: ["text"],
    outputFormats: ["text"],
  },
  {
    slug: "freepik-ai",
    name: "Freepik AI",
    company: "Freepik",
    website: "https://www.freepik.com/ai",
    categorySlug: "image-generation-editing",
    primaryUse: "Stock plus AI image and video generation",
    primaryUseCases: "Designers who want stock assets and AI generations in one account",
    description:
      "Freepik’s AI surface. Official pricing page (freepik.com/pricing, as of 2026-10-14) is branded Magnific (formerly Freepik) and lists paid credit-based plans; dollar sticker prices for the consumer tiers did not render as a complete table on this fetch — unverified. A free path is advertised; exact free limits unverified.",
    currentPricing: "Paid credit-based plans exist (Magnific/Freepik pricing page); dollar amounts unverified as of 2026-10-14",
    freeTierFeatures: "Free path advertised; limits unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["designers", "marketers"],
    contentTypes: ["images", "video", "stock"],
    outputFormats: ["images", "video"],
  },
  {
    slug: "perplexity-comet",
    name: "Perplexity Comet",
    company: "Perplexity",
    website: "https://www.perplexity.ai/comet",
    categorySlug: "text-conversational-ai",
    primaryUse: "AI browser from Perplexity",
    primaryUseCases: "Browsing with an assistant that can see the page; separate from the core Perplexity search product already in this catalog",
    description:
      "Perplexity’s AI browser (Comet). Official pricing as of 2026-10-14 is unverified (official page blocked). Do not assume it is included in every Perplexity plan. Review Perplexity’s privacy policy — the browser can see pages you visit.",
    currentPricing: "Comet plan prices unverified as of 2026-10-14 (official page blocked)",
    freeTierFeatures: "Whether Comet has a free tier is unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["researchers", "power browsers"],
    contentTypes: ["web pages"],
    outputFormats: ["text", "browser"],
  },
  {
    slug: "genspark",
    name: "Genspark",
    company: "Genspark",
    website: "https://www.genspark.ai",
    categorySlug: "workflow-automation",
    primaryUse: "AI workspace that mixes search, slides, and agents",
    primaryUseCases: "People who want one tab for research plus generated artifacts, not a classic Zapier-style builder",
    description:
      "AI workspace / super-agent product. Official pricing as of 2026-10-14 is unverified (JavaScript-only page). Category is Workflow & Automation because it is sold as an always-on work surface rather than a single chat box.",
    currentPricing: "Plan prices unverified as of 2026-10-14 (official page JavaScript-only)",
    freeTierFeatures: "Free path unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["researchers", "operators"],
    contentTypes: ["web", "documents"],
    outputFormats: ["text", "slides"],
  },
  {
    slug: "warp",
    name: "Warp",
    company: "Warp",
    website: "https://www.warp.dev",
    categorySlug: "ai-coding-development",
    primaryUse: "AI-enabled terminal with agents",
    primaryUseCases: "Developers who live in a terminal and want agent help without leaving it",
    description:
      "Modern terminal with Warp Agent. Official pricing (warp.dev/pricing, as of 2026-10-14): Free $0/month (core terminal, Warp Agent CLI, limited cloud agents). Build includes $20 of agent usage each month. Max includes $200 of agent usage each month. Business includes $20 of agent usage per seat each month plus SSO. Enterprise custom. The subscription sticker price for Build/Max (apart from included usage) was not shown as a single figure in the fetched HTML — unverified. Warp states SOC 2 and zero data retention with contracted LLM providers.",
    currentPricing:
      "Free $0/mo; Build includes $20 agent usage/mo; Max includes $200 agent usage/mo; Business $20 agent usage/seat/mo; Enterprise custom; Build/Max list prices beyond usage unverified as of 2026-10-14",
    freeTierFeatures: "Free $0/month: core terminal, Agent CLI, limited cloud agents (official, as of 2026-10-14)",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "HIGH",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["developers"],
    contentTypes: ["code", "terminal"],
    outputFormats: ["code", "commands"],
  },
  {
    slug: "jetbrains-ai",
    name: "JetBrains AI",
    company: "JetBrains",
    website: "https://www.jetbrains.com/ai/",
    categorySlug: "ai-coding-development",
    primaryUse: "AI assistant inside JetBrains IDEs",
    primaryUseCases: "People already in IntelliJ, PyCharm, or other JetBrains IDEs",
    description:
      "AI features inside JetBrains IDEs. Official pricing as of 2026-10-14 is unverified (JavaScript-only page). Do not quote a dollar amount until the official AI pricing table is readable.",
    currentPricing: "JetBrains AI plan prices unverified as of 2026-10-14 (official page JavaScript-only)",
    freeTierFeatures: "Trial or included-quota details unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "MEDIUM",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["JetBrains IDE users"],
    contentTypes: ["code"],
    outputFormats: ["code"],
  },
  {
    slug: "captions",
    name: "Captions",
    company: "Captions",
    website: "https://www.captions.ai",
    categorySlug: "video-creation-editing",
    primaryUse: "AI video editor for captions, avatars, and auto-edits",
    primaryUseCases: "Creators turning raw phone footage into captioned social clips",
    description:
      "AI video editor (phone, computer, and browser). Official homepage (captions.ai, as of 2026-10-14): free to sign up for some features; studio-quality edits from $24.99/mo. Higher-tier dollar amounts were not listed on the fetched homepage — unverified.",
    currentPricing: "Free to sign up; paid from $24.99/mo (official homepage, as of 2026-10-14); higher tiers unverified",
    freeTierFeatures: "Some features without a subscription (official FAQ, as of 2026-10-14); exact free limits unverified",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web", "mobile", "desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["creators", "social marketers"],
    contentTypes: ["video"],
    outputFormats: ["video", "captions"],
  },
  {
    slug: "veed",
    name: "VEED",
    company: "VEED",
    website: "https://www.veed.io",
    categorySlug: "video-creation-editing",
    primaryUse: "Browser video editor with AI captions and cleanup",
    primaryUseCases: "Beginners editing in the browser without installing an NLE",
    description:
      "Browser video editor. Official pricing as of 2026-10-14 is unverified (JavaScript-only). The site advertises starting for free; paid dollar amounts are unpublished in this catalog pass.",
    currentPricing: "Start for free advertised; paid plan prices unverified as of 2026-10-14 (official page JavaScript-only)",
    freeTierFeatures: "Start for free advertised; limits unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["beginners", "marketers"],
    contentTypes: ["video"],
    outputFormats: ["video"],
  },
  {
    slug: "higgsfield",
    name: "Higgsfield",
    company: "Higgsfield",
    website: "https://higgsfield.ai",
    categorySlug: "video-creation-editing",
    primaryUse: "AI video generation",
    primaryUseCases: "People generating clips from text or images; not a traditional timeline editor",
    description:
      "AI video generator. Official pricing as of 2026-10-14 is unverified (JavaScript-only). Do not invent credit packs or monthly fees.",
    currentPricing: "Plan prices unverified as of 2026-10-14 (official page JavaScript-only)",
    freeTierFeatures: "Free credits/trial unverified as of 2026-10-14",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["creators"],
    contentTypes: ["video", "images"],
    outputFormats: ["video"],
  },
  {
    slug: "vapi",
    name: "Vapi",
    company: "Vapi",
    website: "https://vapi.ai",
    categorySlug: "ai-apis-developer-services",
    primaryUse: "API for building voice AI phone and web agents",
    primaryUseCases: "Developers wiring voice agents; not a consumer chatbot",
    description:
      "Voice-agent API. Official pricing (vapi.ai/pricing, as of 2026-10-14): pay for minutes; $5 free credits on the no-success-package path; Vapi hosting listed at $0.05/min prepaid; Pro success package from $999/mo minimum. A Core success-package dollar amount did not render as $29 on this fetch — unverified. Voice-agent calls may require recording-consent / disclosure compliance by the user depending on jurisdiction.",
    currentPricing:
      "$5 free credits then pay-as-you-go ($0.05/min Vapi hosting listed); Pro from $999/mo minimum; Core package list price unverified as of 2026-10-14",
    freeTierFeatures: "$5 free credits to start (official, as of 2026-10-14)",
    costTier: "FREEMIUM",
    difficultyLevel: "ADVANCED",
    privacyLevel: "MEDIUM",
    platformType: ["api", "web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["developers", "voice-agent teams"],
    contentTypes: ["audio", "speech"],
    outputFormats: ["voice calls"],
  },
  {
    slug: "retell-ai",
    name: "Retell AI",
    company: "Retell AI",
    website: "https://www.retellai.com",
    categorySlug: "ai-apis-developer-services",
    primaryUse: "Pay-as-you-go voice AI phone agents",
    primaryUseCases: "Teams standing up inbound/outbound voice agents without an annual contract",
    description:
      "Voice-agent platform. Official pricing (retellai.com/pricing, as of 2026-10-14): starts at $0, pay for minutes; compare table lists voice AI at $0.07–$0.31/minute; 20 concurrent calls included. A $10 free-credit figure was not on the fetched page — unverified. Voice-agent calls may require recording-consent / disclosure compliance by the user depending on jurisdiction.",
    currentPricing: "Starts at $0; voice agents $0.07–$0.31/min (official compare table, as of 2026-10-14); $10 free credits unverified",
    freeTierFeatures: "Sign up for free, pay-as-you-go; 20 concurrent calls included (official, as of 2026-10-14); signup credit amount unverified",
    costTier: "FREEMIUM",
    difficultyLevel: "ADVANCED",
    privacyLevel: "MEDIUM",
    platformType: ["api", "web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["developers", "call-center builders"],
    contentTypes: ["audio", "speech"],
    outputFormats: ["voice calls"],
  },
  {
    slug: "jenni-ai",
    name: "Jenni AI",
    company: "Jenni AI",
    website: "https://jenni.ai",
    categorySlug: "research-academic-tools",
    primaryUse: "AI writing assistant for academic papers",
    primaryUseCases: "Students and researchers drafting papers with citations — user remains responsible for academic integrity",
    description:
      "Academic writing assistant. Official pricing (jenni.ai/pricing, as of 2026-10-14): Free $0 (10 AI autocompletes/day, 10 PDF uploads, 3 AI edits, 5 AI chat messages); Plus $12/mo; Pro $29/mo. Page states “annual saves 60%” — exact annual dollar prices were not listed as separate figures on the fetched table. Pricing in USD.",
    currentPricing: "Free $0; Plus $12/mo; Pro $29/mo; annual saves 60% (exact annual dollars unverified) (official, as of 2026-10-14)",
    freeTierFeatures: "10 AI autocompletes/day, 10 PDF uploads, 3 AI edits, 5 AI chat messages, unlimited citations (official, as of 2026-10-14)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["students", "researchers"],
    contentTypes: ["academic writing", "PDFs"],
    outputFormats: ["text", "citations"],
  },
  {
    slug: "legora",
    name: "Legora",
    company: "Legora",
    website: "https://legora.com",
    categorySlug: "legal-ai",
    primaryUse: "Collaborative legal AI for firms and in-house teams",
    primaryUseCases: "Law firms and in-house legal teams; not a consumer free tool",
    description:
      "Legal work platform (agentic OS for lawyers). Official site (legora.com, as of 2026-10-14): book a demo / sales-led. No published list price. Contact sales (enterprise, no published price). Treat outputs as assistance, not legal advice. Site lists SOC 2 Type II, ISO 27001, GDPR, HIPAA, and states zero AI training on your data.",
    currentPricing: "Contact sales (enterprise, no published price)",
    freeTierFeatures: "No public free plan; demo via sales (official, as of 2026-10-14)",
    costTier: "ENTERPRISE",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "HIGH",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["attorneys", "in-house legal"],
    contentTypes: ["legal documents"],
    outputFormats: ["text", "legal drafts"],
  },
  {
    slug: "evenup",
    name: "EvenUp",
    company: "EvenUp",
    website: "https://www.evenuplaw.com",
    categorySlug: "legal-ai",
    primaryUse: "AI for personal-injury law firms",
    primaryUseCases: "US personal-injury firms across intake, demand, and discovery — not a consumer product",
    description:
      "AI platform for personal-injury law firms. Official site (evenuplaw.com, as of 2026-10-14): no published list price. Contact sales (enterprise, no published price). Site states SOC 2-audited and HIPAA-attested. Treat outputs as assistance, not legal advice.",
    currentPricing: "Contact sales (enterprise, no published price)",
    freeTierFeatures: "No public free plan (official, as of 2026-10-14)",
    costTier: "ENTERPRISE",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "HIGH",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["personal-injury law firms"],
    contentTypes: ["legal documents", "medical records"],
    outputFormats: ["demands", "discovery"],
  },
  {
    slug: "grok-bot",
    name: "Grok Bot",
    company: "SpaceXAI",
    website: "https://grokbot.com",
    categorySlug: "workflow-automation",
    primaryUse: "Always-on AI teammates with their own cloud computer",
    primaryUseCases: "Handing off parallel work that signs into your apps; not the Grok chatbot (separate catalog page)",
    description:
      "Grok Bot is sold as “your team of always-on agents”: AI teammates with their own cloud computer that can sign into apps and websites, work in parallel 24/7 (including with a laptop closed), learn routines by watching once, keep memory, and come back for approval (x.ai/news/introducing-grok-bot; grokbot.com). Separate from the Grok chatbot listing. Official pages brand the company SpaceXSI; this catalog uses SpaceXAI. Platforms listed: desktop and iOS; download listed for macOS Apple silicon (grokbot.com). Launched in beta (date on the announcement page; third-party Aug 11, 2026 date unverified). Windows/Android apps unverified. No standalone price: since 2026-10-12, new customers get it via The X Subscription Premium $30/mo ($300/yr), Super $100/mo ($1,000/yr), Ultra $200/mo ($2,000/yr). Free ($0) and Plus ($8/mo) do not include Grok Bot. Team seats at the same per-seat prices. Usage from a shared weekly pool; beyond it, paid Additional Usage top-ups (exact weekly size and per-unit top-up rate unverified). Existing Cursor (Pro/Pro+/Ultra/Teams) and SuperGrok plans keep access (grokbot.com; introducing post). Privacy: Cursor SSO/auth/privacy mode; cloud computer encrypted in transit and at rest; training opt-out; Auto Review for sensitive actions; enterprise DLP/network controls (grokbot.com FAQ). Enterprise generally available, contact sales (grokbot.com FAQ). Free trial unverified. Caution: bots sign into your accounts and can act for you; review what you connect and use approval settings.",
    currentPricing:
      "No standalone price. The X Subscription (docs.x.ai/x-subscription/pricing, as of 2026-10-14): included on Premium $30/mo ($300/yr), Super $100/mo ($1,000/yr), Ultra $200/mo ($2,000/yr) and matching team seats. Not on Free or Plus. Existing SuperGrok and Cursor Pro/Pro+/Ultra/Teams keep access. Weekly pool size and Additional Usage unit rate unverified.",
    freeTierFeatures: "None (needs X Subscription Premium or higher)",
    costTier: "PAID",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["desktop", "mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["operators", "small teams"],
    contentTypes: ["tasks", "apps"],
    outputFormats: ["completed work in connected apps"],
  },
];

function isFullyConfirmed(row: SeedRow): boolean {
  const blob = [row.description, row.currentPricing, row.freeTierFeatures].join("\n");
  return !/\bunverified\b/i.test(blob);
}

function batch3Content(row: SeedRow, categoryId: string) {
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
    ...batch3Content(row, categoryId),
    // Curated fields: create defaults only. Updates must not overwrite them.
    featured: false,
    directAlternatives: [] as string[],
    complementaryTools: [] as string[],
    budgetAlternativeTo: [] as string[],
    privacyAlternativeTo: [] as string[],
  };
}

function toUpdateData(row: SeedRow, categoryId: string) {
  return batch3Content(row, categoryId);
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
  console.log(`Rows: ${ROWS.length}`);

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
    let wouldCreate = 0;
    let wouldUpdate = 0;

    for (const row of ROWS) {
      const categoryId = categoryIdBySlug.get(row.categorySlug)!;
      const existing = await prisma.platform.findUnique({
        where: { slug: row.slug },
        select: { id: true, slug: true, name: true },
      });

      const verified = isFullyConfirmed(row);
      if (dryRun) {
        if (existing) {
          wouldUpdate += 1;
          console.log(`~ would update ${row.slug} verified=${verified}`);
        } else {
          wouldCreate += 1;
          console.log(`+ would create ${row.slug} verified=${verified}`);
        }
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

    if (dryRun) {
      console.log(`Expected creates: ${wouldCreate}; expected updates: ${wouldUpdate}; total rows: ${ROWS.length}`);
      console.log("Dry-run complete. No rows written.");
    } else {
      console.log(`Done. created=${created} updated=${updated} total=${ROWS.length}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
