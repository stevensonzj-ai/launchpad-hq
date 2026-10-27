import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { row } from "./fixtures";
import { searchToolsInput, searchToolsOutput } from "./schemas";
import { snapshotRows } from "./snapshot";
import { isStale, negatedWords, searchTools, STARTER_REASON, toPlatformRef, type CatalogRow } from "./tools";

/**
 * Fix plan P1.2: intent synonyms, labelled fallback, negation, evidence
 * tie-break, budget / skill / platform tiers, top-3 job gate, truncation and
 * the stale honesty label. Snapshot cases use the real catalog; hand-built
 * rows pin each rule in isolation.
 */

const ROWS = snapshotRows();
const facts = getToolFacts;
const search = (task: string, extra: Partial<Parameters<typeof searchTools>[0]> = {}) =>
  searchTools({ task, ...extra }, ROWS, facts);
const slugs = (out: ReturnType<typeof searchTools>) => out.results.map((r) => r.slug);
const none = () => undefined;
const IMAGES = { name: "Image Generation & Editing", slug: "image-generation-editing" };

describe("intent synonyms (snapshot)", () => {
  it("plain-language asks that used to return nothing now name their task", () => {
    assert.ok(slugs(search("homework help and studying", { budget: "free", skill_level: "beginner" })).includes("khan-academy-khanmigo"));
    assert.ok(slugs(search("analyze spreadsheet data")).includes("julius-ai"));
    assert.ok(slugs(search("record and edit a podcast")).includes("descript"));
    assert.deepEqual(slugs(search("AI chatbot assistant", { budget: "free", skill_level: "beginner" })).filter((s) => ["chatgpt", "gemini"].includes(s)).length, 2);
  });

  it('"meeting transcription" includes Read AI, Otter and Fireflies (code-only meeting-notes phrases)', () => {
    const top10 = slugs(search("meeting transcription", { limit: 10 }));
    for (const slug of ["read-ai", "otter-ai", "fireflies-ai"]) assert.ok(top10.includes(slug), `${slug}: ${top10.join(", ")}`);
  });

  it("a few non-English words reach the same tasks", () => {
    const out = search("🎨 crear logotipos gratis für mein Geschäft ✨");
    assert.ok(out.results.slice(0, 3).every((r) => r.tasks?.includes("logo-design")), slugs(out).join(", "));
    assert.ok(slugs(search("traducir documentos")).includes("deepl"));
  });
});

describe("labelled fallback", () => {
  it("a search with no topic gets a starter set, every item labelled and none counted", () => {
    for (const task of ["ai", "help", "best ai tool"]) {
      const out = search(task);
      assert.equal(out.fallback, "starter", task);
      assert.equal(out.total_matches, 0, task);
      assert.ok(out.results.length >= 3, task);
      for (const r of out.results) {
        assert.equal(r.fallback, true, `${task}: ${r.slug}`);
        assert.ok(r.match_reasons.includes(STARTER_REASON), r.slug);
        assert.equal(r.verification, "verified", r.slug);
        assert.ok(r.tasks?.includes("chatbot"), r.slug);
      }
      assert.match(out.note ?? "", /popular starter tools \(labelled fallback\), not direct matches/);
    }
  });

  it("thin results are topped up from the same category, labelled, and not counted", () => {
    const out = search("voice cloning");
    const direct = out.results.filter((r) => !r.fallback);
    const extra = out.results.filter((r) => r.fallback);
    assert.equal(out.fallback, "top_up");
    assert.equal(out.total_matches, direct.length);
    assert.ok(direct.length < 3 && extra.length > 0);
    for (const r of extra) {
      assert.match(r.match_reasons[0], /^fallback: popular verified tool in .+, not a direct match$/);
      assert.equal(r.verification, "verified");
      assert.equal(r.category, direct[0].category);
    }
    assert.match(out.note ?? "", /labelled fallback, not direct matches/);
  });

  it("a top-up must share a curated task, so unrelated neighbours never pad results", () => {
    const rows = [
      row({ slug: "bgone", name: "BgOne", primaryUse: "Remove image background", category: IMAGES }),
      row({ slug: "salesy", name: "Salesy", primaryUse: "Sales emails", category: IMAGES }),
    ];
    const verified = (slug: string) =>
      slug === "salesy"
        ? ({ slug, freeTier: { value: { available: true, summary: "Free" }, checkedAt: "2026-10-20", sourceUrl: "https://salesy.example.com/pricing", status: "verified" } } as never)
        : undefined;
    const out = searchTools({ task: "remove image background" }, rows, verified);
    assert.deepEqual(slugs(out), ["bgone"]);
    assert.equal(out.fallback, null);
  });

  it("direct matches never carry the fallback flag", () => {
    for (const r of search("cover letter").results) assert.equal(r.fallback, undefined, r.slug);
    assert.equal(search("cover letter").fallback, null);
  });

  it("nonsense still returns nothing, with the old note", () => {
    const out = search("quantum knitting zzz");
    assert.equal(out.results.length, 0);
    assert.match(out.note ?? "", /No Launchpad HQ tools matched/);
  });
});

