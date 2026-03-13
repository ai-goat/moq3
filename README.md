# MOQ3 - Result Intelligence Platform

MOQ3 is a scalable SEO-first platform for exam results, cutoff analysis, historical statistics, and exam insights. The stack is built for server rendering, incremental static regeneration, and large-scale content generation on Vercel.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- PostgreSQL + Prisma
- Meilisearch
- Plausible Analytics

## Features

- SEO-first public pages with `sitemap.xml`, `robots.txt`, metadata, OpenGraph, and JSON-LD
- Static generation plus ISR-ready cached data services
- Exam pages, result pages, cutoff pages, category cutoff pages, analysis pages, and SEO landing pages
- Meilisearch-backed instant search with local fallback
- Secure admin login and CRUD APIs for exams, results, cutoffs, and stats
- Prisma seed data for local bootstrap
- Demo-data fallback so the public site still renders before infrastructure is configured

## Requirements

- Node.js 20 or newer
- PostgreSQL for persistent admin writes
- Optional Meilisearch instance for production search indexing

## Environment

Copy `.env.example` to `.env` and update the values you need.

## Run

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

If `DATABASE_URL` is not configured, the public site renders sample data in demo mode. Admin write APIs require PostgreSQL.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run db:generate`
- `npm run db:push`
- `npm run db:seed`

## Production notes

- Set `NEXT_PUBLIC_SITE_URL` for canonical metadata and sitemap URLs
- Configure `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable analytics
- Configure `MEILISEARCH_HOST` and `MEILISEARCH_API_KEY` to enable search indexing
- Change the admin credentials and session secret before deployment
- Follow [LAUNCH.md](/Users/kunalkhadkeshwar/Downloads/moq3/LAUNCH.md) for the exact launch checklist
# moq3
