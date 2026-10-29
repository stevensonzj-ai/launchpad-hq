/**
 * Catalog audit #12 — X-watch feature and API notes, 2026-10-29. Patch data
 * and pure diff logic for scripts/update-catalog-audit-12.ts (the DB runner
 * lives there).
 *
 * Every fact below was re-read on the vendor's own page on 2026-10-29 (X
 * posts were leads only). Session note with quotes and skips:
 * docs/planning/2026-10-autonomous-business/sessions/2026-10-29-x-watch-catalog.md
 *
 *   - gemini: Gemini 4 Carbon, limited access, introductory and later API price;
 *   - chatgpt: monthly API credits for ChatGPT Pro and Business;
 *   - openai-api: GPT-6.1 Terra price and context window;
 *   - github-copilot: Copilot Fusion GA on all plans, three effort levels
 *     (the limited-time discount is left out: the page gives no end date);
 *   - kling-ai: Kling 4.0 API per-second video prices; apiAvailable
 *     false -> true (guarded);
 *   - runway: App Studio in every paid plan;
 *   - suno: Suno MCP beta on all plans;
 *   - notion-ai: speaker labels in AI Meeting Notes, incl. the Notion
 *     Meetings Add-on for Google Meet;
 *   - mistral-vibe: Mistral's Responses API in public preview.
 *
 * APPEND-ONLY. Unlike audits 10-11, no patch here replaces a field: each
 * note is appended to the field's current text (or becomes the text when the
 * field is empty) only while that text does not already contain the note.
 * Exception: a description note is skipped while the row's description is
 * empty, so a dated note never becomes a whole description (the runner logs
 * those rows; see audit12SkippedEmptyDescription).
 * Rows' existing wording, prices and dates are never rewritten, so the
 * production values (which the offline snapshot only approximates) cannot
 * be clobbered. `apiAvailable` changes only while the row still has the old
 * value. So a re-run (and a dry run after --apply) reports 0.
 *
 * Every audit 12 row keeps its `updatedAt`: MCP dates a catalog-only card by
 * it, and an appended note re-checks none of the row's other text. Each note
 * carries its own "as of 2026-10-29" instead.
 *
 * No note contains the word "official" (audit 10's wording pass rewrites
 * text that does, so a re-run of audit 10 must leave these notes alone).
 *
 * Never deletes rows; never changes slug, name or categoryId; never creates
 * rows. Kept free of Prisma and dotenv so it typechecks with the app and can
 * be unit-tested (audit-12.test.ts).
 */

export const CHECKED_AT = "2026-10-29";

export type Audit12TextField = "description" | "currentPricing";

export type Audit12Append = {
  field: Audit12TextField;
  /** Appended verbatim; its presence in the field is the idempotency check. */
  note: string;
  /** Joins the note to non-empty existing text. */
  separator: " " | "; ";
};

export type Audit12Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  appends: Audit12Append[];
  /** Changes only while the row still has `from`. */
  guarded?: { apiAvailable: { from: boolean; to: boolean } };
};

const GEMINI_CARBON = "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/";
const CHATGPT_API_CREDITS = "https://developers.openai.com/api/docs/guides/chatgpt-api-credits";
const GPT_TERRA_POST = "https://openai.com/index/introducing-gpt-6-1-terra/";
const GPT_TERRA_MODEL = "https://developers.openai.com/api/docs/models/gpt-6.1-terra";
const COPILOT_FUSION = "https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/";
const KLING_API_VIDEO = "https://kling.ai/document-api/pricing/base/video.md";
const RUNWAY_APP_STUDIO = "https://runway.com/news/company-news/introducing-runway-app-studio";
const SUNO_MCP = "https://suno.com/release-notes/suno-mcp-beta";
const NOTION_MEETING_NOTES = "https://www.notion.com/help/ai-meeting-notes";
const MISTRAL_RESPONSES = "https://docs.mistral.ai/studio/conversations/responses";

