-- Enable RLS and public read on junction tables
alter table resource_topics enable row level security;
alter table resource_age_groups enable row level security;
alter table resource_genders enable row level security;
alter table resource_centerings enable row level security;
alter table resource_languages enable row level security;
alter table resource_formats enable row level security;
alter table resource_times enable row level security;
alter table resource_days enable row level security;
alter table resource_accessibility enable row level security;
alter table resource_costs enable row level security;
alter table resource_capacities enable row level security;

create policy "Public read resource_topics" on resource_topics for select using (true);
create policy "Public read resource_age_groups" on resource_age_groups for select using (true);
create policy "Public read resource_genders" on resource_genders for select using (true);
create policy "Public read resource_centerings" on resource_centerings for select using (true);
create policy "Public read resource_languages" on resource_languages for select using (true);
create policy "Public read resource_formats" on resource_formats for select using (true);
create policy "Public read resource_times" on resource_times for select using (true);
create policy "Public read resource_days" on resource_days for select using (true);
create policy "Public read resource_accessibility" on resource_accessibility for select using (true);
create policy "Public read resource_costs" on resource_costs for select using (true);
create policy "Public read resource_capacities" on resource_capacities for select using (true);
