self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const type = event.notification.data.type;
  const targetUrl = `./index.html?type=${type}`;

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
