const CACHE_NAME = 'kopa-kash-v1';
const urlsToCache = [
  './',
  './index.html',
  './pwa-login.html',
  './pwa-home.html',
  './loan-application.html',
  './pwa-increase.html',
  './styles.css',
  './pwa-app.js',
  './manifest.json',
  './images/icon-192x192.png',
  './images/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});
