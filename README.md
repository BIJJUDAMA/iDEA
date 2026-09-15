# iDEA

iDEA is the public website for the student community at Amrita Vishwa Vidyapeetham, Coimbatore. It presents the community’s roadmap, team, projects, alumni, blog content, and contribution forms.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

No environment variables or external backend services are required for local development. The contribution and project join actions open hosted Typeform forms.

## Development

```sh
npm install
npm run dev
```

The development server prints its local URL. Hash routes are used for the blog browser, so static hosting does not require rewrite rules.

## Available commands

```sh
npm run dev          # Start the local Vite server
npm run build        # Create an optimized production build in dist/
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint with zero warnings allowed
npm run format       # Format source files
npm run format:check # Check repository formatting
npm run deploy       # Publish dist/ through gh-pages
```

Automated tests and TypeScript are not currently configured. CI runs installation, formatting, linting, and the production build on Node 22.

## Structure

- `src/content/` — landing-page sections
- `src/pages/` — landing and blog route screens
- `src/components/layout/` — reusable page-level layout primitives
- `src/components/navigation/` — shared navigation primitives
- `src/components/sections/` — section-specific component systems
- `src/data/` — static community content
- `public/images/` — the brand mark, roadmap art, and optimized team portraits

To enable the repository-managed Git hooks:

```sh
git config core.hooksPath hooks
```

## License

[MIT](LICENSE)
