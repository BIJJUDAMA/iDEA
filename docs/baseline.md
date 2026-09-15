# Phase 0 baseline

Captured on 2026-09-15 from the production Vite build on Linux with Node
22.22.2. This report describes the state before any architecture or styling
changes.

## Automated safety net

- Vitest and React Testing Library cover primary navigation, theme toggling,
  Team accordion behavior, Projects selection and contact actions,
  contribution action names, and the GitHub URL.
- axe-core runs in component and browser tests. The browser check fails on new
  serious or critical violations other than the accepted color contrast issue
  below.
- Playwright runs the smoke flow in desktop and mobile Chromium and compares
  every active section with a committed screenshot.
- CI runs the stable checks and the browser suite on pull requests and pushes
  to `main`, `master`, and `dev`.

## Production bundle

Vite 8.2.2 reported these build artifacts:

| Artifact   |       Raw |      Gzip |
| ---------- | --------: | --------: |
| JavaScript | 424.12 kB | 119.93 kB |
| CSS        |   3.03 kB |   1.33 kB |
| HTML       |   1.06 kB |   0.52 kB |

## Lighthouse

Lighthouse 13.0.1 ran against the local production build with headless Chrome
152 and its default mobile profile.

| Category       | Score |
| -------------- | ----: |
| Performance    |    95 |
| Accessibility  |    94 |
| Best practices |   100 |
| SEO            |   100 |

| Metric                   | Result |
| ------------------------ | -----: |
| First Contentful Paint   |  1.6 s |
| Largest Contentful Paint |  1.9 s |
| Total Blocking Time      | 220 ms |
| Cumulative Layout Shift  |      0 |
| Speed Index              |  1.6 s |

These numbers are a local comparison baseline, not production field data.
Machine load and network conditions can change later runs.

## Browser and viewport matrix

The repository had no declared browser support policy before Phase 0. The
automated baseline therefore defines the currently verified matrix as:

| Browser profile              | Viewport   | Status                       |
| ---------------------------- | ---------- | ---------------------------- |
| Chromium desktop             | 1440 × 900 | CI smoke and visual coverage |
| Chromium, Pixel 7 emulation  | 412 × 839  | CI smoke and visual coverage |
| Firefox desktop/mobile       | —          | Not currently verified       |
| Safari/WebKit desktop/mobile | —          | Not currently verified       |

## Visual baseline review

The committed screenshots under `tests/e2e/landing.spec.js-snapshots/` cover
Home, About, Team, Projects, and Contribute in both verified viewports. They
were reviewed together after generation.

The following pre-existing defects are accepted in this baseline:

- The shared reveal ref can leave substantial Team content and the desktop
  Projects content invisible. The desktop Projects snapshot currently records
  the empty section state.
- Projects and Contribute overflow or clip content horizontally on the mobile
  viewport.
- Mobile Projects places the details card partly below the initial viewport.
- Muted text fails WCAG AA color contrast in the tagline, image placeholder,
  project metadata, and inactive project titles. The browser axe check excludes
  only the `color-contrast` rule until this styling is addressed.
- Lighthouse reports an invalid heading order.
- The theme control is an unlabeled clickable SVG rather than a native button.
- Timeline navigation controls share the generic accessible name “Navigate to
  section,” so their destinations are not distinguishable to assistive
  technology.

These entries document current behavior; they do not waive them from later
accessibility and responsive work.
