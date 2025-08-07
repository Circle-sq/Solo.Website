import get from 'lodash/get';

import type { SportModel } from 'src/appState/redux/types';
import { RouteName } from 'src/common/enums';
import type { CategoryIcons } from 'src/modules/content/types';

import type { RouteLink } from './types';

interface SportDetails {
    sport: SportModel;
    isLivePage: boolean;
    sportIcons: CategoryIcons;
    countEvents: (id: string) => { count: number; hasLive: boolean };
}

const detectSportsModalOptionRoute = (isLivePage: boolean, sportId: string): RouteLink => {
    const routeLink = isLivePage ? RouteName.InPlay : RouteName.Sport;
    const routeParams = { id: sportId };

    return {
        route: routeLink,
        params: routeParams,
    };
};

export const getSportDetails = ({ sport, isLivePage, sportIcons, countEvents }: SportDetails) => {
    const sportId = sport.id;
    const { count, hasLive } = countEvents(sportId);

    if (count === 0) {
        return null;
    }

    const { route, params } = detectSportsModalOptionRoute(isLivePage, String(sportId));

    const sportIcon = get(sportIcons, sportId);

    return { sportId, count, hasLive, route, params, sportIcon, sportName: sport.name };
};
