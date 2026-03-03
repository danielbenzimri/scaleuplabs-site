# Audit Service

Standalone Express microservice for the ScaleUp Labs AI Readiness Audit.

## What it does

| Step | Action |
|---|---|
| 1 | Receives audit results + lead info from the frontend |
| 2 | Calls GPT-4o to generate a structured executive summary |
| 3 | Returns summary to the frontend **immediately** |
| 4 | (Background) Saves lead + submission to Supabase |
| 5 | (Background) Renders a professional PDF via Puppeteer |
| 6 | (Background) Uploads PDF to Supabase Storage |
| 7 | (Background) Sends branded email to user + internal lead alert |

## Setup

```bash
cd audit-service
cp .env.example .env   # fill in your keys
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | GPT-4o key |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (bypasses RLS) |
| `RESEND_API_KEY` | Resend email API key |
| `INTERNAL_NOTIFY_EMAIL` | Where lead alerts are sent |
| `PORT` | Defaults to `3002` |
| `FRONTEND_URL` | Allowed CORS origin |

## Database

Run `supabase_schema.sql` in your Supabase SQL editor to create the tables and indexes.

Create a **Storage bucket** named `audit-reports` set to **public** in your Supabase dashboard.

## API

### `POST /api/audit/submit`

**Request body:**
```json
{
  "lead":       { "name": "Daniel", "email": "daniel@example.com" },
  "scores":     { "p1": 27, "p2": 60, "p3": 97, "p4": 70, "p5": 90 },
  "totalScore": 69,
  "answers":    { "q1_1": 2, "q1_2": 3 }
}
```

**Response (immediate):**
```json
{
  "submissionId": "uuid",
  "concise": "...",
  "sections": [{ "heading": "...", "intro": "...", "bullets": ["..."] }]
}
```

## Deployment (Railway)

```bash
railway login
railway init
railway up
railway variables set OPENAI_API_KEY=... SUPABASE_URL=... ...
```
