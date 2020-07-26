var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BBQhA2diN6LUIJK8cFXPhehrK6kxjOOomIzB_8Y7UA77UMUYNF6N6X_wFvSITdH7vR7i9m7FflVyKrwzfOw4h1Y",
    "privateKey": "sHFUm2HIq5SCbb9U0dLp3B8iR58gJUUyOhFkvOE0ST4"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dgVgtDrbk6s:APA91bFJEWAYcp_NJLk56E-8NqxUAdAuhGtUQV1VNt6kQkqkWtDv-d-QHqsfNUv3jOBTPLa_scxZLWBH-LmgVnplEgg3FWLTCA-rT5huCGxGu_JcMazjpjHN_fCOUz12MBx5DkhqBuyi",
    "keys": {
        "p256dh": "BA1G/68m58/kOC5XNWB1BQgGFKqsMlJRRCBh6RhqDGtWhdTOEKM1YuwXjd2oO6irtflcWzaF2ldyopiU53Aga4w=",
        "auth": "QAG/EyOPgZ8pRxLzd0Hdtw=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '954353441504',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);