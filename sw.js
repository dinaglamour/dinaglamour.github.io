const CACHE = 'dina-glamour-pwa-github-v1';
const ASSETS = ["/","/index.html","/manifest.webmanifest","/fonts/fonts.css","/fonts/xn7gYHE41ni1AdIRggqxSuXd.woff2","/fonts/xn7gYHE41ni1AdIRggOxSuXd.woff2","/fonts/xn7gYHE41ni1AdIRggSxSuXd.woff2","/fonts/xn7gYHE41ni1AdIRggixSuXd.woff2","/fonts/xn7gYHE41ni1AdIRggmxSuXd.woff2","/fonts/xn7gYHE41ni1AdIRggexSg.woff2","/fonts/nuFkD-vYSZviVYUb_rj3ij__anPXDTnohkk72xU.woff2","/fonts/nuFkD-vYSZviVYUb_rj3ij__anPXDTnojUk72xU.woff2","/fonts/nuFkD-vYSZviVYUb_rj3ij__anPXDTnojEk72xU.woff2","/fonts/nuFkD-vYSZviVYUb_rj3ij__anPXDTnogkk7.woff2","/fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTjYgFE_.woff2","/fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTPYgFE_.woff2","/fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTLYgFE_.woff2","/fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2","/images/hero.jpg","/images/dina.jpg","/images/studio.jpg","/images/acrylic.jpg","/images/gel.jpg","/images/pedicure.jpg","/images/nailart.jpg","/images/lashes.jpg","/images/lashlift.jpg","/icons/icon-192.png","/icons/icon-512.png","/icons/icon-512-maskable.png"];
self.addEventListener('install', event => {
  event.waitUntil((async () => { const cache = await caches.open(CACHE); await cache.addAll(ASSETS); await self.skipWaiting(); })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => { for (const key of await caches.keys()) if (key.startsWith('dina-glamour-pwa-') && key !== CACHE) await caches.delete(key); await self.clients.claim(); })());
});
self.addEventListener('fetch', event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => { try { const response = await fetch(req); if (response.ok) return response; throw Error('bad response'); } catch { return (await caches.match('/index.html')) || (await caches.match('/')); } })());
    return;
  }
  event.respondWith((async () => { const cached = await caches.match(req, {ignoreSearch:true}); if (cached) return cached; return fetch(req); })());
});
