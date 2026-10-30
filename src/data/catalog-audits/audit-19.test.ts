import assert from "node:assert/strict";
import { AUDIT_27_FACT_UPDATES, CHECKED_AT as AUDIT_27_CHECKED_AT } from "./audit-27";
import { AUDIT_27_PATCHES } from "./audit-27";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { isPublishedVerified } from "@/data/facts/walk";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { saysTrialOnly } from "@/lib/mcp/label-consistency";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { audit10Slugs } from "./audit-10";
import { AUDIT_11_PATCHES, audit11Slugs } from "./audit-11";
import { AUDIT_17_BATCH, AUDIT_17_PATCHES, audit17PatchData, type Audit17Row } from "./audit-17";
import { AUDIT_18_BATCH, AUDIT_18_PATCHES, audit18PatchData, type Audit18Row } from "./audit-18";
import {
  ANTIGRAVITY_ALTERNATIVES,
  ANTIGRAVITY_CATEGORY_SLUG,
  ANTIGRAVITY_ROW,
  ANTIGRAVITY_SLUG,
  ANTIGRAVITY_SOURCES,
  AUDIT_19_BATCH,
  AUDIT_19_BATCH2_RECHECK,
  AUDIT_19_NO_FACT_FILE,
  AUDIT_19_OTHER,
  AUDIT_19_PATCHES,
  CHECKED_AT,
  antigravityCreateData,
  antigravityCurrentPricing,
  audit19GuardSkips,
  audit19PatchData,
  type Audit19Patch,
  type Audit19Row,
} from "./audit-19";
import { CHECKED_AT as AUDIT_22_CHECKED_AT } from "./audit-22";
const AUDIT_22_FACT_KEYS = new Set(["displayName", "officialUrl", "status"]);

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug);
const patch19 = (slug: string) => AUDIT_19_PATCHES.find((p) => p.slug === slug)!;

/** The prod-guard section every audit script shares, from getDirectUrl up to the Prisma client. */
const guardSection = (file: string) => {
  const s = readFileSync(join(process.cwd(), file), "utf8");
  return s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
};

/** The snapshot row (audit 19 already applied) in the shape every audit's diff takes. */
const rowOf = (slug: string): Audit19Row & Audit18Row & Audit17Row => {
  const r = snap(slug)!;
  return {
    company: r.company ?? null,
    website: r.website ?? null,
    primaryUse: r.primaryUse ?? null,
    currentPricing: r.currentPricing ?? null,
    freeTierFeatures: r.freeTierFeatures ?? null,
    usageLimits: r.usageLimits ?? null,
    upgradeTriggers: r.upgradeTriggers ?? null,
    costTier: r.costTier,
    apiAvailable: r.apiAvailable,
    privacyLevel: r.privacyLevel ?? null,
    directAlternatives: [...(r.directAlternatives ?? [])],
  };
};

/** Every field audit 19 writes on a row. */
const ownedFields = (p: Audit19Patch) => [
  ...Object.keys(p.fields),
  ...Object.keys(p.guarded ?? {}),
  ...(p.addDirectAlternatives?.length ? ["directAlternatives"] : []),
];

const row = (over: Partial<Audit19Row> = {}): Audit19Row => ({
  company: "Old Co",
  website: "https://old.example",
  primaryUse: null,
  currentPricing: null,
  freeTierFeatures: null,
  usageLimits: null,
  upgradeTriggers: null,
  costTier: "FREE",
  apiAvailable: false,
  privacyLevel: "HIGH",
  directAlternatives: [],
  ...over,
});

