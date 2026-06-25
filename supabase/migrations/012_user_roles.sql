-- User roles: admin, editor, author
create table user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  role text not null default 'author' check (role in ('admin', 'editor', 'author')),
  created_at timestamptz default now()
);

alter table user_roles enable row level security;
create policy "Public read user_roles" on user_roles for select using (true);
