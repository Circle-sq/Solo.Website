import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import size from 'lodash/size';
import uniq from 'lodash/uniq';
import { useRecoilValue } from 'recoil';

import { isEnabledBuildABetFeatureSelectorFamily } from '../store/selectors';
import { filterBuildABetMarkets } from '../utils/helpers';

interface Params<T1, T2> {
    event: T2;
    markets: T1[];
}

export const useBuildABetFeature = <T1, T2 extends { id: number; markets: T1[] } | null>({
    event,
    markets,
}: Params<T1, T2>) => {
    const isEnabled = useRecoilValue(isEnabledBuildABetFeatureSelectorFamily(event?.id));
    const buildABetMarkets = filterBuildABetMarkets(markets);
    const buildABetMarketCount = size(buildABetMarkets);

    const marketNameGroup = uniq(
        flatMap(!isNil(event) ? filterBuildABetMarkets(event.markets) : [], (bet) => get(bet, 'tags.market-group')),
    ) as string[];

    if (isEnabled) {
        return {
            markets: buildABetMarkets,
            buildABetMarketCount,
            marketNameGroup,
        };
    }

    return {
        markets,
        buildABetMarketCount,
        marketNameGroup: [],
    };
};
