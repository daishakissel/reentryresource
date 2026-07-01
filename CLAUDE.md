# Reentry Resource

Resource directory website for homeless services, built for Steven's wife Daisha.

## Repo Structure

```
reentryresource/
├── site/           # Next.js 14 web app — the main resource directory
│   ├── src/        # All app source code
│   ├── scripts/    # DB export, image migration
│   ├── docs/       # Documentation (schema, guides, scraping queue, etc.)
│   ├── data/       # Source CSV files
│   └── public/     # Static assets
├── app/            # Expo (React Native) mobile app — self-coaching app (in development)
│   ├── app/        # expo-router screens (tabs, element, resources, feature)
│   ├── features/   # self-contained feature modules (resources, tractions, diary, ...)
│   ├── lib/        # db (SQLite), elements registry, supabase client
│   └── docs/       # Mobile app documentation
└── CLAUDE.md       # This file
```

Both `site/` and `app/` connect to the same Supabase project.

- **Web app docs:** `site/docs/` — schema, admin guide, setup guide, scraping guide, etc.
- **Mobile app docs:** `app/docs/` — to be created when app development begins

---

## site/ — Next.js Web App

### Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS with `@tailwindcss/typography`
- **Rich text editor:** TipTap (with underline, link, table extensions)
- **Database:** Supabase (Postgres) with Row Level Security
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Auth:** Supabase Auth (admin/editor/author roles)
- **Maps:** Leaflet.js via react-leaflet
- **Search:** Fuse.js for fuzzy matching
- **Content:** react-markdown with rehype-raw (HTML + Markdown)
- **Address autocomplete:** Photon (free, open source)

### GitHub & Deployment
- **Repo:** https://github.com/daishakissel/reentryresource.git
- **Live site:** https://reentryresource.vercel.app/
- **Supabase project ID:** wwpimaflhhbidzjbhmtk
- **Git user:** daishakissel / Steven Cannoodt (stevencannoodt@gmail.com)
- **Wife's email:** daishakissel@gmail.com

> **⚠️ Uncommitted reorganization:** Site files were moved from repo root (`src/`) into `site/src/`. This is currently **not committed or pushed**. Vercel still deploys the old root structure. After committing, update Vercel Root Directory to `site`.

### Project Structure

