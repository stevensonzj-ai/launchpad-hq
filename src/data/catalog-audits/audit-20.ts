/**
 * Catalog audit #20 — stale facts, batch 4, 2026-10-29. UPDATE-only. Patch
 * data and pure diff logic for scripts/update-catalog-audit-20.ts (the DB
 * runner lives there). Same shape and rules as audits 17 to 19.
 *
 * Batch 4 is rows 74–92 of the stale group: 19 rows whose pricing text carries
 * no date, listed in
 * docs/planning/2026-10-autonomous-business/stale-facts-batches.md. Each was
 * read on the vendor's own pages on 2026-10-29 by two independent, blind
 * readers; the sourced facts are in src/data/facts/<slug>.ts. A row is
 * patched here only for facts both readers saw. Facts a page did not show
 * (blocked, or rendered only in a browser) are left as the row has them and
 * listed in REVIEW-SUMMARY.md under "Browser-check list".
 *
 *   - fields: text set to exactly this value, written only where it differs;
 *   - guarded: company, website, costTier, apiAvailable, privacyLevel and
 *     description change only while the row still holds the expected old
 *     value (company and website may expect null), so a hand edit is never
 *     overwritten;
 *   - addDirectAlternatives: catalog names appended when missing, never
 *     removed (the audit 9 rule);
 *   - replaceBudgetAlternatives: one named entry swapped for another, only
 *     when the row holds the old entry (so a hand edit is never overwritten
 *     and a re-run is a no-op).
 *
 * Three leftovers from batch 3 are in here too (AUDIT_20_LEFTOVERS):
 *   1. google-antigravity (the IDE) said "Free (preview)" and "cloud-based
 *      IDE"; it now carries the same verified plans as the antigravity-cli
 *      row, built from audit 19's helpers so the two cannot drift.
 *   2. claude-code and openai-codex-cli listed Gemini CLI as a free budget
 *      alternative; Gemini CLI has been paid-API only since 2026-06-18, so
 *      the entry now points to Antigravity CLI. The gemini-cli row is not
 *      touched.
 *   3. murf-ai surfaced at #5 for "learn a language" in search_tools because
 *      its description says "multiple voices and languages" (the only field
 *      that matched; the batch-3 facts are not involved). Murf is a
 *      text-to-speech tool, so the description is reworded without that word.
 *      No search code changes.
 *
 * Zach's two approved decisions and the Research Analyst's batch-3 browser check
 * (2026-10-29) are in here too (AUDIT_20_DECISIONS, AUDIT_20_BROWSER_CHECK):
 *   4. restb-ai: cost tier ENTERPRISE (first PAID; audit 21 reversed it: the API
 *      is sales-only, Restb Lens shows no public prices; the note is in the
 *      description); leonardo-ai:
 *      privacy LOW, because Free-plan content is used for training.
 *   5. quizlet-q-chat, bloomberg-gpt-terminal-ai, zillow-ai-zestimate and
 *      duolingo-max: row text from the browser check (Quizlet gets its first
 *      fact file). Q-Chat is not called retired; Duolingo's "Explain My
 *      Answer" is dropped; Zillow and Duolingo prices are "not stated".
 *   6. google-antigravity: privacy HIGH to MEDIUM (first LOW; audit 21 moved
 *      it, with the antigravity-cli row that audit 19 creates, once Zach
 *      confirmed the Enable Telemetry opt-out; reasoning in
 *      src/data/facts/google-antigravity.ts).
 *   Lyria (current model is Lyria 3.5) changes in its fact file and guide
 *   only; the row text already says so. Codex CLI, Gemini CLI, Upstage and
 *   Aider were confirmed as they are.
 *
 * Audit 21 (batch-4 browser corrections) rewrites a few of this audit's
 * targets (A21_TEXT, the restb-ai tier and description, the google-antigravity
 * privacy); they are imported from audit-21.ts so the two agree.
 *
 * Earlier audits: they write no field this one writes on a row, with one
 * exception: restb-ai costTier, where audit 19 now writes the same ENTERPRISE
 * (audit-20.test.ts checks 17, 18 and 19 field by field, and re-runs them
 * against the patched snapshot). Audit 10 patches currentPricing on
 * claude-code only; this audit writes budgetAlternativeTo there. Audit 11
 * patches clio-manage and spellbook on costTier only; this audit writes
 * neither tier. Audit 5 edits complementaryTools and removes names from
 * directAlternatives on naver, adobe-firefly, topaz-labs, adobe-acrobat and
 * google-veo-3-1; audit 15 removes Tabnine from amazon-q-developer's
 * directAlternatives; this audit touches none of those lists except to add
 * Kiro to amazon-q-developer. Text never says "official" (audit 10's wording
 * pass rewrites text that does). No affiliate or sponsor links.
 *
 * Never deletes or creates rows; never changes slug, name or categoryId.
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-20.test.ts).
 */
