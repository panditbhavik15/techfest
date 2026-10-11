# CYBERCORE — Cyborg-Themed Landing Page

> A futuristic, responsive cyborg-themed landing page featuring cyberpunk visuals, immersive animations, and interactive UI components.

CYBERCORE is a single-page, production-ready front-end experience for a technology festival / cyber-tech brand. It is a **fictional interface**: the telemetry, node readouts and system status lines are design storytelling, not real product metrics.

---

## Features

- **Sticky HUD navigation** — glass background that solidifies on scroll, active-section highlighting, `ENTER THE SYSTEM` CTA, and a working mobile menu (`Escape` closes, `aria-expanded`/`inert` state, tap targets ≥ 44 px).
- **Full-screen hero** — `HUMANITY / REDEFINED.` display lockup, generated cyborg portrait inside a HUD frame, rotating targeting rings, scanning beam, floating particles, `SYSTEM ONLINE / AI CORE ACTIVE / NEURAL LINK STABLE` readouts and a scroll cue.
- **Telemetry strip** — animated count-up for `99.9%` and `24/7`, plus `AI-CORE` and `∞` cells, with an explicit note that the numbers are fictional interface telemetry.
- **Technology modules** — four cards (Neural Integration, Cybernetic Robotics, Artificial Intelligence, Human Augmentation) with unique icons, technical identifiers (`MOD-01 // NEURAL`), elevation and border-illumination on hover/focus.
- **Immersive experience** — split layout with a large visual, three feature highlights and a `DISCOVER THE SYSTEM` action that scrolls to the technology section.
- **Interactive cyber interface** — a genuinely working control panel: circular radar sweep, standby/active indicator states, four animated progress bars, an SVG connection topology graph, a system log, and an `ACTIVATE SYSTEM` ⇄ `SYSTEM ACTIVE` toggle that changes every readout (announced through an `aria-live` region).
- **Call to action** — `BEGIN YOUR EVOLUTION` opens a real, focus-trapped modal dialog (no fake registration, form or payment) that explains the concept and links to this repository.
- **Footer** — logo, brand description, quick navigation, repository link, current-year copyright and a system-status indicator.
- **Craft details** — scroll-reveal animations, cursor-reactive lighting on fine-pointer devices, self-hosted subset fonts, custom SVG favicon, full SEO/Open Graph/Twitter metadata, keyboard focus rings, and a `prefers-reduced-motion` mode that disables particles, scanning beams and transitions.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript 6 |
| Build tool | Vite 8 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, design tokens in `@theme`, custom CSS keyframes |
| Icons | `lucide-react` |
| Motion | CSS animations + `IntersectionObserver` (no animation library needed) |
| Imagery | Locally generated, WebP-compressed assets imported through the bundler |
| Fonts | Self-hosted latin subsets of Chakra Petch, Rajdhani and Share Tech Mono (SIL OFL) |

No runtime network requests are made: fonts and images are served from the bundle, so nothing can break offline or hotlink.

## Getting started

Prerequisites: **Node.js 20.19+** (or 22.12+) and npm.

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
```

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and produce the production bundle in `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally |
| `npm run lint` | Oxlint over `src/` |

> `npm run lint` needs the `oxlint` native binary. On machines where Windows App Control / Smart App Control blocks unsigned native modules, that command fails with *"An Application Control policy has blocked this file"*. `npm run build` still runs the full TypeScript type-check, so the code stays verified.

## Project structure

```
.
├── index.html                 # metadata, OG tags, theme color, root mount
├── vite.config.ts             # react + tailwind plugins, relative base
├── public/
│   ├── favicon.svg            # custom cyber hex/core mark
│   └── og-image.webp          # social preview image
└── src/
    ├── main.tsx               # React root
    ├── App.tsx                # page composition + cursor lighting
    ├── index.css              # Tailwind import, design tokens, keyframes, HUD styles
    ├── fonts.css              # @font-face rules for the self-hosted subsets
    ├── fonts/                 # .woff2 subsets
    ├── hooks.ts               # useReducedMotion, useFinePointer, useInView, useCountUp, useActiveSection
    ├── lib/
    │   ├── site.ts            # nav model, section ids, repository URL
    │   └── styles.ts          # shared button / HUD label class tokens
    ├── assets/                # hero + experience WebP images (2 widths each)
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Stats.tsx
        ├── Technology.tsx
        ├── SystemInterface.tsx
        ├── Experience.tsx
        ├── CallToAction.tsx   # includes the accessible modal dialog
        ├── Footer.tsx
        ├── Reveal.tsx         # scroll-reveal wrapper
        └── ui.tsx             # Logo, StatusDot, StatusPill, SectionHeading
```

