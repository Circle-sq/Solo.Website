import initContentIconsEffects from './effects/get-content-icons';
import initRecentlyViewed from './effects/recently-viewed';
import * as eventFilters from './reducers/event-filters';
import * as contentIcons from './reducers/get-content-icons';
import * as recentlyViewed from './reducers/recently-viewed';

export const reducers = {
    ...recentlyViewed,
    ...eventFilters,
    ...contentIcons,
};

export function init(saga, app) {
    return [].concat(initRecentlyViewed, initContentIconsEffects).map((init) => init(saga, app));
}
