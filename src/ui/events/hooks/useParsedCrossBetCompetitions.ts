import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSetRecoilState } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventsCollectionList } from 'src/appState/EventsCollection/EventsCollectionList';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { RequestStatus, SportType } from 'src/common/enums';
import { countriesById } from 'src/config/countries';
import { setEventFilter } from 'src/modules/content/actions/event-filters';
import {
    groupCrossBetEventsByDay,
    groupEventsByStartTime,
    type GroupedCrossBetEvent,
} from 'src/ui/crossbetting/Competitions/utils';
import { useBetTypeQuery } from 'src/ui/crossbetting/hooks/useBetTypeQuery';
import { useDateRangeFilter } from 'src/ui/crossbetting/hooks/useDateRangeFilter';
import { useEventsSort } from 'src/ui/crossbetting/hooks/useEventsSort';
import { SORT_VALUE } from 'src/ui/events/EventsList/config';
import { DATE_FORMAT, EVENT_FILTERS, EVENTS_COLLECTIONS, NUMBERS } from 'src/utils/constants';
import { WeekDayName } from 'src/utils/date';

import { visibleMarketsEventIdAtom } from '../store/atoms';

export type CompetitionGroup = [number, EventModel[]];

type CollectionType =
    | EventsCollectionList
    | {
          events: never[];
          total: number;
          status: string;
          getCurrentLoadedPage: number;
          isLoadingMoreAvailable: boolean;
          isLoading: boolean;
          loadMore: () => void;
      };

type Result = [
    CollectionType,
    GroupedCrossBetEvent[] | CompetitionGroup[],
    boolean,
    boolean,
    boolean,
    () => void,
    EventModel[],
];

