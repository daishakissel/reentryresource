-- Add a rich content field to resources (separate from short description)
alter table resources add column content text;
