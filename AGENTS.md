# AGENTS.md

## Stack

Vite 8 + React 19 + TypeScript (~6.0), Tailwind CSS v4 (CSS-first, no config file), TanStack Query v5, react-router v8, axios, pnpm (lockfile is `pnpm-lock.yaml` — do not use npm/yarn).

React Compiler is enabled via Babel (`vite.config.ts`). Avoid `useMemo`-heavy hand optimization; the compiler handles memoization.

## Commands

- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Typecheck: no dedicated script. Use `npx tsc --noEmit -p tsconfig.app.json` (faster than `pnpm build`, which runs `tsc -b && vite build`).
- Tests: none configured. Do not invent a test runner.

Order before finishing: lint → typecheck. Both fail on pre-existing issues outside your change — verify only that _your_ files are clean (`pnpm lint 2>&1 | grep <path>`, or rely on typecheck output filtering):

- `pnpm build`/typecheck: type error in `src/shared/components/ui/multi-select.tsx` (Base UI `asChild` incompatibility).
- `pnpm lint`: 4 errors in `src/shared/` (react-refresh export rules in `badge.tsx`/`button.tsx`/`sidebar.tsx`, react-hooks rule in `use-mobile.ts`).
  Don't "fix" these unless asked.

## Path aliases

- `@/*` → `src/*` (only alias; defined in both `vite.config.ts` and `tsconfig.app.json` — keep them in sync).
- shadcn CLI aliases (in `components.json`) point into `@/shared/*`.

## Architecture

Feature-based domains under `src/domain/<feature>/`, each with any of: `pages/`, `components/`, `queries/`, `services/`, `types/`, `validations/`, `utils/` (typically `index.ts` barrels).

- `src/common/` — cross-cutting: `api/apiClient.ts` (axios instance, reads `VITE_BASE_URL`/`VITE_BASE_VERSION` from `.env`), `api/queryClient.ts`, `types/`, `layouts/`.
- `src/shared/` — UI building blocks: `components/ui/` (shadcn), `hooks/`, `lib/`.
- `src/router/index.tsx` — all routes via `createBrowserRouter`; every page is lazy-loaded. Add new routes there.

Data flow per feature: `queries/index.ts` (TanStack Query hooks) → `services/index.ts` (class using `httpClient`, exports default instance) → `types/index.d.ts` (API resource shapes). Follow this pattern for new API-backed features.

## UI conventions

- shadcn components are Base UI (`@base-ui/react`), NOT Radix. Style: `base-vega`. They import `cn` from the `cn` npm package (`import { cn } from "cn"`), not a local util.
- Icons: `lucide-react`.
- Domain types use `.d.ts` files — import with `import type`.

## Internationalization (i18n)

- Locales: `src/common/libs/i18n/locales/en.json` and `mm.json`; init/config in `src/common/libs/i18n/index.ts`.
- Components use `const { t } = useTranslation()` from `react-i18next`; use `i18n.language` when a label depends on the active locale (e.g. day names via `getDayOfWeekLabel`).
- Key placement:
  - `labels.*` — commonly reused labels (e.g. `email`, `status`, `phoneNumber`).
  - `actions.*` — common action button labels (e.g. `cancel`, `save`, `saving`).
  - `<domain>.*` — everything domain-specific, nested under the camelCase domain name (`auth`, `doctors`, `scheduleRequests`).
- Do **not** translate input placeholders.
- Add keys to both `en.json` and `mm.json`; use i18next plural suffixes (`_one`/`_other`) for count-based strings.

## TypeScript strictness gotchas

`tsconfig.app.json` enables `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` (type-only imports must use `import type`), and `erasableSyntaxOnly` (no enums, no parameter properties). Unused imports fail typecheck.
