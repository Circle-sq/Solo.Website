import isEmpty from 'lodash/isEmpty';
import keyBy from 'lodash/keyBy';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';

import { getCompetitionLocationInfoFromTags } from 'src/appState/utils';
import type { CompetitionLocationItem } from 'src/common/types/competition';
import type { Competition, EventItem } from 'src/store/events/types';

import { SortBy } from '../../enums';
import { isLiveEvent } from '../../helpers';
import type { CompetitionGroups, EventGroup } from '../../types';

import { mapEventMarketsToIds } from './prepare';

type CompetitionsOrder = Record<number, number>;

const orderByDisplayOrder = (competitions: Record<number, Competition>): Competition[] => {
    return orderBy(competitions, ['globalDisplayOrder', 'displayOrder'], ['desc', 'desc']);
};

const getCompetitionsOrder = (competitionRecords: Record<string, Competition>) => {
    const competitions = orderByDisplayOrder(competitionRecords);

    return competitions.reduce((acc: CompetitionsOrder, competition, index) => {
        acc[+competition.id] = index;

        return acc;
    }, {});
};

export const createCompetitionGroup = (
    { id, name, tags, platformObject }: CompetitionLocationItem,
    event: EventItem<number>,
) => {
    return {
        id,
        name,
        events: [event],
        platformObject,
        ...getCompetitionLocationInfoFromTags(tags),
    };
};

export const sortCompetitionGroups = (competitionsOrder: CompetitionsOrder) => (groups: CompetitionGroups) => {
    return sortBy(groups, (group) => competitionsOrder[group.id]);
};

export const groupByTime = (events: EventItem[], competitions: Record<number, CompetitionLocationItem>) => {
    const liveGroups: EventGroup[] = [];
    const upcomingGroups: EventGroup[] = [];

    let liveIndex = 0;
    let upcomingIndex = 0;

    for (const event of events) {
        const competitionId = +event.competition.id;
        const preparedEvent = mapEventMarketsToIds(event);

        if (isLiveEvent(event)) {
            if (liveIndex in liveGroups) {
                if (competitionId === liveGroups[liveIndex].id) {
                    liveGroups[liveIndex].events.push(preparedEvent);
                } else if (competitionId in competitions) {
                    liveGroups[++liveIndex] = createCompetitionGroup(competitions[competitionId], preparedEvent);
                }
            } else if (competitionId in competitions) {
                liveGroups[liveIndex] = createCompetitionGroup(competitions[competitionId], preparedEvent);
            }
        } else {
            if (upcomingIndex in upcomingGroups) {
                if (competitionId === upcomingGroups[upcomingIndex].id) {
                    upcomingGroups[upcomingIndex].events.push(preparedEvent);
                } else if (competitionId in competitions) {
                    upcomingGroups[++upcomingIndex] = createCompetitionGroup(
                        competitions[competitionId],
                        preparedEvent,
                    );
                }
            } else if (competitionId in competitions) {
                upcomingGroups[upcomingIndex] = createCompetitionGroup(competitions[competitionId], preparedEvent);
            }
        }
    }

    return { liveGroups, upcomingGroups };
};

export const groupByCompetitions = (events: EventItem[], competitions: Record<number, CompetitionLocationItem>) => {
    const competitionRecords: Record<number, Competition> = {};

    const liveGroups: CompetitionGroups = {};
    const upcomingGroups: CompetitionGroups = {};

    for (const event of events) {
        const competitionId = +event.competition.id;
        const preparedEvent = mapEventMarketsToIds(event);

        if (!(competitionId in competitionRecords)) {
            competitionRecords[competitionId] = event.competition;
        }

        if (isLiveEvent(event)) {
            if (competitionId in liveGroups) {
                liveGroups[competitionId].events.push(preparedEvent);
            } else if (competitionId in competitions) {
                liveGroups[competitionId] = createCompetitionGroup(competitions[competitionId], preparedEvent);
            }
        } else {
            if (competitionId in upcomingGroups) {
                upcomingGroups[competitionId].events.push(preparedEvent);
            } else if (competitionId in competitions) {
                upcomingGroups[competitionId] = createCompetitionGroup(competitions[competitionId], preparedEvent);
            }
        }
    }

    const competitionsOrder = getCompetitionsOrder(competitionRecords);
    const sortByCompetitionsOrder = sortCompetitionGroups(competitionsOrder);

    return {
        liveGroups: sortByCompetitionsOrder(liveGroups),
        upcomingGroups: sortByCompetitionsOrder(upcomingGroups),
    };
};

export const groupCompetitionEvents = (
    events: EventItem[],
    competitionLocations: CompetitionLocationItem[],
    sortBy: string,
): {
    liveGroups: EventGroup[];
    upcomingGroups: EventGroup[];
} => {
    if (isEmpty(events)) {
        return { liveGroups: [], upcomingGroups: [] };
    }

    const competitionLocationRecords = keyBy(competitionLocations, 'id');

    if (sortBy === SortBy.Time) {
        return groupByTime(events, competitionLocationRecords);
    }

    return groupByCompetitions(events, competitionLocationRecords);
};
