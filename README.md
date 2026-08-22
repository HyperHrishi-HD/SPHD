# SPHD — Happy Anniversary!

<p align="center">
  <strong>A cinematic anniversary experience</strong><br/>
  <a href="https://sphd.vercel.app">🌐 Live Site</a> ·
  <a href="https://github.com/HyperHrishi-HD/SPHD">📁 GitHub</a> ·
  <a href="https://youtube.com/@HyperhrishiHD">🎬 YouTube</a>
</p>

---

SPHD is a single-page celebration site with a cinematic hero, family-photo wall, shared letters, and a theater-style video finale. The repository is public and contains only the application source and intentionally published media assets—never commit credentials, service-account files, or private environment files.

## ✨ Features

- **🎬 Hero scene** — Responsive background photo, layered porcelain light, translucent trees and plants, drifting leaves and blossoms, a textured mountain horizon, clouds, a static road, and lightweight clip-art cars
- **📸 Photo wall** — Three seamless conveyor rows of polaroids with responsive Next.js image optimization, click-to-pause rows, and a full-resolution lightbox
- **💌 Letter section** — Centered postcard-style writing form, 1,000-character limit, manuscript roll animation, and a honeycomb gallery of letters
- **☁️ Shared storage** — Server-only Firebase Admin/Firestore storage for submitted letter text and authors; browser storage is only a cache for already-saved letters
- **🎥 Video finale** — Theater-curtain reveal with a lazy-loaded YouTube embed
- **🎵 Background music** — Interaction-started looping audio with a gentle fade around the video section
- **📱 Responsive and considerate** — Mobile-first layout, reduced-motion support, and lighter decorative work on low-end devices

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | Framework and API routes |
| **React 19** | UI components |
| **Tailwind CSS v4** | Utility styling |
| **Framer Motion** | Opening, reveal, and interaction motion |
| **Firebase Admin** | Server-side Firestore letter storage |
| **Next Image** | Responsive, cached photo delivery |
| **Web Audio API** | Background music playback |

The Gemini moderation endpoint remains in the project as a future integration seam, but moderation is intentionally disabled for now.

## 🚀 Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
git clone https://github.com/HyperHrishi-HD/SPHD.git
cd SPHD
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Shared letters configuration

The letter API is server-only. To enable shared Firestore storage, set these variables in your local `.env.local` or hosting provider settings. Use a dedicated service account with only the permissions the app needs, and keep the values private.

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
```

Do not add `.env.local`, service-account JSON files, or real credential values to Git. The app reports a clear unavailable state when Firebase is not configured rather than pretending a letter was shared.

### Production build

```bash
npm run build
npm start
```

## 📁 Project Structure

```text
SPHD/
├── public/
│   ├── audio/song.m4a
│   └── photos/                 # Published celebration photos
├── scripts/
│   └── generate-photos-manifest.mjs
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── letters/        # Firestore read endpoint
│   │   │   ├── letters/submit/ # Firestore write endpoint
│   │   │   ├── moderate/       # Disabled moderation seam
│   │   │   └── photos/         # Photo listing endpoint
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   └── lib/
│       ├── firebase-admin.ts
│       └── photos-manifest.json
├── vidrender/                  # Separate, untouched vertical-video renderer
├── next.config.ts
├── package.json
└── README.md
```

## 📸 Photos

The UI imports `src/lib/photos-manifest.json`; it does not hardcode photo filenames. To add supported photos:

1. Place `.jpg`, `.jpeg`, `.png`, or `.webp` files in `public/photos/`.
2. Regenerate the manifest:

   ```bash
   node scripts/generate-photos-manifest.mjs
   ```

3. Run the build or development server. The photo wall uses Next.js responsive WebP delivery for cards and requests the original file only in the lightbox.

HEIC files are kept out of the browser manifest because common browsers do not reliably display them.

## 🎵 Audio and video

- Replace `public/audio/song.m4a` only when intentionally changing the published soundtrack.
- Background audio begins after the visitor's first permitted interaction.
- The YouTube iframe is not requested until the curtain reveal begins.
- `vidrender/` is an isolated utility project and is not part of the Next.js page build.

## 🎨 Design language

- **Palette:** peach porcelain, warm gold, soft cream, royal red, and royal blue
- **Type:** Playfair Display for the formal voice and Dancing Script for handwritten moments
- **Motion:** slow, transform-based decorative movement with reduced-motion and low-end fallbacks
- **Surfaces:** translucent glass, paper grain, soft shadows, and restrained texture

## 🚢 Deployment

The app can be deployed to any platform that supports Next.js. For Vercel:

1. Import the public GitHub repository.
2. Set the three Firebase variables in the project environment settings.
3. Deploy with the default Next.js build command.

Keep credentials in the hosting provider's encrypted environment settings, not in this repository.

## 📝 License

© 2026 SPHD Project. Built with love by [HyperHrishi HD](https://github.com/HyperHrishi-HD).

<p align="center"><em>Happy Anniversary ♥</em></p>
