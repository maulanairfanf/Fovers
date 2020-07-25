const CACHE_NAME = "v1";
let assetsCache = [
    "/",
    "/index.html",
    "/liga.html",
    "/team.html",
    // "/render/liga.html",
    "/navbar.html",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/about.html",
    // js
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/navbar.js",
    "/js/push.js",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/fromSave.js",
    // css
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/css/styles.css",
    // manifest
    "/manifest.json",
    // serviceworker
    "/service-worker.js",
    // link
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://api.football-data.org/v2/",
    // assets
    "/assets/stadium1.png",
    "/assets/stadium2.png",
    "/assets/ball.jpg",
    "/assets/maulana.jpg",
    "/assets/jugling.png",
    "/assets/kiper.png",
    "/assets/Fovers512x512.png",
    "/assets/Fovers384x384.png",
    "/assets/Fovers256x256.png",
    "/assets/Fovers192x192.png",
    "/assets/Fovers128x128.png",
    "/assets/Fovers96x96.png",
]


self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(assetsCache);
        })
    );
});


self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker : use assets from cache ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker : load assets form server ",
                event.request.url
            );
            return fetch(event.request, {
                method: "GET",
                withCredentials: true,
                mode: "no-cors",
                headers: {
                    "X-Auth-Token": "75ef90f669f94902b8d8408d3cd4289c"
                }
            })
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});