```
site/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── admin/                  # Admin pages
│   │   │   ├── add-resource/       # Add new resource form
│   │   │   ├── edit-resource/[id]/ # Edit resource form
│   │   │   ├── resources/          # Resource list + import/export CSV
│   │   │   ├── shelters/           # Shelter list
│   │   │   ├── shelter/[id]/       # Shelter pages editor
│   │   │   ├── users/              # User management
│   │   │   └── database/           # Database admin view
│   │   ├── api/                    # API routes
│   │   │   ├── filters/            # Filter options + counts
│   │   │   ├── geocode/            # Photon geocoding proxy
│   │   │   ├── resources/[id]/tags # Resource tag fetching
│   │   │   └── admin/              # Auth-protected CRUD routes
│   │   ├── elements/[slug]/        # Element (WHY) category pages
│   │   ├── login/                  # Login page
│   │   ├── privacy/                # Privacy policy
│   │   ├── resource/[slug]/        # Resource detail page
│   │   ├── search/                 # Search page
│   │   ├── shelter/[slug]/[pageSlug]/ # Shelter page view (password-protected)
│   │   └── terms/                  # Terms of service
│   ├── components/
│   │   ├── AppShell.tsx            # Main layout with header, sidebars, footer
│   │   ├── Sidebar.tsx             # RIGHT sidebar — elements navigation
│   │   ├── RightSidebar.tsx        # LEFT sidebar — user/shelter/my-location (legacy name)
│   │   ├── ResourceCard.tsx        # Resource card; image flips (bottom-left button) to show all mode/category/format/centering labels
│   │   ├── ResourceGrid.tsx        # Grid of resource cards with infinite scroll
│   │   ├── ResourceFilter.tsx      # Dropdown filter (Categories, Formats, Centerings)
│   │   ├── ResourceMap.tsx         # Leaflet map wrapper (dynamic import)
│   │   ├── ResourceMapInner.tsx    # Map with markers, My Location, context menu
│   │   ├── RichTextEditor.tsx      # TipTap WYSIWYG editor (used in add/edit forms)
│   │   ├── ViewToggle.tsx          # Format tabs, map toggle, mode filters, grouping
│   │   ├── SearchBar.tsx           # Header search bar
│   │   ├── ContentRenderer.tsx     # Markdown/HTML renderer
│   │   ├── InfoTooltip.tsx         # Click-to-open modal tooltip (used on filters/map)
│   │   ├── WelcomeModal.tsx        # First-visit modal explaining the UI
│   │   ├── ImageUpload.tsx         # Image upload with JPEG compression
│   │   ├── ContentImageInsert.tsx  # Insert image button for content editor
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   ├── context/
│   │   ├── AuthContext.tsx         # Auth with roles (admin/editor/author)
│   │   ├── ThemeContext.tsx        # Dark/light mode (localStorage)
│   │   ├── ShelterContext.tsx      # Shelter selection & unlock (localStorage)
│   │   └── MyLocationContext.tsx   # User location pin + radius (localStorage)
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client
│   │   ├── constants.ts            # ELEMENTS array (navigation items)
│   │   ├── filterStorage.ts        # localStorage for filters, last element
│   │   ├── searchUtils.ts          # Fuse.js search
│   │   ├── imageUpload.ts          # Image compression + upload
│   │   └── useInfiniteResources.ts # Paginated resource fetching hook
│   └── types/
│       └── database.ts             # TypeScript types
├── scripts/
│   ├── export-db-schema.js         # Exports live DB schema to site/docs/DATABASE_SCHEMA_CURRENT.md
│   └── migrate-images.js           # Migrates external images to Supabase Storage
├── docs/                           # All site documentation
│   ├── DATABASE_SCHEMA_CURRENT.md  # Auto-generated live DB schema (run export-db-schema)
│   ├── SCRAPING_GUIDE.md           # How to scrape and import resources
│   ├── SCRAPE_QUEUE.md             # URLs waiting to be scraped
│   ├── SCRAPED_SOURCES.md          # Completed scrapes log
│   ├── ADMIN_GUIDE.md              # Admin UI guide
│   ├── SETUP_GUIDE.md              # Dev environment setup
│   ├── DEPLOYMENT_GUIDE.md         # Vercel deployment guide
│   └── imports/                    # CSV files ready to import
├── data/
│   ├── caowash-import.csv
│   └── gd_place_1906261934_ab8da2db.csv
├── public/                         # Static assets (favicon, logo, apple-touch-icon)
├── .env.local                      # Local env (not committed)
├── next.config.js
└── package.json
```

### Database Schema

#### Naming Convention
The database was renamed from the original WHY/WHAT/WHERE/HOW/WHO naming:
- **Elements** (was WHY Categories) — 6 core motivations
- **Categories** (was WHAT Topics) — 32 service types
- **Modes** (was WHERE + WHEN merged) — 3 access methods (In Person, Online, By Appointment Only)
- **Formats** (was HOW) — 4 delivery types
- **Centerings** (was WHO) — 21 populations served

#### Tables (Live DB — verified July 2026)

| Table | Rows | Notes |
|---|---|---|
| `elements` | 6 | Health, Housing, Admin, Income, Daily Essentials, My Team |
| `categories` | 32 | Service types — see full list in SCRAPING_GUIDE.md |
| `modes` | 3 | In Person, Online, By Appointment Only |
| `formats` | 4 | Services; Classes, Workshops & Meetings; Guidebooks; Volunteering |
| `centerings` | 21 | Populations served — see full list in SCRAPING_GUIDE.md |
| `resources` | 16 | Main content table (12 CAO + 4 4D Recovery) |
| `categories_elements` | 33 | Junction: which categories map to which elements |
| `resources_categories` | varies | Junction: which categories each resource belongs to |
| `resources_modes` | varies | Junction: In Person / Online / By Appointment Only |
| `resources_formats` | varies | Junction: Services / Classes / Guidebooks / Volunteering |
| `resources_centerings` | varies | Junction: populations served |
| `resources_elements` | varies | Auto-populated from categories via categories_elements |
| `shelters` | 1 | Bybee shelter |
| `shelter_pages` | 2 | Nested tree structure |

#### `resources` Table Columns

```
id, title, slug, organization_name, facility_name, description, engage, content,
featured_image, street_address, city, state, zip, region, country, latitude, longitude,
phone, email, website, expiration_date, source_url, scraped_url, scraped_at,
last_verified_at, scrape_status, content_hash, created_by, created_at, updated_at
```

