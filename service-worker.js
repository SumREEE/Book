const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    './index.html',
    './styleIndex.css',
    './img/Asset 1.png',
    './img/Asset 2.png',
    './img/Asset 3.png',
    './img/Asset 4.png',
    './img/Asset 5.png',
    './img/Asset 6.png',
    './img/Text.png',
    './img/Book-1.png.png',
    './img/Book-2.png.png',
    './img/Book-3.png.png',
    './img/Book-4.png.png',
    './manifest.json'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// ดึงข้อมูลจาก Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// ลบ Cache เก่าหลังอัปเดต
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
