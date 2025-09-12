import { isStandardBetLegType } from '@solo-betslip/typeGuards/leg';

import type { MyBetLeg, MyStandardBetLeg } from 'src/common/types/myBet';
import { WsChannel } from 'src/utils/socket-io/enums';

export const buildBetsChannel = (accountId: number): string => `${accountId}:${WsChannel.Bets}`;

export const buildCashoutChannel = ({ id: betId, legs }: { id: string; legs: MyBetLeg[] }): string => {
    const [eventIds, marketIds, selectionIds] = legs.reduce(
        (acc: [number[], number[], number[]], leg) => {
            const [eventIds, marketIds, selectionIds] = acc;

            eventIds.push(leg.event.id);

            if (isStandardBetLegType<MyStandardBetLeg>(leg)) {
                marketIds.push(leg.market.id);
                selectionIds.push(leg.selection.id);
            }

            return [eventIds, marketIds, selectionIds];
        },
        [[], [], []],
    );

    const ids = `${eventIds.join('|')}:${marketIds.join('|')}:${selectionIds.join('|')}`;

    return `${WsChannel.Cashout}:${betId}:${ids}`;
};

export const buildEventChannel = (eventId: number): string => `${WsChannel.Event}:${eventId}`;

export const buildMarketChannel = (marketId: number): string => `${WsChannel.Market}:${marketId}`;

export const buildRefBetChannel = (accountId: number): string => `${accountId}:${WsChannel.ReferredBets}`;

export const buildWalletChannel = (accountId: number): string => `${accountId}:${WsChannel.Wallet}`;
