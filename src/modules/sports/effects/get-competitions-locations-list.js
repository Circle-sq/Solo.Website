import { fork, put, takeEvery } from 'redux-saga/effects';

import {
    error,
    finish,
    GET_COMPETITIONS_LOCATION_LIST_REQUEST,
} from 'src/modules/sports/actions/get-competitions-locations-list';
import * as service from 'src/modules/sports/services/sports';

function* getCompetitionsLocationList(query) {
    try {
        const response = yield service.getCompetitions(query);

        yield put(finish(response, query));
    } catch (e) {
        yield put(error(e.body || e.message));
    }
}

const query = () =>
    function* (query) {
        yield fork(getCompetitionsLocationList, query);
    };

const getQuery = () =>
    function* () {
        yield takeEvery(GET_COMPETITIONS_LOCATION_LIST_REQUEST, query());
    };

export default function init(saga) {
    return [saga.run(getQuery())];
}
