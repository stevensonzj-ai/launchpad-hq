import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it } from "node:test";
import { PlatformDetailTabs } from "@/components/platforms/platform-detail-tabs";
import { PlatformDiscussions } from "@/components/discussions/platform-discussions";
import { PlatformPrompts } from "@/components/prompts/platform-prompts";
import { UserPostedLink } from "@/components/community/user-posted-link";
import { communityEmbedShowsFullLink, USER_POSTED_LINK_REL } from "@/lib/community-pages";

describe("empty community sections", () => {
  it("collapses an empty discussions tab behind a start CTA and does not link the path page", () => {
    const html = renderToStaticMarkup(
      createElement(
        PlatformDetailTabs,
        {
          platformName: "ChatGPT",
          platformSlug: "chatgpt",
          counts: { discussions: 0, prompts: 0 },
          initialTab: "discussions",
        },
        "Overview body",
      ),
    );
    assert.match(html, /Start the discussion/);
    assert.equal(html.includes("No discussions yet"), false);
    assert.equal(html.includes("Open full discussions page"), false);
    assert.equal(html.includes("/platform/chatgpt/discussions"), false);
    assert.match(html, /href="\/platform\/chatgpt\?tab=discussions"/);
    assert.equal(html.includes("Overview body"), false);
  });

  it("collapses an empty prompts tab behind a share CTA and does not link the path page", () => {
    const html = renderToStaticMarkup(
      createElement(
        PlatformDetailTabs,
        {
          platformName: "ChatGPT",
          platformSlug: "chatgpt",
          counts: { discussions: 0, prompts: 0 },
          initialTab: "prompts",
        },
        "Overview body",
      ),
    );
    assert.match(html, /Share the first prompt/);
    assert.equal(html.includes("No prompts yet"), false);
    assert.equal(html.includes("Open full prompts page"), false);
    assert.equal(html.includes("/platform/chatgpt/prompts"), false);
    assert.match(html, /href="\/platform\/chatgpt\?tab=prompts"/);
  });

  it("uses the same collapsed CTA on the standalone pages when the approved count is 0", () => {
    const discussions = renderToStaticMarkup(
      createElement(PlatformDiscussions, {
        platformName: "ChatGPT",
        platformSlug: "chatgpt",
        showFullLink: false,
        approvedCount: 0,
      }),
    );
    const prompts = renderToStaticMarkup(
      createElement(PlatformPrompts, {
        platformName: "ChatGPT",
        platformSlug: "chatgpt",
        showFullLink: false,
        approvedCount: 0,
      }),
    );
    assert.match(discussions, /Start the discussion/);
    assert.match(prompts, /Share the first prompt/);
    assert.equal(discussions.includes("No discussions yet"), false);
    assert.equal(prompts.includes("No prompts yet"), false);
  });

  it("keeps the open-full link for a non-empty section and the sign-in composer", () => {
    assert.equal(communityEmbedShowsFullLink(undefined, 1), true);
    assert.equal(communityEmbedShowsFullLink(true, 2), true);
    assert.equal(communityEmbedShowsFullLink(undefined, undefined), true);
    assert.equal(communityEmbedShowsFullLink(true, 0), false);
    assert.equal(communityEmbedShowsFullLink(undefined, 0), false);
    assert.equal(communityEmbedShowsFullLink(false, 3), false);
    assert.equal(communityEmbedShowsFullLink(false, 0), false);

    const discussions = readFileSync("src/components/discussions/platform-discussions.tsx", "utf8");
    const prompts = readFileSync("src/components/prompts/platform-prompts.tsx", "utf8");
    assert.match(discussions, /Open full discussions page/);
    assert.match(prompts, /Open full prompts page/);
    assert.match(discussions, /communityEmbedShowsFullLink\(props\.showFullLink, props\.approvedCount\)/);
    assert.match(prompts, /communityEmbedShowsFullLink\(props\.showFullLink, props\.approvedCount\)/);
    assert.match(discussions, /href="\/sign-in"/);
    assert.match(prompts, /href="\/sign-in"/);
    assert.match(discussions, /Post thread/);
    assert.match(prompts, /Submit prompt/);
  });
});

describe("user-posted links", () => {
  it("marks a user-submitted URL ugc nofollow", () => {
    const html = renderToStaticMarkup(
      createElement(
        UserPostedLink,
        {
          href: "https://example.com/output?id=1",
          className: "mt-2 inline-block text-xs text-orange-400 hover:underline",
        },
        "Output link",
      ),
    );
    assert.equal(USER_POSTED_LINK_REL, "ugc nofollow noopener noreferrer");
    assert.ok(html.includes('href="https://example.com/output?id=1"'));
    assert.ok(html.includes('target="_blank"'));
    assert.ok(html.includes('rel="ugc nofollow noopener noreferrer"'));
    assert.ok(html.includes("Output link"));

    const prompts = readFileSync("src/components/prompts/platform-prompts.tsx", "utf8");
    assert.match(prompts, /<UserPostedLink[\s\S]*?href=\{p\.outputUrl\}/);
    assert.doesNotMatch(prompts, /<a\b[^>]*href=\{p\.outputUrl\}/);
  });
});