describe("negation guard", () => {
  it('"without coding" drops the coding task and the negated word', () => {
    assert.deepEqual([...negatedWords("build a website without coding")].includes("coding"), true);
    const out = search("build a website without coding", { skill_level: "beginner" });
    assert.ok(!slugs(out).includes("cline"), slugs(out).join(", "));
    assert.ok(slugs(out).slice(0, 3).some((s) => ["wix-ai", "squarespace-ai"].includes(s)), slugs(out).join(", "));
    for (const r of out.results) assert.ok(!r.match_reasons.includes("task: coding (curated tag)"), r.slug);
  });
});

describe("budget filter by price", () => {
  const rows: CatalogRow[] = [
    row({ slug: "cheapo", name: "Cheapo", primaryUse: "Write blog posts", costTier: "PAID", currentPricing: "Pro $15/mo" }),
    row({ slug: "pricey", name: "Pricey", primaryUse: "Write blog posts", costTier: "PAID", currentPricing: "Pro $59/mo" }),
    row({ slug: "yearly", name: "Yearly", primaryUse: "Write blog posts", costTier: "PAID", currentPricing: "Pro $120/year" }),
    row({ slug: "mystery", name: "Mystery", primaryUse: "Write blog posts", costTier: "ENTERPRISE", currentPricing: "Contact sales" }),
    row({ slug: "freebie", name: "Freebie", primaryUse: "Write blog posts", costTier: "FREEMIUM", currentPricing: "Free; Pro $99/mo" }),
  ];

  it("low = free/freemium or a lowest paid plan up to $20/mo (yearly / 12); known prices above are dropped", () => {
    const out = searchTools({ task: "write blog posts", budget: "low" }, rows, none);
    const s = slugs(out);
    assert.ok(!s.includes("pricey"), s.join(", "));
    for (const slug of ["cheapo", "yearly", "freebie"]) assert.ok(s.includes(slug), slug);
    const cheapo = out.results.find((r) => r.slug === "cheapo")!;
    assert.ok(cheapo.match_reasons.some((m) => /lowest paid plan \$15\/mo fits a low budget \(up to \$20\/mo\)/.test(m)), cheapo.match_reasons.join("; "));
    const yearly = out.results.find((r) => r.slug === "yearly")!;
    assert.ok(yearly.match_reasons.some((m) => /\/12 per month\) fits a low budget/.test(m)), yearly.match_reasons.join("; "));
  });

  it("unknown prices are demoted below every fit, not dropped, and the reason says what was checked", () => {
    const out = searchTools({ task: "write blog posts", budget: "low" }, rows, none);
    assert.equal(out.results.at(-1)?.slug, "mystery");
    assert.ok(out.results.at(-1)!.match_reasons.some((m) => /price not listed, so it could not be checked against a low budget/.test(m)));
  });

  it("medium allows up to $50/mo", () => {
    const s = slugs(searchTools({ task: "write blog posts", budget: "medium" }, rows, none));
    assert.ok(!s.includes("pricey"));
    assert.ok(s.includes("cheapo"));
  });

  it('snapshot: "write blog posts" on a low budget no longer leads with Jasper ($59/mo)', () => {
    assert.ok(!slugs(search("write blog posts", { budget: "low" })).includes("jasper"));
  });
});

