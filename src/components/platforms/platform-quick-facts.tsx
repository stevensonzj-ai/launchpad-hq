import { FactCite } from "@/components/platforms/fact-cite";
import type { Fact } from "@/data/facts/types";
import { Building2, Coins, Gift, MonitorSmartphone } from "lucide-react";

const factIcons = { "Free tier": Gift, "Starting price": Coins, Platforms: MonitorSmartphone, Company: Building2 };

type QuickFact = {
  label: string;
  value: string;
  fact?: Pick<Fact<unknown>, "sourceUrl" | "checkedAt" | "status"> | null;
  note?: string;
};

export function PlatformQuickFacts({ items }: { items: QuickFact[] }) {
  const visible = items.filter((item) => item.value.trim());
  if (visible.length === 0) return null;

  return (
    <section className="py-2">
      <h2 className="mb-4 text-lg font-semibold text-white">Quick facts</h2>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item) => {
          const Icon = factIcons[item.label as keyof typeof factIcons] ?? Coins;
          return (
          <div key={item.label} className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4">
            <Icon aria-hidden="true" className="mb-3 h-5 w-5 text-amber-200/80" />
            <dt className="text-[10px] font-medium uppercase tracking-widest text-gray-300">
              {item.label}
              <FactCite fact={item.fact} />
            </dt>
            <dd className="mt-2 text-sm font-medium leading-relaxed text-gray-100">
              {item.value}
              {item.note && (
                <details className="mt-1 font-normal">
                  <summary className="cursor-pointer text-xs font-medium text-orange-400 hover:text-orange-300">
                    more
                  </summary>
                  <p className="mt-1 text-xs font-normal text-gray-400">{item.note}</p>
                </details>
              )}
            </dd>
          </div>
        );})}
      </dl>
    </section>
  );
}
