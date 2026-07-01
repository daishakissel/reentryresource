-- Add slug column to resources
alter table resources add column slug text;

-- Populate slugs from existing titles
update resources set slug = lower(
  regexp_replace(
    regexp_replace(
      regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ),
    '-+', '-', 'g'
  )
);

-- Remove leading/trailing dashes
update resources set slug = trim(both '-' from slug);

-- Handle duplicates by appending row number
with dupes as (
  select id, slug, row_number() over (partition by slug order by created_at) as rn
  from resources
)
update resources r
set slug = r.slug || '-' || d.rn
from dupes d
where r.id = d.id and d.rn > 1;

-- Now make it required and unique
alter table resources alter column slug set not null;
alter table resources add constraint resources_slug_unique unique (slug);
