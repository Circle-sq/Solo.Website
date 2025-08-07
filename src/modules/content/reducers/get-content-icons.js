import { fromJS } from 'immutable';

import { RequestStatus } from 'src/common/enums';

export function CONTENT_ICONS_REQUEST(state, { category }) {
    return state.setIn(['icons', category, '_state'], RequestStatus.Progress);
}

export function CONTENT_ICONS_ERROR(state, { category, errors }) {
    return state
        .setIn(['icons', category, '_state'], RequestStatus.Error)
        .setIn(['icons', category, 'errors'], fromJS(errors));
}

export function CONTENT_ICONS_FINISH(state, { category, items }) {
    return state
        .setIn(['icons', category, '_state'], RequestStatus.Ready)
        .setIn(['icons', category, 'items'], fromJS(items));
}
