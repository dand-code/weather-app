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
self.addEventListener('install', e => {

  const cachePromise = caches.open(cacheName).then(
    cache => {
      return cache.addAll(contentToCache)
    }
  )
  
  e.waitUntil(cachePromise);
});


//Fetching content using Service Worker

self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    if (new RegExp('^(?:[a-z]+:)?//', 'i').test(new URL(evt.request.url).protocol) ) return;
    cache.put(e.request, response.clone());
    return response;
  })());
});

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

//Action notification
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});