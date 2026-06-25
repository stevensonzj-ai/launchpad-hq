"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Info,
  Lightbulb,
  ListChecks,
  Minus,
  Scale,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import type { TutorialArchetype } from "@/data/tutorials";

// Section-G heading depends on the tutorial archetype.
const STARTER_HEADING: Record<TutorialArchetype, string> = {
  prompts: "Starter prompts to try",
  recipes: "Starter automations to try",
  "pick-and-setup": "First things to try",
};

// Shared style tokens — match the app's existing card language.
const CARD = "rounded-xl border border-gray-800 bg-gray-900/90 p-6 sm:p-7";
const BODY = "text-sm leading-relaxed text-gray-300";

// Section heading: a hardcoded (semantic, never string-matched) accent icon
// + the <h3>. Sub-items inside sections use <h4> to preserve the outline.
function SectionHeading({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 text-lg font-semibold text-white">
      <Icon className="h-5 w-5 shrink-0 text-orange-400" aria-hidden />
      {children}
    </h3>
  );
}

// Per-prompt copy button (the only reason this file is a Client Component):
// copies the raw prompt and briefly swaps to a check.
function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Prompt copied" : "Copy prompt"}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gray-700 bg-gray-800/80 px-2.5 py-1 text-xs font-semibold text-gray-300 transition-colors hover:border-orange-500/50 hover:text-orange-300"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// Inline-code chip styling — reuses surface/border tokens already in this file
// (the where-to-next pill uses border-gray-700 + bg-gray-800/60; body is
// gray-300). No new color introduced.
const CODE_CLASS =
  "rounded border border-gray-700 bg-gray-800/60 px-1 py-0.5 font-mono text-gray-300";

// Minimal inline formatter: only **bold** and `code`. Code spans resolve first
// and are not re-scanned (so `ollama **x**` keeps its asterisks literal); bold
// is parsed only in the gaps; unmatched delimiters render literally. Emits
// React elements (never dangerouslySetInnerHTML), so it is XSS-safe.
function pushBold(out: ReactNode[], text: string): void {
  const boldRe = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = boldRe.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      <strong key={out.length} className="font-semibold text-white">
        {match[1]}
      </strong>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
}

