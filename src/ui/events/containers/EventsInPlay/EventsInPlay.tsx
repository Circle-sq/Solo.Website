import { observer } from 'mobx-react-lite';
import ms from 'ms';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { RightArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { useInterval } from 'src/appState/customHooks';
import type { SportCount } from 'src/appState/sportsList/types';
import { RequestStatus } from 'src/common/enums';
import { toggleState } from 'src/common/helpers/state';
import Filters from 'src/ui/common/Filters/Filters';
import type { Filter } from 'src/ui/common/Filters/types';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import EventsList from 'src/ui/events/EventsList';
import { S_Message } from 'src/ui/events/EventsList/styled';
import { collectionStateSelector } from 'src/ui/events/store/selectors/collections';
import LiveStream from 'src/ui/layouts/InPlay/components/LiveStream/LiveStream';
import { EVENT_FILTERS, PAGE_ROUTE_NAME } from 'src/utils/constants';

import { AllEventsLink, S_Count, Live } from './styled';

const COUNTER_REFRESH_TIMEOUT = ms('30s');
const collectionId = 'home-count-live-highlights';

export const InPlayComponent = () => {
    const {
        router: {
            route: { name },
        },
        language: { getTranslation, translateTokens },
        eventsCounter,
        sportsList: { sports },
    } = useAppStateContext();

    const [sportId, setSportId] = useState<string>();
    const [reloadCountEvents, setReloadCountEvents] = useState(false);

    const isSportTab = sportId !== undefined && sportId !== 'live-stream';
    const isLiveStreamTab = sportId !== undefined && sportId === 'live-stream';

    const collectionState = useRecoilValue(collectionStateSelector(collectionId));

    const { counters, isLoading } = useMemo(() => {
        return eventsCounter.getEventsCounterList(collectionId, {});
    }, [sportId, reloadCountEvents]);

    const { counters: streamsCounters, isLoading: isLoadingStreams } = useMemo(() => {
        return eventsCounter.getEventsCounterList('in-play-streams-count', {});
    }, [sportId, reloadCountEvents]);

    const triggerReloadEvents = useCallback(() => {
        setReloadCountEvents(toggleState);
    }, []);

    useInterval(() => {
        triggerReloadEvents();
    }, COUNTER_REFRESH_TIMEOUT);

    const filters = useMemo<Filter[]>(() => {
        const sportsWithCounters = (sports as Filter[]).reduce((acc: Filter[], x) => {
            const sportSelected: boolean = x.id === sportId;
            const sportHasCounter = counters.some((y: SportCount) => y.id === x.id);

            if (sportSelected && !sportHasCounter) {
                setSportId(undefined);
            }

            return sportHasCounter || sportSelected ? [...acc, x] : acc;
        }, []);

        if (streamsCounters.length > 0) {
            sportsWithCounters.unshift({
                id: 'live-stream',
                label: getTranslation('livefilter.live-streaming.title', 'Live Streaming'),
                testId: 'live-stream',
            });
        }

        return sportsWithCounters;
    }, [counters, streamsCounters]);

    useEffect(() => {
        try {
            if (filters.length > 0 && sportId === undefined && !isLoading && !isLoadingStreams) {
                const [filter] = filters;

                setSportId(filter.id);
            }
        } catch (e) {
            console.error('InPlayComponent:', e);
        }
    }, [filters, sportId, isLoading, isLoadingStreams]);

    return (
        <section>
            <header>
                {isLoading && isLoadingStreams && sportId === undefined ? (
                    <Loader message={<I18n langKey='events.inplay.sports.loading' defaultText='Loading sports...' />} />
                ) : (
                    <Filters
                        active={sportId === undefined ? '' : sportId}
                        onChange={(id: string) => setSportId(id)}
                        filters={filters}
                        type={EVENT_FILTERS.sport}
                        showSlider
                    />
                )}
            </header>

            {isSportTab ? (
                <EventsList
                    key={`in-play-home-${sportId}`}
                    collectionId={`in-play-home-${sportId}`}
                    query={{ sport: sportId }}
                    counters={counters}
                    triggerReloadEvents={triggerReloadEvents}
                />
            ) : isLiveStreamTab ? (
                <LiveStream liveStreams={streamsCounters} perPage={5} allowLoadMore={false} />
            ) : !isLoading && collectionState === RequestStatus.Ready ? (
                <S_Message key={'events-in-play-message'} data-testid='message'>
                    <I18n
                        langKey='events.inplay.empty'
                        defaultText='Currently there are no live events, please check back later!'
                    />
                </S_Message>
            ) : null}

            {name === PAGE_ROUTE_NAME.homepage && (
                <AllEventsLink route='inplay' params={{ id: PAGE_ROUTE_NAME.betting }} testId='allLiveEvents'>
                    {translateTokens(
                        getTranslation('homepage.events.in-play.footer.all-events.label', 'All [live] events'),
                        () => (
                            <Live key='live' />
                        ),
                    )}

                    <S_Count>
                        <RightArrowIcon fontSize='small' color={cssColor('--icon-light-color')} />
                    </S_Count>
                </AllEventsLink>
            )}
        </section>
    );
};

export default observer(InPlayComponent);
