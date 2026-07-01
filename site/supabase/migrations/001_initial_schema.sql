-- Categories and topics
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

create table topics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references categories(id),
  created_at timestamptz default now()
);

-- Filter dimension tables
create table age_groups (id uuid primary key default gen_random_uuid(), name text not null unique);
create table genders (id uuid primary key default gen_random_uuid(), name text not null unique);
create table centerings (id uuid primary key default gen_random_uuid(), name text not null unique);
create table languages (id uuid primary key default gen_random_uuid(), name text not null unique);
create table formats (id uuid primary key default gen_random_uuid(), name text not null unique);
create table times (id uuid primary key default gen_random_uuid(), name text not null unique);
create table days_of_week (id uuid primary key default gen_random_uuid(), name text not null unique);
create table accessibility_features (id uuid primary key default gen_random_uuid(), name text not null unique);
create table costs (id uuid primary key default gen_random_uuid(), name text not null unique);
create table capacities (id uuid primary key default gen_random_uuid(), name text not null unique);

-- Resources
create table resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  featured_image text,
  address text,
  latitude double precision,
  longitude double precision,
  phone text,
  email text,
  website text,
  is_online boolean default false,
  category_id uuid references categories(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Junction tables
create table resource_topics (resource_id uuid references resources(id) on delete cascade, topic_id uuid references topics(id) on delete cascade, primary key (resource_id, topic_id));
create table resource_age_groups (resource_id uuid references resources(id) on delete cascade, age_group_id uuid references age_groups(id) on delete cascade, primary key (resource_id, age_group_id));
create table resource_genders (resource_id uuid references resources(id) on delete cascade, gender_id uuid references genders(id) on delete cascade, primary key (resource_id, gender_id));
create table resource_centerings (resource_id uuid references resources(id) on delete cascade, centering_id uuid references centerings(id) on delete cascade, primary key (resource_id, centering_id));
create table resource_languages (resource_id uuid references resources(id) on delete cascade, language_id uuid references languages(id) on delete cascade, primary key (resource_id, language_id));
create table resource_formats (resource_id uuid references resources(id) on delete cascade, format_id uuid references formats(id) on delete cascade, primary key (resource_id, format_id));
create table resource_times (resource_id uuid references resources(id) on delete cascade, time_id uuid references times(id) on delete cascade, primary key (resource_id, time_id));
create table resource_days (resource_id uuid references resources(id) on delete cascade, day_id uuid references days_of_week(id) on delete cascade, primary key (resource_id, day_id));
create table resource_accessibility (resource_id uuid references resources(id) on delete cascade, accessibility_feature_id uuid references accessibility_features(id) on delete cascade, primary key (resource_id, accessibility_feature_id));
create table resource_costs (resource_id uuid references resources(id) on delete cascade, cost_id uuid references costs(id) on delete cascade, primary key (resource_id, cost_id));
create table resource_capacities (resource_id uuid references resources(id) on delete cascade, capacity_id uuid references capacities(id) on delete cascade, primary key (resource_id, capacity_id));

-- Seed categories
insert into categories (name, slug) values
  ('Health', 'health'),
  ('Housing', 'housing'),
  ('Work', 'work'),
  ('Administration', 'administration'),
  ('Tools', 'tools'),
  ('Network', 'network');
