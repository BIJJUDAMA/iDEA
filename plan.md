# iDEA Website — UI/UX Improvement Plan

> Implementation status: P0, P1, and P2 completed. Verification recorded below.
> This plan is scoped to **UI + UX only** — no backend, no content authoring (team/faculty remains placeholder data by design).
> Every step is grounded in the current codebase; file references are exact.

---

## 1. What is already strong (do not regress)

| Area                   | Implementation                                                                                                    | Location                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Hero entrance          | `brandBadge` "iD", `hero-enter` stagger (600ms), bottom `scrollCue`                                               | `src/pages/landing/LandingPage.tsx`, `LandingPage.module.css`        |
| Rail navigation        | Labeled links, "1 of 5" progress, active/completed states, horizontal mobile rail                                 | `src/components/Sidebar.tsx`, `src/components/Navigation.module.css` |
| Navbar                 | Fixed, brand + socials + theme toggle, `isPastHero` show/hide with `inert`/`aria-hidden`                          | `src/components/Navbar.tsx`                                          |
| Accordion              | `grid-template-rows 0fr→1fr` animation, `inert` content, chevron rotate                                           | `src/components/Accordion.tsx`, `Accordion.module.css`               |
| Projects               | Accordion selector, `project-enter` animation, `key`-based remount, "Join this project"/"Contact team" actions    | `src/pages/sections/projects/`                                       |
| Footer                 | Brand, contact, socials, dynamic copyright year, back-to-top (`#home`)                                            | `src/components/Footer.tsx`                                          |
| Copy externalization   | All user-facing text in one source of truth                                                                       | `src/data/texts.ts`                                                  |
| Shared config          | Sections, forms, socials, club contact consumed by Sidebar/Hero/Footer                                            | `src/config/`                                                        |
| Accessibility baseline | Skip link, focus management on section navigation, `inert`, ARIA on accordions, `prefers-reduced-motion` override | throughout + `src/styles/motion.css`                                 |
| Quality gates          | `npm run check` (format:check → lint → typecheck → test → build), bundle budgets                                  | `package.json`, `scripts/check-bundle.js`                            |

---

## 2. Batch 1 — P0: "feels broken" (fix first, small and independently shippable)

### 1.1 Kill the theme flash (FOUC)

- **Problem:** `ThemeProvider` applies `data-theme` in `useLayoutEffect` — after first paint. Dark-mode users see a light flash on every load.
- **Fix:**
  - Add a pre-paint inline script in `index.html` (before CSS/JS):
    - read `localStorage.getItem("idea-theme")`
    - `"dark"` → set `data-theme="dark"`; `"system"`/missing → `matchMedia("(prefers-color-scheme: dark)")`
  - React `ThemeProvider` remains the source of truth once mounted.
- **Files:** `index.html`, `src/providers/ThemeProvider.tsx` (verification only).

### 1.2 Replace placeholder boxes with designed brand panels

- **Problem:** every visitor sees dashed boxes labeled "intentional placeholder" / "preview coming soon" — reads as unfinished, not intentional (README says code-rendered placeholders are deliberate).
- **Fix:**
  - Extend `ImagePlaceholder` with `variant: "sketch" | "brand"`.
  - `brand` variant: diagonal `--palette-violet`/`--palette-lime` gradient (or `--color-surface-accent` flat tint) + large serif glyph (section/project initial or "iDEA") at low opacity. No label text.
  - Same `role="img"` + descriptive `aria-label` semantics.
  - Purge phrases "intentional placeholder" and "preview coming soon" from copy.
- **Files:** `src/components/ImagePlaceholder.tsx`, `src/pages/sections/about/AboutSection.tsx` (`texts.ts:15`), `src/pages/sections/projects/ProjectMetadata.tsx:27`, `src/data/texts.ts`.

### 1.3 Fix reveal-on-scroll initial flash

- **Problem:** `useElementOnScreen` starts `useState(true)` → content flashes visible, hides, then re-reveals on first intersect.
- **Fix:** initial state = observer unavailable only:
  ```ts
  useState(() => typeof IntersectionObserver === "undefined");
  ```
  Revisit the `eslint-disable react-hooks/set-state-in-effect` once corrected.
- **Files:** `src/hooks/useElementOnScreen.ts:7`.

### 1.4 Assets & share-graph (SEO/Platform)

