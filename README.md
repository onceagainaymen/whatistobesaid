# WhatistobeSaid

A full-stack blogging platform with a bold brutaliste aesthetic. Built as a 6-month internship project, it goes beyond standard CRUD to include sentiment analysis on comments, an author analytics dashboard, and full-text search — deployable on a personal domain with HTTPS.

> **Live:** `https://<your-domain>.me` *(coming — Phase 4)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend & Backend | Next.js (React pages + API routes) |
| Styling | Tailwind CSS |
| Database | MySQL (relational, full-text indexed) |
| ORM | Prisma |
| Sentiment Analysis | External NLP API (Hugging Face / Google NL) |
| Reverse Proxy | Nginx (ports 80 & 443) |
| Containerization | Docker & Docker Compose |
| Hosting | DigitalOcean Droplet (Ubuntu) |
| Domain | Namecheap `.me` |
| SSL | Let's Encrypt / Namecheap certificate |

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed
- `make` available on your system
- A configured `.env` file (see `.env.example`)

---

## Getting Started

```bash
make build
```

The application will be available at `http://localhost`.

To seed the database with realistic demo data (Faker.js):

```bash
# coming — Phase 4
npm run seed
```

---

## Makefile Commands

| Command | Description |
|---|---|
| `make build` | Build and start all containers |
| `make down` | Stop and remove containers |
| `make restart` | Restart all containers |
| `make status` | Show container logs |

## Available routes

| Route | Description |
|---|---|
| `/` | Hero page | In progress |
| `/?index=true` | Posts index (replaces being logged in) | In progress |
| `/auth` | Authentication page — sign in or sign up | In progress |
| `/profile` | User profile page | In progress |

---

## Project Structure

```
.
├── webapp/                # Next.js application (pages, components, API routes)
├── nginx/                 # Reverse proxy configuration
├── prisma/                # Database schema and migrations
├── docker-compose.yml
└── Makefile
```

---

## Features

| Module | Description | Priority |
|---|---|---|
| Authentication | Sign up / sign in, JWT + refresh tokens, Author & Reader roles | Essential |
| Content Management | Rich text editor, image upload, Draft / Published states | Essential |
| Comments | Authenticated comment submission, NLP sentiment scoring on submit | Essential |
| Likes | Like / unlike on posts and comments, one like per user per entity | Essential |
| Sentiment Analysis | NLP API call on comment submit, score (0–1) stored in DB | Important |
| Author Analytics Dashboard | Sentiment trends, likes × sentiment cross-view, most controversial posts | Important |
| Advanced Search | MySQL full-text search on titles and content | Important |
| Seed Script | Faker.js data generation with intentional sentiment spread, for dev and demo use only | Secondary |

---

## Pages & Routes

| Route | Description | Status |
|---|---|---|
| `/` | Hero page (logged out) · Posts index (logged in) | In progress |
| `/auth` | Sign in / Sign up (toggled via component state) | In progress |
| `/profile` | User profile, avatar, bio, and posts | In progress |
| `/posts/[id]` | Single post with comments | Planned |
| `/dashboard` | Author analytics (sentiment trends, likes) | Planned |

---

## Architecture

```
CLIENT (Browser)
      │
      │ HTTPS
      ▼
 Nginx (ports 80/443)
      │
      ▼
 Next.js (Docker container)
 ├── /api/auth
 ├── /api/posts
 ├── /api/comments
 ├── /api/likes
 ├── /api/search
 └── /api/analytics
      │                    │
      ▼ SQL                ▼ HTTP (outbound)
   MySQL               NLP API
 (Docker Volume)    (Hugging Face / Google NL)
```

All services run in Docker containers on a single DigitalOcean Droplet. MySQL data and uploaded images are persisted via Docker Volumes across restarts.

---

## Deployment

The production environment mirrors local setup — the same `docker-compose.yml` is used in both contexts.

**Steps (manual, one-time):**

1. Provision a DigitalOcean Ubuntu Droplet and configure SSH access
2. Install Docker and Docker Compose on the server
3. Clone this repository onto the Droplet
4. Configure environment variables via `.env` on the server
5. Run `docker-compose up -d`
6. Configure Nginx as a reverse proxy
7. Point the Namecheap domain DNS (A record) to the Droplet's public IP
8. Activate HTTPS — redirect HTTP → HTTPS

> Hosting costs: ~$6/month (Droplet), fully covered by the $200 DigitalOcean credit from the GitHub Student Developer Pack. Domain free for 1 year via Namecheap + Student Pack.

---

## Roadmap

### Phase 1 — Foundations *(Months 1–2)*
- [x] Project scaffolding (Next.js, Docker Compose, MySQL, Prisma)
- [x] Basic page routing (`/`, `/auth`, `/profile`)
- [x] Authentication: JWT + refresh tokens, Author / Reader roles
- [x] CRUD: posts and comments

### Phase 2 — Engagement *(Months 2–3)*
- [x] Like system (posts and comments)
- [x] Image upload (stored in Docker Volume)
- [ ] Rich text editor
- [ ] Full-text search (basic)

### Phase 3 — Sentiment & Analytics *(Months 3–4)*
- [ ] NLP API integration on comment submit
- [ ] Sentiment score storage
- [ ] Author analytics dashboard (sentiment trends, likes × sentiment, controversial posts)
- [ ] Full-text search (advanced — MySQL native indexing)

### Phase 4 — Finalization & Deployment *(Months 4–5)*
- [ ] Seed script (Faker.js)
- [ ] UI polish
- [ ] DigitalOcean deployment + Nginx + domain + HTTPS
- [ ] Architecture Decision Records (ADR)

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string (Prisma) |
| `JWT_SECRET` | Secret key for JWT signing |
| `NLP_API_KEY` | API key for the sentiment analysis service |
| `NEXT_PUBLIC_BASE_URL` | Public base URL of the application |

See `.env.example` for a full template.

---

## Deliverables

- Deployed application accessible via a public `.me` URL with HTTPS
- Public GitHub repository with clean commit history
- `docker-compose.yml` enabling one-command local startup
- This README
- Documented seed script for realistic demo data
- Architecture Decision Records (ADR)
- A french version of the README.md (README.FR.md)
