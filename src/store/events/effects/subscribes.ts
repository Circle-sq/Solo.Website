import type { EffectArgs } from '@solo-utils/jotai';

import { buildEventChannel, buildMarketChannel } from 'src/utils/socket-io/buildChannel';
import { socketIoClientAsianViewGeneral } from 'src/utils/socket-io/clients';

import { subscribeToEventTask, subscribeToMarketTask } from '../tasks/subscribes';
import type { EventItem, MarketItem } from '../types';

export const subscribeEventEffect =
    (eventId: number) =>
    ({ get, set, node }: EffectArgs<EventItem<number> | null>) => {
        const eventChannel = buildEventChannel(eventId);

        void socketIoClientAsianViewGeneral.then((clientIo) => {
            const subscribeToEvent = subscribeToEventTask({ get, set });

            clientIo?.socket.subscribe(eventChannel, subscribeToEvent, get(node)?.revision);
        });

        return () => {
            void socketIoClientAsianViewGeneral.then((clientIo) => {
                clientIo?.socket.unsubscribe(eventChannel);
            });
        };
    };

export const subscribeMarketEffect =
    (marketId: number) =>
    ({ get, set, node }: EffectArgs<MarketItem<number> | null>) => {
        const marketChannel = buildMarketChannel(marketId);

        void socketIoClientAsianViewGeneral.then((clientIo) => {
            const subscribeToMarket = subscribeToMarketTask({ get, set });

            clientIo?.socket.subscribe(marketChannel, subscribeToMarket, get(node)?.revision);
        });

        return () => {
            void socketIoClientAsianViewGeneral.then((clientIo) => {
                clientIo?.socket.unsubscribe(marketChannel);
            });
        };
    };
