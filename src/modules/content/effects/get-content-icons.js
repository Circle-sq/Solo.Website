import { takeEvery, put } from 'redux-saga/effects';

import { finish, error, CONTENT_ICONS_REQUEST } from '../actions/get-content-icons';
import { getContentIcons } from '../services/get-content-icons';

const getContentIconsRequest = () =>
    function* ({ category }) {
        try {
            const icons = yield getContentIcons(category);

            yield put(finish(category, icons));
        } catch (e) {
            yield put(error(category, e.body || e.message));
        }
    };

const getContentIconList = () =>
    function* () {
        yield takeEvery(CONTENT_ICONS_REQUEST, getContentIconsRequest());
    };

export default function init(saga) {
    return [saga.run(getContentIconList())];
}
