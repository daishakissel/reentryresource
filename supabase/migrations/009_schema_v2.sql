-- ============================================================
-- REENTRY RESOURCE — SCHEMA V2 MIGRATION
-- 6-Angle Framework: WHY, WHAT, WHERE, WHEN, HOW, WHO
-- ============================================================
-- NOTE: shelters, shelter_pages, and auth.* tables are UNTOUCHED
-- ============================================================

-- ============================================================
-- STEP 1: DROP OLD JUNCTION TABLES
-- ============================================================
drop table if exists resource_topics cascade;
drop table if exists resource_age_groups cascade;
drop table if exists resource_genders cascade;
drop table if exists resource_centerings cascade;
drop table if exists resource_languages cascade;
drop table if exists resource_formats cascade;
drop table if exists resource_times cascade;
drop table if exists resource_days cascade;
drop table if exists resource_accessibility cascade;
drop table if exists resource_costs cascade;
drop table if exists resource_capacities cascade;

-- ============================================================
-- STEP 2: DROP OLD DIMENSION TABLES
-- ============================================================
drop table if exists topics cascade;
drop table if exists categories cascade;
drop table if exists age_groups cascade;
drop table if exists genders cascade;
drop table if exists centerings cascade;
drop table if exists languages cascade;
drop table if exists formats cascade;
drop table if exists times cascade;
drop table if exists days_of_week cascade;
drop table if exists accessibility_features cascade;
drop table if exists costs cascade;
drop table if exists capacities cascade;

-- ============================================================
-- STEP 3: DROP OLD RESOURCES TABLE
-- ============================================================
drop table if exists resources cascade;

-- ============================================================
-- STEP 4: CREATE NEW DIMENSION TABLES
-- ============================================================

