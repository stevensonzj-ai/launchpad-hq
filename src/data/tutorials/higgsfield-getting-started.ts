import type { PlatformTutorialData } from "./types";

export const higgsfieldTutorial: PlatformTutorialData = {
  slug: "higgsfield-getting-started",
  platformSlug: "higgsfield",
  title: "Getting Started with Higgsfield",
  tagline: "One subscription, many video models, and a camera you direct from a menu — with billing terms worth reading before you pay.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "Pick Image or Video at the top, choose a model (the AI \"brain\" doing the work) or keep the default, and type a description of the shot, optionally uploading a photo to start from. Set length and shape, check the cost shown on the Generate button, click it, and wait for the clip. Then adjust and try again.",

  whatItIs: [
    "Higgsfield, made by Higgsfield, Inc., is a studio for making short AI videos and images. It became known for letting you choose how the \"camera\" moves — a slow push-in, a drone-style sweep — from a menu instead of describing it in words, and that is still the part that sets it apart.",
    "Much of what runs underneath is not Higgsfield's own. Alongside in-house tools such as the Soul image family, Cinema Studio 4.0, Canvas, Genjutsu, Katana and Popcorn, one subscription gives you access to models from other companies, including Kling, Veo 3.1, Sora 2, Seedance, Wan and Nano Banana. Higgsfield's job is the controls, presets and single bill wrapped around them — so two clips from the same description can look very different depending on which model you picked.",
    "Cinema Studio 4.0 is where the camera control lives. Higgsfield's help centre describes a Director's Panel where you set the film look, the camera move (it names options such as POV, Robot Arm and Helicopter Shot), the colour palette and the lighting, then generate.",
    "It also includes an AI assistant, Supercomputer, which Higgsfield says plans and generates whole projects from a plain-language request; it runs on GPT-6 Astra, a third-party model. You do not need it to make a first clip.",
  ],

  beforeYouStart: [
    "You can start without paying: Higgsfield has a free tier, described simply as limited use. Paid plans for individuals start with Starter at {{from:higgsfield}}, then step up through Plus and Ultra, which cost less per month if you pay for a year; teams pay per seat. Each plan comes with a monthly allowance of credits (the platform's unit of spend — each thing you make costs some), and the cost of a single clip depends on the model, the length and the quality, which is why the exact figure is shown on the Generate button before you commit.",
    "**Read the refund rules before your first payment, because they are tighter than most.** Higgsfield's terms (updated 26 July 2026) allow a refund only within seven days of your first purchase and only if you have not used a single credit; renewals are not refundable, and its help centre says up to 6% is deducted as a service fee. Subscriptions renew automatically for the same length as the first term, so on an annual plan the next charge is a year's fee, and cancelling stops the next renewal without refunding any part of the current one. If you bought at a promotional price, the help centre says the renewal comes in at the standard price.",
    "Credits do not pile up. Plan credits reset at each renewal and unused ones expire; on annual plans they refresh every 30 days. Extra credit packs last 90 days from purchase. Higgsfield also offers Auto-Refill, which charges your saved card whenever your balance drops below a threshold — it is off unless you switch it on, under Manage Account → Subscription.",
    "You must be at least 18 to hold an account, per Higgsfield's terms.",
  ],

  security: [
    { kind: 'text', text: "Higgsfield's privacy policy, updated 26 July 2026, says it may use what you upload and what you generate to train its own and its affiliates' AI models. The only way it describes to stop that is deleting the content or your account, and it says anything already used cannot feasibly be removed from a trained model. Deleted content can sit on its servers for up to 30 days, and copies may remain in backups after that." },
    { kind: 'list', label: 'Before you upload anything:', items: [
      "Your files may pass to other companies. The policy says data can be shared with 'third-party AI model and compute providers' — expected, since many of the models here belong to someone else — without naming them.",
      "Your data is processed in the US. The policy says personal information 'will necessarily be accessed and processed in the U.S.', and that Higgsfield also has a location in Kazakhstan.",
      "Don't upload someone else's face or voice without their permission. The terms require you to hold 'all necessary rights, releases, and consents' from anyone whose likeness or voice appears in what you upload.",
    ] },
  ],

  triad: {
    bestAt: [
      "Directing camera movement by choosing it from a menu — a named move, a lens, a lighting setup — rather than hoping a written description gets it right.",
      "Trying one idea across several companies' video models without signing up to each of them separately.",
      "Short, stylised clips for social posts and ads, which is what most of its presets and studios are built for.",
    ],
    okayAt: [
      "Longer pieces: Cinema Studio 4.0 can extend an uploaded clip forwards or backwards, but you are stitching short generations together, not editing on a timeline.",
      "Predicting cost: because each clip is priced separately, a monthly allowance is hard to translate into a number of videos in advance.",
    ],
    avoid: [
      "Paying for a year up front on your first day, given the refund and renewal terms in Before you start.",
      "Counting on an 'unlimited' offer to be fast. Higgsfield's own terms say it may throttle or move to a slower queue any usage that materially exceeds typical individual use, and do not guarantee generation speed; in August 2026 WION reported paying users waiting hours, some days, for a clip on a shared unlimited queue.",
      "Anything you would not want used as training material, since deletion is the only exit the privacy policy offers.",
    ],
  },

  starterActions: [
    {
      title: "One shot, one camera move",
      prompt:
        "A woman sits at a café window on a rainy morning, both hands around a cup of coffee, steam rising. She looks up and smiles at someone off-screen. Soft grey daylight, warm light from inside the café. One continuous shot, no cuts.",
      whyHere:
        "The prompt (the message you type) describes only what happens in the scene, not how the camera moves. In Cinema Studio 4.0 you choose the move from the Director's Panel instead — a slow push-in, a POV, a Helicopter Shot — so you can keep the words fixed and change only the camera, which is the control Higgsfield was built around.",
      tweak: "Generate it twice with two different camera moves and nothing else changed. The difference between the two clips is what the panel is doing.",
    },
    {
      title: "Read the price before you click",
      whatItDoes:
        "Before your first generation, change the model, the length and the quality one at a time and watch the credit figure on the Generate button move.",
      whyHere:
        "The Generate button is the only place each clip's price appears. On a balance that expires at every renewal, a minute spent here tells you what your allowance actually buys.",
    },
    {
      title: "Same words, two models",
      prompt:
        "A paper boat floats down a rain-filled gutter past glowing shop signs at night, then tips over a small waterfall into a drain.",
      whyHere:
        "If your plan includes both, run this once on Kling and once on Veo 3.1 — two different companies' models sitting behind the same Higgsfield balance. The scene has water, light and a fall, which is where models disagree most, so you see the gap between them rather than reading about it.",
      tweak: "Check the Generate button before each run: the same prompt does not cost the same on every model.",
    },
    {
      title: "Make a character, not a copy of a real person",
      whatItDoes:
        "Build a recurring character from an image you generated yourself, then put it in two different scenes.",
      whyHere:
        "Higgsfield's help centre describes Soul ID training a character from photos so the same face carries across images and video. Given the consent rule in Security, a character you invented is the clean way to learn how it works.",
    },
  ],

  pitfalls: [
    "**Using a credit early ends your refund.** A single test clip turns a refundable first purchase into a non-refundable one. If you are unsure, explore on the free tier before you pay.",
    "**A failed clip usually refunds itself — not always.** The help centre says credits for a failed generation are normally returned within minutes, but that some models may not refund them. You can check under Manage Account → Usage.",
    "**Its help pages and its marketing describe different versions.** Model and studio version numbers change fast, and some of Higgsfield's own guide pages still describe older releases. Trust what the generator shows you over a guide's screenshots.",
  ],

  whereToNext: [
    { label: 'Video Creation & Editing', categorySlug: 'video-creation-editing' },
    { label: 'Image generators', categorySlug: 'image-generation-editing' },
  ],
};
