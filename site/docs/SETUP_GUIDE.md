# Setup Guide

## Prerequisites

- Node.js 18+ and npm
- A Supabase project (free tier works)
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/daishakissel/reentryresource.git
cd reentryresource
```

---

## 2. Set Up the Web App (site/)

```bash
cd site
npm install
```

### Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in your Supabase project: **Project Settings → API**.

---

## 3. Set Up the Database

Run the following in the **Supabase SQL Editor** (Dashboard → SQL Editor → New query) in order:

### Step 1: Create dimension tables

Create `elements`, `categories`, `modes`, `formats`, `centerings` tables with their seed data.
(Use the schema from `docs/DATABASE_SCHEMA_CURRENT.md` as reference.)

### Step 2: Create the resources table

Include all columns: `id`, `title`, `slug`, `organization_name`, `facility_name`, `description`, `engage`, `content`, `featured_image`, address fields, coordinate fields, contact fields, `expiration_date`, `source_url`, `scraped_url`, `scraped_at`, `last_verified_at`, `scrape_status`, `content_hash`, `created_by`, `created_at`, `updated_at`.

### Step 3: Create junction tables

Create the following junction tables (all exist in the live DB — recreate for new environments):
- `categories_elements` — links categories to elements
- `resources_categories` — links resources to categories
- `resources_modes` — links resources to modes
- `resources_formats` — links resources to formats
- `resources_centerings` — links resources to centerings
- `resources_elements` — auto-populated from categories via categories_elements

### Step 4: Create shelter tables

```sql
CREATE TABLE shelters (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  slug         text NOT NULL UNIQUE,
  short_name   text,
  address      text,
  org_name     text,
  phone        text,
  email        text,
  website      text,
  password_hash text NOT NULL,
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE shelter_pages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shelter_id uuid NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
  title      text NOT NULL,
  slug       text NOT NULL,
  content    text NOT NULL DEFAULT '',
  sort_order int  NOT NULL DEFAULT 0,
  parent_id  uuid REFERENCES shelter_pages(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (shelter_id, slug)
);
```

### Step 5: Enable RLS

Enable Row Level Security on all tables with public SELECT policies. Write operations use the service role key server-side.

### Step 6: Create Storage Buckets

In Supabase Dashboard → Storage, create two **public** buckets:
- `resources` — for featured images, content images, and category SVG icons (in a `categories/` folder)
- `shelters` — for shelter page images

---

## 4. Create Your First Admin User

In Supabase Dashboard: **Authentication → Users → Add user** (email + password).

---

## 5. Run the Dev Server

```bash
cd site
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 6. Log In

Click the user icon (top-left) to open the sidebar, then click **Login**.

---

## Project Structure

```
reentryresource/
├── site/           # Next.js 14 web app
│   ├── src/
│   │   ├── app/    # Pages and API routes
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── types/
│   ├── scripts/    # DB export, image migration
│   ├── data/       # Source CSV files
│   └── public/     # Static assets
├── app/            # Expo React Native app (early stage)
└── docs/           # Shared documentation
```

---

## Useful Commands (from `site/`)

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run export-db-schema` | Export current DB schema to `docs/DATABASE_SCHEMA_CURRENT.md` |
| `node scripts/migrate-images.js --dry-run` | Preview external image migration |
| `node scripts/migrate-images.js` | Migrate external images to Supabase Storage |

---

## Setting Up the Expo App (app/)

The mobile app is an early-stage scaffold. To start development:

```bash
cd app
npm install
npm start    # opens Expo dev tools
```

The app connects to the same Supabase project. Configure `app/.env.local` with the same credentials.
