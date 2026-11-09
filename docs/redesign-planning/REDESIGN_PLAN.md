# LUMA — sculptural premium redesign plan

Date: 7 November 2026. Historical planning document: the user subsequently approved implementation. The redesign is implemented; current status and evidence are in `PROGRESS.md` and `docs/redesign/`. The scope statements below record the original planning turn.

## 1. Agreed brief and scope

Redesign all nine LUMA website pages. Sculptural premium is the main visual direction, combined with cinematic storytelling and advanced interactive 3D. The intended character is the elegance of a luxury brand with the immersive creativity of an experimental digital studio.

Each page gets a distinctive hero composition, background treatment, visual motif and motion experience. All pages share LUMA's identity, navigation, typography rules, material palette, lighting, spacing and interaction conventions. Meaningful motion, responsiveness and accessibility are part of the design, not a final cleanup pass.

The current request is to plan first. This document does not claim that the redesign has been built, tested or scored 9/10.

## 2. What the projects contain

- `C:/Projects/Luma`: a nine-page static HTML/CSS/vanilla JavaScript prototype for business registration and managed compliance in Cameroon. Shared presentation lives in `css/style.css`; behavior in `js/main.js`. There is a small Node preview server and an existing Playwright audit. No React application or production submission backend was found in this project.
- `C:/Projects/Luma generations`: five generated H.264 videos with audio tracks and one JPG. All six originals have matching copies inside LUMA's assets, verified by SHA-256. Video dimensions are 1280 × 720 at 24 fps, with durations of approximately 6, 8, 8, 8 and 10 seconds.
- `C:/Projects/open-design-main/open-design-main`: OpenDesign's source repository and local skills, templates and design systems. It is a design tool and reference library, not the LUMA site. Use its relevant local workflows; do not rebuild or modify OpenDesign to redesign LUMA.
- `C:/Users/AnonyDes/Downloads/motion-3d-studio.skill`: a ZIP-format skill package. Its SKILL.md and web/motion references have been read directly. This task follows its web path. Installation is not required to use the inspected guidance for planning.

The supplied package and historical project reports are reference material. They do not override the user's brief. Catalogue descriptions are not evidence that a full skill is installed or that the old implementation passed its claimed standard.

## 3. Baseline findings

Fresh desktop, mobile and full-page screenshots were captured from the current local server. Representative frames from all five videos were inspected. A separate critique agent reviewed the rendered page and source using OpenDesign's five-dimension critique framework.

Baseline scores: philosophy consistency 6, visual hierarchy 6, detail execution 6, functionality 5, innovation 4; arithmetic mean 5.4/10. Functionality is a code-backed provisional assessment; the previous test suite was not rerun for this planning pass. See `baseline-critique.html` for evidence.

Priority problems:

1. The opening composition combines a familiar serif headline, two badges, a small video panel and a sample dashboard. It lacks a singular branded focal point.
2. Repeated rounded cards and similarly paced sections make the whole page feel templated, despite the added media.
3. At 390 × 844, the opening viewport contains text and buttons but no visual signature. The mobile experience must be designed independently.
4. Hardcoded company registration details, verification badges and a live-looking desk indicator can be mistaken for actual operational data. Remove unverified claims or label demonstrations clearly.
5. The contact form prevents submission, shows a success banner and resets without sending the enquiry. The redesign must communicate its real behavior. A working submission service requires an actual destination; until one is configured, present an honest prototype state and only verified contact alternatives.
6. The existing 9.58/10 scorecard is historical self-evaluation. Passing overflow tests does not demonstrate exceptional art direction, motion or accessibility.

Preserve useful structure: official logo, existing routes, the two service pillars, readable domain content, structure diagnostic, workflow tabs, pricing controls, FAQ behavior and keyboard navigation. Revalidate their behavior after redesign. Regulatory details, tariffs, deadlines, contact details and service promises need current authoritative verification before publication.

## 4. Art direction: “Structure, in motion”

Central visual idea: LUMA turns administrative complexity into an organised foundation for a business. Use the existing folded L emblem as the source of a custom sculptural vocabulary.

- **Identity:** retain the official logo and deep navy `#021D48`. Use warm ivory, pale mineral surfaces and restrained metallic edges. Teal is a semantic status colour, not a decorative accent; gold is occasional, not a universal trim.
- **Typography:** prototype an expressive geometric display face with a readable UI face; initial candidate Outfit + Plus Jakarta Sans. Limit to two families. Compare actual headline compositions before locking. Keep typography legible with motion disabled.
- **Materials:** folded ivory planes, satin navy surfaces, fine bevels and soft directional light. Build recognisable LUMA forms, document folios and structural geometry. Avoid anonymous chrome blobs, random floating shards and excessive glass.
- **Composition:** wide, deliberate headlines, varied proportions, purposeful overlap and strong negative space. Reduce redundant labels and explanatory copy. Replace repeated feature cards with service compositions, editorial passages and useful interactive demonstrations.
- **Motion personality:** precise assembly, controlled camera travel, gentle damping and deliberate stillness. Reuse a folded-plane transition as the signature gesture.
- **Navigation:** a compact shared header with a clear service menu and one primary action. Group secondary links without hiding routes. Its shape follows the design; a floating glass pill is not a requirement.
- **Trust:** generated scenes are illustrative imagery, not documentary proof of LUMA staff, customers, offices or official approval. Product demonstrations are visibly identified as examples.

