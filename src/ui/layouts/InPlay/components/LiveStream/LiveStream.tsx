import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

import { I18n } from 'src/ui/common/Language/I18n';
import EventsList from 'src/ui/events/EventsList';
import { S_Message } from 'src/ui/events/EventsList/styled';
import { NUMBERS } from 'src/utils/constants';

import { S_SportPanel } from '../../styled';
import type { LiveStreamProps } from '../../types';

const LiveStream = ({ liveStreams = [], allowLoadMore = true, perPage = NUMBERS.perPage }: LiveStreamProps) => {
    const orderedStreams = orderBy(filter(liveStreams, 'id'), 'displayOrder', 'desc');

    const getCollectionId = (sport: string): string => `in-play-live-streaming-${sport}`;

    const getQueryParams = (sport: string): Record<string, string | number | boolean> => ({
        sport,
        perPage,
        availableStreams: true,
    });

    if (liveStreams.length === 0) {
        return (
            <S_Message key={'inplay-live-stream-message'}>
                <I18n
                    langKey='inplay.live-stream.empty'
                    defaultText='There are no live streaming events being traded. Come back later!'
                />
            </S_Message>
        );
    }

    return (
        <>
            {orderedStreams.map((sport) => {
                return (
                    <S_SportPanel key={`sport-${sport.id}`}>
                        <EventsList
                            collectionId={getCollectionId(sport.id)}
                            query={getQueryParams(sport.id)}
                            allowLoadMore={allowLoadMore}
                            isLiveStreamingPage
                            showHeader
                        />
                    </S_SportPanel>
                );
            })}
        </>
    );
};

export default LiveStream;
