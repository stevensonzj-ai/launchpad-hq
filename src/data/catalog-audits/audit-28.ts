/**
 * Catalog audit #28: the rows audit 27 left unverified or stale, re-read on
 * the vendors' own pages on 2026-11-01. UPDATE-only, keyed by slug. Each field
 * is written only while the row still holds the exact old value recorded here
 * (the audit-27 value where audit 27 changed it), so a re-run reports 0
 * changes. Never creates or deletes rows.
 *
 * Outcomes (7): verified 2, corrected 2, hidden 3 (naver-hyperclova-x-cue and
 * genspark hidden in this audit with 301s and their guides retired; clarifai
 * was already hidden). Poe was also hidden here and unhidden the same day
 * (audit 29, Zach), so it is no longer listed. Hiding is a fact-file `visibility: "hidden"`
 * plus HIDDEN_PAGE_REDIRECTS, not a database write. Rows with nothing to write
 * are listed in AUDIT_28_NO_CHANGE. Kept free of Prisma and dotenv.
 */

export const CHECKED_AT = "2026-11-01";

export type Audit28Field = "currentPricing" | "freeTierFeatures" | "usageLimits";
export type Audit28Outcome = "verified" | "corrected" | "hidden";

export type Audit28Patch = {
  slug: string;
  outcome: Audit28Outcome;
  source: string;
  fields: Partial<Record<Audit28Field, { from: string | null; to: string }>>;
};

export const AUDIT_28_PATCHES: Audit28Patch[] = [
  {
    slug: "duolingo-max",
    outcome: "corrected",
    source: "https://blog.duolingo.com/duolingo-max/",
    fields: {
      freeTierFeatures: { from: "Duolingo free: full lessons with ads; limited hearts; basic features", to: "Duolingo free: full lessons with ads and a limited energy meter; Super removes ads and gives unlimited energy (as of 2026-11-01)" },
      usageLimits: { from: "Free: ads and heart limits; Max includes all Super benefits plus Roleplay and Video Call with Lily; prices are not stated (as of 2026-10-29)", to: "Free: ads and a limited energy meter; Max includes all Super benefits plus Roleplay and Video Call with Lily; prices are not stated (as of 2026-11-01)" },
    },
  },
  {
    slug: "mem",
    outcome: "corrected",
    source: "https://get.mem.ai/pricing",
    fields: {
      currentPricing: { from: "Free $0; Plus $9/mo; Pro $29/mo; Pro 2× $49; Pro 5× $99; Pro 10× $149; Pro 20× $199; Extra Usage +$50 on Pro 20× (per the table, as of 2026-10-14)", to: "Free $0; Mem Plus $9/mo; Mem Pro $29/mo; Pro 2× $49; Pro 5× $99; Pro 10× $149; Pro 20× $199; Extra Usage +$50 on Pro 20× (as of 2026-11-01)" },
      freeTierFeatures: { from: "Free: 25 messages/mo, 25 new notes, task tracking on those notes, 15 open tasks/projects, 3 hours Voice Mode (official, as of 2026-10-14)", to: "Free $0: 25 messages to Mem and 25 new notes per month, 15 open tasks, 3 hours of Voice Mode (as of 2026-11-01)" },
      usageLimits: { from: "Plan limits not confirmed; the pricing page needs a login (as of 2026-10-30)", to: "Messages to Mem and new notes per month: Free 25, Plus 50, Pro 100, Pro 2× 200, Pro 5× 500, Pro 10× 1,000, Pro 20× 2,000 (+500 extra); open tasks: 15 / 25 / 50 / 100 / 250 / 500 / 1,000 in the same order; custom routines and connections: Pro 1, 2× 2, 5× 5, 10× 10, 20× 20, none on Free or Plus; Voice Mode: Free 3 hours, Plus 10 hours (as of 2026-11-01)" },
    },
  },
  {
    slug: "speak-language-ai",
    outcome: "verified",
    source: "https://www.speak.com/us/getstarted",
    fields: {
      currentPricing: { from: "Premium and Premium Plus; US web offer $99.99 and $234.99 a year (promotional); prices vary by region and are shown in the app (as of 2026-10-29)", to: "Premium and Premium Plus; US web offer $99.99 and $234.99 a year (promotional); prices vary by region and are shown in the app (as of 2026-11-01)" },
      freeTierFeatures: { from: "No free plan: a 7-day free trial, then a paid subscription (as of 2026-10-29)", to: "No free plan: a 7-day free trial, then a paid subscription (as of 2026-11-01)" },
      usageLimits: { from: "Plan limits are not published; Premium Plus is the higher tier (as of 2026-10-29)", to: "Plan limits are not published; Premium Plus is the higher tier (as of 2026-11-01)" },
    },
  },
  {
    slug: "zillow-ai-zestimate",
    outcome: "verified",
    source: "https://www.zillow.com/news/when-people-ask-ai-about-housing-chatgpt-gemini-and-claude-all-connect-to-zillow/",
    fields: {
      currentPricing: { from: "Zillow states no cost for its AI features: the Zillow app in ChatGPT, the Zillow connector in Claude, the rentals feature in Gemini and AI mode on Zillow; Premier Agent is paid (as of 2026-10-29)", to: "Zillow states no cost for its AI features: the Zillow app in ChatGPT, the Zillow connector in Claude, the rentals feature in Gemini and AI mode on Zillow; Premier Agent is paid (as of 2026-11-01)" },
      freeTierFeatures: { from: "Not stated: Zillow's pages do not say whether the AI features are free or have limits (as of 2026-10-29)", to: "Not stated: Zillow's pages do not say whether the AI features are free or have limits (as of 2026-11-01)" },
      usageLimits: { from: "Not stated (as of 2026-10-29)", to: "Not stated (as of 2026-11-01)" },
    },
  },
];

/**
 * Rows checked in this audit with nothing to write to the database. The two
 * newly hidden rows are hidden through their fact files and the redirect map;
 * their database text is left as it was.
 */
export const AUDIT_28_NO_CHANGE: { slug: string; outcome: Audit28Outcome; source: string }[] = [
  { slug: "naver-hyperclova-x-cue", outcome: "hidden", source: "https://cue.search.naver.com" },
  { slug: "genspark", outcome: "hidden", source: "https://www.genspark.ai/pricing" },
  { slug: "clarifai", outcome: "hidden", source: "https://www.clarifai.com/pricing" },
];

/** Where each newly hidden page 301s (single hop to a listed page). */
export const AUDIT_28_HIDDEN: Record<string, string> = {
  "naver-hyperclova-x-cue": "/platform/perplexity-ai",
  genspark: "/platform/manus",
};

export type Audit28Row = Partial<Record<Audit28Field, string | null>>;
export type Audit28Plan = { field: Audit28Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit28(row: Audit28Row, patch: Audit28Patch): Audit28Plan[] {
  return (Object.entries(patch.fields) as [Audit28Field, { from: string | null; to: string }][]).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit28UpdateData(plans: readonly Audit28Plan[]): Partial<Record<Audit28Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}

/** Fact-file entries re-read by audit 28 (2026-11-01) that earlier audits' "checked today" tests must allow. */
export const AUDIT_28_FACT_UPDATES: Record<string, readonly string[]> = {
  "duolingo-max": ["features"],
  "speak-language-ai": ["company", "freeTier", "plans", "features"],
  "zillow-ai-zestimate": ["features"],
  "naver-hyperclova-x-cue": ["status"],
};
