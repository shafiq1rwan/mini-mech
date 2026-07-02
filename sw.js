/* Mini Mech FPS — service worker: precache the app shell + Three.js CDN
 * module, then serve cache-first so the game works fully offline.
 * Bump CACHE version when you ship changes to force an update. */
const CACHE = 'mini-mech-fps-v26';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Add individually — one failure (e.g. './' on some hosts) shouldn't
    // abort the whole precache.
    await Promise.allSettled(ASSETS.map(url => cache.add(url)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      if (res.ok) (await caches.open(CACHE)).put(e.request, res.clone());
      return res;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});
