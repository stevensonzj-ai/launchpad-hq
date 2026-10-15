import type { PlatformTutorialData } from "./types";

export const kimiTutorial: PlatformTutorialData = {
  slug: "kimi-getting-started",
  platformSlug: "kimi",
  title: "Getting Started with Kimi",
  tagline: "Moonshot AI's assistant for reading long documents and handing off whole tasks — and, outside China, you sign in at kimi.ai, not kimi.com.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open kimi.ai in a browser, sign in, and type what you want into one box — a question, or a whole job such as \"turn this report into slides.\" Kimi either answers in the chat or works through the task step by step, and you reply to correct or extend what it produced.",

  whatItIs: [
    "Kimi is the AI assistant made by Moonshot AI, a company founded in Beijing. Its pitch is that one box does two jobs: ordinary chat, and agent work — an agent is AI that takes actions on its own rather than only answering — where Kimi plans a task and delivers a finished file, such as a slide deck, a document, a spreadsheet or a research report.",
    "Its home turf is volume. Moonshot's help centre says you can attach PDFs, Word, Excel and PowerPoint files, images, text and video, many at once in one conversation, and it has a mode called Agent Swarm that splits a big search or batch job across many helpers at once.",
    "Above the box you choose a model (the AI \"brain\" that does the actual thinking). Moonshot's help centre describes K2.6 as the fast one for quick questions, which answers in text only, and K3 as the most capable, the one that can produce editable .pptx, .docx, .xlsx and .pdf files from start to finish. You also set how hard it thinks: higher settings reason more thoroughly and take longer.",
    "Moonshot publishes the K3 model files themselves on Hugging Face under its own \"Kimi K3 License\", so other companies can run the same model. At 2.8 trillion parameters it is built for data-centre hardware, not a home computer. Programmers can also reach Kimi's models through a separate pay-as-you-go service at platform.kimi.ai, which has no subscription — current rates are on the Quick facts panel beside this page.",
  ],

  beforeYouStart: [
    "**Outside mainland China, go to kimi.ai — not kimi.com.** Moonshot split Kimi in 2026: kimi.com is now the mainland China service, with phone-number and WeChat sign-in and a Beijing company behind the account, while kimi.ai is the international one. Kimi's own sign-in screen tells people outside mainland China to log in at Kimi.ai with a Google account or a non-+86 phone number; workplace accounts can use the \"Sign in with SSO\" option with a work email. Moonshot's help centre still says \"Visit Kimi.com\" in places, so expect older guides — including some of Moonshot's own — to send you to the wrong door. You must be 18, or the adult age where you live if that is higher, unless a parent or guardian agrees to the terms for you.",
    "Moonshot does not publish what you can do on kimi.ai without paying, so you find out the boundary by using it. Check the Quick facts panel beside this page for the prices this site has verified before you plan around paying.",
    "Buying a membership may not be possible the day you want one. Moonshot paused new subscriptions on 20 July 2026, saying demand for K3 had pushed its servers close to their limit and that it would reopen spots in batches. In September 2026 a reply on Moonshot's own forum said the pause still applied to both kimi.com and kimi.ai. Whether it has lifted since is not something Moonshot has announced, so treat a membership as something to check for rather than count on.",
    "Expect to be told to wait occasionally. Moonshot's help centre describes two separate brakes: a cap on how many messages you can send within a time window (a red circle by your message, which it says clears in two to three hours), and a peak-hour message, \"Kimi is a bit tired\", which it says usually clears in a minute or two.",
  ],

  security: [
    { kind: 'text', text: "Which Kimi you sign into decides which company holds your chats and which country's law applies to them. The kimi.ai service is run by NOVASCENT PRIVATE LIMITED, a company registered in Singapore; its terms (effective 13 August 2026) are governed by Singapore law, with disputes going to private arbitration in Singapore rather than to a court, and no class actions. Its privacy policy (last updated 13 August 2026) does not name the country where your data is kept and says it may be stored on servers outside your country of residence. The kimi.com service is a different contract: Beijing Moonshot Technology Co., Ltd., whose policy (effective 31 August 2026) says it stores your personal information inside the People's Republic of China." },
    { kind: 'list', label: "Three things that hold on kimi.ai today:", items: [
      "Your chats can train Kimi unless you ask in writing. The terms give Moonshot a licence to use what you type and what Kimi produces to train and improve its service. The only opt-out the terms describe is emailing membership@moonshot.ai; it applies from that point on and does not pull back anything already used.",
      "Moonshot's privacy policy says it shares an account identifier, such as a scrambled form of your email address, with advertising partners to target ads, and that some US state laws count this as selling your data. US readers can turn that off from the \"Do Not Sell or Share My Personal Information\" link in the site footer.",
      "Uploaded something sensitive by mistake? Moonshot's help centre says to delete the conversation at once, then email support@moonshot.ai with the kind of document — \"ID card\", \"bank card\", \"legal document\" — in the subject line so it is prioritised. Deleting removes it from your account, but Moonshot says some records are kept for a legally required period.",
    ] },
    { kind: 'text', text: "None of this makes ordinary use of Kimi unsafe. It does mean the decision about what to paste is yours to make before the first message, not after." },
  ],

  triad: {
    bestAt: [
      "Reading a stack of documents at once.",
      "Turning a request into a finished, editable file — slides, a Word document or a spreadsheet — when you pick K3.",
      "Big, repetitive research jobs, where Agent Swarm spreads the searching across many helpers instead of working through it one source at a time.",
    ],
    okayAt: [
      "Quick everyday questions on K2.6 — fast, but text only.",
      "Making pictures, video or audio. It can, but only after you install the matching plugin from its plugin marketplace; it is not built into the chat.",
      "Busy hours, when the \"Kimi is a bit tired\" message can make you wait.",
    ],
    avoid: [
      "Expecting a Word or Excel file from the plain chat window. Moonshot's help centre says the chat itself does not generate downloadable Office files; you need Kimi Slides, or an agent task on K3.",
      "Keeping the only copy of anything in Kimi. Moonshot's help centre says deleted conversations and deleted accounts cannot be recovered, and deleting an account also erases any paid benefits on it.",
      "Signing up with a Google account you might want to swap out later. The help centre says a linked Google account cannot be unlinked or replaced, and changing a linked email needs a support request.",
    ],
  },

  starterActions: [
    {
      title:
        "The stack reader (many files, one question)",
      prompt:
        "I've attached [number] documents about [topic]. For each one, give me a two-sentence summary. Then tell me where they disagree with each other, quoting the exact passage from each and naming which file it came from.",
      whyHere:
        "Moonshot's help centre says Kimi takes a whole stack of files in a single conversation. On ChatGPT you would usually feed a pile like this in a few at a time; here the comparison across the whole pile happens in one answer, which is what the second half of the prompt asks for.",
      tweak:
        "Ask for the disagreements as a table with one column per file.",
    },
    {
      title:
        "The finished file (switch to K3 first)",
      prompt:
        "Turn the attached report into a 6-slide presentation for [audience]. One idea per slide, a short title on each, no more than four bullet points, and a final slide listing three decisions we need to make. Give me an editable .pptx file.",
      whyHere:
        "Run this prompt on K3 and then on K2.6 and you see the file-versus-text split described above for yourself — a difference set by Kimi's own model switcher, which a ChatGPT version of this exercise does not have.",
      tweak:
        "Swap .pptx for .xlsx and ask for a spreadsheet of the report's figures instead.",
    },
    {
      title:
        "The fresh start (when a chat gets too long)",
      prompt:
        "Summarize and generate a handoff document: the key conclusions so far, decisions made, open questions, and anything I asked you to remember. Format it so I can paste it into a new conversation.",
      whyHere:
        "This is Moonshot's own advice. Its help centre says every conversation has a ceiling on how much it can hold, that deleting earlier messages does not free any room, and that the fix is to ask Kimi to \"summarize and generate a handoff document\" and paste it into a new chat. Learn it on day one and a long project never stalls.",
    },
    {
      title:
        "The effort test (same question, two settings)",
      prompt:
        "[Your hard question — for example, should I pay off my car loan early or invest the money? Here are my numbers: ...] Lay out the reasoning step by step, and tell me which assumption, if it were wrong, would change the answer.",
      whyHere:
        "Kimi lets you set how hard the model thinks, and Moonshot's help centre says the higher settings reason more fully but use more of your allowance. Ask once on the lowest setting and once on the highest, and you learn when the extra effort is worth spending.",
      tweak:
        "If the two answers agree, the lower setting is enough for questions of that kind.",
    },
    {
      title:
        "Save a preset for prompts you reuse",
      whatItDoes:
        "Store a prompt you use often — such as the stack reader above — as a preset, so it is one click away in every new chat.",
      whyHere:
        "Moonshot's help centre lists presets as a core feature for exactly this. Because Kimi's strength is repeat work on big piles of documents, a saved instruction pays off faster here than on an assistant you use for one-off questions.",
    },
  ],

  pitfalls: [
    "**A red circle by your message is a limit, not a fault** — the message cap covered in Before you start. Refreshing the page or signing out and back in does nothing.",
    "**\"Let's talk about something else\" ends a topic.** That reply means your message tripped Kimi's safety rules. Moonshot says to start a new topic, and to tap the thumbs-down button if you think the block was a mistake; rephrasing the same request rarely gets past it.",
    "**The help centre describes more than the box in front of you.** Kimi Work, Kimi Code and Kimi Claw are separate Moonshot products that share its help centre with the chat. If an article describes something you cannot find, check which product it is about before assuming your account is missing it.",
  ],

  whereToNext: [
    { label: "International & Regional AI", categorySlug: "international-regional-ai" },
    { label: "Chat assistants", categorySlug: "text-conversational-ai" },
    { label: "AI APIs & developer services", categorySlug: "ai-apis-developer-services" },
  ],
};
