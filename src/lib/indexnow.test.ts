import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { config as proxyConfig } from "@/proxy";
import { SITEMAP_STATIC_PUBLIC_PATHS } from "@/lib/sitemap-coverage";
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  batch,
  buildPayload,
  classifyStatus,
  diffAgainstState,
  filterHost,
  nextState,
  parseSitemap,
  parseSitemapIndex,
  parseState,
  type IndexNowState,
  type SitemapEntry,
} from "./indexnow";

const SITE = `https://${INDEXNOW_HOST}`;
const KEY_PATH = `/${INDEXNOW_KEY}.txt`;

function state(urls: Record<string, string | null>): IndexNowState {
  return { version: 1, host: INDEXNOW_HOST, updatedAt: "2026-10-01T00:00:00.000Z", urls };
}

describe("IndexNow key", () => {
  it("is 32 lowercase hex chars", () => {
    assert.match(INDEXNOW_KEY, /^[0-9a-f]{32}$/);
  });

  it("matches the public key file byte for byte", () => {
    const file = readFileSync(join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`), "utf8");
    assert.equal(file, INDEXNOW_KEY);
  });

  it("points keyLocation and the endpoint at the right places", () => {
    assert.equal(INDEXNOW_KEY_LOCATION, `${SITE}${KEY_PATH}`);
    assert.equal(INDEXNOW_ENDPOINT, "https://api.indexnow.org/indexnow");
  });
});

describe("IndexNow key file serving", () => {
  // Next compiles each matcher with path-to-regexp; for these regex-group
  // matchers that is equivalent to anchoring the source as a RegExp.
  const matchers = proxyConfig.matcher.map((source) => new RegExp(`^${source}$`));
  const proxied = (path: string) => matchers.some((re) => re.test(path));

  it("keeps the key file out of the proxy (no Clerk, no redirects)", () => {
    assert.equal(proxied(KEY_PATH), false);
  });

  it("still proxies ordinary pages (sanity check on the regex)", () => {
    assert.equal(proxied("/discover"), true);
    assert.equal(proxied("/account"), true);
  });

  it("is not a static sitemap path", () => {
    assert.equal((SITEMAP_STATIC_PUBLIC_PATHS as readonly string[]).includes(KEY_PATH), false);
  });
});

describe("parseSitemap", () => {
  it("reads loc and lastmod, trimming whitespace", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>
      ${SITE}/discover
    </loc>
    <lastmod> 2026-10-20T00:00:00.000Z </lastmod>
  </url>
  <url><loc>${SITE}/</loc></url>
</urlset>`;
    assert.deepEqual(parseSitemap(xml), [
      { loc: `${SITE}/discover`, lastmod: "2026-10-20T00:00:00.000Z" },
      { loc: `${SITE}/`, lastmod: null },
    ]);
  });

  it("decodes XML entities", () => {
    const xml = `<urlset><url><loc>${SITE}/discover?a=1&amp;b=&#50;&amp;c=&#x33;&amp;d=&quot;</loc></url></urlset>`;
    assert.deepEqual(parseSitemap(xml), [{ loc: `${SITE}/discover?a=1&b=2&c=3&d="`, lastmod: null }]);
  });

  it("returns no URL entries for a sitemap index", () => {
    const xml = `<sitemapindex><sitemap><loc>${SITE}/a.xml</loc></sitemap></sitemapindex>`;
    assert.deepEqual(parseSitemap(xml), []);
  });
});

describe("parseSitemapIndex", () => {
  it("returns child sitemap locs for a sitemap index", () => {
    const xml = `<?xml version="1.0"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap/0.xml</loc><lastmod>2026-10-20</lastmod></sitemap>
  <sitemap><loc> ${SITE}/sitemap/1.xml?x=1&amp;y=2 </loc></sitemap>
</sitemapindex>`;
    assert.deepEqual(parseSitemapIndex(xml), [
      `${SITE}/sitemap/0.xml`,
      `${SITE}/sitemap/1.xml?x=1&y=2`,
    ]);
  });

  it("returns null for a plain urlset", () => {
    assert.equal(parseSitemapIndex(`<urlset><url><loc>${SITE}/</loc></url></urlset>`), null);
  });
});

describe("filterHost", () => {
  it("keeps only https URLs on exactly the www host", () => {
    const entries: SitemapEntry[] = [
      { loc: `${SITE}/discover`, lastmod: null },
      { loc: "http://www.launchpadhq.io/discover", lastmod: null },
      { loc: "https://launchpadhq.io/discover", lastmod: null },
      { loc: "https://example.com/discover", lastmod: null },
      { loc: "https://www.launchpadhq.io.evil.com/", lastmod: null },
      { loc: "https://www.launchpadhq.io:8443/", lastmod: null },
      { loc: "not a url", lastmod: null },
    ];
    assert.deepEqual(
      filterHost(entries, INDEXNOW_HOST).map((entry) => entry.loc),
      [`${SITE}/discover`],
    );
  });
});

describe("diffAgainstState", () => {
  const entries: SitemapEntry[] = [
    { loc: `${SITE}/new`, lastmod: "2026-10-25" },
    { loc: `${SITE}/changed`, lastmod: "2026-10-25" },
    { loc: `${SITE}/same`, lastmod: "2026-10-01" },
    { loc: `${SITE}/known-no-date`, lastmod: null },
    { loc: `${SITE}/new-no-date`, lastmod: null },
    { loc: `${SITE}/new`, lastmod: "2026-10-25" },
  ];
  const prev = state({
    [`${SITE}/changed`]: "2026-10-01",
    [`${SITE}/same`]: "2026-10-01",
    [`${SITE}/known-no-date`]: "2026-09-01",
    [`${SITE}/gone`]: "2026-09-01",
  });

  it("sends new and changed URLs only, deduplicated", () => {
    assert.deepEqual(diffAgainstState(entries, prev), [
      `${SITE}/new`,
      `${SITE}/changed`,
      `${SITE}/new-no-date`,
    ]);
  });

  it("sends everything with no state", () => {
    assert.equal(diffAgainstState(entries, null).length, 5);
  });

  it("sends everything (deduplicated) with all", () => {
    assert.deepEqual(diffAgainstState(entries, prev, { all: true }), [
      `${SITE}/new`,
      `${SITE}/changed`,
      `${SITE}/same`,
      `${SITE}/known-no-date`,
      `${SITE}/new-no-date`,
    ]);
  });

  it("does not treat a lastmod appearing on a known null entry as unchanged", () => {
    const known = state({ [`${SITE}/a`]: null });
    assert.deepEqual(diffAgainstState([{ loc: `${SITE}/a`, lastmod: "2026-10-25" }], known), [
      `${SITE}/a`,
    ]);
  });
});

describe("nextState", () => {
  const prev = state({ [`${SITE}/a`]: "2026-10-01", [`${SITE}/gone`]: "2026-10-01" });
  const entries: SitemapEntry[] = [
    { loc: `${SITE}/a`, lastmod: "2026-10-25" },
    { loc: `${SITE}/b`, lastmod: null },
  ];
  const now = "2026-10-25T12:00:00.000Z";

  it("advances on success and drops vanished URLs", () => {
    assert.deepEqual(nextState(prev, entries, true, now), {
      version: 1,
      host: INDEXNOW_HOST,
      updatedAt: now,
      urls: { [`${SITE}/a`]: "2026-10-25", [`${SITE}/b`]: null },
    });
  });

  it("does not advance on failure", () => {
    assert.equal(nextState(prev, entries, false, now), prev);
    assert.equal(nextState(null, entries, false, now), null);
  });
});

describe("parseState", () => {
  it("round-trips a valid state", () => {
    const valid = state({ [`${SITE}/a`]: null });
    assert.deepEqual(parseState(JSON.stringify(valid)), valid);
  });

  it("rejects another host or a malformed file", () => {
    assert.throws(() => parseState(JSON.stringify({ ...state({}), host: "launchpadhq.io" })));
    assert.throws(() => parseState(JSON.stringify({ version: 2, host: INDEXNOW_HOST, urls: {} })));
    assert.throws(() => parseState("null"));
  });
});

describe("batch", () => {
  const urls = (n: number) => Array.from({ length: n }, (_, i) => `${SITE}/p/${i}`);

  it("puts exactly 10,000 URLs in one batch", () => {
    const batches = batch(urls(10_000));
    assert.equal(batches.length, 1);
    assert.equal(batches[0].length, 10_000);
  });

  it("splits 10,001 URLs into two batches", () => {
    const batches = batch(urls(10_001));
    assert.deepEqual(
      batches.map((b) => b.length),
      [10_000, 1],
    );
  });

  it("returns no batches for no URLs and rejects a bad size", () => {
    assert.deepEqual(batch([]), []);
    assert.throws(() => batch(urls(3), 0));
  });
});

describe("buildPayload", () => {
  it("has the IndexNow JSON shape", () => {
    assert.deepEqual(buildPayload([`${SITE}/a`]), {
      host: "www.launchpadhq.io",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: [`${SITE}/a`],
    });
  });
});

describe("classifyStatus", () => {
  it("treats 200 and 202 as ok", () => {
    assert.equal(classifyStatus(200).ok, true);
    assert.equal(classifyStatus(202).ok, true);
  });

  it("treats documented and unknown codes as errors with a message", () => {
    for (const [status, word] of [
      [400, "Bad request"],
      [403, "key not valid"],
      [422, "don't belong"],
      [429, "Too many requests"],
      [500, "500"],
      [301, "301"],
    ] as const) {
      const result = classifyStatus(status);
      assert.equal(result.ok, false, String(status));
      assert.ok(result.message.includes(word), `${status}: ${result.message}`);
    }
  });
});
