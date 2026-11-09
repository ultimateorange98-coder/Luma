# LUMA — Phase 1: Discovery, Research & Creative Direction

## 1. Project Context & Business Problem
LUMA is a Cameroon-focused business registration and managed compliance partner. 
Positioning statement: **"Your business. Our responsibility."**

### Core Problems Solved for Cameroonian Entrepreneurs:
1. **Structural Ambiguity**: Navigating between *Établissement / Entreprise Individuelle*, *SARL* (Société à Responsabilité Limitée), and *SARLU* (SARL Unipersonnelle) according to OHADA uniform acts.
2. **Procedural Complexity**: Coordinating the CFCE (*Centre de Formalités de Création d'Entreprises*), DGI (*Direction Générale des Impôts*), RCCM (*Registre du Commerce et du Crédit Mobilier*), CNPS, and local municipality requirements.
3. **The "Post-Registration Cliff"**: Traditional consultants disappear after delivering the RCCM. LUMA's fundamental differentiation is **Managed Compliance**: ongoing tracking of monthly tax declarations (DSF, TVA, précompte), annual corporate filings, patente renewals, social security (CNPS), and compliance certificates.
4. **Trust & Transparency**: Official payment procedures (e.g., TresorPay, eliminating undocumented cash payments) and transparent professional coordination (licensed chartered accountants and legal counsels).

---

## 2. Competitive & Architectural Reference Analysis

| Reference Benchmark | Key Design & UX Strengths | Motion & Interaction Pattern | Adaptations for LUMA |
| :--- | :--- | :--- | :--- |
| **Stripe** | Utmost authority, typographic contrast, restrained palette, micro-interactions on cards | Subtle float, high-precision border strokes, tabbed live previews | Deep confidence, tabular data presentation, pristine UI components |
| **Linear** | Uncompromising speed, subtle dark-to-light accents, keyboard-friendly navigation | Micro-transitions (150ms-250ms), crisp state highlights | Workflow timeline, status badges, real-time stage tracking |
| **Ramp / Mercury** | Financial credibility, warm editorial photography, clear enterprise fee transparency | Smooth content reveals, pinned process sticky storytelling | "How It Works" 5-step narrative, quote builder without deceptive pricing |
| **Atelier Zero / OpenDesign** | Editorial typography, tactile cream/ivory canvases, organic layout rhythm | Scroll-triggered reveals respecting `prefers-reduced-motion` | Forest green and warm cream palette, bespoke editorial layout |

---

## 3. Verified Open-Source Resource Inventory

| Resource | Source & License | Contribution to LUMA | Selection Rationale |
| :--- | :--- | :--- | :--- |
| **OpenDesign Web Guidelines** | `nexu-io/open-design` (Apache-2.0 / Vercel Labs) | Accessibility, focus ring standards, form interaction patterns, typography rules | Enforces strict standards: no `transition: all`, visible focus states, curly quotes, `tabular-nums` |
| **GSAP & ScrollTrigger** | GreenSock (Standard permissive web license) | Hardware-accelerated scroll animations, timeline sequencing, reduced-motion fallbacks | Industry standard for non-jank animations (60fps); easily honors `prefers-reduced-motion` |
| **Lucide Icons** | Lucide Project (ISC License) | Clean, geometric, 24px stroke icon system | Consistent 1.5px/2px stroke weight, zero visual clutter, fully accessible with SVG `aria-hidden` |
| **Playwright Testing Suite** | Microsoft Playwright (Apache-2.0) | Multi-viewport screenshot generation, navigation assertion, visual regression tests | Enables rigorous Phase 5 & Phase 7 automated scoring on real Chromium/Chrome 156 |

---

## 4. Brand & Creative Direction

### Proposed Palette & Color System
- **Forest Sanctuary (Primary)**: `#0F382C` (Deep British Racing / Forest Green) — Represents stability, authority, and organic growth.
- **Ivory Alabaster (Canvas)**: `#FAF8F5` (Warm Cream / Off-white) — Soft on the eyes, avoids harsh sterile white, provides editorial warmth.
- **Surface Card**: `#FFFFFF` with `#E8E5DF` borders — Clean container separation with subtle warmth.
- **Mint Sage (Secondary Accent)**: `#2E8B57` / `#3D9970` / `#D8EDE1` — Positive status indicators, badges, and progress milestones.
- **Champagne Gold (Prestige Accent)**: `#C5A880` / `#9C7C38` — Selective highlight for trust emblems, seals, and primary accents.
- **Charcoal Ink (Typography)**: `#151B18` — Crisp, legible reading text exceeding WCAG AAA contrast (14:1+).
- **Muted Slate (Secondary Copy)**: `#55605A` — Exceeds WCAG AA (5.2:1) contrast.

### Typography
- **Headings (Display / Editorial)**: Modern Serif (`Playfair Display` / `Cinzel` / `Newsreader` style system) paired with geometric sans.
- **Body & Interface**: Modern Geometric Neo-Grotesque (`Plus Jakarta Sans` / `Inter`) with `font-variant-numeric: tabular-nums` for data.

### Anti-Patterns Explicitly Avoided
- ❌ No generic purple-and-blue AI gradient blobs.
- ❌ No floating glassmorphic spheres or gimmicky 3D cards.
- ❌ No fake customer testimonials, stock models pointing at empty whiteboards, or fabricated logos.
- ❌ No scroll hijacking or sluggish scroll locks.
