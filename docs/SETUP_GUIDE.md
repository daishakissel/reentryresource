# Setup Guide

## Prerequisites

- Node.js 18+ and npm
- A Supabase project (free tier works)
- Git

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd reentryresource
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in your Supabase project: **Project Settings → API**.

## 4. Set Up the Database

Run the migration files in order in the **Supabase SQL Editor** (Dashboard → SQL Editor → New query):

1. `supabase/migrations/009_schema_v2.sql` — Creates all tables and seeds enumeration values
2. `supabase/migrations/010_import_resources.sql` — Imports resources (if you have them)

For shelters:
1. `supabase/migrations/005_shelters.sql` — Creates shelter tables
2. `supabase/migrations/007_shelter_page_parent.sql` — Adds parent page support

For storage:
1. Create two **public** storage buckets in Supabase: `resources` and `shelters`
2. Run `supabase/migrations/008_storage_policies.sql` — Sets up RLS for storage

## 5. Create Your First Admin User

In Supabase Dashboard: **Authentication → Users → Add user** (email + password).

## 6. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 7. Log In

Click **Login** in the sidebar and enter your admin credentials.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── admin/        # Admin pages (resources, shelters, users)
│   ├── api/          # API routes
│   ├── login/        # Login page
│   ├── resource/     # Resource detail page
│   ├── shelter/      # Shelter page view
│   └── why/          # WHY category pages
├── components/       # React components
├── context/          # Auth, Theme, Shelter contexts
├── lib/              # Supabase client, constants, utilities
└── types/            # TypeScript types
```

## Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run export-db-schema` | Export current DB schema to docs |
