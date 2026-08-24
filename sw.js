// Safar — service worker
// Only caches the app "shell" (this page + icons + manifest) so the app
// installs and opens instantly. Playback always needs a live network
// connection since audio streams from YouTube itself — this SW never
// touches youtube.com or oembed requests.

const CACHE_NAME = 'safar-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // never intercept YouTube, oembed, fonts, or any cross-origin request —
  // those must always hit the network live.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  // network-first for the shell, so updates roll out; cache is the fallback
  // when offline.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
