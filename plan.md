# iDEA Codebase Modernization Plan

## 1. Purpose

This document defines a phased modernization of the iDEA website. The goal is to improve maintainability, correctness, accessibility, responsiveness, performance, test coverage, and developer experience without attempting a risky all-at-once rewrite.

The implementation should be delivered as small pull requests. Every phase must leave the application deployable, and behavior-changing work must be protected by tests or a documented visual baseline.

## 2. Current state

### Active product scope

The live landing page currently contains five sections:

1. Home
2. About
3. Team
4. Projects
5. Contribute

Roadmap, Alumni, Blogs, and the separate blog endpoint have been removed from the visible page flow. Their old source files, data, styles, assets, or exports may still remain and should be treated as dead code unless the product scope changes.

### Current technology

- React 19
- Vite 8
- JavaScript and JSX
- styled-components
- React Spring Parallax
- Typeform embed
- React Icons
- ESLint and Prettier
- GitHub Actions
- GitHub Pages deployment

### Main technical problems

- Removed sections still have source code and exports.
- Active sections still contain navigation callbacks for removed sections.
- Large files contain repeated JSX and styling.
- The same React ref is attached to multiple elements, so reveal animations do not observe each intended element correctly.
- A styled component is created inside the `Home` render function.
- Theme state is prop-drilled through the entire landing page.
- Navigation is duplicated and is not generated from one source of truth.
- The Parallax page index can become inconsistent with manual scrolling.
- Styling contains many inline objects, hard-coded pixel values, repeated breakpoints, and `!important` declarations.
- Component APIs expose implementation details through large compound namespaces such as `Projects.DescriptionHeader`.
- Data is split between JSON and JavaScript and has no schema or static validation.
- No unit, integration, accessibility, or end-to-end tests exist.
- CI does not run tests or type checking.
- The README describes features that are no longer active.

## 3. Modernization principles

All implementation work should follow these principles:

1. Preserve working behavior before improving implementation.
2. Delete dead code before refactoring active code.
3. Prefer platform capabilities over additional dependencies.
4. Keep components focused on product concepts, not individual wrapper elements.
5. Keep data, behavior, and presentation boundaries explicit.
6. Make accessibility part of component design, not a final patch.
7. Make responsive behavior intrinsic to components.
8. Measure performance before and after optimization.
9. Do not introduce a router, global state library, or large design-system dependency without a demonstrated need.
10. Keep each pull request independently reviewable and deployable.

## 4. Proposed architecture

```text
src/
├── app/
│   ├── App.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── pages/
│   └── landing/
│       ├── LandingPage.tsx
│       ├── LandingPage.module.css
│       └── LandingPage.test.tsx
├── sections/
│   ├── home/
│   │   ├── HomeSection.tsx
│   │   └── HomeSection.module.css
│   ├── about/
│   │   ├── AboutSection.tsx
│   │   └── AboutSection.module.css
│   ├── team/
│   │   ├── TeamSection.tsx
│   │   ├── TeamAccordion.tsx
│   │   ├── MemberCard.tsx
│   │   ├── TeamSection.module.css
│   │   └── TeamSection.test.tsx
│   ├── projects/
│   │   ├── ProjectsSection.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── ProjectSelector.tsx
│   │   ├── ProjectContactActions.tsx
│   │   ├── ProjectsSection.module.css
│   │   └── ProjectsSection.test.tsx
│   └── contribute/
│       ├── ContributeSection.tsx
│       ├── TypeformButton.tsx
│       └── ContributeSection.module.css
├── components/
│   ├── layout/
│   │   ├── PageShell/
│   │   ├── SectionShell/
│   │   └── SectionNavigation/
│   ├── social/
│   │   └── SocialLinks/
│   └── ui/
│       ├── Button/
│       ├── IconButton/
│       ├── Card/
│       ├── ImagePlaceholder/
│       └── Reveal/
├── config/
│   ├── externalLinks.ts
│   ├── forms.ts
│   └── sections.ts
├── data/
│   ├── faculty.ts
│   ├── projects.ts
│   └── team.ts
├── hooks/
│   ├── useActiveSection.ts
│   ├── useIntersectionObserver.ts
│   ├── useReducedMotion.ts
│   └── useTheme.ts
├── styles/
│   ├── reset.css
│   ├── tokens.css
│   ├── globals.css
│   └── motion.css
├── test/
│   ├── setup.ts
│   └── render.tsx
└── types/
    └── content.ts
```

