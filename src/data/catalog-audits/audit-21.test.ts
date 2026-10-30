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
import { audit10Slugs } from "./audit-10";
import { AUDIT_11_PATCHES } from "./audit-11";
import { AUDIT_17_PATCHES, audit17PatchData } from "./audit-17";
import { AUDIT_18_PATCHES, audit18PatchData } from "./audit-18";
import { ANTIGRAVITY_ROW, AUDIT_19_PATCHES, audit19PatchData } from "./audit-19";
import { AUDIT_20_PATCHES, audit20PatchData, RESTB_DESCRIPTION as RESTB_20 } from "./audit-20";
import {
  A21_TEXT,
  ANTIGRAVITY_DESCRIPTION_NEW,
  ANTIGRAVITY_DESCRIPTION_OLD,
  AUDIT_21_NO_ROW_CHANGE,
  AUDIT_21_PATCHES,
  AUDIT_21_SLUGS,
  CHECKED_AT,
  RESTB_DESCRIPTION,
  RESTB_DESCRIPTION_OLD,
  audit21GuardSkips,
  audit21PatchData,
  type Audit21Patch,
  type Audit21Row,
} from "./audit-21";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug);
const patch21 = (slug: string) => AUDIT_21_PATCHES.find((p) => p.slug === slug)!;
const guide = (slug: string) => JSON.stringify(getStaticTutorialForPlatform(slug));

const guardSection = (file: string) => {
  const s = readFileSync(join(process.cwd(), file), "utf8");
  return s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
};

type Fixture = { rows: Record<string, Audit21Row & Record<string, unknown>> };
const fixture = (file: string): Fixture["rows"] =>
  (JSON.parse(readFileSync(join(process.cwd(), "src/data/catalog-audits", file), "utf8")) as Fixture).rows;

/** Rows as the database held them before audit 21 (audits 17-20 as first merged; antigravity-cli as audit 19 created it). */
const pre21 = () => fixture("audit-21-pre-rows.json");
/** Rows before audit 20 (audits 17-19 applied), the input of audit 20's own dry-run test. */
const pre20 = () => fixture("audit-20-pre-rows.json");

const apply = <T extends Record<string, unknown>>(row: T, data: Record<string, unknown>): T => ({ ...row, ...data });

const row = (over: Partial<Audit21Row> = {}): Audit21Row => ({
  description: "Old description.",
  primaryUse: null,
  currentPricing: null,
  freeTierFeatures: null,
  usageLimits: null,
  upgradeTriggers: null,
  costTier: "FREE",
  privacyLevel: "HIGH",
  ...over,
});

const ownedFields = (p: Audit21Patch) => [...Object.keys(p.fields), ...Object.keys(p.guarded ?? {})];

