/** "Prices checked YYYY-MM-DD" under a pricing section; nothing when the date is unknown. */
export function PricesChecked({ date }: { date: string | null | undefined }) {
  if (!date) return null;
  return <p className="mt-3 text-xs text-gray-400">Prices checked {date}</p>;
}
