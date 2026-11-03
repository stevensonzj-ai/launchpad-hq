-- guarded-sql: test-only
-- Self-test for the guarded SQL runner (GitHub Actions route). Test branches only:
-- the runner refuses any file carrying the test-only marker above on production.
CREATE TABLE IF NOT EXISTS guarded_sql_selftest (
  id serial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  note text NOT NULL
);
INSERT INTO guarded_sql_selftest (note) VALUES ('guarded-sql github action self-test');
SELECT count(*) AS row_count FROM guarded_sql_selftest;
