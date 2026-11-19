import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { comparePageToolSlugs, COMPARE_PAGES } from "@/data/compare/pages";
import { DISCOVER_POPULAR_SLUGS } from "@/data/discover-popular";
import { listRegisteredToolFacts } from "@/data/facts";
import { LOCAL_CHAT, LOCAL_CODING, LOCAL_IMAGE, QUIZ_DEFAULTS } from "@/data/quiz-defaults";
import { listRegisteredTutorials } from "@/data/tutorials";

/**
 * Live copy must not name or link a discontinued tool (fact-file
 * `lifecycle: "discontinued"`). Renamed and acquired tools are still usable,
 * so their names are never scanned: only the names below are.
 *
 * "Live copy": registered tutorials (src/data/tutorials/*.ts, not retired/),
 * workflows, compare pages, quiz default picks and Discover's Popular list.
 */

/**
 * Names readers knew each discontinued tool by. Matched as whole words,
 * case-insensitively. A tool newly marked discontinued fails the first test
 * until its names are added here.
 */
const DISCONTINUED_NAMES: Readonly<Record<string, readonly string[]>> = {
  clarifai: ["Clarifai"],
  "kakao-brain-karlo": ["Karlo"],
  "naver-hyperclova-x-cue": ["CLOVA X", "Naver Cue"],
  "play-ht": ["PlayHT", "Play.ht", "Play HT"],
  "relay-app": ["Relay.app"],
  "sora-2": ["Sora"],
  tabnine: ["Tabnine"],
};

/**
 * Mentions that are allowed. `phrase` must contain the match and must still be
 * in `file`; an entry that no longer matches anything fails the test, so the
 * list cannot go stale.
 */
const ALLOWED_MENTIONS: readonly { file: string; phrase: string; reason: string }[] = [
  {
    file: "src/data/tutorials/google-veo-3-1-getting-started.ts",
    phrase: "Sora-class tools",
    reason: "Generic wording for a class of video models, not a pointer to the Sora product.",
  },
  {
    file: "src/data/tutorials/higgsfield-getting-started.ts",
    phrase: "Sora 2",
    reason: "Re-check pending: Higgsfield's model list named Sora 2 when the guide was written; the Sora API was discontinued 2026-09-24. Catalog lane to re-verify and edit the guide.",
  },
];

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), "utf8");
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const LIVE_FILES: readonly string[] = [
  ...readdirSync(join(root, "src/data/tutorials"))
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && f !== "types.ts")
    .map((f) => `src/data/tutorials/${f}`),
  "src/data/workflows/workflows.ts",
  "src/data/compare/pages.ts",
  "src/data/quiz-defaults.ts",
  "src/data/discover-popular.ts",
];

const discontinuedSlugs = listRegisteredToolFacts()
  .filter((f) => f.lifecycle === "discontinued")
  .map((f) => f.slug)
  .sort();

describe("discontinued tools: name table", () => {
  it("covers exactly the fact files marked discontinued", () => {
    assert.ok(discontinuedSlugs.length > 0, "expected at least one discontinued fact file");
    assert.deepEqual(Object.keys(DISCONTINUED_NAMES).sort(), discontinuedSlugs);
  });

  it("scans a non-trivial set of live files", () => {
    assert.ok(LIVE_FILES.filter((f) => f.startsWith("src/data/tutorials/")).length > 50);
  });
});

describe("discontinued tools: no live slug references", () => {
  const slugs = new Set(discontinuedSlugs);

  it("not in Discover's Popular list", () => {
    assert.deepEqual(DISCOVER_POPULAR_SLUGS.filter((s) => slugs.has(s)), []);
  });

  it("not a quiz default pick", () => {
    const picks = [
      ...Object.values(QUIZ_DEFAULTS).flatMap((g) => [...g.beginner, ...g.experienced]),
      ...LOCAL_CHAT,
      ...LOCAL_CODING,
      ...LOCAL_IMAGE,
    ];
    assert.deepEqual(picks.map((p) => p.slug).filter((s) => slugs.has(s)), []);
  });

  it("no registered tutorial and no compare page tool", () => {
    assert.deepEqual(listRegisteredTutorials().map((t) => t.platformSlug).filter((s) => slugs.has(s)), []);
    assert.deepEqual(COMPARE_PAGES.flatMap((p) => comparePageToolSlugs(p)).filter((s) => slugs.has(s)), []);
  });

  it("no quoted slug or /platform/<slug> link in any live file", () => {
    const hits: string[] = [];
    for (const file of LIVE_FILES) {
      const text = read(file);
      for (const slug of slugs) {
        const re = new RegExp(`["'\`]${escape(slug)}["'\`]|/platform/${escape(slug)}(?![a-z0-9-])`);
        if (re.test(text)) hits.push(`${file}: ${slug}`);
      }
    }
    assert.deepEqual(hits, []);
  });
});

describe("discontinued tools: no live name mentions", () => {
  const used = new Set<number>();

  it("names appear only where allowlisted", () => {
    const hits: string[] = [];
    for (const file of LIVE_FILES) {
      const text = read(file);
      for (const [slug, names] of Object.entries(DISCONTINUED_NAMES)) {
        for (const name of names) {
          const re = new RegExp(`(?<![A-Za-z0-9])${escape(name)}(?![A-Za-z0-9])`, "gi");
          for (const m of text.matchAll(re)) {
            const at = m.index ?? 0;
            const allowed = ALLOWED_MENTIONS.findIndex((a) => {
              if (a.file !== file) return false;
              for (let p = text.indexOf(a.phrase); p !== -1; p = text.indexOf(a.phrase, p + 1)) {
                if (at >= p && at + m[0].length <= p + a.phrase.length) return true;
              }
              return false;
            });
            if (allowed === -1) {
              const line = text.slice(0, at).split("\n").length;
              hits.push(`${file}:${line} names ${slug} ("${m[0]}")`);
            } else {
              used.add(allowed);
            }
          }
        }
      }
    }
    assert.deepEqual(hits, []);
  });

  it("every allowlist entry still matches a mention (no stale entries)", () => {
    const stale = ALLOWED_MENTIONS.filter((_, i) => !used.has(i)).map((a) => `${a.file}: ${a.phrase}`);
    assert.deepEqual(stale, []);
  });

  it("the matcher catches a discontinued name and ignores names that only contain one", () => {
    const re = (name: string) => new RegExp(`(?<![A-Za-z0-9])${escape(name)}(?![A-Za-z0-9])`, "i");
    assert.ok(re("Tabnine").test("Try Tabnine for code."));
    assert.ok(re("Play.ht").test("voices from play.ht"));
    assert.equal(re("CLOVA X").test("Naver's HyperCLOVA X model"), false);
    assert.equal(re("Sora").test("Soraya"), false);
  });
});
