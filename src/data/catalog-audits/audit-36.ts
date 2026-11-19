/**
 * Catalog audit #36 (2026-11-16): Nov 16 AI X-watch.
 * Facts below were re-read on the vendor page that day. X posts were leads only.
 * checkedAt is 2026-11-16 only on facts that page confirmed.
 *
 * Guarded SQL: scripts/sql/catalog-xwatch-20261116.sql. Not run from here.
 * Updates only. No new platform slugs.
 */

export const CHECKED_AT = "2026-11-16";

/** Model-free replacement for Claude's upgradeTriggers. Names no model. */
export const CLAUDE_UPGRADE_TRIGGERS =
  "Daily message limits; needing a more capable model for complex tasks; Claude Code; 1M context; MCP integrations";

export const CLAUDE_UPGRADE_TRIGGERS_PREVIOUS =
  "Daily message limits; needing Opus 4.6 for complex tasks; Claude Code; 1M context; MCP integrations";

export type Audit36Skip = {
  item: string;
  reason: string;
  source: string;
};

/** Confirmed nowhere it could be written, or already recorded, so no catalog text changed. */
export const AUDIT_36_SKIPPED: Audit36Skip[] = [
  {
    item: "Gemini 4 Hydrogen cached input and Batch/Flex prices on the launch post alone",
    reason:
      "The launch post states $1.50 / $7.50 flat across 1 million tokens and does not state a cache price or Batch or Flex. Those prices were taken from the Gemini API pricing page instead.",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    item: "Gemini 4 Argon $4 / $20 from 2026-12-01",
    reason:
      "The Gemini API pricing page still shows Standard $2.00 / $10.00 through 2026-11-30 and $4.00 / $20.00 from 2026-12-01. The Gemini model registry already records that. No new sentence was added.",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    item: "Inkling 2 Small open weights",
    reason:
      "Hugging Face lists the weights under Apache 2.0, and the Thinking Machines news post's 2026-11-12 update says the weights are on Hugging Face. The live catalog and this repo have no Inkling, Tinker, or Thinking Machines row, and no row contains the old 'Tinker only, weights planned' line, so nothing was updated and no new slug was created.",
    source: "https://huggingface.co/thinkingmachines/Inkling-2-Small",
  },
  {
    item: "Sesame Free / Plus / Pro prices",
    reason:
      "No Sesame row exists. Voice & Speech in this catalog is text-to-speech, dictation, and transcription, and sesame.com on 2026-11-16 did not state the Free, Plus, or Pro prices. No row was created.",
    source: "https://www.sesame.com/",
  },
  {
    item: "Perplexity Teammates in the Mac app for Max",
    reason:
      "perplexity.ai help and blog URLs returned 403. No official Perplexity page confirmed it, so it was not added.",
    source: "https://www.perplexity.ai/hub/blog",
  },
  {
    item: "Seedance 2.5 Flash in HeyGen and ComfyUI",
    reason:
      "The HeyGen blog index mentions Seedance 2.0, not 2.5 Flash. The Comfy blog and Comfy docs fetched on 2026-11-16 do not mention Seedance. Not added.",
    source: "https://www.heygen.com/blog",
  },
  {
    item: "Suno Bridge spends credits",
    reason: "The Suno Bridge post says Premier and Ableton Live 12 on a Mac. It does not say Bridge spends credits, so that claim was left out.",
    source: "https://suno.com/blog/introducing-bridge",
  },
];
