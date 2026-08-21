# SPHD — Happy Anniversary!

<p align="center">
  <strong>18 Years of Swapna & Praveen</strong><br/>
  August 21, 2008 → August 21, 2026<br/><br/>
  <a href="https://sphd.vercel.app">🌐 Live Site</a> · 
  <a href="https://github.com/HyperHrishi-HD/SPHD">📁 GitHub</a> · 
  <a href="https://youtube.com/@HyperhrishiHD">🎬 YouTube</a>
</p>

---

A cinematic, single-page anniversary website built by their son **Hrishi** ([@HyperhrishiHD](https://youtube.com/@HyperhrishiHD)) to celebrate 18 beautiful years of love.

## ✨ Features

- **🎬 Hero Section** — Full-screen cinematic opening with animated nature shapes, royal gradient title, and porcelain texture overlays
- **📸 Photo Wall** — 3 conveyor-belt rows of polaroid cards showcasing 25 family photos, with fullscreen lightbox and date metadata
- **💌 Letter Section** — Vintage paper writing form with honeycomb grid display and glassmorphism modals
- **🎥 Video Finale** — Theater curtain reveal animation with embedded YouTube video
- **🎵 Background Music** — Seamless looping audio that pauses during video playback
- **📱 Responsive** — Beautiful on all screens, mobile-first design

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | Framework & API routes |
| **React 19** | UI components |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations |
| **Firebase Admin** | Firestore for letters |
| **Google Gemini** | AI content moderation (temporarily disabled) |
| **Web Audio API** | Background music playback |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
git clone https://github.com/HyperHrishi-HD/SPHD.git
cd SPHD
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
# Firebase Admin (for storing letters)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
sphd-anniversary/
├── public/
│   ├── audio/
│   │   └── song.m4a          # Background music
│   └── photos/
│       ├── hero.jpg           # Hero background
│       └── *.jpg              # Family photos
├── scripts/
│   └── generate-photos-manifest.mjs
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── letters/       # Firestore CRUD
│   │   │   ├── letters/submit/
│   │   │   ├── moderate/      # Gemini moderation
│   │   │   └── photos/        # Dynamic photo list
│   │   ├── globals.css        # Design system
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main orchestrator
│   ├── components/
│   │   ├── BackgroundMusic.tsx
│   │   ├── CreditsSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LetterSection.tsx
│   │   ├── PolaroidWall.tsx
│   │   └── VideoSection.tsx
│   └── lib/
│       └── photos-manifest.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design System

**Color Palette:**
- Peach: `#FFF5EE` / `#FFDAB9` / `#FFB088`
- Gold: `#C9A96E` / `#E8D5A8`
- Royal Red: `#B91C1C`
- Royal Blue: `#1E3A5F`

**Typography:**
- **Playfair Display** — Royal serif for headings
- **Dancing Script** — Vintage script for letters

**Effects:**
- Glassmorphism with backdrop-blur
- Porcelain texture overlays
- Translucent nature animations
- Theater curtain reveals

## 📸 Adding Photos

1. Place images in `public/photos/`
2. Run the manifest generator:
   ```bash
   node scripts/generate-photos-manifest.mjs
   ```
3. Or manually update `src/lib/photos-manifest.json`

## 🎵 Audio

Replace `public/audio/song.m4a` with your preferred track. The system supports:
- MP3, M4A, WAV formats
- Automatic gapless looping
- Pauses during video playback

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

The app builds to standard Node.js. Deploy anywhere that supports Next.js.

## 📝 License

© 2026 SPHD Project. Built with love by [HyperHrishi HD](https://github.com/HyperHrishi-HD).

---

<p align="center">
  <em>Happy Anniversary, Mom & Dad! ♥</em><br/>
  <small>18 Years Together — August 21, 2008 to August 21, 2026</small>
</p>
