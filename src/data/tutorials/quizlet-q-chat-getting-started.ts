import type { PlatformTutorialData } from "./types";

export const quizletQChatTutorial: PlatformTutorialData = {
  slug: "quizlet-q-chat-getting-started",
  platformSlug: "quizlet-q-chat",
  title: "Getting Started with Quizlet's AI Tutor",
  tagline:
    "Quizlet retired Q-Chat. Here's the AI study chat that's inside Quizlet now — what it does, and who can actually use it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  accessTier: "FREE",

  howItWorks:
    "You open the chat from your Quizlet home page or from a set you're already studying, type a question about whatever you're stuck on — or hand it a photo of your notes — and it answers in the window. You keep asking follow-ups, and it can turn what it just explained into flashcards.",

  whatItIs: [
    "Q-Chat was Quizlet's AI tutor, launched in March 2023 and built on the technology behind ChatGPT. It is no longer available: Quizlet's help centre has no page for it in any language, and independent write-ups put its removal around June 2025. Quizlet does not appear to have announced the retirement anywhere public.",
    "What Quizlet has instead is Ask Quizlet — a chat window inside Quizlet that explains things from your coursework, points you at study sets, and turns its own explanations into flashcards you can study. We have not seen Quizlet describe it as a renamed Q-Chat, so treat it as the current tool rather than the old one under a new label.",
    "The reason to use it rather than a general chatbot is where it sits: it opens on top of the set you're revising, in the account you already study in.",
  ],

  beforeYouStart: [
    "**Start here, because it decides everything else:** Quizlet's help centre says Ask Quizlet \"is currently only available for users in the United States who are 14 years old or older.\" If you're outside the US or under 14, nothing on this page will appear for you, and the honest move is a general chatbot instead — start with our Text & Conversational AI category.",
    "You need a Quizlet account and to be signed in, but you don't need to pay. Quizlet's help page for Ask Quizlet names no subscription requirement and no usage cap. That's worth a pinch of salt rather than a guarantee: Quizlet does cap its other AI features by plan — its study-guide generator is \"limited access\" on a free account and unlimited on a paid one — so a cap on the chat may exist without being written down. Check for a limit once you're signed in. Paid Quizlet Plus currently runs around $45 a year (roughly $10 a month, going by the in-app purchase prices Apple lists), and what it buys is more of the other AI tools, not obviously more chat.",
    "You can type a question, or attach your own material and add a **prompt** (the message you type) saying what to do with it — Quizlet says up to three files at a time, in `.pptx`, `.docx`, `.pdf`, `.png`, `.jpg` or `.jpeg`, and under 25 MB each if you're on a phone.",
    "The conversation is not kept. Quizlet says plainly: \"Chat history isn't saved across pages. If you leave Ask Quizlet, the conversation will reset, but minimizing it will keep your chat active.\" So if it explains something well, copy it out or turn it into flashcards before you navigate away.",
  ],

  security: [
    {
      kind: "text",
      text: "Two things we could not establish from Quizlet's own public pages — its privacy policy would not load for us — are which company's **model** (the AI \"brain\" that does the actual thinking) is answering you, and whether your conversations are used to improve it. Quizlet has not published the equivalent detail for this one that we could find.",
    },
    {
      kind: "list",
      label: "Worth a think before you upload",
      items: [
        "A classmate's graded work, a photo of someone else's paper, anything with other people's names on it — that's their information going onto a company's servers, not yours.",
        "If you've joined a teacher's class, Quizlet gives teachers reporting on how students study their sets. Quizlet's help pages describe that for study activities and don't say one way or the other whether chats are included, so don't assume the chat is invisible to a teacher just because it looks like a private window.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting unstuck on one specific thing while you're already inside the set you're revising, without opening another tab",
      "Answering from your own material rather than from the open web — you hand it the notes and ask about those",
    ],
    okayAt: [
      "Sustained tutoring. It's shaped around explaining a study item and making cards from it, so it suits one sitting rather than a plan across a week.",
      "Work that isn't flashcard-shaped — essay feedback, code, open-ended discussion. Quizlet's own description of it doesn't reach for any of that.",
    ],
    avoid: [
      "Generating the answer you hand in. Quizlet's community rules are explicit — \"Quizlet is meant for learning, not cheating\" — and Quizlet says it can remove public access to sets and send warnings or take other administrative action against the people who made them.",
      "Treating its explanation as checked. Quizlet's own help page for Ask Quizlet says nothing at all about accuracy, verifying answers, or double-checking what it tells you — no caveat, in either direction. An absent warning is not a promise that it's right.",
      "Counting on it for anything current or off-Quizlet. Web searching is not among the things Quizlet says it does, so don't lean on it for this week's news or facts you can't check.",
    ],
  },

  starterActions: [
    {
      title: "The card you keep getting wrong",
      prompt:
        "I keep getting this one wrong: [paste the term and its definition from the set]. Explain it in plain language, give me one everyday example, and tell me the thing it's easiest to confuse it with.",
      whyHere:
        "Ask Quizlet opens on top of the set page itself, so the term and the definition you're arguing with are right there to copy — and the explanation it gives back can become new cards without you leaving the page. Paste the same thing into ChatGPT and you get a good answer in a window that knows nothing about the set you're revising.",
      tweak:
        "Add \"and give me a way to remember it\" — a mnemonic is the part you'll actually still have on the day.",
    },
    {
      title: "Hand it your notes instead of typing the question",
      prompt:
        "These are my lecture notes. Pull out the ten things most likely to come up in a test, then explain the two I'd be most likely to get wrong. [attach the file or a photo first]",
      whyHere:
        "Quizlet says that when you upload, it will \"respond based on your study materials\" — so the answer is pinned to what your course actually covered rather than to the general version of the topic.",
      tweak:
        "Attach the photo of a whiteboard or a page of handwriting rather than retyping it — images are on the accepted list.",
    },
    {
      title: "Check a set before you trust it",
      prompt:
        "I'm revising [topic] for [the exam or test]. Does this set actually cover what I need, and what's missing from it?",
      whyHere:
        "Judging whether a set fits what you're studying, and pointing you at others, is one of the jobs Quizlet lists for this tool — and it can look at the set you're on. A general chatbot can only answer this if you paste all eighty terms into it first, which nobody does.",
      tweak:
        "Follow up with \"make cards for what's missing\" and you've closed the gap instead of just learning about it.",
    },
    {
      title: "Make it test you, in one sitting",
      prompt:
        "Quiz me on this set one question at a time. Wait for my answer before you say whether it's right, keep a running score, and stop when I say stop.",
      whyHere:
        "Quizlet's Learn and Test modes check what you typed against the wording on the card; a chat lets you answer in your own words and see what it makes of that.",
      tweak:
        "Say \"ask me the ones I get wrong again at the end\" to get a second pass at your weak spots.",
    },
  ],

  pitfalls: [
    "**Everything you find about Q-Chat is out of date, including Quizlet's own page.** Quizlet's March 2023 announcement, \"Introducing Q-Chat, the world's first AI tutor built with OpenAI's ChatGPT,\" is still live on its blog with no retirement notice on it. If a guide, a video or a teacher's handout tells you to click Q-Chat, it was written before the tool went away.",
    "Blaming yourself when the chat isn't there. If no chat appears on your home page or set page, the likeliest reason is the eligibility limit above, not your account, your browser or your plan.",
    "Assuming Quizlet's AI features share one rulebook. They don't: its study-guide generator is available to 14-year-olds in the US and UK, 15 in Australia, 16 in Canada, Ireland and New Zealand and 18 in a long list of other countries, and works in English, French or German — a far wider gate than the chat's US-only one.",
    "Letting it write flashcards you never read properly. A wrong or half-right explanation doesn't just get read and forgotten — it gets made into a card and then memorised on purpose. Read what it generated before you study it.",
  ],

  whereToNext: [
    { label: "Education & Learning AI", categorySlug: "education-learning-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
  ],
};