describe("skill and platform are tiers, not filters", () => {
  const rows: CatalogRow[] = [
    row({ slug: "hardcode", name: "Hardcode", primaryUse: "Code editor agent", difficultyLevel: "ADVANCED", primaryUseCases: "code code code" }),
    row({ slug: "easycode", name: "Easycode", primaryUse: "Code for beginners", difficultyLevel: "BEGINNER" }),
  ];

  it("a beginner sees beginner tools first; advanced ones stay, ranked lower with a reason", () => {
    const out = searchTools({ task: "code", skill_level: "beginner" }, rows, none);
    assert.deepEqual(slugs(out), ["easycode", "hardcode"]);
    assert.ok(out.results[1].match_reasons.includes("difficulty advanced is above beginner; ranked lower"));
  });

  it('snapshot: "learn to code" for a free beginner keeps advanced agents out of the top 3', () => {
    const top3 = search("learn to code", { skill_level: "beginner", budget: "free" }).results.slice(0, 3);
    for (const r of top3) assert.ok(["BEGINNER", "INTERMEDIATE"].includes(r.difficulty), r.slug);
  });
});

describe("top-3 primary-job gate and evidence tie-break", () => {
  it("a tool matched only in its description cannot take the top 3 while job matches remain", () => {
    // "wordy" outscores the others on category / use-case / description text alone.
    const wordy = row({
      slug: "wordy",
      name: "Wordy",
      category: { name: "Podcast editing", slug: "podcast-editing" },
      primaryUseCases: "Podcast editing",
      description: "Podcast editing",
    });
    const pods = ["pod1", "pod2", "pod3"].map((slug) => row({ slug, name: slug, primaryUse: "Podcast" }));
    const ungated = searchTools({ task: "podcast editing" }, [wordy], none);
    assert.ok(ungated.results[0].match_reasons.length > 3);
    const out = searchTools({ task: "podcast editing" }, [wordy, ...pods], none);
    assert.deepEqual(slugs(out), ["pod1", "pod2", "pod3", "wordy"]);
    // With one job match, that one leads and the description-only tool follows.
    assert.deepEqual(slugs(searchTools({ task: "podcast editing" }, [wordy, pods[0]], none)), ["pod1", "wordy"]);
  });

  it("equal scores break verified, then sourced, then catalog-only, then slug", () => {
    const rows: CatalogRow[] = ["a-cat", "b-ver", "c-src"].map((slug) => row({ slug, name: slug, primaryUse: "Logo maker" }));
    const fact = (status: string) => ({ value: { available: true, summary: "Free" }, checkedAt: "2026-10-20", sourceUrl: "https://x.example.com/pricing", status });
    const lookup = (slug: string) =>
      slug === "b-ver" ? ({ slug, freeTier: fact("verified") } as never) : slug === "c-src" ? ({ slug, freeTier: fact("unverified") } as never) : undefined;
    assert.deepEqual(slugs(searchTools({ task: "logo maker" }, rows, lookup)), ["b-ver", "c-src", "a-cat"]);
  });
});

