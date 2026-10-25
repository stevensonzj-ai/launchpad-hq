import type { PlatformTutorialData } from "./types";

export const capcutTutorial: PlatformTutorialData = {
  slug: "capcut-getting-started",
  platformSlug: "capcut",
  title: "Getting Started with CapCut",
  tagline:
    "A free-to-start video editor from the makers of TikTok, with AI captions and AI video built in — and terms worth reading before you upload your face.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You add your clips, photos or a recording, and they line up in order along a strip at the bottom of the screen. You trim, rearrange and layer text or music by clicking and dragging, watching the result in a preview window above. When it looks right, you export a finished video file or post it straight to social media.",

  whatItIs: [
    "CapCut is a video editor made by ByteDance, the company behind TikTok, and it is built around the short, vertical videos people post to TikTok, Instagram and YouTube. It runs in a web browser, as a desktop app and on phones, and the three versions share the same basic layout, so what you learn on one carries over.",
    "Most of CapCut is ordinary editing — cutting, adding text, music and transitions by clicking — with AI tools sitting alongside as buttons. The ones a beginner reaches for first are automatic captions (CapCut listens to the speech in your video and types it out as on-screen text, timed to the words), text-to-speech, background removal and noise clean-up.",
    "It also makes video from scratch. Its AI video maker turns a script you paste in into a narrated video, and its AI video generator turns a written description into a short clip using ByteDance's Seedance models (the **model** is the AI \"brain\" that does the actual work). CapCut currently names two: Seedance 2.5 and Seedance 2.0 Mini.",
    "Why a beginner picks it over a desktop editor such as DaVinci Resolve: CapCut is designed to get a phone-shaped video posted quickly, with templates you fill in and captions in a couple of clicks. It gives up fine control to get there, which is the right trade for social clips and the wrong one for a long film.",
  ],

  beforeYouStart: [
    "You can start without paying: go to capcut.com and choose to edit online, or download the desktop or phone app. The free plan covers CapCut's free templates and basic editing tools. Paid plans are where AI credits (the platform's unit of spend — each AI thing you make costs some) come from: Pro is listed at {{price:capcut:Pro}} and Ultra, with many more credits, at {{price:capcut:Ultra}}. There is also a Teams plan priced per seat. CapCut's own pricing page says its displayed prices are \"for reference only\" and that you see your final price after signing in.",
    "Which individual AI tools work on the free plan is not spelled out in CapCut's plan list, and CapCut's own pages don't agree with each other about it. Expect some AI buttons — especially anything that generates video — to ask you to upgrade or spend credits. If you only want to trim clips and add captions to the odd social post, start free and see where you hit a wall before paying.",
    "In the US, the company you are signing up with is no longer just ByteDance. Since January 2026, CapCut's US Terms of Service name TikTok USDS Joint Venture LLC — the US joint venture set up so TikTok could keep operating here — as the operator, and paid features in the US are provided by a sister company, TT Commerce & Global Services. CapCut was briefly switched off for US users in January 2025 and kept off the app stores for about a month; it is available normally today. CapCut is for ages 13 and up, and under-18s need a parent's consent under its terms.",
    "A paid plan renews itself. CapCut's terms say a subscription renews for the same length as the last one unless you cancel before the current period ends, and that a full refund is available within 14 days of starting — but only if you haven't used the paid features.",
  ],

  security: [
    {
      kind: "text",
      text: "The thing to know about CapCut is in its Terms of Service, not its privacy settings. The US terms (last updated 15 April 2026) say CapCut doesn't own your videos — but by submitting them you give TikTok USDS Joint Venture, its affiliates and 'other connected third parties' an 'unconditional, non-exclusive, royalty-free, fully transferable, sub-licensable, perpetual and worldwide license to use your User Content.' A separate clause covers your username, image and likeness. The terms say this is subject to your platform settings, but they don't spell out what those settings change.",
    },
    {
      kind: "list",
      label: "What that means in practice:",
      items: [
        "Perpetual and sub-licensable are the two words to notice: the licence has no end date, and CapCut may pass it on to others. Uploading a clip is not the same as only storing it.",
        "Think twice about uploading other people's faces, especially children's, or footage a client or employer owns. The licence you grant covers what you upload, and you can't grant rights to footage that isn't yours.",
        "This wording drew wide criticism in June 2025. CapCut's response at the time was that the clause hadn't changed and applies only as far as needed to run the service — but the terms text itself carries no such limit.",
      ],
    },
    {
      kind: "text",
      text: "CapCut's US privacy policy (updated 15 April 2026) also says it may use your information to 'train, test, and improve technology, such as machine learning models,' including by scanning and reviewing the content you add — and it counts the prompts and files you submit to its AI tools as part of that content.",
    },
  ],

  triad: {
    bestAt: [
      "Captioning a talking-to-camera clip fast: captions appear in the same place — Text, then Auto Captions — on web, desktop and phone.",
      "Short vertical videos for TikTok, Reels and Shorts, including from templates you just fill in.",
      "Quick clean-ups a beginner would otherwise skip: removing a background, reducing noise, adding a computer voice.",
    ],
    okayAt: [
      "Making video from nothing. The AI tools will produce a clip or a narrated video, but they spend credits, and what comes out usually needs editing in the main editor afterwards.",
      "Longer projects. CapCut Web caps how long an upload can be for captioning, and the whole design leans towards short clips.",
    ],
    avoid: [
      "Using CapCut's music or stickers in anything that sells something without checking the mark first. Its Materials License Agreement (last updated 22 January 2026) limits ordinary library Sounds to personal, non-commercial use; only items carrying a 'commercial' mark are licensed for ads, and even then not on merchandise or as a logo.",
      "Uploading footage you'd want to keep exclusive — a client's product launch, a paid shoot — given the perpetual, sub-licensable licence in the terms.",
      "Treating a project stored only in CapCut's cloud as your only copy. In January 2026 a US data-centre power failure left exports failing for more than a day.",
    ],
  },

  starterActions: [
    {
      title: "Caption a talking clip, then fix what it misheard",
      whatItDoes:
        "Film 30 seconds of yourself talking. In CapCut open Text, then Auto Captions, pick the language and generate. Then click any caption block to correct the words before you export.",
      whyHere:
        "CapCut's own help page says its captions can mishear background noise, accents and fast speech — and that on the phone app you can't re-run recognition on just one bit; you delete that caption block and add captions again from the audio you want. Knowing that before you film saves a redo.",
      tweak:
        "Record somewhere quiet. CapCut says its web captioning works best in Chrome or Edge with clear audio.",
    },
    {
      title: "Find the \"commercial\" mark before you pick a song",
      whatItDoes:
        "Before adding music or a sticker to a video that promotes a business — even a friend's bakery — look for CapCut's 'commercial use' mark on the item. Anything without it is for personal posts only.",
      whyHere:
        "That split comes from the Materials License Agreement described above, and its licence is granted per exported video, so re-editing and re-exporting something can mean the material has to be licensed again.",
    },
    {
      title: "Turn a script into a narrated video",
      prompt:
        "Three ways to keep houseplants alive through winter. One: move them away from cold, draughty windows. Two: water less often — they grow more slowly when the days are short. Three: wipe the dust off their leaves so they catch more of the light there is.",
      whyHere:
        "CapCut's AI video maker takes a script pasted into its 'Enter script' box, lets you choose a style, a voiceover and the shape of the video, and builds scenes to match — then hands the result back to the normal editor, where you can add music and captions and export. You are editing its first draft, not accepting it.",
      tweak:
        "Keep the script short and in plain sentences — each sentence tends to become a scene.",
    },
    {
      title: "Describe a short clip and let Seedance make it",
      prompt:
        "A slow push-in on a steaming cup of coffee on a wooden table beside a rainy window, soft morning light, calm and cosy, vertical video, about 8 seconds.",
      whyHere:
        "CapCut's video generator runs on ByteDance's Seedance models, and CapCut's own guidance is to keep these clips around 5 to 12 seconds and to describe camera movement and lighting, which is why the prompt (the message you type) names both.",
      tweak:
        "Swap the coffee for anything you want to see, but keep 'slow push-in' or another camera move — CapCut's tips lean on them. If the generator offers a choice between Seedance 2.5 and Seedance 2.0 Mini, try the same prompt on both before settling on one.",
    },
  ],

  pitfalls: [
    "**Don't take a CapCut tool page you found in search as the word on what's free.** As noted under Before you start, CapCut's pages disagree; believe what the app tells you when you press the button.",
    "**The price you see before signing in may not be the price you pay.** Check the final figure on the checkout screen before you confirm.",
    "**Exporting isn't the same as having a copy.** CapCut keeps projects in its own cloud space. Download finished videos — and keep your original footage — on your own device, so an outage or a cancelled subscription doesn't take them with it.",
    "**Using a free template doesn't make its music yours.** Templates often come with a sound attached; the commercial-use rule in starter action 2 applies to it too.",
  ],

  whereToNext: [
    { label: "Video creation & editing tools", categorySlug: "video-creation-editing" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
  ],
};
