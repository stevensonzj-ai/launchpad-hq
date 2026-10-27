/**
 * Catalog audit #10 — patch data and pure diff logic for
 * scripts/update-catalog-audit-10.ts (the DB runner lives there).
 *
 * MCP fix plan P1.3 (labels and facts), 2026-10-26. Source of truth: the RA's
 * fact check (launchpadhq-connector-inputs/mcp-stress-factcheck-2026-10-26.md,
 * main section and "CTO follow-up 2026-10-26"). Most corrections live in fact
 * files (code: src/data/facts/*.ts), which already override these rows on
 * every surface; this audit keeps the rows themselves from contradicting them.
 *
 *   - PATCHES: row fields the RA found wrong or stale (Otter's "$24 billed
 *     annually", Canva's "from $12.99", Midjourney's ENTERPRISE tier and
 *     "mobile" platform, GitHub Copilot's missing "desktop", Perplexity's
 *     unstated $20 Pro, QuillBot's stale "unverified" description, ...).
 *   - STALE_UNVERIFIED: descriptions that still call pricing unverified on
 *     tools whose fact files now verify it (label check rule
 *     verified-says-unverified).
 *   - WORDING: catalog-only rows (no price fact, so no source URL) whose
 *     pricing or description text calls itself "official" (label check rule
 *     catalog-only-says-official). withoutOfficialClaim() drops the word and
 *     keeps the dated "as of" marker, so the page renders the same text and
 *     check dates are unchanged. Prices are not touched.
 *
 * Never deletes rows; never changes slug, name or categoryId. Text fields
 * change only where they differ; costTier changes only while the row still
 * has the old value; platformType only loses or gains the named values;
 * WORDING rewrites only text that still claims "official". So a re-run
 * (and a dry run after --apply) reports 0.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-10.test.ts).
 */
import { claimsOfficial } from "../../lib/mcp/official-claim";

export const CHECKED_AT = "2026-10-26";

export type Audit10TextField = "description" | "currentPricing" | "freeTierFeatures" | "usageLimits" | "primaryUse";

export type Audit10Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields?: Partial<Record<Audit10TextField, string>>;
  /** Changes only while the row still has `from` (a hand edit is left alone). */
  guarded?: { costTier?: { from: string; to: string } };
  /** platformType values to drop / append when present / missing. */
  platformType?: { remove?: string[]; add?: string[] };
};

const OTTER_PRICING = "https://otter.ai/pricing";
const CANVA_PRICING = "https://www.canva.com/pricing/";
const MJ_PLANS = "https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans";
const MJ_FREE_TRIALS = "https://docs.midjourney.com/hc/en-us/articles/27870399340173-Free-Trials";
const PPLX_PRICING = "https://www.perplexity.ai/hub/pricing";
const PPLX_MAX = "https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max";
const PPLX_ENTERPRISE =
  "https://www.perplexity.ai/help-center/en/articles/10352986-enterprise-pricing-and-billing-frequently-asked-questions";
const QUILLBOT_FREE =
  "https://help.quillbot.com/hc/en-us/articles/360058341753-What-s-the-difference-between-a-free-and-a-premium-account";
const QUILLBOT_SUMMARIZER = "https://help.quillbot.com/hc/en-us/articles/35700052994071";
const GH_COPILOT_IDES =
  "https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/install-copilot-extension";
const ZOOM_AI_PAGE = "https://www.zoom.com/en/products/ai-assistant/";
const ZOOM_AIC_PRICING = "https://zoom.us/pricing/aic";
const ZOOM_COMPARE = "https://www.zoom.com/en/compare/zoom-vs-other-ai-tools/";
const JULIUS_PRICING = "https://julius.ai/pricing";
const ELICIT_PRICING = "https://elicit.com/pricing";
const OPUS_PRICING = "https://www.opus.pro/pricing";
const SUNO_PRICING = "https://suno.com/pricing";

