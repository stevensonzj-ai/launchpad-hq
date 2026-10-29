# Stale-facts batches (2026-10-29)

Source: the Platforms sheet of `launchpad-content-tracker-2026-10-29-v2.xlsx`
(generated 2026-10-29 16:30 CDT from production), cross-checked against
`src/data/facts/` (none of these rows has a fact file) and the MCP catalog
snapshot (`src/lib/mcp/catalog-snapshot.json`, for the row text).

## How the group was selected

- **Priority group (73 rows):** `Source links = N` (no fact file with a
  source URL) **and** `Record updatedAt` on or before 2026-05-31. Rows dated
  2026-04-13 come from the original import; rows dated 2026-05-12 from the May
  taxonomy restructure.
- **Excluded:** hidden rows (`adobe-sensei-firefly-in-cc`,
  `canva-magic-studio`; also `clarifai`, `kakao-brain-karlo`, `relay-app`,
  which have fact files) and the rows just done in #115/#116 (Tabnine,
  Clarifai, Hermes Agent, Canva, Lindy, Scite, Activepieces). No row in the
  group carries a discontinued / "what happened" notice.
- **Why 73 + 19 and not ~87:** the brief estimated ~87. By the strict rule
  above the count is 73. A further 19 rows also have no source links and
  pricing text with no "as of" date at all, but their `updatedAt` was bumped
  in October by audits that touched other fields (renames, references,
  tier-only fixes). Their pricing facts are as old as the import, so they are
  listed as batch 4 rather than dropped. Together that is 92.
- **Order:** oldest `updatedAt` first (exact timestamp), then slug. 41 rows
  share the oldest import timestamp, so batch 1 inside that tie is
  alphabetical.

## Batches

| Batch | Rows | Status |
|---|---|---|
| 1 | 1–28 | This PR (facts verified 2026-10-29, catalog audit 17) |
| 2 | 29–51 (23) | Open |
| 3 | 52–73 (22) | Open |
| 4 | 74–92 (19, undated text) | Open |

## Full ordered list

