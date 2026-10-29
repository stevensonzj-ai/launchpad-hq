/**
 * Catalog audit #13 — empty descriptions, Klap, Opus Clip, 2026-10-29.
 * Patch data and pure diff logic for scripts/update-catalog-audit-13.ts (the
 * DB runner lives there).
 *
 *   - DESCRIPTIONS: a beginner description for eight rows whose description
 *     is empty (gemini, chatgpt, openai-api, github-copilot, runway, suno,
 *     notion-ai, mistral-vibe), each claim from the vendor's own page
 *     (sources below). Written only while the description is empty or
 *     whitespace; a non-empty description is never touched.
 *   - Held audit 12 notes: audit 12 skipped its description notes on those
 *     rows because they were empty. Once a description is filled, the notes
 *     are appended by audit 12's own appendNote/diffAudit12 (same text, same
 *     separator), so a re-run of audit 12 after audit 13 reports 0. That
 *     includes openai-api's note: leaving it out would make the audit 12
 *     re-run append it.
 *   - KLAP_ROW: a new `klap` row, created only when no row has that slug.
 *     Its category is copied from the opus-clip row at run time. `website`
 *     is the vendor's own site: the affiliate link lives only in
 *     src/data/affiliates.ts (display only) and never in a row or feed.
 *   - OPUS_CLIP_FIELDS: stale pricing text on the opus-clip row, rechecked
 *     on opus.pro/pricing (CTO fact pack, 2026-10-29). Each field changes only
 *     while it still holds the expected `from` text (audit 10's 2026-10-26
 *     values); a hand edit is left alone and reported.
 *
 * Every audit 13 text says "as of 2026-10-29" where it carries a dated fact
 * and never says "official" (audit 10's wording pass rewrites text that does).
 *
 * Known interaction: audit 10 sets opus-clip's three pricing fields "where
 * they differ", so re-running audit 10 after audit 13 would put the
 * 2026-10-26 text back. Do not re-run audit 10 after this audit
 * (audit-13.test.ts pins this).
 *
 * Never deletes rows; never changes slug, name or categoryId of an existing
 * row. Kept free of Prisma and dotenv so it typechecks with the app and can
 * be unit-tested (audit-13.test.ts).
 */
import { AUDIT_12_PATCHES, appendNote } from "./audit-12";

export const CHECKED_AT = "2026-10-29";

// ---------- descriptions ----------

export type Audit13Description = {
  slug: string;
  text: string;
  sources: string[];
};

const GEMINI_ABOUT = "https://gemini.google/about/";
const CHATGPT_OVERVIEW = "https://chatgpt.com/overview/";
const OPENAI_API = "https://openai.com/api/";
const OPENAI_API_DOCS = "https://developers.openai.com/api/docs";
const COPILOT = "https://github.com/features/copilot";
const RUNWAY = "https://runway.com/";
const SUNO_HOME = "https://suno.com/home";
const SUNO_ABOUT = "https://suno.com/about";
const NOTION_AI = "https://www.notion.com/product/ai";
const MISTRAL_VIBE = "https://mistral.ai/products/vibe";

