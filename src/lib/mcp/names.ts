/**
 * Name and spelling tolerance for the MCP tools (fix plan P1.1). Pure and in
 * memory over the cached catalog: at ~220 names a brute-force edit-distance
 * pass costs microseconds and no database read.
 *
 * Rules:
 *   - compact key: nameKey with spaces removed, matched exactly and only
 *     when it names ONE tool ("chat gpt", "Chat-GPT", "mid journey");
 *   - NAME_ALIASES: curated other names and common misspellings, checked
 *     after redirects; a list means "ambiguous, suggest these";
 *   - fuzzy auto-resolve only when exactly one tool has a key within 1 edit
 *     of the input AND that key is 6+ characters; anything else returns
 *     did-you-mean suggestions (at most 3, distance at most 2), never a swap.
 *     Short names (grok / groq, v0) therefore never auto-resolve.
 */
import { TASKS } from "@/data/task-tags";
import { nameKey, nameKeys, words } from "./search-text";

export const AUTO_RESOLVE_MIN_LENGTH = 6;
export const AUTO_RESOLVE_MAX_EDITS = 1;
export const SUGGEST_MAX_EDITS = 2;
export const MAX_SUGGESTIONS = 3;

/** "Chat-GPT", "chat gpt" and "ChatGPT" -> "chatgpt". */
export function compactKey(name: string): string {
  return nameKey(name).replace(/\s+/g, "");
}

/**
 * Other names people type, keyed by compactKey, to a slug (resolves) or a
 * list of slugs (ambiguous: did-you-mean only). Each target must be a real
 * catalog slug (names.test.ts checks them against the snapshot).
 */
export const NAME_ALIASES: Readonly<Record<string, string | readonly string[]>> = {
  dalle: "gpt-image-1-5-dall-e-successor",
  dalle3: "gpt-image-1-5-dall-e-successor",
  gptimage: "gpt-image-1-5-dall-e-successor",
  gpt: "chatgpt",
  openaichatgpt: "chatgpt",
  chatgptplus: "chatgpt",
  bard: "gemini",
  googlegemini: "gemini",
  geminiadvanced: "gemini",
  anthropicclaude: "claude",
  copilot: ["github-copilot", "microsoft-copilot"],
  bingchat: "microsoft-copilot",
  lechat: "mistral-vibe",
  mistral: "mistral-vibe",
  khanmigo: "khan-academy-khanmigo",
  qchat: "quizlet-q-chat",
  imagen: "nano-banana",
  googleimagen: "nano-banana",
  notebooklm: "gemini-notebook",
  vertexai: "gemini-enterprise-agent-platform",
  googlevertexai: "gemini-enterprise-agent-platform",
  textgenerationwebui: "textgen",
  oobabooga: "textgen",
  lyria: "google-lyria-3",
  veo: "google-veo-3-1",
  stablediffusion: "stability-ai",
  powerautomate: "microsoft-power-automate",
  jetpackai: "wordpress-ai-jetpack-ai",
  firefly: "adobe-firefly",
  otter: "otter-ai",
  zoommate: "zoom-ai-companion", // Zoom's current name for AI Companion (facts/zoom-ai-companion.ts)
  fireflies: "fireflies-ai",
  tldv: "tl-dv",
  make: "make-integromat",
  integromat: "make-integromat",
  canva: "canva-ai-magic-studio",
  perplexity: "perplexity-ai",
  comet: "perplexity-comet",
};

/** Optimal-string-alignment Damerau-Levenshtein (adjacent swaps count 1). */
export function editDistance(a: string, b: string, max = Infinity): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const rows: number[][] = [];
  for (let i = 0; i <= a.length; i++) rows.push([i]);
  for (let j = 1; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let best = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let d = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, rows[i - 2][j - 2] + 1);
      rows[i][j] = d;
      best = Math.min(best, d);
    }
    if (best > max) return max + 1;
  }
  return rows[a.length][b.length];
}

export type NamedRow = { slug: string; names: string[] };

