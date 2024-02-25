import { apiBaseUrl } from "../globals";
let endpoint;
let key;
let authSecret;


const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

/**
 * Function to register a Service Worker.
 * @param {string} apiBaseUrl Server url
 * @param {string} areaId 
 */
export const registerPushServiceWorker = (areaId) => new Promise(resolve=>{
    navigator.serviceWorker.register('service-worker.js')
        .then(async function (registration) {
            // Use the PushManager to get the user's subscription to the push service.

            //service worker.ready will return the promise once the service worker is registered. This can help to get rid of
            //errors that occur while fetching subscription information before registration of the service worker

            return navigator.serviceWorker.ready.then(async function (serviceWorkerRegistration) {
                return serviceWorkerRegistration.pushManager.getSubscription()
                    .then(async function (subscription) {
                        // If a subscription was found, return it.
                        if (subscription) {
                            return subscription;
                        }

                        const response = await fetch(`${apiBaseUrl}/vapidPublicKey`, { method: 'GET' });
                        const vapidPublicKey = await response.text();
                        console.log(vapidPublicKey);
                        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                        // send browser push notifications that don't have a visible effect for the user).
                        return serviceWorkerRegistration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertedVapidKey,
                        });
                    });

            });

        }).then(function (subscription) { //chaining the subscription promise object
            // Retrieve the user's public key.
            let rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
            key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
            let rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';

            endpoint = subscription.endpoint;
            // Send the subscription details to the server using the Fetch API.
            const request = new Request(`${apiBaseUrl}/subscription`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    subscription,
                    areaId
                })
            });

            fetch(request).then(res => res.json()).then(res => {
                console.log(res);
                resolve(res);
            })
        });
})
