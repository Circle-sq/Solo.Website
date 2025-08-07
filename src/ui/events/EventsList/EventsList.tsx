import { useWindowResize } from '@sc-hooks';
import { List } from 'immutable';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import uniqBy from 'lodash/uniqBy';
import { observer } from 'mobx-react-lite';
import ms from 'ms';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import { COLUMN_BREAKPOINTS } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { useInterval } from 'src/appState/customHooks';
import type { EventsCollectionQuery, MoreParams } from 'src/appState/EventsCollection/types';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { RequestStatus, RouteName } from 'src/common/enums';
import { toggleState } from 'src/common/helpers/state';
import { AMERICAN_SPORTS, SCOREBOARD_SPORTS } from 'src/config/config';
import EventsListHeader from 'src/ui/events/EventsList/EventsListHeader/EventsListHeader';
import { sortCriteriaAtomFamily } from 'src/ui/events/store/atoms';
import { collectionItemsCountSelector, collectionStateSelector } from 'src/ui/events/store/selectors/collections';
import {
    marketGroupIdsSelectorFamily,
    sportTemplatesSelectorFamily,
} from 'src/ui/events/store/selectors/marketTemplates';
import { LOAD_MORE_THRESHOLD } from 'src/utils/constants';
import { BettingEventTime } from 'src/utils/enums';
import type { Testable } from 'src/utils/Testable/types';

import {
    americanSportIdentifiers,
    DEFAULT_LIVE_HIGHLIGHTS,
    MAX_VISIBLE_COLUMNS,
    MIN_VISIBLE_COLUMNS,
    SORT_VALUE,
} from './config';
import Events from './Events';
import {
    getMarketIdentifiers,
    getMarketTypeGenericIdentifiers,
    getQueryCollectionId,
    hasEventsToDisplay,
} from './helpers';
import Messages from './Messages';
import { S_EventList, S_EventListDivider } from './styled';
import type { SportCounter } from './types';

const EVENTS_REFRESH_TIMEOUT = ms('15s');
const STARTING_PAGE = 1;
export const LOAD_MORE_TIMEOUT = 1000;

export interface Props extends Testable {
    countryId?: string | null;
    collectionId: string;
    allowLoadMore?: boolean;
    counters?: SportCounter[];
    isLiveStreamingPage?: boolean;
    query: EventsCollectionQuery;
    showHeader?: boolean;
    showSort?: boolean;
    triggerReloadEvents?: () => void;
}

