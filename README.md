# droid-transfer-web

The download site for [Droid Transfer](https://github.com/hexhad/droid-transfer): Android file transfer for Mac, over USB or Wi-Fi.

Next.js (App Router) + Tailwind CSS, with:

- an interactive HTML preview of the app window in the hero (`src/components/AppPreview.tsx`): open folders, switch list and icon view
- a comparison of the two ways to connect: File transfer (MTP, no setup) and USB debugging (adb, for the extras)
- the install steps, with copy buttons for the one-time `xattr` and optional `adb` commands
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

---

<p align="center">
  <a href="https://hexhad.github.io"><img src=".github/hexhad.svg" width="40" height="40" alt="HEXHAD"></a>
  <br>
  <sub>Built by <a href="https://hexhad.github.io"><b>HEXHAD</b></a> · Made in Sri Lanka</sub>
</p>
