self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/app.js',
                '/styles.css',
                // Add other necessary assets
            ]);
        })
    );
});
