# SiteBox Landing Page — Production

SiteBox is the website builder and client website delivery platform built for modern freelancers and agencies. It helps users choose a template, customize it, get the client's sign-off, and deploy — without five tabs and a hosting headache.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/) (TypeScript)
- **Styling**: Vanilla CSS with custom design tokens (`src/index.css`)
- **Animations & Layout**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) (clean vector stroke icons)

---

## 🎨 Visual Identity

- **Palette**:
  - Background: Dark forest-green (`#07130f`, `#0e221b`, `#050f0c`)
  - Accents: Gold/brass (`#d4af37`, glowing gold radial gradients)
  - Showcase / Why sections: Warm cream/white (`#f6f4ef`, `#faf8f4`, `#faf8f5`)
  - Typography colors: Pure white text (`#ffffff`), soft muted sage (`#a3b5ae`), deep ink (`#1c1e1a`)
- **Typography**:
  - Headlines: Fraunces serif with optical sizing
  - Body: Inter sans-serif
  - Eyebrows & Badges: IBM Plex Mono
- **Branding**:
  - Isometric 3D SiteBox cube vector logo
  - Radial ambient glow highlights
  - High-converting single primary CTA architecture ("Start Building Free")

---

## 🔗 Navigation & Canonical Destinations

All application buttons lead directly to the canonical app domain:
`https://app.sitebox.studio`

| Button / Link | Location | Destination |
|---------------|----------|-------------|
| **Log in** | Header & Mobile Drawer | `https://app.sitebox.studio` |
| **Get Started** | Header & Mobile Drawer | `https://app.sitebox.studio` |
| **Start Building Free** | Hero Section | `https://app.sitebox.studio` |
| **Browse all templates** | Templates Section | `https://app.sitebox.studio` |
| **Start Building Free** | Final CTA Section | `https://app.sitebox.studio` |
| **Create free account** | Footer | `https://app.sitebox.studio` |
| **Log in** | Footer | `https://app.sitebox.studio` |

Internal section links:
- `Why SiteBox` → `#why`
- `How it works` → `#workflow`
- `Templates` → `#templates`
- `Features` → `#features`

---

## ⚡ Performance & Image Optimizations

1. **WebP Compression**:
   - `mockup_clean.webp`: Reduced by 94.9% (1.52 MB down to 76 KB).
   - `restaurants.webp`: Reduced by 97.8% (1.16 MB down to 25 KB).
   - `clinics.webp`: Reduced by 92.0% (592 KB down to 47 KB).
   - `salons.webp`: Reduced by 96.5% (669 KB down to 24 KB).
   - `gyms.webp`: Reduced by 91.3% (631 KB down to 55 KB).
   - Total image payload reduced by **~95%** (from 4.5 MB to 227 KB).
2. **LCP Optimization**:
   - Hero preview mockup uses `<picture>` with `fetchpriority="high"`, eager loading, and `<link rel="preload">` in `index.html`.
3. **CLS Prevention**:
   - Explicit `width`, `height`, and `aspect-ratio: 16/9` on template cards and hero preview.
4. **Bundle Efficiency**:
   - Removed unused libraries and dead code.
   - Clean, zero-warning TypeScript build.

---

## 🚀 Local Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type-check & build production bundle
npm run build

# Run ESLint
npm run lint
```

---

## 🌐 Technical SEO & Domain Consistency

- **Canonical Production Domain**: `https://sitebox.studio/`
- **Sitemap**: `https://sitebox.studio/sitemap.xml`
- **Robots Directives**: `https://sitebox.studio/robots.txt`
- **Social Sharing**: Open Graph & Twitter Card with branded 1200x630 card (`/og-image.png`)
- **Structured Data**: Schema.org JSON-LD (`WebSite`, `Organization`, `WebApplication`)
- **Heading Structure**: Strict single H1 with logical H2 -> H3 hierarchy and zero skipped levels

---

## ☁️ Deployment Guide (Vercel & Cloudflare)

### Vercel (Recommended)
1. Import repository into [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Output directory: `dist`.
4. Production Domain: Set `sitebox.studio` as the primary production domain.
5. The included [`vercel.json`](file:///c:/Users/Admin/Desktop/SiteBox-Landing-Page/vercel.json) handles 308 permanent redirects (from `site-box.vercel.app` & `www.sitebox.studio`), security headers, and asset caching automatically.

### Cloudflare Pages
1. Framework preset: `Vite`.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Add custom domain `sitebox.studio` under Custom Domains.