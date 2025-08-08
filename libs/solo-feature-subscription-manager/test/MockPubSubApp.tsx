import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';
import { useState } from 'react';

import type { MockBet, MockEvent } from './MockEvent';
import { MyBets } from './MyBets';
import { MyEventDetails } from './MyEventDetails';
import { MyEvents } from './MyEvents';

export function MockContent({ fooParam }: { fooParam: MockEvent[] }) {
    const [events] = useState<MockEvent[]>(fooParam);
    const [bets, setBets] = useState<MockBet[]>([]);
    const [betId, setBetId] = useState(0);
    const [state, setState] = useState<{
        currentEvent: null | MockEvent;
        listVisible: boolean;
    }>({
        currentEvent: null,
        listVisible: false,
    });

    const { currentEvent, listVisible } = state;

    function setCurrentEvent(currentEvent: MockEvent | null) {
        setState({
            ...state,
            listVisible: currentEvent === null,
            currentEvent,
        });
    }

    function placeBet(event: MockEvent) {
        const aBet = { event, id: betId };

        setBets([...bets, aBet]);
        setBetId(betId + 1);
    }

    function showEventDetails(event: MockEvent) {
        setCurrentEvent(event);
    }

    function removeBar(id: number) {
        const reducedBars = reject(bets, { id });

        setBets(reducedBars);
    }

    function toggleList() {
        setState({
            ...state,
            listVisible: !listVisible,
        });
    }

    return (
        <div>
            {!currentEvent && <button onClick={toggleList}>{listVisible ? 'hide' : 'show'} list</button>}
            {currentEvent && (
                <MyEventDetails event={currentEvent} handleDone={() => setCurrentEvent(null)} handleBet={placeBet} />
            )}

            {listVisible && <MyEvents events={events} handleBet={placeBet} handleSelect={showEventDetails} />}
            <hr />
            {!isEmpty(bets) && <MyBets bets={bets} handleDelete={removeBar} />}
        </div>
    );
}
