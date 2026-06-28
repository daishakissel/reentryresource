-- ============================================================
-- SIMPLIFY WHERE, HOW, WHEN dimensions
-- ============================================================
-- Run AFTER deleting all resources (015)
-- ============================================================

-- STEP 1: Clear junction tables (should be empty if resources deleted)
delete from resources_where_location_types;
delete from resources_when_times;
delete from resources_how_formats;

-- STEP 2: WHERE — reduce to 2 options
delete from where_location_types;
insert into where_location_types (name, definition, sort_order) values
  ('In Person', 'Physical location you visit in person', 1),
  ('Online', 'Digital resource accessible via website, app, phone, or email', 2);

-- STEP 3: HOW — reduce to 5 options
delete from how_formats;
insert into how_formats (name, definition, sort_order) values
  ('Services', 'Direct service or appointment-based help (counseling, medical, food distribution, etc.)', 1),
  ('Classes, Workshops & Meetings', 'Structured learning, training sessions, or group meetings (AA, support groups, etc.)', 2),
  ('Guidebooks', 'Online information resources — how-to guides, videos, podcasts, blog posts, infographics, step-by-step instructions', 3),
  ('Volunteering', 'Opportunity to volunteer time or skills', 4);

-- STEP 4: WHEN — reduce to 1 option
delete from when_times;
insert into when_times (name, definition, sort_order) values
  ('By Appointment Only', 'Requires scheduling or booking in advance. If not marked, walk-in or open access is available.', 1);
