import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { snapshotRows } from "@/lib/mcp/snapshot";
import {
  CHECKED_AT,
  DEEPGRAM_COMPLEMENTARY_ADD,
  DEEPGRAM_SLUG,
  PIPECAT_ALTERNATIVES,
  PIPECAT_CATEGORY_ID,
  PIPECAT_CATEGORY_SLUG,
  PIPECAT_COMPLEMENTARY,
  PIPECAT_CURRENT_PRICING,
  PIPECAT_ID,
  PIPECAT_ROW,
  PIPECAT_SLUG,
  PIPECAT_SOURCES,
  audit32Sql,
  deepgramComplementaryAfter,
  pipecatCreateData,
} from "./audit-32";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug);

const guardSection = (file: string) => {
  const s = read(file);
  return s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
};

describe("catalog audit 32: Pipecat row (create only) next to Deepgram", () => {
  it("creates one row, and a re-run or a missing category creates none", () => {
    const data = pipecatCreateData(false, true)!;
    assert.equal(data.id, PIPECAT_ID);
    assert.equal(data.categoryId, PIPECAT_CATEGORY_ID);
    assert.equal(pipecatCreateData(true, true), null);
    assert.equal(pipecatCreateData(false, false), null);
  });

  it("sits in Deepgram's category and is in the snapshot", () => {
    const row = snap(PIPECAT_SLUG)!;
    assert.ok(row);
    assert.equal(row.category?.slug, PIPECAT_CATEGORY_SLUG);
    assert.equal(snap(DEEPGRAM_SLUG)?.category?.slug, PIPECAT_CATEGORY_SLUG);
    assert.equal(row.name, "Pipecat");
  });

  it("shows next to Deepgram: appended once to its complementary tools, by exact name", () => {
    assert.deepEqual(deepgramComplementaryAfter(["ElevenLabs (TTS)"]), ["ElevenLabs (TTS)", DEEPGRAM_COMPLEMENTARY_ADD]);
    assert.equal(deepgramComplementaryAfter(["Pipecat"]), null);
    assert.equal(deepgramComplementaryAfter(["pipecat"]), null);
    const dg = snap(DEEPGRAM_SLUG)!;
    assert.ok(dg.complementaryTools.includes("Pipecat"));
    assert.equal(dg.complementaryTools.filter((n) => n === "Pipecat").length, 1);
    // The page matches those names against listed rows by name.
    assert.equal(snapshotRows().filter((r) => r.name === "Pipecat").length, 1);
    assert.ok(PIPECAT_ROW.complementaryTools.includes("Deepgram"));
  });

  it("names only alternatives and companions that have rows", () => {
    const names = new Set(snapshotRows().map((r) => r.name));
    for (const name of [...PIPECAT_ALTERNATIVES, ...PIPECAT_COMPLEMENTARY]) assert.ok(names.has(name), name);
  });

  it("has the same fields as an existing row, points at Pipecat's own site, no affiliate or \"official\"", () => {
    const keys = Object.keys(snap("deepgram")!).filter((k) => !["updatedAt", "category"].includes(k));
    for (const key of keys) assert.ok(key in PIPECAT_ROW, key);
    assert.equal(PIPECAT_ROW.website, "https://pipecat.ai");
    assert.equal(PIPECAT_ROW.company, "Daily");
    assert.equal(PIPECAT_ROW.featured, false);
    assert.equal(PIPECAT_ROW.verified, true);
    assert.equal(PIPECAT_ROW.logoUrl, null);
    assert.doesNotMatch(JSON.stringify(PIPECAT_ROW), /via=|affiliate|referral|sponsor|utm_/i);
    for (const key of ["description", "currentPricing", "freeTierFeatures"] as const) {
      assert.match(PIPECAT_ROW[key], new RegExp(`as of ${CHECKED_AT}`), key);
      assert.equal(claimsOfficial(PIPECAT_ROW[key]), false, key);
    }
    for (const url of PIPECAT_SOURCES) assert.match(url, /^https:\/\/(pipecat\.ai|github\.com\/pipecat-ai|docs\.pipecat\.ai|www\.daily\.co|deepgram\.com)\//);
  });

  it("words the acquisition as announced, not completed, and does not invent a foundation page", () => {
    const text = [PIPECAT_ROW.description, JSON.stringify(getToolFacts(PIPECAT_SLUG)), JSON.stringify(getStaticTutorialForPlatform(PIPECAT_SLUG))];
    for (const t of text) {
      assert.match(t, /announced, not completed/);
      assert.doesNotMatch(t, /has acquired|completed the acquisition|acquired by Deepgram|owned by Deepgram/i);
    }
    assert.doesNotMatch(JSON.stringify(getToolFacts(PIPECAT_SLUG)), /pipecat\.ai\/foundation|foundation\.pipecat/i);
    assert.match(JSON.stringify(getToolFacts(PIPECAT_SLUG)), /no Pipecat Foundation page exists yet/);
  });

  it("states the pricing exactly and keeps it in step with the fact file", () => {
    assert.equal(
      PIPECAT_CURRENT_PRICING,
      "Free and open source (BSD 2-Clause). Optional Pipecat Cloud hosting (by Daily): agent-1x $0.01/min active ($0.0005/min reserved), agent-2x $0.02/min, agent-3x $0.03/min; WebRTC voice transport free for 1:1 sessions; telephony and recording extra; your LLM, STT and TTS providers bill separately (as of 2026-11-02)",
    );
    assert.equal(PIPECAT_ROW.currentPricing, PIPECAT_CURRENT_PRICING);
    assert.equal(PIPECAT_ROW.costTier, "FREEMIUM");
    const facts = getToolFacts(PIPECAT_SLUG)!;
    for (const key of ["plans", "freeTier"] as const) {
      assert.equal(facts[key]!.status, "verified", key);
      assert.equal(facts[key]!.checkedAt, CHECKED_AT, key);
    }
    assert.equal(facts.plans!.sourceUrl, "https://www.daily.co/pricing/pipecat-cloud/");
    assert.deepEqual(
      facts.plans!.value.map((p) => `${p.name} ${p.price}/${p.period || "-"}`),
      ["Pipecat (open source) $0/-", "Pipecat Cloud agent-1x $0.01/minute", "Pipecat Cloud agent-2x $0.02/minute", "Pipecat Cloud agent-3x $0.03/minute"],
    );
    const note = facts.plans!.note!;
    for (const re of [/\$0\.0005 per reserved minute|Unlimited concurrency/, /free for 1:1 voice sessions/, /\$0\.004 per participant minute/, /PSTN is \$0\.018 per minute/, /SIP is \$0\.003 to \$0\.02 per minute/, /10,000 active session minutes/, /bring your own LLM, STT and TTS providers/]) {
      assert.match(note, re);
    }
    for (const plan of facts.plans!.value.slice(1)) assert.match(plan.limits, /reserved minute/);
    assert.match(PIPECAT_ROW.currentPricing, /agent-1x \$0\.01\/min active \(\$0\.0005\/min reserved\)/);
  });

  it("carries the verified project facts and the GitHub star count only with its date", () => {
    const facts = getToolFacts(PIPECAT_SLUG)!;
    const all = JSON.stringify(facts);
    assert.match(all, /BSD 2-Clause/);
    assert.match(all, /200\+ integrated providers/);
    assert.match(all, /WebRTC, SIP and PSTN/);
    assert.match(all, /Python >=3\.11|Python \(3\.11\+\)/);
    assert.match(all, /16,999 GitHub stars[^"]*as of 2026-11-02/);
    assert.match(all, /steering committee/);
    assert.equal(facts.lifecycle, "active");
    assert.doesNotMatch(JSON.stringify(PIPECAT_ROW), /GitHub stars/);
  });

  it("has a registered guide reviewed today, from the quickstart only", () => {
    const guide = getStaticTutorialForPlatform(PIPECAT_SLUG)!;
    assert.equal(guide.slug, "pipecat-getting-started");
    assert.equal(guide.lastReviewedAt, CHECKED_AT);
    assert.equal(guide.disclosure, undefined);
    assert.equal(guide.archetype, "pick-and-setup");
    const text = JSON.stringify(guide);
    for (const cmd of ["uv tool install", "pipecat init quickstart", "cd pipecat-quickstart", "cp .env.example .env", "uv sync", "uv run bot.py", "http://localhost:7860/client", "pipecat cloud auth login", "pipecat cloud secrets set pipecat-quickstart-secrets --file .env", "pipecat cloud deploy"]) {
      assert.ok(text.includes(cmd), cmd);
    }
    assert.doesNotMatch(text, /via=|affiliate|referral|utm_/i);
  });
});

describe("catalog audit 32: logo", () => {
  it("is registered in the runtime index, the manifest and the plates", () => {
    const assets = JSON.parse(read("src/lib/platform-logo-assets.json"));
    assert.equal(assets.pipecat, "pipecat.png");
    const logos = JSON.parse(read("public/images/platforms/catalog-logos.json")) as { slug: string; file: string; source: string }[];
    const entry = logos.find((l) => l.slug === "pipecat");
    assert.equal(entry?.file, "pipecat.png");
    assert.match(entry?.source ?? "", /^https:\/\/github\.com\/pipecat-ai/);
    const plates = JSON.parse(read("src/lib/platform-logo-plates.json"));
    assert.equal(plates["pipecat.png"], "light");
  });

  it("has the PNG file", () => {
    const file = join(process.cwd(), "public/images/platforms/pipecat.png");
    assert.ok(existsSync(file), "copy C:\\Users\\Zach\\pipecat-logo.png to public/images/platforms/pipecat.png");
    assert.equal(readFileSync(file).subarray(1, 4).toString(), "PNG");
  });
});

describe("catalog audit 32: SQL file", () => {
  const lines = read("scripts/sql/audit-32-pipecat.sql").split("\n").filter((l) => l.length > 0);

  it("matches the generator: one complete guarded statement per line", () => {
    assert.deepEqual(lines, audit32Sql());
    assert.equal(lines.length, 2);
    for (const l of lines) assert.ok(l.endsWith(";"));
  });

  it("guards the insert by slug and category, and the update by the list itself", () => {
    const [insert, update] = lines;
    assert.match(insert, /^INSERT INTO platforms \(/);
    assert.match(insert, /WHERE NOT EXISTS \(SELECT 1 FROM platforms WHERE slug = \$a32\$pipecat\$a32\$\)/);
    assert.match(insert, /AND EXISTS \(SELECT 1 FROM categories WHERE id = \$a32\$cmnxhfk4u004q88svb7gaw4ew\$a32\$\);$/);
    assert.match(insert, /\$a32\$cmpipecataudit32x0000001\$a32\$/);
    assert.match(insert, /::"CostTier"/);
    assert.match(insert, /::"Difficulty"/);
    assert.match(insert, /::"PrivacyLevel"/);
    assert.match(update, /^UPDATE platforms SET "complementaryTools" = array_append\("complementaryTools", \$a32\$Pipecat\$a32\$\)/);
    assert.match(update, /WHERE slug = \$a32\$deepgram\$a32\$ AND NOT \(\$a32\$Pipecat\$a32\$ = ANY\("complementaryTools"\)\);$/);
    assert.doesNotMatch(lines.join("\n"), /\b(DELETE|DROP|TRUNCATE|ALTER)\b/i);
  });

  it("names every column the schema requires (id, slug, name, categoryId, updatedAt)", () => {
    const cols = lines[0].slice(lines[0].indexOf("(") + 1, lines[0].indexOf(")")).split(", ");
    for (const c of ['"id"', '"slug"', '"name"', '"categoryId"', '"createdAt"', '"updatedAt"']) assert.ok(cols.includes(c), c);
    const schema = read("prisma/schema.prisma");
    const model = schema.slice(schema.indexOf("model Platform {"), schema.indexOf('@@map("platforms")'));
    const fields = [...model.matchAll(/^\s{2}(\w+)\s+(?!@@)\S+/gm)].map((m) => m[1]).filter((f) => !["category", "reviews", "tutorials", "userFavorites", "userProgress", "prompts", "discussions"].includes(f));
    for (const f of fields) assert.ok(cols.includes(`"${f}"`), f);
  });
});

describe("catalog audit 32: runner", () => {
  const source = read("scripts/insert-catalog-audit-32.ts");

  it("defaults to dry-run, uses the prod guard, creates only pipecat, never deletes", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /ep-odd-mud-ajdk8f99/);
    assert.match(source, /await countdown\(5\)/);
    assert.equal(source.match(/\.create\(/g)?.length, 1);
    assert.equal(source.match(/\.update\(/g)?.length, 1);
    assert.match(source, /if \(!dryRun\) await prisma\.platform\.create\(\{ data \}\)/);
    assert.match(source, /data: \{ complementaryTools: next \}/);
    assert.doesNotMatch(source, /\.(updateMany|createMany|delete|deleteMany|upsert)\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /`audit32: \$\{created\} created, \$\{appended\} appended/);
    assert.match(source, /cache:revalidate/);
    const pkg = JSON.parse(read("package.json"));
    assert.equal(pkg.scripts["db:insert-catalog-audit-32"], "tsx scripts/insert-catalog-audit-32.ts");
    assert.match(pkg.scripts.test, /audit-32\.test\.ts/);
  });

  it("shares audit 15's prod guard byte for byte", () => {
    const guard = guardSection("scripts/insert-catalog-audit-32.ts");
    assert.ok(guard.length > 0);
    assert.equal(guard, guardSection("scripts/update-catalog-audit-15.ts"));
    assert.equal(guard, guardSection("scripts/update-catalog-audit-16.ts"));
  });
});

describe("catalog audit 32: claude pricing as_of", () => {
  it("get_pricing_facts for claude reports as_of 2026-11-02 (freeTier.checkedAt), not 2026-10-26", () => {
    const facts = getToolFacts("claude")!;
    assert.equal(facts.freeTier!.checkedAt, "2026-11-02");
    assert.equal(facts.freeTier!.verifiedAt, "2026-11-02");
    assert.equal(facts.plans!.checkedAt, "2026-11-02");
  });
});
