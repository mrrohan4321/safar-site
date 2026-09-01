# Safar 🎵

**প্রতিটা রাস্তার নিজের একটা গান থাকে** — *every road has a song of its own*

A minimal, ad-free music player website with a warm, cinematic aesthetic — built as a single-page installable web app. Safar streams playlists through YouTube's own embedded player, so there are no extra ads and no tracking added on top.

**Live site:** [safar-adfree.netlify.app](https://safar-adfree.netlify.app/)

## Features

- 🎧 **Ad-free playback** — plays through YouTube's embedded IFrame player, no extra ads or trackers layered in
- 🎨 **Warm, film-grain aesthetic** — amber/rose color palette, animated ambient background, subtle grain and parallax effects
- 📱 **Installable PWA** — add-to-home-screen support on both Android/desktop (native install prompt) and iOS (manual instructions banner)
- 🔀 **Full player controls** — play/pause, next/prev, shuffle, repeat, seekable progress bar, volume
- 📃 **Queue view** — expandable queue showing upcoming tracks with thumbnails, pulled live via YouTube oEmbed
- 🎛️ **Playlist switcher** — pill-style tabs to swap between multiple YouTube playlists
- ⌨️ **Keyboard shortcuts** — Space to play/pause, arrow keys for prev/next and volume
- 🔒 **Lock-screen & media key support** — via the Media Session API (title, artist, artwork, hardware controls)
- 🖱️ **Custom cursor glow** — on desktop/fine-pointer devices only
- 🕐 **Live clock + quick YouTube link** in the status bar

## Tech stack

Plain **HTML, CSS, and vanilla JavaScript** — no frameworks, no build step. Single `index.html` file.

- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) for playback
- [YouTube oEmbed](https://oembed.com/) for track titles/artist/thumbnail metadata
- Web APIs: Media Session, Service Worker (PWA), Device Orientation (mobile parallax)
- [Google Fonts](https://fonts.google.com/) — Fraunces, Inter, IBM Plex Mono

## Project structure

```
safar-site/
├── index.html      # entire app — markup, styles, and script
├── manifest.json    # PWA manifest (name, icons, theme color)
├── sw.js            # service worker for installability
└── icons/
    └── icon-192.png # app icon
```

> Note: `manifest.json`, `sw.js`, and `icons/` are referenced by `index.html` but may need to be added to the repo if not already present — see [Setup](#setup) below.

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/mrrohan4321/safar-site.git
   cd safar-site
   ```
2. Make sure `manifest.json`, `sw.js`, and an `icons/` folder with `icon-192.png` exist alongside `index.html` (needed for the "Install as app" feature).
3. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   ```
   (Service worker registration and the install prompt only work over `http(s)`, not `file://`.)

## Customizing playlists

Playlists are defined near the top of the `<script>` block in `index.html`:

```js
const PLAYLISTS = [
  { label: "safar", id: "PLCjuYOW0NjJ8" }
];
```

Add more entries — each needs a short `label` and the YouTube playlist ID (the part after `list=` in a YouTube playlist URL) — and a pill-style switcher will appear automatically once there's more than one.

## Deployment

Currently deployed on [Netlify](https://www.netlify.com/). Since it's a static single-file site, it can be deployed anywhere that serves static files (Netlify, Vercel, GitHub Pages, etc.) with no build step required.

## License

Copyright (c) 2026 Rohan

Feel free to use, modify, share, and learn from this project, for personal or commercial purposes. Provided as-is, without warranty.