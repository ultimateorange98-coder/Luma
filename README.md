# LUMA — Structure, in motion

A nine-page business registration and managed compliance website for Cameroon. Original folded-L artwork, cinematic editorial scenes and a connected service story share a navy, porcelain and mineral material palette.

## Run locally

```powershell
cd C:\Projects\Luma
npm ci
npm start
```

Open [LUMA locally](http://127.0.0.1:3080/). The server serves correct media/font types and gzip-compresses text assets. It is a local preview server, not a production enquiry backend.

## Pages

| Page | Composition and useful interaction |
|---|---|
| `index.html` | Monumental folded L, single-renderer service transformation, cinematic operations scene |
| `how-it-works.html` | Five-stage spatial route and keyboard-accessible journey tabs |
| `business-registration.html` | Dossier composition, structure comparison and explanatory diagnostic |
| `managed-compliance.html` | Planning instrument and illustrative monthly/annual view |
| `pricing.html` | Three labelled fee layers and scoped service comparisons |
| `about.html` | Architectural L aperture, editorial context and privacy information |
| `resources.html` | Search-first library, six substantive guides and accessible reader |
| `faq.html` | Search, categories and native expandable answers |
| `contact.html` | Open folio, validation and locally downloadable enquiry brief |

The owner will provide the contact destination later. The current form does not send or store personal data, and never displays a false submission confirmation.

## Source and artwork

- `scripts/build_site.py`: shared navigation/footer and the nine page compositions. `npm run build` regenerates the static HTML.
- `css/style.css`: shared tokens, layout, page treatments, responsive rules and native view transitions.
- `js/main.js`: navigation, purposeful choreography, searches, tabs, reader and enquiry behavior.
- `js/scenes.js`: original procedural geometry, lighting, scene reuse, cleanup and graceful fallbacks.
- `assets/`: supplied brand/media, optimized web media, self-hosted fonts, pinned local runtime and original rendered sculptures.
- `npm run sculptures`: regenerate desktop/mobile posters from the actual page cameras; the local server must be running.
- `DESIGN.md` and `ASSETS.md`: design contract and asset/dependency provenance.

WebGL enhances an already readable page. Reduced motion and data-saving preferences start from static artwork. The renderer pauses offscreen; media plays finitely and has a pause control. Same-origin view transitions are optional enhancement; ordinary links work independently.

## Verification and iteration

```powershell
npm test
npm run capture
```

Tests expect the local preview server at port 3080; override `LUMA_URL` if needed. They use the installed Chrome executable and Playwright, with axe-core accessibility checks. Results and independent design review rounds are in `docs/redesign/`; `docs/redesign-planning/` contains the original plan and baseline.

Current verification covers 45 page/viewport combinations, 18 automated accessibility runs and 16 functional/fallback checks. Physical-phone and Safari/Firefox checks remain unperformed; field INP cannot be inferred from local checks. Design scores are the independent reviewer's assessments of specific captured versions.

The original site is recoverable at `C:/Projects/Luma-backups/luma-before-redesign-20261107.zip`. Older research and scorecards under `docs/` refer to the previous implementation and are retained as history.
