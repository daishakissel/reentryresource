# ⚠️ DEPRECATED — Reentry Resource — Database Schema v2

> This file describes the OLD schema (WHY/WHAT/WHERE/WHEN/HOW/WHO naming) before the June 2026 rename.
> It is kept for historical reference only. **Do not use this as a reference for the current schema.**
> See `docs/DATABASE_SCHEMA_CURRENT.md` for the live schema.

## Overview

PostgreSQL via Supabase. UUID primary keys. Row Level Security (RLS) with public read policies. Supabase Auth for admin users. 6-angle classification framework.

---

## Authentication

Managed by **Supabase Auth** (`auth.users`). Not custom tables.

---

## Dimension Tables

### why_categories (6 rows)

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL, UNIQUE |
| definition | text | nullable |
| slug | text | NOT NULL, UNIQUE |
| sort_order | int | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | DEFAULT now() |

Values: Health, Housing, Admin, Income, Daily Essentials, My Team

### what_topics (32 rows)

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL, UNIQUE |
| slug | text | NOT NULL, UNIQUE |
| sort_order | int | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | DEFAULT now() |

Values: Animal Support, Farm Life, Nature, Benefits, Case Management, Children Support, Parenting, Clothing, Crisis Hotlines, Dental, Detox, Recovery, Education, Skill Building, Employment & Career, Financial, Movement, Food, Housing, ID & Documents, Legal, Medical, Mental & Behavioral Health, Peer Support, Phone, Email, Rental Assistance, Shelter, Toiletries, Transport, Utilities, Health Insurance

### where_location_types (4 rows)

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL, UNIQUE |
| definition | text | nullable |
| sort_order | int | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | DEFAULT now() |

Values: Building, Online, Phone, Event

### when_times (4 rows)

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL, UNIQUE |
| definition | text | nullable |
| sort_order | int | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | DEFAULT now() |

Values: Anytime, Daytime, Walk In, By Appointment

### how_formats (9 rows)

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL, UNIQUE |
| definition | text | nullable |
| sort_order | int | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | DEFAULT now() |

Values: Classes & Workshops, Volunteering, Article, Infographic, Service, Podcast, Video, Book, Meetings

### who_centerings (19 rows)

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL, UNIQUE |
| definition | text | nullable |
| sort_order | int | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | DEFAULT now() |

Values: ASL Support, BIPOC, Clean & Sober, Couples, Domestic Violence (DV) Survivors, Families, Immigrants Refugees and Asylum Seekers, Justice Impacted, LGBTQIA2S+, Low Barrier, Men, People in Recovery, People with Disabilities, People with Pets/Animals, Seniors, Spanish Speakers, Survivors of Human Trafficking, Veterans, Women, Youth & Children

---

## Junction Table: WHAT → WHY

### what_topics_why_categories

| Column | Type | Constraints |
|---|---|---|
| what_topic_id | uuid | FK → what_topics(id) ON DELETE CASCADE |
| why_category_id | uuid | FK → why_categories(id) ON DELETE CASCADE |

PK: (what_topic_id, why_category_id)

---

## Main Content Table

### resources

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| title | text | NOT NULL |
| organization_name | text | nullable |
| facility_name | text | nullable |
| description | text | nullable (short summary for cards) |
| content | text | nullable (full HTML/Markdown content) |
| featured_image | text | nullable (URL) |
| street_address | text | nullable |
| city | text | nullable |
| state | text | nullable |
| zip | text | nullable |
| region | text | nullable (county or larger area) |
| country | text | nullable |
| latitude | double precision | nullable |
| longitude | double precision | nullable |
| phone | text | nullable |
| email | text | nullable |
| website | text | nullable |
| what_topic_id | uuid | FK → what_topics(id), nullable |
| created_by | text | NOT NULL, DEFAULT '' |
| created_at | timestamptz | DEFAULT now() |
| updated_at | timestamptz | DEFAULT now() |

---

## Resource Junction Tables

All use composite PKs and ON DELETE CASCADE on both FKs.

| Table | Columns |
|---|---|
| resources_where_location_types | resource_id (FK), where_location_type_id (FK) |
| resources_when_times | resource_id (FK), when_time_id (FK) |
| resources_how_formats | resource_id (FK), how_format_id (FK) |
| resources_who_centerings | resource_id (FK), who_centering_id (FK) |

---

## Shelter Tables

### shelters

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| name | text | NOT NULL |
| slug | text | NOT NULL, UNIQUE |
| password_hash | text | NOT NULL (currently plaintext) |
| created_at | timestamptz | DEFAULT now() |

### shelter_pages

| Column | Type | Constraints |
|---|---|---|
| id | uuid | PK, auto |
| shelter_id | uuid | NOT NULL, FK → shelters(id) ON DELETE CASCADE |
| title | text | NOT NULL |
| slug | text | NOT NULL |
| content | text | NOT NULL, DEFAULT '' |
| sort_order | int | NOT NULL, DEFAULT 0 |
| parent_id | uuid | FK → shelter_pages(id) ON DELETE SET NULL, nullable |
| created_at | timestamptz | DEFAULT now() |
| updated_at | timestamptz | DEFAULT now() |

UNIQUE: (shelter_id, slug)

---

## Row Level Security

All tables have RLS enabled with public SELECT policies. Write operations use the Supabase service role key server-side.

---

## Entity Relationships

```
why_categories ←M:N→ what_topics     (via what_topics_why_categories)
what_topics    ←1:N─  resources
resources      ─M:N→  where_location_types  (via resources_where_location_types)
resources      ─M:N→  when_times            (via resources_when_times)
resources      ─M:N→  how_formats           (via resources_how_formats)
resources      ─M:N→  who_centerings        (via resources_who_centerings)
shelters       ─1:N→  shelter_pages
shelter_pages  ─self→ shelter_pages          (via parent_id, tree structure)
```

---

## Storage Buckets (Supabase Storage)

| Bucket | Access | Purpose |
|---|---|---|
| resources | Public read, auth upload | Featured images, content images |
| shelters | Public read, auth upload | Shelter page images |

Images are compressed to JPEG on upload (max 1200px, 80% quality).