This is a target rather than a requirement to create every directory immediately. Directories should be added only when their phase begins.

## 5. Definition of done for every phase

Every phase must satisfy the following baseline:

- `npm run format:check` passes.
- `npm run lint` passes.
- `npm run typecheck` passes after TypeScript is introduced.
- Relevant automated tests pass.
- `npm run build` passes.
- Keyboard navigation is not degraded.
- Light and dark themes are not degraded.
- Mobile and desktop screenshots have been reviewed.
- Documentation is updated when behavior or architecture changes.
- No unrelated refactoring is included in the phase PR.

## Phase 0 — Baseline and safety net

### Objective

Capture current behavior before changing architecture or styling.

### Why this phase comes first

The site currently has no automated tests. Structural and styling refactors can therefore break navigation, responsive layouts, project selection, team accordions, or external actions without being caught by CI.

### Tasks

#### Testing foundation

- [ ] Add Vitest and configure it through Vite.
- [ ] Add React Testing Library.
- [ ] Add `@testing-library/user-event`.
- [ ] Add `@testing-library/jest-dom`.
- [ ] Add a shared test setup file.
- [ ] Add a shared render helper for providers.
- [ ] Add Playwright for browser-level smoke tests.
- [ ] Add axe accessibility checks to component or browser tests.

#### Package scripts

- [ ] Add `test` for a non-watch CI run.
- [ ] Add `test:watch` for local development.
- [ ] Add `test:coverage`.
- [ ] Add `test:e2e`.
- [ ] Reserve `typecheck` for Phase 2.
- [ ] Add a single `check` script that runs all stable local checks.

#### Characterization coverage

- [ ] Verify Home renders the wordmark and primary navigation.
- [ ] Verify every active navigation item moves to its section.
- [ ] Verify the theme control changes the theme.
- [ ] Verify Team accordion panels open and close.
- [ ] Verify selecting a project updates project details.
- [ ] Verify project contact actions use the selected project.
- [ ] Verify both contribution actions expose accessible names.
- [ ] Verify the GitHub link opens the intended URL.
- [ ] Add desktop visual snapshots for all active sections.
- [ ] Add mobile visual snapshots for all active sections.

#### Baseline measurements

- [ ] Record the current JavaScript and CSS bundle sizes.
- [ ] Record Lighthouse performance, accessibility, best-practices, and SEO scores.
- [ ] Record the current supported browser and viewport matrix.
- [ ] Document any accepted pre-existing visual defects.

### Deliverables

- Test configuration and helpers.
- Initial behavior tests.
- Desktop and mobile smoke tests.
- A baseline report committed under `docs/baseline.md`.

### Acceptance criteria

- CI can detect a broken section link.
- CI can detect broken theme toggling.
- CI can detect broken Team and Projects interactions.
- At least one desktop and one mobile browser flow pass.
- Current production build remains deployable.

### Recommended PR boundary

One PR containing only test infrastructure and characterization tests.

## Phase 1 — Remove dead code and restore a truthful product model

### Objective

Remove obsolete Roadmap, Alumni, Blogs, and blog-route code before refactoring active features.

### Tasks

#### Remove obsolete screens and features

- [ ] Delete the inactive Roadmap content module.
- [ ] Delete the inactive Alumni content module.
- [ ] Delete the inactive Blogs content module.
- [ ] Delete `BlogEndpoint` if Blogs will not return in the immediate roadmap.
- [ ] Delete corresponding section component directories and styles.
- [ ] Delete obsolete data files.
- [ ] Delete roadmap images if they have no remaining references.
- [ ] Remove dead component barrel exports.

