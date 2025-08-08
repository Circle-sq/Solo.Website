import { useWindowWidth } from '@solo-hooks';
import compact from 'lodash/compact';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import some from 'lodash/some';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';
import { eventMediaAtom } from '@solo-media/store/atoms';
import EventMediaButtons from '@solo-media/ui/actionButtons/EventMediaButtons';
import { RightArrowIcon } from '@solo-ui/icons/svg';
import { DarkBluePalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import { isHandicapMarket, isOverUnderMarket } from 'src/common/helpers/market';
import type { EventMediaItem } from 'src/common/types/event';
import { AMERICAN_SPORTS, SCOREBOARD_SPORTS } from 'src/config/config';
import { resetMediaState } from 'src/modules/media/actions/media';
import EventInfographics from 'src/ui/common/EventInfographics/EventInfographics';
import EventSelectionsGroup from 'src/ui/events/EventRow/EventSelectionsGroup';
import { sportTemplateIdsSelectorFamily } from 'src/ui/events/store/selectors/marketTemplates';
import { exitPictureInPicture } from 'src/utils/common';
import { slug } from 'src/utils/deburr';

import { eventsMarketMainLineSelectorFamily } from '../store/selectors/event';

// to be removed after all bugs releated to subscription via websockets are fixed
// import { DebugEventAndMarkets } from './DebugEventAndMarkets';
import { getBestMarketIds, getMarketIds, getTemplateMarketIds, updatedMarketIds } from './helpers';
import {
    EventLink,
    S_AmericanMore,
    S_AmericanSportMarketsContainer,
    S_AmericanSportWrapper,
    S_DefaultMore,
    S_DefaultSport,
    S_EventInfographicsContainer,
    S_EventInfographicsWrapper,
    S_MarginBox,
    S_MetaGroup,
    S_ScoreboardMore,
    S_ScoreboardSport,
} from './styled';
import { SubscribeSuspendedMarkets } from './SubscribeSuspendedMarkets';

interface Props {
    eventId: number;
    sportId: string;
    templatesGroupIds: string[];
    selectionsSizes: number[];
}

const EventRow = ({ eventId, sportId, templatesGroupIds, selectionsSizes }: Props) => {
    const {
        models,
        language: { getTranslation, userLang },
    } = useAppStateContext();

    const dispatch = useDispatch();

    const templateIds = useRecoilValue(sportTemplateIdsSelectorFamily({ sportId, templatesGroupIds }));
    const eventMainLine = useRecoilValue(eventsMarketMainLineSelectorFamily(eventId));

    const [displayMarketIds, setDisplayMarketIds] = useState<number[]>([]);

    const { isDesktop, isMobile } = useWindowWidth();

    const isAmericanSports = includes(AMERICAN_SPORTS, sportId);
    const isScoreboardSport = includes(SCOREBOARD_SPORTS, sportId);

    const event = models.getEvent(eventId);

    const isLive = event?.timeSettings.started;

    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const setMediaEvent = async () => {
        if (event !== null) {
            dispatch(resetMediaState());

            const eventMedia: EventMediaItem = { media: event.media, sport: event.sport, id: event.id };
            setEventMedia(eventMedia);
        }

        await exitPictureInPicture();
    };

    const americanMarketIds = useMemo((): (number | undefined)[] => {
        if (event === null || templateIds === null) {
            return [];
        }

        return [
            // Money Line market
            ...getBestMarketIds(
                templateIds,
                filter(event.markets, (market) => !isOverUnderMarket(market) && !isHandicapMarket(market)),
            ),
            // Spread market
            ...getBestMarketIds(
                templateIds,
                filter(event.markets, (market) => isHandicapMarket(market)),
            ),

            // Total market
            ...getBestMarketIds(
                templateIds,
                filter(event.markets, (market) => isOverUnderMarket(market)),
            ),
        ];
    }, [event?.markets.length, templateIds]);

    const marketIds = isAmericanSports ? compact(americanMarketIds) : displayMarketIds;
    const displayedMarkets = useMemo(() => models.getVisibleMarkets(marketIds), [marketIds]);

    useEffect(() => {
        if (event !== null && templateIds !== null) {
            const templateMarketIds = getTemplateMarketIds(templateIds, event.markets);
            let marketIds = getMarketIds(templateMarketIds);

            if (eventMainLine !== undefined) {
                marketIds = updatedMarketIds(eventMainLine, templateMarketIds);
            }

            if (!isEqual(displayMarketIds, marketIds)) {
                setDisplayMarketIds(marketIds);
            }
        }
    }, [eventMainLine, event, templateIds, displayedMarkets, displayMarketIds]);

    const isRowSuspended = () => !some(displayedMarkets, { isSuspended: false });

    if (event === null) {
        return null;
    }

    let MoreButton = null;
    let SportWrapper = null;

    switch (true) {
        case isAmericanSports:
            MoreButton = S_AmericanMore;

            break;

        case isScoreboardSport:
            MoreButton = S_ScoreboardMore;

            break;

        default:
            MoreButton = S_DefaultMore;
    }

    switch (true) {
        case isScoreboardSport:
            SportWrapper = S_ScoreboardSport;

            break;

        default:
            SportWrapper = S_DefaultSport;
    }

    let hasMinWidth = false;

    if (isMobile && selectionsSizes.length === 0 && event.sport === SportType.FormulaOne) {
        hasMinWidth = true;
    }

    return (
        <SubscribeElement id={event.id} subKey={SubKey.event_row} revision={event.revision}>
            <EventLink
                onClick={setMediaEvent}
                route='event'
                params={{ id: event.id, slug: slug(event.originalName) }}
                key={event.id}
                testId={`event-${event.id}`}
            >
                <S_EventInfographicsContainer>
                    <S_EventInfographicsWrapper>
                        <EventInfographics event={event} isAmericanSports={isAmericanSports} />
                    </S_EventInfographicsWrapper>
                    {isDesktop && <EventMediaButtons event={event} />}
                </S_EventInfographicsContainer>

                <S_MetaGroup>
                    {isRowSuspended() ? (
                        <>
                            <SubscribeSuspendedMarkets displayMarketIds={displayMarketIds} />

                            <MoreButton columnGroups={selectionsSizes} hasMinWidth={hasMinWidth}>
                                <span>{getTranslation('event.row.bet-now.label', 'Bet now')}</span>

                                <S_MarginBox userLang={userLang}>
                                    <RightArrowIcon fontSize='xsmall' color={DarkBluePalette.darkBlue6} />
                                </S_MarginBox>
                            </MoreButton>
                        </>
                    ) : isAmericanSports ? (
                        <S_AmericanSportWrapper>
                            {/* TODO: Optimize american and non-american sports rendering for markets */}
                            <S_AmericanSportMarketsContainer>
                                {map(americanMarketIds, (marketId, index) => {
                                    const market = find(event.markets, { id: marketId });

                                    return (
                                        <EventSelectionsGroup
                                            marketCols={selectionsSizes[index]}
                                            market={market}
                                            key={`${event.id}-${marketId}-${index}`}
                                            isAmericanSports={isAmericanSports}
                                            testId={`market-${market?.name}`}
                                        />
                                    );
                                })}
                            </S_AmericanSportMarketsContainer>
                        </S_AmericanSportWrapper>
                    ) : (
                        <SportWrapper columnGroups={selectionsSizes}>
                            {map(displayMarketIds, (marketId, index) => {
                                const market = find(event.markets, { id: marketId });

                                return (
                                    <EventSelectionsGroup
                                        marketCols={selectionsSizes[index]}
                                        market={market}
                                        key={`${event.id}-${marketId}-${index}`}
                                        isScoreboardSport={isScoreboardSport}
                                        isLive={isLive}
                                        testId={`market-${market?.name}`}
                                    />
                                );
                            })}
                        </SportWrapper>
                    )}
                </S_MetaGroup>
            </EventLink>
            {/*
            <DebugEventAndMarkets
                event={event}
                isAmericanSports={isAmericanSports}
                displayMarketIds={displayMarketIds}
                americanMarketIds={americanMarketIds}
                templateIds={JSON.stringify(templateIds)}
            />
*/}
        </SubscribeElement>
    );
};

export default observer(EventRow);
