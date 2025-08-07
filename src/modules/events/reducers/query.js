import { fromJS, Map, List } from 'immutable';

export function EVENTS_QUERY_FINISH(state, { id, events, _aggregations, total }) {
    // @TODO: Think about this logic; maybe lastAggregations instead?
    let aggregations = _aggregations;

    const oldAggregations = state.getIn(['collections', id, 'aggregations'], new Map());
    let newAggregations = oldAggregations.mergeDeep(aggregations);

    // this code acumulates all events requested inside a collection, we use this for emulating lazy loading
    const oldItems = state.getIn(['collections', id, 'acumulatedItems'], List());
    const newItems = oldItems.concat(events.filter((e) => oldItems.indexOf(e) < 0));

    aggregations = fromJS(aggregations);

    oldAggregations.forEach((_values, key) => {
        let values = _values;
        values = values.concat(newAggregations.get(key, new List()));

        values = values.filter((x, idx) => {
            return values.findIndex((y) => x.get('id') === y.get('id')) === idx;
        });

        newAggregations = newAggregations.set(key, values);
    });

    return state
        .setIn(['collections', id, 'items'], fromJS(events))
        .setIn(['collections', id, 'acumulatedItems'], fromJS(newItems))
        .setIn(['collections', id, 'aggregations'], newAggregations)
        .setIn(['collections', id, 'lastAggregations'], aggregations)
        .setIn(['collections', id, '_state'], 'READY')
        .setIn(['collections', id, 'total'], total);
}

export function EVENTS_COUNTER_QUERY_FINISH(state, { id, counters, country, competitions, total }) {
    return state
        .setIn(['collections', id, 'counters'], fromJS(counters))
        .setIn(['collections', id, 'country'], fromJS(country))
        .setIn(['collections', id, 'competitions'], fromJS(competitions))
        .setIn(['collections', id, '_state'], 'READY')
        .setIn(['collections', id, 'total'], total);
}
