import map from 'lodash/map';

import { isBuildABetMarket } from '@solo-buildABet/utils/helpers';

import type { MockMarket } from './types';

const MockEventMarkets = ({ markets }: { markets: MockMarket[] }) => {
    return (
        <>
            <h1>markets:</h1>
            <ul>
                {map(markets, (market: MockMarket) => (
                    <li key={market.id}>
                        {market.value} {isBuildABetMarket(market) ? '[BAB]' : ''}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MockEventMarkets;
