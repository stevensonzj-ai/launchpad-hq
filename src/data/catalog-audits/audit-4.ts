/**
 * Catalog audit #4 — patch data and pure diff logic for
 * scripts/update-catalog-audit-4.ts (the DB runner lives there).
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-4.test.ts). Each patch lists only the fields it owns;
 * the runner never touches any other column.
 *
 * Every volatile fact below was re-checked on the official source on
 * CHECKED_AT. Where an official page could not be fetched, the patch says
 * so in `note` and the wording is softened rather than guessed.
 *
 * Seed files that create these rows carry the same strings (see the test),
 * so a fresh seed and the database agree.
 */

export const CHECKED_AT = "2026-10-25";

export type Audit4Field =
  | "primaryUse"
  | "description"
  | "currentPricing"
  | "freeTierFeatures"
  | "outputFormats"
  | "verified";

export type Audit4Values = {
  primaryUse?: string;
  description?: string;
  currentPricing?: string;
  freeTierFeatures?: string;
  outputFormats?: string[];
  verified?: boolean;
};

export type Audit4Patch = {
  slug: string;
  /** Short reason, printed by the runner. */
  finding: string;
  /** Official pages the new text was checked against. */
  sources: string[];
  checkedAt: string;
  /** Anything that could not be fetched or confirmed. */
  note?: string;
  fields: Audit4Values;
};

