import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { taskTagsFor } from "@/data/task-tags";
import { quizToRecommendationInput } from "@/lib/quiz-map";
import { scorePlatform } from "@/lib/recommendations-score";
import {
  AUDIT_9_CATEGORIES,
  AUDIT_9_CREATES,
  AUDIT_9_PATCHES,
  CAREER_CATEGORY,
  CHECKED_AT,
  COST_TIERS,
  DIFFICULTIES,
  PRIVACY_LEVELS,
  audit9CategoryData,
  audit9CreateData,
  audit9UpdateData,
  diffAudit9,
  planCreate,
  type Audit9Patch,
  type Audit9Row,
} from "./audit-9";

const schema = () => readFileSync(join(process.cwd(), "prisma/schema.prisma"), "utf8");
const enumValues = (name: string) =>
  (new RegExp(`enum ${name} \\{([^}]*)\\}`).exec(schema())?.[1] ?? "").split(/\s+/).filter(Boolean);
const liveCategories = () => readFileSync(join(process.cwd(), "scripts/restructure-categories-2026-05.ts"), "utf8");
const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

const CAREER_SLUGS = ["teal", "kickresume", "rezi"] as const;

describe("catalog audit 9: Career & Job Search category", () => {
  it("is a new slug in the existing naming style, after the 20 live categories", () => {
    const live = liveCategories();
    assert.equal(CAREER_CATEGORY.slug, "career-job-search");
    assert.match(CAREER_CATEGORY.slug, /^[a-z]+(-[a-z]+)+$/);
    assert.ok(!live.includes(`slug: "${CAREER_CATEGORY.slug}"`), "already a live category");
    assert.ok(!live.includes(`name: "${CAREER_CATEGORY.name}"`), "name is unique in the schema");
    const orders = [...live.matchAll(/sortOrder: (\d+), name:/g)].map((m) => Number(m[1]));
    assert.equal(CAREER_CATEGORY.sortOrder, Math.max(...orders) + 1);
    assert.deepEqual(Object.keys(audit9CategoryData(CAREER_CATEGORY)).sort(), ["description", "icon", "name", "slug", "sortOrder"]);
    assert.deepEqual(AUDIT_9_CATEGORIES, [CAREER_CATEGORY]);
  });
});

