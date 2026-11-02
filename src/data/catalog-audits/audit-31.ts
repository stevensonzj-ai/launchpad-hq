/**
 * Catalog audit #31 (2026-11-02): news and plan changes read on the vendors'
 * own pages. UPDATE-only, keyed by slug. Each field is written only while the
 * row still holds the exact old value recorded here, so a re-run reports 0
 * changes. Never creates or deletes rows. Kept free of Prisma and dotenv.
 *
 * Changes (8 fields on 5 rows):
 *   - claude, claude-code: Max is $100/mo (5x Pro usage); the former Max 20x is
 *     now Ultra at $200/mo (10x Pro weekly usage, no 5-hour limit for verified
 *     accounts). Sources: https://claude.com/pricing and
 *     https://support.claude.com/en/articles/11049741-what-is-the-max-plan
 *   - pika: Pika H3 Flex (open weights) API per-second prices, https://pika.art/
 *   - antigravity-cli: Plugin Marketplace launched 2026-10-29
 *   - kimi: Kimi 3D Make (powered by K3.1 Pro, same membership quota)
 * Fact-file-only changes (no database patch): deepgram (announced acquisition
 * of Daily, the Pipecat company), google-antigravity (Plugin Marketplace),
 * the Mistral Large 4 model page (src/data/models/mistral.ts).
 */

export const CHECKED_AT = "2026-11-02";

/** Fact blocks this audit re-stamped (checkedAt 2026-11-02); earlier audit tests exempt them. */
export const AUDIT_31_FACT_UPDATES: Record<string, readonly string[]> = {
  "google-antigravity": ["features"],
};

export type Audit31Field = "currentPricing" | "freeTierFeatures" | "usageLimits" | "description";

export type Audit31Patch = {
  slug: string;
  field: Audit31Field;
  from: string | null;
  to: string;
  source: string;
};

