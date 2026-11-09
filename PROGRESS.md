# LUMA redesign progress

The user approved implementation on 7 November 2026, including permission to generate useful assets. The agreed direction combines sculptural premium, cinematic storytelling and purposeful WebGL. The owner explicitly deferred the form submission destination; prepare/download is the current intended form scope.

## Completed

- Recoverable original project backup at `C:/Projects/Luma-backups/luma-before-redesign-20261107.zip`.
- Shared design system in `DESIGN.md`, self-hosted variable fonts and local pinned Three.js/GSAP runtime.
- Nine rebuilt semantic static pages, each with a page-specific sculptural composition and functional content.
- Single-renderer homepage fold chapter; spatial journey; diagnostic; monthly/annual planning; fee separation; searchable guides and FAQ; validated local enquiry brief.
- Actual-scene desktop/mobile fallback posters; optimized finite videos with matching stills; keyboard, no-JavaScript, reduced-motion and context-loss paths.
- Baseline critique 5.4; independent iteration reports in `docs/redesign`. Historical reports in `docs/` describe the previous implementation and are not current verification.
- `docs/redesign/audit.json`: 45 responsive checks, 18 axe checks, 16 interaction/fallback checks passed. Final artwork refinements also receive focused render checks.

## Final verification

The independent critique loop met the agreed target: all nine pages score 9.0–9.1, no axis below 8 and no identified P0/P1 issue in the reviewed scope. The matrix and evidence are in `docs/redesign/final-critique.md`.

The isolated probe recorded desktop LCP 220 ms, mobile-profile LCP 1644 ms with 4× CPU slowdown / 1.6 Mbps / 150 ms latency, CLS below 0.004 and about 0.66 MB of initial resource transfer. Render sampling on this host reached about 60 fps at both viewport profiles. The mobile network/CPU constraints are reset for rendering sampling; this does not emulate a mobile GPU. The first in-view film brings resource transfer to about 1.8 MB. See `docs/redesign/performance.json` for exact conditions.

The loading pass removed automatic headline balancing that caused expensive first layout under CPU throttling, prioritised small header marks/fonts/posters, and deferred optional scene and film work. Final regression and current preview captures are included under `docs/redesign`.

## Explicit limits

No production submission destination, by owner instruction. No publication has been performed. Testing is on local headless Chrome; a physical phone and Safari/Firefox have not been tested. Production field INP percentiles are not available.
