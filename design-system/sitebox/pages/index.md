# Design System Page-Specific Overrides: Landing Page (index)

> **LOGIC:** These rules override `design-system/sitebox/MASTER.md` for the index page.

---

## Page Colors

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Accent (Purple) | `#8B5CF6` | `--color-accent` |
| Accent Glow | `#A78BFA` | `--color-accent-glow` |
| Background | `#FBFBFE` | `--color-background` |
| Foreground / Text | `#0F172A` | `--color-text` |
| Muted Text | `#475569` | `--color-text-muted` |
| Card Background | `rgba(255, 255, 255, 0.7)` | `--color-card-bg` |
| Card Border | `rgba(139, 92, 246, 0.15)` | `--color-card-border` |

## Page Typography

- **Heading Font:** Playfair Display (as Bodoni/Canela-style serif headline)
- **Body Font:** Inter (sans-serif)
- **CSS Import:**
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
  ```

## UI/UX Tokens & Geometry

- **Border Radius:** `24px` for bento cards, CTA block, and major sections.
- **Glassmorphism Spec:**
  - `background: rgba(255, 255, 255, 0.65)`
  - `backdrop-filter: blur(12px)`
  - `border: 1px solid rgba(255, 255, 255, 0.4)`
  - `box-shadow: 0 8px 32px 0 rgba(139, 92, 246, 0.05)`
- **Hover Transitions:** 300ms cubic-bezier(0.16, 1, 0.3, 1) to feel premium and elastic (no layout shifts).

## Section Structure

1. **Floating Navigation Header** (translucent glassmorphic bar, top-4 layout).
2. **Hero Section** (split layout: left side Canela-style text, right side floating dashboard mockup, translucent glass objects background).
3. **Feature Bento Section** ("Powerful features. Zero hassle." using premium 24px rounded glass bento cards).
4. **Showcase Section** ("Launch faster with beautiful templates." carousel of template previews: Restaurants, Clinics, Salons, Gyms, Agencies).
5. **How It Works Timeline** (3 step interactive timeline).
6. **Stats Counter Section** (15K+ Websites, 2K+ Active creators, 99.9% uptime, 120+ Countries).
7. **Testimonial Section** (large editorial typography with high contrast profiles).
8. **CTA Section** (Dark container `#0F172A` with purple accent glow `#8B5CF6`).

## Animation Guidelines

- **Scroll Smoothness:** Lenis integration for fluid momentum scroll.
- **GSAP & Framer Motion Integration:**
  - GSAP for high-performance scroll triggers (e.g., parallax glass background objects, template carousel horizontal movement).
  - Framer Motion for React layout animations, staggered bento fade-ups, magnetic buttons, and responsive modal transitions.
