# Haziq (IRSPlays) — Portfolio v2 "Cypher Sticker Fox"

A super-creative one-page portfolio built with **Next.js 16**, themed after my fursona **Cypher**.
Fun and silly on the surface, professional underneath — die-cut sticker UI, sunset dark/light themes,
throwable stickers, an eye-tracking fox mascot, 3D floating art, and full case studies for every project.

## What's inside

- **Hero** — spring-animated name, rotating typewriter roles, cursor-tracking Cypher, R3F 3D sticker scene
- **About** — parallax polaroids, "Failing with Honour" motto wall
- **Asirive spotlight** — the flagship company + **Asirive Cortex** with its 5-layer hybrid brain
- **Arsenal** — scroll-skewed marquee of the full technical stack
- **Projects** — sticker cards → spring modals with mission / build / highlights / stack
- **Secret Lab** — draggable stickers, poke-the-fox reactions, paw cursor toggle, Konami party mode
- **Contact** — squishy social buttons + waving tail

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Three.js / React Three Fiber ·
next-themes · Lenis · next/font (Bricolage Grotesque + Plus Jakarta Sans + JetBrains Mono)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Editing content

All copy, projects, socials and **photo slots** live in `src/data/content.ts`.
Photo placeholders across the site are driven by the `photoSlots` manifest — drop a photo in `public/`
and pass `src` to `<PhotoFrame slot="..." src="/your.jpg" />` to fill a slot.

Built by Haziq (IRSPlays) & Cypher. Failing with Honour.
