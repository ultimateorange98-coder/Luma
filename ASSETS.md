# LUMA asset and dependency record

## Original project material

The existing LUMA logo files and five generated video clips were supplied in `C:/Projects/Luma` and `C:/Projects/Luma generations`. Original files are retained. Illustrative footage is not presented as documentary evidence of LUMA employees, customers, premises or official approvals.

Web variants: `assets/videos/*-web.mp4`, H.264/yuv420p, audio removed, fast-start enabled. Each clip is under 1 MB. Matching `*-poster.webp` frames were extracted from the actual clips. First-play is finite, lazy-loaded near view and paused offscreen. Reduced-motion/data-saving visits start from stills.

## Original procedural artwork

`js/scenes.js` authors all nine page sculptures: the actual LUMA-inspired folded L, travelling route, registration folio, planning instrument, fee layers, architectural portal, archive volumes, question index and open enquiry folio. The homepage chapter reuses its single renderer to unfold into the two service forms. No external model catalogue assets were used.

`assets/images/sculpture-*.webp` are rendered directly from those scenes using `scripts/render-scenes.js`. Desktop and mobile posters use the corresponding actual page dimensions and camera. The combined story poster is rendered from the final service composition. These are native project artwork, not ImageGen output. The About aperture uses the provided generated entrepreneur still as an explicitly illustrative editorial texture.

## Fonts

- Outfit variable, [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/outfit), SIL Open Font License. `assets/fonts/outfit-OFL.txt` retained.
- Plus Jakarta Sans variable, [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/plusjakartasans), SIL Open Font License. `assets/fonts/jakarta-OFL.txt` retained.
- WOFF2 Latin variable subsets are self-hosted; the fetched CSS source is recorded in `assets/fonts/source.css`. No third-party font requests are needed at runtime.

## Runtime dependencies

- Three.js 0.187.0, MIT. Vendored module/core and RoomEnvironment; `assets/vendor/THREE-LICENSE.txt` retained. [Source](https://github.com/mrdoob/three.js).
- GSAP 3.15.1 and ScrollTrigger. [GSAP standard no-charge licence](https://gsap.com/standard-license/). The package's licence reference is retained in package metadata; do not describe this runtime as MIT. [Official docs](https://gsap.com/docs/v3/).
- The project lockfile pins installed versions. Playwright and axe-core are development verification tools, not browser runtime dependencies.

## Content references

The rebuilt guides use general orientation and link directly to authoritative sources rather than asserting unverified tariffs, approvals or universal deadlines:

- [OHADA Uniform Acts](https://www.ohada.org/actes-uniformes/).
- [Cameroon Ministry of Finance business creation information](https://minfi.gov.cm/espace-de-creation-dentreprise-en-republique-du-cameroun/amp/).
- [Cameroon Ministry of Finance creation formalities](https://minfi.gov.cm/demarrer-une-entreprise/amp/).
- [CNPS employer information](https://www.cnps.cm/en/component/content/article/employeurs.html?Itemid=317&catid=25).

The calendar is labelled illustrative. No made-up testimonials, client counts, company registration numbers or live regulatory statuses are used.
