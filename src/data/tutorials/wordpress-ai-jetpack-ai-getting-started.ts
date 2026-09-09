import type { PlatformTutorialData } from "./types";

export const wordpressAiJetpackAiTutorial: PlatformTutorialData = {
  slug: "wordpress-ai-jetpack-ai-getting-started",
  platformSlug: "wordpress-ai-jetpack-ai",
  title: "Getting Started with Jetpack AI",
  tagline: "Draft, rewrite and illustrate posts without leaving the WordPress editor.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You write in your WordPress post editor as usual. When you want help, you open the AI panel in the sidebar, type what you want in plain English, and the draft appears in the post itself. You accept it, ask for another try, or edit it by hand, then keep writing.",

  whatItIs: [
    "Jetpack AI is a set of writing and picture-making tools that Automattic builds into the WordPress editor, so the work happens inside the post you are already writing rather than in a separate chat window.",
    "\"WordPress\" means two different things, and which one you have decides how you get this. Sites hosted on WordPress.com have Jetpack built in already; WordPress.com's own support pages currently say Jetpack AI is included with all its paid plans. Sites you run yourself — **self-hosted** WordPress, meaning you run it on your own server rather than the company's — need the free Jetpack **plugin** (an add-on you install into a WordPress site) installed and connected first.",
    "Automattic sells it as its own small subscription and also folds it into the Jetpack Complete bundle.",
  ],

  beforeYouStart: [
    "You need a WordPress site you can edit as an administrator, and you need to be writing in WordPress's standard post editor — the one that builds a post out of stacked blocks. Jetpack's docs list that editor as a requirement.",
    "On a self-hosted site you install Jetpack and connect it to a WordPress.com account. Automattic's documentation is explicit that Jetpack AI only works once Jetpack is properly connected to WordPress.com, so the account is not optional even though the site is yours.",
    "**The free allowance is smaller than it sounds, and it does not come back.** Jetpack's support docs describe 20 free requests as a per-site limit that does not renew. A request is one action — a rewrite, a generated image. Twenty is an evening of experimenting, not a month of writing.",
    "After that it is currently around $9.95 a month for the standalone AI plan, billed yearly and advertised at about half that for a first year.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Install Jetpack from inside your own dashboard at `Plugins → Add New`, or from `jetpack.com` itself. Automattic publishes the install steps; take them from there rather than from a zip file offered on a blog post or a theme marketplace.",
    body: [
      "Connecting Jetpack links your site to Automattic's servers, and that link is the product rather than an optional extra — the AI runs there, not on your web host. If you are not willing to make that connection, this tool is not available to you at all.",
      "Try it first on a draft nobody is reading. Jetpack AI writes directly into the post you have open, so the safety net is WordPress's own revision history rather than an undo button in the AI panel.",
    ],
    vendorDocsUrl: "https://jetpack.com/support/getting-started-with-jetpack/",
  },

  security: [
    {
      kind: "text",
      text: "Two separate things leave your site here. Connecting Jetpack at all copies site data to Automattic's servers: its documentation lists posts, pages, comments, categories and tags, all core WordPress and Jetpack settings, and registered users' IDs, usernames, email addresses and roles — passwords excluded — and says it copies what all of its features need whether you have switched those features on or not.",
    },
    {
      kind: "list",
      label: "Then, separately, what the AI itself sees:",
      items: [
        "What you type into Jetpack AI is passed on to an outside AI company. Automattic's AI guidelines, last updated 18 August 2026, name Anthropic, OpenAI and Google as its providers and state that each of them does not use that data to train or improve its models.",
        "The same page still advises thinking carefully before entering confidential or sensitive information into any AI feature, even with those no-training statements.",
        "A newer screen at `Jetpack → AI` in your dashboard can let an outside AI assistant such as Claude or Cursor read and change your site — it is labelled MCP there. Jetpack's docs say that access is off by default, that read and write permissions are set category by category, and that every write action needs your explicit confirmation before it runs. Leave it off until you specifically want it.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Second-draft work on a post already in front of you — tightening a paragraph, shifting its tone, writing the title and summary once the post actually exists.",
      "Translating a finished post into another language inside the editor.",
      "Putting a featured image on a post that would otherwise ship without one, using wording Jetpack suggests from the post's own content.",
    ],
    okayAt: [
      "Long-form drafting from nothing. It will do it, but every attempt spends a request, which is awkward economics for an allowance that never refills.",
      "Illustration with a specific look. Jetpack's docs say images come back as 1024x1024 PNGs by default, and that the generator will not produce copyrighted characters, identifiable public figures, or imitations of an artist's style from 1912 onwards.",
    ],
    avoid: [
      "Counting on the paid plan being unlimited. Automattic advertises \"high request capacity\" rather than a number, and footnotes it with a fair-usage policy — so a very heavy month is a conversation with Automattic rather than a guaranteed entitlement.",
      "Installing Jetpack purely for the AI on a site where the rest of Jetpack is unwelcome. Automattic's docs route you through Jetpack and `Jetpack → My Jetpack` to reach the AI; there is no AI-only Jetpack you can install instead.",
      "Assuming the free allowance covers connecting an outside AI assistant to your site. Jetpack's docs say that for self-hosted sites, that access requires a Jetpack Complete or Jetpack AI plan.",
    ],
  },

  starterActions: [
    {
      title: "When a post is finished but the title is limp → ask for a title and a summary",
      whatItDoes:
        "On a post you have already written, open the AI panel in the sidebar and use the title and summary generation, then choose from what comes back.",
      whyHere:
        "Jetpack AI reads the post from inside the editor, so its suggestions come from your actual saved text. It also spends one request instead of the several a full draft burns, which makes it the sensible first thing to try on a 20-request allowance.",
      tweak:
        "Jetpack's product page describes a one-click optimisation of post title and featured image at publishing time — the same idea with fewer clicks, worth finding before you do this by hand twice.",
    },
    {
      title:
        "When a post has no image and you were never going to make one → generate a featured image",
      whatItDoes:
        "In the `Improve with AI` section of the post sidebar, or by choosing Generate Image when you set a featured image, describe the picture — Jetpack offers suggested wording drawn from the post.",
      whyHere:
        "Jetpack's docs put an exact price on this one action: one successfully generated image costs one request, charged whether or not you end up using it, while failed generations are not charged. It is the only place in this tool where clicking twice has a stated cost, which makes it the action worth understanding before the others.",
      tweak:
        "The default is square. Check how your theme crops a square featured image before you spend several requests building a set of them.",
    },
    {
      title: "When a paragraph is too long to read → rework it where it sits",
      whatItDoes:
        "Select an existing paragraph, heading or list and use the AI option on that block to shorten it, expand it, or change its tone.",
      whyHere:
        "The tool acts on the block you selected and writes back into it. Jetpack's docs list ten tone options on that same menu, which turns \"make this less stiff\" into a menu choice rather than an instruction you have to phrase well.",
      tweak:
        "There is also a clarity tool, Write Brief with AI, that flags long sentences and complex words as you write. Jetpack's docs say using it does not count towards your request usage — the one AI feature here you can simply leave switched on.",
    },
    {
      title: "When a post deserves a second-language version → translate it in the editor",
      whatItDoes:
        "Select the post's content and choose translate from the same AI menu; Jetpack's docs list twelve languages.",
      whyHere:
        "The translation is written back as ordinary editable content, so you end up with a post you can keep working on rather than a block of text to reformat. Jetpack counts each action as one request, so translating a long post a paragraph at a time is markedly more expensive than doing it in one pass.",
      tweak:
        "Automattic's guidelines ask you to review and edit AI output before publishing. For a language you do not read, that means finding somebody who does — not skipping the step.",
    },
  ],

  pitfalls: [
    "**More than one thing is now called \"WordPress AI\".** The WordPress project's own AI team publishes a separate community plugin named AI on `wordpress.org`, and WordPress 7.0 added AI plumbing to core. Neither is this. Jetpack AI is Automattic's commercial product — search for that name, not the generic one.",
    "A site with several writers has a per-person step nobody warns you about. Jetpack's docs say each user who wants the AI tools must connect their own WordPress.com account, so the editor who joins next month meets a sign-in screen you have long since forgotten about.",
    "The introductory price renews at the full one. Automattic's own footnote says the discount applies to the first year only — worth a calendar note on a subscription that bills yearly.",
    "Requests drain from actions you would not think of as AI. Jetpack's own definition counts excerpt generation and the feedback tool alongside the obvious ones, and says the list is not exhaustive, so features you switched on for another reason can quietly spend the allowance.",
    "If the AI panel disappears, check the connection before the plan — a host migration or a domain change is exactly what tends to break it.",
  ],

  whereToNext: [
    { label: "Other AI plugins and business software", categorySlug: "ai-plugins-business-software" },
    { label: "Writing and chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
  ],
};
