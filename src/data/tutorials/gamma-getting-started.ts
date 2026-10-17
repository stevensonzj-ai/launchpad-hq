import type { PlatformTutorialData } from "./types";

export const gammaTutorial: PlatformTutorialData = {
  slug: "gamma-getting-started",
  platformSlug: "gamma",
  title: "Getting Started with Gamma",
  tagline:
    "Describe a presentation, document or simple website in a sentence, and Gamma designs the whole thing — then you edit it like any slide deck.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You type a request into a box on your dashboard — a sentence is enough. Gamma's agent (AI that takes actions on its own rather than only answering) asks a few questions, shows you a plan, then builds finished, designed slides. You change them by chatting with it, or by clicking in and editing yourself.",

  whatItIs: [
    "Gamma builds finished-looking presentations, documents, one-page websites and social posts from a description. You type what you need — \"a ten-slide talk for new volunteers\" — and it writes the text, picks a layout and adds images, so your first draft already looks designed rather than being a blank template you fill in.",
    "Since its October 2026 update, called Gamma 5, the starting point is a conversation. In its default Plan mode the agent asks about your goal, audience and priorities, then shows a written plan for the story and the look, and builds nothing until you approve it. An Express mode skips the questions and goes straight to a draft.",
    "It does not need you to start from nothing. You can paste in your own notes, or import a PowerPoint, Word file, PDF, Google Doc or Google Slides deck, or a web page's address, and Gamma restyles that material rather than inventing new content.",
    "The writing and images come from AI made by other companies — Gamma names Claude, OpenAI, Gemini, Flux, Ideogram and Luma — rather than its own. When you are done you can present straight from Gamma, share a link, or export a file to PDF, PowerPoint or an image, or bring it into Google Slides.",
  ],

  beforeYouStart: [
    "You can start free in a browser at gamma.app. There are also iPhone and Android apps. The free plan gives you 400 credits (the platform's unit of spend — each thing you make costs some) once, at signup. Gamma's help centre is explicit that free credits \"do not refresh\", so treat them as a trial budget rather than a monthly allowance.",
    "Credits are spent only on AI work: generating a deck, adding slides or images with AI, asking the agent to change something, trying new layouts. Typing, moving things around and fixing a slide by hand cost nothing, and Gamma says it does not charge for AI errors or for the agent's clarifying questions. Costs vary with the length of what you ask for and, for images, with which image generator you pick — Gamma shows the cost before an image is made. On the free plan a single request can produce at most 10 slides.",
    "Anything you export on the free plan carries a badge. Gamma's help centre says a \"Made by Gamma\" badge is stamped on PDF and PowerPoint exports whenever your workspace is on the free plan at the moment you export, and a \"Made with Gamma\" badge shows on decks you share as links. A paid plan removes it from future exports only — files you already exported keep it.",
    "Whether you will need to pay depends on whether that badge or the 400-credit budget gets in your way. Paid plans are billed per person: Plus is $12 a month (or $9 a month billed yearly) with 1,000 credits a month, Pro is $25 (or $18 yearly) with 4,000, and Ultra is $100 (or $90 yearly) with 20,000.",
  ],

  security: [
    {
      kind: "text",
      text: "The thing to manage on Gamma is who can see what you make, because its finished work is built to be shared as a link. A public link lets anyone who has it open your gamma without a Gamma account, and you set what they can do with it — view, comment or edit. Gamma's own terms add that anything you put in a 'public' area of the service may be visible to other Gamma users.",
    },
    {
      kind: "list",
      label: "Before you share or upload:",
      items: [
        "Check the link setting every time you share. Choose View unless you actually want strangers editing, and remember that forwarding a link forwards access.",
        "Password protection and keeping a gamma out of search engines are not on every plan; without them, a shared link is the only lock on it.",
        "Gamma 5 can pull material in from connected tools such as Slack threads and call transcripts. Connect only what you would be comfortable seeing on a slide, because that is where it can end up.",
      ],
    },
    {
      kind: "text",
      text: "Gamma's help centre says that on every individual plan, including Free, its default setting lets Gamma use what you make to train its AI. You can switch that off under your avatar → Settings → Data Controls — do it before you upload anything you would not want reused.",
    },
  ],

  triad: {
    bestAt: [
      "Getting from a topic, or a pile of notes, to a designed first draft in a few minutes — with a plan you can correct before it spends credits building.",
      "Restyling the same content: ask for a new look and Gamma keeps your words while changing the design.",
      "Reusing one piece of work as a deck, a document or a one-page website, since all three live in the same editor.",
    ],
    okayAt: [
      "Producing a deck you will finish in PowerPoint or Google Slides. Exports work and keep editable tables, but Google Slides swaps Gamma's fonts for its own, slide masters are left empty, and gradients and some effects come out flatter.",
      "Being accurate. Gamma's terms describe what it generates as initial drafts, 'not intended as any final, definitive or comprehensive presentation' — read every slide before it goes in front of anyone.",
    ],
    avoid: [
      "Handing over a free-plan export as finished work, unless you are happy for it to carry Gamma's badge.",
      "Spending your free 400 credits regenerating a whole deck to fix one slide. Edit by hand, or point the agent at that slide; the one-time budget does not come back.",
    ],
  },

  starterActions: [
    {
      title: "Let the plan do the work",
      prompt:
        "Make a 10-slide presentation introducing our community garden to new volunteers: what we grow, when we meet, what a first shift looks like, and who to contact. The audience is mostly retirees and families, so keep it friendly and light on text.",
      whyHere:
        "Leave Gamma in its default Plan mode for this. It will ask a few questions and show you a plan before it builds, and Gamma's own guidance calls adjusting that plan the highest-leverage step — fixing the story there is free, while fixing it after the build spends credits. Ten slides is also the most one request can produce on the free plan.",
      tweak:
        "Answer any question you don't care about with 'Decide for me'. Switch to Express only once you know what you want.",
    },
    {
      title: "Bring your own words",
      prompt:
        "Use this text as-is — don't rewrite it. Turn it into a short presentation, one idea per slide: [paste your notes]",
      whyHere:
        "Gamma's help centre recommends exactly this instruction when your content is final: it builds the design around your text instead of rewriting it. That keeps the result accurate to what you meant, which matters on a tool whose own terms call its writing a first draft.",
      tweak:
        "Have the notes in a Word file, PDF or old PowerPoint? Import the file instead of pasting.",
    },
    {
      title: "Change the look, not the words",
      prompt:
        "Restyle this deck in a dark, moody look with bold headings. Keep all of my content exactly as it is.",
      whyHere:
        "Gamma treats restyling and regenerating as two different things — restyling keeps your content, regenerating starts the content over. Asking for the first is how you try a new look without losing edits you have already made, or paying for a fresh draft you didn't want.",
    },
    {
      title: "Fix one slide, not the deck",
      prompt: "Slide 4 is too text-heavy. Cut it to three short points and add one image that fits.",
      whyHere:
        "The agent remembers your original goal and shows what it changed, so a narrow request like this gets a targeted fix. Gamma also lets you click a single element in AI-editing mode to limit the change to just that — the narrower the request, the fewer credits you spend undoing side effects.",
    },
    {
      title: "Reuse it as a page",
      prompt:
        "Turn this presentation into a one-page website with a short intro at the top and a sign-up section at the end.",
      whyHere:
        "Decks, documents and websites are all made in the same Gamma editor, so the content you already approved can become a shareable web page without starting over in a separate website builder.",
    },
  ],

  pitfalls: [
    "**Exporting on the free plan stamps a badge.** Gamma's help centre notes one exception: printing from your browser while signed in to your own gamma does not add it.",
    "**Taking a PowerPoint export at face value.** Open the exported file before you present from it; swapped fonts can change text sizes and push words off a slide.",
    "**Regenerating when you meant to restyle.** Asking for the wrong one loses your edits and spends credits.",
    "**Forgetting a paid plan renews itself.** Gamma's terms say subscriptions renew automatically, there are no refunds, and they ask you to cancel at least 30 days before the renewal date — so cancel well ahead, not on the last day.",
  ],

  whereToNext: [
    { label: "Image & design tools", categorySlug: "image-generation-editing" },
    { label: "Chat assistants for drafting the content first", categorySlug: "text-conversational-ai" },
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
  ],
};
