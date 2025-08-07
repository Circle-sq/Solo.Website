import usePrevious from '@react-hook/previous';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { useAppStateContext } from 'src/appState/AppState';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { RequestStatus, SpecialMarketsSports, SportType } from 'src/common/enums';
import { safeGet } from 'src/common/helpers/safeGet';
import CompetitionList from 'src/ui/crossbetting/Competitions/CompetitionList';
import type { GroupedCrossBetEvent } from 'src/ui/crossbetting/Competitions/utils';
import { hasMarketDisplayCrossBet } from 'src/ui/crossbetting/EventCardMobile/helpers';
import useCrossBetSportCounters from 'src/ui/crossbetting/hooks/useCrossBetSportCounters';
import {
    hasSpecificSportEventAtom,
    marketTypeOptionsAtom,
    selectedDayAtom,
    selectedMarketTypeAtom,
    sportTypeAtom,
} from 'src/ui/crossbetting/store/atoms';
import Messages from 'src/ui/events/EventsList/Messages';
import {
    useParsedCrossBetCompetitions,
    type CompetitionGroup,
} from 'src/ui/events/hooks/useParsedCrossBetCompetitions';
import { LOAD_MORE_THRESHOLD, MARKET_TEMPLATE } from 'src/utils/constants';

import { marketEventIdSelector } from '../../store/selectors/event';

