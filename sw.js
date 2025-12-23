self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const type = event.notification.data.type;

  // بناء الرابط الكامل للتوجيه
  const targetUrl = new URL(`./index.html?type=${type}`, self.location.origin)
    .href;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // إذا كان التطبيق مفتوحاً بالفعل، قم بتحديث الرابط والتركيز عليه
        for (let client of windowClients) {
          if (client.url.includes("index.html") && "focus" in client) {
            return client.navigate(targetUrl).then((c) => c.focus());
          }
        }
        // إذا كان مغلقاً، افتح نافذة جديدة
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
