import { fromJS } from 'immutable';

export function COMPETITIONS_UPDATE(_state, { competitions }) {
    let state = _state;

    try {
        const listToRefresh = [];

        for (const item of Object.values(competitions)) {
            listToRefresh.push({
                type: 'competition',
                competitionId: item.id,
                data: item,
            });
        }

        $appState.models.refreshEventModels(listToRefresh);
    } catch (err) {
        console.error(err);
    }

    competitions.forEach((competition) => {
        state = state.mergeIn(['items', competition.id], fromJS(competition));
    });

    return state;
}
