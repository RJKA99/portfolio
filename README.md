# Robin Karlsson — Portfolio

Personal portfolio site. **Live: [robin-karlsson.vercel.app](https://robin-karlsson.vercel.app)**

A single-page site built in React with three switchable design themes (Dark, Editorial, Neon) — each with its own typography, palette, and visual character, all driven by CSS custom properties and one `data-theme` attribute. Scroll-triggered animations throughout via Framer Motion, and a working contact form backed by a rate-limited serverless function.

## Sections

- **Hero** — animated name reveal, theme-aware accent blob
- **About** — bio + skill tags
- **Work** — project showcase (this repo included) with live links where applicable
- **Stack** — categorized tech list (frontend, backend, cloud/DevOps, AI & workflow)
- **How I work** — 5-step process breakdown
- **Contact** — social links + a real contact form (POSTs to a serverless function, persists to MongoDB, rate-limited per IP)

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion |
| Contact API | Vercel serverless function (`client/api/contact.ts`) — Express + Mongoose also available as a standalone alternative (`server/`) |
| Database | MongoDB (Mongoose) |
| Hosting | Vercel (client + API), theme state persisted in `localStorage` |

## Repository layout

```
portfolio/
├── client/           React + TypeScript + Vite frontend
│   ├── src/components/   Nav, Hero, About, Projects, Stack, Process, Contact
│   ├── src/context/      ThemeContext (dark / light / bold, persisted)
│   └── api/contact.ts    Vercel serverless function: validates, rate-limits (1/IP/min), saves to Mongo
└── server/           Standalone Express + Mongoose backend (same contact-form logic, deployable separately e.g. to Railway)
```

The site is deployed as a single Vercel project (`client/`), so `client/api/contact.ts` is what actually serves the live contact form. `server/` is a self-contained alternative if you'd rather run the API as its own Express service.

## Local development

Requires Node 20+.

```bash
cd client
npm install
npm run dev
```

For the contact form to persist messages, set `MONGODB_URI` in the Vercel project (or `MONGO_URI` in `server/.env.example` if running the standalone server). Without it, the API still responds successfully and logs submissions to the console.