export const AUDIT_4_PATCHES: Audit4Patch[] = [
  {
    slug: "grok",
    finding:
      "Paid path is The X Subscription for new customers since Oct 12, 2026; existing SuperGrok plans continue",
    sources: ["https://x.ai/news/x-subscription", "https://docs.x.ai/x-subscription/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Grok is a standalone app (web, iOS, Android) and is also built into X. Since October 12, 2026, new customers sign up through The X Subscription: Free $0; Plus $8/mo ($80/yr); Premium $30/mo ($300/yr); Super $100/mo ($1,000/yr); Ultra $200/mo ($2,000/yr) (official x.ai/news/x-subscription and docs.x.ai/x-subscription/pricing, as of 2026-10-25). Existing SuperGrok plans continue for current subscribers unless they change or cancel. This row is the chatbot, not Grok Bot.",
      freeTierFeatures:
        "Free $0 on The X Subscription: daily, limited Grok access; the exact allowance is not published (official, as of 2026-10-25)",
    },
  },
  {
    slug: "grok-bot",
    finding: "Official docs now list Windows, Linux and Android apps (row said Windows/Android unverified)",
    sources: ["https://docs.x.ai/grok-bot", "https://grokbot.com"],
    checkedAt: CHECKED_AT,
    fields: {
      description:
        "Grok Bot is sold as “your team of always-on agents”: AI teammates with their own cloud computer that can sign into apps and websites, work in parallel 24/7 (including with a laptop closed), learn routines by watching once, keep memory, and come back for approval (x.ai/news/introducing-grok-bot; grokbot.com). Separate from the Grok chatbot listing. Company: SpaceXSI (grokbot.com). Apps (docs.x.ai/grok-bot, as of 2026-10-25): desktop on macOS, Windows and Linux; mobile on iPhone, iPad and Android. Launched in beta (date on the announcement page; third-party Aug 11, 2026 date unverified). No standalone price: since 2026-10-12, new customers get it via The X Subscription Premium $30/mo ($300/yr), Super $100/mo ($1,000/yr), Ultra $200/mo ($2,000/yr). Free ($0) and Plus ($8/mo) do not include Grok Bot. Team seats at the same per-seat prices. Usage from a shared weekly pool; beyond it, paid Additional Usage top-ups (exact weekly size and per-unit top-up rate unverified). Existing Cursor (Pro/Pro+/Ultra/Teams) and SuperGrok plans keep access, per x.ai at time of writing (grokbot.com). Privacy (grokbot.com FAQ): Cursor SSO/auth/privacy mode; cloud computer encrypted in transit and at rest; training opt-out; Auto Review for sensitive actions; enterprise DLP/network controls. Enterprise generally available, contact sales (grokbot.com FAQ). Free trial unverified. Caution: bots sign into your accounts and can act for you; review what you connect and use approval settings.",
    },
  },
  {
    slug: "play-ht",
    finding: "Discontinued: row still described a live TTS product with a free tier and $29/mo plan",
    sources: [
      "https://www.bloomberg.com/news/articles/2025-07-11/meta-acquires-voice-ai-startup-playai-continuing-to-add-talent",
      "https://inworld.ai/resources/migrate-from-playht",
    ],
    checkedAt: CHECKED_AT,
    note:
      "No primary notice from PlayHT, PlayAI or Meta was found on 2026-10-25; play.ht does not resolve in DNS. Secondary-source framing kept, matching src/data/facts/play-ht.ts.",
    fields: {
      primaryUse: "Discontinued: former AI text-to-speech and voice-cloning service",
      description:
        "PlayHT was an AI text-to-speech and voice-cloning service for voiceovers, podcasts, e-learning and apps.",
      currentPricing:
        "Discontinued, no longer sold. Bloomberg reported in July 2025 that Meta acquired PlayAI, the company behind PlayHT. We found no official shutdown notice from PlayHT or Meta, and the play.ht website no longer loads (as of 2026-10-25).",
      freeTierFeatures: "None: PlayHT is no longer available",
    },
  },
  {
    slug: "sora-2",
    finding: "Discontinued: row still described Sora as sold via ChatGPT Plus/Pro",
    sources: ["https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation"],
    checkedAt: CHECKED_AT,
    note:
      "help.openai.com returned 403 to direct fetches on 2026-10-25; both dates were confirmed from the search-indexed copy of the same official article.",
    fields: {
      primaryUse: "Discontinued: former OpenAI text-to-video app and API",
      description:
        "Sora was OpenAI's text-to-video app and API for making short video clips, with sound, from a written prompt.",
      currentPricing:
        "Discontinued, no longer sold. OpenAI ended the Sora web and app experiences on April 26, 2026 and the Sora API on September 24, 2026 (OpenAI Help Center, as of 2026-10-25).",
      freeTierFeatures: "None: Sora is no longer available",
    },
  },
  {
    slug: "stability-ai",
    finding:
      "Stable Assistant gone; Stable Audio is the consumer app; API has no video; credits $0.01 with 25 free",
    sources: [
      "https://stability.ai",
      "https://docs.stability.ai/pricing",
      "https://stability.ai/license",
      "https://stability.ai/community-license-agreement",
      "https://stableaudio.com",
    ],
    checkedAt: CHECKED_AT,
    note:
      "stableaudio.com/pricing renders client-side and its plans could not be read on 2026-10-25, so no Stable Audio prices or free-plan claim are given here.",
    fields: {
      primaryUse: "Open image, audio and 3D models, a pay-per-use API, and the Stable Audio web app",
      description:
        "Publisher of Stable Diffusion and the Stable Audio models. There are three ways in: download the open models and run them yourself (for example with ComfyUI), which keeps your inputs on your machine; call them from code through the Developer Platform API, which offers image, audio and 3D models but no video (Stability's video models are download-only); or make music and sound effects in the Stable Audio web app at stableaudio.com, its remaining consumer app. Its consumer image app, Stable Assistant, is no longer on Stability's site (as of 2026-10-25).",
      currentPricing:
        "Open models (Community License): $0 for individuals and organizations under US$1M annual revenue, commercial users must register; Developer Platform API: 1 credit = $0.01, pay as you go; Enterprise License (over US$1M annual revenue): custom; Stable Audio web app: separate plans at stableaudio.com/pricing (official, as of 2026-10-25)",
      freeTierFeatures: "New Developer Platform accounts get 25 free credits (official, as of 2026-10-25)",
      outputFormats: ["images", "audio", "3D models"],
      verified: true,
    },
  },
  {
    slug: "openevidence",
    finding: "Privacy policy and security page state HIPAA compliance and a standard BAA (row said BAA unverified)",
    sources: ["https://www.openevidence.com/policies/privacy", "https://www.openevidence.com/security"],
    checkedAt: CHECKED_AT,
    fields: {
      description:
        "Cited clinical Q&A, free for verified US healthcare professionals. Access is gated to licensed clinicians: it is not for patients or self-diagnosis and is not a consumer symptom checker. Its privacy policy (updated September 17, 2026) says it secures protected health information (PHI) in compliance with HIPAA and does not train AI models on PHI. Its security page says HIPAA covered entities may send PHI under its standard Business Associate Agreement (official, as of 2026-10-25). Availability outside the US was not confirmed on the official site.",
      currentPricing: "Free: $0, no paid plans listed (official, as of 2026-10-25)",
      freeTierFeatures: "Yes (official, as of 2026-10-25)",
      verified: true,
    },
  },
];

/** The current values of a row, as selected by the runner. */
export type Audit4Row = {
  primaryUse: string | null;
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  outputFormats: string[];
  verified: boolean;
};

export type Audit4Diff = {
  field: Audit4Field;
  from: unknown;
  to: unknown;
};

function sameValue(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }
  return a === b;
}

/**
 * Fields whose stored value differs from the patch. Empty when the row
 * already matches, which makes a re-run a no-op.
 */
export function diffAudit4Patch(row: Audit4Row, patch: Audit4Patch): Audit4Diff[] {
  const diffs: Audit4Diff[] = [];
  for (const [field, to] of Object.entries(patch.fields) as [Audit4Field, unknown][]) {
    if (to === undefined) continue;
    const from = row[field];
    if (!sameValue(from, to)) diffs.push({ field, from, to });
  }
  return diffs;
}

/** Prisma `data` for an update: only the differing fields. */
export function audit4UpdateData(diffs: Audit4Diff[]): Audit4Values {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to])) as Audit4Values;
}
