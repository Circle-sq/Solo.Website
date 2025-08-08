import { useSpeedBetFlag } from '@solo-feature-flags';
import { useQuery } from '@tanstack/react-query';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';
import { useSetRecoilState } from 'recoil';

import { api } from '@solo-api/api';

import type { EventItem } from 'src/common/types/event';
import type { MarketItem } from 'src/common/types/market';
import { speedBetMarketsAtom, speedBetEventAtom } from 'src/features/scoreboardWidget/store/atoms';

interface GetSpeedBetMarkets {
    isFetching: boolean;
    markets: MarketItem[];
    event: Partial<EventItem>;
}

interface Response {
    event: Partial<EventItem>;
    markets: MarketItem[];
}

const useSpeedBetMarkets = (eventId: number): GetSpeedBetMarkets => {
    const isSpeedBetEnabled = useSpeedBetFlag();

    const setSpeedBetMarkets = useSetRecoilState(speedBetMarketsAtom);
    const setSpeedBetEvent = useSetRecoilState(speedBetEventAtom);

    const queryFn = async (): Promise<Response> => {
        const { markets = [], event = {} } = await api.get<Response>(`/events/${eventId}/markets-lite/speed-bet`);

        const sortedMarkets: MarketItem[] = orderBy(markets, ['speedBetContext.timestamp'], ['desc']);
        const [visibleMarkets, hiddenMarkets] = partition(sortedMarkets, ['active', 'display']);

        setSpeedBetEvent(event);
        setSpeedBetMarkets({
            markets: [...visibleMarkets, ...hiddenMarkets],
            ids: new Set(map(markets, 'id')),
        });

        return { event, markets };
    };

    const { data, isFetching } = useQuery({
        enabled: isSpeedBetEnabled,
        queryKey: ['get-speed-bet-markets', eventId],
        queryFn: async () => queryFn(),
    });

    return {
        event: data?.event ?? {},
        markets: data?.markets ?? [],
        isFetching,
    };
};

export default useSpeedBetMarkets;
