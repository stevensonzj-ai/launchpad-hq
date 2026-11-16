/**
 * Catalog statement guard for automated production Guarded SQL runs.
 *
 * Rejects the file before any database connection when it contains
 * DROP, TRUNCATE, DELETE, ALTER, CREATE, GRANT or REVOKE, or when it
 * touches a table other than the catalog tables the scripts/sql/catalog-*.sql
 * files actually write (platforms and categories).
 *
 * Comments and string literals (including dollar quotes used as values) are
 * removed before matching. Dollar-quoted bodies after DO / EXECUTE / AS are
 * still scanned, because those run as SQL. Comment text is not executed, so a
 * forbidden word that exists only inside a comment does not fire; a comment
 * stuck inside a real keyword (DROP, then a block comment, then TABLE) still does.
 */

export const CATALOG_SQL_TABLES = ["categories", "platforms"] as const;
const ALLOWED = new Set<string>(CATALOG_SQL_TABLES);

const FORBIDDEN = new Set(["alter", "create", "delete", "drop", "grant", "revoke", "truncate"]);

/** Words that start a clause, so they are not table aliases. */
const CLAUSE = new Set([
  "all", "alter", "and", "any", "as", "asc", "begin", "between", "by", "case", "cast", "check",
  "collate", "commit", "conflict", "constraint", "copy", "create", "cross", "current_date",
  "current_time", "current_timestamp", "current_user", "default", "delete", "desc", "distinct",
  "do", "drop", "else", "end", "except", "exists", "false", "fetch", "for", "foreign", "from",
  "full", "grant", "group", "having", "if", "in", "index", "inner", "insert", "intersect", "into",
  "is", "join", "key", "lateral", "left", "like", "limit", "local", "natural", "not", "null",
  "offset", "on", "only", "or", "order", "outer", "over", "primary", "recursive",
  "references", "replace", "returning", "revoke", "right", "rollback", "select", "session",
  "session_user", "set", "table", "temp", "temporary", "then", "to", "true", "truncate", "union",
  "update", "using", "values", "when", "where", "window", "with",
]);

const INTRODUCERS = new Set(["copy", "from", "into", "join", "table", "update"]);

export type CatalogGuardResult =
  | { ok: true; tables: string[] }
  | { ok: false; reason: string };

class GuardParseError extends Error {}

interface Tok {
  kind: "word" | "quoted" | "sym";
  value: string;
}

/**
 * Left-to-right strip. Comments and value-literals become a space.
 * Double-quoted identifiers are kept. Executable dollar-quote bodies are kept
 * (and themselves stripped) so a DO block cannot hide a DROP.
 */
export function stripCommentsAndStrings(sql: string): string {
  let out = "";
  let lastWord = "";
  let pending = "";
  const n = sql.length;
  let i = 0;

  const flushWord = () => {
    if (!pending) return;
    lastWord = pending.toLowerCase();
    pending = "";
  };
  const emit = (chunk: string) => {
    out += chunk;
    for (const ch of chunk) {
      if (/[A-Za-z0-9_$]/.test(ch)) pending += ch;
      else flushWord();
    }
  };

  while (i < n) {
    const c = sql[i]!;
    const next = sql[i + 1];

    if (c === "-" && next === "-") {
      while (i < n && sql[i] !== "\n") i++;
      emit(" ");
      continue;
    }
    if (c === "/" && next === "*") {
      let depth = 1;
      i += 2;
      while (i < n && depth > 0) {
        if (sql[i] === "/" && sql[i + 1] === "*") {
          depth++;
          i += 2;
        } else if (sql[i] === "*" && sql[i + 1] === "/") {
          depth--;
          i += 2;
        } else i++;
      }
      if (depth > 0) throw new GuardParseError("Unterminated block comment");
      emit(" ");
      continue;
    }
    if (c === "'") {
      const prev = sql[i - 1];
      const escapeString = (prev === "E" || prev === "e") && (i < 2 || !/[A-Za-z0-9_$]/.test(sql[i - 2]!));
      i++;
      let closed = false;
      while (i < n) {
        const ch = sql[i]!;
        if (escapeString && ch === "\\") {
          i += 2;
          continue;
        }
        if (ch === "'") {
          if (sql[i + 1] === "'") {
            i += 2;
            continue;
          }
          i++;
          closed = true;
          break;
        }
        i++;
      }
      if (!closed) throw new GuardParseError("Unterminated single-quoted string");
      emit(" ");
      continue;
    }
    if (c === "$" && (i === 0 || !/[A-Za-z0-9_$]/.test(sql[i - 1]!))) {
      const m = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(sql.slice(i, i + 130));
      if (m) {
        const tag = m[0];
        const close = sql.indexOf(tag, i + tag.length);
        if (close < 0) throw new GuardParseError(`Unterminated dollar-quoted body ${tag}`);
        const body = sql.slice(i + tag.length, close);
        i = close + tag.length;
        flushWord();
        const executable = lastWord === "do" || lastWord === "execute" || lastWord === "as";
        if (executable) emit(stripCommentsAndStrings(body));
        else emit(" ");
        continue;
      }
    }
    emit(c);
    i++;
  }
  return out;
}

