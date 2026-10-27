import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { taskTagsFor } from "@/data/task-tags";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { proseCheckDates, stripInlineCitations } from "@/lib/public-data/pricing";
import {
  AUDIT_10_PATCHES,
  AUDIT_10_WORDING,
  CHECKED_AT,
  audit10Slugs,
  audit10UpdateData,
  diffAudit10,
  diffAudit10Row,
  withoutOfficialClaim,
  type Audit10Row,
} from "./audit-10";
import { audit11Slugs } from "./audit-11";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "").replace(/^(docs|help|support)\./, "");
const patchFor = (slug: string) => {
  const patch = AUDIT_10_PATCHES.find((p) => p.slug === slug);
  assert.ok(patch, slug);
  return patch;
};
const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug)!;

const baseRow: Audit10Row = {
  description: "Old description",
  currentPricing: "Old pricing",
  freeTierFeatures: "Old free tier",
  usageLimits: null,
  primaryUse: "Old use",
  costTier: "ENTERPRISE",
  platformType: ["web", "mobile"],
};

describe("catalog audit 10: RA-verified corrections", () => {
  it("dates every change 2026-10-26 and cites only the vendor's own pages", () => {
    assert.equal(CHECKED_AT, "2026-10-26");
    for (const patch of AUDIT_10_PATCHES) {
      assert.equal(patch.checkedAt, CHECKED_AT, patch.slug);
      assert.ok(patch.sources.length > 0, patch.slug);
      for (const url of patch.sources) {
        assert.match(url, /^https:\/\//);
        assert.doesNotMatch(url, /(twitter|x)\.com\/|\/blog\//, `${patch.slug}: no X or blog sources`);
      }
    }
  });

  it("patches only rows with a fact file that cites the same vendor, and every price in the row text is in the facts", () => {
    for (const patch of AUDIT_10_PATCHES) {
      const facts = getToolFacts(patch.slug);
      assert.ok(facts, `${patch.slug} fact file`);
      const factUrls = (["freeTier", "plans", "apiPricing", "platforms", "features", "status"] as const)
        .map((k) => facts[k]?.sourceUrl)
        .filter((u): u is string => Boolean(u));
      assert.ok(patch.sources.some((u) => factUrls.map(host).includes(host(u))), `${patch.slug} cites its fact source`);
      const plans = facts.plans?.value ?? [];
      const planText = plans.map((p) => `${p.price} ${p.limits}`).join(" ");
      for (const price of patch.fields?.currentPricing?.match(/\$\d[\d,]*(\.\d+)?/g) ?? []) {
        const inFacts = (price === "$0" && facts.freeTier?.value.available === true) || planText.includes(price);
        assert.ok(inFacts, `${patch.slug} ${price}`);
      }
      assert.doesNotMatch(JSON.stringify(patch), /sponsor|affiliate|referral|utm_|@/i);
    }
  });

  it("every RA-corrected tool now has verified facts with a pricing source dated 2026-10-26", () => {
    for (const slug of ["otter-ai", "canva-ai-magic-studio", "midjourney", "julius-ai", "elicit", "opus-clip", "suno"]) {
      const f = getToolFacts(slug);
      assert.equal(f?.plans?.status, "verified", slug);
      assert.equal(f?.plans?.checkedAt, CHECKED_AT, slug);
      assert.equal(f?.freeTier?.checkedAt, CHECKED_AT, slug);
    }
  });

  it("Otter: no \"$24 billed annually\"; Business $19.99 and Pro $8.33 annual", () => {
    const pricing = patchFor("otter-ai").fields?.currentPricing ?? "";
    assert.doesNotMatch(pricing, /\$24\b/);
    assert.match(pricing, /Business \$30\/user\/mo billed monthly or \$19\.99\/user\/mo billed annually/);
    assert.match(pricing, /\$8\.33\/user\/mo billed annually/);
    assert.doesNotMatch(snap("otter-ai").currentPricing ?? "", /\$24\b/);
  });

  it("Canva: Free/Pro/Business/Enterprise from the pricing page, no $12.99, no Pro annual price", () => {
    const f = getToolFacts("canva-ai-magic-studio")!;
    assert.deepEqual(f.plans?.value.map((p) => p.name), ["Free", "Pro", "Business", "Enterprise"]);
    assert.equal(f.plans?.sourceUrl, "https://www.canva.com/pricing/");
    const pro = f.plans!.value.find((p) => p.name === "Pro")!;
    assert.equal(pro.price, "$18");
    assert.doesNotMatch(pro.limits, /\$1(44|80)/);
    assert.doesNotMatch(JSON.stringify(f.plans) + (snap("canva-ai-magic-studio").currentPricing ?? ""), /12\.99/);
  });

  it("Midjourney: PAID only while ENTERPRISE, web and Discord only, video in the primary use", () => {
    const patch = patchFor("midjourney");
    assert.deepEqual(patch.guarded?.costTier, { from: "ENTERPRISE", to: "PAID" });
    assert.deepEqual(audit10UpdateData(diffAudit10(baseRow, patch)).costTier, "PAID");
    assert.equal(diffAudit10({ ...baseRow, costTier: "FREEMIUM" }, patch).some((d) => d.field === "costTier"), false);
    assert.deepEqual(snap("midjourney").platformType, ["web"]);
    assert.equal(snap("midjourney").costTier, "PAID");
    assert.match(snap("midjourney").primaryUse ?? "", /video/);
    assert.deepEqual(getToolFacts("midjourney")?.platforms?.value, ["Web", "Discord"]);
  });

  it("GitHub Copilot gains desktop (add-only); its editors are a verified fact", () => {
    assert.deepEqual(snap("github-copilot").platformType, ["web", "desktop"]);
    assert.deepEqual(diffAudit10({ ...baseRow, platformType: ["web", "desktop"] }, patchFor("github-copilot")), []);
    assert.ok(getToolFacts("github-copilot")?.platforms?.value.includes("Visual Studio Code"));
  });

  it("Perplexity: $17 billed annually, no unstated $20 monthly", () => {
    const pricing = patchFor("perplexity-ai").fields?.currentPricing ?? "";
    assert.match(pricing, /Pro \$17\/mo billed annually/);
    assert.doesNotMatch(pricing, /\$20\b/);
    assert.ok(!getToolFacts("perplexity-ai")?.plans?.value.some((p) => p.price === "$20"));
  });

  it("QuillBot: free 125 / 1,200 words; prices stay unverified (RA: UNCONFIRMED)", () => {
    const f = getToolFacts("quillbot")!;
    assert.match(f.freeTier?.value.summary ?? "", /125 words.*1,200 words/);
    assert.equal(f.plans?.status, "unverified");
    assert.doesNotMatch(patchFor("quillbot").fields?.description ?? "", /unverified|unpublished/i);
  });

  it("Gemini lists Ultra 5x and Ultra 20x as separate plans", () => {
    const plans = getToolFacts("gemini")?.plans?.value ?? [];
    assert.equal(plans.find((p) => p.name === "Google AI Ultra 5x")?.price, "$99.99");
    assert.equal(plans.find((p) => p.name === "Google AI Ultra 20x")?.price, "$199.99");
  });

  it("Read AI: transcription tag and RA-verified plan prices", () => {
    assert.ok(taskTagsFor("read-ai")?.includes("transcription"));
    assert.equal(getToolFacts("read-ai")?.plans?.status, "verified");
  });

  it("Zoom AI Companion keeps its slug, reads as ZoomMate, stays FREEMIUM", () => {
    const f = getToolFacts("zoom-ai-companion")!;
    assert.equal(f.slug, "zoom-ai-companion");
    assert.match(f.displayName?.value ?? "", /ZoomMate/);
    assert.equal(f.status?.value.formerName, "Zoom AI Companion");
    assert.equal(snap("zoom-ai-companion").costTier, "FREEMIUM");
    // The ZoomMate price came from a search-index copy, so plans stay unverified; name and free tier are verified.
    assert.equal(f.plans?.status, "unverified");
    assert.equal(f.freeTier?.status, "verified");
    assert.equal(f.displayName?.status, "verified");
    assert.doesNotMatch(snap("zoom-ai-companion").currentPricing ?? "", /official/i);
  });

  it("no catalog row offers Microsoft's retired Copilot Pro (GitHub's Copilot Pro+ is a different plan)", () => {
    for (const row of snapshotRows()) {
      const text = [row.description, row.currentPricing, row.freeTierFeatures, row.usageLimits].join(" ");
      if (row.slug !== "github-copilot") assert.doesNotMatch(text, /\bCopilot Pro(?![+\w])/, row.slug);
    }
  });
});

describe("catalog audit 10: \"official\" wording on catalog-only rows", () => {
  it("drops the claim and keeps each dated marker", () => {
    assert.equal(withoutOfficialClaim("Free $0; Pro $10/mo (official, as of 2026-10-25)"), "Free $0; Pro $10/mo (as of 2026-10-25)");
    assert.equal(withoutOfficialClaim("Fancy $95/mo (official compare table, as of 2026-10-14)"), "Fancy $95/mo (per the compare table, as of 2026-10-14)");
    assert.equal(withoutOfficialClaim("Plans from $4.99/mo (official); higher tiers"), "Plans from $4.99/mo; higher tiers");
    assert.equal(withoutOfficialClaim("AI tool. Official product page (as of 2026-10-13): quote only."), "AI tool. Product page (as of 2026-10-13): quote only.");
    assert.equal(withoutOfficialClaim("Free. The official page lists the reset as daily"), "Free. The page lists the reset as daily");
    // A clause that says the official page could not be read makes no claim and is left alone.
    assert.equal(withoutOfficialClaim("Paid prices did not render on the official page"), "Paid prices did not render on the official page");
  });

  it("on every listed row: no claim left, same check dates, same page text apart from the word", () => {
    for (const { slug, fields } of AUDIT_10_WORDING) {
      for (const field of fields) {
        const after = snap(slug)[field];
        assert.ok(after, `${slug}.${field}`);
        assert.equal(claimsOfficial(after), false, `${slug}.${field}: ${after}`);
        assert.equal(withoutOfficialClaim(after), after, `${slug}.${field} is idempotent`);
        assert.doesNotMatch(stripInlineCitations(after), /\(\s*(per the [^)]*|)as of \d/, `${slug}.${field} still renders without the marker`);
        assert.ok(proseCheckDates([after]).length > 0 || !/as of/.test(after), `${slug}.${field} keeps its date`);
      }
    }
  });

  it("no wording entry touches a field a patch owns, and none has a price fact", () => {
    // Audit 11 later gave github-copilot owner-checked price facts and rewrote its text without "official".
    for (const { slug } of AUDIT_10_WORDING.filter((w) => !audit11Slugs().includes(w.slug) || !getToolFacts(w.slug)?.plans)) {
      const f = getToolFacts(slug);
      assert.ok(!f?.plans && !f?.freeTier && !f?.apiPricing, `${slug} has a price fact; fix the text through the fact file instead`);
    }
  });
});

describe("catalog audit 10: idempotent, guarded, add-only", () => {
  it("applies once, then reports 0 on the post-audit snapshot", () => {
    for (const slug of audit10Slugs()) {
      const row = snap(slug);
      assert.ok(row, slug);
      assert.deepEqual(diffAudit10Row(slug, row), [], `${slug}: re-run is a no-op`);
    }
  });

  it("platformType removes only the named value and appends only a missing one", () => {
    const diffs = diffAudit10(baseRow, { slug: "s", finding: "t", sources: ["https://e.example"], checkedAt: CHECKED_AT, platformType: { remove: ["mobile"], add: ["desktop"] } });
    assert.deepEqual(audit10UpdateData(diffs), { platformType: ["web", "desktop"] });
  });

  it("the runner defaults to dry-run, uses the prod guard, never deletes and prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-10.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.match(source, /if \(dryRun\) continue;\s*await prisma\.platform\.update/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*\.(to|description|currentPricing|freeTierFeatures|usageLimits|primaryUse)\b/);
    assert.doesNotMatch(source, /\.(create|createMany|delete|deleteMany|upsert)\(/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-10"], "tsx scripts/update-catalog-audit-10.ts");
    assert.equal(pkg.scripts["check:labels"], "tsx scripts/check-label-consistency.ts");
  });
});