-- WHY Categories (6 core motivations)
create table why_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  definition text,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- WHAT Topics (31 service types)
create table what_topics (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- WHERE Location Types (4 access methods)
create table where_location_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  definition text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- WHEN Times (4 availability types)
create table when_times (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  definition text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- HOW Formats (9 delivery formats)
create table how_formats (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  definition text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- WHO Centerings (18 populations served)
create table who_centerings (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  definition text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- STEP 5: CREATE WHAT→WHY JUNCTION TABLE
-- ============================================================

create table what_topics_why_categories (
  what_topic_id uuid not null references what_topics(id) on delete cascade,
  why_category_id uuid not null references why_categories(id) on delete cascade,
  primary key (what_topic_id, why_category_id)
);

-- ============================================================
-- STEP 6: CREATE NEW RESOURCES TABLE
-- ============================================================

create table resources (
  id uuid primary key default gen_random_uuid(),

  -- Identity & Content
  title text not null,
  description text,
  content text,
  featured_image text,

  -- Location Data
  street_address text,
  city text,
  state text,
  zip text,
  region text,
  country text,
  latitude double precision,
  longitude double precision,

  -- Contact Information
  phone text,
  email text,
  website text,

  -- Classification (direct FK)
  what_topic_id uuid references what_topics(id),

  -- Metadata
  created_by text not null default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- STEP 7: CREATE RESOURCE JUNCTION TABLES
-- ============================================================

create table resources_where_location_types (
  resource_id uuid not null references resources(id) on delete cascade,
  where_location_type_id uuid not null references where_location_types(id) on delete cascade,
  primary key (resource_id, where_location_type_id)
);

create table resources_when_times (
  resource_id uuid not null references resources(id) on delete cascade,
  when_time_id uuid not null references when_times(id) on delete cascade,
  primary key (resource_id, when_time_id)
);

create table resources_how_formats (
  resource_id uuid not null references resources(id) on delete cascade,
  how_format_id uuid not null references how_formats(id) on delete cascade,
  primary key (resource_id, how_format_id)
);

create table resources_who_centerings (
  resource_id uuid not null references resources(id) on delete cascade,
  who_centering_id uuid not null references who_centerings(id) on delete cascade,
  primary key (resource_id, who_centering_id)
);

-- ============================================================
-- STEP 8: ENABLE RLS & PUBLIC READ POLICIES
-- ============================================================

alter table why_categories enable row level security;
alter table what_topics enable row level security;
alter table where_location_types enable row level security;
alter table when_times enable row level security;
alter table how_formats enable row level security;
alter table who_centerings enable row level security;
alter table what_topics_why_categories enable row level security;
alter table resources enable row level security;
alter table resources_where_location_types enable row level security;
alter table resources_when_times enable row level security;
alter table resources_how_formats enable row level security;
alter table resources_who_centerings enable row level security;

create policy "Public read" on why_categories for select using (true);
create policy "Public read" on what_topics for select using (true);
create policy "Public read" on where_location_types for select using (true);
create policy "Public read" on when_times for select using (true);
create policy "Public read" on how_formats for select using (true);
create policy "Public read" on who_centerings for select using (true);
create policy "Public read" on what_topics_why_categories for select using (true);
create policy "Public read" on resources for select using (true);
create policy "Public read" on resources_where_location_types for select using (true);
create policy "Public read" on resources_when_times for select using (true);
create policy "Public read" on resources_how_formats for select using (true);
create policy "Public read" on resources_who_centerings for select using (true);

-- ============================================================
-- STEP 9: SEED WHY CATEGORIES
-- ============================================================

insert into why_categories (name, slug, definition, sort_order) values
  ('Health', 'health', 'I want this resource to be healthy (physical, mental, behavioral)', 1),
  ('Housing', 'housing', 'I want this resource to secure safe, stable housing', 2),
  ('Admin', 'admin', 'I want this resource to get my paperwork/legal affairs in order', 3),
  ('Income', 'income', 'I want this resource to increase my income (jobs, benefits, subsidies)', 4),
  ('Daily Essentials', 'daily-essentials', 'I want this resource to access material necessities (food, clothing, transport, comms)', 5),
  ('My Team', 'my-team', 'I want this resource to build my support network (peer support, relationships, community)', 6);

-- ============================================================
-- STEP 10: SEED WHAT TOPICS
-- ============================================================

insert into what_topics (name, slug, sort_order) values
  ('Animal Support', 'animal-support', 1),
  ('Farm Life', 'farm-life', 2),
  ('Nature', 'nature', 3),
  ('Benefits', 'benefits', 4),
  ('Case Management', 'case-management', 5),
  ('Children Support', 'children-support', 6),
  ('Parenting', 'parenting', 7),
  ('Clothing', 'clothing', 8),
  ('Crisis Hotlines', 'crisis-hotlines', 9),
  ('Dental', 'dental', 10),
  ('Detox', 'detox', 11),
  ('Recovery', 'recovery', 12),
  ('Education', 'education', 13),
  ('Skill Building', 'skill-building', 14),
  ('Employment & Career', 'employment-career', 15),
  ('Financial', 'financial', 16),
  ('Movement', 'movement', 17),
  ('Food', 'food', 18),
  ('Housing', 'housing', 19),
  ('ID & Documents', 'id-documents', 20),
  ('Legal', 'legal', 21),
  ('Medical', 'medical', 22),
  ('Mental & Behavioral Health', 'mental-behavioral-health', 23),
  ('Peer Support', 'peer-support', 24),
  ('Phone', 'phone', 25),
  ('Email', 'email', 26),
  ('Rental Assistance', 'rental-assistance', 27),
  ('Shelter', 'shelter', 28),
  ('Toiletries', 'toiletries', 29),
  ('Transport', 'transport', 30),
  ('Utilities', 'utilities', 31),
  ('Health Insurance', 'health-insurance', 32);

-- ============================================================
-- STEP 11: SEED WHAT→WHY RELATIONSHIPS
-- ============================================================

-- Health topics
insert into what_topics_why_categories (what_topic_id, why_category_id)
select wt.id, wc.id from what_topics wt, why_categories wc
where (wt.slug, wc.slug) in (
  ('animal-support', 'health'),
  ('farm-life', 'health'),
  ('nature', 'health'),
  ('children-support', 'health'),
  ('parenting', 'health'),
  ('dental', 'health'),
  ('detox', 'health'),
  ('recovery', 'health'),
  ('movement', 'health'),
  ('medical', 'health'),
  ('mental-behavioral-health', 'health'),
  ('health-insurance', 'health')
);

-- Housing topics
insert into what_topics_why_categories (what_topic_id, why_category_id)
select wt.id, wc.id from what_topics wt, why_categories wc
where (wt.slug, wc.slug) in (
  ('housing', 'housing'),
  ('rental-assistance', 'housing'),
  ('shelter', 'housing'),
  ('utilities', 'housing')
);

-- Admin topics
insert into what_topics_why_categories (what_topic_id, why_category_id)
select wt.id, wc.id from what_topics wt, why_categories wc
where (wt.slug, wc.slug) in (
  ('id-documents', 'admin'),
  ('legal', 'admin'),
  ('health-insurance', 'admin')
);

-- Income topics
insert into what_topics_why_categories (what_topic_id, why_category_id)
select wt.id, wc.id from what_topics wt, why_categories wc
where (wt.slug, wc.slug) in (
  ('benefits', 'income'),
  ('education', 'income'),
  ('skill-building', 'income'),
  ('employment-career', 'income'),
  ('financial', 'income')
);

-- Daily Essentials topics
insert into what_topics_why_categories (what_topic_id, why_category_id)
select wt.id, wc.id from what_topics wt, why_categories wc
where (wt.slug, wc.slug) in (
  ('clothing', 'daily-essentials'),
  ('food', 'daily-essentials'),
  ('phone', 'daily-essentials'),
  ('email', 'daily-essentials'),
  ('toiletries', 'daily-essentials'),
  ('transport', 'daily-essentials')
);

-- My Team topics
insert into what_topics_why_categories (what_topic_id, why_category_id)
select wt.id, wc.id from what_topics wt, why_categories wc
where (wt.slug, wc.slug) in (
  ('crisis-hotlines', 'my-team'),
  ('case-management', 'my-team'),
  ('peer-support', 'my-team')
);

-- ============================================================
-- STEP 12: SEED WHERE LOCATION TYPES
-- ============================================================

insert into where_location_types (name, definition, sort_order) values
  ('Building', 'Physical brick-and-mortar location where you go in person', 1),
  ('Online', 'Digital resource accessible via website/app/email', 2),
  ('Phone', 'Resource accessed by calling a phone number', 3),
  ('Event', 'Temporary physical location (fair, pop-up, mobile clinic, one-time event, etc.)', 4);

-- ============================================================
-- STEP 13: SEED WHEN TIMES
-- ============================================================

insert into when_times (name, definition, sort_order) values
  ('Anytime', 'Available 24/7 or whenever you need (open access)', 1),
  ('Daytime', 'Available during typical daytime hours', 2),
  ('Walk In', 'Open for walk-in access (no appointment needed)', 3),
  ('By Appointment', 'Requires scheduling/booking in advance', 4);

-- ============================================================
-- STEP 14: SEED HOW FORMATS
-- ============================================================

insert into how_formats (name, definition, sort_order) values
  ('Classes & Workshops', 'Structured learning or training sessions', 1),
  ('Volunteering', 'Opportunity to volunteer time/skills', 2),
  ('Article', 'Written content (blog, guide, resource)', 3),
  ('Infographic', 'Visual/graphical content (diagrams, charts, visual guides)', 4),
  ('Service', 'Direct service or appointment-based help (counseling, medical, etc.)', 5),
  ('Podcast', 'Audio content (series or episode)', 6),
  ('Video', 'Video content (tutorial, educational, story)', 7),
  ('Book', 'Physical or digital book', 8),
  ('Meetings', 'Structured group meetings (AA meetings, support groups, community meetings, etc.)', 9);

-- ============================================================
-- STEP 15: SEED WHO CENTERINGS
-- ============================================================

insert into who_centerings (name, definition, sort_order) values
  ('ASL or Language Support', 'Offers interpretation or accessibility for deaf/hard of hearing or non-English speakers', 1),
  ('BIPOC', 'Centers on Black, Indigenous, People of Color', 2),
  ('Couples', 'Designed for couples (relationship counseling, couples housing, etc.)', 3),
  ('Domestic Violence (DV) Survivors', 'Centers on survivors of domestic/intimate partner violence', 4),
  ('Families', 'Serves families (with or without children)', 5),
  ('Immigrants, Refugees, Asylum Seekers', 'Centers on immigrant and refugee populations', 6),
  ('Justice Impacted', 'Serves people with criminal justice system involvement', 7),
  ('LGBTQIA2S+', 'Centers on LGBTQ+ communities', 8),
  ('Low Barrier', 'Minimal/no requirements (no sobriety requirement, no ID needed, etc.)', 9),
  ('Men', 'Specifically serves men', 10),
  ('People in Recovery', 'Centers on people in addiction recovery', 11),
  ('People with Disabilities', 'Accessible and serving people with disabilities', 12),
  ('People with Pets/Animals', 'Welcomes or accommodates pets/animals', 13),
  ('Seniors', 'Serves older adults (55+, 60+, etc.)', 14),
  ('Survivors of Human Trafficking', 'Centers on trafficking survivors', 15),
  ('Veterans', 'Serves military veterans', 16),
  ('Women', 'Specifically serves women', 17),
  ('Youth & Children', 'Serves young people and children', 18);

-- ============================================================
-- DONE
-- ============================================================
