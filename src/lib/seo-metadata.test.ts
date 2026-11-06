import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { SITE_URL } from "@/lib/site";
import { listRegisteredTutorials } from "@/data/tutorials";
import {
  buildPlatformMetadata,
  buildTutorialMetadata,
  clipMetaDescription,
  communityPathMetadata,
  publicPageMetadata,
} from "@/lib/seo-metadata";

describe("seo metadata", () => {
  it("clips descriptions to at most 160 characters", () => {
    const long = "A".repeat(200);
    const clipped = clipMetaDescription(long);
    assert.ok(clipped.length <= 160, `length ${clipped.length}`);
    assert.equal(clipped.endsWith("…"), true);
  });

  it("uses an absolute www.launchpadhq.io canonical, never the Vercel host", () => {
    const meta = publicPageMetadata({
      title: "Discover AI tools | Launchpad HQ",
      description: "Browse vetted AI platforms across categories, with cost and difficulty filters.",
      path: "/discover",
    });
    assert.equal(meta.alternates?.canonical, `${SITE_URL}/discover`);
    assert.equal(typeof meta.alternates?.canonical, "string");
    assert.ok(String(meta.alternates?.canonical).startsWith("https://www.launchpadhq.io"));
    assert.equal(String(meta.alternates?.canonical).includes("vercel.app"), false);
    assert.equal(meta.openGraph?.url, `${SITE_URL}/discover`);
    assert.equal(String(meta.openGraph?.title), String(meta.title));
    assert.equal(String(meta.openGraph?.description), String(meta.description));
    assert.equal(String(meta.twitter?.title), String(meta.title));
    assert.equal(String(meta.twitter?.description), String(meta.description));
  });

  it("builds unique titles and descriptions for sample public slugs", () => {
    const chatgpt = buildPlatformMetadata({
      slug: "chatgpt",
      name: "ChatGPT",
      categoryName: "Text & conversational AI",
      primaryUse: "Chat and writing help",
      facts: getToolFacts("chatgpt"),
    });
    const grok = buildPlatformMetadata({
      slug: "grok",
      name: "Grok",
      categoryName: "Text & conversational AI",
      primaryUse: "Chat on X",
      facts: getToolFacts("grok"),
    });
    const claude = buildPlatformMetadata({
      slug: "claude",
      name: "Claude",
      categoryName: "Text & conversational AI",
      primaryUse: "Long-context chat",
      facts: getToolFacts("claude"),
    });
    const home = publicPageMetadata({
      title: "Launchpad HQ — Find the right AI tool",
      description:
        "Your AI mission control: vetted tools across categories, with honest pricing notes, a matching quiz, and beginner workflows.",
      path: "/",
    });
    const quiz = publicPageMetadata({
      title: "Get matched with AI tools | Launchpad HQ",
      description:
        "Answer four questions about your goals, budget, and skill level to get personalized AI platform picks from the Launchpad HQ catalog.",
      path: "/quiz",
    });

    const titles = [chatgpt.title, grok.title, claude.title, home.title, quiz.title].map(String);
    assert.equal(new Set(titles).size, titles.length);

    const descriptions = [
      chatgpt.description,
      grok.description,
      claude.description,
      home.description,
      quiz.description,
    ].map(String);
    assert.equal(new Set(descriptions).size, descriptions.length);

    assert.equal(chatgpt.alternates?.canonical, `${SITE_URL}/platform/chatgpt`);
    assert.equal(grok.alternates?.canonical, `${SITE_URL}/platform/grok`);
    assert.equal(home.alternates?.canonical, SITE_URL);
    assert.equal(home.robots, undefined);
    for (const desc of descriptions) {
      assert.ok(desc.length <= 160, desc);
      assert.ok(desc.length >= 80, desc);
    }
  });
});

describe("community path metadata", () => {
  const description = "Community discussion about ChatGPT. Read approved threads on Launchpad HQ before you decide whether the tool fits.";

  it("noindexes an empty discussions or prompts page and still lets crawlers follow links", () => {
    for (const path of ["/platform/chatgpt/discussions", "/platform/chatgpt/prompts"]) {
      const meta = communityPathMetadata({
        title: "ChatGPT discussions | Launchpad HQ",
        description,
        path,
        approvedCount: 0,
      });
      assert.deepEqual(meta.robots, { index: false, follow: true });
      assert.equal(meta.alternates?.canonical, `${SITE_URL}${path}`);
    }
  });

  it("is indexable once there is at least one approved post", () => {
    for (const approvedCount of [1, 2]) {
      const meta = communityPathMetadata({
        title: "Activepieces discussions | Launchpad HQ",
        description,
        path: "/platform/activepieces/discussions",
        approvedCount,
      });
      assert.equal(meta.robots, undefined, `count ${approvedCount}`);
      assert.equal(meta.alternates?.canonical, `${SITE_URL}/platform/activepieces/discussions`);
    }
  });

  it("keeps a plain noindex page nofollow, including hidden platform overviews", () => {
    const plain = publicPageMetadata({
      title: "T",
      description: "A private page description that is long enough to keep.",
      path: "/account",
      index: false,
    });
    assert.deepEqual(plain.robots, { index: false, follow: false });

    const hidden = buildPlatformMetadata({
      slug: "play-ht",
      name: "PlayHT",
      facts: getToolFacts("play-ht"),
    });
    assert.deepEqual(hidden.robots, { index: false, follow: false });
  });

  it("wires both path pages to the approved count and does not redirect them", () => {
    const discussions = readFileSync("src/app/(app)/platform/[slug]/discussions/page.tsx", "utf8");
    const prompts = readFileSync("src/app/(app)/platform/[slug]/prompts/page.tsx", "utf8");
    assert.match(discussions, /approvedCount: p\._count\.discussions/);
    assert.match(prompts, /approvedCount: p\._count\.prompts/);
    assert.match(discussions, /communityPathMetadata\(/);
    assert.match(prompts, /communityPathMetadata\(/);
    assert.doesNotMatch(discussions, /redirect\(/);
    assert.doesNotMatch(prompts, /redirect\(/);
  });
});

describe("tutorial guide metadata", () => {
  it("gives the guide its own title, tagline description and self-canonical", () => {
    const meta = buildTutorialMetadata({
      platformSlug: "activepieces",
      name: "Activepieces",
      tagline: "Automation built from **public** code and a `free` daily allowance.",
      lastReviewedAt: "2026-10-14",
    });
    assert.equal(meta.title, "How to Use Activepieces: Beginner's Guide | Launchpad HQ");
    assert.equal(meta.description, "Automation built from public code and a free daily allowance.");
    assert.equal(meta.alternates?.canonical, `${SITE_URL}/platform/activepieces/guide`);
    const og = meta.openGraph as Record<string, unknown>;
    assert.equal(og.type, "article");
    assert.equal(og.modifiedTime, "2026-10-14");
  });

  it("keeps every registered tutorial's guide description within 160 characters", () => {
    for (const tutorial of listRegisteredTutorials()) {
      const meta = buildTutorialMetadata({
        platformSlug: tutorial.platformSlug,
        name: tutorial.platformSlug,
        tagline: tutorial.tagline,
        lastReviewedAt: tutorial.lastReviewedAt,
      });
      const description = String(meta.description);
      assert.ok(description.length > 0 && description.length <= 160, tutorial.platformSlug);
    }
  });
});