describe("catalog audit 19: stale facts batch 3", () => {
  it("covers exactly the 22 batch-3 slugs, each with a fact file unless every page was blocked", () => {
    assert.equal(AUDIT_19_BATCH.length, 22);
    assert.equal(new Set(AUDIT_19_BATCH).size, 22);
    for (const slug of AUDIT_19_BATCH) {
      // Audit 20 adds the Quizlet fact file from the Research Analyst browser check (2026-10-29).
      if (AUDIT_19_NO_FACT_FILE[slug] && slug !== "quizlet-q-chat") assert.equal(getToolFacts(slug), undefined, slug);
      else assert.ok(getToolFacts(slug), `${slug}: fact file registered`);
    }
    assert.deepEqual(Object.keys(AUDIT_19_NO_FACT_FILE), ["quizlet-q-chat"]);
    for (const p of AUDIT_19_PATCHES) {
      assert.ok([...AUDIT_19_BATCH, ...AUDIT_19_BATCH2_RECHECK, ...AUDIT_19_OTHER].includes(p.slug), p.slug);
      assert.ok(snap(p.slug), `${p.slug}: row exists`);
    }
    assert.equal(new Set(AUDIT_19_PATCHES.map((p) => p.slug)).size, AUDIT_19_PATCHES.length);
  });

  it("re-checks 9 batch-2 rows from the browser check, all of them audit-18 slugs with fact files", () => {
    assert.equal(AUDIT_19_BATCH2_RECHECK.length, 9);
    for (const slug of AUDIT_19_BATCH2_RECHECK) {
      assert.ok(AUDIT_18_BATCH.includes(slug), slug);
      assert.ok(getToolFacts(slug), slug);
    }
  });

  it("skips the rows done in #115/#116, batch 1 (audit 17) and batch 2 (audit 18)", () => {
    for (const slug of [...AUDIT_17_BATCH, ...AUDIT_18_BATCH]) assert.equal(AUDIT_19_BATCH.includes(slug), false, slug);
    for (const slug of ["tabnine", "clarifai", "hermes-agent", "canva-ai-magic-studio", "lindy-ai", "scite", "activepieces"]) {
      assert.equal(AUDIT_19_BATCH.includes(slug), false, slug);
    }
  });
});

describe("catalog audit 19: no conflict with earlier audits", () => {
  it("writes the same text as audits 17 and 18 on every field they share, and the same guarded targets", () => {
    for (const p of AUDIT_19_PATCHES) {
      for (const earlier of [AUDIT_17_PATCHES.find((x) => x.slug === p.slug), AUDIT_18_PATCHES.find((x) => x.slug === p.slug)]) {
        if (!earlier) continue;
        for (const [field, text] of Object.entries(p.fields)) {
          const other: string | undefined = (earlier.fields as Record<string, string | undefined>)[field];
          if (other !== undefined) assert.equal(other, text, `${p.slug}.${field}`);
        }
        for (const key of Object.keys(p.guarded ?? {}) as (keyof NonNullable<Audit19Patch["guarded"]>)[]) {
          const theirs: { to: unknown } | undefined = (earlier.guarded as Record<string, { to: unknown } | undefined> | undefined)?.[key];
          if (theirs) assert.equal(theirs.to, p.guarded![key]!.to, `${p.slug}.${key}`);
        }
      }
    }
  });

  it("re-running audit 17 or 18 after this one changes none of the fields this one owns", () => {
    let shared = 0;
    for (const p of AUDIT_19_PATCHES) {
      const owned = new Set(ownedFields(p));
      const after = rowOf(p.slug);
      const p17 = AUDIT_17_PATCHES.find((x) => x.slug === p.slug);
      const p18 = AUDIT_18_PATCHES.find((x) => x.slug === p.slug);
      for (const data of [p17 && audit17PatchData(after, p17), p18 && audit18PatchData(after, p18)]) {
        if (!data) continue;
        shared += 1;
        for (const key of Object.keys(data)) assert.equal(owned.has(key), false, `${p.slug}.${key} would be reverted`);
      }
      // Audit 27 (2026-10-30) later rewrote some of these fields from a fresh vendor read; only the rest must match.
      const later = Object.keys(AUDIT_27_PATCHES.find((x) => x.slug === p.slug)?.fields ?? {});
      const left = Object.fromEntries(Object.entries(audit19PatchData(after, p)).filter(([k]) => !later.includes(k)));
      assert.deepEqual(left, {}, `${p.slug}: snapshot already has audit 19 applied`);
    }
    // gpt-image is in both 17 and 18; gemini-cli, leonardo, trinka, designer, codex, power automate and dragon in 18.
    assert.equal(shared, 9);
  });

  it("only audit 19 writes upgradeTriggers and directAlternatives among the stale-facts audits", () => {
    for (const p of [...AUDIT_17_PATCHES, ...AUDIT_18_PATCHES]) {
      assert.equal("upgradeTriggers" in p.fields, false, p.slug);
      assert.equal("directAlternatives" in p, false, p.slug);
    }
  });

  it("touches no slug that audit 10 patches, so re-running it cannot revert this one", () => {
    const earlier = new Set(audit10Slugs());
    for (const p of AUDIT_19_PATCHES) assert.equal(earlier.has(p.slug), false, p.slug);
    assert.equal(earlier.has(ANTIGRAVITY_SLUG), false);
  });

  it("shares only canopy-tax and squarespace-ai with audit 11, and never writes the cost tier audit 11 owns there", () => {
    const touched = [...AUDIT_19_PATCHES.map((p) => p.slug), ...AUDIT_19_BATCH, ...AUDIT_19_BATCH2_RECHECK];
    const shared = [...new Set(touched.filter((slug) => audit11Slugs().includes(slug)))].sort();
    assert.deepEqual(shared, ["canopy-tax", "squarespace-ai"]);
    for (const slug of shared) {
      const a11 = AUDIT_11_PATCHES.find((p) => p.slug === slug)!;
      assert.equal(a11.fields, undefined, `audit 11 is tier-only on ${slug}`);
      assert.equal(AUDIT_19_PATCHES.find((p) => p.slug === slug)?.guarded?.costTier, undefined, slug);
      assert.equal(snap(slug)?.costTier, a11.guarded!.costTier!.to, slug);
    }
  });
});