/** RA-verified corrections (every source is the vendor's own page). */
const RA_PATCHES: Audit10Patch[] = [
  {
    slug: "otter-ai",
    finding: "Business is $30/user/mo monthly or $19.99 billed annually; the row's \"$24 billed annually\" is a 3-month promo on monthly billing. Pro annual is $8.33",
    sources: [OTTER_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Basic $0; Pro $16.99/user/mo billed monthly or $8.33/user/mo billed annually; Business $30/user/mo billed monthly or $19.99/user/mo billed annually; Enterprise: contact sales (official, as of 2026-10-26)",
    },
  },
  {
    slug: "canva-ai-magic-studio",
    finding: "Plans are Free, Pro $18/mo, Business $25/person/mo or $250/yr, Enterprise; no \"$12.99\" plan; Free has up to 20 AI uses a month. Pro's annual price is not confirmed, so it is left out",
    sources: [CANVA_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $18/mo; Business $25/person/mo or $250/yr; Enterprise: contact sales (official, as of 2026-10-26)",
      freeTierFeatures:
        "Free: a monthly AI allowance of up to 20 uses of Canva's AI tools, 1 Brand Kit, 5 GB storage (official, as of 2026-10-26)",
      usageLimits:
        "Free: up to 20 AI uses a month; Pro: 10x Free's AI allowance; Business: 20x Free's AI allowance (official, as of 2026-10-26)",
    },
  },
  {
    slug: "midjourney",
    finding: "A $10/mo consumer product is PAID, not ENTERPRISE; it makes images and video; it runs on the web and Discord only (no Midjourney mobile app); add annual prices",
    sources: [MJ_PLANS, MJ_FREE_TRIALS],
    checkedAt: CHECKED_AT,
    fields: {
      primaryUse: "Artistic and photorealistic AI image and video generation",
      currentPricing:
        "Basic $10/mo ($96/yr); Standard $30/mo ($288/yr); Pro $60/mo ($576/yr); Mega $120/mo ($1,152/yr); no free plan (official, as of 2026-10-26)",
      freeTierFeatures: "No free plan, and no free trial on the website or Discord (official, as of 2026-10-26)",
      usageLimits:
        "Fast GPU time a month: Basic 3.3 hours, Standard 15, Pro 30, Mega 60; unlimited Relax images from Standard; unlimited SD video in Relax mode on Pro and Mega (official, as of 2026-10-26)",
    },
    guarded: { costTier: { from: "ENTERPRISE", to: "PAID" } },
    platformType: { remove: ["mobile"] },
  },
  {
    slug: "perplexity-ai",
    finding: "Pro is stated only as $17/mo billed annually; no official page states $20 monthly. Free has 3 Pro Searches a day (usageLimits said 5)",
    sources: [PPLX_PRICING, PPLX_MAX, PPLX_ENTERPRISE],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $17/mo billed annually; Max $200/mo or $2,000/yr; Education Pro $10/mo; Enterprise Pro $40/seat/mo or $400/yr; Enterprise Max $325/seat/mo or $3,250/yr (official, as of 2026-10-26)",
      usageLimits: "Free: 3 Pro Searches a day and 1 Research query a month; basic searches practically unlimited (official, as of 2026-10-26)",
    },
  },
  {
    slug: "quillbot",
    finding: "Free paraphrases up to 125 words and summarizes up to 1,200 words per input; the description still said pricing is unverified and plan names unpublished",
    sources: [QUILLBOT_FREE, QUILLBOT_SUMMARIZER],
    checkedAt: CHECKED_AT,
    fields: {
      description:
        "Paraphrasing and writing helper. Free plan (as of 2026-10-26): paraphrase up to 125 words and summarize up to 1,200 words per input. QuillBot says Premium's price depends on your region. Usual SaaS data-handling — do not paste confidential drafts without reading the privacy policy.",
      freeTierFeatures:
        "Free: paraphrase up to 125 words and summarize up to 1,200 words per input; Standard and Fluency modes (official, as of 2026-10-26)",
    },
  },
  {
    slug: "github-copilot",
    finding: "Copilot runs as an extension in VS Code, Visual Studio, JetBrains IDEs and other desktop editors, so the row needs \"desktop\" (it listed only web)",
    sources: [GH_COPILOT_IDES],
    checkedAt: CHECKED_AT,
    platformType: { add: ["desktop"] },
  },
  {
    slug: "zoom-ai-companion",
    finding: "Zoom now presents the assistant as ZoomMate; free ZoomMate Basic comes with Workplace Basic; paid Workplace includes core AI; ZoomMate is a paid upgrade (its $20/user/mo price is from a search-index copy, so unverified). Cost tier stays FREEMIUM",
    sources: [ZOOM_AI_PAGE, ZOOM_AIC_PRICING, ZOOM_COMPARE],
    checkedAt: CHECKED_AT,
    fields: {
      primaryUse: "AI meeting assistant in Zoom (ZoomMate)",
      description:
        "Zoom's AI assistant, now presented as ZoomMate. Free Zoom Workplace Basic accounts get ZoomMate Basic with capped AI (summaries for 3 hosted meetings and 20 AI queries a month); paid Zoom Workplace plans include core AI features at no extra cost, and ZoomMate is an optional paid upgrade (as of 2026-10-26).",
      currentPricing:
        "Free: ZoomMate Basic with Zoom Workplace Basic; core AI included with paid Zoom Workplace from $14.16/user/mo billed annually; ZoomMate $20/user/mo or $16.67/user/mo billed annually, price not confirmed on a directly fetched Zoom page (as of 2026-10-26)",
      freeTierFeatures:
        "ZoomMate Basic with Zoom Workplace Basic: AI summaries for 3 hosted meetings a month, AI notes 3 times a month, 20 AI queries a month; free meetings capped at 40 minutes (official, as of 2026-10-26)",
      usageLimits: "Free: 20 AI queries a month; ZoomMate: 2,200 AI credits per user a month (official, as of 2026-10-26)",
    },
  },
  {
    slug: "julius-ai",
    finding: "The $20 plan is Plus, not Pro; Pro is $45/mo; Business $450/mo",
    sources: [JULIUS_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Plus $20/mo ($16/mo billed annually); Pro $45/mo ($37/mo billed annually); Business $450/mo ($375/mo billed annually); Enterprise custom (official, as of 2026-10-26)",
      usageLimits: "Plus: 2,000 credits; Pro: 5,000 credits (official, as of 2026-10-26)",
    },
  },
  {
    slug: "elicit",
    finding: "Yearly prices: Plus $11, Pro $39, Scale $89 per user a month (academic); Pro $49, Scale $229 (industry). Monthly-billing prices were not captured",
    sources: [ELICIT_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Basic $0; billed annually: Plus $11/user/mo, Pro $39/user/mo, Scale $89/user/mo (academic); Pro $49/user/mo, Scale $229/user/mo (industry); monthly-billing prices not captured (official, as of 2026-10-26)",
    },
  },
  {
    slug: "opus-clip",
    finding: "Free is 60 credits a month (not 60 minutes); Starter $15/mo monthly only (150 credits); Pro $29/mo",
    sources: [OPUS_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: "Free $0 (60 credits/mo); Starter $15/mo, monthly only (150 credits/mo); Pro $29/mo; Business custom (official, as of 2026-10-26)",
      freeTierFeatures: "Free: 60 credits a month; exports up to 1080p (official, as of 2026-10-26)",
      usageLimits: "Free: 60 credits/mo; Starter: 150 credits/mo (official, as of 2026-10-26)",
    },
  },
  {
    slug: "suno",
    finding: "Free is 50 credits a day, non-commercial; Pro $10/mo ($8 yearly), Premier $30/mo ($24 yearly), with credits and download caps",
    sources: [SUNO_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: "Free $0 (50 credits/day); Pro $10/mo ($8/mo billed yearly); Premier $30/mo ($24/mo billed yearly) (official, as of 2026-10-26)",
      freeTierFeatures: "Free: 50 credits a day; non-commercial use only (official, as of 2026-10-26)",
      usageLimits: "Free: 50 credits/day; Pro: 2,500 credits/mo, 20 downloads; Premier: 10,000 credits/mo, 60 downloads (official, as of 2026-10-26)",
    },
  },
];

