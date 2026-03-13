# MOQ3 Launch Runbook

This is the shortest path to getting MOQ3 live and measurable.

## 1. Prepare accounts

Create or confirm access to:

- Vercel
- PostgreSQL provider
- Meilisearch instance or Meilisearch Cloud
- Plausible
- Google Search Console
- Domain registrar access

## 2. Pick your production domain

Recommended:

- `moq3.com`
- `moq3.in`
- `results.moq3.com`

Use a single canonical production domain. Do not split between `www` and apex unless you configure a redirect.

## 3. Set production environment variables

You need these in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `MEILISEARCH_HOST`
- `MEILISEARCH_API_KEY`
- `MEILISEARCH_INDEX`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Suggested values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/moq3
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
MEILISEARCH_HOST=https://your-meilisearch-host
MEILISEARCH_API_KEY=your-meilisearch-key
MEILISEARCH_INDEX=exams
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_SESSION_SECRET=long-random-secret-min-32-chars
```

## 4. Deploy to Vercel

### Option A: GitHub import

1. Push this repository to GitHub.
2. In Vercel, click `Add New -> Project`.
3. Import the GitHub repository.
4. Framework preset should auto-detect as `Next.js`.
5. Add all environment variables before the first production deployment.
6. Click `Deploy`.

### Option B: CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel
vercel --prod
```

## 5. Run the database bootstrap

After setting `DATABASE_URL`, run:

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

For production discipline, move to Prisma migrations later. For launch, `db push` is acceptable if you are moving fast and the schema is still changing.

## 6. Rebuild the search index

After deploy and seed:

1. Log into `/admin`
2. Open the dashboard
3. Click `Rebuild Search Index`

If Meilisearch is not configured, public search will still fall back locally, but production search quality will be worse.

## 7. Attach the custom domain

If using Vercel:

1. Open the project in Vercel.
2. Go to `Settings -> Domains`.
3. Add your domain.
4. Add the DNS records Vercel asks for at your registrar.
5. Wait for SSL to be issued.
6. Confirm the production URL resolves correctly.

Then set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

Redeploy after changing these variables.

## 8. Turn on analytics

The app already injects the Plausible script when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set.

Steps:

1. Create the site in Plausible using your production domain.
2. Copy the domain exactly.
3. Put it into `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
4. Redeploy.
5. Visit your live site and verify Plausible receives pageviews.

## 9. Submit the site to Google

### Search Console

1. Add a new property for your domain.
2. Verify ownership using DNS.
3. Submit:

```text
https://your-domain.com/sitemap.xml
```

4. Use URL Inspection to request indexing for the first 10 to 20 important pages.

Submit these first:

- homepage
- `/exam/ssc-mts-havaldar`
- `/answer-key/ssc-mts-havaldar-2026`
- `/notification/ssc-mts-havaldar-2025`
- `/result/ssc-mts-2026`
- `/result/neet-ug-2026`
- `/result/jee-main-2026`
- `/cutoff/ssc-mts-2026`

## 10. Launch content focus

Do not launch with hundreds of weak pages.

Start with:

- 1 dense update page cluster for `ssc-mts-havaldar`
- 10 to 15 strong result pages
- 8 to 10 strong cutoff pages

This is enough to test whether Google starts giving impressions.

## 11. What to check immediately after launch

Visit and verify:

- `/`
- `/sitemap.xml`
- `/robots.txt`
- `/exam/ssc-mts-havaldar`
- `/answer-key/ssc-mts-havaldar-2026`
- `/notification/ssc-mts-havaldar-2025`
- `/result/ssc-mts-2026`
- `/cutoff/ssc-mts-2026`
- `/search`
- `/admin`

## 12. First 14 days after launch

Track:

- Indexed pages
- Search impressions
- Search clicks
- Top queries
- Pages with impressions but no clicks
- Crawl/index errors

Do not optimize for scale yet.
Only check:

- Which exam/entity gets first traction
- Which page type gets impressions first
- Whether dense intent pages outperform broad overview pages

## 13. Launch blockers you must resolve manually

Before real launch, you still need to:

- replace demo/sample content with real source-backed content
- use strong admin credentials
- verify real domain + SSL
- verify Plausible is receiving traffic
- verify Search Console ownership

## Useful production URLs

- `https://your-domain.com/sitemap.xml`
- `https://your-domain.com/robots.txt`
- `https://your-domain.com/admin`
- `https://your-domain.com/answer-key/ssc-mts-havaldar-2026`
- `https://your-domain.com/result/ssc-mts-2026`
