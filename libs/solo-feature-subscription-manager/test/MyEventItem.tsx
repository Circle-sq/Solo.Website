import { DebugColor } from '../debug/configs';
import { SubKey } from '../subKeys';
import { SubscribeElement } from '../SubscribeElement';

import type { MockEvent } from './MockEvent';

interface Props {
    event: MockEvent;
    handleBet: (event: MockEvent) => void;
    handleSelect: (event: MockEvent) => void;
}
const eventRevision = 32;

export const MyEventItem = ({ event, handleBet, handleSelect }: Props) => {
    return (
        <div style={{ color: DebugColor.green }}>
            <button data-testid={`list-event-${event.id}-bet`} onClick={() => handleBet(event)}>
                bet
            </button>
            <SubscribeElement id={event.id} subKey={SubKey.event_row} revision={eventRevision}>
                <span data-testid={`list-event-${event.id}`} onClick={() => handleSelect(event)}>
                    event: {event.name}
                </span>
            </SubscribeElement>
        </div>
    );
};
