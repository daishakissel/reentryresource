-- Enable RLS on all tables
alter table categories enable row level security;
alter table topics enable row level security;
alter table age_groups enable row level security;
alter table genders enable row level security;
alter table centerings enable row level security;
alter table languages enable row level security;
alter table formats enable row level security;
alter table times enable row level security;
alter table days_of_week enable row level security;
alter table accessibility_features enable row level security;
alter table costs enable row level security;
alter table capacities enable row level security;
alter table resources enable row level security;

-- Public read access on all lookup/filter tables
create policy "Public read categories" on categories for select using (true);
create policy "Public read topics" on topics for select using (true);
create policy "Public read age_groups" on age_groups for select using (true);
create policy "Public read genders" on genders for select using (true);
create policy "Public read centerings" on centerings for select using (true);
create policy "Public read languages" on languages for select using (true);
create policy "Public read formats" on formats for select using (true);
create policy "Public read times" on times for select using (true);
create policy "Public read days_of_week" on days_of_week for select using (true);
create policy "Public read accessibility_features" on accessibility_features for select using (true);
create policy "Public read costs" on costs for select using (true);
create policy "Public read capacities" on capacities for select using (true);
create policy "Public read resources" on resources for select using (true);
