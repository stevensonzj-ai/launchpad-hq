import Link from "next/link";
import {
  ArrowRight,
  Search,
  Sparkles,
  Rocket,
  Star,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import { getAllWorkflows } from "@/data/workflows";
import { WorkflowCard } from "@/components/workflows/workflow-card";
import { getPlatformSlugSet } from "@/lib/platform-slugs";
import { getPlatformCount, roundDownToTen } from "@/lib/platforms";

export default async function HomePage() {
  const featuredWorkflows = getAllWorkflows().slice(0, 3);
  const [validSlugs, rawCount] = await Promise.all([getPlatformSlugSet(), getPlatformCount()]);
  const platformCount = roundDownToTen(rawCount);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-24 pt-20 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-blue-900/10 to-transparent" />
        {/* Stars effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(1px 1px at 130px 80px, white, transparent), radial-gradient(2px 2px at 160px 30px, white, transparent)",
            backgroundSize: "200px 100px",
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Rocket illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 animate-pulse rounded-full bg-orange-500/20 blur-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-orange-500/30 bg-gray-900">
                <Rocket className="h-12 w-12 text-orange-400" style={{ transform: "rotate(-45deg)" }} />
              </div>
              {/* Exhaust particles */}
              <div className="absolute -bottom-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-orange-500/30 blur-md" />
              <div className="absolute -bottom-4 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-lg" />
            </div>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
            Your AI Mission Control
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Launch your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              AI journey
            </span>{" "}
            with confidence
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
            {platformCount}+ vetted AI tools across 15 categories. Find the perfect platforms for your goals, budget, and skill
            level &mdash; in minutes, not months.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/discover"
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40"
            >
              <Rocket className="h-5 w-5" /> Explore All Tools <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/quiz"
              className="flex items-center gap-2 rounded-xl border border-gray-700 px-8 py-3.5 text-lg font-semibold text-white hover:border-orange-500/50 hover:bg-gray-900"
            >
              <Sparkles className="h-5 w-5 text-orange-400" /> Get Matched
            </Link>
            <Link
              href="/workflows"
              className="flex items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-8 py-3.5 text-lg font-semibold text-orange-200 hover:border-orange-400/60 hover:bg-orange-500/15"
            >
              <Layers className="h-5 w-5 text-orange-400" /> View Workflows
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500" /> {platformCount}+ vetted platforms
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-blue-400" /> Free tier analysis
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-green-400" /> Updated weekly
            </span>
          </div>
        </div>
      </section>

      {/* Workflow templates — prominent above the fold */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="mb-8 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-400 sm:justify-start">
              <Layers className="h-4 w-4" />
              Workflow templates
            </h2>
            <p className="text-2xl font-bold text-white">Optimal, hybrid &amp; budget stacks</p>
            <p className="mt-2 max-w-xl text-sm text-gray-400">
              Same job, three price points. Compare suggested tools side by side, then dive into each platform profile.
            </p>
          </div>
          <Link
            href="/workflows"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-white hover:border-orange-500/50 hover:bg-gray-900 sm:mt-0"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredWorkflows.map((w) => (
            <WorkflowCard key={w.slug} workflow={w} compact validSlugs={validSlugs} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-400">
          How it works
        </h2>
        <p className="mb-12 text-center text-2xl font-bold text-white">Three steps to your perfect AI stack</p>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-center transition-colors hover:border-orange-500/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
              <Search className="h-6 w-6 text-orange-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">1. Discover</h3>
            <p className="text-sm text-gray-400">
              Browse tools by category, price, difficulty, and privacy level. Every platform vetted across 28 data
              points.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-center transition-colors hover:border-orange-500/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">2. Get Matched</h3>
            <p className="text-sm text-gray-400">
              Take a 2-minute survey. Our engine matches you with the best tools for your goals, budget, and experience
              level.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-center transition-colors hover:border-orange-500/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
              <Rocket className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">3. Launch</h3>
            <p className="text-sm text-gray-400">
              Follow step-by-step tutorials. Track your progress. Build powerful multi-tool workflows with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">15 Categories of AI Tools</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { name: "Text & Chat AI", icon: "💬" },
            { name: "Image Generation", icon: "🎨" },
            { name: "Video Creation", icon: "🎬" },
            { name: "Audio & Music", icon: "🎵" },
            { name: "Coding & Dev", icon: "💻" },
            { name: "Automation", icon: "⚡" },
            { name: "Research", icon: "📚" },
            { name: "Documents", icon: "📄" },
            { name: "Industry AI", icon: "🏢" },
            { name: "Open Source", icon: "🔓" },
            { name: "Business Plugins", icon: "🔌" },
            { name: "Browser Extensions", icon: "🌐" },
            { name: "Gaming & Creative", icon: "🎮" },
            { name: "Developer APIs", icon: "🔧" },
            { name: "International AI", icon: "🌍" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href="/discover"
              className="group rounded-lg border border-gray-800 bg-gray-900/50 px-3 py-3 text-center transition-all hover:border-orange-500/40 hover:bg-gray-900"
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="mt-1 block text-sm text-gray-300 group-hover:text-white">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-950 px-4 py-20 text-center">
        <Rocket className="mx-auto mb-6 h-10 w-10 text-orange-400" style={{ transform: "rotate(-45deg)" }} />
        <h2 className="mb-4 text-3xl font-bold text-white">Ready for liftoff?</h2>
        <p className="mb-8 text-lg text-gray-400">
          Join Launchpad HQ and find the tools that will transform your work.
        </p>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600"
        >
          Start Exploring <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-4 text-sm text-gray-600">Free to browse. No account required.</p>
      </section>
    </div>
  );
}
