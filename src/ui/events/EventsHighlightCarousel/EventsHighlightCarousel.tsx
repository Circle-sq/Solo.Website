import find from 'lodash/find';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import { useAppStateContext } from 'src/appState/AppState';
import { BetStatus } from 'src/common/enums';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import SwiperSlider from 'src/ui/common/Carousel/SwiperSlider';
import { EVENTS_COLLECTIONS } from 'src/utils/constants';
import { slug } from 'src/utils/deburr';

import MarqueeCard from './MarqueeCard/MarqueeCard';
import SelectionHighlightCarousel from './SelectionHighlightCarousel/SelectionHighlightCarousel';
import { S_CompetitionIcon, S_CompetitionName, S_Container } from './styled';

const MARQUEE_CARDS_T0_SHOW = 10;
const MARQUEE_CARD_EVENT_MISSING_REVISION = -17;

const EventsHighlightCarousel = ({ sport }: { sport?: string }) => {
    const {
        eventsCollection,
        reduxState: { competitionIcons },
    } = useAppStateContext();

    const sportIcons = useRecoilValue(sportIconsSelector);

    const { events, competitionForView } = useMemo(() => {
        const collectionIdSuffix = !isUndefined(sport) ? `-${sport}` : '';

        return eventsCollection.getEventsCollectionList(
            `${EVENTS_COLLECTIONS.highlightCarousel}${collectionIdSuffix}`,
            {
                sport,
                'market.popular': '1,2,3,4,5',
                'market.main': 'true',
            },
        );
    }, [sport, eventsCollection]);

    const [carouselKey, setCarouselKey] = useState(0);

    useEffect(() => {
        setCarouselKey((carouselKey) => carouselKey + 1);
    }, [sport]);

    const slicedEvents = events
        .filter((event) => {
            const market = find(event.markets, { websitePopular: true, websiteMain: true });
            const hasNoAvailableMarkets = market === undefined || !market.displayed;

            return event.active && event.display && event.state === BetStatus.Open && !hasNoAvailableMarkets;
        })
        .slice(0, MARQUEE_CARDS_T0_SHOW);

    if (isEmpty(slicedEvents)) {
        return null;
    }

    return (
        <S_Container data-gtm='event-highlight'>
            <SwiperSlider key={carouselKey}>
                {map(slicedEvents, (event) => {
                    const {
                        id: eventId,
                        sport: sportName,
                        markets,
                        competitionId,
                        timeSettingsStarted,
                        homeParticipant,
                        awayParticipant,
                        homeParticipantUniform,
                        awayParticipantUniform,
                        mediaStreams,
                        isOutright,
                    } = event;

                    const market = find(markets, 'websitePopular');
                    const competition = find(competitionForView, ['id', competitionId]);
                    const isStreamAvailable = Boolean(mediaStreams.length);

                    let selectionsIds: number[] = [];
                    let marketLine: number | null = null;

                    if (market !== undefined) {
                        selectionsIds = market.selectionsIds;
                        marketLine = market.line;
                    }

                    const sportIcon = get(sportIcons, [sportName, 'url'], null);
                    const competitionIcon = competitionIcons.getIn([competition?.platformObject?.id, 'url'], null);

                    const icon = competitionIcon || (isOutright && sportIcon);

                    const competitionLabel =
                        competition !== undefined ? (
                            <>
                                {icon && <S_CompetitionIcon url={icon} />}
                                <S_CompetitionName data-testid='competitionName'>{competition.name}</S_CompetitionName>
                            </>
                        ) : null;

                    const homeTeam = {
                        url: homeParticipantUniform,
                        name: homeParticipant !== null ? homeParticipant : '',
                    };

                    const awayTeam = {
                        url: awayParticipantUniform,
                        name: awayParticipant !== null ? awayParticipant : '',
                    };

                    return (
                        <SubscribeElement
                            key={eventId}
                            id={eventId}
                            subKey={SubKey.event_marquee}
                            revision={event?.revision ?? MARQUEE_CARD_EVENT_MISSING_REVISION}
                            style={{ float: 'left' }}
                        >
                            <MarqueeCard
                                competitionName={competitionLabel}
                                isLive={timeSettingsStarted}
                                isStreamAvailable={isStreamAvailable}
                                home={homeTeam}
                                away={awayTeam}
                                event={event}
                                route='event'
                                params={{ id: event.id, slug: slug(event.originalName) }}
                                hasAmericanFormat={event.hasAmericanFormat}
                                marketName={market?.name}
                                marketId={market?.id}
                                marketRevision={market?.revision}
                            >
                                {map(selectionsIds, (selectionId) => (
                                    <SelectionHighlightCarousel
                                        key={selectionId}
                                        line={marketLine}
                                        selectionId={selectionId}
                                        isHandicap={Boolean(marketLine)}
                                    />
                                ))}
                            </MarqueeCard>
                        </SubscribeElement>
                    );
                })}
            </SwiperSlider>
        </S_Container>
    );
};

export default observer(EventsHighlightCarousel);
