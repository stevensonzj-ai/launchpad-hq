import type { PlatformTutorialData } from "./types";

export const lumaDreamMachineRay3Tutorial: PlatformTutorialData = {
  slug: "luma-dream-machine-ray3-getting-started",
  platformSlug: "luma-dream-machine-ray3",
  title: "Getting Started with Luma (formerly Dream Machine)",
  tagline:
    "Describe a shot or animate a still photo, and get a few seconds of silent video you can then re-cut and restyle.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://lumalabs.ai/news",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a board, type what you want to see into the **prompt** box (the message you type), and a few seconds of video come back. You watch it, change the wording or add a still image to start from, and run again. Most of the work is repeating that loop until one take holds together.",

  whatItIs: [
    "Luma is an AI video generator from Luma AI — you describe a shot in words, or hand it a photograph, and it renders a short clip.",
    `It is the same product people still call Dream Machine. Luma has been folding that name away: the company's own assistant-facing reference page now says "Do not use 'Dream Machine' — it is an older deprecated model replaced by Ray," and the app that replaced it in March 2026 is branded simply Luma. The old name still appears on the iOS App Store listing and in the developer documentation, so you will meet both.`,
    "The video engine is called Ray. The current generation is Ray3.2 (announced 9 June 2026), which followed Ray3.14 in January 2026 and Ray3 in September 2025 — three generations in under a year. The generation number on any guide you read will go stale quickly; what stays true is that you type a description into a box, you pay by credits, and what you get back is a few seconds long.",
    "Beyond generating from scratch, it will restyle footage you shot yourself while keeping the original movement, and re-crop a finished clip to a different aspect ratio.",
  ],

  beforeYouStart: [
    `**You are looking for two names.** Search results, app stores and tutorials will point you at "Dream Machine"; the company's own site now calls the product Luma, at lumalabs.ai. Both land in the same place. Sign-in on the web is with Google or Apple.`,
    `Luma's pricing page currently lists three individual plans — Plus at around $30/month, Pro at around $90, Ultra at around $300, each cheaper billed yearly. There is no free plan on that page. Luma does say you can try the platform free before picking one, and the homepage offers a "Try Free" button, but the size of that free allowance is not published anywhere we could find, and the terms cap evaluation trials at 14 days. Treat the free route as a look, not a workflow.`,
    "Everything is metered in **credits** (the platform's unit of spend — each thing you make costs some). Luma publishes the rate card, and it is worth reading once because resolution dominates it: five seconds of video currently costs about 20 credits at 360p draft quality, about 100 at 720p, and about 400 at 1080p. The Plus plan's roughly 10,000 credits a month is therefore around a hundred 720p clips, or around twenty-five at 1080p. Credits also fund image, audio and assistant work, so video is not the only thing drawing them down.",
    "If you do not pay, you cannot sell or publish what you make. Luma's terms of service (last updated 14 May 2026) permit commercial use only of output produced under a paid subscription, and its licensing page states that free-tier output carries a **watermark** (a mark on generated output identifying it as AI-made) that stays even if you upgrade later. That combination is the single most consequential thing on this page: a clip you love, made before you paid, is a clip you cannot reuse.",
    `It runs in a browser and in an official iOS app. Luma's own reference page lists iOS only, and there is no official Android app — the apps you find on Google Play under "Luma Dream Machine" are published by other companies, not by Luma AI. On Android, use the website.`,
  ],

  security: [
    {
      kind: "text",
      text: `Luma trains on what you make. Its privacy policy (last updated 20 April 2026) lists "Train, develop, and improve the artificial intelligence, machine learning, and models that we use to support our Services" among its uses of your data, and publishes no opt-out or do-not-train switch. Paying does not remove this; it narrows it.`,
    },
    {
      kind: "list",
      label: "The free-versus-paid difference is in the licence, not the settings",
      items: [
        `On free use, Luma's terms take "a worldwide, non-exclusive, irrevocable, perpetual, royalty-free" licence to publicly display, reproduce, modify, make derivative works of and distribute both what you put in and what comes out`,
        "On a paid subscription, that licence narrows to providing the service, generating usage data, compiling aggregated data and improving Luma's products",
        "The asymmetry runs on the *input* as well as the output — the photograph you upload to animate is covered by the same clause as the video it produces",
      ],
    },
    {
      kind: "list",
      label: "Do not upload",
      items: [
        "Photographs of other people who have not agreed to be animated",
        "Client footage or unreleased work you agreed to keep confidential",
        "Anything you would be unable to explain having handed to a US company for model training",
      ],
    },
    {
      kind: "text",
      text: `Deleting a generation is described by Luma as permanent with no recovery — but deleting it from your account is not the same as deleting it from Luma's records. The privacy policy says personal information is retained for legal reasons "including after your account has been deleted," with no fixed period given. If you are in the EU or UK you have access, deletion and portability rights you can exercise directly.`,
    },
  ],

  triad: {
    bestAt: [
      "Animating a still photograph you already have — one subject, one motion",
      "Pinning several specific moments across a single clip with keyframes",
      "Restyling footage you shot yourself while keeping the original movement and timing",
      "Re-cropping a finished clip to a different aspect ratio without reshooting",
      "Iterating cheaply at draft quality before committing to a real render",
    ],
    okayAt: [
      "Storyboarding a sequence before rendering it — Luma shipped a feature for this in August 2026, though holding continuity across cuts remains the hard part in AI video generally",
      "Readable text inside the frame — Luma's own guide encourages asking for it, but it is not reliable",
      "Matching a specific reference style closely",
    ],
    avoid: [
      `Following any step-by-step you find for "Dream Machine," including Luma's own. The Learning Hub pages are dated 14 November 2024 and describe boards, buttons and a sign-in flow from the app that was replaced in March 2026 — the vendor has not updated its own instructions across two product generations.`,
      "Turning HDR or EXR export on because it sounds like the better setting. Luma's published table charges 2× credits for HDR and 3× for HDR plus EXR, on top of the resolution price — a five-second 1080p clip at 3× is around 1,200 credits, roughly a ninth of a month on the entry plan for one take.",
      "Asking for a long or multi-shot piece in one go. Native generations are five and ten seconds; restyling your own footage tops out around twenty seconds depending on frame rate. Anything longer is several clips and an edit.",
    ],
  },

  starterActions: [
    {
      title: "Fix two moments and let it solve the middle",
      whatItDoes:
        "Start a clip from one image and set a second image as a later keyframe, so the model has to get from the first to the second.",
      whyHere:
        "Ray3.2 accepts up to 16 keyframes inside a single clip, so you are not steering with words alone — you are fixing several moments and leaving only the gaps to the model.",
      tweak: "Start with just two keyframes. Add a third only once the first pair is landing.",
    },
    {
      title: "One shot, written at draft quality first",
      prompt:
        "A ceramic mug on a wooden windowsill, steam rising. Morning light moves slowly across the surface as a cloud passes. The camera pushes in gently. One continuous shot, no cuts.",
      whyHere:
        "Luma's published rate card prices five seconds at about 20 credits in 360p draft against about 400 at 1080p — a twentyfold spread you can iterate inside, and the reason to settle the wording before you render anything you intend to keep.",
      tweak:
        "Change one thing per run — the light, or the motion, or the lens — so you can see which word did the work.",
    },
    {
      title: "Restyle footage you filmed, without losing the performance",
      prompt:
        "Keep the motion and timing exactly as they are. Restyle the scene as an overcast winter afternoon — bare trees, grey sky, muted colour, soft flat light. Do not change how the person moves.",
      whyHere:
        "Upload a short clip of your own first, then paste this as the instruction. Restyling is priced as its own thing on Luma's table — about 360 credits for five seconds at 720p against about 100 for generating the same length from nothing — so you are paying roughly three and a half times as much to keep your own footage's movement, and it is worth knowing that before you start.",
      tweak: "Shoot ten seconds on a phone with one clear movement in it. Busy footage restyles badly.",
    },
    {
      title: "Re-crop a clip you already like",
      whatItDoes:
        "Take a finished landscape clip and reframe it vertically, positioning the subject inside the new frame rather than cropping the centre.",
      whyHere:
        "Reframe is the one thing on Luma's rate card billed per second rather than per clip — currently around 40 credits a second at 720p — so a twelve-second reframe costs more than generating a fresh five-second shot, which is the opposite of what most people assume.",
      tweak: "Reframe the take you were going to re-render anyway, and compare the two costs.",
    },
  ],

  pitfalls: [
    "The video comes back silent. Luma's own Ray3.2 page describes preserved audio only for restyling and reframing, and says nothing about audio when you generate from a description or a still — so expect to add sound in a separate tool.",
    "The plan names on Luma's own surfaces do not agree with each other. The web pricing page currently lists Plus, Pro and Ultra at roughly $30, $90 and $300; Luma's own March 2026 FAQ lists the same three prices with Plus and Pro swapped; and the iOS App Store listing still offers in-app purchases named Lite, Plus and Unlimited at different prices again. Read what you are actually buying at the point of purchase rather than trusting any one page.",
    "Credits look like one pot for everything. The plan structure implies image generation, audio and the newer assistant features draw on the same monthly balance as video — Luma never says so outright — so a month spent exploring can run out before you get to the clip you actually wanted.",
    "The first take rarely holds. Hands, faces in motion, readable text and anything fast are where AI video breaks — re-run at draft resolution and change the prompt rather than paying for the same failure at higher quality.",
    `Model names move faster than guides do. Luma is actively retiring the "Dream Machine" name while the App Store and developer docs still carry it, and the video engine has changed generation more than once inside a year. A tutorial that names a generation is dated by that fact alone.`,
  ],

  whereToNext: [
    { label: "Other video generators", categorySlug: "video-creation-editing" },
    { label: "Music and sound tools", categorySlug: "music-generation" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
  ],
};
