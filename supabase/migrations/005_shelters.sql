-- Shelters
create table shelters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Shelter pages
create table shelter_pages (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid not null references shelters(id) on delete cascade,
  title text not null,
  slug text not null,
  content text not null default '',
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(shelter_id, slug)
);

-- RLS policies
alter table shelters enable row level security;
alter table shelter_pages enable row level security;

create policy "Public read shelters" on shelters for select using (true);
create policy "Public read shelter_pages" on shelter_pages for select using (true);

-- Seed default shelters
insert into shelters (name, slug, password_hash) values
  ('Bybee', 'bybee', '');