import { A21_TEXT, RESTB_DESCRIPTION, RESTB_DESCRIPTION_OLD } from "./audit-21";
import {
  antigravityCurrentPricing,
  antigravityFreeTierFeatures,
  ANTIGRAVITY_ROW,
} from "./audit-19";

export const CHECKED_AT = "2026-10-29";
const AS_OF = `(as of ${CHECKED_AT})`;

export type Audit20TextField = "primaryUse" | "currentPricing" | "freeTierFeatures" | "usageLimits" | "upgradeTriggers";

export type Audit20Guarded = {
  company?: { from: (string | null)[]; to: string };
  website?: { from: (string | null)[]; to: string };
  costTier?: { from: string | string[]; to: string };
  apiAvailable?: { from: boolean; to: boolean };
  privacyLevel?: { from: string; to: string };
  description?: { from: (string | null)[]; to: string };
};

export type Audit20Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit20TextField, string>>;
  guarded?: Audit20Guarded;
  /** Catalog names appended to directAlternatives when missing (never removed). */
  addDirectAlternatives?: string[];
  /** One budgetAlternativeTo entry swapped for another, only while the row holds `from` exactly. */
  replaceBudgetAlternatives?: { from: string; to: string }[];
};

/** Batch 4, in tracker order (rows 74–92). */
export const AUDIT_20_BATCH = [
  "cline",
  "clio-manage",
  "harvey-ai",
  "luminance",
  "scispace",
  "spellbook",
  "naver-hyperclova-x-cue",
  "adobe-firefly",
  "topaz-labs",
  "cohere",
  "adobe-acrobat-ai-assistant",
  "amazon-bedrock",
  "azure-openai-service",
  "chatpdf",
  "google-veo-3-1",
  "open-webui",
  "scholarcy",
  "wondershare-pdfelement-ai",
  "amazon-q-developer",
];

/** Batch-4 rows with no fact file, and why. */
export const AUDIT_20_NO_FACT_FILE: Record<string, string> = {
  "clio-manage": "clio.com, /pricing and /privacy returned 403 to both readers (Browser-check list). Audit 21 added its fact file from the browser check.",
  scholarcy: "Every scholarcy.com page (home, pricing, privacy policy) returned 403 to both readers (Browser-check list). Audit 21 added its fact file from the browser check.",
};

/** Batch-4 rows read, but with nothing both readers saw that changes the row text. */
export const AUDIT_20_NO_ROW_CHANGE: Record<string, string> = {
  "clio-manage": "unread (403)",
  scholarcy: "unread (403)",
  "naver-hyperclova-x-cue": "clova.ai only; the consumer CLOVA X and Cue: pages were blocked, so the row's Cue: wording waits for a browser check",
};

/** The three leftovers carried over from batch 3. */
export const AUDIT_20_LEFTOVERS = ["google-antigravity", "claude-code", "openai-codex-cli", "murf-ai"];

/** Zach's approved decisions (2026-10-29). */
export const AUDIT_20_DECISIONS = ["restb-ai", "leonardo-ai"];

/** Rows changed by the Research Analyst's batch-3 browser check (2026-10-29). */
export const AUDIT_20_BROWSER_CHECK = ["quizlet-q-chat", "bloomberg-gpt-terminal-ai", "zillow-ai-zestimate", "duolingo-max"];

// Restb.ai's description is owned by audit 21 (the "Lens has self-serve plans" claim came out); audit 20 writes the same text.
export { RESTB_DESCRIPTION };

export const MURF_DESCRIPTION_OLD = "AI voice generator for voiceovers, e-learning, and ads with multiple voices and languages.";
export const MURF_DESCRIPTION_NEW =
  "AI text-to-speech studio for multilingual voiceovers in videos, e-learning and ads, with a library of voices to choose from.";

