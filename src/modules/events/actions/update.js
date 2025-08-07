import normalize from '../helpers/parse';

export function update(id, event) {
    event.id = id;

    return bulk([event]);
}

export function updateMedia(id, event) {
    event.id = id;

    return bulkMedia([event]);
}

export function bulk(events) {
    return (dispatch) => {
        dispatch({
            type: 'EVENTS_UPDATE',
            events: events.map(normalize),
        });
    };
}

export function bulkMedia(_events) {
    let events = _events;
    events = events.map(normalize);

    return (dispatch) => {
        dispatch({
            type: 'EVENTS_UPDATE_MEDIA',
            events,
        });
    };
}