#### Important Notes
- Resources link to categories via `resources_categories` (many-to-many, max 4 categories per resource)
- Elements are auto-populated as the union of all elements from all assigned categories
- `when_times` table was DROPPED — "By Appointment Only" moved into `modes`
- Import CSV uses semicolons (`;`) as separator for multi-value fields (modes, formats, centerings)
- Resource cards render category icon SVGs from Supabase Storage when no `featured_image` is set
- Expired resources (past `expiration_date`) are hidden from public but visible in admin

### Layout
- **Header:** User icon (left → LEFT sidebar), Logo (center), Search bar (below logo), Resource icon (right → RIGHT sidebar)
- **Left sidebar (RightSidebar.tsx):** My Location, Shelter selection, User/Admin menu
- **Right sidebar (Sidebar.tsx):** Elements navigation (All, Health, Housing, etc.)
- **Format tabs:** Services, Classes/Workshops/Meetings, Guidebooks, Volunteering
- **Mode buttons:** Show/Hide In Person, Show/Hide Online
- **Dark mode:** Ocean deeper (#0D2230) background

### Scripts (run from `site/`)
```bash
npm run dev                  # local dev server
npm run build                # production build
npm run export-db-schema     # export live DB schema to site/docs/DATABASE_SCHEMA_CURRENT.md
node scripts/migrate-images.js --dry-run   # preview external image migration
node scripts/migrate-images.js             # migrate external images to Supabase Storage
```

### Dev Notes
- `next.config.js` has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` (temporary)
- Supabase Storage buckets: `resources` (public, includes `categories/` for default images), `shelters` (public)
- `.env.local` needs: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Kill old node processes: `kill $(lsof -t -i :3000)` before `npm run dev`
- Load nvm: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
- Dev server runs from `site/` directory: `cd site && npm run dev`

---

## app/ — Expo React Native App

A **self-coaching app for reentry**, structured around the same 6 Elements as the
site. All personal data is stored **locally on the device** (SQLite) — no online
account, for user safety. Resources are read-only from the shared Supabase DB.

**Full architecture & data model live in `app/docs/` — read those first.**

### Tech Stack
- **Framework:** Expo SDK **54** (React Native 0.81, React 19). New Architecture on.
- **Routing:** `expo-router` (file-based, entry `expo-router/entry`)
- **Local DB:** `expo-sqlite` (`lib/db/`) with a `user_version` migration runner
- **Secrets/keys:** `expo-secure-store` (for the future app password / DB encryption)
- **Resources:** `@supabase/supabase-js` — read-only (`lib/supabase.ts`, anon key only)
- **Credentials:** `app/.env.local` — `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Core Concepts
- **Elements** (`lib/elements.ts`) — the 6 spokes; slugs match the site.
- **Feature modules** (`features/`, registered in `features/registry.ts`) — each
  "sub-app" (Resources, Weight, Sober, ...) declares which Elements it appears
  under. Adding a feature = add a registry entry + a screen under `app/`.
- **Tractions** (`features/tractions/`) — daily action steps tagged to an Element;
  aggregated centrally. Home badges + the Tractions tab both read this store.

### Navigation
- Bottom tabs: **Home · Tractions · Diary · Profile** (`app/(tabs)/`)
- `app/element/[slug].tsx` — an Element's data-driven module menu
- `app/resources/[element].tsx` — Resources module (Supabase, filtered by element)
- `app/feature/*` — individual feature screens

### Gotchas (learned the hard way — see docs/DEV_GUIDE.md)
- `babel-preset-expo` **must match the SDK** (54.x). A mismatched version causes
  cryptic `Property 'DOMException'/'PerformanceEntry' does not exist` boot errors.
- Expo Go on the test device must support the project's SDK (54).
- `Alert.prompt` is **iOS-only** — replace with a custom modal before Android.
- After config/babel changes: `npx expo start --clear` and fully relaunch Expo Go.

To start: `cd app && npm install && npx expo start`

---

## Current State (July 2026)

- **16 resources** in production: 12 from caowash.org + 4 from 4drecovery.org
- Database schema renamed (elements/categories/modes/formats/centerings) ✓
- All junction tables exist in DB ✓
- Site files moved from root `src/` to `site/src/` — **uncommitted, not yet pushed or deployed**
- After committing the reorganization: update Vercel Root Directory setting to `site`
- Scraping is underway — see `site/docs/SCRAPE_QUEUE.md` and `site/docs/SCRAPED_SOURCES.md`
- Expo mobile app (`app/`) — architecture skeleton built: SQLite data core,
  Elements grid + module menus, Tractions, Diary, and read-only Resources from
  Supabase. See `app/docs/`. Feature modules (weight, sober, metaphor, app
  password/encryption, on-device SLM) still to come.