const EventsList = ({
    testId,
    countryId,
    collectionId,
    allowLoadMore = false,
    counters,
    isLiveStreamingPage,
    query,
    showHeader,
    showSort = false,
    triggerReloadEvents,
}: Props) => {
    const REFRESH_TIMEOUT = window.$appState?.env.refreshTimeout;

    const { sport } = query;

    const {
        eventsCollection,
        router: {
            route: { name: routeName },
        },
    } = useAppStateContext();

    const querySport = typeof sport === 'string' ? sport : '';

    const isAmericanSports = AMERICAN_SPORTS.includes(querySport);
    const isSportsPage = routeName === RouteName.Homepage;
    const isLiveSports = routeName === RouteName.InPlay;
    const isScoreboardSport = SCOREBOARD_SPORTS.includes(querySport);

    const container = useRef<HTMLDivElement>(null);

    const sortValue = useRecoilValue(sortCriteriaAtomFamily(collectionId));

    const sortBy = showSort ? `-sortBy-${sortValue}` : '';
    const queryCollectionId = getQueryCollectionId(collectionId, sortBy, query['tags.country']);

    const collectionState = useRecoilValue(collectionStateSelector(queryCollectionId));
    const collectionItemsCount = useRecoilValue(collectionItemsCountSelector(queryCollectionId));
    const sportMarketGroupIds = useRecoilValue(marketGroupIdsSelectorFamily(querySport));
    const sportTemplates = useRecoilValue(sportTemplatesSelectorFamily(querySport));

    const [columns, setColumns] = useState(MAX_VISIBLE_COLUMNS);

    const [marketGroupIdentifiers, setMarketGroupIdentifiers] = useState<string[][]>([]);
    const [selectionsSizes, setSelectionsSizes] = useState<number[]>([]);
    const [marketGroupIds, setMarketGroupIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(STARTING_PAGE);
    const [eventsList, setEventsList] = useState<EventModel[]>([]);
    const [secondCall, setSecondCall] = useState(false);
    const [reloadEvents, setReloadEvents] = useState(false);
    const [isActiveLoadMore, setIsActiveLoadMore] = useState(false);
    const [uniqEventsListCount, setUniqEventsListCount] = useState<number>(0);
    const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

    const { ref, entry: endOfPage } = useInView({
        root: null,
        threshold: LOAD_MORE_THRESHOLD,
    });
    const bottomIsReached = !isUndefined(endOfPage) && endOfPage.isIntersecting;

    const isUpcomingEvents = collectionId.includes('on-later');
    const isLiveEvents = collectionId.includes(BettingEventTime.InPlay);

    const uniqEventsList = uniqBy(eventsList, 'id');

    useInterval(() => {
        if (isLiveSports || isSportsPage) {
            setReloadEvents(toggleState);
        }
    }, EVENTS_REFRESH_TIMEOUT);

    useEffect(() => {
        const isLoadMoreAvailable =
            (isLoadingMoreAvailable || hasEventsToBeLoaded) && allowLoadMore && !isActiveLoadMore;

        if (infiniteScrollEnabled) {
            return;
        }

        if (eventsList.length && !bottomIsReached && isLoadMoreAvailable) {
            setInfiniteScrollEnabled(true);
        }

        if (isLiveSports) {
            setInfiniteScrollEnabled(true);
        }
    }, [eventsList.length, endOfPage?.isIntersecting, isLiveSports, bottomIsReached]);

    useEffect(() => {
        setIsActiveLoadMore(true);
    }, []);

    const { events, loadMore, status, isLoading, total, isLoadingMoreAvailable } = useMemo(() => {
        const eventsQuery =
            sortValue === SORT_VALUE.competitions
                ? {
                      ...query,
                      // We're overriding the default sort order
                      sort: [
                          '-competition.displayOrder',
                          'timeSettings.startTime',
                          '-sport.displayOrder',
                          'competition.name',
                          'name',
                      ],
                  }
                : query;

        return eventsCollection.getEventsCollectionList(
            queryCollectionId,
            { ...eventsQuery },
            {
                isTemplateBased: true,
            },
            currentPage,
        );
    }, [sortValue, secondCall, reloadEvents]);

    useEffect(() => {
        if (currentPage > STARTING_PAGE) {
            setCurrentPage(STARTING_PAGE);
        }

        if (secondCall) {
            setSecondCall(false);
        }
    }, [sortValue]);

    const calculateVisibleColumns = () => {
        if (container.current !== null) {
            const activeBreakpoint = COLUMN_BREAKPOINTS.find((breakpoint) => window?.innerWidth > breakpoint.width);

            const columns = activeBreakpoint ? activeBreakpoint.columns : 1;

            setColumns(isAmericanSports ? MIN_VISIBLE_COLUMNS : columns);
        }
    };

    const detectCurrentEventsCount = (counters: SportCounter[]): boolean => {
        const updatedEventsCount = uniqEventsList.filter((event) => event.display).length;

        const isChangeDetected = counters.some((sportItem: SportCounter) => {
            const isMoreThenDefault = sportItem.count > DEFAULT_LIVE_HIGHLIGHTS;
            const isSport = sportItem.id === sport;

            return (
                isSport &&
                ((isMoreThenDefault && updatedEventsCount < DEFAULT_LIVE_HIGHLIGHTS) ||
                    (sportItem.count <= DEFAULT_LIVE_HIGHLIGHTS && sportItem.count !== updatedEventsCount))
            );
        });

        return isChangeDetected;
    };

    useEffect(() => {
        if (counters === undefined || uniqEventsList.length === 0 || isLoading || triggerReloadEvents === undefined) {
            return;
        }

        const isCurrentEventsCount = detectCurrentEventsCount(counters);

        if (isCurrentEventsCount) {
            setReloadEvents(toggleState);

            if (triggerReloadEvents) {
                triggerReloadEvents();
            }
        }
    }, [counters, uniqEventsList, isLoading]);

    useEffect(() => {
        const pid = window.setTimeout(() => setSecondCall(true), REFRESH_TIMEOUT);

        return () => window.clearTimeout(pid);
    }, [currentPage, sortValue]);

    const onChangeSelect = useCallback((value: string, index?: number) => {
        setMarketGroupIds((prevState) => prevState.toSpliced(index ?? 0, 1, value));
    }, []);

    useWindowResize(calculateVisibleColumns);

    useEffect(() => {
        calculateVisibleColumns();
    }, [container.current, isAmericanSports]);

    useEffect(() => {
        if (sport !== undefined && currentPage > STARTING_PAGE) {
            const params = {
                page: currentPage,
                ...query,
            };
            loadMore(params as MoreParams);
        }
    }, [currentPage]);

    useEffect(() => {
        if (events.length > 0 && total > 0) {
            if (currentPage === STARTING_PAGE) {
                setEventsList(events);
            } else {
                setEventsList((prevEvents) => [...prevEvents, ...events]);
            }
        }
    }, [events, total, currentPage]);

    useEffect(() => {
        if (sportMarketGroupIds !== null && sportMarketGroupIds.length > 0) {
            setMarketGroupIds(sportMarketGroupIds);
        }
    }, [sportMarketGroupIds]);

    const setAmericanMarketGroupIdentifiers = () => {
        // Pre-defined column names for american sports
        setMarketGroupIdentifiers([americanSportIdentifiers]);
    };

    useEffect(() => {
        if (uniqEventsList.length !== uniqEventsListCount) {
            setUniqEventsListCount(uniqEventsList.length);
        }
    }, [uniqEventsList]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsActiveLoadMore(false);
        }, LOAD_MORE_TIMEOUT);

        return () => clearTimeout(timeoutId);
    }, [uniqEventsListCount]);

    const setGenericMarketGroupIdentifiers = () => {
        const marketTemplates = marketGroupIds.map((i) => sportTemplates?.get(i, List()).toArray());

        let foundTemplates = {};
        const markets = eventsList.reduce((acc: MarketModel[], event) => acc.concat(event.markets), []);

        marketTemplates.forEach((template) => {
            let market;

            if (template !== undefined) {
                market = markets.find((market) => {
                    return market.templateId === template[0];
                });
            }

            if (market) {
                if (!Object.prototype.hasOwnProperty.call(foundTemplates, market.templateId)) {
                    foundTemplates = {
                        ...foundTemplates,
                        [market.templateId]: getMarketIdentifiers(market),
                    };
                }
            } else {
                if (template !== undefined) {
                    foundTemplates = {
                        ...foundTemplates,
                        [template[0]]: getMarketTypeGenericIdentifiers(template[1]),
                    };
                }
            }
        });

        const foundKeys = Object.keys(foundTemplates);
        const identifiers = marketTemplates.map((group) => {
            const templateId = group?.find((templateId: string) => foundKeys.includes(templateId));

            return get(foundTemplates, `${templateId}`, []);
        });
        const sizes = identifiers.map((value) => value.length || 3);

        if (!isEqual(marketGroupIdentifiers, identifiers)) {
            setMarketGroupIdentifiers(identifiers);
            setSelectionsSizes(sizes);
        }
    };

    useEffect(() => {
        if (sportMarketGroupIds === null || eventsList.length === 0) {
            return;
        }

        if (isAmericanSports) {
            setAmericanMarketGroupIdentifiers();
        } else {
            // Extract selection identifiers [[O, U], [H, D, A] ....] based on market template
            setGenericMarketGroupIdentifiers();
        }
    }, [eventsList, marketGroupIds]);

    const visible = Math.min(columns, marketGroupIds.length);

    const loadMoreEvents = () => {
        setIsActiveLoadMore(true);
        setCurrentPage((prevState) => prevState + 1);
    };

    useEffect(() => {
        if (bottomIsReached && !isActiveLoadMore && allowLoadMore && infiniteScrollEnabled) {
            loadMoreEvents();
        }
    }, [endOfPage?.isIntersecting, infiniteScrollEnabled, bottomIsReached]);

    const visibleSelections = useMemo(() => selectionsSizes.slice(0, visible), [selectionsSizes, visible]);
    const columnLabelGroups = useMemo(
        () => marketGroupIdentifiers.slice(0, visible),
        [marketGroupIdentifiers, visible],
    );
    const templatesGroupIds = useMemo(() => marketGroupIds.slice(0, visible), [marketGroupIds, visible]);

    const shouldGroupEvents =
        (showSort && sortValue !== SORT_VALUE.time) ||
        isUpcomingEvents ||
        isLiveEvents ||
        routeName === RouteName.Sport;

    const isProgressStatus =
        (isLoading && !secondCall) ||
        isActiveLoadMore ||
        !includes([RequestStatus.Ready, RequestStatus.Error], collectionState) ||
        collectionItemsCount > uniqEventsList.length;

    const showLoading = currentPage === STARTING_PAGE && isProgressStatus && !secondCall;

    const isLoadingUpcomingContent = queryCollectionId?.includes('on-later-home') && (isProgressStatus || showLoading);

    const isInPlayUpcoming = isLiveSports && !isUpcomingEvents;

    const hasEvents = isInPlayUpcoming ? hasEventsToDisplay(uniqEventsList) : !isEmpty(uniqEventsList);

    const hasEventsToBeLoaded = collectionItemsCount > uniqEventsList.length;

    if (isLiveSports && !showLoading && !hasEvents) {
        return null;
    }

    const showEventsListHeader = !isEmpty(uniqEventsList) && hasEvents && !showLoading;

    return (
        <>
            <S_EventList ref={container} data-testid={testId} isLoadingUpcomingContent={isLoadingUpcomingContent}>
                {showEventsListHeader && (
                    <EventsListHeader
                        sportId={querySport}
                        columns={visible}
                        collectionId={collectionId}
                        isAmericanSports={isAmericanSports}
                        isScoreboardSport={isScoreboardSport}
                        selected={marketGroupIds}
                        onChangeSelect={onChangeSelect}
                        showSort={showSort}
                        showHeader={showHeader}
                        selectionsSizes={visibleSelections}
                        columnLabelsGroups={columnLabelGroups}
                    />
                )}

                {isLoading && !secondCall && <S_EventListDivider />}

                {hasEvents && !showLoading && (
                    <Events
                        columnLabelsGroups={columnLabelGroups}
                        countryId={countryId}
                        events={uniqEventsList}
                        isLiveStreamingPage={isLiveStreamingPage}
                        selectionsSizes={visibleSelections}
                        shouldGroupEvents={shouldGroupEvents}
                        sortBy={sortValue}
                        sportId={querySport}
                        templatesGroupIds={templatesGroupIds}
                    />
                )}

                <Messages status={isProgressStatus ? RequestStatus.Progress : status} count={uniqEventsList.length} />
            </S_EventList>

            {(isLoadingMoreAvailable || hasEventsToBeLoaded) && allowLoadMore && !isActiveLoadMore && (
                <div ref={ref} style={{ marginBottom: '15px' }} />
            )}
        </>
    );
};

export default observer(EventsList);
