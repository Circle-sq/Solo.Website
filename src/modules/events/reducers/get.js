import { fromJS } from 'immutable';
import { refreshEvent } from './modelsHelper';

export function EVENTS_GET_REQUEST(state, { id }) {
    return state.setIn(['items', id, '_state'], 'PROGRESS');
}

export function EVENTS_GET_ERROR(state, { id, errors }) {
    return state.setIn(['items', id, 'errors'], fromJS(errors)).setIn(['items', id, '_state'], 'ERROR');
}

export function EVENTS_GET_FINISH(state, { id, event }) {
    let eventData = event;

    try {
        const listToRefresh = [];

        refreshEvent(listToRefresh, eventData);

        $appState.models.refreshEventModels(listToRefresh);
    } catch (err) {
        console.error(err);
    }

    eventData = fromJS(eventData);

    // @FIXME: almost same method is used in `update` event
    eventData.get('markets').forEach((market) => {
        eventData = eventData.setIn(
            ['markets', market.get('id')],
            market.set('displayed', market.get('display') && !!market.get('selections').find((x) => x.get('display'))),
        );
    });

    const currentEvent = state.getIn(['items', id]);

    return state
        .setIn(['items', id], currentEvent !== undefined ? currentEvent.mergeDeep(eventData) : eventData)
        .setIn(['items', id, '_state'], 'READY')
        .setIn(['items', id, '_retrieved'], true);
}