describe("catalog audit 19: content rules", () => {
  it("stamps every fact checked today, with vendor sources and no affiliate links", () => {
    for (const slug of [...AUDIT_19_BATCH, ...AUDIT_19_BATCH2_RECHECK, ANTIGRAVITY_SLUG]) {
      const facts = getToolFacts(slug);
      if (!facts) continue;
      for (const [key, fact] of Object.entries(facts)) {
        if (!fact || typeof fact !== "object" || !("sourceUrl" in fact)) continue;
        // Catalog audit 22 (2026-10-30) adds displayName / officialUrl / status to renamed rows.
        if (AUDIT_22_FACT_KEYS.has(key) && fact.checkedAt === AUDIT_22_CHECKED_AT) continue;
        // Catalog audit 27 (2026-10-30) re-read these price facts.
        if (AUDIT_27_FACT_UPDATES[slug]?.includes(key) && fact.checkedAt === AUDIT_27_CHECKED_AT) continue;
        assert.equal(fact.checkedAt, CHECKED_AT, `${slug}.${key}`);
        assert.match(fact.sourceUrl, /^https:\/\//, `${slug}.${key}`);
        assert.doesNotMatch(fact.sourceUrl, /via=|ref=|affiliate|utm_|\/\/(?:www\.)?x\.com|twitter\.com/i, `${slug}.${key}`);
        if (fact.status === "verified") assert.ok(isPublishedVerified(fact), `${slug}.${key}: second reader recorded`);
      }
    }
  });

  it("writes dated text that never claims to be official and never says trial-only under a free tier", () => {
    for (const p of AUDIT_19_PATCHES) {
      assert.equal(p.checkedAt, CHECKED_AT, p.slug);
      assert.ok(p.sources.length > 0, p.slug);
      const tier = p.guarded?.costTier?.to ?? snap(p.slug)?.costTier;
      for (const [field, text] of Object.entries(p.fields)) {
        if (field !== "primaryUse" && field !== "upgradeTriggers") assert.match(text, new RegExp(`as of ${CHECKED_AT}`), `${p.slug}.${field}`);
        assert.equal(claimsOfficial(text), false, `${p.slug}.${field}`);
        assert.doesNotMatch(text, /via=|affiliate|referral|sponsor|utm_/i, `${p.slug}.${field}`);
        if (tier === "FREE" || tier === "FREEMIUM") assert.equal(saysTrialOnly(text), false, `${p.slug}.${field}`);
      }
    }
  });

  it("matches each cost tier to the fact file's free tier", () => {
    for (const slug of [...AUDIT_19_BATCH, ...AUDIT_19_BATCH2_RECHECK]) {
      const tier = AUDIT_19_PATCHES.find((p) => p.slug === slug)?.guarded?.costTier?.to ?? snap(slug)?.costTier;
      const free = getToolFacts(slug)?.freeTier?.value;
      if (!free) continue;
      if (free.available) assert.ok(tier === "FREE" || tier === "FREEMIUM" || tier === "ENTERPRISE", `${slug}: ${tier}`);
      else assert.ok(tier === "PAID" || tier === "ENTERPRISE", `${slug}: ${tier}`);
    }
  });

  it("follows the findings named in the brief and the batch-2 browser check", () => {
    // Khanmigo: free for teachers only.
    assert.equal(snap("khan-academy-khanmigo")?.costTier, "FREEMIUM");
    assert.match(snap("khan-academy-khanmigo")?.freeTierFeatures ?? "", /^Free for teachers/);
    // Semrush: Adobe-owned, published prices, free account.
    assert.equal(snap("semrush-ai")?.costTier, "FREEMIUM");
    assert.equal(snap("semrush-ai")?.company, "Semrush (an Adobe company)");
    assert.doesNotMatch(snap("semrush-ai")?.currentPricing ?? "", /Guru|129\.95/);
    // Speak: trial only, trains on audio.
    assert.equal(snap("speak-language-ai")?.costTier, "PAID");
    assert.equal(snap("speak-language-ai")?.privacyLevel, "LOW");
    // Glasp, Lyria, Beatoven: no longer FREE.
    for (const slug of ["glasp", "google-lyria-3", "beatoven-ai"]) assert.equal(snap(slug)?.costTier, "FREEMIUM", slug);
    // Lyria: MusicFX is gone.
    assert.doesNotMatch(snap("google-lyria-3")?.currentPricing ?? "", /^Free \(MusicFX\)/);
    // Udio: downloads disabled.
    assert.match(snap("udio")?.freeTierFeatures ?? "", /downloads .* disabled/);
    // Murf: company and website filled in.
    assert.equal(snap("murf-ai")?.company, "Murf Inc.");
    assert.equal(snap("murf-ai")?.website, "https://murf.ai");
    // Batch-2 browser check.
    assert.match(snap("openai-codex-cli")?.freeTierFeatures ?? "", /CLI is included from ChatGPT Free and Go/);
    assert.equal(snap("openai-codex-cli")?.costTier, "FREEMIUM");
    assert.match(snap("leonardo-ai")?.usageLimits ?? "", /^Fast tokens a month: Essential 8,500/);
    assert.match(snap("leonardo-ai")?.freeTierFeatures ?? "", /free plan can be used to train/);
    assert.match(snap("microsoft-power-automate")?.freeTierFeatures ?? "", /30-day premium trial/);
    assert.match(snap("dragon-medical-one")?.usageLimits ?? "", /2021\.4\.5 and earlier stop working after December 31, 2026/);
    assert.match(getToolFacts("dragon-medical-one")?.status?.value.headline ?? "", /December 31, 2026/);
    assert.equal(getToolFacts("healthee")?.privacy?.value.trainsOnData, false);
    assert.ok(isPublishedVerified(getToolFacts("healthee")!.privacy!));
    assert.equal(getToolFacts("healthee")?.privacy?.sourceUrl, "https://healthee.com/faqs/");
    assert.doesNotMatch(snap("gpt-image-1-5-dall-e-successor")?.upgradeTriggers ?? "", /3 images/);
    // Gemini CLI stays PAID.
    assert.equal(snap("gemini-cli")?.costTier, "PAID");
  });
});

describe("catalog audit 19: dry run and guards", () => {
  it("dry run against the pre-audit row reports changes; a re-run against the patched row reports 0", () => {
    let changed = 0;
    for (const p of AUDIT_19_PATCHES) {
      const pre = rowOf(p.slug);
      // The committed snapshot already has audit 19 applied, so start from the pre-audit values.
      const g = p.guarded ?? {};
      if (g.company) pre.company = g.company.from[0];
      if (g.website) pre.website = g.website.from[0];
      if (g.costTier) pre.costTier = g.costTier.from;
      if (g.apiAvailable) pre.apiAvailable = g.apiAvailable.from;
      if (g.privacyLevel) pre.privacyLevel = g.privacyLevel.from;
      for (const field of Object.keys(p.fields) as (keyof typeof p.fields)[]) pre[field] = "stale";
      if (p.addDirectAlternatives) pre.directAlternatives = pre.directAlternatives!.filter((n) => !p.addDirectAlternatives!.includes(n));
      const data = audit19PatchData(pre, p);
      if (Object.keys(data).length) changed += 1;
      const after = { ...pre, ...data } as Audit19Row;
      assert.deepEqual(audit19PatchData(after, p), {}, `${p.slug}: re-run is a no-op`);
      assert.deepEqual(audit19GuardSkips(after, p), [], p.slug);
    }
    assert.equal(changed, AUDIT_19_PATCHES.length);
  });

  it("matches the expected dry run: batch 3 18 rows / 80 fields, batch-2 re-check 7 rows / 18 fields, other 2 rows / 2 fields", () => {
    const part = (slugs: string[]) => AUDIT_19_PATCHES.filter((p) => slugs.includes(p.slug));
    const tally = (patches: Audit19Patch[]) => {
      const count = (k: "website" | "costTier" | "company" | "apiAvailable" | "privacyLevel") =>
        patches.filter((p) => p.guarded?.[k]).length;
      return {
        rows: patches.length,
        text: patches.reduce((n, p) => n + Object.keys(p.fields).length, 0),
        website: count("website"),
        costTier: count("costTier"),
        company: count("company"),
        apiAvailable: count("apiAvailable"),
        privacyLevel: count("privacyLevel"),
        alternatives: patches.filter((p) => p.addDirectAlternatives?.length).length,
      };
    };
    assert.deepEqual(tally(part(AUDIT_19_BATCH)), { rows: 18, text: 62, website: 7, costTier: 8, company: 2, apiAvailable: 0, privacyLevel: 1, alternatives: 0 });
    assert.deepEqual(tally(part(AUDIT_19_BATCH2_RECHECK)), { rows: 7, text: 18, website: 0, costTier: 0, company: 0, apiAvailable: 0, privacyLevel: 0, alternatives: 0 });
    assert.deepEqual(tally(part(AUDIT_19_OTHER)), { rows: 2, text: 1, website: 0, costTier: 0, company: 0, apiAvailable: 0, privacyLevel: 0, alternatives: 1 });
  });

  it("leaves a hand-edited guarded field alone and reports it; null company and website are fillable", () => {
    const p: Audit19Patch = {
      slug: "x",
      finding: "",
      sources: ["https://example.com"],
      checkedAt: CHECKED_AT,
      fields: {},
      guarded: {
        company: { from: ["Old Co", null], to: "New Co" },
        website: { from: ["https://old.example", null], to: "https://new.example" },
        costTier: { from: "FREE", to: "PAID" },
        apiAvailable: { from: false, to: true },
        privacyLevel: { from: "HIGH", to: "LOW" },
      },
      addDirectAlternatives: ["Alt Tool"],
    };
    assert.deepEqual(audit19PatchData(row(), p), {
      company: "New Co",
      website: "https://new.example",
      costTier: "PAID",
      apiAvailable: true,
      privacyLevel: "LOW",
      directAlternatives: ["Alt Tool"],
    });
    assert.deepEqual(audit19PatchData(row({ company: null, website: null }), p).company, "New Co");
    const edited = row({ company: "Hand Co", website: "https://hand.example", costTier: "FREEMIUM", apiAvailable: undefined, privacyLevel: "MEDIUM", directAlternatives: ["alt tool"] });
    assert.deepEqual(audit19PatchData(edited, p), {});
    assert.deepEqual(audit19GuardSkips(edited, p), ["company", "website", "costTier", "apiAvailable", "privacyLevel"]);
  });
});

describe("catalog audit 19: Antigravity CLI row (create only) and the Gemini CLI cross-link", () => {
  it("is not in the snapshot yet, so the dry run reports 1 create; a re-run reports 0", () => {
    assert.equal(snap(ANTIGRAVITY_SLUG), undefined);
    assert.ok(antigravityCreateData(false, "cat-id"));
    assert.equal(antigravityCreateData(true, "cat-id"), null);
    assert.equal(antigravityCreateData(false, null), null);
    assert.equal(snap("gemini-cli")?.category?.slug, ANTIGRAVITY_CATEGORY_SLUG);
  });

  it("has the same fields as an existing row and names only rows that exist", () => {
    const keys = Object.keys(snap("gemini-cli")!).filter((k) => !["updatedAt", "category", "iosAppUrl", "androidAppUrl"].includes(k));
    for (const key of keys) assert.ok(key in ANTIGRAVITY_ROW, key);
    const names = new Set(snapshotRows().map((r) => r.name));
    for (const name of [...ANTIGRAVITY_ALTERNATIVES, ...ANTIGRAVITY_ROW.complementaryTools, ...ANTIGRAVITY_ROW.budgetAlternativeTo]) {
      assert.ok(names.has(name), name);
    }
  });

  it("is FREEMIUM, privacy MEDIUM (Enable Telemetry opt-out, audit 21), not open source, and states no request-rate numbers", () => {
    assert.equal(ANTIGRAVITY_ROW.costTier, "FREEMIUM");
    assert.equal(ANTIGRAVITY_ROW.privacyLevel, "MEDIUM");
    const text = JSON.stringify(ANTIGRAVITY_ROW);
    assert.doesNotMatch(text.replace(/not open source/g, ""), /open[- ]source|apache|\bMIT\b/i);
    assert.doesNotMatch(text, /\d+\s*(requests?|RPM|RPD)\b|per (minute|day):? \d/i);
    assert.match(ANTIGRAVITY_ROW.usageLimits, /numeric requests per minute or per day are not stated/);
    for (const key of ["description", "currentPricing", "freeTierFeatures", "usageLimits"] as const) {
      assert.match(ANTIGRAVITY_ROW[key], new RegExp(`as of ${CHECKED_AT}`), key);
      assert.equal(claimsOfficial(ANTIGRAVITY_ROW[key]), false, key);
    }
    assert.doesNotMatch(text, /via=|affiliate|referral|sponsor|utm_/i);
    const facts = getToolFacts(ANTIGRAVITY_SLUG)!;
    assert.equal(facts.privacy?.value.trainsOnData, true);
    assert.match(facts.privacy?.note ?? "", /Enable Telemetry setting/);
    assert.ok(facts.features?.value.some((f) => /Not open source/.test(f)));
  });

  it("builds its pricing from the fact file, with the browser-checked Google AI prices", () => {
    assert.equal(ANTIGRAVITY_ROW.currentPricing, antigravityCurrentPricing());
    assert.match(ANTIGRAVITY_ROW.currentPricing, /Google AI Pro \$19\.99\/mo and Google AI Ultra from \$99\.99\/mo/);
    const facts = getToolFacts(ANTIGRAVITY_SLUG)!;
    for (const key of ["plans", "freeTier", "officialUrl", "privacy"] as const) assert.ok(isPublishedVerified(facts[key]!), key);
    assert.equal(facts.freeTier?.value.available, true);
    for (const url of ANTIGRAVITY_SOURCES) {
      assert.match(url, /^https:\/\/(antigravity\.google|gemini\.google|developers\.googleblog\.com)\//, url);
    }
  });

  it("cross-links with Gemini CLI in both directions, in the catalog rows and the guides", () => {
    assert.ok(ANTIGRAVITY_ROW.directAlternatives.includes("Gemini CLI"));
    assert.deepEqual(patch19("gemini-cli").addDirectAlternatives, ["Antigravity CLI"]);
    assert.ok(snap("gemini-cli")?.directAlternatives?.includes("Antigravity CLI"));
    assert.equal(ANTIGRAVITY_ROW.name, "Antigravity CLI");
    const gemini = getStaticTutorialForPlatform("gemini-cli")!;
    assert.ok(gemini.whereToNext.some((w) => w.href === `/platform/${ANTIGRAVITY_SLUG}`));
    const agy = getStaticTutorialForPlatform(ANTIGRAVITY_SLUG)!;
    assert.ok(agy, "antigravity-cli guide registered");
    assert.ok(agy.whereToNext.some((w) => w.href === "/platform/gemini-cli"));
  });
});

describe("catalog audit 19: runner", () => {
  const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-19.ts"), "utf8");

  it("defaults to dry-run, uses the prod guard, updates and creates once, never deletes", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.equal(source.match(/\.update\(/g)?.length, 1);
    assert.equal(source.match(/\.create\(/g)?.length, 1);
    assert.match(source, /if \(dryRun\) continue;\n\s+await prisma\.platform\.update\(\{ where: \{ slug: patch\.slug \}, data \}\)/);
    assert.match(source, /if \(!dryRun\) await prisma\.platform\.create\(\{ data \}\)/);
    assert.doesNotMatch(source, /\.(updateMany|createMany|delete|deleteMany|upsert)\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /`audit19: \$\{rows\} rows \/ \$\{fields\} patched fields, \$\{created\} created/);
    assert.match(source, /cache:revalidate/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-19"], "tsx scripts/update-catalog-audit-19.ts");
  });

  it("shares the prod guard of audits 15-18 byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-19.ts");
    assert.ok(guard.length > 0);
    for (const n of [15, 16, 17, 18]) assert.equal(guard, guardSection(`scripts/update-catalog-audit-${n}.ts`), `audit ${n}`);
  });
});
