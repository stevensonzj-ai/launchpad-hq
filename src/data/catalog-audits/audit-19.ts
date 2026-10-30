/**
 * Catalog audit #19 — stale facts, batch 3, 2026-10-29. Patch data and pure
 * diff logic for scripts/update-catalog-audit-19.ts (the DB runner lives
 * there). Same shape and rules as audits 17 and 18.
 *
 * Batch 3 is rows 52–73 of the stale group, the rows with no sourced fact
 * file (selection and order:
 * docs/planning/2026-10-autonomous-business/stale-facts-batches.md). Each was
 * read on the vendor's own pages on 2026-10-29 by two independent, blind
 * readers; the sourced facts are in src/data/facts/<slug>.ts. A row is
 * patched here only for facts both readers saw. Facts a page did not show
 * (blocked, or rendered only in a browser) are left as the row has them and
 * listed in REVIEW-SUMMARY.md under "Browser-check list".
 *
 *   - fields: text set to exactly this value, written only where it differs
 *     (upgradeTriggers is new in this audit; no earlier stale-facts audit
 *     writes it);
 *   - guarded: company, website, costTier, apiAvailable and privacyLevel
 *     change only while the row still holds the expected old value (company
 *     and website may expect null), so a hand edit is never overwritten;
 *   - addDirectAlternatives: catalog names appended when missing, never
 *     removed (the audit 9 rule).
 *
 * It also re-patches batch-2 rows (audit 18) from the Research Analyst's
 * browser check of batch 2 (AUDIT_19_BATCH2_RECHECK), fixes GPT Image's
 * upgradeTriggers that audit 18 missed, and cross-links Gemini CLI with the
 * new Antigravity CLI row. Where audit 18 writes the same field, it now
 * writes this same text (audit-19.test.ts checks), so re-running audit 17 or
 * 18 after this one cannot revert it.
 *
 *   - ANTIGRAVITY_ROW: a new `antigravity-cli` row, created only when no row
 *     has that slug (the audit 16 pattern). Its pricing text is built from
 *     the fact file's plans and free tier.
 *
 * Audit 10 touches none of these slugs. Audit 11 patches canopy-tax and
 * squarespace-ai on costTier only; this audit never writes that field for
 * either (audit-19.test.ts checks both). Text never says "official" (audit
 * 10's wording pass rewrites text that does). No affiliate or sponsor links.
 *
 * Never deletes rows; never changes slug, name or categoryId of an existing
 * row. Kept free of Prisma and dotenv so it typechecks with the app and can
 * be unit-tested (audit-19.test.ts).
 */
import antigravityCliFacts from "../facts/antigravity-cli";

export const CHECKED_AT = "2026-10-29";
const AS_OF = `(as of ${CHECKED_AT})`;

export type Audit19TextField = "primaryUse" | "currentPricing" | "freeTierFeatures" | "usageLimits" | "upgradeTriggers";

export type Audit19Guarded = {
  company?: { from: (string | null)[]; to: string };
  website?: { from: (string | null)[]; to: string };
  costTier?: { from: string; to: string };
  apiAvailable?: { from: boolean; to: boolean };
  privacyLevel?: { from: string; to: string };
};

export type Audit19Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit19TextField, string>>;
  guarded?: Audit19Guarded;
  /** Catalog names appended to directAlternatives when missing (never removed). */
  addDirectAlternatives?: string[];
};

/** Batch 3, in tracker order (rows 52–73). quizlet-q-chat has no fact file (every page blocked). */
export const AUDIT_19_BATCH = [
  "pathai",
  "alphasense",
  "bloomberg-gpt-terminal-ai",
  "ramp-intelligence",
  "canopy-tax",
  "zillow-ai-zestimate",
  "restb-ai",
  "khan-academy-khanmigo",
  "duolingo-max",
  "quizlet-q-chat",
  "speak-language-ai",
  "gong",
  "outreach",
  "semrush-ai",
  "scale-ai",
  "udio",
  "aiva",
  "beatoven-ai",
  "google-lyria-3",
  "soundraw",
  "murf-ai",
  "glasp",
];

/** Batch-3 rows with no fact file, and why. */
export const AUDIT_19_NO_FACT_FILE: Record<string, string> = {
  "quizlet-q-chat": "Every quizlet.com and help.quizlet.com page returned 403 to both readers (Browser-check list).",
};

