import { searchFlagSelector } from '@sc-feature-flags';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRecoilValue } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { freebetCreditsAtomWithQuery } from '@sc-account/store/queries';
import { AZIcon } from '@sc-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { useOnClickOutsidePreventFirstClick } from 'src/appState/customHooks';
import type { SportCount } from 'src/appState/sportsList/types';
import { RouteName, SportTab, SportType } from 'src/common/enums';
import useHighlightCompetitions from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
import { sportsSportsItemsSelector } from 'src/modules/sports/selectors';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import { useBetTypeQuery } from 'src/ui/crossbetting/hooks/useBetTypeQuery';
import { useDateRangeFilter } from 'src/ui/crossbetting/hooks/useDateRangeFilter';
import { collectionCounterSelector, collectionTotalSelector } from 'src/ui/events/store/selectors/collections';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';

import BottomSection from './BottomSection/BottomSection';
import SearchButton from './SearchButton';
import SportsList from './SportsList';
import SportTabs from './SportTabs';
import { S_BurgerMenuContainer, S_MobileSportIconWrapper, S_SportRow } from './styled';
import {
    FREE_BET_HEADER_HEIGHT,
    FREE_BET_ITEM_HEIGHT,
    getActiveTab,
    getRouteByTab,
    LOGGED_IN_SPORTS_MIN_LENGTH,
    MAX_VISIBLE_FREE_BETS,
    SEARCH_BUTTON_HEIGHT,
    SPORT_ROW_HEIGHT,
    TABS_AND_LANGUAGE_SELECTOR_ADDED_HEIGHTS,
} from './utils';

interface Props {
    toggleBurgerMenu: () => void;
    showBurgerMenu: boolean;
}

const upcomingSportsCollectionId = 'all-count';
const crossSportsCollectionId = 'crossbet-count';
const inPlaySportsCollectionId = 'live-grouped-sports';
const streamsCollectionId = 'in-play-streams-count';