/**
 * Descriptions written on 2026-10-14, before these tools' fact files verified
 * their prices, still say the pricing is unverified. Only the stale pricing
 * sentences are removed; the rest is kept word for word.
 */
const STALE_UNVERIFIED: Audit10Patch[] = [
  {
    slug: "character-ai",
    finding: "Description says subscription prices are unverified; facts/character-ai.ts verifies them",
    sources: ["https://character.ai/subscribe"],
    checkedAt: CHECKED_AT,
    fields: {
      description:
        "Companion/role-play chatbot. Official Terms (character.ai/tos, as of 2026-10-14): users under 13 (or under 16 in the EEA/UK) are not authorized to use the service. Official help on age assurance: users verified under 18 are placed in a reading-only experience without character chat. Parental Insights lets a teen invite a parent or guardian for weekly activity reports (time spent and top Characters; not full chat content) — see character.ai/safety/parental-insights. This listing is not suitable for children; use the official Safety Center and parental controls.",
    },
  },
  {
    slug: "higgsfield",
    finding: "Description says pricing is unverified; facts/higgsfield.ts verifies it",
    sources: ["https://higgsfield.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: { description: "AI video generator." },
  },
  {
    slug: "jetbrains-ai",
    finding: "Description says pricing is unverified; facts/jetbrains-ai.ts verifies it",
    sources: ["https://www.jetbrains.com/store/ai/"],
    checkedAt: CHECKED_AT,
    fields: { description: "AI features inside JetBrains IDEs." },
  },
  {
    slug: "perplexity-comet",
    finding: "Description says pricing is unverified; facts/perplexity-comet.ts verifies it",
    sources: ["https://www.perplexity.ai/pro"],
    checkedAt: CHECKED_AT,
    fields: {
      description:
        "Perplexity’s AI browser (Comet). Do not assume it is included in every Perplexity plan. Review Perplexity’s privacy policy — the browser can see pages you visit.",
    },
  },
  {
    slug: "veed",
    finding: "Description says pricing is unverified and paid prices unpublished; facts/veed.ts verifies them",
    sources: ["https://www.veed.io/pricing"],
    checkedAt: CHECKED_AT,
    fields: { description: "Browser video editor. The site advertises starting for free." },
  },
];

export const AUDIT_10_PATCHES: Audit10Patch[] = [...RA_PATCHES, ...STALE_UNVERIFIED];

// ---------- wording: catalog-only text that calls itself "official" ----------

export type Audit10Wording = { slug: string; fields: Audit10TextField[] };

/**
 * Rows (and the fields MCP serves from them) that the label check flagged on
 * the snapshot before this audit. None has a price fact, so the MCP labels
 * them catalog_only with no source URL; their text keeps its "as of" date.
 */
export const AUDIT_10_WORDING: Audit10Wording[] = [
  { slug: "activepieces", fields: ["currentPricing", "freeTierFeatures"] },
  { slug: "assemblyai", fields: ["currentPricing"] },
  { slug: "bolt-new", fields: ["currentPricing"] },
  { slug: "claude-code", fields: ["currentPricing"] },
  { slug: "copy-ai", fields: ["currentPricing"] },
  { slug: "cursor", fields: ["currentPricing"] },
  { slug: "deepgram", fields: ["currentPricing"] },
  { slug: "descript", fields: ["currentPricing"] },
  { slug: "elevenlabs", fields: ["currentPricing"] },
  { slug: "flux", fields: ["currentPricing"] },
  { slug: "github-copilot", fields: ["currentPricing"] },
  { slug: "heygen", fields: ["currentPricing"] },
  { slug: "kiro", fields: ["currentPricing"] },
  { slug: "kling-ai", fields: ["currentPricing", "description"] },
  { slug: "lexis-plus-ai", fields: ["currentPricing", "description"] },
  { slug: "lovable", fields: ["currentPricing"] },
  { slug: "luma-dream-machine-ray3", fields: ["currentPricing"] },
  { slug: "manus", fields: ["description"] },
  { slug: "mem", fields: ["currentPricing"] },
  { slug: "mubert", fields: ["currentPricing"] },
  { slug: "openevidence", fields: ["currentPricing"] },
  { slug: "photoroom", fields: ["currentPricing"] },
  { slug: "pictory-ai", fields: ["currentPricing"] },
  { slug: "pika", fields: ["currentPricing"] },
  { slug: "pinecone", fields: ["currentPricing"] },
  { slug: "poe", fields: ["currentPricing", "description"] },
  { slug: "replit-agent", fields: ["currentPricing"] },
  { slug: "runway", fields: ["currentPricing"] },
  { slug: "stability-ai", fields: ["currentPricing"] },
  { slug: "surfer-seo", fields: ["currentPricing"] },
  { slug: "synthesia", fields: ["currentPricing"] },
  { slug: "together-ai", fields: ["currentPricing"] },
  { slug: "v0", fields: ["currentPricing"] },
  { slug: "zapier", fields: ["currentPricing"] },
];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Drops "official" as a provenance claim and keeps everything else:
 *   "(official, as of D)"          -> "(as of D)"
 *   "(official compare table, as of D)" -> "(per the compare table, as of D)"
 *   "$4.99/mo (official);"         -> "$4.99/mo;"
 *   "Official product page (...)"  -> "Product page (...)"
 *   "The official page lists"      -> "The page lists"
 * Both parenthetical forms are still stripped on the page by
 * stripInlineCitations, so the rendered text loses only the word. Clauses
 * that say the official page could not be read are left alone (they make no
 * claim). Idempotent.
 */
export function withoutOfficialClaim(text: string): string {
  const parens = text
    .replace(/\s*\(official\)/gi, "")
    .replace(/\(official,\s*(as of )/gi, "($1")
    .replace(/\(official\s+([^,()]+?),\s*(as of )/gi, "(per the $1, $2");
  // Same clause split as claimsOfficial, keeping the separators.
  return parens
    .split(/(?<=[.;:]\s)/)
    .map((clause) =>
      claimsOfficial(clause)
        ? clause
            .replace(/\b(the|its|an?) official\s+/gi, "$1 ")
            .replace(/(^|[.;:]\s+)Official\s+(\S)/g, (_m, lead: string, c: string) => `${lead}${capitalize(c)}`)
            .replace(/\bofficial\s+/gi, "")
        : clause,
    )
    .join("");
}

// ---------- pure logic ----------

export type Audit10Row = {
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  usageLimits: string | null;
  primaryUse: string | null;
  costTier: string;
  platformType: string[];
};

export type Audit10Diff =
  | { field: Audit10TextField | "costTier"; to: string }
  | { field: "platformType"; to: string[] };

const TEXT_FIELDS: Audit10TextField[] = ["description", "currentPricing", "freeTierFeatures", "usageLimits", "primaryUse"];

/** Fields that differ once the patch is applied. Empty when the row already matches. */
export function diffAudit10(row: Audit10Row, patch: Audit10Patch): Audit10Diff[] {
  const diffs: Audit10Diff[] = [];
  for (const field of TEXT_FIELDS) {
    const to = patch.fields?.[field];
    if (to !== undefined && row[field] !== to) diffs.push({ field, to });
  }
  const tier = patch.guarded?.costTier;
  if (tier && row.costTier === tier.from && tier.from !== tier.to) diffs.push({ field: "costTier", to: tier.to });
  if (patch.platformType) {
    const remove = new Set(patch.platformType.remove ?? []);
    const kept = row.platformType.filter((p) => !remove.has(p));
    const next = [...kept, ...(patch.platformType.add ?? []).filter((p) => !kept.includes(p))];
    if (next.length !== row.platformType.length || next.some((p, i) => p !== row.platformType[i])) {
      diffs.push({ field: "platformType", to: next });
    }
  }
  return diffs;
}

/** Wording diffs: only fields whose text still claims "official". */
export function diffAudit10Wording(row: Audit10Row, wording: Audit10Wording): Audit10Diff[] {
  const diffs: Audit10Diff[] = [];
  for (const field of wording.fields) {
    const text = row[field];
    if (!text) continue;
    const to = withoutOfficialClaim(text);
    if (to !== text) diffs.push({ field, to });
  }
  return diffs;
}

/** Prisma `data` for an update: only the differing fields. A patch and a wording entry on one row merge (patch wins). */
export function audit10UpdateData(diffs: readonly Audit10Diff[]): Record<string, string | string[]> {
  const data: Record<string, string | string[]> = {};
  for (const d of diffs) if (!(d.field in data)) data[d.field] = d.to;
  return data;
}

/** Every slug audit 10 may touch, in run order. */
export function audit10Slugs(): string[] {
  return [...new Set([...AUDIT_10_PATCHES.map((p) => p.slug), ...AUDIT_10_WORDING.map((w) => w.slug)])];
}

/** All diffs for one row: field patches first, then wording on fields the patches leave alone. */
export function diffAudit10Row(slug: string, row: Audit10Row): Audit10Diff[] {
  const patch = AUDIT_10_PATCHES.find((p) => p.slug === slug);
  const wording = AUDIT_10_WORDING.find((w) => w.slug === slug);
  const patched = patch ? diffAudit10(row, patch) : [];
  const owned = new Set<string>([...Object.keys(patch?.fields ?? {})]);
  const worded = wording ? diffAudit10Wording(row, { ...wording, fields: wording.fields.filter((f) => !owned.has(f)) }) : [];
  return [...patched, ...worded];
}
