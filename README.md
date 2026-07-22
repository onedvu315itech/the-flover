# 🌸 The Flover

The Flover is a modern flower shop management system built with a Turborepo monorepo architecture.

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- NestJS
- Prisma ORM
- PostgreSQL (Neon)

### Monorepo

- Turborepo
- pnpm

---

# Project Structure

```text
.
├── apps/
│   ├── web
│   └── api
│
├── packages/
│   ├── prisma
│   ├── ui
│   ├── constants
│   ├── api-types
│   ├── types
│   ├── utils
│   ├── eslint-config
│   └── typescript-config
│
├── .env
├── package.json
└── turbo.json
```

---

# Requirements

- Node.js 26+
- pnpm 11+
- PostgreSQL (Neon)

---

# Installation

Install dependencies

```bash
pnpm install
```

---

# Environment Variables

Create a root `.env`

```env
DATABASE_URL="your_neon_database_url"
```

---

# Database

The Prisma package is located at:

```text
packages/prisma
```

## 1. Generate schema.prisma

This combines all Prisma models and enums into a single `schema.prisma`.

```bash
pnpm --filter @repo/prisma build:schema
```

---

## 2. Generate Prisma Client

```bash
pnpm --filter @repo/prisma generate
```

---

## 3. Push schema to Neon

(No migrations)

```bash
pnpm --filter @repo/prisma push
```

---

## 4. Seed database

```bash
pnpm --filter @repo/prisma seed
```

---

## Run everything from scratch

```bash
pnpm --filter @repo/prisma db:setup
```

This command performs:

1. Build Prisma schema
2. Generate Prisma Client
3. Push schema to Neon
4. Seed initial data

---

## Reset database

```bash
pnpm --filter @repo/prisma reset
```

This command will:

- Drop all tables
- Recreate database schema
- Seed all master data

---

# Development

Run every application

```bash
pnpm dev
```

Run a specific application

```bash
pnpm --filter web dev
```

or

```bash
pnpm --filter api dev
```

---

# Build

Build every package

```bash
pnpm build
```

---

# Lint

```bash
pnpm lint
```

---

# Format

```bash
pnpm format
```

---

# Type Check

```bash
pnpm check-types
```

---

# Prisma Folder

```text
packages/prisma
│
├── src/
│   ├── enums/
│   ├── models/
│   └── seeds/
│
├── generated/
│
├── build-schema.ts
├── client.ts
├── prisma.config.ts
├── schema.prisma
└── package.json
```

---

# Development Workflow

Whenever the Prisma schema changes:

```bash
pnpm --filter @repo/prisma generate
```

Whenever new tables are added:

```bash
pnpm --filter @repo/prisma push
```

Whenever seed data changes:

```bash
pnpm --filter @repo/prisma seed
```

Or simply run:

```bash
pnpm --filter @repo/prisma db:setup
```

---

# License

MIT