import concat from 'lodash/concat';
import findIndex from 'lodash/findIndex';
import includes from 'lodash/includes';
import map from 'lodash/map';
import { getRecoil } from 'recoil-nexus';

import type { MarketItem } from 'src/common/types/market';
import { speedBetEventAtom } from 'src/features/scoreboardWidget/store/atoms';
import type { SpeedBetMarkets, SpeedBetMarketSelection } from 'src/features/scoreboardWidget/types';
import { isMarketVisible } from 'src/features/scoreboardWidget/ui/SpeedBet/SpeedBetCards/utils';

export const updateSpeedBetMarkets =
    (market: MarketItem) =>
    (atomState: SpeedBetMarkets): SpeedBetMarkets => {
        const { markets, ids } = atomState;

        const marketId = market.id || market?.market?.id || -1;

        if (marketId === -1) {
            return atomState;
        }

        const speedBetEvent = getRecoil(speedBetEventAtom);

        if (market?.event?.id !== speedBetEvent?.id) {
            return atomState;
        }

        const marketWithId = { ...market, id: marketId };

        if (ids.size === 0) {
            return {
                ids: ids.add(marketId),
                markets: [marketWithId],
            };
        }

        if (ids.has(marketId)) {
            const updatedMarkets = map(markets, (atomMarket) => {
                if (includes([atomMarket?.id, atomMarket?.market?.id], marketId)) {
                    return {
                        ...atomMarket,
                        ...marketWithId,
                        name: marketWithId?.market?.name ?? atomMarket?.name,
                        selections: { ...atomMarket.selections, ...marketWithId.selections },
                    };
                }

                return atomMarket;
            });

            return {
                ids,
                markets: updatedMarkets,
            };
        }

        const activeMarketIndex = findIndex(markets, isMarketVisible);

        let updatedMarkets: MarketItem[];

        if (activeMarketIndex !== -1) {
            updatedMarkets = concat(
                markets[0],
                markets.slice(1, activeMarketIndex + 1),
                marketWithId,
                markets.slice(activeMarketIndex + 1),
            );
        } else {
            updatedMarkets = concat(markets[0], marketWithId, markets.slice(1));
        }

        return {
            ids: ids.add(marketId),
            markets: updatedMarkets,
        };
    };

export const updateSpeedBetSelectedMarket = (body: MarketItem) => (atomState: SpeedBetMarketSelection | null) => {
    const selectionId = Object.keys(body.selections)[0];

    const updatedSelection = body?.selections?.[selectionId];
    const marketSelection = atomState?.market?.selections?.[selectionId];

    if (!marketSelection || !updatedSelection) {
        return atomState;
    }

    const { price: newPrice } = updatedSelection;

    if (marketSelection.price.d !== newPrice.d || marketSelection.price.f !== newPrice.f) {
        return {
            ...atomState,
            market: {
                ...atomState.market,
                selections: {
                    ...atomState.market.selections,
                    [selectionId]: {
                        ...marketSelection,
                        price: { ...newPrice },
                    },
                },
            },
            selection: {
                ...atomState.selection,
                price: { ...newPrice },
            },
        };
    }

    return atomState;
};
