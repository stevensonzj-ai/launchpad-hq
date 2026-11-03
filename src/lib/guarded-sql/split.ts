/**
 * A small PostgreSQL statement splitter. Splits on top-level semicolons and
 * ignores semicolons inside:
 *   - single-quoted strings ('' escape; backslash escapes after an E prefix)
 *   - double-quoted identifiers ("" escape)
 *   - -- line comments and (nested) block comments
 *   - dollar-quoted bodies ($$ ... $$ and $tag$ ... $tag$)
 * Comment-only / empty chunks are dropped. Leading comments are stripped from
 * each statement. Unterminated quotes/comments throw SplitError.
 */

export class SplitError extends Error {}

const isIdentChar = (c: string | undefined) => c !== undefined && /[A-Za-z0-9_$]/.test(c);

export function splitSql(sql: string): string[] {
  const out: string[] = [];
  const n = sql.length;
  let i = 0;
  let start = -1; // index of first content char of current statement

  const flush = (end: number) => {
    if (start >= 0) {
      const text = sql.slice(start, end).trim();
      if (text) out.push(text);
    }
    start = -1;
  };
  const mark = (idx: number) => {
    if (start < 0) start = idx;
  };

  while (i < n) {
    const c = sql[i]!;
    const next = sql[i + 1];

    if (c === "-" && next === "-") {
      while (i < n && sql[i] !== "\n") i++;
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
      if (depth > 0) throw new SplitError("Unterminated /* comment");
      continue;
    }
    if (c === ";") {
      flush(i);
      i++;
      continue;
    }
    if (/\s/.test(c)) {
      i++;
      continue;
    }

    mark(i);

    if (c === "'") {
      const prev = sql[i - 1];
      const escapeString = (prev === "E" || prev === "e") && !isIdentChar(sql[i - 2]);
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
      if (!closed) throw new SplitError("Unterminated single-quoted string");
      continue;
    }
    if (c === '"') {
      i++;
      let closed = false;
      while (i < n) {
        if (sql[i] === '"') {
          if (sql[i + 1] === '"') {
            i += 2;
            continue;
          }
          i++;
          closed = true;
          break;
        }
        i++;
      }
      if (!closed) throw new SplitError("Unterminated double-quoted identifier");
      continue;
    }
    if (c === "$" && !isIdentChar(sql[i - 1])) {
      const m = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(sql.slice(i, i + 130));
      if (m) {
        const tag = m[0];
        const close = sql.indexOf(tag, i + tag.length);
        if (close < 0) throw new SplitError(`Unterminated dollar-quoted body ${tag}`);
        i = close + tag.length;
        continue;
      }
    }
    i++;
  }
  flush(n);
  return out;
}

const TXN_FIRST_WORDS = new Set(["begin", "commit", "rollback", "end", "abort", "start", "savepoint", "release"]);

/**
 * Statements that are explicit transaction control. The runner wraps the file
 * in its own BEGIN/COMMIT, so these are refused. Returns offending statements'
 * 1-based numbers with the keyword.
 */
export function findTransactionControl(statements: readonly string[]): { index: number; keyword: string }[] {
  const hits: { index: number; keyword: string }[] = [];
  statements.forEach((s, idx) => {
    const m = /^[A-Za-z]+/.exec(s);
    const word = m?.[0].toLowerCase();
    if (word && TXN_FIRST_WORDS.has(word)) {
      // "start" is only transaction control as START TRANSACTION.
      if (word === "start" && !/^start\s+transaction\b/i.test(s)) return;
      hits.push({ index: idx + 1, keyword: word.toUpperCase() });
    }
  });
  return hits;
}
