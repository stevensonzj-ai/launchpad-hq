import { FactCite } from "@/components/platforms/fact-cite";
import type { DisplayPlan } from "@/lib/platform-display";
import type { Fact, ToolPlan } from "@/data/facts/types";

type PlatformPricingTableProps = {
  plans: DisplayPlan[];
  plansFact?: Fact<ToolPlan[]>;
};

export function PlatformPricingTable({ plans, plansFact }: PlatformPricingTableProps) {
  if (plans.length === 0) return null;

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <div className="mb-4 flex items-center gap-1">
        <h2 className="text-lg font-semibold text-white">Pricing</h2>
        <FactCite fact={plansFact} />
      </div>
      {plansFact?.note ? (
        <p className="mb-4 text-sm text-gray-400">{plansFact.note}</p>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-xs uppercase tracking-wide text-gray-500">
              <th className="pb-2 pr-4 font-medium">Plan</th>
              <th className="pb-2 pr-4 font-medium">Price</th>
              <th className="pb-2 font-medium">Key limits</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const price = plan.period ? `${plan.price}/${plan.period}` : plan.price;
              return (
                <tr key={`${plan.name}-${price}`} className="border-b border-gray-800/80 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-white">{plan.name}</td>
                  <td className="py-2.5 pr-4 text-gray-200">{price}</td>
                  <td className="py-2.5 text-gray-400">{plan.limits || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
