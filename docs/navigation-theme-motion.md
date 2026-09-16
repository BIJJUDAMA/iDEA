# Navigation, theme, and motion

Phase 5 uses the browser document as the only page scroller. The five section
IDs are `home`, `about`, `team`, `projects`, and `contribute`. Each section has a
viewport minimum height and can expand with its content; the native scrollbar
is available. Scroll snapping was evaluated and left disabled because expanded
Team panels and mobile project descriptions need uninterrupted reading.

## Navigation

`useSectionNavigation` observes section visibility and checks the section
crossing the upper third of the viewport. A passive scroll listener batches
updates into animation frames, covering fast jumps, touch, keyboard movement,
and environments without Intersection Observer. All section rails and the next
section control receive the same active state.

Controls call native `scrollIntoView`. They request smooth movement only when
reduced motion is not enabled. Initial fragments and subsequent `hashchange`
events restore the target immediately. Observed section changes use
`history.replaceState`, so manual scrolling updates the URL without adding
history entries or triggering another scroll. Reloading a section fragment
restores its start, including the section's navigation header.

## Theme

The app-level `ThemeProvider` owns `light`, `dark`, and `system` preferences.
With no valid saved preference it follows `prefers-color-scheme`, including
live changes. The accessible theme button selects the other resolved theme
explicitly. `useTheme().setPreference("system")` restores system behavior.
Explicit selections are saved as `idea-theme` in local storage. Blocked storage
falls back to in-memory state.

The provider applies the resolved `data-theme` to the document root before
React paints. Root token selectors also set `color-scheme`, so native controls
and scrollbars match the page. Feature sections receive no theme props.

## Reveals

Every `useElementOnScreen` call owns its observer. A section can observe one
heading or content root and share its reveal state with its related content.
Activation disconnects the observer; scrolling away does not hide content again.
Unmounting also disconnects it. Content starts readable for server rendering
and missing-observer environments. Reduced motion skips reveal observation,
removes transforms, and minimizes transitions and animations. Changing to
reduced motion also disconnects pending reveal observers.

## Validation

Unit checks cover native section targets, saved and blocked-storage theme
preferences, independent one-time reveals, and missing-observer fallback.
Desktop and mobile Chromium checks cover each fragment after reload, wheel,
keyboard and browser touch gestures, next-section controls, motion-enabled
scrolling, live system theme changes, persisted selection, reduced motion,
observer-free navigation, visual screenshots, and axe scans in both themes.

Removing Parallax and its dependencies reduces production JavaScript from
337.51 kB to 296.59 kB raw (103.49 kB to 87.19 kB gzip). CSS is 23.49 kB raw
and 4.95 kB gzip.
