# Independent review of the redesign plan

Reviewed 7 November 2026. Planning only. This review evaluates the feasibility and completeness of `REDESIGN_PLAN.md`; it does not score an imagined implementation.

Final planning status: the parent incorporated the three recommendations below before implementation: matched poster/canvas handoff; a fully enhanced first-route transfer ceiling with optional-video and full-scroll reporting; and an explicit prototype/live enquiry distinction. The planning review is complete. Those points remain recorded below as the rationale for the revisions, not unresolved planning blockers.

The direction is coherent. Nine distinct page expressions can share the folded-L silhouette, materials, lighting, typography and motion rules. Concentrating WebGL where it explains the idea and using HTML/SVG/CSS for quieter pages is a sound response to the user's brief. Home, Compliance and Contact are useful representative styleframes; the nine-page composition sheet prevents the remaining pages from becoming an afterthought.

## Amend before implementation

1. **Specify a seamless poster-to-WebGL handoff.** Section 7 shows a finished poster first, followed by a 3D assembly. If those states have different silhouette, scale, crop or camera, enhancement will visibly reset the composition. Add: “Match poster and initial canvas pose, camera and crop; keep the poster until a successfully rendered frame is ready, then crossfade without layout movement. Start an arrival move only from that matching state; reduced motion keeps the settled pose.” A deliberate introductory unfold can work, but it should not be an accidental rewind of the poster.

2. **Budget the enhanced page as well as the critical page.** Section 8's ≤1MB initial-transfer target is useful, but excludes the dominant 3D/video payload. Add a provisional compressed budget for the first enhanced scene, including library chunks, models and textures, and a separate video allowance. A reasonable initial experiment is ≤2.5MB additional 3D payload and ≤2MB for the selected mobile video, adjusted from measured visual quality rather than loaded automatically together. Only load the active scene and eligible in-view media; report total cold-visit transfer and peak GPU memory observations, not only the critical payload.

3. **Separate an honest prototype form from a working live enquiry.** Sections 3 and 9 correctly expose the missing backend. Add to the 9/10 rubric: “Prototype-only form behavior is reviewed against its stated limited scope and reported separately. It is not evidence that the intended live enquiry conversion works. Production conversion readiness requires a verified working submission destination or a usable verified contact route, with success only after actual handoff.” Do not let an accurate “not connected” message alone earn an exceptional live-site functionality score.

## Execution clarifications

- In the second critique, fix every critical defect before selecting the three highest-impact visual refinements. The three-item focus is a prioritization device, not a limit on necessary repairs.
- Treat film-like transitions as brief progressive enhancement: a stable shared logo must not generate duplicate or moving “ghost” marks. Validate transitions with fonts loaded, different scroll positions, back/forward navigation and interrupted page loads.
- A constrained-device choice is an adaptive policy, not a universally reliable device detection API. Start with conservative quality, explicit reduced-motion/data-saving preferences where available, WebGL failure handling and measured runtime degradation. Report unavailable device checks.
- Preserve real first-paint content and the service explanation throughout the scene. A one-viewport scroll experiment is a ceiling, not a required pin duration.
- The per-page mean ≥9.0 with no dimension below 8 is a transparent proposed review target. Keep the five dimension scores visible, reject any critical defect regardless of the average, and disclose unavailable verification. A high numerical score does not certify awards, regulatory accuracy or production readiness.

No new agent, backend service, framework migration or full-video render pipeline is needed to complete the first homepage slice. The plan's ordered styleframe → independent critique → real slice → measured refinement → grouped rollout sequence controls the main feasibility risk: investing in nine expensive scenes before the visual language and phone budget work.

## Resolution

The primary agent incorporated the three amendments into the final plan: matched poster/canvas state and first-render handoff; a ≤5 MB aggregate enhanced first-route transfer target plus ≤2.5 MB optional clip target and full-scroll transfer reporting; and an explicit production enquiry requirement in the completion rubric. The critical-defect priority, transition edge cases and conservative runtime adaptation clarifications were also incorporated. This concludes the planning review; the future implementation remains unscored.