export const AUDIT_13_DESCRIPTIONS: Audit13Description[] = [
  {
    slug: "gemini",
    text: "Google's AI assistant for everyday help at work, school or home: ask questions, dig into a topic with Deep Research, create and edit images, or switch between talking and typing with Gemini Live. The free plan needs only a Google account; paid Google AI plans raise the limits and add Gemini inside Google apps.",
    sources: [GEMINI_ABOUT],
  },
  {
    slug: "chatgpt",
    text: "OpenAI's AI assistant for everyday questions: it explains concepts, drafts messages, searches the web, creates images and helps you think through a decision, and you can talk to it by voice when that is easier than typing. There is a free plan, and it runs on the web, on phones and as a desktop app for Mac and Windows.",
    sources: [CHATGPT_OVERVIEW],
  },
  {
    slug: "openai-api",
    text: "OpenAI's developer platform: the API lets your own apps and scripts use OpenAI models to generate text, create or edit images, turn text into speech, transcribe audio, make embeddings for search and build agents. Pricing is pay-as-you-go, and you can set monthly spend limits per organization and project. You need to write some code to use it.",
    sources: [OPENAI_API, OPENAI_API_DOCS],
  },
  {
    slug: "github-copilot",
    text: "GitHub's AI coding assistant: it suggests code as you type, answers questions about your code in chat, and can work as an agent on larger tasks. It runs inside editors you may already use, including VS Code, Visual Studio, JetBrains IDEs, Xcode, Vim, Neovim, Zed and Eclipse. A free plan covers getting started, with a monthly limit on completions.",
    sources: [COPILOT],
  },
  {
    slug: "runway",
    text: "A browser-based AI studio for generating and editing video, images and audio in one workspace, with apps for iPhone and Android. It is used by brands, agencies and studios, and you can try it free before paying.",
    sources: [RUNWAY],
  },
  {
    slug: "suno",
    text: "Makes complete songs, with vocals, lyrics and production, from a plain-language description of a genre, mood or topic, or from lyrics you wrote yourself; it can also make instrumentals. It works on the web, iOS and Android, and you can make music free every day.",
    sources: [SUNO_HOME, SUNO_ABOUT],
  },
  {
    slug: "notion-ai",
    text: "AI built into the Notion workspace: it drafts and improves writing in your pages, transcribes and summarizes meetings, searches across your workspace and connected apps such as Slack and Google Drive, and Notion Agent can take on whole tasks. The free plan includes a trial; the full set of AI features comes with the Business and Enterprise plans.",
    sources: [NOTION_AI],
  },
  {
    slug: "mistral-vibe",
    text: "Mistral AI's assistant for work and code, formerly called Le Chat. Vibe for work drafts documents, runs research and automates workflows on the web and in the mobile apps; Vibe for code writes and tests code from the terminal or inside VS Code, JetBrains or Zed. The free plan covers quick answers, web search and simple tasks.",
    sources: [MISTRAL_VIBE],
  },
];

export type Audit13DescriptionRow = { description: string | null };

/** The audit 12 description notes for `slug`, in audit 12 order (reused verbatim). */
export function heldAudit12Notes(slug: string) {
  return (AUDIT_12_PATCHES.find((p) => p.slug === slug)?.appends ?? []).filter((a) => a.field === "description");
}

/** The description audit 13 writes for `slug`: the new text plus audit 12's held notes. */
export function filledDescription(slug: string): string | null {
  const entry = AUDIT_13_DESCRIPTIONS.find((d) => d.slug === slug);
  if (!entry) return null;
  let text = entry.text;
  for (const append of heldAudit12Notes(slug)) text = appendNote(text, append) ?? text;
  return text;
}

/** New description, or null when the row already has one (never overwritten). */
export function diffAudit13Description(slug: string, row: Audit13DescriptionRow): string | null {
  if (row.description?.trim()) return null;
  return filledDescription(slug);
}

// ---------- Klap (create only) ----------

export const KLAP_SLUG = "klap";
/** The row whose category Klap copies (same kind of tool). */
export const KLAP_CATEGORY_FROM = "opus-clip";

const KLAP_HOME = "https://klap.app/";
const KLAP_PRICING = "https://klap.app/pricing";
const KLAP_MCP = "https://klap.app/mcp";
const KLAP_API = "https://klap.app/api";
const KLAP_PRIVACY = "https://klap.app/privacy-policy";
const KLAP_VS_OPUS = "https://klap.app/alternatives/opus-clip";

export const KLAP_SOURCES = [KLAP_HOME, KLAP_PRICING, KLAP_MCP, KLAP_API, KLAP_PRIVACY, KLAP_VS_OPUS];

/**
 * Every field the new row sets besides categoryId. Values match the shape of
 * existing rows (opus-clip). The affiliate link is deliberately absent.
 */
