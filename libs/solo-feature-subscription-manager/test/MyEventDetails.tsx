import { DebugColor } from '../debug/configs';
import { SubKey } from '../subKeys';
import { SubscribeElement } from '../SubscribeElement';

import type { MockEvent } from './MockEvent';

interface Props {
    event: MockEvent;
    handleBet: (event: MockEvent) => void;
    handleDone: () => void;
}
const eventRevision = 31;

export const MyEventDetails = ({ event, handleBet, handleDone }: Props) => {
    return (
        <SubscribeElement id={event.id} subKey={SubKey.event_card} revision={eventRevision}>
            <div style={{ color: DebugColor.orange }} data-testid='details-page'>
                <button onClick={handleDone}>backTo list</button>
                <h1>My Event {event.id} Details</h1>
                <div>
                    my event: {event.name}
                    <button data-testid={`details-event-${event.id}-bet`} onClick={() => handleBet(event)}>
                        bet on this one
                    </button>
                </div>
            </div>
        </SubscribeElement>
    );
};
