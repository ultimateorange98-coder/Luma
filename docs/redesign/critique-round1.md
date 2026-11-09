# LUMA — independent critique, implementation round 1

Reviewed 7 November 2026. Scope: Home, Managed Compliance and Contact as the first complete compositions. Evidence: fresh desktop/mobile first-screen and full-page captures in this folder; `css/style.css`, `js/main.js`, `js/scenes.js`; focused browser checks at `http://127.0.0.1:3080/`.

## Verdict

The visual reset is clear and worth extending. The navy foundation, larger geometric typography, reduced badge clutter and first-screen mobile sculpture are a substantial improvement over the original site. The pages now belong to one visual family and the form is honest about its current local preparation/download behavior, as requested by the user.

This is a strong first composition, not yet an exceptional experimental-studio execution. The biggest remaining gap is the quality and purpose of the 3D: the current objects behave largely as rotating icons, the folio front is blank from the chosen view, and the L has a thin rod crossing its face. The planned story of structure assembling and opening into services has not yet been delivered.

## Independent five-axis score matrix

Scores describe the inspected version. They are not rounded to the desired target, and they do not certify untested performance or accessibility.

| Page | Philosophy | Hierarchy | Detail | Functionality | Innovation | Mean |
|---|---:|---:|---:|---:|---:|---:|
| Home | 8.5 | 8.0 | 7.0 | 8.0 | 7.5 | 7.8 |
| Managed Compliance | 8.0 | 8.0 | 7.5 | 8.5 | 6.5 | 7.7 |
| Contact | 8.0 | 8.0 | 7.5 | 8.5 | 6.5 | 7.7 |

### Philosophy consistency

The recurring satin ivory/navy objects and Outfit/Jakarta hierarchy establish a specific family. Home's strong navy hero and the quieter Contact mineral surface fit their different jobs. The oversized footer wordmark is a coherent ending. Some scene content still defaults to generic literal icons: a clock for ongoing work and a stack for contact. Preserve the system, but make page distinctions more specific to LUMA's services and identity.

### Visual hierarchy

The main promise and CTA are clearly first and second. Home at 390px now includes both the promise and the L sculpture within the opening viewport, directly addressing the baseline weakness. Compliance introduces the calendar with a distinct light section. Contact puts the form alongside the headline on desktop; mobile preserves a clear form heading. The long decorative contact prelude delays its first field until roughly the bottom of the 844px capture, so reducing that scene height or its surrounding whitespace would improve task entry.

### Detail execution

The type, alignments, ruled rows and restrained buttons are much cleaner than the old card system. Two confirmed defects prevent the exceptional band: the home pause control extends beyond the right edge at 1440px, and the mobile headline's hidden break joins words into “You build.We bring.” The sculptural details also need attention: hard angular shadows and the unanchored blue line across the L look like early rendering artifacts rather than deliberate luxury finishing. Contact's object is showing a blank plane despite modeled front details.

### Functionality

Focused checks passed for the Compliance keyboard tab transition, invalid-form error/focus, valid local brief preparation, mobile menu opening/inert background/Escape close, reduced-motion poster fallback and absence of JavaScript page errors during this check. The form's connection destination is expressly deferred by the user and is not a blocker in this round. Functionality is scored against the authorized prepare/download scope; no claim is made about real submission. Back/forward lifecycle and the clipped pause control remain unresolved. No physical-phone GPU or complete accessibility audit was performed.

### Innovation

The first-screen L and page-specific objects are more memorable than the baseline. However, source inspection shows Home's scroll progress only adjusting overall object yaw (`targetY = base.y + pointer.x * .19 + progress * .28`), while the homepage L children have no layer decomposition. Arrival is another small yaw. Compliance's period switch similarly changes overall progress while the clock is usually offscreen. This is tasteful micro-interaction, but it does not yet demonstrate the meaningful assembly/transformation promised by the motion concept.

## Fix next, in priority order

