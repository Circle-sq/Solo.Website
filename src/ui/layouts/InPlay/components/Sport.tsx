import includes from 'lodash/includes';
import set from 'lodash/set';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { getCompetitionLocation } from 'src/appState/utils';
import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import { countriesById } from 'src/config/countries';
import EventsList from 'src/ui/events/EventsList';
import { PAGE_ROUTE_NAME, SPORT_TYPE, TAGS } from 'src/utils/constants';
import { BettingEventTime } from 'src/utils/enums';

import { S_Heading, S_SportPanel } from '../styled';
import type { QueryParams } from '../types';

const Sport = ({ sportId, countryId = null }: { sportId: string; countryId?: string | null }) => {
    const {
        router: {
            route: { name: routeName },
        },
        language: { getTranslation },
        eventsCounter,
    } = useAppStateContext();

    const {
        total: onLaterTotal,
        isLoading: onLaterIsLoading,
        counters,
    } = useMemo(() => {
        return eventsCounter.getEventsCounterList(`on-later-${sportId}`, { sport: sportId });
    }, [sportId]);

    const hasOnLaterEvents = useMemo(() => {
        return onLaterTotal !== null ? onLaterTotal > 0 : true;
    }, [onLaterTotal, onLaterIsLoading]);

    const inPlayQueryParams: QueryParams = {
        sport: sportId,
        perPage: 40,
    };

    if (countryId && routeName === PAGE_ROUTE_NAME.inplay) {
        let competitionLocation;

        const isESoccerCategory = sportId === SPORT_TYPE.football && !includes(Object.keys(countriesById), countryId);

        if (SIMULATED_REALITY_LEAGUES.includes(countryId) || isESoccerCategory) {
            competitionLocation = getCompetitionLocation(sportId, routeName === PAGE_ROUTE_NAME.inplay);
        } else {
            competitionLocation = getCompetitionLocation(sportId);
        }

        let tag = competitionLocation.querySelector;

        if (tag === `tags.${TAGS.Country}` && !includes(Object.keys(countriesById), countryId)) {
            tag = `tags.${TAGS.Category}`;
        }

        set(inPlayQueryParams, [tag], countryId);
    }

    const onLaterQueryParams: QueryParams = {
        sport: sportId,
        time: BettingEventTime.CurrentDay,
    };

    return (
        <>
            <S_SportPanel>
                <EventsList
                    showSort
                    allowLoadMore={true}
                    collectionId={`in-play-${sportId}`}
                    counters={counters}
                    countryId={countryId}
                    query={inPlayQueryParams}
                    testId='liveEvents'
                />
            </S_SportPanel>

            {hasOnLaterEvents && (
                <>
                    <S_Heading>{getTranslation('events.panel.header.upcoming-events', 'Upcoming Events')}</S_Heading>
                    <EventsList
                        testId='upcomingEvents'
                        collectionId={`on-later-${sportId}`}
                        counters={counters}
                        query={onLaterQueryParams}
                    />
                </>
            )}
        </>
    );
};

export default Sport;
