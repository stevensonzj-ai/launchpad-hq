import Link from "next/link";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { getAllWorkflows } from "@/data/workflows";
import { getPlatformCount, getCategoryCount } from "@/lib/platforms";
import { Header } from "@/components/layout/header";
import { LaunchpadArt } from "@/components/brand/launchpad-art";
import { GoalEmblem } from "@/components/brand/goal-emblem";

export const revalidate = 3600;

const goals = [
  { title: "Something to say", description: "Write, brainstorm, and turn your ideas into something people will love.", kind: "writing", category: "text-conversational-ai" },
  { title: "Something to see", description: "Generate and edit images, designs, and visual ideas.", kind: "images", category: "image-generation-editing" },
  { title: "Something to discover", description: "Research, explore, and make sense of information faster.", kind: "research", category: "research-academic-tools" },
  { title: "Something that runs itself", description: "Automate your work and connect your favorite apps.", kind: "automation", category: "workflow-automation" },
] as const;

export default async function HomePage() {
  const [platformCount, categoryCount] = await Promise.all([getPlatformCount(), getCategoryCount()]);
  const featuredWorkflows = getAllWorkflows().filter((w) => ["blog-post-generator", "image-generation"].includes(w.slug));
  return (
    <>
      <Header />
      <main className="lp-stars lp-home-sky relative isolate overflow-hidden bg-gray-950">
        <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 text-center sm:px-8 sm:pb-24 sm:pt-16 lg:pt-14">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-orange-400/40 bg-gray-900/60 shadow-[0_0_36px_-8px_var(--color-orange-500)]">
            <Rocket className="h-10 w-10 -rotate-45 text-orange-400" aria-hidden="true" />
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">Your AI mission control</p>
          <h1 className="mx-auto max-w-6xl text-[clamp(2.65rem,6.2vw,5.5rem)] font-bold leading-[1.04] tracking-[-0.045em] text-white">
            <span className="sm:block">Launch your <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">AI journey</span></span>{" "}
            <span className="sm:block">with confidence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl">Find the right AI tools for your goals, budget, and skill level —<br className="hidden sm:block" /> and discover what you can create.</p>
          <div className="mx-auto mt-7 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <Link href="/discover" className="lp-button min-h-12 sm:min-w-60">Explore AI tools <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/quiz" className="lp-button-secondary min-h-12 sm:min-w-60">Find my match <Sparkles className="h-4 w-4 text-purple-300" aria-hidden="true" /></Link>
          </div>
          <p className="mt-4 text-xs text-gray-400 sm:text-sm">Free to explore. No account needed.</p>
        </section>
        <section aria-labelledby="create-heading" className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="create-heading" className="mb-8 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">What will you create?</h2>
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map(({ title, description, kind, category }) => (
              <Link key={kind} href={`/discover?category=${category}`} className={`lp-goal lp-goal-${kind} group flex min-w-0 flex-col overflow-hidden rounded-2xl border p-5 pb-0 transition-transform motion-safe:hover:-translate-y-1`}>
                <div className="flex items-start gap-3">
                  <span className="lp-goal-emblem"><GoalEmblem kind={kind} /></span>
                  <div><h3 className="text-[15px] font-semibold leading-snug text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-300">{description}</p></div>
                </div>
                <div className="relative -mx-5 mt-auto h-40 overflow-hidden sm:h-44"><LaunchpadArt kind={kind} /></div>
              </Link>
            ))}
          </div>
        </section>
        <section aria-labelledby="inspiration-heading" className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-14">
          <h2 id="inspiration-heading" className="mb-7 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">A little inspiration for your next launch</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredWorkflows.map((workflow, index) => (
              <Link key={workflow.slug} href={`/workflows/${workflow.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-700/80 bg-gray-900/50 transition-colors hover:border-orange-400/50 sm:flex-row">
                <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-2/5"><LaunchpadArt kind={index === 0 ? "writing" : "images"} /></div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${index === 0 ? "text-purple-300" : "text-cyan-300"}`}>Featured workflow</p>
                  <h3 className="text-lg font-semibold leading-snug text-white">{index === 0 ? "From rough idea to finished article" : "Make your first visual campaign"}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{workflow.description}</p>
                  <div className="my-4 flex items-center gap-2 text-xs text-gray-400" aria-label="Workflow stages">
                    {(index === 0 ? ["Research", "Draft", "Polish"] : ["Imagine", "Generate", "Refine"]).map((step, i) => <span key={step} className="flex items-center gap-2">{i > 0 && <span className="h-px w-4 bg-gray-600" />}<span className="h-1.5 w-1.5 rounded-full bg-purple-400" />{step}</span>)}
                  </div>
                  <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-orange-400">Explore workflow <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center text-sm text-gray-400 sm:flex-row sm:gap-8">
            <span>{platformCount} tools across {categoryCount} categories</span>
            <Link href="/discover" className="inline-flex min-h-11 items-center gap-2 text-gray-200 hover:text-orange-300">Browse the directory <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/workflows" className="inline-flex min-h-11 items-center gap-2 text-gray-200 hover:text-orange-300">All workflows <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
