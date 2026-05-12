-- Rename the "AI Plugins for Business Softwar" category to the un-truncated form.
-- The original truncation came from an Excel sheet-name limit during the initial
-- import; this migration fixes the row in place. Slug also moves from
-- "ai-plugins-for-business-softwar" to "ai-plugins-business-software".
-- See feature/category-restructure for the surrounding work.

UPDATE categories
SET name = 'AI Plugins for Business Software',
    slug = 'ai-plugins-business-software'
WHERE slug = 'ai-plugins-for-business-softwar';
