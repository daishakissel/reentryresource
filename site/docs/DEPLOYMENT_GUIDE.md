# Deployment Guide — Vercel

## Prerequisites

- GitHub repository: https://github.com/daishakissel/reentryresource.git
- Vercel account connected to the GitHub repo
- Supabase project fully set up (see `docs/SETUP_GUIDE.md`)

---

## Current Deployment

- **Live site:** https://reentryresource.vercel.app/
- **Auto-deploys:** every push to `main` branch
- **Build root:** repository root (Vercel detects Next.js at root `next.config.js`)

> ⚠️ **Important:** The site files were recently moved from the repo root (`src/`) into a `site/` subdirectory. This move is **uncommitted**. Until it is committed and pushed, Vercel continues deploying from the last committed state (files at root). After committing the move, you will need to update the Vercel **Root Directory** setting to `site`.

---

## Deploying a Change

```bash
cd /Users/stevencannoodt/Projects/reentryresource
git add -A
git commit -m "Your message"
git push origin main
```

Vercel auto-deploys within ~1 minute.

---

## Updating Vercel After Moving to site/

After committing the `src/ → site/src/` rename:

1. Go to [vercel.com](https://vercel.com) → your project → **Settings → General**
2. Set **Root Directory** to `site`
3. Redeploy

---

## Environment Variables

In Vercel project settings → **Environment Variables**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (server-side only) |

Apply to all environments (Production, Preview, Development). After changing env vars, redeploy.

---

## Automatic Deployments

- Every push to `main` → production deployment
- Pull requests → preview deployments at unique URLs

---

## Troubleshooting

### Build fails
- `next.config.js` has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` to suppress TypeScript and ESLint errors during builds (temporary)
- Run `npm run build` locally first to catch issues

### Environment variables not working
- `NEXT_PUBLIC_*` variables are available client-side
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only (used in API routes)
- After changing env vars in Vercel, redeploy manually

### Images not loading
- Ensure Supabase Storage buckets (`resources`, `shelters`) are set to **public**
- Check that `next.config.js` allows the Supabase hostname: `**.supabase.co`

### Supabase connection issues
- Verify the project URL and keys are correct
- Check that RLS policies allow public reads on all tables
- For write operations, ensure the service role key is set in Vercel env vars

### Resources appear without categories/modes/formats
- The junction table rows for this resource are missing (tables exist, but resource has no entries)
- Re-import the resource or manually insert rows in `resources_categories`, `resources_modes`, etc.
