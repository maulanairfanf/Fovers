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
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/clSdIHYL09k:APA91bFvb7KCAVcS4N4HmLhnVmNLmTgZqXiU3tXK_OWFP44_r8OqDdLet8bGbrCRjRq7Ww-wPqmUK3A40C24v-H6jZ09JRTl7o2BBYL5FDu2Rr2aaDodUD1j3XY3VXKjaBsjCXoX8XUE",
    "keys": {
        "p256dh": "BB6YyOfoT6yFhjlT0LB4s2F1niZ7vU3aqky2MlWa8824z+oCoaMDcRCf1UOWqI7I5AqztlkIl6Yx3ulG02m92jE=",
        "auth": "3GVvV3jN/ZZOz2tiW3KK9A=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '954353441504',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);