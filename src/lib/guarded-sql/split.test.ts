import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findTransactionControl, SplitError, splitSql } from "./split";

describe("splitSql", () => {
  it("splits simple statements and drops empties", () => {
    assert.deepEqual(splitSql("select 1;; select 2 ;\n\n"), ["select 1", "select 2"]);
  });
  it("keeps semicolons inside single-quoted strings, with '' escapes", () => {
    assert.deepEqual(splitSql("insert into t values ('a;b', 'it''s; ok'); select 1"), [
      "insert into t values ('a;b', 'it''s; ok')",
      "select 1",
    ]);
  });
  it("handles E'' strings with backslash-escaped quotes", () => {
    assert.deepEqual(splitSql("select E'it\\'s; x'; select 2"), ["select E'it\\'s; x'", "select 2"]);
  });
  it("keeps semicolons inside double-quoted identifiers", () => {
    assert.deepEqual(splitSql('select 1 as "a;b"; select 2'), ['select 1 as "a;b"', "select 2"]);
  });
  it("ignores semicolons in line and nested block comments", () => {
    const sql = "-- lead; comment\nselect 1 /* a; /* nested; */ b; */; select 2 -- tail; x\n";
    assert.deepEqual(splitSql(sql), ["select 1 /* a; /* nested; */ b; */", "select 2 -- tail; x"]);
  });
  it("drops comment-only chunks", () => {
    assert.deepEqual(splitSql("-- nothing\n/* still nothing */;"), []);
  });
  it("keeps dollar-quoted bodies intact ($$ and $tag$)", () => {
    const fn = "create function f() returns int as $$ begin; return 1; end; $$ language plpgsql";
    const tagged = "do $body$ begin perform 1; end $body$";
    assert.deepEqual(splitSql(`${fn}; ${tagged}; select 3`), [fn, tagged, "select 3"]);
  });
  it("does not treat $1 or ident$ as a dollar quote", () => {
    assert.deepEqual(splitSql("select $1; select a$b$c from t"), ["select $1", "select a$b$c from t"]);
  });
  it("throws on unterminated constructs", () => {
    assert.throws(() => splitSql("select 'oops"), SplitError);
    assert.throws(() => splitSql('select "oops'), SplitError);
    assert.throws(() => splitSql("select 1 /* oops"), SplitError);
    assert.throws(() => splitSql("select $$ oops"), SplitError);
  });
});

describe("findTransactionControl", () => {
  it("flags BEGIN/COMMIT/ROLLBACK/START TRANSACTION and ignores DO blocks", () => {
    const stmts = splitSql("begin; select 1; commit; ROLLBACK; start transaction; do $$ begin end $$");
    assert.deepEqual(
      findTransactionControl(stmts).map((h) => h.keyword),
      ["BEGIN", "COMMIT", "ROLLBACK", "START"],
    );
  });
  it("sees through leading comments", () => {
    assert.equal(findTransactionControl(splitSql("-- hi\nCOMMIT")).length, 1);
  });
  it("does not flag ordinary statements", () => {
    assert.equal(findTransactionControl(splitSql("update t set begin_at = now(); select 1")).length, 0);
  });
});
