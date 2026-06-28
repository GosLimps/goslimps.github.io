/* Финальный service worker «Карта Хайрула» — самодостаточный, без внешних CDN.
   Офлайн: precache оболочки, навигация с фолбэком на index.html, поддержка SKIP_WAITING. */
const VERSION = 'v2';
const CACHE = 'hyrule-map-' + VERSION;
const OFFLINE_URL = './index.html';

// Всё по относительным путям — работает и в корне, и в подпапке.
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

// Позволяет применять обновления без перезапуска (PWABuilder шлёт это сообщение).
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Кэшируем по одному «мягко»: один отсутствующий файл не валит всю установку.
      Promise.all(ASSETS.map((url) =>
        cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (e) {}
    }
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Навигация: сеть (и navigation preload) → офлайн-страница из кэша.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        return await fetch(req);
      } catch (e) {
        const cache = await caches.open(CACHE);
        return (await cache.match(OFFLINE_URL)) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Прочее: кэш → сеть (с дозаписью в кэш).
  event.respondWith(
    caches.match(req).then((cached) =>
      cached || fetch(req).then((resp) => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return resp;
      }).catch(() => cached)
    )
  );
});
