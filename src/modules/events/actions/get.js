import normalize from '../helpers/parse';

export function request(id, type = 'EVENTS_GET_REQUEST', shouldExtractMarkets = true) {
    return {
        type,
        async: 'start',
        id: Number(id),
        shouldExtractMarkets,
    };
}

export function refreshEvent(id) {
    return request(id, 'EVENTS_REFRESH_REQUEST');
}

export function error(id, errors) {
    return {
        type: 'EVENTS_GET_ERROR',
        async: 'end',
        errors,
        id: Number(id),
    };
}

export function finish(id, event) {
    const normalizedEvent = normalize(event);

    return (dispatch) =>
        dispatch({
            type: 'EVENTS_GET_FINISH',
            async: 'end',
            event: normalizedEvent,
            id: Number(id),
        });
}
