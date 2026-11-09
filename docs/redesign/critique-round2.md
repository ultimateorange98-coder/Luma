# LUMA — independent critique, implementation round 2

Reviewed 7 November 2026. Scope: all nine desktop and 390px first-screen captures, representative complete-page captures, shared source and a live test of the homepage fold story. This report assesses actual execution; it does not award a score because a target was requested.

## Verdict

The first-round defects have materially improved: the crossing L rod is gone, the document face is legible, the shadows are softer, the pause control sits within the desktop Home bounds, and the mobile headline has clean line separation. The homepage now contains a real, content-related 3D passage: its L facets unfold and hand over to registration and compliance objects while real HTML explains the services. That is a meaningful step beyond pointer rotation.

The remaining gap to a defensible 9 is page differentiation and motion finish. Most secondary pages still follow the same eyebrow → large left headline → paragraph → pill action / floating right object / chapter rule composition. Palette and proportions vary, but How It Works, Registration and Contact substantially repeat the same folio. The utility pages delay search behind a long marketing hero. The fold story also has a clipped mobile final state and a hard object disappearance.

## Five-axis matrix

Functionality scores are provisional: the parent is independently running the full audit. These numbers use the focused interaction evidence available here, including round 1, and the actual inspected scope. Contact is evaluated as local prepare/download because the user explicitly deferred its destination.

| Page | Philosophy | Hierarchy | Detail | Functionality | Innovation | Mean |
|---|---:|---:|---:|---:|---:|---:|
| Home | 8.5 | 8.0 | 8.0 | 8.0 | 8.5 | 8.2 |
| How It Works | 8.0 | 8.0 | 8.0 | 8.5 | 7.0 | 7.9 |
| Business Registration | 8.5 | 8.5 | 8.0 | 8.5 | 7.5 | 8.2 |
| Managed Compliance | 8.5 | 8.5 | 8.0 | 8.5 | 7.0 | 8.1 |
| Pricing | 8.5 | 8.5 | 8.0 | 8.5 | 7.0 | 8.1 |
| About | 8.0 | 8.5 | 8.0 | 8.5 | 7.0 | 8.0 |
| Resources | 8.5 | 7.5 | 8.5 | 8.5 | 7.5 | 8.1 |
| FAQ | 8.0 | 7.5 | 8.0 | 8.5 | 6.5 | 7.7 |
| Contact | 8.5 | 8.5 | 8.5 | 8.5 | 7.0 | 8.2 |

The difference from round 1 is visible craft and a real signature sequence, rather than a numerical lift for adding six pages. No page has passed the 9.0 target in this review.

## Evidence and targeted fixes

### Home — stronger signature; finish its states

The navy hero, large geometric headline and L silhouette form a credible branded opening on desktop and phone. The live chapter moves the same renderer to a second mount; sampled poses confirmed genuine facet motion, emerging service objects and changing step states (`js/scenes.js applyStory()`, `js/main.js setupStory()`).

**P1:** The final mobile instrument is cut off on the right (`critique-story-mobile.png`). Fit the camera to the combined bounds of both revealed objects at the story mount's aspect ratio; the hero framing rule does not fit this wider composition. Keep the registration folio, clock and associated links visually paired.

**P1:** `object.visible = p < .7` abruptly removes the original L while its scale is still approximately 0.475. This makes the transition resolve by a pop. Complete the physical exit, bring scale continuously to zero or use a controlled opacity handoff, then hide only when it is no longer perceptible. Maintain the familiar L pose before the fold and a clear service pairing afterward.

**P1:** Reduced-motion story steps remain enabled buttons with unchanged `aria-pressed` values because setup skips their handlers. Clicking the last step left it false in the focused check. Either make explicit selection update a static view immediately or present the three explanations as noninteractive steps when motion is unavailable. The explanatory copy should remain available in both cases.

**P2:** The ivory clock has weak visual separation from the pale story stage. Use a darker material/component, a restrained navy recess or a stronger silhouette; avoid increasing saturation or blur globally. At the midpoint the objects overlap tightly and shrink to small fragments; stage them so the important shape remains readable throughout, not only at the endpoint.

### How It Works — show a journey, not another document

The five ruled steps and two-chapter switch are clear and useful. The hero nevertheless repeats the registration folio, and the lower chapter repeats that folio again. The rotated container also tilts its caption and pause label, which feels like a transformed box rather than art-directed typography.

**P1 design refinement:** Give this page its intended spatial route: a connected line/stage rail with five discrete folio positions or a selected-step composition. Reuse simple geometry; change arrangement and behavior, not the entire material system. Keep captions and controls upright. Let a user select a step and see the corresponding explanation in place.

### Business Registration — good connection between service and tool

The arched dossier stage, compact headline, comparison table and dark diagnostic create a coherent progression. The generated documentation insert adds useful material variation, and the legal route remains framed as something to confirm. This is one of the stronger secondary pages.

**P2:** Couple the chosen diagnostic result to an on-screen diagram beside the result rather than only modifying a hero object the visitor has already scrolled past. This can be lightweight HTML/SVG. On mobile, the chapter bar's structure list and comparison link crowd into small wrapped text; simplify or stack those two roles with more comfortable type.