export const AUDIT_20_PATCHES: Audit20Patch[] = [
  {
    slug: "cline",
    finding: "Row text was undated; it matches Cline's pricing page. Adds the date, no free AI credits, no usage caps, and the Enterprise extras",
    sources: ["https://cline.bot/pricing", "https://cline.bot/privacy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free for individual developers (VS Code extension and CLI); you pay for AI inference at cost or bring your own API keys; Enterprise is custom, by quote ${AS_OF}`,
      freeTierFeatures: `Open Source plan, free for individual developers: VS Code extension, CLI, MCP Marketplace and community support; no free AI credits are stated ${AS_OF}`,
      usageLimits: `No usage caps stated; AI inference is billed by usage ${AS_OF}`,
      upgradeTriggers: "Enterprise: JetBrains extension, SSO, SLA and dedicated support, centralized billing, role-based access control, team dashboard",
    },
  },
  {
    slug: "harvey-ai",
    finding: "Row said \"Enterprise custom\" and \"enterprise contracts only\"; Harvey publishes no price, free plan or trial (demo request only, /pricing is a 404)",
    sources: ["https://www.harvey.ai/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No public pricing; access starts with a demo request ${AS_OF}`,
      freeTierFeatures: `No free plan or self-serve trial listed; access starts with a demo request ${AS_OF}`,
      usageLimits: `Not published ${AS_OF}`,
    },
  },
  {
    slug: "luminance",
    finding: "Row said \"Enterprise custom\" and \"enterprise/firm contracts only\"; Luminance publishes no price, free plan or trial (demo request only)",
    sources: ["https://www.luminance.com/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No public pricing; access starts with a demo request ${AS_OF}`,
      freeTierFeatures: `No free plan or trial listed; the site offers a demo request ${AS_OF}`,
      usageLimits: `Not published ${AS_OF}`,
    },
  },
  {
    slug: "scispace",
    finding: "Website still typeset.io; both readers saw it redirect (301) to scispace.com. Pricing pages returned 403, so the plan text waits for a browser check",
    sources: ["https://typeset.io/pricing"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { website: { from: ["https://typeset.io"], to: "https://scispace.com" } },
  },
  {
    slug: "spellbook",
    finding: "Row said \"From $99/user/mo\"; Spellbook publishes no prices (custom pricing by team size), offers a 7-day trial, and moved from spellbook.legal to spellbook.com. Audit 11 owns the cost tier",
    sources: ["https://spellbook.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No published prices: custom pricing set by the number of team members on a license; book a demo ${AS_OF}`,
      freeTierFeatures: `No permanent free tier; lawyers and legal teams can try Spellbook free for 7 days ${AS_OF}`,
      usageLimits: `Priced by the number of team members on a license ${AS_OF}`,
    },
    guarded: { website: { from: ["https://spellbook.legal"], to: "https://spellbook.com" } },
  },
  {
    slug: "adobe-firefly",
    finding: "Row said 25 free credits a month and Premium $199.99/mo; Adobe now gives free daily generations (count not stated), paid plans carry 2,000 / 4,000 / 10,000 / 50,000 monthly credits that do not roll over, and the row's $199.99 was read as the teams price (audit 21: the plans page shows it as Premium)",
    sources: ["https://www.adobe.com/products/firefly/plans.html", "https://www.adobe.com/products/firefly.html"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: A21_TEXT["adobe-firefly"].currentPricing,
      freeTierFeatures: `Free daily generations across image, video and audio, with no plan needed; limits refresh every day and the daily count is not stated ${AS_OF}`,
      usageLimits: `Monthly generative credits: Standard 2,000, Pro 4,000, Pro Plus 10,000, Premium 50,000; credits reset each billing cycle and do not roll over; paid plans include unlimited standard image and vector generation ${AS_OF}`,
      upgradeTriggers: "More than the free daily generations; video, audio and partner models (they use credits); more monthly credits",
    },
  },
  {
    slug: "topaz-labs",
    finding: "Row said Video AI $299 and Photo AI $199 (perpetual) at ENTERPRISE; Topaz lists subscriptions only (Photo $199/yr, Video $299/yr, Gigapixel $149/yr, Studio $399/yr; monthly rates too), no perpetual licence and no free plan",
    sources: ["https://www.topazlabs.com/pricing", "https://www.topazlabs.com/privacy-policy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: A21_TEXT["topaz-labs"].currentPricing,
      freeTierFeatures: `No free plan listed; every plan shown is a subscription, and the pricing page does not mention a trial ${AS_OF}`,
      usageLimits: `Standard plans: limited commercial use for organisations under $1M annual revenue; Pro plans: full commercial use ${AS_OF}`,
      upgradeTriggers: "Full commercial use (Pro plans); the all-apps Studio bundle; photo, video and enlargement are separate products",
    },
    guarded: { costTier: { from: "ENTERPRISE", to: "PAID" } },
  },
  {
    slug: "cohere",
    finding: "Row was FREE and HIGH privacy; Cohere's Trial key is free but rate limited with no commercial use, production is pay as you go, and its privacy policy lets trial users' inputs be used for research and development with no opt-out",
    sources: ["https://cohere.com/pricing", "https://cohere.com/privacy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free Trial API key (rate limited; no production or commercial use); production is pay as you go; Model Vault is priced per instance (Rerank 5 Medium $4.00 an hour or $2,500 a month); North, Compass and private deployments are custom ${AS_OF}`,
      freeTierFeatures: A21_TEXT.cohere.freeTierFeatures,
    },
    guarded: {
      costTier: { from: "FREE", to: "FREEMIUM" },
      privacyLevel: { from: "HIGH", to: "MEDIUM" },
    },
  },
  {
    slug: "adobe-acrobat-ai-assistant",
    finding: "Row said included with Acrobat Pro $22.99/mo and a limited free preview; AI Assistant features are built into Acrobat Express and Studio, there is no permanent free AI tier, and Pro is $19.99/mo on an annual plan",
    sources: ["https://www.adobe.com/acrobat/pricing.html", "https://www.adobe.com/acrobat/generative-ai-pdf.html"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: A21_TEXT["adobe-acrobat-ai-assistant"].currentPricing,
      freeTierFeatures: `No permanent free AI tier: Acrobat Reader is free for viewing and commenting, and the paid plans offer free trials (length not stated) ${AS_OF}`,
      usageLimits: `Not published for individual plans ${AS_OF}`,
      upgradeTriggers: A21_TEXT["adobe-acrobat-ai-assistant"].upgradeTriggers,
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "amazon-bedrock",
    finding: "Row said limited model usage free for the first 2 months; Bedrock has no free tier of its own, and new AWS accounts get up to $200 in credits valid for 6 months on the AWS Free plan",
    sources: ["https://aws.amazon.com/free/", "https://aws.amazon.com/bedrock/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Pay as you go per token (On-Demand Standard, Flex and Priority tiers); Batch is about 50% lower on select models; Provisioned Throughput is hourly with no commitment, 1-month or 6-month terms ${AS_OF}`,
      freeTierFeatures: A21_TEXT["amazon-bedrock"].freeTierFeatures,
      usageLimits: `Per-token and per-hour billing, no subscription plans; Guardrails, Knowledge Bases and Model Evaluation are billed separately ${AS_OF}`,
      upgradeTriggers: "Free-plan credits running out; Provisioned Throughput; Guardrails; Knowledge Bases; Model Evaluation",
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "azure-openai-service",
    finding: "Row said $200 credits for 30 days; Microsoft says pay as you go or try Azure free for up to 30 days (no credit amount stated), and now offers the service inside Microsoft Foundry",
    sources: [
      "https://azure.microsoft.com/en-us/products/ai-foundry/",
      "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
      "https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy",
    ],
    checkedAt: CHECKED_AT,
    fields: {
      primaryUse: "OpenAI models on Azure infrastructure, now offered inside Microsoft Foundry",
      currentPricing: `Pay as you go per token (Global, Data Zone and Regional deployments); provisioned throughput (PTU) by monthly or annual reservation; Batch pricing; per-token prices are on the Azure pricing page ${AS_OF}`,
      freeTierFeatures: A21_TEXT["azure-openai-service"].freeTierFeatures,
      usageLimits: `Consumption-based billing; provisioned throughput (PTU) reserved monthly or annually ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "chatpdf",
    finding: "Row listed Plus $5/mo, 120 pages per PDF and 10 questions a day; ChatPDF shows no Plus price or those limits, only the free plan (2 documents a day)",
    sources: ["https://www.chatpdf.com/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free (2 documents a day); ChatPDF Plus for unlimited document analysis and more advanced features; the Plus price is not shown on the homepage ${AS_OF}`,
      freeTierFeatures: `Free plan: 2 documents a day, no account needed to start; a free account adds saved chat history and multi-document chats ${AS_OF}`,
      usageLimits: `Free: 2 documents a day; Plus: unlimited document analysis; page, file-size and question limits are not stated on the homepage ${AS_OF}`,
      upgradeTriggers: "More than 2 documents a day; more advanced features (Plus)",
    },
  },
  {
    slug: "google-veo-3-1",
    finding: "Row said Gemini Advanced or VideoFX access; video generation now comes with Google AI Plus, Pro and Ultra, the Gemini API's Veo 3.1 previews shut down on 2026-10-22 (Gemini Omni Flash replaces them), and the DeepMind page moved",
    sources: [
      "https://gemini.google/subscriptions/",
      "https://ai.google.dev/gemini-api/docs/video",
      "https://ai.google.dev/gemini-api/docs/pricing",
      "https://deepmind.google/models/veo/",
    ],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Video generation comes with Google AI plans: AI Plus $4.99, AI Pro $19.99 and AI Ultra from $99.99 a month; the Gemini API no longer lists Veo (its video model is Gemini Omni Flash, about $0.10 a second, paid tier only); Google Cloud pricing not confirmed ${AS_OF}`,
      freeTierFeatures: `The Free Gemini plan lists limited Google Flow access and no video generation; AI Pro includes a limited trial of Veo 3.1 Lite and AI Ultra includes Veo 3.1; a free daily Flow credit allowance is not confirmed on the plans page ${AS_OF}`,
      usageLimits: `Flow credits a month: AI Plus 200, AI Pro 1,000, AI Ultra 10,000 (a $199.99 tier has 25,000); per-plan Veo quotas are not stated; the Gemini API's Veo 3.1 previews were shut down on 2026-10-22 ${AS_OF}`,
      upgradeTriggers: "Video generation beyond the Free plan (Google AI Plus, Pro or Ultra); Veo 3.1 itself (Ultra); more Flow credits; API use (Gemini Omni Flash)",
    },
    guarded: { website: { from: ["https://deepmind.google/technologies/veo/"], to: "https://deepmind.google/models/veo/" } },
  },
  {
    slug: "open-webui",
    finding: "Row said completely free and open-source (MIT); since v0.6.6 it uses the Open WebUI License (BSD-3 plus a branding clause), which the docs say is not OSI-approved; Enterprise is quote only",
    sources: ["https://docs.openwebui.com/license", "https://docs.openwebui.com/enterprise", "https://openwebui.com"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free to self-host; the Enterprise licence is quote only ${AS_OF}`,
      freeTierFeatures: `Free to self-host, no account required, with the Open WebUI branding intact; since v0.6.6 it uses the Open WebUI License (BSD-3 plus a branding clause), which the docs say is not an OSI-approved open source licence ${AS_OF}`,
      usageLimits: `Limited only by your hardware; keep the Open WebUI branding unless you have 50 or fewer end users in a rolling 30 days, written permission or an enterprise licence ${AS_OF}`,
      upgradeTriggers: "Removing Open WebUI branding at larger scale (enterprise licence); SSO and other enterprise features, by quote",
    },
  },
  {
    slug: "wondershare-pdfelement-ai",
    finding: "Row said from $79.99/year and a watermarked free trial; the homepage shows perpetual licences ($129.99 to $139.99, promotional) and a $39.99 yearly education plan, and states no trial terms or AI limits",
    sources: ["https://pdf.wondershare.com/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Perpetual licences: Personal $129.99, Team $139, Cross Platform $139.99 (one user; promotional homepage prices); Education $39.99 a year ${AS_OF}`,
      freeTierFeatures: `Free downloads are offered for Windows, Mac, iOS and Android; trial terms, watermarking and AI limits are not stated on the homepage ${AS_OF}`,
      usageLimits: `AI credit or quota limits are not stated on the pages read ${AS_OF}`,
    },
  },
  {
    slug: "amazon-q-developer",
    finding: "Row said code suggestions and CodeWhisperer features; the pricing page lists Free (50 agentic interactions, 1,000 Java-upgrade lines a month) and Pro $19, AWS ends IDE plugin support on 2027-04-30 (Kiro), and Free-tier content may be used for service improvement",
    sources: [
      "https://aws.amazon.com/q/developer/",
      "https://aws.amazon.com/q/developer/pricing/",
      "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/service-improvement.html",
    ],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Pro $19 per user a month (4,000 lines of code per user a month for transformation, then $0.003 a line) ${AS_OF}`,
      freeTierFeatures: `Free tier: 50 agentic chat interactions a month and 1,000 lines of code a month for Java upgrades; no admin dashboard or IP indemnity. AWS ends IDE plugin support on April 30, 2027 and points to Kiro ${AS_OF}`,
      usageLimits: `Free: 50 agentic requests and 1,000 transformation lines a month; Pro: higher limits, 4,000 lines per user a month pooled at the account level ${AS_OF}`,
      upgradeTriggers: "Higher agentic and transformation limits; admin dashboard; IP indemnity; content not used for service improvement",
    },
    guarded: { privacyLevel: { from: "HIGH", to: "MEDIUM" } },
    addDirectAlternatives: ["Kiro"],
  },

  // ---- Leftovers from batch 3. ----
  {
    slug: "google-antigravity",
    finding: "Row said \"Free (preview)\", a free cloud-based IDE and generous free tier; Google's Antigravity pricing is $0 for individuals with weekly rate limits, Google AI Pro and Ultra raise them, organisations use Gemini Enterprise (same plans as the Antigravity CLI row). Privacy HIGH to MEDIUM to match the CLI row (first written as LOW; audit 21 moved it once Zach confirmed the Enable Telemetry opt-out): same Antigravity terms, interactions are used to improve Google's products and machine learning by default and reviewers may see them, and the Enable Telemetry setting is the opt-out, so the rubric's MEDIUM (improvement with an opt-out) applies",
    sources: ["https://antigravity.google/pricing", "https://antigravity.google/docs/plans", "https://antigravity.google/docs/models", "https://antigravity.google/terms", "https://antigravity.google/docs/faq"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: antigravityCurrentPricing(),
      freeTierFeatures: antigravityFreeTierFeatures(),
      usageLimits: ANTIGRAVITY_ROW.usageLimits,
      upgradeTriggers: ANTIGRAVITY_ROW.upgradeTriggers,
    },
    guarded: {
      costTier: { from: "FREE", to: "FREEMIUM" },
      privacyLevel: { from: "HIGH", to: "MEDIUM" },
    },
  },
  {
    slug: "claude-code",
    finding: "Budget alternative \"Gemini CLI (free)\"; Gemini CLI has been paid-API only since 2026-06-18, so the entry now points to Antigravity CLI, which is free for individuals",
    sources: ["https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/", "https://antigravity.google/pricing"],
    checkedAt: CHECKED_AT,
    fields: {},
    replaceBudgetAlternatives: [{ from: "Gemini CLI (free)", to: "Antigravity CLI (free for individuals)" }],
  },
  {
    slug: "openai-codex-cli",
    finding: "Budget alternative \"Gemini CLI (free with Google account)\"; Gemini CLI has been paid-API only since 2026-06-18, so the entry now points to Antigravity CLI, which is free with a personal Google account",
    sources: ["https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/", "https://antigravity.google/pricing"],
    checkedAt: CHECKED_AT,
    fields: {},
    replaceBudgetAlternatives: [{ from: "Gemini CLI (free with Google account)", to: "Antigravity CLI (free with a personal Google account)" }],
  },
  {
    slug: "murf-ai",
    finding: "Murf surfaced at #5 for \"learn a language\" only because its description says \"multiple voices and languages\"; it is a text-to-speech tool, so the description now says multilingual voiceovers (search code unchanged)",
    sources: ["https://murf.ai/text-to-speech"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { description: { from: [MURF_DESCRIPTION_OLD], to: MURF_DESCRIPTION_NEW } },
  },
  // ---- Zach's approved decisions (2026-10-29). ----
  {
    slug: "restb-ai",
    finding: "Zach: cost tier ENTERPRISE (first decided PAID, reversed the same day in audit 21 after the Research Analyst's browser check: the API is sales-only and Restb Lens shows no public prices). Audit 19 now writes the same ENTERPRISE; a row an earlier run left at PAID moves here. The note is the description (no field audit 18 or 19 owns)",
    sources: ["https://restb.ai/faq/", "https://restb.ai/terms-conditions/"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: {
      costTier: { from: ["FREEMIUM", "PAID"], to: "ENTERPRISE" },
      description: { from: [null, RESTB_DESCRIPTION_OLD], to: RESTB_DESCRIPTION },
    },
  },
  {
    slug: "leonardo-ai",
    finding: "Zach: privacy LOW. Leonardo's privacy policy lets it train on content unless it is generated privately, which needs a paid plan, so Free-plan content is used for training (rubric: LOW is inputs used for training by default). Text is owned by audits 18 and 19",
    sources: ["https://leonardo.ai/privacy-policy", "https://leonardo.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { privacyLevel: { from: "MEDIUM", to: "LOW" } },
  },

  // ---- Research Analyst batch-3 browser check (2026-10-29, logged out, US/USD). ----
  {
    slug: "quizlet-q-chat",
    finding: "Row said Plus $35.99/year, Plus $8/mo and Teachers $4/mo, limited AI features and full Q-Chat AI; Quizlet's upgrade page shows Plus $35.99, Plus Unlimited $44.99 and Family $83.99 a year and names no AI feature, and the AI feature documented now is Ask Quizlet (US only, 14+, login required). No page says Q-Chat was retired, so the row does not",
    sources: ["https://quizlet.com/upgrade", "https://help.quizlet.com/hc/en-us/articles/42790350723725-Studying-with-Ask-Quizlet"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free tier; Quizlet Plus $35.99 a year, Plus Unlimited $44.99 a year and Family $83.99 a year (up to 5 accounts), all billed yearly; the monthly plan is not eligible for the free trial ${AS_OF}`,
      freeTierFeatures: `Ask Quizlet, the AI study chat, needs a login and is available only to users in the United States aged 14 or older; the help article names no plan requirement or usage limit ${AS_OF}`,
      usageLimits: `Plus: 20 Learn rounds a month; Plus Unlimited and Family: unlimited Learn rounds; limits on Ask Quizlet are not stated ${AS_OF}`,
      upgradeTriggers: "More than 20 Learn rounds a month (Plus Unlimited or Family); practice tests; Expert Solutions; up to 5 accounts (Family)",
    },
  },
  {
    slug: "bloomberg-gpt-terminal-ai",
    finding: "Row said ~$24,000/year (Terminal) and unlimited use; Bloomberg publishes no Terminal price (Order or Request a Demo) and ASKB is the Terminal's AI. Bloomberg.com's consumer plan is $399 a year ($180 the first year) or $39.99 a month, and its page names no AI feature",
    sources: ["https://www.bloomberg.com/subscriptions", "https://www.bloomberg.com/professional/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Bloomberg Terminal: no public price, sold through an order or demo request; ASKB, the Terminal's AI, is sales-only. A separate Bloomberg.com consumer subscription is $399 a year ($180 for the first year) or $39.99 a month ($1.99 for the first month), and its page names no AI feature ${AS_OF}`,
      freeTierFeatures: `No free plan stated for the Terminal; it is ordered or demoed through sales ${AS_OF}`,
      usageLimits: `Not published ${AS_OF}`,
    },
  },
  {
    slug: "zillow-ai-zestimate",
    finding: "Row said completely free for consumers with no limits; Zillow's October 21, 2026 post lists a Zillow app in ChatGPT, a connector in Claude, a rentals-only feature in Gemini and AI mode, and states no cost for them",
    sources: ["https://www.zillow.com/news/when-people-ask-ai-about-housing-chatgpt-gemini-and-claude-all-connect-to-zillow/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Zillow states no cost for its AI features: the Zillow app in ChatGPT, the Zillow connector in Claude, the rentals feature in Gemini and AI mode on Zillow; Premier Agent is paid ${AS_OF}`,
      freeTierFeatures: `Not stated: Zillow's pages do not say whether the AI features are free or have limits ${AS_OF}`,
      usageLimits: `Not stated ${AS_OF}`,
    },
  },
  {
    slug: "duolingo-max",
    finding: "Row listed Super $12.99/mo, Max $29.99/mo (and, in another field, $7 and $14) and Explain My Answer; Duolingo's logged-out pages state no price, and its help centre says Max is Super plus Roleplay and Video Call with Lily. Explain My Answer is on no current page",
    sources: ["https://blog.duolingo.com/duolingo-max/", "https://www.duolingo.com/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Super and Max are paid subscriptions; Max is Super plus Roleplay and Video Call with Lily; prices are not stated on Duolingo's logged-out pages ${AS_OF}`,
      usageLimits: `Free: ads and heart limits; Max includes all Super benefits plus Roleplay and Video Call with Lily; prices are not stated ${AS_OF}`,
      upgradeTriggers: "Removing ads; unlimited hearts; AI Roleplay conversations and Video Call with Lily (Max); no mistakes penalty",
    },
  },
];

export type Audit20Row = Partial<Record<Audit20TextField, string | null>> & {
  company?: string | null;
  website: string | null;
  description?: string | null;
  costTier: string;
  apiAvailable?: boolean;
  privacyLevel?: string | null;
  directAlternatives?: string[];
  budgetAlternativeTo?: string[];
};

const tierFrom = (t: { from: string | string[] }): string[] => (Array.isArray(t.from) ? t.from : [t.from]);

/** Prisma `data` for one row: text fields that differ; guarded fields only from their expected old value. */
export function audit20PatchData(row: Audit20Row, patch: Audit20Patch): Record<string, string | boolean | string[]> {
  const data: Record<string, string | boolean | string[]> = {};
  for (const [field, value] of Object.entries(patch.fields) as [Audit20TextField, string][]) {
    if (row[field] !== value) data[field] = value;
  }
  const g = patch.guarded ?? {};
  const company = row.company ?? null;
  if (g.company && g.company.from.includes(company)) data.company = g.company.to;
  if (g.website && g.website.from.includes(row.website)) data.website = g.website.to;
  if (g.description && g.description.from.includes(row.description ?? null)) data.description = g.description.to;
  if (g.costTier && tierFrom(g.costTier).includes(row.costTier)) data.costTier = g.costTier.to;
  if (g.apiAvailable && row.apiAvailable === g.apiAvailable.from) data.apiAvailable = g.apiAvailable.to;
  if (g.privacyLevel && row.privacyLevel === g.privacyLevel.from) data.privacyLevel = g.privacyLevel.to;
  if (patch.addDirectAlternatives?.length) {
    const current = row.directAlternatives ?? [];
    const have = new Set(current.map((n) => n.trim().toLowerCase()));
    const missing = patch.addDirectAlternatives.filter((n) => !have.has(n.trim().toLowerCase()));
    if (missing.length) data.directAlternatives = [...current, ...missing];
  }
  if (patch.replaceBudgetAlternatives?.length) {
    const current = row.budgetAlternativeTo ?? [];
    let next = current;
    for (const { from, to } of patch.replaceBudgetAlternatives) {
      if (next.includes(from)) next = next.map((n) => (n === from ? to : n));
    }
    if (next !== current) data.budgetAlternativeTo = next;
  }
  return data;
}

/** Guarded fields left alone because the row holds neither the old nor the new value (a hand edit). */
export function audit20GuardSkips(row: Audit20Row, patch: Audit20Patch): string[] {
  const g = patch.guarded ?? {};
  const skips: string[] = [];
  const company = row.company ?? null;
  const description = row.description ?? null;
  if (g.company && company !== g.company.to && !g.company.from.includes(company)) skips.push("company");
  if (g.website && row.website !== g.website.to && !g.website.from.includes(row.website)) skips.push("website");
  if (g.description && description !== g.description.to && !g.description.from.includes(description)) skips.push("description");
  if (g.costTier && row.costTier !== g.costTier.to && !tierFrom(g.costTier).includes(row.costTier)) skips.push("costTier");
  if (g.apiAvailable && row.apiAvailable !== g.apiAvailable.to && row.apiAvailable !== g.apiAvailable.from) skips.push("apiAvailable");
  if (g.privacyLevel && row.privacyLevel !== g.privacyLevel.to && row.privacyLevel !== g.privacyLevel.from) skips.push("privacyLevel");
  for (const { from, to } of patch.replaceBudgetAlternatives ?? []) {
    const list = row.budgetAlternativeTo ?? [];
    if (!list.includes(from) && !list.includes(to)) skips.push("budgetAlternativeTo");
  }
  return skips;
}

export function audit20Slugs(): string[] {
  return AUDIT_20_PATCHES.map((p) => p.slug);
}

export { AS_OF };
