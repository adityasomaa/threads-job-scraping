# Threads Job Scraping → Proposal Preview System

Scrape job postings (IT / web dev / AI / software dev) from Threads, classify them into categories, and auto-generate a beautiful proposal preview landing page for each one — so when you DM a client, you can attach a personalized preview link.

## Architecture

```
threads-job-scraping/
├── scraper/        # Playwright + TypeScript scraper (runs locally)
├── web/            # Next.js 14 (App Router) + Framer Motion (deployed to Vercel)
└── data/jobs.json  # Output of scraper, read by the web app
```

The scraper **cannot run on Vercel** (Playwright needs a real browser). Workflow:

1. Run `npm run scrape` on your machine → writes `data/jobs.json`
2. Commit `data/jobs.json` and push → Vercel auto-deploys
3. Share preview links like `https://yourproject.vercel.app/preview/<job-id>` with clients

## Setup

```bash
# 1. Install everything
npm install

# 2. Install Playwright browsers (one-time)
npm --workspace=scraper exec playwright install chromium

# 3. Create .env from template, fill in your Threads credentials
cp .env.example .env

# 4. Scrape (runs visibly so you can see it work)
npm run scrape

# 5. Run the dashboard
npm run dev
```

Visit:
- `http://localhost:3000` — internal dashboard (all jobs, filter by category)
- `http://localhost:3000/preview/<job-id>` — client-facing proposal preview

## Deployment

Deploy `web/` to Vercel. The scraper stays local. Re-run scrape + commit + push to refresh.

## Categories detected

- `web-dev` — websites, landing pages, company profile, e-commerce
- `fullstack` — full applications with backend
- `ai` — AI / ML / LLM / chatbot projects
- `mobile` — Android / iOS / React Native / Flutter
- `automation` — bots, scrapers, RPA, n8n, Make/Zapier
- `data` — dashboards, data engineering, analytics
- `other` — fallback

## Security

- Never commit `.env` or `storage.json`. Both are in `.gitignore`.
- Rotate any token / credential you ever pasted publicly.
