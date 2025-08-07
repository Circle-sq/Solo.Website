import filter from 'lodash/filter';
import isNumber from 'lodash/isNumber';
import map from 'lodash/map';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import { useAppStateContext } from '../../../appState/AppState';

interface Props {
    displayMarketIds: number[];
}

function validIdMarket(marketId?: number) {
    return isNumber(marketId) && marketId > 0;
}

const SUSPENDED_ROW_MISSING_REVISION = -18;

export function SubscribeSuspendedMarkets({ displayMarketIds }: Props) {
    const { models } = useAppStateContext();

    return map(filter(displayMarketIds, validIdMarket), (mid: number) => {
        const market = models.getMarket(mid);

        return (
            <SubscribeElement
                key={mid}
                revision={market?.revision ?? SUSPENDED_ROW_MISSING_REVISION}
                subKey={SubKey.suspended_market}
                id={mid}
            />
        );
    });
}
