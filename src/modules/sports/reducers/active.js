import { fromJS, OrderedMap } from 'immutable';
import { REQUEST_STATUS } from 'src/utils/constants';

const KEY = 'sports';

export function SPORTS_GET_ACTIVE_REQUEST(state) {
    return state.set(
        KEY,
        fromJS({
            state: REQUEST_STATUS.PROGRESS,
        }),
    );
}

export function SPORTS_GET_ACTIVE_ERROR(state, { errors }) {
    return state.set(
        KEY,
        fromJS({
            state: REQUEST_STATUS.ERROR,
            errors,
        }),
    );
}

export function SPORTS_GET_ACTIVE_FINISH(state, { sports }) {
    const sportsCollection = sports.reduce((acc, sport) => acc.set(sport.id, fromJS(sport)), OrderedMap());

    return state.set(
        KEY,
        fromJS({
            state: REQUEST_STATUS.ERROR,
            items: sportsCollection,
        }),
    );
}
