/**
 * Unmet website searches: the pure rules shared by the browser tracker and the
 * server route (no Next, Prisma or DOM imports, so tests import it directly).
 *
 * This module is for the WEBSITE only (header search box and Discover). The
 * /mcp endpoint and its tools must never import it; a test enforces that.
 */

/**
 * A website search is "unmet" when it returns this many results or fewer
 * (0, 1 or 2). Three or more means the catalog answered it. The browser skips
 * the beacon above the threshold and the server re-checks it.
 */
export const UNMET_RESULT_THRESHOLD = 2;

/** Raw search text longer than this is dropped outright, never truncated and stored. */
export const MAX_RAW_QUERY_CHARS = 200;
/** A normalized query is cut to at most this many characters. */
export const MAX_NORMALIZED_QUERY_CHARS = 80;
/** A normalized query shorter than this (in characters) is dropped. */
export const MIN_NORMALIZED_QUERY_CHARS = 2;

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
// A scheme://, a www. host, or a dotted host followed by a path ("example.com/x").
// A bare "character.ai" is a tool name, not a URL, and is kept.
const URL_LIKE = /(?:[a-z][a-z0-9+.-]*:\/\/|\bwww\.|\b[a-z0-9-]+(?:\.[a-z0-9-]+)+\/\S*)/i;
const LONG_DIGIT_RUN = /\d{7,}/;

/** Email, phone-like number or URL in the RAW text (checked before normalizing erases the punctuation). */
export function looksLikePii(raw: string): boolean {
  if (EMAIL.test(raw)) return true;
  if (URL_LIKE.test(raw)) return true;
  if (LONG_DIGIT_RUN.test(raw)) return true;
  const digits = (raw.match(/\d/g) ?? []).length;
  const nonSpace = raw.replace(/\s/g, "").length;
  // "+1 (555) 123-4567": at least 7 digits and digits are most of the text.
  return digits >= 7 && nonSpace > 0 && digits / nonSpace >= 0.5;
}

function cutAtWordBoundary(text: string, max: number): string {
  const chars = Array.from(text);
  if (chars.length <= max) return text;
  const head = chars.slice(0, max).join("");
  // Cut landed exactly between words: the head is already whole words.
  if (chars[max] === " ") return head.trim();
  const lastSpace = head.lastIndexOf(" ");
  // Back up to the last space only if that keeps most of the budget.
  return (lastSpace >= max / 2 ? head.slice(0, lastSpace) : head).trim();
}

/**
 * The stored form of a search: NFKC, lowercase, every run of characters that
 * are not letters, digits or combining marks becomes one space, trimmed, cut
 * to 80 characters at a word boundary where possible.
 *
 * Returns null (do not log) for: raw text over 200 characters; email, phone
 * or URL shaped text (checked on the raw input); fewer than 2 characters;
 * digits only (an ID or number, not a tool search).
 *
 * Combining marks (\p{M}) are kept alongside \p{L}\p{N} so scripts such as
 * Devanagari or Thai are not mangled by dropping their vowel signs.
 */
export function normalizeUnmetQuery(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  if (raw.length > MAX_RAW_QUERY_CHARS) return null;
  if (looksLikePii(raw)) return null;
  const normalized = raw
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, " ")
    .trim();
  const cut = cutAtWordBoundary(normalized, MAX_NORMALIZED_QUERY_CHARS);
  if (Array.from(cut).length < MIN_NORMALIZED_QUERY_CHARS) return null;
  if (!/\p{L}/u.test(cut)) return null;
  return cut;
}

/** True when this many results makes a search "unmet". */
export function isUnmet(resultCount: number): boolean {
  return Number.isInteger(resultCount) && resultCount >= 0 && resultCount <= UNMET_RESULT_THRESHOLD;
}

/** What the browser sends (and the server re-validates). */
export type UnmetSearchPayload = { q: string; resultCount: number; clicked: boolean };
