# iDEA

The website for the iDEA student community at Amrita Vishwa Vidyapeetham, Coimbatore. Built with React 19, TypeScript, and Vite.

## Overview

iDEA is a student innovation community where students collaborate on technology projects across web engineering, mobile development, artificial intelligence, embedded systems, and robotics. This repository houses the official website featuring an interactive project showcase, core team roster, unified contact channels, and contribution forms.

## Getting Started

### Prerequisites

- Node.js 22.12 or newer
- npm 10 or newer

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Dharshan2208/iDEA.git
cd iDEA
npm ci
```

### Local Development

Start the Vite development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173/`.

## Available Scripts

- `npm run dev`: Start the local development server with Hot Module Replacement (HMR).
- `npm run check`: Run the complete verification suite (Prettier formatting, ESLint, TypeScript compilation, Vitest tests, and production bundle budget checks).
- `npm test`: Execute the test suite using Vitest.
- `npm run test:coverage`: Run tests and generate an lcov code coverage report.
- `npm run build`: Compile TypeScript and build the production bundle into `dist/`, followed by bundle budget verification.
- `npm run preview`: Locally serve the production bundle in `dist/`.
- `npm run format`: Format all code and assets with Prettier.
- `npm run format:check`: Verify formatting consistency across the repository.
- `npm run lint`: Run ESLint with zero-warning tolerance (`--max-warnings=0`).
- `npm run typecheck`: Run TypeScript compiler typechecking without emitting output (`tsc --noEmit`).

## Architecture and Structure

```
ideaweb/
├── scripts/
│   └── check-bundle.js        # Bundle budget and dynamic import verification
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AppErrorBoundary   # Runtime crash fallback UI
│   │   ├── Button             # Button and ButtonLink variants
│   │   ├── DummyForm          # Built-in task-specific interactive form
│   │   ├── Footer             # 3-column footer with Explore and Connect
│   │   ├── Navbar             # Top navigation header with club links
│   │   ├── SectionTitle       # Consistent section headings
│   │   ├── Sidebar            # Rail navigation with active section tracking
│   │   ├── SocialLinks        # Social navigation panel (Email, LinkedIn, IG, GitHub)
│   │   ├── ThemeToggle        # Light/dark theme toggle
│   │   └── TypeformButton     # Modal dialog for forms (lazy Typeform or DummyForm)
│   ├── config/                # Site configuration
│   │   ├── clubContact.ts     # Campus address, contact email, and LinkedIn URL
│   │   ├── forms.ts           # Form IDs, URL builders, and environment settings
│   │   ├── sections.ts        # Navigation destinations and labels
│   │   └── socialLinks.ts     # Social channel definitions
│   ├── data/                  # Static content and metadata
│   │   ├── faculty.ts         # Faculty mentor records
│   │   ├── projects.ts        # Project showcase records
│   │   ├── team.ts            # Student leadership roster
│   │   └── texts.ts           # Site copy and metadata
│   ├── hooks/                 # Custom React hooks
│   │   ├── useElementOnScreen # IntersectionObserver hook
│   │   └── useSectionNavigation # Section active state and scroll handling
│   ├── pages/
│   │   ├── landing/           # Landing page container
│   │   └── sections/          # Feature sections (home, about, team, projects, contribute)
│   ├── providers/             # React context providers (ThemeProvider)
│   ├── styles/                # CSS design system (tokens, reset, motion, globals)
│   └── utils/                 # Helpers (classNames, loadTypeform, isModifiedClick)
├── .env.example               # Environment variable templates
├── eslint.config.js           # ESLint 9 flat configuration
├── tsconfig.json              # TypeScript strict configuration
└── vite.config.ts             # Vite build configuration
```

## Form Integration and Testing

The site supports both hosted Typeforms and built-in interactive forms for testing:

### Environment Configuration

Configure options via `.env.local` (see `.env.example`):

- `VITE_USE_DUMMY_FORMS`: When set to `true` (default), buttons open lightweight built-in forms tailored to each task. Set to `false` to embed live Typeforms.
- `VITE_TYPEFORM_PROPOSE_PROJECT`: Typeform form ID for project proposals.
- `VITE_TYPEFORM_JOIN_COMMUNITY`: Typeform form ID for community membership.
- `VITE_TYPEFORM_JOIN_PROJECT`: Typeform form ID for project applications.

### Form Behavior

1. **Project Proposals** (`Contribute` section):
   - Fields: Project Lead Name, College Email, Working Project Title, Problem Statement, Solution & Architecture, Tech Stack.
2. **Membership Applications** (`Contribute` section):
   - Fields: Full Name, College Email, Roll Number & Department, Domain of Interest, Purpose / Statement of Intent, Profile Link.
3. **Project Applications** (`Projects` section):
   - Automatically pre-fills the selected project title.
   - Forwards contextual data (`project`, `project_id`) to Typeform hidden fields when using hosted forms.
4. **Performance & Isolation**:
   - Typeform embed scripts are lazy-loaded on demand only when a user opens a form modal.
   - Initial bundles never load Typeform dependencies upfront.

## Performance and Bundle Budgets

Bundle sizes are strictly checked on every build via `scripts/check-bundle.js`:

| Metric             | Budget (Raw) | Budget (Gzip) |
| :----------------- | :----------- | :------------ |
| Initial JavaScript | < 285 kB     | < 92 kB       |
| Initial CSS        | < 37 kB      | < 8 kB        |
| All JavaScript     | < 375 kB     | < 120 kB      |
| All CSS            | < 38 kB      | < 10 kB       |

In addition, Typeform dependencies must remain isolated from the initial dependency graph.

## Deployment

The project is configured for deployment on Vercel:

- `vercel.json` defines the Vite framework settings, build command, and `dist` output directory.
- Root paths and section hashes (`#home`, `#about`, `#team`, `#projects`, `#contribute`) are used throughout, requiring no complex route rewrites.
- Production URLs and Open Graph tags automatically use Vercel environment variables (`VERCEL_PROJECT_PRODUCTION_URL`).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
