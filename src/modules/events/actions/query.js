import map from 'lodash/map';

import { bulk as update } from './update';

export function finish(id, events, aggregations = {}, total, async = true) {
    return (dispatch) => {
        if (id !== 'recently-view-events') {
            dispatch(update(events));
        }

        const eventsIds = map(events, 'id');

        dispatch({
            type: 'EVENTS_QUERY_FINISH',
            async: async ? 'end' : false,
            clientOnly: !async,
            aggregations,
            events: eventsIds,
            total,
            id,
        });
    };
}

export function finishCounters(id, counters = {}, country = {}, competitions = {}, total, async = true) {
    return (dispatch) => {
        dispatch({
            type: 'EVENTS_COUNTER_QUERY_FINISH',
            async: async ? 'end' : false,
            clientOnly: !async,
            counters,
            country,
            competitions,
            total,
            id,
        });
    };
}
