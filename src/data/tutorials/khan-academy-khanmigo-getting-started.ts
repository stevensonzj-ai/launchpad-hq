import type { PlatformTutorialData } from "./types";

export const khanAcademyKhanmigoTutorial: PlatformTutorialData = {
  slug: "khan-academy-khanmigo-getting-started",
  platformSlug: "khan-academy-khanmigo",
  title: "Getting Started with Khanmigo",
  tagline:
    "Khan Academy's AI tutor, built to ask you questions instead of handing over the answer.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You sign in on Khan Academy's site and open a chat panel next to the lesson you're working on. You type a question — your **prompt**, the message you type — and it usually replies with a question of its own rather than the answer, so you work through the problem in turns.",

  whatItIs: [
    "Khanmigo is the AI tutor and teaching assistant built by Khan Academy, the non-profit behind the free lesson library that millions of students already use for maths, science, coding and humanities.",
    "Its defining design choice is a refusal. Khan Academy's own description is that Khanmigo \"doesn't just give answers\" and instead \"guides learners to find the answer themselves\" — so a student who pastes in a homework question gets asked what they have tried, rather than a worked solution.",
    "That makes it deliberately slower than a general chatbot, and it is the whole reason to pick it over one. The teacher side of the product is a different thing entirely: lesson plans, practice questions, grading guides and quick classroom checks drawn against Khan Academy's own curriculum, given away free.",
  ],

  beforeYouStart: [
    "**If you teach, it costs nothing.** Khan Academy gives the teacher tools away free to educators aged 18 or over, with no card and no trial clock. A December 2025 update to its own announcement post puts that offer in more than 180 countries and territories, in English plus a set of experimental languages — a much wider reach than the US-only pilot it started as, so if you looked at this a year or two ago, look again. Khan Academy's own pages don't all say the same thing about which countries qualify, so check the list its teacher page links to rather than assuming yours is on it.",
    "For a learner or a parent it is a paid subscription: currently around $4 a month, or about $44 a year. Khan Academy is a donation-funded non-profit and says plainly that the payment supports its mission. The ordinary Khan Academy lesson library stays free whether you subscribe or not — Khanmigo is a layer alongside it, not a change to it.",
    "Those paid plans are US-only. You must be 18 or over with a billing address in one of the 50 states or the District of Columbia. Anyone under 18 cannot hold a Khanmigo subscription at all — a parent or guardian subscribes and adds them, up to 10 children on one account. If you are outside the US and you are not a teacher, there is currently no individual way in.",
    "A student cannot get the tutor through school unless the school has bought it. Khan Academy's FAQ says classroom access is \"only available through school or district implementations\", listed at around $10 per student per year for districts under 1,000 licences. Some US states have funded that centrally — New Hampshire's education department has published free statewide grades 5-12 access, though its post carries dates that may since have moved — so it is worth asking your school before paying yourself.",
  ],

  security: [
    {
      kind: "text",
      text: "This is a tool built for children, and the honest summary is that it is designed to be watched. That is a feature rather than an oversight, but a student should know it before typing.",
    },
    {
      kind: "list",
      label: "What an adult on the account can see",
      items: [
        "A parent or guardian gets the full transcript of their child's Khanmigo conversations from the parent dashboard — not summaries, the chats.",
        "If Khan Academy's moderation system flags a message as inappropriate, harmful or unsafe, it automatically emails an adult connected to the child's account with the details.",
        "In a school or district deployment, administrators also see progress data and Khanmigo chat summaries. Khan Academy says children are told their history is visible to parents or guardians and, where relevant, their teacher and school administrator.",
      ],
    },
    {
      kind: "text",
      text: "On whether student conversations train AI, Khan Academy's clearest published statement covers its districts programme: it says it does not allow the companies behind the AI **models** — the AI \"brains\" doing the thinking — to train on student data, and that names and personal information are not shared with those providers. That page is written about school partnerships. We could not find an equally explicit statement covering individual paid learner and parent accounts, so read the district wording as the strongest thing Khan Academy has on record rather than as a blanket promise.",
    },
    {
      kind: "list",
      label: "How long things stick around, in Khan Academy's own words",
      items: [
        "Khanmigo conversations may stay visible in chat history for up to 365 days after the conversation ends; inactive ones may then be deleted.",
        "Conversations that were flagged, or that you gave feedback on, can be kept for up to two years.",
        "You can delete the whole account from Settings, and Khan Academy says it will try to email you first.",
      ],
    },
    {
      kind: "text",
      text: "Teachers have one rule worth following from day one, and it is Khan Academy's own: its educator guidelines, updated January 2026, tell teachers to keep details that identify a particular student out of Khanmigo queries entirely.",
    },
  ],

  triad: {
    bestAt: [
      "Getting unstuck on a problem without being handed the answer",
      "Turning a teacher's blank hour into a lesson tied to a named curriculum standard",
      "Practising writing and argument, where being asked \"why do you think that?\" is the point rather than the delay",
      "Homework a parent wants to supervise without sitting through it",
    ],
    okayAt: [
      "Subjects Khan Academy's own library covers thinly — it will still talk, but without the exercises and hints the tutoring normally leans on",
      "Coding, where there is real-time feedback but a dedicated coding assistant goes considerably further",
      "College-admissions and career coaching, which are on the learner plan's feature list but sit outside the exercise library the rest of it is built on",
    ],
    avoid: [
      "Extracting a straight answer under time pressure. Pushing harder generally produces more questions, and a student on a deadline will find that maddening rather than helpful.",
      "Trusting its verdict on your maths working. Khan Academy's own engineering blog has said Khanmigo sometimes judges a student right or wrong incorrectly even when it does the arithmetic correctly, and describes attaching a calculator to compensate. Treat \"that's not right\" as a reason to check rather than as a result.",
      "Using anything the teacher tools produce as evidence about a student. Khan Academy's educator guidelines say the tools \"should not be relied upon as the sole basis for performance assessments or decisions about students\", and that they are not a replacement for a teacher's professional judgement.",
    ],
  },

  starterActions: [
    {
      title: "Make it do the thing it was built for (learner)",
      prompt:
        "I'm stuck on this problem and I don't want the answer. Ask me one question at a time to work out where my thinking goes wrong, and stop as soon as I get there myself. Here's the problem, and here's what I already tried: [paste both].",
      whyHere:
        "Asking for exactly the guide-don't-tell behaviour runs with the design instead of fighting it. Ask ChatGPT the same thing and you get a polite imitation that folds the moment you say \"just tell me\".",
      tweak:
        "Once you've got it, swap the last line for \"now explain the step I got wrong three different ways\".",
    },
    {
      title: "Build a lesson from a standard (teacher)",
      prompt:
        "I teach 7th grade math. Build me a 45-minute lesson on ratios and proportional relationships, aligned to my state standard. Include an opening hook, three worked examples at increasing difficulty, a practice set with an answer key, and a four-question check for the last five minutes of class.",
      whyHere:
        "The teacher tools draw on Khan Academy's own exercise bank, so the practice questions arrive with answer keys attached rather than being invented on the spot, and you can send students into the same library afterwards. A general chatbot writes you a plausible worksheet anchored to nothing.",
      tweak:
        "Give it your actual standard code rather than the topic name, and say what your class covered last week.",
    },
    {
      title: "Set up a session you can review afterwards (parent)",
      prompt:
        "My child is 12 and working on fractions. Act as their tutor for the next 20 minutes. Do not give answers. When they get something wrong, ask what they were thinking before you correct it. At the end, write me a three-sentence summary of what they found hardest.",
      whyHere:
        "Asking for the summary only makes sense here because the parent account already holds the transcript — you get the short version now and the full chat to check later. On a consumer chatbot there is no parent account for the summary to be addressed to.",
      tweak:
        "Ask for the summary as bullet points if you want to compare one week to the next.",
    },
    {
      title: "Argue with it (learner)",
      prompt:
        "I'm writing a persuasive essay arguing that school should start later in the morning. Here's my opening paragraph: [paste]. Take the opposite side and give me your three strongest counterarguments, one at a time. Wait for my reply to each before you give the next one.",
      whyHere:
        "Guided writing and debate with immediate feedback is a named learner feature, and Writing Coach is listed as its own component in Khan Academy's district package — so the argumentative back-and-forth is a built product here, not a prompt trick you're improvising on top of a general assistant.",
      tweak:
        "Tell it what grade you're writing at, and ask it to point at where your evidence is thinnest.",
    },
  ],

  pitfalls: [
    "The guardrail is a behaviour, not a lock, and not an anti-cheating measure you can rely on. A determined student can still work around it — asking for a worked example of a very similar problem instead of their own — and Khan Academy describes the tutoring style as guidance rather than a hard block.",
    "Khanmigo is not the Khan Academy you may already know. People subscribe expecting the familiar free lesson library to change once they pay, and it doesn't.",
    "A teacher account and a parent account are different products. Khan Academy's help centre notes that a teacher who wants the full tutoring feature set signs up for the paid parent plan and switches on the teacher role in settings — the free teacher sign-up gets you the teacher tools, not the student-facing tutor.",
    "It falls off sharply outside school subjects. Khan Academy scopes it to elementary-through-college academic work — maths, science, coding, history, humanities. It is not the thing to reach for when you want a work email drafted.",
  ],

  whereToNext: [
    { label: "More education and learning tools", categorySlug: "education-learning-ai" },
    { label: "Research and study tools", categorySlug: "research-academic-tools" },
    { label: "General AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