export const useParsedCrossBetCompetitions = (sport: SportType): Result => {
    const dispatch = useDispatch();

    const {
        eventsCollection,
        models,
        router: { route },
    } = useAppStateContext();

    const setMarketsId = useSetRecoilState(visibleMarketsEventIdAtom);
    const dateFilter = useDateRangeFilter();

    const { sortReqParams } = useEventsSort();
    const { betTypeReqParams } = useBetTypeQuery();

    const [currentPage, setCurrentPage] = useState<number>(NUMBERS.one);
    const [longList, setLongList] = useState<never[] | EventModel[]>([]);
    const [isListUpdated, setIsListUpdated] = useState(false);
    const { day, countryId, competitionId, sortBy, betType } = route.params;
    const dayId = day ? Number(day) : 0;

    const isCountryAndCompetitionFilter = countryId !== undefined && competitionId !== undefined;
    const isCountryOrCompetitionFilter = countryId !== undefined || competitionId !== undefined;

    const dynamicParams = useMemo<{ country?: string; competition?: number }>(() => {
        let updatedParams = {};

        if (countryId !== undefined) {
            if (sport === SportType.Tennis) {
                updatedParams = { 'tags.tennis-tour': countryId };
            } else if (isUndefined(countriesById[countryId])) {
                updatedParams = { 'tags.category': countryId };
            } else {
                updatedParams = { country: countryId };
            }
        }

        if (competitionId !== undefined) {
            updatedParams = { ...updatedParams, competition: Number(competitionId) };
        }

        return updatedParams;
    }, [countryId, competitionId, sport]);

    const groupByDay = sortBy === SORT_VALUE.competitions ? { groupByDay: true } : {};

    const collection = useMemo(() => {
        if (sport === undefined) {
            return {
                events: [],
                loadMore: () => {},
                isLoading: false,
                total: 0,
                getCurrentLoadedPage: 0,
                isLoadingMoreAvailable: false,
                status: RequestStatus.Ready,
            };
        }

        setCurrentPage(NUMBERS.one);

        return eventsCollection.getEventsCollectionList(
            EVENTS_COLLECTIONS.crossbetting,
            {
                ...(sport === SportType.All ? {} : { sport }),
                ...dateFilter,
                ...dynamicParams,
                ...betTypeReqParams,
                sort: sortReqParams,
                page: 1,
                ...groupByDay,
            },
            {},
            currentPage,
        );
    }, [sport, day, countryId, competitionId, sortBy, betType]);

    useEffect(() => {
        if (sport !== undefined && day !== undefined) {
            collection.loadMore({
                ...(sport === SportType.All ? {} : { sport }),
                ...dynamicParams,
                ...dateFilter,
                page: currentPage,
            });
        }
    }, [currentPage, sport, day, countryId, competitionId]);

    const filterCollection = (events = collection.events): EventModel[] => {
        const filterFunction = (event: EventModel) => {
            let tag = event.tagsCountry;

            if (sport === SportType.Tennis) {
                tag = event.tagsTennisTour;
            } else if (isUndefined(countriesById[countryId])) {
                tag = event.tagsCategory;
            }

            const hasMatchingCompetition = event.competitionId === Number(competitionId);
            const hasMatchingCountry = tag === countryId;

            if (isCountryAndCompetitionFilter) {
                return hasMatchingCompetition && hasMatchingCountry;
            }

            if (isCountryOrCompetitionFilter) {
                return hasMatchingCompetition || hasMatchingCountry;
            }

            return true;
        };

        return events.filter(filterFunction);
    };

    const collectionEventIds = useMemo(() => collection.events.map((event) => event.id), [collection.events]);

    useEffect(() => {
        if (collection.events.length > NUMBERS.zero && collection.total !== NUMBERS.zero) {
            if (currentPage === NUMBERS.one && collection.getCurrentLoadedPage === NUMBERS.one) {
                setLongList([...filterCollection()]);
            } else if (!collection.isLoading) {
                setLongList((prevLongList) =>
                    uniqBy([...filterCollection([...prevLongList]), ...filterCollection()], 'id'),
                );
            }

            setIsListUpdated(true);
        } else if (!collection.isLoading) {
            setLongList([]);
        }
    }, [collectionEventIds, collection.total, collection.isLoading, countryId, competitionId, currentPage]);

    useEffect(() => {
        setCurrentPage(NUMBERS.one);
    }, [countryId, competitionId]);

    const isShowLoading = currentPage === NUMBERS.one && collection.isLoading;

    const loadMoreEvents = useCallback(() => {
        setCurrentPage(currentPage + 1);
    }, [currentPage]);

    const hasLoadMore = collection.isLoadingMoreAvailable;

    let visibleEvents = longList.filter(({ display, markets }) => {
        return markets.some((market) => market.display) && display;
    });

    let shouldUpdateCounter = false;
    visibleEvents = visibleEvents.filter(({ timeSettingsStarted }) => {
        if (timeSettingsStarted) {
            shouldUpdateCounter = true;
        }

        return !timeSettingsStarted;
    });

    const eventIds = visibleEvents.map(({ id }) => id);

    useEffect(() => {
        if (sport !== undefined || dayId !== undefined) {
            let marketTemplates: Array<string> = [];

            if (sport !== SportType.All) {
                const sportEvent = visibleEvents.find((event) => event.sport === sport);
                marketTemplates = sportEvent?.templateIds || [];
            }
            dispatch(setEventFilter(EVENT_FILTERS.crossbettingMarkets, uniq(marketTemplates)));
            setMarketsId(eventIds);
        }
    }, [JSON.stringify(eventIds), setMarketsId]);

    const isSortByCompetitionAllTab = sortBy === SORT_VALUE.competitions;

    if (isSortByCompetitionAllTab) {
        const groupedEvents = groupEventsByStartTime(visibleEvents);

        const eventsByDay = Object.keys(groupedEvents).reduce((acc: GroupedCrossBetEvent[], key: string) => {
            const groupedByCompetitions = groupBy(groupedEvents[key], 'competitionId');
            const competitionIds = keys(groupedByCompetitions);
            const rawCompetitions = map(competitionIds, (id) => models.getCompetitionModel(+id)?.getRawData());
            let orderStrategy = ['displayOrder', 'name'];

            if (sport === SportType.All) {
                orderStrategy = ['globalDisplayOrder', 'name'];
            }

            const orderedCompetitions = orderBy(rawCompetitions, orderStrategy, ['desc', 'asc']);
            const orderedCompetitionIds = map(orderedCompetitions, 'id') as number[];

            const orderedGroupedEvents = map(
                orderedCompetitionIds,
                (competitionId) => [competitionId, groupedByCompetitions[competitionId]] as CompetitionGroup,
            );

            return [
                ...acc,
                {
                    weekDayName: WeekDayName(new Date(key)),
                    events: orderedGroupedEvents,
                    date: format(new Date(key), DATE_FORMAT.NUMERIC_FULL_DATE),
                },
            ];
        }, []);

        const orderedEventsByDay = orderBy(eventsByDay, (event) => Date.parse(event.date), ['asc']);

        return [
            collection,
            orderedEventsByDay,
            isShowLoading,
            hasLoadMore,
            shouldUpdateCounter,
            loadMoreEvents,
            visibleEvents,
        ];
    }

    if (isListUpdated) {
        return [
            collection,
            groupCrossBetEventsByDay(visibleEvents),
            isShowLoading,
            hasLoadMore,
            shouldUpdateCounter,
            loadMoreEvents,
            visibleEvents,
        ];
    }

    return [collection, [], isShowLoading, hasLoadMore, shouldUpdateCounter, loadMoreEvents, visibleEvents];
};
