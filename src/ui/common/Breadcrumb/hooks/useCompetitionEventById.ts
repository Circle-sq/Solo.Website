import get from 'lodash/get';
import { useSelector } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import { getLocationTags } from 'src/appState/models/models/helpers';
import { competitionLocationItemsBySportSelector } from 'src/modules/sports/selectors';
import { NA, TAGS } from 'src/utils/constants';

import type { CompetitionDetails } from '../types';

export const useCompetitionEventById = (): CompetitionDetails | undefined => {
    const {
        router: {
            route: { params: routeParam },
        },
        models,
    } = useAppStateContext();

    const event = models.getEvent(Number(routeParam.id));
    const competitionLocation = useSelector(competitionLocationItemsBySportSelector(event?.sport));
    const competition = competitionLocation.find((item) => item.id === String(event?.competitionId));

    if (event === null) {
        return;
    }

    return {
        id: String(event.competitionId),
        name: event.translations?.competition ?? NA,
        originalSport: get(event.getRawData(), `tags.${TAGS.OriginalSport}.0`, ''),
        sport: event.sport,
        displayOrder: competition?.displayOrder ?? 0,
        platformObject: competition?.platformObject ?? null,
        tags: getLocationTags(event),
        ...competition,
    };
};
