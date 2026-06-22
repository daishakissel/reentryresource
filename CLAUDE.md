# Reentry Resource

Resource directory website for homeless services, built for Steven's wife.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres)
- **Hosting:** Vercel
- **Auth:** Supabase Auth (admin-only)

## Project Structure
- `src/app/` — App Router pages (homepage, category/[slug], admin)
- `src/components/` — Header, Sidebar, FilterPanel, ResourceGrid, ResourceCard, ViewToggle, Footer
- `src/lib/` — Supabase client, constants
- `src/types/` — Database types
- `supabase/migrations/` — SQL schema migrations

## Development
```bash
npm install
cp .env.local.example .env.local  # fill in Supabase credentials
npm run dev
```

## Key Patterns
- Sidebar: left overlay on mobile (blur backdrop), static on desktop
- FilterPanel: right overlay on mobile (blur backdrop), static on desktop
- Resource grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Categories: Health, Housing, Work, Administration, Tools, Network + All (homepage)
- Shelters: Bybee or None (dropdown in sidebar)
- Admin section behind Supabase auth