#### Remove stale active references

- [ ] Remove `roadmap`, `alumni`, and `blogs` callbacks from active section props.
- [ ] Remove timeline dots for deleted sections.
- [ ] Remove unused up/down navigation props and commented JSX.
- [ ] Remove unused global `.not-found` styles if routing remains disabled.
- [ ] Remove unused `.loading` and `.counting` styles.
- [ ] Remove dependencies that become unused after deletion.

#### Correct documentation and metadata

- [ ] Update the README product description.
- [ ] Update the README structure section.
- [ ] Remove references to the deleted blog route.
- [ ] Review page description and Open Graph description for accuracy.

#### Establish a single section registry

Create a section configuration that controls labels, ordering, IDs, and navigation:

```ts
export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "projects", label: "Projects" },
  { id: "contribute", label: "Contribute" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
```

The landing page, hero navigation, and section navigation must use this registry rather than maintaining separate orders.

### Deliverables

- Only active product features remain.
- One canonical section registry exists.
- README and metadata match the site.

### Acceptance criteria

- Searching the source for removed section names returns no functional references.
- No empty or non-functional navigation control remains.
- No removed module is included through a barrel export.
- Existing characterization tests still pass.
- Bundle size does not increase.

### Recommended PR boundary

One PR for dead-code removal and one PR for the section registry if the combined diff becomes difficult to review.

## Phase 2 — TypeScript and stronger static checks

### Objective

Introduce strict types incrementally and establish enforceable code-quality boundaries.

### Tasks

#### TypeScript configuration

- [ ] Install TypeScript and React type packages.
- [ ] Add `tsconfig.json` configured for Vite and modern browsers.
- [ ] Enable `strict`.
- [ ] Enable `noUncheckedIndexedAccess`.
- [ ] Enable `exactOptionalPropertyTypes`.
- [ ] Enable `noFallthroughCasesInSwitch`.
- [ ] Add `npm run typecheck` using `tsc --noEmit`.

#### Migration order

1. [ ] Configuration constants.
2. [ ] Shared data types.
3. [ ] Hooks.
4. [ ] Shared UI components.
5. [ ] About and Home.
6. [ ] Contribute.
7. [ ] Projects.
8. [ ] Team.
9. [ ] Landing and App entry points.

Avoid mixing TypeScript conversion with a large visual rewrite. A converted file should initially preserve behavior.

#### Data models

- [ ] Define `SectionId`.
- [ ] Define `FacultyMember`.
- [ ] Define `TeamMember`.
- [ ] Define `TeamGroup`.
- [ ] Define `Project`.
- [ ] Define external contact types.
- [ ] Give every record a stable ID.
- [ ] Replace array-index identity where possible.
- [ ] Normalize inconsistent naming such as `HR`, `ideation`, and `internal_dev`.
- [ ] Normalize date and status representations.
- [ ] Convert content JSON to typed TypeScript modules or validate imported JSON against schemas.

#### ESLint improvements

- [ ] Add TypeScript-aware ESLint rules.
- [ ] Add `eslint-plugin-jsx-a11y`.
- [ ] Enforce hooks rules.
- [ ] Enforce consistent type imports.
- [ ] Prevent circular dependencies.
- [ ] Add import-boundary rules between shared components and feature sections.
- [ ] Prevent unused barrel exports.

### Deliverables

- Strict TypeScript build.
- Typed content and configuration.
- Type-aware linting.

### Acceptance criteria

- No production source remains as untyped JSX or JavaScript unless explicitly documented.
- No `any` is introduced without a reason comment.
- Invalid section IDs and malformed project records fail type checking.
- `npm run typecheck` runs in CI and pre-push checks.

### Recommended PR boundary

