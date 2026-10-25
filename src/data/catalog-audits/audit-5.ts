import { REF_FIELDS, type RefField } from "./audit-3-refs";

/**
 * Catalog audit #5 — patch data and pure diff logic for
 * scripts/update-catalog-audit-5.ts (the DB runner lives there).
 *
 * Two kinds of change, both UPDATE-only and keyed by slug:
 *   - field patches: verified pricing, free-tier and usage-limit copy for
 *     the rows the compare pages read, plus full directAlternatives
 *     replacements where the stored array split "tl;dv" into "tl" / "dv";
 *   - ref edits: drop or rename name references to discontinued or
 *     retired products (Sora 2, Kakao Brain (Karlo), Adobe Sensei) in the
 *     String[] reference columns.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-5.test.ts). Every volatile fact below was re-checked
 * on the official source on CHECKED_AT; `note` records anything the
 * official page left unclear.
 *
 * Like audit 4, nothing here stamps a lastVerified date: the update data is
 * only the fields that differ (the Platform model has no lastVerified
 * column, and these patches do not set `verified`).
 */

export const CHECKED_AT = "2026-10-25";

export type Audit5TextField = "currentPricing" | "freeTierFeatures" | "usageLimits";

export type Audit5Field = Audit5TextField | RefField;

export type Audit5Values = {
  currentPricing?: string;
  freeTierFeatures?: string;
  usageLimits?: string;
  /** Full replacement of the stored array. */
  directAlternatives?: string[];
};

export type Audit5Patch = {
  slug: string;
  /** Short reason, printed by the runner. */
  finding: string;
  /** Official pages the new text was checked against. */
  sources: string[];
  checkedAt: string;
  /** Anything that could not be fetched or confirmed. */
  note?: string;
  fields: Audit5Values;
};

/**
 * Edit to one reference array. `remove` drops the value if present.
 * `replace` swaps `from` for `to` if `from` is present; it never adds `to`
 * on its own, and drops `from` instead of duplicating an existing `to`.
 */
export type Audit5RefEdit =
  | { slug: string; field: RefField; op: "remove"; value: string }
  | { slug: string; field: RefField; op: "replace"; from: string; to: string };

