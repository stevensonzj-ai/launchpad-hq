import type { PlatformTutorialData } from "./types";

export const quillbotTutorial: PlatformTutorialData = {
  slug: "quillbot-getting-started",
  platformSlug: "quillbot",
  title: "Getting Started with QuillBot",
  tagline:
    "Reword, tidy and check writing you already have — with honest limits on what its AI detector can tell you.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You paste your own writing into the box on the left, pick a tool, such as one that rewords it or checks its grammar, and click its button. A reworked version appears alongside it. You keep the changes you like, adjust a setting, and run it again until it says what you meant and still sounds like you.",

  whatItIs: [
    "QuillBot is a collection of writing tools on one website. Its best known is the Paraphraser, which rewords text you give it; around it sit a grammar checker, a summarizer, a translator, a citation generator, a plagiarism checker, an AI detector (a tool that estimates how likely it is that a piece of text was written by AI) and a \"Humanizer\" that smooths stiff, machine-sounding drafts. Unlike a chatbot, almost everything here starts from text you already have rather than a blank page.",
    "It is aimed squarely at students and people who write for work. QuillBot is a business of Learneo, Inc., and it follows you out of its own website: there are add-ons for the Chrome, Edge and Safari browsers and for Microsoft Word, plus apps for iOS, Android, Windows and macOS.",
    "The menu has grown well past rewording — it now lists an AI Chat (marked \"Beta\"), image tools and a shelf of PDF utilities. None of those is why people come here, and you can ignore them on day one. The rewording and checking tools are the product.",
  ],

  beforeYouStart: [
    "There is a free plan, and QuillBot's own grammar-checker and paraphraser pages say you can start without signing up. The plans page lists the free limits as paraphrasing up to 100 words and summarizing up to 1,200 words. Several modes and tools inside the site carry a Premium label, so you will meet those as you click around rather than all at once.",
    "If you do pay, Premium is currently listed at $8.33 a month, billed annually — meaning you are charged for the year up front. QuillBot's plans page does not publish a month-to-month price. Its FAQ says you can pause a subscription from your Account page instead of cancelling it, and you are not billed while it is paused.",
    "Whether you are **allowed** to use it is your school's or employer's call, not QuillBot's. QuillBot's own Humanizer page tells you to disclose AI use according to your institution's or employer's policies, and its help centre says that rewording a source without citing it can still count as plagiarism. Check the rule that applies to you before you hand anything in.",
    "The browser add-on works on nearly all websites without signing in, according to QuillBot's help centre. Google Docs is the exception: there you have to be signed in to a QuillBot account before it switches on.",
  ],

  security: [
    {
      kind: "text",
      text: "Everything you paste into QuillBot is sent to its servers to be reworked — it is a website, not a program running privately on your computer. The browser add-on goes further than the website, because it works inside the text boxes of the sites you write on, including your documents once you sign in. QuillBot's Trust Center says it uses the text you paste for training to improve its services, that storing your text is switched on by default for everyone, and that it does not sell your data. The switches to stop it storing your text or training on it are documented for the browser add-on (version 4.37.0 or later), under Extension Settings → View All Settings → Data and Privacy.",
    },
    {
      kind: "list",
      label: "Before you paste anything unpublished:",
      items: [
        "Read QuillBot's Trust Center, specifically its answer to \"How does QuillBot use my data?\" (quillbot.com/trust-center). It explains what happens to the text you paste and which settings you have — read it yourself rather than assuming.",
        "Don't paste other people's unpublished work — a friend's essay, a colleague's draft, a client's document — for the same reason you'd ask before emailing it to a stranger.",
        "If you install the add-on, it is easy to forget it is there. Turn it off on sites where you write anything private; the switch is in the QuillBot pop-up in your browser toolbar.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Rewording a sentence of your own that says the right thing in a clumsy way — and showing you several versions to choose between.",
      "Catching grammar, spelling and punctuation slips in about six languages, not only English — QuillBot's grammar page names English, Spanish, German, Dutch, French and Portuguese.",
      "Turning a long article into a short paragraph or a bullet list, with a slider for how short.",
      "Producing a formatted citation in APA, MLA or Chicago style for a source you've used.",
    ],
    okayAt: [
      "Its AI detector. QuillBot itself calls the result \"probability estimates, not verdicts\", says \"no AI Detector can provide 100% accuracy\", and notes that heavily reworded or lightly AI-edited text is harder to catch.",
      "Changing a lot of words at once. The more of your text you let it swap, the more likely the meaning drifts — see the first starter below.",
    ],
    avoid: [
      "Treating a detector percentage as proof about someone else's writing. QuillBot's detector page leads with a \"99% detection rate, according to independent evaluations\" — and the same page says \"Never make an academic or employment decision on a detector score alone.\" Believe the second sentence.",
      "Running a draft back and forth between the Humanizer and the AI Detector until the number drops. QuillBot sells both, and its own Humanizer page says the score is \"not something to optimize against\" and that the Humanizer \"isn't a tool for evading AI detection.\"",
      "Rewording someone else's work to make it count as yours. QuillBot's help centre says QuillBot \"is not designed to bypass plagiarism detection systems such as Turnitin.\"",
    ],
  },

  starterActions: [
    {
      title: "Reword a paragraph, then move the Synonym Slider",
      whatItDoes:
        "Paste a short paragraph you wrote yourself — under 100 words keeps you inside the free limit — click Paraphrase, then drag the Synonym Slider above the text boxes and watch the rewrite change.",
      whyHere:
        "QuillBot's help centre describes the slider as four levels: 1 makes the fewest word swaps and stays most accurate, 4 makes the most and is the least accurate, and it starts at 2. It re-runs the moment you move it, so you can see exactly where your meaning starts to slip — a dial Wordtune's rewrite suggestions don't give you.",
      tweak:
        "The slider isn't available in every mode. If it disappears, switch back to the Standard mode.",
    },
    {
      title: "Paraphrase a source, then cite it",
      whatItDoes:
        "Take one sentence from an article you're using, reword it in the Paraphraser, then open the Citation Generator and make an APA, MLA or Chicago citation for that article to put next to it.",
      whyHere:
        "QuillBot keeps the Paraphraser and a Citation Generator under the same menu, so the citation the rule above calls for is one click away. Doing both together, every time, builds the habit that keeps paraphrasing on the right side of your school's rules.",
    },
    {
      title: "Check your grammar, one suggestion at a time",
      whatItDoes:
        "Paste an email or paragraph into the Grammar Checker, click Check grammar, and go through each highlighted suggestion — accepting or rejecting it — instead of fixing everything at once.",
      whyHere:
        "QuillBot highlights grammar, spelling and punctuation problems for you to review, and checks the six languages listed above — useful if you write in more than English. Reading each change is how you learn the mistake rather than just losing it.",
      tweak: "Try it on something you wrote in a second language.",
    },
    {
      title: "Test the AI detector on writing you know is yours",
      whatItDoes:
        "Paste a few paragraphs of something you definitely wrote yourself, without AI, into the AI Detector and read both the overall percentage and the notes on each section.",
      whyHere:
        "The detector sorts text into three kinds — written by AI, written by a person, or written by a person and refined with AI — rather than just yes or no. QuillBot also says that when a result is unclear its detector leans toward calling text human. Seeing what it says about writing you know is human tells you how much any score it gives is worth.",
      tweak:
        "Try a very formal piece of your own, like a cover letter. QuillBot's own page warns that formulaic human writing can score higher than expected.",
    },
    {
      title: "Shrink a long article into bullet points",
      whatItDoes:
        "Paste a news article or report into the Summarizer, choose Bullet Points instead of Paragraph, and move the length slider to see the summary grow and shrink.",
      whyHere:
        "QuillBot's Summarizer offers exactly two built-in formats — Paragraph and Bullet Points — and a four-step length slider. Being able to set the shape and length with a click, rather than asking a chatbot like ChatGPT and hoping it obeys, makes it easy to compare a 3-line and a 10-line version of the same text.",
    },
  ],

  pitfalls: [
    "**Assuming the reworded version means the same thing.** Read every output against your original before you use it, with an eye on any name, number or term that has to stay exact.",
    "**Panicking when your own writing scores as 'AI'.** As the fourth starter shows, a high score on something you wrote yourself is a known limit of the tool, not an accusation.",
    "**A grayed-out QuillBot icon in Google Docs.** QuillBot's help centre lists the usual causes: you're not signed in through the add-on, the document is in an older format (try a new document), it's set to Pageless instead of page mode (File → Page setup), or the add-on is switched off in its pop-up.",
  ],

  whereToNext: [
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
  ],
};
