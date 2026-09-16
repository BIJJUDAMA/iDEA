# iDEA

The website for the iDEA student community at Amrita Vishwa Vidyapeetham,
Coimbatore. Built with React, TypeScript, and Vite.

## Development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run check         # Formatting, lint, types, component tests, and build
npm test              # Run component tests
npm run test:coverage # Generate a coverage report
npm run build         # Build into dist/ and enforce bundle budgets
npm run preview       # Preview the production build
```

CI runs the same checks on Node 22. Builds enforce initial bundle limits of
250 kB JavaScript and 30 kB CSS (80 kB and 8 kB gzip).

## Content

- `src/data/texts.ts`: imported page copy and metadata.
- `src/data/team.ts`: ten placeholder student positions in five sections.
- `src/data/faculty.ts`: one placeholder faculty mentor.
- `src/data/projects.ts`: project records.
- `src/config/sections.ts`: navigation destinations.
- `src/config/forms.ts`: hosted Typeform form IDs.

Images are code-rendered placeholders. Typeform loads only when a form is
opened and provides a direct link if embedding fails. No backend is required.

## Vercel deployment

Import this repository into Vercel. `vercel.json` specifies the Vite framework,
`npm run build`, and the `dist` output directory. The site uses the root path
and section hashes, so no route rewrites are required.

Canonical and Open Graph URLs use Vercel's
`VERCEL_PROJECT_PRODUCTION_URL` at build time. Enable system environment
variables in the Vercel project if they have been disabled. Local builds omit
domain-specific metadata until a production domain is available.

## License

[MIT](LICENSE)
