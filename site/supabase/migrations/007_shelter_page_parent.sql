-- Add parent page support for tree structure
alter table shelter_pages add column parent_id uuid references shelter_pages(id) on delete set null;
