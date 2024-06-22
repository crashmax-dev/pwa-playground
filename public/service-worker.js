console.log('Service Worker!')

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});
