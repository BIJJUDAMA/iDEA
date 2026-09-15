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
npm run test         # Run component and behavior tests once
npm run test:watch   # Run component tests in watch mode
npm run test:coverage # Create a component-test coverage report
npm run test:e2e     # Run desktop and mobile browser tests
npm run check        # Run formatting, lint, tests, and a production build
npm run deploy       # Publish dist/ through gh-pages
```

CI runs formatting, linting, component tests, the production build, and desktop and mobile Chromium smoke tests on Node 22. TypeScript is not currently configured.

## Structure

- `src/config/` — the canonical landing-section registry
- `src/content/` — the five active landing-page sections
- `src/pages/` — the landing-page composition
- `src/components/layout/` — reusable page-level layout primitives
- `src/components/navigation/` — shared navigation primitives
- `src/components/sections/` — section-specific component systems
- `src/data/` — static community content
- `src/test/` and `tests/e2e/` — component helpers and browser smoke tests
- `public/images/` — the brand mark and optimized team portraits

To enable the repository-managed Git hooks:

```sh
git config core.hooksPath hooks
```

## License

[MIT](LICENSE)
