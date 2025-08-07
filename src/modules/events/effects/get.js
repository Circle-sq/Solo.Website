import { put, takeEvery } from 'redux-saga/effects';

import { bulk as updateCompetitions } from '../../competitions/actions/update';
import { bulk as updateSports } from '../../sports/actions/update';
import { finish, error } from '../actions/get';
import * as service from '../services/events';

const UPDATE_ACTIONS = {
    competitions: updateCompetitions,
    sports: updateSports,
};

const getEvent = () =>
    function* ({ id, shouldExtractMarkets }) {
        try {
            const data = yield service.getOne(id, shouldExtractMarkets);

            for (const key of Object.keys(data).filter((k) => UPDATE_ACTIONS[k])) {
                yield put(UPDATE_ACTIONS[key](data[key]));
            }
            yield put(finish(id, data.event));
        } catch (e) {
            yield put(error(id, e.body || e.message));
        }
    };

const getEventWatch = () =>
    function* () {
        yield takeEvery(['EVENTS_GET_REQUEST', 'EVENTS_REFRESH_REQUEST'], getEvent());
    };

export default function init(saga) {
    return [saga.run(getEventWatch())];
}