export const AUDIT_12_PATCHES: Audit12Patch[] = [
  {
    slug: "gemini",
    finding:
      "Gemini 4 Carbon (2026-10-28): a subset of cyber defenders first, then trusted partners via the Fairwind Program; introductory $2 / $10 per 1M input / output tokens, then $4 / $20 (no end date given)",
    sources: [GEMINI_CARBON],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "Gemini 4 Carbon (announced 2026-10-28) is available first to a subset of cyber defenders, then to more trusted partners through Google's Fairwind Program, before a wider release; API pricing starts at an introductory $2 per 1M input tokens and $10 per 1M output tokens, then $4 and $20 after the introductory period, which has no stated end date (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "chatgpt",
    finding:
      "Pro ($100 / $200 / $500 tiers) gets $100 / $200 / $500 of API credits a month; Business $20 per paid Standard seat or $100 per paid Premium seat, pooled and capped at $500 per workspace a month",
    sources: [CHATGPT_API_CREDITS],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "ChatGPT Pro and Business include monthly OpenAI API credits: Pro's $100, $200 and $500 tiers get $100, $200 and $500; Business gets $20 per paid Standard seat or $100 per paid Premium seat, pooled and capped at $500 per workspace a month. The subscription must be paid and at least seven days old (no free trials), and unused credits expire at the end of the billing cycle (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "openai-api",
    finding:
      "GPT-6.1 Terra (gpt-6.1-terra): $1 / $5 per 1M input / output tokens standard; 1,050,000-token context window; prompts over 272K input tokens priced higher",
    sources: [GPT_TERRA_POST, GPT_TERRA_MODEL],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "currentPricing",
        separator: "; ",
        note: "GPT-6.1 Terra: $1/$5 per 1M input/output tokens, higher for prompts over 272K input tokens (as of 2026-10-29)",
      },
      {
        field: "description",
        separator: " ",
        note: "GPT-6.1 Terra (gpt-6.1-terra) has a 1,050,000-token context window and takes text and image input (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "github-copilot",
    finding:
      "Copilot Fusion GA 2026-10-28 on all Copilot plans; Fusion Standard / High / Max effort levels; combines Project HydraFusion with Copilot auto model selection (the page does not say it replaces Auto); limited-time 30% discount has no end date, so it is left out",
    sources: [COPILOT_FUSION],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "Copilot Fusion (generally available 2026-10-28 on all Copilot plans) routes and orchestrates models for each task instead of you picking one, at three effort levels: Fusion Standard, Fusion High and Fusion Max. It is billed for each model it uses at that model's standard rate (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "kling-ai",
    finding:
      "Kling 4.0 API video with no input video: $0.157/s at 720p, $0.235/s at 1080p; with input video $0.094/s and $0.141/s on a longer billed duration; apiAvailable was false",
    sources: [KLING_API_VIDEO],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "Kling API (kling.ai/document-api, as of 2026-10-29): Kling 4.0 video is billed per second, $0.157/s at 720p and $0.235/s at 1080p with no input video; with an input video the rate is $0.094/s or $0.141/s but the billed duration also counts the input.",
      },
    ],
    guarded: { apiAvailable: { from: false, to: true } },
  },
  {
    slug: "runway",
    finding:
      "App Studio (2026-10-26): build custom creative apps with no coding; included in every paid plan; draws on Runway credits; Free can use built-in and shared apps only",
    sources: [RUNWAY_APP_STUDIO],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "App Studio (launched 2026-10-26) builds custom creative apps for images, video and audio from a description, with no coding; it is included in every paid plan and building and running apps draws on your Runway credits. Free users can use built-in and shared apps but must upgrade to build their own (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "suno",
    finding:
      "Suno MCP (beta, 2026-10-28): connect Suno to Claude, ChatGPT, Claude Code and other MCP clients; \"Available on all Suno plans\"; early-access sign-up; songs use credits",
    sources: [SUNO_MCP],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "Suno MCP (beta, announced 2026-10-28) connects Suno to Claude, ChatGPT, Claude Code and other MCP clients to create songs from chat, start from your own audio, or remix songs in your library; Suno says it is available on all Suno plans, with an early-access sign-up, and songs use your credits (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "notion-ai",
    finding:
      "AI Meeting Notes labels speakers on the desktop app (best in virtual 1:1s); the Notion Meetings Add-on browser extension adds speaker labels to Google Meet calls in Chrome, including group meetings (desktop only). No release date on the page",
    sources: [NOTION_MEETING_NOTES],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "AI Meeting Notes can label speakers on the desktop app, most reliably in virtual one-on-one meetings; for Google Meet in Chrome, the Notion Meetings Add-on browser extension adds speaker labels, including in group meetings (desktop only) (as of 2026-10-29).",
      },
    ],
  },
  {
    slug: "mistral-vibe",
    finding: "Mistral's Responses API is in public preview: Mistral models through the OpenAI Responses format",
    sources: [MISTRAL_RESPONSES],
    checkedAt: CHECKED_AT,
    appends: [
      {
        field: "description",
        separator: " ",
        note:
          "For developers, Mistral's Responses API is in public preview: it serves Mistral models through the OpenAI Responses format (as of 2026-10-29).",
      },
    ],
  },
];