export const KLAP_ROW = {
  slug: KLAP_SLUG,
  name: "Klap",
  company: "ZIGG SAS (Klap)",
  website: "https://klap.app",
  description:
    "Turns a long video, such as a podcast, webinar or YouTube episode, into short vertical clips with captions, automatic reframing and a viral score; it works best on videos with speech. You can try it free on 1 video with no credit card, but downloading and posting clips needs a paid plan. Run by ZIGG SAS, registered in France; its privacy policy (as of 2026-10-29) says videos are stored in the United States and transcripts are sent to outside AI providers, including OpenAI, to find and score clips.",
  primaryUse: "AI long-video to short-clip repurposing",
  primaryUseCases: "Long video to short clips; podcast and webinar clips; AI captions; reframing to vertical; scheduling clips to social accounts",
  costTier: "PAID",
  difficultyLevel: "BEGINNER",
  platformType: ["web", "api"],
  currentPricing:
    "Basic $29/mo or $14/mo billed yearly (100 clips/mo); Pro $79/mo or $39/mo billed yearly (300 clips/mo); Pro+ $189/mo or $94/mo billed yearly (1,000 clips/mo) (as of 2026-10-29)",
  freeTierFeatures:
    "No free plan for downloads: try 1 video free with no credit card; downloading and posting clips needs a paid plan (as of 2026-10-29)",
  usageLimits:
    "Basic 100 clips/mo; Pro 300 clips/mo; Pro+ 1,000 clips/mo; upload length and file-size limits are not published on the pages checked (as of 2026-10-29)",
  upgradeTriggers: "Downloading or posting clips; more clips a month; team use",
  apiAvailable: true,
  offlineCapable: false,
  keyIntegrations: "API, MCP server, Zapier, Make, n8n; posting to TikTok, YouTube, Instagram and LinkedIn",
  privacyLevel: "MEDIUM",
  idealUserTypes: ["Podcasters", "YouTubers", "social media managers", "course creators", "content repurposers"],
  timeToProductivity: "10 min",
  learningCurve: "Easy",
  directAlternatives: ["Opus Clip"],
  complementaryTools: [] as string[],
  budgetAlternativeTo: [] as string[],
  privacyAlternativeTo: [] as string[],
  contentTypes: ["Video"],
  outputFormats: ["MP4 (vertical)", "direct social media posting"],
  languageSupport: "Edits and transcribes videos in 52 languages (Klap FAQ, as of 2026-10-29)",
  hasMobileApp: false,
  mobileWebFriendly: true,
} as const;

/** Prisma `data` for the create, or null when the row exists or the category row is missing. */
export function klapCreateData(exists: boolean, categoryId: string | null): (typeof KLAP_ROW & { categoryId: string }) | null {
  if (exists || !categoryId) return null;
  return { ...KLAP_ROW, categoryId };
}

// ---------- Opus Clip (stale pricing text) ----------

export type Audit13OpusField = "currentPricing" | "freeTierFeatures" | "usageLimits" | "upgradeTriggers";

export const OPUS_CLIP_SOURCES = ["https://www.opus.pro/pricing"];

/** `from` is the row's expected current text (audit 10 for the first three, seed for upgradeTriggers). */
export const OPUS_CLIP_FIELDS: Record<Audit13OpusField, { from: string; to: string }> = {
  currentPricing: {
    from: "Free $0 (60 credits/mo); Starter $15/mo, monthly only (150 credits/mo); Pro $29/mo; Business custom (official, as of 2026-10-26)",
    to: "Free $0 (60 credits/mo); Starter $15/mo, monthly only (150 credits/mo); Pro $29/mo or $14.50/mo billed yearly (300 credits/mo); Business custom (as of 2026-10-29)",
  },
  freeTierFeatures: {
    from: "Free: 60 credits a month; exports up to 1080p (official, as of 2026-10-26)",
    to: "Free: 60 credits a month; clips up to 1080p with a watermark; no editing; clips stop being exportable after 3 days (as of 2026-10-29)",
  },
  usageLimits: {
    from: "Free: 60 credits/mo; Starter: 150 credits/mo (official, as of 2026-10-26)",
    to: "Free: 60 credits/mo; Starter: 150 credits/mo; Pro: 300 credits/mo, unused credits roll over for 2 months (as of 2026-10-29)",
  },
  upgradeTriggers: {
    from: "Upload minutes; watermark removal; 1080p export; B-roll; team features; scheduling",
    to: "More credits; watermark removal; editing; keeping clips exportable past 3 days; B-roll; team seats; scheduling",
  },
};

export type Audit13OpusRow = Record<Audit13OpusField, string | null>;

export type Audit13OpusDiff = { field: Audit13OpusField; to: string };

/** Changes for fields that still hold `from`; `skipped` lists fields holding other text (left alone). */
export function diffAudit13Opus(row: Audit13OpusRow): { diffs: Audit13OpusDiff[]; skipped: Audit13OpusField[] } {
  const diffs: Audit13OpusDiff[] = [];
  const skipped: Audit13OpusField[] = [];
  for (const [field, { from, to }] of Object.entries(OPUS_CLIP_FIELDS) as [Audit13OpusField, { from: string; to: string }][]) {
    const current = row[field];
    if (current === to) continue;
    if (current === from) diffs.push({ field, to });
    else skipped.push(field);
  }
  return { diffs, skipped };
}

/** Every existing slug audit 13 may update, in run order. */
export function audit13DescriptionSlugs(): string[] {
  return AUDIT_13_DESCRIPTIONS.map((d) => d.slug);
}
