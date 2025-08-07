import { fromJS } from 'immutable';

import { IconCategory } from 'src/common/enums';

import { ReduxState } from './ReduxState';

const state = {
    content: fromJS({
        icons: {
            [IconCategory.Competitions]: {
                items: {
                    111: {
                        url: 'iconUrl',
                    },
                },
            },
        },
    }),
    competitions: fromJS({}),
    events: fromJS({}),
    media: fromJS({}),
    sports: fromJS({}),
};

describe('getCompetitionIconUrl', () => {
    it('should return competition icon url', () => {
        const reduxState = ReduxState.createForContext();
        reduxState._state = { ...state };

        const expectedIconUrl = 'iconUrl';

        expect(reduxState.getCompetitionIconUrl({ id: 111 })).toEqual(expectedIconUrl);
    });
    it('should not find competition with icon url', () => {
        const reduxState = ReduxState.createForContext();
        reduxState._state = { ...state };

        expect(reduxState.getCompetitionIconUrl({ id: 222 })).toBeUndefined();
    });
});
