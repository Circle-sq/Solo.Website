import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useWindowWidth } from '@solo-hooks';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import { observer } from 'mobx-react-lite';
import { type MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';
import { eventMediaAtom } from '@solo-media/store/atoms';
import BetRadarStatisticsButton from '@solo-media/ui/actionButtons/BetRadarStatisticsButton';
import { DownArrowIcon, FootballFieldIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor, DarkBluePalette, fontWeight } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { SportType } from 'src/common/enums';
import type { EventMediaItem } from 'src/common/types/event';
import {
    setDropdownListState,
    setMediaActiveTab,
    setMediaEventId,
    setMediaWidgetState,
} from 'src/modules/media/actions/media';
import { setStream as setSelectedStreamsIds } from 'src/modules/media/actions/stream';
import { I18n } from 'src/ui/common/Language/I18n';
import MarketRowMobile from 'src/ui/crossbetting/EventCardMobile/MarketRowMobile/MarketRowMobile';
import ParticipantMobile from 'src/ui/crossbetting/EventCardMobile/ParticipantMobile/ParticipantMobile';
import useEventCardData from 'src/ui/crossbetting/EventCardMobile/useEventCardData';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';
import { marketCounterByEventAtomFamily } from 'src/ui/events/store/atoms';
import { marketEventIdSelector } from 'src/ui/events/store/selectors/event';
import { EVENT_MEDIA_TYPE, MARKET_TEMPLATE } from 'src/utils/constants';
import { slug } from 'src/utils/deburr';

import MarketFilter from '../MarketFilters/MarketFilter';
import {
    type MarketTypeOption,
    selectedEventCardMarketTypeAtom,
    selectedMarketTypeAtom,
    specialsToggleAtom,
} from '../store/atoms';

import { hasMarketDisplayCrossBet } from './helpers';
import {
    S_CardMoreLink,
    S_CardTimeMobile,
    S_CrossBetMediaButton,
    S_EventCardMarketFilters,
    S_EventCardMobile,
    S_EventCardMobileHeader,
    S_MarginBox,
    S_MarketsMobile,
    S_ShowMoreMarkets,
} from './styled';

const filterOptions = [
    { id: [MARKET_TEMPLATE.default], label: 'All', isDisabled: false, hasEvents: true },
    {
        id: [MARKET_TEMPLATE.twoWayWinner, MARKET_TEMPLATE.threeWayWinner],
        label: 'Winner',
        isDisabled: false,
        hasEvents: true,
    },
    {
        id: [MARKET_TEMPLATE.twoWayHandicap, MARKET_TEMPLATE.threeWayHandicap],
        label: 'Handicap',
        isDisabled: false,
        hasEvents: true,
    },
    { id: [MARKET_TEMPLATE.overunder], label: 'Over/Under', isDisabled: false, hasEvents: true },
];

export const sportMarketLabels: Partial<Record<SportType, string>> = {
    [SportType.Football]: '1st Half',
    [SportType.Baseball]: '1-5 Innings',
    [SportType.Basketball]: '1st Quarter',
};

const EventCardMobile = ({ event }: { event: EventModel }) => {
    const dispatch = useDispatch();
    const { isDesktop, isMobile } = useWindowWidth();
    const { markets, id: eventId, sport: eventSport } = event;
    const [isSpecialMarketsToggleEnabled, setSpecialsMarketToggle] = useRecoilState(specialsToggleAtom);
    const { models } = useAppStateContext();
    const marketCounter = useRecoilValue(marketCounterByEventAtomFamily(eventId));
    const selectedMarketType = useRecoilValue(selectedMarketTypeAtom);
    const eventModel = models.getEvent(eventId);

    const [marketFilterType, setMarketFilterType] = useState(selectedMarketType);
    const [isExpanded, setIsExpanded] = useState(false);
    const setEventMedia = useSetRecoilState(eventMediaAtom);
    const [eventMarkets, setEventMarkets] = useState<MarketModel[]>([]);
    const hasTriggeredRef = useRef(false);
    const { restMarketsToShow, specialMarketsToShow, showExpander, hiddenMarketsCount } = useEventCardData(
        eventMarkets,
        isExpanded,
        eventSport,
    );
    const { marketsEventId, pageSize } = useRecoilValue(marketEventIdSelector);
    const [isMarketListLoading, setIsMarketListLoading] = useState(true);

    const [marketTypeOptions, setMarketTypeOptions] = useState<MarketTypeOption[]>(filterOptions);
    const resetMarketType = useResetRecoilState(selectedEventCardMarketTypeAtom);

    const specialMarketLabel = sportMarketLabels[eventSport] ?? '';
    const marketsToShow = [...restMarketsToShow, ...specialMarketsToShow];

    useEffect(() => {
        setMarketFilterType(selectedMarketType);
    }, [selectedMarketType]);

    useLayoutEffect(() => {
        if (!hasTriggeredRef.current && specialMarketsToShow.length > 0) {
            setSpecialsMarketToggle(true);
            hasTriggeredRef.current = true;
        }
    }, [specialMarketsToShow]);

    const getMarketIdList = useCallback(() => {
        return map(
            filter(markets, ({ active, display }) => {
                return active && display;
            }) as MarketModel[],
            (market) => market.id,
        );
    }, [markets]);

    const marketIdList = getMarketIdList();

    useDeepCompareEffect(() => {
        const filteredMarkets = markets.filter(({ marketTypeGeneric, active, display, tags }) => {
            if (selectedMarketType[0] === MARKET_TEMPLATE.default) {
                return true;
            }

            const isCrossBetView = hasMarketDisplayCrossBet(tags['market-display']);

            return selectedMarketType.includes(marketTypeGeneric) && active && display && isCrossBetView;
        });

        setEventMarkets(filteredMarkets);
    }, [marketIdList, selectedMarketType]);

    useDeepCompareEffect(() => {
        const filteredMarkets = markets.filter(({ marketTypeGeneric, active, display, tags }) => {
            if (marketFilterType[0] === MARKET_TEMPLATE.default) {
                return true;
            }

            const isCrossBetView = hasMarketDisplayCrossBet(tags['market-display']);

            return marketFilterType.includes(marketTypeGeneric) && active && display && isCrossBetView;
        });

        setEventMarkets(filteredMarkets);
    }, [marketIdList, marketFilterType]);

    useDeepCompareEffect(() => {
        const mappedMarketFilterOptions = marketTypeOptions.map((option) => {
            const { id } = option;

            const hasMarketType = markets.some(
                ({ marketTypeGeneric, display, active, tags }) =>
                    id.includes(marketTypeGeneric) &&
                    display &&
                    active &&
                    hasMarketDisplayCrossBet(tags['market-display']),
            );

            let isDisabled;

            if (selectedMarketType[0] !== MARKET_TEMPLATE.default) {
                isDisabled = id.toString() !== selectedMarketType.toString();
            } else {
                isDisabled = id[0] !== MARKET_TEMPLATE.default && !hasMarketType;
            }

            return { ...option, isDisabled: isDisabled };
        });

        setMarketTypeOptions(mappedMarketFilterOptions);
    }, [marketIdList, selectedMarketType, isExpanded]);

    const onToggleExpander = () => {
        setIsExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        if (pageSize > 0) {
            return;
        }

        setIsMarketListLoading(false);
    }, [marketsEventId, pageSize]);

    useEffect(() => {
        if (marketFilterType[0] !== MARKET_TEMPLATE.default && marketsToShow.length === 0 && !isMarketListLoading) {
            resetMarketType();
            setMarketFilterType([MARKET_TEMPLATE.default]);
        }
    }, [marketFilterType, marketsToShow.length]);

    const renderExpander = () => {
        if (isExpanded) {
            return (
                <S_ShowMoreMarkets onClick={onToggleExpander}>
                    <I18n langKey='events.selections-group.button.less' defaultText='Show Less' />
                    <S_MarginBox>
                        <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                    </S_MarginBox>
                </S_ShowMoreMarkets>
            );
        }

        return (
            <S_ShowMoreMarkets onClick={onToggleExpander}>
                <I18n langKey='events.selections-group.button.more' defaultText='Show More' />
                {` (+${hiddenMarketsCount})`}
                <S_MarginBox>
                    <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                </S_MarginBox>
            </S_ShowMoreMarkets>
        );
    };

    const eventMedia: EventMediaItem = { media: event.media, sport: event.sport, id: event.id };

    const liveTrackers = event.media?.liveTrackers;
    const hasLiveTrackers = liveTrackers.length > 0;
    const shouldDisplayLiveTrackers = isDesktop && hasLiveTrackers;

    const handleLiveStats = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(setMediaActiveTab(EVENT_MEDIA_TYPE.liveMatchTracker));
            dispatch(setMediaEventId(event.id));
            setEventMedia(eventMedia);

            dispatch(setMediaWidgetState(true));
            dispatch(setDropdownListState(false));
            dispatch(setSelectedStreamsIds({ streamId: undefined, provider: undefined }));
        },
        [event.id],
    );

    const handleMarketFilterClick = (id: string[]) => {
        setMarketFilterType(id);
    };

    return (
        <SubscribeElement id={eventId} subKey={SubKey.event_card_mob} revision={event.revision}>
            <S_EventCardMobile data-testid={`mobile-event-${eventId}`}>
                <S_EventCardMobileHeader>
                    <S_CardTimeMobile data-testid='mobile-event-card-time'>
                        <EventPeriod event={event} />
                    </S_CardTimeMobile>
                    <BetRadarStatisticsButton rowView event={eventModel} fontSize={isMobile ? 'small' : 'medium'} />
                    {shouldDisplayLiveTrackers && (
                        <S_CrossBetMediaButton onClick={(e) => handleLiveStats(e)}>
                            <FootballFieldIcon fontSize='medium' color={DarkBluePalette.darkBlue5} />
                        </S_CrossBetMediaButton>
                    )}
                    <S_CardMoreLink
                        route='event'
                        params={{ id: event.id, slug: slug(event.originalName) }}
                        key={event.id}
                        testId={`event-${event.id}`}
                        onClick={() => setEventMedia(eventMedia)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '4px',
                                width: 'max-content',
                            }}
                        >
                            <I18n langKey='events.request-a-bet-selection.all-bets' defaultText='All Bets' />
                            {isUndefined(marketCounter) ? (
                                <CircularProgress size={10} sx={{ margin: '3px 6px 0' }} />
                            ) : (
                                !!marketCounter && <span>{`(+${marketCounter})`}</span>
                            )}
                        </Box>
                    </S_CardMoreLink>
                </S_EventCardMobileHeader>
                {!isNull(eventModel) && <ParticipantMobile event={eventModel} />}
                {isExpanded ? (
                    <S_EventCardMarketFilters>
                        <MarketFilter
                            selectedMarketType={marketFilterType}
                            marketFilterOptions={marketTypeOptions}
                            onClick={handleMarketFilterClick}
                            sportType={get(event, 'sport')}
                        />
                    </S_EventCardMarketFilters>
                ) : null}
                <S_MarketsMobile data-testid='mobileCrossbetMarketContainer'>
                    {restMarketsToShow.map((market) => {
                        return <MarketRowMobile key={market.id} market={market} />;
                    })}
                    {isSpecialMarketsToggleEnabled && specialMarketsToShow.length > 0 && (
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: '10px 0',
                            }}
                        >
                            <Typography
                                data-testid='specialMarketLabel'
                                variant='h3'
                                sx={{ fontWeight: fontWeight.bold }}
                            >
                                <I18n langKey='events.coupons.specials.label' defaultText='Specials' />
                                {' | '}
                                <I18n
                                    langKey={`markets.special.period.${eventSport}`}
                                    defaultText={`${specialMarketLabel}`}
                                />
                            </Typography>
                        </Box>
                    )}
                    {isSpecialMarketsToggleEnabled &&
                        specialMarketsToShow.map((market) => {
                            return <MarketRowMobile key={market.id} market={market} />;
                        })}
                </S_MarketsMobile>
                {showExpander && renderExpander()}
            </S_EventCardMobile>
        </SubscribeElement>
    );
};

export default observer(EventCardMobile);
