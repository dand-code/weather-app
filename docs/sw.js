/* eslint-disable no-restricted-globals */
self.importScripts("./info.js");

const cacheName = 'appNowWeather-v1';
const appShellFiles = [
    './',
    './index.html',
    './info.js',
    './favicon.ico',
    './logo192.png',
    './logo512.png',
];

const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});


//Fetching content using Service Worker

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

// self.addEventListener('activate', e => {
//   console.log('Service Worker Activado');
//   console.log(e);

// });

self.addEventListener('activate', (event) => {
  let cacheKeeplist = ['appNowWeather-v1'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