const CrossBettingEvents = () => {
    const { router } = useAppStateContext();
    const { params } = router.route;
    const sportType = safeGet(params, 'sport', SportType.All);

    const selectedDay = useRecoilValue(selectedDayAtom);
    const day = selectedDay?.toString();
    const marketType = useRecoilValue(selectedMarketTypeAtom);
    const resetMarketType = useResetRecoilState(selectedMarketTypeAtom);

    const { ref, entry } = useInView({
        root: null,
        threshold: LOAD_MORE_THRESHOLD,
    });
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isMarketListLoading, setIsMarketListLoading] = useState(true);
    const [marketFilterOptions, setMarketFilterOptions] = useRecoilState(marketTypeOptionsAtom);
    const [sportTypeValue, setSportType] = useRecoilState(sportTypeAtom);
    const prevSportType = usePrevious(sportTypeValue);
    const setHasSpecificSportEvent = useSetRecoilState(hasSpecificSportEventAtom);
    useEffect(() => {
        setSportType(sportType);
    }, []);

    const [collection, eventGroups, isShowLoading, hasLoadMore, shouldUpdateCounter, loadMoreEvents, eventList] =
        useParsedCrossBetCompetitions(sportType);

    const counterLinks = useCrossBetSportCounters(shouldUpdateCounter);

    const deepCompareDependency = JSON.stringify(
        counterLinks.map((obj) => {
            const { label, ...rest } = obj;

            return rest;
        }),
    );

    const orderedCounterLinks = useMemo(() => orderBy(counterLinks, 'displayOrder', 'desc'), [deepCompareDependency]);

    const sports = eventList.map((event) => event.sport);

    useEffect(() => {
        const specificSportEventExists = sports.some((sport) => SpecialMarketsSports.includes(sport));
        setHasSpecificSportEvent(specificSportEventExists);
    }, [eventList]);

    useEffect(() => {
        if (day !== undefined) {
            router.updateQueryParams({ day });
        }
    }, [day]);

    useEffect(() => {
        if (!isUndefined(entry) && entry.isIntersecting && !isLoadingMore && !isShowLoading) {
            setIsLoadingMore(true);
            loadMoreEvents();
        }

        return () => {
            setIsLoadingMore(false);
        };
    }, [entry, loadMoreEvents]);

    useEffect(() => {
        const [defaultLink] = orderedCounterLinks;
        const defaultUserLink = orderedCounterLinks.find((x) => x.sportId === sportType);

        if (orderedCounterLinks.length && defaultUserLink === undefined) {
            resetMarketType();
            router.updateQueryParams({ sport: SportType.All });
        }

        if (!isEmpty(defaultLink)) {
            router.redirect(null, {
                ...router.route.params,
                sport: defaultUserLink ? defaultUserLink.sportId : defaultLink.sportId,
            });
        }
    }, [deepCompareDependency]);
    const { marketsEventId, pageSize } = useRecoilValue(marketEventIdSelector);

    useEffect(() => {
        if (pageSize > 0) {
            return;
        }

        setIsMarketListLoading(false);
    }, [marketsEventId, pageSize]);

    const getDeepDependencies = useCallback(
        () =>
            map(eventList, (event) => {
                const markets = get(event, 'markets', []) as MarketModel[];
                const filteredMarkets = map(
                    filter(markets, ({ active, display }) => {
                        return active && display;
                    }) as MarketModel[],
                    (market) => market.id,
                );

                return {
                    [event.id]: [...filteredMarkets],
                };
            }),
        [eventList],
    );

    const dependecyList = getDeepDependencies();

    useDeepCompareEffect(() => {
        const mappedMarketFilterOptions = marketFilterOptions.map((option) => {
            const { id } = option;

            const filteredEventList = filter(eventList, (event) => {
                const markets = get(event, 'markets', []) as MarketModel[];

                if (id[0] === MARKET_TEMPLATE.default) {
                    return true;
                }

                const hasMarketType = markets.some(({ marketTypeGeneric, active, display, tags }) => {
                    const hasCrossBetView = hasMarketDisplayCrossBet(tags['market-display']);

                    return id.includes(marketTypeGeneric) && active && display && hasCrossBetView;
                });

                return hasMarketType;
            });

            return { ...option, isDisabled: filteredEventList.length === 0, hasEvents: eventList.length > 0 };
        });

        setMarketFilterOptions(mappedMarketFilterOptions);
    }, [dependecyList]);

    const getCompetitionList = useCallback(() => {
        return (eventGroups as GroupedCrossBetEvent[])
            .map((item) => {
                const reducedEvents = item.events.reduce((acc: CompetitionGroup[], [competitionId, list]) => {
                    const filteredEvents = list.filter((event) => {
                        const markets = get(event, 'markets', []) as MarketModel[];

                        if (marketType[0] === MARKET_TEMPLATE.default) {
                            return true;
                        }

                        const hasMarketType = markets.some(({ marketTypeGeneric, display, active, tags }) => {
                            const hasCrossBetView = hasMarketDisplayCrossBet(tags['market-display']);

                            return marketType.includes(marketTypeGeneric) && display && active && hasCrossBetView;
                        });

                        return hasMarketType;
                    });

                    if (filteredEvents.length) {
                        acc.push([competitionId, filteredEvents]);
                    }

                    return [...acc];
                }, []);

                return { ...item, events: reducedEvents };
            })
            .filter((item) => item.events.length);
    }, [eventGroups, marketType]);

    const messageStatues =
        collection !== undefined && collection.isLoading
            ? RequestStatus.Progress
            : collection !== undefined
            ? collection.status
            : RequestStatus.Progress;

    const competitionList = getCompetitionList();

    useEffect(() => {
        if (
            (marketType[0] !== MARKET_TEMPLATE.default && competitionList.length === 0) ||
            sportType !== prevSportType
        ) {
            resetMarketType();
        }
    }, [sportType, competitionList.length]);

    return (
        <section data-testid='crossbetCompetitionsList'>
            {collection !== undefined && !isShowLoading && !isMarketListLoading && (
                <>
                    <CompetitionList list={competitionList as GroupedCrossBetEvent[]} />
                    {hasLoadMore && <div ref={ref} style={{ marginBottom: '5px' }} />}
                </>
            )}
            <Messages status={messageStatues} count={collection?.events.length} />
        </section>
    );
};

export default observer(CrossBettingEvents);
