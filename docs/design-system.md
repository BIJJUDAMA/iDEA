# iDEA design system

Phase 4 replaces runtime CSS generation with layered global CSS and locally
scoped CSS Modules.

## CSS layers

The global layer order is `reset`, `tokens`, `base`, `components`, and
`utilities`.

- `reset` normalizes browser defaults.
- `tokens` defines the primitive palette and semantic theme values.
- `base` styles the document, focus rings, links, and text selection.
- `components` contains shared and feature CSS Modules.
- `utilities` owns reveal motion and the reduced-motion fallback.

## Tokens

`src/styles/tokens.css` is the canonical source for color, spacing, typography,
border, radius, shadow, motion, layer, gutter, and content-width values. Feature
styles use semantic colors such as `--color-surface-card`, `--color-text-muted`,
and `--color-action`. The light and dark themes provide the same semantic token
names.

The spacing scale runs from `--space-1` through `--space-8`. Fluid page gutters
and typography use `clamp()` so sections scale between verified viewport sizes.

## Responsive policy

The project uses two viewport breakpoints:

- `56rem`: medium layouts stack or simplify.
- `40rem`: compact layouts reduce gutters and use a single column.

Projects and Team also use a `56rem` container query, allowing their grids to
respond to available section width rather than only the browser viewport.

Every page uses `min-height: 100vh` followed by `min-height: 100dvh` for a
compatible dynamic-viewport fallback. Reduced-motion preferences disable reveal
transforms and shorten transitions and animations.

## Bundle impact

Moving generated component styles out of JavaScript increases the production
CSS artifact from 2.41 kB to 23.72 kB raw (1.09 kB to 5.01 kB gzip). Removing the
styling runtime reduces JavaScript from 381.87 kB to 337.51 kB raw (116.62 kB to
103.49 kB gzip). Combined CSS and JavaScript decrease by 23.05 kB raw and 9.21 kB
gzip.
