import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { catalogRedirects, PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { isHiddenPlatform } from "@/lib/catalog-visibility";
import { loadSnapshot } from "@/lib/mcp/snapshot";
import {
  AUDIT_15_NAME_RENAMES,
  AUDIT_15_RENAMES,
  CHECKED_AT,
  AUDIT_15_PATCHES,
  AUDIT_15_REF_REMOVALS,
  audit15PatchData,
  audit15RefRemoval,
  audit15RefUpdates,
  audit15UpdateData,
  planAudit15Fields,
  preRenameSlug15,
} from "./audit-15";

const ROOT = process.cwd();
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");

/** The prod-guard section every audit script shares, from getDirectUrl up to the Prisma client. */
const guardSection = (file: string) => {
  const text = read(file);
  return text.slice(text.indexOf("function getDirectUrl"), text.indexOf("  const prisma = new PrismaClient"));
};

const renameFor = (from: string) => {
  const rename = AUDIT_15_RENAMES.find((r) => r.from === from);
  assert.ok(rename, from);
  return rename;
};

describe("catalog audit 15: renames", () => {
  it("renames exactly the four guide PR D slugs, dated and sourced", () => {
    assert.equal(CHECKED_AT, "2026-10-29");
    assert.deepEqual(
      AUDIT_15_RENAMES.map((r) => [r.from, r.to]),
      [
        ["google-vertex-ai", "gemini-enterprise-agent-platform"],
        ["google-imagen-3", "nano-banana"],
        ["text-generation-webui-oobabooga", "textgen"],
        ["notebooklm", "gemini-notebook"],
      ],
    );
    for (const r of AUDIT_15_RENAMES) {
      assert.equal(r.checkedAt, CHECKED_AT);
      assert.ok(r.sources.length > 0, r.from);
      for (const url of r.sources) assert.match(url, /^https:\/\//);
    }
  });

  it("agrees with the 301s, the fact files and the guides", () => {
    for (const r of AUDIT_15_RENAMES) {
      assert.equal(PLATFORM_REDIRECTS[r.from], r.to, r.from);
      const facts = getToolFacts(r.to);
      assert.ok(facts, `${r.to} has no fact file`);
      assert.equal(facts.lifecycle, "renamed", r.to);
      assert.equal(facts.displayName?.value, r.name, r.to);
      assert.equal(getToolFacts(r.from), undefined, `${r.from} still has a fact file`);
      if (r.website) assert.equal(facts.officialUrl?.value, r.website, r.to);
      const guide = getStaticTutorialForPlatform(r.to);
      assert.ok(guide, `${r.to} has no guide`);
      assert.equal(guide.slug, `${r.to}-getting-started`);
      assert.equal(guide.lastReviewedAt, CHECKED_AT);
      assert.equal(getStaticTutorialForPlatform(r.from), undefined, `${r.from} guide still registered`);
      assert.equal(isHiddenPlatform(r.to), false, r.to);
    }
  });

  it("301s every old platform URL, including the guide, to the new slug", () => {
    const moves = catalogRedirects();
    for (const r of AUDIT_15_RENAMES) {
      assert.ok(moves.some((m) => m.source === `/platform/${r.from}` && m.destination === `/platform/${r.to}`), r.from);
      assert.ok(
        moves.some((m) => m.source === `/platform/${r.from}/:path*` && m.destination === `/platform/${r.to}/:path*`),
        r.from,
      );
    }
  });

  it("titles each guide with the new name and the old one", () => {
    const formerly: Record<string, string> = {
      "gemini-enterprise-agent-platform": "formerly Vertex AI",
      "nano-banana": "formerly Google Imagen",
      textgen: "formerly text-generation-webui",
      "gemini-notebook": "formerly NotebookLM",
    };
    for (const r of AUDIT_15_RENAMES) {
      const title = getStaticTutorialForPlatform(r.to)!.title;
      assert.ok(title.includes(r.name), title);
      assert.ok(title.includes(formerly[r.to]), title);
    }
  });

  it("writes name and website only over the expected old value", () => {
    const vertex = renameFor("google-vertex-ai");
    const stale = { name: "Google Vertex AI", website: "https://cloud.google.com/vertex-ai" };
    const plans = planAudit15Fields(stale, vertex);
    assert.deepEqual(audit15UpdateData(plans), { name: vertex.name, website: vertex.website });
    // Re-run: nothing to write.
    assert.deepEqual(audit15UpdateData(planAudit15Fields({ name: vertex.name, website: vertex.website! }, vertex)), {});
    // A hand edit is left alone and reported.
    const edited = planAudit15Fields({ name: "Vertex (hand edit)", website: null }, vertex);
    assert.deepEqual(audit15UpdateData(edited), {});
    assert.deepEqual(edited.map((p) => p.action), ["differs", "differs"]);
  });

  it("leaves Gemini Notebook's website alone and its audit-3 name in place", () => {
    const notebook = renameFor("notebooklm");
    assert.equal(notebook.website, undefined);
    const plans = planAudit15Fields({ name: "Gemini Notebook", website: "https://notebook.google/" }, notebook);
    assert.deepEqual(plans, [{ field: "name", action: "already" }]);
    assert.deepEqual(audit15UpdateData(plans), {});
  });

  it("reads a dry-run patch under the pre-rename slug", () => {
    assert.equal(preRenameSlug15("nano-banana"), "google-imagen-3");
    assert.equal(preRenameSlug15("chatgpt"), "chatgpt");
  });
});

describe("catalog audit 15: name references", () => {
  it("rewrites exact old names and their suffixed variants, idempotently", () => {
    const row = {
      directAlternatives: ["Amazon Bedrock", "Google Vertex AI"],
      complementaryTools: ["NotebookLM (doc research)", "Google Imagen 3 (images)"],
      budgetAlternativeTo: ["NotebookLM (free)", "Gemini Notebook (free)"],
      privacyAlternativeTo: [],
    };
    const updates = audit15RefUpdates(row);
    const by = Object.fromEntries(updates.map((u) => [u.field, u.to]));
    assert.deepEqual(by.directAlternatives, ["Amazon Bedrock", "Gemini Enterprise Agent Platform"]);
    assert.deepEqual(by.complementaryTools, ["Gemini Notebook (doc research)", "Nano Banana (images)"]);
    // The new name is already there, so the old entry is dropped, not duplicated.
    assert.deepEqual(by.budgetAlternativeTo, ["Gemini Notebook (free)"]);
    assert.deepEqual(audit15RefUpdates({ ...row, ...by } as typeof row), []);
  });

  it("never touches a Clarifai reference", () => {
    for (const r of AUDIT_15_NAME_RENAMES) assert.doesNotMatch(r.from + r.to, /clarifai/i);
  });

  it("leaves no old name in the snapshot's reference columns", () => {
    const olds = new Set(AUDIT_15_NAME_RENAMES.map((r) => r.from.toLowerCase()));
    for (const row of loadSnapshot().rows as unknown as Record<string, unknown>[]) {
      for (const field of ["directAlternatives", "complementaryTools", "budgetAlternativeTo", "privacyAlternativeTo"]) {
        for (const entry of (row[field] as string[] | undefined) ?? []) {
          assert.equal(olds.has(entry.toLowerCase()), false, `${row.slug}.${field}: ${entry}`);
        }
      }
    }
  });

  it("the snapshot holds the new slugs, not the old ones", () => {
    const slugs = new Set(loadSnapshot().rows.map((r) => r.slug));
    for (const r of AUDIT_15_RENAMES) {
      assert.ok(slugs.has(r.to), r.to);
      assert.equal(slugs.has(r.from), false, r.from);
    }
  });
});

describe("guide PR D: Clarifai unpublished reversibly", () => {
  it("hides the page, retires the guide with a 301, and keeps the data", () => {
    const facts = getToolFacts("clarifai");
    assert.ok(facts);
    assert.equal(facts.visibility, "hidden");
    // Shutdown confirmed; the team-and-IP move is sourced to Nebius's release.
    assert.equal(facts.lifecycle, "discontinued");
    assert.match(facts.status?.value.headline ?? "", /shut down/);
    assert.match(facts.status?.value.headline ?? "", /Nebius/);
    assert.match(facts.status?.sourceUrl ?? "", /^https:\/\/nebius\.com\/newsroom\//);
    assert.ok(facts.status?.value.details?.some((d) => d.includes("did not announce buying Clarifai")));
    assert.ok(isHiddenPlatform("clarifai"));
    assert.ok(RETIRED_GUIDE_SLUGS.includes("clarifai"));
    assert.equal(getStaticTutorialForPlatform("clarifai"), undefined);
    assert.ok(
      catalogRedirects().some((m) => m.source === "/platform/clarifai/guide" && m.destination === "/platform/clarifai"),
    );
    // The guide text is kept for a restore, outside the registry.
    assert.match(read("src/data/tutorials/retired/clarifai-getting-started.ts"), /platformSlug: "clarifai"/);
    assert.equal("clarifai" in PLATFORM_REDIRECTS, false);
    const snap = loadSnapshot();
    assert.ok(snap.hidden_rows.includes("clarifai"));
  });

  it("audit 15 never names the clarifai row", () => {
    assert.doesNotMatch(read("src/data/catalog-audits/audit-15.ts").replace(/\/\*\*[\s\S]*?\*\//g, ""), /clarifai/i);
    assert.doesNotMatch(read("scripts/update-catalog-audit-15.ts").replace(/\/\*\*[\s\S]*?\*\//, ""), /clarifai/i);
  });
});

describe("guide PR D: Tabnine retired to a what-happened note", () => {
  it("retires the guide with a 301 and keeps its text outside the registry", () => {
    assert.ok(RETIRED_GUIDE_SLUGS.includes("tabnine"));
    assert.equal(getStaticTutorialForPlatform("tabnine"), undefined);
    assert.ok(
      catalogRedirects().some((m) => m.source === "/platform/tabnine/guide" && m.destination === "/platform/tabnine"),
    );
    assert.match(read("src/data/tutorials/retired/tabnine-getting-started.ts"), /platformSlug: "tabnine"/);
    // The page stays listed: it is the note readers land on.
    assert.equal(isHiddenPlatform("tabnine"), false);
  });

  it("states the acquisition, the integration and customer support, sourced to Tricentis", () => {
    const facts = getToolFacts("tabnine");
    assert.ok(facts?.status);
    assert.equal(facts.lifecycle, "discontinued");
    assert.equal(facts.status.sourceUrl, "https://www.tricentis.com/news/tricentis-acquires-tabnine");
    const text = [facts.status.value.headline, ...(facts.status.value.details ?? [])].join(" ");
    assert.match(text, /July 30, 2026/);
    assert.match(text, /Agentic Quality Engineering Platform/);
    assert.match(text, /existing customers would continue to be supported/);
    assert.equal(facts.plans, undefined);
    assert.equal(facts.freeTier, undefined);
  });

  it("audit 15 removes the row's pricing claims and the rows recommending it", () => {
    const patch = AUDIT_15_PATCHES.find((p) => p.slug === "tabnine");
    assert.ok(patch);
    assert.doesNotMatch(JSON.stringify(patch.fields), /\$\d/);
    assert.equal(patch.fields.usageLimits, null);
    assert.deepEqual(
      AUDIT_15_REF_REMOVALS.map((r) => `${r.slug}.${r.field}`),
      ["amazon-q-developer.directAlternatives", "github-copilot.directAlternatives", "github-copilot.budgetAlternativeTo"],
    );
    assert.deepEqual(audit15RefRemoval("github-copilot", "directAlternatives", ["Cursor", "tabnine"]), ["Cursor"]);
    assert.equal(audit15RefRemoval("github-copilot", "directAlternatives", ["Cursor"]), null);
    assert.equal(audit15RefRemoval("cursor", "directAlternatives", ["Tabnine"]), null);
  });
});

describe("catalog audit 15: row patches", () => {
  const patchFor = (slug: string) => {
    const patch = AUDIT_15_PATCHES.find((p) => p.slug === slug);
    assert.ok(patch, slug);
    return patch;
  };

  it("patches exactly the four RA-verified rows, dated and sourced on the vendor's pages", () => {
    // Canva's row already matches (audits 10 and 11); only its fact file changed.
    assert.deepEqual(AUDIT_15_PATCHES.map((p) => p.slug), ["tabnine", "scite", "lindy-ai", "activepieces"]);
    for (const p of AUDIT_15_PATCHES) {
      assert.equal(p.checkedAt, CHECKED_AT);
      assert.ok(p.sources.length > 0 && p.sources.every((u) => u.startsWith("https://")), p.slug);
    }
  });

  it("Scite: no free plan, paid-only MCP credits, never claims trial or free MCP credits", () => {
    const patch = patchFor("scite");
    assert.match(patch.fields.currentPricing ?? "", /^No free plan\. Basic \$12\/mo billed yearly; Pro \$40\/mo billed yearly/);
    assert.match(patch.fields.usageLimits ?? "", /Basic: 250 MCP credits\/mo; Pro: 2,500 MCP credits\/mo plus API access/);
    assert.match(patch.fields.usageLimits ?? "", /trial's MCP credits are not stated/);
    for (const text of Object.values(patch.fields)) assert.doesNotMatch(text ?? "", /free[^.]*MCP credits/i);
    assert.deepEqual(patch.costTier, { from: "FREEMIUM", to: "PAID" });
    const facts = getToolFacts("scite");
    assert.equal(facts?.freeTier?.value.available, false);
    assert.deepEqual(facts?.plans?.value.map((p) => [p.name, p.price]), [["Basic", "$12"], ["Pro", "$40"], ["Enterprise", "Custom"]]);
  });

  it("Lindy: $49.99 for 5,000 credits, top tier and top-ups, no $29.99 anywhere", () => {
    const patch = patchFor("lindy-ai");
    assert.match(patch.fields.currentPricing ?? "", /Team from \$49\.99\/mo per active user for 5,000 credits/);
    assert.match(patch.fields.currentPricing ?? "", /1,750,000 credits for \$9,999\.50; top-ups \$10 per 1,000 credits/);
    assert.doesNotMatch(JSON.stringify(patch.fields), /29\.99|3,000/);
    assert.match(getToolFacts("lindy-ai")?.plans?.value[0].price ?? "", /^from \$49\.99\/mo per active user \(5,000 credits each\)$/);
  });

  it("Activepieces: 1,000 credits a month, refreshing daily, per the pricing table", () => {
    const patch = patchFor("activepieces");
    for (const field of ["currentPricing", "freeTierFeatures", "usageLimits"] as const) {
      assert.match(patch.fields[field] ?? "", /1,000 credits a month, refreshing daily/, field);
    }
  });

  it("Canva: facts say Pro yearly is $144 (not $180), Business $250, no Teams plan offered", () => {
    const facts = getToolFacts("canva-ai-magic-studio");
    const plans = facts?.plans?.value ?? [];
    assert.deepEqual(plans.map((p) => p.name), ["Free", "Pro", "Business", "Enterprise"]);
    assert.match(plans[1].limits, /\$144\/year/);
    assert.doesNotMatch(JSON.stringify(plans), /180/);
    assert.match(plans[2].limits, /\$250\/year per person/);
    assert.equal(facts?.plans?.checkedAt, CHECKED_AT);
    assert.match(facts?.plans?.note ?? "", /Prices exclude applicable tax/);
  });

  it("writes only differing fields, and costTier only from its expected old value", () => {
    const patch = patchFor("scite");
    const row = {
      description: null,
      primaryUse: "x",
      currentPricing: patch.fields.currentPricing ?? null,
      freeTierFeatures: "old",
      usageLimits: patch.fields.usageLimits ?? null,
      costTier: "FREEMIUM",
    };
    assert.deepEqual(audit15PatchData(row, patch), { freeTierFeatures: patch.fields.freeTierFeatures, costTier: "PAID" });
    assert.deepEqual(audit15PatchData({ ...row, freeTierFeatures: patch.fields.freeTierFeatures ?? null, costTier: "ENTERPRISE" }, patch), {});
    const tabnine = patchFor("tabnine");
    assert.equal(audit15PatchData({ ...row, usageLimits: "Free: basic" }, tabnine).usageLimits, null);
  });
});

describe("catalog audit 15: operator script", () => {
  const script = read("scripts/update-catalog-audit-15.ts");

  it("shares audit 14's prod guard byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-15.ts");
    assert.ok(guard.length > 0);
    assert.equal(guard, guardSection("scripts/update-catalog-audit-14.ts"));
    assert.equal(guard, guardSection("scripts/update-catalog-audit-11.ts"));
  });

  it("is a dry run unless --apply, and documents the production override", () => {
    assert.match(script, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\);/);
    assert.match(script, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(script, /CONFIRM_PROD_HOST='ep-odd-mud-ajdk8f99'/);
    assert.match(script, /--confirm-production --apply/);
    assert.match(script, /OPERATOR ONLY/);
  });

  it("refuses a rename whose target exists, and never deletes or creates rows", () => {
    assert.match(script, /refusing rename/);
    assert.doesNotMatch(script, /\.(delete|deleteMany|create|createMany|upsert)\(/);
  });

  it("is wired to an npm script", () => {
    assert.match(read("package.json"), /"db:update-catalog-audit-15": "tsx scripts\/update-catalog-audit-15\.ts"/);
  });
});
