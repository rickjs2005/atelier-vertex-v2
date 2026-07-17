# ATELIER VERTEX

Peça de vitrine da **MilWeb**: landing page para um escritório de arquitetura
fictício de alto padrão. O ativo central é um vídeo de 5s em que uma obra
evolui de estrutura crua até o prédio acabado — e **o scroll é o botão de
play**: o `currentTime` do vídeo é amarrado ao progresso do ScrollTrigger.

## Stack

- Next.js (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 (só tokens no `@theme` — estilo de componente em CSS Modules)
- GSAP 3 (ScrollTrigger, SplitText) + Lenis
- `next/font` self-hosted (Archivo `wdth`, Inter, JetBrains Mono)

## O vídeo

O arquivo bruto precisa de reencode antes de ir pra `public/video/`:

```bash
ffmpeg -i bruto.mp4 -an \
  -vf "minterpolate=fps=48:mi_mode=mci,crop=iw:floor(ih*0.92/2)*2:0:0" \
  -c:v libx264 -crf 20 -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -movflags +faststart \
  public/video/hero.mp4
```

- `-an` tira o áudio
- `minterpolate` dobra 24→48fps (a 24fps o scrub fica picotado)
- `crop` remove o watermark na base (arredondado pra dimensão par, exigência
  do yuv420p)
- **`-g 1` é o mais importante:** GOP 1 faz todo frame virar keyframe. Sem
  isso o seek do scrub engasga e o efeito inteiro morre
- `+faststart` joga o índice do MP4 pro começo do arquivo

Poster (primeiro frame, evita flash preto):

```bash
ffmpeg -i public/video/hero.mp4 -vframes 1 -q:v 3 public/video/poster.jpg
```

## Rodar

```bash
npm install
npm run dev
```

Performance real só aparece no build (`npm run build && npm start`) — o modo
dev tem overhead que faz o scrub parecer mais travado do que é.

## Comportamento

- **Desktop:** hero pinado, vídeo scrubbed pelo scroll, Lenis suavizando
- **Mobile (≤767px):** sem pin e sem scrub — vídeo comum com controles
- **`prefers-reduced-motion`:** sem scrub, sem Lenis, sem SplitText
- **Vídeo indisponível:** fallback em bloco sólido `--breu`, página segue legível
