import type { PlatformTutorialData } from "./types";

export const freepikAiTutorial: PlatformTutorialData = {
  slug: "freepik-ai-getting-started",
  platformSlug: "freepik-ai",
  title: "Getting Started with Magnific (formerly Freepik)",
  tagline: "Freepik's library of ready-made stock pictures and its AI tools for making and enlarging images and video, now under a new name — with one licence for downloaded stock and a different one for what the AI makes.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open the image or video generator in your browser, type a prompt (the message you type) describing what you want, and pick which AI engine to use from a list. A few seconds later your results appear. You keep the ones you like, adjust the wording or settings, and run it again.",

  whatItIs: [
    "Magnific is the new name for Freepik, the Spanish company that started as a library of ready-made stock images — photos, illustrations, icons and templates you can download and use. It announced the rename in April 2026. freepik.com now forwards you to magnific.com, an old Freepik login still works, and many guides online still use the old name, so if you see \"Freepik\" in a tutorial it means this site.",
    "Alongside the stock library sits a suite of AI tools: an image generator, a video generator, an upscaler (which enlarges a picture and sharpens its detail), a background remover, an image editor, plus sound-effect and music generators. The upscaler is where the name comes from — Magnific was an upscaling startup Freepik bought in 2024.",
    "The thing that sets it apart is choice of model (the AI \"brain\" that does the actual thinking). Rather than one house engine, Magnific puts several behind one account: its own Magnific One, plus third-party models such as Google's Nano Banana 2 for images and Kling 2.5 for video. You pick per job, and all of them draw on the same account.",
    "It runs in the web browser, and Magnific also lists a desktop app and a mobile app.",
  ],

  beforeYouStart: [
    "Sign-up is self-serve on magnific.com — you register with an email address, or use a Google login. If you already had a Freepik account, it carries over with the same email and password; you do not need a new one.",
    "The AI tools run on credits (the platform's unit of spend — each thing you make costs some). Paid plans are currently Premium at $20 a month, Premium+ at $45 and Pro at $110, each cheaper per month if billed annually ($14.50, $33.75 and $82.50). Magnific's terms let it change how many credits a tool costs \"at its sole discretion and without prior notice,\" so check the cost shown next to the button before you run something expensive, especially video.",
    "**The licence on what the AI makes depends on whether you are paying at the moment you make it.** Magnific's AI Products Terms (June 2026) say that a subscriber owns an image or video it generates, provided the subscription \"remains active at the time of generation.\" Without a paid subscription you get only a personal, non-commercial licence to use it, which Magnific can revoke. So anything you might use for a business, a client or a product should be generated while subscribed — upgrading later does not, on the terms' wording, convert things you made earlier.",
    "Downloaded stock follows a different rule. Magnific's Terms of Use (June 2026) let you use stock content without paying on condition that you credit it; its help centre gives the credit line as \"Designed by Magnific,\" linked to magnific.com, placed next to the image or, failing that, in the footer or credits. A Premium, Premium+ or Pro subscription removes the credit requirement for stock you download while subscribed. Crediting the stock does not change the AI rule above: a credit line is not what makes an AI image usable commercially.",
  ],

  security: [
    { kind: 'text', text: "Magnific is a Spanish company working under EU privacy law, and its AI terms are firmer than most on one point: Magnific's AI Products Terms (June 2026) say it 'will not use Inputs (including the User's image captured when using certain AI Products) or Outputs to train its own AI models.' What you make is private by default — the same terms say your prompts and results stay confidential unless you choose to share them publicly, at which point other users may use them under the platform's terms." },
    { kind: 'list', label: "What the April 2026 privacy policy adds", items: [
      "Photos and audio you upload as a starting point are, per the policy, deleted immediately after the AI has used them. Your prompts and results are kept for as long as you have an account.",
      "When you pick a third-party model, your upload is processed by that company, which the policy says keeps it for up to 30 days. The policy also says some models are hosted in countries without EU-level privacy protection, and that choosing one is your decision — so the model menu is also a choice about where your data goes.",
      "Magnific still studies how prompts, results and your feedback relate in order to improve its tools. The policy says you have the right to object to this; it does not say this covers uploaded faces or voices, which it says it never uses for training.",
      "Uploading another person's face or voice is on you. The AI terms require you to have permission from anyone whose image, voice or identity is in what you upload.",
    ] },
  ],

  triad: {
    bestAt: [
      "Trying the same idea on several image and video models without opening a separate account for each.",
      "Making a small or old image bigger and sharper — upscaling is the company's original product.",
      "Projects that mix stock and AI: find a licensed photo or icon, then generate or edit around it, in one place.",
    ],
    okayAt: [
      "Getting one exact picture you already have in mind. Results come back as several attempts, and getting it right usually takes a few rounds of rewording.",
      "Video. It works, but each try spends credits whether you keep it or not.",
    ],
    avoid: [
      "Using anything you generated without a paid subscription in a business, client job or product. The AI terms limit those results to personal, non-commercial use.",
      "Counting on Magnific's legal cover for AI images. Its Terms of Use say the cover it offers when someone claims a stock download infringes their rights does not apply to anything made with its AI tools.",
      "Printing AI images on merchandise for sale under the Pro merchandise licence. Magnific's help centre says AI-generated resources are excluded from it; that licence covers stock files only.",
    ],
  },

  starterActions: [
    {
      title: "One prompt, two engines",
      prompt:
        "A ceramic coffee mug on a wooden kitchen table by a window, soft morning light, shallow depth of field, photorealistic, no text.",
      whyHere:
        "Run it once on Magnific One and once on Nano Banana 2 and compare. Choosing the model is not only a look: Magnific's AI terms fold each third-party provider's own terms into yours, and its privacy policy says the provider you pick processes your upload. On Midjourney there is one engine and one set of terms; here the menu decides both.",
      tweak:
        "Change one thing at a time — the lighting, then the style — so you can see what each word is doing.",
    },
    {
      title: "Rescue a small photo with the upscaler",
      whatItDoes:
        "Upload a low-resolution image — an old phone photo, a thumbnail — to the image upscaler and get back a larger, sharper version.",
      whyHere:
        "This is the tool the brand is named after. Unlike a standalone upscaler such as Topaz, it sits in the same account as the generator, so you can enlarge something you just made without downloading and re-uploading it.",
      tweak:
        "Try it on an image you generated in step 1, then on a real photo, and compare how much detail it invents in each.",
    },
    {
      title: "Turn a still into a short clip",
      prompt:
        "Slow push-in toward the mug, steam rising gently, morning light shifting across the table. Calm, no camera shake.",
      whyHere:
        "Take the image you kept from the first exercise into the video generator with Kling 2.5 selected. Going to Kling directly gets you Kling only; here the still and the clip come from one account and one credit balance, so you can see how far a single image goes before you pay for many video attempts.",
      tweak:
        "Keep the movement to one simple action. Asking for several things to happen at once is where clips fall apart.",
    },
    {
      title: "Search the stock library before you generate",
      whatItDoes:
        "Type what you need into stock search first — 'coffee mug on table' — and only generate if nothing fits.",
      whyHere:
        "On Magnific the two kinds of picture carry different rights. A stock photo has a known author licensed through Magnific, and it is what Magnific's legal cover applies to; an AI result has no such cover, and on the AI terms it may not be unique. Midjourney has no stock library to fall back on, so it cannot offer you that choice at all.",
    },
  ],

  pitfalls: [
    "**Old 'Freepik' tutorials may be out of date.** Screenshots, menu names and plan details in them may have changed since the rename — trust what magnific.com shows you.",
    "**Your AI result is not exclusive.** Magnific's AI terms say it does not guarantee that the same output cannot be generated again by other users. Fine for a social post; a problem if you wanted a logo or a character nobody else could have.",
    "**Credits do not all carry over.** The terms say plan credits do not roll into the next billing period. Extra credit packs you buy on top do roll over, but are cancelled with no refund if you cancel your subscription and go back to an unpaid account.",
    "**Subscriptions renew automatically.** You can cancel renewal at any time and keep access until the end of the period you paid for. The Terms of Use say no right of withdrawal applies to digital content beyond what consumer law guarantees, and the pricing page describes refunds differently — so check the current refund wording before you count on getting money back.",
    "**Some uses are banned outright.** The AI terms prohibit political content for election campaigns, sexual or shocking material, passing an AI result off as human-made to deceive people, and using results to train another AI. From August 2026 they also require you to clearly label deepfakes and AI content meant to inform the public.",
  ],

  whereToNext: [
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Video tools", categorySlug: "video-creation-editing" },
  ],
};
