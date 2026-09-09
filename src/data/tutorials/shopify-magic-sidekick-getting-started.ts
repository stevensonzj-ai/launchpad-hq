import type { PlatformTutorialData } from "./types";

export const shopifyMagicSidekickTutorial: PlatformTutorialData = {
  slug: "shopify-magic-sidekick-getting-started",
  platformSlug: "shopify-magic-sidekick",
  title: "Getting Started with Shopify Magic and Sidekick",
  tagline:
    "Shopify's own AI, already switched on inside your store's dashboard — it writes the product page, fixes the photo, and answers \"how do I do that?\"",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  changelogUrl: "https://changelog.shopify.com/",
  accessTier: "FREE",

  howItWorks:
    "You work in your Shopify **admin**, the dashboard where you run your store. Where you would normally type — a product description, an email subject line — a generate button sits in the toolbar; you describe what you want and edit what comes back. A purple glasses icon opens a chat panel that answers questions and proposes changes you approve.",

  whatItIs: [
    "**Shopify Magic** is the umbrella name for a set of AI features built into the admin itself rather than sold separately: a generate button wherever you write text, background and lighting editing on product photos, content for your store's design template and marketing emails, plus quieter things like summarised app reviews and automatic descriptions of customer groups.",
    "**Sidekick** is one of those features and the only one you hold a conversation with. Shopify describes it as \"an AI-enabled commerce assistant in your Shopify admin,\" trained on Shopify's own features and able to see your store's data.",
    "Shopify's marketing site and its recent Editions releases now lead almost entirely with Sidekick, while \"Shopify Magic\" survives mainly in the help centre as the label for the whole set — `shopify.com/magic` currently serves a page about Sidekick that does not use the word Magic at all. Both names still resolve to real, current things; expect to hear Sidekick more.",
  ],

  beforeYouStart: [
    "**The AI is free; the store is not.** Shopify states its AI tools are \"available for free, regardless of your subscription plan\" — no separate signup, no add-on, no credit balance to top up. What you pay for is Shopify itself. It currently advertises \"3 days free, then $1/month for 3 months,\" after which Basic is around **$39 a month** (about $29 if you pay for a year), with Grow and Advanced at roughly $105 and $399. Let the trial lapse without picking a plan and Shopify's help centre says your store is paused until you choose one: your products and settings are kept, but the admin closes, and every tool on this page is inside the admin.",
    "There is nothing to install or switch on: the generate buttons are already sitting in the text boxes, and Shopify's instruction for the assistant is exactly this: \"Open your Shopify admin and click the purple glasses icon. That's it. No setup, no configuration.\"",
    "Some of it is desktop-only, which matters if you run your shop from your phone. Shopify's help centre says text generation \"is not supported on mobile devices,\" and that Sidekick \"isn't currently available on mobile web admin or via the Shopify app on tablet devices, including iPads.\" It does work in the phone app, and has an optional voice mode there.",
    "Shopify says its generally available AI features are available \"to all plans and in all languages,\" and that Sidekick \"adapts to your store's language settings.\" It also warns that language support \"for some features, such as those in early access, might vary\" — so if something described here is missing or English-only for you, that is the likeliest reason.",
  ],

  security: [
    {
      kind: "text",
      text: "Sidekick is useful precisely because it can read your live store — orders, customers, what sold and when — and that reach is also the whole of the risk. Its help centre says Shopify \"doesn't use any merchant's store-level data to power Shopify Magic for other merchants,\" that where your data improves your own experience \"that data isn't shared with other merchants,\" and — the same wall from the other side — that Sidekick \"can't share private information or data from other Shopify merchants with you.\"",
    },
    {
      kind: "list",
      label: "Four things worth knowing before you lean on it:",
      items: [
        "**Your staff see only what their permissions already allow.** Shopify says every staff member uses Sidekick \"based on their admin permissions\" and that it \"respects access controls, so team members only interact with data and features they're authorized to use.\" Someone who can't open your payouts page can't ask the assistant to read it out either.",
        "**It asks before it acts.** Shopify's documentation says Sidekick \"is never allowed to make changes to your shop without your approval, and will only present options for you to review and approve.\" That approval step is the entire safety mechanism.",
        "**Generated images carry an invisible watermark** (a mark on generated output identifying it as AI-made). Shopify says it \"doesn't claim ownership over images merchants create using media generation, nor restrict where they can use those images,\" and that the watermark doesn't restrict commercial use.",
        "**It remembers between conversations.** Shopify's changelog announced in December 2025 that Sidekick now remembers your preferences and retains context from past chats.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Filling the empty boxes when you are setting a store up — product descriptions, page copy, email subject lines — from a product title and a few real facts about the thing",
      "Answering \"how do I do this in Shopify?\" without leaving the admin, because Shopify describes the assistant as \"trained to know all of Shopify's features\" rather than answering from the general internet",
      "Making a phone photo look deliberate — replacing a background with a solid colour, or describing the lighting and scene you wanted instead",
      "Fetching a number you would otherwise build a report for; Shopify's changelog added payments and web performance data to what the assistant can read",
    ],
    okayAt: [
      "Longer jobs you would rather hand over. Shopify's Spring '26 release describes the assistant working in the background and carrying out multi-step tasks, but that is release-note language rather than documented behaviour — so treat it as a fast drafter, not something you leave running",
      "Sounding like you. Shopify's own guidance is to state \"the tone, length, format, and language of the output\" in each request; it does not learn your house voice between products, so the voice is whatever you remembered to ask for that time",
    ],
    avoid: [
      "Talking to your customers. Shopify's documentation is explicit: Sidekick \"can't talk to your customers or handle customer support conversations on your behalf.\" It is an assistant for the shopkeeper, not a shop-front chatbot",
      "Retouching images that are already placed inside your store's design template or your product list — Shopify says it \"can't make edits to images within a store theme or your product list,\" so image work happens on the file, in the file editor, before it is placed",
      "Rewriting a whole catalogue in one go. Shopify documents generation from inside an individual product's own description box and documents no bulk path, so a 400-product rewrite is an afternoon of clicking rather than a button — check for yourself before planning around it",
    ],
  },

  starterActions: [
    {
      title: "Draft the product description you have been avoiding",
      whatItDoes:
        "When you are adding a product and the description box is empty → then click the generate icon in the toolbar and give it the product's real features, any keywords, and the tone you want.",
      whyHere:
        "Swap-tested against Squarespace AI, which will also write you product copy. What is specific to Shopify is what it prints beside the button: that you are \"responsible for the accuracy of all of the content that you publish to your store,\" and that the generator \"can include things such as product benefits even when you didn't list any explicitly.\" Doing one product first, slowly, teaches you exactly what it invents.",
      tweak:
        "Feed it the three facts a customer actually asks about — what it is made of, what size it is, what it is for — and one tone word. Shopify's help centre says the **prompt** (the message you type) can carry \"product features, keywords, desired tone, or any other instructions,\" and the generator already has the product title for context.",
    },
    {
      title: "Rescue a phone photo of your product",
      whatItDoes:
        "When the only decent shot of a product has your kitchen counter in the background → then open the image in the admin's file editor and describe the background or lighting you want instead.",
      whyHere:
        "Wix AI ships image tools too; what Shopify documents is mechanical: the editor \"creates 1 AI-generated scene at a time,\" unused scenes are deleted when you close it unless you save them, and output lands at about 1 megapixel scaled to your image's aspect ratio. That is sized for a product listing, not for print — useful to know before you plan a whole shoot around it.",
      tweak:
        "Try the plain solid-colour background replacement before anything ambitious. It is more predictable than a described scene, and it is usually what a listing thumbnail actually needs.",
    },
    {
      title: "Ask the assistant where the setting lives",
      whatItDoes:
        "When you are hunting for something — a discount code, a shipping rate, a domain → then open Sidekick and describe what you want in one sentence rather than searching the help centre.",
      whyHere:
        "A general assistant like Wix AI answers Shopify questions from whatever it read on the internet, which goes stale with each Editions release. Shopify's version can see your store's own settings, so the answer arrives as a proposed change in your admin rather than as directions to a menu you then have to find.",
      tweak:
        "Ask it to make the change, not just explain it — the worst outcome of asking is a proposal you decline.",
    },
    {
      title: "Ask what actually happened last week",
      whatItDoes:
        "When a week ends → then ask for a plain-language summary of how the shop did, or which products are running low.",
      whyHere:
        "This is where the swap test against Squarespace AI fails hardest: the assistant reads your own order and payments data from inside the admin, so it answers from your actual sales. An outside tool can only tell you which report to open.",
      tweak:
        "Ask a follow-up rather than one enormous question. Shopify's own guidance is to treat it as \"a working session that you refine over time rather than a single perfect request.\"",
    },
  ],

  pitfalls: [
    "**It will invent product benefits.** On a product page that is not a style problem — a claim about what something is made of or what it does is read literally by customers and, depending on what you sell, by regulators. Read every generated description before you save it.",
    "**Descriptions come out interchangeable.** Shopify notes that \"the same request won't always produce the same result,\" so you will not get literal duplicates — you will get a shop where every description opens the same way and reaches for the same three adjectives. Rewriting the first sentence of each one by hand fixes most of this.",
    "**The approval click becomes reflex fast.** Slow down specifically where a wrong approval costs money or reaches customers: prices, discount codes, shipping rates, and any page that is already live.",
    "**Don't confuse this with the AI pointed at your shoppers.** Shopify also builds and supports AI that faces the buyer — store chat, agentic storefronts, apps from the app store. Advice you find online about \"Shopify AI\" frequently means the other kind, and the settings do not overlap.",
    "**The buttons move.** Shopify ships AI changes on a fast release cycle — the assistant gained background tasks, app generation and memory in a single December 2025 release, and app integrations the following spring. A guide written a year ago may describe a layout that no longer exists; Shopify's changelog is where to check what is current.",
  ],

  whereToNext: [
    { label: "Sales, marketing and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    { label: "Image generation and editing", categorySlug: "image-generation-editing" },
    { label: "AI built into business software", categorySlug: "ai-plugins-business-software" },
  ],
};
