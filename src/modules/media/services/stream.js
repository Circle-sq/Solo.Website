import { api } from '@sc-api/api';

export function getStreams() {
    return api.get('/streams/events');
}

export function getBetradarStreamUrl(data) {
    return api.post('/streams/bet-radar/generate/url', data);
}

export function getPerformStreamUrl(data) {
    return api.post('/streams/img-feed/perform/stream', data);
}

export function getImgStreamToken(data) {
    return api.post('/streams/img/generate/token', data);
}

export async function getImgStreamUrl(streamId, auth, timestamp, operatorId, img_api_url) {
    const request = new Request(
        `${img_api_url}/streaming/events/${streamId}/stream?auth=${auth}&timestamp=${timestamp}&operatorId=${operatorId}`,
    );

    return fetch(request).then((response) => response.json());
}

export function getGLiveStreamUrl(data) {
    return api.post('/streams/glive/generate/url', data);
}

export function getBetGeniusStreamUrl(data) {
    return api.post('/streams/bet-genius/generate/url', data);
}

export function getBayesStreamUrl(data) {
    return api.post('/streams/bayes/generate/url', data);
}
