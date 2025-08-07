import { takeEvery, put } from 'redux-saga/effects';

import { error } from '../actions/get';
import { GET_MARKET_BY_ID_REQUEST } from '../actions/get-market-by-id';
import { update as updateEvent } from '../actions/update';
import * as service from '../services/events';

const getMarketById = () =>
    function* ({ eventId, marketId, translationData }) {
        try {
            const markets = yield service.getMarketById(eventId, marketId, translationData);
            const market = markets.find(({ id }) => id === marketId);

            const marketData = {
                id: eventId,
                markets: [market],
            };

            yield put(updateEvent(eventId, marketData));
        } catch (err) {
            yield put(error(err));
        }
    };

const getMarketByIdWatch = () =>
    function* () {
        yield takeEvery(GET_MARKET_BY_ID_REQUEST, getMarketById());
    };

export default function init(saga) {
    return [saga.run(getMarketByIdWatch())];
}
