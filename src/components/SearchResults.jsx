'use client'

import { useState } from "react";
import { registerPushServiceWorker } from "../helpers/registerServiceWorker";

const SearchResults = ({ results }) => {
    const [show, setShow] = useState(false);
    const [suburbs, setSuburbs] = useState([]);

    const handleSelection = (suburbs) => {
        setShow(true);
        setSuburbs(suburbs);
    }

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

    const renderSuburbs = () => {
        return (
            <>
                {suburbs.map((suburb, index) => (
                    <div className="card" key={index}>
                        <div className="card-body">
                            <div>
                                <small className="card-title">
                                    <span>{suburb.name}</span>
                                </small>
                            </div>
                            <button
                                id="subscribe"
                                className="btn btn-success btn-sm"
                                value={suburb.id}
                                onClick={handleSubscribe}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                ))
                }
            </>
        );
    }

    return (
        <>
            {
                show ? renderSuburbs()
                    :
                    results.map((town, index) => (
                        <div
                            key={index}
                            className={show ? "card btn btn-success m-2 hidden" : "card btn btn-success m-2"}
                            onClick={() => handleSelection(town.suburbs)}>
                            <div className="card-body">
                                <div>
                                    <h6 className="card-title">
                                        Found <strong>{town.suburbs.length}</strong> suburbs in <strong>{town.name}</strong>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </>
    );
}

export default SearchResults;