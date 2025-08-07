import * as update from './reducers/update';
import * as getList from './reducers/get-list';
import * as getActive from './reducers/active';
import * as getCompetitionLocations from './reducers/get-competitions-locations-list';
import initGetListEffects from './effects/get-list';
import initGetActiveList from './effects/active';
import initGetCompetitionLocationsListEffects from './effects/get-competitions-locations-list';

export const reducers = {
    ...update,
    ...getList,
    ...getActive,
    ...getCompetitionLocations,
};

export function init(saga, app) {
    return []
        .concat(initGetListEffects, initGetActiveList, initGetCompetitionLocationsListEffects)
        .map((init) => init(saga, app));
}
