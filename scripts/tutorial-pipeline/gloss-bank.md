# Gloss bank — shared plain-words definitions

**Purpose.** Tutorial pages were each inventing their own explanation of the same terms, and
in one case contradicting each other: Leonardo called its spending unit "tokens" while
Groq, Windsurf and Claude Code used "tokens" to mean units of text. A reader moving between
pages met two meanings and no acknowledgement of either.

**Rule.** When a term below appears on a page for the first time, gloss it inline using
**this wording or a close paraphrase of it**. Do not invent your own. Twelve words or fewer,
in parentheses or as an appositive, at the point of first use — not in a separate glossary
section, not later on the page.

The spec's define-on-first-use rule caps a page at **2-3 inline glosses**. That is a
deliberate ceiling, not a target: a page needing six glosses is a page written at the wrong
altitude. If more than three terms here appear on your page, the answer is to cut the
jargon, not to add glosses. See `writing-standard.md`.

---

## Core — a beginner cannot read the page without these

| Term | Gloss |
|---|---|
| model | the AI "brain" that does the actual thinking |
| prompt | the message you type |
| credits | the platform's unit of spend — each thing you make costs some |
| token | a chunk of text, roughly a short word — how AI usage gets counted |
| API | a way for programs to talk to each other without a person clicking |
| API key | a password that identifies your app, and that spends your money |
| agent | AI that takes actions on its own rather than only answering |
| open-source | the code is public and anyone can inspect it |
| self-hosted | you run it on your own computer or server, not the company's |
| watermark | a mark on generated output identifying it as AI-made |
| LLM | large language model — the kind of AI that reads and writes text |

## Automation pages

| Term | Gloss |
|---|---|
| trigger | the "when" — the event that starts an automation |
| action | the "then" — what happens once the trigger fires |
| node | one step in a workflow, shown as a box you connect to others |

## Local and technical pages

| Term | Gloss |
|---|---|
| RAM | your computer's short-term memory — what runs out when too much is open |
| parameters | a rough measure of a model's size — more is smarter but heavier |
| quantization | shrinking a model to fit in less memory, at some cost to quality |
| terminal | a text window where you type instructions instead of clicking |
| Docker | a way of running an app in a self-contained box, so you don't install its parts by hand |
| repository | a folder of code, tracked so you can see and undo every change |
| IDE | the program a developer writes code in |
| open-weight | the model file itself is published, so you can run it yourself |
| inference | the act of running a model to get an answer out of it |
| rate limit | a cap on how often you can ask, which resets |
| context window | how much text the model can hold in mind at once |

## Business and legal

| Term | Gloss |
|---|---|
| NDA | a signed agreement not to share someone's confidential information |
| CRM | the system a sales team keeps its customer records in |
| GDPR | European privacy law governing what companies may do with your data |
| SOC 2 | an audit of how a company handles customer data |

---

## Two standing corrections

**"Credits" versus "tokens".** *Credits* always means a unit of spend. *Tokens* always means
a chunk of text. Where a vendor's own interface calls its spending balance "tokens" — as
Leonardo does — write **"credits (Leonardo calls them tokens)"** and use "credits"
thereafter. Never let a page use "tokens" to mean money without that flag.

**Vector.** On design pages: *an image made of shapes, so it stays sharp at any size —
unlike a photo, which blurs when you enlarge it.* Worth the words; it is the whole reason a
reader would choose a vector tool.