| # | Batch | Platform | Slug | Category | Record updatedAt |
|---|---|---|---|---|---|
| 1 | 1 | AI21 Labs (Jamba) | `ai21-labs-jamba` | International & Regional AI | 2026-04-13 |
| 2 | 1 | Connected Papers | `connected-papers` | Research & Academic Tools | 2026-04-13 |
| 3 | 1 | Consensus | `consensus` | Research & Academic Tools | 2026-04-13 |
| 4 | 1 | Docsumo | `docsumo` | Document & PDF Processing | 2026-04-13 |
| 5 | 1 | Figma AI | `figma-ai` | AI Plugins for Business Software | 2026-04-13 |
| 6 | 1 | Fireworks AI | `fireworks-ai` | AI APIs & Developer Services | 2026-04-13 |
| 7 | 1 | GPT Image 1.5 (DALL-E successor) | `gpt-image-1-5-dall-e-successor` | Image Generation & Editing | 2026-04-13 |
| 8 | 1 | GPT4All | `gpt4all` | Local & Open-Source AI | 2026-04-13 |
| 9 | 1 | Groq | `groq` | AI APIs & Developer Services | 2026-04-13 |
| 10 | 1 | Gumloop | `gumloop` | Workflow & Automation | 2026-04-13 |
| 11 | 1 | HubSpot AI | `hubspot-ai` | AI Plugins for Business Software | 2026-04-13 |
| 12 | 1 | Hugging Face | `hugging-face` | Local & Open-Source AI | 2026-04-13 |
| 13 | 1 | Jan | `jan` | Local & Open-Source AI | 2026-04-13 |
| 14 | 1 | Litmaps | `litmaps` | Research & Academic Tools | 2026-04-13 |
| 15 | 1 | llama.cpp | `llama-cpp` | Local & Open-Source AI | 2026-04-13 |
| 16 | 1 | LM Studio | `lm-studio` | Local & Open-Source AI | 2026-04-13 |
| 17 | 1 | LocalAI | `localai` | Local & Open-Source AI | 2026-04-13 |
| 18 | 1 | Ludo AI | `ludo-ai` | Gaming & Creative AI | 2026-04-13 |
| 19 | 1 | Mailchimp AI | `mailchimp-ai` | AI Plugins for Business Software | 2026-04-13 |
| 20 | 1 | Meshy | `meshy` | Gaming & Creative AI | 2026-04-13 |
| 21 | 1 | Nanonets | `nanonets` | Document & PDF Processing | 2026-04-13 |
| 22 | 1 | Pabbly Connect | `pabbly-connect` | Workflow & Automation | 2026-04-13 |
| 23 | 1 | Paperpal | `paperpal` | Research & Academic Tools | 2026-04-13 |
| 24 | 1 | Reducto | `reducto` | Document & PDF Processing | 2026-04-13 |
| 25 | 1 | Relevance AI | `relevance-ai` | Workflow & Automation | 2026-04-13 |
| 26 | 1 | Replicate | `replicate` | AI APIs & Developer Services | 2026-04-13 |
| 27 | 1 | Research Rabbit | `research-rabbit` | Research & Academic Tools | 2026-04-13 |
| 28 | 1 | Sakana AI | `sakana-ai` | International & Regional AI | 2026-04-13 |
| 29 | 2 | Salesforce Einstein | `salesforce-einstein` | AI Plugins for Business Software | 2026-04-13 |
| 30 | 2 | Scenario | `scenario` | Gaming & Creative AI | 2026-04-13 |
| 31 | 2 | Semantic Scholar | `semantic-scholar` | Research & Academic Tools | 2026-04-13 |
| 32 | 2 | Shopify Magic / Sidekick | `shopify-magic-sidekick` | AI Plugins for Business Software | 2026-04-13 |
| 33 | 2 | Slack AI | `slack-ai` | AI Plugins for Business Software | 2026-04-13 |
| 34 | 2 | Squarespace AI | `squarespace-ai` | AI Plugins for Business Software | 2026-04-13 |
| 35 | 2 | Tray.ai | `tray-ai` | Workflow & Automation | 2026-04-13 |
| 36 | 2 | Trinka AI | `trinka-ai` | Research & Academic Tools | 2026-04-13 |
| 37 | 2 | Upstage (Solar) | `upstage-solar` | Document & PDF Processing | 2026-04-13 |
| 38 | 2 | vLLM | `vllm` | Local & Open-Source AI | 2026-04-13 |
| 39 | 2 | Wix AI | `wix-ai` | AI Plugins for Business Software | 2026-04-13 |
| 40 | 2 | WordPress AI (Jetpack AI) | `wordpress-ai-jetpack-ai` | AI Plugins for Business Software | 2026-04-13 |
| 41 | 2 | Workato | `workato` | Workflow & Automation | 2026-04-13 |
| 42 | 2 | Aider | `aider` | AI Coding & Development | 2026-04-13 |
| 43 | 2 | Gemini CLI | `gemini-cli` | AI Coding & Development | 2026-04-13 |
| 44 | 2 | Ollama | `ollama` | Local & Open-Source AI | 2026-04-13 |
| 45 | 2 | OpenAI Codex CLI | `openai-codex-cli` | AI Coding & Development | 2026-04-13 |
| 46 | 2 | Leonardo AI | `leonardo-ai` | Image Generation & Editing | 2026-04-13 |
| 47 | 2 | Microsoft Designer | `microsoft-designer` | Image Generation & Editing | 2026-04-13 |
| 48 | 2 | Microsoft Power Automate | `microsoft-power-automate` | Workflow & Automation | 2026-04-13 |
| 49 | 2 | Dragon Medical One | `dragon-medical-one` | Healthcare AI | 2026-05-12 |
| 50 | 2 | Healthee | `healthee` | Healthcare AI | 2026-05-12 |
| 51 | 2 | Viz.ai | `viz-ai` | Healthcare AI | 2026-05-12 |
| 52 | 3 | PathAI | `pathai` | Healthcare AI | 2026-05-12 |
| 53 | 3 | AlphaSense | `alphasense` | Finance & Real Estate AI | 2026-05-12 |
| 54 | 3 | Bloomberg GPT / Terminal AI | `bloomberg-gpt-terminal-ai` | Finance & Real Estate AI | 2026-05-12 |
| 55 | 3 | Ramp Intelligence | `ramp-intelligence` | Finance & Real Estate AI | 2026-05-12 |
| 56 | 3 | Canopy (Tax) | `canopy-tax` | Finance & Real Estate AI | 2026-05-12 |
| 57 | 3 | Zillow AI / Zestimate | `zillow-ai-zestimate` | Finance & Real Estate AI | 2026-05-12 |
| 58 | 3 | Restb.ai | `restb-ai` | Finance & Real Estate AI | 2026-05-12 |
| 59 | 3 | Khan Academy (Khanmigo) | `khan-academy-khanmigo` | Education & Learning AI | 2026-05-12 |
| 60 | 3 | Duolingo Max | `duolingo-max` | Education & Learning AI | 2026-05-12 |
| 61 | 3 | Quizlet Q-Chat | `quizlet-q-chat` | Education & Learning AI | 2026-05-12 |
| 62 | 3 | Speak (Language AI) | `speak-language-ai` | Education & Learning AI | 2026-05-12 |
| 63 | 3 | Gong | `gong` | Sales, Marketing & SEO AI | 2026-05-12 |
| 64 | 3 | Outreach | `outreach` | Sales, Marketing & SEO AI | 2026-05-12 |
| 65 | 3 | Semrush AI | `semrush-ai` | Sales, Marketing & SEO AI | 2026-05-12 |
| 66 | 3 | Scale AI | `scale-ai` | AI APIs & Developer Services | 2026-05-12 |
| 67 | 3 | Udio | `udio` | Music Generation | 2026-05-12 |
| 68 | 3 | AIVA | `aiva` | Music Generation | 2026-05-12 |
| 69 | 3 | Beatoven.ai | `beatoven-ai` | Music Generation | 2026-05-12 |
| 70 | 3 | Google Lyria 3 | `google-lyria-3` | Music Generation | 2026-05-12 |
| 71 | 3 | Soundraw | `soundraw` | Music Generation | 2026-05-12 |
| 72 | 3 | Murf AI | `murf-ai` | Voice & Speech | 2026-05-12 |
| 73 | 3 | Glasp | `glasp` | Research & Academic Tools | 2026-05-12 |
| 74 | 4 | Cline | `cline` | AI Coding & Development | 2026-10-14 (text undated) |
| 75 | 4 | Clio Manage | `clio-manage` | Legal AI | 2026-10-25 (text undated) |
| 76 | 4 | Harvey AI | `harvey-ai` | Legal AI | 2026-10-25 (text undated) |
| 77 | 4 | Luminance | `luminance` | Legal AI | 2026-10-25 (text undated) |
| 78 | 4 | SciSpace | `scispace` | Research & Academic Tools | 2026-10-25 (text undated) |
| 79 | 4 | Spellbook | `spellbook` | Legal AI | 2026-10-25 (text undated) |
| 80 | 4 | Naver (HyperCLOVA X / Cue:) | `naver-hyperclova-x-cue` | International & Regional AI | 2026-10-26 (text undated) |
| 81 | 4 | Adobe Firefly | `adobe-firefly` | Image Generation & Editing | 2026-10-26 (text undated) |
| 82 | 4 | Topaz Labs | `topaz-labs` | Gaming & Creative AI | 2026-10-26 (text undated) |
| 83 | 4 | Cohere | `cohere` | International & Regional AI | 2026-10-26 (text undated) |
| 84 | 4 | Adobe Acrobat AI Assistant | `adobe-acrobat-ai-assistant` | Document & PDF Processing | 2026-10-30 (text undated) |
| 85 | 4 | Amazon Bedrock | `amazon-bedrock` | AI APIs & Developer Services | 2026-10-30 (text undated) |
| 86 | 4 | Azure OpenAI Service | `azure-openai-service` | AI APIs & Developer Services | 2026-10-30 (text undated) |
| 87 | 4 | ChatPDF | `chatpdf` | Document & PDF Processing | 2026-10-30 (text undated) |
| 88 | 4 | Google Veo 3.1 | `google-veo-3-1` | Video Creation & Editing | 2026-10-30 (text undated) |
| 89 | 4 | Open WebUI | `open-webui` | Local & Open-Source AI | 2026-10-30 (text undated) |
| 90 | 4 | Scholarcy | `scholarcy` | Research & Academic Tools | 2026-10-30 (text undated) |
| 91 | 4 | Wondershare PDFelement AI | `wondershare-pdfelement-ai` | Document & PDF Processing | 2026-10-30 (text undated) |
| 92 | 4 | Amazon Q Developer | `amazon-q-developer` | AI Coding & Development | 2026-10-30 (text undated) |
