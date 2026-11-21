import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it } from "node:test";
import { NOT_FOUND_LINKS, NotFoundContent } from "./not-found-content";

describe("404 page", () => {
  const html = renderToStaticMarkup(createElement(NotFoundContent));

  it("renders links to Discover and the quiz", () => {
    assert.deepEqual(
      NOT_FOUND_LINKS.map((l) => l.href),
      ["/discover", "/quiz"],
    );
    assert.match(html, /href="\/discover"/);
    assert.match(html, /href="\/quiz"/);
    assert.match(html, /<h1[^>]*>We can(&#x27;|')t find that page<\/h1>/);
  });

  it("uses fixed dark classes, not light/dark-dependent ones", () => {
    assert.equal(/dark:|bg-white|text-black/.test(html), false);
    const page = readFileSync("src/app/not-found.tsx", "utf8");
    assert.match(page, /<Header \/>/);
    assert.match(page, /bg-gray-950/);
  });

  it("every 404 has exactly one header", () => {
    // notFound() inside (app): the (app) layout's Header plus (app)/not-found.tsx.
    const appLayout = readFileSync("src/app/(app)/layout.tsx", "utf8");
    assert.equal(appLayout.match(/<Header \/>/g)?.length, 1);
    const appNotFound = readFileSync("src/app/(app)/not-found.tsx", "utf8");
    assert.match(appNotFound, /<NotFoundContent \/>/);
    const appNotFoundCode = appNotFound.replace(/\/\*[\s\S]*?\*\//g, "");
    assert.equal(/<Header|<main/.test(appNotFoundCode), false, "(app)/not-found.tsx must not add a Header or <main>");
    // Unmatched URL: only the root layout, which has no Header, plus src/app/not-found.tsx.
    const rootLayout = readFileSync("src/app/layout.tsx", "utf8");
    assert.equal(/<Header/.test(rootLayout), false);
    const rootNotFound = readFileSync("src/app/not-found.tsx", "utf8");
    assert.equal(rootNotFound.match(/<Header \/>/g)?.length, 1);
    // The rendered body itself has no <header>.
    assert.equal(/<header/.test(html), false);
  });

  it("404 tab title is the same from every source", () => {
    assert.match(readFileSync("src/app/not-found.tsx", "utf8"), /metadata: Metadata = NOT_FOUND_METADATA/);
    // Each (app) page that calls notFound() and has generateMetadata falls back to NOT_FOUND_METADATA,
    // because its metadata streams in after the 404 UI and would replace the title.
    const pages = [
      "src/app/(app)/platform/[slug]/page.tsx",
      "src/app/(app)/platform/[slug]/guide/page.tsx",
      "src/app/(app)/platform/[slug]/prompts/page.tsx",
      "src/app/(app)/platform/[slug]/discussions/page.tsx",
      "src/app/(app)/models/[family]/page.tsx",
      "src/app/(app)/workflows/[slug]/page.tsx",
      "src/lib/compare-page.ts",
    ];
    for (const f of pages) {
      const src = readFileSync(f, "utf8");
      assert.match(src, /return NOT_FOUND_METADATA;/, f);
      assert.equal(/title: "Not [Ff]ound"/.test(src), false, f);
    }
  });

  it("global-error keeps Sentry reporting and its own dark styling", () => {
    const src = readFileSync("src/app/global-error.tsx", "utf8");
    assert.match(src, /Sentry\.captureException\(error\)/);
    assert.match(src, /import "\.\/globals\.css"/);
    assert.match(src, /backgroundColor: DARK_BG/);
    assert.match(src, /Try again/);
    assert.equal(/<Header|@clerk/.test(src), false);
  });
});
