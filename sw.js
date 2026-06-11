const CACHE_NAME = "ajr-cache-v2";

// تثبيت السيرفس ووركر
self.addEventListener("install", e => {
  e.waitUntil(self.skipWaiting());
});

// تفعيله فوراً
self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

// كاش أساسي للملفات
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request);
    })
  );
});
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const type = event.notification.data.type;
  const targetUrl = `./index.html?type=${type}`;
  const CACHE_NAME = "ajr-cache-v2"; // غيّر الرقم كل مرة تحدّث

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (let client of windowClients) {
          if ("navigate" in client) {
            return client.navigate(targetUrl).then((c) => c.focus());
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
