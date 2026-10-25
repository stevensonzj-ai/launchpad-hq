import type { PlatformTutorialData } from "./types";

export const speechifyTutorial: PlatformTutorialData = {
  slug: "speechify-getting-started",
  platformSlug: "speechify",
  title: "Getting Started with Speechify",
  tagline:
    "An app that reads web pages, documents and files out loud to you. The free version is basic, and the paid trial bills you automatically if you don't cancel in time.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open a web page, document or file in Speechify and press play. A computer-generated voice reads it aloud, and the words on screen are highlighted as they're spoken. You can slow it down or speed it up, change the voice, or (in the phone apps) tap any word to start reading again from there.",

  whatItIs: [
    "Speechify is a reading app that turns written text into speech: articles, PDFs, Word documents, ebooks, emails. You listen instead of reading, or listen and read along at the same time. It runs on iPhone and iPad, Android, Mac, Windows, the web, and as a Chrome or Edge browser extension (a small add-on to your web browser).",
    "Its founder, Cliff Weitzman, writes on Speechify's own About page that he is dyslexic and built the first version to get through his reading for college. The company lists \"individuals with reading challenges like dyslexia\" among its users, alongside students and professionals. Speechify's terms also say plainly that it is \"not a health care or education provider.\" It is a reading tool. It isn't a treatment or a learning programme.",
    "Since early 2026 Speechify has been pitching itself as a \"Voice AI Assistant\": it also turns your speech into text (it calls this Voice Typing), summarises pages, and answers questions about what you're reading. Speechify's pricing page lists those extras under the paid Premium plan. The free plan is listed as covering text-to-speech features only.",
    "Choose it over the free read-aloud button built into your browser or phone if you want the same reader, library and settings on every device you own. Whether that's worth paying for comes down to whether you can live with the free voices, which is the first thing to find out.",
  ],

  beforeYouStart: [
    "There's a free plan, and it's genuinely limited. Speechify's pricing page lists it as speeds up to 1.5x, 10 voices it describes as \"robotic sounding\", and text-to-speech features only. That's enough to find out whether listening works for you. Speechify's terms also say free access is \"provided at our sole discretion\" and is \"not guaranteed,\" so it could change.",
    "**The paid trial and the free plan are different things, and the trial bills you.** Speechify's Terms of Service (last updated 1 July 2025) say the free trial of Premium is \"currently three (3) days unless a different period is stated at sign-up.\" Unless you cancel before it ends, it \"automatically converts to a paid Subscription Plan\" and charges the payment method you gave at sign-up. After that it renews for the same length each time. If you only want the free plan, skip the \"Try for free\" offer on Premium. If you take the trial, set a reminder for the day before it ends.",
    "Premium is currently {{price:speechify:Premium}} on monthly billing, per Speechify's pricing page. The page also offers yearly billing it says will \"save 60%\" but doesn't show the yearly dollar price, so you'll only see it at checkout. If you buy through the iPhone or Android app, Apple or Google handles the subscription, and Speechify's terms say those sales are final.",
    "Refunds are narrow. The terms say fees for the current term \"will not be refunded, in whole or in part\" and there are no partial refunds. Speechify's separate refund policy covers charges made in error or through account takeover, and an unused yearly plan, only if you contact them within 7 days of the charge (the 7 days include any trial period). Cancelling stops the next charge. Speechify's help article says you keep Premium until the end of the period you've paid for.",
  ],

  security: [
    {
      kind: "text",
      text: "Speechify's privacy policy, updated 22 July 2026, says the text and documents you upload are 'transferred to, processed, and stored in the United States,' and that it uses information to 'improve the features, algorithms, and usability' of the service. The policy does not describe a way to opt out of that. It also says Speechify does not sell or rent your personal data.",
    },
    {
      kind: "list",
      label: "Before you load your first document:",
      items: [
        "Speechify's terms say what you upload 'is not considered to be confidential' and give Speechify an 'irrevocable, perpetual' licence to it that continues after you stop using the service. You still own your material. Even so, a contract, medical letter or someone else's private message is better read by a tool that keeps it on your device.",
        "To delete your account, the privacy policy says to use the Settings page and, if you pay, cancel your subscription first. You can also ask for a deletion or a copy of your data through a support ticket.",
        "If the account is a school's (Speechify for Education), the policy says your school administrator and parents may be able to see and delete it.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting through long reading you'd otherwise put off: articles, handouts, PDFs, with the text highlighted as it's read so you can follow along.",
      "Picking up where you left off on another device.",
      "Turning a web page into something you listen to on a walk or a commute, by pasting its link into the phone app.",
    ],
    okayAt: [
      "Sounding natural on the free plan, whose voices Speechify itself calls 'robotic sounding'.",
      "Being a writing or research assistant. The summaries, chat and Voice Typing are newer than the reader they're attached to.",
    ],
    avoid: [
      "Voicing anything you plan to publish or sell. Speechify's terms say its services, apart from its separate Voice Over Studio, 'are not intended for your commercial use.'",
      "Starting the Premium trial casually 'just to look': it turns into a paid plan by itself (see Before you start).",
    ],
  },

  starterActions: [
    {
      title: "Have a web page read to you in Chrome",
      whatItDoes:
        "Install the Speechify Chrome extension, open an article you've been meaning to read, click the Speechify icon next to the address bar, then click the blue play button. It reads from the top of the page.",
      whyHere:
        "The free voices are the ones Speechify's own pricing page calls 'robotic sounding', so the useful test is a full article, not a sentence: can you listen to these voices for ten minutes? If yes, the free plan may be all you need. If no, you've found the real reason to consider Premium before paying for it.",
      tweak: "Try two or three of the free voices on the same paragraph. They differ more than you'd expect.",
    },
    {
      title: "Save a page to your phone and jump back by tapping a word",
      whatItDoes:
        "Copy a web page's link, then in the Speechify phone app tap + (on iPhone choose 'Paste Website Link', on Android 'Web Link'), paste it, and open the new item in your library.",
      whyHere:
        "Speechify's help article says that once a page is in your library you can 'tap on any word to start reading from that spot', so a sentence you missed is one tap away instead of scrubbing back through audio. That's what makes it practical for reading you need to understand, not just get through.",
      tweak:
        "Use the read-along highlighting on the hardest paragraph: listen and read at the same time, then try listening alone, and see which works better for you.",
    },
    {
      title: "Load a document you actually have to read",
      whatItDoes:
        "Add a PDF, Word file or ebook (.doc, .docx, .pdf or .epub) to your Speechify library and play it, instead of a web page.",
      whyHere:
        "Speechify's founder describes the gap he built it for as textbooks, handouts, PDFs and emails that have no audiobook. A real document from your week, with page headers, footnotes and columns, tells you whether the reader copes with your material, which a clean demo article won't.",
      tweak:
        "If the file sits in Google Drive, Dropbox or OneDrive, check once you're signed in whether the app can open it from there, or save a copy to your device first.",
    },
    {
      title: "Premium only: ask about the page you're reading",
      prompt:
        "Summarise this page in five plain sentences, then tell me which part is hardest to understand and explain it more simply.",
      whyHere:
        "Speechify's pricing page lists 'AI Summaries & Chats' and a Voice AI Assistant you can 'talk to … about anything, including any website or book' under Premium. The point is that you ask about the text already open in the reader, rather than copying it into a separate chatbot (an AI you type questions to).",
      tweak:
        "If you're on the Premium trial, try this before day three. Otherwise skip it: nothing here is needed to use the reader.",
    },
  ],

  pitfalls: [
    "**Mistaking the trial for the free plan.** Speechify's own blog spells it out: 'A trial is not the free plan.' Buttons saying 'Try for free' on Premium start the trial that bills you (see Before you start). The free plan has no time limit.",
    "**Cancelling the wrong place.** If you subscribed on the web, cancel on the web: profile picture, then Settings, then Cancel Subscription, per Speechify's help article. If you subscribed in the iPhone or Android app, cancel it in your App Store or Google Play subscriptions. Deleting the app does not cancel anything.",
    "**Judging it on the voice you hear in ads.** Marketing clips use the premium voices, so judge the free plan on its own voices.",
  ],

  whereToNext: [
    { label: "Voice & speech tools", categorySlug: "voice-speech" },
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "AI chat assistants", categorySlug: "text-conversational-ai" },
  ],
};
