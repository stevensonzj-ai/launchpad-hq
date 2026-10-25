import type { PlatformTutorialData } from "./types";

export const deeplTutorial: PlatformTutorialData = {
  slug: "deepl-getting-started",
  platformSlug: "deepl",
  title: "Getting Started with DeepL",
  tagline:
    "A translator and a writing polisher in two boxes on one website. They're free to try, with one privacy rule you have to know before you paste anything.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You paste or type your own text into the box on the left. DeepL detects the language and puts a translated, or polished, version in the box on the right. Click any word in the result to see alternatives, change it, and copy out what you need.",

  whatItIs: [
    "DeepL is a German company's translation service, and it's really two tools on one website. DeepL Translator turns your text from one language into another. DeepL Write keeps your text in the same language and suggests a cleaner version, fixing spelling, grammar and awkward phrasing. Both work the same way: your words go in on the left, and an edited version comes out on the right.",
    "People choose it over a general translator because of how much control it gives over the result. You don't have to accept the first version. You can click any word in a translation to swap it for one of DeepL's listed alternatives, and in Write you can ask it to rephrase a whole sentence. The translator page says it handles more than 100 languages. Write covers a much shorter list: DeepL's developer documentation lists English, German, French, Spanish, Italian, Portuguese, Japanese, Korean and Chinese.",
    "It's not a chatbot. You can't ask DeepL questions or give it instructions. It only ever works on the text you hand it. That makes it predictable, but it also means the box isn't a place to type \"make this sound friendlier\". Write gives you buttons and alternatives for that instead.",
    "It can also translate a whole file. You drop in a Word, PowerPoint or PDF file and get a translated copy back with the original layout kept. Businesses also connect DeepL to their own software through its API (a way for programs to talk to each other without a person clicking). Paying for the API is separate from the plans described below, and a beginner won't need it.",
  ],

  beforeYouStart: [
    "You can start right now at deepl.com, with no account and no card. Paste some text into the translator, or go to deepl.com/write for the writing tool. The free version has a monthly character allowance (letters, spaces and punctuation all count), a small monthly file-translation allowance with a size cap, and one glossary (your own list of how particular terms should be translated). DeepL also limits how much text you can paste at once, so very long text has to go in chunks.",
    "**Free DeepL is for text you'd be comfortable sharing.** DeepL's free Terms of Use (last updated November 2024) say you \"may not use the Free Services for processing content containing confidential or personal data of any kind.\" That rules out other people's names, addresses or details, and confidential work documents. The terms add that this kind of content \"is only allowed within a DeepL Pro subscription.\" The privacy section below explains why.",
    "You'll only need to pay if you translate a lot, or if what you translate is private or confidential. DeepL's own name for its paid plans is DeepL Pro. The cheapest is Individual, followed by Team and Business, which are priced per user. Each step up raises the character and file allowances, and Business has unlimited characters under a fair-use policy. All three are billed annually in euros with VAT included. Enterprise is custom-priced. DeepL doesn't publish dollar prices for these plans, so if you're outside Europe, check the price shown for your country on deepl.com/pro before you buy.",
    "If you add any of DeepL's browser extensions (small add-ons to your web browser), there are versions for Chrome, Firefox and Edge. The extensions let you translate or polish text while you browse. You sign in with your DeepL account to use them.",
  ],

  security: [
    {
      kind: "text",
      text: "DeepL treats your text differently depending on whether you pay. DeepL's privacy policy, updated October 2026, says that on the free translator and free DeepL Write it processes the content you upload, and the results, \"for a limited period of time to train and improve our neural networks and algorithms\". Your corrections to its suggestions are used the same way. It doesn't say how long that period is. The policy offers no switch to opt out of this on the free version. The route DeepL offers is a paid subscription.",
    },
    {
      kind: "list",
      label: "What paying changes, in DeepL's own documents:",
      items: [
        "On the paid Translator, API and Write plans, the same policy says your texts \"will not be permanently stored\". They are deleted once the job is done and \"will not be used to improve the quality of our services.\"",
        "There is one narrow exception. DeepL's Pro Terms and Conditions (last updated August 2026) let it keep paid users' text, encrypted, for up to 72 hours when certain errors occur, so its engineers can fix them. Only selected staff can unlock that text, and only with management approval. After that it's deleted.",
        "Translator and Write are paid for separately. DeepL's help article on DeepL Write says the paid version of Write, with its \"maximum data security\", is not included in a DeepL Pro translator plan. So text you paste into Write can still fall under the free-version rules above even after you've paid for the translator. Check which tool your plan covers before you paste private writing into Write.",
      ],
    },
    {
      kind: "text",
      text: "DeepL is based in Cologne, Germany, and its privacy policy is written under European privacy law. The policy says document translations, free or paid, are processed on DeepL's own infrastructure in Europe. You can delete your DeepL account in its account settings, or by emailing DeepL's support address, which the policy gives.",
    },
  ],

  triad: {
    bestAt: [
      "Getting the meaning of a message, email or web page in a language you don't read, then clicking individual words to choose the wording you'd actually use.",
      "Writing in a language you know but aren't confident in. Translate your draft, then run it through Write to smooth it out, without leaving the site.",
      "Translating a Word, PowerPoint or PDF file without rebuilding its layout by hand.",
      "Tidying spelling, grammar and clunky sentences in English and a handful of other major languages, while seeing exactly what was changed.",
    ],
    okayAt: [
      "Languages beyond the big European and East Asian ones: because Write's list is short, in many languages you can translate but not get your writing polished.",
    ],
    avoid: [
      "Pasting anyone's personal details, or anything confidential, into the free version, which DeepL's own free terms forbid.",
      "Treating a translation as safe to send without anyone checking it when the stakes are high, such as a contract, a medical instruction or an official form. DeepL's free terms say it accepts no liability for the accuracy of its translations.",
    ],
  },

  starterActions: [
    {
      title: "Translate, then pick your own words",
      whatItDoes:
        "Paste a short paragraph you actually need to understand or send, such as an email, a product review or a message from a friend, into the translator. Choose the language you want on the right, then click any word in the result you're unsure about and look at the list of alternatives DeepL offers.",
      whyHere:
        "DeepL lets you click any single word in a finished translation and swap in one of its listed alternatives, without re-translating the whole thing, so you can stop at the one word that sounds wrong and fix just that.",
      tweak:
        "Try a sentence with an idiom in it, like \"break a leg\" or \"it's raining cats and dogs\", and see whether DeepL keeps the meaning rather than the literal words.",
    },
    {
      title: "Polish your writing in Write",
      whatItDoes:
        "Paste something you've written into deepl.com/write: a cover letter paragraph, a work message, a post you're unsure about. Look at the edits it marks, turn on \"Show changes\" to see exactly what was altered, then click a sentence to pick a different rephrasing.",
      whyHere:
        "Write sits on the same site as DeepL's translator, so a draft you've just translated can go straight into it in the same language without switching tools. Swap in Grammarly and that's no longer true, because Grammarly doesn't translate. Showing every change also means you learn what was wrong instead of silently accepting a rewrite.",
      tweak:
        "Write can turn American English into British English, or the other way round, by picking the variety in its language menu. That's useful if you're writing for readers on the other side of the Atlantic.",
    },
    {
      title: "Write in your language, send in theirs",
      whatItDoes:
        "Write a short message in your own language, such as a note to a host, a question to a seller abroad or a reply to a colleague. Translate it into theirs, then paste the translation back into the translator going the other way to check it still says what you meant.",
      whyHere:
        "Translating it back is a cheap check you can run without knowing the other language, and DeepL's word alternatives let you fix any line that comes back wrong before you send it. Remember that each run, there and back, counts against the free version's monthly character allowance.",
    },
    {
      title: "Translate one whole file",
      whatItDoes:
        "Drop a Word, PowerPoint or PDF file onto the translator, something non-sensitive like a menu, a brochure or a public notice, and download the translated copy with its layout intact.",
      whyHere:
        "DeepL's translator page invites you to drag and drop PDF, Word and PowerPoint files straight into the same box you type in. The free version's file allowance is small, so use it on something where keeping the layout actually matters. For a few paragraphs, pasting the text is cheaper.",
    },
  ],

  pitfalls: [
    "**Signing up for an account doesn't make free DeepL private.** DeepL's privacy policy covers \"DeepL Translator / Write (free version)\" in one section, whether or not you're logged in. What changes how your text is treated is a paid subscription, not an account.",
    "**DeepL's \"Start free trial\" buttons are for the paid plans, not for the free version.** The free translator is the plain box on deepl.com/translator. A trial button leads you into setting up a paid subscription.",
  ],

  whereToNext: [
    { label: "International & Regional AI", categorySlug: "international-regional-ai" },
    { label: "AI chatbots and writing assistants", categorySlug: "text-conversational-ai" },
  ],
};
