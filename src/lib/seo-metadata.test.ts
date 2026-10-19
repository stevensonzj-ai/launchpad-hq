import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { SITE_URL } from "@/lib/site";
import {
  buildPlatformMetadata,
  clipMetaDescription,
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
    for (const desc of descriptions) {
      assert.ok(desc.length <= 160, desc);
      assert.ok(desc.length >= 80, desc);
    }
  });
});
