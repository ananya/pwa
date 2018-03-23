var dataCacheName = 'qr-code-pwa';
var cacheName = 'qr-code-pwa';
var filesToCache = [
  '/',
 "./fonts",
 "./fonts/roboto",
 "./fonts/roboto/Roboto-Bold.woff",
 "./fonts/roboto/Roboto-Bold.woff2",
 "./fonts/roboto/Roboto-Light.woff",
 "./fonts/roboto/Roboto-Light.woff2",
 "./fonts/roboto/Roboto-Medium.woff",
 "./fonts/roboto/Roboto-Medium.woff2",
 "./fonts/roboto/Roboto-Regular.woff",
 "./fonts/roboto/Roboto-Regular.woff2",
 "./fonts/roboto/Roboto-Thin.woff",
 "./fonts/roboto/Roboto-Thin.woff2",
 "./index.html",
 "./manifest.json",
 "./materialize",
 "./materialize/css",
 "./materialize/css/materialize.min.css",
 "./materialize/js",
 "./materialize/js/materialize.min.js",
 "./scripts",
 "./scripts/app.js",
 "./scripts/jquery-3.3.1.js",
 "./scripts/jquery.qrcode.min.js",
 "./scripts/materialize.js",
 "./service-worker.js",
 "./styles",
 "./styles/inline.css",
 "./styles/materialize.css"
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
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
