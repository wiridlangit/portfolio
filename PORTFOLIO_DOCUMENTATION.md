# Portfolio Website Documentation

This document explains the architecture, implementation details, and proper development/deployment workflow for this portfolio website.

## Table of Contents

- [1. Overview](#1-overview)
- [2. Tech Stack](#2-tech-stack)
- [3. Project Structure](#3-project-structure)
- [4. Styling System](#4-styling-system)
- [5. Routing](#5-routing)
- [6. How Animations Work](#6-how-animations-work)
- [7. Backend & Data Model](#7-backend--data-model)
- [8. Key Features](#8-key-features)
- [9. Environment Setup](#9-environment-setup)
- [10. Development Workflow](#10-development-workflow)
- [11. Proper Update Procedure (Edit → Git Push)](#11-proper-update-procedure-edit--git-push)
- [12. Build & Deployment](#12-build--deployment)
- [13. Git Repository State](#13-git-repository-state)
- [14. Known Issues & Recommendations](#14-known-issues--recommendations)

## 1. Overview

This is a 100% static, single-page React portfolio website for Wiridlangit. It has a terminal/CLI aesthetic throughout, featuring a one-time boot animation, scroll-triggered reveals, and a dark "terminal" color scheme.

**Notable characteristics:**
- Built as a client-side SPA (no backend server code)
- No environment variables required
- Content is entirely data-driven from files in `src/data/`
- Currently deployed as static files (Docker/nginx at root, or intended GitHub Pages)

## 2. Tech Stack

| Category | Technology | Version | Notes |
|---|---|---|---|
| Framework | React | 19.1.1 | JSX only (no TypeScript) |
| Build Tool | Vite | 7.1.3 | With `@vitejs/plugin-react` and `@tailwindcss/vite` |
| Router | React Router DOM | 7.8.2 | `BrowserRouter`, no `basename` configured |
| Styling | Tailwind CSS | 4.1.12 | CSS-first configuration (no `tailwind.config.js`) |
| Scroll Animations | AOS (Animate On Scroll) | 3.0.0-beta.6 | Declarative `data-aos` attributes |
| CSS Animations | Animate.css | 4.1.1 | Used for overlays/toasts only |
| Carousel | Swiper | 11.2.10 | Certificates section with coverflow effect |
| Icons | Remixicon | 4.6.0 | Used as `<i class="ri-...">` elements |
| Deployment (optional) | gh-pages | 6.3.0 | For GitHub Pages publishing |
| Linting | ESLint | 9.34.0 | Flat config (`eslint.config.js`) |
| Runtime | Node.js | 22+ (recommended) | Dockerfile uses `node:22-alpine` |

**No other animation libraries:** GSAP, Framer Motion, Three.js, Lottie, or Canvas/WebGL are not used.

## 3. Project Structure

```text
portfolio/
├── Dockerfile           # Multi-stage: Node build → nginx:alpine serve dist/
├── docker-compose.yml   # Exposes port 80
├── eslint.config.js     # ESLint 9 flat config
├── index.html           # HTML shell with SEO/meta + Google Fonts
├── package.json         # Scripts and dependencies
├── vite.config.js       # Vite config (react + tailwindcss, base: '/')
├── dist/                # Build output (committed in working tree)
├── public/              # Static assets (images, CV, certificates, tools, projects)
└── src/
    ├── main.jsx         # App entry; AOS init
    ├── router.jsx       # Route definitions
    ├── index.css        # Tailwind v4 theme, keyframes, utilities
    ├── constants.js     # Site config (name, contact, resume, socials, nav)
    ├── components/      # React components
    │   ├── BootSequence.jsx
    │   ├── layout/      # Layout, Navbar, Footer, Backdrop, SectionRail
    │   ├── sections/    # Home page sections (Hero, About, Experience, ...)
    │   └── ui/          # Reusable UI (Terminal, Lightbox, CopyEmailButton, ...)
    ├── context/         # Toast context/provider
    ├── data/            # Content data files (profile, projects, experience, ...)
    ├── hooks/           # Custom hooks (useTypewriter, useSeo, usePrefersReducedMotion)
    └── pages/           # Route pages (Home, ProjectDetail, NotFound)
```

## 4. Styling System

This project uses **Tailwind CSS v4** with CSS-first configuration. There is no `tailwind.config.js` file.

### Key files
- `src/index.css` (174 lines) — Single source of truth for styles
- `@tailwindcss/vite` plugin in `vite.config.js` handles processing

### Theme tokens (`src/index.css:3-24`)
Defined in `@theme` block:
```css
--font-sans: 'Inter', ui-sans-serif, system-ui, ...
--font-mono: 'JetBrains Mono', ui-monospace, ...
--color-term-bg: #080b0a
--color-term-surface: #0e1412
--color-term-elevated: #131b18
--color-term-border: #1d2724
--color-term-border-bright: #2c3a35
--color-term-text: #e6efea
--color-term-muted: #8ba39a
--color-term-faint: #5c6f68
--color-term-accent: #5ee6a8
--color-term-accent-dim: #2f7f5f
--color-term-amber: #e9b949
--color-term-cyan: #62d0dd
```

Custom animations registered as Tailwind animation tokens:
- `--animate-blink: blink 1.05s steps(2,start) infinite;`
- `--animate-glow: glow 3.5s ease-in-out infinite;`
- `--animate-scan: scan 9s linear infinite;`
- `--animate-drift: drift 24s ease-in-out infinite alternate;`

### Custom utilities (`src/index.css:107-126`)
- `.text-glow` — text shadow glow using `color-mix()`
- `.grid-bg`, `.grid-bg-fade` — 56px grid background with radial mask
- `.panel` — glassy card: 1px border, semi-transparent surface, `backdrop-filter: blur(12px)`

### Global base styles (`src/index.css:64-105`)
- `html { scroll-behavior: smooth; scroll-padding-top: 6rem; }`
- Custom scrollbar styling
- `:focus-visible` accent outline
- Text selection color
- Swiper carousel overrides under `.cert-swiper` (coverflow pagination styling)

## 5. Routing

Defined in `src/router.jsx`:
```jsx
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

- Layout wraps Home and ProjectDetail (provides Backdrop, Navbar, Footer, SectionRail, BootSequence)
- NotFound is a standalone route
- **No `basename`** is set on `BrowserRouter`

## 6. How Animations Work

The site combines multiple animation approaches. All respect `prefers-reduced-motion` in the critical paths (AOS init, boot sequence, typewriter).

### 6.1 AOS (Scroll reveals) — Primary
- **Init:** `src/main.jsx:10-17` — `once: true`, `offset: 60`, disables when `prefers-reduced-motion: reduce`
- **Usage:** Applied via `data-aos`, `data-aos-duration`, `data-aos-once`, `data-aos-delay`
- **Staggering:** `Experience.jsx:49` uses `index * 80` delay; `Projects.jsx:26` and `Tools.jsx:25` read `dad` (delay string) from data files
- **Coverage:** About, Experience, Tools, Projects, Certificates, Contact, Publications

### 6.2 CSS keyframes (ambient/background)
Defined in `src/index.css:26-62`, consumed as Tailwind classes:
- `blink` — cursor blink
- `glow` — accent glow pulse
- `scan` — horizontal scanline sweeping viewport (`translateY(-100%) → 100vh`)
- `drift` — slow parallax drift of radial blobs

**Usage:**
- `animate-blink`: cursor in BootSequence, Navbar, Hero, Terminal, NotFound
- `animate-drift`, `animate-glow`, `animate-scan`: `Backdrop.jsx:6-12` (three blurred radial blobs + grid + scanline)
- `animate-glow`: IEEE publication orb (`Publications.jsx:20`)
- `animate-ping`: "Open to Work" status dot (`Terminal.jsx:83`)

### 6.3 Animate.css (overlays)
Imported in `main.jsx:9`. Used sparingly:
- `Lightbox.jsx:25,32` — fadeIn (overlay), zoomIn (panel)
- `ToastProvider.jsx:45` — fadeInUp (toast)

### 6.4 Boot Sequence (one-time intro)
**File:** `src/components/BootSequence.jsx`

Behavior:
1. Reads `sessionStorage['portfolio:booted']` on mount (line 5, 22-34). If true, skips intro.
2. If `prefers-reduced-motion`, skips immediately (lines 39-43).
3. Reveals 5 fake boot lines with 320ms interval (line 50)
4. After 450ms hold, starts exit: overlay translates up and fades out over 700ms (lines 67-69)
5. Sets `sessionStorage['portfolio:booted'] = 'true'` on exit
6. While playing, `Layout.jsx:39-41` keeps `<main>` at `opacity-0` and fades in over 700ms

### 6.5 Typewriter effect
**Hook:** `src/hooks/useTypewriter.js`

- Recursive `setTimeout` typing at 34ms/char (`speed`), 300ms start delay, 460ms pause between lines
- If `prefers-reduced-motion` is true, returns fully typed text immediately (lines 23-27)
- Drives `whoami` in Hero section

### 6.6 ScrollSpy Rail
**File:** `src/components/layout/SectionRail.jsx`

- Throttled with `requestAnimationFrame` + `ticking` flag (lines 45-49)
- Listens to scroll on `{ passive: true }`
- Tracks section positions: `rect.top - 140` threshold
- Appears after 900ms delay and only on `/` route
- Updates active dot based on current viewport position

### 6.7 Micro-interactions
- Card/image hover lifts: `hover:-translate-y-0.5`, `group-hover:scale-105` (500ms)
- Mobile nav: height/opacity transition via `max-h-0 → max-h-[26rem]`
- Smooth scrolling enabled globally
- Focus-visible outlines use accent color

### 6.8 Swiper (Certificates)
**File:** `src/components/sections/Certificates.jsx:35-57`

- Modules: `Navigation, Pagination, EffectCoverflow`
- Effect: `coverflow` with `rotate: 0, stretch: 0, depth: 120, modifier: 2, scale: 0.86`
- Responsive breakpoints: 1 slide (640px), 2 (768px), 3 (1024px)
- Styled in `index.css:128-174` (custom pagination bullets)

## 7. Backend & Data Model

**This project has no backend.** It is fully static.

### What this means
- No Express/Next.js API routes, no serverless functions
- No database
- No authentication
- No server-side processing

### Contact form history
Previously, the contact form posted directly to **FormSubmit.co** (`https://formsubmit.co/wiridlangit@gmail.com`) — this is a third-party hosted endpoint, not custom backend code. The form was removed in the current working tree; `src/constants.js:12` still contains `formEndpoint` as dead configuration.

### Client-side features
- **Copy to clipboard:** `src/components/ui/CopyEmailButton.jsx` uses `navigator.clipboard` with fallback to hidden textarea + `document.execCommand('copy')`
- **Toast notifications:** React Context (`ToastContext.js`, `ToastProvider.jsx`) — auto-dismiss 2600ms, aria-live polite
- **SEO meta:** `useSeo.js` hook updates document title and OG/Twitter meta tags per route; static defaults in `index.html`

### Data model (all content-driven)
All site content lives in `src/data/` as JS modules:

| File | Exports | Purpose |
|---|---|---|
| `profile.js` | `profile` | Name, tagline, bio, location, avatar, "whoami" text, hero description |
| `projects.js` | `listProyek`, `getProjectById` | Project list (13 projects) with gallery, tech tags, links, dates, delays |
| `experience.js` | `experience` | Work/education/organization timeline entries with kind and dates |
| `certificates.js` | `certificates` | Certificate list with image paths and metadata |
| `tools.js` | `listTools` | Skills/tools grid with icons and stagger delays |
| `publications.js` | `publications`, `getPrimaryPublication` | IEEE publication info |
| `index.js` | Barrel export | Re-exports all data modules |

Assets referenced from `public/assets/` (images, CV, etc.).

## 8. Key Features

1. **Terminal aesthetic** — Shell prompts, "zsh — 96×24" window chrome, macOS traffic lights, CLI-style section headings
2. **One-time boot sequence** — SessionStorage-gated, reduced-motion aware
3. **Typewriter "whoami"** in Hero
4. **Scroll-spy rail** — Right-hand dot navigation with tooltips
5. **Project detail pages** — Gallery with lightbox, click-to-zoom
6. **Certificates carousel** — Swiper coverflow effect with lightbox
7. **Experience timeline** — Color-coded by kind (work/organization/education)
8. **Toast system** — Global notifications via Context
9. **Copy email with fallback** — Robust clipboard handling
10. **CV download** — Links to PDF in `public/assets/`
11. **Reduced motion support** — AOS disabled, boot/typewriter skip instantly
12. **Accessibility** — sr-only headings, ARIA labels, focus-visible, Escape-to-close lightbox, body scroll lock

## 9. Environment Setup

**Prerequisites:** Node.js 18+ (recommended 20+ or 22+), npm (comes with Node).

### Install dependencies
```bash
cd D:\Portfolio\portfolio
npm install
```

### Development server
```bash
npm run dev
```
Vite dev server runs at `http://localhost:5173/` (default). Hot Module Replacement (HMR) is enabled.

### Production preview
```bash
npm run build
npm run preview
```
Serves the built `dist/` locally.

## 10. Development Workflow

### Adding/editing content
- Update data in `src/data/*.js` (projects, experience, tools, etc.)
- Add static assets to `public/assets/` (images, PDFs). Reference with paths like `/assets/...`
- Site config lives in `src/constants.js` (site name, contact, socials, nav links)

### Modifying styles
- Edit `src/index.css` for theme tokens, utilities, keyframes, or global styles
- Use Tailwind classes directly in components (v4 CSS-first)
- Follow existing terminal color palette

### Adding animations
- For scroll reveals: add `data-aos` attributes to elements (see existing sections)
- For ambient effects: use existing keyframes or add to `@theme` + `@keyframes` in `index.css`
- For one-off timed effects: follow patterns in `BootSequence.jsx` or `useTypewriter.js`

### Code quality
```bash
npm run lint
```
Runs ESLint 9 with flat config (`eslint.config.js`). Check and fix any linting issues before committing.

## 11. Proper Update Procedure (Edit → Git Push)

Follow these steps every time you make changes. This ensures clean history and prevents committing unintended files.

### Step 1: Understand current state
```bash
cd D:\Portfolio\portfolio
git status
git branch --show-current
git log --oneline -5
```

### Step 2: Make your edits
Edit files using your preferred editor. Common files: `src/data/*.js`, `src/components/sections/*.jsx`, `src/constants.js`, `src/index.css`, `public/assets/*`.

### Step 3: Review changes
```bash
git diff
# or for specific file
git diff src/components/sections/Hero.jsx
```

### Step 4: Stage only intended files
**Never** stage everything blindly. Be explicit.
```bash
# Stage specific files
git add src/data/projects.js src/components/sections/Projects.jsx

# Or stage a directory selectively
git add public/assets/proyek/new-project.png

# Verify what will be committed
git diff --cached
```

### Step 5: Run linting (recommended)
```bash
npm run lint
```
Fix any errors/warnings before committing.

### Step 6: Commit with clear message
Follow conventional, concise commit messages. Match repo style (see git history).
```bash
git commit -m "Add new project entry and screenshot"
# or
git commit -m "Fix mobile nav layout on small screens"
# or
git commit -m "Update experience section with new role"
```

**Rules:** Don't amend failed commits; fix and create new commit. Don't skip hooks (none active). Don't force-push unless explicitly instructed.

### Step 7: Push to remote
```bash
# Check remote
git remote -v

# Push current branch
git push origin feature/new-portfolio
# or if branch doesn't exist on remote
git push -u origin feature/new-portfolio
```

If pushing to main instead: `git push origin main`.

### Step 8: Build & deploy (if needed)
After pushing source, deploy built assets to your hosting target. See [Section 12](#12-build--deployment) for details.

## 12. Build & Deployment

### Build locally
```bash
npm run build
```
Outputs static files to `dist/`. Vite bundles JS/CSS/assets with hashed filenames.

### Preview build
```bash
npm run preview
```
Test the production build locally before deploying.

### Deployment options

#### A) GitHub Pages (via gh-pages)
Configured in `package.json`:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Deploy:
```bash
npm run deploy
```
This builds and pushes `dist/` to `origin/gh-pages` branch. The site is published at `https://wiridlangit.github.io/portfolio` (per `homepage` field).

**Important caveats for GitHub Pages:**
- `vite.config.js` sets `base: '/'` but the repo is served under `/portfolio/` subpath on GitHub Pages project sites. With `BrowserRouter` and `base: '/'`, deep links (`/project/8`) and asset paths like `/assets/...` will resolve incorrectly in a project-page deployment. Also no SPA fallback `404.html` exists.
- The `gh-pages` branch on remote is stale (~13 months behind as of exploration).
- Consider changing `base` to `/portfolio/` and/or adding a `basename` to `BrowserRouter` if deploying to GitHub Pages project site. For root/custom domain deployment, current setup is fine.

#### B) Docker + nginx (home server / Raspberry Pi)
Files: `Dockerfile`, `docker-compose.yml`

**Dockerfile** (multi-stage):
1. Build stage: `node:22-alpine` → `npm ci` → `npm run build` → outputs to `/app/dist`
2. Production stage: `nginx:alpine` → copies `dist/` to `/usr/share/nginx/html`

**Build and run:**
```bash
docker compose build
docker compose up -d
```
Serves on port 80. Accessible at `http://<server-ip>/`.

**Caveats:**
- No custom `nginx.conf` included. nginx's default config does **not** provide SPA fallback (no `try_files $uri $uri/ /index.html`). Deep links like `/project/8` will return 404 if accessed directly. To fix: add a custom nginx config with `try_files $uri $uri/ /index.html;` for the root location.
- `base: '/'` in Vite is correct for root-served nginx.

#### C) Static hosting (Netlify, Vercel, Cloudflare Pages)
Can deploy `dist/` as static files. For SPA routing, configure fallback to `index.html` (rewrites). Vercel/Netlify typically handle this; Cloudflare Pages needs `_redirects` or Pages Functions not needed — just static + SPA fallback rule.

## 13. Git Repository State

**Remote:**
```text
origin  https://github.com/wiridlangit/portfolio.git (fetch/push)
```

**Current branch:** `feature/new-portfolio` (checked out)

**Recent commits:**
```
af17972 Redesign portfolio (2026-10-06)
eeaecf5 Add Docker deployment configuration (2026-09-14)
4503a1f Remove basename from BrowserRouter (2026-09-13)
0b1f9e5 Change base path in Vite configuration (2026-09-13)
0532f74 Add files via upload (2026-09-13)
```

**Other branches:** `main`, `remotes/origin/gh-pages` (stale), `remotes/origin/feature/new-portfolio`

**Working tree status (dirty):** There are uncommitted changes relative to `af17972`:
```text
 D public/assets/CV_Wiridlangit.pdf                    (deleted)
 M src/components/sections/Contact.jsx                 (form removed, replaced by channel card)
 M src/components/sections/Hero.jsx                    (nickname fields changed)
 M src/constants.js                                    (email, resume path/filename updated)
 M src/data/experience.js                              (GPA removed from ITS entry)
 M src/data/profile.js                                 (bio updated + home server paragraph)
?? public/assets/CV_Wiridlangit_Web_Version.pdf        (untracked)
```

These changes represent the "redesign" in progress on `feature/new-portfolio`. Review with `git diff` before committing.

## 14. Known Issues & Recommendations

### Issues to be aware of
1. **GitHub Pages base path mismatch** — `base: '/'` + no `basename` on router + no `404.html`. If deploying to GitHub Pages project site, deep links and assets break. Fix: set `base: '/portfolio/'` in `vite.config.js` and add `basename="/portfolio"` to `BrowserRouter`, or add `public/404.html` SPA fallback.
2. **Docker nginx no SPA fallback** — Direct URL access to routes returns 404. Fix: add custom `nginx.conf` with `try_files $uri $uri/ /index.html;`.
3. **Dead code** — `formEndpoint` in `constants.js:12` is unused after contact form removal. Can be removed.
4. **Stale gh-pages branch** — Remote `gh-pages` is ~13 months old; if redeploying, will be overwritten by `gh-pages` package.
5. **Large public assets** — `public/` is ~32MB (images, certificates, CV). Not an issue for static hosting, but worth noting if using strict size limits.
6. **No CI/CD** — No GitHub Actions workflows. All builds/deploys are manual.
7. **No project README** — `README.md` is the stock Vite template. This documentation file (`PORTFOLIO_DOCUMENTATION.md`) fills that gap.

### Recommendations
- Add `public/404.html` with SPA redirect for GitHub Pages (standard workaround)
- Add custom nginx config in Docker setup for proper SPA routing
- Clean up dead config (`formEndpoint`) if contact form stays removed
- Consider adding a simple GitHub Actions workflow to build/lint on push/PR
- If deploying to GitHub Pages long-term, align `base` + `basename` consistently

---

*Generated from thorough codebase exploration (Oct 2026). For questions about specific implementation details, refer to file paths and line numbers cited in this document.*
