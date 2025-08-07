import { fromJS, OrderedMap } from 'immutable';
import { REQUEST_STATUS } from 'src/utils/constants';

const KEY = 'all';

export function SPORTS_GET_LIST_REQUEST(state) {
    return state.setIn([KEY, '_state'], REQUEST_STATUS.PROGRESS);
}

export function SPORTS_GET_LIST_ERROR(state, { errors }) {
    return state.setIn([KEY, '_state'], REQUEST_STATUS.ERROR).setIn([KEY, 'errors'], fromJS(errors));
}

export function SPORTS_GET_LIST_FINISH(state, { sports }) {
    const sportsCollection = sports.reduce((acc, sport) => acc.set(sport.id, fromJS(sport)), OrderedMap());

    return state.mergeIn(
        [KEY],
        fromJS({
            _state: REQUEST_STATUS.READY,
            items: sportsCollection,
        }),
    );
}
