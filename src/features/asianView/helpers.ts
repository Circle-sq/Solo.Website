import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import reject from 'lodash/reject';
import some from 'lodash/some';

import type { SelectionIdentifier, SportType } from 'src/common/enums';
import type { TimeSettings } from 'src/common/types/event';
import type { Participant, SelectionItem } from 'src/store/events/types';

import { eSportIds, eSportsSportType, twoRowStyleSports } from './constants';
import type { AggregatedSport, GroupedSports, ESports } from './types';

export const isLiveEvent = ({ timeSettings }: { timeSettings?: TimeSettings }): boolean => {
    return timeSettings?.started === true && timeSettings?.tradedInPlay === true;
};

export const isESports = (sport?: SportType) => includes(eSportIds, sport);

export const isTwoRowStyleSport = (sport?: string): sport is string => includes(twoRowStyleSports, sport);

export const findSelectionByIdentifier =
    (selections: Record<number, SelectionItem>) =>
    (identifier: SelectionIdentifier): SelectionItem => {
        const selection = find(selections, (selection) => get(selection, 'tags.selection-identifier.0') === identifier);

        if (selection !== undefined) {
            return selection;
        }

        return { id: -Date.now(), display: false } as SelectionItem;
    };

export const orderByDisplayOrder = (sports: AggregatedSport[]) => {
    return orderBy(sports, 'displayOrder', 'desc');
};

const prepareESports = (eSports: AggregatedSport[]): ESports => {
    if (eSports.length === 0) {
        return {
            id: eSportsSportType,
            sports: [],
            totalCount: 0,
            hasLiveSports: false,
            displayOrder: 0,
        };
    }

    const totalEventCount = eSports.reduce((total, eSport) => total + eSport.eventCount, 0);
    const hasLiveEvents = eSports.some((eSport) => eSport.hasLiveEvents);
    const highestESportDisplayOrder = Math.max(...eSports.map((eSport) => eSport.displayOrder));

    const orderedESports = orderByDisplayOrder(eSports);

    return {
        id: eSportsSportType,
        sports: orderedESports,
        totalCount: totalEventCount,
        hasLiveSports: hasLiveEvents,
        displayOrder: highestESportDisplayOrder,
    };
};

export const groupLHNSports = (allSports: AggregatedSport[]): GroupedSports => {
    const regularSports = reject(allSports, (sport) => isESports(sport.id));
    const eSports = filter(allSports, (sport) => isESports(sport.id));

    const preparedESports = prepareESports(eSports);

    const result = {
        ...regularSports,
        eSports: preparedESports,
    };

    return orderByDisplayOrder(result);
};

export const getParticipantInfo = (team: { participant: Participant }) => {
    return {
        name: get(team, 'participant.name', ''),
        url: get(team, 'participant.tags.uniformUrl.0', ''),
    };
};

export const getFirstSport = (sports: AggregatedSport[], lhnSport: SportType): SportType => {
    if (isEmpty(sports) || some(sports, { id: lhnSport })) {
        return lhnSport;
    }

    const hasESport = some(sports, (sport) => isESports(sport.id));
    const hasStandardSport = some(sports, (sport) => !isESports(sport.id));

    if ((hasESport && !hasStandardSport) || (!hasESport && hasStandardSport)) {
        return sports[0].id;
    }

    return sports.find((sport) => !isESports(sport.id))?.id ?? lhnSport;
};