export const AUDIT_5_PATCHES: Audit5Patch[] = [
  {
    slug: "tactiq",
    finding:
      "usageLimits said Free = 5 transcripts/mo, contradicting freeTierFeatures (10) and the vendor page",
    sources: ["https://tactiq.io/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits:
        "Free: 10 transcripts/mo and 5 AI credits/mo; Pro: unlimited transcripts and 10 AI credits/mo; Team and above: unlimited transcripts and AI credits (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free forever, no card: 10 transcripts/mo and 5 AI credits/mo (official, as of 2026-10-25)",
      directAlternatives: ["tl;dv", "Otter AI", "Zoom AI Companion"],
    },
  },
  {
    slug: "activepieces",
    finding:
      "usageLimits said Cloud Free = 1K tasks/mo and Cloud Pro = 50K; vendor now bills in credits (Free 1,000, Plus 10,000/mo, Team 50,000/mo)",
    sources: ["https://www.activepieces.com/pricing"],
    checkedAt: CHECKED_AT,
    note:
      "Vendor page itself is inconsistent on the Free reset cadence (table: daily; FAQ: monthly). Copy states both rather than picking one.",
    fields: {
      currentPricing:
        "Free $0 (1,000 credits); Plus $20/mo flat (10,000 credits/mo, then $0.007/credit); Team $200/mo flat (50,000 credits/mo, 25 users); Ultimate custom; Embed from $36k/year (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free forever, no card: 1,000 credits, unlimited flows, up to 5 users. The official page lists the Free reset as daily in its comparison table but monthly in its FAQ (official, as of 2026-10-25)",
      usageLimits:
        "Cloud Free: 1,000 credits (runs past the quota wait for the reset); Plus: 10,000 credits/mo; Team: 50,000 credits/mo; Ultimate: yearly pool; self-hosted Community Edition is free (official, as of 2026-10-25)",
    },
  },
  {
    slug: "heygen",
    finding:
      "usageLimits said Free = 1 credit, Creator = 15 credits/mo; vendor page shows Free 3 videos/mo and Creator 600 credits/mo",
    sources: ["https://www.heygen.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits:
        "Free: 3 videos/mo, up to 1 min each, watermarked; Creator: 600 credits/mo, 1080p, up to 30 min/video; Pro: from 1,000 credits/mo, 4K, up to 30 min/video; Business: 1,500 credits/mo, up to 60 min/video; Enterprise: custom (official, as of 2026-10-25)",
      currentPricing:
        "Free $0; Creator $29/mo (or $24/mo billed annually); Pro from $49/mo; Business $149/mo + $20/seat; Enterprise contact sales (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free $0: 3 videos/mo up to 1 min, watermarked, Avatar IV access, 500+ stock avatars, 1 custom video avatar (official, as of 2026-10-25)",
    },
  },
  {
    slug: "synthesia",
    finding:
      "usageLimits used retired plan names (Starter 3 videos/mo, Creator 6/mo); vendor page bills Starter/Pro in credits",
    sources: ["https://www.synthesia.io/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits:
        "Basic (free): 10 min of video and 500 credits per month, watermarked; Starter: 1,250 credits/mo; Pro: 6,000 credits/mo; Enterprise: custom (official, as of 2026-10-25)",
      currentPricing:
        "Basic $0/mo; Starter $29/mo billed monthly; Pro $89/mo billed monthly ($64/mo billed yearly); Enterprise custom. Starter's yearly price is shown inconsistently on the official page, so it is not quoted (official, as of 2026-10-25)",
      freeTierFeatures:
        "Basic $0: 10 min of video, 3 survey responses and 500 credits every month (official, as of 2026-10-25)",
    },
  },
  {
    slug: "cursor",
    finding:
      "Pricing row was stale (Pro $20; 50 premium requests). Cursor is now sold through The X Subscription with Free/Plus/Premium/Super/Ultra/Teams",
    sources: ["https://cursor.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Plus $8/mo (Grok models only); Premium $30/mo (4x Plus usage); Super $100/mo (15x Plus); Ultra $200/mo (50x Plus); Teams from $30/user/mo; Enterprise custom. Third-party models are billed separately by usage. Sold only through X Subscription Corp (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free $0: limited AI usage in Cursor (official, as of 2026-10-25)",
      usageLimits:
        "Each tier includes a usage pool shared across Cursor and Grok that refreshes weekly; Free: limited; Plus: basic; Premium 4x, Super 15x, Ultra 50x Plus; Teams pooled (official, as of 2026-10-25)",
    },
  },
  {
    slug: "lovable",
    finding:
      "Pricing row was stale (Starter $20, Pro $50, 5 free apps). Vendor page shows Free/Pro $25/Business $50/Enterprise with credits",
    sources: ["https://lovable.dev/pricing"],
    checkedAt: CHECKED_AT,
    note:
      "The rendered page loads a price-test asset; prices above are what the page showed on 2026-10-25.",
    fields: {
      currentPricing:
        "Free $0; Pro $25/mo (100 monthly credits, rollover); Business $50/mo (100 monthly credits, SSO); Enterprise volume-based. Yearly billing gives 2 months free; students up to 50% off Pro (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free $0, no card: 5 build credits per day (up to 30/month), 20 Cloud credits/month, up to 5 lovable.app domains (official, as of 2026-10-25)",
      usageLimits:
        "Free: 5 build credits/day (max 30/month); Pro: 100 monthly credits with rollover; Business: 100 monthly credits; Enterprise: volume-based (official, as of 2026-10-25)",
    },
  },
  {
    slug: "github-copilot",
    finding:
      "usageLimits (2K completions + 50 chat; Pro 300 chat) predates the AI Credit model",
    sources: ["https://github.com/features/copilot/plans"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $10/mo; Pro+ $39/mo; Max $100/mo. Monthly AI Credit totals: Pro $15, Pro+ $70, Max $200 (1 credit = $0.01) (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free plan: limited chat and agent usage; up to 2,000 completions plus entry-level models per month (official, as of 2026-10-25)",
      usageLimits:
        "Free: up to 2,000 completions/mo plus limited chat and agent usage; Pro, Pro+ and Max: unlimited completions, premium usage drawn from monthly AI Credits (official, as of 2026-10-25)",
    },
  },
  {
    slug: "claude",
    finding:
      "Row was stale (no Max, no annual price, demand-based message estimate)",
    sources: ["https://claude.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $20/mo billed monthly or $17/mo billed annually ($200 up front); Max from $100/mo (5x or 20x Pro usage); Team 2-150 seats; Enterprise $20/seat plus usage at API rates (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free $0: chat on web, desktop and mobile, web search, file and code tools, memory, connectors, Artifacts, up to 5 Projects (official, as of 2026-10-25)",
      usageLimits:
        "Free: usage limits reset on a rolling 5-hour window; Pro: at least 5x Free usage, includes Claude Code; Max: 5x or 20x Pro (official, as of 2026-10-25)",
    },
  },
  {
    slug: "chatgpt",
    finding:
      "DB row was stale from April (GPT-4o mini, Pro $200 only); aligns DB with the 2026-10-24 fact file and today's page",
    sources: ["https://chatgpt.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Go $8/mo (may include ads); Plus $20/mo; Pro from $100/mo (3 usage tiers); Business and Enterprise for teams (official, as of 2026-10-25)",
      freeTierFeatures:
        "Unlimited text chats with GPT-6 (abuse guardrails apply); limited uploads, image creation, voice, deep research, memory and Codex (official, as of 2026-10-25)",
      usageLimits:
        "Free: unlimited text chats subject to abuse guardrails; limited uploads, image creation, voice and deep research (official, as of 2026-10-25)",
    },
  },
  {
    slug: "gemini",
    finding:
      "Plus and Pro prices now render on the official page",
    sources: ["https://gemini.google/subscriptions/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Google AI Plus $4.99/mo (2x Free usage); Google AI Pro $19.99/mo (4x Free usage); Google AI Ultra from $99.99/mo (5x Pro) or $199.99/mo (20x Pro) (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free Gemini app with the Flash-Lite model, image generation and editing, Deep Research, Gemini Live, Canvas and Gems; 15 GB storage (official, as of 2026-10-25)",
      usageLimits:
        "Compute-based limits that refresh every 5 hours up to a weekly cap; Plus 2x and Pro 4x Free; Ultra 5x or 20x Pro (official, as of 2026-10-25)",
    },
  },
  {
    slug: "microsoft-copilot",
    finding:
      "Row was stale (Copilot Pro $20, GPT-4 boosts). Paid Copilot now comes with Microsoft 365 Personal/Family/Premium/Pro",
    sources: ["https://www.microsoft.com/en-us/copilot/pricing/individuals", "https://www.microsoft.com/en-us/microsoft-365/buy/microsoft-365-family"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0 (limited, subject to capacity); Copilot included with Microsoft 365 Personal $9.99/mo, Family $12.99/mo and Premium $19.99/mo ($199.99/yr); Microsoft 365 Pro has the highest limits (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free Copilot on web, desktop and mobile: AI chat, web-grounded answers, writing help and image creation, subject to capacity and usage limits (official, as of 2026-10-25)",
      usageLimits:
        "Free: limited, subject to capacity; Personal and Family: higher limits via AI credits (Copilot for the subscription owner only); Premium: extensive usage; Pro: highest (official, as of 2026-10-25)",
    },
  },
  {
    slug: "otter-ai",
    finding:
      "Row lacked as-of/source; split tl;dv reference",
    sources: ["https://otter.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Basic $0; Pro $16.99/user/mo billed monthly; Business $30/user/mo billed monthly ($24 billed annually) (official, as of 2026-10-25)",
      freeTierFeatures:
        "Basic (free): 300 transcription minutes/mo, 30 min per conversation, 3 lifetime file imports (official, as of 2026-10-25)",
      usageLimits:
        "Basic: 300 min/mo, 30 min per conversation; Pro: 1,200 min/mo, 90 min per conversation; Business: unlimited meeting minutes, up to 4 hours per meeting (official, as of 2026-10-25)",
      directAlternatives: ["tl;dv", "Tactiq", "Descript"],
    },
  },
  {
    slug: "tl-dv",
    finding:
      "Row was stale (Pro $25/mo); official page shows Pro $18 and Business $29 per seat billed annually",
    sources: ["https://tldv.io/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $18/seat/mo billed annually; Business $29/seat/mo billed annually; monthly USD prices not confirmed (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free $0, no card: unlimited video recordings and transcription in 30+ languages; AI notes for 10 meetings and 10 Ask AI queries included (official, as of 2026-10-25)",
      usageLimits:
        "Free: 10 meetings with AI notes and 10 Ask AI queries; Pro: unlimited AI notes; Business: unlimited multi-meeting AI insights (official, as of 2026-10-25)",
    },
  },
  {
    slug: "zapier",
    finding:
      "freeTierFeatures said 5 Zaps single-step; vendor now allows unlimited two-step Zaps on Free",
    sources: ["https://zapier.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0 (100 tasks/mo); Professional from $19.99/mo billed annually ($29.99 monthly, 750 tasks); Team from $69/mo billed annually ($103.50 monthly, 2,000 tasks, 25 users); Enterprise custom (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free: 100 tasks/mo, unlimited two-step Zaps, 15-minute update time (official, as of 2026-10-25)",
      usageLimits:
        "Free: 100 tasks/mo, two-step Zaps only; Professional: from 750 tasks/mo; Team: from 2,000 tasks/mo; Enterprise: custom (official, as of 2026-10-25)",
    },
  },
  {
    slug: "make-integromat",
    finding:
      "Row used operations and old paid prices; Make now bills in credits and paid prices did not render on the official page today",
    sources: ["https://www.make.com/en/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0 (1,000 credits/mo); paid plans Core, Pro, Teams and Enterprise. Paid prices did not render on the official page, so none are quoted (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free: 1,000 credits/mo (credits are Make's billing unit) (official, as of 2026-10-25)",
      usageLimits:
        "Free: 1,000 credits/mo; paid plan credit allowances not confirmed (official, as of 2026-10-25)",
    },
  },
  {
    slug: "bolt-new",
    finding:
      "usageLimits used the retired Business plan name",
    sources: ["https://bolt.new/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $25/mo billed monthly ($18/mo billed annually); Teams $30/member/mo billed monthly ($27 billed annually); Enterprise custom (official, as of 2026-10-25)",
      freeTierFeatures:
        "Free: 1M tokens/month with a 300K daily limit, Bolt branding, 10MB upload limit (official, as of 2026-10-25)",
      usageLimits:
        "Free: 1M tokens/mo (300K/day); Pro: from 10M tokens/mo with rollover; Teams: from 10M tokens per member; Enterprise: custom (official, as of 2026-10-25)",
    },
  },
];

export const AUDIT_5_REF_EDITS: Audit5RefEdit[] = [
  { slug: "google-veo-3-1", field: "directAlternatives", op: "remove", value: "Sora 2" },
  { slug: "luma-dream-machine-ray3", field: "directAlternatives", op: "remove", value: "Sora 2" },
  { slug: "pika", field: "directAlternatives", op: "remove", value: "Sora 2" },
  { slug: "runway", field: "directAlternatives", op: "remove", value: "Sora 2" },
  { slug: "pika", field: "budgetAlternativeTo", op: "remove", value: "Sora 2" },
  { slug: "naver-hyperclova-x-cue", field: "directAlternatives", op: "remove", value: "Kakao Brain (Karlo)" },
  { slug: "adobe-acrobat-ai-assistant", field: "complementaryTools", op: "replace", from: "Adobe Sensei / Firefly in CC (design)", to: "Adobe Firefly (design)" },
  { slug: "adobe-firefly", field: "complementaryTools", op: "remove", value: "Adobe Sensei / Firefly in CC (full suite)" },
  { slug: "runway", field: "complementaryTools", op: "remove", value: "Adobe Sensei (post-production)" },
  { slug: "runway-for-education", field: "complementaryTools", op: "remove", value: "Adobe Sensei (post-production)" },
  { slug: "topaz-labs", field: "complementaryTools", op: "replace", from: "Adobe Sensei (Creative Cloud)", to: "Adobe Firefly (Creative Cloud)" },
];

/** The current values of a row, as selected by the runner. */
export type Audit5Row = {
  currentPricing: string | null;
  freeTierFeatures: string | null;
  usageLimits: string | null;
  directAlternatives: string[];
  complementaryTools: string[];
  budgetAlternativeTo: string[];
  privacyAlternativeTo: string[];
};

export type Audit5Diff =
  | { field: Audit5TextField; from: string | null; to: string }
  | { field: RefField; from: string[]; to: string[] };

/** Every slug audit 5 touches, field patches first, in data order. */
export function audit5Slugs(): string[] {
  return [...new Set([...AUDIT_5_PATCHES.map((p) => p.slug), ...AUDIT_5_REF_EDITS.map((e) => e.slug)])];
}

function sameArray(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

/**
 * Apply ref edits to one array. Matching is case-insensitive, like the
 * platform page's `name in [...]` lookup. Order is preserved and unrelated
 * entries are left exactly as they are.
 */
export function applyRefEdits(entries: readonly string[], edits: readonly Audit5RefEdit[]): string[] {
  let next = [...entries];
  for (const edit of edits) {
    if (edit.op === "remove") {
      const key = edit.value.toLowerCase();
      next = next.filter((e) => e.toLowerCase() !== key);
      continue;
    }
    const fromKey = edit.from.toLowerCase();
    if (!next.some((e) => e.toLowerCase() === fromKey)) continue;
    const toKey = edit.to.toLowerCase();
    let hasTo = next.some((e) => e.toLowerCase() === toKey);
    const out: string[] = [];
    for (const entry of next) {
      if (entry.toLowerCase() !== fromKey) {
        out.push(entry);
      } else if (!hasTo) {
        out.push(edit.to);
        hasTo = true;
      }
    }
    next = out;
  }
  return next;
}

/**
 * Fields whose stored value differs once the patch (if any) and this
 * slug's ref edits are applied. Ref edits run on the patched arrays. Empty
 * when the row already matches, which makes a re-run a no-op.
 */
export function diffAudit5(
  row: Audit5Row,
  patch: Audit5Patch | undefined,
  refEdits: readonly Audit5RefEdit[],
): Audit5Diff[] {
  const diffs: Audit5Diff[] = [];
  const fields = patch?.fields ?? {};

  for (const field of ["currentPricing", "freeTierFeatures", "usageLimits"] as const) {
    const to = fields[field];
    if (to !== undefined && row[field] !== to) diffs.push({ field, from: row[field], to });
  }

  for (const field of REF_FIELDS) {
    const base = field === "directAlternatives" && fields.directAlternatives ? fields.directAlternatives : row[field];
    const to = applyRefEdits(
      base,
      refEdits.filter((e) => e.field === field),
    );
    if (!sameArray(row[field], to)) diffs.push({ field, from: row[field], to });
  }
  return diffs;
}

export type Audit5UpdateData = Partial<Record<Audit5TextField, string> & Record<RefField, string[]>>;

/** Prisma `data` for an update: only the differing fields. */
export function audit5UpdateData(diffs: readonly Audit5Diff[]): Audit5UpdateData {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to])) as Audit5UpdateData;
}
