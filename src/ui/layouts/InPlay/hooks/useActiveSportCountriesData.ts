import get from 'lodash/get';

import { useAppStateContext } from 'src/appState/AppState';
import type { SportModelType, SportCount } from 'src/appState/sportsList/types';
import { RouteName } from 'src/common/enums';
import { SPORT_ICONS } from 'src/config/sport-icons';
import type { Navigate } from 'src/ui/common/SubNavigation/types';

import { sportCounterGuard } from '../helpers';
import type { InPlayCounters, AggregationLocation } from '../types';

export const useActiveSportCountriesData = (inPlayCounters: InPlayCounters[]) => {
    const {
        sportsList: { sports },
        router: {
            route: {
                params: { id: sportId },
            },
        },
    } = useAppStateContext();

    const activeSports = sports.reduce((acc: Navigate[], x: SportModelType) => {
        const counter = inPlayCounters.find((y: SportCount) => y.id === x.id);
        const isSportSelected = sportId === x.id;
        const handleCounter = sportCounterGuard(counter) ? counter.count : undefined;

        return counter !== undefined || isSportSelected
            ? [
                  ...acc,
                  {
                      route: RouteName.InPlay,
                      params: { id: x.id },
                      count: handleCounter,
                      icon: SPORT_ICONS[x.id] ?? SPORT_ICONS.default,
                      label: x.label,
                      text: x.label,
                      testId: `liveSport-${x.id}`,
                  },
              ]
            : acc;
    }, []);

    const sport = inPlayCounters.find((sport: SportCount) => sport.id === sportId);

    const selectedSportCountries = get(sport, 'countries', []) as AggregationLocation[];

    return { activeSports, selectedSportCountries };
};