## Design system

Tokens live in `src/index.css` under `@theme`:

- **Surfaces** — `void #04060c`, `abyss #070b16`, `graphite #0b1120`, `panel #0f1728`, `line #1c2a45`
- **Accents** — `neon #2ee6ff`, `electric #4c7dff`, `plasma #a855f7`, `amber #ffb020` (standby states)
- **Type** — `--font-display` (Chakra Petch) for headings, `--font-body` (Rajdhani) for copy, `--font-mono` (Share Tech Mono) for HUD labels
- **Type scale** — `clamp()` driven hero lockup (`2.9rem → 5.75rem`), section headings at `text-4xl/5xl`, HUD labels at 10–11 px with wide tracking

Custom classes are declared inside `@layer components` so Tailwind utilities always win — that is what lets `.hud-panel` be re-positioned with `absolute`/`relative` utilities per use site.

## Accessibility

- One `h1`, section `h2`s, card `h3`s; landmarks (`header`, `nav`, `main`, `footer`) plus a skip-to-content link.
- All interactive elements are real `button`/`a` elements with visible `:focus-visible` outlines and ≥ 40 px touch targets.
- The system panel uses `aria-pressed` on the toggle, `role="progressbar"` with live `aria-valuenow`, and an `aria-live="polite"` status line.
- The modal uses `role="dialog"`, `aria-modal`, initial focus, a Tab focus trap, `Escape`/backdrop close and focus restoration.
- Decorative SVGs, rings and particles are `aria-hidden`; both images carry descriptive alt text and fall back to a CSS-only gradient panel if decoding ever fails.
- `prefers-reduced-motion: reduce` removes particles, scanning beams, reveal transitions and smooth scrolling.

## Performance

- Hero and experience visuals are pre-compressed WebP (≈ 50–104 KB each, down from ~2 MB PNGs) with `srcset`/`sizes`; the below-the-fold image is `loading="lazy"`.
- Images declare `width`/`height` and the hero uses `fetchpriority="high"`, so there is no layout shift.
- Animation is CSS-only and limited to transform/opacity; the pointer-lighting handler is `requestAnimationFrame`-throttled and never attaches on coarse pointers.
- Production bundle: ~82 KB gzipped JS and ~9.5 KB gzipped CSS.

## Screenshots

_Add actual captures here once the demo recording pass is complete (hero, technology, interactive system panel, mobile viewport)._

| Hero | Technology | System interface | Mobile |
| --- | --- | --- | --- |
| `docs/hero.png` | `docs/technology.png` | `docs/interface.png` | `docs/mobile.png` |

## Deployment

The build uses `base: './'`, so every asset is referenced relatively. The contents of `dist/` therefore work at a domain root **and** under a sub-path (e.g. GitHub project Pages) with no extra configuration.

**GitHub Pages (manual)**
1. `npm run build`
2. Publish the `dist/` folder — e.g. push it to a `gh-pages` branch:
   ```bash
   npm i -D gh-pages
   npx gh-pages -d dist
   ```
3. In the repository: **Settings → Pages → Branch: gh-pages / root**.

**Vercel / Netlify**
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required — the app has no backend, secrets or API keys.

Set the final `og:url`-style absolute URLs only if you add per-page canonical links later; the current `og:image` uses a relative path that resolves from the deployed page.

## Demo recording

Not generated automatically. To capture the submission clip (30–60 s):

1. `npm run dev` and open the printed URL.
2. Record the viewport (OBS Studio, or Windows `Win + Alt + R`).
3. Show the hero, scroll through telemetry → technology → interactive panel, click `ACTIVATE SYSTEM`, then resize to a phone width (~390 px) and open the mobile menu.
4. Upload to Google Drive → **Share** → *Anyone with the link* / *Viewer* → verify the link opens in an incognito window.

## Credit & license

- Imagery was generated for this project and stored locally in `src/assets/` and `public/`.
- Fonts are subsets of Chakra Petch, Rajdhani and Share Tech Mono under the SIL Open Font License.
- **No license file has been added yet, so all rights are reserved.** Add one (MIT is a common choice for a showcase) before publishing the repository publicly if you want others to reuse the code.
