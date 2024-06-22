'use strict';

let APP_DATA = null

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  console.log(`Message received`, event);

  if (event.data.type === 'init') {
    APP_DATA = event.data.data
  }
})

self.addEventListener('push', async (event) => {
  console.log('Received a push message', event);

  if (!APP_DATA) {
    console.log('No app data')
    return
  }

  event.waitUntil(self.registration.showNotification(APP_DATA.content.name, {
    body: 'Привет!',
    icon: APP_DATA.icons[0].src
  }));
});
