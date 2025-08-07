import { isCrossBetLegType, isStandardBetLegType } from '@sc-betslip/typeGuards/leg';

import type { MyBetLeg, MyCrossBetLeg, MyStandardBetLeg } from 'src/common/types/myBet';
import { WsChannel } from 'src/utils/socket-io/enums';

export const buildBetsChannel = (accountId: number): string => `${accountId}:${WsChannel.Bets}`;

export const buildCashoutChannel = ({ id: betId, legs }: { id: string; legs: MyBetLeg[] }): string => {
    const [eventIds, marketIds, selectionIds] = legs.reduce(
        (acc: [number[], number[], number[]], leg) => {
            const [eventIds, marketIds, selectionIds] = acc;

            eventIds.push(leg.event.id);

            if (isCrossBetLegType<MyCrossBetLeg>(leg)) {
                leg.marketsAndSelections.forEach((item) => {
                    marketIds.push(item.market.id);
                    selectionIds.push(item.selection.id);
                });
            } else if (isStandardBetLegType<MyStandardBetLeg>(leg)) {
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
