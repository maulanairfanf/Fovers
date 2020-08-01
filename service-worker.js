importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([{
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/liga.html',
        revision: '1'
    },
    {
        url: '/team.html',
        revision: '1'
    },
    {
        url: '/navbar.html',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/db.js',
        revision: '1'
    },
    {
        url: '/js/fromSave.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/navbar.js',
        revision: '1'
    },
    {
        url: '/js/notification.js',
        revision: '1'
    },
    {
        url: '/js/push.js',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/css/styles.css',
        revision: '1'
    },
    {
        url: '/assets/ball.jpg',
        revision: '1'
    },
    {
        url: '/assets/jugling.png',
        revision: '1'
    },
    {
        url: '/assets/kiper.png',
        revision: '1'
    },
    {
        url: '/assets/maulana.jpg',
        revision: '1'
    },
    {
        url: '/assets/stadium1.png',
        revision: '1'
    },
    {
        url: '/assets/stadium2.png',
        revision: '1'
    },
    {
        url: '/assets/Fovers96x96.png',
        revision: '1'
    },
    {
        url: '/assets/Fovers128x128.png',
        revision: '1'
    },
    {
        url: '/assets/Fovers192x192.png',
        revision: '1'
    },
    {
        url: '/assets/Fovers256x256.png',
        revision: '1'
    },
    {
        url: '/assets/Fovers384x384.png',
        revision: '1'
    },
    {
        url: '/assets/Fovers512x512.png',
        revision: '1'
    },
    {
        url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        revision: '1'
    },
    {
        url: 'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
        revision: '1'
    },
    {
        url: 'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
        revision: '1'
    },

]);


workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'url'
    })
);

workbox.routing.registerRoute(
    new RegExp('liga.html'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('team.html'),
    workbox.strategies.staleWhileRevalidate()
);

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