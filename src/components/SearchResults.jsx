import { registerPushServiceWorker } from "../helpers/registerServiceWorker";

const SearchResults = ({ results }) => {

    const checkPermission = () => {
        if (!('serviceWorker' in navigator)) {
            throw new Error("No support for service worker!")
        }

        if (!('Notification' in window)) {
            throw new Error("No support for notification API");
        }

        if (!('PushManager' in window)) {
            throw new Error("No support for Push API")
        }
    }

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();

        if (permission !== 'granted') {
            throw new Error("Notification permission not granted");
        }

    }


    const handleSubscribe = async (event) => {
        localStorage.setItem('area_id', event.target.value);
        checkPermission();
        await requestNotificationPermission();
        await registerPushServiceWorker(event.target.value).then(res => {
            window.location.reload();
        });
    }

    return (
        <>
            {
                results.map((suburb, index) => (
                    <div className="card" key={index}>
                        <div className="card-body text-center">
                            <div>
                                <small className="card-title">
                                    <small>{`${suburb.region} ${suburb.name}`}</small>
                                </small>
                            </div>

                        </div>
                        <button
                            id="subscribe"
                            className="btn btn-success btn-sm"
                            value={suburb.sid}
                            onClick={handleSubscribe}>
                            Subscribe
                        </button>
                    </div>
                ))
            }
        </>
    );
}

export default SearchResults;