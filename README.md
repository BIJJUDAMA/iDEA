# iDEA

iDEA is the public website for the student community at Amrita Vishwa Vidyapeetham, Coimbatore. It introduces the community, its team and projects, and provides forms for proposing a project or becoming a member.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

No environment variables or external backend services are required for local development. The contribution and project join actions open hosted Typeform forms.

## Development

```sh
npm install
npm run dev
```

The development server prints its local URL. The site is a single landing page, so static hosting does not require route rewrites.

## Available commands

```sh
npm run dev          # Start the local Vite server
npm run build        # Create an optimized production build in dist/
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint with zero warnings allowed
npm run format       # Format source files
npm run format:check # Check repository formatting
npm run typecheck    # Run the strict TypeScript compiler check
npm run test         # Run component and behavior tests once
npm run test:watch   # Run component tests in watch mode
npm run test:coverage # Create a component-test coverage report
npm run test:e2e     # Run desktop and mobile browser tests
npm run check        # Run formatting, lint, tests, and a production build
npm run deploy       # Publish dist/ through gh-pages
```

CI runs formatting, type-aware linting, strict TypeScript checks, component tests, the production build, and desktop and mobile Chromium smoke tests on Node 22.

The CSS layer order, tokens, themes, and responsive policy are documented in
[`docs/design-system.md`](docs/design-system.md).

Accessibility behavior, responsive coverage, lazy forms, deployment paths, and
enforced bundle budgets are documented in
[`docs/accessibility-performance.md`](docs/accessibility-performance.md).
The build targets GitHub project Pages under `/iDEA/`; update the base and
public metadata together when hosting elsewhere. The inferred public Pages URL
currently returns 404, so deployment must precede live asset verification.

## Structure

- `src/config/` — the canonical landing-section registry
- `src/sections/` — feature-owned landing sections and their local components
- `src/types/` — shared content and navigation models
- `src/pages/landing/` — landing-page orchestration
- `src/components/` — reusable page, navigation, and form primitives
- `src/hooks/` — shared React behavior
- `src/data/` — static community content
- `src/test/` and `tests/e2e/` — component helpers and browser smoke tests
- `public/images/` — the brand mark and optimized team portraits

All production source and configuration use TypeScript. The existing component and
browser tests remain JavaScript/JSX and are excluded from the production build.

To enable the repository-managed Git hooks:

```sh
git config core.hooksPath hooks
```

## License

[MIT](LICENSE)
