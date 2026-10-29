/**
 * Catalog audit #16 — Hermes Agent (Nous Research), 2026-10-29.
 * Row data and pure logic for scripts/update-catalog-audit-16.ts (the DB
 * runner lives there).
 *
 *   - HERMES_ROW: a new `hermes-agent` row, created only when no row has that
 *     slug. Its category is looked up by slug (HERMES_CATEGORY_SLUG) at run
 *     time. The catalog has no "AI agents" category; workflow-automation is
 *     where the closest agent rows already sit (manus, lindy-ai).
 *   - Pricing is provisional and has ONE home: the `freeTier` and `plans`
 *     block of src/data/facts/hermes-agent.ts. The row's currentPricing and
 *     freeTierFeatures are built from that block here, so the two cannot
 *     drift at insert time. After the insert, the site overlay shows the fact
 *     file over the row text, so amend the fact file only.
 *   - Alternatives: only names of rows that exist (HERMES_ALTERNATIVES).
 *     OpenClaw has no row and is left out.
 *
 * Every fact is from Nous Research's own pages, read 2026-10-29 (sources
 * below). Text never says "official" (audit 10's wording pass rewrites text
 * that does). No affiliate or sponsored link.
 *
 * Never deletes rows; never changes an existing row. Kept free of Prisma and
 * dotenv so it typechecks with the app and can be unit-tested
 * (audit-16.test.ts).
 */
import hermesAgentFacts from "../facts/hermes-agent";

export const CHECKED_AT = "2026-10-29";

export const HERMES_SLUG = "hermes-agent";
/** Existing category slug (scripts/restructure-categories-2026-05.ts). */
export const HERMES_CATEGORY_SLUG = "workflow-automation";

export const HERMES_SOURCES = [
  "https://hermes-agent.nousresearch.com/",
  "https://hermes-agent.nousresearch.com/docs/",
  "https://github.com/NousResearch/hermes-agent",
  "https://portal.nousresearch.com/",
  "https://portal.nousresearch.com/privacy",
] as const;

/**
 * Catalog names of the alternatives that have rows (snapshot, 2026-10-29):
 * claude-code, openai-codex-cli, lindy-ai. OpenClaw has no row.
 */
export const HERMES_ALTERNATIVES = ["Claude Code", "OpenAI Codex CLI", "Lindy AI"];

const NOT_STATED = "Annual pricing and free trial: not stated";

/** "Free $0, Plus $20/mo, …" from the fact file's provisional plans. */
export function provisionalPlanList(): string {
  return hermesAgentFacts.plans.value
    .map((p) => `${p.name} ${p.price}${p.period === "month" ? "/mo" : ""}`)
    .join(", ");
}

/** Row currentPricing, built from the fact file's provisional plans. */
export function hermesCurrentPricing(): string {
  return `Free and open source (MIT). Optional Nous Portal plans: ${provisionalPlanList()}. ${NOT_STATED} (as of ${CHECKED_AT})`;
}

/** Row freeTierFeatures, from the fact file's provisional free-tier summary. */
export function hermesFreeTierFeatures(): string {
  return `${hermesAgentFacts.freeTier.value.summary} (as of ${CHECKED_AT})`;
}

/** Every field the new row sets besides categoryId. Shape matches existing rows. */
export const HERMES_ROW = {
  slug: HERMES_SLUG,
  name: "Hermes Agent",
  company: "Nous Research",
  website: "https://hermes-agent.nousresearch.com",
  description:
    "An open-source AI agent from Nous Research that you can run on your own computer or server, or have hosted in the cloud through a Nous Portal account. You message it from Telegram, Discord, Slack, WhatsApp, Signal, email or the command line; it keeps a memory, writes its own reusable skills and can run scheduled tasks. It is free under the MIT license, and you connect a model provider of your choice. Nous Portal's privacy policy (as of 2026-10-29) says it collects prompts, outputs and conversation history that may be used for training, with a Privacy Mode to opt out of the storage and training use of certain inference payloads; self-hosted, conversations, memories and skills stay on your machine and prompts go to the provider you choose.",
  primaryUse: "Open-source personal AI agent you self-host or run in Nous Portal's cloud",
  primaryUseCases:
    "A personal assistant you message from chat apps; scheduled and recurring tasks; an agent with memory and self-written skills; running an agent on your own computer or server",
  costTier: "FREEMIUM",
  difficultyLevel: "INTERMEDIATE",
  platformType: ["desktop", "local"],
  currentPricing: hermesCurrentPricing(),
  freeTierFeatures: hermesFreeTierFeatures(),
  usageLimits: null,
  upgradeTriggers:
    "Having Nous Portal host the agent in the cloud; Tool Gateway (search, image, text-to-speech, browser), which Nous lists as a paid-subscription feature",
  apiAvailable: false,
  offlineCapable: false,
  keyIntegrations:
    "Telegram, Discord, Slack, WhatsApp, Signal, email; MCP servers; model providers including Nous Portal, OpenRouter, OpenAI and custom endpoints; runs locally, in Docker, over SSH, or on Modal, Daytona or Vercel Sandbox",
  privacyLevel: "MEDIUM",
  idealUserTypes: ["Tinkerers", "self-hosters", "developers", "power users who live in chat apps"],
  timeToProductivity: null,
  learningCurve: "Moderate",
  directAlternatives: HERMES_ALTERNATIVES,
  complementaryTools: [] as string[],
  budgetAlternativeTo: [] as string[],
  privacyAlternativeTo: [] as string[],
  contentTypes: ["Text"],
  outputFormats: ["Chat replies", "scheduled task results"],
  languageSupport: null,
  hasMobileApp: false,
  mobileWebFriendly: false,
} as const;

/** Prisma `data` for the create, or null when the row exists or the category is missing. */
export function hermesCreateData(
  exists: boolean,
  categoryId: string | null,
): (typeof HERMES_ROW & { categoryId: string }) | null {
  if (exists || !categoryId) return null;
  return { ...HERMES_ROW, categoryId };
}