Use multiple PRs following the migration order. Do not convert the entire repository in one PR.

## Phase 3 — Feature-oriented React architecture

### Objective

Replace large, repetitive files and wrapper-oriented compound APIs with feature components that express product concepts.

### Cross-cutting tasks

- [ ] Rename `content/` to `sections/`.
- [ ] Keep page orchestration in `pages/landing`.
- [ ] Keep reusable product-agnostic components under `components/`.
- [ ] Keep section-only components next to their owning section.
- [ ] Avoid a React component for wrappers that need no behavior or semantic abstraction.
- [ ] Prefer direct imports for feature modules.
- [ ] Restrict barrel files to stable public boundaries.
- [ ] Remove fragments that wrap only one child.
- [ ] Destructure props at component boundaries.
- [ ] Replace vague names such as `Generic`, `Container`, and `BlockInnerContainer` with semantic names.

### Team refactor

Target composition:

```text
TeamSection
├── SectionHeader
├── FacultyGrid
│   └── MemberCard
└── TeamAccordion
    └── MemberGrid
        └── MemberCard
```

Tasks:

- [ ] Convert separate team arrays into a `teamGroups` array.
- [ ] Replace six repeated accordion blocks with one `.map()`.
- [ ] Use stable IDs for accordion state.
- [ ] Extract `MemberCard`.
- [ ] Reuse `MemberCard` for faculty where the visual model permits.
- [ ] Ensure missing images have an intentional fallback.
- [ ] Remove duplicate React keys on nested elements.
- [ ] Keep the active accordion state inside `TeamAccordion`.

### Projects refactor

Target composition:

```text
ProjectsSection
├── ProjectDetails
│   ├── ProjectMetadata
│   ├── TechnologyList
│   └── ProjectContactActions
└── ProjectSelector
```

Tasks:

- [ ] Store the active project ID rather than its array index.
- [ ] Extract project selection into `ProjectSelector`.
- [ ] Extract details into `ProjectDetails`.
- [ ] Extract external actions into `ProjectContactActions`.
- [ ] Replace array-index keys for tags with stable values.
- [ ] Move the Typeform ID into configuration.
- [ ] Close contact actions when the selected project changes.
- [ ] Add an explicit selected state to project list items.

### Contribute refactor

- [ ] Extract a reusable `TypeformButton`.
- [ ] Move form IDs to `config/forms.ts`.
- [ ] Replace duplicate inline button styles with a shared variant.
- [ ] Replace manual line breaks with responsive text containers.
- [ ] Improve copy hierarchy and heading semantics.

### Navigation refactor

- [ ] Rename the hero `Navbar` to `HeroNavigation`.
- [ ] Rename the timeline component to `SectionNavigation` or `SectionRail`.
- [ ] Render both from the section registry.
- [ ] Replace the large static compound namespace with a focused component API.
- [ ] Mark the active destination with `aria-current`.
- [ ] Give every destination a unique accessible name.

### Deliverables

- Feature-oriented section directories.
- Data-driven Team and navigation.
- Smaller Projects and Contribute components.
- Minimal shared component API.

### Acceptance criteria

- Team group markup exists in one place.
- Section navigation markup exists in one place.
- No active component file is excessively large because of copy-pasted structures.
- Components have clear ownership and responsibility.
- Characterization and interaction tests pass.

## Phase 4 — Design system and styling migration

### Objective

Replace ad hoc styled-components and inline styles with a consistent, responsive CSS system.

### Styling strategy

Use:

- Global CSS for reset, design tokens, document defaults, and theme definitions.
- CSS Modules for component and section styles.
- CSS custom properties for intentional runtime values.
- Native CSS layout, animation, and responsive features.

Do not add Tailwind, Sass, or another styling framework unless the team makes a separate architectural decision.

### Token system

#### Color tokens

- [ ] Separate primitive palette values from semantic usage.
- [ ] Define surface, text, border, action, success, and focus tokens.
- [ ] Define light and dark theme values with the same semantic names.
- [ ] Verify text and interactive-state contrast.

