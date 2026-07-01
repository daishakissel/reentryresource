-- Move "By Appointment Only" into where_location_types and drop when_times
-- Run AFTER 020

-- Clear any junction data
delete from resources_when_times;

-- Add "By Appointment Only" to where_location_types
insert into where_location_types (name, definition, sort_order) values
  ('By Appointment Only', 'Requires scheduling or booking in advance', 3);

-- Drop when junction table and dimension table
drop table if exists resources_when_times cascade;
drop table if exists when_times cascade;
