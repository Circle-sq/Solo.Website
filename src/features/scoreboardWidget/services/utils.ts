import isString from 'lodash/isString';

import type { UserData } from '@solo-account/types';
import type { GameId } from '@solo-betslip/api/types/placedBet';
import { getChannel } from '@solo-betslip/helpers/helpers';

import { Currency } from 'src/common/enums';
import { STORAGE_KEYS } from 'src/utils/constants';
import buildLocalStorageService from 'src/utils/StorageService';

import type { SpeedBetMarketSelection } from '../types';

export const formatPossibleBetsPayload = (
    selectedMarket: SpeedBetMarketSelection,
    speedBetStake: string,
    userData: UserData | null,
) => {
    if (!selectedMarket || !selectedMarket.selection || !selectedMarket.market) {
        return;
    }

    const { selection, market } = selectedMarket;

    const selectedLeg = {
        marketType: 'handicap',
        priceType: 'fp',
        price: selection.price,
        eventId: market?.event?.id,
        marketId: market.id,
        selectionId: selection.id,
        timestamp: market?.speedBetContext?.timestamp,
        eachWay: false,
    };

    const payload = {
        betslipSelections: {
            [selection.id]: {
                ...selectedLeg,
            },
        },
        legs: [
            {
                ...selectedLeg,
                stakePerLine: Number(speedBetStake),
            },
        ],
        channel: getChannel(),
        combinations: {},
        currency: {
            value: userData?.wallet?.currency ?? Currency.KRW,
        },
    };

    return payload;
};

export const formatPlaceBetPayload = (
    selectedMarket: SpeedBetMarketSelection,
    speedBetStake: string,
    userData: UserData | null,
) => {
    if (!selectedMarket || !selectedMarket.selection || !selectedMarket.market) {
        return;
    }

    const { selection, market } = selectedMarket;

    let gameId = buildLocalStorageService<GameId>(STORAGE_KEYS.gameId).getItem();

    if (isString(gameId)) {
        gameId = Number(gameId);
    }

    const payload = {
        castBets: [
            {
                id: String(selection.id),
                country: {
                    value: userData?.country ?? '',
                },
                currency: {
                    value: userData?.wallet?.currency ?? Currency.KRW,
                },
                eachWay: false,
                legs: [
                    {
                        type: 'standard',
                        priceType: 'fp',
                        price: selection.price,
                        event: {
                            id: market?.event?.id,
                        },
                        market: {
                            id: market.id,
                        },
                        selection: {
                            id: selection.id,
                        },
                    },
                ],
                stakePerLine: Number(speedBetStake),
                type: 'SGL',
            },
        ],
        channel: getChannel(),
        gameId,
    };

    return payload;
};
