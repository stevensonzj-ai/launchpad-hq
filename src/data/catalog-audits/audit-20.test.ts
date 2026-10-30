import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { isPublishedVerified } from "@/data/facts/walk";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { saysTrialOnly } from "@/lib/mcp/label-consistency";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { searchTools } from "@/lib/mcp/tools";
import { audit10Slugs } from "./audit-10";
import { AUDIT_11_PATCHES, audit11Slugs } from "./audit-11";
import { AUDIT_15_REF_REMOVALS } from "./audit-15";
import { AUDIT_17_BATCH, AUDIT_17_PATCHES, audit17PatchData, type Audit17Row } from "./audit-17";
import { AUDIT_18_BATCH, AUDIT_18_PATCHES, audit18PatchData, type Audit18Row } from "./audit-18";
import {
  ANTIGRAVITY_ROW,
  AUDIT_19_BATCH,
  AUDIT_19_PATCHES,
  antigravityCurrentPricing,
  antigravityFreeTierFeatures,
  audit19PatchData,
  type Audit19Row,
} from "./audit-19";
import { AUDIT_5_REF_EDITS } from "./audit-5";
import {
  AUDIT_20_BATCH,
  AUDIT_20_BROWSER_CHECK,
  AUDIT_20_DECISIONS,
  AUDIT_20_LEFTOVERS,
  AUDIT_20_NO_FACT_FILE,
  AUDIT_20_NO_ROW_CHANGE,
  AUDIT_20_PATCHES,
  CHECKED_AT,
  MURF_DESCRIPTION_NEW,
  MURF_DESCRIPTION_OLD,
  RESTB_DESCRIPTION,
  audit20GuardSkips,
  audit20PatchData,
  type Audit20Patch,
  type Audit20Row,
} from "./audit-20";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug);
const patch20 = (slug: string) => AUDIT_20_PATCHES.find((p) => p.slug === slug)!;

/** The prod-guard section every audit script shares, from getDirectUrl up to the Prisma client. */
const guardSection = (file: string) => {
  const s = readFileSync(join(process.cwd(), file), "utf8");
  return s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
};

type AnyRow = Audit20Row & Audit19Row & Audit18Row & Audit17Row;

/** The snapshot row (audit 20 already applied) in the shape every audit's diff takes. */
const rowOf = (slug: string): AnyRow => {
  const r = snap(slug)!;
  return {
    company: r.company ?? null,
    website: r.website ?? null,
    description: r.description ?? null,
    primaryUse: r.primaryUse ?? null,
    currentPricing: r.currentPricing ?? null,
    freeTierFeatures: r.freeTierFeatures ?? null,
    usageLimits: r.usageLimits ?? null,
    upgradeTriggers: r.upgradeTriggers ?? null,
    costTier: r.costTier,
    apiAvailable: r.apiAvailable,
    privacyLevel: r.privacyLevel ?? null,
    directAlternatives: [...(r.directAlternatives ?? [])],
    budgetAlternativeTo: [...(r.budgetAlternativeTo ?? [])],
  };
};

/** Every field audit 20 writes on a row. */
const ownedFields = (p: Audit20Patch) => [
  ...Object.keys(p.fields),
  ...Object.keys(p.guarded ?? {}),
  ...(p.addDirectAlternatives?.length ? ["directAlternatives"] : []),
  ...(p.replaceBudgetAlternatives?.length ? ["budgetAlternativeTo"] : []),
];

const row = (over: Partial<Audit20Row> = {}): Audit20Row => ({
  company: "Old Co",
  website: "https://old.example",
  description: "Old description.",
  primaryUse: null,
  currentPricing: null,
  freeTierFeatures: null,
  usageLimits: null,
  upgradeTriggers: null,
  costTier: "FREE",
  apiAvailable: false,
  privacyLevel: "HIGH",
  directAlternatives: [],
  budgetAlternativeTo: [],
  ...over,
});

