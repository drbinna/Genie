# Text Genie — Landing Page

Single-page landing site for **Text Genie**, GoblinLabs' AI customer-support genie. Dark WebGL shader background, big headline, and one liquid-glass CTA button that drops the visitor straight into the Telegram bot.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- three.js (WebGL shader background)
- Radix Slot, `class-variance-authority`, `clsx`, `tailwind-merge` (LiquidButton)

## Run locally

```bash
npm install
npm run dev
```

Dev server runs on **http://localhost:8768**.

## Build

```bash
npm run build
npm run preview   # serves the production build on :8768
```

Output is written to `dist/`. Vite chunks plus the three.js bundle should land well under 500 KB gzipped for the initial page.

## Project layout

```
genie-landing/
├── index.html              # title: "Text Genie"
├── vite.config.ts          # port 8768, @ alias -> ./src
├── public/favicon.svg      # 🧞 emoji favicon
└── src/
    ├── main.tsx
    ├── App.tsx             # mounts <GlassFilter /> + <LandingPage />
    ├── index.css           # Tailwind v4 + dark theme
    ├── pages/LandingPage.tsx
    ├── components/ui/
    │   ├── web-gl-shader.tsx       (copied from genie-ui)
    │   └── liquid-glass-button.tsx (copied from genie-ui)
    └── lib/utils.ts        # cn() helper
```

The WebGL shader and LiquidButton are byte-identical to the originals in `projects/genie-ui/` — drop-in replaceable if those get updated.

## Deploy to Vercel

Vite is auto-detected by Vercel — no `vercel.json` needed.

1. Push this repo (or subdirectory) to GitHub.
2. In Vercel, **Add New… → Project** and import the repo.
3. If this lives inside a monorepo, set **Root Directory** to `projects/genie-landing`.
4. Framework preset: **Vite** (auto). Build command: `npm run build`. Output: `dist`.
5. Deploy.

No env vars needed.

## CTA target

The single button opens Telegram: <https://t.me/GoblinLabs_bot?start=genie>.

To change the bot, edit the `href` in `src/pages/LandingPage.tsx`.