/**
 * Batch-2 rows (audit 18) re-checked in a browser by the Research Analyst on
 * 2026-10-29. Every one got a fact-file update; the ones whose row text
 * changes have a patch below (squarespace-ai and healthee change in code
 * only).
 */
export const AUDIT_19_BATCH2_RECHECK = [
  "leonardo-ai",
  "trinka-ai",
  "wix-ai",
  "microsoft-designer",
  "squarespace-ai",
  "openai-codex-cli",
  "microsoft-power-automate",
  "dragon-medical-one",
  "healthee",
];

/** Other rows this audit touches: GPT Image's leftover upgradeTriggers, and the Gemini CLI cross-link. */
export const AUDIT_19_OTHER = ["gpt-image-1-5-dall-e-successor", "gemini-cli"];

export const AUDIT_19_PATCHES: Audit19Patch[] = [
  {
    slug: "pathai",
    finding: "Row said \"Custom per contract\"; PathAI publishes no prices, free tier or trial (demo request only), and is being acquired by Roche (fact-file status notice)",
    sources: ["https://www.pathai.com/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No public pricing; access starts with a demo request ${AS_OF}`,
      freeTierFeatures: `No free tier or trial listed ${AS_OF}`,
      usageLimits: `Not published ${AS_OF}`,
    },
    guarded: { website: { from: ["https://pathai.com"], to: "https://www.pathai.com" } },
  },
  {
    slug: "alphasense",
    finding: "Row said pricing is typically $10K+ a year; AlphaSense publishes no price: two quote-only packages on annual subscriptions, per seat or enterprise-wide, and a free trial of unstated length",
    sources: ["https://www.alpha-sense.com/pricing/", "https://www.alpha-sense.com/trial-request/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Quote only: Market Intelligence and Enterprise Intelligence packages, sold as annual subscriptions (per seat or enterprise-wide) ${AS_OF}`,
      freeTierFeatures: `No free plan; a free trial is offered on request (length not stated) ${AS_OF}`,
      usageLimits: `No published price or limits ${AS_OF}`,
    },
    guarded: { website: { from: ["https://alpha-sense.com"], to: "https://www.alpha-sense.com" } },
  },
  {
    slug: "ramp-intelligence",
    finding: "Row said Ramp Plus is $12/user/mo; it is now $15 per user a month plus a platform fee based on team size (20% off billed annually)",
    sources: ["https://ramp.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free $0 per user a month; Plus $15 per user a month plus a platform fee based on team size (20% off billed annually); Enterprise custom ${AS_OF}`,
      freeTierFeatures: `Ramp Free: $0 per user a month, for smaller teams; Plus has a 30-day free trial ${AS_OF}`,
      usageLimits: `Per-user pricing; no AI usage limits published; Plus adds AI agents for bill pay ${AS_OF}`,
    },
  },
  {
    slug: "canopy-tax",
    finding: "Row said from $50/mo and $39/user/mo; plans are Standard $74, Plus $109 and Premium $149 per user a month billed annually ($50 is the Tax Resolution add-on), and the site moved to getcanopy.com. Audit 11 owns the cost tier, so no tier change",
    sources: ["https://www.getcanopy.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Per user a month, billed annually: Standard $74, Plus $109, Premium $149 (coming soon); Enterprise custom; Tax Resolution add-on $50 per user a month ${AS_OF}`,
      freeTierFeatures: `No free plan; a trial is arranged through a sales demo (length not stated) ${AS_OF}`,
      usageLimits: `AI Notetaker (beta): 8, 12 or 16 hours per user a month on Standard, Plus and Premium; add-ons priced per credit, client or user ${AS_OF}`,
    },
    guarded: { website: { from: ["https://canopytax.com"], to: "https://www.getcanopy.com" } },
  },
  {
    slug: "restb-ai",
    finding: "Row was FREEMIUM with a free API trial; Restb.ai lists no free plan or API trial (complimentary proofs of concept only) and publishes no prices",
    sources: ["https://restb.ai/faq/", "https://restb.ai/terms-conditions/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No public prices: billed as a monthly flat rate, monthly volume or a fixed fee per API request; contact sales ${AS_OF}`,
      freeTierFeatures: `No free plan or free API trial listed; complimentary proofs of concept on request ${AS_OF}`,
      usageLimits: `Set by contract ${AS_OF}`,
    },
    // Zach (2026-10-29): PAID, not ENTERPRISE. Audit 20 writes the same tier, and also moves a row an earlier run left at ENTERPRISE.
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "scale-ai",
    finding: "Row said project-based pricing; Scale states no pricing model at all (its pricing page leads to a demo)",
    sources: ["https://scale.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No public pricing; sales-led (demo request) ${AS_OF}`,
      freeTierFeatures: `No free tier or self-serve plan listed ${AS_OF}`,
      usageLimits: `Not published ${AS_OF}`,
    },
  },
  {
    slug: "khan-academy-khanmigo",
    finding: "Row had it backwards (free for learners, teachers pay $5); Khanmigo is free for teachers, and learners and parents pay $4/mo or $44/yr in the US",
    sources: ["https://www.khanmigo.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free for teachers; learners and parents $4/mo or $44/yr (US only); districts request pricing ${AS_OF}`,
      freeTierFeatures: `Free for teachers; learners and parents pay (US only, account holder 18+); the Khan Academy lesson library stays free ${AS_OF}`,
      usageLimits: `Paid learner and parent plans are US-only; usage limits not published ${AS_OF}`,
      upgradeTriggers: "AI tutoring for a learner or a parent's children (paid); district-wide classroom access",
    },
    guarded: {
      costTier: { from: "FREE", to: "FREEMIUM" },
      website: { from: ["https://khanacademy.org"], to: "https://www.khanmigo.ai" },
    },
  },
  {
    slug: "speak-language-ai",
    finding: "Row was FREEMIUM with Premium $13.99/mo; Speak has a 7-day trial and no free plan, shows promotional annual prices only, teaches several languages, and trains its AI on user audio",
    sources: ["https://www.speak.com/", "https://www.speak.com/us/getstarted", "https://www.speak.com/privacy"],
    checkedAt: CHECKED_AT,
    fields: {
      primaryUse: "AI speaking practice for learning a new language",
      currentPricing: `Premium and Premium Plus; US web offer $99.99 and $234.99 a year (promotional); prices vary by region and are shown in the app ${AS_OF}`,
      freeTierFeatures: `No free plan: a 7-day free trial, then a paid subscription ${AS_OF}`,
      usageLimits: `Plan limits are not published; Premium Plus is the higher tier ${AS_OF}`,
      upgradeTriggers: "Continuing after the 7-day trial; moving up to Premium Plus",
    },
    guarded: {
      costTier: { from: "FREEMIUM", to: "PAID" },
      privacyLevel: { from: "HIGH", to: "LOW" },
    },
  },
  {
    slug: "gong",
    finding: "Row promised unlimited call recording; Gong states per-user licences plus a platform fee and nothing about unlimited recording",
    sources: ["https://www.gong.io/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Quote only: per-user licences plus a platform fee based on the number of users ${AS_OF}`,
      freeTierFeatures: `No free tier or trial; pricing by custom proposal ${AS_OF}`,
      usageLimits: `Not published; priced per user ${AS_OF}`,
    },
  },
  {
    slug: "outreach",
    finding: "Site moved from outreach.io to outreach.ai; pricing is per user plus AI credits in four Amplify plans, on request",
    sources: ["https://www.outreach.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Quote only: Amplify Essentials, Core, Plus and Pro, priced per user plus AI credits; no platform fees ${AS_OF}`,
      freeTierFeatures: `No free tier or trial; pricing on request, with a demo ${AS_OF}`,
      usageLimits: `AI credits by plan: Essentials 10,000, Core 25,000, Plus 50,000, Pro 100,000 ${AS_OF}`,
    },
    guarded: { website: { from: ["https://outreach.io"], to: "https://www.outreach.ai" } },
  },
  {
    slug: "semrush-ai",
    finding: "Row was ENTERPRISE with Pro $129.95 / Guru $249.95 / Business $500; Semrush (now an Adobe company) sells SEO $139, Starter $199 and Pro+ $299 a month and has a permanent free account",
    sources: ["https://www.semrush.com/prices/", "https://www.semrush.com/news/455953-adobe-completes-semrush-acquisition-strengthening-cx-enterprise-with-enhanced-brand-visibility-capabilities"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; billed monthly: SEO $139, Starter $199, Pro+ $299 a month ($117.33 / $165.17 / $248.17 a month billed annually); Advanced and Enterprise custom ${AS_OF}`,
      freeTierFeatures: `Free account, no card: 1 demo project and 10 reports a day across the main tools; paid plans have a 7-day free trial ${AS_OF}`,
      usageLimits: `Websites: SEO and Starter 5, Pro+ 15, Advanced 40+; keywords tracked daily: 500 / 500 / 1,500 / 5,000+; AI prompts tracked daily: Starter 50, Pro+ 100 ${AS_OF}`,
    },
    guarded: {
      costTier: { from: "ENTERPRISE", to: "FREEMIUM" },
      company: { from: ["Semrush"], to: "Semrush (an Adobe company)" },
    },
  },
  {
    slug: "udio",
    finding: "Row listed 600 free credits a month, Standard 1,200 credits and unlimited Pro; free is 10 credits a day (up to 100 a month), Standard 2,400, Pro 6,000, and downloads are disabled since the Universal Music Group deal",
    sources: ["https://help.udio.com/en/articles/10739134-credits-and-credit-limits", "https://help.udio.com/en/articles/12683565-changes-associated-with-the-universal-music-group-umg-partnership", "https://www.udio.com/blog/a-new-era"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Standard (up to 2,400 credits a month) and Pro (up to 6,000); monthly prices not confirmed ${AS_OF}`,
      freeTierFeatures: `Free: 10 credits a day, up to 100 a month; downloads of audio, video and stems are disabled for all users since the Universal Music Group deal (2025-10-29) ${AS_OF}`,
      usageLimits: `Credits a month: Standard up to 2,400, Pro up to 6,000; no downloads during Udio's transition to a new platform ${AS_OF}`,
      upgradeTriggers: "More monthly credits",
    },
  },
  {
    slug: "aiva",
    finding: "Row listed Standard €15 and Pro €49 a month; the pricing page shows €11 and €33 a month billed annually (+ VAT), and only Pro gives you the copyright",
    sources: ["https://www.aiva.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Standard €11/mo and Pro €33/mo billed annually (+ VAT); monthly-billing prices not confirmed ${AS_OF}`,
      freeTierFeatures: `Free forever: 3 downloads a month, tracks up to 3 minutes, MP3 and MIDI; AIVA owns the copyright ${AS_OF}`,
      usageLimits: `Downloads a month: Free 3, Standard 15, Pro 300; tracks up to 3 min, 5 min and 5 min 30 s; you own the copyright only on Pro ${AS_OF}`,
    },
  },
  {
    slug: "beatoven-ai",
    finding: "Row was FREE with unlimited Pro downloads; Beatoven sells downloads per track or as monthly download minutes (pricing page 404, plan prices unconfirmed)",
    sources: ["https://www.beatoven.ai/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Pay per track or subscribe for monthly download minutes; plan prices not confirmed (the pricing page returns 404) ${AS_OF}`,
      freeTierFeatures: `A free start is listed in the site's data (5 generations) but not confirmed; downloads are bought per track or with a subscription ${AS_OF}`,
      usageLimits: `Subscriptions are metered in download minutes a month; per-plan amounts not confirmed ${AS_OF}`,
      upgradeTriggers: "Downloading tracks (per track or monthly minutes); more download minutes",
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "google-lyria-3",
    finding: "Row pointed to MusicFX and AI Test Kitchen and said FREE; MusicFX redirects to Google Flow Music, Lyria is free with limits in the Gemini app, and the Gemini API charges $0.04-$0.08 per song",
    sources: ["https://deepmind.google/models/lyria/", "https://ai.google.dev/gemini-api/docs/pricing", "https://support.google.com/gemini/answer/16901237"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free to try in the Gemini app (limits apply) and Google Flow Music (daily credits); Gemini API per song: Lyria 3.5 $0.08, Lyria 3 Clip $0.04, Lyria 3 Pro $0.08; no free API tier ${AS_OF}`,
      freeTierFeatures: `Gemini app (18+): music generation on the free plan, with limits Google does not publish; Google Flow Music: free to start, with daily credits; MusicFX now redirects to Flow Music ${AS_OF}`,
      usageLimits: `Track limits not published; paid Google AI plans get higher limits; full-length tracks use the Pro model ${AS_OF}`,
      upgradeTriggers: "Higher track limits on paid Google AI plans; API use (paid per song)",
    },
    guarded: {
      costTier: { from: "FREE", to: "FREEMIUM" },
      website: { from: ["https://deepmind.google"], to: "https://deepmind.google/models/lyria/" },
    },
  },
  {
    slug: "soundraw",
    finding: "Row was FREEMIUM with free unlimited creation; the pricing page lists only paid plans (try free, commercial use on paid plans), and stems start at Artist Pro",
    sources: ["https://soundraw.io/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Creator, Artist Starter, Artist Pro and Artist Unlimited; prices shown $16.99 / $11.04, $29.99 / $19.49, $35.99 / $23.39 and $50 / $32.50 a month (billing view unlabelled; annual saves up to 67%); Enterprise on request ${AS_OF}`,
      freeTierFeatures: `No free plan listed: you can try it free, and commercial use is on paid plans ${AS_OF}`,
      usageLimits: `Downloads a month: Creator and Artist Unlimited unlimited, Artist Starter 10, Artist Pro 20; WAV and stems from Artist Pro ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "murf-ai",
    finding: "Row had no company or website and listed $29/mo; Murf Inc. at murf.ai offers 10 free minutes (no downloads), Creator from $19 and Business from $66 a month billed annually",
    sources: ["https://murf.ai/text-to-speech", "https://murf.ai/legal/terms-of-service", "https://help.murf.ai/murf-api-plans-and-limits"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Creator from $19/mo and Business from $66/mo billed annually; Enterprise custom; API pay as you go $0.03 per 1,000 characters ($2 minimum) ${AS_OF}`,
      freeTierFeatures: `Free, no card: 10 minutes of voice generation; downloads need a paid plan ${AS_OF}`,
      usageLimits: `Free: 10 minutes of voice generation, no downloads; API free trial 100,000 characters; paid-plan voice hours not confirmed ${AS_OF}`,
      upgradeTriggers: "Downloading voiceovers; more voice generation time",
    },
    guarded: {
      company: { from: [null], to: "Murf Inc." },
      website: { from: [null], to: "https://murf.ai" },
    },
  },
  {
    slug: "glasp",
    finding: "Row was FREE with no limits; Glasp now sells Pro ($12.50/mo) and Unlimited ($30/mo), and the free plan caps AI chat, summaries, PDFs and audio",
    sources: ["https://glasp.co/pricing", "https://glasp.co/privacy-policy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Pro $12.50/mo ($150 billed yearly); Unlimited $30/mo ($360 billed yearly) ${AS_OF}`,
      freeTierFeatures: `Free, no card: unlimited public highlights, 3 basic YouTube summaries a day, 30 PDF uploads, 20 AI chat credits and 30 audio minutes a month; private highlights need Pro ${AS_OF}`,
      usageLimits: `AI chat credits a month: Free 20, Pro 500, Unlimited 2,000; audio minutes a month: 30 / 300 / 1,500 ${AS_OF}`,
      upgradeTriggers: "Private highlights; more AI chat credits, audio minutes and PDF uploads",
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },

  // ---- Batch-2 rows (audit 18), re-checked in a browser by the Research Analyst on 2026-10-29. ----
  // Only items the check marked verified change the text; NOT STATED items become "not stated".
  // Audit 18 now writes this same text on every field both audits set (audit-19.test.ts checks).
  {
    slug: "leonardo-ai",
    finding: "Browser check: Essential $12, Premium $30, Ultimate $60 a month billed monthly; 8,500 / 25,000 / 60,000 are monthly fast tokens (Token Bank caps are separate); free-plan content can be used for training",
    sources: ["https://leonardo.ai/pricing", "https://leonardo.ai/privacy-policy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free (150 tokens a day); billed monthly: Essential $12, Premium $30, Ultimate $60 a month (ex. tax); billed yearly: $12, $29 and $58 a month; Teams Starter $24 and Growth $48 per seat a month ${AS_OF}`,
      freeTierFeatures: `150 fast tokens a day, reset daily; unused tokens do not carry over; content made on the free plan can be used to train Leonardo's models ${AS_OF}`,
      usageLimits: `Fast tokens a month: Essential 8,500, Premium 25,000, Ultimate 60,000, with Token Bank caps of 25,500 / 75,000 / 180,000; Premium adds unlimited relaxed image generation on select models, Ultimate relaxed video ${AS_OF}`,
      upgradeTriggers: "Token limits; generating privately (paid plans; private content is not used for training); custom model training; priority generation; commercial use",
    },
  },
  {
    slug: "trinka-ai",
    finding: "Browser check: Premium $48 a year (from $80), Premium Plus $125 a year, Confidential Data $300 a year (from $500); monthly prices not captured, so the row's \"$20/mo\" goes",
    sources: ["https://www.trinka.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free Basic; Premium $48/yr (shown struck through from $80) and Premium Plus $125/yr; Confidential Data $300/yr (from $500); monthly prices not confirmed ${AS_OF}`,
      usageLimits: `Basic: 5,000 words, 5 AI writing requests and 4 credits a month; Premium: full writing access; Confidential Data plan (teams): no data storage and no AI training ${AS_OF}`,
    },
  },
  {
    slug: "wix-ai",
    finding: "Browser check: Light $17, Core $29, Business $39, Business Elite $159 a month, billed yearly; AI credits 150 / 200 / 300 / 1,000 a month; removing Wix branding needs Core; free storage not stated",
    sources: ["https://www.wix.com/plans"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Included with Wix plans; billed yearly: Light $17, Core $29, Business $39, Business Elite $159 a month ${AS_OF}`,
      freeTierFeatures: `Free plan, no card: Wix branding and no custom domain; AI creation tools included; storage not stated ${AS_OF}`,
      usageLimits: `AI credits a month: Light 150, Core 200, Business 300, Business Elite 1,000; removing Wix branding needs Core or above ${AS_OF}`,
      upgradeTriggers: "Removing Wix branding (Core or above); custom domain; e-commerce; more AI credits; more storage",
    },
  },
  {
    slug: "microsoft-designer",
    finding: "Browser check: still free with a monthly credit allowance (1 credit per AI action; amount not stated); Microsoft 365 Personal, Family or Premium give up to 4x more; boosts are gone; a Microsoft account requirement is not stated",
    sources: ["https://www.microsoft.com/en-us/microsoft-365/microsoft-designer"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free, with monthly AI credits; Microsoft 365 Personal, Family or Premium give up to 4x more credits (Personal $9.99/mo) ${AS_OF}`,
      freeTierFeatures: `Free, with a fresh set of AI credits each month (1 credit per AI action); the free amount is not stated ${AS_OF}`,
      usageLimits: `1 credit per Copilot or Designer AI action, refreshed monthly; free amount not stated; Microsoft 365 Personal, Family or Premium up to 4x more; boosts are gone ${AS_OF}`,
      upgradeTriggers: "More monthly AI credits (Microsoft 365 Personal, Family or Premium); Microsoft 365 integration features; brand kit",
    },
  },
  {
    slug: "openai-codex-cli",
    finding: "Browser check: the Codex CLI is included on ChatGPT Free and Go; only Codex cloud is not",
    sources: ["https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan", "https://learn.chatgpt.com/docs/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `Sign in with ChatGPT: the CLI is included from ChatGPT Free and Go up, with usage limits by plan; Codex cloud tasks are not included on Free and Go ${AS_OF}`,
      upgradeTriggers: "Higher Codex usage limits on paid ChatGPT plans; Codex cloud tasks (Plus and above); API-key use billed at API rates",
    },
  },
  {
    slug: "microsoft-power-automate",
    finding: "Browser check: the premium trial is 30 days on the pricing page",
    sources: ["https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `Free licence (work or school account): cloud flows without sharing, attended desktop flows, standard connectors only; a 30-day premium trial is offered ${AS_OF}`,
    },
  },
  {
    slug: "dragon-medical-one",
    finding: "End-of-life notice: Dragon Medical One LTSR 2021.4.5 and earlier stop working after December 31, 2026",
    sources: ["https://dragonmedicalone.nuance.com", "https://learn.microsoft.com/en-us/industry/healthcare/dragon-medical-one/admin/upgrade-dragon-medical-one"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits: `Not published. Dragon Medical One LTSR version 2021.4.5 and earlier stop working after December 31, 2026 ${AS_OF}`,
    },
  },

  // ---- Other rows. ----
  {
    slug: "gpt-image-1-5-dall-e-successor",
    finding: "upgradeTriggers still said \"Needing more than 3 images/day\" (audit 18 fixed the other fields); OpenAI publishes no numeric image limit",
    sources: ["https://chatgpt.com/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      upgradeTriggers: "More image generation than ChatGPT Free allows (OpenAI publishes no numeric limit); API integration; higher resolution; bulk generation",
    },
  },
  {
    slug: "gemini-cli",
    finding: "Cross-link: free individual use moved to Antigravity CLI (new row antigravity-cli); Gemini CLI stays PAID",
    sources: ["https://github.com/google-gemini/gemini-cli"],
    checkedAt: CHECKED_AT,
    fields: {},
    addDirectAlternatives: ["Antigravity CLI"],
  },
];

export type Audit19Row = Partial<Record<Audit19TextField, string | null>> & {
  company: string | null;
  website: string | null;
  costTier: string;
  apiAvailable?: boolean;
  privacyLevel?: string | null;
  directAlternatives?: string[];
};

/** Prisma `data` for one row: text fields that differ; guarded fields only from their expected old value. */
export function audit19PatchData(row: Audit19Row, patch: Audit19Patch): Record<string, string | boolean | string[]> {
  const data: Record<string, string | boolean | string[]> = {};
  for (const [field, value] of Object.entries(patch.fields) as [Audit19TextField, string][]) {
    if (row[field] !== value) data[field] = value;
  }
  const g = patch.guarded ?? {};
  if (g.company && g.company.from.includes(row.company)) data.company = g.company.to;
  if (g.website && g.website.from.includes(row.website)) data.website = g.website.to;
  if (g.costTier && row.costTier === g.costTier.from) data.costTier = g.costTier.to;
  if (g.apiAvailable && row.apiAvailable === g.apiAvailable.from) data.apiAvailable = g.apiAvailable.to;
  if (g.privacyLevel && row.privacyLevel === g.privacyLevel.from) data.privacyLevel = g.privacyLevel.to;
  if (patch.addDirectAlternatives?.length) {
    const current = row.directAlternatives ?? [];
    const have = new Set(current.map((n) => n.trim().toLowerCase()));
    const missing = patch.addDirectAlternatives.filter((n) => !have.has(n.trim().toLowerCase()));
    if (missing.length) data.directAlternatives = [...current, ...missing];
  }
  return data;
}

/** Guarded fields left alone because the row holds neither the old nor the new value (a hand edit). */
export function audit19GuardSkips(row: Audit19Row, patch: Audit19Patch): string[] {
  const g = patch.guarded ?? {};
  const skips: string[] = [];
  if (g.company && row.company !== g.company.to && !g.company.from.includes(row.company)) skips.push("company");
  if (g.website && row.website !== g.website.to && !g.website.from.includes(row.website)) skips.push("website");
  if (g.costTier && row.costTier !== g.costTier.to && row.costTier !== g.costTier.from) skips.push("costTier");
  if (g.apiAvailable && row.apiAvailable !== g.apiAvailable.to && row.apiAvailable !== g.apiAvailable.from) skips.push("apiAvailable");
  if (g.privacyLevel && row.privacyLevel !== g.privacyLevel.to && row.privacyLevel !== g.privacyLevel.from) skips.push("privacyLevel");
  return skips;
}

export function audit19Slugs(): string[] {
  return AUDIT_19_PATCHES.map((p) => p.slug);
}

// ---- Antigravity CLI: new row, create only (the audit 16 pattern). ----

export const ANTIGRAVITY_SLUG = "antigravity-cli";
/** Existing category slug (scripts/restructure-categories-2026-05.ts), where gemini-cli sits. */
export const ANTIGRAVITY_CATEGORY_SLUG = "ai-coding-development";

export const ANTIGRAVITY_SOURCES = [
  "https://antigravity.google/product/antigravity-cli",
  "https://antigravity.google/pricing",
  "https://antigravity.google/docs/plans",
  "https://antigravity.google/docs/models",
  "https://antigravity.google/docs/getting-started",
  "https://antigravity.google/docs/faq",
  "https://antigravity.google/terms",
  "https://gemini.google/subscriptions/",
  "https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/",
] as const;

/** Catalog names of alternatives that have rows (snapshot, 2026-10-29). */
export const ANTIGRAVITY_ALTERNATIVES = ["Gemini CLI", "Claude Code", "OpenAI Codex CLI", "Aider"];

const planPrice = (name: string): string => {
  const plan = antigravityCliFacts.plans.value.find((p) => p.name === name);
  if (!plan) throw new Error(`antigravity-cli plans: no ${name}`);
  return plan.price;
};

/** Row currentPricing, built from the fact file's plans. */
export function antigravityCurrentPricing(): string {
  return `$0 for individuals (quota refreshed weekly); Google AI Pro ${planPrice("Google AI Pro")}/mo and Google AI Ultra from ${planPrice("Google AI Ultra")}/mo raise the limits; organisations: Gemini Enterprise from $30 per seat a month, or pay-as-you-go ${AS_OF}`;
}

/** Row freeTierFeatures, from the fact file's free-tier summary. */
export function antigravityFreeTierFeatures(): string {
  return `${antigravityCliFacts.freeTier.value.summary} ${AS_OF}`;
}

/** Every field the new row sets besides categoryId. Shape matches existing rows. */
export const ANTIGRAVITY_ROW = {
  slug: ANTIGRAVITY_SLUG,
  name: "Antigravity CLI",
  company: "Google",
  website: "https://antigravity.google/product/antigravity-cli",
  description:
    "Google's terminal coding agent: you type what you want in plain English, and its AI agent reads your project, edits files and runs commands. It replaced Gemini CLI for free individual use and for Google AI Pro and Ultra subscribers on 2026-06-18. Individuals can use it for $0 with a quota refreshed weekly; Google AI Pro and Ultra raise the limits. It is not open source. Google's Antigravity terms (as of 2026-10-29) say Google uses your interactions to improve its products and machine-learning technologies and that Google employees and contractors may review them, and ask you not to submit confidential information.",
  primaryUse: "Google's terminal AI coding agent, free for individuals with a weekly quota",
  primaryUseCases:
    "Coding from the terminal; multi-file edits and refactors; running commands and tests; moving over from Gemini CLI",
  costTier: "FREEMIUM",
  difficultyLevel: "ADVANCED",
  platformType: ["desktop"] as string[],
  currentPricing: antigravityCurrentPricing(),
  freeTierFeatures: antigravityFreeTierFeatures(),
  usageLimits: `Free: a quota refreshed weekly; Google AI Pro: refreshed every five hours up to a weekly limit; Ultra: the highest quota; numeric requests per minute or per day are not stated ${AS_OF}`,
  upgradeTriggers:
    "Higher rate limits (Google AI Pro or Ultra); Google's newest Gemini and Claude models on paid plans; AI credits for overage",
  apiAvailable: false,
  offlineCapable: false,
  keyIntegrations:
    "Terminal; MCP servers; plugins, skills and hooks; the Antigravity desktop app (same agent harness); Gemini CLI extensions import as plugins",
  privacyLevel: "LOW",
  idealUserTypes: ["Developers", "Google ecosystem users", "terminal-native engineers", "former Gemini CLI users"] as string[],
  timeToProductivity: null,
  learningCurve: "Moderate",
  directAlternatives: ANTIGRAVITY_ALTERNATIVES,
  complementaryTools: ["Google Antigravity"] as string[],
  budgetAlternativeTo: ["Gemini CLI", "Claude Code"] as string[],
  privacyAlternativeTo: [] as string[],
  contentTypes: ["Code", "shell commands"] as string[],
  outputFormats: ["Code files", "terminal output"] as string[],
  languageSupport: null,
  hasMobileApp: false,
  mobileWebFriendly: false,
} as const;

/** Prisma `data` for the create, or null when the row exists or the category is missing. */
export function antigravityCreateData(
  exists: boolean,
  categoryId: string | null,
): (typeof ANTIGRAVITY_ROW & { categoryId: string }) | null {
  if (exists || !categoryId) return null;
  return { ...ANTIGRAVITY_ROW, categoryId };
}

export { AS_OF };
