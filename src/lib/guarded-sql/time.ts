const CHICAGO = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** e.g. 2026-11-03T10:20:00-06:00 (America/Chicago, DST-aware numeric offset). */
export function formatChicagoTimestamp(date: Date): string {
  const p: Record<string, string> = {};
  for (const part of CHICAGO.formatToParts(date)) p[part.type] = part.value;
  const wallAsUtc = Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour),
    Number(p.minute),
    Number(p.second),
  );
  const trueSecondMs = Math.floor(date.getTime() / 1000) * 1000;
  const offsetMin = Math.round((wallAsUtc - trueSecondMs) / 60000);
  const sign = offsetMin < 0 ? "-" : "+";
  const abs = Math.abs(offsetMin);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${sign}${hh}:${mm}`;
}