/** Every compact key a tool answers to: its names (nameKeys variants), its slug, and its aliases. */
export function compactKeysFor(tool: NamedRow): string[] {
  const keys = new Set<string>();
  for (const name of tool.names) for (const key of nameKeys(name)) keys.add(key.replace(/\s+/g, ""));
  keys.add(compactKey(tool.slug.replace(/-/g, " ")));
  for (const [alias, target] of Object.entries(NAME_ALIASES)) if (target === tool.slug) keys.add(alias);
  return [...keys].filter(Boolean);
}

export type Suggestion = { slug: string; name: string };

export type NameMatch =
  | { kind: "compact" | "alias" | "spelling"; slug: string }
  | { kind: "none"; suggestions: Suggestion[] };

/**
 * Tolerant lookup for input that did not match exactly. `tools` carries the
 * display name first. Returns the tool only when the match is unambiguous.
 */
export function matchName(input: string, tools: NamedRow[]): NameMatch {
  const key = compactKey(input);
  if (!key) return { kind: "none", suggestions: [] };
  const keyed = tools.map((t) => ({ tool: t, keys: compactKeysFor(t) }));

  const alias = NAME_ALIASES[key];
  if (typeof alias === "string" && tools.some((t) => t.slug === alias)) return { kind: "alias", slug: alias };
  if (Array.isArray(alias)) {
    return { kind: "none", suggestions: tools.filter((t) => alias.includes(t.slug)).map((t) => ({ slug: t.slug, name: t.names[0] })) };
  }

  const compactHits = keyed.filter((k) => k.keys.includes(key));
  if (compactHits.length === 1) return { kind: "compact", slug: compactHits[0].tool.slug };

  const scored = keyed
    .map(({ tool, keys }) => {
      let best = { d: Infinity, len: 0 };
      for (const k of keys) {
        const d = editDistance(key, k, SUGGEST_MAX_EDITS);
        if (d < best.d || (d === best.d && k.length > best.len)) best = { d, len: k.length };
      }
      return { tool, ...best };
    })
    .filter((s) => s.d <= SUGGEST_MAX_EDITS && s.d <= Math.max(1, Math.floor(s.len / 3)));
  if (compactHits.length === 0) {
    const near = scored.filter((s) => s.d <= AUTO_RESOLVE_MAX_EDITS);
    if (near.length === 1 && near[0].len >= AUTO_RESOLVE_MIN_LENGTH) return { kind: "spelling", slug: near[0].tool.slug };
  }
  const pool = compactHits.length > 1 ? compactHits.map((h) => ({ tool: h.tool, d: 0, len: key.length })) : scored;
  const suggestions = pool
    .sort((a, b) => a.d - b.d || a.tool.names[0].localeCompare(b.tool.names[0]))
    .slice(0, MAX_SUGGESTIONS)
    .map((s) => ({ slug: s.tool.slug, name: s.tool.names[0] }));
  return { kind: "none", suggestions };
}

// ---------- query spelling (search_tools) ----------

/** Stemmed words of 5+ letters from every TASKS phrase: the only correction targets. */
export const SPELLING_VOCABULARY: readonly string[] = [
  ...new Set(Object.values(TASKS).flatMap((t) => t.phrases.flatMap((p) => words(p)))),
]
  .filter((w) => w.length >= 5 && /^[a-z]+$/.test(w))
  .sort();

/**
 * Correct one query word toward the task vocabulary: only words of 5+
 * letters that match nothing in the catalog, only when exactly one
 * vocabulary word is within 1 edit.
 */
export function correctWord(word: string, catalogWords: ReadonlySet<string>): string | null {
  if (word.length < 5 || !/^[a-z]+$/.test(word) || catalogWords.has(word) || SPELLING_VOCABULARY.includes(word)) return null;
  const near = SPELLING_VOCABULARY.filter((v) => editDistance(word, v, 1) <= 1);
  return near.length === 1 ? near[0] : null;
}
