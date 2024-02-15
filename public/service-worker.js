
let url = [];
let count = 0;

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting()); //will install the service worker
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); //will activate the serviceworker
});

// Register event listener for the 'notificationclick' event.
// self.addEventListener('notificationclick', (event) => {
//     event.notification.close();

//     event.waitUntil(
//         clients.matchAll({
//             type: "window"
//         })
//             .then((clientList) => {

//                 if (clients.openWindow) {
//                     let c = count;
//                     count++;
//                     return clients.openWindow(url[c]);
//                 }
//             })
//     );

// });


self.addEventListener('push', (event) => {
    event.waitUntil(
        self.registration.pushManager.getSubscription()
            .then((subscription) => {
                const { title, body, icon } = event.data.json();
                let payload = {
                    title: title,
                    body: body,
                    // icon: 'https://static.cronj.com/img/logos/cronj-logo.png',
                    // url: 'https://www.cronj.com'
                };


                // url.push(payload.url);
                return self.registration.showNotification(payload.title, {
                    body: payload.body,
                    // icon: payload.icon,
                    // tag: payload.url + payload.body + payload.icon + payload.title
                });
            })
    );
});