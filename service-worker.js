const CACHE_NAME = "v1";
let assetsCache = [
    "/",
    "/index.html",
    // "/render/liga.html",
    "/navbar.html",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/about.html",
    // js
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/navbar.js",
    "/js/sw.js",
    "/js/country.js",
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
    var base_url = "http://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
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