describe("catalog audit 9: new career rows", () => {
  it("dates and sources every change, using real enum values", () => {
    assert.equal(CHECKED_AT, "2026-10-26");
    assert.deepEqual(enumValues("CostTier"), [...COST_TIERS]);
    assert.deepEqual(enumValues("Difficulty"), [...DIFFICULTIES]);
    assert.deepEqual(enumValues("PrivacyLevel"), [...PRIVACY_LEVELS]);
    for (const change of [...AUDIT_9_CREATES, ...AUDIT_9_PATCHES]) {
      assert.equal(change.checkedAt, CHECKED_AT);
      assert.ok(change.sources.length > 0);
      for (const url of change.sources) assert.match(url, /^https:\/\//);
      assert.doesNotMatch(change.sources.join(" "), /(twitter|x)\.com\//);
    }
  });

  it("creates exactly Teal, Kickresume and Rezi in the new category", () => {
    assert.deepEqual(AUDIT_9_CREATES.map((c) => c.row.slug), [...CAREER_SLUGS]);
    for (const c of AUDIT_9_CREATES) assert.equal(c.categorySlug, CAREER_CATEGORY.slug);
  });

  it("each row has every field the seed scripts set, an official website, a fact file and task tags", () => {
    for (const create of AUDIT_9_CREATES) {
      const { row } = create;
      for (const key of ["name", "company", "website", "primaryUse", "primaryUseCases", "description", "currentPricing", "freeTierFeatures"] as const) {
        assert.ok(row[key].trim(), `${row.slug} ${key}`);
      }
      assert.ok(row.platformType.length && row.idealUserTypes.length && row.contentTypes.length && row.outputFormats.length, row.slug);
      assert.match(row.website, /^https:\/\//);
      // Sources and facts come from the tool's own domain only.
      for (const url of create.sources) assert.equal(host(url), host(row.website), url);
      const facts = getToolFacts(row.slug);
      assert.ok(facts, `${row.slug} fact file`);
      for (const key of ["company", "freeTier", "plans", "features"] as const) {
        const url: string | undefined = facts[key]?.sourceUrl;
        assert.ok(url, `${row.slug} ${key}`);
        assert.equal(host(url), host(row.website), `${row.slug} ${key}`);
      }
      assert.equal(facts.company?.value, row.company);
      assert.equal(row.costTier, "FREEMIUM");
      assert.equal(facts.freeTier?.value.available, true);
      assert.ok(taskTagsFor(row.slug)?.includes("resume"), row.slug);
      assert.ok(taskTagsFor(row.slug)?.includes("cover-letter"), row.slug);
      // Every price in the row text is a price the fact file lists.
      for (const price of row.currentPricing.match(/\$\d+/g) ?? []) {
        assert.ok(facts.plans?.value.some((p) => p.price.startsWith(price)), `${row.slug} ${price}`);
      }
      // No sponsorship, referral or affiliate material, no email or postal address.
      assert.doesNotMatch(JSON.stringify(create), /sponsor|affiliate|referral|ref=|utm_|@|Miami|Ave\b|\bSuite\b/i);
      assert.doesNotMatch(JSON.stringify(row), /unverified/i);
    }
  });

  it("seeds the career rows as each other's direct alternatives, and leaves other curated fields empty", () => {
    const names = new Set(AUDIT_9_CREATES.map((c) => c.row.name));
    for (const create of AUDIT_9_CREATES) {
      const data = audit9CreateData(create, "cat-id");
      assert.equal(data.categoryId, "cat-id");
      assert.equal(data.slug, create.row.slug);
      assert.equal(data.featured, false);
      assert.equal(data.verified, true);
      assert.ok(data.directAlternatives.length > 0);
      for (const name of data.directAlternatives) {
        assert.ok(names.has(name) && name !== create.row.name, `${create.row.slug}: ${name}`);
      }
      assert.deepEqual([data.complementaryTools, data.budgetAlternativeTo, data.privacyAlternativeTo], [[], [], []]);
    }
  });

  it("the quiz's Writing & content goal reaches every career row", () => {
    const input = quizToRecommendationInput({ goal: "content_creation", experience: "beginner", budget: "free", runtime: "cloud" });
    for (const { row } of AUDIT_9_CREATES) {
      const scored = scorePlatform(
        { ...audit9CreateData({ row } as (typeof AUDIT_9_CREATES)[number], "cat-id"), mobileWebFriendly: true, hasMobileApp: row.platformType.includes("mobile") },
        input,
      );
      assert.ok(scored.goalScore > 0, row.slug);
    }
  });
});

const patchFor = (slug: string) => {
  const patch = AUDIT_9_PATCHES.find((p) => p.slug === slug);
  assert.ok(patch, slug);
  return patch;
};

describe("catalog audit 9: row fixes from the official pages", () => {
  it("patches only rows with a fact file sourced from the same page, and every price matches the facts", () => {
    for (const patch of AUDIT_9_PATCHES) {
      const facts = getToolFacts(patch.slug);
      assert.ok(facts, patch.slug);
      const factUrls = (["freeTier", "plans", "apiPricing", "models", "features", "usageLimits", "company", "officialUrl"] as const)
        .map((k) => facts[k]?.sourceUrl)
        .filter(Boolean);
      assert.ok(patch.sources.some((u) => factUrls.includes(u)), `${patch.slug} cites its fact source`);
      const plans = facts.plans?.value ?? [];
      for (const price of patch.fields?.currentPricing?.match(/\$\d+(\.\d+)?(?!,)/g) ?? []) {
        const inFacts =
          (price === "$0" && facts.freeTier?.value.available === true) ||
          plans.some((p) => `${p.price} ${p.limits}`.includes(price));
        assert.ok(inFacts, `${patch.slug} ${price}`);
      }
      assert.doesNotMatch(JSON.stringify(patch), /unverified|sponsor|affiliate|@/i);
    }
  });

  it("fixes the contradicted Part 3 fields and nothing else", () => {
    assert.deepEqual(Object.keys(patchFor("grammarly").fields ?? {}), ["currentPricing"]);
    assert.match(patchFor("perplexity-ai").fields?.freeTierFeatures ?? "", /3 Pro Searches a day/);
    assert.match(patchFor("ideogram").fields?.freeTierFeatures ?? "", /30 credits a week/);
    assert.doesNotMatch(patchFor("notion-ai").fields?.currentPricing ?? "", /add-on/);
    assert.deepEqual(patchFor("notion-ai").guarded?.website, { from: "https://notion.so", to: "https://www.notion.com" });
    assert.deepEqual(patchFor("recraft").guarded?.costTier, { from: "FREE", to: "FREEMIUM" });
    assert.equal(patchFor("recraft").fields, undefined);
  });

  it("applies to the seeded rows, then is a no-op on re-run", () => {
    const seeded: Audit9Row = {
      description: null,
      currentPricing: "Free: basic corrections only; Premium: $12/mo advanced rewrites + tone; Business: $15/user/mo",
      freeTierFeatures: "Free: basic grammar/spelling/punctuation; tone detection; limited AI suggestions",
      primaryUse: "AI writing assistant for grammar, tone, and clarity",
      website: "https://grammarly.com",
      costTier: "FREEMIUM",
      directAlternatives: [],
    };
    const diffs = diffAudit9(seeded, patchFor("grammarly"));
    assert.deepEqual(diffs.map((d) => d.field), ["currentPricing"]);
    assert.deepEqual(diffAudit9({ ...seeded, ...audit9UpdateData(diffs) } as Audit9Row, patchFor("grammarly")), []);
    const recraft: Audit9Row = { ...seeded, website: "https://recraft.ai", costTier: "FREE" };
    assert.deepEqual(audit9UpdateData(diffAudit9(recraft, patchFor("recraft"))), { costTier: "FREEMIUM" });
  });
});

describe("catalog audit 9: #99 follow-ups", () => {
  it("gives MiniMax real catalog tools as alternatives, add-only", () => {
    const patch = patchFor("minimax");
    assert.deepEqual(patch.addDirectAlternatives, ["DeepSeek", "Qwen", "Kimi", "OpenRouter"]);
    for (const name of patch.addDirectAlternatives ?? []) assert.ok(getToolFacts(name.toLowerCase()), `${name} is a catalog tool`);
    assert.equal(patch.fields, undefined);
    const minimax: Audit9Row = { ...baseRow, directAlternatives: [] };
    assert.deepEqual(audit9UpdateData(diffAudit9(minimax, patch)), { directAlternatives: ["DeepSeek", "Qwen", "Kimi", "OpenRouter"] });
    assert.deepEqual(diffAudit9({ ...minimax, directAlternatives: ["DeepSeek", "Qwen", "Kimi", "OpenRouter"] }, patch), []);
  });

  it("points Kimi's website at www.kimi.ai only while it is still www.kimi.com", () => {
    const patch = patchFor("kimi");
    assert.deepEqual(patch.guarded?.website, { from: "https://www.kimi.com", to: "https://www.kimi.ai" });
    assert.ok(patch.sources.includes("https://www.moonshot.ai/"));
    assert.deepEqual(audit9UpdateData(diffAudit9({ ...baseRow, website: "https://www.kimi.com" }, patch)), { website: "https://www.kimi.ai" });
    assert.deepEqual(diffAudit9({ ...baseRow, website: "https://www.kimi.ai" }, patch), []);
    // Real official source pages stay where they are.
    assert.equal(getToolFacts("kimi")?.company?.sourceUrl, "https://www.kimi.com/");
  });

  it("registers MiniMax's logo from its official og:image", () => {
    const assets = JSON.parse(readFileSync(join(process.cwd(), "src/lib/platform-logo-assets.json"), "utf8"));
    assert.equal(assets.minimax, "minimax-hq.png");
    const logos = JSON.parse(readFileSync(join(process.cwd(), "public/images/platforms/catalog-logos.json"), "utf8"));
    const entry = logos.find((l: { slug: string }) => l.slug === "minimax");
    assert.equal(entry?.file, "minimax-hq.png");
    assert.match(entry?.source ?? "", /^https:\/\/filecdn\.minimax\.chat\//);
    const png = readFileSync(join(process.cwd(), "public/images/platforms/minimax-hq.png"));
    assert.equal(png.subarray(1, 4).toString(), "PNG");
  });
});

const baseRow: Audit9Row = {
  description: "Old description",
  currentPricing: "Old pricing",
  freeTierFeatures: "Old free tier",
  primaryUse: "Old use",
  website: "https://old.example",
  costTier: "FREE",
  directAlternatives: ["Alpha"],
};

const samplePatch: Audit9Patch = {
  slug: "sample",
  finding: "test",
  sources: ["https://example.com"],
  checkedAt: CHECKED_AT,
  fields: { currentPricing: "New pricing", freeTierFeatures: "Old free tier" },
  guarded: { website: { from: "https://old.example", to: "https://new.example" }, costTier: { from: "FREE", to: "FREEMIUM" } },
  addDirectAlternatives: ["alpha", "Beta"],
};

describe("catalog audit 9 diff logic", () => {
  it("creates only a missing row or category", () => {
    assert.equal(planCreate(false), "create");
    assert.equal(planCreate(true), "done");
  });

  it("changes only differing text, guarded fields still at their old value, and missing alternatives", () => {
    const diffs = diffAudit9(baseRow, samplePatch);
    assert.deepEqual(diffs.map((d) => d.field), ["currentPricing", "website", "costTier", "directAlternatives"]);
    const data = audit9UpdateData(diffs);
    assert.deepEqual(data.directAlternatives, ["Alpha", "Beta"]);
    const after = { ...baseRow, ...data } as Audit9Row;
    assert.deepEqual(diffAudit9(after, samplePatch), [], "a re-run is a no-op");
  });

  it("leaves a hand-edited guarded field alone and never removes alternatives", () => {
    const edited = { ...baseRow, website: "https://hand.example", costTier: "PAID", directAlternatives: ["Alpha", "Beta", "Gamma"] };
    assert.deepEqual(diffAudit9(edited, samplePatch).map((d) => d.field), ["currentPricing"]);
  });

  it("the runner defaults to dry-run, uses the prod guard, never deletes and prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-9.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /if \(dryRun\) \{\s*pendingCategories\.add\(category\.slug\);\s*continue;\s*\}\s*await prisma\.category\.create/);
    assert.match(source, /if \(dryRun \|\| !category\) continue;\s*await prisma\.platform\.create/);
    assert.match(source, /if \(dryRun\) continue;\s*await prisma\.platform\.update/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*\.(to|description|currentPricing|freeTierFeatures|website|primaryUse)\b/);
    assert.doesNotMatch(source, /\.(createMany|delete|deleteMany|upsert)\(/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-9"], "tsx scripts/update-catalog-audit-9.ts");
  });
});
