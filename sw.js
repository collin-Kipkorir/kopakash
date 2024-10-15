self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/pwa-login.html',
        '/styles.css',
        '/app.js',
        '/pwa-app.js',
        '/manifest.json',
        '/images/icon-192x192.png',
        '/images/icon-512x512.png'
      ]).catch(error => {
        console.error('Cache addAll error:', error);
        return Promise.reject(error);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open('v1').then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }).catch(error => {
      console.error('Fetch error:', error);
    })
  );
});
