const CACHE_NAME = "v1";
let assetsCache = [
    "/",
    "/index.html",
    "/navbar.html",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/about.html",
    // js
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/navbar.js",
    "/js/sw.js",
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
    "/css/font-awesome-4.7.0/css/font-awesome.min.css",
    // "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    // "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
    // "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0",
    // "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
    // assets
    "/assets/stadium1.png",
    "/assets/stadium2.png",
    "/assets/ball.jpg",
    "/assets/maulana.jpg"
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
            return fetch(event.request);
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