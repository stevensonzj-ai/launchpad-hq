/**
 * IndexNow (https://www.indexnow.org) — pure helpers for
 * scripts/indexnow-submit.ts. No network, no filesystem, so everything
 * here is unit-tested in indexnow.test.ts.
 *
 * The key is public by design: search engines verify ownership by fetching
 * INDEXNOW_KEY_LOCATION, which is the static file
 * public/<key>.txt. That path is outside the proxy matcher (it skips every
 * `*.txt`), so Clerk never sees it, and the sitemap never lists it.
 */

export const INDEXNOW_KEY = "dfc92150f97e7a592dd3592b61d09450";
export const INDEXNOW_HOST = "www.launchpadhq.io";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_SITEMAP_URL = `https://${INDEXNOW_HOST}/sitemap.xml`;
/** Protocol limit: at most 10,000 URLs per POST. */
export const INDEXNOW_MAX_BATCH = 10_000;

export type SitemapEntry = { loc: string; lastmod: string | null };

export type IndexNowState = {
  version: 1;
  host: string;
  updatedAt: string;
  urls: Record<string, string | null>;
};

export type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

/** Decode the five XML entities plus numeric references, in one pass. */
export function decodeXmlEntities(text: string): string {
  return text.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      return String.fromCodePoint(parseInt(body.slice(2), 16));
    }
    if (body.startsWith("#")) return String.fromCodePoint(parseInt(body.slice(1), 10));
    return NAMED_ENTITIES[body] ?? match;
  });
}

function readTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!match) return null;
  const raw = match[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  const value = cdata ? cdata[1].trim() : decodeXmlEntities(raw).trim();
  return value === "" ? null : value;
}

function blocks(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  return Array.from(xml.matchAll(re), (match) => match[1]);
}

/** `<url>` entries of a `<urlset>`. Returns [] for a sitemap index. */
export function parseSitemap(xml: string): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (const block of blocks(xml, "url")) {
    const loc = readTag(block, "loc");
    if (loc) entries.push({ loc, lastmod: readTag(block, "lastmod") });
  }
  return entries;
}

/** Child sitemap locs when `xml` is a `<sitemapindex>`, otherwise null. */
export function parseSitemapIndex(xml: string): string[] | null {
  if (!/<sitemapindex\b/.test(xml)) return null;
  const locs: string[] = [];
  for (const block of blocks(xml, "sitemap")) {
    const loc = readTag(block, "loc");
    if (loc) locs.push(loc);
  }
  return locs;
}

/** True only for an https URL on exactly `host` with no explicit port. */
export function isOnHost(url: string, host: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === host && parsed.port === "";
  } catch {
    return false;
  }
}

export function filterHost(entries: SitemapEntry[], host: string): SitemapEntry[] {
  return entries.filter((entry) => isOnHost(entry.loc, host));
}

/** First occurrence of each loc wins. */
function dedupeEntries(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

/**
 * URLs to submit. With `all`, every entry. Otherwise entries missing from
 * state, or whose lastmod differs from the recorded one. A known URL with no
 * lastmod is not resubmitted: without a date there is nothing to compare.
 */
export function diffAgainstState(
  entries: SitemapEntry[],
  state: IndexNowState | null,
  { all = false }: { all?: boolean } = {},
): string[] {
  const known = state?.urls ?? {};
  return dedupeEntries(entries)
    .filter((entry) => {
      if (all) return true;
      if (!Object.prototype.hasOwnProperty.call(known, entry.loc)) return true;
      if (entry.lastmod === null) return false;
      return known[entry.loc] !== entry.lastmod;
    })
    .map((entry) => entry.loc);
}

/**
 * State after a run. Only advances when the submission succeeded (pass true
 * when nothing needed sending); otherwise returns `prevState` unchanged so
 * the next run retries. URLs no longer in the sitemap drop out.
 */
export function nextState(
  prevState: IndexNowState | null,
  entries: SitemapEntry[],
  submittedOk: boolean,
  now: string,
  host: string = INDEXNOW_HOST,
): IndexNowState | null {
  if (!submittedOk) return prevState;
  const urls: Record<string, string | null> = {};
  for (const entry of dedupeEntries(entries)) urls[entry.loc] = entry.lastmod;
  return { version: 1, host, updatedAt: now, urls };
}

/** Parse a state file's text. Throws on a malformed file or another host. */
export function parseState(text: string, host: string = INDEXNOW_HOST): IndexNowState {
  const data = JSON.parse(text) as Partial<IndexNowState> | null;
  if (!data || data.version !== 1 || typeof data.urls !== "object" || data.urls === null) {
    throw new Error("state file is not a version 1 IndexNow state");
  }
  if (data.host !== host) {
    throw new Error(`state file is for host ${String(data.host)}, expected ${host}`);
  }
  return data as IndexNowState;
}

export function batch<T>(items: T[], size: number = INDEXNOW_MAX_BATCH): T[][] {
  if (!Number.isInteger(size) || size < 1) throw new Error(`invalid batch size: ${size}`);
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function buildPayload(urls: string[]): IndexNowPayload {
  return {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };
}

/** Response codes from https://www.indexnow.org/documentation. */
export function classifyStatus(status: number): { ok: boolean; message: string } {
  switch (status) {
    case 200:
      return { ok: true, message: "OK: URLs submitted" };
    case 202:
      return { ok: true, message: "Accepted: URLs received, key validation pending" };
    case 400:
      return { ok: false, message: "Bad request: invalid format" };
    case 403:
      return { ok: false, message: "Forbidden: key not valid (key file missing or mismatched)" };
    case 422:
      return {
        ok: false,
        message: "Unprocessable: URLs don't belong to the host, or the key doesn't match the protocol",
      };
    case 429:
      return { ok: false, message: "Too many requests: possible spam, slow down" };
    default:
      return { ok: false, message: `Unexpected HTTP status ${status}` };
  }
}
