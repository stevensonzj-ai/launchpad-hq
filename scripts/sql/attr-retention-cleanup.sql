DELETE FROM "first_touch_attributions" WHERE "createdAt" < now() - interval '12 months'
