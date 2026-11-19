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

  it("global-error keeps Sentry reporting and its own dark styling", () => {
    const src = readFileSync("src/app/global-error.tsx", "utf8");
    assert.match(src, /Sentry\.captureException\(error\)/);
    assert.match(src, /import "\.\/globals\.css"/);
    assert.match(src, /backgroundColor: DARK_BG/);
    assert.match(src, /Try again/);
    assert.equal(/<Header|@clerk/.test(src), false);
  });
});
