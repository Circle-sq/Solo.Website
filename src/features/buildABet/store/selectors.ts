import get from 'lodash/get';
import includes from 'lodash/includes';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import size from 'lodash/size';
import { selectorFamily } from 'recoil';

import type { Markets } from 'src/common/types/market';
import { bettingConfigsAtom } from 'src/store/configs/atoms';
import { eventTimeSettingsStartedSelectorFamily } from 'src/ui/events/store/selectors/event';
import { visibleMarketsSelectorFamily } from 'src/ui/events/store/selectors/market';

import { MIN_BUILD_A_BET_MARKETS_COUNT } from '../configs';

import { enabledBuildABetIdsAtom } from './atoms';

export const buildABetMarketsSelectorFamily = selectorFamily<Markets | null, number | undefined>({
    key: 'buildABetMarketsSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const markets = getRecoilValue(visibleMarketsSelectorFamily(eventId));

            if (isNil(markets)) {
                return null;
            }

            return omitBy(markets, ({ tags }) => get(tags, 'build-a-bet[0]') !== 'yes');
        },
});

export const buildABetMarketsCountSelectorFamily = selectorFamily<number, number | undefined>({
    key: 'buildABetMarketsCountSelectorFamily',
    get:
        (eventId) =>
        ({ get }) =>
            size(get(buildABetMarketsSelectorFamily(eventId))),
});

export const isAvailableBuildABetFeatureSelectorFamily = selectorFamily<boolean, number | undefined>({
    key: 'isAvailableBuildABetFeatureSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const bettingConfigs = get(bettingConfigsAtom);
            const inPlay = get(eventTimeSettingsStartedSelectorFamily(eventId));
            const buildABetMarketsCount = get(buildABetMarketsCountSelectorFamily(eventId));

            const isEligibleMarketsCount = buildABetMarketsCount >= MIN_BUILD_A_BET_MARKETS_COUNT;

            return inPlay ? bettingConfigs.allowInPlayBuildABet && isEligibleMarketsCount : isEligibleMarketsCount;
        },
});

export const isEnabledBuildABetFeatureSelectorFamily = selectorFamily<boolean, number | undefined>({
    key: 'isEnabledBuildABetFeatureSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            if (isNil(eventId)) {
                return false;
            }

            return includes(get(enabledBuildABetIdsAtom), eventId);
        },
});
