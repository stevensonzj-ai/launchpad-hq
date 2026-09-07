> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `tutorial-reference-pages.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# LaunchpadHQ — Tutorial Reference Pages (validated worked examples)

**Companion to:** `tutorial-template-spec.md`. These are the three pilot pages that validated the format, one per archetype. Use them as the gold-standard shape/voice/depth when writing or specifying new pages (incl. a future Fable brief).

**What's reviewed vs. layered in:** The *structure, voice, security-posture divergence, and section-5 archetype handling* below are what was reviewed and approved during the format-validation pass. The **"How it works" on-ramp line, inline term glosses, and the hedged "will you pay" beat** were added afterward to match the spec's beginner-lens rules (spec §7) — they're consistent with the spec but are drafts open to edit. Volatile specifics (prices, limits) are written to *mechanism* per spec §4 and any numbers are ballpark + shelf-life-governed by `lastReviewedAt`; re-verify at production time.

---
---

# 1. ChatGPT — Starter Guide
**Archetype:** Prompts · **Security posture:** Cloud, trains-your-data

*A beginner's first 20 minutes with the most popular AI chatbot.*

**How it works:** You type a message (this is called a **prompt**), the AI types back in plain language, and you can keep the conversation going — including telling it to redo or improve an answer.

**What it is:** ChatGPT is OpenAI's general-purpose AI assistant — the one most people mean when they say "AI." It's the best default starting point for a beginner because it does a little of everything competently, before you graduate to specialized tools.

### Before you start
- **Free to use** with a sign-up (email, Google, or Apple). No card required. **First step:** go to chat.openai.com, sign up free, and you're in.
- **Will you need to pay?** The free tier is plenty for casual use — learning, drafting, brainstorming. You'd only pay (Plus, currently around **$20/month**) if you want the best models reliably or hit the limits often. Paying buys better models, *not* more privacy (see below).
- The free tier has **usage limits that reset on a rolling few-hour window.** When you hit them, ChatGPT quietly swaps you to a smaller, faster **model** (the "model" is the AI brain doing the work — there are smarter-but-slower and faster-but-simpler ones). Answers get noticeably shallower with no big warning. If a reply suddenly feels worse, that's usually why. Limits also tighten when OpenAI is busy.

### Privacy & what not to share
ChatGPT is mainstream and reasonably well-run, but it's a cloud service, and on the free tier **your conversations are used to train OpenAI's models by default.** Good rule for any AI chatbot: treat everything you type as if a stranger might eventually read it.
**Never paste in:** passwords, bank/card numbers, Social Security numbers; medical records tied to your name; other people's private info; confidential or proprietary work material (several companies have banned employees from doing exactly this).
**Two settings worth knowing day one:** turn off training under Settings → Data Controls → "Improve the model for everyone" (Plus does *not* do this for you); use **Temporary Chat** for one-off sensitive questions. Note "temporary"/"deleted" still isn't instant — OpenAI holds data ~30 days either way. None of this makes normal use unsafe; the box just isn't a vault.

### What it's genuinely good at
Brainstorming and getting unstuck; rewriting and reshaping text; explaining things at your level ("explain X like I'm new to it"); drafting first versions you then refine.

### What it's only okay at
Math and precise logic (check the numbers); current events (it can search the web, but limited on free — don't assume it knows this week's news); coding (competent for small stuff and learning; dedicated tools do better).

### What to avoid using it for (for now)
Anything where being wrong has real consequences (legal, medical, financial — it sounds equally confident when wrong); facts you can't verify, *especially sources and citations* (it invents plausible ones); truly current or niche info on free.

### 5 starter prompts to see what it can do
Run these, then change the bracketed parts.

1. **The explainer (its best trick):** *"Explain how [compound interest] works to someone who's never heard of it. Use a simple real-life example, keep it under 150 words, and end with one thing people most often get wrong about it."* — Strongest when you give it topic + audience + length + focus at once.
2. **The rewriter (format control):** *"Here's a rough message to my landlord about a broken heater: '[paste].' Rewrite it three ways — polite, firm, urgent — each under four sentences."* — "Give me options" works for almost any writing task.
3. **The thinking partner (back-and-forth):** *"I'm deciding between [two options]. Ask me five questions one at a time to help me think it through — don't give your opinion yet. Wait for each answer."* — This is where a chatbot beats a search engine.
4. **The role-player (practice):** *"Act as a friendly interviewer for a [retail job]. Ask one common question, wait for my answer, give brief feedback, then continue until I say stop."* — Same pattern works for language practice or tricky conversations.
5. **The organizer (structure from mess):** *"Turn this brain-dump into a clean weekly plan as a table, grouped by day, with a 'must-do' and 'nice-to-have' each: '[dump].'"* — Good at imposing structure on chaos.

### 5 beginner pitfalls to avoid
1. **It sounds confident even when wrong** — a made-up answer reads as smoothly as a correct one. Verify anything factual.
2. **It invents sources, quotes, and citations** — search for the real thing yourself.
3. **The free tier downgrades you mid-session** — quality quietly drops when you hit the cap; that's the cause, not you.
4. **It doesn't truly remember** — within one chat it follows along; a new chat is a blank slate, and very long threads "forget" the top. One task, one conversation.
5. **Taking the first answer** — the whole point is the follow-up: "shorter," "more casual," "you missed X." Tries two and three are where it gets good.

### Where to go next
[→ Browse image generators] · [→ Browse AI coding tools] · [→ Browse research tools]

---
---

# 2. Zapier — Starter Guide
**Archetype:** Recipes / workflows · **Security posture:** Connects-your-accounts (master key)

*Connect the apps you already use and let them talk to each other — no code.*

**How it works:** You build little automations called **Zaps**. Each has a **trigger** (the "when" — something that happens in one app) and an **action** (the "then" — what should happen in another). You set them up by clicking through menus, not writing code.

**What it is:** Zapier is the duct tape of the internet. It links apps that don't naturally work together — Gmail, Slack, Google Sheets, your calendar, hundreds more — so when something happens in one, something automatically happens in another. The go-to first step for anyone repeating the same copy-paste between two apps.

### Before you start
- **Free to start**, no card. You connect your *existing* accounts (your real Gmail, real Slack), so Zapier acts on your behalf in them — keep that in mind from the first click. **First step:** sign up at zapier.com, connect one app you use, and try a starter Zap below.
- **Will you need to pay?** Free is fine for a couple of simple automations. The free plan currently gives ~**100 "tasks" a month** (one task = one automated action that runs) and limits you to **two-step Zaps** (one trigger + one action — note "two steps" because the trigger is the other step). A busy automation burns 100 tasks fast, sometimes in a week. You'd move to paid (roughly the low tens of dollars/month) for multi-step flows or more volume.
- Out of tasks, automations pause rather than vanish — they queue and re-run after reset.

### What Zapier is genuinely good at
Connecting two apps that don't talk to each other ("new form submission → add a spreadsheet row → ping me on Slack"); killing repetitive copy-paste; letting non-technical people automate without code.

### What it's only okay at
Complicated multi-branch logic (possible on paid, but fiddly — Make/n8n handle complex flows more cleanly); instant reactions (lower tiers *check* on a schedule, so "real-time" can mean minutes).

### What to avoid using it for (for now)
High-volume automation (per-task pricing gets expensive); using it as a database or for heavy data crunching (it *moves* data, doesn't store it); can't-fail-for-a-second workflows on free.

### 3 starter automations to try
There are no "prompts" — you build workflows. Swap in your own apps.
1. **Never lose a form lead:** *When* someone submits your Google Form/Typeform → *then* add a row to a Google Sheet. A two-step classic with instantly visible payoff.
2. **Turn starred emails into a to-do:** *When* you star a Gmail email → *then* create a task in Todoist/Trello. Teaches that *your* action can be the trigger.
3. **Get a heads-up when something matters:** *When* a new row hits a specific Sheet → *then* Slack/email yourself. Notifications are the most satisfying first payoff.

### 4 beginner pitfalls to avoid
1. **You'll burn free tasks faster than you think** — before turning a Zap on, ask "how often will this realistically fire?"
2. **Always test before switching on** — a misconfigured Zap can fire a hundred times, spamming and torching your task budget. Use the test step every time.
3. **The free two-step limit bites mid-build** — know the ceiling before planning a clever four-step flow.
4. **Set-it-and-forget-it cuts both ways** — a Zap from months ago is still running. Keep a mental list of what's on.

### Security & what to watch
Different from a chatbot: the risk isn't what you *type*, it's what you *connect*. Zapier holds ongoing login access to every app you link, making your account a **master key** — if someone got in, they could reach everything connected. So: **lock down the Zapier account itself** (strong unique password + two-factor, more important here than most tools); **connect only apps you need** and disconnect unused ones; **be thoughtful about sensitive apps** — data in a Zap passes through Zapier's servers, so think twice before routing banking/health/confidential info.

### Where to go next
[→ Browse Workflow & Automation tools] · [→ Browse Meetings & Notes tools]

---
---

# 3. Ollama — Starter Guide
**Archetype:** Pick-and-set-up (local) · **Security posture:** Private-by-default (inverted)

*Run AI models privately on your own computer — no account, no fees, nothing sent to the cloud.*

**How it works:** You download the Ollama app, then "**pull**" (download) an AI **model** onto your own computer and chat with it — everything runs locally, with nothing sent online.

**What it is:** Ollama lets you run AI models directly on your machine. Nothing you type leaves your computer, there's no monthly bill, and it works offline. The most popular on-ramp to "local AI" — the opposite trade-off from ChatGPT: you give up some quality and do a little setup, and get complete privacy and unlimited free use. Be honest with yourself first — this one's a step more technical.

### Before you start
- **Free and open-source** (the code is public and free to use). No account, no card, no usage limits ever.
- **Your computer does the work, so hardware matters.** Rough floor: about **8 GB of RAM** (your computer's short-term working memory — on Windows, check Task Manager; on Mac, "About This Mac") to run a small-to-mid model smoothly. Underpowered = slow or won't run. This is the main thing deciding whether Ollama is pleasant or painful.
- **A little more hands-on.** There's a desktop app now, but most guides use a few simple typed **command line** instructions (a text window where you type commands instead of clicking). Once a model's running, chatting feels just like ChatGPT.

### Getting set up safely
Because this runs on *your* computer, doing setup right matters more than a site you just log into.
- **Download only from the official site — ollama.com.** The one that matters most: don't grab it from a random search result, bundle site, or a link someone sent — lookalike sites can bundle malware, and you're installing on your own machine. *(→ official install guide for your exact Mac/Windows/Linux steps.)*
- **Check your hardware before you install, not after.** Confirm ~8 GB RAM free before committing.
- **Know where the models live.** Leave the install location at its default. The thing to watch: downloaded **models** are several gigabytes each and pile up on your hard drive (a model's size is often shown in "**parameters**" — a rough proxy for how big/smart it is; more is smarter but heavier).
- **Confirm it works:** running one small model and getting a reply is your "set up correctly" checkpoint.

### What Ollama is genuinely good at
Privacy (prompts/files never leave your machine — right for genuinely sensitive material); free, unlimited use; working offline; learning how AI actually works by tinkering.

### What it's only okay at
Raw quality (local models are smaller than giant cloud ones — useful, not magic); speed (entirely down to your hardware).

### What to avoid using it for (for now)
Expecting frontier-level answers (if you want the best and don't care about privacy, cloud wins); running big models on weak hardware (fastest route to a bad first impression); if you just want to chat and aren't technical (start with ChatGPT, return when privacy or cost is a real reason).

### First models to try (matched to your computer)
You pick a *model* and run it, then talk to it like any chatbot.
1. **Modest computer (~8 GB RAM):** start with a small general model (~3–4 billion parameters, e.g. a small Gemma or Llama) — loads fast, confirms everything works. Don't judge local AI by a tiny model.
2. **More room (16 GB+ RAM):** step up to a 7–8B general model — the sweet spot where local AI starts feeling genuinely useful.
3. **Coding-focused:** pull a code-specific model — a free, private coding helper with no per-token cost, the reason many people install Ollama.

*(First run of any model is slow — it's loading into memory, not broken. After that it's quick.)*

### 4 beginner pitfalls to avoid
1. **Biting off too big a model** — the #1 mistake; a model your RAM can't handle makes you wrongly conclude "local AI is bad." Start small.
2. **Expecting ChatGPT quality** — impressive for what it is; calibrate.
3. **Models quietly eating disk** — gigabytes each; check with `ollama list`, delete with `ollama rm`.
4. **Accidentally opening it to the network** — it defaults to your machine only (safe). If a tutorial says expose it to "0.0.0.0" or your network, understand you may be letting others reach your model — don't, unless you know exactly why.

### Security & what to watch
Here the usual warning **flips**. Because Ollama runs entirely on your computer, it's the *most* private option — the "never paste sensitive data" rule for cloud chatbots mostly doesn't apply, since nothing is sent anywhere. Two caveats keep it that way: **keep it local** (leave the defaults; the one way to undo the privacy benefit is exposing it to your network/internet); **get models from trusted sources** (stick to the official model library, like any software you download and run).

### Where to go next
[→ Browse Local & Open-Source AI] · [→ Browse Text & Conversational AI]
