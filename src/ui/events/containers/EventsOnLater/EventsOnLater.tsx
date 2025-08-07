import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import type { SportCount } from 'src/appState/sportsList/types';
import { RequestStatus } from 'src/common/enums';
import Filters from 'src/ui/common/Filters/Filters';
import type { Filter } from 'src/ui/common/Filters/types';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import EventsList from 'src/ui/events/EventsList';
import { S_Message } from 'src/ui/events/EventsList/styled';
import { collectionStateSelector } from 'src/ui/events/store/selectors/collections';
import { EVENT_FILTERS } from 'src/utils/constants';

const collectionId = 'home-count-on-later';

const EventsOnLater = () => {
    const {
        eventsCounter,
        sportsList: { sports },
    } = useAppStateContext();

    const [sportId, setSportId] = useState<string>();

    const collectionState = useRecoilValue(collectionStateSelector(collectionId));

    const { counters, isLoading } = useMemo(() => {
        return eventsCounter.getEventsCounterList(collectionId, {});
    }, [sportId]);

    const filters = useMemo<Filter[]>(() => {
        return (sports as Filter[]).reduce((acc: Filter[], x) => {
            const sportSelected = x.id === sportId;
            const sportHasCounter = counters.some((y: SportCount) => y.id === x.id);

            return sportHasCounter || sportSelected ? [...acc, x] : acc;
        }, []);
    }, [counters]);

    useEffect(() => {
        try {
            if (filters.length > 0 && sportId === undefined) {
                const [filter] = filters;

                setSportId(filter.id);
            }
        } catch (e) {
            console.error('EventsOnLater:', e);
        }
    }, [filters.length, isLoading]);

    return (
        <section>
            {isLoading && sportId === undefined ? (
                <Loader message={<I18n langKey='events.onlater.sports.loading' defaultText='Loading sports...' />} />
            ) : (
                <Filters
                    active={sportId === undefined ? '' : sportId}
                    onChange={(id: string) => setSportId(id)}
                    filters={filters}
                    type={EVENT_FILTERS.sport}
                    showSlider
                />
            )}
            {sportId !== undefined ? (
                <EventsList
                    key={`on-later-home-${sportId}`}
                    collectionId={`on-later-home-${sportId}`}
                    query={{ sport: sportId }}
                    showSort={true}
                    allowLoadMore={true}
                />
            ) : !isLoading && collectionState === RequestStatus.Ready ? (
                <S_Message key={'events-on-later-message'} data-testid='message'>
                    <I18n
                        langKey='events.onlater.empty'
                        defaultText='There are no upcoming events tranded. Come back later!'
                    />
                </S_Message>
            ) : null}
        </section>
    );
};

export default observer(EventsOnLater);
