import type { PlatformTutorialData } from "./types";

export const speakLanguageAiTutorial: PlatformTutorialData = {
  slug: "speak-language-ai-getting-started",
  platformSlug: "speak-language-ai",
  title: "Getting Started with Speak",
  tagline:
    "Speaking practice in a new language with an AI that listens to you and scores what you said — phone only, and paid after a seven-day trial.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.speak.com/blog",
  accessTier: "FREE",

  howItWorks:
    "You open the app on your phone, it shows a short line and plays it aloud, and you say it back into the microphone. It scores how close you got and moves you on.",

  whatItIs: [
    "Speak is a language-learning app built around one thing: getting words out of your mouth.",
    "It's made by Speakeasy Labs. OpenAI's models (a **model** is the AI \"brain\" that does the actual thinking) power the conversation side, and on 10 September 2026 Speak announced a limited rollout of live tutor conversations built on OpenAI's newest voice model.",
    "It teaches English to speakers of fifteen languages — Korean, Japanese, Traditional and Simplified Chinese, Spanish, French, German, Italian, Portuguese, Polish, Vietnamese, Hindi, Thai, Turkish and Indonesian — and teaches Spanish, French, Japanese, Korean, Italian and Simplified Chinese to English speakers. Speak's help centre, updated 3 July 2026, states the catch plainly: non-English courses exist only if your native language is English.",
    "Why pick it over Duolingo, which is free: Duolingo lets you go months tapping multiple-choice answers without ever saying a full sentence, and Speak doesn't.",
  ],

  beforeYouStart: [
    "There is no free tier. Speak's own site says the seven-day free trial is followed by a required paid subscription, and its help centre (updated 27 May 2026) says you add a payment method to start the trial and must cancel at least a day before it ends or you're charged automatically. In the US App Store the plans are currently listed at around $17.99 a month or $83.99 a year for Premium, and around $39.99 a month or $164.99 a year for Premium Plus — Speak says prices vary by region and promotion and that the accurate figure is the one shown in the app, so treat those as a band. Refunds follow the store: purchases made through the Apple App Store can only be refunded by Apple, while for Google Play and purchases made on Speak's own site, Speak offers a full refund within 7 days and none after 30.",
    "Speak's help centre says the app runs on iOS 16 or later and Android 8 or later, on phones and tablets, and that Speak is \"not available on desktop (PC)\". You can sign up and pay on the website, but the lessons happen on the handset.",
    "You'll be talking out loud for most of a session, so decide where you'll do that before you start paying for days. There are quieter fallbacks — a typing mode inside the free-form conversations, a listening-only review mode, and short quiz-style lessons — but the quiet modes are a way to keep a streak alive, not a way to use the app.",
    "Premium is the tier to start on. Per Speak's help centre both plans include the conversation practice, the tutor and the scripted course; Premium Plus adds a personalized study plan, targeting of your frequent mistakes, and removes daily caps on custom lessons. Speak's own two pages disagree about what a Premium subscriber gets from the \"Made For You\" custom-lesson screen — its plan comparison article says up to three a day, its feature article says that screen is Premium Plus only — so check which is true during the trial rather than after.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Install the app published by Speakeasy Labs, and get to it from speak.com's own App Store and Google Play links rather than by searching a store. Check the publisher name on the listing before you tap install: the App Store also carries a different app called \"Speak AI - Language Learning\", published by Meta Innovation Limited, and a separate company at speakai.co sells a meeting-transcription product called \"Speak Ai\". Neither is this.",
    body: [
      "Expect the app to ask for your microphone on first run, and say yes. Speak's own troubleshooting page for broken voice recognition is almost entirely about microphone permissions — on iOS, the microphone toggle and Screen Time restrictions on Microphone or Speech Recognition; on Android, permissions set to Deny, and Bixby Voice on Samsung devices.",
      "Your \"it worked\" checkpoint is finishing one lesson and watching it mark a line you said out loud. If it scores everything as silence, that's the permission, not your accent.",
    ],
    vendorDocsUrl:
      "https://help.speak.com/en/articles/9334794-what-devices-and-operating-systems-does-the-speak-app-support",
  },

  security: [
    {
      kind: "text",
      text: "Speak's product is your voice, so the recording is the data. Its privacy notice, last updated 06/05/2026, says the app requests your microphone and uses that audio not only to score your pronunciation but to \"develop, create, improve, optimize, maintain, and otherwise enhance its automatic speech recognition and voice transcription technology\". Its European disclosure names OpenAI and Microsoft among the recipients of audio information. We could not find an opt-out for that improvement use anywhere in the notice.",
    },
    {
      kind: "list",
      label: "Worth knowing before you record",
      items: [
        "The scripted lessons are everyday phrases, so most sessions contain nothing about you. The part that changes is the free-form conversations, where you improvise about your own job, family, health or travel.",
        "Speak's terms of service give it a \"fully paid, royalty-free, transferable, perpetual, irrevocable, non-exclusive, and worldwide\" licence to your content, and name \"your name, voice, and likeness\" in it.",
        "We found no self-serve deletion route in the privacy notice. It says only that data is deleted or stripped of what links it to you once keeping it is \"no longer reasonably necessary\". If you want a specific recording gone, expect to email support.",
      ],
    },
    {
      kind: "text",
      text: "The sensible habit is a boring one: practice ordering coffee, not rehearsing what you'll tell your doctor.",
    },
  ],

  triad: {
    bestAt: [
      "Making you produce whole sentences out loud, repeatedly, with nobody around to hear you get them wrong",
      "Short sessions — the unit of work is a handful of spoken lines",
      "Pronunciation feedback the moment you've spoken — though Speak's help centre says its dedicated Pronunciation Coach is only for people learning English, while the plan table on speak.com lists the same feature with no such restriction, so the two vendor pages don't agree",
    ],
    okayAt: [
      "Grammar. The tutor will answer grammar questions, but the app's unit of progress is a spoken line, not a rule you've understood.",
      "Reading and writing, which barely feature — expect to end up able to say more than you can spell.",
      "Anything outside the language pairings listed above. There's no workaround, because the restriction is on which course exists at all, not on a setting.",
    ],
    avoid: [
      "Assuming a feature you read about reaches your language. Speak's help centre describes its longer Tutor Lessons as currently available to English speakers learning Japanese, Korean and Italian, and calls the live tutor conversations a limited rollout for English and Spanish learners.",
      "Treating the score as a verdict on your sentence. It measures how close your sounds landed to a target line — which is not the same as telling you that what you built was something a person would actually say.",
    ],
  },

  starterActions: [
    {
      title: "Finish one full scripted lesson before you judge anything",
      whatItDoes:
        "The core loop scores you line by line: it marks the words it thinks you got and the ones it thinks you missed, and you go again until it's satisfied.",
      whyHere:
        "Duolingo's speaking exercises are optional and skippable; here the score is the lesson.",
      tweak:
        "If it keeps failing you on one word, say that word on its own rather than repeating the whole line.",
    },
    {
      title: "Set up a roleplay for a conversation you're actually dreading",
      whatItDoes:
        "In the free-form conversation section you pick a scenario and talk your way through it with a character that answers back and offers hints and corrections as you go. Speak's help centre describes a \"Create Your Own\" option where you specify a scenario, but the article never shows that screen, so this is the documentation's description rather than something we've seen working.",
      whyHere:
        "You could get a roughly similar conversation out of ChatGPT's voice mode for nothing. What ChatGPT won't do is run it at two deliberately different speeds: Speak's help centre says its immersive version listens continuously and lets you cut in mid-sentence like a real conversation, while its chat version stays strictly turn-based.",
      tweak:
        "Start with something that has a fixed script in real life — a pharmacy counter, a check-in desk — before you try open small talk.",
    },
    {
      title: "Keep the conversation alive when you can't say it out loud",
      prompt: "Sorry, I didn't catch that. Could you say it again more slowly?",
      whyHere:
        "This is the one place in Speak you type rather than speak: its help centre's own steps say that in Free Talk you tap the keyboard icon to switch to Typing Mode and type your responses instead of speaking. A repair phrase is the right thing to put in that box.",
      tweak:
        "Type it once, then say it out loud the next three times you need it.",
    },
    {
      title: "Ask the tutor why you were marked wrong",
      whatItDoes:
        "Speak Tutor is the app's general-purpose helper: its help centre says you can ask it about grammar, vocabulary or pronunciation, run conversation practice, play word games, and ask it to build you a speaking lesson on a topic you name. It lives at what the help centre calls a chat entry point at the bottom of the Home screen and the Practice tab — whether you type your question there or speak it isn't shown in the documentation.",
      whyHere:
        "A lesson score tells you that you missed a word, never why. The tutor is the only part of Speak that answers \"why\".",
      tweak:
        "Ask about the sound, not the rule. \"Why didn't it hear the ending of this word?\" gets you further than \"explain the past tense.\"",
    },
    {
      title: "Spend the trial week testing the method, not the app",
      whatItDoes:
        "Speak's help centre says the seven-day trial gives you full access to everything in the plan you picked. So aim it at the hardest part — the free-form conversations — rather than the scripted lessons.",
      whyHere:
        "Seven days is genuinely enough to learn whether being made to talk actually works on you.",
      tweak:
        "Do it on consecutive days — what you're testing is whether you'll still do it on day four.",
    },
  ],

  pitfalls: [
    "Installing it for a child on the strength of the store rating. The App Store rates the app 13+ and Google Play rates it 3+, but Speak's terms of service say use of the service by anyone who is a minor — \"under the age of 18 in most jurisdictions\" — is \"strictly prohibited\" unless a parent or legal guardian supervises it and accepts the terms on the child's behalf. The terms are the binding document; the store rating isn't.",
    "Cancelling a day late and expecting the money back. Speak's help centre is explicit that cancelling stops the next renewal and does not undo one that has already gone through.",
    "Pausing to think in the middle of a sentence. Speak describes its newest live tutor conversations as listening continuously for when you pause, finish, or need help mid-answer — which means a long hunt for a word can be read as your turn ending.",
    "Counting on offline practice. Speak's own fix-list for broken voice recognition includes switching between Wi-Fi and mobile data, which points to the listening happening on its servers rather than on your handset. We found no vendor statement either way about using lessons with no connection, so don't buy it for the flight.",
    "Mistaking the certificate for proof of level. Speak will issue an \"enrollment certificate\" on request, but per its help centre it certifies that you bought a Premium membership and are using the app — not that you reached any standard.",
  ],

  whereToNext: [
    { label: "Voice & Speech", categorySlug: "voice-speech" },
    { label: "Education & Learning AI", categorySlug: "education-learning-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