describe("stale honesty label", () => {
  const old = row({ slug: "oldie", name: "Oldie", primaryUse: "Logo maker", updatedAt: "2026-04-13T00:00:00.000Z" });
  const fresh = row({ slug: "fresh", name: "Fresh", primaryUse: "Logo maker", updatedAt: "2026-10-14T00:00:00.000Z" });

  it("labels as_of older than 90 days, with 'as of DATE, unverified'", () => {
    assert.equal(isStale("2026-07-27", "2026-10-26"), true);
    assert.equal(isStale("2026-07-28", "2026-10-26"), false);
    assert.equal(isStale(null, "2026-10-26"), false);
    const ref = toPlatformRef(old, undefined, "2026-10-26");
    assert.equal(ref.stale, true);
    assert.match(ref.freshness_note ?? "", /^as of 2026-04-13, unverified: catalog text last edited then and not checked against the vendor since/);
    const ok = toPlatformRef(fresh, undefined, "2026-10-26");
    assert.equal(ok.stale, false);
    assert.equal(ok.freshness_note, null);
  });

  it("search adds a note when any result is stale (real clock: April is always > 90 days back from now)", () => {
    const out = searchTools({ task: "logo maker" }, [old, fresh], none);
    assert.ok(out.results.find((r) => r.slug === "oldie")?.stale);
    assert.match(out.note ?? "", /Some prices are older than 90 days; confirm on the vendor's site\./);
  });
});

describe("truncation and schema compatibility", () => {
  it("accepts a task up to 1,000 characters and searches the first 200", () => {
    const long = `${"write and edit long documents for school ".repeat(20)}`.slice(0, 900);
    assert.ok(searchToolsInput.safeParse({ task: long }).success);
    assert.ok(!searchToolsInput.safeParse({ task: "x".repeat(1001) }).success);
    const out = searchTools({ task: long }, ROWS, facts);
    assert.match(out.note ?? "", /Only the first 200 characters of your request were searched\./);
  });

  it("every output still carries the v0.1.2 fields and parses against the schema", () => {
    for (const task of ["ai", "voice cloning", "cover letter", "grammer cheker"]) {
      const out = search(task);
      assert.ok(searchToolsOutput.safeParse(out).success, task);
      for (const key of ["query", "results", "total_matches", "note", "data_as_of", "attribution"]) assert.ok(key in out, `${task}: ${key}`);
      for (const r of out.results) {
        for (const key of ["slug", "name", "category", "launchpad_url", "website", "cost_tier", "difficulty", "free_tier", "verification", "as_of", "source_url", "sponsored", "match_reasons"]) {
          assert.ok(key in r, `${task}: ${r.slug}.${key}`);
        }
      }
    }
  });
});

describe("review follow-ups: side mentions and specialised bots", () => {
  it("a task word only in use cases or description is a side mention, not a match on its own", () => {
    const rows: CatalogRow[] = [
      row({ slug: "lingo", name: "Lingo", primaryUse: "AI language learning", primaryUseCases: "Grammar explanations; vocabulary" }),
      row({ slug: "checker", name: "Checker", primaryUse: "Grammar checker for essays" }),
      row({ slug: "scribe", name: "Scribe", primaryUse: "Grammar fixes" }),
    ];
    const s = slugs(searchTools({ task: "fix grammar in my essays" }, rows, none));
    assert.ok(!s.includes("lingo"), s.join(", "));
    assert.ok(s.includes("checker") && s.includes("scribe"));
    // Alone, the side mention still counts as best effort.
    assert.deepEqual(slugs(searchTools({ task: "fix grammar in my essays" }, [rows[0]], none)), ["lingo"]);
  });

  it('snapshot: Duolingo Max is not in the top 5 for "fix grammar in my essays"', () => {
    const top5 = slugs(search("fix grammar in my essays", { budget: "free", skill_level: "beginner" })).slice(0, 5);
    assert.ok(!top5.includes("duolingo-max"), top5.join(", "));
    assert.equal(top5[0], "grammarly");
  });

  it("the general chatbot task yields to customer support (declared in task-tags yieldsTo)", () => {
    const out = search("customer support chatbot for my website");
    const s = slugs(out);
    assert.deepEqual(s.slice(0, 2).sort(), ["lindy-ai", "relevance-ai"]);
    for (const general of ["chatgpt", "claude", "gemini", "meta-ai"]) {
      const i = s.indexOf(general);
      assert.ok(i === -1 || i > s.indexOf("relevance-ai"), s.join(", "));
    }
    for (const r of out.results) assert.ok(!r.match_reasons.includes("task: general chatbot and assistant (curated tag)"), r.slug);
    // A plain chatbot ask is unchanged.
    assert.ok(slugs(search("AI chatbot assistant")).slice(0, 3).some((x) => ["chatgpt", "gemini", "claude"].includes(x)));
  });
});