### P1 — visible or experiential defects

1. **Keep the home pause control inside the viewport.** Its measured right edge is 1463.19px on a 1440px viewport. The sculpture can bleed; the control cannot. Anchor caption/control to the content bounds or compensate for the art's negative right offset.
2. **Repair mobile headline spacing.** `.home-copy h1 br:first-of-type { display:none }` concatenates text in the current markup. Use a responsive inline separator with an actual space or explicit line spans whose semantics preserve the phrase.
3. **Replace the crossing rod with a credible brand fold.** `js/scenes.js:27` creates a long thin panel that appears suspended across the L. Put the seam on the surface and along its actual geometry, or remove it. The real logo silhouette should remain unmistakable.
4. **Create one meaningful transformation before adding more scene ornament.** Use controlled layer motion, a fold or a finite assembly connected to a service sentence. Keep the finished L recognizable at first paint, match poster/canvas poses, settle afterward and preserve native scrolling. A small global rotation alone does not fulfill the signature motion story.
5. **Handle cached back/forward restoration.** `scenes.js` disposes renderers, clears the scene map and removes listeners on every `pagehide`; `main.js` also reverts/disconnects enhancements. There is no `pageshow` restoration path. Preserve resumable state for a persisted page or reconstruct safely on restore, then verify with the browser back-forward cache enabled.

### P2 — craft and clarity

- **Refine lighting and contact orientation.** Aim for a softer contact shadow and a visible document/fold face; the present upright white slab and sharp polygonal shadow dominate an otherwise nuanced composition. Do not add expensive materials simply to make it shinier.
- **Make the compliance mechanism less generic.** Tie its motion to coordination and retained evidence, or use a folded structural rhythm; a clock plus calendar token is understandable but familiar.
- **Shorten the phone Contact prelude.** Keep the page's signature, but make form entry more immediate. Consider the compact sculpture beside short introductory copy rather than a large separate block.
- **Review support text size.** Multiple 8–10px captions, control labels and form notes are fragile on phones; keep essential explanations and errors comfortably legible and test text zoom.
- **Capture final states deliberately.** The full-page Home screenshot catches several `.service-panel`/`.journey-step` elements at their initial 0.6 opacity before their reveal triggers. Scroll each section into view, let it settle, then capture; separately retain an unenhanced/reduced-motion screenshot. Do not judge final contrast from an untriggered animation state.

## Keep

- The geometric headline system, navy/ivory identity and clear primary actions.
- The prominent mobile L composition and quieter secondary-page surfaces.
- The service index, ruled audience list and reduced dependence on rounded feature cards.
- Illustrative labels for generated footage and sample calendar data.
- The honest prepare/download form, intact input values and inline error focus.
- Real HTML content, progressive navigation and the reduced-motion poster path.

## Focused verification actually performed

Results are recorded in `critique-round1-checks.json`.

- Home at 1440 × 1000: no document overflow; pause-control clipping confirmed by bounding box; home scene reported 474 rendered triangles and 9 draw calls for the sampled frame. These are scene counters, not a frame-rate benchmark.
- Compliance: focusing Monthly then pressing ArrowRight selects Annual and reveals the matching panel.
- Contact: empty submission shows name error and focuses that field; completing five required fields produces the local result and a blob download link.
- Mobile navigation: opens with main inert, focuses its first link and closes on Escape.
- Reduced-motion Home: no canvas created, poster opacity is 1; joined headline text independently confirmed from rendered `innerText`.
- No JavaScript page errors observed during these checks.

Not verified here: download file contents, all keyboard sequences, screen-reader behavior, complete contrast analysis, BFCache restoration, page-transition recordings, full resource transfer, runtime FPS, physical-device performance, or the other six pages. These must not be inferred from the checks above.

Next independent review should use the repaired first screens plus a short actual motion recording and the now-complete nine-page matrix. Score the executed transformation and material quality, rather than increasing scores because more scenes exist.
