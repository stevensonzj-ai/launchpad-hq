import type { PlatformTutorialData } from "./types";

export const squarespaceAiTutorial: PlatformTutorialData = {
  slug: "squarespace-ai-getting-started",
  platformSlug: "squarespace-ai",
  title: "Getting Started with Squarespace AI",
  tagline:
    "Answer a questionnaire about your business and get a whole website back — then spend your real time editing what it wrote.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You start by answering a few questions about your business — what it does, who it is for, how you want it to sound. A complete site comes back, with pages, pictures and words already in place. From then on you edit it: click any block of text, ask for a rewrite, and swap out whatever you do not like.",

  whatItIs: [
    "**Squarespace AI** is a name Squarespace itself uses — it is what the company calls the writing tool built into its website editor. It sits inside a wider bundle the company brands **Design Intelligence**: a builder that drafts an entire site from a questionnaire, an image generator, writers for product listings and discounts, and a checker that tells you whether ChatGPT and Gemini mention your business.",
    "None of it is sold separately: you get it because you have a Squarespace website subscription, and it lives in the same editor as everything else.",
    "Against Wix, the split that will actually reach you is pricing: Wix has a permanently free plan you can sit on indefinitely; Squarespace has no free plan at all — a 14-day trial, then a subscription starting at around $19 a month paid annually.",
    "The editor is tighter in exchange. Squarespace gives you fewer places to put things than Wix's free-form canvas, so an AI-built Squarespace page has a smaller range of ways to come out looking wrong.",
  ],

  beforeYouStart: [
    "**The trial is the whole entry barrier.** It needs no card, and Squarespace will extend it once by seven days if you ask. During the trial your site stays private, search engines are told not to index it, and Squarespace says trial content is marked for permanent deletion if you never upgrade. So you should be able to build the entire thing with AI for nothing — Squarespace's help centre says a trial includes nearly all platform features, without spelling out the AI text tools specifically — and you just cannot show it to anyone until you pay.",
    "There are four tiers, which Squarespace now calls Basic, Core, Plus and Advanced. Older accounts still show the previous names — Personal, Business, Commerce — because the new plans have been rolling out in phases since early 2025, so the tier list in a help article may not match the one in your account.",
    "The writing is unmetered; the pictures are not. Squarespace runs AI **credits** (the platform's unit of spend — each thing you make costs some) on its image tool and its AI-search checker, and its help centre says the text tools and the built-in assistant do not consume them. A trial site currently gets 10 credits. Paid tiers currently run from 10 one-time starter credits at the bottom up to around 120 a month at the top, and you can buy packs of up to 400 more, which roll over and expire a year after purchase.",
    "First move: start a trial at squarespace.com and let the builder generate before you touch anything. Regenerating costs nothing, so it is cheaper to throw the first site away than to start hand-editing a version you already dislike.",
  ],

  security: [
    {
      kind: "text",
      text: "Almost everything you make here is meant to be published under your own name, so the sharper question is not what happens to what you type but what goes live, and what it was made from.",
    },
    {
      kind: "list",
      label: "What Squarespace's own terms and settings say",
      items: [
        "**You own both ends of it.** Squarespace's AI Terms (currently effective 25 June 2026) say that as between you and Squarespace, you own what you type in and what comes out.",
        "**But you may not type in personal information.** The same terms bar it outright — not as advice but as a restriction. Worth remembering the moment you are tempted to paste a real client's details in to get a better product description.",
        "**The AI doing the writing is not Squarespace's.** Its help centre says Squarespace \"has partnered with Open AI, Anthropic, and Google to support how Squarespace AI works,\" and its terms allow those providers to use the output under their own policies. What you type leaves Squarespace.",
        "**Squarespace pre-emptively disclaims the output.** Its terms say generated content \"may be inaccurate, incorrect, erroneous, strange, incomplete or not fit for use or purpose,\" and put the checking on you before you publish.",
        "**AI crawlers can read your finished site unless you stop them.** Under Settings, a Crawlers checkbox adds known AI crawlers to your site's exclusion file. It is off by default — Squarespace says it does not want to \"potentially impact your site's traffic by excluding it from chat answers and sources\" — and it warns that ticking it \"doesn't guarantee\" crawlers comply, and does not remove anything already taken.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Producing a complete, coherent site in one sitting, with every page populated rather than left as placeholder text",
      "Rewriting text you have already written — shortening, lengthening or simplifying a paragraph in place, without leaving the page you are editing",
      "The dull-but-necessary writing: product listings, page descriptions for search engines, image descriptions, video and course blurbs",
      "Holding one tone across a whole site, because the brand answers you gave at the start are what later copy is generated from",
    ],
    okayAt: [
      "Images. Image Studio generates pictures and strips backgrounds, but it draws on the same credit pool as the AI-search checker, so it is not where you would do volume work",
      "Blog drafting. It produces posts, outlines and ideas, but a piece with an actual argument in it still needs you to write the argument",
      "Checking whether ChatGPT and Gemini mention your business — the tool works, but every run spends credits, and Squarespace limits it to English-language, version 7.1 sites, so on a 7.0 site it is not an option at all",
    ],
    avoid: [
      "Treating the trial as a free tier — nothing you build is publicly reachable until you subscribe",
      "Putting anyone's personal details into a **prompt** (the message you type) — Squarespace's AI Terms prohibit it, they do not merely discourage it",
      "Medical, legal or financial advice, and anything that misleads a reader about where the content came from — both are barred by those same terms",
      "Assuming an AI-designed site can move somewhere else later. Squarespace's export is a WordPress-format `.xml` file, and its own help centre lists style settings, custom CSS, store pages, product and video blocks and all but one blog page as things that do not come with you",
    ],
  },

  starterActions: [
    {
      title:
        "When you have a business but no website → then let the questionnaire build the whole thing first",
      whatItDoes:
        "Answer Squarespace's questions about what you do and how you want to come across, and Blueprint AI returns a finished site — layout, copy and images already placed — that you edit from there.",
      whyHere:
        "Squarespace publishes its own numbers on this feature: it says Blueprint AI has \"helped 10% more people publish their site and reduced their need to search for stock images by 18% on the first day.\" Those are the vendor's figures rather than an independent test, but they describe a builder optimised to get you past the blank page, not to hand you a canvas.",
      tweak:
        "If the first site comes back wrong, change the brand-personality answers rather than editing twenty blocks by hand — they are upstream of most of what you would be fixing.",
    },
    {
      title:
        "When you would rather start in a chat window than a website builder → then use Squarespace's GPT inside ChatGPT",
      whatItDoes:
        "Squarespace publishes a Squarespace GPT in ChatGPT's store. It interviews you about your business, tone and goals, shows a preview of the site it would build, and only then sends you to Squarespace to trial or publish.",
      whyHere:
        "It is the one route here that lets you see what Squarespace's builder would produce for your specific business before you have created a Squarespace account or started the 14-day clock. Given that the clock is the real constraint on this platform, starting it after you have seen a preview rather than before is worth the detour.",
    },
    {
      title:
        "When a page you wrote reads badly → then rewrite it in place instead of starting over",
      whatItDoes:
        "Squarespace's help centre says to select the text, click the three-circles icon in the toolbar, and ask for it shorter, longer or simpler. It rewrites in the block you are standing in.",
      whyHere:
        "This is the part that is not metered: rewriting is the one AI action on this platform you can repeat as often as you like without watching a balance drop.",
    },
    {
      title:
        "When your shop page is empty → then photograph one product and let it write the listing",
      whatItDoes:
        "The AI Product Composer takes a photo or a few basic details and drafts a description, a suggested price and copy aimed at search engines. A matching tool drafts discounts.",
      whyHere:
        "Selling is switched on at every Squarespace tier — its help centre says all four plans allow unlimited products, with the entry plan differing by a 2% transaction fee rather than by a locked feature. So the shop exists whether you planned one or not, and this is the tool that stops it sitting empty.",
      tweak:
        "Treat the suggested price as something to argue with. Squarespace does not say what the suggestion is based on, so it is a starting number, not a valuation.",
    },
    {
      title:
        "When you want to know whether AI search mentions you → then run the visibility checker, sparingly",
      whatItDoes:
        "AI Visibility runs prompts through ChatGPT and Gemini and shows whether your site appears, which prompts surface it, and which competitors get cited instead of you. Check first that it can run for you at all: Squarespace's help centre says the tool is \"currently only available in English, on version 7.1 sites\". It is on every website plan, but only the credit allowance changes by plan — a 7.0 site cannot use it whatever you pay.",
      whyHere:
        "It is the only AI feature here that spends your credits on questions rather than on making something — Squarespace's pricing page counts them as \"prompt runs\". That budget makes this a periodic check, not a dashboard you leave running.",
    },
  ],

  pitfalls: [
    "**The generated copy is a draft that looks finished.** There is no blank space left to remind you which sections you never rewrote, so the placeholder-ish sentences ship to a live site looking as settled as the ones you wrote. Squarespace says it plainly in its own help centre — do not publish text \"that you wouldn't have written yourself.\" Read every page once before you go public.",
    "**Credits disappear into images, not words.** If you are planning to lean on generated pictures, work out roughly how many you need before you start, rather than discovering the ceiling halfway through a gallery.",
    "**The trial clock, not the plan, is the real deadline.** An AI builder will happily fill a week you do not actually have.",
    "**Plan names in the documentation may not match your account.** A feature documented under one tier can be sitting under a differently named tier in front of you, so check what your own billing page calls your plan before concluding a feature is missing.",
  ],

  whereToNext: [
    { label: "More AI built into business software", categorySlug: "ai-plugins-business-software" },
    { label: "Marketing and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    { label: "Image generators that go further", categorySlug: "image-generation-editing" },
  ],
};
