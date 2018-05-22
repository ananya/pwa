var dataCacheName = 'pwa';
var cacheName = 'pwa';
var filesToCache = [
  '/',
 "https://ananya-agrawal.github.io/pwa/public/fonts",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Bold.woff",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Bold.woff2",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Light.woff",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Light.woff2",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Medium.woff",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Medium.woff2",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Regular.woff",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Regular.woff2",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Thin.woff",
 "https://ananya-agrawal.github.io/pwa/public/fonts/roboto/Roboto-Thin.woff2",
 "https://ananya-agrawal.github.io/pwa/public/images/640x1136.png",
 "https://ananya-agrawal.github.io/pwa/public/images/750x1294.jpeg",
 "https://ananya-agrawal.github.io/pwa/public/images/1125x2436.jpeg",
 "https://ananya-agrawal.github.io/pwa/public/images/1242x2148.png",
 "https://ananya-agrawal.github.io/pwa/public/images/1536x2048.jpeg",
 "https://ananya-agrawal.github.io/pwa/public/images/1668x2224.jpeg",
 "https://ananya-agrawal.github.io/pwa/public/images/2048x2732.jpeg",
 "https://ananya-agrawal.github.io/pwa/public/images/android-chrome-192x192.png",
 "https://ananya-agrawal.github.io/pwa/public/images/android-chrome-512x512.png",
 "https://ananya-agrawal.github.io/pwa/public/images/apple-touch-icon.png",
 "https://ananya-agrawal.github.io/pwa/public/images/bg.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/browserconfig.xml",
 "https://ananya-agrawal.github.io/pwa/public/images/favicon-16x16.png",
 "https://ananya-agrawal.github.io/pwa/public/images/favicon-32x32.png",
 "https://ananya-agrawal.github.io/pwa/public/images/favicon.ico",
 "https://ananya-agrawal.github.io/pwa/public/images/mstile-150x150.png",
 "https://ananya-agrawal.github.io/pwa/public/images/pic01.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic02.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic03.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic04.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic05.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic06.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic07.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/pic08.jpg",
 "https://ananya-agrawal.github.io/pwa/public/images/site.webmanifest",
 "https://ananya-agrawal.github.io/pwa/public/images/icons",
 "https://ananya-agrawal.github.io/pwa/public/images/icons/icon-128x128.png",
 "https://ananya-agrawal.github.io/pwa/public/images/icons/icon-144x144.png",
 "https://ananya-agrawal.github.io/pwa/public/images/icons/icon-152x152.png",
 "https://ananya-agrawal.github.io/pwa/public/images/icons/icon-192x192.png",
 "https://ananya-agrawal.github.io/pwa/public/images/icons/icon-256x256.png",
 "https://ananya-agrawal.github.io/pwa/public/index.html",
 "https://ananya-agrawal.github.io/pwa/public/manifest.json",
 "https://ananya-agrawal.github.io/pwa/public/scripts",
 "https://ananya-agrawal.github.io/pwa/public/scripts/app.js",
 "https://ananya-agrawal.github.io/pwa/public/scripts/jquery-3.3.1.js",
 "https://ananya-agrawal.github.io/pwa/public/scripts/materialize.js",
 "https://ananya-agrawal.github.io/pwa/public/service-worker.js",
 "https://ananya-agrawal.github.io/pwa/public/styles",
 "https://ananya-agrawal.github.io/pwa/public/styles/materialize.css",
 "https://ananya-agrawal.github.io/pwa/public/styles/style.css"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
