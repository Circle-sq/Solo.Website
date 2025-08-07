import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import some from 'lodash/some';
import { Map as ImmutableMap } from 'immutable';
import { selectorFamily } from 'recoil';

import type { MarketItem, Markets } from 'src/common/types/market';

import type { ParamIds } from '../types';

import { eventSelectorFamily, eventTimeSettingsStartedSelectorFamily } from './event';

export const eventMarketsSelectorFamily = selectorFamily<ImmutableMap<string, any> | null, number | undefined>({
    key: 'eventMarketsSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const event = getRecoilValue(eventSelectorFamily(eventId));

            if (isNil(event)) {
                return null;
            }

            return event.get('markets');
        },
});

export const visibleMarketsSelectorFamily = selectorFamily<Markets | null, number | undefined>({
    key: 'visibleMarketsSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const markets = getRecoilValue(eventMarketsSelectorFamily(eventId));
            const timeSettingsStarted = getRecoilValue(eventTimeSettingsStartedSelectorFamily(eventId));

            if (isNil(markets)) {
                return null;
            }

            return omitBy(markets.toJS(), ({ display, tradedInPlay, selections }: MarketItem) => {
                const tradedCorrectly = (timeSettingsStarted && tradedInPlay) || !timeSettingsStarted;

                if (!display) {
                    return true;
                }

                return !some(selections, 'display') || !tradedCorrectly;
            });
        },
});

export const marketSelectorFamily = selectorFamily<ImmutableMap<string, any> | null, ParamIds>({
    key: 'marketSelectorFamily',
    get:
        ({ eventId, marketId }) =>
        ({ get: getRecoilValue }) => {
            const markets = getRecoilValue(eventMarketsSelectorFamily(eventId));

            if (isNil(markets)) {
                return null;
            }

            return markets.get(String(marketId));
        },
});

export const marketSpSelectorFamily = selectorFamily<boolean | undefined, ParamIds>({
    key: 'marketSpSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const market = getRecoilValue(marketSelectorFamily(paramIds));

            if (isNil(market)) {
                return false;
            }

            return market.get('sp');
        },
});

export const marketSpOnlySelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'marketSpOnlySelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const market = getRecoilValue(marketSelectorFamily(paramIds));

            if (isNil(market)) {
                return false;
            }

            return market.get('spOnly', false);
        },
});

export const marketTradedInPlaySelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'marketTradedInPlaySelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const market = getRecoilValue(marketSelectorFamily(paramIds));

            if (isNil(market)) {
                return false;
            }

            return market.get('tradedInPlay', false);
        },
});

export const isActiveMarketSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isActiveMarketSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const market = getRecoilValue(marketSelectorFamily(paramIds));

            if (isNil(market)) {
                return false;
            }

            return market.get('active', false);
        },
});

export const isDisplayedMarketSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isDisplayedMarketSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const market = getRecoilValue(marketSelectorFamily(paramIds));

            if (isNil(market) || market.get('display', false) === false) {
                return false;
            }

            return market.get('selections', ImmutableMap()).some((selection: ImmutableMap<string, any>) => {
                return selection !== null && selection.get('display') === true;
            });
        },
});
