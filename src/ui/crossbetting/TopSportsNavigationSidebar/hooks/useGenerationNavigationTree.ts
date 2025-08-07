import { useSelector } from 'react-redux';
import orderBy from 'lodash/orderBy';

import { competitionLocationSportsSelector } from 'src/modules/sports/selectors';
import useCrossBetSportCounters from 'src/ui/crossbetting/hooks/useCrossBetSportCounters';
import { buildCrossBetNavigationLinks } from 'src/ui/crossbetting/NavigationSidebar/buildNavigationLinks';
import type { SportType } from 'src/common/enums';
import { useAppStateContext } from 'src/appState/AppState';

import { useDataCountryCompetitions } from '../../hooks/useDataCountryCompetitions';

import type { GenerationNavigationTreeType } from './types';

export const useGenerationNavigationTree = () => {
    const counterLinks = useCrossBetSportCounters();
    const {
        language: { getTranslation, getTranslationsReverse },
    } = useAppStateContext();
    const [, ...countersSortedFilter] = orderBy(counterLinks, 'displayOrder', 'desc');
    const { competitions = [] } = useDataCountryCompetitions();
    const competitionLocationsBySport = useSelector(competitionLocationSportsSelector);

    return countersSortedFilter.reduce((acc, cv) => {
        const currentSport = cv.sportId;

        const competitionLocations =
            competitionLocationsBySport && competitionLocationsBySport[currentSport as SportType];

        const crossBetLinks = buildCrossBetNavigationLinks(
            competitions,
            competitionLocations,
            currentSport as SportType,
            getTranslation,
            getTranslationsReverse,
        );

        acc.push({
            ...countersSortedFilter.find((x) => x.sportId === currentSport),
            children: crossBetLinks,
        } as GenerationNavigationTreeType);

        return acc;
    }, [] as GenerationNavigationTreeType[]);
};
