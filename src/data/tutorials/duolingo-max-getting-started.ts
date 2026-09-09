import type { PlatformTutorialData } from "./types";

export const duolingoMaxTutorial: PlatformTutorialData = {
  slug: "duolingo-max-getting-started",
  platformSlug: "duolingo-max",
  title: "Getting Started with Duolingo Max",
  tagline:
    "The top Duolingo tier, what it actually adds, and how to check your language is covered.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You learn in the phone app the same way as always, tapping through short lessons along a path. Once you subscribe, extra buttons appear inside those lessons and on the practice screen. Tap one and you either type a short conversation with a cartoon character, or speak out loud to one and hear it answer back.",

  whatItIs: [
    "Duolingo Max is the top of three tiers: the free app, then Super, then Max.",
    "Max includes everything Super does — no ads, unlimited hearts (a benefit Duolingo's help centre says may be part of a test it is running, so what you see may differ), personalised review of your mistakes — and adds two AI conversation features on top: Roleplay, a typed run through a set scenario with one of the app's characters, and Video Call, where you speak to a character called Lily and she answers in the language you're learning.",
    "It unlocks no extra lessons and no extra courses. Duolingo says it offers \"the same lesson content to all users\", so what the money buys is practice modes, not curriculum.",
    "Some things that used to be Max-only are now free: **Explain My Answer**, the in-lesson grammar explanation, went free for every learner in January 2026, so older reviews and comparison articles overstate what the tier includes.",
  ],

  beforeYouStart: [
    "**The AI features cover a much shorter list of languages than the app does.** Duolingo's help centre currently lists Video Call for learners of English, French, Spanish, Italian, German and Portuguese, and Roleplay for English speakers learning French, Spanish, German, Portuguese or Italian — plus English courses for Spanish, Portuguese, Japanese, German and French speakers. Duolingo states it plainly: \"Some AI-powered features are not available across all courses.\" If you're learning Welsh, Hindi or Navajo, you can pay for Max and receive only the Super benefits.",
    "Max is a phone purchase. Duolingo's help centre says Max \"cannot be purchased on web\" and that \"the features are only available on the mobile app\", and that a subscription bought on the web cannot currently be upgraded to Max at all. If you do your learning on a laptop, this tier does nothing for you.",
    "Duolingo doesn't publish the price anywhere public — you see it in the app's Shop, billed through Apple or Google, and it varies by country and by how long a plan you buy. It sits above Super, which is the comparison that matters. It can also be bought as a family plan shared with five other people, and Duolingo's terms refer to promotional codes for extended free trials of Super or Max, so a trial may be offered to you; the length isn't published.",
    "Beginner-level calls with a second character — a bear called Falstaff, who asks you questions and suggests phrases rather than free-forming a conversation — were announced in January 2026 as iOS-only, with the rollout said to continue through 2026. On Android your options may currently be narrower than the marketing suggests.",
  ],

  security: [
    {
      kind: "text",
      text: "Duolingo's privacy policy, last revised 26 May 2026, is unusually specific about the voice features, and it's worth reading the AI section before your first call. It says that when you use Video Call or other AI features, \"the text and audio you submit may be shared with AI vendors such as OpenAI and Google\", that those vendors \"are not permitted to use any personal information for their own purposes\", and that Duolingo itself \"may generate, record, and store audio recordings or transcripts\" and use them \"for product improvement and personalization purposes, including training and running Duolingo's own artificial intelligence models\" (the **model** is the AI \"brain\" doing the actual thinking).",
    },
    {
      kind: "list",
      label: "Three lines from that policy worth acting on",
      items: [
        "Its own instruction: \"Please do not submit any personal, sensitive, or confidential information when using Video Call or other AI features.\" Speaking is looser than typing — it's easy to say your employer's name or your street mid-sentence.",
        "There is an opt-out. The policy says you \"may also choose not to share your audio with us for product improvement purposes within the app Settings\", and taking it doesn't stop the calls working.",
        "It commits that \"we will not use your audio recordings to develop any voice cloning technology.\"",
      ],
    },
    {
      kind: "text",
      text: "Duolingo is rated for all ages and a large share of its users are children, so the policy runs a separate regime for Child Users — under 13 in the US, or the local age of digital consent elsewhere. They register with a username rather than an email, get non-personalised ads and no third-party analytics, and, the line that matters here, their \"speech data is not shared with Duolingo for product improvement purposes.\" Child Users can join a paid family plan. The age on the account is the switch that turns all of that on, so it's worth getting right before a child starts making calls.",
    },
    {
      kind: "text",
      text: "One setting unrelated to Max but easy to miss: Duolingo profiles are public by default and can be found by name, username, email address or phone number. You can set yours to private in Settings.",
    },
  ],

  triad: {
    bestAt: [
      "Speaking practice with nobody else in the room — you can stall, restart and be bad at it at no social cost",
      "Building the habit of assembling a sentence under mild time pressure, which tapping and matching exercises never ask of you",
      "Rehearsing one narrow, predictable situation before you have to live it — Roleplay's scenarios are errands like ordering a coffee",
    ],
    okayAt: [
      "Measurable speaking gains — Duolingo's own research lab reported in March 2026 that learners who called at least twice a day improved more on speaking measures than those doing lessons alone. It's the company studying its own product, and it hasn't published sample sizes",
      "Genuinely open conversation — Lily adjusts to your level and won't penalise mistakes, but she steers toward the vocabulary your course has already taught",
      "Listening comprehension — the speech is clear and paced for a learner, which is the opposite of a real conversation in a noisy café",
    ],
    avoid: [
      "Getting past intermediate. Duolingo said in April 2026 that nine of its most popular courses now reach B2 on the CEFR scale — the European yardstick for language level, where B2 means \"independent user\", not fluent. That is the ceiling of the courses, and nothing in Max raises it.",
      "Fixing your pronunciation. The calls deliberately don't penalise mistakes, which is exactly what stops them functioning as a pronunciation drill.",
      "Reading and writing. Both of the features Max adds are conversation, and the tier contributes nothing to either.",
    ],
  },

  starterActions: [
    {
      title: "Open with a real errand, not small talk",
      whatItDoes:
        "Say or type this as your opening **prompt** — the message you give the AI.",
      prompt:
        "I need to explain to a pharmacist that I have a headache and ask what I can take without a prescription. Let's practise that. You be the pharmacist, and start.",
      whyHere:
        "Video Call is unscripted — Lily follows whatever you open with — so your first sentence is the only steering the feature gives you, and spending it on \"how are you\" spends the whole call.",
      tweak:
        "Swap in the scene you're genuinely nervous about: a landlord, a doctor's receptionist, a border guard.",
    },
    {
      title: "Use the escape hatch on purpose, in the language",
      prompt: "Can you say that again more slowly?",
      whyHere:
        "Duolingo's own description of the feature says you can ask Lily to repeat or slow down, so the recovery move is built into the design rather than something you improvise mid-call.",
      tweak: "\"What does that word mean?\" behaves the same way.",
    },
    {
      title: "Run the same Roleplay scenario twice in one sitting",
      whatItDoes:
        "Play a scenario through, then immediately restart it and answer differently.",
      whyHere:
        "Roleplay scenarios are fixed and written by Duolingo's curriculum staff, so a second run is a controlled comparison — you hear precisely what you fixed, which the unscripted calls can never give you.",
      tweak: "On the second pass, try to say one thing the scenario didn't ask for.",
    },
    {
      title: "Read the transcript for the sentence you gave up on",
      whatItDoes:
        "Duolingo's product posts describe a transcript and a post-call review after a call ends; if yours shows one, read it looking for the moment you switched to English or trailed off.",
      whyHere:
        "That transcript is the only written record the app makes of your own spoken mistakes — every other exercise in Duolingo only ever shows you Duolingo's sentences.",
    },
    {
      title: "Check your own course before you pay",
      whatItDoes:
        "Open the practice screen — the dumbbell icon — in the app on your phone. Duolingo's help centre says that's where free learners find the \"Unlock with Max\" button and where the Roleplay and Video Call entry points live.",
      whyHere:
        "Because the two features cover different course lists, the app on your account is the only reliable answer for your specific language pairing — Duolingo's public pages list languages, not course combinations.",
    },
  ],

  pitfalls: [
    "The streak is an engagement mechanic, not a measure of learning, and Max doesn't change that. You can hold a 400-day run of one-minute lessons and still not manage the conversation you're paying to practise.",
    "Course content is increasingly AI-generated. Duolingo announced in April 2025 that it would become \"AI-first\" and phase out contractors for work AI can do; the announcement drew heavy public backlash, and the CEO later softened parts of it — Fortune reported in April 2026 that he had backed away from judging employees on their AI use. The practical consequence for a learner is small but real: an odd sentence or translation in newer content is worth checking rather than trusting.",
    "Lily won't mishear your accent because she's tired, won't change the subject, and has no queue behind her — so the calls are the warm-up for a human conversation, not the substitute for one.",
    "You manage the subscription wherever you bought it. Duolingo's help centre says the platform you first subscribe on is where the subscription lives, and its terms say payments are non-refundable and that Apple or Google handle refunds for store purchases — so cancelling means going into the App Store or Play Store, not the Duolingo website. Subscriptions renew automatically until you do.",
    "The calls are short by design. Duolingo has said conversations run about a minute early in a course and stretch to a few minutes as your level rises. It's a daily drill, not a lesson you can settle into, so plan for it as five minutes a day rather than an evening's study.",
  ],

  whereToNext: [
    { label: "More education and learning tools", categorySlug: "education-learning-ai" },
    { label: "Voice and speech AI", categorySlug: "voice-speech" },
    { label: "AI chat assistants", categorySlug: "text-conversational-ai" },
  ],
};