#### Spacing tokens

- [ ] Create a small spacing scale.
- [ ] Replace arbitrary padding and gap values.
- [ ] Define page gutters and content-width tokens.

#### Typography tokens

- [ ] Define font families centrally.
- [ ] Define responsive heading and body scales with `clamp()`.
- [ ] Define line-height and letter-spacing tokens.
- [ ] Remove manual `<br />` elements used for layout.

#### Other tokens

- [ ] Normalize radius values.
- [ ] Normalize border widths.
- [ ] Normalize shadows.
- [ ] Add z-index layers.
- [ ] Add motion durations and easing curves.
- [ ] Add content and section width constraints.

### CSS organization

Use layers:

```css
@layer reset, tokens, base, components, utilities;
```

Suggested responsibility:

- `reset.css`: element normalization.
- `tokens.css`: theme-independent and theme-specific tokens.
- `globals.css`: body, root, links, focus, selection, and general typography.
- `motion.css`: reusable reveal states and reduced-motion overrides.
- `*.module.css`: local component and section styles.

### Migration order

1. [ ] Tokens and global styles.
2. [ ] Button and IconButton.
3. [ ] PageShell and SectionShell.
4. [ ] Section navigation and social links.
5. [ ] Home.
6. [ ] About.
7. [ ] Contribute.
8. [ ] Projects.
9. [ ] Team.
10. [ ] Remove styled-components.

### Style rules

- [ ] Prefer `rem`, `%`, `min()`, `max()`, and `clamp()` over fixed pixels.
- [ ] Use `min-height: 100dvh` with a compatible fallback.
- [ ] Use grid and flexbox rather than absolute positioning for primary layout.
- [ ] Use a documented small breakpoint set.
- [ ] Prefer container queries for self-contained grids and cards.
- [ ] Replace inline style objects with classes.
- [ ] Pass genuinely dynamic values as CSS custom properties.
- [ ] Replace `transition: all` with explicit properties.
- [ ] Eliminate unexplained `!important` declarations.
- [ ] Avoid selectors that depend on generated class-name prefixes.
- [ ] Keep visible focus styles centralized and high contrast.

### Deliverables

- Documented design tokens.
- Shared Button, IconButton, Card, and layout primitives.
- CSS Modules for all active features.
- No styled-components runtime dependency.

### Acceptance criteria

- Active UI has no inline layout or presentation objects.
- Breakpoints are centralized or intentionally component-scoped.
- Light and dark themes use semantic CSS variables.
- Visual regression screenshots are approved.
- CSS and JavaScript bundles do not regress without explanation.

## Phase 5 — Navigation, theme, and motion behavior

### Objective

Simplify page behavior by using native scrolling and reusable state hooks.

### Replace Parallax page orchestration

- [ ] Use normal document sections with stable IDs.
- [ ] Use native smooth scrolling only when reduced motion is not requested.
- [ ] Evaluate `scroll-snap-type: y proximity`; avoid mandatory snapping if it harms reading.
- [ ] Track the active section with Intersection Observer.
- [ ] Synchronize navigation state during mouse-wheel, touch, keyboard, and programmatic scrolling.
- [ ] Keep the browser scrollbar visible.
- [ ] Update the URL hash without causing unwanted scroll loops.
- [ ] Remove `@react-spring/parallax` when no longer used.

### Theme provider

- [ ] Add a `ThemeProvider` owned by the app layer.
- [ ] Represent theme as `"light" | "dark" | "system"` if system mode is supported.
- [ ] Initialize from saved preference and `prefers-color-scheme`.
- [ ] Persist explicit user selection.
- [ ] Set `data-theme` and `color-scheme` on the document root.
- [ ] Remove `isLight` and `setIsLight` prop drilling.
- [ ] Use an accessible theme button with a visible label or accessible name.

### Reveal animations