describe("catalog audit 21: scope", () => {
  it("patches the eleven rows the browser check corrected, and leaves Naver as it is", () => {
    assert.equal(AUDIT_21_SLUGS.length, 11);
    assert.deepEqual(AUDIT_21_PATCHES.map((p) => p.slug), AUDIT_21_SLUGS);
    assert.equal(new Set(AUDIT_21_SLUGS).size, 11);
    assert.deepEqual(Object.keys(AUDIT_21_NO_ROW_CHANGE), ["naver-hyperclova-x-cue"]);
    assert.equal(AUDIT_21_SLUGS.includes("naver-hyperclova-x-cue"), false);
    // Every patched row is in the snapshot except the one audit 19 creates.
    for (const slug of AUDIT_21_SLUGS) assert.ok(slug === "antigravity-cli" ? snap(slug) === undefined : snap(slug), slug);
  });

  it("changes no slug, name or title, and never touches audits 10 or 11's fields", () => {
    for (const p of AUDIT_21_PATCHES) {
      for (const key of ownedFields(p)) assert.ok(["currentPricing", "freeTierFeatures", "usageLimits", "upgradeTriggers", "primaryUse", "costTier", "privacyLevel", "description"].includes(key), `${p.slug}.${key}`);
    }
    assert.deepEqual(AUDIT_21_SLUGS.filter((s) => audit10Slugs().includes(s)), []);
    // Audit 11 owns clio-manage's cost tier; audit 21 writes its text only.
    const clio11 = AUDIT_11_PATCHES.find((p) => p.slug === "clio-manage")!;
    assert.equal(patch21("clio-manage").guarded?.costTier, undefined);
    assert.equal(snap("clio-manage")?.costTier, clio11.guarded!.costTier.to);
    assert.equal(snap("clio-manage")?.name, "Clio Manage");
    assert.equal(snap("scholarcy")?.name, "Scholarcy");
    assert.equal(snap("adobe-firefly")?.name, "Adobe Firefly");
    assert.equal(snap("restb-ai")?.name, "Restb.ai");
    assert.equal(getStaticTutorialForPlatform("clio-manage")?.title, "Getting Started with Clio Manage AI");
    assert.equal(getStaticTutorialForPlatform("scholarcy")?.title, "Getting Started with Scholarcy");
  });

  it("writes dated text that never claims to be official and never says trial-only under a free tier", () => {
    for (const p of AUDIT_21_PATCHES) {
      assert.equal(p.checkedAt, CHECKED_AT);
      assert.ok(p.sources.length > 0, p.slug);
      for (const url of p.sources) {
        assert.match(url, /^https:\/\//, p.slug);
        assert.doesNotMatch(url, /via=|ref=|affiliate|utm_/i, p.slug);
      }
      const tier = p.guarded?.costTier?.to ?? snap(p.slug)?.costTier;
      for (const [field, text] of Object.entries(p.fields)) {
        if (field !== "primaryUse" && field !== "upgradeTriggers") assert.match(text, new RegExp(`as of ${CHECKED_AT}`), `${p.slug}.${field}`);
        assert.equal(claimsOfficial(text), false, `${p.slug}.${field}`);
        assert.doesNotMatch(text, /via=|affiliate|referral|sponsor|utm_/i, `${p.slug}.${field}`);
        if (tier === "FREE" || tier === "FREEMIUM") assert.equal(saysTrialOnly(text), false, `${p.slug}.${field}`);
      }
    }
  });
});

describe("catalog audit 21: no conflict with earlier audits", () => {
  it("audits 19 and 20 take the shared targets from this audit, so they write the same values", () => {
    for (const [slug, fields] of Object.entries(A21_TEXT)) {
      const p20 = AUDIT_20_PATCHES.find((x) => x.slug === slug)!;
      for (const [field, value] of Object.entries(fields)) {
        const mine = (patch21(slug).fields as Record<string, string>)[field];
        assert.equal(mine, value, `${slug}.${field} in audit 21`);
        // Audit 20 writes the field whenever it writes it at all; where it does not, audit 21 is the only writer.
        const theirs = (p20.fields as Record<string, string>)[field];
        if (theirs !== undefined) assert.equal(theirs, value, `${slug}.${field} in audit 20`);
      }
    }
    // The shared fields audit 20 does write (Cohere's free-tier text and the five price rows).
    assert.equal(AUDIT_20_PATCHES.find((x) => x.slug === "cohere")!.fields.freeTierFeatures, A21_TEXT.cohere.freeTierFeatures);
    assert.equal(AUDIT_20_PATCHES.find((x) => x.slug === "adobe-firefly")!.fields.currentPricing, A21_TEXT["adobe-firefly"].currentPricing);
    assert.equal(AUDIT_20_PATCHES.find((x) => x.slug === "topaz-labs")!.fields.currentPricing, A21_TEXT["topaz-labs"].currentPricing);
    assert.equal(AUDIT_20_PATCHES.find((x) => x.slug === "adobe-acrobat-ai-assistant")!.fields.upgradeTriggers, A21_TEXT["adobe-acrobat-ai-assistant"].upgradeTriggers);
    // restb-ai: tier and description. google-antigravity: privacy. antigravity-cli: audit 19's create row.
    assert.equal(RESTB_20, RESTB_DESCRIPTION);
    const r19 = AUDIT_19_PATCHES.find((x) => x.slug === "restb-ai")!;
    const r20 = AUDIT_20_PATCHES.find((x) => x.slug === "restb-ai")!;
    assert.equal(r19.guarded!.costTier!.to, patch21("restb-ai").guarded!.costTier!.to);
    assert.equal(r20.guarded!.costTier!.to, patch21("restb-ai").guarded!.costTier!.to);
    assert.equal(r20.guarded!.description!.to, patch21("restb-ai").guarded!.description!.to);
    assert.equal(AUDIT_20_PATCHES.find((x) => x.slug === "google-antigravity")!.guarded!.privacyLevel!.to, patch21("google-antigravity").guarded!.privacyLevel!.to);
    assert.equal(ANTIGRAVITY_ROW.privacyLevel, patch21("antigravity-cli").guarded!.privacyLevel!.to);
    assert.equal(ANTIGRAVITY_ROW.description, patch21("antigravity-cli").guarded!.description!.to);
    assert.equal(ANTIGRAVITY_ROW.description, ANTIGRAVITY_DESCRIPTION_NEW);
  });

  it("re-running audit 17, 18, 19 or 20 after this one changes none of the fields this one owns, and this one is a no-op on the patched snapshot", () => {
    for (const p of AUDIT_21_PATCHES) {
      const found = snap(p.slug);
      if (!found) continue; // antigravity-cli: covered by the create-row test below
      const owned = new Set(ownedFields(p));
      const after = {
        description: found.description ?? null,
        primaryUse: found.primaryUse ?? null,
        currentPricing: found.currentPricing ?? null,
        freeTierFeatures: found.freeTierFeatures ?? null,
        usageLimits: found.usageLimits ?? null,
        upgradeTriggers: found.upgradeTriggers ?? null,
        costTier: found.costTier,
        privacyLevel: found.privacyLevel ?? null,
        website: found.website ?? null,
        company: found.company ?? null,
        apiAvailable: found.apiAvailable,
        directAlternatives: [...(found.directAlternatives ?? [])],
        budgetAlternativeTo: [...(found.budgetAlternativeTo ?? [])],
      };
      for (const [list, fn] of [
        [AUDIT_17_PATCHES, audit17PatchData],
        [AUDIT_18_PATCHES, audit18PatchData],
        [AUDIT_19_PATCHES, audit19PatchData],
        [AUDIT_20_PATCHES, audit20PatchData],
      ] as const) {
        const earlier = (list as { slug: string }[]).find((x) => x.slug === p.slug);
        if (!earlier) continue;
        const data = (fn as (r: unknown, p: unknown) => Record<string, unknown>)(after, earlier);
        for (const key of Object.keys(data)) assert.equal(owned.has(key), false, `${p.slug}.${key} would be reverted`);
      }
      assert.deepEqual(audit21PatchData(after, p), {}, `${p.slug}: snapshot already has audit 21 applied`);
      assert.deepEqual(audit21GuardSkips(after, p), [], p.slug);
    }
  });

  it("any order of audits 19, 20 and 21 reaches the same rows on the shared slugs", () => {
    const shared = ["restb-ai", "google-antigravity", "adobe-firefly", "topaz-labs", "cohere", "amazon-bedrock", "azure-openai-service", "adobe-acrobat-ai-assistant"];
    const start = pre20();
    for (const slug of shared) {
      const p20 = AUDIT_20_PATCHES.find((x) => x.slug === slug)!;
      const p21 = patch21(slug);
      const base = start[slug] as Audit21Row & Record<string, unknown>;
      // 20 then 21, and 21 then 20 (21 first: the DB has not had audit 20 yet).
      const a = apply(base, audit20PatchData(base as never, p20));
      const ab = apply(a, audit21PatchData(a, p21));
      const b = apply(base, audit21PatchData(base, p21));
      const ba = apply(b, audit20PatchData(b as never, p20));
      assert.deepEqual(ab, ba, `${slug}: same rows either way`);
      // Neither audit has anything left to do afterwards.
      assert.deepEqual(audit21PatchData(ab, p21), {}, `${slug}: audit 21 re-run`);
      assert.deepEqual(audit20PatchData(ab as never, p20), {}, `${slug}: audit 20 re-run`);
      assert.deepEqual(audit21GuardSkips(ab, p21), [], slug);
      // The rows end on audit 21's targets.
      for (const [f, v] of Object.entries(p21.fields)) assert.equal(ab[f], v, `${slug}.${f}`);
      if (p21.guarded?.costTier) assert.equal(ab.costTier, p21.guarded.costTier.to, slug);
      if (p21.guarded?.privacyLevel) assert.equal(ab.privacyLevel, p21.guarded.privacyLevel.to, slug);
      if (p21.guarded?.description) assert.equal(ab.description, p21.guarded.description.to, slug);
    }
  });

  it("a row audit 20 already moved to its first targets (restb PAID + PAID wording, Antigravity IDE LOW) moves here, and audit 20 and 19 re-runs leave it", () => {
    const pre = pre21();
    const restb = pre["restb-ai"];
    assert.equal(restb.costTier, "PAID");
    const p21 = patch21("restb-ai");
    const moved = apply(restb, audit21PatchData(restb, p21));
    assert.equal(moved.costTier, "ENTERPRISE");
    assert.equal(moved.description, RESTB_DESCRIPTION);
    const p19 = AUDIT_19_PATCHES.find((x) => x.slug === "restb-ai")!;
    const p20 = AUDIT_20_PATCHES.find((x) => x.slug === "restb-ai")!;
    assert.deepEqual(audit19PatchData(moved as never, p19), {});
    assert.deepEqual(audit20PatchData(moved as never, p20), {});
    // A row still at the first audit 20 description is moved too, by either audit.
    const old = { ...restb, description: RESTB_DESCRIPTION_OLD, costTier: "PAID" };
    assert.deepEqual(audit20PatchData(old as never, p20), { costTier: "ENTERPRISE", description: RESTB_DESCRIPTION });
    // The IDE row at LOW (audit 20 as first merged) moves to MEDIUM; audit 20 leaves it there.
    const ide = pre["google-antigravity"];
    assert.equal(ide.privacyLevel, "LOW");
    const movedIde = apply(ide, audit21PatchData(ide, patch21("google-antigravity")));
    assert.equal(movedIde.privacyLevel, "MEDIUM");
    assert.equal("privacyLevel" in audit20PatchData(movedIde as never, AUDIT_20_PATCHES.find((x) => x.slug === "google-antigravity")!), false);
  });

  it("the Antigravity CLI row audit 19 creates is MEDIUM with the new description, and an existing LOW row moves here", () => {
    const pre = pre21()["antigravity-cli"];
    assert.equal(pre.privacyLevel, "LOW");
    assert.equal(pre.description, ANTIGRAVITY_DESCRIPTION_OLD);
    const p = patch21("antigravity-cli");
    assert.deepEqual(audit21PatchData(pre, p), { privacyLevel: "MEDIUM", description: ANTIGRAVITY_DESCRIPTION_NEW });
    // A fresh create already holds the targets, so audit 21 has nothing left to do.
    const created = { ...pre, privacyLevel: ANTIGRAVITY_ROW.privacyLevel, description: ANTIGRAVITY_ROW.description };
    assert.deepEqual(audit21PatchData(created, p), {});
    assert.deepEqual(audit21GuardSkips(created, p), []);
    // A hand-edited rating or description is left alone and logged.
    const edited = { ...pre, privacyLevel: "HIGH", description: "Hand text." };
    assert.deepEqual(audit21PatchData(edited, p), {});
    assert.deepEqual(audit21GuardSkips(edited, p), ["description", "privacyLevel"]);
    // The description keeps the limits: opt-out, business accounts, and what continues with it off.
    assert.match(ANTIGRAVITY_DESCRIPTION_NEW, /Enable Telemetry setting is the opt-out/);
    assert.match(ANTIGRAVITY_DESCRIPTION_NEW, /business accounts \(Workspace, Gemini Enterprise\) have it always off/);
    assert.match(ANTIGRAVITY_DESCRIPTION_NEW, /provide the service, process feedback and keep Antigravity safe/);
    assert.match(ANTIGRAVITY_DESCRIPTION_NEW, /as of 2026-10-29/);
  });
});

describe("catalog audit 21: the corrections", () => {
  it("Antigravity: privacy MEDIUM on both rows, with the Enable Telemetry opt-out and its limits in the facts and guides", () => {
    assert.equal(snap("google-antigravity")?.privacyLevel, "MEDIUM");
    assert.equal(ANTIGRAVITY_ROW.privacyLevel, "MEDIUM");
    for (const slug of ["antigravity-cli", "google-antigravity"]) {
      const facts = getToolFacts(slug)!;
      const note = facts.privacy!.note ?? "";
      assert.match(note, /Enable Telemetry/);
      assert.match(note, /always off for business accounts/);
      assert.match(note, /Even when your Telemetry is toggled off, Google still uses your data to provide the service, process any feedback and help keep Antigravity safe/);
      assert.match(note, /no distinction between free and Google AI Pro or Ultra individual accounts/);
      assert.ok(isPublishedVerified(facts.privacy!));
      const g = guide(slug);
      assert.match(g, /Enable Telemetry/);
      assert.match(g, /Google still uses your data to provide the service|Google still uses your data to provide the service, process any feedback/);
      assert.match(g, /Business accounts \(Google Workspace, Gemini Enterprise\)|Business accounts \(Workspace, Gemini Enterprise\)/);
      assert.equal(getStaticTutorialForPlatform(slug)?.lastReviewedAt, CHECKED_AT);
      // The old "could not confirm" wording is gone.
      assert.doesNotMatch(g, /could not confirm that switching it off|do not treat it as a training opt-out/);
    }
    assert.match(JSON.stringify(getToolFacts("antigravity-cli")?.changelog), /Privacy MEDIUM \(Zach, audit 21\)/);
    assert.match(JSON.stringify(getToolFacts("google-antigravity")?.changelog), /Privacy MEDIUM \(Zach, audit 21\)/);
  });

  it("Restb.ai: ENTERPRISE, no claim that Restb Lens has self-serve plans or a trial, API sales-only", () => {
    assert.equal(snap("restb-ai")?.costTier, "ENTERPRISE");
    assert.equal(snap("restb-ai")?.description, RESTB_DESCRIPTION);
    assert.match(RESTB_DESCRIPTION, /The API is sold through sales only/);
    assert.match(RESTB_DESCRIPTION, /Restb Lens, its web tool, is a sign-up web app with no public prices/);
    assert.doesNotMatch(RESTB_DESCRIPTION, /self-serve/);
    assert.match(RESTB_DESCRIPTION_OLD, /has self-serve plans/);
    const facts = getToolFacts("restb-ai")!;
    assert.equal(facts.freeTier?.value.available, false);
    assert.doesNotMatch(JSON.stringify(facts.plans), /self-serve/);
    assert.match(JSON.stringify(facts.changelog), /Cost tier set to ENTERPRISE \(Zach, audit 21\)/);
    const g = guide("restb-ai");
    assert.match(g, /sign-up web app with no public prices/);
    assert.doesNotMatch(g, /two-week|promo code|plans start with a single-user plan|Request the two-week/);
    assert.equal(getStaticTutorialForPlatform("restb-ai")?.lastReviewedAt, CHECKED_AT);
    // The row text (audit 19's) still says no public prices and contact sales.
    assert.match(snap("restb-ai")?.currentPricing ?? "", /^No public prices/);
  });

  it("Clio: Starter $49, Core and up get pricing, 7-day trial, no free tier, AI from Core up, Clio Work an add-on, data never used for AI training", () => {
    const r = snap("clio-manage")!;
    assert.equal(r.costTier, "PAID");
    assert.match(r.currentPricing ?? "", /^Starter \$49 per user a month; Core, Signature and Elite: get pricing/);
    assert.match(r.currentPricing ?? "", /Clio Work, the legal AI add-on, is priced on request/);
    assert.match(r.freeTierFeatures ?? "", /^No free tier; 7-day free trial, no credit card required/);
    assert.match(r.usageLimits ?? "", /AI is included in the plan from Core up, and Clio Work is a separate add-on/);
    assert.doesNotMatch(`${r.currentPricing} ${r.usageLimits}`, /EasyStart|Essentials|\$39|\$69|\$99|\$129/);
    const facts = getToolFacts("clio-manage")!;
    assert.equal(facts.freeTier?.value.available, false);
    assert.equal(facts.privacy?.value.trainsOnData, false);
    assert.match(facts.privacy?.note ?? "", /never used for AI training or any other external purpose/);
    assert.ok(facts.plans?.value.some((p) => p.name === "Starter" && p.price === "$49"));
    assert.ok(facts.plans?.value.some((p) => p.name.startsWith("Clio Work") && p.price === "Get pricing"));
    assert.ok(isPublishedVerified(facts.plans!) && isPublishedVerified(facts.freeTier!) && isPublishedVerified(facts.privacy!));
    assert.match(guide("clio-manage"), /Clio Work/);
    assert.match(guide("clio-manage"), /never used for AI training or any other external purpose/);
    assert.equal(getStaticTutorialForPlatform("clio-manage")?.lastReviewedAt, CHECKED_AT);
  });

  it("Scholarcy: Plus $9.99 a month or $90 a year with a 1-week trial, a limited free tier with no number, no AI-training statement", () => {
    const r = snap("scholarcy")!;
    assert.equal(r.costTier, "FREEMIUM");
    assert.match(r.currentPricing ?? "", /Scholarcy Plus \$9\.99 a month or \$90 a year, with a 1-week free trial/);
    assert.match(r.freeTierFeatures ?? "", /limited allowance/);
    assert.match(r.freeTierFeatures ?? "", /state different limits, so no number is given/);
    assert.doesNotMatch(`${r.freeTierFeatures} ${r.usageLimits}`, /\b10 summaries|1 summary|per day/);
    const facts = getToolFacts("scholarcy")!;
    assert.equal(facts.freeTier?.value.available, true);
    assert.doesNotMatch(facts.freeTier!.value.summary, /\d/);
    assert.equal(facts.privacy?.value.trainsOnData, undefined);
    assert.match(facts.privacy?.note ?? "", /says nothing about using uploads to train AI models/);
    assert.ok(facts.plans?.value.some((p) => p.name === "Scholarcy Plus" && p.price === "$9.99" && /\$90 a year/.test(p.limits)));
    assert.match(guide("scholarcy"), /no AI-training statement at all/);
    assert.equal(getStaticTutorialForPlatform("scholarcy")?.lastReviewedAt, CHECKED_AT);
    assert.equal(snap("scholarcy")?.privacyLevel, "MEDIUM");
  });

  it("Naver: no row change and no price anywhere in its fact file", () => {
    assert.equal(AUDIT_21_PATCHES.some((p) => p.slug === "naver-hyperclova-x-cue"), false);
    const facts = getToolFacts("naver-hyperclova-x-cue")!;
    assert.equal(facts.plans, undefined);
    assert.equal(facts.freeTier, undefined);
    assert.equal(facts.apiPricing, undefined);
    assert.doesNotMatch(JSON.stringify(facts), /\$\d|\bwon\b|₩/);
    assert.match(JSON.stringify(facts.changelog), /no prices found, none added/);
  });

  it("Adobe Firefly: free daily generations (no stated limit, no monthly credits), paid plans $9.99 / $19.99 / $49.99 / $199.99 with 2k / 4k / 10k / 50k credits", () => {
    const r = snap("adobe-firefly")!;
    assert.equal(r.costTier, "FREEMIUM");
    assert.match(r.currentPricing ?? "", /^Free daily generations \(limit not stated\)/);
    assert.match(r.currentPricing ?? "", /Standard \$9\.99 \(2,000 credits\), Pro \$19\.99 \(4,000\), Pro Plus \$49\.99 \(10,000\), Premium \$199\.99 \(50,000\)/);
    assert.match(r.freeTierFeatures ?? "", /Free daily generations/);
    assert.match(r.freeTierFeatures ?? "", /daily count is not stated/);
    assert.doesNotMatch(`${r.currentPricing} ${r.freeTierFeatures}`, /25 (?:generative )?credits|monthly free/i);
    const facts = getToolFacts("adobe-firefly")!;
    assert.equal(facts.freeTier?.value.available, true);
    assert.deepEqual(facts.plans?.value.map((p) => [p.name, p.price]), [["Free", "$0"], ["Firefly Standard", "$9.99"], ["Firefly Pro", "$19.99"], ["Firefly Pro Plus", "$49.99"], ["Firefly Premium", "$199.99"]]);
    assert.ok(isPublishedVerified(facts.plans!));
    assert.equal(facts.plans?.sourceUrl, "https://www.adobe.com/products/firefly/plans.html");
  });

  it("Firefly stays an accepted answer for D02, 'a free alternative to Midjourney': its free tier is real and verified, and Midjourney has none", () => {
    // D02 asks for free Midjourney alternatives. Firefly qualifies only while it has a free tier with no card and no time limit; it does.
    const r = snap("adobe-firefly")!;
    assert.ok(["FREE", "FREEMIUM"].includes(r.costTier));
    const free = getToolFacts("adobe-firefly")!.freeTier!;
    assert.equal(free.value.available, true);
    assert.ok(isPublishedVerified(free));
    assert.match(free.value.summary, /no plan needed/);
    assert.equal(snap("midjourney")?.costTier === "FREE" || snap("midjourney")?.costTier === "FREEMIUM", false);
    const stress = readFileSync(join(process.cwd(), "src/lib/mcp/stress-replay.ts"), "utf8");
    assert.match(stress, /"adobe-firefly"\]\) >= 2/);
  });

  it("Topaz: no free plan; Studio $399 a year, $45 a month billed annually or $69 month to month; the conflicting Studio Pro monthly price is left off", () => {
    const r = snap("topaz-labs")!;
    assert.equal(r.costTier, "PAID");
    assert.match(r.currentPricing ?? "", /^No free plan; subscriptions only/);
    assert.match(r.currentPricing ?? "", /Topaz Studio \(all apps\) \$399\/yr, \$45\/mo billed annually or \$69\/mo month to month/);
    assert.doesNotMatch(r.currentPricing ?? "", /\$75|\$79|\$799|Studio Pro/);
    const facts = getToolFacts("topaz-labs")!;
    assert.equal(facts.freeTier?.value.available, false);
    const studioPro = facts.plans!.value.find((p) => p.name === "Topaz Studio Pro")!;
    assert.equal(studioPro.price, "$799");
    assert.doesNotMatch(JSON.stringify(studioPro), /\$75|\$79 /);
    assert.match(studioPro.limits, /conflicting monthly prices, so none is given/);
  });

  it("Cohere: the trial key is free but capped at 1,000 calls a month and not for production or commercial use; tier stays FREEMIUM", () => {
    const r = snap("cohere")!;
    assert.equal(r.costTier, "FREEMIUM");
    assert.match(r.freeTierFeatures ?? "", /capped at 1,000 API calls a month and rate limited/);
    assert.match(r.freeTierFeatures ?? "", /may not be used for production or commercial purposes/);
    assert.match(r.usageLimits ?? "", /^Trial key: 1,000 API calls a month/);
    assert.doesNotMatch(r.usageLimits ?? "", /generous/i);
    // Audit 20 owns the tier; audit 21 does not write it.
    assert.equal(patch21("cohere").guarded, undefined);
    assert.equal(AUDIT_20_PATCHES.find((p) => p.slug === "cohere")!.guarded!.costTier!.to, "FREEMIUM");
    const facts = getToolFacts("cohere")!;
    assert.equal(facts.freeTier?.value.available, true);
    assert.match(facts.freeTier!.value.summary, /1,000 API calls a month/);
    assert.match(facts.freeTier!.value.summary, /no expiry date/);
    assert.match(JSON.stringify(facts.usageLimits?.value), /Trial keys: 1,000 API calls a month/);
    assert.ok(isPublishedVerified(facts.usageLimits!));
    assert.equal(facts.usageLimits?.sourceUrl, "https://docs.cohere.com/docs/rate-limits");
  });

  it("Bedrock and Azure OpenAI: PAID, with only the general new-account credits mentioned", () => {
    for (const slug of ["amazon-bedrock", "azure-openai-service"]) {
      const r = snap(slug)!;
      assert.equal(r.costTier, "PAID", slug);
      assert.match(r.freeTierFeatures ?? "", /^No (?:Bedrock free tier of its own|free tier for the service itself)/, slug);
      assert.equal(getToolFacts(slug)?.freeTier?.value.available, false, slug);
      assert.match(JSON.stringify(getToolFacts(slug)?.changelog), /Cost tier stays PAID/, slug);
    }
    assert.match(snap("amazon-bedrock")?.freeTierFeatures ?? "", /the only credits are the general new-AWS-account ones \(up to \$200 over 6 months\)/);
    assert.match(snap("azure-openai-service")?.freeTierFeatures ?? "", /the only credit is the general new-Azure-account one \(\$200, usable for up to 30 days, new customers only\), not specific to Azure OpenAI/);
    assert.equal(getToolFacts("azure-openai-service")?.freeTier?.sourceUrl, "https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account");
    assert.ok(isPublishedVerified(getToolFacts("azure-openai-service")!.freeTier!));
  });

  it("Acrobat AI Assistant: included in Acrobat Studio ($24.99), not Standard or Pro; Express ($9.99) is marketed as AI-powered; content never used to train Adobe's models", () => {
    const r = snap("adobe-acrobat-ai-assistant")!;
    assert.equal(r.costTier, "PAID");
    assert.match(r.currentPricing ?? "", /^AI Assistant is included in Acrobat Studio \(\$24\.99\/mo, annual plan billed monthly\), not in Acrobat Standard \(\$14\.99\) or Pro \(\$19\.99\)/);
    assert.match(r.currentPricing ?? "", /Acrobat Express \(\$9\.99\/mo\) is marketed as AI-powered document insights/);
    assert.doesNotMatch(r.currentPricing ?? "", /built into Acrobat Express|22\.99/);
    const facts = getToolFacts("adobe-acrobat-ai-assistant")!;
    const plans = facts.plans!.value;
    assert.match(plans.find((p) => p.name === "Acrobat Studio")!.limits, /includes everything in Acrobat Pro, plus AI Assistant/);
    assert.match(plans.find((p) => p.name === "Acrobat Standard")!.limits, /AI Assistant not included/);
    assert.match(plans.find((p) => p.name === "Acrobat Pro")!.limits, /AI Assistant not included/);
    assert.doesNotMatch(plans.find((p) => p.name === "Acrobat Express")!.limits, /AI Assistant features included/);
    assert.equal(facts.privacy?.value.trainsOnData, false);
    assert.ok(isPublishedVerified(facts.privacy!));
    const g = guide("adobe-acrobat-ai-assistant");
    assert.match(g, /includes everything in Acrobat Pro, plus AI Assistant/);
    assert.doesNotMatch(g, /built into Adobe's paid Acrobat Express and Acrobat Studio/);
  });

  it("every fact file this audit touches is dated today with a vendor source and no affiliate link", () => {
    for (const slug of ["antigravity-cli", "google-antigravity", "restb-ai", "clio-manage", "scholarcy", "adobe-firefly", "topaz-labs", "cohere", "amazon-bedrock", "azure-openai-service", "adobe-acrobat-ai-assistant"]) {
      const facts = getToolFacts(slug)!;
      assert.ok(facts, slug);
      for (const [key, fact] of Object.entries(facts)) {
        if (!fact || typeof fact !== "object" || !("sourceUrl" in fact)) continue;
        assert.match(fact.sourceUrl, /^https:\/\//, `${slug}.${key}`);
        assert.doesNotMatch(fact.sourceUrl, /via=|ref=|affiliate|utm_|\/\/(?:www\.)?x\.com|twitter\.com/i, `${slug}.${key}`);
        if (fact.status === "verified") assert.ok(isPublishedVerified(fact), `${slug}.${key}: second reader recorded`);
      }
    }
  });
});

describe("catalog audit 21: dry run and guards", () => {
  it("dry run against the rows as audit 20 left them reports 11 rows / 22 fields; a re-run reports 0", () => {
    const pre = pre21();
    let rows = 0;
    let fields = 0;
    const kinds: Record<string, number> = {};
    for (const p of AUDIT_21_PATCHES) {
      const before = pre[p.slug];
      assert.ok(before, `${p.slug}: pre-audit row in the fixture`);
      const data = audit21PatchData(before, p);
      const keys = Object.keys(data);
      if (keys.length) {
        rows += 1;
        fields += keys.length;
        for (const k of keys) kinds[k] = (kinds[k] ?? 0) + 1;
      }
      const after = apply(before, data);
      assert.deepEqual(audit21PatchData(after, p), {}, `${p.slug}: re-run is a no-op`);
      assert.deepEqual(audit21GuardSkips(after, p), [], p.slug);
    }
    assert.equal(`audit21: ${rows} rows / ${fields} patched fields (dry-run)`, "audit21: 11 rows / 22 patched fields (dry-run)");
    assert.deepEqual(kinds, { description: 2, privacyLevel: 2, costTier: 2, currentPricing: 5, freeTierFeatures: 5, usageLimits: 3, upgradeTriggers: 3 });
  });

  it("leaves a hand-edited guarded field alone and reports it", () => {
    const p: Audit21Patch = {
      slug: "x",
      finding: "",
      sources: ["https://example.com"],
      checkedAt: CHECKED_AT,
      fields: {},
      guarded: {
        costTier: { from: ["FREE", "PAID"], to: "ENTERPRISE" },
        privacyLevel: { from: ["HIGH", "LOW"], to: "MEDIUM" },
        description: { from: [null, "Old description."], to: "New description." },
      },
    };
    assert.deepEqual(audit21PatchData(row(), p), { description: "New description.", costTier: "ENTERPRISE", privacyLevel: "MEDIUM" });
    assert.deepEqual(audit21PatchData(row({ description: null, costTier: "PAID", privacyLevel: "LOW" }), p), { description: "New description.", costTier: "ENTERPRISE", privacyLevel: "MEDIUM" });
    const edited = row({ description: "Hand text.", costTier: "FREEMIUM", privacyLevel: "MEDIUM" });
    assert.deepEqual(audit21PatchData(edited, p), {});
    assert.deepEqual(audit21GuardSkips(edited, p), ["description", "costTier"]);
    // A null privacy level is left alone, not overwritten.
    assert.deepEqual(audit21PatchData(row({ privacyLevel: null }), p).privacyLevel, undefined);
  });
});

describe("catalog audit 21: runner", () => {
  const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-21.ts"), "utf8");

  it("defaults to dry-run, uses the prod guard, updates once, creates and deletes nothing", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /CONFIRM_PROD_HOST=ep-odd-mud-ajdk8f99/);
    assert.match(source, /await countdown\(5\)/);
    assert.equal(source.match(/\.update\(/g)?.length, 1);
    assert.doesNotMatch(source, /\.(create|createMany|updateMany|delete|deleteMany|upsert)\(/);
    assert.match(source, /if \(dryRun\) continue;\n\s+await prisma\.platform\.update\(\{ where: \{ slug: patch\.slug \}, data \}\)/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /`audit21: \$\{rows\} rows \/ \$\{fields\} patched fields/);
    assert.match(source, /cache:revalidate/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-21"], "tsx scripts/update-catalog-audit-21.ts");
    assert.match(pkg.scripts.test, /audit-21\.test\.ts/);
  });

  it("selects every column the diff reads", () => {
    for (const col of ["description", "primaryUse", "currentPricing", "freeTierFeatures", "usageLimits", "upgradeTriggers", "costTier", "privacyLevel"]) {
      assert.match(source, new RegExp(`\\b${col}: true`), col);
    }
  });

  it("shares the prod guard of audits 15-20 byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-21.ts");
    assert.ok(guard.length > 0);
    for (const n of [15, 16, 17, 18, 19, 20]) assert.equal(guard, guardSection(`scripts/update-catalog-audit-${n}.ts`), `audit ${n}`);
  });

  it("never touches audits 10 or 11's scripts", () => {
    assert.doesNotMatch(source, /audit-10|audit-11/);
  });
});
