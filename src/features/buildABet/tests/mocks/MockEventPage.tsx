import { BuildABetFeatureToggle } from '@solo-buildABet/ui';
import { useBuildABetFeature } from '@solo-buildABet/hooks/useBuildABetFeature';

import type { MockEvent } from './types';
import MockEventMarkets from './MockEventMarkets';

const MockEventPage = ({ event }: { event: MockEvent }) => {
    const { eventId, markets } = event;
    const { markets: babMarkets } = useBuildABetFeature({ event: { id: eventId, markets }, markets });

    return (
        <div>
            <h1>you are on event details page</h1>
            <MockEventMarkets markets={babMarkets} />
            <BuildABetFeatureToggle eventId={eventId} />
        </div>
    );
};

export default MockEventPage;
