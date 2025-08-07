import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';

import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import { S_Message } from 'src/ui/events/EventsList/styled';

import { LOAD_MORE_THRESHOLD, sportListScrollbar } from '../../configs';
import { infiniteEventsAtomWithInfiniteQuery } from '../../store/events';
import { countEventsTotal } from '../../store/helpers/count';

import Competitions from './competitions/Competitions';
import SportHeaderLive from './SportHeader/SportHeaderLive';
import SportHeaderUpcoming from './SportHeader/SportHeaderUpcoming';
import { S_LoaderWrapper, S_SportItem, S_SportItemLive } from './styled';

const SportList = () => {
    const { data, status, isFetchingNextPage, fetchNextPage } = useAtomValue(infiniteEventsAtomWithInfiniteQuery);

    const { live: liveTotal, upcoming: upcomingTotal } = useMemo(() => countEventsTotal(data?.pages), [data?.pages]);

    const onChangeInView = (inView: boolean) => {
        if (inView) {
            void fetchNextPage();
        }
    };

    if (status === 'pending') {
        return <Loader message={<I18n langKey='events.list.loading' defaultText='Loading events...' />} />;
    }

    if (status === 'error') {
        return (
            <S_Message>
                <I18n
                    langKey='events.list.error'
                    defaultText="Sorry, because of temporary issues we can't load events. Try again."
                />
            </S_Message>
        );
    }

    if (status === 'success' && liveTotal === 0 && upcomingTotal === 0) {
        return (
            <S_Message>
                <I18n langKey='events.table.empty' defaultText='There are no events being traded. Come back later!' />
            </S_Message>
        );
    }

    return (
        <CustomScrollbar
            horizontalBarPosition={sportListScrollbar.horizontalBarPosition}
            verticalBarPosition={sportListScrollbar.verticalBarPosition}
            viewPortStyles={sportListScrollbar.viewPortStyles}
        >
            {liveTotal > 0 && (
                <S_SportItemLive>
                    <SportHeaderLive counter={liveTotal} />

                    {data?.pages.map(({ live, pageParam = 1 }) => (
                        <Competitions key={pageParam} groups={live.groups} eventType='live' />
                    ))}
                </S_SportItemLive>
            )}

            {upcomingTotal > 0 && (
                <S_SportItem>
                    <SportHeaderUpcoming counter={upcomingTotal} />

                    {data?.pages.map(({ upcoming, pageParam = 1 }) => (
                        <Competitions key={pageParam} groups={upcoming.groups} eventType='upcoming' />
                    ))}
                </S_SportItem>
            )}

            <InView onChange={onChangeInView} threshold={LOAD_MORE_THRESHOLD} style={{ marginBottom: '30px' }}>
                {isFetchingNextPage && (
                    <S_LoaderWrapper>
                        <Loader />
                    </S_LoaderWrapper>
                )}
            </InView>
        </CustomScrollbar>
    );
};

export default SportList;
