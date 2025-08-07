import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { RouteName } from 'src/common/enums';
import type { CompetitionLocationItem } from 'src/modules/sports/types';

import type { CompetitionLocation } from './types';

interface CompetitionLocationParams {
    locationKey: string;
    locationLabel: string;
    competitionId: string | null;
    competitionName: string | null;
    isCompetition: boolean;
    competitionLocationItem?: CompetitionLocationItem;
}

export function getItemByCompetitionLocation(
    detectedGroup: CompetitionLocationItem[],
    { labelSelector, tagSelector: locationKey }: CompetitionLocation,
    routeName: string,
    id?: string,
): CompetitionLocationParams {
    const detectId = routeName === RouteName.Competition ? 'id' : locationKey;
    const competitionLocationItem = detectedGroup.find((item) => get(item, detectId) === id?.toString());

    return {
        locationLabel: get(competitionLocationItem, labelSelector),
        locationKey: get(competitionLocationItem, locationKey),
        competitionId: get(competitionLocationItem, 'id', null),
        competitionName: get(competitionLocationItem, 'name', null),
        isCompetition: !isEmpty(detectedGroup),
        competitionLocationItem,
    };
}