// ---------- pure logic ----------

export type Audit12Row = {
  description: string | null;
  currentPricing: string | null;
  apiAvailable: boolean;
};

export type Audit12Diff =
  | { field: Audit12TextField; to: string; wasEmpty: boolean }
  | { field: "apiAvailable"; to: boolean };

/** `current` with `note` appended, or null when it already contains the note. */
export function appendNote(current: string | null, append: Audit12Append): string | null {
  const text = current?.trim() ?? "";
  if (text.includes(append.note)) return null;
  return text ? `${text}${append.separator}${append.note}` : append.note;
}

/** Fields that differ once the patch is applied. Empty when the row already matches. */
export function diffAudit12(row: Audit12Row, patch: Audit12Patch): Audit12Diff[] {
  const next: Partial<Record<Audit12TextField, string>> = {};
  for (const append of patch.appends) {
    // Never let a dated note become a whole description: skip empty descriptions.
    if (append.field === "description" && !row.description?.trim()) continue;
    const to = appendNote(next[append.field] ?? row[append.field], append);
    if (to !== null) next[append.field] = to;
  }
  const diffs: Audit12Diff[] = [];
  for (const field of ["description", "currentPricing"] as const) {
    const to = next[field];
    if (to !== undefined) diffs.push({ field, to, wasEmpty: !row[field]?.trim() });
  }
  const api = patch.guarded?.apiAvailable;
  if (api && row.apiAvailable === api.from && api.from !== api.to) diffs.push({ field: "apiAvailable", to: api.to });
  return diffs;
}

/** Prisma `data` for an update: only the differing fields. */
export function audit12UpdateData(diffs: readonly Audit12Diff[]): Record<string, string | boolean> {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to]));
}

/** Every slug audit 12 may touch, in run order. */
export function audit12Slugs(): string[] {
  return AUDIT_12_PATCHES.map((p) => p.slug);
}

export function diffAudit12Row(slug: string, row: Audit12Row): Audit12Diff[] {
  const patch = AUDIT_12_PATCHES.find((p) => p.slug === slug);
  return patch ? diffAudit12(row, patch) : [];
}

/** True when `slug` has a description note that diffAudit12 skips because the row's description is empty. */
export function audit12SkippedEmptyDescription(slug: string, row: Audit12Row): boolean {
  const patch = AUDIT_12_PATCHES.find((p) => p.slug === slug);
  return !!patch?.appends.some((a) => a.field === "description") && !row.description?.trim();
}
