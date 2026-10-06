# freight-platform

[![CI](https://github.com/oguikepaschal/freight-platform/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/oguikepaschal/freight-platform/actions/workflows/ci.yml)

Global freight logistics platform (Next.js, TypeScript and Neon Postgres) with a public marketing site, a customer portal and an internal admin app.

This repo is a pnpm + Turborepo monorepo with three Next.js apps and shared packages. The public site has service and industry pages, a contact and shipment inquiry form and shipment tracking. The portal shows customers their shipments, documents and notifications. The admin app manages shipments, customers and contact inquiries.

## Structure

```
apps/
  web/       Public marketing site (Next.js, App Router)
  portal/    Authenticated customer portal (Next.js, App Router)
  admin/     Internal admin platform (Next.js, App Router)

packages/
  ui/        Shared design system and page templates (components, navigation data and their tests)
  config/    Shared tsconfig, ESLint (flat config), and Tailwind config consumed by all three apps
  database/  Neon Postgres schema, queries and migrations (Drizzle ORM, migrations with drizzle-kit)
  lib/       Shared domain types and utils (still an empty placeholder)
```

## Requirements

- Node.js >= 22 (CI runs Node 22, and the `@freight/ui` test script needs 22.6 or later for `--experimental-strip-types`)
- pnpm 10 (this repo pins `packageManager: pnpm@10.33.0`)

## Install

```bash
pnpm install
```

## Run an app locally

```bash
pnpm --filter @freight/web dev      # http://localhost:3000
pnpm --filter @freight/portal dev   # http://localhost:3001
pnpm --filter @freight/admin dev    # http://localhost:3002
```

## Build / lint / typecheck everything

```bash
pnpm build
pnpm lint
pnpm typecheck
```

Each of these runs across the whole workspace via Turborepo (`turbo run <task>`); scope to a single app with `--filter`, e.g. `pnpm --filter @freight/web build`.

## Tests and CI

CI (`.github/workflows/ci.yml`) runs on every pull request and on pushes to `main`. It has two jobs:

- `verify` runs lint, typecheck, build, the `@freight/ui` tests and the `@freight/web` locale prerender test.
- `database-tests` runs the `@freight/database` suite against a temporary Neon branch. Each run creates a branch from `dev`, applies the migrations, runs the tests and deletes the branch afterwards, even when the tests fail. `main` (production) and `dev` are never written to by CI.

To run the same checks locally:

```bash
pnpm --filter @freight/ui test
pnpm --filter @freight/web test:locale
pnpm --filter @freight/database test   # writes to whatever DATABASE_URL points at, so use dev
```

## Environment variables

Copy `.env.example` to `.env.local` in whichever app needs it (or `.env` at the root) and fill in real values. See that file for what each variable is for.

## Git hooks

Husky + lint-staged run ESLint and a full typecheck on every commit (`.husky/pre-commit`). `pnpm install` sets the hooks up through the `prepare` script.
