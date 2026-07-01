-- ============================================================
-- RENAME ALL DIMENSION AND JUNCTION TABLES
-- Old → New naming convention
-- ============================================================
-- Run AFTER resources are deleted (empty junction tables)
-- ============================================================

-- Rename dimension tables
alter table why_categories rename to elements;
alter table what_topics rename to categories;
alter table where_location_types rename to modes;
alter table how_formats rename to formats;
alter table who_centerings rename to centerings;

-- Rename junction tables
alter table what_topics_why_categories rename to categories_elements;
alter table resources_where_location_types rename to resources_modes;
alter table resources_how_formats rename to resources_formats;
alter table resources_who_centerings rename to resources_centerings;
alter table resources_why_categories rename to resources_elements;

-- Rename foreign key columns in categories_elements
alter table categories_elements rename column what_topic_id to category_id;
alter table categories_elements rename column why_category_id to element_id;

-- Rename foreign key columns in resources junction tables
alter table resources_modes rename column where_location_type_id to mode_id;
alter table resources_formats rename column how_format_id to format_id;
alter table resources_centerings rename column who_centering_id to centering_id;
alter table resources_elements rename column why_category_id to element_id;

-- Rename the FK column on resources table
alter table resources rename column what_topic_id to category_id;

-- ============================================================
-- RLS policies — recreate with new table names
-- (old policies auto-renamed with tables, but let's be explicit)
-- ============================================================
-- Policies follow the tables, no action needed