const BurgerMenu = ({ toggleBurgerMenu, showBurgerMenu }: Props) => {
    const { router, eventsCounter, models } = useAppStateContext();

    const {
        data: { bonusCredits },
    } = useAtomValue(freebetCreditsAtomWithQuery);

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isSearchFlagEnabled = useAtomValue(searchFlagSelector);

    const sports = useSelector(sportsSportsItemsSelector);
    const dateFilter = useDateRangeFilter();
    const { betTypeReqParams } = useBetTypeQuery();
    const containerRef = useRef<HTMLDivElement>(null);

    const [showFullSportsList, setShowFullSportsList] = useState(false);
    const toggleFullSportsList = () => setShowFullSportsList((prevState) => !prevState);

    const showFreeBetSection = isAuthenticated && !isEmpty(bonusCredits);
    const event =
        router.route.name === RouteName.Event ? models.getEvent(Number(router?.route?.params?.id)) : undefined;
    const initializeTab = event?.timeMatchInPlay ? SportTab.Live : getActiveTab(router?.route?.name);

    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
    const [languageSelectorExpandable, setLanguageSelectorExpandable] = useState(false);

    const [initialTab] = useState<string>(initializeTab);
    const [activeTab, setActiveTab] = useState<string>(initializeTab);

    const [isFreeBetsExpanded, setIsFreeBetsExpanded] = useState(false);

    const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(false);
    const toggleHighlightsExpanded = () => setIsHighlightsExpanded((prevState) => !prevState);
    const handleLanguageSelectorState = (value: boolean) => () => setIsLanguageSelectorOpen(value);

    const { enabled: isBetlinkFeatureEnabled } = useBetlinkGolf();

    const redirectOnClose = () => {
        if (activeTab !== initialTab) {
            router.redirect(getRouteByTab(activeTab));
        }
    };

    const closeHandler = () => {
        redirectOnClose();
        toggleBurgerMenu();
    };

    useEffect(() => {
        return () => {
            redirectOnClose();
        };
    }, []);

    const toggleFreeBetsExpanded = () => setIsFreeBetsExpanded((prevState) => !prevState);

    useOnClickOutsidePreventFirstClick(containerRef, () => {
        if (showBurgerMenu) {
            closeHandler();
        }
    });

    let upcomingEventsSportsCounters = useRecoilValue(collectionCounterSelector(upcomingSportsCollectionId)) || [];
    let crossEventsSportsCounters = useRecoilValue(collectionCounterSelector(crossSportsCollectionId)) || [];
    let inPlayEventsSportsCounters = useRecoilValue(collectionCounterSelector(inPlaySportsCollectionId)) || [];
    let inPlayStreamsCount = useRecoilValue(collectionTotalSelector(streamsCollectionId));

    const { counters: upcomingCounters } = useMemo(() => {
        if (isEmpty(upcomingEventsSportsCounters)) {
            return eventsCounter.getEventsCounterList(upcomingSportsCollectionId, {});
        }

        return { counters: [] };
    }, []);

    const { counters: crossCounters, isLoading: isLoadingCross } = useMemo(() => {
        if (isEmpty(crossEventsSportsCounters)) {
            return eventsCounter.getEventsCounterList(crossSportsCollectionId, {
                ...dateFilter,
                ...betTypeReqParams,
            });
        }

        return { counters: [], isLoading: false };
    }, [dateFilter, betTypeReqParams]);

    const { counters: liveCounters, isLoading: isLoadingLive } = useMemo(() => {
        if (isEmpty(inPlayEventsSportsCounters)) {
            return eventsCounter.getEventsCounterList(inPlaySportsCollectionId, {});
        }

        return { counters: [], isLoading: false };
    }, []);

    const { counters: streamsCounters } = useMemo(() => {
        if (isUndefined(inPlayStreamsCount)) {
            return eventsCounter.getEventsCounterList(streamsCollectionId, {});
        }

        return { counters: [] };
    }, []);

    const { highlightCompetitions = [] } = useHighlightCompetitions();

    if (isEmpty(upcomingEventsSportsCounters) && !isEmpty(upcomingCounters)) {
        upcomingEventsSportsCounters = [...upcomingCounters];
    }

    if (isEmpty(crossEventsSportsCounters) && !isEmpty(crossCounters)) {
        crossEventsSportsCounters = [...crossCounters];
    }

    if (isEmpty(inPlayEventsSportsCounters) && !isEmpty(liveCounters)) {
        inPlayEventsSportsCounters = [...liveCounters];
    }

    if (isUndefined(inPlayStreamsCount) && !isEmpty(streamsCounters)) {
        inPlayStreamsCount = streamsCounters.reduce(
            (total, currentObject: SportCount) => total + currentObject.count,
            0,
        );
    }

    const getFilteredCounters = (): SportCount[] => {
        let counters: SportCount[] = [...upcomingEventsSportsCounters];

        if (activeTab === SportTab.Cross) {
            counters = crossEventsSportsCounters;
        } else {
            if (activeTab === SportTab.Live) {
                counters = inPlayEventsSportsCounters;
            }
        }

        return counters.reduce((acc: SportCount[], counter: SportCount) => {
            if (counter.id && counter.id !== SportType.ESoccer) {
                let { count } = counter;

                if (counter.id === SportType.Football) {
                    const eSoccerCount = counters.find((item) => item.id === SportType.ESoccer)?.count || 0;
                    count += eSoccerCount;
                }
                acc.push({
                    ...counter,
                    count,
                    live:
                        ![SportTab.Cross, SportTab.Live].includes(activeTab as SportTab) &&
                        (inPlayEventsSportsCounters || []).some(
                            (inPlaySport: SportCount) => inPlaySport.id === counter.id,
                        ),
                });
            }

            return acc;
        }, []);
    };

    const getIsLoading = (): boolean => {
        if (activeTab === SportTab.Cross) {
            return isLoadingCross && !crossEventsSportsCounters.length;
        }

        if (activeTab === SportTab.Live) {
            return isLoadingLive && !inPlayEventsSportsCounters.length;
        }

        return !upcomingEventsSportsCounters.length && !inPlayEventsSportsCounters.length;
    };

    const getOrderedCounters = (counters: SportCount[]): SportCount[] => {
        return counters.slice().sort((prev, next) => {
            const prevOrder = sports[prev.id as SportType]?.displayOrder || 0;
            const nextOrder = sports[next.id as SportType]?.displayOrder || 0;

            return nextOrder - prevOrder;
        });
    };

    const streamsCounter = inPlayStreamsCount || 0;

    const filteredCounters: SportCount[] = getFilteredCounters();
    const orderedCounters = getOrderedCounters(filteredCounters);

    const { innerHeight: height } = window;

    const getVisibleSportsLength = (): number => {
        let extraSportsRowsHeight = SPORT_ROW_HEIGHT;

        if (activeTab === SportTab.Live) {
            if (streamsCounter > 0) {
                extraSportsRowsHeight = 3 * SPORT_ROW_HEIGHT;
            }
            extraSportsRowsHeight = 2 * SPORT_ROW_HEIGHT;
        }

        let sportsListHeight =
            height -
            extraSportsRowsHeight -
            TABS_AND_LANGUAGE_SELECTOR_ADDED_HEIGHTS -
            (isSearchFlagEnabled ? SEARCH_BUTTON_HEIGHT : 0);

        if (!isAuthenticated) {
            if (highlightCompetitions.length > 0) {
                sportsListHeight = sportsListHeight - SPORT_ROW_HEIGHT;
            }

            return Math.floor(sportsListHeight / SPORT_ROW_HEIGHT);
        }

        if (!isEmpty(bonusCredits)) {
            sportsListHeight = sportsListHeight - FREE_BET_HEADER_HEIGHT;

            if (isFreeBetsExpanded) {
                sportsListHeight =
                    sportsListHeight - Math.min(bonusCredits.length, MAX_VISIBLE_FREE_BETS) * FREE_BET_ITEM_HEIGHT;
            }
        }

        if (highlightCompetitions.length > 0 && isHighlightsExpanded) {
            sportsListHeight = sportsListHeight - SPORT_ROW_HEIGHT * highlightCompetitions.length;
        }

        const sportsListLength = Math.floor(sportsListHeight / SPORT_ROW_HEIGHT);

        return sportsListLength > LOGGED_IN_SPORTS_MIN_LENGTH ? sportsListLength : LOGGED_IN_SPORTS_MIN_LENGTH;
    };

    const visibleSportsLength = getVisibleSportsLength();

    useEffect(() => {
        setLanguageSelectorExpandable(isFreeBetsExpanded || visibleSportsLength - orderedCounters.length > 2);
    }, [isFreeBetsExpanded, visibleSportsLength, orderedCounters]);

    const showMoreButton = !showFullSportsList && orderedCounters.length > visibleSportsLength + 1;

    const hasMinHeight = languageSelectorExpandable && isLanguageSelectorOpen;

    let sportCounters = orderedCounters;

    if (isBetlinkFeatureEnabled && activeTab === SportTab.Sports) {
        sportCounters = [
            ...orderedCounters.slice(0, visibleSportsLength - 1),
            { id: SportType.BetlinkGolf, count: 0 },
            ...orderedCounters.slice(visibleSportsLength - 1),
        ];
    }

    const sportsListCounters = sportCounters.slice(
        0,
        showFullSportsList ? orderedCounters.length : visibleSportsLength,
    );

    return (
        <S_BurgerMenuContainer ref={containerRef}>
            <SportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {getIsLoading() ? (
                <Loader message={<I18n langKey='events.search.loading' defaultText='Loading...' />} />
            ) : (
                <>
                    {isSearchFlagEnabled && <SearchButton />}
                    <SportsList
                        activeTab={activeTab}
                        counters={sportsListCounters}
                        isHighlightsExpanded={isHighlightsExpanded}
                        highlightCompetitions={activeTab === SportTab.Sports ? highlightCompetitions : []}
                        streamsCounter={streamsCounter}
                        toggleBurgerMenu={toggleBurgerMenu}
                        toggleHighlightsExpanded={toggleHighlightsExpanded}
                    >
                        {showMoreButton && (
                            <S_SportRow key='expand-sports-list' onClick={toggleFullSportsList}>
                                <S_MobileSportIconWrapper>
                                    <AZIcon fontSize='small' />
                                </S_MobileSportIconWrapper>
                                <I18n langKey='header.sportsbetting.expand' defaultText='Click to see the full list' />
                            </S_SportRow>
                        )}
                    </SportsList>
                </>
            )}
            <BottomSection
                languageSelectorExpandable={languageSelectorExpandable}
                showFreeBetSection={showFreeBetSection}
                hasMinHeight={hasMinHeight}
                onMenuOpen={handleLanguageSelectorState(true)}
                onMenuClose={handleLanguageSelectorState(false)}
                toggleFreeBetsExpanded={toggleFreeBetsExpanded}
            />
        </S_BurgerMenuContainer>
    );
};

export default memo(BurgerMenu);
