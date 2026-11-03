# Araqah Recruitment: website and admin dashboard

Bilingual (Arabic `/ar`, English `/en`) landing page plus an admin dashboard at `/admin`, built with Next.js 15 and a single SQLite database file.
`/` redirects to the visitor's language: a saved choice first, then the browser language, then Arabic.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (website) and http://localhost:3000/admin (dashboard).
All data lives in one SQLite file, `.data/araqah.sqlite` by default (git-ignored). Delete `.data/` to start fresh. Set `DATABASE_PATH` to keep the file somewhere else.
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

## Content not shown yet

Two parts of the mock-up are left out of the page until real content exists: the **reviews section** (with its "4.9 on Google" rating) and the footer **Privacy / Terms / Refund links**. They are controlled by `SHOW_REVIEWS` and `SHOW_POLICY_LINKS` at the top of `scripts/convert-design.py`. Set one to `True` and run `npm run convert-design` to bring it back.

## Where things are

- `design/landing-en.dc.html`, `design/landing-ar.dc.html`: the approved design, the source of truth.
- `src/components/landing/LandingEn.tsx`, `LandingAr.tsx`: generated from the design files. Do not edit by hand. Change the design file, then run `npm run convert-design`. The three dropdowns render their options from the database.
- `src/app/(site)/[locale]`: the public site, plus `pay/[code]` (customer payment page) and its result page.
- `src/app/(admin)/admin`: the dashboard.
- `src/app/api/requests`, `track`, `webhooks/moyasar`: public APIs.
- `src/lib/db.ts`: database access (Node's built-in SQLite) and the table definitions. Tables are created automatically on first start.

## Deploy to a Node.js host (GoDaddy Node.js Hosting, from GitHub)

Needs **Node 22.5 or newer** (the app uses Node's built-in SQLite; `package.json` asks for it). There is no separate database server.

1. Push this repo to GitHub (do not commit `node_modules`; `.gitignore` already excludes it) and connect it in GoDaddy.
2. Build command: `npm run build`. Start command: `npm start`. Leave any "root path" setting as `/`. The app answers 200 on `/`, listens on the `PORT` the host gives it and on all addresses (`server.js` handles this).
3. Set environment variables in the host's panel. Only `SITE_URL` (your https address) is needed to start. Add the SMTP settings and `ADMIN_EMAILS` if you want staff emailed about new requests while the dashboard is off.
4. **Keep the database file safe.** It is created on first use at `.data/araqah.sqlite` inside the app folder. If your host replaces the app folder on every deploy, requests would be lost, so set `DATABASE_PATH` to a folder that persists, and download a copy of the file regularly as a backup.
5. To use the dashboard later: set `ADMIN_ENABLED=true`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`, restart, open `/admin`, sign in and change the password. Then fill in Mail server and Payment gateway in the dashboard.
6. In Moyasar, add the webhook address shown on the Payment gateway page and use the same secret.

Everything the build needs is under `dependencies` in `package.json`, because the host may install without dev dependencies.

Moyasar live payments need HTTPS on your real domain. Use `pk_test_` / `sk_test_` keys and Moyasar's test cards until a full payment has worked end to end.