## 5. Page-by-page design and skill selection

Paths below are relative to `C:/Projects/open-design-main/open-design-main`. Every page also uses `skills/frontend-design`, `skills/impeccable-design-polish`, `skills/web-design-guidelines` and the independent `design-templates/critique` review.

| Page | Visual identity, background and hero | Distinctive motion and interaction | Specialist guidance |
|---|---|---|---|
| Home — `index.html` | Monumental folded L on an ivory/mineral stage with a navy spatial backdrop; broad headline and visible CTA. | A finite assembly move establishes the emblem; a short scroll sequence carries document planes into the two services. Gentle pointer response on fine-pointer devices. | Attached Motion + 3D Studio web path; `skills/gsap-timeline`; `skills/gsap-scrolltrigger` |
| How it works — `how-it-works.html` | Horizontal composition with a dossier travelling through a spatial route; pale technical background and clear numbered stages. | A short desktop scroll chapter advances preparation → coordination → handover → ongoing care, mapped to the actual journey. Buttons and a vertical mobile version reveal the same content. | `skills/gsap-scrolltrigger`; `skills/gsap-timeline`; `skills/ui-animation` |
| Business registration — `business-registration.html` | Open document folio with layers aligning into a stable structure; luminous ivory surfaces with navy edges. | The existing structure diagnostic drives an explanatory diagram. Document layers reveal what is prepared and handed over; meaningful text remains HTML. | Motion + 3D Studio; `skills/ui-animation`; `skills/emilkowalski-motion` |
| Managed compliance — `managed-compliance.html` | Deep navy instrument-like stage, pale calendar mechanism and restrained semantic signals. | A time mechanism resolves into a readable HTML schedule; user-controlled monthly/annual views explain continuing service. Clearly label sample obligations and avoid implying live filing status. | Motion + 3D Studio; `skills/gsap-timeline`; `skills/ui-animation` |
| Pricing — `pricing.html` | Precision typography, pale mineral background and offset stacked planes that express fee separation. | Hover/focus or selection separates service fees and external charges, while the full itemised comparison stays readable. Motion is subordinate to cost clarity. | `skills/ui-animation`; `skills/emilkowalski-motion`; `skills/web-design-guidelines` |
| About — `about.html` | Large emblem-shaped architectural opening framing human imagery; warm editorial background and generous type. | A cinematic reveal connects the spatial emblem to people and operating principles. Use real team material when available; generated footage stays illustrative. | `skills/frontend-design`; `skills/gsap-scrolltrigger`; `skills/emilkowalski-motion` |
| Resources — `resources.html` | Editorial archive with shallow-depth folios, strong cover typography and a quiet navy/ivory grid. | Search/filter feedback, useful hover/focus previews and small depth changes. Readable lists and direct article access take priority over an elaborate 3D bookshelf. | `skills/frontend-design`; `skills/ui-animation`; `skills/web-design-guidelines` |
| FAQ — `faq.html` | Quiet layered index, pale background, oversized question typography and a restrained folded corner motif. | Search/category navigation and accessible answer expansion; a finite background gesture establishes identity without distracting from reading. | `skills/ui-animation`; `skills/emilkowalski-motion`; `skills/web-design-guidelines` |
| Contact — `contact.html` | An opening folio/threshold frames the intake form; warm light, asymmetric composition and optional advisory imagery. | A short opening motion settles before form entry. Field feedback, progress and submission states explain exactly what happened. No camera motion while typing. | `skills/ui-animation`; `skills/emilkowalski-motion`; `skills/web-design-guidelines` |

This means nine expressions of one brand, not nine unrelated palettes or a full WebGL scene behind every form. WebGL depth is concentrated where it carries a visual idea; SVG, CSS and HTML motion handle the rest.

### Which skills are actually usable locally

