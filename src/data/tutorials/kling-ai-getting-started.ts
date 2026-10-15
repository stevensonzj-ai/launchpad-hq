import type { PlatformTutorialData } from "./types";

export const klingAiTutorial: PlatformTutorialData = {
  slug: "kling-ai-getting-started",
  platformSlug: "kling-ai",
  title: "Getting Started with Kling AI",
  tagline: "Type a description, get a short video clip back — paid for in credits, under terms that change depending on whether you are a paying member.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open Kling in your browser, choose video or image, and type a **prompt** (the message you type) describing the scene: what is in it, how the camera moves, what the light is like. Kling takes a little while to make the clip, then you watch it, adjust the wording or a setting, and generate again.",

  whatItIs: [
    "Kling AI is a video and image generator from Kuaishou, a Chinese technology company; the service you sign up to is run by its Singapore company, Kling AI Pte. Ltd. You describe a scene in words, or upload a picture to start from, and it produces a short clip or an image. It runs in a web browser, and Kling also offers developer access so other software can use it.",
    "Its current headline video model is Kling 4.0, and its image model is Kling Image 3.0. Kling's own blog, dated 30 September 2026, describes Kling 4.0 as rolling out in limited early access, with the full model \"coming in October 2026\" and availability that \"may vary during the initial rollout\" — so whether it appears in your account yet is something you will see once you are signed in.",
    "Its distinguishing tools are about directing rather than just describing. Kling's video guide documents a Multi-Shot switch that plans cuts between several shots inside one clip, a mode that animates between a start picture and an end picture you supply, and audio generated with the video, including spoken lines you write into the prompt.",
  ],

  beforeYouStart: [
    "Everything you make costs **credits** (the platform's unit of spend — each thing you make costs some). Kling's Credits Policy says the charge for a generation is whatever the screen shows at that moment, and its video guide prices video by the second: longer clips, higher resolution and generated sound each cost more. Credits come off when you press generate, and Kling's policy says that if a generation fails, they are refunded.",
    "Credits do not all last the same length of time. Under Kling's Credits Policy, a membership's credits arrive each month and expire if you have not used them before their validity runs out; credits you buy separately last far longer, and are unaffected by whether you keep your membership. Kling spends whichever credits expire soonest first. None of them can be refunded or cashed out.",
    "This page does not quote Kling's prices or say what any membership includes, because we have not yet verified them. Kling publishes them on its membership page — check there, and check whether a plan is a first-month offer that renews at a different price, before you pay. Memberships renew automatically until you cancel, and Kling's Terms of Paid Service say fees are not refunded once a paid service starts.",
    "**Whether you may use what you make depends on whether you pay.** Read the security section below before you publish anything — this is the fact on this page most likely to matter later.",
  ],

  security: [
    { kind: 'text', text: "Kling's two sets of terms say different things about using your videos commercially, and the difference turns on membership. Its Terms of Service (updated 21 April 2026) say you own what you create, but also that you may not use your output 'for any commercial purposes' without Kling's written permission, and that you must label anything you share with Kling's brand or say it was made by Kling AI. Its Terms of Paid Service (dated 10 October 2026) say paying members' commercial use 'is not restricted' — except for building a competing product — and that only members may remove Kling's **watermark** (a mark on generated output identifying it as AI-made). If you are not a paying member, treat everything you make as personal use only. The paid terms do not say whether that permission survives for clips made while you were a member once the membership ends." },
    { kind: 'text', text: "Kling also takes rights in what you upload and generate. Its Terms of Service give Kling a royalty-free licence to your inputs and outputs, which it may use for promotion and to train and improve its AI models, and say your content may be made available to other users to build on. The terms say you can withdraw that permission by emailing support@kling.ai. Kling's Privacy Policy (updated 21 April 2026) says your data is stored on servers in Singapore and may be shared with its corporate affiliates; it says Kling does not analyse facial-recognition features in pictures, but in the same document says that for face-based features it may analyse what you upload and record feature points." },
    { kind: 'list', label: "Before you upload anything", items: [
      "Don't upload photos of other people without their permission. Kling's terms forbid impersonating anyone and make you responsible for the portrait and personality rights of anyone in your inputs.",
      "Don't upload confidential footage, client work or brand assets you do not control, given the licence above.",
    ] },
  ],

  triad: {
    bestAt: [
      "Short, cinematic clips where you want to direct the camera — push-ins, tracking shots, a handheld feel — by writing it into the prompt.",
      "Several shots cut together inside a single clip, using the Multi-Shot switch rather than stitching clips in an editor.",
      "Animating between a start picture and an end picture you choose.",
      "Clips with sound and spoken lines generated together with the picture.",
    ],
    okayAt: [
      "Getting exactly what you pictured on the first try. Expect to regenerate, and every regeneration costs credits.",
      "Matching its newest model to the guides. Kling's detailed video guide was written for the model before Kling 4.0, so its controls may not carry over exactly.",
    ],
    avoid: [
      "Anything you intend to sell, monetise or use for a client unless you are a paying member — Kling's own Terms of Service bar commercial use of output without written permission.",
      "Uploading faces, brand material or confidential footage you would not want Kling to reuse: its terms license your inputs and outputs for promotion and model training until you email to withdraw.",
    ],
  },

  starterActions: [
    {
      title: "One shot, camera directed",
      prompt:
        "A ceramic coffee mug on a wooden table beside a rainy window, steam rising, soft morning light, slow push-in camera, one continuous shot.",
      whyHere:
        "Kling's video guide prices video per second and charges more for generated sound, so a short clip with audio switched off is the cheapest test of how Kling reads camera wording. Its guide's own examples write the camera into the prompt — 'cinematic handheld', 'one continuous long take' — which is the habit worth building first.",
      tweak:
        "Change only the camera phrase — 'slow orbit', 'handheld', 'static wide shot' — and generate again to see what each one does.",
    },
    {
      title: "Three shots in one clip",
      prompt:
        "Shot 1, wide shot of a cyclist at the top of a hill at sunrise, cinematic handheld. Shot 2, close-up of their hands gripping the handlebars. Shot 3, tracking shot as they ride downhill past pine trees.",
      whyHere:
        "Turn on Kling's Multi-Shot switch before you paste this. Kling's video guide documents that switch and the 'Shot 1, …' labelling its own examples use; with it on, Kling plans the cuts between shots inside one clip. With it off, you get a single shot and the labels are just words.",
      tweak:
        "Kling's guide also describes a Custom Multi-Shot option for setting how many shots there are and how long each lasts.",
    },
    {
      title: "A line of dialogue",
      prompt:
        "At a night market, a noodle vendor hands a steaming bowl to a customer under string lights. Vendor (cheerful, Spanish): '¡Buen provecho!' Customer (laughing): 'Thank you!'",
      whyHere:
        "Kling's video guide shows spoken lines written this way — the speaker's name, then tone and language in brackets — and says lines in languages it does not support are translated into English. Dialogue only works with generated sound switched on, which costs more, so try this once you have done a silent clip or two.",
    },
    {
      title: "Start and end frames",
      whatItDoes:
        "Upload one picture as the first frame and another as the last, and Kling animates the motion between them.",
      whyHere:
        "Kling's guide documents a Start & End Frames mode, which gives you far more control over where a clip lands than a description alone. Use two of your own photos of a place or an object rather than a person — under Kling's terms, what you upload is licensed to Kling, and you carry responsibility for anyone pictured.",
    },
  ],

  pitfalls: [
    "**Regenerating is where credits go.** Every new attempt is charged again. Change one thing per attempt so each one teaches you something.",
    "**Check the charge on screen before you press generate.** Settings you didn't notice can change it.",
    "**Waiting is normal, and Kling doesn't publish how long.** Neither the terms nor the guides give generation times or say how long a queue can be. Kling's own explainer pages say to 'wait a few seconds', which you should not rely on for video.",
    "**Cancelling takes effect at the end of the billing cycle, not immediately.** Kling's paid terms say you keep access until the current cycle ends, and if a renewal charge has already gone through shortly before you cancel, access may run into the next cycle. You cancel wherever you subscribed.",
  ],

  whereToNext: [
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
  ],
};
