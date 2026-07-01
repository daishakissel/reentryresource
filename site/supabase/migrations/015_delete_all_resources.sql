-- ============================================================
-- DELETE ALL RESOURCES (keeps schema, dimensions, shelters intact)
-- ============================================================
--
-- This deletes:
--   - All rows from resources table
--   - All junction table rows (cascade from resources FK)
--   - All resources_why_categories rows (cascade)
--
-- This does NOT delete:
--   - Dimension tables (what_topics, why_categories, etc.)
--   - Dimension values (Shelter, Housing, etc.)
--   - Shelters and shelter pages
--   - Storage bucket files (images remain in Supabase Storage)
--   - Auth users
--
-- After running this, the site will show 0 resources.
-- Import a CSV through the admin panel to repopulate.
-- ============================================================

-- Junction tables cascade from resources, but let's be explicit
delete from resources_where_location_types;
delete from resources_when_times;
delete from resources_how_formats;
delete from resources_who_centerings;
delete from resources_why_categories;

-- Delete all resources
delete from resources;

-- Verify
-- select count(*) from resources;
-- Should return 0
