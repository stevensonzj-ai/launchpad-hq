import type { PlatformTutorialData } from "./types";

export const opusClipTutorial: PlatformTutorialData = {
  slug: "opus-clip-getting-started",
  platformSlug: "opus-clip",
  title: "Getting Started with OpusClip",
  tagline:
    "Turn one long video into a batch of short clips for TikTok, Reels and Shorts — without opening an editor.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.opus.pro/blog",
  accessTier: "FREE",

  howItWorks:
    "You paste a link to a long video or upload the file, then wait while it watches the whole thing. It hands back a set of short vertical clips, each one already cut, captioned and ranked. You play them, keep the ones you like, adjust the wording or the timing, and download them one at a time.",

  whatItIs: [
    "OpusClip takes one long video — a podcast episode, a livestream, a conference talk, a webinar — and cuts it into short vertical clips for TikTok, Reels and Shorts. It decides which moments are worth clipping, so your job becomes reviewing its picks instead of scrubbing through an hour of footage.",
    "It is built for people who already have long footage and no time to edit it. Making a video from scratch is a different job and a different product — the same company sells one called Agent Opus, which this page does not cover.",
    "What comes back is a first pass, not a finished post.",
  ],

  beforeYouStart: [
    "The free plan currently gives you **60 processing minutes a month**, refreshed monthly. What counts is the video you feed in, not the clips that come out: OpusClip's help centre puts it as \"1 credit per minute of the original video imported,\" and the pricing page calls the same thing **credits** (the platform's unit of spend — each thing you make costs some). A one-hour podcast eats almost the whole month in one upload, so the allowance, not the price, is the constraint.",
    "You need a long video you already have and are allowed to use. On the free plan the help centre lists your sources as YouTube and files from your own computer; Google Drive, Vimeo, Zoom, Rumble and StreamYard are listed as paid-plan additions, as are posting straight to social and scheduling.",
    "Check your language before anything else. OpusClip says it supports \"over 25 languages,\" but all except English, German, Spanish, French and Portuguese are marked as still being tested, with \"inaccurate emojis or highlighted keywords\" as the stated symptom. Two gaps are absolute rather than rough: the help centre states plainly that Hindi is not supported, and that \"we do not support any languages that read right to left, including Hebrew, Kurdish, Arabic or Persian.\"",
    "A free export carries an OpusClip logo **watermark** (a mark stamped on the output showing where it was made) and comes out at up to 1080p — normal HD, fine for phone screens. It is not removable on the free plan, though the help centre notes that upgrading strips it retroactively from clips you already made. The 7-day Pro trial **also** watermarks: the vendor lists \"Videos exported during the trial will include the OpusClip watermark\" first among what the trial does not include.",
    "Whether you will need to pay turns on more than the watermark. The terms of service (effective 17 November 2025) say you will use the Services \"for your own internal, personal, non-commercial use,\" and license commercial use only \"if you are a user of Paid Services\" — so clips for a business, a client or a channel you earn from sit on the paid side. Paid plans currently start around $15/month, with the tier most people mean at roughly $29/month, about half that paid annually.",
  ],

  security: [
    {
      kind: "text",
      text: "What matters here is the size of what you hand over. To find a 40-second moment, OpusClip takes the whole file — so everyone who appears or speaks anywhere in that recording is uploaded, not just the part you wanted. Worth a thought before you feed it a client call or a private workshop.",
    },
    {
      kind: "list",
      label: "What the vendor's own documents do and don't say",
      items: [
        "The privacy policy (effective 17 November 2025) says data is kept \"for as long as necessary to provide you with our Services,\" and gives no retention period for the video files themselves.",
        "It does not say, either way, whether uploaded video is used to train OpusClip's AI. It lists \"testing, research, internal analytics and product development\" as a purpose, which is not the same as an answer.",
        "The one explicit opt-out is regional: EU/EEA users are told \"you are free to opt out of any use of your personal data for our AI research and model-development activities,\" by email with the subject line \"AI R&D – Opt-Out.\" No equivalent is described for anyone else.",
      ],
    },
    {
      kind: "text",
      text: "One mismatch is worth naming rather than smoothing over. OpusClip's marketing and help pages describe the free plan as an ordinary creator product and never mention the non-commercial limit that sits in the terms of service. Where a binding document and a friendly one disagree, the binding one governs.",
    },
  ],

  triad: {
    bestAt: [
      "Turning one long talking-head recording — podcast, webinar, livestream, interview — into a batch of short clips in one pass",
      "Adding animated captions automatically, the part that takes longest by hand",
      "Recropping a wide recording into a tall, phone-shaped one, keeping the speaker in frame",
    ],
    okayAt: [
      "Deciding what is actually interesting. The picks are plausible rather than curated; plan on keeping two or three out of ten.",
      "Precise trims. This is a clipping tool with editing attached, not an editor.",
      "Short source videos. It hunts highlights inside long footage, so a three-minute upload gives it little to choose between.",
    ],
    avoid: [
      "Clipping and posting footage you did not make. OpusClip's terms make **you** warrant you have \"all rights necessary\" to what you upload and that it infringes nobody's copyright. The tool will process it; that is not permission.",
      "Anything where a mis-heard word would matter. Captions are generated from speech and baked into the picture, so a mangled name or figure means re-exporting and re-uploading, not a quiet edit.",
    ],
  },

  starterActions: [
    {
      title: "Run one stretch first, with the box empty",
      whatItDoes:
        "Upload a video you already have, type nothing into the prompt box, and let OpusClip pick on its own.",
      whyHere:
        "OpusClip's help centre describes a **Processing timeframe** slider as the way to cut what an upload costs you — you point it at one section of a long file rather than the whole thing, which makes a first test cheap. It names the slider but does not say which plans have it, so check yours once you are signed in.",
      tweak: "Pick something with one person talking clearly.",
    },
    {
      title: "Steer it with words that are actually spoken",
      prompt: "biggest mistake, what I'd do differently, nobody tells you, the one thing",
      whyHere:
        "The free plan clips by speech alone, and OpusClip's help centre is specific about what that means: keywords work when \"the keywords are present in the speech or transcript.\" On its own account, typing `funny` returns nothing useful unless somebody says the word \"funny.\"",
      tweak:
        "Listen for the phrases you already repeat. You are searching a transcript, not describing a mood.",
    },
    {
      title: "Describe the moment instead of the words",
      prompt:
        "Find the moments where I answer a question from the audience, and include my reaction right afterwards. Keep the laugh if there is one.",
      whyHere:
        "OpusClip's prompts manual says a strong prompt names a subject, a visible action, an emotional tone and a sound — this one names all four, the shape of its own worked example (\"Clip my exciting reactions to tasting shawarma\"). The same manual lists non-English text among the things that make a **prompt** (the message you type) fail, so write it in English even when the video is in another supported language.",
      tweak:
        "This free-text style of clipping is the model OpusClip calls ClipAnything, and its pricing comparison puts it above the free plan — the free tier reads speech only. Two reads of that comparison table disagreed about whether it starts at the $15 tier or the $29 one, so check before you buy on the strength of it. The 7-day trial is the way to try it without paying.",
    },
    {
      title: "Ask again, and ask for a compilation",
      prompt: "Compile every time the guest mentions [their company] into one clip.",
      whyHere:
        "OpusClip's help centre says the prompt box reappears at the top of the results page and that \"you can reprompt as many times as you like to get more clips.\" The prompts manual also lists compilations as their own category of request — \"Compile all Man City's scoring\" is its example — returning one clip assembled from scattered points in the recording. The docs describe that rather than demonstrate it, so treat it as their claim.",
      tweak:
        "The help centre does not say whether re-prompting a video you already uploaded spends more of your monthly allowance. Watch your balance the first time, and assume it might until you have seen otherwise.",
    },
  ],

  pitfalls: [
    "**A bad batch still costs you the minutes.** There is a refund path, but the help centre limits it to Pro accounts, within 14 days, and only if you \"haven't downloaded any clips yet\" — free and trial users are told outright they cannot reprocess a video for a credit refund.",
    "**Free clips stop being exportable after three days.** The pricing page puts free-plan storage at \"Expires after 3 days\" and the export window at the same limit. Download what you want the day you make it.",
    "**The Virality Score is a prediction, not a measurement.** OpusClip scores each clip 0 to 99 on four things it names — Hook, Flow, Value and Trend — all judged before a single human has watched it. A 92 is not evidence it will outperform a 71.",
    "**The marketing page is not the plan page.** The homepage advertises imports from Google Drive, Vimeo, Zoom, Twitch and more; the help centre's own plan breakdown gives the free plan YouTube and local files. Both are OpusClip pages and they do not match — trust the plan comparison table.",
    "**Everything you make will look like everything else you make.** The free plan includes one brand template and no custom fonts, so your clips carry the same default caption look as every other OpusClip clip unless you restyle each by hand.",
  ],

  whereToNext: [
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
    { label: "Voice and speech", categorySlug: "voice-speech" },
    { label: "Sales, marketing and SEO AI", categorySlug: "sales-marketing-seo-ai" },
  ],
};
