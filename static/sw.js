var cacheName = 'fabio-nolasco-website';
var filesToCache = [
    '/',
    '/index.html',
    '/404.html',
    '/contact/index.html',
    '/about/index.html',
    '/404/index.html',
    '/fonts/untitled-font-1.eot',
    '/fonts/untitled-font-1.svg',
    '/fonts/untitled-font-1.ttf',
    '/fonts/untitled-font-1.woff',
    '/images/jp2/professional-front-end-architecture-book.webp',
    '/images/professional-front-end-architecture-book.jpg',
    '/images/fabionolasco-266.jpg',
    '/images/fabionolasco-266.webp',
    '/images/fabionolasco-133.webp',
    '/images/fabionolasco-133.jpg',
    '/images/f1.jpg',
    '/images/jp2/f1.webp'
];
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});