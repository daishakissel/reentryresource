-- Direct junction table: resources ↔ why_categories
create table resources_why_categories (
  resource_id uuid not null references resources(id) on delete cascade,
  why_category_id uuid not null references why_categories(id) on delete cascade,
  primary key (resource_id, why_category_id)
);

-- RLS
alter table resources_why_categories enable row level security;
create policy "Public read" on resources_why_categories for select using (true);

-- Populate from existing WHAT→WHY mappings
insert into resources_why_categories (resource_id, why_category_id)
select distinct r.id, wtwc.why_category_id
from resources r
join what_topics_why_categories wtwc on wtwc.what_topic_id = r.what_topic_id
on conflict do nothing;
