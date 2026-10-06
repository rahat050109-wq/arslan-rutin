const CACHE = 'arslan-v1';
const FILES = ['./index.html', './manifest.json'];

// Kurulum
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

// Aktifleştir
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Offline çalışma
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Bildirim al
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Arslan', {
      body: data.body || 'Görev zamanı!',
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'arslan',
      requireInteraction: false
    })
  );
});

// Bildirime tıklanınca uygulamayı aç
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./index.html'));
});
