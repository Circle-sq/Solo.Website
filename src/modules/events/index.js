import initGetEffects from './effects/get';
import initGetMarketByIdEffect from './effects/get-market-by-id';
import * as getEvent from './reducers/get';
import * as getMarketTemplates from './reducers/get-market-templates';
import * as query from './reducers/query';
import * as update from './reducers/update';
import * as updateMarket from './reducers/update-market';

export const reducers = {
    ...getEvent,
    ...query,
    ...update,
    ...updateMarket,
    ...getMarketTemplates,
};

export function init(saga, app) {
    return [].concat(initGetEffects, initGetMarketByIdEffect).map((init) => init(saga, app));
}
