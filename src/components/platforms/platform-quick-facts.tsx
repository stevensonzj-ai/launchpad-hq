import { FactCite } from "@/components/platforms/fact-cite";
import type { Fact } from "@/data/facts/types";

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
    <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Quick facts</h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {visible.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {item.label}
              <FactCite fact={item.fact} />
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">
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
        ))}
      </dl>
    </section>
  );
}