Use these substantive local workflows: `redesign-skill`, `frontend-design`, `impeccable-design-polish`, `ui-animation`, `emilkowalski-motion`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-performance`, `web-design-guidelines`, and `design-templates/critique`. Read their applicable reference files when implementing each phase.

The local `threejs`, `shader-dev`, `copywriting`, `full-page-screenshot` and some design-review entries are discovery pointers to upstream bundles. Do not claim to have run their missing full workflows. The attached web-3d reference and official Three.js documentation cover the initial 3D implementation; the existing Playwright installation covers screenshots. Retrieve a full upstream bundle only if an identified need warrants it.

Do not apply incompatible taste presets simultaneously. In particular, randomised layout choices or mock tool execution are not a basis for LUMA's art direction. Choose each visual decision from the actual brief and rendered evidence.

## 6. Asset decisions

| Existing media | Inspected content | Planned use |
|---|---|---|
| `hero-entrepreneur.mp4` | Entrepreneur at desk, about 8s | Secondary homepage narrative or About; not the new primary hero |
| `documentation-dossier.mp4` | Hands organising paper folios, about 6s | Registration detail or journey insert |
| `enterprise-operations.mp4` | Team and project boards, about 8s | About / enterprise context |
| `abstract-structure.mp4` | Navy geometric planes with metallic edges, about 10s | Material and pacing reference; optional brief insert after loop/crop QA, not a replacement for custom branded 3D |
| `professional-advisory.mp4` | Consultation scene, about 8s | Contact or About supporting scene |
| Generated JPG | Business context still | Supporting image only; the current hero poster must match its actual clip |

All clips are 720p. Avoid stretching them into close-cropped full-screen desktop heroes without checking sharpness. Review hands, faces, document text and continuity at source resolution before choosing final crops. Contact-sheet inspection is not complete playback QA. Check loop seams, colour match and mobile crops during production. Strip unused audio from ambient exports and provide appropriately sized encodes and actual poster frames. Do not load every video on first visit.

New assets: original folded-L geometry, page-specific variants, optimised posters and a coherent light/material setup. Prefer procedural geometry for the emblem; use external models only if needed and with recorded licences. Use ImageGen only if a specific additional still is missing. Use HyperFrames only if a composed motion-graphics video is needed; the live site's primary renderer is Three.js, not HyperFrames.

## 7. Motion storyboard and implementation contract

The homepage is the first vertical slice:

1. **First paint:** headline, CTA, navigation and a finished poster appear immediately. The poster already presents a recognisable L composition; no blank canvas or loading prelude. Match its initial geometry pose, camera, lighting and responsive crop to the first canvas frame. Swap only after a successful first render, with no layout shift or pose jump.
2. **Arrival, roughly 0.8–1.4s after enhancement is ready:** a few folded surfaces refine their alignment into the settled L. The emblem does not need to disappear and rebuild to begin the effect. Keep text legible throughout; no forced wait to use the site.
3. **Interaction:** low-amplitude pointer response changes the light/view, not text position. Touch gets tap controls or the settled composition, not simulated hover.
4. **Scroll chapter:** a controlled fold opens the story into registration and ongoing compliance. Limit the first experiment to approximately one additional viewport of desktop scroll; remove pinning on small screens.
5. **Human context:** a cinematic crop introduces the people/business side, followed by clear service navigation and the closing action.

Typography animates in selected phrases or lines, with accessible intact text for assistive technology. No word-by-word entrance on every paragraph. Keep critical reading and actions available without animation or JavaScript enhancement.

Page transitions: use a shared folded-edge/colour transition, approximately 250–450ms, with a stable logo position. Implement same-origin cross-document View Transitions as progressive enhancement. Normal HTML navigation remains the fallback. Test back/forward, deep links, modified clicks, scroll restoration, rapid navigation, delayed fonts and interrupted loads. Avoid duplicate logo snapshots. Reduced motion uses a brief fade or immediate navigation. Do not introduce a SPA router only to obtain transitions.

Technology: retain static HTML, vanilla CSS and JavaScript. Add pinned, locally served Three.js and GSAP dependencies when implementation begins; neither is installed in LUMA currently. Use one renderer per active page and share scene utilities/material definitions. Keep HTML text, links, forms and tables outside canvas. New code should be modular rather than appended to the existing main.js indefinitely. Extend the preview server's media/font MIME handling as required by new assets.

Official references checked during planning:

- Three.js scene/camera/renderer and local-server setup: https://threejs.org/manual/pages/creating-a-scene.html
- GSAP ScrollTrigger sequencing, pinning and scroll linkage: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Cross-document transitions and same-origin opt-in: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using
- Reduced-motion preference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

## 8. Performance and accessibility budgets

These are targets to measure, not results already achieved:

- Target LCP ≤2.5s, CLS ≤0.1 and INP ≤200ms. Use repeatable throttled lab checks while iterating; production INP and percentile claims require real-user data.
- Critical initial transfer target ≤1 MB before optional 3D/video enhancement. Prioritise the poster and fonts; document actual compressed JS and first-visit transfer after the vertical slice.
- Fully enhanced first-route transfer target ≤5 MB before explicit optional playback, including automatically fetched JavaScript, models, textures and media. Target ≤2.5 MB per optional video encode. Also report total transfer after a complete scroll: deferring excessive downloads does not make them free.
- Target 60fps desktop and capable mobile; a sustained inability to stay above 30fps triggers reduced scene quality or a static poster. Desktop CPU throttling does not prove real-device GPU performance; report device checks separately.
- Initial mobile scene ceiling: approximately 100 draw calls, 300k triangles and 2048px textures; simpler is preferable. Avoid expensive transmission, full-screen blur and multiple postprocessing passes unless measured headroom supports them.
- Cap device pixel ratio (normally ≤1.5 mobile and ≤2 desktop), pause offscreen/hidden scenes, render on demand when settled, and clean up GPU resources/listeners.
- Default constrained devices, WebGL failure, reduced motion and data-saving preferences to a suitable static or simplified experience. Handle JS-driven motion preferences as well as CSS, including changes during a visit.
- Device adaptation is a conservative runtime policy, not a reliable hardware-class detector. Begin with modest scene quality, use supported preference signals, measure runtime behavior and degrade when required. Record peak GPU memory observations where tooling permits.
- Pause controls for continuing nonessential motion. No scroll hijacking, forced snapping, flashing, hover-only information or decorative motion during form entry.
- Maintain WCAG AA contrast, meaningful alt text, focus visibility, semantic controls and keyboard access. Keep text selectable and schedules/tables available as HTML.
- Review at 1440, 1280, 768, 390 and 375px, plus a real phone if available. Validate text zoom, long content, touch, keyboard, reduced motion, failed media and WebGL loss.

## 9. Build sequence and review loop

1. **Baseline and preservation:** archive the original pages/assets and record current useful interactions. LUMA is not currently a Git repository; establish a recoverable backup or local version history before implementation. Retain the baseline critique and fresh screenshots.
2. **Design system and styleframes:** create shared tokens and desktop/mobile styleframes for Home, Compliance and Contact. They must demonstrate a premium statement page, an information-heavy service and a focused form. Also sketch all nine hero compositions and the cross-page transition.
3. **First critique of direction:** independent critique agent checks the styleframes for originality, brand coherence, mobile presence, readability and motion purpose. Revise the top issues before investing in all scenes. A styleframe review cannot pass functionality or performance.
4. **Homepage vertical slice:** implement the full page, real folded-L scene, short scroll story, content, mobile layout, reduced-motion/poster fallback and navigation. Measure transfer, frame behavior and first paint.
5. **Second critique:** review real desktop/mobile screenshots plus a recording and representative frames of the motion. Resolve every critical defect, then focus on the three most expensive visual refinements, recapture affected evidence, and score again. Three is a prioritisation aid, not a limit on required repairs.
6. **Extend in three groups:** How It Works + Registration + Compliance; Pricing + About + Resources; FAQ + Contact. Each group receives its distinct compositions, motion, content states and focused interaction checks. Recheck shared navigation after each group.
7. **Final design loop:** independently review all nine pages, first screens and complete journeys. Fix → recapture/re-record → critique, repeating until the evidence supports the threshold. Keep a versioned iteration log with issue, intervention and observed result.
8. **Delivery:** runnable local site, source, asset/licence manifest, final captures, measured performance/accessibility notes and a per-page critique matrix. Publication and a real form integration are separate from the current planning deliverable.

### What counts as 9/10

Use the critique skill's five independent axes: philosophy consistency, hierarchy, detail execution, functionality and innovation. The five-axis matrix must be recorded for each page; review the weakest sustained execution, not just the best hero frame.

The completion target is each page at least 9.0/10 on the five-axis mean, with no individual axis below 8 and no unresolved critical defect. The site's aggregate must be at least 9.0. Passing automated tests cannot raise art-direction scores, and a dramatic scene cannot compensate for broken reading or contact behavior. If the result does not meet the bar, continue the loop or explicitly state the remaining gap; never revise scores to manufacture a pass.

Contact is a specific exception to any prototype/live ambiguity: an honest no-backend form can pass prototype communication checks, but cannot earn exceptional functionality for a live enquiry task. Production conversion readiness requires either a verified working submission destination or a verified working contact route. If neither is available, record that gap and do not award a production 9/10 completion score.

Evidence required for the target: distinctive desktop and mobile compositions; one coherent LUMA material/type/motion language; page-specific interactions serving content; readable reduced-motion/no-WebGL variants; functional routes and forms with honest outcomes; no fabricated proof; current verified service content for release; and recorded performance results with any unavailable real-device checks disclosed.

## 10. First implementation deliverable

A redesigned homepage vertical slice and shared design system, preceded by the three representative styleframes and the nine-page composition sheet. This establishes the quality and runtime budget before extending the distinct treatments across the remaining eight pages. The current planning turn leaves website source unchanged.
