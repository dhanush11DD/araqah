# Araqah Recruitment: website and admin dashboard

Bilingual (Arabic `/ar`, English `/en`) landing page plus an admin dashboard at `/admin`, built with Next.js 15 and MySQL.
`/` redirects to the visitor's language: a saved choice first, then the browser language, then Arabic.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (website) and http://localhost:3000/admin (dashboard).
Without `DATABASE_URL`, development uses a local SQLite file in `.data/` (git-ignored). Delete `.data/` to start fresh.
The first admin is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` the first time someone signs in.

## Switching the dashboard on or off

The dashboard, the customer payment pages (`/ar/pay/...`, `/en/pay/...`) and the Moyasar webhook are **switched off by default**: they return a normal 404. Nothing is deleted. Set `ADMIN_ENABLED=true` on the server and restart to turn them on. While they are off, the landing page, its request form and request tracking keep working, and new requests are still saved to the database (and emailed to staff if SMTP is set in the environment).

## What the dashboard does

| Area | Where | What you can do |
|---|---|---|
| Overview | `/admin` | Requests today / this week, 14-day chart, requests by stage, service, profession and nationality, payments total, setup checklist |
| Requests | `/admin/requests` | Everyone who used the Request a worker form: search, filter, export CSV, add an email address and internal notes, move the 8-stage tracking and optionally email the customer |
| Payment links | `/admin/payments` | Create a secure Moyasar payment link for any amount, copy or email it, cancel it, re-check a payment with Moyasar |
| Form options | `/admin/form-options` | Add, rename, reorder, hide or delete the Service type, Required profession and Required nationality choices on the website form, in English and Arabic |
| Mail templates | `/admin/mail` | Edit every automatic email in English and Arabic, preview it, send a test, switch each one on or off |
| Mail server | `/admin/mail-server` | SMTP host, port, login, From address, staff alert recipients, connection test, test email |
| Payment gateway | `/admin/payment-gateway` | Moyasar keys and webhook secret, connection test, webhook address |
| Activity logs | `/admin/logs` | Sign-ins, new requests, customers tracking, stage changes, emails (and failures), payments, settings changes |
| Team | `/admin/team` | Admin and staff accounts, roles, password resets |

Staff accounts can use requests, payment links, form options, mail templates and logs. Only admins can open the mail server and payment gateway settings and manage the team.

The website form has no email field (the approved design does not show one), so customer emails (status updates, payment links, receipts) need an email address added by staff on the request, or typed on the payment link.

## Where things are

- `design/landing-en.dc.html`, `design/landing-ar.dc.html`: the approved design, the source of truth.
- `src/components/landing/LandingEn.tsx`, `LandingAr.tsx`: generated from the design files. Do not edit by hand. Change the design file, then run `npm run convert-design`. The three dropdowns render their options from the database.
- `src/app/(site)/[locale]`: the public site, plus `pay/[code]` (customer payment page) and its result page.
- `src/app/(admin)/admin`: the dashboard.
- `src/app/api/requests`, `track`, `webhooks/moyasar`: public APIs.
- `src/lib/db.ts`: database access (MySQL in production, SQLite file in development) and the table definitions. Tables are created automatically on first start.

## Deploy to GoDaddy Node.js Hosting

1. Create a MySQL 8 database and note its connection address.
2. Set the environment variables from `.env.example` in the GoDaddy panel. These are required: `SITE_URL` (your https address), `DATABASE_URL`, `SESSION_SECRET` (16+ random characters, keep it stable), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. Build command: `npm ci && npm run build`. Start command: `npm start`. The app listens on `PORT`.
4. Open `/admin`, sign in, then change your password under Team & account.
5. Fill in Mail server and Payment gateway in the dashboard. SMTP and Moyasar settings are stored in the database (secrets encrypted with `SESSION_SECRET`), so no redeploy is needed to change them.
6. In Moyasar, add the webhook address shown on the Payment gateway page and use the same secret.

Moyasar live payments need HTTPS on your real domain. Use `pk_test_` / `sk_test_` keys and Moyasar's test cards until a full payment has worked end to end.
