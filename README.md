[Português](README.pt-BR.md)

# ATELIER VERTEX — v2

Landing page for a **fictional** high-end architecture studio, built as a
**MilWeb** portfolio piece. The centerpiece is a 5-second video in which a
building goes from raw structure to finished façade — and **scrolling is the
play button**: the video stays fixed full-screen behind the page and its
`currentTime` follows the scene the visitor is in.

> **Type:** commercial demo (fictional brand; names, figures, projects and
> contacts are illustrative) · **Demo:** https://atelier-vertex-v2.vercel.app

![Page hero: building under scaffolding with the headline "Do andaime à fachada."](docs/screenshots/hero.webp)

| Floor plan ("prancha") drawn over the video | Handover (final frame) |
| --- | --- |
| ![Floor plan drawn over the video](docs/screenshots/prancha.webp) | ![Finished building with the headline "Entregue."](docs/screenshots/entregue.webp) |

## Features

- Fixed full-screen video driven by scroll (`VideoRig`): each section drives a
  slice of the video (`lib/scenes.ts`) and a `requestAnimationFrame` loop
  eases toward the target time.
- Scene script: hero, floor plan (drawn as you scroll), three film acts,
  figures, finale; then the video fades and "Act 2" scrolls over it (project
  archive, studio, process, contact).
- Construction HUD (`dia 001 / 132`), dimension line with milestones and a
  film progress rail.
- Loader with a skip-intro option, hamburger navigation on mobile and a
  custom cursor on fine-pointer devices.
- HD video (`hero-hd.mp4`) on screens wider than 1100 px and a lighter
  version (`hero.mp4`) elsewhere, with `preload="metadata"` and a poster.
- `prefers-reduced-motion`: no video scrub, no Lenis and no entrance
  animations.

The site copy is in Brazilian Portuguese.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (tokens only in `@theme`; component styles in CSS Modules)
- GSAP 3 (ScrollTrigger, SplitText) + Lenis
- `next/font` (Archivo, Inter, JetBrains Mono)
- ESLint (`eslint-config-next`)

## Getting started

Requirements: Node.js 20.9+ (CI uses Node 22) and npm.

```bash
npm ci
npm run dev        # http://localhost:3000
```

Real scrub performance only shows in a production build — dev mode adds
overhead:

```bash
npm run build
npm start
```

The project does not use environment variables.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm start` | serves the production build |
| `npm run lint` | ESLint |

## Project structure

```
app/                 layout, single page and global styles
components/
  VideoRig/          fixed video + day HUD + dimension line
  SceneTracker/      detects the current scene and progress within it
  sections/          Hero, Prancha, Film, Stats, Finale, Obras, Estudio, Processo, Cta, Footer
  Loader/ Nav/ Cursor/ FilmProgress/ ui/
hooks/useLenis.ts    smooth scroll synced to the GSAP ticker
lib/                 world (shared state), scenes (script), obras (portfolio), gsap
public/video/        hero.mp4, hero-hd.mp4, poster.jpg
docs/screenshots/    images used in this README
```

## The video

The raw file must be re-encoded before going into `public/video/`:

```bash
ffmpeg -i raw.mp4 -an \
  -vf "minterpolate=fps=48:mi_mode=mci,crop=iw:floor(ih*0.92/2)*2:0:0" \
  -c:v libx264 -crf 20 -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -movflags +faststart \
  public/video/hero.mp4
```

- `-an` drops the audio
- `minterpolate` doubles 24→48 fps (at 24 fps the scrub looks choppy)
- `crop` removes the bottom strip of the source clip (where a watermark was),
  rounded to an even height (required by yuv420p)
- **`-g 1` is the key part:** GOP 1 makes every frame a keyframe; without it
  scrub seeking stutters
- `+faststart` moves the MP4 index to the start of the file

Poster (first frame, avoids a black flash):

```bash
ffmpeg -i public/video/hero.mp4 -vframes 1 -q:v 3 public/video/poster.jpg
```

## Limitations

- Fictional content: the studio, projects, figures (41 projects, 132 days,
  etc.), WhatsApp (`5511000000000`) and e-mail (`ateliervertex.example`) are
  illustrative and do not reach anyone.
- Archive photos are loaded from Unsplash at runtime (`images.unsplash.com`);
  without network access they do not show.
- The videos add up to ~18 MB in the repository; scrubbing relies on GOP 1,
  so videos re-encoded without `-g 1` will stutter.
- No automated tests; CI runs lint, typecheck and build.

## Credits and media

- Videos in `public/video/` (`hero.mp4`, `hero-hd.mp4`, `poster.jpg`): origin
  not documented.
- Archive photos: Unsplash (IDs in `lib/obras.ts`), subject to the Unsplash
  license.
- Design and development: MilWeb.

## Security

See [SECURITY.md](SECURITY.md) to report vulnerabilities.

## License

No license has been chosen yet; all rights reserved by the author.
