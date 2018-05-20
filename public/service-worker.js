var dataCacheName = 'template-pwa';
var cacheName = 'template-pwa';
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
 "./images/640x1136.png",
 "./images/750x1294.jpeg",
 "./images/1125x2436.jpeg",
 "./images/1242x2148.png",
 "./images/1536x2048.jpeg",
 "./images/1668x2224.jpeg",
 "./images/2048x2732.jpeg",
 "./images/android-chrome-192x192.png",
 "./images/android-chrome-512x512.png",
 "./images/apple-touch-icon.png",
 "./images/bg.jpg",
 "./images/browserconfig.xml",
 "./images/favicon-16x16.png",
 "./images/favicon-32x32.png",
 "./images/favicon.ico",
 "./images/mstile-150x150.png",
 "./images/pic01.jpg",
 "./images/pic02.jpg",
 "./images/pic03.jpg",
 "./images/pic04.jpg",
 "./images/pic05.jpg",
 "./images/pic06.jpg",
 "./images/pic07.jpg",
 "./images/pic08.jpg",
 "./images/site.webmanifest",
 "./images/icons",
 "./images/icons/icon-128x128.png",
 "./images/icons/icon-144x144.png",
 "./images/icons/icon-152x152.png",
 "./images/icons/icon-192x192.png",
 "./images/icons/icon-256x256.png",
 "./index.html",
 "./manifest.json",
 "./scripts",
 "./scripts/app.js",
 "./scripts/jquery-3.3.1.js",
 "./scripts/materialize.js",
 "./service-worker.js",
 "./styles",
 "./styles/materialize.css",
 "./styles/style.css"
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



self.addEventListener('fetch', function(e) {
//   console.log('[Service Worker] Fetch', e.request.url);
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
      );
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
