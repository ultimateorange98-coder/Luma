# LUMA Design System (v1.0.0)

## 1. Color Palette Tokens

```css
:root {
  /* Brand Core — Synchronized with Official Luma Logo (#021D48) */
  --color-primary: #021D48;         /* Luma Deep Royal Navy - Authority, Trust & Structure */
  --color-primary-hover: #072B68;   /* Elevated Luma Navy */
  --color-primary-subtle: #EEF3FA;  /* Tinted Navy highlight for badges/cards */
  --color-primary-dark: #01122E;    /* Deepest Midnight Navy */
  --color-primary-light: #0B3980;   /* Vibrant Navy Tint */

  /* Neutral Canvas & Surfaces */
  --color-bg-canvas: #FAF8F5;       /* Warm Editorial Cream Canvas */
  --color-bg-surface: #FFFFFF;      /* Clean Crisp Surface */
  --color-bg-subtle: #F3EFEA;       /* Secondary Warm Tint */
  --color-bg-navy: #021D48;         /* Full Bleed Navy Surface */
  --color-bg-card-hover: #FDFBF8;   /* Interactive card state */

  /* Typography */
  --color-text-main: #0F172A;       /* Deep Charcoal Ink (Contrast ratio > 15:1) */
  --color-text-muted: #475569;      /* Muted Slate (Contrast ratio > 5.5:1) */
  --color-text-subtle: #64748B;     /* Tertiary metadata */
  --color-text-inverse: #FFFFFF;    /* Pure White on Dark */
  --color-text-inverse-muted: #CBD5E1; /* Soft White on Navy */

  /* Accents & Signals */
  --color-accent-teal: #00C896;     /* Modern Cyan/Teal - Active & Completed Status */
  --color-accent-teal-bg: #E6FBF5;  /* Soft Teal Badge Background */
  --color-accent-gold: #D4AF37;     /* Restrained Champagne Gold - Prestige */
  --color-accent-gold-dark: #987B4E;/* Darker Gold for accessible text */
  --color-accent-gold-subtle: #FDF9EE; /* Tinted gold background */

  /* Structural Borders & Rules */
  --color-border-subtle: #E2E8F0;   /* Soft hairline */
  --color-border-medium: #CBD5E1;   /* Interactive element borders */
  --color-border-navy: rgba(255, 255, 255, 0.12); /* Delicate white border on navy */
  --color-border-focus: #021D48;    /* High-contrast focus state */

  /* Shadows (Multi-layered subtle diffusion) */
  --shadow-sm: 0 1px 3px rgba(2, 29, 72, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-md: 0 6px 20px -3px rgba(2, 29, 72, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  --shadow-lg: 0 16px 40px -6px rgba(2, 29, 72, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04);
  --shadow-dropdown: 0 20px 48px -8px rgba(2, 29, 72, 0.16), 0 6px 16px rgba(0, 0, 0, 0.04);
}
```

---

## 2. Typography Scale

Pairing:
- **Headings / Display**: Editorial Serif (`Playfair Display`, `Newsreader`, `Georgia`, serif fallback).
- **Interface & Body**: Geometric Neo-Grotesque (`Plus Jakarta Sans`, `Inter`, system-ui fallback).

```css
:root {
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typographic Scale */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2rem;       /* 32px */
  --text-4xl: 2.5rem;     /* 40px */
  --text-5xl: 3.25rem;    /* 52px */
  --text-hero: 4rem;      /* 64px */

  /* Tracking & Line Heights */
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;
  --tracking-tight: -0.025em;
  --tracking-wide: 0.04em;
}
```

---

## 3. Spacing Grid & Layout Containers

Based on an 8pt modular grid:
- `4px` (`--space-1`), `8px` (`--space-2`), `12px` (`--space-3`), `16px` (`--space-4`), `24px` (`--space-6`), `32px` (`--space-8`), `48px` (`--space-12`), `64px` (`--space-16`), `96px` (`--space-24`), `128px` (`--space-32`).

### Responsive Breakpoints:
- **Mobile Small**: `375px` - `390px`
- **Mobile Standard / Tablet Portrait**: `640px` - `768px`
- **Tablet Landscape / Desktop**: `1024px`
- **Desktop Wide**: `1280px` - `1440px`
- **Max Container Width**: `1240px` with responsive gutter padding (`24px` on mobile, `48px` on desktop).

---

## 4. Components Specification

### A. Buttons
- **Primary Button**: Background `--color-primary`, text `--color-text-inverse`, border 1px solid `--color-primary`, border-radius `8px`, subtle shadow. Hover: `--color-primary-hover` with 1.5px upward translation.
- **Secondary / Ghost Button**: Background `transparent`, border 1px solid `--color-border-medium`, text `--color-primary`. Hover: background `--color-primary-subtle`.
- **Prestige / Gold Button**: Background `--color-accent-gold`, text `--color-primary-dark`, border 1px solid `--color-accent-gold`.
- **Keyboard Focus**: `outline: 2px solid var(--color-primary); outline-offset: 2px;` via `:focus-visible`.

### B. Cards & Surfaces
- Flat, tactile cards with hairline borders (`1px solid var(--color-border-subtle)`), 12px border radius, subtle hover elevation (`--shadow-md`) and gentle border color darkening.

### C. Forms & Inputs
- Explicit label above field, `8px` border radius, `1px solid var(--color-border-medium)`, subtle inner padding (`12px 16px`), transition on `border-color` and `box-shadow`.
- Accessible error states with inline error feedback and `aria-describedby`.

### D. Navigation
- Sticky/floating frosted bar with backdrop filter (`rgba(250, 248, 245, 0.88)` and `backdrop-filter: blur(12px)`).
- Dropdown menu with hover/click accessibility, chevron indicator, active link marker, and clean mobile toggle menu.

---

## 5. Motion Principles (GSAP & CSS)
- **Duration**: Fast micro-interactions (`150ms-250ms`), deliberate page reveals (`400ms-700ms`).
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration, Apple-grade spring feel).
- **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, all transforms and transitions are disabled, keeping opacity immediate.
- **Compositor Only**: Only `transform` and `opacity` are animated to prevent layout thrashing and maintain 60 FPS.
