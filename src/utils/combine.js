import { Map } from 'immutable';

export default function combine(reducers) {
    return function (state = new Map(), action) {
        if (reducers[action.type]) {
            return reducers[action.type](state, action);
        }

        return state;
    };
}
