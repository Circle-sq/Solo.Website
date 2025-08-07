import { fromJS } from 'immutable';

export function SET_EVENT_FILTER(state, { name, value }) {
    return state.mergeIn(['filters'], fromJS({ ...state, [name]: value }));
}
