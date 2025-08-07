import { useState } from 'react';
import filter from 'lodash/filter';

import { isBuildABetMarket } from '@sc-buildABet/utils/helpers';

import type { MockEvent } from './types';
import { mockEvent } from './mockData';
import MockEventPage from './MockEventPage';

export const MockLocationDisplay = ({ location }: { location: string }) => {
    return <div data-testid='location-display'>{location}</div>;
};

const MockListPage = () => <div>you are on list page</div>;

interface Props {
    initLocation?: string;
    event?: MockEvent;
}

const MockBuildABetFeature = ({ initLocation = '/events', event = mockEvent }: Props) => {
    // emulate "navigation" by mounting/unmounting components
    const [location, setLocation] = useState(initLocation);
    const [localEvent, setEvent] = useState(event);

    const switchToList = () => setLocation('/events');
    const switchToEvent = () => setLocation('/events/1');

    const removeAllButOneBabMarkets = () => {
        setEvent(() => ({ ...event, markets: filter(event.markets, (m) => !isBuildABetMarket(m)) }));
    };

    return (
        <>
            <a href='#' onClick={switchToList}>
                events
            </a>
            <a href='#' onClick={switchToEvent}>
                event 1
            </a>

            {location === '/events' ? <MockListPage /> : <MockEventPage event={localEvent} />}

            <MockLocationDisplay location={location} />
            <button onClick={removeAllButOneBabMarkets}>remove all but one BAB markets</button>
        </>
    );
};

export default MockBuildABetFeature;
