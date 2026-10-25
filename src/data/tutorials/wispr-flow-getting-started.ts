import type { PlatformTutorialData } from "./types";

export const wisprFlowTutorial: PlatformTutorialData = {
  slug: "wispr-flow-getting-started",
  platformSlug: "wispr-flow",
  title: "Getting Started with Wispr Flow",
  tagline:
    "Hold a key, talk, let go — Wispr Flow types what you said, cleaned up, into whatever app your cursor is in.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://wisprflow.ai/whats-new",
  accessTier: "FREE",

  howItWorks:
    "You install Flow, then hold a shortcut key and speak. When you let go, your audio goes to Wispr's servers, is turned into text, tidied up — filler words removed, punctuation added — and pasted wherever your cursor is: an email, a chat box, a document. It needs an internet connection; transcription happens in the cloud.",

  whatItIs: [
    "Wispr Flow is dictation that works across your whole computer or phone rather than inside one app. Its help centre describes it as working in any app with a text box. You hold a key, speak naturally, and release; the cleaned-up text appears where you were typing.",
    "The cleanup is the point. Flow's **Smart Formatting**, on by default, removes filler words and fixes grammar, punctuation and capitalisation. It also understands spoken corrections — say \"coffee at 2, actually 3\" and Wispr's docs say you get \"coffee at 3\". Saying \"first… second…\" turns into a list. It won't fix a word it misheard, which is what the personal **dictionary** is for.",
    "Beyond plain dictation there are **snippets** (say a short trigger phrase and Flow inserts saved text, such as your email signature), **styles** that make your writing more formal or casual depending on the kind of app, and **Command Mode**, which edits selected text by voice — for example \"make this shorter\". Wispr's docs say Command Mode needs a Pro plan or an active trial.",
    "Flow runs on Mac (macOS 12 or later), Windows 10 and 11 (not Windows on ARM), iPhone (iOS 18.3 or later) and Android 13 or newer. iPad, Linux and Chromebooks are not supported. Wispr says it handles more than 100 languages, one language per dictation.",
  ],

  beforeYouStart: [
    "**The free plan is a weekly word allowance.** Wispr's plans page lists a free plan with a weekly word cap on Mac and Windows. Phones get a smaller allowance, and the docs say individual accounts may differ.",
    "**Pro removes the limit.** Pro is priced per user, costs less per month if you pay for the year, and Wispr's pricing page shows prices in your own currency; current prices are on its Launchpad page. Wispr's docs say new accounts get a 14-day Pro trial, and its pricing page offers students and educators with an education email a discount on Pro.",
    "**Check your setup is supported.** Remote desktops, virtual machines and Windows on ARM laptops are not supported, and on a Mac you will need to grant both Microphone and Accessibility permissions so Flow can paste text into other apps.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download only from wisprflow.ai, or from the Apple App Store or Google Play. Wispr's help centre warns about fake Android apps impersonating Wispr Flow — on Android, install only the listing from Google Play.",
    body: [
      "**Expect some powerful permissions.** On a Mac, Flow asks for Microphone and Accessibility; on Android it needs Accessibility (to insert text) and permission to display over other apps; on iPhone it works as a keyboard with \"Allow Full Access\" turned on. These are how it types into other apps, so only grant them to the genuine app.",
      "**Run the built-in practice.** Setup includes a microphone test, your shortcut and your languages. Do the mic test with the microphone you will really use — Wispr's docs say Bluetooth and AirPods mics often perform worse than a built-in or wired one.",
      "**Confirm it works.** Open any text box, hold the shortcut (Fn on a Mac, Ctrl+Win on Windows by default), say a sentence and let go. Text appearing where your cursor was means you're set up.",
    ],
    vendorDocsUrl: "https://docs.wisprflow.ai/articles/3152211871-setup-guide",
  },

  security: [
    {
      kind: "text",
      text: "Everything you dictate is sent to Wispr's servers to be transcribed — there is no on-device mode. That matters because Flow is designed to be used everywhere, including in emails and messages you would not normally share.",
    },
    {
      kind: "list",
      label: "Defaults to review in Settings → Data and Privacy:",
      items: [
        "**Model training is on by default** on Free and Pro. Wispr's security FAQ says the \"Improve the model for everyone\" setting can be turned off; it was previously called Privacy Mode. Even with it off, some metadata (such as which app you were in and word counts) is still sent.",
        "**Cloud storage is on by default.** A separate setting stores your transcripts, audio and history on Wispr's servers. Turn it off if you don't want a history kept there.",
        "**Context awareness is on by default.** To format text to suit the app, Flow reads the app name and website, nearby on-screen text and the text around your cursor. Wispr says it doesn't take screenshots and skips banking and financial apps and standard password fields — but custom or web-based password fields may still be read like normal text. On iPhone there is no switch for it.",
      ],
    },
    {
      kind: "text",
      text: "Wispr says it holds SOC 2 Type II and ISO 27001 certifications for dictation and offers a click-through HIPAA agreement in settings, but its own docs suggest confirming with support before using it for health information. Until you have, don't dictate patient, client or financial details.",
    },
  ],

  triad: {
    bestAt: [
      "Writing emails, messages and first drafts several times faster than typing, in any app.",
      "Talking the way you normally do — ums, restarts and \"actually\" corrections — and still getting clean text.",
      "Repeated text, via snippets, and names or jargon it learns through the dictionary.",
    ],
    okayAt: [
      "Mixing languages. It handles one language per dictation well; switching mid-sentence is less reliable, per Wispr's own limitations page.",
      "Very long dictations. Sessions run up to 20 minutes, and a dropped connection can leave a long one incomplete.",
    ],
    avoid: [
      "Dictating sensitive information before you have reviewed the privacy defaults.",
      "Offline use — no internet, no dictation.",
    ],
  },

  starterActions: [
    {
      title: "Hold, don't tap",
      whatItDoes:
        "In any text box, press and hold your shortcut (Fn on Mac, Ctrl+Win on Windows), say a two-sentence message, and release. For long thoughts, use hands-free mode instead: Fn+Space on Mac, Ctrl+Win+Space on Windows.",
      whyHere:
        "Wispr's docs say a press shorter than half a second is treated as a tap and cancelled. Getting the hold right first saves the most common early frustration.",
    },
    {
      title: "Talk like a human",
      whatItDoes:
        "Dictate \"Let's meet at 2, actually 3, and first bring the slides, second bring the budget\" and see what Flow types.",
      whyHere:
        "This shows the two features that make Flow different from basic dictation: spoken corrections are resolved and spoken lists become real lists, so you don't have to talk like a robot.",
    },
    {
      title: "Teach it your words",
      whatItDoes:
        "Open the Dictionary and add your own name, your company's name and two or three jargon words you use daily.",
      whyHere:
        "Smart Formatting won't fix a word it misheard. The dictionary is how you stop the same names coming out wrong every time.",
    },
    {
      title: "Make one snippet",
      whatItDoes:
        "Create a snippet with a short trigger phrase like \"my signature\" that inserts your full email sign-off.",
      whyHere:
        "Snippets work on every plan and every device. One you use daily pays back the setup time within a week.",
    },
    {
      title: "Edit by voice",
      whatItDoes:
        "On Pro or during your trial, turn on Command Mode under Settings → Experimental. Select a paragraph you wrote, hold Fn+Ctrl on Mac (Ctrl+Win+Alt on Windows) and say \"make this shorter and friendlier\".",
      whyHere:
        "Command Mode turns Flow from a dictation tool into an editor. Try it during the trial so you know whether it's worth paying for.",
    },
  ],

  pitfalls: [
    "**Text doesn't appear in some apps.** Flow pastes through your clipboard; if an app refuses, use paste-last-transcript (Cmd+Ctrl+V on Mac, Shift+Alt+Z on Windows).",
    "**Permissions can reset after updates.** Wispr's docs suggest re-checking Mac permissions if dictation stops working after an update.",
    "**Hitting the free weekly limit mid-week.** Heavy use slows down past the allowance and then stops; the trial is the time to judge whether you need Pro.",
    "**Assuming the cleanup is proofreading.** It fixes grammar and filler words, not misheard words — read before you send.",
  ],

  whereToNext: [
    { label: "More voice & speech tools", categorySlug: "voice-speech" },
    { label: "Meeting note-takers", categorySlug: "meetings-notes" },
    { label: "Chat assistants to polish what you dictate", categorySlug: "text-conversational-ai" },
  ],
};
