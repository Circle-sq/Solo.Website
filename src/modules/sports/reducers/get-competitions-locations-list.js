import { fromJS } from 'immutable';

import { REQUEST_STATUS } from 'src/utils/constants';

export function GET_COMPETITIONS_LOCATION_LIST_REQUEST(state) {
    return state.setIn(['competitionLocations', 'state'], REQUEST_STATUS.PROGRESS);
}

export function GET_COMPETITIONS_LOCATION_LIST_ERROR(state, { errors }) {
    return state.set(
        'competitionLocations',
        fromJS({
            state: REQUEST_STATUS.ERROR,
            errors: fromJS(errors),
        }),
    );
}

export function GET_COMPETITIONS_LOCATION_LIST_FINISH(
    state,
    {
        competitionLocations,
        query: {
            query: { sport },
        },
    },
) {
    const updatedState = state;

    const oldCompetitionLocations = updatedState.get('competitionLocations').toJS();

    if (competitionLocations.length === 0) {
        return updatedState.set(
            'competitionLocations',
            fromJS({
                state: REQUEST_STATUS.READY,
                items: [],
                sports: oldCompetitionLocations.sports,
            }),
        );
    }

    return updatedState.set(
        'competitionLocations',
        fromJS({
            state: REQUEST_STATUS.READY,
            items: competitionLocations,
            sports: { ...oldCompetitionLocations.sports, [sport]: competitionLocations },
        }),
    );
}
