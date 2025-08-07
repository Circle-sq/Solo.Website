import { fromJS } from 'immutable';

import { refreshEvent } from './modelsHelper';

export function EVENTS_UPDATE(_state, { events }) {
    //console.info('ACTION update event2', events);
    let state = _state;

    try {
        const listToRefresh = [];

        for (const event of Object.values(events)) {
            refreshEvent(listToRefresh, event);
        }

        $appState.models.refreshEventModels(listToRefresh);
    } catch (err) {
        console.error(err);
    }

    events.forEach((_event) => {
        let event = _event;
        event = fromJS(event);

        if (event.get('markets')) {
            const marketsNew = event.get('markets');
            const oldMarktets = state.getIn(['items', event.get('id'), 'markets']);

            if (oldMarktets) {
                event = event.set('markets', oldMarktets.mergeDeep(marketsNew));
            }
        }

        if (event.get('participants')) {
            //TODO - to remove ?
            const oldParticipants = state.getIn(['items', event.get('id'), 'participants']);

            if (oldParticipants) {
                event = event.set('participants', oldParticipants.mergeDeep(event.get('participants')));
            }
        }

        state = state.mergeDeepIn(['items', event.get('id')], event);

        event = state.getIn(['items', event.get('id')]);

        // @FIXME: almost same method is used in `get` event
        // @FIXME: Removed this temporarily because of ante-post query
        event.get('markets').forEach((market) => {
            state = state.setIn(
                ['items', event.get('id'), 'markets', market.get('id')],
                market.set(
                    'displayed',
                    market.get('display') && !!market.get('selections').find((x) => x.get('display')),
                ),
            );
        });
    });

    return state;
}

export function EVENTS_UPDATE_MEDIA(_state, { events }) {
    let state = _state;

    try {
        const listToRefresh = [];

        for (const event of Object.values(events)) {
            refreshEvent(listToRefresh, event);
        }

        $appState.models.refreshEventModels(listToRefresh);
    } catch (err) {
        console.error(err);
    }

    events.forEach((_event) => {
        let event = _event;
        event = fromJS(event);

        state = state.mergeIn(['items', event.get('id')], event);
    });

    return state;
}
