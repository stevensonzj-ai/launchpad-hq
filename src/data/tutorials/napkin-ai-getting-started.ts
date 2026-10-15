import type { PlatformTutorialData } from "./types";

export const napkinAiTutorial: PlatformTutorialData = {
  slug: "napkin-ai-getting-started",
  platformSlug: "napkin-ai",
  title: "Getting Started with Napkin AI",
  tagline:
    "Paste in something you've already written and get a diagram back — no design tool, and for the most part, no prompt (the message you type).",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open a blank page in your browser and paste in something you've already written. Highlight a paragraph and click the blue Generate Visual button; a few seconds later Napkin shows several diagrams built from those words. Pick one, choose a style, and it drops into your page, where you can change colours, icons and wording by hand.",

  whatItIs: [
    "Napkin AI turns writing into diagrams — flowcharts, mind maps, timelines, comparison charts, data charts and similar visuals. You give it text you already have, and it reads that text and proposes several ways of drawing it.",
    "That is the difference from an image generator. You are not describing a picture and hoping; Napkin lays out your own points as boxes, icons and arrows, and every piece stays editable afterwards. Its homepage puts it bluntly: \"Forget prompting, Napkin works directly from your text.\"",
    "It suits anyone who writes things other people have to follow — a report, a blog post, a training handout, a slide — and wants a diagram without learning a design program. Finished visuals can go into PowerPoint, Google Slides, Google Docs, Word, Notion, Canva and similar tools.",
    "Napkin also has a newer product, Napkin Slides, still labelled beta, that builds whole presentation decks. This page sticks to single visuals, which is what Napkin is known for and where a first-timer should start.",
  ],

  beforeYouStart: [
    "Sign up at app.napkin.ai with a Google account or an email and password. You can sign in from a phone or tablet, but Napkin's help centre says generating visuals needs a computer — on mobile you can only view your work and work on presentations.",
    "There is a free plan, \"Free Forever\": $0, with 500 AI credits (the platform's unit of spend — each visual you generate costs some) every week, and Napkin's branding on your visuals. The credits refresh weekly and do not roll over. Napkin's pricing page says generation is charged by the words you highlight, so the free allowance goes much further on a short paragraph than on a whole document. Editing a visual by hand costs nothing.",
    "If you outgrow that, the paid plans are priced per person. Plus is $12 a month billed monthly, or $9 a month billed yearly, with 10,000 credits a month. Pro is $30 a month billed monthly, or $22 billed yearly, with 30,000 credits a month. For occasional diagrams in your own documents, the free plan is the realistic starting point.",
    "Bring your own words. Napkin is built to draw text, not to write it — you can paste text in or import a document. Its first-run tutorial can write some sample text for you from a short prompt so you have something to practise on, but the useful habit is starting from your own notes.",
  ],

  security: [
    {
      kind: "text",
      text: "Napkin is a cloud service: the text you paste is stored with your account and sent to outside AI companies to produce the visuals. Napkin's privacy policy, effective 31 August 2026, says its data is hosted in the United States, names OpenAI, Anthropic and Google (Vertex AI and Gemini) among the services it uses for AI generation, and says your visuals and input text are kept for as long as your account is active.",
    },
    {
      kind: "list",
      label: "Two things to do before you paste anything real:",
      items: [
        "Decide about the training setting. Napkin's help centre says your content may be used in anonymised form to improve the product, \"including training and fine-tuning our models\", on every plan including Free. It says you can switch this off under Account Settings → Data Privacy by turning off \"Use my content for product improvements\" — in a shared Teamspace, the administrator controls it instead.",
        "Treat a draft as something that leaves your computer. The privacy policy itself does not mention training at all — the opt-out lives in the help centre — so if your text is confidential work material, check with whoever owns it before pasting, setting or no setting.",
      ],
    },
    {
      kind: "text",
      text: "To delete your data, the privacy policy says you request account deletion; most personal data is then removed from active systems straight away, with backups purged later on their normal schedule.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a paragraph that describes a process, a list of steps or a comparison into a clean diagram in seconds.",
      "Offering several layouts for the same words, so you can see which shape — timeline, flowchart, mind map — explains your point best.",
      "Visuals for documents and slides you are already writing.",
      "Hand-tweaking the result — colours, icons, sizes, wording.",
    ],
    okayAt: [
      "Getting one exact layout. Napkin's own help centre says a typed request \"guides the suggestions; it does not guarantee an exact layout,\" so expect to pick from options rather than order a specific design.",
      "Long documents. It will import them, but generating from a whole report at once is the fastest way through a weekly allowance.",
    ],
    avoid: [
      "Anything that has to be one of a kind, such as a logo-like graphic or a visual you need to call exclusively yours. Napkin's terms say outright that it does not guarantee your output will be unique and that other users may get \"substantially similar\" visuals.",
      "Diagrams where every label must match your source exactly — figures in a report, steps in a safety procedure. Napkin can summarise as well as draw (there is a \"Summary\" detail level), and its own AI transparency page warns results can be \"incomplete\" or \"misleading\". Check every box against what you wrote.",
    ],
  },

  starterActions: [
    {
      title: "Draw a paragraph you already wrote",
      whatItDoes:
        "Paste a paragraph describing something with steps — how you onboard a new hire, how a recipe comes together, how a bill gets approved. Highlight it, click the blue Generate Visual button, and scroll through the options it offers.",
      whyHere:
        "There is no instruction to write here: Napkin reads the words on your page and proposes several layouts from them. Gamma, by contrast, starts from a topic you type and writes the content for you — Napkin's starting point is text you have already written.",
      tweak:
        "Highlight one paragraph, not the whole page: smaller selections cost less and usually produce a clearer diagram.",
    },
    {
      title: "Ask for a particular shape",
      prompt: "timeline",
      whyHere:
        "After you click Generate Visual, choose Customize at the bottom of the preview and type this into the \"Specify visual\" box, then apply it. Napkin re-suggests visuals in that form. \"Specify visual\" is the one place Napkin takes a typed instruction, and it is deliberately short — a visual type rather than a paragraph of directions.",
      tweak:
        "Try \"flowchart\" for a process or \"mind map\" for a topic with branches. The same Customize panel has Orientation (Landscape suits a slide) and a Detail level of Summary or Detailed.",
    },
    {
      title: "Restyle a visual without spending credits",
      whatItDoes:
        "Double-click any text, icon or shape in a finished visual to change its colour; click an icon to swap it for another, or use Spark Search to find a new icon or shape.",
      whyHere:
        "Napkin's help centre draws a hard line here: editing colours, icons, sizes and shapes \"doesn't cost credits,\" but re-highlighting your text and generating again does. Once a layout is close, fixing it by hand is free; asking for a fresh one is not.",
    },
    {
      title: "Turn a whole document into a set of diagrams",
      whatItDoes:
        "Import a document you already have — Napkin accepts PowerPoint, Word, PDF, HTML and Markdown files — then generate a visual for the one or two sections that would most benefit from a picture.",
      whyHere:
        "Importing keeps your original wording on the page next to each visual, so you can check every label against the source — which matters, because Napkin can condense what it draws.",
      tweak:
        "Pick sections; don't generate for every paragraph.",
    },
    {
      title: "Get a visual out and into a slide or doc",
      whatItDoes:
        "Hover over a visual, click the export button in its top-right corner and choose a format; or use Share → Export PDF to export the whole page at once.",
      whyHere:
        "Export PDF turns the whole Napkin page, visuals included, into one file laid out as a continuous page, A4 pages or 16:9 presentation pages, so a document with several diagrams goes out as a handout or a slide deck without placing each picture by hand.",
      tweak:
        "For a single visual, PNG or PDF works in most documents and slides; SVG and PowerPoint files stay editable afterwards. Check which formats your account can export once you're signed in.",
    },
  ],

  pitfalls: [
    "**Effects cost credits too.** Napkin's help centre says applying a visual Effect uses credits for each visual or slide it is applied to, so check your balance before decorating a whole page.",
    "**Saving credits for later.** Paid-plan credits don't roll over either; they reset monthly, so there is nothing to gain by hoarding them.",
    "**Letting a paid plan renew by accident.** Napkin's terms say subscriptions renew automatically, that you must cancel at least 24 hours before the renewal date, and that there are no refunds for partly used AI credits.",
  ],

  whereToNext: [
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "AI chatbots, to draft the text first", categorySlug: "text-conversational-ai" },
  ],
};
