/**
 * Text helpers for MCP search ranking. Pure and deterministic: whole-word
 * matching with light plural / accent folding, so "cover" never matches
 * "discover" and "résumés" matches "resume".
 */
import { TASKS, type TaskId } from "@/data/task-tags";

/** Words dropped from a search before matching: they carry no topic. */
export const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "for", "to", "of", "in", "on", "with", "my", "me", "i", "im",
  "is", "are", "be", "am", "it", "its", "this", "that", "these", "those", "some", "any", "all",
  "you", "your", "we", "our", "us", "they", "them", "there", "their", "from", "by", "at", "as",
  "into", "about", "so", "but", "if", "than", "then", "just", "really", "please", "very",
  "what", "which", "who", "where", "when", "why", "how", "can", "could", "would", "should",
  "will", "do", "does", "did", "want", "need", "needs", "looking", "something", "anything",
  "app", "apps", "ai", "tool", "tools", "help", "helps", "helping", "use", "using", "used",
  "get", "give", "find", "show", "recommend", "suggest", "best", "good", "great", "top",
  "make", "making", "do", "thing", "things", "way", "ways", "one", "ones", "other", "else",
  "online", "easy", "simple", "quick", "quickly", "new", "better",
]);

/**
 * Words that mean something only next to other words ("letter" in "cover
 * letter" vs. clinical letters, "free", "alternative"). They never count on
 * their own unless nothing in the search matched more strongly.
 */
export const WEAK_WORDS = new Set([
  "write", "writing", "written", "writer", "create", "creating", "generate", "generator",
  "letter", "cover", "application", "job", "interview", "free", "cheap", "cheaper",
  "budget", "cost", "price", "paid", "alternative", "replacement", "instead", "like",
  "similar", "version", "service", "platform", "software", "assistant", "website",
  "content", "work", "personal", "professional",
]);

/**
 * Conservative name key for catalog lookups: accents, case and punctuation
 * folded, and one trailing " ai" / " app" dropped ("Perplexity AI" and
 * "perplexity.ai" -> "perplexity"). Never fuzzy: the key must be equal.
 */
export function nameKey(name: string): string {
  return fold(name)
    .replace(/[^a-z0-9+#]+/g, " ")
    .trim()
    .replace(/\s+(?:ai|app)$/, "")
    .trim();
}

/** Every key a catalog name answers to: the whole name, without "(...)", and each side of "A / B". */
export function nameKeys(name: string): string[] {
  const keys = [nameKey(name), nameKey(name.replace(/\([^)]*\)/g, " "))];
  if (name.includes("/")) {
    for (const part of name.replace(/\([^)]*\)/g, " ").split("/")) {
      const key = nameKey(part);
      if (key.length >= 4) keys.push(key);
    }
  }
  return [...new Set(keys.filter(Boolean))];
}

/** Lowercase, strip accents and possessives. */
function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]s\b/g, "");
}

/** Light plural folding: letters -> letter, summaries -> summary, boxes -> box. */
export function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && /(?:ches|shes|xes|sses|zes)$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !/(?:ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}

/** Whole words, folded and stemmed, in order. Keeps "c++" and "c#". */
export function words(text: string | null | undefined): string[] {
  if (!text) return [];
  return fold(text)
    .split(/[^a-z0-9+#]+/)
    .filter(Boolean)
    .map(stem);
}

/** A field prepared for whole-word and phrase lookups. */
export type MatchText = { set: Set<string>; joined: string };

export function matchText(text: string | null | undefined): MatchText {
  const list = words(text);
  return { set: new Set(list), joined: ` ${list.join(" ")} ` };
}

/** `phrase` is already a stemmed word list joined by spaces. */
export function hasPhrase(text: MatchText, phrase: string): boolean {
  return phrase.includes(" ") ? text.joined.includes(` ${phrase} `) : text.set.has(phrase);
}

export type QueryTask = { task: TaskId; phrase: string; matched: string[] };

/**
 * Tasks a search names, with the phrase that named each (longest wins) and
 * every phrase of that task the search contains.
 */
export function detectTasks(query: MatchText): QueryTask[] {
  const out: QueryTask[] = [];
  for (const [task, def] of Object.entries(TASKS) as [TaskId, (typeof TASKS)[TaskId]][]) {
    // Longest phrase first, so "job application" reports itself rather than "job".
    const phrases = def.phrases.map((p) => words(p).join(" ")).sort((a, b) => b.length - a.length);
    const matched = phrases.filter((p) => p && hasPhrase(query, p));
    if (matched.length) out.push({ task, phrase: matched[0], matched });
  }
  return out;
}

/**
 * A broad task steps aside when the search also names a narrower task it
 * declares in `yieldsTo` (task-tags.ts): "customer support chatbot" is a
 * support-bot ask, not a general-assistant ask.
 */
export function dropYieldingTasks(tasks: QueryTask[]): QueryTask[] {
  const named = new Set(tasks.map((t) => t.task));
  return tasks.filter((t) => !(TASKS[t.task].yieldsTo ?? []).some((u) => named.has(u)));
}

export type PriceIntent = "free" | "cheap" | null;

/** "free", "for free", "no cost", "without paying", "$0" -> free; "cheap", "low cost", "budget" -> cheap. */
export function detectPriceIntent(task: string): PriceIntent {
  const t = fold(task);
  if (/(?:^|[^\w-])(?:free|gratis|no[- ]cost|zero[- ]cost|without paying|not paying|no money)(?![\w-])|\$0(?![\d.])/.test(t)) {
    return "free";
  }
  if (/(?:^|[^\w-])(?:cheap|cheaper|cheapest|budget|low[- ]cost|affordable|inexpensive|low[- ]price)(?![\w-])/.test(t)) {
    return "cheap";
  }
  return null;
}

/**
 * "alternative to X", "X alternatives", "like X", "instead of X", "similar
 * to X", "cheaper than X", "replace X". Returns candidate names, longest
 * first, for the caller to resolve against the catalog.
 */
export function namedToolCandidates(task: string): string[] {
  const t = task.trim().replace(/[?!.]+$/, "");
  const after = [
    /\b(?:alternatives?|replacements?|substitutes?|competitors?)\s+(?:to|for|of)\s+(.+)$/i,
    /\b(?:instead\s+of|similar\s+to|cheaper\s+than|other\s+than|rather\s+than|like|replace|replacing|besides|versus|vs\.?)\s+(.+)$/i,
  ];
  const before = /^(?:.*?\b)?((?:\S+\s+){0,3}?\S+)\s+(?:alternatives?|replacements?|competitors?)\b/i;
  const out: string[] = [];
  for (const re of after) {
    const m = re.exec(t);
    if (!m) continue;
    const parts = m[1].split(/\s+/).slice(0, 4);
    for (let n = parts.length; n >= 1; n--) out.push(parts.slice(0, n).join(" "));
  }
  const b = before.exec(t);
  if (b) {
    const parts = b[1].split(/\s+/);
    for (let n = Math.min(parts.length, 4); n >= 1; n--) out.push(parts.slice(parts.length - n).join(" "));
  }
  return [...new Set(out.map((s) => s.replace(/^[^\w]+|[^\w]+$/g, "")).filter(Boolean))];
}
