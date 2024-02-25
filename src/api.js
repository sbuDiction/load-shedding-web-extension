import { apiBaseUrl } from "./globals";

/**
 * 
 * @param area 
 * @returns 
 */
export const fetchAreaByText = (suburb) => new Promise(async resolve => {
    const request = new Request(`${apiBaseUrl}/search?text=${suburb}`, {
        method: 'GET'
    });
    await fetch(request)
        .then(res => res.json())
        .then(areas => {
            resolve(areas);
        });
});
/**
 * This function is for nearby search using device GPS 
 * @param {{ lat: number, lon: number }} coordinates 
 */
export const fetchAreaByGPS = (coordinates) => new Promise(async resolve => {
    const request = new Request(`${apiBaseUrl}/search/nearby/area?lat=${coordinates.lat}&lon=${coordinates.lon}`, {
        method: 'GET'
    });
    await fetch(request)
        .then(res => res.json())
        .then(areas => {
            resolve(areas);
        })
});
/**
 * 
 * @param {string} areaId 
 * @returns 
 */
export const fetchLoadsheddingSchedule = (sid) => new Promise(async resolve => {
    const request = new Request(`${apiBaseUrl}/schedule?id=${sid}`, {
        method: 'GET'
    });
    await fetch(request)
        .then(res => res.json())
        .then(loadsheddingSchedule => {
            resolve(loadsheddingSchedule);
        });
});
