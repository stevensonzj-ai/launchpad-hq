import type { PlatformTutorialData } from "./types";

export const captionsTutorial: PlatformTutorialData = {
  slug: "captions-getting-started",
  platformSlug: "captions",
  title: "Getting Started with Captions",
  tagline: "Turn a phone video of yourself talking into a captioned, edited clip ready to post.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  changelogUrl: "https://captions.ai/help/whats-new",
  accessTier: "FREE",

  howItWorks:
    "You open the app on your phone or in a web browser, record or upload a clip of yourself talking, and Captions writes your words onto the screen as you speak them. You then tap a tool, or type an instruction such as \"cut the pauses\", watch the video change, fix anything it got wrong, and export the finished file.",

  whatItIs: [
    "Captions is a video editor built around one kind of footage: a person talking to the camera. It listens to the clip, puts the words on screen, and can cut out the pauses and \"ums\", tidy the sound, translate the captions and add music and extra footage around you.",
    "It is made for the phone first. The iPhone app gets the full toolset, there is a lighter Android app called Captions Lite, and on a computer you use it in a web browser.",
    "Its other half is AI-generated people. You can pick a ready-made avatar (a computer-generated presenter who speaks a script you type), describe one in words, or build an \"AI twin\" of yourself from a short recording, then have it deliver lines you never filmed.",
    "The company behind the app announced in September 2025 that it was renaming itself Mirage. The app kept the Captions name, but its terms, privacy policy and support email now say Mirage — that is the same company, not a different product.",
  ],

  beforeYouStart: [
    "You need to be 18 or over: Captions' terms bar anyone younger from using it beyond viewing the website. Sign up at captions.ai or in the iPhone app with Google, Apple, an email address or a phone number, and always sign back in the same way — the help centre warns that using a different sign-in method creates a separate, empty account.",
    "There is a free plan, but it is narrow: one caption template and no AI credits (the platform's unit of spend — each thing you make costs some). That is enough to caption a clip. Anything the AI generates or edits for you — the chat editor, AI Edit, avatars, an AI twin, generated music or images — draws on credits, so in practice it means paying. The first paid plan, Max, is $24.99 a month with 500 credits; Frontier is $69.99 a month with 1,400, and larger tiers go to $279.99 for 5,600. Captions says these prices reflect its iPhone plans.",
    "Credits are used up when the AI generates something, not when you export, so a draft you throw away still costs what it cost. You can check what you have left under Account Settings, and on iPhone a credits history shows where each one went.",
    "Some features — the built-in camera with a scrolling script to read from, for example — are documented as iPhone-only, and Captions' help centre says the web version is in English only.",
  ],

  security: [
    { kind: 'text', text: "Captions' privacy section is mostly about your face and voice, because that is what you feed it. Its privacy policy (Mirage's, effective 10 November 2025) says it uses what it collects to \"train our artificial intelligence/machine learning models\", that it may generate information from your face or voice for some features, and that it may disclose information to third parties \"for their own business and commercial purposes, including … training their algorithms.\" Its pricing page lists \"Training data exclusion\" as a feature of the Enterprise plan. The policy we read does not describe a way for an ordinary account to switch training off." },
    { kind: 'list', label: 'What the terms say about your face and voice (Captions Terms, effective 4 September 2025)', items: [
      "You own what you upload and what you make, but you give Mirage a licence to store, change and use both \"to improve the Services, and to develop new services and products\". That licence continues after you leave.",
      "The one specific promise is about your voice: Mirage \"will not commercialize your voice on a standalone basis without your written permission.\" The terms make no matching promise about your face.",
      "You must have the written consent of every identifiable person in what you upload to use their name, likeness or voice. An AI twin of a friend or partner needs their written OK, not just a nod.",
      "The usage policy (effective 4 September 2025) forbids presenting AI-made content as made \"solely by a human\", impersonating anyone, and making anything that relates to or appears to represent people under 18.",
    ] },
    { kind: 'text', text: "Mirage's privacy policy says it deletes face and voice measurements once their purpose is served, or three years after your last interaction with it, whichever comes first, and that your information may be transferred to and stored in the United States." },
    { kind: 'text', text: "One contradiction to know about if you'll use it for business: the help centre says you \"retain full rights\" to generated videos, but the terms (section 3.1) bar \"making any commercial use of the Services including the Mirage Content\" without written consent \"except as authorized hereunder\". The terms are the binding document. If you plan to run paid ads with it, read that section yourself first." },
  ],

  triad: {
    bestAt: [
      "Captioning a talking-to-camera clip from your phone, with styling, and translating those captions into other languages.",
      "Cleaning up a casual recording: cutting pauses and filler words, removing background noise, and making your eyes look at the lens.",
      "Short vertical videos for TikTok, Reels and Shorts, where one person talks and the edit does the rest.",
    ],
    okayAt: [
      "Longer videos. On iPhone the manual editor stops at about 10 minutes and AI Edit at about 2, so it suits clips, not a full YouTube episode.",
      "Footage with more than one speaker. AI Edit's own guidance asks for a single person talking.",
      "Working on a computer. Captions' own feature table lists many tools as iPhone-only, so check that what you need is in the browser version before you subscribe for desktop work.",
    ],
    avoid: [
      "Anything featuring your children, or anyone who looks under 18 — the usage-policy ban in Security, which the app's marketing doesn't mention.",
      "Promoting a bar, a vape shop, a gun range, a dating service or anything involving gambling. The usage policy bars output containing alcohol, tobacco, nicotine, firearms, gambling, dating services and similar goods, so a local business in those trades can't use it for ads.",
    ],
  },

  starterActions: [
    {
      title: "Caption a clip you already have",
      whatItDoes:
        "Import a 30-to-60-second phone video of you talking, choose the language being spoken, and let Captions put the words on screen. Then tap any word it misheard and correct it.",
      whyHere:
        "With one caption template and no AI credits on the free plan, captioning and correcting a clip you already shot is the full free test before you spend anything. If the transcription is good on your voice and accent, the rest of the app is worth trying.",
      tweak: "Record in a quiet room and compare how much less you need to correct.",
    },
    {
      title: "Ask the chat editor for several changes at once",
      prompt:
        "Cut out the long pauses and the ums, add calm background music quietly under my voice, and make the captions bigger and yellow.",
      whyHere:
        "Captions charges the chat editor by the message and by each action it takes, so one message asking for three changes uses fewer credits than three separate messages. Its help centre also says you can keep refining with follow-ups like \"make it softer\" — each of those is a new message.",
      tweak: "Once it's done, reply with one follow-up, such as \"music a bit louder\", and look at your credit balance before and after.",
    },
    {
      title: "Let AI Edit cut a raw clip for you",
      whatItDoes:
        "Upload an untouched clip of one person talking, pick an editing style, and Captions cuts it, adds captions, music and extra footage, and hands it back for you to adjust.",
      whyHere:
        "Captions' instructions for AI Edit ask for footage under about three minutes that has not been edited — no trims, transitions or music. Tidying it up yourself first takes away what the tool works from.",
      tweak: "Run it twice on the same clip with two different styles and keep the one that fits how you talk.",
    },
    {
      title: "Describe an avatar before you make one of yourself",
      prompt:
        "A woman in her forties with short grey hair and a navy blazer, facing the camera and smiling slightly, standing in a bright kitchen with soft morning light, medium close-up.",
      whyHere:
        "Captions' avatar guide asks for \"one flowing scene description\" covering appearance, how the person faces the camera, and the setting and lighting, and says to match the avatar to the voice you'll use. Starting with a made-up person lets you see how avatars look and move before you decide whether to record your own face for an AI twin.",
      tweak: "Change one thing — the setting, or the age — and regenerate to see what moves.",
    },
    {
      title: "Read a script, then fix where you were looking",
      whatItDoes:
        "On iPhone, record with Captions' camera while your script scrolls on screen, then run Eye Contact so your gaze looks as if it is on the lens rather than on the words.",
      whyHere:
        "Captions puts a scrolling script and an eye-direction fix in the same app, so you can read your lines and still appear to be talking to the viewer.",
      tweak: "Record the same 20 seconds with and without the fix and watch them side by side.",
    },
  ],

  pitfalls: [
    "Logging out wipes your projects. Captions' help centre says signing out deletes every project and caption template stored on that device, and that clearing your browser cache does the same on the web. Its changelog reports project syncing since early 2026, but the warning is still up — export anything you want to keep before you log out or switch devices.",
    "Signing in a different way from last time. The second, free account it creates can make it look as though your subscription has vanished.",
    "Deleting the app, or even your account, does not cancel a subscription. Cancel where you paid — Apple's subscriptions page if you bought on iPhone, Captions' billing portal if you bought on the web — at least 24 hours before it renews. Monthly plans are non-refundable.",
    "Cancelling also forfeits your credits. Whatever you have left disappears at the end of the billing period, so use them before the date, not after.",
  ],

  whereToNext: [
    { label: 'Video creation & editing tools', categorySlug: 'video-creation-editing' },
    { label: 'Voice & speech tools', categorySlug: 'voice-speech' },
    { label: 'Image generators', categorySlug: 'image-generation-editing' },
  ],
};
