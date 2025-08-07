import { takeEvery, put } from 'redux-saga/effects';

import { add } from '../actions/recently-viewed';

// Handle routing

const handleRouting = (app) =>
    function* ({ name, params }) {
        let label;

        if (name === 'event' || (name === 'sport' && params.eventId)) {
            const id = parseInt(params.eventId || params.id, 10);

            label = app.store.getState().events.getIn(['items', id, 'name']);
        } else if (name === 'sport') {
            label = app.store.getState().sports.getIn(['sports', 'items', params.id, 'name']) || params.id;
        } else {
            return;
        }

        yield put(
            add({
                route: name,
                params,
                label,
            }),
        );
    };

const handleRoutingWatcher = (app) =>
    function* () {
        yield takeEvery('ROUTER_ROUTE', handleRouting(app));
    };

export default function init(saga, app) {
    return [saga.run(handleRoutingWatcher(app))];
}