function richText(s: string): ReactNode[] {
  const out: ReactNode[] = [];
  const codeRe = /`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = codeRe.exec(s)) !== null) {
    if (match.index > last) pushBold(out, s.slice(last, match.index));
    out.push(
      <code key={out.length} className={CODE_CLASS}>
        {match[1]}
      </code>,
    );
    last = match.index + match[0].length;
  }
  if (last < s.length) pushBold(out, s.slice(last));
  return out;
}

type PlatformTutorialsProps = {
  platformName: string;
  platformSlug: string;
};

export function PlatformTutorials({ platformName, platformSlug }: PlatformTutorialsProps) {
  const tutorial = getStaticTutorialForPlatform(platformSlug);

  if (!tutorial) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-8">
        <h2 className="text-lg font-semibold text-white">Tutorials</h2>
        <p className="mt-1 text-sm text-gray-400">
          Step-by-step guides for <span className="text-gray-300">{platformName}</span>
        </p>
        <p className="mt-6 rounded-lg border border-dashed border-gray-700 bg-gray-950/50 px-4 py-10 text-center text-sm text-gray-500">
          Coming soon — we&apos;re writing guides for this platform.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero — flat orange-tinted panel (no gradient), eyebrow + title + tagline */}
      <header className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          Tutorial · {tutorial.accessTier}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{tutorial.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">{tutorial.tagline}</p>
        <p className="mt-3 text-xs text-gray-500">
          Last reviewed {tutorial.lastReviewedAt} · for {platformName}
        </p>
      </header>

      {/* How it works */}
      <section className={CARD}>
        <SectionHeading icon={Sparkles}>How it works</SectionHeading>
        <p className={`mt-4 ${BODY}`}>{richText(tutorial.howItWorks)}</p>
      </section>

      {/* What it is */}
      <section className={CARD}>
        <SectionHeading icon={Info}>What it is</SectionHeading>
        <div className="mt-4 space-y-2">
          {tutorial.whatItIs.map((item) => (
            <p key={item} className={BODY}>{richText(item)}</p>
          ))}
        </div>
      </section>

      {/* Before you start */}
      <section className={CARD}>
        <SectionHeading icon={ListChecks}>Before you start</SectionHeading>
        <div className="mt-4 space-y-2">
          {tutorial.beforeYouStart.map((item) => (
            <p key={item} className={BODY}>{richText(item)}</p>
          ))}
        </div>
      </section>

      {/* Getting set up safely — only when present */}
      {tutorial.gettingSetUpSafely && (
        <section className={CARD}>
          <SectionHeading icon={ListChecks}>Getting set up safely</SectionHeading>
          <p className={`mt-4 ${BODY}`}>
            <span className="font-semibold text-orange-300">Official source:</span>{" "}
            {richText(tutorial.gettingSetUpSafely.officialSource)}
          </p>
          <div className="mt-3 space-y-2">
            {tutorial.gettingSetUpSafely.body.map((paragraph) => (
              <p key={paragraph} className={BODY}>{richText(paragraph)}</p>
            ))}
          </div>
          {tutorial.gettingSetUpSafely.vendorDocsUrl && (
            <a
              href={tutorial.gettingSetUpSafely.vendorDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-orange-400 transition-colors hover:text-orange-300"
            >
              Official docs ↗
            </a>
          )}
        </section>
      )}

      {/* Security & privacy — accent left-border callout, calibrated caution.
          Renders as labeled lists (structured like the triad), not a wall of text. */}
      <section className="border-l-2 border-orange-500/50 bg-orange-500/5 p-5 sm:p-6">
        <SectionHeading icon={Shield}>Security &amp; privacy</SectionHeading>
        <div className="mt-4 space-y-4">
          {tutorial.security.map((block) =>
            block.kind === "text" ? (
              <p key={block.text} className={BODY}>{richText(block.text)}</p>
            ) : (
              <div key={block.label}>
                <h4 className="text-sm font-semibold text-white">{block.label}</h4>
                <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
                  {block.items.map((item) => (
                    <li key={item}>{richText(item)}</li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Capability triad — three columns tinted by meaning */}
      <section>
        <SectionHeading icon={Scale}>What it&apos;s good (and not good) at</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-green-500/25 bg-green-500/5 p-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-green-400">
              <Check className="h-4 w-4 shrink-0" aria-hidden />
              Best at
            </h4>
            <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
              {tutorial.triad.bestAt.map((item) => (
                <li key={item}>{richText(item)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-800/40 p-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Minus className="h-4 w-4 shrink-0" aria-hidden />
              Okay at
            </h4>
            <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
              {tutorial.triad.okayAt.map((item) => (
                <li key={item}>{richText(item)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400">
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
              Avoid
            </h4>
            <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
              {tutorial.triad.avoid.map((item) => (
                <li key={item}>{richText(item)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Starter actions — heading switches on archetype; copyable prompt per card */}
      <section>
        <SectionHeading icon={Lightbulb}>{STARTER_HEADING[tutorial.archetype]}</SectionHeading>
        <div className="mt-4 space-y-4">
          {tutorial.starterActions.map((action) => (
            <article key={action.title} className="rounded-xl border border-gray-800 bg-gray-900/90 p-5 sm:p-6">
              <h4 className="text-base font-semibold text-white">{action.title}</h4>

              {action.prompt ? (
                <div className="mt-3 rounded-lg border border-gray-700/70 bg-gray-950/60 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-300">
                      {action.prompt}
                    </p>
                    <CopyPromptButton prompt={action.prompt} />
                  </div>
                </div>
              ) : (
                action.whatItDoes && <p className={`mt-3 ${BODY}`}>{richText(action.whatItDoes)}</p>
              )}

              <p className="mt-3 text-sm leading-relaxed text-orange-100/95">
                <span className="font-semibold text-orange-300">Why this one:</span> {richText(action.whyHere)}
              </p>
              {action.tweak && (
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  <span className="font-semibold text-gray-300">Tweak:</span> {richText(action.tweak)}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Pitfalls — restrained: one section icon, plain list */}
      <section className={CARD}>
        <SectionHeading icon={AlertTriangle}>Common pitfalls</SectionHeading>
        <ul className={`mt-4 space-y-1.5 list-disc pl-5 ${BODY}`}>
          {tutorial.pitfalls.map((item) => (
            <li key={item}>{richText(item)}</li>
          ))}
        </ul>
      </section>

      {/* Where to next — real catalog links (category filter on /discover) */}
      <section className={CARD}>
        <SectionHeading icon={ArrowRight}>Where to next</SectionHeading>
        <div className="mt-4 flex flex-wrap gap-2">
          {tutorial.whereToNext.map((item) => {
            const href = item.categorySlug
              ? `/discover?category=${item.categorySlug}`
              : item.href;
            const pill =
              "inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1.5 text-sm text-gray-300";
            const icon = (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-orange-400" aria-hidden />
            );
            return href ? (
              <Link
                key={item.label}
                href={href}
                className={`${pill} transition-colors hover:border-orange-500/50 hover:text-orange-300`}
              >
                {icon}
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className={pill}>
                {icon}
                {item.label}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}