### Managed Compliance — clear schedule; generic hero mechanism

The dark hero contrasts appropriately with a readable, explicitly illustrative HTML calendar. Monthly/Annual keyboard behavior passed in round 1. The clock suggests continuity, but its literal icon form and generic rotation do not yet create an exceptional page-specific interaction.

**P2:** Give the schedule a visible service relationship: for example, one selected preparation item reveals the associated information and record handover in the adjacent composition. A quiet, precise HTML interaction is sufficient. It should not imply actual customer filings or statutory deadlines.

### Pricing — connect the layers to their meaning

The three-plane sculpture fits fee separation and the pale precision treatment is coherent. The scope cards are readable. The headline is evocative, but the hero layers remain unlabeled and the Monthly/Annual control largely changes supporting copy. The page still resembles a familiar three-package layout.

**P1 design refinement:** Attach real HTML labels to the three layers—LUMA coordination, official charges, professional fees—and let selection clearly highlight the corresponding explanation. Consider using that interactive separation as the main composition instead of an unlabeled sculpture followed by a separate explanation. Preserve quote-based pricing if the actual fees are unknown; do not invent prices to fill the design.

### About — warm and coherent, but needs a different editorial opening

The warm stone stage and sculptural L reinforce identity, while the human footage provides contrast lower down. The page uses useful operating principles and diaspora context. Yet the opening remains Home's L with a plinth beside another large text block, and the footage is illustrative rather than evidence of the actual organization.

**P2:** Integrate the human material into the opening composition or into an emblem-shaped aperture, as planned, while retaining its illustrative label. This would distinguish About from Home without fabricating team photographs or company history. Replace some abstract “considered / clarity / next chapter” repetition with concrete statements about the coordination a founder receives.

### Resources — attractive archive, delayed utility

The typographic guide covers and restrained three-column archive are among the better visual details. Search and filters are real HTML, the articles have actual body content, and the library feels consistent with the brand. The opening still spends almost a phone screen on a slogan and small book sculpture before the visitor can search.

**P1 design refinement:** Put the search field and a compact category index into the hero or immediately below the headline, visible within the opening mobile screen. Reduce the four-line phone title and use the book arrangement as a shallow horizontal shelf or side detail. This gives Resources a utility-first identity instead of another service landing hero.

### FAQ — make clarity visible immediately

The answer list, category controls and sober typography suit the task. Its current phone capture shows a three-line slogan, body copy, CTA and decorative folder; the search and questions are below the screen. The blank folded-sheet hero adds little to understanding.

**P1 design refinement:** Compose this page around a prominent search/index and one immediately accessible answer, with the folded corner as a small branded detail. Keep a restrained finite gesture if useful, but remove the large decorative pause-and-object stage. Exceptional innovation here can come from a distinctive, efficient index rather than more WebGL.

### Contact — polished form within the accepted scope

The local form is clearly structured, its explanation is now shorter, and the front folio details are visible. The desktop composition gives the task proper priority. No external connection is required for this round.

**P2:** Compact the phone introduction: the first input begins near the bottom of the 844px capture. A smaller folio beside the introductory copy or removal of the separate meta strip would bring the task forward while preserving identity. Keep the form text and error feedback more legible than 8–10px decorative captions.

## Cross-page craft

- Preserve the shared header, type roles, surfaces and materials. Distinctiveness should come from composition and task behavior; nine palettes are unnecessary.
- Treat essential controls as UI, not part of a rotated art frame. Captions can relate to the artwork while pause/focus areas remain stable and comfortably sized.
- Revise the recurring abstract copy vocabulary. “Considered,” “clarity,” “ambition,” “foundation” and “next chapter” appear across most sections; repeat the brand promise selectively and use concrete domain language for the rest.
- Several complete-page captures still show pre-reveal 0.6-opacity elements. Scroll and settle before final evidence, then retain a separate reduced-motion/plain-content capture for comparison.
- The current view transition is a whole-page vertical fade/translation. It is useful progressive enhancement, but should not be described as a signature folded-edge transition until that visual behavior exists.

## Live motion verification performed

Evidence is recorded in `critique-round2-motion-checks.json` and `critique-story-*.png`.

- At 1440 × 1000, scroll samples moved the canvas from `.home-sculpture` to `.story-mount.is-live`; the L changed scale/pose and finally became hidden while the two service objects remained.
- Active step states followed scroll. Sampled draw calls were 6 in the initial pose, 34 during the combined state and 29 at the final state. These counters are not frame-rate measurements.
- At 390 × 844, selecting the final story step changed the selected state and revealed both service objects; right-edge clipping was visible.
- With reduced motion enabled on a fresh visit, selecting that same step did not update its pressed state.
- No JavaScript page errors were observed during this focused pass.

The full responsive/accessibility/functional audit is being performed separately by the parent. This review does not claim measured Core Web Vitals, runtime FPS, physical-device performance or complete assistive-technology coverage.

## Next review gate

First resolve the three specific fold-story defects. Then prioritize Resources/FAQ utility-first compositions, Pricing's labeled layers and How It Works' actual route; these create the greatest page distinction with the least unnecessary rendering work. Recheck the changed pages and shared interactions against the same five axes. Retain lower scores until visible evidence warrants an exceptional band.
