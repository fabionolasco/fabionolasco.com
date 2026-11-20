// Network-first for pages so visitors always get the latest content;
// cache-first for static assets. Bump CACHE_NAME when precached assets change.
var CACHE_NAME = 'fabio-nolasco-website-v4';
var PRECACHE = [
    '/',
    '/impact/',
    '/ai-assisted-engineering/',
    '/about/',
    '/book/',
    '/contact/',
    '/404.html',
    '/fonts/source-serif-4-latin-opsz-normal.woff2',
    '/fonts/public-sans-latin-wght-normal.woff2',
    '/images/portrait-160.webp',
    '/images/portrait-272.webp',
    '/images/jp2/professional-front-end-architecture-book.webp',
    '/images/professional-front-end-architecture-book.jpg'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) { return cache.addAll(PRECACHE); })
            .then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (key) { return key !== CACHE_NAME; })
                .map(function (key) { return caches.delete(key); }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
        return;
    }
    if (request.mode === 'navigate' || (request.headers.get('accept') || '').indexOf('text/html') !== -1) {
        event.respondWith(
            fetch(request).then(function (response) {
                var copy = response.clone();
                if (response.ok) {
                    caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
                }
                return response;
            }).catch(function () {
                return caches.match(request).then(function (cached) {
                    return cached || caches.match('/404.html');
                });
            })
        );
        return;
    }
    event.respondWith(
        caches.match(request).then(function (cached) { return cached || fetch(request); })
    );
});
