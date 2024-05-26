import { cleanupOutdatedCaches, precache } from 'workbox-precaching';
// see: https://vite-pwa-org.netlify.app/guide/inject-manifest.html#service-worker-code-3
declare let self: ServiceWorkerGlobalScope;

precache(self.__WB_MANIFEST);
console.log('test');

self.addEventListener('install', (_) => self.skipWaiting());

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

cleanupOutdatedCaches();

// const subscription = await self.registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: '123'
// })

self.addEventListener('push', (e) => {
  e.waitUntil(
    self.registration.showNotification('My push notification', {
      body: e.data?.text(),
    }),
  );
});

// self.registration.pushManager.subscribe({
//   userVisibleOnly: true,
// });

self.skipWaiting();
