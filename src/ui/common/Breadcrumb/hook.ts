import dropRightWhile from 'lodash/dropRightWhile';
import includes from 'lodash/includes';
import last from 'lodash/last';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppStateContext } from 'src/appState/AppState';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';
import { getStorageBuilder } from 'src/utils/StorageService';

export const useGoBack = (): (() => void) => {
    const localStorage = getStorageBuilder();
    const visitedFromStorage = localStorage('CG_RecentlyVisited');
    const routeFromStorage = localStorage('cameFromRouteName');
    const { router } = useAppStateContext();
    const history = useHistory();

    const sport = useMemo<{ type: string } | undefined>(() => {
        const visitedItems = JSON.parse(visitedFromStorage.getItem() ?? '{}');

        return last(dropRightWhile(visitedItems, { type: 'event' }));
    }, [visitedFromStorage]);

    const fromRoute = useMemo(() => routeFromStorage.getItem(), [routeFromStorage]);

    const { sport: sportRoute, competition, country, inplay, homepage, asianview } = PAGE_ROUTE_NAME;

    const isRoutesOfInterest = sport !== null && includes([sportRoute, competition, country], fromRoute);
    const isOtherRoutes = includes([inplay, homepage, competition, asianview], fromRoute);

    return () => {
        if (isRoutesOfInterest || isOtherRoutes) {
            history.go(-1);

            return;
        }
        router.redirect(homepage, {});
    };
};
