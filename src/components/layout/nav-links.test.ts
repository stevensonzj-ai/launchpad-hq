import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { FOOTER_LINKS, footerExploreLinks, HEADER_LINKS, headerLinks } from "./nav-links";

const hrefs = (links: readonly { href: string }[]) => links.map((l) => l.href);

describe("header links", () => {
  it("signed out: Discover, Guides, Deals, Compare, Get matched", () => {
    assert.deepEqual(
      headerLinks(false).map((l) => [l.label, l.href]),
      [
        ["Discover", "/discover"],
        ["Guides", "/tutorials"],
        ["Deals", "/deals"],
        ["Compare", "/compare"],
        ["Get matched", "/quiz"],
      ],
    );
    assert.deepEqual(headerLinks(false), HEADER_LINKS);
  });

  it("signed in: the same five, then For you", () => {
    assert.deepEqual(hrefs(headerLinks(true)), ["/discover", "/tutorials", "/deals", "/compare", "/quiz", "/for-you"]);
  });

  it("desktop and mobile menus both render from headerLinks (no hard-coded nav hrefs)", () => {
    const src = readFileSync("src/components/layout/header.tsx", "utf8");
    assert.equal((src.match(/navLinks\.map\(/g) ?? []).length, 2);
    for (const href of ["/discover", "/workflows", "/models", "/quiz", "/for-you", "/advertise", "/pricing"]) {
      assert.equal(src.includes(`href="${href}"`), false, href);
    }
  });
});

describe("footer links", () => {
  it("every link moved out of the header is reachable from the footer", () => {
    const footer = new Set([...hrefs(footerExploreLinks(true)), ...hrefs(FOOTER_LINKS)]);
    for (const href of ["/workflows", "/models", "/pricing", "/advertise"]) assert.ok(footer.has(href), href);
  });

  it("Explore group: Workflows, Models, and Pricing only when the pro plan flag is on", () => {
    assert.deepEqual(hrefs(footerExploreLinks(true)), ["/workflows", "/deals", "/models", "/pricing"]);
    assert.deepEqual(hrefs(footerExploreLinks(false)), ["/workflows", "/deals", "/models"]);
  });

  it("footer renders both groups from nav-links", () => {
    const src = readFileSync("src/components/layout/footer.tsx", "utf8");
    assert.match(src, /footerExploreLinks\(\)/);
    assert.match(src, /links=\{FOOTER_LINKS\}/);
  });
});
