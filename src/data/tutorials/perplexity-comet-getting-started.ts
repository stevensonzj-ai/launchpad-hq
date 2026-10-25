import type { PlatformTutorialData } from "./types";

export const perplexityCometTutorial: PlatformTutorialData = {
  slug: "perplexity-comet-getting-started",
  platformSlug: "perplexity-comet",
  title: "Getting Started with Perplexity Comet",
  tagline:
    "A full web browser with an AI assistant built in — it can read the page you're on and, if you let it, click and type on it for you.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You install Comet and browse the web as you would in any other browser. When you want help, you open the assistant panel beside the page and type a request in plain words. It reads the page you're on and answers, or clicks and types on the page itself while you watch, stopping to ask before anything important.",

  whatItIs: [
    "Comet is a web browser made by Perplexity, the company behind the Perplexity AI search app (which has its own page on this site). It looks and behaves like Chrome — Perplexity's help centre says most Chrome extensions (add-ons) work in it — but every page you open has an assistant beside it that can read that page, summarise it, compare it with your other open tabs, and draft replies from it.",
    "The bigger difference is that the assistant can also act. Comet works as an agent (AI that takes actions on its own rather than only answering): Perplexity's own guide describes it comparing products and going through to checkout, searching your inbox once you connect Gmail, and moving meetings on your calendar. That ability is the reason to choose Comet over a chatbot in a separate tab, and it is also the reason this page spends more time than usual on safety.",
    "Google now builds a similar assistant into Chrome itself, so 'a browser with AI in it' is no longer unusual. What Comet gives you is a browser built around the assistant from the start, with Perplexity's search underneath and its own set of controls for limiting what the assistant can touch.",
  ],

  beforeYouStart: [
    "You can start for nothing. Perplexity says it will always provide a free version, and that the free version includes Comet. It also sells paid plans — Pro at {{price:perplexity-comet:Pro}} and Max at {{price:perplexity-comet:Max}} — but Perplexity's public pages, as checked for this guide, don't spell out what either adds inside the browser, so download the free version and see whether you hit a wall before paying for anything.",
    "Comet is something you install, not a website. Perplexity lists it for Mac, Windows, iPhone and Android; Linux isn't on that list. Perplexity's setup guide has you sign in to a Perplexity account the first time you open it, so expect to create one if you don't have one.",
    "Moving over is quick. Comet can bring in your bookmarks, history and saved passwords from the browser you use now (Settings → import bookmarks and settings), and you don't have to make it your default browser to try it — running it alongside your current one is a sensible way to start.",
    "The assistant becomes most powerful, and most risky, on sites where you're already logged in — your email, calendar, shopping accounts. Read the security section below before you connect any of those.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download Comet only from Perplexity's own site — perplexity.ai/comet, or the download page its help centre links to at perplexity.ai/download-comet. The download button sends you through a Perplexity link-redirect address (perplexity.sng.link) on the way to the installer; that's expected. Don't install a 'Comet' from a search ad, a download-bundle site or a link someone sent you: a browser sees every site you log in to, so a fake one is about the worst thing you can install.",
    body: [
      "On a phone, follow the link from perplexity.ai/comet rather than searching your app store for 'Comet', where similarly named apps can turn up.",
      "When you import from your old browser, you choose what comes across — bookmarks, history, passwords. Bringing passwords is optional; you can leave them behind and add them later.",
      "Comet updates itself when you relaunch it. You can check for updates by hand under Settings → About — worth doing now and then, because several of the security fixes described below arrived as updates.",
      "Your 'it works' checkpoint: open any article, open the assistant panel, and ask it to summarise the page. A summary that matches what's on screen means you're set up.",
    ],
    vendorDocsUrl:
      "https://www.perplexity.ai/help-center/comet/en/articles/11583745-getting-started-with-comet-set-up",
  },

  security: [
    {
      kind: "text",
      text: "An assistant that reads web pages can be tricked by the pages it reads. Text hidden in a page — white-on-white, tucked inside a comment, faint lettering in an image — can carry instructions the assistant mistakes for yours, and in Comet those instructions can reach whatever you're logged in to. This is not hypothetical. Between August 2025 and February 2026, outside researchers publicly demonstrated it in Comet several times: Brave showed a hidden Reddit comment steering Comet, when asked to summarise the page, into reading a one-time login code from the user's open Gmail and posting it back to the attacker; LayerX showed a single crafted link doing similar work; and Zenity Labs showed a booby-trapped calendar invite leading Comet into a logged-in 1Password vault. Perplexity fixed the issues as they were reported — not always on the first attempt, and Brave said in its own update that the August 2025 attack had not been fully mitigated — and Perplexity itself commissioned a security firm to attack Comet before launch.",
    },
    {
      kind: "list",
      label: "What Perplexity has built, and what's still on you:",
      items: [
        "Comet asks before the high-stakes steps. Perplexity says it pauses for your approval before sending an email or message, changing your calendar, placing a final order, or filling in personal details it doesn't already have — even when nothing looks suspicious. Read what it's about to do before you approve; that confirmation is the last line of defence.",
        "Block the sites that matter most. Settings → Privacy and security → Comet Assistant lets you switch the assistant off entirely or list sites it must never act on or read. Perplexity's own example is your bank.",
        "Be selective about what you connect. Every account you link, and every site you stay logged in to, widens what a hidden instruction could reach. Don't connect your work email to a personal experiment.",
        "Perplexity also says it scans the pages Comet retrieves for hidden instructions and tells you when it blocks something. That's a filter, not a guarantee — researchers have repeatedly found ways past such filters.",
      ],
    },
    {
      kind: "text",
      text: "On what leaves your computer, Perplexity's help centre says the assistant doesn't upload your browsing history, cookies, saved passwords or local files by default, and sends page content to Perplexity only when a request needs it — asking it to summarise the tab you're on, for example. When it does, Perplexity says that context is kept for up to 30 days and then deleted automatically; those conversations appear as 'Temporary threads' in your Perplexity library, where you can delete them sooner. It also says it doesn't sell this data.",
    },
  ],

  triad: {
    bestAt: [
      "Questions about the page you're already on — summarising it, pulling out dates or steps, translating a section — without copying anything into another app",
      "Comparing several open tabs at once, by mentioning each tab in your request",
      "Repetitive web chores you'd happily hand off and then check — building a basket for review, gathering options into one list",
    ],
    okayAt: [
      "Multi-step tasks on unfamiliar or busy sites. The agent can get there, but it's slower than doing it yourself while you're still learning to trust it",
      "Being your everyday browser. It's a capable Chrome-style browser, but you're switching browsers to get the assistant, not for the browsing itself",
    ],
    avoid: [
      "Letting the assistant loose on a page you don't trust while you're logged in to email, banking or a password manager — the documented attacks above all worked through exactly that combination",
      "Assuming every site welcomes it. Amazon sued Perplexity over Comet shopping on Amazon; a court blocked it in March 2026, an appeals court lifted that block in August 2026, and the underlying case is still undecided",
    ],
  },

  starterActions: [
    {
      title: "Summarise a page you trust",
      prompt:
        "Summarise this page in five bullet points, then list any dates, prices or deadlines it mentions.",
      whyHere:
        "Each time you send a request, Comet pulls in the visible text, headlines and details of the page you're on — so a summary is the natural first test. Start on a site you trust: the Brave attack described above came through exactly this kind of request, which is why the page you ask about matters in Comet in a way it doesn't in a chatbot that never sees your logged-in tabs.",
      tweak:
        "Add another open tab with `@` — for example, '@ the other review: where do these two disagree?' — to compare pages side by side.",
    },
    {
      title: "Block your bank before you do anything else",
      whatItDoes:
        "Go to Settings → Privacy and security → Comet Assistant and add the sites the assistant should never read or act on — your bank, your password manager, anything financial.",
      whyHere:
        "Comet's block list is the one control that works before any page gets a chance to say anything to the assistant — a blocked site isn't used for tasks or as context at all. It's a two-minute job.",
    },
    {
      title: "Hand over a task where nothing is lost if you say no",
      prompt:
        "Build a grocery cart with the ingredients for lasagna for four people, ready for me to review before checkout.",
      whyHere:
        "This is an example from Perplexity's own use-case guide, and it lets you watch the agent click through a site, then meet the pre-order confirmation described in the security section. Declining at that point costs you nothing, so it's the safe way to learn what an approval request looks like before one matters.",
      tweak:
        "Use a store you already have an account with, and say no at the confirmation the first time. Some stores object to AI shopping (see the Amazon case above), so expect some sites to behave differently.",
    },
    {
      title: "Save a request you'll repeat as a shortcut",
      whatItDoes:
        "Type `/` in the search bar or assistant panel, choose 'Create a shortcut', write the request once, name it, and from then on call it up by typing `/` and its name.",
      whyHere:
        "A Comet shortcut stores more than your wording — it also saves which Perplexity search mode, AI model and sources to use — and choosing it fills in the request without sending it, so you can add details first. It's a way to make Perplexity's search behave the same way every time without retyping your instructions.",
      tweak:
        "Good first shortcuts: 'summarise this page for a busy reader', or 'find the cancellation policy on this site'.",
    },
  ],

  pitfalls: [
    "The first time an advanced task runs, Comet asks whether to allow it this time only, always, or not at all. Choose 'this time' until you've seen it work a few times. 'Always' removes a check you may later want back.",
    "Confusing Comet with Perplexity. Perplexity's answer engine is a website and app you ask questions in; Comet is the browser built around it. Help articles and settings for one don't always apply to the other.",
    "Walking away mid-task. The assistant works while you carry on browsing, and you can run several tasks at once — but on a logged-in site, keep an eye on what it's doing rather than coming back later to see what happened.",
  ],

  whereToNext: [
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Perplexity (the answer engine)", href: "/platform/perplexity-ai" },
    { label: "Research AI", categorySlug: "research-academic-tools" },
  ],
};
