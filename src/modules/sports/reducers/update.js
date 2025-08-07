import { fromJS } from 'immutable';

export function SPORTS_UPDATE(_state, { sports }) {
    let state = _state;
    sports.forEach((sport) => {
        state = state.mergeIn(['sports', 'items', sport.id], fromJS(sport));
    });

    return state;
}
