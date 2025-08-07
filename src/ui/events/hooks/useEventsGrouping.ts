import { format } from 'date-fns';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isUndefined from 'lodash/isUndefined';
import mapValues from 'lodash/mapValues';
import orderBy from 'lodash/orderBy';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/unionBy';
import { useEffect, useMemo, useState } from 'react';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { getCompetitionLocation, getCompetitionLocationInfoFromTags } from 'src/appState/utils';
import { RouteName, SportType } from 'src/common/enums';
import { formatToFullDate } from 'src/common/helpers/date';
import type { CompetitionTags } from 'src/common/types/competition';
import type { CompetitionLocationItem } from 'src/modules/sports/types';
import { COMPETITION_PRIORITY_ORDER, SORT_VALUE } from 'src/ui/events/EventsList/config';
import type { EventDataGrouped } from 'src/ui/events/EventsList/types';
import { DATE_FORMAT, NA, PAGE_ROUTE_NAME } from 'src/utils/constants';
import { WeekDayName } from 'src/utils/date';

interface UseEventsGrouping {
    groupedEvents: EventDataGrouped[];
    withGrouping: boolean;
}

const getCompetitionName = (sport: SportType, competition?: CompetitionLocationItem, defaultName = ''): string => {
    if (!competition) {
        if (defaultName) {
            return defaultName;
        }

        return NA;
    }

    if (sport === SportType.ESoccer) {
        return competition.label;
    }

    return competition.name;
};

const useEventsGrouping = (
    route: string,
    sortRule: string,
    events: EventModel[],
    competitions: CompetitionLocationItem[],
    shouldGroupEvents: boolean,
    isLiveStreamingPage = false,
): UseEventsGrouping => {
    const [withGrouping, setWithGrouping] = useState(false);

    const isDayOnlyGrouping = route === RouteName.Competition;

    useEffect(() => {
        setWithGrouping(
            PAGE_ROUTE_NAME.competition === route || PAGE_ROUTE_NAME.country === route || shouldGroupEvents,
        );
    }, [route, shouldGroupEvents]);

    const sortEventsInGroups = (groups: EventDataGrouped[]) => {
        return groups.map((group) => {
            const sortedEvents = sortBy(group.events, COMPETITION_PRIORITY_ORDER);

            return { ...group, events: sortedEvents };
        });
    };

    const groupedEvents = useMemo<EventDataGrouped[]>(() => {
        const eventsCopy = [...events];
        const isByTime = !isLiveStreamingPage && sortRule === SORT_VALUE.time;

        if (eventsCopy.length) {
            const formattedEvents = eventsCopy.map((event) => {
                const { competitionId, timeSettingsStartTime = new Date(), sport } = event;
                const competition = competitions.find(({ id }) => +id === competitionId);
                const competitionLocation = getCompetitionLocation(sport);

                const eventRawData = event.getRawData();

                let tags = eventRawData?.tags || {};

                if (!isUndefined(competition)) {
                    tags = { ...competition.tags };
                }

                const { tag, category, categoryLabel } = getCompetitionLocationInfoFromTags(tags as CompetitionTags);

                let originalSport;

                if (competitionLocation.originalSportSelector) {
                    originalSport = get(eventRawData, competitionLocation.originalSportSelector);
                }

                return {
                    competitionId,
                    weekDayName: WeekDayName(new Date(timeSettingsStartTime)),
                    formattedDate: formatToFullDate(timeSettingsStartTime),
                    startTime: format(new Date(timeSettingsStartTime), DATE_FORMAT.TIMESTAMP),
                    competition: getCompetitionName(
                        originalSport as SportType,
                        competition,
                        eventRawData?.translationData?.competition,
                    ),
                    events: [event],
                    eventCompetition: competition,
                    locationLabel: categoryLabel,
                    location: category,
                    originalSport,
                    tag,
                };
            });

            const eventCompetitions = uniqBy(formattedEvents, 'competitionId');

            if (eventCompetitions.length === 1) {
                const sortedGroups = groupBy(sortBy(formattedEvents, ['startTime', 'competitionId']), 'formattedDate');

                return sortEventsInGroups(
                    reduce(
                        sortedGroups,
                        (acc: EventDataGrouped[], group: EventDataGrouped[]) => {
                            acc.push({
                                ...group[0],
                                events: flatten(group.map((item) => item.events)),
                            });

                            return acc;
                        },
                        [],
                    ),
                );
            }

            if (isByTime) {
                const [firstGroup, ...restSortedGroups]: EventDataGrouped[] = sortBy(formattedEvents, [
                    'startTime',
                    'competitionId',
                ]);

                return sortEventsInGroups(
                    reduce(
                        restSortedGroups,
                        (acc: EventDataGrouped[], item: EventDataGrouped) => {
                            const lastGroup = acc[acc.length - 1];

                            if (lastGroup.competitionId !== item.competitionId) {
                                acc.push({
                                    ...item,
                                    events: [...item.events],
                                });

                                return acc;
                            }

                            lastGroup.events.push(...item.events);

                            return acc;
                        },
                        [
                            {
                                ...firstGroup,
                                events: [...firstGroup.events],
                            },
                        ],
                    ),
                );
            }

            const eventsGroupedByCompetition = groupBy(eventsCopy, (e) => {
                if (isDayOnlyGrouping) {
                    return formatToFullDate(e.timeSettingsStartTime);
                }

                const { tagSelector } = getCompetitionLocation(e.sport);
                const event = e.getRawData();
                const locationKey = get(event, tagSelector);

                return `${locationKey}|${e.competitionId}`;
            });

            const byCompetition = mapValues(eventsGroupedByCompetition, (events: EventModel[]) => {
                const lastGroup = events[events.length - 1];
                const { competitionId, timeSettingsStartTime, sport } = lastGroup;

                const event = lastGroup.getRawData();

                const competition = competitions.find(({ id }) => +id === competitionId);
                const competitionLocation = getCompetitionLocation(sport);

                let tags = event?.tags || {};

                if (!isUndefined(competition)) {
                    tags = { ...competition.tags };
                }

                const { tag, category, categoryLabel } = getCompetitionLocationInfoFromTags(tags as CompetitionTags);

                let originalSport;

                if (competitionLocation.originalSportSelector) {
                    originalSport = get(event, competitionLocation.originalSportSelector);
                }

                return {
                    displayOrder: get(competition, 'displayOrder', 0),
                    weekDayName: WeekDayName(new Date(timeSettingsStartTime)),
                    formattedDate: formatToFullDate(timeSettingsStartTime),
                    startTime: format(new Date(timeSettingsStartTime), DATE_FORMAT.TIMESTAMP),
                    competition: getCompetitionName(
                        originalSport as SportType,
                        competition,
                        event?.translationData?.competition,
                    ),
                    competitionId,
                    events: sortBy(events, COMPETITION_PRIORITY_ORDER),
                    eventCompetition: competition,
                    locationLabel: categoryLabel,
                    location: category,
                    originalSport,
                    tag,
                };
            });

            return orderBy(byCompetition, 'displayOrder', 'desc');
        }

        return [];
    }, [events, isLiveStreamingPage, sortRule, competitions, isDayOnlyGrouping]);

    return { groupedEvents, withGrouping };
};

export default useEventsGrouping;
