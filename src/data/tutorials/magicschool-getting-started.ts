import type { PlatformTutorialData } from "./types";

export const magicschoolTutorial: PlatformTutorialData = {
  slug: "magicschool-getting-started",
  platformSlug: "magicschool",
  title: "Getting Started with MagicSchool",
  tagline:
    "A library of AI tools built for teachers — lesson plans, quizzes, rubrics, rewritten texts — plus safe, teacher-controlled AI rooms for students.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://help.magicschool.ai/en/articles/12386023-what-s-new-tools-features",
  accessTier: "FREE",

  howItWorks:
    "Instead of one blank chat box, MagicSchool gives you a menu of single-purpose tools. You pick one — say, the Lesson Plan Generator — fill in a short form with your grade, topic and goals, and it drafts the material. You then refine it with **Raina**, MagicSchool's built-in AI assistant, and export it to Google Docs, Slides, Word or PowerPoint.",

  whatItIs: [
    "MagicSchool is an AI platform made for schools. Its site lists more than 80 tools for teachers and more than 50 for students. Each tool does one job — writing a lesson plan, building a rubric, making a multiple-choice quiz, generating a worksheet, rewriting a text at a different reading level — and asks for the details that job needs, so you don't have to work out how to prompt a general chatbot.",
    "**Raina** is the assistant that runs through it. MagicSchool describes it as working inside every tool to rewrite, differentiate, add questions or make variations of what you just generated, and its September 2026 update says it now uses the grade and subject you saved at sign-up to tailor answers.",
    "The student side is called **MagicStudent**. Teachers create a **Student Room**, choose which AI tools students can use, and monitor the activity. Students join with a link, code or QR code — or through Google Classroom — and MagicSchool's help centre says no student account is needed to join a room. Students can't chat with each other.",
    "Finished work can go where you already teach: presentations export to Google Slides or PowerPoint, formatting carries over into Google Docs and Word, and multiple-choice quizzes can export to Google Forms. Deeper connections to Canvas, Schoology, Clever and ClassLink are, per the help centre, for Enterprise (school or district) customers only.",
  ],

  beforeYouStart: [
    "**It's for educators, free to start.** You sign up as \"An Educator\" with an email and password, or with Google or Microsoft. MagicSchool's terms say educators use it as a professional aid for their work at a school, not for personal use, and must not let students or other minors use their teacher account.",
    "**Free means 20 generations a week.** MagicSchool's help centre says the free plan includes 20 AI generations per week; every tool output, refinement and Raina reply counts as one, while student use doesn't count. The count resets every Sunday at midnight UTC. Some features, such as Class Writing Feedback, have their own separate limits.",
    "**Plus removes the weekly cap.** The pricing page lists MagicSchool Plus at $12.99 a month billed monthly, or $99.96 a year (shown as $8.33 a month) billed annually. Plus adds unlimited generations, output history, and the full set of student tools. Schools and districts can request Enterprise pricing, which adds a data privacy agreement, single sign-on and LMS integrations.",
    "**Refunds have a short window.** MagicSchool's FAQ says refunds are given only if you ask within 14 days of your most recent payment.",
  ],

  security: [
    {
      kind: "text",
      text: "The rule that matters most: **don't type students' personal details into MagicSchool** — names, ID numbers, health or behaviour records — unless your school has a data privacy agreement with MagicSchool that covers it. Its terms ask users not to provide students' personally identifiable information and say breaking that can get an account suspended. Write \"Student A\" instead of a name; the tools work just as well.",
    },
    {
      kind: "list",
      label: "What MagicSchool says about data and safety:",
      items: [
        "Its homepage says it doesn't use student or teacher data to train AI, and its help centre says the AI providers it uses are contractually barred from training on user data.",
        "It describes itself as SOC 2 certified and FERPA/COPPA compliant, with iKeepSafe certification for both; details are on its Trust Center.",
        "In Student Rooms, unsafe language is flagged to the teacher's dashboard, and teachers can pause or lock a room or remove a student. Since September 2026, student chat threads close after about 50 messages and students are reminded they are talking to an AI.",
      ],
    },
    {
      kind: "text",
      text: "MagicSchool's terms are blunt that output can be incorrect or \"fictitious\" and must be reviewed. Check facts, dates and answer keys yourself, and watch for bias, before anything reaches students.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a topic and a grade level into a usable first draft of a lesson plan, worksheet or quiz in a couple of minutes.",
      "Differentiation — rewriting the same text or task at several reading levels, or making variations for different groups.",
      "Giving students AI access in a room you control, with tools you've chosen and activity you can see.",
    ],
    okayAt: [
      "Accuracy in specialist subjects. Drafts are a starting point; answer keys and facts need checking.",
      "Heavy daily use on the free plan — 20 generations go quickly once you start refining.",
    ],
    avoid: [
      "Entering real student names or records without a school data agreement.",
      "Handing generated material to students without reading it first.",
    ],
  },

  starterActions: [
    {
      title: "Plan tomorrow's lesson",
      prompt:
        "Grade 7 science, 45-minute lesson on the water cycle. Students should be able to explain evaporation, condensation and precipitation in their own words. Include a 5-minute warm-up and a quick exit ticket.",
      whyHere:
        "Paste this into the Lesson Plan Generator, one of MagicSchool's most-used tools. Giving a time, a learning goal and the parts you want gets a plan you can actually teach from, rather than a generic outline.",
      tweak: "Swap in your own grade, subject and standard.",
    },
    {
      title: "Level a reading passage",
      prompt:
        "Rewrite this passage for a 4th-grade reading level. Keep every key fact, use shorter sentences, and define any word a 9-year-old might not know: [paste your text]",
      whyHere:
        "Use the Text Rewriter — MagicSchool's most-used teacher tool in 2025. It's the fastest way to give the same content to students reading at different levels.",
    },
    {
      title: "Build a quick check for understanding",
      prompt:
        "10 multiple-choice questions on the causes of World War I for 10th graders, with one clearly correct answer each and plausible wrong answers. Include an answer key.",
      whyHere:
        "Use the Multiple Choice Quiz tool, then export to Google Forms if you use it. Check every answer in the key — this is where AI mistakes cost you most.",
    },
    {
      title: "Refine instead of starting over",
      prompt:
        "Make this easier for students who are still learning English, and add a short word bank at the top.",
      whyHere:
        "Ask Raina this after any tool gives you a draft. Refining keeps what already works — though on the free plan each refinement counts as one of your 20 weekly generations.",
    },
    {
      title: "Test a Student Room yourself first",
      prompt:
        "Explain photosynthesis to me like I'm in 6th grade, then ask me three questions to check I understood.",
      whyHere:
        "Create a Student Room with one tool, then join it yourself and type this as a student would. MagicSchool's help centre recommends testing rooms before students use them, so you see exactly what they'll see.",
    },
  ],

  pitfalls: [
    "**Burning free generations on small tweaks.** Every Raina refinement counts; batch your changes into one request.",
    "**Assuming integrations come with a teacher account.** Canvas, Schoology, Clever and ClassLink connections are Enterprise-only.",
    "**Using your own account for students.** Students should join through a Student Room, not log in as you.",
    "**Forgetting a yearly plan renews.** Note the date — refunds are only possible within 14 days of a payment.",
  ],

  whereToNext: [
    { label: "More education & learning AI", categorySlug: "education-learning-ai" },
    { label: "Research tools for building lessons", categorySlug: "research-academic-tools" },
    { label: "Image tools for classroom visuals", categorySlug: "image-generation-editing" },
  ],
};