- **Favicon:** repo has no `public/` dir; browsers 404 `/favicon.ico`. Add `public/favicon.svg` (+ `.ico`/apple-touch if desired) and `<link>` tags; or inline SVG data-URI in `index.html`.
- **OG image:** `vite.config.ts` injects `og:title/description/type` only — sharing shows no preview. Generate a 1200×630 branded image (or SVG-based), reference it, add `twitter:card = summary_large_image`.
- **Manifest:** add minimal `manifest.json` (name, theme color, icons) for "Add to Home Screen".
- **Files:** `index.html`, `vite.config.ts` (`transformIndexHtml`), new `public/`.

---

## 3. Batch 2 — P1: "feels unpolished"

### 2.1 Navbar behavior

- Brand "iDEA" is a `<p>`, not a link — make it `<a href="#home">` (hashchange → `navigateTo` handles it).
- Navbar only hides at hero, never on scroll direction. Add hide-on-scroll-down / reveal-on-scroll-up using the existing rAF-batched scroll logic in `useSectionNavigation`.
- While hidden at hero the navbar is `inert`, so the theme toggle is unreachable on load — dark users can't toggle without scrolling. Decide: keep navbar always visible, or keep toggle reachable.
- **Files:** `src/components/Navbar.tsx`, `src/hooks/useSectionNavigation.ts`.

### 2.2 Theme toggle destroys "system" preference

- `setPreference(isLight ? "dark" : "light")` overwrites saved `"system"` forever — no way back without clearing storage.
- **Fix options:**
  1. Add `title`/`aria-label` describing current mode.
  2. Cycle light → dark → system.
  3. Best: 3-option segmented control (Light/Dark/Auto) in navbar — `ThemePreference` type already supports identity/light/dark/system.
- Also set `meta[name="theme-color"]` dynamically in `ThemeProvider` (currently static `#f5f4f0`, stays light in dark mode).
- **Files:** `src/components/ThemeToggle.tsx`, `src/providers/ThemeProvider.tsx`, `index.html`.

### 2.3 Mobile rail overflow risk

- `.railLabel` keeps `white-space: nowrap` inside the 5-column mobile grid — verify at 320px (Pixel 7-class); add `overflow: hidden; text-overflow: ellipsis; max-width: 100%` or drop nowrap on mobile.
- **Files:** `src/components/Navigation.module.css:218-222` (and `:134`).

### 2.4 Typography details

- **`text-align: justify`** in About → `text-align: start` (rivers in justified text).
- **Hero tagline**: `--font-mono` + `--text-xs` + `--tracking-wide` (0.3em) — tiny text with huge tracking; reduce to `--tracking-label` (0.08em), consider `--text-sm`.
- **Faculty grid**: `TeamSection.module.css` uses `grid-template-columns: 1fr` on desktop — two mentor cards stack with a wide empty column. Use `repeat(2, minmax(0, 1fr))` desktop, 1-col under `@container (max-width: 56rem)`.
- **Footer "Find us"/"Connect" are `<h2>`s** — footer micro-headings, not page sections; use styled `<h3>` or `<p>` (keep heading ladder: h1 hero → h2 sections → h3 accordions → h4 project titles).
- **Files:** `src/pages/sections/about/AboutSection.module.css:24`, `src/pages/landing/LandingPage.module.css` (tagline), `src/pages/sections/team/TeamSection.module.css:45`, `src/components/Footer.tsx`.

### 2.5 Projects year hardcoded

- `2023-24` is hardcoded (`ProjectsSection.tsx:26`) and is semantically the _team_ term. Derive from newest project's `timeline.started` or move to `src/config/sections.ts`.
- **Files:** `src/pages/sections/projects/ProjectsSection.tsx:26`, `src/config/`.

### 2.6 Error boundary is unthemed

- `AppErrorBoundary` renders bare `<main><h1>` with no design tokens — restyle with SectionShell/tokens, keep it simple.
- **Files:** `src/components/AppErrorBoundary.tsx:13-23`.

---

## 4. Batch 3 — P2: consistency housekeeping

| Item               | Detail                                                                                                                                                                                              | File                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Dead raw class     | `"project-contact-links"` global string mixed with module class                                                                                                                                     | `src/pages/sections/projects/ProjectContactActions.tsx:34`         |
| Two class idioms   | `.filter(Boolean).join(" ")` in `Button`/`Card`/`Layout`/`IconButton` vs `classNames` util everywhere else                                                                                          | `src/components/*`                                                 |
| Duplicated guard   | `metaKey/ctrlKey/shiftKey/altKey` modifier check in both `HeroNavigation` and `Sidebar` — extract util                                                                                              | both files                                                         |
| Rotated divider    | 8°-rotated violet rule in Contribute reads "broken" under dark-mode color collision                                                                                                                 | `src/pages/sections/contribute/ContributeSection.module.css:41-48` |
| Brand lockup       | Four treatments: hero badge "iD", hero wordmark lowercase serif, navbar sans "iDEA", footer "iDEA✱". Unify to the serif wordmark; swap `✱` for SVG/react-icons star in Footer + hero `✱ Contribute` | `LandingPage`, `Navbar`, `Footer`                                  |
| Interaction tuning | Next-section button bounce `2.4s` runs always — animate only on hover/focus (or faster idle)                                                                                                        | `src/pages/landing/LandingPage.module.css`                         |
| Version-bump CI    | Visual regression snapshots / test fixtures must be re-captured after visual changes                                                                                                                | `.github/workflows/ci.yml`                                         |

