# Acquisitions Docker setup (Neon Local for dev, Neon Cloud for prod)

This project is containerized for two environments:

- Development: app + Neon Local proxy in Docker (ephemeral Neon branches).
- Production: app container only, connected directly to Neon Cloud via `DATABASE_URL`.

## Files added

- `Dockerfile`
- `docker-compose.dev.yml`
- `docker-compose.prod.yml`
- `.env.development`
- `.env.production`

## 1) Development (Neon Local via Docker)

Neon Local runs as `neon-local` and your app connects using a static local connection string inside the compose network.

### Required dev env values (`.env.development`)

- `NEON_API_KEY`
- `NEON_PROJECT_ID`
- `PARENT_BRANCH_ID` (branch to fork from for ephemeral branches)
- `DATABASE_URL=postgres://neon:npg@neon-local:5432/neondb?sslmode=require`
- `NEON_LOCAL_PROXY_URL=http://neon-local:5432/sql`

`PARENT_BRANCH_ID` + `DELETE_BRANCH=true` ensures each `up` creates an ephemeral branch and `down` deletes it.

### Start development stack

```bash
docker compose -f docker-compose.dev.yml --env-file .env.development up --build
```

### Stop development stack

```bash
docker compose -f docker-compose.dev.yml --env-file .env.development down
```

## 2) Production (Neon Cloud URL)

Production does not run Neon Local. It uses your managed Neon Cloud database URL from `.env.production`.

### Required prod env values (`.env.production`)

- `DATABASE_URL=postgresql://...neon.tech...`
- `JWT_SECRET`
- `ARCJET_KEY`

### Start production stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up --build -d
```

### Stop production stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production down
```

## How `DATABASE_URL` switches between environments

- Dev compose loads `.env.development`, so app uses Neon Local:
  - `DATABASE_URL=postgres://neon:npg@neon-local:5432/neondb?sslmode=require`
- Prod compose loads `.env.production`, so app uses Neon Cloud:
  - `DATABASE_URL=postgresql://<user>:<password>@<project>.neon.tech/<dbname>?sslmode=require`

Same app code, different env file + compose file.

## Notes

- The app now supports Neon Local proxy by reading `NEON_LOCAL_PROXY_URL`; when set, it configures the Neon serverless driver to route through Neon Local.
- Do not commit real secrets in `.env*` files.
