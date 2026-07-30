# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a NestJS API that was reset to a bare starter (commit `569c1de reset project modules`) to be rebuilt from scratch. Prior to the reset it had auth, user (admin/student/teacher), and entity modules (school, class, assignments, teaching assignments, notifications, student/teacher profiles) implementing a multi-tenant school management domain — check `git log` and `git show <commit>` on commits before `569c1de` for reference if reintroducing similar features.

Current source tree is just the default Nest scaffold: `src/main.ts`, `src/app.module.ts`, `src/app.controller.ts`, `src/app.service.ts`.

## Commands

- `npm run start:dev` — run the app with watch mode (primary dev loop)
- `npm run start:debug` — run with `--debug --watch`
- `npm run build` — compile via `nest build`
- `npm run lint` — eslint with `--fix` over `src`, `apps`, `libs`, `test`
- `npm run format` — prettier `--write` over `src` and `test`
- `npm test` — run unit tests (Jest, config lives inline in `package.json`, rootDir `src`, matches `*.spec.ts`)
  - single test file: `npx jest src/app.controller.spec.ts`
  - single test by name: `npx jest -t "test name"`
- `npm run test:watch` — Jest in watch mode
- `npm run test:cov` — Jest with coverage
- `npm run test:e2e` — e2e tests via `test/jest-e2e.json` (rootDir `.`, matches `*.e2e-spec.ts`)

## Architecture notes

- Standard Nest module/controller/service pattern; `AppModule` is the root and currently has no imports.
- TypeORM (`@nestjs/typeorm`, `typeorm`) and both `mysql2` and `pg` drivers are installed as dependencies but no `TypeOrmModule.forRoot(...)` or entities exist yet — a database connection needs to be wired up in `AppModule` when persistence is reintroduced.
- `zod` and `bcrypt` are installed dependencies, presumably for request validation (previously via a custom `ValidationPipe`) and password hashing, respectively — not currently used anywhere in `src`.
- `tsconfig.json` maps the `src/*` path alias to `./src/*`; `strict` is on but `noImplicitAny` is off.
- ESLint (`eslint.config.mjs`) uses `typescript-eslint`'s `recommendedTypeChecked` plus `eslint-plugin-prettier`; `no-explicit-any` is disabled, `no-floating-promises` and `no-unsafe-argument` are warnings only.