describe("catalog audit 20: stale facts batch 4", () => {
  it("covers exactly the 19 batch-4 slugs, in tracker order, each with a fact file unless every page was blocked", () => {
    assert.equal(AUDIT_20_BATCH.length, 19);
    assert.equal(new Set(AUDIT_20_BATCH).size, 19);
    const doc = readFileSync(join(process.cwd(), "docs/planning/2026-10-autonomous-business/stale-facts-batches.md"), "utf8");
    const tracker = [...doc.matchAll(/^\| (\d+) \| 4 \| .*? \| `([^`]+)` \|/gm)].map((m) => [Number(m[1]), m[2]] as const);
    assert.deepEqual(tracker.map(([n]) => n), Array.from({ length: 19 }, (_, i) => 74 + i));
    assert.deepEqual(tracker.map(([, slug]) => slug).sort(), [...AUDIT_20_BATCH].sort());
    for (const slug of AUDIT_20_BATCH) {
      assert.ok(snap(slug), `${slug}: row exists`);
      // clio-manage and scholarcy had none when this audit ran; audit 21's browser check added theirs.
      assert.ok(getToolFacts(slug), `${slug}: fact file registered`);
      if (AUDIT_20_NO_FACT_FILE[slug]) assert.match(JSON.stringify(getToolFacts(slug)?.changelog), /browser check/i, slug);
    }
    assert.deepEqual(Object.keys(AUDIT_20_NO_FACT_FILE), ["clio-manage", "scholarcy"]);
  });

  it("patches every batch-4 row except the three with nothing both readers saw, plus the four leftover rows", () => {
    const patched = AUDIT_20_PATCHES.map((p) => p.slug);
    assert.equal(new Set(patched).size, patched.length);
    for (const slug of AUDIT_20_BATCH) {
      if (AUDIT_20_NO_ROW_CHANGE[slug]) assert.equal(patched.includes(slug), false, slug);
      else assert.ok(patched.includes(slug), slug);
    }
    assert.deepEqual(Object.keys(AUDIT_20_NO_ROW_CHANGE), ["clio-manage", "scholarcy", "naver-hyperclova-x-cue"]);
    for (const slug of [...AUDIT_20_LEFTOVERS, ...AUDIT_20_DECISIONS, ...AUDIT_20_BROWSER_CHECK]) assert.ok(patched.includes(slug), slug);
    for (const slug of patched) assert.ok([...AUDIT_20_BATCH, ...AUDIT_20_LEFTOVERS, ...AUDIT_20_DECISIONS, ...AUDIT_20_BROWSER_CHECK].includes(slug), slug);
    assert.deepEqual(AUDIT_20_DECISIONS, ["restb-ai", "leonardo-ai"]);
    assert.deepEqual(AUDIT_20_BROWSER_CHECK, ["quizlet-q-chat", "bloomberg-gpt-terminal-ai", "zillow-ai-zestimate", "duolingo-max"]);
    assert.equal(patched.length, 26);
  });

  it("skips the rows done in earlier stale-facts batches", () => {
    for (const slug of [...AUDIT_17_BATCH, ...AUDIT_18_BATCH, ...AUDIT_19_BATCH]) assert.equal(AUDIT_20_BATCH.includes(slug), false, slug);
    for (const slug of ["tabnine", "clarifai", "hermes-agent", "canva-ai-magic-studio", "lindy-ai", "scite", "activepieces"]) {
      assert.equal(AUDIT_20_BATCH.includes(slug), false, slug);
    }
  });
});

describe("catalog audit 20: no conflict with earlier audits", () => {
  it("shares no written field with audits 17, 18 or 19 on any row", () => {
    for (const p of AUDIT_20_PATCHES) {
      const owned = new Set(ownedFields(p));
      for (const earlier of [AUDIT_17_PATCHES, AUDIT_18_PATCHES, AUDIT_19_PATCHES]) {
        const e = earlier.find((x) => x.slug === p.slug);
        if (!e) continue;
        const theirs = [
          ...Object.keys(e.fields),
          ...Object.keys(e.guarded ?? {}),
          ...(("addDirectAlternatives" in e && e.addDirectAlternatives?.length) ? ["directAlternatives"] : []),
        ];
        for (const key of theirs) {
          // restb-ai costTier is the one shared field: Zach's ENTERPRISE (audit 21), written by both with the same target.
          if (p.slug === "restb-ai" && key === "costTier") {
            assert.equal(p.guarded!.costTier!.to, (e.guarded as { costTier: { to: string } }).costTier.to);
            continue;
          }
          assert.equal(owned.has(key), false, `${p.slug}.${key} is written by both`);
        }
      }
    }
  });

  it("re-running audit 17, 18 or 19 after this one changes none of the fields this one owns, and this one is a no-op on the patched snapshot", () => {
    let shared = 0;
    for (const p of AUDIT_20_PATCHES) {
      const owned = new Set(ownedFields(p));
      const after = rowOf(p.slug);
      const p17 = AUDIT_17_PATCHES.find((x) => x.slug === p.slug);
      const p18 = AUDIT_18_PATCHES.find((x) => x.slug === p.slug);
      const p19 = AUDIT_19_PATCHES.find((x) => x.slug === p.slug);
      for (const data of [p17 && audit17PatchData(after, p17), p18 && audit18PatchData(after, p18), p19 && audit19PatchData(after, p19)]) {
        if (!data) continue;
        shared += 1;
        for (const key of Object.keys(data)) assert.equal(owned.has(key), false, `${p.slug}.${key} would be reverted`);
      }
      assert.deepEqual(audit20PatchData(after, p), {}, `${p.slug}: snapshot already has audit 20 applied`);
    }
    // murf-ai (19), openai-codex-cli (18 and 19), leonardo-ai (18 and 19) and restb-ai (19) are the only rows audit 20 shares with the earlier audits.
    assert.equal(shared, 6);
  });

  it("touches only claude-code among audit 10's slugs (a different field), and never the tiers audit 11 owns on clio-manage and spellbook", () => {
    assert.deepEqual(AUDIT_20_PATCHES.map((p) => p.slug).filter((s) => audit10Slugs().includes(s)), ["claude-code"]);
    assert.equal("currentPricing" in patch20("claude-code").fields, false);
    const touched = [...AUDIT_20_PATCHES.map((p) => p.slug), ...AUDIT_20_BATCH];
    const shared = [...new Set(touched.filter((slug) => audit11Slugs().includes(slug)))].sort();
    assert.deepEqual(shared, ["clio-manage", "spellbook"]);
    for (const slug of shared) {
      const a11 = AUDIT_11_PATCHES.find((p) => p.slug === slug)!;
      assert.equal(AUDIT_20_PATCHES.find((p) => p.slug === slug)?.guarded?.costTier, undefined, slug);
      assert.equal(snap(slug)?.costTier, a11.guarded!.costTier.to, slug);
    }
  });

  it("does not add back a name audits 5 or 15 removed, or write a list they edit on the same row", () => {
    const removed = new Set([...AUDIT_5_REF_EDITS.map((e) => `${e.slug}.${e.field}`), ...AUDIT_15_REF_REMOVALS.map((e) => `${e.slug}.${e.field}`)]);
    for (const p of AUDIT_20_PATCHES) {
      if (p.addDirectAlternatives?.length) assert.equal(removed.has(`${p.slug}.directAlternatives`), p.slug === "amazon-q-developer", p.slug);
      if (p.replaceBudgetAlternatives?.length) assert.equal(removed.has(`${p.slug}.budgetAlternativeTo`), false, p.slug);
    }
    for (const r of AUDIT_15_REF_REMOVALS.filter((x) => x.slug === "amazon-q-developer")) {
      assert.deepEqual(patch20("amazon-q-developer").addDirectAlternatives, ["Kiro"]);
      assert.equal(patch20("amazon-q-developer").addDirectAlternatives!.includes(r.value), false);
    }
  });
});

describe("catalog audit 20: content rules", () => {
  it("stamps every batch-4 fact checked today, with vendor sources, no affiliate links, and a second reader on every verified fact", () => {
    for (const slug of [...AUDIT_20_BATCH, "google-antigravity"]) {
      const facts = getToolFacts(slug);
      if (!facts) continue;
      for (const [key, fact] of Object.entries(facts)) {
        if (!fact || typeof fact !== "object" || !("sourceUrl" in fact)) continue;
        if (slug !== "google-antigravity" || key !== "officialUrl") assert.equal(fact.checkedAt, CHECKED_AT, `${slug}.${key}`);
        assert.match(fact.sourceUrl, /^https:\/\//, `${slug}.${key}`);
        assert.doesNotMatch(fact.sourceUrl, /via=|ref=|affiliate|utm_|\/\/(?:www\.)?x\.com|twitter\.com/i, `${slug}.${key}`);
        if (fact.status === "verified") assert.ok(isPublishedVerified(fact), `${slug}.${key}: second reader recorded`);
      }
    }
  });

  it("writes dated text that never claims to be official and never says trial-only under a free tier", () => {
    for (const p of AUDIT_20_PATCHES) {
      assert.equal(p.checkedAt, CHECKED_AT, p.slug);
      assert.ok(p.sources.length > 0, p.slug);
      for (const url of p.sources) assert.match(url, /^https:\/\//, p.slug);
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
    for (const slug of [...AUDIT_20_BATCH, "google-antigravity"]) {
      const tier = AUDIT_20_PATCHES.find((p) => p.slug === slug)?.guarded?.costTier?.to ?? snap(slug)?.costTier;
      const free = getToolFacts(slug)?.freeTier?.value;
      if (!free) continue;
      if (free.available) assert.ok(tier === "FREE" || tier === "FREEMIUM" || tier === "ENTERPRISE", `${slug}: ${tier}`);
      else assert.ok(tier === "PAID" || tier === "ENTERPRISE", `${slug}: ${tier}`);
    }
  });

  it("follows the findings of the two readers", () => {
    // Removed unsourced claims.
    assert.doesNotMatch(snap("spellbook")?.currentPricing ?? "", /\$99/);
    assert.doesNotMatch(snap("chatpdf")?.currentPricing ?? "", /\$5/);
    assert.doesNotMatch(snap("adobe-firefly")?.freeTierFeatures ?? "", /25 generative credits/);
    // Audit 21: Premium $199.99 is on the plans page (browser check), so it is back, as a Premium price.
    assert.match(snap("adobe-firefly")?.currentPricing ?? "", /Premium \$199\.99 \(50,000\)/);
    assert.doesNotMatch(snap("topaz-labs")?.currentPricing ?? "", /perpetual\)/);
    assert.doesNotMatch(snap("amazon-bedrock")?.freeTierFeatures ?? "", /2 months/);
    // Audit 21: the $200 is the general new-account credit, now sourced (azure-account page), and said not to be Azure OpenAI's.
    assert.match(snap("azure-openai-service")?.freeTierFeatures ?? "", /general new-Azure-account one \(\$200, usable for up to 30 days, new customers only\), not specific to Azure OpenAI/);
    assert.doesNotMatch(snap("wondershare-pdfelement-ai")?.currentPricing ?? "", /79\.99/);
    assert.doesNotMatch(snap("adobe-acrobat-ai-assistant")?.currentPricing ?? "", /22\.99/);
    // Tiers and ratings follow the facts.
    assert.equal(snap("topaz-labs")?.costTier, "PAID");
    assert.equal(snap("cohere")?.costTier, "FREEMIUM");
    assert.equal(snap("cohere")?.privacyLevel, "MEDIUM");
    assert.equal(snap("adobe-acrobat-ai-assistant")?.costTier, "PAID");
    assert.equal(snap("amazon-bedrock")?.costTier, "PAID");
    assert.equal(snap("azure-openai-service")?.costTier, "PAID");
    assert.equal(snap("amazon-q-developer")?.privacyLevel, "MEDIUM");
    assert.equal(snap("spellbook")?.costTier, "PAID");
    assert.equal(snap("clio-manage")?.costTier, "PAID");
    assert.equal(snap("google-veo-3-1")?.costTier, "FREEMIUM");
    assert.equal(snap("spellbook")?.website, "https://spellbook.com");
    assert.equal(snap("scispace")?.website, "https://scispace.com");
    // Open WebUI is not MIT any more.
    assert.doesNotMatch(snap("open-webui")?.freeTierFeatures ?? "", /\(MIT\)/);
    assert.match(snap("open-webui")?.freeTierFeatures ?? "", /not an OSI-approved open source licence/);
    assert.equal(getToolFacts("open-webui")?.features?.status, "verified");
    // Dated notices.
    assert.match(getToolFacts("amazon-q-developer")?.status?.value.headline ?? "", /April 30, 2027/);
    assert.match(getToolFacts("google-veo-3-1")?.status?.value.headline ?? "", /October 22, 2026/);
    assert.equal(getToolFacts("amazon-q-developer")?.privacy?.value.trainsOnData, true);
    assert.equal(getToolFacts("azure-openai-service")?.privacy?.value.trainsOnData, false);
    assert.ok(snap("amazon-q-developer")?.directAlternatives?.includes("Kiro"));
    // One-reader facts stay unverified and out of the row text.
    // (adobe-firefly plans and adobe-acrobat-ai-assistant privacy were one-reader facts; audit 21's browser check read them again and verified them.)
    for (const [slug, key] of [["harvey-ai", "privacy"], ["spellbook", "company"], ["adobe-firefly", "privacy"], ["open-webui", "company"]] as const) {
      assert.equal(getToolFacts(slug)?.[key]?.status, "unverified", `${slug}.${key}`);
    }
    // Rows with nothing read keep their text.
    for (const slug of ["clio-manage", "scholarcy", "naver-hyperclova-x-cue"]) assert.equal(AUDIT_20_PATCHES.some((p) => p.slug === slug), false, slug);
  });

  it("leaves alone what the brief says not to change, and the rows the browser check confirmed as they are", () => {
    const patched = new Set(AUDIT_20_PATCHES.map((p) => p.slug));
    // Lyria changes in its fact file and guide only (the row text already says Lyria 3.5); Gemini CLI, Upstage and Aider were confirmed as they are (Codex CLI keeps only the leftover budget-alternative swap).
    for (const slug of ["google-lyria-3", "shopify-magic-sidekick", "salesforce-einstein", "gemini-cli", "upstage-solar", "aider"]) {
      assert.equal(patched.has(slug), false, slug);
    }
    assert.equal(snap("gemini-cli")?.costTier, "PAID");
    assert.equal(snap("google-lyria-3")?.name, "Google Lyria 3");
    assert.equal(snap("quizlet-q-chat")?.name, "Quizlet Q-Chat");
    assert.equal(snap("duolingo-max")?.name, "Duolingo Max");
  });
});

describe("catalog audit 20: batch-3 leftovers", () => {
  it("google-antigravity carries the same verified plans as the antigravity-cli row, not \"Free (preview)\"", () => {
    const p = patch20("google-antigravity");
    assert.equal(p.fields.currentPricing, antigravityCurrentPricing());
    assert.equal(p.fields.freeTierFeatures, antigravityFreeTierFeatures());
    assert.equal(p.fields.usageLimits, ANTIGRAVITY_ROW.usageLimits);
    const r = snap("google-antigravity")!;
    assert.match(r.currentPricing ?? "", /\$0 for individuals/);
    assert.match(r.currentPricing ?? "", /Google AI Pro \$19\.99\/mo and Google AI Ultra from \$99\.99\/mo/);
    assert.match(r.currentPricing ?? "", /Gemini Enterprise from \$30 per seat/);
    for (const text of [r.currentPricing, r.freeTierFeatures, r.usageLimits, r.upgradeTriggers]) {
      assert.doesNotMatch(text ?? "", /preview|cloud-based|generous/i);
    }
    assert.equal(r.costTier, "FREEMIUM");
    const facts = getToolFacts("google-antigravity")!;
    assert.equal(facts.freeTier?.value.available, true);
    for (const key of ["plans", "freeTier"] as const) assert.ok(isPublishedVerified(facts[key]!), key);
    assert.deepEqual(facts.plans?.value, getToolFacts("antigravity-cli")?.plans?.value);
  });

  it("no row lists Gemini CLI as a free budget alternative; claude-code and openai-codex-cli point to Antigravity CLI", () => {
    for (const r of snapshotRows()) {
      if (r.slug === "gemini-cli") continue;
      for (const name of r.budgetAlternativeTo ?? []) assert.doesNotMatch(name, /^Gemini CLI\b.*free/i, `${r.slug}: ${name}`);
    }
    assert.ok(snap("claude-code")?.budgetAlternativeTo?.includes("Antigravity CLI (free for individuals)"));
    assert.ok(snap("openai-codex-cli")?.budgetAlternativeTo?.includes("Antigravity CLI (free with a personal Google account)"));
    // The rest of both lists, and the plain (non-free) directAlternatives, are untouched.
    assert.deepEqual(snap("claude-code")?.budgetAlternativeTo?.slice(0, 2), ["Aider (free)", "OpenAI Codex CLI (free)"]);
    assert.ok(snap("openai-codex-cli")?.directAlternatives?.includes("Gemini CLI"));
    // Guides: Gemini CLI is never described as free outside its own and the Antigravity pages.
    for (const slug of ["claude-code", "openai-codex-cli", "aider"]) {
      const guide = JSON.stringify(getStaticTutorialForPlatform(slug) ?? {});
      assert.doesNotMatch(guide, /Gemini CLI[^"]{0,80}free|free[^"]{0,80}Gemini CLI/i, slug);
    }
    // The gemini-cli row itself is not patched.
    assert.equal(AUDIT_20_PATCHES.some((x) => x.slug === "gemini-cli"), false);
  });

  it("swaps the entry only while the row holds the old one, and is a no-op on a re-run", () => {
    const p = patch20("claude-code");
    const pre = row({ budgetAlternativeTo: ["Aider (free)", "Gemini CLI (free)"] });
    const data = audit20PatchData(pre, p);
    assert.deepEqual(data.budgetAlternativeTo, ["Aider (free)", "Antigravity CLI (free for individuals)"]);
    assert.deepEqual(audit20PatchData({ ...pre, ...data } as Audit20Row, p), {});
    const edited = row({ budgetAlternativeTo: ["Aider (free)", "Hand-edited entry"] });
    assert.deepEqual(audit20PatchData(edited, p), {});
    assert.deepEqual(audit20GuardSkips(edited, p), ["budgetAlternativeTo"]);
  });

  it("Murf's description loses the word that matched \"learn a language\"; it stays a voice tool in search", () => {
    assert.equal(snap("murf-ai")?.description, MURF_DESCRIPTION_NEW);
    assert.notEqual(MURF_DESCRIPTION_OLD, MURF_DESCRIPTION_NEW);
    assert.doesNotMatch(MURF_DESCRIPTION_NEW, /\blanguages?\b|\blearn\b/i);
    const facts = (slug: string) => getToolFacts(slug);
    const learn = searchTools({ task: "learn a language" }, snapshotRows(), facts).results.map((r) => r.slug);
    assert.equal(learn.includes("murf-ai"), false);
    assert.ok(learn.slice(0, 3).includes("speak-language-ai"));
    const voice = searchTools({ task: "text to speech voiceover" }, snapshotRows(), facts).results.slice(0, 8).map((r) => r.slug);
    assert.ok(voice.includes("murf-ai"), `murf-ai still found for voiceovers: ${voice.join(", ")}`);
    // Only the description changes; the guarded write leaves a hand edit alone.
    const p = patch20("murf-ai");
    assert.deepEqual(Object.keys(p.fields), []);
    assert.deepEqual(audit20PatchData(row({ description: MURF_DESCRIPTION_OLD }), p), { description: MURF_DESCRIPTION_NEW });
    assert.deepEqual(audit20PatchData(row({ description: "A hand edit." }), p), {});
    assert.deepEqual(audit20GuardSkips(row({ description: "A hand edit." }), p), ["description"]);
  });
});

describe("catalog audit 20: Zach's decisions", () => {
  it("restb-ai is ENTERPRISE (the API is sales-only, Restb Lens has no public prices; first PAID, reversed in audit 21), whichever order audits 19, 20 and 21 run in", () => {
    const p = patch20("restb-ai");
    const r = snap("restb-ai")!;
    assert.equal(r.costTier, "ENTERPRISE");
    assert.equal(r.description, RESTB_DESCRIPTION);
    assert.match(RESTB_DESCRIPTION, /API is sold through sales only/);
    assert.match(RESTB_DESCRIPTION, /Restb Lens, its web tool, is a sign-up web app with no public prices/);
    assert.doesNotMatch(RESTB_DESCRIPTION, /self-serve/);
    assert.deepEqual(Object.keys(p.fields), []);
    assert.deepEqual(p.guarded?.costTier, { from: ["FREEMIUM", "PAID"], to: "ENTERPRISE" });
    // The tier is the same one audit 19 writes now, so neither audit undoes the other.
    const p19 = AUDIT_19_PATCHES.find((x) => x.slug === "restb-ai")!;
    assert.equal(p19.guarded!.costTier!.to, "ENTERPRISE");
    // A row at FREEMIUM (audit 19 not run), PAID (audit 20 as first merged) or ENTERPRISE (audit 19 as it is now).
    for (const start of ["FREEMIUM", "ENTERPRISE", "PAID"]) {
      const pre = row({ costTier: start, description: null });
      const after = { ...pre, ...audit20PatchData(pre, p) } as Audit20Row;
      assert.equal(after.costTier, "ENTERPRISE", start);
      assert.equal(after.description, RESTB_DESCRIPTION, start);
      assert.deepEqual(audit20PatchData(after, p), {}, start);
      // Audit 19 re-run afterwards cannot move the tier back.
      assert.equal("costTier" in audit19PatchData(after as Audit19Row, p19), false, start);
    }
    // A hand-edited tier or description is left alone and logged.
    const edited = row({ costTier: "FREE", description: "Hand text." });
    assert.deepEqual(audit20PatchData(edited, p), {});
    assert.deepEqual(audit20GuardSkips(edited, p), ["description", "costTier"]);
    // Text fields stay owned by audit 19 and say the same thing.
    assert.match(r.currentPricing ?? "", /^No public prices/);
    assert.equal(r.currentPricing, p19.fields.currentPricing);
    // The fact file records the decision and still says there is no free tier.
    const facts = getToolFacts("restb-ai")!;
    assert.equal(facts.freeTier?.value.available, false);
    assert.match(JSON.stringify(facts.changelog), /Cost tier set to PAID/);
    assert.match(JSON.stringify(facts.changelog), /Cost tier set to ENTERPRISE/);
  });

  it("leonardo-ai is LOW privacy because Free-plan content is used for training; its text stays with audits 18 and 19", () => {
    const p = patch20("leonardo-ai");
    assert.equal(snap("leonardo-ai")?.privacyLevel, "LOW");
    assert.deepEqual(Object.keys(p.fields), []);
    assert.deepEqual(p.guarded, { privacyLevel: { from: "MEDIUM", to: "LOW" } });
    assert.match(p.finding, /Free-plan content is used for training/);
    assert.deepEqual(audit20PatchData(row({ privacyLevel: "MEDIUM" }), p), { privacyLevel: "LOW" });
    assert.deepEqual(audit20PatchData(row({ privacyLevel: "LOW" }), p), {});
    assert.deepEqual(audit20PatchData(row({ privacyLevel: "HIGH" }), p), {});
    assert.deepEqual(audit20GuardSkips(row({ privacyLevel: "HIGH" }), p), ["privacyLevel"]);
    // The snapshot text is audits 18 and 19's, unchanged by this audit.
    for (const earlier of [AUDIT_18_PATCHES, AUDIT_19_PATCHES]) {
      const e = earlier.find((x) => x.slug === "leonardo-ai")!;
      assert.equal("privacyLevel" in (e.guarded ?? {}), false);
      assert.equal(snap("leonardo-ai")?.freeTierFeatures, e.fields.freeTierFeatures);
    }
    const facts = getToolFacts("leonardo-ai")!;
    assert.equal(facts.privacy?.value.trainsOnData, true);
    assert.ok(isPublishedVerified(facts.privacy!));
    assert.match(JSON.stringify(facts.changelog), /Privacy rated LOW/);
    // The guide already says free content feeds training.
    assert.match(JSON.stringify(getStaticTutorialForPlatform("leonardo-ai")), /free content feeds model training/);
  });
});

describe("catalog audit 20: Research Analyst batch-3 browser check (2026-10-29)", () => {
  const guide = (slug: string) => JSON.stringify(getStaticTutorialForPlatform(slug) ?? {});

  it("Quizlet: the RA's prices, Ask Quizlet (US, 14+, login), and Q-Chat is not called retired; slug and title unchanged", () => {
    const facts = getToolFacts("quizlet-q-chat")!;
    assert.ok(facts, "fact file registered");
    assert.deepEqual(
      facts.plans!.value.map((x) => [x.name, x.price, x.period]),
      [["Plus", "$35.99", "year"], ["Plus Unlimited", "$44.99", "year"], ["Family", "$83.99", "year"]],
    );
    assert.ok(isPublishedVerified(facts.plans!));
    assert.equal(facts.plans!.sourceUrl, "https://quizlet.com/upgrade");
    assert.match(JSON.stringify(facts.features!.value), /United States who are 14 years old or older/);
    assert.match(JSON.stringify(facts.features!.value), /needs a login/);
    const r = snap("quizlet-q-chat")!;
    assert.equal(r.name, "Quizlet Q-Chat");
    assert.match(r.currentPricing ?? "", /Plus \$35\.99 a year, Plus Unlimited \$44\.99 a year and Family \$83\.99 a year/);
    assert.match(r.freeTierFeatures ?? "", /Ask Quizlet/);
    assert.match(r.freeTierFeatures ?? "", /United States aged 14 or older/);
    assert.doesNotMatch(r.usageLimits ?? "", /\$8|\$4/);
    assert.doesNotMatch(r.upgradeTriggers ?? "", /Q-Chat/);
    assert.equal(r.costTier, "FREEMIUM");
    // Nothing we publish calls Q-Chat retired, and the guide no longer says so.
    for (const text of [JSON.stringify(r), JSON.stringify(facts.features), guide("quizlet-q-chat")]) {
      assert.doesNotMatch(text, /retired|no longer available|went away/i);
    }
    assert.equal(getStaticTutorialForPlatform("quizlet-q-chat")?.lastReviewedAt, CHECKED_AT);
    assert.equal(getStaticTutorialForPlatform("quizlet-q-chat")?.slug, "quizlet-q-chat-getting-started");
    assert.doesNotMatch(guide("quizlet-q-chat"), /\$\d/);
  });

  it("Bloomberg: consumer plan $399 a year ($180 first year) or $39.99 a month with no AI feature; ASKB is the Terminal's AI and sales-only", () => {
    const facts = getToolFacts("bloomberg-gpt-terminal-ai")!;
    assert.deepEqual(facts.plans!.value.map((x) => [x.price, x.period]), [["$399", "year"], ["$39.99", "month"]]);
    assert.match(facts.plans!.value[0].limits, /\$180 for the first year/);
    assert.ok(isPublishedVerified(facts.plans!));
    assert.match(JSON.stringify(facts.features!.value), /ASKB by Bloomberg is the AI on the Bloomberg Terminal/);
    assert.doesNotMatch(JSON.stringify(facts.features!.value), /summar/i);
    const r = snap("bloomberg-gpt-terminal-ai")!;
    assert.match(r.currentPricing ?? "", /\$399 a year \(\$180 for the first year\) or \$39\.99 a month/);
    assert.match(r.currentPricing ?? "", /ASKB, the Terminal's AI, is sales-only/);
    assert.match(r.currentPricing ?? "", /names no AI feature/);
    assert.doesNotMatch(JSON.stringify(r), /24,000|24K/);
    assert.equal(r.costTier, "ENTERPRISE");
    const g = getStaticTutorialForPlatform("bloomberg-gpt-terminal-ai")!;
    assert.equal(g.lastReviewedAt, CHECKED_AT);
    assert.doesNotMatch(JSON.stringify(g), /publishes no price anywhere/);
    assert.match(JSON.stringify(g.beforeYouStart), /separate consumer subscription/);
  });

  it("Zillow: ChatGPT app, Claude connector, rentals-only Gemini feature and AI mode; cost not stated", () => {
    const facts = getToolFacts("zillow-ai-zestimate")!;
    const text = JSON.stringify(facts.features!.value);
    for (const re of [/app in ChatGPT/, /connector in Anthropic's Claude/, /rentals-only feature inside Google's Gemini/, /AI mode/, /does not state a cost/]) assert.match(text, re);
    assert.ok(isPublishedVerified(facts.features!));
    assert.equal(facts.features!.sourceUrl, "https://www.zillow.com/news/when-people-ask-ai-about-housing-chatgpt-gemini-and-claude-all-connect-to-zillow/");
    const r = snap("zillow-ai-zestimate")!;
    assert.match(r.currentPricing ?? "", /Zillow states no cost for its AI features/);
    assert.match(r.freeTierFeatures ?? "", /^Not stated/);
    assert.doesNotMatch(JSON.stringify(r.freeTierFeatures) + JSON.stringify(r.usageLimits), /Completely free|No limits/);
    const g = getStaticTutorialForPlatform("zillow-ai-zestimate")!;
    assert.equal(g.lastReviewedAt, CHECKED_AT);
    assert.match(JSON.stringify(g), /Zillow app in ChatGPT/);
    assert.match(JSON.stringify(g), /rentals-only Zillow feature in Google's Gemini/);
  });

  it("Duolingo Max: Super plus Roleplay and Video Call with Lily, price not stated, Explain My Answer gone everywhere", () => {
    const facts = getToolFacts("duolingo-max")!;
    assert.match(JSON.stringify(facts.features!.value), /Roleplay and Video Call with Lily/);
    assert.match(JSON.stringify(facts.features!.value), /Prices are not stated/);
    assert.ok(isPublishedVerified(facts.features!));
    const r = snap("duolingo-max")!;
    assert.match(r.currentPricing ?? "", /prices are not stated on Duolingo's logged-out pages/);
    assert.doesNotMatch(JSON.stringify([r.currentPricing, r.usageLimits, r.upgradeTriggers]), /\$\d/);
    assert.match(r.upgradeTriggers ?? "", /Video Call with Lily/);
    assert.equal(r.name, "Duolingo Max");
    for (const text of [JSON.stringify(r), JSON.stringify(facts), guide("duolingo-max")]) assert.doesNotMatch(text, /Explain My Answer/i);
    assert.equal(getStaticTutorialForPlatform("duolingo-max")?.lastReviewedAt, CHECKED_AT);
    // Nothing else in the catalog lists it either.
    for (const x of snapshotRows()) assert.doesNotMatch(JSON.stringify(x), /Explain My Answer/i, x.slug);
  });

  it("Lyria: the current model is Lyria 3.5 in the facts and the guide; no date claimed; name and slug unchanged", () => {
    const facts = getToolFacts("google-lyria-3")!;
    assert.deepEqual(facts.models!.value, ["Lyria 3.5 (current)"]);
    assert.ok(isPublishedVerified(facts.models!));
    assert.match(JSON.stringify(facts.features!.value), /Lyria 3\.5 is the current model/);
    assert.match(facts.features!.note ?? "", /does not give an announcement date/);
    const g = getStaticTutorialForPlatform("google-lyria-3")!;
    assert.equal(g.lastReviewedAt, CHECKED_AT);
    assert.match(JSON.stringify(g), /the current model is Lyria 3\.5/);
    assert.doesNotMatch(JSON.stringify(g), /from September 2026/);
    assert.equal(snap("google-lyria-3")?.name, "Google Lyria 3");
    assert.equal(AUDIT_20_PATCHES.some((x) => x.slug === "google-lyria-3"), false);
  });

  it("Antigravity: the Enable Telemetry opt-out is recorded with its limits, so the CLI and the IDE are both MEDIUM (first LOW; audit 21)", () => {
    const cli = getToolFacts("antigravity-cli")!;
    assert.match(cli.privacy!.note ?? "", /You can opt out of data collection at any point from the Settings panel/);
    assert.match(cli.privacy!.note ?? "", /no distinction between free and Google AI Pro or Ultra individual accounts/);
    assert.match(cli.privacy!.note ?? "", /Enable Telemetry setting/);
    assert.match(cli.privacy!.note ?? "", /always off for business accounts/);
    assert.equal(ANTIGRAVITY_ROW.privacyLevel, "MEDIUM");
    // The IDE runs under the same terms: same privacy fact, same rating.
    const ide = getToolFacts("google-antigravity")!;
    assert.equal(ide.privacy!.value.trainsOnData, true);
    assert.equal(ide.privacy!.value.policyUrl, cli.privacy!.value.policyUrl);
    assert.ok(isPublishedVerified(ide.privacy!));
    assert.match(ide.privacy!.note ?? "", /same terms/);
    const p = patch20("google-antigravity");
    assert.deepEqual(p.guarded?.privacyLevel, { from: "HIGH", to: "MEDIUM" });
    assert.match(p.finding, /the Enable Telemetry setting is the opt-out/);
    assert.equal(snap("google-antigravity")?.privacyLevel, ANTIGRAVITY_ROW.privacyLevel);
    assert.equal(audit20PatchData(row({ privacyLevel: "HIGH", costTier: "FREEMIUM" }), p).privacyLevel, "MEDIUM");
    assert.equal("privacyLevel" in audit20PatchData(row({ privacyLevel: "MEDIUM", costTier: "FREEMIUM" }), p), false);
    // Both guides name the FAQ opt-out and neither calls it a training opt-out.
    const cliGuide = getStaticTutorialForPlatform("antigravity-cli")!;
    const ideGuide = getStaticTutorialForPlatform("google-antigravity")!;
    assert.match(JSON.stringify(cliGuide), /opt out of data collection at any point from the Settings panel/);
    assert.match(JSON.stringify(ideGuide), /opt out of data collection at any point from the Settings panel/);
    assert.match(JSON.stringify(ideGuide), /Enable Telemetry/);
    assert.match(JSON.stringify(ideGuide), /does not stop everything/);
    assert.equal(cliGuide.lastReviewedAt, CHECKED_AT);
    assert.equal(ideGuide.lastReviewedAt, CHECKED_AT);
  });

  it("the Leonardo guide, which already agrees with the decision, is left alone (the Restb.ai guide changed in audit 21)", () => {
    assert.match(guide("restb-ai"), /Restb Lens/);
    assert.match(guide("restb-ai"), /sign-up web app with no public prices/);
    assert.doesNotMatch(guide("restb-ai"), /two-week|promo code|plans start with a single-user plan/);
    assert.notEqual(getStaticTutorialForPlatform("leonardo-ai")?.lastReviewedAt, CHECKED_AT);
  });
});

describe("catalog audit 20: guides", () => {
  it("the Acrobat and Open WebUI guides follow the findings, with today's review date", () => {
    const acrobat = getStaticTutorialForPlatform("adobe-acrobat-ai-assistant")!;
    assert.equal(acrobat.lastReviewedAt, CHECKED_AT);
    assert.match(JSON.stringify(acrobat), /Express/);
    const owui = getStaticTutorialForPlatform("open-webui")!;
    assert.equal(owui.lastReviewedAt, CHECKED_AT);
    assert.match(JSON.stringify(owui), /branding/);
    assert.doesNotMatch(JSON.stringify(owui), /\(MIT\)/);
  });
});

describe("catalog audit 20: dry run and guards", () => {
  /** The committed snapshot already has audit 20 applied; the pre-audit rows are the fixture taken from origin/main 53eafe7 (audits 17-19 applied). */
  const preAudit = (): Record<string, AnyRow> => {
    const fixture = JSON.parse(readFileSync(join(process.cwd(), "src/data/catalog-audits/audit-20-pre-rows.json"), "utf8")) as { rows: Record<string, AnyRow> };
    return fixture.rows;
  };

  it("dry run against the pre-audit rows reports 26 rows / 89 fields (16 batch-4 rows / 65 fields, 4 leftover rows / 9, 2 decision rows / 2, 4 browser-check rows / 13); a re-run reports 0", () => {
    const pre = preAudit();
    const tally = (slugs: string[]) => {
      const kinds: Record<string, number> = {};
      let rows = 0;
      let fields = 0;
      for (const p of AUDIT_20_PATCHES.filter((x) => slugs.includes(x.slug))) {
        const before = pre[p.slug];
        assert.ok(before, `${p.slug}: pre-audit row in the fixture`);
        const data = audit20PatchData(before, p);
        const keys = Object.keys(data);
        if (keys.length) {
          rows += 1;
          fields += keys.length;
          for (const k of keys) kinds[k] = (kinds[k] ?? 0) + 1;
        }
        const after = { ...before, ...data } as Audit20Row;
        assert.deepEqual(audit20PatchData(after, p), {}, `${p.slug}: re-run is a no-op`);
        assert.deepEqual(audit20GuardSkips(after, p), [], p.slug);
      }
      return { rows, fields, kinds };
    };
    const batch = tally(AUDIT_20_BATCH);
    const leftovers = tally(AUDIT_20_LEFTOVERS);
    const decisions = tally(AUDIT_20_DECISIONS);
    const browser = tally(AUDIT_20_BROWSER_CHECK);
    assert.deepEqual(batch, {
      rows: 16,
      fields: 65,
      kinds: { currentPricing: 15, freeTierFeatures: 15, usageLimits: 14, upgradeTriggers: 9, website: 3, costTier: 5, privacyLevel: 2, primaryUse: 1, directAlternatives: 1 },
    });
    assert.deepEqual(leftovers, {
      rows: 4,
      fields: 9,
      kinds: { currentPricing: 1, freeTierFeatures: 1, usageLimits: 1, upgradeTriggers: 1, costTier: 1, privacyLevel: 1, budgetAlternativeTo: 2, description: 1 },
    });
    // restb-ai is already ENTERPRISE in the fixture (audit 19 as first merged), which is audit 20's target now, so only its description changes.
    assert.deepEqual(decisions, { rows: 2, fields: 2, kinds: { description: 1, privacyLevel: 1 } });
    assert.deepEqual(browser, {
      rows: 4,
      fields: 13,
      kinds: { currentPricing: 4, freeTierFeatures: 3, usageLimits: 4, upgradeTriggers: 2 },
    });
    assert.equal(batch.rows + leftovers.rows + decisions.rows + browser.rows, 26);
    assert.equal(batch.fields + leftovers.fields + decisions.fields + browser.fields, 89);
  });

  it("leaves a hand-edited guarded field alone and reports it; null company and website are fillable", () => {
    const p: Audit20Patch = {
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
        description: { from: ["Old description."], to: "New description." },
      },
      addDirectAlternatives: ["Alt Tool"],
    };
    assert.deepEqual(audit20PatchData(row(), p), {
      company: "New Co",
      website: "https://new.example",
      description: "New description.",
      costTier: "PAID",
      apiAvailable: true,
      privacyLevel: "LOW",
      directAlternatives: ["Alt Tool"],
    });
    assert.deepEqual(audit20PatchData(row({ company: null, website: null }), p).company, "New Co");
    const edited = row({ company: "Hand Co", website: "https://hand.example", description: "Hand text.", costTier: "FREEMIUM", apiAvailable: undefined, privacyLevel: "MEDIUM", directAlternatives: ["alt tool"] });
    assert.deepEqual(audit20PatchData(edited, p), {});
    assert.deepEqual(audit20GuardSkips(edited, p), ["company", "website", "description", "costTier", "apiAvailable", "privacyLevel"]);
  });
});

describe("catalog audit 20: runner", () => {
  const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-20.ts"), "utf8");

  it("defaults to dry-run, uses the prod guard, updates once, creates and deletes nothing", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.equal(source.match(/\.update\(/g)?.length, 1);
    assert.doesNotMatch(source, /\.(create|createMany|updateMany|delete|deleteMany|upsert)\(/);
    assert.match(source, /if \(dryRun\) continue;\n\s+await prisma\.platform\.update\(\{ where: \{ slug: patch\.slug \}, data \}\)/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /`audit20: \$\{rows\} rows \/ \$\{fields\} patched fields/);
    assert.match(source, /cache:revalidate/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-20"], "tsx scripts/update-catalog-audit-20.ts");
    assert.match(pkg.scripts.test, /audit-20\.test\.ts/);
  });

  it("selects every column the diff reads", () => {
    for (const col of ["company", "website", "description", "primaryUse", "currentPricing", "freeTierFeatures", "usageLimits", "upgradeTriggers", "costTier", "apiAvailable", "privacyLevel", "directAlternatives", "budgetAlternativeTo"]) {
      assert.match(source, new RegExp(`\\b${col}: true`), col);
    }
  });

  it("shares the prod guard of audits 15-19 byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-20.ts");
    assert.ok(guard.length > 0);
    for (const n of [15, 16, 17, 18, 19]) assert.equal(guard, guardSection(`scripts/update-catalog-audit-${n}.ts`), `audit ${n}`);
  });
});
