/* FitTrack Service Worker · caché offline + notificaciones */
const CACHE = "fittrack-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./favicon.png"
];

// Instalar: precachear el shell de la app
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
});

// Mensajes: permite activar la actualización cuando el usuario lo confirme
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

// Activar: limpiar cachés viejos
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first (todo el HTML y las imágenes van embebidas, así que basta con servir del caché)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        // Guardar en caché copias de recursos del mismo origen
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});

// Mensajes desde la app: programar un recordatorio con retraso
self.addEventListener("message", (e) => {
  const d = e.data || {};
  if (d.type === "notify" && d.delay >= 0) {
    setTimeout(() => {
      self.registration.showNotification(d.title || "FitTrack", {
        body: d.body || "",
        icon: "./icons/icon-192.png",
        badge: "./icons/icon-96.png",
        tag: d.tag || "fittrack",
        renotify: true
      });
    }, d.delay);
  }
});

// Al tocar la notificación, abrir/enfocar la app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => {
      for (const c of cs) { if ("focus" in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow("./index.html");
    })
  );
});
