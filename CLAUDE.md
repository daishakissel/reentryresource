# Reentry Resource

Resource directory website for homeless services, built for Steven's wife Daisha.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS with `@tailwindcss/typography`
- **Database:** Supabase (Postgres) with Row Level Security
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Auth:** Supabase Auth (admin/editor/author roles)
- **Maps:** Leaflet.js via react-leaflet
- **Search:** Fuse.js for fuzzy matching
- **Content:** react-markdown with rehype-raw (HTML + Markdown)
- **Address autocomplete:** Photon (free, open source)

## GitHub & Deployment
- **Repo:** https://github.com/daishakissel/reentryresource.git
- **Live site:** https://reentryresource.vercel.app/
- **Supabase project ID:** wwpimaflhhbidzjbhmtk
- **Git user:** daishakissel / Steven Cannoodt (stevencannoodt@gmail.com)
- **Wife's email:** daishakissel@gmail.com

## Project Structure
```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin pages (resources, shelters, users, database)
│   ├── api/              # API routes (filters, resources, shelters, users, geocode, search)
│   ├── login/            # Login page
│   ├── resource/[slug]/  # Resource detail page (slug-based URLs)
│   ├── search/           # Search page
│   ├── shelter/          # Shelter page view (password-protected)
│   └── why/[slug]/       # Element (WHY) category pages
├── components/           # React components
│   ├── AppShell.tsx      # Main layout with header, sidebars, footer
│   ├── Sidebar.tsx       # RIGHT sidebar - resource navigation by elements
│   ├── RightSidebar.tsx  # LEFT sidebar - user/shelter/my-location (naming is legacy)
│   ├── ResourceCard.tsx  # Resource card with expandable description
│   ├── ResourceGrid.tsx  # Grid of resource cards with infinite scroll
│   ├── ResourceFilter.tsx # Dropdown filter (Categories, Formats, Centerings)
│   ├── ResourceMap.tsx   # Leaflet map wrapper (dynamic import)
│   ├── ResourceMapInner.tsx # Map with markers, My Location, context menu
│   ├── ViewToggle.tsx    # Format tabs, map toggle, mode filters, grouping
│   ├── SearchBar.tsx     # Header search bar
│   ├── ContentRenderer.tsx # Markdown/HTML renderer
│   └── Footer.tsx, Logo.tsx, ImageUpload.tsx, ContentImageInsert.tsx
├── context/              # React contexts
│   ├── AuthContext.tsx    # Auth with roles (admin/editor/author)
│   ├── ThemeContext.tsx   # Dark/light mode (localStorage)
│   ├── ShelterContext.tsx # Shelter selection & unlock (localStorage)
│   └── MyLocationContext.tsx # User location pin + radius (localStorage)
├── lib/                  # Utilities
│   ├── supabase.ts       # Supabase client
│   ├── constants.ts      # ELEMENTS array (navigation items)
│   ├── filterStorage.ts  # localStorage for filters, last element
│   ├── searchUtils.ts    # Fuse.js search
│   ├── imageUpload.ts    # Image compression + upload
│   └── useInfiniteResources.ts # Paginated resource fetching hook
└── types/
    └── database.ts       # TypeScript types
```

## Database Schema (Current — renamed from v2)

### Naming Convention (IMPORTANT)
The database was renamed from the original WHY/WHAT/WHERE/HOW/WHO naming:
- **Elements** (was WHY Categories) — 6 core motivations (Health, Housing, Admin, Income, Daily Essentials, My Team)
- **Categories** (was WHAT Topics) — 32 service types (Shelter, Food, Medical, etc.)
- **Modes** (was WHERE) — 3 access methods (In Person, Online, By Appointment Only)
- **Formats** (was HOW) — 4 delivery types (Services, Classes Workshops & Meetings, Guidebooks, Volunteering)
- **Centerings** (was WHO) — 19 populations served

### Key Tables
- `elements` — 6 rows
- `categories` — 32 rows, each linked to elements via `categories_elements`, each has `default_featured_image` (SVG tarot-card URL in Supabase Storage at `resources/categories/`)
- `modes` — 3 rows (In Person, Online, By Appointment Only)
- `formats` — 4 rows
- `centerings` — 19 rows
- `resources` — main content table with slug, engage, expiration_date, plus scrape tracking fields (source_url = this resource's specific page, scraped_url = the root URL given to start scraping, scraped_at, last_verified_at, scrape_status, content_hash)
- `resources_categories`, `resources_modes`, `resources_formats`, `resources_centerings`, `resources_elements` — junction tables
- `shelters` — with address, org name, phone, email, website, short_name
- `shelter_pages` — with parent_id for tree structure

### Important Notes
- Resources link to categories via `resources_categories` junction table (many-to-many, max 4 categories per resource)
- Elements are auto-populated as the union of all elements from all assigned categories
- The `when_times` and `resources_when_times` tables were DROPPED — "By Appointment Only" moved into `modes`
- Import CSV uses semicolons (`;`) as separator, NOT commas (commas break "Classes, Workshops & Meetings")
- Resource cards dynamically render category icon SVGs from Supabase Storage when no `featured_image` is set (1-4 icons in grid layout)
- CSV category field supports semicolons for multiple categories (e.g., `Shelter; Food`)
- Resources without a format default to "Services" in the UI
- Expired resources (past `expiration_date`) are hidden from public but visible in admin

## Layout
- **Header:** User icon (left, opens LEFT sidebar), Logo (center), Search bar (below logo), Resource icon (right, opens RIGHT sidebar)
- **Left sidebar (RightSidebar.tsx):** My Location, Shelter selection, User/Admin menu
- **Right sidebar (Sidebar.tsx):** Elements navigation (All, Health, Housing, etc.)
- **Sidebars:** Full-screen overlay with shadow fade, swipe to close
- **Format tabs:** Services, Classes/Workshops/Meetings, Guidebooks, Volunteering
- **Mode buttons:** Show/Hide In Person, Show/Hide Online
- **Dark mode:** Ocean deeper (#0D2230) background

## Key Features
- Infinite scroll (10 resources per page)
- Fuzzy search with Fuse.js
- My Location with Photon address autocomplete + map pin
- Radius selector (5-50 miles)
- Map: tap-to-interact overlay, right-click to set location, Shift+scroll to zoom
- CSV import/export with full roundtrip support
- Image upload with JPEG compression to Supabase Storage
- Markdown + HTML content rendering
- Shelter pages with tree structure and password protection

## Scripts
- `npm run dev` — local dev server
- `npm run export-db-schema` — export live DB schema to docs/
- `node scripts/migrate-images.js` — migrate external images to Supabase Storage

## Current State (June 2026)
- 12 resources imported from caowash.org (first scrape test)
- Database schema fully renamed (elements/categories/modes/formats/centerings)
- Scraping guide updated at docs/SCRAPING_GUIDE.md
- Ready to continue scraping more URLs
- All changes pushed to GitHub, Vercel auto-deploying

## Development Notes
- `next.config.js` has `ignoreBuildErrors: true` (temporary for deployment)
- Supabase Storage buckets: `resources` (public, includes `categories/` folder for default images), `shelters` (public)
- `.env.local` needs: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- Kill old node processes: `kill $(lsof -t -i :3000)` before `npm run dev`
- Load nvm: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
