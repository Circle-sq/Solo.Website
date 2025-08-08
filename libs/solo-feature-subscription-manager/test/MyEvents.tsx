import map from 'lodash/map';

import type { MockEvent } from './MockEvent';
import { MyEventItem } from './MyEventItem';

interface Props {
    events: MockEvent[];
    handleBet: (event: MockEvent) => void;
    handleSelect: (event: MockEvent) => void;
}

export const MyEvents = ({ events, ...props }: Props) => {
    return (
        <div>
            <h1>My Events ({events.length})</h1>
            {map(events, (event: MockEvent) => (
                <MyEventItem key={event.id} event={event} {...props} />
            ))}
        </div>
    );
};
