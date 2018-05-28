var dataCacheName = 'pwa';
var cacheName = 'pwa';
var filesToCache = [
 "/pwa/public/fonts",
 "/pwa/public/fonts/roboto",
 "/pwa/public/fonts/roboto/Roboto-Bold.woff",
 "/pwa/public/fonts/roboto/Roboto-Bold.woff2",
 "/pwa/public/fonts/roboto/Roboto-Light.woff",
 "/pwa/public/fonts/roboto/Roboto-Light.woff2",
 "/pwa/public/fonts/roboto/Roboto-Medium.woff",
 "/pwa/public/fonts/roboto/Roboto-Medium.woff2",
 "/pwa/public/fonts/roboto/Roboto-Regular.woff",
 "/pwa/public/fonts/roboto/Roboto-Regular.woff2",
 "/pwa/public/fonts/roboto/Roboto-Thin.woff",
 "/pwa/public/fonts/roboto/Roboto-Thin.woff2",
 "/pwa/public/images/640x1136.png",
 "/pwa/public/images/750x1294.jpeg",
 "/pwa/public/images/1125x2436.jpeg",
 "/pwa/public/images/1242x2148.png",
 "/pwa/public/images/1536x2048.jpeg",
 "/pwa/public/images/1668x2224.jpeg",
 "/pwa/public/images/2048x2732.jpeg",
 "/pwa/public/images/android-chrome-192x192.png",
 "/pwa/public/images/android-chrome-512x512.png",
 "/pwa/public/images/apple-touch-icon.png",
 "/pwa/public/images/bg.jpg",
 "/pwa/public/images/browserconfig.xml",
 "/pwa/public/images/favicon-16x16.png",
 "/pwa/public/images/favicon-32x32.png",
 "/pwa/public/images/favicon.ico",
 "/pwa/public/images/mstile-150x150.png",
 "/pwa/public/images/pic01.jpg",
 "/pwa/public/images/pic02.jpg",
 "/pwa/public/images/pic03.jpg",
 "/pwa/public/images/pic04.jpg",
 "/pwa/public/images/pic05.jpg",
 "/pwa/public/images/pic06.jpg",
 "/pwa/public/images/pic07.jpg",
 "/pwa/public/images/pic08.jpg",
 "/pwa/public/images/site.webmanifest",
 "/pwa/public/images/icons",
 "/pwa/public/images/icons/icon-128x128.png",
 "/pwa/public/images/icons/icon-144x144.png",
 "/pwa/public/images/icons/icon-152x152.png",
 "/pwa/public/images/icons/icon-192x192.png",
 "/pwa/public/images/icons/icon-256x256.png",
 "/pwa/public/index.html",
 "/pwa/public/manifest.json",
 "/pwa/public/scripts",
 "/pwa/public/scripts/app.js",
 "/pwa/public/scripts/jquery-3.3.1.js",
 "/pwa/public/scripts/materialize.js",
 "/pwa/public/service-worker.js",
 "/pwa/public/styles",
 "/pwa/public/styles/materialize.css",
 "/pwa/public/styles/style.css"
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
      // return response || fetch(e.request);
      if (response) {
        return response;
      }
      var fetchRequest = e.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();

          caches.open(cacheName)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
        }
      )
    })
  );
});

