import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import {
  AFFILIATE_LINKS,
  AFFILIATE_LINK_CONSUMERS,
  affiliateDisclosureText,
  entryDisclosureText,
  getAffiliateLink,
  requiredDisclosure,
} from "./affiliates";
import { comparisonDisclosureText } from "./disclosures";
import { COMPARE_PAGES, comparePageToolSlugs, findHeadToHead } from "./compare/pages";
import { compareDisclosureLines } from "./compare/view";
import { listRegisteredTutorials } from "./tutorials";
import { getAllWorkflows } from "./workflows";
import { buildContentItems, disclosureGaps } from "@/lib/content-tracker";
import { KLAP_ROW } from "./catalog-audits/audit-13";

const ROOT = process.cwd();

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      out.push(...sourceFiles(full));
    } else if (/\.(ts|tsx|mjs|js)$/.test(name) && !/\.test\.tsx?$/.test(name)) {
      out.push(relative(ROOT, full).replace(/\\/g, "/"));
    }
  }
  return out;
}

const FILES = [...sourceFiles(join(ROOT, "src")), ...sourceFiles(join(ROOT, "scripts"))];
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");
/** Imports of src/data/affiliates (alias or relative), not disclosures or the component. */
const IMPORTS_AFFILIATES = /(?:from|import\()\s*["'](?:@\/data|\.{1,2}(?:\/\.\.)*(?:\/data)?)\/affiliates["']/;

const contentItems = () =>
  buildContentItems({ tutorials: listRegisteredTutorials(), comparePages: COMPARE_PAGES, workflows: getAllWorkflows() });

describe("affiliate links stay display-only", () => {
  it("only AFFILIATE_LINK_CONSUMERS import src/data/affiliates.ts", () => {
    const importers = FILES.filter((f) => f !== "src/data/affiliates.ts" && IMPORTS_AFFILIATES.test(read(f)));
    assert.deepEqual(importers.sort(), [...AFFILIATE_LINK_CONSUMERS].sort());
  });

  it("no ranking, search, feed, MCP, compare or catalog module is a consumer", () => {
    for (const file of AFFILIATE_LINK_CONSUMERS) {
      assert.doesNotMatch(file, /recommend|ranking|search|sort|order|mcp|public-data|seo-jsonld|sitemap|compare|catalog|quiz|discover|sponsors\/(ordering|calendar)/, file);
    }
  });

  it("the tracked links and promo codes appear nowhere else in src or scripts", () => {
    for (const entry of Object.values(AFFILIATE_LINKS)) {
      const needles = [entry.href, new URL(entry.href).search, entry.promoCode?.code].filter((n): n is string => !!n);
      for (const file of FILES) {
        if (file === "src/data/affiliates.ts") continue;
        const text = read(file);
        for (const needle of needles) assert.equal(text.includes(needle), false, `${needle} in ${file}`);
      }
    }
  });

  it("the Klap catalog row uses the vendor's own website", () => {
    assert.equal(KLAP_ROW.website, "https://klap.app");
    assert.notEqual(KLAP_ROW.website, AFFILIATE_LINKS.klap.href);
  });

  it("comparison pages never carry the affiliate link", () => {
    for (const page of COMPARE_PAGES) {
      const json = JSON.stringify(page);
      for (const entry of Object.values(AFFILIATE_LINKS)) assert.equal(json.includes(entry.href), false, page.slug);
      assert.doesNotMatch(json, /via=|utm_|ref=/, page.slug);
    }
  });

  it("the header swaps the button only, with rel=sponsored, and the pages pass the entry by slug", () => {
    const header = read("src/components/platforms/platform-detail-header.tsx");
    assert.match(header, /const ctaHref = affiliate\?\.href \?\? officialHref;/);
    assert.match(header, /rel=\{affiliate \? "sponsored noopener noreferrer" : "noopener noreferrer"\}/);
    assert.match(header, /\{affiliate && <AffiliateDisclosure name=\{name\} affiliate=\{affiliate\}/);
    for (const page of ["src/app/(app)/platform/[slug]/page.tsx", "src/app/(app)/platform/[slug]/guide/page.tsx"]) {
      assert.match(read(page), /affiliate=\{getAffiliateLink\(platform\.slug\)\}/, page);
    }
  });
});

describe("affiliate links and free access are always disclosed (owner rule)", () => {
  it("every entry is complete: href, free-access record with a source, and the disclosure it needs", () => {
    assert.ok(Object.keys(AFFILIATE_LINKS).length > 0);
    for (const [key, entry] of Object.entries(AFFILIATE_LINKS)) {
      assert.equal(entry.slug, key);
      assert.match(entry.href, /^https:\/\//, key);
      assert.equal(typeof entry.freeAccess.granted, "boolean", key);
      assert.ok(entry.freeAccess.source.trim().length > 0, key);
      for (const kind of requiredDisclosure(entry)) assert.ok(entry.disclosure.includes(kind), `${key} discloses ${kind}`);
      if (entry.freeAccess.granted) assert.ok(entry.disclosure.includes("free-access"), key);
    }
  });

  it("requiredDisclosure adds free-access only when granted", () => {
    assert.deepEqual(requiredDisclosure({ freeAccess: { granted: false, source: "x" } }), ["affiliate"]);
    assert.deepEqual(requiredDisclosure({ freeAccess: { granted: true, source: "x" } }), ["affiliate", "free-access"]);
  });

  it("every guide and comparison for an affiliate or free-access platform carries the disclosure", () => {
    for (const t of listRegisteredTutorials()) {
      const entry = getAffiliateLink(t.platformSlug);
      if (!entry) continue;
      const marker = t.disclosure?.find((m) => m.slug === entry.slug);
      assert.ok(marker, `guide ${t.slug} has no disclosure marker`);
      for (const kind of requiredDisclosure(entry)) assert.ok(marker.kinds.includes(kind), `guide ${t.slug}: ${kind}`);
    }
    for (const page of COMPARE_PAGES) {
      for (const slug of comparePageToolSlugs(page)) {
        const entry = getAffiliateLink(slug);
        if (!entry) continue;
        const marker = page.disclosure?.find((m) => m.slug === slug);
        assert.ok(marker, `compare ${page.slug} has no disclosure for ${slug}`);
        for (const kind of requiredDisclosure(entry)) assert.ok(marker.kinds.includes(kind), `compare ${page.slug}: ${kind}`);
      }
    }
  });

  it("the content tracker's check finds no gap (workflows have no marker, so none may name such a platform)", () => {
    assert.deepEqual(disclosureGaps(AFFILIATE_LINKS, contentItems()), []);
  });

  it("the check fails when a marker or a free-access disclosure is missing", () => {
    const items = contentItems().map((i) => ({ ...i, disclosure: [] }));
    assert.ok(disclosureGaps(AFFILIATE_LINKS, items).some((g) => g.slug === "klap"));
    const comped = { klap: { ...AFFILIATE_LINKS.klap, freeAccess: { granted: true, source: "test" } } };
    assert.deepEqual(
      disclosureGaps(comped, contentItems()).map((g) => g.where).sort(),
      ["/compare/klap-vs-opus-clip", "/platform/klap", "/platform/klap/guide"],
    );
  });

  it("markers name only platforms that need them (no stray disclosures)", () => {
    for (const t of listRegisteredTutorials()) {
      for (const m of t.disclosure ?? []) assert.ok(getAffiliateLink(m.slug), `${t.slug}: ${m.slug}`);
    }
    for (const page of COMPARE_PAGES) {
      for (const m of page.disclosure ?? []) {
        assert.ok(getAffiliateLink(m.slug), `${page.slug}: ${m.slug}`);
        assert.ok(comparePageToolSlugs(page).includes(m.slug), `${page.slug}: ${m.slug} is rendered`);
      }
    }
  });
});

describe("disclosure wording", () => {
  it("platform and guide text names the commission and says rankings are unaffected", () => {
    const text = entryDisclosureText("Klap", AFFILIATE_LINKS.klap);
    assert.equal(text, affiliateDisclosureText("Klap"));
    assert.match(text, /commission/);
    assert.match(text, /doesn't affect our rankings, quiz results or reviews/);
    assert.doesNotMatch(text, /free access/i);
  });

  it("the Klap promo note makes no discount claim the program terms don't confirm", () => {
    const note = AFFILIATE_LINKS.klap.promoCode?.note ?? "";
    assert.doesNotMatch(note, /\d|%|off\b|save/i);
    assert.equal(AFFILIATE_LINKS.klap.freeAccess.granted, false);
  });

  it("the Klap vs OpusClip page shows a text-only disclosure that says the link isn't used", () => {
    const page = findHeadToHead("klap-vs-opus-clip")!;
    const lines = compareDisclosureLines(page, [
      { slug: "klap", name: "Klap" },
      { slug: "opus-clip", name: "Opus Clip" },
    ]);
    assert.deepEqual(lines, [comparisonDisclosureText("Klap", ["affiliate"])]);
    assert.match(lines[0], /doesn't use that link/);
    assert.match(lines[0], /no say in what this page says, the picks or the order/);
    assert.doesNotMatch(lines[0], /https?:|via=/);
    const view = read("src/components/compare/compare-page-view.tsx");
    assert.match(view, /compareDisclosureLines\(page, tools\)/);
  });

  it("guides for affiliate platforms claim no free access", () => {
    for (const t of listRegisteredTutorials()) {
      const entry = getAffiliateLink(t.platformSlug);
      if (!entry || entry.freeAccess.granted) continue;
      assert.doesNotMatch(JSON.stringify(t), /free access|complimentary|comped|sponsored by/i, t.slug);
    }
  });
});
