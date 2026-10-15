import { FactCite } from "@/components/platforms/fact-cite";
import type { DisplayPlan } from "@/lib/platform-display";
import type { Fact, ToolPlan } from "@/data/facts/types";

type PlatformPricingTableProps = {
  plans: DisplayPlan[];
  plansFact?: Fact<ToolPlan[]>;
};

export function PlatformPricingTable({ plans, plansFact }: PlatformPricingTableProps) {
  if (plans.length === 0) return null;
  const showLimits = plans.some((plan) => plan.limits.trim());

  return (
    <section className="lp-overview-panel min-w-0">
      <div className="mb-4 flex items-center gap-1">
        <h2 className="text-lg font-semibold text-white">Pricing</h2>
        <FactCite fact={plansFact} />
      </div>
      {plansFact?.note ? (
        <p className="mb-4 text-sm text-gray-300">{plansFact.note}</p>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-xs uppercase tracking-wide text-gray-400">
              <th className="pb-2 pr-4 font-medium">Plan</th>
              <th className="pb-2 pr-4 font-medium">Price</th>
              {showLimits ? <th className="pb-2 font-medium">Key limits</th> : null}
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const price = plan.period ? `${plan.price}/${plan.period}` : plan.price;
              return (
                <tr key={`${plan.name}-${price}`} className="border-b border-gray-800/80 transition-colors hover:bg-amber-100/[0.03] last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-white">{plan.name}</td>
                  <td className="break-words py-2.5 pr-4 text-gray-200">{price}</td>
                  {showLimits ? <td className="break-words py-2.5 text-gray-300">{plan.limits}</td> : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