function tokenize(code: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < code.length) {
    const c = code[i]!;
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let value = "";
      let closed = false;
      while (j < code.length) {
        if (code[j] === '"') {
          if (code[j + 1] === '"') {
            value += '"';
            j += 2;
            continue;
          }
          j++;
          closed = true;
          break;
        }
        value += code[j];
        j++;
      }
      if (!closed) throw new GuardParseError("Unterminated double-quoted identifier");
      out.push({ kind: "quoted", value });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i + 1;
      while (j < code.length && /[A-Za-z0-9_$]/.test(code[j]!)) j++;
      out.push({ kind: "word", value: code.slice(i, j) });
      i = j;
      continue;
    }
    out.push({ kind: "sym", value: c });
    i++;
  }
  return out;
}

function isIdent(t: Tok | undefined): t is Tok {
  return !!t && (t.kind === "word" || t.kind === "quoted");
}

function skipAlias(tokens: Tok[], i: number): number {
  const t = tokens[i];
  if (t?.kind === "word" && t.value.toLowerCase() === "as") {
    const alias = tokens[i + 1];
    return isIdent(alias) ? i + 2 : i + 1;
  }
  if (t?.kind === "quoted") return i + 1;
  if (t?.kind === "word" && !CLAUSE.has(t.value.toLowerCase())) return i + 1;
  return i;
}

/** One relation, or a comma-separated list (`FROM a, b`). `(subquery)` is not a relation. */
function readRelations(tokens: Tok[], start: number): { names: string[]; next: number } | null {
  let i = start;
  const names: string[] = [];
  const readOne = (): boolean => {
    while (
      tokens[i]?.kind === "word" &&
      (tokens[i]!.value.toLowerCase() === "only" || tokens[i]!.value.toLowerCase() === "lateral")
    ) {
      i++;
    }
    const first = tokens[i];
    if (!isIdent(first)) return false;
    if (first.kind === "word" && CLAUSE.has(first.value.toLowerCase())) return false;
    i++;
    let schema: string | null = null;
    let name = first.value;
    if (tokens[i]?.kind === "sym" && tokens[i]?.value === "." && isIdent(tokens[i + 1])) {
      schema = first.value;
      name = tokens[i + 1]!.value;
      i += 2;
    }
    const schemaLc = schema?.toLowerCase() ?? null;
    const nameLc = name.toLowerCase();
    names.push(schemaLc && schemaLc !== "public" ? `${schemaLc}.${nameLc}` : nameLc);
    i = skipAlias(tokens, i);
    return true;
  };
  if (!readOne()) return null;
  while (tokens[i]?.kind === "sym" && tokens[i]?.value === ",") {
    i++;
    if (!readOne()) break;
  }
  return { names, next: i };
}

export function tablesTouched(sql: string): string[] {
  const tokens = tokenize(stripCommentsAndStrings(sql));
  const found: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.kind !== "word" || !INTRODUCERS.has(t.value.toLowerCase())) continue;
    const rel = readRelations(tokens, i + 1);
    if (!rel) continue;
    found.push(...rel.names);
    i = rel.next - 1;
  }
  return [...new Set(found)];
}

export function guardCatalogSql(sql: string): CatalogGuardResult {
  let tokens: Tok[];
  try {
    tokens = tokenize(stripCommentsAndStrings(sql));
  } catch (err) {
    const reason = err instanceof Error ? err.message : "could not parse SQL";
    return { ok: false, reason: `Catalog statement guard: ${reason}` };
  }
  for (const t of tokens) {
    if (t.kind === "word" && FORBIDDEN.has(t.value.toLowerCase())) {
      return {
        ok: false,
        reason: `Catalog statement guard: refusing forbidden SQL keyword ${t.value.toUpperCase()}.`,
      };
    }
  }
  const tables: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.kind !== "word" || !INTRODUCERS.has(t.value.toLowerCase())) continue;
    const rel = readRelations(tokens, i + 1);
    if (!rel) continue;
    tables.push(...rel.names);
    i = rel.next - 1;
  }
  const unique = [...new Set(tables)];
  const bad = unique.filter((name) => !ALLOWED.has(name));
  if (bad.length > 0) {
    return {
      ok: false,
      reason: `Catalog statement guard: refusing table ${bad.join(", ")}. Allowed tables: ${CATALOG_SQL_TABLES.join(", ")}.`,
    };
  }
  return { ok: true, tables: unique };
}
