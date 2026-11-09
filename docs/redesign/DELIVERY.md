# LUMA redesign handoff

All nine static pages have been redesigned around the existing LUMA emblem. The sculptural identity, page-specific compositions, finite cinematic media, shared transitions and useful tools are implemented in the existing vanilla stack.

## Open the result

Run `npm start` in `C:/Projects/Luma`, then open `http://127.0.0.1:3080/`.

The visual index is at `http://127.0.0.1:3080/docs/redesign/visual-review.html`. It includes desktop/mobile compositions and links into the actual pages.

## Review and verification

- Independent review: `final-critique.md`, all pages 9.0–9.1 across the agreed five axes, with no axis below 8 and no identified P0/P1 issue in its reviewed scope.
- Automated verification: `audit.json`, 45 page/viewport checks, 18 axe runs and 16 functional/fallback checks.
- Performance: `performance.json`, local desktop and constrained mobile-viewport lab profiles; exact conditions accompany every measurement.
- Approximately 0.66 MB initial resource transfer and 1.8 MB after the first in-view film. Recorded mobile-profile LCP 1.644 s and CLS 0.0036. Host rendering sample approximately 60 fps; this is not a measurement on a physical phone.
- Current captures, interaction-state evidence and critique history are retained in this directory.

## Form scope

By the owner's explicit instruction, the form destination will be supplied later. Validation, query-based service selection, progress and local text-brief download work now. The website clearly states that no enquiry is sent or stored. It does not display a false submission success.

## Maintain the site

`scripts/build_site.py` owns the repeated page shell and page content. Use `npm run build` after editing it. Styles and browser behavior live in `css/style.css`, `js/main.js` and `js/scenes.js`. Artwork is procedural and its static variants can be regenerated with `npm run sculptures` while the local server runs. Runtime libraries, fonts and media are self-hosted. `ASSETS.md` records sources and licences.

The original site is recoverable in `C:/Projects/Luma-backups/luma-before-redesign-20261107.zip`. Older scorecards under `docs/` are explicitly labelled historical.

## Remaining external work

The enquiry destination, publication and physical-phone/Safari/Firefox verification have not been performed. Production field INP and real-user percentile measurements are unavailable. These are not represented as completed checks.