---

## 5. Micro-interactions audit (current state)

| Interaction          | Status                                                        | Recommendation              |
| -------------------- | ------------------------------------------------------------- | --------------------------- |
| Accordion open/close | `0fr→1fr`, 320ms                                              | Keep; optionally 240ms      |
| Project swap         | `project-enter` remount                                       | Keep                        |
| Scroll cue           | `cue-drift` 1.8s infinite, covered by reduced-motion override | Keep                        |
| Next-section button  | Always bouncing 2.4s                                          | Animate on hover/focus only |
| Button hover         | Translate + offset shadow                                     | Consistent, keep            |
| Active rail dot      | Grow + ring                                                   | Keep                        |

---

## 6. Definition of done (per batch)

Every batch must keep the tree green with:

```
npm run check   # format:check → lint → typecheck → test → build (runs bundle budgets)
```

Note: `npm run build` now runs `scripts/check-bundle.js` (initial JS ≤ 250kB raw / 80kB gzip; initial CSS ≤ 30kB raw / 8kB gzip; all JS ≤ 320kB / 95kB) — asset additions (favicon/OG/manifest) are static and must not inflate budgeted bundles.

Prefer one commit per item (or per logical batch), matching repo style (`style:`, `feat:`, `chore:`, `docs:`).

---

## 7. Prioritized roadmap

| Priority | Scope                                                                                                                                 | Effort                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| P0       | FOUC script, brand panels, reveal flash, favicon/OG/manifest                                                                          | S (independent commits) |
| P1       | Navbar link/scroll-hide, system theme + theme-color, mobile rail, typography (About/Faculty/tagline), year derivation, error boundary | M                       |
| P2       | Class/idiom consolidation, brand lockup, divider, button idle animation, test snapshot refresh                                        | S                       |

Suggested order: P0 (validate check pipeline) → P1 → P2.

## 8. Completion record

- [x] P0: pre-paint theme initialization, designed brand panels, reveal initialization, favicon, 1200×630 PNG sharing image, social metadata, and manifest.
- [x] P1: home-linked navbar brand, rAF scroll-direction behavior, Light/Dark/Auto controls, dynamic browser theme color, mobile rail overflow protection, typography, responsive faculty columns, footer micro-labels, derived project year, and themed recovery layout.
- [x] P2: shared class and click utilities, consistent serif brand, decorative SVG star, straight divider, hover/focus-only next-section motion, shared form button styles, accessible contact assertions, and CI using `npm run check`.

The hero remains free of persistent navbar/rail chrome. Its inline theme control keeps settings reachable. Outside the hero, downward scrolling hides the navbar and upward scrolling reveals it; the rail continues tracking sections within its existing sticky container and stops before the compact footer. On mobile, navbar socials are reduced to GitHub to accommodate the three theme choices; all social links remain available in the footer.

Verification:

- `npm run check`: formatting, lint, types, all 29 Vitest tests, production build, and unchanged bundle budgets pass.
- Real Chromium: 1,242 slow, fast, complete-page, return-to-hero, and footer-boundary scroll samples across 1440×900, 768×1024, 412×915, 320×720, and 568×320 in both themes; zero tracking/containment errors.
- 20 axe scans across those theme/viewport combinations; zero violations, including color contrast.
- Five pre-paint scenarios with the React entry blocked: saved Light/Dark, Auto, absent preference, and invalid preference resolve correctly before React mounts.
- Keyboard checks skip hidden chrome and reach all hero actions and theme choices. Navbar controls have at least 44px height; mobile labels and navbar links fit without overflow. Reduced-motion reveals render fully opaque without transforms, and the next-section button has no idle animation.
- Visual captures refreshed using temporary Chromium scripts. No committed screenshot fixtures or Playwright setup exist, so none were added, preserving the requested Playwright removal.

Team/faculty placeholder data remains unchanged. No backend or content-authoring work was introduced.