- [ ] Replace the shared-ref pattern.
- [ ] Give every reveal instance its own observer or observe a single section root.
- [ ] Stop observing one-time reveals after activation.
- [ ] Ensure server/test environments without Intersection Observer have a safe fallback.
- [ ] Disable non-essential motion when reduced motion is requested.
- [ ] Avoid animating layout-affecting properties where opacity and transforms suffice.

### Deliverables

- Native section scrolling.
- Accurate active-section state.
- Central theme provider.
- Correct reusable reveal behavior.

### Acceptance criteria

- Manual scrolling and navigation controls always agree on the active section.
- Every section has a stable URL fragment.
- Refreshing a section URL restores a useful position.
- Theme preference survives a reload.
- Reduced-motion users receive minimal motion.
- Parallax and obsolete scrolling CSS are removed.

## Phase 6 — Accessibility and responsive design

### Objective

Bring the active site to a WCAG 2.2 AA-oriented implementation and make layouts robust across common viewport and input types.

### Semantic structure

- [ ] Add a skip-to-content link.
- [ ] Use one `<main>` landmark.
- [ ] Render each major destination as a labeled `<section>`.
- [ ] Ensure headings form a logical hierarchy.
- [ ] Use `<nav>` for navigation groups.
- [ ] Use lists for navigation, technology tags, and team groups where appropriate.
- [ ] Use links for URL navigation and buttons for actions.

### Keyboard and focus

- [ ] Ensure all controls are reachable by keyboard.
- [ ] Ensure focus order follows visual order.
- [ ] Use visible high-contrast `:focus-visible` styling.
- [ ] Move icon click handlers onto buttons.
- [ ] Give controls distinct accessible names.
- [ ] Move focus intentionally when opening overlays or external embed dialogs.
- [ ] Ensure no scrolling implementation traps keyboard focus.

### Team accordion

- [ ] Use a button for each accordion header.
- [ ] Connect buttons and panels with `aria-controls` and `aria-labelledby`.
- [ ] Keep `aria-expanded` synchronized.
- [ ] Give panels stable IDs.
- [ ] Decide and document whether one or multiple groups may remain open.

### Projects selector

- [ ] Expose selected state with `aria-current`, `aria-selected`, or an appropriate pattern.
- [ ] Ensure project changes are announced when needed.
- [ ] Ensure contact actions update with the selected project.
- [ ] Verify external link labels include destination context.

### Responsive validation

Test at minimum:

- [ ] 320 px mobile.
- [ ] 375 px mobile.
- [ ] 768 px tablet.
- [ ] 1024 px laptop.
- [ ] 1440 px desktop.
- [ ] 200% browser zoom.
- [ ] Landscape mobile.
- [ ] Touch input.
- [ ] Keyboard-only input.
- [ ] Reduced motion.
- [ ] Light and dark system preferences.

### Acceptance criteria

- Automated axe tests have no serious or critical violations.
- All functionality is operable without a mouse.
- Focus is visible and not obscured.
- Interactive targets meet appropriate minimum sizing and spacing.
- Content works at 200% zoom without losing functionality.
- No horizontal page overflow occurs at supported widths.

## Phase 7 — Performance and resilience

### Objective

Reduce initial runtime cost and make third-party or asset failures graceful.

### Bundle work

- [ ] Compare the bundle against the Phase 0 baseline.
- [ ] Remove styled-components after CSS migration.
- [ ] Remove React Spring after native scrolling migration.
- [ ] Dynamically load Typeform code on intent or interaction.
- [ ] Audit React Icons imports and shipped icon modules.
- [ ] Add a documented JavaScript bundle budget.
- [ ] Add a documented CSS bundle budget.
- [ ] Avoid code splitting tiny modules that would increase request overhead.

### Image work

