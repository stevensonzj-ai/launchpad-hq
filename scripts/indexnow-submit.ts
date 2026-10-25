/**
 * IndexNow submitter: tells Bing, Yandex, Seznam, Naver and the other
 * IndexNow engines which www.launchpadhq.io URLs are new or changed.
 *
 * How it works: fetch the live sitemap (following a sitemap index one
 * level), keep only https://www.launchpadhq.io URLs, diff them against a
 * local state file, and POST the new/changed ones in batches of at most
 * 10,000 to https://api.indexnow.org/indexnow.
 *
 * The request is a free public ping with no credentials. Ownership is
 * proved by the key file public/dfc92150f97e7a592dd3592b61d09450.txt,
 * served at https://www.launchpadhq.io/dfc92150f97e7a592dd3592b61d09450.txt.
 * The key is public by design and lives in src/lib/indexnow.ts. No env
 * vars or secrets are read.
 *
 * State file: JSON `{ version, host, updatedAt, urls: { url: lastmod } }`.
 * It lives OUTSIDE the repo, default /workspace/launchpad-indexnow/state.json
 * (the box this is meant to run on). On Windows pass --state explicitly.
 * It is written only after --submit with every batch accepted (or when
 * nothing needed sending), never on a dry run, so a failed run retries.
 *
 * Usage (default is a dry run that sends nothing):
 *   npx tsx scripts/indexnow-submit.ts                  # dry run, changed URLs
 *   npx tsx scripts/indexnow-submit.ts --submit         # send changed URLs
 *   npx tsx scripts/indexnow-submit.ts --all --submit   # send every URL
 *   npx tsx scripts/indexnow-submit.ts --state C:\temp\indexnow-state.json
 *   npx tsx scripts/indexnow-submit.ts --sitemap https://www.launchpadhq.io/sitemap.xml
 *   npm run indexnow:submit -- --submit
 *
 * Exits non-zero if the sitemap can't be read, has no URLs, or any batch
 * is rejected.
 */
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_SITEMAP_URL,
  batch,
  buildPayload,
  classifyStatus,
  diffAgainstState,
  filterHost,
  isOnHost,
  nextState,
  parseSitemap,
  parseSitemapIndex,
  parseState,
  type IndexNowState,
  type SitemapEntry,
} from "../src/lib/indexnow";

const DEFAULT_STATE_PATH = "/workspace/launchpad-indexnow/state.json";
const PREVIEW_COUNT = 20;
const TIMEOUT_MS = 30_000;

type Options = { submit: boolean; all: boolean; statePath: string; sitemapUrl: string };

function fail(message: string): never {
  console.error(`indexnow: ${message}`);
  process.exit(1);
}

function parseArgs(argv: string[]): Options {
  const options: Options = {
    submit: false,
    all: false,
    statePath: DEFAULT_STATE_PATH,
    sitemapUrl: INDEXNOW_SITEMAP_URL,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--submit") options.submit = true;
    else if (arg === "--all") options.all = true;
    else if (arg === "--state" || arg === "--sitemap") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) fail(`${arg} needs a value`);
      if (arg === "--state") options.statePath = value;
      else options.sitemapUrl = value;
    } else fail(`unknown argument: ${arg}`);
  }
  if (!isOnHost(options.sitemapUrl, INDEXNOW_HOST)) {
    fail(`refusing sitemap ${options.sitemapUrl}: must be https://${INDEXNOW_HOST}/...`);
  }
  return options;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`GET ${url} returned HTTP ${response.status}`);
  return response.text();
}

/** Sitemap entries, following a sitemap index one level deep. */
async function loadSitemap(url: string): Promise<SitemapEntry[]> {
  const xml = await fetchText(url);
  const children = parseSitemapIndex(xml);
  if (children === null) return parseSitemap(xml);

  const entries: SitemapEntry[] = [];
  for (const child of children) {
    if (!isOnHost(child, INDEXNOW_HOST)) {
      throw new Error(`refusing child sitemap ${child}: not on https://${INDEXNOW_HOST}`);
    }
    const childXml = await fetchText(child);
    if (parseSitemapIndex(childXml) !== null) {
      throw new Error(`child sitemap ${child} is itself an index; only one level is followed`);
    }
    entries.push(...parseSitemap(childXml));
  }
  return entries;
}

async function loadState(path: string): Promise<IndexNowState | null> {
  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  return parseState(text, INDEXNOW_HOST);
}

async function saveState(path: string, state: IndexNowState): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  await writeFile(tmp, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await rename(tmp, path);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const mode = options.submit ? "SUBMIT" : "DRY RUN";
  console.log(`indexnow: ${mode}${options.all ? " (--all)" : ""}`);
  console.log(`  sitemap: ${options.sitemapUrl}`);
  console.log(`  state:   ${options.statePath}`);

  let state: IndexNowState | null;
  try {
    state = await loadState(options.statePath);
  } catch (error) {
    fail(`could not read state file: ${(error as Error).message}`);
  }
  console.log(
    state
      ? `  state has ${Object.keys(state.urls).length} URLs (updated ${state.updatedAt})`
      : "  no state file yet: every URL counts as new",
  );

  let raw: SitemapEntry[];
  try {
    raw = await loadSitemap(options.sitemapUrl);
  } catch (error) {
    fail(`could not load sitemap: ${(error as Error).message}`);
  }
  const entries = filterHost(raw, INDEXNOW_HOST);
  const dropped = raw.length - entries.length;
  console.log(
    `  sitemap has ${raw.length} URLs` +
      (dropped > 0 ? `; dropped ${dropped} not on https://${INDEXNOW_HOST}` : ""),
  );
  // An empty sitemap is far more likely a broken deploy than an empty site,
  // and saving it would wipe the state. Stop instead.
  if (entries.length === 0) fail("no URLs on the host in the sitemap; nothing done");

  const urls = diffAgainstState(entries, state, { all: options.all });
  const batches = batch(urls);
  console.log(`  to send: ${urls.length} URLs in ${batches.length} batch(es)`);

  if (!options.submit) {
    batches.forEach((urlList, index) => {
      console.log(`\nbatch ${index + 1}/${batches.length}: ${urlList.length} URLs`);
      for (const url of urlList.slice(0, PREVIEW_COUNT)) console.log(`  ${url}`);
      if (urlList.length > PREVIEW_COUNT) {
        console.log(`  ... and ${urlList.length - PREVIEW_COUNT} more`);
      }
    });
    console.log("\nDry run: no request was sent and the state file was not written.");
    console.log("Re-run with --submit to send.");
    return;
  }

  let allOk = true;
  for (const [index, urlList] of batches.entries()) {
    const label = `batch ${index + 1}/${batches.length} (${urlList.length} URLs)`;
    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(buildPayload(urlList)),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const { ok, message } = classifyStatus(response.status);
      console.log(`${label}: HTTP ${response.status}: ${message}`);
      if (!ok) allOk = false;
    } catch (error) {
      console.log(`${label}: request failed: ${(error as Error).message}`);
      allOk = false;
    }
  }

  if (!allOk) {
    console.error("indexnow: at least one batch failed; state not updated, next run retries.");
    process.exitCode = 1;
    return;
  }

  const updated = nextState(state, entries, true, new Date().toISOString(), INDEXNOW_HOST);
  if (updated) {
    await saveState(options.statePath, updated);
    console.log(`state written: ${Object.keys(updated.urls).length} URLs -> ${options.statePath}`);
  }
}

main().catch((error) => {
  console.error(`indexnow: ${(error as Error).stack ?? error}`);
  process.exit(1);
});
