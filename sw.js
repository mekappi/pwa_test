var CACHE_NAME = 'my-site-cache-v1.00';
var urlsToCache = [
  '/',
  '/manifest.json',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png'
];

// アプリケーションがインストールされた際に発生します。
self.addEventListener('install', function(event) {
  console.log('service worker: install', event);
  // インストール処理
  // self.skipWaiting()を実行するまでまつ
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).then(()=> self.skipWaiting())
  );
});


// activeateイベントはインストール直後あるいは復帰時の、Service Workersが有効化されたタイミングで発生します
self.addEventListener('activate', event => {

  console.log('service worker: activate', event);
    // delete old caches
  event.waitUntil(
    clearOldCaches()
    .then(() => self.clients.claim())
    );

});

// Fetchイベントはネットワークリクエストの際に発生します
self.addEventListener('fetch', event => {
  console.log("serviceWorker fetch event", event);
});


// clear old caches
function clearOldCaches() {

  return caches.keys()
    .then(keylist => {
      console.log("cache keylist", keylist);
      return Promise.all(
        keylist
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );

    });

}