- [ ] Give all images explicit dimensions or aspect ratios.
- [ ] Lazy-load below-the-fold images.
- [ ] Use `decoding="async"` where appropriate.
- [ ] Generate responsive image sizes if source resolution warrants it.
- [ ] Keep WebP or AVIF versions for photographic assets.
- [ ] Replace placeholders with final assets or explicitly label them as intentional.
- [ ] Verify meaningful alternative text and decorative empty alt text.

### Resilience

- [ ] Provide a fallback link if Typeform fails to load.
- [ ] Add an application error boundary for unexpected rendering failures.
- [ ] Avoid making core navigation depend on third-party JavaScript.
- [ ] Handle unsupported Intersection Observer environments gracefully.
- [ ] Test with slow network and disabled cache.

### Deployment and metadata

- [ ] Confirm the correct Vite `base` value for the GitHub Pages location.
- [ ] Confirm manifest URLs under the deployed base path.
- [ ] Add canonical URL metadata.
- [ ] Add an Open Graph image.
- [ ] Review favicon formats and sizes.
- [ ] Verify robots and sitemap requirements.

### Acceptance criteria

- Initial bundle is smaller than the Phase 0 baseline.
- Typeform code is not part of the critical initial interaction path where avoidable.
- No broken assets exist on the deployed GitHub Pages URL.
- Lighthouse regressions are documented and approved.
- Core content remains readable when third-party scripts fail.

## Phase 8 — CI, hooks, documentation, and maintenance

### Objective

Make quality standards automatic and document the new architecture for future contributors.

### CI pipeline

The final CI workflow should run:

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Tasks:

- [ ] Cache Playwright browsers where appropriate.
- [ ] Upload test reports on failure.
- [ ] Upload Playwright traces on failure.
- [ ] Upload coverage reports.
- [ ] Add a bundle-size comparison or budget check.
- [ ] Add concurrency cancellation for superseded branch builds.
- [ ] Keep deployment separate from validation.

### Git hooks

- [ ] Keep pre-commit fast: formatting and linting of changed files.
- [ ] Run type checking and focused tests before push.
- [ ] Leave the complete clean install and browser suite to CI.
- [ ] Document hook installation.
- [ ] Ensure hooks work consistently on macOS, Linux, and supported shells.

### Repository maintenance

- [ ] Add `.nvmrc`, `.node-version`, or Volta configuration matching `package.json`.
- [ ] Add Dependabot or Renovate.
- [ ] Add a pull request template.
- [ ] Add `CONTRIBUTING.md`.
- [ ] Add `docs/architecture.md`.
- [ ] Add `docs/styling.md`.
- [ ] Add `docs/testing.md`.
- [ ] Document deployment and rollback.
- [ ] Remove obsolete comments and temporary migration notes.

### README rewrite

The README should explain:

- The current five-section product.
- Requirements and local setup.
- Available commands.
- Architecture at a glance.
- Styling conventions.
- Testing commands.
- Git hook setup.
- Deployment process.
- Contribution workflow.

### Acceptance criteria

- A new contributor can install, run, test, and build the project using only repository documentation.
- Every pull request runs formatting, linting, type checking, tests, and production build checks.
- Dependency updates are automated but never auto-merged without passing CI.
- Architecture and styling decisions are documented.

## 6. Pull request sequence

Recommended order:

1. `test: add characterization test foundation`
2. `refactor: remove inactive feature code`
3. `refactor: introduce canonical section registry`
4. `chore: add strict TypeScript configuration`
5. `refactor: type content data and configuration`
6. `refactor: migrate shared hooks and UI to TypeScript`
7. `refactor: make team section data-driven`
8. `refactor: decompose projects section`
9. `refactor: simplify contribute section and form configuration`
10. `style: introduce semantic design tokens and CSS layers`
11. `style: migrate shared UI and navigation to CSS Modules`
12. `style: migrate active sections to CSS Modules`
13. `refactor: replace parallax with native section scrolling`
14. `refactor: centralize theme state and persistence`
15. `a11y: complete semantic and keyboard interaction pass`
16. `perf: lazy-load integrations and optimize assets`
17. `ci: enforce tests, types, accessibility, and bundle budgets`
18. `docs: document architecture, styling, testing, and deployment`

