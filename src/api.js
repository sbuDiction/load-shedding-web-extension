import { apiBaseUrl } from "./globals";

/**
 * 
 * @param area 
 * @returns 
 */
export const fetchAreaByText = (area) => new Promise(async resolve => {
    const request = new Request(`${apiBaseUrl}/api/search/areas?area=${area}`, {
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
    const request = new Request(`${apiBaseUrl}/api/search/nearby/area?lat=${coordinates.lat}&lon=${coordinates.lon}`, {
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
export const fetchLoadsheddingSchedule = (areaId) => new Promise(async resolve => {
    const request = new Request(`${apiBaseUrl}/api/area?id=${areaId}`, {
        method: 'GET'
    });
    await fetch(request)
        .then(res => res.json())
        .then(loadsheddingSchedule => {
            resolve(loadsheddingSchedule);
        });
});
