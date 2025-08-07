import { fromJS, OrderedMap } from 'immutable';

import { REQUEST_STATUS } from 'src/utils/constants';

export const MARKET_TEMPLATES_REQUEST = (state, action) => {
    const { sport } = action;

    return state.setIn(
        ['marketTemplates', sport],
        fromJS({
            state: REQUEST_STATUS.PROGRESS,
            items: [],
        }),
    );
};

export const MARKET_TEMPLATES_FINISH = (state, action) => {
    const { sport, data } = action;

    return state.setIn(
        ['marketTemplates', sport],
        fromJS({
            state: REQUEST_STATUS.READY,
            items: data.reduce((acc, group) => {
                const [groupId, templates] = group;

                return acc.set(groupId, fromJS(templates));
            }, OrderedMap()),
        }),
    );
};

export const MARKET_TEMPLATES_ERROR = (state, action) => {
    const { sport, errors } = action;

    return state.setIn(
        ['marketTemplates', sport],
        fromJS({
            state: REQUEST_STATUS.ERROR,
            items: [],
            errors,
        }),
    );
};
