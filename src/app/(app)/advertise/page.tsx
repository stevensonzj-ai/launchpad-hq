import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdvertiseGuidelines } from "@/components/sponsors/advertise-guidelines";
import {
  formatWeekRange,
  slotLabel,
  SPONSOR_CALENDAR,
  SPONSOR_SLOT_KEYS,
} from "@/data/sponsors/calendar";
import { SITE_IS_PUBLIC } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advertise | Launchpad HQ",
  description:
    "Sponsor rate card for Launchpad HQ: AI of the Week, Discover Spotlight, availability, and booking by email.",
  robots: SITE_IS_PUBLIC ? undefined : { index: false, follow: false },
};

export const revalidate = 3600;

const MAIL = "launchpadhq.admin@gmail.com";

export default function AdvertisePage() {
  if (!SITE_IS_PUBLIC) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Sponsor Guidelines</h1>
      <AdvertiseGuidelines />

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">Weekly availability</h2>
        <p className="text-sm text-gray-400">
          Weeks start Monday, US Central Time. This calendar is a static list — email{" "}
          <a href={`mailto:${MAIL}`} className="text-orange-400 hover:underline">
            {MAIL}
          </a>{" "}
          to book. There is no checkout on this page.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-900/80 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Week (Mon–Sun CT)</th>
                {SPONSOR_SLOT_KEYS.map((slot) => (
                  <th key={slot} className="px-4 py-3 font-medium">
                    {slotLabel(slot)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPONSOR_CALENDAR.map((row) => (
                <tr key={row.weekStart} className="border-b border-gray-800/80 last:border-0">
                  <td className="px-4 py-3 text-gray-300">{formatWeekRange(row.weekStart)}</td>
                  {SPONSOR_SLOT_KEYS.map((slot) => {
                    const status = row.slots[slot];
                    return (
                      <td key={slot} className="px-4 py-3">
                        <span
                          className={
                            status === "open"
                              ? "text-green-400"
                              : "text-gray-500"
                          }
                        >
                          {status === "open" ? "Open" : "Booked"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
