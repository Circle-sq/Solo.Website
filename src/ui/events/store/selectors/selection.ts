import type { Map as ImmutableMap } from 'immutable';
import isNil from 'lodash/isNil';
import { selectorFamily } from 'recoil';

import { isSelectionSpSelectorFamily } from '@solo-betslip/store/selectors/selections';

import { OddsFormat, type BetStatus } from 'src/common/enums';

import type { ParamIds } from '../types';

import {
    eventTimeSettingsSelectorFamily,
    isActiveEventSelectorFamily,
    isDisplayEventSelectorFamily,
    eventSelectorFamily,
} from './event';
import {
    isActiveMarketSelectorFamily,
    isDisplayedMarketSelectorFamily,
    marketSelectorFamily,
    marketSpOnlySelectorFamily,
    marketSpSelectorFamily,
    marketTradedInPlaySelectorFamily,
} from './market';

export const selectionsSelectorFamily = selectorFamily<ImmutableMap<string, any> | null, ParamIds>({
    key: 'selectionsSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const market = getRecoilValue(marketSelectorFamily(paramIds));

            if (isNil(market)) {
                return null;
            }

            return market.get('selections');
        },
});

export const selectionSelectorFamily = selectorFamily<ImmutableMap<string, any> | null, ParamIds>({
    key: 'selectionSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        ({ selectionId, ...paramIds }) =>
        ({ get: getRecoilValue }) => {
            const selections = getRecoilValue(selectionsSelectorFamily(paramIds));

            if (isNil(selections)) {
                return null;
            }

            return selections.get(String(selectionId));
        },
});

export const selectionDecimalPriceSelectorFamily = selectorFamily<number | null, ParamIds>({
    key: 'selectionDecimalPriceSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        ({ eventId, marketId, selectionId }) =>
        ({ get }) => {
            const event = get(eventSelectorFamily(eventId));
            const price = event.getIn(['markets', marketId, 'selections', String(selectionId), 'price']).toJS();

            if (isNil(price)) {
                return null;
            }

            return price[OddsFormat.Decimal];
        },
});

export const selectionSpSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'selectionSpSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const selection = getRecoilValue(selectionSelectorFamily(paramIds));

            if (isNil(selection)) {
                return false;
            }

            return selection.get('sp', false);
        },
});

export const selectionStateSelectorFamily = selectorFamily<BetStatus | undefined, ParamIds>({
    key: 'selectionStateSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const selection = getRecoilValue(selectionSelectorFamily(paramIds));

            return selection?.get('state');
        },
});

export const isActiveSelectionSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isActiveSelectionSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const selection = getRecoilValue(selectionSelectorFamily(paramIds));

            if (isNil(selection)) {
                return false;
            }

            return selection.get('active', false);
        },
});

export const isActivatedSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isActivatedSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const isActiveSelection = getRecoilValue(isActiveSelectionSelectorFamily(paramIds));
            const isActiveMarket = getRecoilValue(isActiveMarketSelectorFamily(paramIds));
            const isActiveEvent = getRecoilValue(isActiveEventSelectorFamily(paramIds.eventId));

            return isActiveSelection && isActiveMarket && isActiveEvent;
        },
});

export const isDisplaySelectionSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isDisplaySelectionSelectorFamily',
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const selection = getRecoilValue(selectionSelectorFamily(paramIds));

            if (isNil(selection)) {
                return false;
            }

            return selection.get('display', false);
        },
});

export const isDisplayedSelectionSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isDisplaySelectionSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        (paramIds) =>
        ({ get }) => {
            const isDisplaySelection = get(isDisplaySelectionSelectorFamily(paramIds));
            const isDisplayedMarket = get(isDisplayedMarketSelectorFamily(paramIds));
            const isDisplayEvent = get(isDisplayEventSelectorFamily(paramIds.eventId));

            return isDisplaySelection && isDisplayedMarket && isDisplayEvent;
        },
});

export const isSpSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isSpSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const selectionSp = getRecoilValue(selectionSpSelectorFamily(paramIds));
            const timeSettings = getRecoilValue(eventTimeSettingsSelectorFamily(paramIds.eventId));

            return selectionSp && timeSettings.started;
        },
});

export const isSuspendedSelectionSelectorFamily = selectorFamily<boolean, ParamIds>({
    key: 'isSuspendedSelectionSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        (paramIds) =>
        ({ get: getRecoilValue }) => {
            const isActivated = getRecoilValue(isActivatedSelectorFamily(paramIds));
            const isSP = getRecoilValue(isSpSelectorFamily(paramIds));
            const marketSp = getRecoilValue(marketSpSelectorFamily(paramIds));
            const marketTradedInPlay = getRecoilValue(marketTradedInPlaySelectorFamily(paramIds));
            const isSPOnly = getRecoilValue(marketSpOnlySelectorFamily(paramIds));
            const timeSettings = getRecoilValue(eventTimeSettingsSelectorFamily(paramIds.eventId));
            const isSelectionSP = getRecoilValue(isSelectionSpSelectorFamily(paramIds.selectionId as number));

            const tradedInPlay = marketTradedInPlay && timeSettings.tradedInPlay;
            const isLegSP = marketSp ?? isSelectionSP;

            if (isSP && isLegSP) {
                return false;
            }

            return !isSPOnly && !isSP && (!isActivated || (!tradedInPlay && timeSettings.started));
        },
});
