# Deployment Guide — Vercel

## Prerequisites

- A GitHub repository with the project pushed
- A Vercel account (free tier works)
- Your Supabase project set up with all migrations run

## 1. Push to GitHub

If not already done:

```bash
cd ~/Projects/reentryresource
git add -A
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/reentryresource.git
git push -u origin main
```

## 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no build settings changes needed

## 3. Set Environment Variables

In Vercel project settings → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

Apply to all environments (Production, Preview, Development).

## 4. Deploy

Click **Deploy**. Vercel builds and deploys automatically.

## 5. Custom Domain (Optional)

1. In Vercel → **Settings → Domains**
2. Add your domain (e.g., `reentryresource.org`)
3. Update your DNS records as instructed by Vercel
4. If using Cloudflare DNS, set the CNAME record to **DNS only** (gray cloud), not proxied

## Automatic Deployments

Every push to `main` triggers a new deployment. Pull requests get preview deployments.

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct: `npm run build` locally first

### Environment variables not working
- `NEXT_PUBLIC_*` variables are available client-side
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only (API routes)
- After changing env vars, redeploy (Vercel → Deployments → Redeploy)

### Images not loading
- Ensure Supabase Storage buckets (`resources`, `shelters`) are set to **public**
- Check that storage RLS policies are in place (migration 008)

### Supabase connection issues
- Verify the project URL and keys are correct
- Check that RLS policies allow public reads
- For write operations, ensure the service role key is set
