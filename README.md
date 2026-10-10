# droid-transfer-web

The download site for [Droid Transfer](https://github.com/hexhad/droid-transfer): Android file transfer for Mac, over USB or Wi-Fi.

Next.js (App Router) + Tailwind CSS, with:

- a 3D phone you can drag Mac files onto, the way the app works (`src/components/HeroDemo.tsx`, `PhoneScene.tsx`, React Three Fiber). Its screen is an illustrated home screen drawn on a canvas.
- an interactive HTML preview of the app window (`src/components/AppPreview.tsx`): open folders, switch list and icon view
- the install steps, with copy buttons for the `adb` and one-time `xattr` commands
- the Droid Transfer mark in liquid metal ([paper-design/shaders](https://github.com/paper-design/shaders), as in liquid-logo)
- a shader gradient behind the download section ([shadergradient](https://github.com/ruucm/shadergradient))
- a liquid glass nav (`src/components/LiquidGlass.tsx`, after [liquid-glass-js](https://github.com/dashersw/liquid-glass-js))

## Develop

```bash
npm install
npm run dev
```

## Ship a new app version

1. Build the DMG in the app repo: `scripts/package.sh <version>` (writes `dist/DroidTransfer-<version>.dmg`).
2. Copy it into `public/downloads/` and delete the old one.
3. Update `release` in `src/lib/site.ts` (version, file, size, SHA-256 from `dist/SHA256SUMS.txt`).

## Deploy

Import the repo in Vercel. The defaults work: framework Next.js, build `next build`, no environment variables.
