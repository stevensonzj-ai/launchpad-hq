DELETE FROM "unmet_searches" WHERE "lastSeen" < current_date - interval '12 months'
