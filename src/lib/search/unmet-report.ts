/** Formatters for the weekly unmet-search report (scripts/search-unmet-weekly.ts). Pure. */

export type UnmetReportRow = {
  query: string;
  searches: number;
  no_click_searches: number;
  last_result_count: number;
  first_seen: Date | string;
  last_seen: Date | string;
};

export const REPORT_COLUMNS = ["query", "searches", "no_click_searches", "last_result_count", "first_seen", "last_seen"] as const;

const day = (value: Date | string) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10));

function cell(row: UnmetReportRow, column: (typeof REPORT_COLUMNS)[number]): string {
  return column === "first_seen" || column === "last_seen" ? day(row[column]) : String(row[column]);
}

export function toMarkdown(rows: UnmetReportRow[]): string {
  const head = `| ${REPORT_COLUMNS.join(" | ")} |`;
  const rule = `| ${REPORT_COLUMNS.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${REPORT_COLUMNS.map((c) => cell(row, c).replace(/\|/g, " ")).join(" | ")} |`);
  return [head, rule, ...body].join("\n");
}

export function toCsv(rows: UnmetReportRow[]): string {
  const quote = (text: string) => `"${text.replace(/"/g, '""')}"`;
  return [REPORT_COLUMNS.join(","), ...rows.map((row) => REPORT_COLUMNS.map((c) => quote(cell(row, c))).join(","))].join("\n");
}