## 7. Risk management

### Visual regression risk

Mitigation:

- Capture screenshots before styling migration.
- Migrate one section at a time.
- Review desktop, tablet, and mobile in each styling PR.
- Avoid architecture and visual redesign in the same PR.

### Interaction regression risk

Mitigation:

- Add characterization tests first.
- Preserve accessible names during refactoring.
- Test keyboard and touch flows.
- Keep Typeform fallbacks available.

### TypeScript migration risk

Mitigation:

- Migrate from low-dependency modules upward.
- Do not silence errors with broad `any` types.
- Keep runtime behavior unchanged during type-only PRs.

### Scope expansion risk

Mitigation:

- Treat visual redesign as a separate product decision.
- Do not restore removed sections during modernization.
- Do not add a router or state manager without a concrete requirement.
- Keep each phase tied to measurable acceptance criteria.

### Deployment risk

Mitigation:

- Build and preview production output before merge.
- Validate asset paths on the actual GitHub Pages base URL.
- Keep deployment configuration changes isolated.
- Document rollback to the previous deployment commit.

## 8. Metrics to track

Record these at Phase 0 and compare after Phases 4, 6, and 7:

- JavaScript raw and gzip bundle size.
- CSS raw and gzip bundle size.
- Number of production dependencies.
- Number of inline style objects.
- Number of `!important` declarations.
- Number of duplicated breakpoint definitions.
- Largest component and style-file line counts.
- Unit and integration test coverage.
- End-to-end test duration.
- Lighthouse scores.
- Axe violations.
- Largest Contentful Paint.
- Interaction to Next Paint.
- Cumulative Layout Shift.

Metrics are guardrails rather than goals by themselves. A smaller file or bundle is useful only when behavior and maintainability improve.

## 9. Decisions to confirm before implementation

The following decisions affect later phases and should be confirmed before their work starts:

1. Should the styling migration preserve the current design exactly or include a visual redesign?
2. Are Roadmap, Alumni, and Blogs permanently removed, or expected to return soon?
3. Should theme selection support light, dark, and system modes, or only light and dark?
4. Is full-screen section snapping a product requirement?
5. Which browsers and minimum mobile width must be supported?
6. Is GitHub Pages the long-term deployment target?
7. Should project and team content remain code-owned, or eventually move to a CMS?

These decisions do not block Phases 0–2. They should be resolved before the related styling, scrolling, or content architecture phase.

## 10. Suggested first milestone

The first milestone should include only the following:

1. Add characterization tests and browser smoke tests.
2. Delete inactive Roadmap, Alumni, Blogs, and blog endpoint code.
3. Remove stale navigation callbacks and controls.
4. Introduce one canonical section registry.
5. Correct the multi-element ref animation bug.
6. Update the README to reflect the active site.

This milestone produces immediate value with limited visual risk and creates a stable foundation for TypeScript, architecture, and styling work.

## 11. Rough implementation estimate

For one developer working sequentially:

| Phase                                       | Approximate effort |
| ------------------------------------------- | -----------------: |
| Phase 0 — Baseline and tests                |           1–2 days |
| Phase 1 — Dead-code cleanup                 |          0.5–1 day |
| Phase 2 — TypeScript and static checks      |           2–4 days |
| Phase 3 — Component architecture            |           3–5 days |
| Phase 4 — Styling migration                 |           4–7 days |
| Phase 5 — Navigation, theme, and motion     |           2–4 days |
| Phase 6 — Accessibility and responsive pass |           2–4 days |
| Phase 7 — Performance and resilience        |           1–3 days |
| Phase 8 — CI and documentation              |           1–2 days |

Expected total: approximately 3–5 weeks for one developer, depending on review time, visual fidelity requirements, and whether a redesign is included. The work should still be planned by phase and pull request rather than treated as one deadline or one branch.
