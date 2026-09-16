# Phases 6 and 7: accessibility, performance, and resilience

## Semantics and keyboard behavior

There is one main landmark, a visible-on-focus skip link, one page-level h1,
and five labeled destination sections. Section headings use h2; faculty groups,
accordion groups, and project titles use h3. Technology headings use h4 beneath
the project title. Navigation, team groups, members, and technology tags use
lists. Fragment destinations are links; state changes and form launchers are
buttons. Modified link clicks retain browser behavior.

Destination controls focus the section heading without an additional scroll.
All controls retain a contrasting focus outline. Navigation dots have 24 px
minimum targets with spacing between them; other buttons and social links are
at least 36 px. Names and project options wrap at compact widths.

The Team accordion allows **one open group**; activating another closes the
previous group. Activating the open group closes it. Stable trigger and panel
IDs connect `aria-controls` and `aria-labelledby`; closed panels are hidden.
The project selector uses mutually exclusive pressed buttons and a polite
status announcement. The selector precedes details in document order at every
width, keeping selection before the content it updates. Contact actions reset
when the project changes, and their labels identify the contact destination.

## Forms and failures

Typeform's supported vanilla SDK and widget CSS load together in one dynamic
chunk only after a form button is activated. There is no initial SDK import,
iframe, preconnect, or Typeform request. Tiny feature modules remain in the
main bundle.

Each form opens a native modal dialog, which provides background isolation,
keyboard focus handling, and Escape dismissal. The close button receives
initial focus; closing restores the launcher. The SDK uses `inlineOnMobile`
and disables autofocus so it does not create a second mobile modal or steal
focus. The respondent can Tab into the titled form iframe. The direct hosted
form link remains available even when the SDK or iframe fails. A failed SDK
load announces the failure; a form that does not send `onReady` within ten
seconds offers the direct link as an alternative. Cross-origin form content
cannot be inspected for application-level errors. Forms are not submitted by
tests.

The app error boundary supplies reload and GitHub recovery links for rendering
failures. Navigation and readable content do not depend on Typeform. Missing
Intersection Observer keeps reveals readable and navigation synchronized.
Failed portraits display a named unavailable-photo placeholder.

The integration follows Typeform's [vanilla SDK](https://www.typeform.com/developers/embed/vanilla/)
and [callback](https://www.typeform.com/developers/embed/callbacks/) APIs.

## Images and metadata

Portraits use square 112 px and 224 px WebP crops with `srcset`, `sizes="56px"`,
explicit dimensions, lazy loading, and async decoding. These cover standard and
high-density/zoomed avatar displays; originals remain available. Portrait alt
text is empty because the adjacent name supplies the same information.
Missing photos, community artwork, and project previews are explicitly labeled
as unavailable or intentional placeholders.

The existing brand mark supplies ICO and PNG favicons, an Apple touch icon,
and 192/512 px manifest icons. The Open Graph PNG is 1200 × 630. Canonical,
Open Graph URL/image, and the single-page sitemap use the intended repository
Pages URL `https://dharshan2208.github.io/iDEA/`. Fragments are not separate
sitemap pages.

Vite's base is `/iDEA/`. HTML uses `%BASE_URL%`, portraits use `assetUrl`, and
manifest URLs are relative. Production browser tests run under this exact
subpath and fetch metadata and icons. GitHub project Pages cannot control the
host's root `/robots.txt`; the included robots file documents unrestricted
crawling and the sitemap, while the root hosting policy remains authoritative.

**Live verification:** the inferred repository Pages URL returned HTTP 404 on
2026-09-16. This work has not been published, so live assets cannot yet be
verified. The production preview passes subpath asset checks. If the intended
host differs, update Vite base, canonical/OG URLs, sitemap/robots, and the
Playwright base URL together before deployment.

## Build budgets

`npm run build` runs `scripts/check-bundle.js`, so local checks and existing CI
both enforce these decimal-kilobyte limits. The Vite manifest identifies the
initial static graph separately from dynamic imports. Every budget checks both
raw and gzip sizes and requires nonempty artifacts. Typeform must remain
outside the initial graph.

| Artifact           | Raw limit | Gzip limit |
| ------------------ | --------: | ---------: |
| Initial JavaScript |    250 kB |      80 kB |
| Initial CSS        |     30 kB |       8 kB |
| All JavaScript     |    320 kB |      95 kB |
| All CSS            |     35 kB |      10 kB |

Production Vite output compared with [Phase 0](baseline.md):

| Artifact                     | Phase 0 raw / gzip | Phases 6–7 raw / gzip |
| ---------------------------- | -----------------: | --------------------: |
| Initial JavaScript           | 424.12 / 119.93 kB |     229.29 / 72.75 kB |
| Initial CSS                  |     3.03 / 1.33 kB |       25.45 / 5.31 kB |
| Deferred Typeform JavaScript | Included initially |      50.36 / 12.28 kB |
| Deferred widget CSS          | Included initially |        1.06 / 0.42 kB |

Initial JavaScript is about 46% smaller. All JavaScript, including the deferred
SDK, is about 34% smaller. Node's budget checker uses its own gzip defaults;
small compressed-size differences from Vite are expected. CSS grew because
Phase 4 moved runtime-generated styles out of JavaScript. styled-components
and React Spring are absent from the dependency tree.

React Icons imports were audited: only named exports from `ai`, `bs`, and `md`
are used. The production ESM build removes unused exports; no namespace import,
whole-pack runtime access, or additional icon chunks are needed.

## Validation

The browser matrix covers 320, 375, 768, 1024, and 1440 px widths, 812 × 375
landscape, and 200% equivalent reflow at 720 × 450 with a device scale factor of
2 (from a 1440 × 900 display). The latter checks CSS reflow and density through
Chromium device metrics, rather than automating browser toolbar zoom. Native
browser zoom remains a manual release check.

Both desktop Chromium and Pixel 7 profiles run the matrix in light and dark
system themes with reduced motion. Checks exercise keyboard focus, all group
and project actions, touch scrolling, portrait failures, form chunk failures,
and form timeout behavior on a throttled network with disabled cache. Axe scans
have no serious or critical violations. Ten section screenshots are reviewed
and retained as the current baseline. Firefox, Safari, and assistive-technology
user testing remain outside the automated browser matrix.

Lighthouse 13.0.1 with Chrome 152 ran against the local production preview,
using its default mobile profile on 2026-09-16:

| Category / metric        | Phase 0 | Phases 6–7 |
| ------------------------ | ------: | ---------: |
| Performance              |      95 |        100 |
| Accessibility            |      94 |        100 |
| Best practices           |     100 |        100 |
| SEO                      |     100 |        100 |
| First Contentful Paint   |   1.6 s |      1.2 s |
| Largest Contentful Paint |   1.9 s |      1.6 s |
| Total Blocking Time      |  220 ms |      10 ms |
| Cumulative Layout Shift  |       0 |          0 |
| Speed Index              |   1.6 s |      1.2 s |

No category regressions were observed, so no regression approval is pending.
These are local lab results, not production field measurements or a full WCAG
conformance claim. Machine load and network conditions affect comparisons.