export const AUDIT_31_PATCHES: Audit31Patch[] = [
  {
    slug: "claude",
    field: "currentPricing",
    source: "https://claude.com/pricing",
    from: "Free $0; Pro $20/mo billed monthly or $17/mo billed annually ($200 up front); Max from $100/mo (5x or 20x Pro usage); Team 2-150 seats; Enterprise $20/seat plus usage at API rates (official, as of 2026-10-25)",
    to: "Free $0; Pro $20/mo billed monthly or $17/mo billed annually ($200 up front); Max $100/mo (5x Pro usage); Ultra $200/mo (formerly Max 20x: 10x Pro weekly usage, no 5-hour limit for verified accounts); Team 2-150 seats; Enterprise $20/seat plus usage at API rates (official, as of 2026-11-02)",
  },
  {
    slug: "claude",
    field: "usageLimits",
    source: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan",
    from: "Free: usage limits reset on a rolling 5-hour window; Pro: at least 5x Free usage, includes Claude Code; Max: 5x or 20x Pro (official, as of 2026-10-25)",
    to: "Free: usage limits reset on a rolling 5-hour window; Pro: at least 5x Free usage, includes Claude Code; Max: 5x Pro every 5 hours and every week; Ultra: 10x Pro weekly, no 5-hour limit for verified accounts (official, as of 2026-11-02)",
  },
  {
    slug: "claude-code",
    field: "usageLimits",
    source: "https://claude.com/pricing",
    from: "Max plan: Opus usage subject to rate limits; API: pay-per-token; rate limits apply",
    to: "Max and Ultra plans: usage limits apply (Max 5x Pro; Ultra 10x Pro weekly, no 5-hour limit for verified accounts); API: pay-per-token; rate limits apply (as of 2026-11-02)",
  },
  {
    slug: "pika",
    field: "currentPricing",
    source: "https://pika.art/",
    from: "Free $0 (0 monthly credits, credit packs only); Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits/mo); Fancy $95-$880/mo ($76-$704 annual, 8,550+ credits) (as of 2026-10-30)",
    to: "Free $0 (0 monthly credits, credit packs only); Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits/mo); Fancy $95-$880/mo ($76-$704 annual, 8,550+ credits); API: Pika H3 Flex (open weights) from $0.02/sec at 480p (launch price $0.01/sec for Pika API Club members through Nov 5, 2026) (as of 2026-11-02)",
  },
  {
    slug: "antigravity-cli",
    field: "description",
    source: "https://antigravity.google/",
    from: "Google's terminal coding agent: you type what you want in plain English, and its AI agent reads your project, edits files and runs commands. It replaced Gemini CLI for free individual use and for Google AI Pro and Ultra subscribers on 2026-06-18. Individuals can use it for $0 with a quota refreshed weekly; Google AI Pro and Ultra raise the limits. It is not open source. Google's Antigravity terms (as of 2026-10-29) say that for individual accounts Google uses your interactions to improve its products and machine-learning technologies, and that Google employees and contractors may review them; the Enable Telemetry setting is the opt-out, and business accounts (Workspace, Gemini Enterprise) have it always off. With it off, Google still uses your data to provide the service, process feedback and keep Antigravity safe. The terms ask you not to submit confidential information.",
    to: "Google's terminal coding agent: you type what you want in plain English, and its AI agent reads your project, edits files and runs commands. It replaced Gemini CLI for free individual use and for Google AI Pro and Ultra subscribers on 2026-06-18. Individuals can use it for $0 with a quota refreshed weekly; Google AI Pro and Ultra raise the limits. It is not open source. Google's Antigravity terms (as of 2026-10-29) say that for individual accounts Google uses your interactions to improve its products and machine-learning technologies, and that Google employees and contractors may review them; the Enable Telemetry setting is the opt-out, and business accounts (Workspace, Gemini Enterprise) have it always off. With it off, Google still uses your data to provide the service, process feedback and keep Antigravity safe. The terms ask you not to submit confidential information. Since 2026-10-29 a Plugin Marketplace lets you find and install Google-built and third-party plugins (agy plugin install).",
  },
  {
    slug: "kimi",
    field: "description",
    source: "https://www.kimi.com/",
    from: "Moonshot AI's Kimi assistant (K3.1 Pro is the newest model as of 2026-10-26). China-based company. Membership (official pricing page, as of 2026-10-26): Plus $15/mo, Pro $31/mo, Max $79/mo, Ultra $159/mo, billed annually; the Free plan includes limited K3.1 Pro use. Pay-as-you-go API at platform.kimi.ai. Review data-handling before sending sensitive inputs.",
    to: "Moonshot AI's Kimi assistant (K3.1 Pro is the newest model as of 2026-10-26). Kimi 3D Make (3D web pages, 3D models and print-ready files) runs on K3.1 Pro and uses the same membership quota. China-based company. Membership (official pricing page, as of 2026-10-26): Plus $15/mo, Pro $31/mo, Max $79/mo, Ultra $159/mo, billed annually; the Free plan includes limited K3.1 Pro use. Pay-as-you-go API at platform.kimi.ai. Review data-handling before sending sensitive inputs.",
  },
];

/** Reviewed, no database change (reasons recorded for the audit trail). */
export const AUDIT_31_NO_CHANGE: { slug: string; reason: string }[] = [
  { slug: "jules", reason: "Google Jules has no catalog row or mention." },
  { slug: "astra-for-law", reason: "OpenAI Astra for Law: no OpenAI legal row exists; harvey-ai is a different product and is not edited." },
  { slug: "openai-private-intelligence", reason: "OpenAI Private Intelligence: reviewed, nothing in the catalog to change." },
  { slug: "runway-agent", reason: "Runway Agent: reviewed, nothing in the catalog to change." },
  { slug: "daily", reason: "Daily (Pipecat's company) has no catalog row and none is added; the acquisition is noted on the deepgram fact file only." },
  { slug: "pipecat", reason: "Pipecat has no catalog row and none is added; it stays open source per Deepgram's announcement." },
];

export type Audit31Row = Partial<Record<Audit31Field, string | null>>;
export type Audit31Plan = { field: Audit31Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit31(row: Audit31Row, patches: readonly Audit31Patch[]): Audit31Plan[] {
  return patches.map(({ field, from, to }) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Patches for one slug. */
export function audit31PatchesFor(slug: string): Audit31Patch[] {
  return AUDIT_31_PATCHES.filter((p) => p.slug === slug);
}

/** Distinct slugs touched by the patches, in order. */
export function audit31Slugs(): string[] {
  return [...new Set(AUDIT_31_PATCHES.map((p) => p.slug))];
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit31UpdateData(plans: readonly Audit31Plan[]): Partial<Record<Audit31Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}
