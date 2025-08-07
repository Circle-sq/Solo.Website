import { takeEvery, put, fork } from 'redux-saga/effects';

import { finish, error } from '../actions/active';
import * as service from '../services/sports';

function* getSports() {
    try {
        const response = yield service.getActiveSports();

        yield put(finish(response));
    } catch (e) {
        yield put(error(e.body || e.message));
    }
}

const query = () =>
    function* () {
        yield fork(getSports);
    };

const getSportsQuery = () =>
    function* () {
        yield takeEvery('SPORTS_GET_ACTIVE_REQUEST', query());
    };

export default function init(saga) {
    return [saga.run(getSportsQuery())];
}
